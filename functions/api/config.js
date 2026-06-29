const json = (body) =>
  new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });

export const onRequestGet = ({ env }) =>
  json({
    turnstileSiteKey: env.PUBLIC_TURNSTILE_SITE_KEY || "",
  });
