export default async function handler(req, res) {
  // Allow the browser to call this from the same site
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, name, child_name, child_age, barrier } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
  const NGC_GROUP_ID = process.env.NGC_GROUP_ID;

  if (!MAILERLITE_API_KEY) {
    console.error("Missing MAILERLITE_API_KEY environment variable");
    return res.status(500).json({ error: "Server not configured" });
  }

  try {
    const mlResponse = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        fields: {
          name: name || "",
          child_name: child_name || "",
          child_age: child_age || "",
          barrier: barrier || "",
        },
        groups: NGC_GROUP_ID ? [NGC_GROUP_ID] : [],
      }),
    });

    const data = await mlResponse.json().catch(() => ({}));

    if (!mlResponse.ok) {
      console.error("MailerLite error:", data);
      return res.status(mlResponse.status).json({ error: "MailerLite request failed", details: data });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Subscribe function error:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
