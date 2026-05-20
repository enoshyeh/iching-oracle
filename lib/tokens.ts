import { randomBytes } from "crypto";

const VERIFICATION_TOKEN_BYTES = 32;
const VERIFICATION_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

/** Cryptographically secure single-use verification token (hex). */
export function generateVerificationToken(): string {
  return randomBytes(VERIFICATION_TOKEN_BYTES).toString("hex");
}

export function getVerificationTokenExpiry(): Date {
  return new Date(Date.now() + VERIFICATION_TOKEN_TTL_MS);
}

export function isVerificationTokenExpired(expires: Date | null | undefined): boolean {
  if (!expires) return true;
  return expires.getTime() <= Date.now();
}
