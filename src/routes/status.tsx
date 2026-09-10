import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Mail,
  Search,
  TriangleAlert,
} from "lucide-react";
import {
  FormEvent,
  useState,
} from "react";

type StatusItem = {
  registrationId?: string;
  category?: string;
  status?: string;
  paymentStatus?: string;
  email?: string;
};

type StatusResponse = {
  success?: boolean;
  found?: boolean;
  registered?: boolean;
  email?: string;
  data?: StatusItem[];
  message?: string;
};

export const Route = createFileRoute("/status")({
  head: () => ({
    meta: [
      {
        title: "Cek Status Pembayaran | PKU Fresh Run",
      },
      {
        name: "description",
        content:
          "Cek status pembayaran dan pendaftaran PKU Muhammadiyah Sukoharjo Fresh Run menggunakan email.",
      },
    ],
  }),
  component: StatusPage,
});

const PARTICIPANT_API_URL =
  import.meta.env["VITE_PAYMENT_API_URL"] ?? "";

function normalizeStatus(status: string) {
  return String(status || "PENDING")
    .trim()
    .toUpperCase();
}

function getStatusLabel(status: string) {
  const normalized = normalizeStatus(status);

  switch (normalized) {
    case "SUCCESS":
    case "PAID":
      return "Pembayaran Berhasil";
    case "PENDING":
      return "Menunggu Verifikasi";
    case "EXPIRED":
      return "Kedaluwarsa";
    case "CANCELLED":
    case "CANCELED":
      return "Dibatalkan";
    default:
      return normalized || "PENDING";
  }
}

function getStatusClass(status: string) {
  const normalized = normalizeStatus(status);

  if (normalized === "SUCCESS" || normalized === "PAID") {
    return "bg-[#F2FBDD] text-[#468519] border-[#97D91B]/30";
  }

  if (normalized === "PENDING") {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }

  if (
    normalized === "EXPIRED" ||
    normalized === "CANCELLED" ||
    normalized === "CANCELED"
  ) {
    return "bg-red-50 text-red-700 border-red-200";
  }

  return "bg-slate-100 text-slate-700 border-slate-200";
}

function getStatusIcon(status: string) {
  const normalized = normalizeStatus(status);

  if (normalized === "SUCCESS" || normalized === "PAID") {
    return <CheckCircle2 className="h-5 w-5" />;
  }

  if (normalized === "PENDING") {
    return <Clock3 className="h-5 w-5" />;
  }

  return <TriangleAlert className="h-5 w-5" />;
}

function StatusPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<StatusResponse | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setResult(null);

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Email wajib diisi.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      setError("Format email tidak valid.");
      return;
    }

    if (!PARTICIPANT_API_URL) {
      setError(
        "URL Google Apps Script belum dikonfigurasi. Tambahkan VITE_PAYMENT_API_URL pada file .env."
      );
      return;
    }

    setLoading(true);

    try {
      const url = new URL(PARTICIPANT_API_URL);
      url.searchParams.set("action", "checkstatus");
      url.searchParams.set("email", normalizedEmail);

      const response = await fetch(url.toString(), {
        method: "GET",
        redirect: "follow",
      });

      if (!response.ok) {
        throw new Error(
          `Server mengembalikan status ${response.status}.`
        );
      }

      const data = (await response.json()) as StatusResponse;

      if (data.success !== true) {
        throw new Error(
          data.message ?? "Status pembayaran tidak dapat diperiksa."
        );
      }

      setResult(data);
    } catch (err) {
      console.error("Gagal mengecek status pembayaran:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengecek status pembayaran."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#EAF6FF] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <header className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#0A5490] px-4 py-2 text-[10px] font-extrabold tracking-[0.2em] text-white uppercase">
            <Search className="h-3.5 w-3.5" />
            Cek Status
          </div>

          <h1 className="mt-5 font-display text-4xl leading-none text-[#062D50] uppercase sm:text-5xl">
            Status
            <br />
            <span className="text-[#F18B1F]">Pembayaran</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#062D50]/60">
            Masukkan email yang digunakan saat pendaftaran untuk melihat status
            pembayaran dan data pendaftaran Anda.
          </p>
        </header>

        <section className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-[0_15px_45px_rgba(20,43,77,0.1)]">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="status-email"
                className="block text-xs font-extrabold tracking-[0.12em] text-[#062D50] uppercase"
              >
                Email Pendaftaran
              </label>

              <div className="relative mt-2">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0A5490]/45" />
                <input
                  id="status-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="nama@email.com"
                  autoComplete="email"
                  className="w-full rounded-2xl border border-[#062D50]/10 bg-[#F8FCFF] py-4 pl-12 pr-4 text-sm text-[#062D50] outline-none transition placeholder:text-[#062D50]/30 focus:border-[#0A5490] focus:ring-4 focus:ring-[#0A5490]/10"
                />
              </div>

              {error && (
                <div className="mt-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#F18B1F] px-6 py-4 font-display text-sm tracking-wide text-white uppercase transition hover:bg-[#D97706] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Mengecek Status...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Cek Status Pembayaran
                  </>
                )}
              </button>
            </form>
          </div>
        </section>

        {result && (
          <section className="mt-6 overflow-hidden rounded-[2rem] bg-white shadow-[0_15px_45px_rgba(20,43,77,0.1)]">
            <div className="bg-[#0A5490] px-6 py-7 text-white sm:px-8">
              <p className="text-[10px] font-extrabold tracking-[0.2em] text-white/60 uppercase">
                Hasil Pengecekan
              </p>
              <h2 className="mt-2 font-display text-2xl uppercase sm:text-3xl">
                {result.found
                  ? "Data Pembayaran Ditemukan"
                  : "Data Tidak Ditemukan"}
              </h2>
              <p className="mt-2 break-all text-sm text-white/70">
                {result.email ?? email.trim().toLowerCase()}
              </p>
            </div>

            {!result.found || !result.data?.length ? (
              <div className="p-6 sm:p-8">
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-800">
                  Email tersebut belum memiliki data pembayaran atau belum
                  digunakan untuk pendaftaran PKU Fresh Run.
                </div>
              </div>
            ) : (
              <div className="space-y-4 p-6 sm:p-8">
                {result.data.map((item, index) => {
                  const status = normalizeStatus(
                    item.status ?? item.paymentStatus ?? "PENDING"
                  );

                  return (
                    <article
                      key={`${item.registrationId ?? "no-registration"}-${item.category ?? "category"}-${index}`}
                      className="overflow-hidden rounded-2xl border border-[#062D50]/10 bg-[#F8FCFF]"
                    >
                      <div className="flex items-center justify-between gap-4 border-b border-[#062D50]/10 px-5 py-4 sm:px-6">
                        <div>
                          <p className="text-[9px] font-extrabold tracking-[0.18em] text-[#062D50]/40 uppercase">
                            Status Pembayaran
                          </p>
                          <div
                            className={`mt-2 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-black ${getStatusClass(status)}`}
                          >
                            {getStatusIcon(status)}
                            {getStatusLabel(status)}
                          </div>
                        </div>
                      </div>

                      <div className="divide-y divide-[#062D50]/10">
                        <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
                          <span className="text-sm text-slate-500">
                            No. Registrasi
                          </span>
                          <span className="text-right font-mono text-sm font-black text-[#0A5490]">
                            {item.registrationId || "Belum tersedia"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
                          <span className="text-sm text-slate-500">
                            Kategori
                          </span>
                          <span className="text-right text-sm font-black text-[#062D50]">
                            {item.category || "-"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
                          <span className="text-sm text-slate-500">
                            Email
                          </span>
                          <span className="max-w-[65%] break-all text-right text-sm font-semibold text-[#062D50]">
                            {item.email || result.email || "-"}
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })}

                <p className="pt-2 text-center text-xs leading-relaxed text-[#062D50]/50">
                  Status pembayaran ditampilkan berdasarkan data terbaru yang
                  tersimpan pada sistem pendaftaran PKU Fresh Run.
                </p>
              </div>
            )}
          </section>
        )}

        <Link
          to="/"
          className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full px-5 py-3 text-xs font-extrabold tracking-wide text-[#062D50]/60 uppercase transition hover:text-[#062D50]"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
