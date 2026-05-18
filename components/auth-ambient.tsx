export function AuthAmbient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-cosmic-purple/20 blur-[120px] animate-pulse-glow" />
      <div className="absolute -right-16 bottom-1/4 h-80 w-80 rounded-full bg-amber-gold/10 blur-[100px] animate-pulse-glow [animation-delay:2s]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(139,92,246,0.35) 0%, transparent 45%),
            radial-gradient(circle at 80% 70%, rgba(197,160,89,0.2) 0%, transparent 40%)`,
        }}
      />
    </div>
  );
}
