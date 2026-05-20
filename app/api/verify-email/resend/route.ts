import { NextResponse } from "next/server";
import { resendVerificationEmail } from "@/lib/auth/verify-email";
import { z } from "zod";

const resendSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = resendSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid email" },
        { status: 400 },
      );
    }

    const result = await resendVerificationEmail(parsed.data.email);

    if (!result.sent) {
      return NextResponse.json(
        { error: "Could not send verification email. Please try again later." },
        { status: 503 },
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "If an account with that email exists and is not yet verified, we have sent a new verification link.",
    });
  } catch (error) {
    console.error("[verify-email/resend]", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
