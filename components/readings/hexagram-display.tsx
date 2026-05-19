import {
  formatHexagramInline,
  type HexagramRecord,
} from "@/lib/hexagrams";

type HexagramDisplayProps = {
  hexagram: HexagramRecord;
  /** `detail` for reading page; `compact` for dashboard cards */
  variant?: "detail" | "compact";
  showInline?: boolean;
};

export function HexagramDisplay({
  hexagram,
  variant = "detail",
  showInline = true,
}: HexagramDisplayProps) {
  const isDetail = variant === "detail";

  return (
    <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
      <p
        className={
          isDetail
            ? "font-serif text-7xl font-light tabular-nums leading-none text-foreground sm:text-8xl"
            : "font-serif text-4xl font-light tabular-nums leading-none text-amber-gold"
        }
        aria-hidden
      >
        {hexagram.number}
      </p>
      <p
        className={
          isDetail
            ? "mt-2 font-serif text-5xl leading-none text-amber-gold sm:text-6xl"
            : "mt-1 font-serif text-3xl leading-none text-amber-gold"
        }
      >
        {hexagram.chineseName}
      </p>
      <p
        className={
          isDetail
            ? "mt-3 font-serif text-xl font-light text-foreground/90 sm:text-2xl"
            : "mt-1.5 max-w-[8rem] font-serif text-sm font-light leading-snug text-foreground/85"
        }
      >
        {hexagram.title}
      </p>
      {showInline ? (
        <p
          className={
            isDetail
              ? "mt-4 text-xs tracking-wide text-zen-muted"
              : "sr-only"
          }
        >
          {formatHexagramInline(hexagram)}
        </p>
      ) : null}
    </div>
  );
}
