const DEFAULT_MAX_FILES = 5;
const DEFAULT_MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_FILE_TYPES = new Set(["application/pdf"]);

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });

const textValue = (value) => (typeof value === "string" ? value.trim() : "");

const envNumber = (env, key, fallback) => {
  const parsed = Number(env?.[key]);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const safeFileName = (name) =>
  name
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120) || "attachment";

const getClientIp = (request) => request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || "";

const hashText = async (value) => {
  if (!value) return "";
  const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, "0")).join("");
};

const isAllowedFile = (file) => {
  if (!file || typeof file.name !== "string" || !Number.isFinite(file.size) || file.size <= 0) return false;
  return file.type.startsWith("image/") || ALLOWED_FILE_TYPES.has(file.type);
};

const verifyTurnstile = async ({ token, env, request }) => {
  if (!env.TURNSTILE_SECRET_KEY) return { ok: true, skipped: true };
  if (!token) return { ok: false, message: "Turnstile token missing." };

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({
      secret: env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: getClientIp(request),
    }),
  });

  const result = await response.json().catch(() => null);
  return result?.success ? { ok: true, skipped: false } : { ok: false, message: "Turnstile check failed." };
};

const sendNotification = async ({ env, requestId, createdAt, fields, attachments }) => {
  if (!env.NOTIFICATION_WEBHOOK_URL) return { ok: true, skipped: true };

  const payload = {
    secret: env.NOTIFICATION_WEBHOOK_SECRET || "",
    request: {
      id: requestId,
      createdAt,
      name: fields.name,
      email: fields.email,
      phone: fields.phone,
      location: fields.location,
      projectType: fields.projectType,
      message: fields.message,
      sourceLanguage: fields.sourceLanguage,
    },
    attachments: attachments.map((attachment) => ({
      fileName: attachment.fileName,
      contentType: attachment.contentType,
      sizeBytes: attachment.sizeBytes,
      r2Key: attachment.r2Key,
    })),
  };

  try {
    const response = await fetch(env.NOTIFICATION_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    return {
      ok: response.ok,
      skipped: false,
      status: response.status,
      message: response.ok ? "Notification webhook accepted request." : await response.text().catch(() => ""),
    };
  } catch (error) {
    return {
      ok: false,
      skipped: false,
      status: 0,
      message: error instanceof Error ? error.message : "Notification webhook failed.",
    };
  }
};

export const onRequestOptions = () => json({ ok: true });

export const onRequestPost = async ({ request, env }) => {
  if (!request.headers.get("content-type")?.includes("multipart/form-data")) {
    return json({ ok: false, code: "unsupported_media_type", message: "Expected multipart form data." }, 415);
  }

  const form = await request.formData();
  if (textValue(form.get("company"))) {
    return json({ ok: true, requestId: null, spamFiltered: true }, 202);
  }

  if (!env.REQUESTS_DB) {
    return json({ ok: false, code: "backend_not_configured", message: "D1 binding REQUESTS_DB is not configured." }, 503);
  }

  const fields = {
    name: textValue(form.get("name")),
    email: textValue(form.get("email")),
    phone: textValue(form.get("phone")),
    location: textValue(form.get("location")),
    projectType: textValue(form.get("type")),
    message: textValue(form.get("message")),
    sourceLanguage: textValue(form.get("sourceLanguage")) || "de",
    consent: textValue(form.get("consent")),
  };

  if (!fields.name || !fields.email || !fields.message || !fields.consent) {
    return json({ ok: false, code: "validation_error", message: "Name, email, message and consent are required." }, 400);
  }

  const turnstile = await verifyTurnstile({
    token: textValue(form.get("cf-turnstile-response")),
    env,
    request,
  });
  if (!turnstile.ok) {
    return json({ ok: false, code: "turnstile_failed", message: turnstile.message }, 403);
  }

  const maxFiles = envNumber(env, "MAX_UPLOAD_FILES", DEFAULT_MAX_FILES);
  const maxFileBytes = envNumber(env, "MAX_UPLOAD_BYTES", DEFAULT_MAX_FILE_BYTES);
  const files = form.getAll("files").filter((file) => isAllowedFile(file));

  if (files.length > maxFiles) {
    return json({ ok: false, code: "too_many_files", message: `Maximum ${maxFiles} files are allowed.` }, 400);
  }
  if (files.some((file) => file.size > maxFileBytes)) {
    return json({ ok: false, code: "file_too_large", message: `Each file must be ${maxFileBytes} bytes or smaller.` }, 400);
  }
  if (files.length > 0 && !env.REQUEST_ATTACHMENTS) {
    return json({ ok: false, code: "backend_not_configured", message: "R2 binding REQUEST_ATTACHMENTS is not configured." }, 503);
  }

  const requestId = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const metadata = {
    userAgent: request.headers.get("user-agent") || "",
    ipHash: await hashText(getClientIp(request)),
    country: request.cf?.country || "",
    referrer: request.headers.get("referer") || "",
    url: request.url,
    turnstileSkipped: turnstile.skipped,
  };

  const attachments = [];
  for (const [index, file] of files.entries()) {
    const key = `requests/${createdAt.slice(0, 10)}/${requestId}/${String(index + 1).padStart(2, "0")}-${safeFileName(file.name)}`;
    await env.REQUEST_ATTACHMENTS.put(key, file.stream(), {
      httpMetadata: { contentType: file.type || "application/octet-stream" },
      customMetadata: {
        requestId,
        originalName: file.name,
      },
    });
    attachments.push({
      id: crypto.randomUUID(),
      requestId,
      r2Key: key,
      fileName: file.name,
      contentType: file.type || "application/octet-stream",
      sizeBytes: file.size,
      createdAt,
    });
  }

  const statements = [
    env.REQUESTS_DB.prepare(
      `INSERT INTO contact_requests
        (id, created_at, name, email, phone, location, project_type, message, source_language, consent_given, metadata_json, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(
      requestId,
      createdAt,
      fields.name,
      fields.email,
      fields.phone,
      fields.location,
      fields.projectType,
      fields.message,
      fields.sourceLanguage,
      1,
      JSON.stringify(metadata),
      "new",
    ),
    env.REQUESTS_DB.prepare(
      `INSERT INTO interaction_events (id, created_at, event_type, request_id, metadata_json)
       VALUES (?, ?, ?, ?, ?)`,
    ).bind(crypto.randomUUID(), createdAt, "contact_request_created", requestId, JSON.stringify({ attachmentCount: attachments.length })),
    ...attachments.map((attachment) =>
      env.REQUESTS_DB.prepare(
        `INSERT INTO request_attachments
          (id, request_id, r2_key, file_name, content_type, size_bytes, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ).bind(attachment.id, attachment.requestId, attachment.r2Key, attachment.fileName, attachment.contentType, attachment.sizeBytes, attachment.createdAt),
    ),
  ];

  await env.REQUESTS_DB.batch(statements);

  const notification = await sendNotification({ env, requestId, createdAt, fields, attachments });
  await env.REQUESTS_DB.prepare(
    `INSERT INTO interaction_events (id, created_at, event_type, request_id, metadata_json)
     VALUES (?, ?, ?, ?, ?)`,
  )
    .bind(
      crypto.randomUUID(),
      new Date().toISOString(),
      notification.skipped ? "notification_skipped" : notification.ok ? "notification_sent" : "notification_failed",
      requestId,
      JSON.stringify({
        status: notification.status ?? null,
        message: notification.message ?? "",
      }),
    )
    .run()
    .catch(() => undefined);

  return json(
    {
      ok: true,
      requestId,
      attachmentCount: attachments.length,
      notificationSent: notification.ok && !notification.skipped,
      contactEmail: env.PUBLIC_CONTACT_EMAIL || "metallbau.schimmel@gmail.com",
    },
    201,
  );
};
