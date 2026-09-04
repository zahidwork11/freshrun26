import {
  createFileRoute,
} from "@tanstack/react-router";

import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

// ============================================================
// ROUTE SEARCH
// ============================================================

type BayarSearch = {
  category: string;
};

export const Route =
  createFileRoute("/bayar")({
    validateSearch: (
      search: Record<string, unknown>,
    ): BayarSearch => {
      return {
        category:
          typeof search["category"] === "string"
            ? search["category"]
            : "",
      };
    },

    head: () => ({
      meta: [
        {
          title:
            "Pembayaran | PKU Fresh Run",
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
// GOOGLE APPS SCRIPT URL
// ============================================================

const PAYMENT_API_URL =
  import.meta.env[
    "VITE_PAYMENT_API_URL"
  ] as string | undefined;


// ============================================================
// REKENING PEMBAYARAN
// ============================================================
//
// GANTI 3 DATA INI DENGAN REKENING RESMI EVENT
//
// ============================================================

const BANK_NAME =
  "BANK BSI";

const BANK_ACCOUNT_NUMBER =
  "0000000000";

const BANK_ACCOUNT_HOLDER =
  "RS PKU MUHAMMADIYAH SUKOHARJO";


// ============================================================
// PAYMENT RESULT
// ============================================================

type PaymentResult = {
  success: true;

  existing: boolean;

  alreadyPaid: boolean;

  alreadyRegistered: boolean;

  registrationId: string;

  registrationStatus: string;

  registeredEmail: string;

  id: string;

  code: string;

  category: string;

  productKey: string;

  basePrice: number;

  totalAmount: number;

  status: string;

  email: string;

  createdAt: string | null;

  expiredAt: string | null;

  message: string;
};


// ============================================================
// PARTICIPANT RESULT
// ============================================================

type ParticipantCheckResult = {
  success?: boolean;

  registered?: boolean;

  alreadyRegistered?: boolean;

  registrationId?: string;

  registrationStatus?: string;

  paymentStatus?: string;

  email?: string;

  registeredEmail?: string;

  message?: string;
};


// ============================================================
// API ERROR
// ============================================================

type ApiErrorResponse = {
  success: false;

  message?: string;
};


// ============================================================
// PRODUCT
// ============================================================

type ProductInfo = {
  slug: string;

  key: string;

  name: string;

  price: number;

  description: string;
};


// ============================================================
// PRODUCTS
// ============================================================

const PRODUCTS:
  Record<string, ProductInfo> = {

  // ==========================================================
  // 5K PRESALE
  // ==========================================================

  "5k-presale": {

    slug:
      "5k-presale",

    key:
      "5K_PRESALE",

    name:
      "5K PRESALE",

    price:
      150000,

    description:
      "BIB, Jersey, Medal, Race Pack & Snack",

  },


  // ==========================================================
  // 5K UMUM
  // ==========================================================

  "5k-umum": {

    slug:
      "5k-umum",

    key:
      "5K_UMUM",

    name:
      "5K UMUM",

    price:
      170000,

    description:
      "BIB, Jersey, Medal, Race Pack & Snack",

  },


  // ==========================================================
  // 2.5K PRESALE
  // ==========================================================

  "2-5k-presale": {

    slug:
      "2-5k-presale",

    key:
      "2_5K_PRESALE",

    name:
      "2.5K PRESALE",

    price:
      50000,

    description:
      "BIB, Jersey & Snack",

  },


  // ==========================================================
  // 2.5K UMUM
  // ==========================================================

  "2-5k-umum": {

    slug:
      "2-5k-umum",

    key:
      "2_5K_UMUM",

    name:
      "2.5K UMUM",

    price:
      75000,

    description:
      "BIB, Jersey & Snack",

  },


  // ==========================================================
  // PELAJAR / MAHASISWA
  // ==========================================================

  "pelajar-mahasiswa": {

    slug:
      "pelajar-mahasiswa",

    key:
      "5K_MAHASISWA",

    name:
      "PELAJAR / MAHASISWA 5K",

    price:
      125000,

    description:
      "BIB, Jersey, Medal, Race Pack & Snack",

  },

};


// ============================================================
// FORMAT RUPIAH
// ============================================================

function formatRupiah(
  value: number,
): string {

  return new Intl.NumberFormat(
    "id-ID",
    {
      style:
        "currency",

      currency:
        "IDR",

      maximumFractionDigits:
        0,
    },
  ).format(
    value,
  );

}


// ============================================================
// FORMAT DATE
// ============================================================

function formatDate(
  value:
    string | null,
): string {

  if (!value) {

    return "-";

  }

  const date =
    new Date(
      value,
    );

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {

    return "-";

  }

  return new Intl.DateTimeFormat(
    "id-ID",
    {
      day:
        "2-digit",

      month:
        "long",

      year:
        "numeric",

      hour:
        "2-digit",

      minute:
        "2-digit",
    },
  ).format(
    date,
  );

}


// ============================================================
// ERROR MESSAGE
// ============================================================

function getErrorMessage(
  error: unknown,
): string {

  if (
    error instanceof Error
  ) {

    return error.message;

  }

  return (
    "Terjadi kesalahan. Silakan coba lagi."
  );

}


// ============================================================
// MAIN COMPONENT
// ============================================================

function Bayar() {

  // ==========================================================
  // SEARCH
  // ==========================================================

  const search =
    Route.useSearch();


  // ==========================================================
  // CATEGORY
  // ==========================================================

  const category =
    search["category"];


  // ==========================================================
  // PRODUCT
  // ==========================================================

  const product =
    useMemo(
      () => {

        if (!category) {

          return null;

        }

        return (
          PRODUCTS[
            category
          ] ??
          null
        );

      },
      [
        category,
      ],
    );


  // ==========================================================
  // EMAIL
  // ==========================================================

  const [
    email,
    setEmail,
  ] = useState("");


  // ==========================================================
  // PAYMENT RESULT
  // ==========================================================

  const [
    paymentResult,
    setPaymentResult,
  ] =
    useState<
      PaymentResult | null
    >(
      null,
    );


  // ==========================================================
  // REGISTERED PARTICIPANT
  // ==========================================================

  const [
    registeredParticipant,
    setRegisteredParticipant,
  ] =
    useState<
      ParticipantCheckResult | null
    >(
      null,
    );


  // ==========================================================
  // LOADING
  // ==========================================================

  const [
    loading,
    setLoading,
  ] = useState(false);


  // ==========================================================
  // CHECKING REGISTRATION
  // ==========================================================

  const [
    checkingRegistration,
    setCheckingRegistration,
  ] = useState(false);


  // ==========================================================
  // ALREADY REGISTERED
  // ==========================================================

  const [
    alreadyRegistered,
    setAlreadyRegistered,
  ] = useState(false);


  // ==========================================================
  // ERROR
  // ==========================================================

  const [
    error,
    setError,
  ] = useState("");


  // ==========================================================
  // API ERROR
  // ==========================================================

  const [
    apiError,
    setApiError,
  ] = useState("");


  // ==========================================================
  // COPY STATE
  // ==========================================================

  const [
    copiedAccount,
    setCopiedAccount,
  ] = useState(false);


  // ==========================================================
  // CHECK API URL
  // ==========================================================

  useEffect(
    () => {

      if (
        !PAYMENT_API_URL
      ) {

        setApiError(
          "VITE_PAYMENT_API_URL belum dikonfigurasi.",
        );

      }

    },
    [],
  );


  // ==========================================================
  // CHECK PARTICIPANT BY EMAIL
  // ==========================================================

  async function checkParticipantByEmail(
    value: string,
  ): Promise<ParticipantCheckResult | null> {

    const normalizedEmail =
      value
        .trim()
        .toLowerCase();


    if (
      !PAYMENT_API_URL ||
      !normalizedEmail
    ) {

      return null;

    }


    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
      !emailRegex.test(
        normalizedEmail,
      )
    ) {

      return null;

    }


    setCheckingRegistration(
      true,
    );


    try {

      const url =
        new URL(
          PAYMENT_API_URL,
        );


      url.searchParams.set(
        "action",
        "checkParticipant",
      );


      url.searchParams.set(
        "email",
        normalizedEmail,
      );


      const response =
        await fetch(
          url.toString(),
          {
            method:
              "GET",

            redirect:
              "follow",
          },
        );


      if (
        !response.ok
      ) {

        throw new Error(
          `Server mengembalikan status ${response.status}.`,
        );

      }


      const result =
        (await response.json()) as
          ParticipantCheckResult;


      const registered =
        result.success === true &&
        (
          result.registered === true ||
          result.alreadyRegistered === true
        );


      if (
        registered
      ) {

        const participant =
          {
            ...result,

            registered:
              true,

            alreadyRegistered:
              true,

            registeredEmail:
              result.registeredEmail ||
              result.email ||
              normalizedEmail,

          };


        setRegisteredParticipant(
          participant,
        );


        setAlreadyRegistered(
          true,
        );


        return participant;

      }


      setRegisteredParticipant(
        null,
      );


      setAlreadyRegistered(
        false,
      );


      return null;

    } catch (
      error
    ) {

      console.error(
        "Gagal mengecek peserta:",
        error,
      );


      /*
       * Jangan menampilkan
       * "belum terdaftar" ketika
       * pengecekan server gagal.
       *
       * Backend create tetap menjadi
       * pengecekan terakhir.
       */

      return null;

    } finally {

      setCheckingRegistration(
        false,
      );

    }

  }


  // ==========================================================
  // SUBMIT PAYMENT
  // ==========================================================

  async function handleSubmit(
    event:
      FormEvent<HTMLFormElement>,
  ) {

    event.preventDefault();


    setError("");

    setPaymentResult(null);

    setRegisteredParticipant(null);

    setCopiedAccount(false);


    // ========================================================
    // CATEGORY
    // ========================================================

    if (!category) {

      setError(
        "Kategori pembayaran belum dipilih.",
      );

      return;

    }


    // ========================================================
    // PRODUCT
    // ========================================================

    if (!product) {

      setError(
        "Kategori pembayaran tidak valid.",
      );

      return;

    }


    // ========================================================
    // API
    // ========================================================

    if (
      !PAYMENT_API_URL
    ) {

      setError(
        "Alamat API pembayaran belum dikonfigurasi.",
      );

      return;

    }


    // ========================================================
    // EMAIL
    // ========================================================

    const normalizedEmail =
      email
        .trim()
        .toLowerCase();


    if (
      !normalizedEmail
    ) {

      setError(
        "Email wajib diisi.",
      );

      return;

    }


    // ========================================================
    // EMAIL FORMAT
    // ========================================================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
      !emailRegex.test(
        normalizedEmail,
      )
    ) {

      setError(
        "Format email tidak valid.",
      );

      return;

    }


    // ========================================================
    // CEK PENDAFTARAN
    // ========================================================

    const participant =
      await checkParticipantByEmail(
        normalizedEmail,
      );


    if (
      participant
    ) {

      setAlreadyRegistered(
        true,
      );


      setRegisteredParticipant(
        participant,
      );


      setEmail(
        normalizedEmail,
      );


      return;

    }


    // ========================================================
    // START LOADING
    // ========================================================

    setLoading(
      true,
    );


    try {

      // ======================================================
      // BUILD URL
      // ======================================================

      const url =
        new URL(
          PAYMENT_API_URL,
        );


      url.searchParams.set(
        "action",
        "create",
      );


      url.searchParams.set(
        "product",
        product.key,
      );


      url.searchParams.set(
        "email",
        normalizedEmail,
      );


      // ======================================================
      // REQUEST
      // ======================================================

      const response =
        await fetch(
          url.toString(),
          {
            method:
              "GET",

            redirect:
              "follow",
          },
        );


      if (
        !response.ok
      ) {

        throw new Error(
          `Server pembayaran mengembalikan status ${response.status}.`,
        );

      }


      // ======================================================
      // JSON
      // ======================================================

      const data =
        (await response.json()) as
          | PaymentResult
          | ApiErrorResponse;


      // ======================================================
      // API ERROR
      // ======================================================

      if (
        data.success !==
        true
      ) {

        throw new Error(
          data.message ??
            "Pembayaran tidak dapat diproses.",
        );

      }


      // ======================================================
      // CEK ALREADY REGISTERED
      // ======================================================

      if (
        data.alreadyRegistered ===
        true
      ) {

        const participantData =
          {
            success:
              true,

            registered:
              true,

            alreadyRegistered:
              true,

            registrationId:
              data.registrationId,

            registrationStatus:
              data.registrationStatus,

            paymentStatus:
              data.status,

            email:
              data.email,

            registeredEmail:
              data.registeredEmail ||
              data.email ||
              normalizedEmail,

            message:
              data.message,
          };


        setAlreadyRegistered(
          true,
        );


        setRegisteredParticipant(
          participantData,
        );


        setPaymentResult(
          null,
        );


        setEmail(
          normalizedEmail,
        );


        return;

      }


      // ======================================================
      // NORMALIZE RESULT
      // ======================================================

      const normalizedResult:
        PaymentResult =
        {

          success:
            true,

          existing:
            Boolean(
              data.existing,
            ),

          alreadyPaid:
            Boolean(
              data.alreadyPaid,
            ),

          alreadyRegistered:
            Boolean(
              data.alreadyRegistered,
            ),

          registrationId:
            String(
              data.registrationId ??
                "",
            ),

          registrationStatus:
            String(
              data.registrationStatus ??
                "",
            ),

          registeredEmail:
            String(
              data.registeredEmail ??
                data.email ??
                normalizedEmail,
            ),

          id:
            String(
              data.id ??
                "",
            ),

          code:
            String(
              data.code ??
                "",
            ).padStart(
              4,
              "0",
            ),

          category:
            String(
              data.category ??
                product.name,
            ),

          productKey:
            String(
              data.productKey ??
                product.key,
            ),

          basePrice:
            Number(
              data.basePrice ??
                product.price,
            ),

          totalAmount:
            Number(
              data.totalAmount ??
                product.price,
            ),

          status:
            String(
              data.status ??
                "PENDING",
            ).toUpperCase(),

          email:
            String(
              data.email ??
                normalizedEmail,
            ),

          createdAt:
            data.createdAt
              ? String(
                  data.createdAt,
                )
              : null,

          expiredAt:
            data.expiredAt
              ? String(
                  data.expiredAt,
                )
              : null,

          message:
            typeof data.message ===
            "string"
              ? data.message
              : "Kode pembayaran berhasil dibuat.",

        };


      // ======================================================
      // SAVE RESULT
      // ======================================================

      setPaymentResult(
        normalizedResult,
      );


      setEmail(
        normalizedEmail,
      );


    } catch (
      err
    ) {

      console.error(
        "Payment error:",
        err,
      );


      setError(
        getErrorMessage(
          err,
        ),
      );

    } finally {

      setLoading(
        false,
      );

    }

  }


  // ==========================================================
  // COPY REKENING
  // ==========================================================

  async function copyAccountNumber() {

    try {

      await navigator.clipboard.writeText(
        BANK_ACCOUNT_NUMBER,
      );


      setCopiedAccount(
        true,
      );


      window.setTimeout(
        () => {

          setCopiedAccount(
            false,
          );

        },
        2000,
      );

    } catch (
      error
    ) {

      console.error(
        "Gagal menyalin rekening:",
        error,
      );

    }

  }


  // ==========================================================
  // GO TO FORM
  // ==========================================================

  function goToForm() {

    if (
      !paymentResult
    ) {

      return;

    }


    if (
      alreadyRegistered ||
      paymentResult.alreadyRegistered
    ) {

      return;

    }


    const params =
      new URLSearchParams();


    params.set(
      "code",
      paymentResult.code,
    );


    params.set(
      "email",
      paymentResult.email,
    );


    params.set(
      "category",
      category,
    );


    params.set(
      "amount",
      String(
        paymentResult.totalAmount,
      ),
    );


    window.location.href =
      `/form?${params.toString()}`;

  }


  // ==========================================================
  // RESET
  // ==========================================================

  function resetPayment() {

    setPaymentResult(
      null,
    );

    setRegisteredParticipant(
      null,
    );

    setAlreadyRegistered(
      false,
    );

    setError(
      "",
    );

    setEmail(
      "",
    );

    setCopiedAccount(
      false,
    );

  }


  // ==========================================================
  // NO CATEGORY
  // ==========================================================

  if (!category) {

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
                  window.location.href =
                    "/";
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

  if (!product) {

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
                window.location.href =
                  "/daftar";
              }}
              className="mt-6 w-full rounded-2xl bg-[#0A5490] px-5 py-4 font-black uppercase text-white"
            >
              Kembali ke Daftar
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


          {/* ==================================================
              CATEGORY HEADER
          ================================================== */}

          <div className="relative overflow-hidden bg-[#0A5490] px-6 py-7 text-white sm:px-10 sm:py-9">

            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10" />

            <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-[#97D91B]/20" />

            <div className="relative">

              <div className="inline-flex rounded-full bg-[#97D91B] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#123456]">
                Kategori
              </div>

              <h2 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-4xl">
                {product.name}
              </h2>

              <p className="mt-2 max-w-xl text-sm text-white/75">
                {product.description}
              </p>

            </div>

          </div>


          {/* ==================================================
              CONTENT
          ================================================== */}

          <div className="p-6 sm:p-10">


            {/* ==================================================
                API ERROR
            ================================================== */}

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


            {/* ==================================================
                ALREADY REGISTERED
            ================================================== */}

            {alreadyRegistered &&
              registeredParticipant && (

              <div className="mb-6 overflow-hidden rounded-[1.5rem] border-2 border-emerald-200 bg-white">

                {/* HEADER */}

                <div className="bg-[#f0fdf4] px-5 py-5 sm:px-6">

                  <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xl font-black text-white">
                      ✓
                    </div>

                    <div className="min-w-0">

                      <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">
                        Data Pembayaran Ditemukan
                      </p>

                      <h3 className="mt-1 text-lg font-black text-[#123456] sm:text-xl">
                        Email ini sudah digunakan untuk pendaftaran.
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        Email ini sudah digunakan
                        untuk pendaftaran peserta
                        PKU Fresh Run.
                      </p>

                    </div>

                  </div>

                </div>


                {/* PARTICIPANT DETAIL */}

                <div className="divide-y divide-slate-100">

                  {/* REGISTRATION ID */}

                  <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">

                    <span className="text-sm text-slate-500">
                      No. Registrasi
                    </span>

                    <span className="text-right font-mono text-sm font-black text-[#0A5490]">
                      {registeredParticipant.registrationId ||
                        "-"}
                    </span>

                  </div>


                  {/* STATUS PENDAFTARAN */}

                  <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">

                    <span className="text-sm text-slate-500">
                      Status Pendaftaran
                    </span>

                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black uppercase text-amber-700">
                      {registeredParticipant.registrationStatus ||
                        "TERDAFTAR"}
                    </span>

                  </div>


                  {/* EMAIL */}

                  <div className="flex items-start justify-between gap-4 px-5 py-4 sm:px-6">

                    <span className="text-sm text-slate-500">
                      Email Terdaftar
                    </span>

                    <span className="max-w-[65%] break-all text-right text-sm font-bold text-[#123456]">
                      {registeredParticipant.registeredEmail ||
                        registeredParticipant.email ||
                        email}
                    </span>

                  </div>

                </div>


                {/* BUTTON */}

                <div className="border-t border-slate-100 p-5 sm:p-6">

                  <button
                    type="button"
                    disabled
                    className="w-full cursor-not-allowed rounded-2xl bg-slate-300 px-6 py-4 text-sm font-black uppercase tracking-wide text-slate-500"
                  >
                    Anda Sudah Mengisi Form
                  </button>

                </div>

              </div>

            )}


            {/* ==================================================
                ERROR
            ================================================== */}

            {error && !alreadyRegistered && (

              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">

                <p className="font-bold">
                  Pembayaran belum dapat diproses
                </p>

                <p className="mt-1 leading-relaxed">
                  {error}
                </p>

              </div>

            )}


            {/* ==================================================
                PAYMENT RESULT
            ================================================== */}

            {paymentResult && !alreadyRegistered ? (

              <div>


                {/* ==================================================
                    SUCCESS
                ================================================== */}

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
                        Silakan lakukan transfer
                        sesuai nominal berikut
                        sebelum melanjutkan
                        ke form pendaftaran.
                      </p>

                    </div>

                  </div>

                </div>


                {/* ==================================================
                    BANK ACCOUNT
                ================================================== */}

                <div className="mt-6 overflow-hidden rounded-[1.5rem] border-2 border-[#0A5490]/10">

                  <div className="bg-[#0A5490] px-5 py-4 text-white">

                    <h3 className="text-sm font-black uppercase tracking-wide">
                      Rekening Pembayaran
                    </h3>

                    <p className="mt-1 text-xs text-white/70">
                      Transfer sesuai nominal total
                      pembayaran di bawah.
                    </p>

                  </div>


                  <div className="bg-white p-5 sm:p-6">


                    {/* BANK */}

                    <div className="flex items-center justify-between gap-4">

                      <span className="text-sm text-slate-500">
                        Bank
                      </span>

                      <span className="text-right text-sm font-black text-[#123456]">
                        {BANK_NAME}
                      </span>

                    </div>


                    {/* ACCOUNT */}

                    <div className="mt-4 rounded-2xl bg-[#f4f8fb] p-4">

                      <div className="flex items-center justify-between gap-3">

                        <div className="min-w-0">

                          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                            No. Rekening
                          </p>

                          <p className="mt-1 break-all font-mono text-lg font-black tracking-wide text-[#0A5490]">
                            {BANK_ACCOUNT_NUMBER}
                          </p>

                        </div>


                        {/* COPY ICON ONLY */}

                        <button
                          type="button"
                          onClick={
                            copyAccountNumber
                          }
                          title={
                            copiedAccount
                              ? "Berhasil disalin"
                              : "Salin nomor rekening"
                          }
                          aria-label={
                            copiedAccount
                              ? "Berhasil disalin"
                              : "Salin nomor rekening"
                          }
                          className={[
                            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition",
                            copiedAccount
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-[#0A5490] text-white hover:bg-[#084575]",
                          ].join(" ")}
                        >

                          {copiedAccount ? (

                            /* CHECK ICON */

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              className="h-5 w-5"
                            >

                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 12.5l4 4L19 7"
                              />

                            </svg>

                          ) : (

                            /* COPY ICON */

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="h-5 w-5"
                            >

                              <rect
                                x="9"
                                y="9"
                                width="11"
                                height="11"
                                rx="2"
                                ry="2"
                              />

                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
                              />

                            </svg>

                          )}

                        </button>

                      </div>

                    </div>


                    {/* HOLDER */}

                    <div className="mt-4 flex items-center justify-between gap-4">

                      <span className="text-sm text-slate-500">
                        Atas Nama
                      </span>

                      <span className="max-w-[65%] text-right text-sm font-black text-[#123456]">
                        {BANK_ACCOUNT_HOLDER}
                      </span>

                    </div>


                  </div>

                </div>


                {/* ==================================================
                    PAYMENT CODE
                ================================================== */}

                <div className="mt-6 rounded-[1.5rem] border-2 border-dashed border-[#0A5490]/20 bg-[#f8fbfd] p-6 text-center sm:p-8">

                  <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                    Kode Pembayaran
                  </p>

                  <div className="mt-3 select-all font-mono text-5xl font-black tracking-[0.18em] text-[#0A5490] sm:text-6xl">
                    {paymentResult.code}
                  </div>

                  <p className="mt-3 text-xs text-slate-500">
                    Simpan kode ini untuk
                    proses pendaftaran.
                  </p>

                </div>


                {/* ==================================================
                    PAYMENT DETAIL
                ================================================== */}

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


                    {/* PRICE */}

                    <div className="flex items-center justify-between gap-4 px-5 py-4">

                      <span className="text-sm text-slate-500">
                        Harga
                      </span>

                      <span className="text-right text-sm font-bold text-[#123456]">
                        {formatRupiah(
                          paymentResult.basePrice,
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
                            paymentResult.basePrice,
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
                          paymentResult.totalAmount,
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
                          paymentResult.status ===
                          "PAID"
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
                          paymentResult.expiredAt,
                        )}
                      </span>

                    </div>

                  </div>

                </div>


                {/* ==================================================
                    INSTRUCTION
                ================================================== */}

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
                      Transfer ke rekening
                      pembayaran di atas sesuai
                      nominal{" "}
                      <span className="font-bold">
                        {formatRupiah(
                          paymentResult.totalAmount,
                        )}
                      </span>.
                    </li>

                    <li>
                      <span className="font-bold text-[#0A5490]">
                        3.
                      </span>{" "}
                      Setelah transfer, lanjutkan
                      ke form pendaftaran.
                    </li>

                    <li>
                      <span className="font-bold text-[#0A5490]">
                        4.
                      </span>{" "}
                      Upload bukti transfer pada
                      form pendaftaran.
                    </li>

                  </ol>

                </div>


                {/* ==================================================
                    CONTINUE TO FORM
                ================================================== */}

                <button
                  type="button"
                  onClick={
                    goToForm
                  }
                  disabled={
                    paymentResult.alreadyRegistered ||
                    alreadyRegistered
                  }
                  className={[
                    "mt-6 w-full rounded-2xl px-6 py-4 text-sm font-black uppercase tracking-wide transition",
                    paymentResult.alreadyRegistered ||
                    alreadyRegistered
                      ? "cursor-not-allowed bg-slate-300 text-slate-500"
                      : "bg-[#97D91B] text-[#123456] shadow-[0_10px_30px_rgba(151,217,27,.2)] hover:brightness-95 active:scale-[.99]",
                  ].join(" ")}
                >
                  {paymentResult.alreadyRegistered ||
                  alreadyRegistered
                    ? "Anda Sudah Mengisi Form"
                    : "Lanjutkan ke Form Pendaftaran"}
                </button>


                {/* ==================================================
                    CHANGE EMAIL
                ================================================== */}

                <button
                  type="button"
                  onClick={
                    resetPayment
                  }
                  disabled={
                    loading
                  }
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Gunakan Email Lain
                </button>

              </div>

            ) : !alreadyRegistered ? (

              /* ==================================================
                 FORM EMAIL
              ================================================== */

              <form
                onSubmit={
                  handleSubmit
                }
              >


                {/* ==================================================
                    PRICE
                ================================================== */}

                <div className="mb-6 rounded-[1.5rem] bg-[#f4f8fb] p-5">

                  <div className="flex items-center justify-between gap-4">

                    <div>

                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Harga Pendaftaran
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#123456]">
                        {product.name}
                      </p>

                    </div>

                    <p className="text-xl font-black text-[#0A5490]">
                      {formatRupiah(
                        product.price,
                      )}
                    </p>

                  </div>

                </div>


                {/* ==================================================
                    EMAIL
                ================================================== */}

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
                    dengan kode pembayaran dan
                    data peserta Anda.
                  </p>


                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="contoh@email.com"

                    value={
                      email
                    }

                    onChange={(
                      event,
                    ) => {

                      const value =
                        event.target.value;


                      setEmail(
                        value,
                      );


                      setAlreadyRegistered(
                        false,
                      );


                      setRegisteredParticipant(
                        null,
                      );


                      setPaymentResult(
                        null,
                      );


                      if (
                        error
                      ) {

                        setError(
                          "",
                        );

                      }

                    }}

                    disabled={
                      loading ||
                      checkingRegistration
                    }

                    className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-base text-[#123456] outline-none transition placeholder:text-slate-300 focus:border-[#0A5490] focus:ring-4 focus:ring-[#0A5490]/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                  />

                </div>


                {/* ==================================================
                    IMPORTANT
                ================================================== */}

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
                        Satu email hanya dapat
                        digunakan untuk satu
                        pendaftaran peserta.
                        Jika email Anda sudah
                        terdaftar, sistem tidak
                        akan membuat pendaftaran
                        baru.
                      </p>

                    </div>

                  </div>

                </div>


                {/* ==================================================
                    SUBMIT
                ================================================== */}

                <button
                  type="submit"

                  disabled={
                    loading ||
                    checkingRegistration ||
                    alreadyRegistered ||
                    !email.trim() ||
                    Boolean(
                      apiError,
                    )
                  }

                  className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#97D91B] px-6 py-4 text-sm font-black uppercase tracking-wide text-[#123456] shadow-[0_10px_30px_rgba(151,217,27,.2)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {checkingRegistration ? (

                    <>

                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#123456]/30 border-t-[#123456]" />

                      Mengecek Data Peserta...

                    </>

                  ) : loading ? (

                    <>

                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#123456]/30 border-t-[#123456]" />

                      Membuat Kode Pembayaran...

                    </>

                  ) : (

                    "Lanjutkan Pembayaran"

                  )}

                </button>


                {/* ==================================================
                    BACK
                ================================================== */}

                <button
                  type="button"

                  disabled={
                    loading ||
                    checkingRegistration
                  }

                  onClick={() => {

                    window.location.href =
                      "/";

                  }}

                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Kembali
                </button>

              </form>

            ) : null}

          </div>

        </div>


        {/* ==================================================
            FOOTER
        ================================================== */}

        <p className="mt-6 text-center text-xs leading-relaxed text-slate-400">
          PKU Muhammadiyah Sukoharjo
          Fun Run • 29 November 2026
        </p>

      </div>

    </div>
  );

}