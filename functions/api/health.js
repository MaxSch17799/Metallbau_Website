const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });

export const onRequestGet = ({ env }) =>
  json({
    ok: true,
    bindings: {
      requestsDb: Boolean(env.REQUESTS_DB),
      requestAttachments: Boolean(env.REQUEST_ATTACHMENTS),
      turnstileSecret: Boolean(env.TURNSTILE_SECRET_KEY),
      turnstileSiteKey: Boolean(env.PUBLIC_TURNSTILE_SITE_KEY),
      notificationWebhook: Boolean(env.NOTIFICATION_WEBHOOK_URL),
      publicContactEmail: env.PUBLIC_CONTACT_EMAIL || "metallbau.schimmel@gmail.com",
    },
  });
