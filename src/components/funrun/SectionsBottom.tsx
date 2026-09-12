import { useState } from "react";
import { Download, Instagram, MessageCircle } from "lucide-react";
import jersey from "@/assets/jersey.png";
import jersey2 from "@/assets/jersey2.png";
import jersey3 from "@/assets/jersey3.png";
import hero17 from "@/assets/hero17.png";
import medal3 from "@/assets/medal3.png";
import totebag from "@/assets/totebag3.png";
import bibs2 from "@/assets/bibs2.png";
import route5k from "@/assets/maps/route-5k.png";
import route25k from "@/assets/maps/route-2-5k.png";
import pkuLogo from "@/assets/pkulogo.png";
import freshLogo from "@/assets/faviconn.png";
import skhRunner from "@/assets/skhrunner.jpg";
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
      img: jersey3,
      label: "Jersey",
      desc: "Bahan dry-fit ringan dengan desain Milad.",
    },
    {
      img: medal3,
      label: "Medal",
      desc: "Medali finisher eksklusif edisi khusus.",
    },
    {
      img: totebag,
      label: "Tote Bag",
      desc: "Tote bag praktis untuk melengkapi race pack.",
    },
    {
      img: bibs2,
      label: "BIB",
      desc: "Nomor peserta resmi untuk digunakan saat race.",
    },
  ];

  return (
    <section
      id="racepack"
      className="relative bg-brand-sky py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* ======================================================
            HEADING
        ====================================================== */}

        <Reveal>
          <div className="mx-auto max-w-3xl text-center">

            <p className="text-xs font-bold tracking-[0.25em] text-brand uppercase">
              Race Pack
            </p>

            <h2 className="mt-3 font-display text-4xl leading-[1.05] text-navy uppercase sm:text-5xl lg:text-6xl">
              Sudah Kebayang
              <br />
              <span className="text-[#F18B1F]">
                Tampil di Garis Start?
              </span>
            </h2>

          </div>
        </Reveal>

        {/* ======================================================
            RACE PACK ITEMS
        ====================================================== */}

        <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">

          {items.map((it, i) => (

            <Reveal
              key={it.label}
              delay={i * 100}
            >

              <div
                className="
                  group
                  h-full
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-brand-light/60
                  bg-background
                  p-4
                  shadow-soft
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-brand-light
                  hover:shadow-lg
                  sm:p-5
                "
              >

                {/* ==================================================
                    IMAGE AREA
                ================================================== */}

                <div
                  className="
                    relative
                    flex
                    min-h-[250px]
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-[1.5rem]
                    border
                    border-brand-light/40
                    bg-[#F5FBDD]
                    p-4
                    sm:min-h-[280px]
                    sm:rounded-3xl
                    sm:p-5
                  "
                >

                  {/* TOP ACCENT */}

                  <div
                    className="
                      absolute
                      inset-x-0
                      top-0
                      h-1
                      bg-[#97D91B]
                    "
                  />

                  {/* SOFT DECORATION */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-10
                      -top-10
                      h-28
                      w-28
                      rounded-full
                      bg-[#97D91B]/10
                      blur-2xl
                    "
                    aria-hidden="true"
                  />

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -bottom-10
                      -left-10
                      h-24
                      w-24
                      rounded-full
                      bg-[#F18B1F]/10
                      blur-2xl
                    "
                    aria-hidden="true"
                  />

                  {/* IMAGE */}

                  <img
                    src={it.img}
                    alt={it.label}
                    width={900}
                    height={900}
                    loading="lazy"
                    className="
                      relative
                      z-10
                      mx-auto
                      h-52
                      w-auto
                      max-w-full
                      object-contain
                      transition-transform
                      duration-500
                      group-hover:scale-105
                      sm:h-60
                      lg:h-64
                    "
                  />

                </div>

                {/* ==================================================
                    CONTENT
                ================================================== */}

                <div className="px-1 pb-1 text-center">

                  <h3
                    className="
                      mt-5
                      font-display
                      text-2xl
                      uppercase
                      text-[#468519]
                      transition-colors
                      duration-300
                      group-hover:text-[#70A916]
                      sm:text-3xl
                    "
                  >
                    {it.label}
                  </h3>

                  <p
                    className="
                      mx-auto
                      mt-2
                      min-h-[48px]
                      max-w-xs
                      text-sm
                      leading-relaxed
                      text-navy/55
                    "
                  >
                    {it.desc}
                  </p>

                  {/* ACCENT */}

                  <div
                    className="
                      mx-auto
                      mt-5
                      h-1
                      w-8
                      rounded-full
                      bg-[#97D91B]
                      transition-all
                      duration-300
                      group-hover:w-14
                    "
                  />

                </div>

              </div>

            </Reveal>
          ))}

        </div>

        {/* ======================================================
            BOTTOM MESSAGE
        ====================================================== */}

        <Reveal delay={400}>
          <div className="mx-auto mt-10 max-w-2xl text-center sm:mt-12">

            <p className="font-display text-xl uppercase text-[#468519] sm:text-2xl lg:text-3xl">
              Finish Strong.
              <span className="text-navy">
                {" "}Wear Your Story.
              </span>
            </p>

            <div className="mx-auto mt-4 flex max-w-xs items-center gap-3">

              <span className="h-px flex-1 bg-[#97D91B]/40" />

              <span className="h-2 w-2 rounded-full bg-[#97D91B]" />

              <span className="h-px flex-1 bg-[#97D91B]/40" />

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

  const facilities = [
    ["💧", "Water Station", "Air minum"],
    ["🚑", "Ambulance", "Siaga medis"],
    ["🏥", "Medical Point", "Pos kesehatan"],
    ["🚻", "Toilet", "Fasilitas peserta"],
    ["🏁", "Finish Area", "Area finish"],
  ];

  return (
    <section
      id="rute"
      className="relative isolate overflow-hidden bg-[#468519] py-20 sm:py-24 lg:py-28"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-30 overflow-hidden">
        <img
          src={hero17}
          alt=""
          width={1920}
          height={1280}
          loading="lazy"
          className="h-full w-full scale-105 object-cover opacity-40"
        />
      </div>

      <div className="absolute inset-0 -z-20 bg-[#468519]/40" />

      <div
        className="absolute left-[-10%] top-[15%] -z-10 h-72 w-72 rounded-full bg-[#97D91B]/10 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="absolute bottom-[-10%] right-[-10%] -z-10 h-80 w-80 rounded-full bg-[#97D91B]/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#468519]/30 via-transparent to-[#97D91B]/10" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">

        {/* HEADER */}
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-[#97D91B]/30 bg-[#97D91B]/15 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#D9F0B8] sm:text-xs">
              Official Race Route
            </span>

            <h2 className="mt-5 font-display text-4xl leading-[1.02] text-white uppercase sm:text-5xl lg:text-6xl">
              Kenali Jalur,
              <br />
              <span className="text-[#D9F0B8]">
                Nikmati Langkahmu.
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
              Kenali rute yang akan kamu lalui dan persiapkan langkah terbaikmu
              menuju garis finish.
            </p>
          </div>
        </Reveal>

        {/* TABS */}
        <Reveal delay={100}>
          <div className="mx-auto mt-8 max-w-sm">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-md">
              <div className="grid grid-cols-2 gap-1.5">
                {tabs.map((t) => {
                  const active = tab === t.id;
                  const orange = t.id === "5k";

                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTab(t.id)}
                      className={`relative rounded-xl px-4 py-2.5 font-display text-lg font-bold uppercase tracking-wide transition-all duration-300 sm:py-3 sm:text-xl ${
                        active
                          ? orange
                            ? "bg-[#F18B1F] text-white shadow-[0_5px_15px_rgba(241,139,31,.25)]"
                            : "bg-[#97D91B] text-white shadow-[0_5px_15px_rgba(151,217,27,.25)]"
                          : "text-white/65 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {t.label}

                      {active && (
                        <span className="absolute bottom-1 left-1/2 h-0.5 w-7 -translate-x-1/2 rounded-full bg-white/80" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        {/* MAIN CARD */}
        <Reveal delay={160}>
          <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-[2rem] border border-white/60 bg-background shadow-[0_20px_60px_rgba(0,0,0,.16)] sm:mt-10 sm:rounded-[2.5rem]">

            {/* CARD HEADER */}
            <div className="flex items-center justify-between border-b border-brand-light/40 px-5 py-4 sm:px-7 sm:py-5">
              <div>
                <span className="text-[9px] font-extrabold tracking-[.2em] text-brand-deep uppercase sm:text-[10px]">
                  Official Race Route
                </span>

                <h3 className="mt-1 font-display text-xl text-navy uppercase sm:text-2xl">
                  Peta & Rundown
                </h3>
              </div>

              <span className="rounded-full bg-[#1492FA]/10 px-3 py-1.5 text-[9px] font-extrabold tracking-wider text-[#1492FA] uppercase sm:px-4 sm:py-2 sm:text-[10px]">
                {tab === "5k" ? "5 KM Route" : "2.5 KM Route"}
              </span>
            </div>

            {/* MAP */}
            <div className="p-2 sm:p-3">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-brand-sky sm:rounded-[1.75rem]">
                {tabs.map((t) => (
                  <img
                    key={t.id}
                    src={t.img}
                    alt={`Rute ${t.label}`}
                    width={1200}
                    height={800}
                    loading="lazy"
                    className={`block w-full transition-all duration-500 ${
                      tab === t.id
                        ? "relative opacity-100"
                        : "absolute inset-0 opacity-0"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* FACILITIES */}
            <div className="border-t border-brand-light/40 px-5 py-5 sm:px-7 sm:py-6">
              <div className="mb-4 flex items-end justify-between gap-3">
                <div>
                  <span className="text-[9px] font-extrabold tracking-[.2em] text-brand-deep uppercase">
                    Route Facilities
                  </span>

                  <p className="mt-1 text-xs text-navy/50 sm:text-sm">
                    Fasilitas yang tersedia selama race.
                  </p>
                </div>

                <span className="hidden rounded-full bg-[#97D91B]/15 px-3 py-1 text-[9px] font-bold text-[#468519] uppercase sm:block">
                  Race Ready
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5 sm:gap-3">
                {facilities.map(([icon, title, desc], i) => (
                  <div
                    key={title}
                    className="group flex items-center gap-2.5 rounded-xl border border-brand-light/30 bg-brand-sky/30 p-2.5 transition-all hover:-translate-y-0.5 hover:bg-[#97D91B]/10 sm:flex-col sm:p-3.5 sm:text-center"
                  >
                    <div
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-base ${
                        i === 1 || i === 4
                          ? "bg-[#F18B1F]/10"
                          : "bg-[#97D91B]/15"
                      }`}
                    >
                      {icon}
                    </div>

                    <div className="min-w-0">
                      <div className="truncate text-[9px] font-extrabold text-navy uppercase sm:text-[10px]">
                        {title}
                      </div>

                      <p className="mt-0.5 text-[9px] text-navy/45 sm:text-[10px]">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RUNDOWN */}
            <div className="border-t border-brand-light/40 bg-[#1492FA]/[0.025] px-5 py-7 sm:px-7 sm:py-8">
              <div className="mb-7 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
                <h3 className="font-display text-2xl text-navy uppercase sm:text-3xl">
                  Rundown{" "}
                  <span className="text-[#F18B1F]">Race Day</span>
                </h3>

                <p className="max-w-sm text-xs leading-relaxed text-navy/50 sm:text-right sm:text-sm">
                  Pastikan hadir tepat waktu dan ikuti setiap rangkaian kegiatan.
                </p>
              </div>

              <div className="relative">
                <span className="absolute bottom-5 left-[17px] top-5 w-0.5 bg-gradient-to-b from-[#F18B1F] via-[#97D91B] to-[#1492FA] sm:left-[24px]" />

                <div className="space-y-3 sm:space-y-4">
                  {rundown.map((r, i) => {
                    const start = r.title.toLowerCase().includes("start");

                    return (
                      <Reveal key={`${r.time}-${r.title}`} delay={i * 40}>
                        <div className="relative pl-10 sm:pl-14">
                          <span
                            className={`absolute left-[9px] top-1/2 z-10 h-4 w-4 -translate-y-1/2 rounded-full border-[3px] border-background sm:left-[17px] ${
                              start
                                ? "bg-[#F18B1F] shadow-[0_0_0_4px_rgba(241,139,31,.15)]"
                                : "bg-[#97D91B]"
                            }`}
                          />

                          <div
                            className={`group relative overflow-hidden rounded-2xl border bg-background transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft ${
                              start
                                ? "border-[#F18B1F]/30 bg-[#FFF9F2]"
                                : "border-brand-light/30"
                            }`}
                          >
                            {start && (
                              <span className="absolute inset-y-0 left-0 w-1 bg-[#F18B1F]" />
                            )}

                            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 p-3 sm:gap-4 sm:p-4">
                              <div
                                className={`flex min-w-[64px] flex-col items-center rounded-xl px-2.5 py-2 sm:min-w-[76px] sm:rounded-2xl sm:px-3 sm:py-2.5 ${
                                  start
                                    ? "bg-[#F18B1F]"
                                    : "bg-[#97D91B]/15"
                                }`}
                              >
                                <span
                                  className={`font-display text-base leading-none tabular-nums sm:text-lg ${
                                    start
                                      ? "text-white"
                                      : "text-[#468519]"
                                  }`}
                                >
                                  {r.time}
                                </span>

                                <span
                                  className={`mt-1 text-[7px] font-bold tracking-wider uppercase ${
                                    start
                                      ? "text-white/70"
                                      : "text-navy/40"
                                  }`}
                                >
                                  WIB
                                </span>
                              </div>

                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h4 className="text-xs font-extrabold text-navy uppercase sm:text-sm">
                                    {r.title}
                                  </h4>

                                  {start && (
                                    <span className="rounded-full bg-[#F18B1F] px-2 py-0.5 text-[7px] font-extrabold tracking-wider text-white uppercase">
                                      Start
                                    </span>
                                  )}
                                </div>

                                <p className="mt-1 text-[9px] leading-relaxed text-navy/50 sm:text-xs">
                                  {r.desc}
                                </p>
                              </div>
                            </div>

                            <span
                              className={`absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full ${
                                start
                                  ? "bg-[#F18B1F]"
                                  : "bg-[#97D91B]"
                              }`}
                            />
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* DAFTAR SEKARANG */}
        <Reveal delay={220}>
          <div className="mx-auto mt-8 w-full max-w-5xl px-1 sm:mt-10 sm:px-0">
            <a
              href={eventInfo.registerUrl?.trim() || "#kategori"}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-center rounded-full bg-[#F18B1F] px-6 py-4.5 font-display text-sm tracking-[0.08em] text-white uppercase shadow-[0_10px_30px_rgba(241,139,31,0.30)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#D97706] hover:shadow-[0_14px_35px_rgba(241,139,31,0.38)] sm:px-10 sm:py-5 sm:text-base"
            >
              <span>Daftar Sekarang</span>
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

export function Rundown() {
  return null;
}

export function HowTo() {
  return null;
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

            <img
              src={freshLogo}
              alt="Logo PKU Muhammadiyah Sukoharjo"
              className="h-11 w-auto shrink-0 object-contain"
            />

            <img
              src={skhRunner}
              alt="Logo PKU Muhammadiyah Sukoharjo"
              className="h-11 w-auto shrink-0 object-contain"
            />
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