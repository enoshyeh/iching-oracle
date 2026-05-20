"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

export type DeleteAccountResult = {
  error?: string;
  success?: boolean;
};

/**
 * Permanently delete the authenticated user's account and all cascaded data.
 * Only the current session user may be deleted — no client-supplied user ID.
 */
export async function deleteAccount(): Promise<DeleteAccountResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "You must be signed in to delete your account." };
  }

  const userId = session.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, stripeCustomerId: true },
    });

    if (!user) {
      return { error: "Account not found." };
    }

    if (user.stripeCustomerId && process.env.STRIPE_SECRET_KEY?.trim()) {
      try {
        await getStripe().customers.del(user.stripeCustomerId);
        console.log("[delete-account] Stripe customer removed:", user.stripeCustomerId);
      } catch (stripeError) {
        console.error("[delete-account] Stripe customer cleanup failed", stripeError);
      }
    }

    await prisma.user.delete({ where: { id: userId } });

    console.log("[delete-account] User permanently deleted:", userId);

    return { success: true };
  } catch (error) {
    console.error("[delete-account]", error);
    return { error: "Failed to delete account. Please try again." };
  }
}
