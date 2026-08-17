import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { eventInfo, navItems } from "@/data/event";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-background/90 shadow-soft backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:py-4">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl gradient-brand font-display text-lg text-primary-foreground">
            PKU
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-sm tracking-wide text-navy uppercase sm:text-base">
              PKU Muhammadiyah Sukoharjo
            </span>
            <span className="block truncate text-[11px] font-semibold text-brand uppercase">
              Fun Run 2026
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-[13px] font-semibold text-navy/75 transition-colors hover:bg-brand-sky hover:text-brand-deep"
            >
              {item.label}
            </a>
          ))}
          <a
            href={eventInfo.registerUrl}
            className="ml-2 rounded-full gradient-brand px-5 py-2.5 text-[13px] font-bold tracking-wide text-primary-foreground uppercase shadow-soft transition-transform hover:scale-105"
          >
            Daftar Sekarang
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-border bg-background text-navy xl:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 xl:hidden ${
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-sm font-semibold text-navy/80 transition-colors hover:bg-brand-sky"
            >
              {item.label}
            </a>
          ))}
          <a
            href={eventInfo.registerUrl}
            className="mt-2 rounded-full gradient-brand px-5 py-3 text-center text-sm font-bold tracking-wide text-primary-foreground uppercase"
          >
            Daftar Sekarang
          </a>
        </nav>
      </div>
    </header>
  );
}