import { useEffect, useState } from "react";
import {
  CalendarDays,
  MapPin,
  Trophy,
  Flag,
  Clock3,
} from "lucide-react";

import prizeAsset from "@/assets/doorprice.png";
import { Reveal } from "./Reveal";
import { Countdown } from "./Countdown";
import { categories, eventInfo, podium } from "@/data/event";

import hero22 from "@/assets/hero22.png";
import hero31 from "@/assets/hero31.png";

import { Link } from "@tanstack/react-router";

// ============================================================
// HERO
// ============================================================

export function Hero() {
  const [offset, setOffset] = useState(0);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // ==========================================================
  // EARLY BIRD DATA
  // ==========================================================

  const earlyBirdCategories = categories.filter(
    (c) => c.note === "EARLY BIRD" && c.enabled
  );

  const earlyBirdRegistered = earlyBirdCategories.reduce(
    (sum, c) => sum + (c.registered ?? 0),
    0
  );

  const earlyBirdQuota = earlyBirdCategories.reduce(
    (sum, c) => sum + (c.quota ?? 0),
    0
  );

  const earlyBirdRemaining = Math.max(
    earlyBirdQuota - earlyBirdRegistered,
    0
  );

  const earlyBirdProgress =
    earlyBirdQuota > 0
      ? Math.min(
          (earlyBirdRegistered / earlyBirdQuota) * 100,
          100
        )
      : 0;

  // ==========================================================
  // LINK PENDAFTARAN
  // ==========================================================

  const registerUrl =
    eventInfo.registerUrl?.trim() || "#kategori";

  // ==========================================================
  // COUNTDOWN
  // ==========================================================

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(
        eventInfo.earlyBirdEndISO
      ).getTime();

      const difference = Math.max(
        target - Date.now(),
        0
      );

      setTimeLeft({
        days: Math.floor(
          difference / 86400000
        ),
        hours: Math.floor(
          (difference / 3600000) % 24
        ),
        minutes: Math.floor(
          (difference / 60000) % 60
        ),
        seconds: Math.floor(
          (difference / 1000) % 60
        ),
      });
    };

    calculateTimeLeft();

    const interval = window.setInterval(
      calculateTimeLeft,
      1000
    );

    return () => window.clearInterval(interval);
  }, []);

  // ==========================================================
  // PARALLAX
  // ==========================================================

  useEffect(() => {
    const onScroll = () => {
      setOffset(
        window.innerWidth >= 1024
          ? Math.min(window.scrollY * 0.18, 120)
          : 0
      );
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  // ==========================================================
  // FORMAT TIME
  // ==========================================================

  const formatTime = (value: number) =>
    String(value).padStart(2, "0");

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden"
    >
      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 -z-30 overflow-hidden">
        <img
          src={hero22}
          alt="Peserta fun run PKU Muhammadiyah Sukoharjo"
          width={1920}
          height={1280}
          className="h-[115%] w-full scale-105 object-cover blur-[0.5px]"
          style={{
            transform: `translateY(${-70 + offset}px)`,
          }}
        />
      </div>

      <div
        className="absolute inset-0 -z-20 bg-[#0A5490]/15"
        aria-hidden="true"
      />

      <div
        className="absolute inset-x-0 top-0 -z-10 h-[55%] bg-gradient-to-b from-[#062D50]/75 via-[#0A5490]/45 to-transparent"
        aria-hidden="true"
      />

      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-[55%] bg-gradient-to-t from-[#062D50]/70 via-[#0A5490]/35 to-transparent"
        aria-hidden="true"
      />

      <div
        className="absolute left-[-10%] top-[20%] -z-10 h-72 w-72 rounded-full bg-[#1492FA]/20 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="absolute bottom-[5%] right-[-10%] -z-10 h-80 w-80 rounded-full bg-[#1492FA]/20 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0A5490]/20 via-transparent to-[#1492FA]/20"
        aria-hidden="true"
      />

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:pb-28 lg:pt-44">

        {/* BADGE */}

        <Reveal>
          <div className="mx-auto flex w-fit max-w-full items-center justify-center rounded-full border border-white/35 bg-[#F18B1F]/90 px-4 py-2.5 text-center shadow-[0_8px_30px_rgba(6,45,80,0.3)] backdrop-blur-md sm:mx-0 sm:px-5 sm:py-3 lg:mx-auto">
            <span className="text-[10px] font-bold tracking-[0.12em] text-white sm:text-xs sm:tracking-[0.15em]">
              Milad RS PKU Muhammadiyah Sukoharjo
            </span>
          </div>
        </Reveal>

        {/* HEADING */}

        <Reveal delay={100}>
          <h1 className="mx-auto mt-6 max-w-4xl text-center font-display text-5xl leading-[0.95] tracking-tight text-white uppercase drop-shadow-[0_1px_4px_rgba(255,255,255,0.22)] sm:mx-0 sm:text-left sm:text-7xl lg:mx-auto lg:text-center lg:text-8xl">
            <span>Rayakan</span>{" "}
            <span className="text-[#97D91B]">
              Milad,
            </span>
            <br />
            <span>Langkahkan</span>{" "}
            <span className="text-[#97D91B]">
              Semangat!
            </span>
          </h1>
        </Reveal>

        {/* DESCRIPTION */}

        <Reveal delay={180}>
          <p className="mx-auto mt-5 max-w-xl text-center text-base font-bold leading-relaxed text-white drop-shadow-[0_0_3px_rgba(255,255,255,1)] drop-shadow-[0_2px_10px_rgba(255,255,255,0.9)] sm:mx-0 sm:text-left sm:text-lg lg:mx-auto lg:text-center">
            PKU FRESH RUN,
            <br />
            Your Run, Your Health Start
          </p>
        </Reveal>

        {/* EVENT INFO */}

        <Reveal delay={260}>
          <div className="mx-auto mt-7 grid max-w-3xl gap-3 sm:mx-0 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:mx-auto">

            {/* KATEGORI */}

            <div className="group rounded-2xl border border-white/35 bg-white/5 p-3.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/10 sm:rounded-3xl sm:p-5">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/30 bg-white/10 sm:h-12 sm:w-12 sm:rounded-2xl">
                  <Flag className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                </div>

                <div className="min-w-0 text-left">
                  <p className="text-[9px] font-bold tracking-[0.18em] text-white/70 uppercase sm:text-[10px] sm:tracking-[0.22em]">
                    Kategori Event
                  </p>

                  <p className="mt-0.5 font-display text-base tracking-wide text-white uppercase sm:mt-1 sm:text-xl">
                    {eventInfo.distances}
                  </p>
                </div>
              </div>
            </div>

            {/* TANGGAL */}

            <div className="group rounded-2xl border border-white/35 bg-white/5 p-3.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/10 sm:rounded-3xl sm:p-5">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/30 bg-white/10 sm:h-12 sm:w-12 sm:rounded-2xl">
                  <CalendarDays className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                </div>

                <div className="min-w-0 text-left">
                  <p className="text-[9px] font-bold tracking-[0.18em] text-white/70 uppercase sm:text-[10px] sm:tracking-[0.22em]">
                    Tanggal Event
                  </p>

                  <p className="mt-0.5 font-display text-base tracking-wide text-white uppercase sm:mt-1 sm:text-xl">
                    {eventInfo.dateLabel}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </Reveal>

        {/* ====================================================
            EARLY BIRD
        ==================================================== */}

        <Reveal delay={300}>
          <div className="mx-auto mt-4 w-full max-w-3xl overflow-hidden rounded-2xl border-2 border-[#F18B1F] shadow-[0_14px_40px_rgba(6,45,80,0.25)] sm:mt-5 sm:rounded-3xl">

            <div className="relative overflow-hidden bg-gradient-to-br from-[#063A67] via-[#0A5490] to-[#F18B1F]">

              {/* DIAGONAL STRIPES */}

              <div
                className="pointer-events-none absolute inset-0 opacity-[0.13]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, transparent 0px, transparent 14px, #ffffff 14px, #ffffff 18px, transparent 18px, transparent 32px)",
                }}
              />

              {/* LIGHT */}

              <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-[#1492FA]/30 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-[#F59A38]/35 blur-3xl" />

              {/* CONTENT */}

              <div className="relative px-4 py-6 text-center sm:px-8 sm:py-8">

                {/* TITLE */}

                <h3 className="font-display text-3xl leading-none tracking-tight text-white uppercase drop-shadow-[0_3px_8px_rgba(0,0,0,.25)] sm:text-5xl lg:text-6xl">
                  EARLY BIRD
                </h3>

                {/* PRICE */}

                <div className="mt-4 flex items-center justify-center gap-3 sm:mt-5 sm:gap-4">

                  {/* NORMAL PRICE */}

                  <span className="font-display text-xl font-extrabold tracking-wide text-white/80 line-through decoration-[3px] decoration-white/90 underline-offset-2 sm:text-2xl lg:text-3xl">
                    Rp. 160.000
                  </span>

                  {/* PROMO PRICE */}

                  <span className="relative rounded-full border-2 border-[#97D91B] bg-gradient-to-r from-[#E8F8C8] via-[#B8E94E] to-[#76C457] px-4 py-2 font-display text-base font-extrabold tracking-wide text-[#28600F] shadow-[0_6px_20px_rgba(151,217,27,.40)] transition-transform duration-300 hover:scale-105 sm:px-6 sm:py-2.5 sm:text-xl lg:text-2xl">

                    Rp. 123.456

                    {/* PROMO BADGE */}

                    <span className="absolute -right-2.5 -top-3 rounded-full bg-[#F18B1F] px-2 py-0.5 text-[7px] font-extrabold tracking-wider text-white uppercase shadow-md sm:-right-3 sm:-top-3 sm:px-2.5 sm:text-[9px]">
                      PROMO
                    </span>

                  </span>

                </div>

                {/* COUNTDOWN */}

                <div className="mx-auto mt-5 w-full max-w-sm overflow-hidden rounded-xl border border-white/30 bg-white/95 shadow-[0_8px_25px_rgba(0,0,0,.18)] sm:mt-6 sm:rounded-2xl">

                  {/* COUNTDOWN HEADER */}

                  <div className="border-b border-[#0A5490]/10 px-3 py-2 sm:px-5 sm:py-2.5">
                    <p className="text-[7px] font-extrabold tracking-[0.2em] text-[#0A5490]/60 uppercase sm:text-[9px]">
                      EARLY BIRD BERAKHIR DALAM
                    </p>
                  </div>

                  {/* COUNTDOWN VALUES */}

                  <div className="flex items-center justify-center px-2 py-2.5 sm:px-5 sm:py-3.5">

                    {[
                      ["days", "Hari"],
                      ["hours", "Jam"],
                      ["minutes", "Menit"],
                      ["seconds", "Detik"],
                    ].map(([key, label], index) => (

                      <div
                        key={key}
                        className="flex items-center"
                      >

                        <div className="min-w-[48px] text-center sm:min-w-[65px]">

                          <p
                            className={`font-display text-xl leading-none sm:text-3xl ${
                              key === "seconds"
                                ? "text-[#D94A16]"
                                : "text-[#0A5490]"
                            }`}
                          >
                            {formatTime(
                              timeLeft[
                                key as keyof typeof timeLeft
                              ]
                            )}
                          </p>

                          <p
                            className={`mt-1 text-[6px] font-bold tracking-[0.12em] uppercase sm:text-[8px] ${
                              key === "seconds"
                                ? "text-[#D94A16]/60"
                                : "text-[#0A5490]/50"
                            }`}
                          >
                            {label}
                          </p>

                        </div>

                        {index < 3 && (
                          <span className="-mt-3 px-0.5 font-display text-base text-[#F18B1F] sm:text-xl">
                            :
                          </span>
                        )}

                      </div>

                    ))}

                  </div>
                </div>

              </div>
            </div>
          </div>
        </Reveal>

        {/* ====================================================
            CTA
        ==================================================== */}

        <Reveal delay={340}>
          <div className="mx-auto mt-8 flex w-full max-w-md justify-center sm:mt-10 sm:max-w-lg">

            <a
              href={registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-full bg-[#97D91B] px-4 py-4 font-display text-sm tracking-wide text-white uppercase shadow-[0_8px_25px_rgba(151,217,27,0.3)] transition-all duration-300 hover:scale-[1.03] hover:bg-[#7DB817] sm:px-6 sm:py-4.5"
            >
              DAFTAR SEKARANG
            </a>

          </div>
        </Reveal>

      </div>
    </section>
  );
}



// ============================================================
// RACE INFO
// ============================================================

export function RaceInfo() {
  const info = [
    {
      label: "Flag Start",
      value: eventInfo.startTime,
      icon: Clock3,
    },
    {
      label: "Lokasi",
      value: eventInfo.location,
      icon: MapPin,
      mapsUrl:
        "https://maps.app.goo.gl/5fPUKkWnujbFhgij9",
    },
  ];

  return (
    <section
      id="race"
      className="relative bg-brand-sky py-20 lg:py-28"
    >
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
          <div className="mt-10 grid gap-4 sm:grid-cols-2">

            {info.map((i) => {
              const Icon = i.icon;

              const cardClassName =
                "group flex items-center gap-5 rounded-3xl border border-brand-light/60 bg-background p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lg";

              const content = (
                <>
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <Icon
                      size={28}
                      strokeWidth={2.2}
                    />
                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="text-[11px] font-bold tracking-[0.2em] text-brand uppercase">
                      {i.label}
                    </div>

                    <div className="mt-1 font-display text-xl text-navy uppercase sm:text-2xl">
                      {i.value}
                    </div>

                    {i.mapsUrl && (
                      <div className="mt-2 text-xs font-bold tracking-wide text-brand uppercase transition-colors group-hover:text-[#F18B1F]">
                        Buka Google Maps →
                      </div>
                    )}

                  </div>
                </>
              );

              return i.mapsUrl ? (
                <a
                  key={i.label}
                  href={i.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClassName}
                  aria-label={`Buka lokasi ${i.value} di Google Maps`}
                >
                  {content}
                </a>
              ) : (
                <div
                  key={i.label}
                  className={cardClassName}
                >
                  {content}
                </div>
              );
            })}

          </div>
        </Reveal>

      </div>
    </section>
  );
}

// ============================================================
// TOTAL PRIZE
// ============================================================

export function TotalPrize() {
  const chips = [
    "coming soon",
    "coming soon",
    "coming soon",
    "coming soon",
    "coming soon",
  ];

  return (
    <section
      id="hadiah"
      className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-28"
    >

      {/* BACKGROUND */}

      <div className="absolute inset-0 -z-30 overflow-hidden">
        <img
          src={hero31}
          alt=""
          width={1920}
          height={1280}
          className="h-full w-full scale-105 object-cover"
        />
      </div>

      {/* BLUE OVERLAY */}

      <div
        className="absolute inset-0 -z-20 bg-[#0A5490]/70"
        aria-hidden="true"
      />

      {/* SOFT LIGHT */}

      <div
        className="absolute left-[-10%] top-[10%] -z-10 h-72 w-72 rounded-full bg-[#97D91B]/10 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="absolute bottom-[-10%] right-[-10%] -z-10 h-80 w-80 rounded-full bg-[#97D91B]/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">

        {/* HEADING */}

        <Reveal>
          <div className="mx-auto max-w-3xl text-center">

            <span className="inline-flex items-center rounded-full border border-[#97D91B]/30 bg-[#97D91B]/15 px-4 py-2 text-[10px] font-extrabold tracking-[.22em] text-[#D9F0B8] uppercase sm:text-xs">
              Hadiah & Penghargaan
            </span>

            <h2 className="mt-4 font-display text-4xl leading-[1.05] text-white uppercase sm:text-5xl lg:text-6xl">
              Lari Dapat Sehat,
              <br />
              <span className="text-[#97D91B]">
                Pulang Bawa Hadiah!
              </span>
            </h2>

          </div>
        </Reveal>

        {/* TOTAL PRIZE */}

        <Reveal delay={100}>
          <div className="relative mx-auto mt-10 max-w-2xl overflow-hidden rounded-[2rem] border border-[#97D91B]/30 bg-white shadow-[0_18px_50px_rgba(0,0,0,.18)] sm:rounded-[2.5rem]">

            <div className="pointer-events-none absolute inset-0 flex items-end justify-center overflow-hidden">

              <img
                src={prizeAsset}
                alt=""
                width={1280}
                height={860}
                loading="lazy"
                className="h-full w-full object-cover object-center opacity-[.10] mix-blend-multiply"
              />

            </div>

            <div className="pointer-events-none absolute inset-0 bg-white/65" />

            <div className="absolute inset-x-0 top-0 z-20 h-1 bg-[#F18B1F]" />

            <div className="relative z-10 px-6 py-8 text-center sm:px-10 sm:py-10">

              <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-[#F18B1F]" />

              <div className="text-xs font-extrabold tracking-[.25em] text-[#F18B1F] uppercase sm:text-sm">
                Total Hadiah
              </div>

              <div className="mt-2 font-display text-4xl leading-none text-[#F18B1F] sm:text-5xl lg:text-6xl">
                {eventInfo.totalPrize}
              </div>

              <div className="mx-auto mt-5 max-w-md overflow-hidden rounded-2xl border border-[#97D91B]/20 bg-white/40 p-1.5">

                <img
                  src={prizeAsset}
                  alt="Koleksi hadiah fun run"
                  width={1280}
                  height={860}
                  loading="lazy"
                  className="w-full rounded-xl opacity-80"
                />

              </div>

            </div>

          </div>
        </Reveal>

        {/* PRIZE CHIPS */}

        <Reveal delay={200}>
          <div className="mx-auto mt-8 max-w-3xl text-center sm:mt-10">

            <div className="mx-auto mt-5 max-w-2xl px-2 sm:mt-6 sm:px-0">

              <div className="mb-3 flex w-full justify-center">

                <span className="inline-flex min-h-[50px] w-full max-w-xl items-center justify-center rounded-full bg-gradient-to-r from-[#F18B1F] via-[#F59A38] to-[#F7B15F] px-6 py-3 text-center text-sm font-extrabold leading-tight tracking-wide text-white uppercase shadow-[0_6px_18px_rgba(241,139,31,.25)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 sm:min-h-[56px] sm:px-8 sm:py-3.5 sm:text-base lg:min-h-[60px] lg:text-lg">
                  {chips[0]}
                </span>

              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-2.5">

                {chips.slice(1).map((c) => (
                  <span
                    key={c}
                    className="inline-flex min-h-[38px] items-center justify-center rounded-full border border-[#97D91B]/30 bg-gradient-to-r from-[#97D91B] via-[#A8DF3B] to-[#C0E875] px-2.5 py-2 text-center text-[9px] font-bold leading-tight tracking-wide text-[#193000] uppercase shadow-[0_4px_12px_rgba(151,217,27,.16)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 sm:min-h-[40px] sm:px-4 sm:text-xs"
                  >
                    {c}
                  </span>
                ))}

              </div>

            </div>

          </div>
        </Reveal>

        {/* PODIUM */}

        <Reveal delay={260}>
          <div className="mx-auto mt-14 max-w-5xl sm:mt-16">

            <div className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-2">

              {/* PUTRA */}

              <Reveal delay={80}>
                <div className="rounded-[2rem] border border-white/50 bg-white p-5 shadow-[0_15px_40px_rgba(0,0,0,.12)] sm:p-7">

                  <div className="flex items-center gap-2">

                    <Trophy className="h-5 w-5 shrink-0 text-[#F18B1F]" />

                    <h3 className="font-display text-2xl text-navy uppercase">
                      Putra 5K
                    </h3>

                  </div>

                  <div className="mt-5 space-y-2.5">

                    {podium.putra.map((p, i) => (
                      <div
                        key={p.place}
                        className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 transition-all hover:translate-x-1 ${
                          i === 0
                            ? "bg-[#97D91B]/15 ring-1 ring-[#97D91B]/30"
                            : "bg-brand-sky"
                        }`}
                      >

                        <div className="flex min-w-0 items-center gap-3">

                          <span className="text-xl">
                            {p.medal}
                          </span>

                          <span className="truncate text-sm font-bold text-navy">
                            {p.place}
                          </span>

                        </div>

                        <span
                          className={`shrink-0 font-display text-lg ${
                            i === 0
                              ? "text-[#468519]"
                              : "text-brand-deep"
                          }`}
                        >
                          {p.prize}
                        </span>

                      </div>
                    ))}

                  </div>

                </div>
              </Reveal>

              {/* PUTRI */}

              <Reveal delay={160}>
                <div className="rounded-[2rem] border border-white/50 bg-white p-5 shadow-[0_15px_40px_rgba(0,0,0,.12)] sm:p-7">

                  <div className="flex items-center gap-2">

                    <Trophy className="h-5 w-5 shrink-0 text-[#97D91B]" />

                    <h3 className="font-display text-2xl text-navy uppercase">
                      Putri 5K
                    </h3>

                  </div>

                  <div className="mt-5 space-y-2.5">

                    {podium.putri.map((p, i) => (
                      <div
                        key={p.place}
                        className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 transition-all hover:translate-x-1 ${
                          i === 0
                            ? "bg-[#97D91B]/15 ring-1 ring-[#97D91B]/30"
                            : "bg-brand-sky"
                        }`}
                      >

                        <div className="flex min-w-0 items-center gap-3">

                          <span className="text-xl">
                            {p.medal}
                          </span>

                          <span className="truncate text-sm font-bold text-navy">
                            {p.place}
                          </span>

                        </div>

                        <span
                          className={`shrink-0 font-display text-lg ${
                            i === 0
                              ? "text-[#468519]"
                              : "text-brand-deep"
                          }`}
                        >
                          {p.prize}
                        </span>

                      </div>
                    ))}

                  </div>

                </div>
              </Reveal>

            </div>

            {/* 20 FINISHERS */}

            <Reveal delay={220}>
              <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-[2rem] bg-[#76C457] px-5 py-6 shadow-[0_10px_30px_rgba(241,139,31,.25)] sm:px-8 sm:py-7">

                <div className="min-w-0">

                  <div className="font-display text-xl text-white uppercase sm:text-2xl">
                    10 Finisher Berikutnya
                  </div>

                  <p className="mt-1 text-xs text-white/90 sm:text-sm">
                    Finisher 5K 4–8 Putra
                  </p>

                  <p className="mt-0.5 text-xs text-white/90 sm:text-sm">
                    Finisher 5K 4–8 Putri
                  </p>

                </div>

                <div className="shrink-0 rounded-2xl bg-white px-4 py-3 text-center font-display text-base text-[#76C457] shadow-sm sm:px-5 sm:text-lg">
                  150.000
                  <span className="text-xs">
                    /orang
                  </span>
                </div>

              </div>
            </Reveal>

          </div>
        </Reveal>

      </div>
    </section>
  );
}

// ============================================================
// PODIUM CARD
// ============================================================

function PodiumCard({
  title,
  list,
}: {
  title: string;
  list: typeof podium.putra;
}) {
  return (
    <div className="rounded-[2rem] border border-brand-light/50 bg-background p-6 shadow-soft sm:p-8">

      <div className="flex items-center gap-2">

        <Trophy className="h-5 w-5 shrink-0 text-brand" />

        <h3 className="font-display text-2xl text-navy uppercase">
          {title}
        </h3>

      </div>

      <ul className="mt-5 space-y-3">

        {list.map((p) => (
          <li
            key={p.place}
            className="flex items-center justify-between gap-3 rounded-2xl bg-brand-sky px-4 py-3 transition-transform hover:translate-x-1"
          >

            <span className="flex min-w-0 items-center gap-3">

              <span className="text-xl">
                {p.medal}
              </span>

              <span className="truncate text-sm font-bold text-navy">
                {p.place}
              </span>

            </span>

            <span className="shrink-0 font-display text-lg text-brand-deep">
              {p.prize}
            </span>

          </li>
        ))}

      </ul>

    </div>
  );
}

// Tetap dipertahankan agar tidak merusak import/component lain.
export function Podium() {
  return null;
}

export function Categories() {
  return null;
}
// ============================================================
// CATEGORIES
// ============================================================

