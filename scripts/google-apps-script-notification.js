// Google Apps Script webhook for Metallbau Schimmel request notifications.
//
// Setup:
// 1. Create a new Apps Script project at https://script.google.com/.
// 2. Paste this file into Code.gs.
// 3. Replace WEBHOOK_SECRET with a long random value.
// 4. Deploy > New deployment > Web app.
// 5. Execute as: Me.
// 6. Who has access: Anyone.
// 7. Copy the Web app URL and set it as NOTIFICATION_WEBHOOK_URL in Cloudflare Pages.
// 8. Set the same secret as NOTIFICATION_WEBHOOK_SECRET in Cloudflare Pages.

const TO_EMAIL = "metallbau.schimmel@gmail.com";
const WEBHOOK_SECRET = "PASTE_A_LONG_RANDOM_SECRET_HERE";

function doPost(e) {
  const payload = JSON.parse(e.postData.contents || "{}");
  if (!payload.secret || payload.secret !== WEBHOOK_SECRET) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false })).setMimeType(ContentService.MimeType.JSON);
  }

  const request = payload.request || {};
  const attachments = payload.attachments || [];
  const subject = `Neue Anfrage: ${request.name || "Unbekannt"}`;
  const body = [
    "Neue Website-Anfrage",
    "",
    `Zeit: ${request.createdAt || ""}`,
    `Name: ${request.name || ""}`,
    `E-Mail: ${request.email || ""}`,
    `Telefon: ${request.phone || ""}`,
    `Ort / PLZ: ${request.location || ""}`,
    `Projektart: ${request.projectType || ""}`,
    "",
    "Nachricht:",
    request.message || "",
    "",
    attachments.length ? `Anhänge: ${attachments.length}` : "Anhänge: keine",
    ...attachments.map((file) => `- ${file.fileName} (${Math.round((file.sizeBytes || 0) / 1024)} KB)`),
    "",
    `Request-ID: ${request.id || ""}`,
  ].join("\n");

  MailApp.sendEmail({
    to: TO_EMAIL,
    subject,
    body,
    replyTo: request.email || TO_EMAIL,
    name: "Metallbau Schimmel Website",
  });

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
