import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  CreditCard,
  Loader2,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { categories } from "@/data/event";

const PAYMENT_API_URL = import.meta.env["VITE_PAYMENT_API_URL"] ?? "";

const PAYMENT_INFO = {
  bankName: "BANK XXXXX",
  accountNumber: "XXXXXXXXXX",
  accountName: "PKU MUHAMMADIYAH SUKOHARJO",
};

const PRODUCT_MAP: Record<string, string> = {
  "5k-umum": "5K_PRESALE",
  "2-5k-umum": "2_5K_PRESALE",
  "pelajar-mahasiswa": "5K_MAHASISWA",
};

type PaymentResult = {
  success: true;
  id: string;
  code: string;
  category: string;
  productKey: string;
  basePrice: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  expiredAt: string;
  message?: string;
};

type PaymentError = {
  success: false;
  message?: string;
};

type PaymentResponse = PaymentResult | PaymentError;

export const Route = createFileRoute("/bayar")({
  validateSearch: (search: Record<string, unknown>) => ({
    category:
      typeof search["category"] === "string"
        ? search["category"]
        : "",
  }),
  component: BayarPage,
});

function BayarPage() {
  const { category: categorySlug } = Route.useSearch();

  const category = useMemo(
    () => categories.find((item) => item.slug === categorySlug),
    [categorySlug],
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [payment, setPayment] = useState<PaymentResult | null>(null);
  const [copied, setCopied] = useState(false);

  /*
   * Mencegah generatePaymentCode() dipanggil dua kali
   * akibat React Strict Mode saat development.
   */
  const generatedForRef = useRef<string | null>(null);

  /*
   * Generate kode hanya satu kali untuk setiap kategori.
   */
  useEffect(() => {
    if (!category) return;

    if (category.slug === "pelajar-mahasiswa") return;

    if (generatedForRef.current === category.slug) {
      return;
    }

    generatedForRef.current = category.slug;

    void generatePaymentCode();
  }, [category]);

  async function generatePaymentCode() {
    if (!category) return;

    const productKey = PRODUCT_MAP[category.slug];

    if (!productKey) {
      setError("Kategori pembayaran belum dikonfigurasi.");
      generatedForRef.current = null;
      return;
    }

    if (!PAYMENT_API_URL) {
      setError(
        "URL Google Apps Script belum dikonfigurasi. Tambahkan VITE_PAYMENT_API_URL pada file .env.",
      );
      generatedForRef.current = null;
      return;
    }

    setLoading(true);
    setError("");
    setPayment(null);

    try {
      const url =
        `${PAYMENT_API_URL}` +
        `?action=create` +
        `&product=${encodeURIComponent(productKey)}`;

      const response = await fetch(url, {
        method: "GET",
        redirect: "follow",
      });

      if (!response.ok) {
        throw new Error(
          "Gagal menghubungi server pembayaran.",
        );
      }

      const result = (await response.json()) as PaymentResponse;

      if (!result.success) {
        throw new Error(
          result.message ?? "Kode pembayaran gagal dibuat.",
        );
      }

      setPayment({
        success: true,
        id: result.id,
        code: result.code,
        category: result.category,
        productKey: result.productKey,
        basePrice: result.basePrice,
        totalAmount: result.totalAmount,
        status: result.status,
        createdAt: result.createdAt,
        expiredAt: result.expiredAt,
        ...(result.message
          ? { message: result.message }
          : {}),
      });
    } catch (err) {
      console.error(err);

      /*
       * Reset supaya tombol Coba Lagi
       * bisa melakukan request baru.
       */
      generatedForRef.current = null;

      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat membuat kode pembayaran.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function copyText(value: string) {
    try {
      await navigator.clipboard.writeText(value);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      window.prompt("Salin teks berikut:", value);
    }
  }

  if (!category) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EAF6FF] px-4">
        <div className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-[0_15px_45px_rgba(20,43,77,0.1)]">
          <TriangleAlert className="mx-auto h-12 w-12 text-[#F18B1F]" />

          <h1 className="mt-5 font-display text-3xl text-[#062D50] uppercase">
            Kategori Tidak Ditemukan
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-[#062D50]/60">
            Silakan kembali ke halaman pendaftaran dan pilih
            kategori terlebih dahulu.
          </p>

          <Link
            to="/daftar"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#F18B1F] px-6 py-3.5 font-display text-sm tracking-wide text-white uppercase"
          >
            Kembali ke Daftar
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#EAF6FF] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">

        {/* HEADER */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#0A5490] px-4 py-2 text-[10px] font-extrabold tracking-[0.2em] text-white uppercase">
            <CreditCard className="h-3.5 w-3.5" />
            Pembayaran
          </div>

          <h1 className="mt-5 font-display text-4xl leading-none text-[#062D50] uppercase sm:text-5xl">
            Selesaikan
            <br />
            <span className="text-[#F18B1F]">
              Pembayaranmu
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#062D50]/60">
            Ikuti instruksi pembayaran di bawah ini. Kode
            pembayaran dibuat secara otomatis dan unik untuk
            pendaftaranmu.
          </p>
        </div>

        {/* STEPS */}
        <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-4">
          <PaymentStep
            number="01"
            title="Pilih"
            done
          />

          <PaymentStep
            number="02"
            title="Bayar"
            active
          />

          <PaymentStep
            number="03"
            title="Isi Form"
          />
        </div>

        {/* CARD */}
        <section className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-[0_15px_45px_rgba(20,43,77,0.1)]">

          {/* CATEGORY HEADER */}
          <div className="bg-[#0A5490] px-6 py-6 sm:px-8">
            <p className="text-[9px] font-extrabold tracking-[0.2em] text-white/60 uppercase">
              Kategori Pilihan
            </p>

            <h2 className="mt-1 font-display text-2xl text-white uppercase sm:text-3xl">
              {category.name}
            </h2>
          </div>

          <div className="p-6 sm:p-8">

            {/* PRICE */}
            <div className="rounded-[1.5rem] bg-[#EAF6FF] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">

                <div>
                  <p className="text-[9px] font-extrabold tracking-[0.18em] text-[#062D50]/40 uppercase">
                    Harga Dasar
                  </p>

                  <p className="mt-1 font-display text-2xl text-[#062D50]">
                    {category.price}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[9px] font-extrabold tracking-[0.18em] text-[#062D50]/40 uppercase">
                    Total Transfer
                  </p>

                  {loading ? (
                    <Loader2 className="ml-auto mt-1 h-6 w-6 animate-spin text-[#F18B1F]" />
                  ) : payment ? (
                    <p className="mt-1 font-display text-2xl text-[#F18B1F]">
                      {formatRupiah(payment.totalAmount)}
                    </p>
                  ) : (
                    <p className="mt-1 font-display text-2xl text-[#F18B1F]">
                      -
                    </p>
                  )}
                </div>

              </div>
            </div>

            {/* LOADING */}
            {loading && (
              <div className="mt-6 rounded-2xl border border-[#0A5490]/10 bg-[#F8FCFF] p-6 text-center">
                <Loader2 className="mx-auto h-7 w-7 animate-spin text-[#0A5490]" />

                <p className="mt-3 text-sm font-semibold text-[#062D50]">
                  Membuat kode pembayaran...
                </p>

                <p className="mt-1 text-xs text-[#062D50]/50">
                  Mohon jangan menutup halaman.
                </p>
              </div>
            )}

            {/* ERROR */}
            {error && !loading && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
                <div className="flex gap-3">

                  <TriangleAlert className="h-5 w-5 shrink-0 text-red-500" />

                  <div>
                    <p className="text-sm font-bold text-red-700">
                      Gagal membuat kode pembayaran
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-red-600">
                      {error}
                    </p>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => {
                    generatedForRef.current = null;
                    void generatePaymentCode();
                  }}
                  className="mt-4 rounded-full bg-red-600 px-5 py-2.5 text-xs font-bold text-white uppercase transition hover:bg-red-700"
                >
                  Coba Lagi
                </button>
              </div>
            )}

            {/* PAYMENT */}
            {payment && !loading && (
              <>

                {/* CODE */}
                <div className="mt-6">

                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[10px] font-extrabold tracking-[0.18em] text-[#062D50]/40 uppercase">
                      Kode Pembayaran
                    </p>

                    <span className="rounded-full bg-[#F2FBDD] px-3 py-1 text-[9px] font-extrabold text-[#468519] uppercase">
                      {payment.status || "PENDING"}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-3 rounded-2xl border-2 border-[#F18B1F]/30 bg-[#FFF8F1] p-4 sm:p-5">

                    <p className="min-w-0 flex-1 overflow-hidden font-mono text-3xl font-bold tracking-[0.08em] text-[#F18B1F] sm:text-5xl">
                      {payment.code}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        void copyText(payment.code)
                      }
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#F18B1F] text-white transition hover:scale-105 hover:bg-[#D97706]"
                      aria-label="Salin kode pembayaran"
                    >
                      {copied ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </button>

                  </div>

                  {copied && (
                    <p className="mt-2 text-center text-xs font-semibold text-[#468519]">
                      Kode berhasil disalin.
                    </p>
                  )}
                </div>

                {/* TRANSFER */}
                <div className="mt-6">

                  <p className="text-[10px] font-extrabold tracking-[0.18em] text-[#062D50]/40 uppercase">
                    Transfer Ke
                  </p>

                  <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-5">

                    <p className="text-xs font-bold text-[#062D50]/45 uppercase">
                      Bank
                    </p>

                    <p className="mt-1 font-display text-xl text-[#062D50]">
                      {PAYMENT_INFO.bankName}
                    </p>

                    <div className="mt-5 border-t border-slate-100 pt-5">

                      <p className="text-xs font-bold text-[#062D50]/45 uppercase">
                        Nomor Rekening
                      </p>

                      <div className="mt-1 flex items-center justify-between gap-3">

                        <p className="font-mono text-xl font-bold tracking-wide text-[#062D50]">
                          {PAYMENT_INFO.accountNumber}
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            void copyText(
                              PAYMENT_INFO.accountNumber,
                            )
                          }
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#EAF6FF] text-[#0A5490] transition hover:bg-[#D8EEFC]"
                          aria-label="Salin nomor rekening"
                        >
                          <Copy className="h-4 w-4" />
                        </button>

                      </div>
                    </div>

                    <div className="mt-5 border-t border-slate-100 pt-5">

                      <p className="text-xs font-bold text-[#062D50]/45 uppercase">
                        Atas Nama
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#062D50]">
                        {PAYMENT_INFO.accountName}
                      </p>

                    </div>

                  </div>
                </div>

                {/* TOTAL */}
                <div className="mt-6 rounded-[1.5rem] bg-[#0A5490] p-5 text-white sm:p-6">

                  <div className="flex items-center justify-between gap-4">

                    <div>
                      <p className="text-[9px] font-bold tracking-[0.18em] text-white/60 uppercase">
                        Jumlah yang harus ditransfer
                      </p>

                      <p className="mt-1 font-display text-3xl sm:text-4xl">
                        {formatRupiah(
                          payment.totalAmount,
                        )}
                      </p>
                    </div>

                    <CreditCard className="h-8 w-8 text-white/40" />

                  </div>
                </div>

                {/* WARNING */}
                <div className="mt-6 rounded-2xl border border-[#F18B1F]/20 bg-[#FFF8F1] p-4">

                  <div className="flex gap-3">

                    <TriangleAlert className="h-5 w-5 shrink-0 text-[#F18B1F]" />

                    <div>

                      <p className="text-xs font-extrabold text-[#8A3D06]">
                        Perhatikan nominal transfer
                      </p>

                      <p className="mt-1 text-xs leading-relaxed text-[#8A3D06]/70">
                        Transfer tepat sebesar{" "}
                        <strong>
                          {formatRupiah(
                            payment.totalAmount,
                          )}
                        </strong>
                        . Kode pembayaran{" "}
                        <strong>{payment.code}</strong>{" "}
                        digunakan sebagai identitas pembayaranmu.
                      </p>

                    </div>

                  </div>
                </div>

                {/* FORM */}
                <div className="mt-6">

                  <a
                    href={category.registerUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#F18B1F] px-6 py-4 font-display text-sm tracking-wide text-white uppercase shadow-[0_8px_25px_rgba(241,139,31,.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D97706]"
                  >
                    Lanjut Isi Form Pendaftaran

                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>

                  <p className="mt-3 text-center text-[10px] leading-relaxed text-[#062D50]/45">
                    Simpan kode pembayaran{" "}
                    <strong>{payment.code}</strong>{" "}
                    sebelum melanjutkan ke Google Form.
                  </p>

                </div>

              </>
            )}

            {/* TRUST */}
            <div className="mt-8 flex items-center justify-center gap-2 border-t border-slate-100 pt-6 text-center">

              <ShieldCheck className="h-4 w-4 text-[#468519]" />

              <p className="text-[10px] font-semibold text-[#062D50]/45">
                Kode pembayaran dibuat secara otomatis dan unik
                untuk setiap pendaftaran.
              </p>

            </div>

          </div>
        </section>

        {/* BACK */}
        <div className="mt-6 flex justify-center">

          <Link
            to="/daftar"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#0A5490]/60 uppercase transition-colors hover:text-[#F18B1F]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Ganti Kategori
          </Link>

        </div>

      </div>
    </main>
  );
}

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function PaymentStep({
  number,
  title,
  active = false,
  done = false,
}: {
  number: string;
  title: string;
  active?: boolean;
  done?: boolean;
}) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">

      <div
        className={`grid h-8 w-8 place-items-center rounded-full text-[10px] font-extrabold ${
          active
            ? "bg-[#F18B1F] text-white"
            : done
              ? "bg-[#97D91B] text-white"
              : "bg-white text-[#062D50]/35"
        }`}
      >
        {done ? (
          <Check className="h-4 w-4" />
        ) : (
          number
        )}
      </div>

      <span
        className={`text-[9px] font-extrabold tracking-wider uppercase sm:text-xs ${
          active
            ? "text-[#062D50]"
            : done
              ? "text-[#468519]"
              : "text-[#062D50]/35"
        }`}
      >
        {title}
      </span>

    </div>
  );
}