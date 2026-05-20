import { InterpretationPendingNotice } from "@/components/readings/interpretation-pending-notice";
import { PricingCard } from "@/components/PricingCard";
import {
  getInterpretationPreview,
  hasPremiumAccess,
  isPremiumInterpretationPreview,
  type PremiumUserFields,
} from "@/lib/premium";

type PremiumInterpretationProps = {
  user: PremiumUserFields;
  interpretation: string;
  readingId: string;
  isLegacyReading?: boolean;
  interpretationPending?: boolean;
  isPremiumReading?: boolean;
};

export function PremiumInterpretation({
  user,
  interpretation,
  readingId,
  isLegacyReading = false,
  interpretationPending = false,
  isPremiumReading = false,
}: PremiumInterpretationProps) {
  const isPremium = hasPremiumAccess(user);
  const isFreePlaceholder =
    isPremiumInterpretationPreview(interpretation) || !isPremiumReading;

  if (isPremium) {
    return (
      <div className="mt-3 space-y-3">
        {interpretationPending ? <InterpretationPendingNotice /> : null}
        <div className="whitespace-pre-wrap text-base leading-relaxed text-foreground/90">
          {interpretation}
        </div>
      </div>
    );
  }

  if (isFreePlaceholder) {
    return (
      <div className="mt-3 space-y-6">
        <div className="whitespace-pre-wrap text-base leading-relaxed text-foreground/90">
          {interpretation}
        </div>
        <p className="text-sm text-zen-muted">
          Upgrade to Premium to unlock your full AI-powered I Ching
          interpretation — changing lines, transformed hexagram, and
          personalized guidance.
        </p>
        <PricingCard hexagramId={readingId} compact />
      </div>
    );
  }

  return (
    <div className="mt-3 space-y-6">
      {interpretationPending ? <InterpretationPendingNotice /> : null}
      {isLegacyReading ? (
        <p className="rounded-lg border border-amber-gold/30 bg-amber-gold/10 px-3 py-2 text-sm text-amber-glow">
          This reading was saved before AI interpretation was enabled. Unlock
          premium to consult again with full guidance.
        </p>
      ) : (
        <div className="relative">
          <div className="whitespace-pre-wrap text-base leading-relaxed text-foreground/90">
            {getInterpretationPreview(interpretation)}
          </div>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zen-surface to-transparent"
            aria-hidden
          />
        </div>
      )}
      <p className="text-sm text-zen-muted">
        Unlock the complete oracle interpretation — including changing lines,
        transformed hexagram, and personalized guidance for your question.
      </p>
      <PricingCard hexagramId={readingId} compact />
    </div>
  );
}
