import "server-only";

import { sendVerificationEmail } from "@/lib/email";
import {
  generateVerificationToken,
  getVerificationTokenExpiry,
  isVerificationTokenExpired,
} from "@/lib/tokens";
import { prisma } from "@/lib/prisma";

export type VerifyEmailResult =
  | { success: true }
  | { success: false; error: "missing" | "invalid" | "expired" };

export async function verifyEmailToken(
  token: string | null | undefined,
): Promise<VerifyEmailResult> {
  const trimmed = token?.trim();
  if (!trimmed) {
    return { success: false, error: "missing" };
  }

  const user = await prisma.user.findUnique({
    where: { verificationToken: trimmed },
    select: {
      id: true,
      emailVerified: true,
      verificationTokenExpires: true,
    },
  });

  if (!user) {
    return { success: false, error: "invalid" };
  }

  if (user.emailVerified) {
    return { success: true };
  }

  if (isVerificationTokenExpired(user.verificationTokenExpires)) {
    return { success: false, error: "expired" };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(),
      verificationToken: null,
      verificationTokenExpires: null,
    },
  });

  return { success: true };
}

export async function resendVerificationEmail(
  email: string,
): Promise<{ sent: boolean }> {
  const normalizedEmail = email.toLowerCase().trim();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: {
      id: true,
      email: true,
      emailVerified: true,
      password: true,
    },
  });

  // Do not reveal whether the email exists
  if (!user?.password || user.emailVerified) {
    return { sent: true };
  }

  const token = generateVerificationToken();
  const verificationTokenExpires = getVerificationTokenExpiry();

  await prisma.user.update({
    where: { id: user.id },
    data: {
      verificationToken: token,
      verificationTokenExpires,
    },
  });

  try {
    await sendVerificationEmail(user.email, token);
    return { sent: true };
  } catch (error) {
    console.error("[verify-email] Resend failed", error);
    return { sent: false };
  }
}
