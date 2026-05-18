/**
 * Centralized Auth.js environment helpers.
 * Use this to avoid misconfiguration on Vercel (wrong AUTH_URL, missing secret, etc.).
 */

export function getAuthSecret(): string | undefined {
  return (
    process.env.AUTH_SECRET?.trim() ||
    process.env.NEXTAUTH_SECRET?.trim() ||
    undefined
  );
}

export function getGoogleOAuthConfig() {
  const clientId =
    process.env.AUTH_GOOGLE_ID?.trim() ||
    process.env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret =
    process.env.AUTH_GOOGLE_SECRET?.trim() ||
    process.env.GOOGLE_CLIENT_SECRET?.trim();

  return {
    clientId,
    clientSecret,
    enabled: Boolean(clientId && clientSecret),
  };
}

export function getAuthUrl(): string | undefined {
  return (
    process.env.AUTH_URL?.trim() || process.env.NEXTAUTH_URL?.trim() || undefined
  );
}

/** Non-secret diagnostics for deployment troubleshooting */
export function getAuthConfigIssues(): string[] {
  const issues: string[] = [];

  if (!getAuthSecret()) {
    issues.push("AUTH_SECRET is not set");
  }

  const authUrl = getAuthUrl();
  if (authUrl) {
    try {
      const parsed = new URL(authUrl);
      if (process.env.VERCEL === "1") {
        if (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") {
          issues.push(
            "AUTH_URL points to localhost on Vercel — remove AUTH_URL or set it to your live domain (e.g. https://www.ichingoracle.de)",
          );
        }
        if (parsed.protocol !== "https:") {
          issues.push("AUTH_URL must use https:// in production on Vercel");
        }
      }
    } catch {
      issues.push("AUTH_URL is not a valid URL");
    }
  } else if (process.env.VERCEL === "1") {
    issues.push(
      "AUTH_URL is not set on Vercel — recommended: https://www.ichingoracle.de (must match the domain users visit)",
    );
  }

  const google = getGoogleOAuthConfig();
  if (!google.enabled) {
    issues.push(
      "Google OAuth is disabled (set AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET)",
    );
  }

  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (process.env.VERCEL === "1") {
    if (!databaseUrl) {
      issues.push("DATABASE_URL is not set on Vercel");
    } else if (databaseUrl.startsWith("file:")) {
      issues.push(
        "DATABASE_URL uses SQLite (file:) — use PostgreSQL on Vercel for OAuth sign-in",
      );
    }
  }

  return issues;
}
