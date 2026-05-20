"use client";

import Link from "next/link";
import { useState } from "react";

export function ResendVerificationForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/verify-email/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await res.json()) as { error?: string; message?: string };

      if (!res.ok) {
        setError(data.error ?? "Could not send verification email.");
        return;
      }

      setMessage(
        data.message ??
          "If an account with that email exists and is not yet verified, we have sent a new verification link.",
      );
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="auth-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            placeholder="you@example.com"
          />
        </div>

        {error ? (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        ) : null}

        {message ? (
          <p className="rounded-lg border border-amber-gold/30 bg-amber-gold/10 px-3 py-2 text-sm text-amber-glow">
            {message}
          </p>
        ) : null}

        <button type="submit" disabled={isLoading} className="auth-btn-primary w-full">
          {isLoading ? "Sending…" : "Resend verification email"}
        </button>
      </form>

      <p className="text-center text-sm text-zen-muted">
        <Link
          href="/login"
          className="font-medium text-amber-gold transition-colors hover:text-amber-glow"
        >
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
