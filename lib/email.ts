import "server-only";

import { Resend } from "resend";

const DEFAULT_FROM = "I Ching Oracle <noreply@ichingoracle.de>";

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export function getAppUrl(): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    process.env.AUTH_URL?.trim() ||
    "http://localhost:3000"
  ).replace(/\/$/, "");
}

function buildVerificationEmailHtml(verifyUrl: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Confirm your account</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0f;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0a0a0f;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:520px;background:linear-gradient(145deg,#12121a 0%,#1a1520 100%);border:1px solid rgba(197,160,89,0.25);border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:36px 32px 12px;text-align:center;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#8b7ec8;">ICHING-ORACLE</p>
              <h1 style="margin:0;font-size:26px;font-weight:600;color:#e8d5a8;">Confirm your account</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 24px;text-align:center;">
              <p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:#b8b4c4;">
                Welcome to the oracle. Please verify your email address to activate your account and begin your I Ching journey.
              </p>
              <a href="${verifyUrl}" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#c5a059 0%,#a8843f 100%);color:#0a0a0f;font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;border-radius:999px;box-shadow:0 0 24px rgba(197,160,89,0.35);">
                Verify Email
              </a>
              <p style="margin:24px 0 0;font-size:12px;line-height:1.5;color:#6b6780;">
                This link expires in 24 hours. If you did not create an account, you can safely ignore this email.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 28px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
              <p style="margin:16px 0 0;font-size:11px;color:#5a5668;word-break:break-all;">
                Or copy this link:<br />
                <a href="${verifyUrl}" style="color:#c5a059;text-decoration:none;">${verifyUrl}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function sendVerificationEmail(
  email: string,
  token: string,
): Promise<void> {
  const resend = getResendClient();
  if (!resend) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const from = process.env.EMAIL_FROM?.trim() || DEFAULT_FROM;
  const verifyUrl = `${getAppUrl()}/verify-email?token=${encodeURIComponent(token)}`;

  const { error } = await resend.emails.send({
    from,
    to: email,
    subject: "Confirm your I Ching Oracle account",
    html: buildVerificationEmailHtml(verifyUrl),
    text: [
      "Confirm your I Ching Oracle account",
      "",
      "Welcome to the oracle. Please verify your email address to activate your account.",
      "",
      `Verify your email: ${verifyUrl}`,
      "",
      "This link expires in 24 hours.",
    ].join("\n"),
  });

  if (error) {
    console.error("[email] Resend error", error);
    throw new Error(error.message ?? "Failed to send verification email.");
  }
}
