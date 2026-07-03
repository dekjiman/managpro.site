import type { NextApiRequest, NextApiResponse } from "next";

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!TURNSTILE_SECRET_KEY) {
    return res.status(200).json({ success: true });
  }

  const { token } = req.body as { token?: string };

  if (!token) {
    return res.status(400).json({ success: false, message: "Missing turnstile token" });
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", TURNSTILE_SECRET_KEY);
    formData.append("response", token);

    const result = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      body: formData,
    });

    const data = await result.json();

    if (data.success) {
      return res.status(200).json({ success: true });
    }

    return res.status(403).json({ success: false, message: "Turnstile verification failed" });
  } catch {
    return res.status(500).json({ success: false, message: "Turnstile verification error" });
  }
}
