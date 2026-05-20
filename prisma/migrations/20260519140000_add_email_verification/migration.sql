-- AlterTable
ALTER TABLE "User" ADD COLUMN "verificationToken" TEXT;
ALTER TABLE "User" ADD COLUMN "verificationTokenExpires" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "User_verificationToken_key" ON "User"("verificationToken");

-- Grandfather existing password users (registered before email verification)
UPDATE "User"
SET "emailVerified" = NOW()
WHERE "password" IS NOT NULL
  AND "emailVerified" IS NULL;
