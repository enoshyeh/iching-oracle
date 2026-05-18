import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { handleSignOut } from "@/lib/actions/auth";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Dashboard | ICHING-ORACLE",
  description: "Your I-Ching oracle dashboard",
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      subscriptionStatus: true,
      createdAt: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const displayName = user.name ?? "Seeker";
  const initials = (user.name?.[0] ?? user.email[0]).toUpperCase();

  return (
    <div className="relative mx-auto w-full max-w-4xl px-6 py-12 sm:px-10 sm:py-16">
      <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-cosmic-purple/15 blur-[100px]" aria-hidden />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-amber-gold/10 blur-[90px]" aria-hidden />
      <div className="relative space-y-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-cosmic-violet">
            Dashboard
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            Welcome, {displayName}
          </h1>
          <p className="mt-2 text-zen-muted">
            觀天道以明人事 — your sanctuary for divination awaits.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zen-surface/70 p-8 shadow-[0_0_60px_-20px_rgba(139,92,246,0.4)] backdrop-blur-xl">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            {user.image ? (
              <Image
                src={user.image}
                alt=""
                width={96}
                height={96}
                className="h-24 w-24 rounded-2xl border border-cosmic-purple/40 object-cover shadow-[0_0_32px_-8px_rgba(139,92,246,0.5)]"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-cosmic-purple/40 bg-cosmic-deep/40 text-3xl font-light text-cosmic-violet shadow-[0_0_32px_-8px_rgba(139,92,246,0.5)]">
                {initials}
              </div>
            )}

            <div className="flex-1 space-y-4 text-center sm:text-left">
              <div>
                <p className="text-xs uppercase tracking-widest text-zen-muted">Name</p>
                <p className="text-lg text-foreground">{user.name ?? "—"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-zen-muted">Email</p>
                <p className="text-lg text-foreground">{user.email}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-zen-muted">Plan</p>
                <p className="inline-flex rounded-full border border-amber-gold/30 bg-amber-gold/10 px-3 py-1 text-sm capitalize text-amber-gold">
                  {user.subscriptionStatus ?? "free"}
                </p>
                <p className="mt-1 text-xs text-zen-muted">
                  Stripe subscriptions — coming soon
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 border-t border-white/10 pt-8 sm:justify-start">
            <Link href="/" className="auth-btn-secondary">
              Back to home
            </Link>
            <form action={handleSignOut}>
              <button type="submit" className="auth-btn-primary">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
