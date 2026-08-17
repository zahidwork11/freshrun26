import { useEffect, useState } from "react";
import { CalendarDays, Clock, MapPin, Sparkles, Trophy, Flag } from "lucide-react";
import heroAsset from "@/assets/header.jpg.asset.json";
import prizeAsset from "@/assets/doorprice.png.asset.json";
import { Reveal } from "./Reveal";
import { Countdown } from "./Countdown";
import { categories, eventInfo, podium } from "@/data/event";

export function Hero() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(Math.min(window.scrollY * 0.18, 120));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <img
          src={heroAsset.url}
          alt="Peserta fun run PKU Muhammadiyah Sukoharjo"
          width={1920}
          height={1280}
          className="h-[115%] w-full object-cover"
          style={{ transform: `translateY(-${offset}px)` }}
        />
      </div>
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-sky/90 via-transparent to-navy/50" />

      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 w-full opacity-30"
        viewBox="0 0 1200 300"
        fill="none"
        aria-hidden
      >
        <path d="M-50 220 C 250 120, 450 300, 750 180 S 1150 60, 1300 140" stroke="white" strokeWidth="3" />
        <path d="M-50 260 C 300 180, 500 330, 800 230 S 1150 120, 1300 200" stroke="white" strokeWidth="2" opacity="0.6" />
      </svg>

      <div className="mx-auto max-w-7xl px-4 pt-32 pb-20 sm:px-6 lg:pt-44 lg:pb-28">
        <Reveal>
          <span className="inline-flex max-w-full items-center gap-2 rounded-full bg-background/95 px-4 py-2 text-[11px] font-extrabold tracking-[0.16em] uppercase shadow-lift ring-1 ring-white/60 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-brand" />
            <span className="text-navy">Dalam Rangka</span>
            <span className="text-brand-deep">Milad RS PKU Muhammadiyah Sukoharjo</span>
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] text-primary-foreground uppercase drop-shadow-sm sm:text-7xl lg:text-8xl">
            <span className="text-brand-sky">Rayakan</span>{" "}
            <span className="bg-gradient-to-r from-white via-brand-sky to-brand-cyan bg-clip-text text-transparent">
              Milad,
            </span>
            <br />
            Langkahkan <span className="text-brand-cyan">Semangat!</span>
          </h1>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-5 max-w-xl text-base font-medium text-primary-foreground/90 sm:text-lg">
            Satu langkah untuk <span className="font-bold text-brand-cyan">sehat</span>, satu
            langkah untuk <span className="font-bold text-brand-sky">kebersamaan</span>.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:max-w-4xl lg:grid-cols-4">
            {[
              { icon: Flag, cap: "Kategori", label: eventInfo.distances, hot: true },
              { icon: CalendarDays, cap: "Tanggal", label: eventInfo.dateLabel },
              { icon: MapPin, cap: "Lokasi", label: eventInfo.location },
              { icon: Clock, cap: "Start", label: eventInfo.startTime },
            ].map(({ icon: Icon, cap, label, hot }) => (
              <div
                key={label}
                className={`flex min-w-0 items-center gap-3 rounded-2xl px-4 py-3 shadow-lift ring-1 backdrop-blur transition-transform hover:-translate-y-1 ${
                  hot
                    ? "gradient-brand ring-white/50"
                    : "bg-background/95 ring-brand-light/60"
                }`}
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                    hot ? "bg-white/25" : "bg-brand-sky"
                  }`}
                >
                  <Icon
                    className={`h-4.5 w-4.5 ${hot ? "text-primary-foreground" : "text-brand"}`}
                  />
                </span>
                <span className="min-w-0">
                  <span
                    className={`block text-[10px] font-bold tracking-[0.2em] uppercase ${
                      hot ? "text-primary-foreground/80" : "text-brand"
                    }`}
                  >
                    {cap}
                  </span>
                  <span
                    className={`block truncate font-display text-sm tracking-wide uppercase ${
                      hot ? "text-primary-foreground" : "text-navy"
                    }`}
                  >
                    {label}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={340}>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={eventInfo.registerUrl}
              className="rounded-full bg-background px-8 py-4 font-display text-sm tracking-wide text-brand-deep uppercase shadow-lift transition-transform hover:scale-105"
            >
              Daftar Sekarang
            </a>
            <a
              href="#kategori"
              className="rounded-full border-2 border-white/70 px-8 py-4 font-display text-sm tracking-wide text-primary-foreground uppercase transition-colors hover:bg-white/15"
            >
              Lihat Kategori
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function RaceInfo() {
  const info = [
    { label: "Jarak", value: "5K & 2.5K" },
    { label: "Start", value: eventInfo.startTime },
    { label: "Lokasi", value: eventInfo.location },
    { label: "Momen", value: "Milad RS PKU" },
  ];

  return (
    <section id="race" className="relative bg-brand-sky py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="text-center text-xs font-bold tracking-[0.25em] text-brand uppercase">
            Race Info
          </p>
          <h2 className="mx-auto mt-3 max-w-3xl text-center font-display text-4xl text-navy uppercase sm:text-5xl lg:text-6xl">
            Waktunya Tinggal Menghitung Hari!
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <Countdown dateISO={eventInfo.dateISO} />
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {info.map((i) => (
              <div
                key={i.label}
                className="rounded-3xl border border-brand-light/60 bg-background p-6 shadow-soft transition-transform hover:-translate-y-1"
              >
                <div className="text-[11px] font-bold tracking-[0.2em] text-brand uppercase">
                  {i.label}
                </div>
                <div className="mt-2 font-display text-2xl text-navy uppercase">{i.value}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={240}>
          <p id="tentang" className="mx-auto mt-12 max-w-2xl text-center font-display text-2xl text-brand-deep sm:text-3xl">
            “Bukan sekadar lomba. Ini tentang bergerak bersama.”
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function TotalPrize() {
  const chips = [
    "Podium Putra",
    "Podium Putri",
    "10 Finisher Berikutnya",
    "Doorprize",
    "Special Prize",
  ];

  return (
    <section id="hadiah" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-center font-display text-4xl text-navy uppercase sm:text-5xl lg:text-6xl">
            Lari Dapat Sehat,
            <br />
            Pulang Bawa Hadiah!
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-10 max-w-md rounded-[2rem] gradient-brand px-8 py-8 text-center shadow-lift">
            <div className="text-xs font-bold tracking-[0.25em] text-primary-foreground/80 uppercase">
              Total Hadiah
            </div>
            <div className="mt-2 font-display text-4xl text-primary-foreground sm:text-5xl">
              {eventInfo.totalPrize}
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-10 overflow-hidden rounded-[2rem] border border-brand-light/50 bg-brand-sky shadow-soft">
            <img
              src={prizeAsset.url}
              alt="Koleksi hadiah fun run: sepeda, jam tangan, kulkas, elektronik, dan doorprize"
              width={1280}
              height={860}
              loading="lazy"
              className="w-full transition-transform duration-700 hover:scale-105"
            />
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 text-center font-display text-xl text-brand-deep sm:text-2xl">
            Dan masih banyak kejutan menarik lainnya!
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {chips.map((c) => (
              <span
                key={c}
                className="rounded-full bg-brand-sky px-4 py-2 text-xs font-bold tracking-wide text-brand-deep uppercase"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PodiumCard({ title, list }: { title: string; list: typeof podium.putra }) {
  return (
    <div className="rounded-[2rem] border border-brand-light/50 bg-background p-6 shadow-soft sm:p-8">
      <div className="flex items-center gap-2">
        <Trophy className="h-5 w-5 shrink-0 text-brand" />
        <h3 className="font-display text-2xl text-navy uppercase">{title}</h3>
      </div>
      <ul className="mt-5 space-y-3">
        {list.map((p) => (
          <li
            key={p.place}
            className="flex items-center justify-between gap-3 rounded-2xl bg-brand-sky px-4 py-3 transition-transform hover:translate-x-1"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="text-xl">{p.medal}</span>
              <span className="truncate text-sm font-bold text-navy">{p.place}</span>
            </span>
            <span className="shrink-0 font-display text-lg text-brand-deep">{p.prize}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Podium() {
  return (
    <section className="bg-brand-sky py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-center font-display text-4xl text-navy uppercase sm:text-5xl lg:text-6xl">
            Siap Jadi yang Tercepat?
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Reveal delay={80}>
            <PodiumCard title="Putra" list={podium.putra} />
          </Reveal>
          <Reveal delay={160}>
            <PodiumCard title="Putri" list={podium.putri} />
          </Reveal>
        </div>
        <Reveal delay={220}>
          <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-[2rem] gradient-brand px-6 py-7 shadow-lift sm:flex sm:justify-between sm:px-10">
            <div className="min-w-0">
              <div className="font-display text-2xl text-primary-foreground uppercase sm:text-3xl">
                10 Finisher Berikutnya
              </div>
              <p className="mt-1 text-sm text-primary-foreground/85">Finisher #4–#13</p>
            </div>
            <div className="shrink-0 rounded-2xl bg-background/95 px-5 py-3 text-center font-display text-lg text-brand-deep">
              Rp100.000<span className="text-xs">/orang</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const toneClass: Record<string, string> = {
  bright: "bg-brand text-primary-foreground",
  sky: "bg-brand-sky text-navy",
  deep: "bg-brand-deep text-primary-foreground",
  cyan: "bg-brand-cyan text-navy",
  light: "bg-brand-light text-navy",
  navy: "bg-navy text-primary-foreground",
};

export function Categories() {
  return (
    <section id="kategori" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-center font-display text-4xl text-navy uppercase sm:text-5xl lg:text-6xl">
            Pilih Kategori,
            <br />
            Siapkan Langkahmu.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 70}>
              <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-brand-light/50 bg-background shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-lift">
                <header className={`px-6 py-5 ${toneClass[c.tone]}`}>
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                    <h3 className="min-w-0 font-display text-xl uppercase">{c.name}</h3>
                    {c.note && (
                      <span className="shrink-0 rounded-full bg-background/90 px-3 py-1 text-[10px] font-bold tracking-widest text-brand-deep uppercase">
                        {c.note}
                      </span>
                    )}
                  </div>
                </header>
                <div className="flex flex-1 flex-col p-6">
                  <div className="font-display text-3xl text-navy">{c.price}</div>
                  <ul className="mt-4 space-y-2 text-sm text-navy/75">
                    {c.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  {c.requirement && (
                    <p className="mt-4 rounded-xl bg-brand-sky px-3 py-2 text-xs font-semibold text-brand-deep">
                      Persyaratan: {c.requirement}
                    </p>
                  )}
                  <a
                    href={`${eventInfo.registerUrl}?category=${c.slug}`}
                    className="mt-6 rounded-full gradient-brand px-5 py-3 text-center font-display text-sm tracking-wide text-primary-foreground uppercase transition-transform hover:scale-[1.03]"
                  >
                    Daftar
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}