import { supabase } from "@/lib/supabase";

type ContactRequestBody = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  captchaToken: string;
};

export async function POST(request: Request) {
  let body: ContactRequestBody;

  try {
    body = (await request.json()) as ContactRequestBody;
  } catch {
    return Response.json({ message: "Invalid request body" }, { status: 400 });
  }

  const { name, email, phone, company, message, captchaToken } = body;

  // 1. Validate required fields
  if (!name || !email || !phone || !company || !message) {
    return Response.json(
      { message: "All fields are required" },
      { status: 400 },
    );
  }

  // 2. Validate captcha token is present
  if (!captchaToken) {
    return Response.json(
      { message: "reCAPTCHA token is missing" },
      { status: 400 },
    );
  }

  // 3. Verify token with Google reCAPTCHA
  let verifyData: { success: boolean; score?: number; "error-codes"?: string[] };

  try {
    const verifyResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.CAPTCHA_SECRET_KEY!,
          response: captchaToken,
        }),
      },
    );
    verifyData = (await verifyResponse.json()) as typeof verifyData;
  } catch (err) {
    console.error("[contact/route] reCAPTCHA verify network error:", err);
    return Response.json(
      { message: "Failed to verify reCAPTCHA. Please try again." },
      { status: 500 },
    );
  }

  // 4. Check verification success
  if (!verifyData.success) {
    console.warn(
      "[contact/route] reCAPTCHA verification failed:",
      verifyData["error-codes"],
    );
    return Response.json(
      {
        message: "reCAPTCHA verification failed",
        errors: verifyData["error-codes"],
      },
      { status: 400 },
    );
  }

  // 5. Check score threshold (>= 0.5 is human-like)
  const score = verifyData.score ?? 0;
  if (score < 0.5) {
    console.warn("[contact/route] reCAPTCHA score too low:", score);
    return Response.json(
      { message: "Suspicious activity detected. Please try again." },
      { status: 400 },
    );
  }

  // 6. Insert submission into Supabase
  const { error: dbError } = await supabase.from("contact_submissions").insert({
    name,
    email,
    phone,
    company,
    message,
    captcha_score: score,
  });

  if (dbError) {
    console.error("[contact/route] Supabase insert error:", dbError);
    return Response.json(
      { message: "Failed to save your message. Please try again later." },
      { status: 500 },
    );
  }

  return Response.json({ message: "Message received. Thank you!" });
}
