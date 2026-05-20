-- AlterTable
ALTER TABLE "User" ADD COLUMN "preferredLanguage" TEXT NOT NULL DEFAULT 'de';

-- AlterTable
ALTER TABLE "Reading" ADD COLUMN "language" TEXT NOT NULL DEFAULT 'de';

-- Migrate legacy language preferences to German (German-first market)
UPDATE "User"
SET "preferredLanguage" = 'de'
WHERE "preferredLanguage" IS NULL
   OR "preferredLanguage" IN ('zh-TW', 'zh-Hant', 'ja', 'ja-JP');
