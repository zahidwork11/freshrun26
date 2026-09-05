import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Flag, ShieldCheck } from "lucide-react";
import { categories } from "@/data/event";

export const Route = createFileRoute("/daftar")({
  component: DaftarPage,
});

function DaftarPage() {
  const visibleCategories = categories.filter(
    (category) => category.enabled,
  );

  return (
    <main className="min-h-screen bg-[#EAF6FF] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#0A5490] px-4 py-2 text-[10px] font-extrabold tracking-[0.2em] text-white uppercase shadow-sm">
            <Flag className="h-3.5 w-3.5" />
            PKU FRESH RUN 2026
          </div>

          <h1 className="mt-5 font-display text-4xl leading-[1] text-[#062D50] uppercase sm:text-5xl lg:text-6xl">
            Pilih Kategori
            <br />
            <span className="text-[#F18B1F]">
              & Mulai Langkahmu
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#062D50]/65 sm:text-base">
            Pilih kategori lomba yang sesuai. Setelah memilih kategori,
            kamu akan diarahkan ke halaman pembayaran untuk mendapatkan
            kode pembayaran unik.
          </p>
        </div>

        {/* STEPS */}
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-2 sm:gap-4">
          <Step
            number="01"
            title="Pilih"
            active
          />

          <Step
            number="02"
            title="Bayar"
          />

          <Step
            number="03"
            title="Isi Form"
          />
        </div>

        {/* CATEGORY */}
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleCategories.map((category) => {
            // =================================================
            // WARNA DEFAULT
            // =================================================

            let headerColor = "#F18B1F";
            let accentColor = "#DA630E";
            let softColor = "#FFF3E8";
            let textColor = "#8A3D06";

            // =================================================
            // 5K PRESALE
            // ORANGE
            // =================================================

            if (category.slug === "5k-presale") {
              headerColor = "#F18B1F";
              accentColor = "#DA630E";
              softColor = "#FFF3E8";
              textColor = "#8A3D06";
            }

            // =================================================
            // 5K UMUM
            // ORANGE
            // =================================================

            else if (category.slug === "5k-umum") {
              headerColor = "#F18B1F";
              accentColor = "#DA630E";
              softColor = "#FFF3E8";
              textColor = "#8A3D06";
            }

            // =================================================
            // 2.5K PRESALE
            // HIJAU
            // =================================================

            else if (category.slug === "2-5k-presale") {
              headerColor = "#6E9722";
              accentColor = "#468519";
              softColor = "#F2FBDD";
              textColor = "#468519";
            }

            // =================================================
            // 2.5K UMUM
            // HIJAU
            // =================================================

            else if (category.slug === "2-5k-umum") {
              headerColor = "#6E9722";
              accentColor = "#468519";
              softColor = "#F2FBDD";
              textColor = "#468519";
            }

            // =================================================
            // PELAJAR / MAHASISWA
            // BIRU
            // =================================================

            else if (category.slug === "pelajar-mahasiswa") {
              headerColor = "#1B72B9";
              accentColor = "#0A5490";
              softColor = "#EAF6FF";
              textColor = "#0A5490";
            }

            // =================================================
            // STATUS PENDAFTARAN
            // SEMUA DIAMBIL DARI event.ts
            // =================================================

            const isRegistrationOpen =
              category.registrationOpen === true;

            return (
              <article
                key={category.slug}
                className="flex flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_12px_35px_rgba(20,43,77,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(20,43,77,0.13)]"
              >
                {/* HEADER */}
                <div
                  className="relative overflow-hidden px-6 py-6"
                  style={{
                    backgroundColor: headerColor,
                  }}
                >
                  <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10" />

                  <div className="pointer-events-none absolute -bottom-10 right-12 h-20 w-20 rounded-full bg-black/5" />

                  <div className="relative flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[9px] font-bold tracking-[0.2em] text-white/70 uppercase">
                        Kategori
                      </p>

                      <h2 className="mt-1 font-display text-2xl leading-tight text-white uppercase">
                        {category.name}
                      </h2>
                    </div>

                    {category.note && (
                      <span
                        className="shrink-0 rounded-full bg-white px-3 py-1.5 text-[9px] font-extrabold tracking-widest uppercase"
                        style={{
                          color: accentColor,
                        }}
                      >
                        {category.note}
                      </span>
                    )}
                  </div>
                </div>

                {/* BODY */}
                <div className="flex flex-1 flex-col p-6">
                  {/* PRICE */}
                  <div>
                    <p className="text-[10px] font-extrabold tracking-[0.18em] text-[#062D50]/40 uppercase">
                      Harga Pendaftaran
                    </p>

                    <p
                      className="mt-1 font-display text-4xl tracking-tight"
                      style={{
                        color: textColor,
                      }}
                    >
                      {category.price}
                    </p>
                  </div>

                  {/* PERIOD */}
                  {category.registrationPeriod && (
                    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <p className="text-[9px] font-bold tracking-wider text-[#062D50]/40 uppercase">
                        Periode Pendaftaran
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[#062D50]/70">
                        {category.registrationPeriod}
                      </p>
                    </div>
                  )}

                  {/* BENEFITS */}
                  <div className="mt-5">
                    <p className="text-[10px] font-extrabold tracking-[0.18em] text-[#062D50]/40 uppercase">
                      Benefit
                    </p>

                    <ul className="mt-3 space-y-2.5">
                      {category.benefits.map((benefit) => (
                        <li
                          key={benefit}
                          className="flex items-center gap-3 text-sm text-[#062D50]/75"
                        >
                          <span
                            className="grid h-5 w-5 shrink-0 place-items-center rounded-full"
                            style={{
                              backgroundColor: softColor,
                            }}
                          >
                            <Check
                              className="h-3 w-3"
                              strokeWidth={3}
                              style={{
                                color: accentColor,
                              }}
                            />
                          </span>

                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* REQUIREMENT */}
                  {category.requirement && (
                    <div
                      className="mt-5 rounded-xl px-4 py-3"
                      style={{
                        backgroundColor: softColor,
                      }}
                    >
                      <p
                        className="text-xs font-semibold"
                        style={{
                          color: textColor,
                        }}
                      >
                        Persyaratan: {category.requirement}
                      </p>
                    </div>
                  )}

                  {/* BUTTON */}
                  <div className="mt-auto pt-6">
                    {isRegistrationOpen ? (
                      <Link
                        to="/bayar"
                        search={{
                          category: category.slug,
                        }}
                        className="group flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 font-display text-sm tracking-wide text-white uppercase shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                        style={{
                          backgroundColor: headerColor,
                        }}
                      >
                        Pilih Kategori

                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="flex w-full cursor-not-allowed items-center justify-center rounded-full bg-[#0A5490]/10 px-5 py-3.5 font-display text-sm tracking-wide text-[#0A5490]/40 uppercase"
                      >
                        Belum Dibuka
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* SECURITY INFO */}
        <div className="mx-auto mt-8 flex max-w-5xl items-center justify-center gap-3 rounded-2xl border border-[#0A5490]/10 bg-white px-5 py-4 text-center shadow-sm">
          <ShieldCheck className="h-5 w-5 shrink-0 text-[#0A5490]" />

          <p className="text-xs leading-relaxed text-[#062D50]/60 sm:text-sm">
            Setiap pendaftaran mendapatkan kode pembayaran unik.
            Pastikan nominal transfer sesuai dengan yang tertera.
          </p>
        </div>

        {/* BACK */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-xs font-bold tracking-wider text-[#0A5490]/60 uppercase transition-colors hover:text-[#F18B1F]"
          >
            ← Kembali ke halaman utama
          </Link>
        </div>
      </div>
    </main>
  );
}

function Step({
  number,
  title,
  active = false,
}: {
  number: string;
  title: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      <div
        className={`grid h-8 w-8 place-items-center rounded-full text-[10px] font-extrabold ${
          active
            ? "bg-[#F18B1F] text-white"
            : "bg-white text-[#062D50]/35"
        }`}
      >
        {number}
      </div>

      <span
        className={`text-[9px] font-extrabold tracking-wider uppercase sm:text-xs ${
          active
            ? "text-[#062D50]"
            : "text-[#062D50]/35"
        }`}
      >
        {title}
      </span>
    </div>
  );
}