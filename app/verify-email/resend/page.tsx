import { AuthAmbient } from "@/components/auth-ambient";
import { AuthGlassCard } from "@/components/auth-glass-card";
import { ResendVerificationForm } from "@/components/resend-verification-form";

export const metadata = {
  title: "Resend Verification | ICHING-ORACLE",
  description: "Request a new email verification link",
};

export default function ResendVerificationPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-4.5rem)] flex-col items-center justify-center px-6 py-16">
      <AuthAmbient />
      <AuthGlassCard
        title="Resend verification"
        subtitle="Enter your email to receive a new verification link (valid for 24 hours)."
      >
        <ResendVerificationForm />
      </AuthGlassCard>
    </div>
  );
}
