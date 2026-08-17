import { useState } from "react";
import { Download, Instagram, MessageCircle } from "lucide-react";
import jersey from "@/assets/jersey.png";
import medal from "@/assets/medal.png";
import route5k from "@/assets/maps/route-5k.png";
import route25k from "@/assets/maps/route-2-5k.png";
import { Reveal } from "./Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { eventInfo, faqs, navItems, rundown, sponsors, steps } from "@/data/event";

export function RacePack() {
  const items = [
    { img: jersey, label: "Jersey", desc: "Bahan dry-fit ringan dengan desain Milad." },
    { img: medal, label: "Medal", desc: "Medali finisher eksklusif edisi khusus." },
  ];

  return (
    <section id="racepack" className="bg-brand-sky py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-center font-display text-4xl text-navy uppercase sm:text-5xl lg:text-6xl">
            Sudah Kebayang Tampil di Garis Start?
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {items.map((it, i) => (
            <Reveal key={it.label} delay={i * 100}>
              <div className="group h-full overflow-hidden rounded-[2rem] bg-background p-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-lift">
                <div className="overflow-hidden rounded-3xl bg-brand-sky/70 p-6">
                  <img
                    src={it.img}
                    alt={it.label}
                    width={900}
                    height={900}
                    loading="lazy"
                    className="mx-auto h-64 w-auto object-contain transition-transform duration-500 group-hover:scale-110 sm:h-72"
                  />
                </div>
                <h3 className="mt-6 font-display text-2xl text-navy uppercase">{it.label}</h3>
                <p className="mt-2 text-sm text-navy/70">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={180}>
          <p className="mt-10 text-center font-display text-2xl text-brand-deep uppercase sm:text-3xl">
            Finish Strong. Wear Your Story.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function RouteMap() {
  const [tab, setTab] = useState<"5k" | "2.5k">("5k");
  const tabs = [
    { id: "5k" as const, label: "5 KM", img: route5k },
    { id: "2.5k" as const, label: "2.5 KM", img: route25k },
  ];

  return (
    <section id="rute" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-center font-display text-4xl text-navy uppercase sm:text-5xl lg:text-6xl">
            Kenali Jalurmu,
            <br />
            Nikmati Setiap Langkah.
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-8 flex w-fit gap-1 rounded-full bg-brand-sky p-1.5">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-full px-6 py-2.5 font-display text-sm tracking-wide uppercase transition-all ${
                  tab === t.id
                    ? "gradient-brand text-primary-foreground shadow-soft"
                    : "text-navy/60 hover:text-brand-deep"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="relative mt-8 overflow-hidden rounded-[2rem] border border-brand-light/50 shadow-soft">
            {tabs.map((t) => (
              <img
                key={t.id}
                src={t.img}
                alt={`Rute ${t.label}`}
                width={1200}
                height={800}
                loading="lazy"
                className={`w-full transition-opacity duration-500 ${
                  tab === t.id ? "opacity-100" : "absolute inset-0 opacity-0"
                }`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Rundown() {
  return (
    <section id="rundown" className="bg-brand-sky py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-center font-display text-4xl text-navy uppercase sm:text-5xl lg:text-6xl">
            Satu Hari. Banyak Cerita.
          </h2>
        </Reveal>
        <div className="relative mt-12 pl-6 sm:pl-10">
          <span className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-brand-light sm:left-[27px]" />
          <div className="space-y-4">
            {rundown.map((r, i) => (
              <Reveal key={r.time} delay={i * 60}>
                <div className="relative grid grid-cols-[minmax(0,1fr)] gap-1 rounded-2xl bg-background p-5 shadow-soft transition-transform hover:translate-x-1 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:gap-5">
                  <span className="absolute top-1/2 -left-[23px] h-3.5 w-3.5 -translate-y-1/2 rounded-full border-4 border-brand-sky bg-brand sm:-left-[43px]" />
                  <span className="font-display text-xl text-brand-deep tabular-nums">{r.time}</span>
                  <span className="min-w-0">
                    <span className="block font-bold text-navy uppercase">{r.title}</span>
                    <span className="block text-sm text-navy/65">{r.desc}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowTo() {
  return (
    <section id="cara-daftar" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-center font-display text-4xl text-navy uppercase sm:text-5xl lg:text-6xl">
            5 Langkah Menuju Garis Start.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.no} delay={i * 70}>
              <div className="h-full rounded-[1.75rem] border border-brand-light/50 bg-background p-6 shadow-soft transition-all hover:-translate-y-2 hover:shadow-lift">
                <span className="font-display text-4xl text-brand-light">{s.no}</span>
                <h3 className="mt-2 font-display text-xl text-navy uppercase">{s.title}</h3>
                <p className="mt-2 text-sm text-navy/70">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href={eventInfo.pdfUrl}
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand px-7 py-3.5 font-display text-sm tracking-wide text-brand-deep uppercase transition-colors hover:bg-brand-sky"
            >
              <Download className="h-4 w-4" /> Download PDF Tata Cara Daftar
            </a>
            <a
              href={eventInfo.registerUrl}
              className="rounded-full gradient-brand px-8 py-3.5 font-display text-sm tracking-wide text-primary-foreground uppercase shadow-soft transition-transform hover:scale-105"
            >
              Daftar Sekarang
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MarqueeRow({ dir, speed }: { dir: "left" | "right"; speed: number }) {
  const row = [...sponsors, ...sponsors];
  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max gap-4 ${dir === "left" ? "marquee-left" : "marquee-right"}`}
        style={{ ["--marquee-duration" as string]: `${speed}s` }}
      >
        {row.map((s, i) => (
          <div
            key={`${s}-${i}`}
            className="grid h-20 w-44 shrink-0 place-items-center rounded-2xl border border-brand-light/50 bg-background px-4 opacity-45 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
          >
            <span className="text-center font-display text-sm tracking-wide text-brand-deep uppercase">
              {s}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Sponsors() {
  return (
    <section id="sponsor" className="overflow-hidden bg-brand-sky py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-center font-display text-4xl text-navy uppercase sm:text-5xl lg:text-6xl">
            Bersama Mereka,
            <br />
            Langkah Kita Lebih Berarti.
          </h2>
        </Reveal>
      </div>
      <div className="mt-12 space-y-4">
        <MarqueeRow dir="left" speed={38} />
        <MarqueeRow dir="right" speed={46} />
        <MarqueeRow dir="left" speed={54} />
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden gradient-brand py-24 lg:py-32">
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20" viewBox="0 0 1200 400" fill="none" aria-hidden>
        <path d="M-50 300 C 250 200, 450 380, 750 260 S 1150 140, 1300 220" stroke="white" strokeWidth="3" />
        <path d="M-50 340 C 300 260, 500 410, 800 310 S 1150 200, 1300 280" stroke="white" strokeWidth="2" />
      </svg>
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="font-display text-4xl text-primary-foreground uppercase sm:text-5xl lg:text-6xl">
            Bukan Sekadar Berlari.
            <br />
            Kita Rayakan Milad Bersama.
          </h2>
          <a
            href={eventInfo.registerUrl}
            className="mt-10 inline-block rounded-full bg-background px-10 py-4 font-display text-sm tracking-wide text-brand-deep uppercase shadow-lift transition-transform hover:scale-105"
          >
            Daftar Sekarang
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-center font-display text-4xl text-navy uppercase sm:text-5xl lg:text-6xl">
            Masih Punya Pertanyaan?
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <Accordion type="single" collapsible className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="overflow-hidden rounded-2xl border border-brand-light/60 bg-brand-sky/50 px-5"
              >
                <AccordionTrigger className="text-left text-sm font-bold text-navy hover:no-underline sm:text-base">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-navy/70">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy py-16 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl gradient-brand font-display text-lg">
                PKU
              </span>
              <span className="min-w-0 font-display text-lg uppercase">
                PKU Muhammadiyah Sukoharjo
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm text-primary-foreground/70">
              Sehat Bersama, Bergerak Bersama, Menginspirasi Sesama.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={eventInfo.instagram}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase transition-colors hover:bg-white/20"
              >
                <Instagram className="h-4 w-4" /> Instagram
              </a>
              <a
                href={eventInfo.whatsapp}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase transition-colors hover:bg-white/20"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
          <nav className="grid grid-cols-2 gap-2 text-sm">
            {navItems.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="truncate text-primary-foreground/70 transition-colors hover:text-primary-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
        <p className="mt-12 border-t border-white/10 pt-6 text-xs text-primary-foreground/60">
          © 2026 RS PKU Muhammadiyah Sukoharjo Fun Run.
        </p>
      </div>
    </footer>
  );
}