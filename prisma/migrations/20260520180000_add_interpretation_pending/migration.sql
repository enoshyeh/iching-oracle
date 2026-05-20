-- Track readings awaiting AI interpretation regeneration
ALTER TABLE "Reading" ADD COLUMN "interpretationPending" BOOLEAN NOT NULL DEFAULT false;
