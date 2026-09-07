import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Mail,
  MapPin,
  Search,
  ShieldCheck,
  Shirt,
  Smartphone,
  Ticket,
  UserRound,
} from "lucide-react";
import type {
  FormEvent,
  ReactNode,
} from "react";
import { useMemo, useState } from "react";

const PAYMENT_API_URL =
  import.meta.env["VITE_PAYMENT_API_URL"] ?? "";

// ============================================================
// TYPE
// ============================================================

type ParticipantResult = {
  success: true;

  registrationId: string;

  bib: string | number;

  paymentCode?: string;

  status?: string;

  paymentStatus?: string;

  category?: string;

  name?: string;

  namaLengkap?: string;

  email?: string;

  whatsapp?: string;

  noWa?: string;

  domicile?: string;

  domisiliSaatIni?: string;

  jersey?: string;

  ukuranJersey?: string;
};

type ApiError = {
  success: false;

  errorCode?: string;

  paymentStatus?: string;

  message?: string;
};

type ApiResponse =
  | ParticipantResult
  | ApiError;

// ============================================================
// ROUTE
// ============================================================

export const Route = createFileRoute("/cek")({
  head: () => ({
    meta: [
      {
        title:
          "Cek Peserta | PKU Fresh Run 2026",
      },
      {
        name: "description",
        content:
          "Cek peserta dan e-ticket PKU Fresh Run 2026.",
      },
    ],
  }),

  component:
    CekPesertaPage,
});

// ============================================================
// HELPER
// ============================================================

function valueOf(
  ...values: Array<
    string | number | null | undefined
  >
): string {
  for (const value of values) {
    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    ) {
      return String(value);
    }
  }

  return "-";
}

// ============================================================
// CATEGORY THEME
// ============================================================

function getCategoryTheme(
  category: string,
) {
  const normalized =
    category
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();

  const is25K =
    normalized.includes("2.5") ||
    normalized.includes("2,5") ||
    normalized.includes("2_5") ||
    normalized.includes("2 5");

  if (is25K) {
    return {
      type: "2.5K",

      label: "2.5K RUN",

      accent: "#468519",

      accentDark: "#356B13",

      accentSoft: "#EDF7E8",

      accentBorder:
        "rgba(70,133,25,.22)",

      headerGradient:
        "linear-gradient(135deg, #0A5490 0%, #145E8F 48%, #468519 100%)",

      bibGradient:
        "linear-gradient(135deg, #468519 0%, #0A5490 100%)",

      stripe:
        "rgba(70,133,25,.10)",
    };
  }

  return {
    type: "5K",

    label: "5K RUN",

    accent: "#F18B1F",

    accentDark: "#D96E0A",

    accentSoft: "#FFF3E6",

    accentBorder:
      "rgba(241,139,31,.24)",

    headerGradient:
      "linear-gradient(135deg, #0A5490 0%, #145E8F 48%, #F18B1F 100%)",

    bibGradient:
      "linear-gradient(135deg, #F18B1F 0%, #0A5490 100%)",

    stripe:
      "rgba(241,139,31,.10)",
  };
}

// ============================================================
// CONTACT ITEM
// ============================================================

function ContactItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="group flex min-w-0 items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 transition">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        style={{
          backgroundColor:
            "#0A5490",
        }}
      >
        <span className="text-white">
          {icon}
        </span>
      </div>

      <div className="min-w-0">
        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
          {label}
        </p>

        <p className="mt-1 truncate text-xs font-bold text-slate-800 sm:text-sm">
          {value}
        </p>
      </div>
    </div>
  );
}

// ============================================================
// PAGE
// ============================================================

function CekPesertaPage() {
  const [
    registrationId,
    setRegistrationId,
  ] = useState("");

  const [nik, setNik] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [participant, setParticipant] =
    useState<ParticipantResult | null>(
      null,
    );

  // ==========================================================
  // THEME
  // ==========================================================

  const theme =
    useMemo(
      () =>
        getCategoryTheme(
          participant?.category ?? "",
        ),
      [
        participant?.category,
      ],
    );

  // ==========================================================
  // SUBMIT
  // ==========================================================

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    setParticipant(null);

    const registration =
      registrationId
        .trim()
        .toUpperCase();

    const identity =
      nik
        .trim()
        .replace(/\s/g, "");

    if (!registration) {
      setError(
        "Nomor registrasi wajib diisi.",
      );

      return;
    }

    if (!identity) {
      setError(
        "Nomor identitas / NIK wajib diisi.",
      );

      return;
    }

    if (!PAYMENT_API_URL) {
      setError(
        "VITE_PAYMENT_API_URL belum dikonfigurasi.",
      );

      return;
    }

    setLoading(true);

    try {
      const url =
        new URL(
          PAYMENT_API_URL,
        );

      url.searchParams.set(
        "action",
        "checkregistration",
      );

      url.searchParams.set(
        "registrationId",
        registration,
      );

      url.searchParams.set(
        "nik",
        identity,
      );

      const response =
        await fetch(
          url.toString(),
          {
            method: "GET",
            redirect: "follow",
          },
        );

      if (!response.ok) {
        throw new Error(
          `Server mengembalikan status ${response.status}.`,
        );
      }

      const result =
        (await response.json()) as ApiResponse;

      if (
        result.success === false
      ) {
        setError(
          result.message ??
            "Nomor registrasi atau nomor identitas tidak sesuai.",
        );

        return;
      }

      setParticipant(result);
    } catch (err) {
      console.error(
        "Gagal mengecek peserta:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengecek data peserta.",
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================================
  // RESET
  // ==========================================================

  function handleReset() {
    setRegistrationId("");

    setNik("");

    setParticipant(null);

    setError("");
  }

  // ==========================================================
  // PRINT
  // ==========================================================

  function handlePrint() {
    window.print();
  }

  // ==========================================================
  // DATA
  // ==========================================================

  const participantName =
    valueOf(
      participant?.name,
      participant?.namaLengkap,
    );

  const participantBib =
    valueOf(
      participant?.bib,
    );

  const participantJersey =
    valueOf(
      participant?.jersey,
      participant?.ukuranJersey,
    );

  const participantWhatsapp =
    valueOf(
      participant?.whatsapp,
      participant?.noWa,
    );

  const participantEmail =
    valueOf(
      participant?.email,
    );

  const participantDomicile =
    valueOf(
      participant?.domicile,
      participant?.domisiliSaatIni,
    );

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <>
      <style>{`

        /* =====================================================
           PRINT
        ===================================================== */

        @media print {

          @page {
            size: A4;
            margin: 0;
          }

          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
          }

          body * {
            visibility: hidden;
          }

          #participant-ticket,
          #participant-ticket * {
            visibility: visible;
          }

          #participant-ticket {
            position: absolute !important;
            left: 50% !important;
            top: 10mm !important;
            transform: translateX(-50%) !important;
            width: 178mm !important;
            margin: 0 !important;
            box-shadow: none !important;
          }

          .no-print {
            display: none !important;
          }
        }

        /* =====================================================
           SCROLLBAR
        ===================================================== */

        .ticket-scrollbar::-webkit-scrollbar {
          width: 5px;
        }

        .ticket-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .ticket-scrollbar::-webkit-scrollbar-thumb {
          background: #0A5490;
          border-radius: 999px;
        }

      `}</style>

      <main className="min-h-screen bg-[#F3F6F9]">

        {/* ===================================================
            HERO
        =================================================== */}

        <section className="no-print relative overflow-hidden bg-[#0A5490]">

          {/* Background decoration */}

          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(255,255,255,.04) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.04) 50%, rgba(255,255,255,.04) 75%, transparent 75%)",
              backgroundSize:
                "44px 44px",
            }}
          />

          <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full border-[55px] border-[#F18B1F]/20" />

          <div className="absolute -bottom-36 -left-28 h-80 w-80 rounded-full border-[45px] border-[#468519]/20" />

          <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">

            <div className="max-w-2xl">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white backdrop-blur-md">

                <Ticket className="h-4 w-4" />

                Official Participant Portal

              </div>

              <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl">

                Cek
                <br />

                Peserta.

              </h1>

              <p className="mt-5 max-w-xl text-sm leading-6 text-white/70 sm:text-base">

                Temukan data peserta dan
                e-ticket PKU Fresh Run 2026
                menggunakan nomor registrasi
                dan nomor identitas.

              </p>

            </div>

          </div>

        </section>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">

          {/* =================================================
              SEARCH
          ================================================= */}

          <div className="no-print relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_15px_50px_rgba(15,23,42,.07)]">

            {/* top line */}

            <div className="h-1.5 bg-[#0A5490]" />

            <div className="p-5 sm:p-8">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF2F8]">

                  <Search className="h-5 w-5 text-[#0A5490]" />

                </div>

                <div>

                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0A5490]">
                    Participant Search
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-900">
                    Cari Data Peserta
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Gunakan data yang sama
                    dengan data pendaftaran.
                  </p>

                </div>

              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-7"
              >

                <div className="grid gap-4 md:grid-cols-2">

                  {/* REGISTRATION */}

                  <div>

                    <label
                      htmlFor="registrationId"
                      className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-slate-600"
                    >
                      Nomor Registrasi
                    </label>

                    <input
                      id="registrationId"
                      type="text"
                      value={registrationId}
                      onChange={(event) =>
                        setRegistrationId(
                          event.target.value.toUpperCase(),
                        )
                      }
                      placeholder="PFR26-0010"
                      autoComplete="off"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-bold text-slate-800 outline-none transition focus:border-[#0A5490] focus:bg-white focus:ring-4 focus:ring-[#0A5490]/10"
                    />

                  </div>

                  {/* NIK */}

                  <div>

                    <label
                      htmlFor="nik"
                      className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-slate-600"
                    >
                      Nomor Identitas / NIK
                    </label>

                    <input
                      id="nik"
                      type="text"
                      inputMode="numeric"
                      value={nik}
                      onChange={(event) =>
                        setNik(
                          event.target.value,
                        )
                      }
                      placeholder="Masukkan NIK"
                      autoComplete="off"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-bold text-slate-800 outline-none transition focus:border-[#0A5490] focus:bg-white focus:ring-4 focus:ring-[#0A5490]/10"
                    />

                  </div>

                </div>

                {/* ERROR */}

                {error && (

                  <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4">

                    <div className="flex gap-3">

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100">

                        <span className="text-sm font-black text-red-600">
                          !
                        </span>

                      </div>

                      <div>

                        <p className="text-sm font-black text-red-700">

                          {error
                            .toLowerCase()
                            .includes(
                              "pembayaran",
                            )
                            ? "Pembayaran Belum Sukses"
                            : "Data Tidak Ditemukan"}

                        </p>

                        <p className="mt-1 text-xs leading-5 text-red-600">
                          {error}
                        </p>

                      </div>

                    </div>

                  </div>

                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0A5490] px-5 py-4 text-sm font-black text-white shadow-[0_12px_25px_rgba(10,84,144,.22)] transition hover:-translate-y-0.5 hover:bg-[#084779] disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Mengecek Peserta...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />

                      Tampilkan E-Ticket
                    </>
                  )}

                </button>

              </form>

            </div>

          </div>

          {/* =================================================
              E-TICKET
          ================================================= */}

          {participant && (

            <div className="mt-8">

              <div
                id="participant-ticket"
                className="mx-auto max-w-3xl"
              >

                {/* =============================================
                    TICKET
                ============================================= */}

                <div
                  className="relative overflow-hidden rounded-[34px] bg-white shadow-[0_30px_90px_rgba(15,23,42,.18)]"
                  style={{
                    border:
                      `1px solid ${theme.accentBorder}`,
                  }}
                >

                  {/* =========================================
                      TOP RACE HEADER
                  ========================================= */}

                  <div
                    className="relative overflow-hidden px-6 py-7 text-white sm:px-9 sm:py-8"
                    style={{
                      background:
                        theme.headerGradient,
                    }}
                  >

                    {/* diagonal pattern */}

                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          `repeating-linear-gradient(-45deg, transparent, transparent 16px, ${theme.stripe} 16px, ${theme.stripe} 32px)`,
                      }}
                    />

                    {/* circles */}

                    <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full border-[35px] border-white/10" />

                    <div className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full border-[40px] border-white/10" />

                    <div className="relative">

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <div className="flex items-center gap-2">

                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur">

                              <Ticket className="h-4 w-4" />

                            </div>

                            <span className="text-[9px] font-black uppercase tracking-[0.22em] text-white/75">
                              Official E-Ticket
                            </span>

                          </div>

                          <h2 className="mt-5 text-3xl font-black uppercase leading-none tracking-[-0.04em] sm:text-5xl">
                            PKU FRESH RUN
                          </h2>

                          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/65 sm:text-xs">
                            2026 • PARTICIPANT PASS
                          </p>

                        </div>

                        {/* CATEGORY */}

                        <div
                          className="shrink-0 rounded-2xl border border-white/25 bg-white/15 px-4 py-3 text-center shadow-lg backdrop-blur-md"
                        >

                          <p className="text-[8px] font-black uppercase tracking-[0.18em] text-white/60">
                            Race
                          </p>

                          <p className="mt-1 text-lg font-black leading-none sm:text-2xl">
                            {theme.type}
                          </p>

                          <p className="mt-1 text-[8px] font-black uppercase tracking-[0.12em] text-white/60">
                            RUN
                          </p>

                        </div>

                      </div>

                      {/* verified */}

                      <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 backdrop-blur">

                        <CheckCircle2 className="h-4 w-4" />

                        <span className="text-[9px] font-black uppercase tracking-[0.16em]">
                          Verified Participant
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* =========================================
                      MAIN TICKET
                  ========================================= */}

                  <div className="relative px-6 py-7 sm:px-9 sm:py-9">

                    {/* =======================================
                        PARTICIPANT NAME
                    ======================================= */}

                    <div className="flex items-center gap-4">

                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                        style={{
                          backgroundColor:
                            theme.accentSoft,
                        }}
                      >

                        <UserRound
                          className="h-6 w-6"
                          style={{
                            color:
                              theme.accent,
                          }}
                        />

                      </div>

                      <div className="min-w-0">

                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                          Participant Name
                        </p>

                        <h3 className="mt-1 break-words text-xl font-black uppercase leading-tight tracking-tight text-[#0A5490] sm:text-3xl">
                          {participantName}
                        </h3>

                      </div>

                    </div>

                    {/* =======================================
                        BIB
                    ======================================= */}

                    <div className="mt-7">

                      <div
                        className="relative overflow-hidden rounded-[28px]"
                        style={{
                          background:
                            theme.bibGradient,
                        }}
                      >

                        {/* race stripes */}

                        <div
                          className="absolute inset-0 opacity-20"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(-45deg, transparent 0px, transparent 20px, rgba(255,255,255,.15) 20px, rgba(255,255,255,.15) 40px)",
                          }}
                        />

                        {/* top label */}

                        <div className="relative flex items-center justify-between px-6 pt-6 sm:px-8">

                          <div>

                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60">
                              Race Number
                            </p>

                            <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-white/80">
                              Official BIB
                            </p>

                          </div>

                          <div className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5">

                            <span className="text-[8px] font-black uppercase tracking-[0.15em] text-white">
                              {theme.label}
                            </span>

                          </div>

                        </div>

                        {/* BIB NUMBER */}

                        <div className="relative px-6 pb-6 pt-3 sm:px-8 sm:pb-8">

                          <p className="select-all text-center text-[82px] font-black leading-none tracking-[-0.07em] text-white drop-shadow-[0_8px_20px_rgba(0,0,0,.15)] sm:text-[120px]">
                            {participantBib}
                          </p>

                          <div className="mt-2 flex items-center justify-center gap-2">

                            <div className="h-px w-8 bg-white/30" />

                            <span className="text-[8px] font-black uppercase tracking-[0.25em] text-white/65">
                              PKU FRESH RUN 2026
                            </span>

                            <div className="h-px w-8 bg-white/30" />

                          </div>

                        </div>

                      </div>

                    </div>

                    {/* =======================================
                        PERFORATION
                    ======================================= */}

                    <div className="relative my-7">

                      <div className="border-t-2 border-dashed border-slate-200" />

                      <div className="absolute -left-[25px] -top-[13px] h-6 w-6 rounded-full bg-[#F3F6F9]" />

                      <div className="absolute -right-[25px] -top-[13px] h-6 w-6 rounded-full bg-[#F3F6F9]" />

                    </div>

                    {/* =======================================
                        JERSEY
                    ======================================= */}

                    <div
                      className="relative overflow-hidden rounded-[26px] border p-5 sm:p-6"
                      style={{
                        backgroundColor:
                          theme.accentSoft,

                        borderColor:
                          theme.accentBorder,
                      }}
                    >

                      {/* decorative */}

                      <div
                        className="absolute -right-8 -top-12 h-32 w-32 rounded-full border-[20px]"
                        style={{
                          borderColor:
                            theme.accentBorder,
                        }}
                      />

                      <div className="relative flex items-center justify-between gap-4">

                        <div className="flex items-center gap-4">

                          <div
                            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-lg"
                            style={{
                              backgroundColor:
                                theme.accent,
                            }}
                          >

                            <Shirt className="h-7 w-7 text-white" />

                          </div>

                          <div>

                            <p
                              className="text-[9px] font-black uppercase tracking-[0.2em]"
                              style={{
                                color:
                                  theme.accent,
                              }}
                            >
                              Jersey Size
                            </p>

                            <p className="mt-1 text-xs font-bold text-slate-500">
                              Ukuran jersey peserta
                            </p>

                          </div>

                        </div>

                        {/* SIZE */}

                        <div
                          className="flex h-[68px] min-w-[78px] items-center justify-center rounded-2xl px-4 shadow-xl"
                          style={{
                            backgroundColor:
                              theme.accent,
                          }}
                        >

                          <span className="text-3xl font-black text-white">
                            {participantJersey}
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* =======================================
                        CONTACT DATA
                    ======================================= */}

                    <div className="mt-6">

                      <p className="mb-3 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                        Participant Information
                      </p>

                      <div className="grid gap-3 sm:grid-cols-2">

                        <ContactItem
                          icon={
                            <Smartphone className="h-4 w-4" />
                          }
                          label="WhatsApp"
                          value={
                            participantWhatsapp
                          }
                        />

                        <ContactItem
                          icon={
                            <Mail className="h-4 w-4" />
                          }
                          label="Email"
                          value={
                            participantEmail
                          }
                        />

                        <div className="sm:col-span-2">

                          <ContactItem
                            icon={
                              <MapPin className="h-4 w-4" />
                            }
                            label="Domisili Saat Ini"
                            value={
                              participantDomicile
                            }
                          />

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* =========================================
                      TICKET FOOTER
                  ========================================= */}

                  <div
                    className="relative overflow-hidden px-6 py-5 sm:px-9"
                    style={{
                      backgroundColor:
                        "#F5F7F9",
                    }}
                  >

                    {/* stripe */}

                    <div
                      className="absolute bottom-0 left-0 h-1 w-full"
                      style={{
                        background:
                          `linear-gradient(90deg, #0A5490 0%, #0A5490 40%, ${theme.accent} 40%, ${theme.accent} 70%, #468519 70%, #468519 100%)`,
                      }}
                    />

                    <div className="relative flex items-center justify-between gap-5">

                      <div>

                        <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">
                          Registration ID
                        </p>

                        <p className="mt-1 font-mono text-xs font-black tracking-wider text-[#0A5490]">
                          {participant.registrationId}
                        </p>

                      </div>

                      <div className="flex items-center gap-2">

                        <ShieldCheck
                          className="h-5 w-5"
                          style={{
                            color:
                              "#468519",
                          }}
                        />

                        <div className="text-right">

                          <p className="text-[8px] font-black uppercase tracking-[0.18em] text-slate-400">
                            Status
                          </p>

                          <p className="text-[10px] font-black uppercase text-[#468519]">
                            Verified
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* =============================================
                  ACTION
              ============================================= */}

              <div className="no-print mx-auto mt-6 max-w-3xl">

                <div className="grid gap-3 sm:grid-cols-2">

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-[#0A5490] px-5 py-4 text-sm font-black text-white shadow-[0_12px_25px_rgba(10,84,144,.20)] transition hover:-translate-y-0.5 hover:bg-[#084779]"
                  >

                    <Download className="h-4 w-4" />

                    Download E-Ticket

                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                  >

                    <ArrowLeft className="h-4 w-4" />

                    Cek Peserta Lain

                  </button>

                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-center text-[10px] leading-5 text-slate-400">

                  <ShieldCheck className="h-3.5 w-3.5 shrink-0" />

                  E-ticket ini merupakan bukti
                  peserta terdaftar PKU Fresh Run
                  2026.

                </div>

              </div>

            </div>

          )}

        </section>

      </main>
    </>
  );
}