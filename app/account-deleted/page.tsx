import Link from "next/link";
import { AuthAmbient } from "@/components/auth-ambient";
import { AuthGlassCard } from "@/components/auth-glass-card";

export const metadata = {
  title: "Account Deleted | ICHING-ORACLE",
  description: "Your I Ching Oracle account has been permanently deleted",
};

export default function AccountDeletedPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-4.5rem)] flex-col items-center justify-center px-6 py-16">
      <AuthAmbient />
      <AuthGlassCard
        title="Account deleted"
        subtitle="Your account has been permanently deleted. Thank you for using I Ching Oracle."
      >
        <div className="space-y-6 text-center">
          <p className="text-sm leading-relaxed text-zen-muted">
            All personal data, reading history, and premium information associated
            with your account have been removed from our systems.
          </p>
          <Link href="/" className="auth-btn-primary inline-block w-full text-center">
            Return to homepage
          </Link>
        </div>
      </AuthGlassCard>
    </div>
  );
}
