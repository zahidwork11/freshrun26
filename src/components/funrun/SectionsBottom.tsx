import { useState } from "react";
import { Download, Instagram, MessageCircle } from "lucide-react";
import jersey from "@/assets/jersey.png";
import jersey2 from "@/assets/jersey2.png";
import hero17 from "@/assets/hero17.png";
import medal from "@/assets/medal2.png";
import totebag from "@/assets/totebag.png";
import bib from "@/assets/bib.png";
import route5k from "@/assets/maps/route-5k.png";
import route25k from "@/assets/maps/route-2-5k.png";
import pkuLogo from "@/assets/pkulogo.png";
import { Reveal } from "./Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { eventInfo, faqs, navItems, rundown, mainSponsor,  sponsors, steps } from "@/data/event";

export function RacePack() {
  const items = [
    {
      img: jersey2,
      label: "Jersey",
      desc: "Bahan dry-fit ringan dengan desain Milad.",
    },
    {
      img: medal,
      label: "Medal",
      desc: "Medali finisher eksklusif edisi khusus.",
    },
    {
      img: totebag,
      label: "Tote Bag",
      desc: "Tote bag praktis untuk melengkapi race pack.",
    },
    {
      img: bib,
      label: "BIB",
      desc: "Nomor peserta resmi untuk digunakan saat race.",
    },
  ];

  return (
    <section id="racepack" className="relative isolate overflow-hidden bg-[#468519] py-20 sm:py-24 lg:py-28">
      {/* HERO 17 BACKGROUND */}
      <div className="absolute inset-0 -z-30 overflow-hidden">
        <img src={hero17} alt="" width={1920} height={1280} loading="lazy" className="h-full w-full scale-105 object-cover opacity-40" />
      </div>

      {/* GREEN OVERLAY */}
      <div className="absolute inset-0 -z-20 bg-[#468519]/65" aria-hidden="true" />

      {/* SOFT GREEN LIGHT */}
      <div className="absolute left-[-10%] top-[15%] -z-10 h-72 w-72 rounded-full bg-[#97D91B]/10 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-[-10%] right-[-10%] -z-10 h-80 w-80 rounded-full bg-[#97D91B]/10 blur-3xl" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* HEADING */}
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-[#97D91B]/30 bg-[#97D91B]/15 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#D9F0B8] sm:text-xs">
              Race Pack
            </span>

            <h2 className="mt-4 font-display text-4xl uppercase leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              Sudah Kebayang
              <br />
              <span className="text-[#D9F0B8]">Tampil di Garis Start?</span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
              Lengkapi persiapanmu dan nikmati race pack eksklusif untuk menemani langkahmu sampai garis finish.
            </p>
          </div>
        </Reveal>

        {/* RACE PACK ITEMS */}
        <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {items.map((it, i) => (
            <Reveal key={it.label} delay={i * 100}>
              <div className="group h-full overflow-hidden rounded-[2rem] border border-[#97D91B]/25 bg-white p-4 shadow-[0_12px_35px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-2 hover:border-[#97D91B]/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.18)] sm:p-5">
                {/* IMAGE AREA */}
                <div className="relative flex min-h-[250px] items-center justify-center overflow-hidden rounded-[1.5rem] border border-[#97D91B]/15 bg-[#F5FBDD] p-4 sm:min-h-[280px] sm:rounded-3xl sm:p-5">
                  <div className="absolute inset-x-0 top-0 h-1 bg-[#97D91B]" />

                  <img
                    src={it.img}
                    alt={it.label}
                    width={900}
                    height={900}
                    loading="lazy"
                    className="relative z-10 mx-auto h-52 w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105 sm:h-60 lg:h-64"
                  />
                </div>

                {/* CONTENT */}
                <div className="px-1 pb-1 text-center">
                  <h3 className="mt-5 font-display text-2xl uppercase text-[#468519] transition-colors duration-300 group-hover:text-[#70A916] sm:text-3xl">
                    {it.label}
                  </h3>

                  <p className="mx-auto mt-2 min-h-[48px] max-w-xs text-sm leading-relaxed text-[#468519]/65">
                    {it.desc}
                  </p>

                  <div className="mx-auto mt-5 h-1 w-8 rounded-full bg-[#97D91B] transition-all duration-300 group-hover:w-14" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* BOTTOM MESSAGE */}
        <Reveal delay={400}>
          <div className="mx-auto mt-10 max-w-2xl text-center sm:mt-12">
            <p className="font-display text-xl uppercase text-[#D9F0B8] sm:text-2xl lg:text-3xl">
              Finish Strong.
              <span className="text-white">{" "}Wear Your Story.</span>
            </p>

            <div className="mx-auto mt-4 flex max-w-xs items-center gap-3">
              <span className="h-px flex-1 bg-[#97D91B]/30" />
              <span className="h-2 w-2 rounded-full bg-[#97D91B]" />
              <span className="h-px flex-1 bg-[#97D91B]/30" />
            </div>
          </div>
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
    <section id="rute" className="relative overflow-hidden bg-brand-sky pb-8 pt-20 sm:pb-10 sm:pt-24 lg:pb-12 lg:pt-28">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">

        {/* HEADING */}
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-background px-4 py-2 text-[10px] font-extrabold tracking-[0.22em] text-brand-deep uppercase shadow-soft sm:text-xs">
              Race Route
            </span>

            <h2 className="mt-5 font-display text-4xl leading-[1.05] text-navy uppercase sm:text-5xl lg:text-6xl">
              Kenali Jalurmu,
              <br />
              <span className="text-brand-deep">Nikmati Setiap Langkah.</span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-navy/65 sm:text-base">
              Kenali rute yang akan kamu lewati sebelum race dimulai.
              Pilih jarak dan siapkan langkah terbaikmu menuju garis finish.
            </p>
          </div>
        </Reveal>

        {/* ROUTE SELECTOR */}
        <Reveal delay={100}>
          <div className="mx-auto mt-9 max-w-sm">
            <div className="rounded-2xl border border-brand-light/50 bg-background p-1.5 shadow-soft">
              <div className="grid grid-cols-2 gap-1.5">
                {tabs.map((t) => {
                  const isActive = tab === t.id;

                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTab(t.id)}
                      className={`relative rounded-xl px-4 py-3 font-display text-sm tracking-wide uppercase transition-all duration-300 sm:py-3.5 ${
                        isActive
                          ? "bg-brand text-primary-foreground shadow-soft"
                          : "text-navy/55 hover:bg-brand-sky hover:text-brand-deep"
                      }`}
                    >
                      {t.label}

                      {isActive && (
                        <span className="absolute bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-white/80" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ROUTE MAP CARD */}
        <Reveal delay={160}>
          <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-[2rem] border border-brand-light/50 bg-background shadow-soft transition-shadow duration-300 hover:shadow-lift sm:mt-10">

            {/* CARD HEADER */}
            <div className="flex items-center justify-between gap-4 border-b border-brand-light/40 px-5 py-4 sm:px-7 sm:py-5">
              <div className="min-w-0">
                <span className="block text-[9px] font-extrabold tracking-[0.2em] text-brand-deep uppercase sm:text-[10px]">
                  Route Map
                </span>

                <h3 className="mt-1 font-display text-lg text-navy uppercase sm:text-xl">
                  Peta Rute Lari
                </h3>
              </div>

              <span className="shrink-0 rounded-full bg-brand-sky px-3 py-1.5 text-[9px] font-extrabold tracking-wider text-brand-deep uppercase sm:px-4 sm:py-2 sm:text-[10px]">
                Rute Resmi
              </span>
            </div>

            {/* ROUTE IMAGE */}
            <div className="bg-background p-2 sm:p-3">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-brand-sky sm:rounded-[1.75rem]">
                {tabs.map((t) => (
                  <img
                    key={t.id}
                    src={t.img}
                    alt={`Rute ${t.label}`}
                    width={1200}
                    height={800}
                    loading="lazy"
                    className={`block w-full transition-opacity duration-500 ${
                      tab === t.id
                        ? "relative opacity-100"
                        : "absolute inset-0 opacity-0"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* ROUTE FACILITIES */}
            <div className="border-t border-brand-light/40 px-5 py-5 sm:px-7 sm:py-6">
              <div className="mb-4 text-center sm:text-left">
                <span className="text-[9px] font-extrabold tracking-[0.2em] text-brand-deep uppercase sm:text-[10px]">
                  Fasilitas Rute
                </span>

                <p className="mt-1 text-xs text-navy/55 sm:text-sm">
                  Fasilitas yang tersedia selama perjalanan.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-5">

                {/* Water Station */}
                <div className="flex items-center gap-3 sm:flex-col sm:justify-center sm:text-center">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-sky text-lg">
                    💧
                  </div>

                  <div className="min-w-0">
                    <div className="text-[10px] font-extrabold text-navy uppercase sm:text-xs">
                      Water Station
                    </div>

                    <p className="mt-0.5 text-[10px] text-navy/50 sm:text-xs">
                      Air minum
                    </p>
                  </div>
                </div>

                {/* Ambulance */}
                <div className="flex items-center gap-3 sm:flex-col sm:justify-center sm:text-center">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-sky text-lg">
                    🚑
                  </div>

                  <div className="min-w-0">
                    <div className="text-[10px] font-extrabold text-navy uppercase sm:text-xs">
                      Ambulance
                    </div>

                    <p className="mt-0.5 text-[10px] text-navy/50 sm:text-xs">
                      Siaga medis
                    </p>
                  </div>
                </div>

                {/* Medical Point */}
                <div className="flex items-center gap-3 sm:flex-col sm:justify-center sm:text-center">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-light/20 text-lg">
                    🏥
                  </div>

                  <div className="min-w-0">
                    <div className="text-[10px] font-extrabold text-navy uppercase sm:text-xs">
                      Medical Point
                    </div>

                    <p className="mt-0.5 text-[10px] text-navy/50 sm:text-xs">
                      Pos kesehatan
                    </p>
                  </div>
                </div>

                {/* Toilet */}
                <div className="flex items-center gap-3 sm:flex-col sm:justify-center sm:text-center">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-sky text-lg">
                    🚻
                  </div>

                  <div className="min-w-0">
                    <div className="text-[10px] font-extrabold text-navy uppercase sm:text-xs">
                      Toilet
                    </div>

                    <p className="mt-0.5 text-[10px] text-navy/50 sm:text-xs">
                      Fasilitas peserta
                    </p>
                  </div>
                </div>

                {/* Finish Area */}
                <div className="flex items-center gap-3 sm:flex-col sm:justify-center sm:text-center">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/15 text-lg">
                    🏁
                  </div>

                  <div className="min-w-0">
                    <div className="text-[10px] font-extrabold text-navy uppercase sm:text-xs">
                      Finish Area
                    </div>

                    <p className="mt-0.5 text-[10px] text-navy/50 sm:text-xs">
                      Area finish
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

export function Rundown() {
  return (
    <section id="rundown" className="relative overflow-hidden bg-brand-sky pb-20 pt-8 sm:pb-24 sm:pt-10 lg:pb-28 lg:pt-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">

        {/* HEADING */}
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mt-5 font-display text-4xl leading-[1.05] text-navy uppercase sm:text-5xl lg:text-6xl">
              RUNDOWN
              <br />
              <span className="text-brand-deep">PKU FRESH RUN</span>
            </h2>
          </div>
        </Reveal>

        {/* TIMELINE */}
        <div className="relative mt-12 sm:mt-14">

          {/* Timeline line */}
          <span className="absolute bottom-6 left-[18px] top-6 w-0.5 bg-brand-light sm:left-[27px]" />

          <div className="space-y-4 sm:space-y-5">
            {rundown.map((r, i) => {
              const isStart = r.title.toLowerCase().includes("start");

              return (
                <Reveal key={`${r.time}-${r.title}`} delay={i * 60}>
                  <div className="relative pl-12 sm:pl-16">

                    {/* TIMELINE DOT */}
                    <span
                      className={`absolute left-[9px] top-1/2 z-10 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border-4 border-brand-sky sm:left-[18px] ${
                        isStart
                          ? "bg-brand shadow-[0_0_0_5px_rgba(151,217,27,0.15)]"
                          : "bg-brand-light"
                      }`}
                    />

                    {/* CARD */}
                    <div
                      className={`group relative overflow-hidden rounded-2xl bg-background shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift sm:rounded-3xl ${
                        isStart ? "ring-2 ring-brand/25" : ""
                      }`}
                    >
                      {/* Start accent */}
                      {isStart && (
                        <div className="absolute inset-y-0 left-0 w-1 bg-brand" />
                      )}

                      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 p-4 sm:gap-5 sm:p-5 lg:p-6">

                        {/* TIME */}
                        <div
                          className={`flex min-w-[68px] flex-col items-center justify-center rounded-xl px-3 py-2.5 sm:min-w-[82px] sm:rounded-2xl sm:px-4 sm:py-3 ${
                            isStart
                              ? "bg-brand text-primary-foreground"
                              : "bg-brand-sky"
                          }`}
                        >
                          <span
                            className={`font-display text-lg leading-none tabular-nums sm:text-xl ${
                              isStart
                                ? "text-primary-foreground"
                                : "text-brand-deep"
                            }`}
                          >
                            {r.time}
                          </span>

                          <span
                            className={`mt-1 text-[8px] font-bold tracking-wider uppercase ${
                              isStart
                                ? "text-primary-foreground/75"
                                : "text-navy/45"
                            }`}
                          >
                            WIB
                          </span>
                        </div>

                        {/* CONTENT */}
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="min-w-0 font-bold text-navy uppercase sm:text-base">
                              {r.title}
                            </h3>

                            {isStart && (
                              <span className="shrink-0 rounded-full bg-brand px-2.5 py-1 text-[8px] font-extrabold tracking-wider text-primary-foreground uppercase">
                                Start
                              </span>
                            )}
                          </div>

                          <p className="mt-1 text-xs leading-relaxed text-navy/60 sm:text-sm">
                            {r.desc}
                          </p>
                        </div>
                      </div>

                      {/* Hover accent */}
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

export function HowTo() {
  return (
    <section
      id="cara-daftar"
      className="relative overflow-hidden bg-[#F18B1F]/90 py-20 lg:py-28"
    >
      {/* Decorative Background */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-black/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* =====================================================
            HEADING
        ===================================================== */}
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-4xl text-white uppercase sm:text-5xl lg:text-6xl">
              5 Langkah Menuju Garis Start.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              Ikuti langkah pendaftaran berikut dan bersiap menjadi bagian
              dari PKU Muhammadiyah Sukoharjo Fun Run.
            </p>
          </div>
        </Reveal>

        {/* =====================================================
            MAIN CARD
        ===================================================== */}
        <Reveal delay={100}>
          <div className="mt-12 rounded-[2rem] border border-white/40 bg-white/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:p-8 lg:p-10">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
              {steps.map((s, i) => (
                <div
                  key={s.no}
                  className="relative flex flex-col items-center text-center lg:px-5"
                >
                  {/* Connecting Line */}
                  {i < steps.length - 1 && (
                    <div className="absolute left-[calc(50%+32px)] top-8 hidden h-[2px] w-[calc(100%-64px)] rounded-full bg-[#F18B1F]/25 lg:block" />
                  )}

                  {/* Step Number */}
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#F18B1F]/70 bg-[#FFF3E8]/80">
                    <span className="font-display text-2xl text-[#F18B1F]">
                      {s.no}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="mt-5 font-display text-lg text-navy uppercase sm:text-xl">
                    {s.title}
                  </h3>

                  <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-navy/60">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* =====================================================
            BUTTONS
        ===================================================== */}
        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href={eventInfo.pdfUrl}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-white/95 px-7 py-3.5 font-display text-sm tracking-wide text-[#F18B1F] uppercase shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white"
            >
              <Download className="h-4 w-4" />
              Download PDF Tata Cara Daftar
            </a>

            <a
              href={eventInfo.registerUrl}
              className="rounded-full border-2 border-white/70 bg-[#D96F0F]/90 px-8 py-3.5 font-display text-sm tracking-wide text-white uppercase shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#C9630D]/95 hover:shadow-md"
            >
              Daftar Sekarang
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MarqueeRow({
  dir,
  speed,
}: {
  dir: "left" | "right";
  speed: number;
}) {
  const items = [...sponsors, ...sponsors];

  return (
    <div className="w-full overflow-hidden">
      <div
        className={`flex w-max shrink-0 items-center gap-3 ${
          dir === "left" ? "marquee-left" : "marquee-right"
        }`}
        style={
          {
            "--marquee-duration": `${speed}s`,
          } as React.CSSProperties
        }
      >
        {items.map((sponsor, index) => (
          <div
            key={`${sponsor.name}-${index}`}
            className="
              flex h-20 w-40 shrink-0
              items-center justify-center
              rounded-xl
              border border-white/60
              bg-white
              px-5 py-4
              shadow-sm
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-md
              sm:h-24 sm:w-52
            "
          >
            <img
              src={sponsor.logo}
              alt={`Logo ${sponsor.name}`}
              className="max-h-12 max-w-[85%] object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Sponsors() {
  return (
    <section
      id="sponsor"
      className="overflow-hidden bg-brand-sky py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-center font-display text-4xl uppercase text-navy sm:text-5xl lg:text-6xl">
            Bersama Mereka,
            <br />
            Langkah Kita Lebih Berarti.
          </h2>
        </Reveal>

        {/* MAIN SPONSOR */}
        <Reveal>
          <div className="mt-12 flex flex-col items-center">
            <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.25em] text-navy/60">
              Main Sponsor
            </p>

            <div
              className="
                flex
                h-36 w-80
                items-center justify-center
                rounded-2xl
                border-2 border-white
                bg-white
                px-8 py-6
                shadow-lg
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-xl
                sm:h-44 sm:w-[28rem]
              "
            >
              <img
                src={mainSponsor.logo}
                alt={`Main Sponsor ${mainSponsor.name}`}
                className="
                  max-h-28
                  max-w-[90%]
                  object-contain
                  sm:max-h-32
                "
              />
            </div>
          </div>
        </Reveal>
      </div>

      {/* SPONSOR LAINNYA */}
      <div className="mt-16 space-y-4">
        <MarqueeRow
          dir="left"
          speed={38}
        />

        <MarqueeRow
          dir="right"
          speed={46}
        />

        <MarqueeRow
          dir="left"
          speed={54}
        />
      </div>
    </section>
  );
}

export function FinalCTA() {
  return null;
}

export function Faq() {
  return (
    <section id="faq" className="bg-[#F18B1F]/90 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center">
            <span className="inline-flex items-center rounded-full border border-white/30 bg-white/15 px-4 py-2 text-[10px] font-extrabold tracking-[0.22em] text-white uppercase sm:text-xs">
              FAQ
            </span>

            <h2 className="mt-4 font-display text-4xl text-white uppercase sm:text-5xl lg:text-6xl">
              Masih Punya Pertanyaan?
            </h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <Accordion type="single" collapsible className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="overflow-hidden rounded-2xl border border-white/20 bg-white px-5 shadow-[0_8px_25px_rgba(120,55,0,0.15)] transition-all duration-300 data-[state=open]:border-white/50"
              >
                <AccordionTrigger className="text-left text-sm font-bold text-[#8A3D06] hover:no-underline sm:text-base">
                  {f.q}
                </AccordionTrigger>

                <AccordionContent className="text-sm leading-relaxed text-[#8A3D06]/70">
                  {f.a}
                </AccordionContent>
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
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">

        {/* BRAND */}
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center gap-3">
            <img
              src={pkuLogo}
              alt="Logo PKU Muhammadiyah Sukoharjo"
              className="h-11 w-auto shrink-0 object-contain"
            />

            <span className="font-display text-lg uppercase">
              PKU FRESH RUN
            </span>
          </div>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/70">
            PKU FRESH RUN, Your Run, Your Health Start.
          </p>

          {/* SOCIAL BUTTONS */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">

            {/* INSTAGRAM */}
            <a
              href={eventInfo.instagram}
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-xs font-bold text-white uppercase shadow-[0_6px_20px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:shadow-[0_8px_24px_rgba(221,42,123,0.3)]"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-white/20">
                <Instagram className="h-4 w-4" />
              </span>
              Instagram
            </a>

            {/* WHATSAPP */}
            <a
              href={eventInfo.whatsapp}
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-xs font-bold text-white uppercase shadow-[0_6px_20px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-[#25D366] hover:shadow-[0_8px_24px_rgba(37,211,102,0.3)]"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-white/20">
                <MessageCircle className="h-4 w-4" />
              </span>
              WhatsApp
            </a>

          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
          {navItems.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* COPYRIGHT */}
        <p className="mt-12 border-t border-white/10 pt-6 text-xs text-primary-foreground/60">
          © 2026 RS PKU Muhammadiyah Sukoharjo Fun Run.
        </p>

      </div>
    </footer>
  );
}