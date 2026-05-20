import { CredentialsSignin } from "next-auth";

export class UnverifiedEmailError extends CredentialsSignin {
  code = "unverified_email";
}
