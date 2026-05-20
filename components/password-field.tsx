"use client";

import { useId, useState } from "react";

type PasswordFieldProps = {
  id?: string;
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: "new-password" | "current-password";
  placeholder?: string;
  disabled?: boolean;
  describedBy?: string;
};

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden
      >
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M3 3l18 18" />
      <path d="M10.58 10.58A3 3 0 0 0 12 15a3 3 0 0 0 2.42-4.42" />
      <path d="M9.88 5.1A10.94 10.94 0 0 1 12 5c6.5 0 10 7 10 7a18.45 18.45 0 0 1-4.06 5.06" />
      <path d="M6.61 6.61A18.48 18.48 0 0 0 2 12s3.5 7 10 7a10.94 10.94 0 0 0 2.12-.26" />
    </svg>
  );
}

export function PasswordField({
  id: idProp,
  label,
  name,
  value,
  onChange,
  autoComplete = "new-password",
  placeholder,
  disabled = false,
  describedBy,
}: PasswordFieldProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="auth-label">
        {label}
      </label>
      <div className="relative mt-0">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          aria-describedby={describedBy}
          className="auth-input pr-11"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          disabled={disabled}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zen-muted transition-colors hover:text-amber-gold disabled:opacity-50"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          <EyeIcon open={visible} />
        </button>
      </div>
    </div>
  );
}
