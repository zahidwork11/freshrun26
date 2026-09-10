import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/event";
import pkuLogo from "@/assets/pkulogo.png";
import pkuLogo2 from "@/assets/pkulogo2.png";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-background/90 shadow-soft backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      {/* =========================
          DESKTOP / MAIN NAVBAR
      ========================== */}

      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:py-4">
        {/* LOGO */}

        <a
          href="#top"
          className="flex min-w-0 items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <img
            src={pkuLogo}
            alt="Logo RS PKU Muhammadiyah Sukoharjo"
            className="h-12 w-12 shrink-0 object-contain"
          />

          <img
            src={pkuLogo2}
            alt="Logo RS PKU Muhammadiyah Sukoharjo"
            className="h-12 w-12 shrink-0 object-contain"
          />

          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-sm tracking-wide text-[#0A5490] uppercase sm:text-base">
              PKU FRESH RUN
            </span>

            <span className="block truncate text-[11px] font-semibold text-[#000000] uppercase">
              SUKOHARJO
            </span>
          </span>
        </a>

        {/* DESKTOP MENU */}

        <nav className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-[13px] font-semibold text-navy/75 transition-all duration-200 hover:bg-brand-sky hover:text-brand-deep"
            >
              {item.label}
            </a>
          ))}

          {/* CEK PENDAFTARAN */}

          <a
            href="/cek"
            className="ml-2 rounded-full gradient-brand px-5 py-2.5 text-[13px] font-bold tracking-wide text-primary-foreground uppercase shadow-soft transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            Unduh E-Tiket
          </a>
        </nav>

        {/* MOBILE MENU BUTTON */}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-border bg-background text-navy transition-all duration-200 hover:bg-brand-sky xl:hidden"
        >
          {open ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* =========================
          MOBILE MENU
      ========================== */}

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
              className="rounded-xl px-3 py-3 text-sm font-semibold text-navy/80 transition-all duration-200 hover:bg-brand-sky hover:text-brand-deep"
            >
              {item.label}
            </a>
          ))}

          {/* MOBILE CEK PENDAFTARAN */}

          <a
            href="/cek"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full gradient-brand px-5 py-3 text-center text-sm font-bold tracking-wide text-primary-foreground uppercase shadow-soft transition-all duration-200 hover:shadow-lg"
          >
            Unduh E-Tiket
          </a>
        </nav>
      </div>
    </header>
  );
}