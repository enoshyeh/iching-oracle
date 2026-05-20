import Link from "next/link";
import { AuthAmbient } from "@/components/auth-ambient";
import { AuthGlassCard } from "@/components/auth-glass-card";
import { verifyEmailToken } from "@/lib/auth/verify-email";

type PageProps = {
  searchParams: Promise<{ token?: string }>;
};

export const metadata = {
  title: "Verify Email | ICHING-ORACLE",
  description: "Confirm your I Ching Oracle account email",
};

export default async function VerifyEmailPage({ searchParams }: PageProps) {
  const { token } = await searchParams;
  const result = await verifyEmailToken(token);

  if (result.success) {
    return (
      <div className="relative flex min-h-[calc(100vh-4.5rem)] flex-col items-center justify-center px-6 py-16">
        <AuthAmbient />
        <AuthGlassCard
          title="Email verified"
          subtitle="Your account is now active. You may sign in and consult the oracle."
        >
          <div className="space-y-6 text-center">
            <p className="rounded-lg border border-amber-gold/30 bg-amber-gold/10 px-4 py-3 text-sm text-amber-glow">
              Email verified successfully!
            </p>
            <Link href="/login" className="auth-btn-primary inline-block w-full text-center">
              Sign In
            </Link>
          </div>
        </AuthGlassCard>
      </div>
    );
  }

  const errorMessages = {
    missing: "No verification token was provided.",
    invalid: "This verification link is invalid or has already been used.",
    expired: "This verification link has expired.",
  } as const;

  const message = errorMessages[result.error];

  return (
    <div className="relative flex min-h-[calc(100vh-4.5rem)] flex-col items-center justify-center px-6 py-16">
      <AuthAmbient />
      <AuthGlassCard
        title="Verification failed"
        subtitle={message}
      >
        <div className="space-y-4 text-center">
          <p className="text-sm text-zen-muted">
            Request a new verification email if your link has expired.
          </p>
          <Link
            href="/verify-email/resend"
            className="auth-btn-secondary inline-block w-full text-center"
          >
            Resend verification email
          </Link>
          <Link
            href="/login"
            className="block text-sm text-amber-gold transition-colors hover:text-amber-glow"
          >
            Back to sign in
          </Link>
        </div>
      </AuthGlassCard>
    </div>
  );
}
