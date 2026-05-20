-- AlterTable
ALTER TABLE "Reading" ADD COLUMN "isPremiumReading" BOOLEAN NOT NULL DEFAULT false;

-- Existing rows with AI-generated text (not free preview) were created before gating
UPDATE "Reading"
SET "isPremiumReading" = true
WHERE "interpretation" NOT LIKE '# Premium Interpretation Preview%'
  AND "interpretation" NOT LIKE '# Premium-Interpretation (Vorschau)%'
  AND "interpretation" NOT LIKE '# 高级解读预览%'
  AND "interpretation" NOT LIKE '# Interpretation Temporarily Unavailable%';
