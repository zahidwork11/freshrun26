import { useEffect, useState } from "react";
import { CalendarDays, Clock, MapPin, Sparkles, Trophy, Flag, Clock3 } from "lucide-react";
import prizeAsset from "@/assets/doorprice.png";
import { Reveal } from "./Reveal";
import { Countdown } from "./Countdown";
import { categories, eventInfo, podium } from "@/data/event";
import hero9 from "@/assets/hero9.png";
import hero10 from "@/assets/hero10.png";
import hero11 from "@/assets/hero11.png";
import hero12 from "@/assets/hero12.webp";
import hero14 from "@/assets/hero14.png";



export function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setOffset(Math.min(window.scrollY * 0.18, 120));
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden"
    >
      {/* =====================================================
          HERO IMAGE
      ===================================================== */}
      <div className="absolute inset-0 -z-30 overflow-hidden">
        <img
          src={hero14}
          alt="Peserta fun run PKU Muhammadiyah Sukoharjo"
          width={1920}
          height={1280}
          className="h-[115%] w-full object-cover"
          style={{
            transform: `translateY(-${offset}px)`,
          }}
        />
      </div>

      {/* =====================================================
          BASE BLUE TINT
          Membuat gambar sedikit lebih gelap secara merata
      ===================================================== */}
      <div
        className="
          absolute
          inset-0
          -z-20
          bg-[#062D50]/35
        "
        aria-hidden="true"
      />

      {/* =====================================================
          SOFT NAVY TOP
          Memberikan sedikit kedalaman di bagian atas
      ===================================================== */}
      <div
        className="
          absolute
          inset-x-0
          top-0
          -z-10
          h-[45%]
          bg-gradient-to-b
          from-[#062D50]/60
          via-[#062D50]/25
          to-transparent
        "
        aria-hidden="true"
      />

      {/* =====================================================
          SOFT NAVY BOTTOM
          Tetap lembut agar tidak menjadi blok biru pekat
      ===================================================== */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          -z-10
          h-[45%]
          bg-gradient-to-t
          from-[#062D50]/55
          via-[#062D50]/25
          to-transparent
        "
        aria-hidden="true"
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-4
          pt-32
          pb-20
          sm:px-6
          lg:pt-44
          lg:pb-28
        "
      >

        {/* ===================================================
            BADGE
        =================================================== */}
        <Reveal>
          <span
            className="
              inline-flex
              max-w-full
              items-center
              gap-2
              rounded-full
              border
              border-brand-cyan/30
              bg-[#062D50]/55
              px-4
              py-2.5
              text-[11px]
              font-extrabold
              tracking-[0.16em]
              uppercase
              text-white
              shadow-[0_8px_25px_rgba(0,20,45,0.25)]
              backdrop-blur-md
              sm:px-5
              sm:py-3
              sm:text-xs
            "
          >
            <Sparkles
              className="
                h-3.5
                w-3.5
                shrink-0
                text-brand-cyan
                drop-shadow-[0_2px_5px_rgba(0,20,45,0.8)]
                sm:h-4
                sm:w-4
              "
            />

            <span
              className="
                text-brand-cyan
                drop-shadow-[0_2px_5px_rgba(0,20,45,0.9)]
              "
            >
              Milad RS PKU Muhammadiyah Sukoharjo
            </span>
          </span>
        </Reveal>

        {/* ===================================================
            HEADING
        =================================================== */}
        <Reveal delay={100}>
          <h1
            className="
              mt-6
              max-w-4xl
              font-display
              text-5xl
              leading-[0.95]
              text-primary-foreground
              uppercase
              drop-shadow-[0_3px_12px_rgba(0,20,45,0.75)]
              sm:text-7xl
              lg:text-8xl
            "
          >
            <span className="text-white">
              Rayakan
            </span>{" "}

            <span className="text-brand-cyan">
              Milad,
            </span>

            <br />

            <span className="text-white">
              Langkahkan
            </span>{" "}

            <span className="text-brand-cyan">
              Semangat!
            </span>
          </h1>
        </Reveal>

        {/* ===================================================
            DESCRIPTION
        =================================================== */}
        <Reveal delay={180}>
          <p
            className="
              mt-5
              max-w-xl
              text-base
              font-semibold
              leading-relaxed
              text-white
              drop-shadow-[0_2px_7px_rgba(0,20,45,0.75)]
              sm:text-lg
            "
          >
            PKU Muhammadiyah Sukoharjo Fun Run — Satu langkah untuk{" "}
            <span
              className="
                font-bold
                text-brand-cyan
                drop-shadow-[0_2px_5px_rgba(0,20,45,0.75)]
              "
            >
              sehat
            </span>
            , satu langkah untuk{" "}
            <span
              className="
                font-bold
                text-brand-cyan
                drop-shadow-[0_2px_5px_rgba(0,20,45,0.75)]
              "
            >
              kebersamaan
            </span>
            .
          </p>
        </Reveal>

        {/* ===================================================
            EVENT INFO
        =================================================== */}
        <Reveal delay={260}>
          <div
            className="
              mt-8
              grid
              gap-3
              sm:grid-cols-2
              lg:max-w-4xl
              lg:grid-cols-4
            "
          >
            {[
              {
                icon: Flag,
                cap: "Kategori",
                label: eventInfo.distances,
                hot: true,
              },
              {
                icon: CalendarDays,
                cap: "Tanggal",
                label: eventInfo.dateLabel,
              },
            ].map(({ icon: Icon, cap, label, hot }) => (
              <div
                key={label}
                className={`
                  flex
                  min-w-0
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  px-4
                  py-3
                  shadow-lift
                  backdrop-blur
                  transition-transform
                  hover:-translate-y-1
                  ${
                    hot
                      ? "border-brand-cyan/60 bg-brand-cyan/20 text-white"
                      : "border-white/50 bg-white/10 text-white"
                  }
                `}
              >
                {/* Icon */}
                <span
                  className={`
                    grid
                    h-9
                    w-9
                    shrink-0
                    place-items-center
                    rounded-xl
                    ${
                      hot
                        ? "bg-brand-cyan text-navy"
                        : "bg-white/20 text-white"
                    }
                  `}
                >
                  <Icon
                    className={`
                      h-4.5
                      w-4.5
                      ${
                        hot
                          ? "text-navy"
                          : "text-white"
                      }
                    `}
                  />
                </span>

                {/* Text */}
                <span className="min-w-0">
                  <span
                    className={`
                      block
                      text-[10px]
                      font-bold
                      tracking-[0.2em]
                      uppercase
                      ${
                        hot
                          ? "text-brand-cyan"
                          : "text-white/80"
                      }
                    `}
                  >
                    {cap}
                  </span>

                  <span
                    className="
                      block
                      truncate
                      font-display
                      text-sm
                      tracking-wide
                      uppercase
                      text-white
                      drop-shadow-[0_2px_5px_rgba(0,20,45,0.7)]
                    "
                  >
                    {label}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ===================================================
            CTA
        =================================================== */}
        <Reveal delay={340}>
          <div
            className="
              mt-10
              flex
              flex-wrap
              gap-3
            "
          >
            {/* Primary CTA */}
            <a
              href={eventInfo.registerUrl}
              className="
                rounded-full
                bg-background
                px-8
                py-4
                font-display
                text-sm
                tracking-wide
                text-brand-deep
                uppercase
                shadow-lift
                transition-transform
                hover:scale-105
              "
            >
              Cara Daftar
            </a>

            {/* Secondary CTA */}
            <a
              href="#kategori"
              className="
                rounded-full
                border-2
                border-white/70
                bg-white/5
                px-8
                py-4
                font-display
                text-sm
                tracking-wide
                text-primary-foreground
                uppercase
                backdrop-blur-sm
                transition-colors
                hover:bg-white/15
              "
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
    {
      label: "Start",
      value: eventInfo.startTime,
      icon: Clock3,
    },
    {
      label: "Lokasi",
      value: eventInfo.location,
      icon: MapPin,
    },
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
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {info.map((i) => {
              const Icon = i.icon;

              return (
                <div
                  key={i.label}
                  className="group flex items-center gap-5 rounded-3xl border border-brand-light/60 bg-background p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Icon */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <Icon size={28} strokeWidth={2.2} />
                  </div>

                  {/* Content */}
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold tracking-[0.2em] text-brand uppercase">
                      {i.label}
                    </div>

                    <div className="mt-1 font-display text-xl text-navy uppercase sm:text-2xl">
                      {i.value}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function TotalPrize() {
  const chips = [
    "1 Sepeda Listrik",
    "2 Jam Tangan Running",
    "2 Sepeda Gunung",
    "1 Televisi 43 Inch",
    "1 Kulkas 2 Pintu",
  ];

  return (
    <section
      id="hadiah"
      className="
        relative
        isolate
        overflow-hidden
        bg-[#F5FBDD]
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* =====================================================
          DECORATIVE BACKGROUND
      ===================================================== */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
        aria-hidden="true"
      >
        {/* Top right lime glow */}
        <div
          className="
            absolute
            -right-32
            -top-32
            h-72
            w-72
            rounded-full
            bg-[#97D91B]/15
            blur-3xl
            sm:h-96
            sm:w-96
          "
        />

        {/* Bottom left lime glow */}
        <div
          className="
            absolute
            -bottom-40
            -left-32
            h-80
            w-80
            rounded-full
            bg-[#97D91B]/12
            blur-3xl
            sm:h-96
            sm:w-96
          "
        />

        {/* Orange accent */}
        <div
          className="
            absolute
            right-[8%]
            top-[20%]
            hidden
            h-20
            w-20
            rounded-full
            border-[10px]
            border-[#F18B1F]/10
            lg:block
          "
        />

        <div
          className="
            absolute
            bottom-[15%]
            left-[8%]
            hidden
            h-14
            w-14
            rounded-full
            bg-[#F18B1F]/10
            lg:block
          "
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <div
        className="
          relative
          z-10
          mx-auto
          max-w-6xl
          px-4
          sm:px-6
        "
      >

        {/* ===================================================
            HEADING
        =================================================== */}
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">

            {/* Label */}
            <span
              className="
                inline-flex
                items-center
                rounded-full
                border
                border-[#97D91B]/30
                bg-[#97D91B]/15
                px-4
                py-2
                text-[10px]
                font-extrabold
                tracking-[0.22em]
                text-[#468519]
                uppercase
                sm:text-xs
              "
            >
              Hadiah & Penghargaan
            </span>

            {/* Heading */}
            <h2
              className="
                mt-4
                font-display
                text-4xl
                leading-[1.05]
                text-navy
                uppercase
                sm:text-5xl
                lg:text-6xl
              "
            >
              Lari Dapat Sehat,
              <br />

              <span className="text-[#468519]">
                Pulang Bawa Hadiah!
              </span>
            </h2>

          </div>
        </Reveal>

        {/* ===================================================
            TOTAL PRIZE
        =================================================== */}
        <Reveal delay={100}>
          <div
            className="
              mx-auto
              mt-10
              max-w-md
              rounded-[2rem]
              border
              border-[#97D91B]/25
              bg-white
              px-8
              py-8
              text-center
              shadow-[0_18px_50px_rgba(40,70,0,0.10)]
              transition-transform
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_22px_55px_rgba(40,70,0,0.14)]
              sm:px-10
              sm:py-9
            "
          >
            {/* Accent */}
            <div
              className="
                mx-auto
                mb-4
                h-1
                w-12
                rounded-full
                bg-[#97D91B]
              "
            />

            {/* Label */}
            <div
              className="
                text-xs
                font-extrabold
                tracking-[0.25em]
                text-[#468519]
                uppercase
              "
            >
              Total Hadiah
            </div>

            {/* Total Prize */}
            <div
              className="
                mt-2
                font-display
                text-4xl
                text-[#468519]
                sm:text-5xl
              "
            >
              {eventInfo.totalPrize}
            </div>

            {/* Description */}
            <p
              className="
                mt-2
                text-xs
                font-semibold
                text-[#468519]/65
              "
            >
              Siapkan langkah terbaikmu!
            </p>
          </div>
        </Reveal>

        {/* ===================================================
            PRIZE IMAGE
        =================================================== */}
        <Reveal delay={160}>
          <div
            className="
              relative
              mt-10
              overflow-hidden
              rounded-[2rem]
              border
              border-[#97D91B]/30
              bg-white
              p-1
              shadow-[0_18px_50px_rgba(40,70,0,0.10)]
              sm:mt-12
              sm:p-1.5
            "
          >
            {/* Lime accent */}
            <div
              className="
                absolute
                inset-x-0
                top-0
                z-10
                h-1
                bg-[#97D91B]
              "
            />

            <div className="overflow-hidden rounded-[1.75rem] bg-white">
              <img
                src={prizeAsset}
                alt="Koleksi hadiah fun run: sepeda, jam tangan, kulkas, elektronik, dan doorprize"
                width={1280}
                height={860}
                loading="lazy"
                className="
                  w-full
                  transition-transform
                  duration-700
                  hover:scale-105
                "
              />
            </div>
          </div>
        </Reveal>

        {/* ===================================================
            MESSAGE
        =================================================== */}
        <Reveal delay={200}>
          <div
            className="
              mx-auto
              mt-8
              max-w-3xl
              text-center
              sm:mt-10
            "
          >

            {/* Message */}
            <p
              className="
                mx-auto
                max-w-md
                px-2
                font-display
                text-lg
                leading-snug
                text-[#468519]
                sm:max-w-xl
                sm:px-0
                sm:text-2xl
              "
            >
              Dan masih banyak kejutan menarik lainnya!
            </p>

            {/* =================================================
                CHIPS
            ================================================= */}
            <div
              className="
                mx-auto
                mt-5
                flex
                max-w-2xl
                flex-wrap
                items-center
                justify-center
                gap-2
                px-2
                sm:mt-6
                sm:gap-2.5
                sm:px-0
              "
            >
              {chips.map((c, index) => (
                <span
                  key={c}
                  className={`
                    inline-flex
                    min-h-[34px]
                    items-center
                    justify-center
                    rounded-full
                    px-3
                    py-2
                    text-center
                    text-[10px]
                    font-bold
                    leading-tight
                    tracking-wide
                    uppercase
                    transition-all
                    duration-200
                    hover:-translate-y-0.5

                    sm:min-h-[38px]
                    sm:px-4
                    sm:py-2
                    sm:text-xs

                    ${
                      index === 0 || index === 1
                        ? `
                          bg-[#97D91B]
                          text-[#193000]
                          shadow-sm
                          hover:bg-[#8BCF13]
                        `
                        : `
                          border
                          border-[#97D91B]/30
                          bg-white
                          text-[#468519]
                          shadow-sm
                          hover:border-[#97D91B]/50
                          hover:bg-[#F5FBDD]
                        `
                    }
                  `}
                >
                  {c}
                </span>
              ))}
            </div>

          </div>
        </Reveal>

        {/* ===================================================
            BOTTOM ACCENT
        =================================================== */}
        <Reveal delay={240}>
          <div
            className="
              mx-auto
              mt-8
              flex
              w-full
              max-w-xs
              items-center
              justify-center
              gap-3
              px-4
              sm:mt-10
              sm:max-w-xl
              sm:px-0
            "
          >
            <span
              className="
                h-px
                flex-1
                bg-[#97D91B]/30
              "
            />

            <span
              className="
                h-1.5
                w-1.5
                shrink-0
                rounded-full
                bg-[#97D91B]
                sm:h-2
                sm:w-2
              "
            />

            <span
              className="
                h-px
                flex-1
                bg-[#97D91B]/30
              "
            />
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
            <PodiumCard title="Putra 5K" list={podium.putra} />
          </Reveal>
          <Reveal delay={160}>
            <PodiumCard title="Putri 5K" list={podium.putri} />
          </Reveal>
        </div>
        <Reveal delay={220}>
          <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-[2rem] gradient-brand px-6 py-7 shadow-lift sm:flex sm:justify-between sm:px-10">
            <div className="min-w-0">
              <div className="font-display text-2xl text-primary-foreground uppercase sm:text-3xl">
                20 Finisher Berikutnya
              </div>
              <p className="mt-1 text-sm text-primary-foreground/85">Finisher 4–13 Putra</p>
              <p className="mt-1 text-sm text-primary-foreground/85">Finisher 4–13 Putri</p>
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
    <section
      id="kategori"
      className="
        relative
        overflow-hidden
        bg-background
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* =====================================================
          DECORATIVE BACKGROUND
      ===================================================== */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
        aria-hidden="true"
      >
        {/* Orange Glow */}
        <div
          className="
            absolute
            -left-32
            -top-32
            h-72
            w-72
            rounded-full
            bg-[#F18B1F]/10
            blur-3xl
            sm:h-96
            sm:w-96
          "
        />

        {/* Green Glow */}
        <div
          className="
            absolute
            left-1/2
            top-1/3
            h-72
            w-72
            -translate-x-1/2
            rounded-full
            bg-[#97D91B]/10
            blur-3xl
            sm:h-96
            sm:w-96
          "
        />

        {/* Blue Glow */}
        <div
          className="
            absolute
            -bottom-40
            -right-32
            h-80
            w-80
            rounded-full
            bg-[#1492FA]/10
            blur-3xl
            sm:h-96
            sm:w-96
          "
        />
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* ===================================================
            HEADING
        =================================================== */}
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">

            <h2
              className="
                font-display
                text-4xl
                leading-[1.05]
                text-navy
                uppercase
                sm:text-5xl
                lg:text-6xl
              "
            >
              Pilih Kategori,
              <br />

              <span className="text-navy">
                Siapkan Langkahmu.
              </span>
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-xl
                text-sm
                font-medium
                leading-relaxed
                text-navy/60
                sm:text-base
              "
            >
              Pilih kategori yang sesuai dan bersiap menjadi
              bagian dari PKU Muhammadiyah Sukoharjo Fun Run.
            </p>

          </div>
        </Reveal>

        {/* ===================================================
            CATEGORY CARDS
        =================================================== */}
        <div
          className="
            mx-auto
            mt-10
            grid
            max-w-6xl
            gap-5
            sm:mt-12
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {categories.map((c, i) => {

            /* =================================================
               COLOR PER CATEGORY
            ================================================= */

            let headerColor = "#F18B1F";
            let accentColor = "#DA630E";
            let softColor = "#FFF3E8";
            let textColor = "#8A3D06";

            // =================================================
            // 5K UMUM
            // ORANGE
            // =================================================
            if (c.slug === "5k-umum") {
              headerColor = "#F18B1F";
              accentColor = "#DA630E";
              softColor = "#FFF3E8";
              textColor = "#8A3D06";
            }

            // =================================================
            // 2.5K UMUM
            // GREEN
            // =================================================
            else if (c.slug === "2-5k-umum") {
              headerColor = "#97D91B";
              accentColor = "#468519";
              softColor = "#F2FBDD";
              textColor = "#468519";
            }

            // =================================================
            // PELAJAR / MAHASISWA
            // BLUE
            // =================================================
            else if (c.slug === "pelajar-mahasiswa") {
              headerColor = "#1492FA";
              accentColor = "#0A5490";
              softColor = "#EAF6FF";
              textColor = "#0A5490";
            }

            /* =================================================
               HARGA NORMAL / HARGA CORET
            ================================================= */

            const originalPrice =
              c.slug === "5k-umum"
                ? "Rp 175.000"
                : c.slug === "2-5k-umum"
                  ? "Rp 75.000"
                  : null;

            /* =================================================
               KUOTA
            ================================================= */

            const quota = c.quota ?? 0;
            const registered = c.registered ?? 0;

            // Batasi agar tidak lebih dari 100%
            const percentage =
              quota > 0
                ? Math.min(
                    Math.round((registered / quota) * 100),
                    100
                  )
                : 0;

            return (
              <Reveal
                key={c.slug}
                delay={i * 80}
              >
                <article
                  className="
                    group
                    flex
                    h-full
                    flex-col
                    overflow-hidden
                    rounded-[1.75rem]
                    border
                    border-slate-200
                    bg-white
                    shadow-[0_10px_30px_rgba(20,43,77,0.08)]
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:shadow-[0_20px_45px_rgba(20,43,77,0.14)]
                  "
                >

                  {/* =================================================
                      CARD HEADER
                  ================================================= */}
                  <header
                    className="
                      relative
                      overflow-hidden
                      px-6
                      py-5
                      sm:px-7
                      sm:py-6
                    "
                    style={{
                      backgroundColor: headerColor,
                    }}
                  >

                    {/* Decorative Circle */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        -right-8
                        -top-8
                        h-24
                        w-24
                        rounded-full
                        bg-white/10
                      "
                    />

                    <div
                      className="
                        pointer-events-none
                        absolute
                        -bottom-12
                        right-10
                        h-20
                        w-20
                        rounded-full
                        bg-black/5
                      "
                    />

                    <div
                      className="
                        relative
                        grid
                        grid-cols-[minmax(0,1fr)_auto]
                        items-center
                        gap-2
                      "
                    >

                      {/* Category Name */}
                      <h3
                        className="
                          min-w-0
                          font-display
                          text-xl
                          leading-tight
                          text-white
                          uppercase
                          sm:text-2xl
                        "
                      >
                        {c.name}
                      </h3>

                      {/* PRESALE */}
                      {c.note && (
                        <span
                          className="
                            shrink-0
                            rounded-full
                            bg-white
                            px-3
                            py-1
                            text-[9px]
                            font-extrabold
                            tracking-widest
                            uppercase
                            shadow-sm
                          "
                          style={{
                            color: accentColor,
                          }}
                        >
                          {c.note}
                        </span>
                      )}

                    </div>
                  </header>

                  {/* =================================================
                      CARD BODY
                  ================================================= */}
                  <div
                    className="
                      flex
                      flex-1
                      flex-col
                      p-6
                      sm:p-7
                    "
                  >

                    {/* =================================================
                        PRICE
                    ================================================= */}
                    <div
                      className="
                        flex
                        flex-wrap
                        items-baseline
                        gap-2
                      "
                    >

                      {/* Harga Coret */}
                      {originalPrice && (
                        <span
                          className="
                            font-display
                            text-base
                            font-medium
                            text-slate-400
                            line-through
                            decoration-2
                            sm:text-lg
                          "
                        >
                          {originalPrice}
                        </span>
                      )}

                      {/* Harga Aktif */}
                      <span
                        className="
                          font-display
                          text-3xl
                          tracking-tight
                          sm:text-4xl
                        "
                        style={{
                          color: textColor,
                        }}
                      >
                        {c.price}
                      </span>

                    </div>

                    {/* =================================================
                        QUOTA
                        GARIS + JUMLAH PESERTA
                    ================================================= */}
                    <div className="mt-5">

                      {/* Header Kuota */}
                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          gap-3
                        "
                      >
                        <span
                          className="
                            text-[10px]
                            font-extrabold
                            tracking-[0.16em]
                            text-navy/50
                            uppercase
                          "
                        >
                          Kuota Peserta
                        </span>

                        <span
                          className="
                            text-xs
                            font-bold
                          "
                          style={{
                            color: accentColor,
                          }}
                        >
                          {registered}/{quota}
                        </span>
                      </div>

                      {/* Progress Track */}
                      <div
                        className="
                          mt-2
                          h-2
                          w-full
                          overflow-hidden
                          rounded-full
                        "
                        style={{
                          backgroundColor: softColor,
                        }}
                      >
                        {/* Progress */}
                        <div
                          className="
                            h-full
                            rounded-full
                            transition-all
                            duration-700
                          "
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: headerColor,
                          }}
                        />
                      </div>

                      {/* Participant Text */}
                      <div
                        className="
                          mt-2
                          flex
                          items-center
                          justify-between
                          gap-2
                          text-[10px]
                          font-medium
                          text-navy/50
                        "
                      >
                        <span>
                          {registered} peserta terdaftar
                        </span>

                        <span>
                          {quota} kuota
                        </span>
                      </div>

                    </div>

                    {/* =================================================
                        BENEFITS
                    ================================================= */}
                    <ul
                      className="
                        mt-5
                        space-y-3
                        text-sm
                        text-navy/75
                      "
                    >
                      {c.benefits.map((b) => (
                        <li
                          key={b}
                          className="
                            flex
                            items-center
                            gap-3
                          "
                        >

                          {/* Bullet */}
                          <span
                            className="
                              grid
                              h-5
                              w-5
                              shrink-0
                              place-items-center
                              rounded-full
                            "
                            style={{
                              backgroundColor: softColor,
                            }}
                          >
                            <span
                              className="
                                h-1.5
                                w-1.5
                                rounded-full
                              "
                              style={{
                                backgroundColor: headerColor,
                              }}
                            />
                          </span>

                          <span>
                            {b}
                          </span>

                        </li>
                      ))}
                    </ul>

                    {/* =================================================
                        REQUIREMENT
                    ================================================= */}
                    {c.requirement && (
                      <p
                        className="
                          mt-5
                          rounded-xl
                          px-3
                          py-2.5
                          text-xs
                          font-semibold
                        "
                        style={{
                          backgroundColor: softColor,
                          color: textColor,
                        }}
                      >
                        Persyaratan: {c.requirement}
                      </p>
                    )}

                    {/* =================================================
                        REGISTER BUTTON
                    ================================================= */}
                    <a
                      href={`${eventInfo.registerUrl}?category=${c.slug}`}
                      className="
                        mt-6
                        rounded-full
                        px-5
                        py-3.5
                        text-center
                        font-display
                        text-sm
                        tracking-wide
                        text-white
                        uppercase
                        shadow-sm
                        transition-all
                        duration-300
                        hover:scale-[1.03]
                        hover:shadow-md
                      "
                      style={{
                        backgroundColor: headerColor,
                      }}
                    >
                      Daftar
                    </a>

                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}