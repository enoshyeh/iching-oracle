import { getAuthConfigIssues, getAuthUrl, getGoogleOAuthConfig } from "@/lib/auth-env";

/**
 * Deployment diagnostic — does not expose secrets.
 * Visit /api/auth/status on Vercel to verify env configuration.
 */
export async function GET() {
  const authUrl = getAuthUrl();
  let authUrlHost: string | null = null;

  if (authUrl) {
    try {
      authUrlHost = new URL(authUrl).host;
    } catch {
      authUrlHost = "invalid";
    }
  }

  const google = getGoogleOAuthConfig();
  const issues = getAuthConfigIssues();

  return Response.json({
    ok: issues.length === 0,
    issues,
    googleEnabled: google.enabled,
    hasAuthSecret: Boolean(
      process.env.AUTH_SECRET?.trim() || process.env.NEXTAUTH_SECRET?.trim(),
    ),
    authUrlHost,
    vercel: process.env.VERCEL === "1",
    nodeEnv: process.env.NODE_ENV,
  });
}
