"use client";

import { signOut } from "next-auth/react";
import { useRef, useState, useTransition } from "react";
import { deleteAccount } from "@/lib/actions/delete-account";

type DeleteAccountButtonProps = {
  userEmail: string;
};

export function DeleteAccountButton({ userEmail }: DeleteAccountButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const normalizedEmail = userEmail.trim().toLowerCase();
  const canDelete =
    confirmation.trim().toLowerCase() === normalizedEmail && !isPending;

  function openDialog() {
    setConfirmation("");
    setError(null);
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    if (!isPending) {
      dialogRef.current?.close();
    }
  }

  function handleConfirm() {
    if (!canDelete) return;

    startTransition(async () => {
      setError(null);
      const result = await deleteAccount();

      if (result?.error || !result?.success) {
        setError(result?.error ?? "Failed to delete account. Please try again.");
        return;
      }

      dialogRef.current?.close();
      await signOut({ callbackUrl: "/" });
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-300 transition-colors hover:border-red-400/70 hover:bg-red-500/20 hover:text-red-200"
      >
        Delete account
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setConfirmation("")}
        className="w-[calc(100%-2rem)] max-w-md rounded-2xl border border-red-500/30 bg-zen-surface p-0 text-foreground shadow-[0_0_48px_-12px_rgba(239,68,68,0.35)] backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <form
          method="dialog"
          onSubmit={(e) => {
            e.preventDefault();
            handleConfirm();
          }}
          className="p-6 sm:p-8"
        >
          <h3 className="font-serif text-xl font-semibold text-red-300">
            Delete account permanently?
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-zen-muted">
            Are you sure you want to permanently delete your account? This action
            cannot be undone. All of your readings and premium data will be
            permanently removed.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zen-muted">
            To permanently delete your account, please type your email address
            exactly as shown below.
          </p>
          <p className="mt-2 rounded-lg border border-red-500/25 bg-red-950/30 px-3 py-2 font-mono text-sm text-red-200">
            {userEmail}
          </p>

          <label
            htmlFor="delete-confirm-email"
            className="mt-5 block text-xs font-medium uppercase tracking-widest text-zen-muted"
          >
            Confirm your email
          </label>
          <input
            id="delete-confirm-email"
            type="email"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            autoComplete="off"
            disabled={isPending}
            className="auth-input mt-2 border-red-500/30 focus:border-red-400/50 focus:ring-red-400/30"
            placeholder={userEmail}
            aria-describedby="delete-email-hint"
          />
          <p id="delete-email-hint" className="sr-only">
            Type {userEmail} exactly to enable deletion.
          </p>

          {error ? (
            <p
              className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300"
              role="alert"
            >
              {error}
            </p>
          ) : null}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={closeDialog}
              disabled={isPending}
              className="auth-btn-secondary disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canDelete}
              className="rounded-lg border border-red-500 bg-red-600/90 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isPending ? "Deleting…" : "Delete my account"}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
