import { useEffect, useState } from "react";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    hari: Math.floor(ms / 86400000),
    jam: Math.floor((ms / 3600000) % 24),
    menit: Math.floor((ms / 60000) % 60),
    detik: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown({ dateISO }: { dateISO: string }) {
  const target = new Date(dateISO).getTime();
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const items = [
    ["HARI", t?.hari],
    ["JAM", t?.jam],
    ["MENIT", t?.menit],
    ["DETIK", t?.detik],
  ] as const;

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4">
      {items.map(([label, value]) => (
        <div
          key={label}
          className="rounded-2xl bg-background/95 px-2 py-4 text-center shadow-soft sm:rounded-3xl sm:px-4 sm:py-6"
        >
          <div className="font-display text-3xl text-brand-deep tabular-nums sm:text-5xl">
            {value === undefined ? "--" : String(value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] font-bold tracking-[0.18em] text-navy/50 sm:text-xs">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}