import { createFileRoute } from "@tanstack/react-router";
import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import { categories } from "@/data/event";

// ============================================================
// ROUTE SEARCH
// ============================================================
//
// URL yang digunakan dari daftar.tsx:
//
// /bayar?category=5k-umum
// /bayar?category=2-5k-umum
// /bayar?category=pelajar-mahasiswa
//
// category menggunakan SLUG dari data/event.ts
// ============================================================

type BayarSearch = {
  category?: string;
};

export const Route = createFileRoute("/bayar")({
  validateSearch: (
    search: Record<string, unknown>
  ): BayarSearch => {
    const category = search["category"];

    if (typeof category === "string" && category.length > 0) {
      return {
        category,
      };
    }

    return {};
  },

  head: () => ({
    meta: [
      {
        title: "Pembayaran | PKU Fresh Run",
      },
      {
        name: "description",
        content:
          "Buat kode pembayaran PKU Muhammadiyah Sukoharjo Fresh Run.",
      },
    ],
  }),

  component: Bayar,
});

// ============================================================
// PAYMENT API RESPONSE
// ============================================================

type PaymentApiSuccess = {
  success: true;

  existing?: boolean;

  alreadyPaid?: boolean;

  id?: string;

  code?: string | number;

  category?: string;

  productKey?: string;

  basePrice?: number | string;

  totalAmount?: number | string;

  status?: string;

  email?: string;

  createdAt?: string;

  expiredAt?: string | null;

  message?: string;
};

type PaymentApiError = {
  success: false;

  message?: string;
};

type PaymentApiResponse =
  | PaymentApiSuccess
  | PaymentApiError;

// ============================================================
// NORMALIZED PAYMENT RESULT
// ============================================================

type PaymentResult = {
  success: true;

  existing: boolean;

  alreadyPaid: boolean;

  id: string;

  code: string;

  category: string;

  productKey: string;

  basePrice: number;

  totalAmount: number;

  status: string;

  email: string;

  createdAt: string;

  expiredAt: string | null;

  message: string;
};

// ============================================================
// GOOGLE APPS SCRIPT URL
// ============================================================

const PAYMENT_API_URL =
  import.meta.env["VITE_PAYMENT_API_URL"];

// ============================================================
// FORMAT RUPIAH
// ============================================================

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

// ============================================================
// FORMAT DATE
// ============================================================

function formatDate(value: string | null): string {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

// ============================================================
// ERROR MESSAGE
// ============================================================

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Terjadi kesalahan. Silakan coba lagi.";
}

// ============================================================
// MAIN COMPONENT
// ============================================================

function Bayar() {
  // ==========================================================
  // SEARCH
  // ==========================================================

  const search = Route.useSearch();

  // ==========================================================
  // CATEGORY SLUG
  // ==========================================================

  const categorySlug = search["category"];

  // ==========================================================
  // FIND CATEGORY FROM EVENT DATA
  // ==========================================================
  //
  // Contoh:
  //
  // categorySlug = "5k-umum"
  //
  // akan mendapatkan:
  //
  // productKey = "5K_PRESALE"
  //
  // ==========================================================

  const category = useMemo(() => {
    if (!categorySlug) {
      return null;
    }

    return (
      categories.find(
        (item) => item.slug === categorySlug
      ) ?? null
    );
  }, [categorySlug]);

  // ==========================================================
  // EMAIL
  // ==========================================================

  const [email, setEmail] = useState("");

  // ==========================================================
  // PAYMENT RESULT
  // ==========================================================

  const [paymentResult, setPaymentResult] =
    useState<PaymentResult | null>(null);

  // ==========================================================
  // LOADING
  // ==========================================================

  const [loading, setLoading] = useState(false);

  // ==========================================================
  // ERROR
  // ==========================================================

  const [error, setError] = useState("");

  // ==========================================================
  // API ERROR
  // ==========================================================

  const [apiError, setApiError] = useState("");

  // ==========================================================
  // CHECK API URL
  // ==========================================================

  useEffect(() => {
    if (!PAYMENT_API_URL) {
      setApiError(
        "VITE_PAYMENT_API_URL belum dikonfigurasi."
      );
    } else {
      setApiError("");
    }
  }, []);

  // ==========================================================
  // SUBMIT PAYMENT
  // ==========================================================

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setPaymentResult(null);

    // --------------------------------------------------------
    // VALIDASI CATEGORY SLUG
    // --------------------------------------------------------

    if (!categorySlug) {
      setError(
        "Kategori pembayaran belum dipilih."
      );

      return;
    }

    // --------------------------------------------------------
    // VALIDASI CATEGORY
    // --------------------------------------------------------

    if (!category) {
      setError(
        "Kategori pembayaran tidak valid atau tidak tersedia."
      );

      return;
    }

    // --------------------------------------------------------
    // VALIDASI PRODUCT KEY
    // --------------------------------------------------------

    if (!category.productKey) {
      setError(
        "Product pembayaran untuk kategori ini belum dikonfigurasi."
      );

      return;
    }

    // --------------------------------------------------------
    // VALIDASI API URL
    // --------------------------------------------------------

    if (!PAYMENT_API_URL) {
      setError(
        "Alamat API pembayaran belum dikonfigurasi."
      );

      return;
    }

    // --------------------------------------------------------
    // NORMALIZE EMAIL
    // --------------------------------------------------------

    const normalizedEmail =
      email.trim().toLowerCase();

    // --------------------------------------------------------
    // VALIDASI EMAIL
    // --------------------------------------------------------

    if (!normalizedEmail) {
      setError("Email wajib diisi.");
      return;
    }

    // --------------------------------------------------------
    // VALIDASI FORMAT EMAIL
    // --------------------------------------------------------

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      setError("Format email tidak valid.");
      return;
    }

    // --------------------------------------------------------
    // START LOADING
    // --------------------------------------------------------

    setLoading(true);

    try {
      // ======================================================
      // BUILD URL
      // ======================================================

      const url = new URL(PAYMENT_API_URL);

      url.searchParams.set(
        "action",
        "create"
      );

      // IMPORTANT:
      // Apps Script menerima productKey,
      // bukan slug kategori.
      //
      // Contoh:
      // 5k-umum -> 5K_PRESALE

      url.searchParams.set(
        "product",
        category.productKey
      );

      url.searchParams.set(
        "email",
        normalizedEmail
      );

      // ======================================================
      // REQUEST
      // ======================================================

      const response = await fetch(
        url.toString(),
        {
          method: "GET",
        }
      );

      // ======================================================
      // HTTP ERROR
      // ======================================================

      if (!response.ok) {
        throw new Error(
          `Server pembayaran mengembalikan status ${response.status}.`
        );
      }

      // ======================================================
      // PARSE JSON
      // ======================================================

      const data =
        (await response.json()) as PaymentApiResponse;

      // ======================================================
      // API ERROR
      // ======================================================

      if (data.success !== true) {
        throw new Error(
          data.message ||
            "Pembayaran tidak dapat diproses."
        );
      }

      // ======================================================
      // NORMALIZE API RESULT
      // ======================================================
      //
      // Semua nilai optional dari Apps Script
      // diberikan fallback supaya aman terhadap
      // exactOptionalPropertyTypes.
      // ======================================================

      const normalizedResult: PaymentResult = {
        success: true,

        existing:
          data.existing ?? false,

        alreadyPaid:
          data.alreadyPaid ?? false,

        id:
          String(data.id ?? ""),

        code:
          String(data.code ?? "").padStart(4, "0"),

        category:
          String(
            data.category ??
              category.name
          ),

        productKey:
          String(
            data.productKey ??
              category.productKey
          ),

        basePrice:
          Number(
            data.basePrice ??
              0
          ),

        totalAmount:
          Number(
            data.totalAmount ??
              0
          ),

        status:
          String(
            data.status ??
              "UNPAID"
          ),

        email:
          String(
            data.email ??
              normalizedEmail
          ),

        createdAt:
          String(
            data.createdAt ??
              ""
          ),

        expiredAt:
          data.expiredAt
            ? String(data.expiredAt)
            : null,

        message:
          data.message ??
          "Kode pembayaran berhasil dibuat.",
      };

      // ======================================================
      // SAVE RESULT
      // ======================================================

      setPaymentResult(
        normalizedResult
      );

      // ======================================================
      // SAVE NORMALIZED EMAIL
      // ======================================================

      setEmail(
        normalizedEmail
      );
    } catch (err) {
      console.error(
        "Payment error:",
        err
      );

      setError(
        getErrorMessage(err)
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================================
  // GO TO FORM
  // ==========================================================

  function goToForm() {
    if (!paymentResult) {
      return;
    }

    const code =
      paymentResult.code;

    window.location.href =
      `/form?payment=${encodeURIComponent(
        code
      )}`;
  }

  // ==========================================================
  // NO CATEGORY
  // ==========================================================

  if (!categorySlug) {
    return (
      <div className="min-h-screen bg-[#f4f8fb] px-4 py-10">
        <div className="mx-auto max-w-xl">
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl">
            <div className="bg-[#0A5490] px-6 py-8 text-center text-white sm:px-10">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-3xl">
                !
              </div>

              <h1 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
                Kategori Belum Dipilih
              </h1>

              <p className="mt-2 text-sm text-white/80">
                Silakan pilih kategori
                pendaftaran terlebih dahulu.
              </p>
            </div>

            <div className="p-6 sm:p-10">
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/";
                }}
                className="w-full rounded-2xl bg-[#97D91B] px-5 py-4 font-black uppercase tracking-wide text-[#123456] transition hover:brightness-95"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================
  // INVALID CATEGORY
  // ==========================================================

  if (!category) {
    return (
      <div className="min-h-screen bg-[#f4f8fb] px-4 py-10">
        <div className="mx-auto max-w-xl">
          <div className="rounded-[2rem] bg-white p-8 text-center shadow-xl">
            <h1 className="text-2xl font-black uppercase text-[#0A5490]">
              Kategori Tidak Valid
            </h1>

            <p className="mt-3 text-sm text-slate-500">
              Kategori pembayaran yang
              dipilih tidak tersedia.
            </p>

            <button
              type="button"
              onClick={() => {
                window.location.href = "/";
              }}
              className="mt-6 w-full rounded-2xl bg-[#0A5490] px-5 py-4 font-black uppercase text-white"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================
  // MAIN
  // ==========================================================

  return (
    <div className="min-h-screen bg-[#f4f8fb] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="mb-6 text-center">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#0A5490]">
            PKU MUHAMMADIYAH SUKOHARJO
          </p>

          <h1 className="mt-2 text-3xl font-black uppercase tracking-tight text-[#123456] sm:text-5xl">
            Pembayaran
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
            Masukkan email yang akan
            digunakan untuk menerima
            informasi pembayaran dan
            pendaftaran.
          </p>
        </div>

        {/* ==================================================
            CARD
        ================================================== */}

        <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(10,84,144,.12)]">

          {/* CATEGORY HEADER */}

          <div className="relative overflow-hidden bg-[#0A5490] px-6 py-7 text-white sm:px-10 sm:py-9">

            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10" />

            <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-[#97D91B]/20" />

            <div className="relative">

              <div className="inline-flex rounded-full bg-[#97D91B] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#123456]">
                Kategori
              </div>

              <h2 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-4xl">
                {category.name}
              </h2>

              <p className="mt-2 max-w-xl text-sm text-white/75">
                Benefit:{" "}
                {category.benefits.join(", ")}
              </p>

            </div>
          </div>

          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="p-6 sm:p-10">

            {/* API ERROR */}

            {apiError && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <p className="font-bold">
                  Konfigurasi API bermasalah
                </p>

                <p className="mt-1">
                  {apiError}
                </p>
              </div>
            )}

            {/* ERROR */}

            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <p className="font-bold">
                  Pembayaran belum dapat diproses
                </p>

                <p className="mt-1 leading-relaxed">
                  {error}
                </p>
              </div>
            )}

            {/* =================================================
                PAYMENT RESULT
            ================================================= */}

            {paymentResult ? (
              <div>

                {/* SUCCESS */}

                <div className="rounded-[1.5rem] border border-[#97D91B]/40 bg-[#f5fce9] p-5 sm:p-7">
                  <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#97D91B] text-xl font-black text-[#123456]">
                      ✓
                    </div>

                    <div className="min-w-0">

                      <h3 className="text-lg font-black uppercase text-[#123456] sm:text-xl">
                        Kode Pembayaran Berhasil
                      </h3>

                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {paymentResult.message}
                      </p>

                    </div>
                  </div>
                </div>

                {/* PAYMENT CODE */}

                <div className="mt-6 rounded-[1.5rem] border-2 border-dashed border-[#0A5490]/20 bg-[#f8fbfd] p-6 text-center sm:p-8">

                  <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                    Kode Pembayaran
                  </p>

                  <div className="mt-3 select-all font-mono text-5xl font-black tracking-[0.18em] text-[#0A5490] sm:text-6xl">
                    {paymentResult.code}
                  </div>

                  <p className="mt-3 text-xs text-slate-500">
                    Simpan kode ini dan
                    gunakan pada proses
                    pendaftaran berikutnya.
                  </p>

                </div>

                {/* PAYMENT DETAIL */}

                <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200">

                  <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
                    <h3 className="text-sm font-black uppercase tracking-wide text-[#123456]">
                      Detail Pembayaran
                    </h3>
                  </div>

                  <div className="divide-y divide-slate-100">

                    {/* CATEGORY */}

                    <div className="flex items-center justify-between gap-4 px-5 py-4">
                      <span className="text-sm text-slate-500">
                        Kategori
                      </span>

                      <span className="text-right text-sm font-bold text-[#123456]">
                        {paymentResult.category}
                      </span>
                    </div>

                    {/* EMAIL */}

                    <div className="flex items-start justify-between gap-4 px-5 py-4">
                      <span className="text-sm text-slate-500">
                        Email
                      </span>

                      <span className="max-w-[65%] break-all text-right text-sm font-bold text-[#123456]">
                        {paymentResult.email}
                      </span>
                    </div>

                    {/* BASE PRICE */}

                    <div className="flex items-center justify-between gap-4 px-5 py-4">
                      <span className="text-sm text-slate-500">
                        Harga
                      </span>

                      <span className="text-right text-sm font-bold text-[#123456]">
                        {formatRupiah(
                          paymentResult.basePrice
                        )}
                      </span>
                    </div>

                    {/* UNIQUE CODE */}

                    <div className="flex items-center justify-between gap-4 px-5 py-4">
                      <span className="text-sm text-slate-500">
                        Kode unik
                      </span>

                      <span className="text-right text-sm font-bold text-[#123456]">
                        {formatRupiah(
                          paymentResult.totalAmount -
                            paymentResult.basePrice
                        )}
                      </span>
                    </div>

                    {/* TOTAL */}

                    <div className="flex items-center justify-between gap-4 bg-[#0A5490] px-5 py-5 text-white">

                      <span className="text-sm font-bold uppercase">
                        Total Transfer
                      </span>

                      <span className="text-right text-xl font-black">
                        {formatRupiah(
                          paymentResult.totalAmount
                        )}
                      </span>

                    </div>

                    {/* STATUS */}

                    <div className="flex items-center justify-between gap-4 px-5 py-4">

                      <span className="text-sm text-slate-500">
                        Status
                      </span>

                      <span
                        className={[
                          "rounded-full px-3 py-1 text-xs font-black uppercase",
                          paymentResult.status === "PAID"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700",
                        ].join(" ")}
                      >
                        {paymentResult.status}
                      </span>

                    </div>

                    {/* EXPIRED */}

                    <div className="flex items-center justify-between gap-4 px-5 py-4">

                      <span className="text-sm text-slate-500">
                        Berlaku sampai
                      </span>

                      <span className="text-right text-sm font-bold text-[#123456]">
                        {formatDate(
                          paymentResult.expiredAt
                        )}
                      </span>

                    </div>

                  </div>
                </div>

                {/* INSTRUCTION */}

                <div className="mt-6 rounded-[1.5rem] border border-blue-100 bg-blue-50 p-5">

                  <h3 className="font-black uppercase text-[#0A5490]">
                    Langkah berikutnya
                  </h3>

                  <ol className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">

                    <li>
                      <span className="font-bold text-[#0A5490]">
                        1.
                      </span>{" "}
                      Catat kode pembayaran{" "}
                      <span className="font-bold">
                        {paymentResult.code}
                      </span>.
                    </li>

                    <li>
                      <span className="font-bold text-[#0A5490]">
                        2.
                      </span>{" "}
                      Lakukan transfer sesuai
                      total yang tertera.
                    </li>

                    <li>
                      <span className="font-bold text-[#0A5490]">
                        3.
                      </span>{" "}
                      Lanjutkan ke form
                      pendaftaran dan
                      lengkapi data peserta.
                    </li>

                    <li>
                      <span className="font-bold text-[#0A5490]">
                        4.
                      </span>{" "}
                      Upload bukti transfer
                      pada form pendaftaran.
                    </li>

                  </ol>
                </div>

                {/* CONTINUE */}

                <button
                  type="button"
                  onClick={goToForm}
                  className="mt-6 w-full rounded-2xl bg-[#97D91B] px-6 py-4 text-sm font-black uppercase tracking-wide text-[#123456] shadow-[0_10px_30px_rgba(151,217,27,.2)] transition hover:brightness-95 active:scale-[.99]"
                >
                  Lanjutkan ke Form Pendaftaran
                </button>

                {/* CHANGE EMAIL */}

                <button
                  type="button"
                  onClick={() => {
                    setPaymentResult(null);
                    setError("");
                    setEmail("");
                  }}
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  Gunakan Email Lain
                </button>

              </div>
            ) : (

              /* =================================================
                 FORM
              ================================================= */

              <form onSubmit={handleSubmit}>

                {/* PRICE */}

                <div className="mb-6 rounded-[1.5rem] bg-[#f4f8fb] p-5">

                  <div className="flex items-center justify-between gap-4">

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Harga Pendaftaran
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#123456]">
                        {category.name}
                      </p>
                    </div>

                    <p className="text-xl font-black text-[#0A5490]">
                      {category.price}
                    </p>

                  </div>
                </div>

                {/* EMAIL */}

                <div>

                  <label
                    htmlFor="email"
                    className="block text-sm font-black text-[#123456]"
                  >
                    Email Anda
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    Gunakan email aktif.
                    Email ini akan dikaitkan
                    dengan kode pembayaran Anda.
                  </p>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="contoh@email.com"
                    value={email}
                    onChange={(event) => {
                      setEmail(
                        event.target.value
                      );

                      if (error) {
                        setError("");
                      }
                    }}
                    disabled={loading}
                    className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-base text-[#123456] outline-none transition placeholder:text-slate-300 focus:border-[#0A5490] focus:ring-4 focus:ring-[#0A5490]/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                  />

                </div>

                {/* IMPORTANT INFO */}

                <div className="mt-6 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-5">

                  <div className="flex gap-3">

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-200 font-black text-amber-800">
                      !
                    </div>

                    <div>

                      <h3 className="text-sm font-black text-amber-900">
                        Penting
                      </h3>

                      <p className="mt-1 text-xs leading-relaxed text-amber-800">
                        Satu email yang masih
                        memiliki kode pembayaran
                        aktif akan menggunakan
                        kembali kode tersebut.
                        Sistem tidak membuat kode
                        pembayaran baru.
                      </p>

                    </div>
                  </div>
                </div>

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={
                    loading ||
                    !email.trim() ||
                    Boolean(apiError)
                  }
                  className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#97D91B] px-6 py-4 text-sm font-black uppercase tracking-wide text-[#123456] shadow-[0_10px_30px_rgba(151,217,27,.2)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#123456]/30 border-t-[#123456]" />

                      Membuat Kode
                      Pembayaran...
                    </>
                  ) : (
                    "Lanjutkan Pembayaran"
                  )}
                </button>

                {/* BACK */}

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    window.location.href = "/";
                  }}
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Kembali
                </button>

              </form>
            )}
          </div>
        </div>

        {/* FOOTER */}

        <p className="mt-6 text-center text-xs leading-relaxed text-slate-400">
          PKU Muhammadiyah Sukoharjo
          Fun Run • 29 November 2026
        </p>

      </div>
    </div>
  );
}