import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  FileImage,
  Loader2,
  ShieldCheck,
  TriangleAlert,
  Upload,
} from "lucide-react";
import {
  ChangeEvent,
  FormEvent,
  useMemo,
  useRef,
  useState,
} from "react";

const PARTICIPANT_API_URL =
  import.meta.env["VITE_PAYMENT_API_URL"] ?? "";

type ParticipantType = "umum" | "pelajar" | "mahasiswa" | "";

type FormDataState = {
  paymentCode: string;
  email: string;
  participantType: ParticipantType;

  buktiTransfer: File | null;
  namaPengirim: string;
  jumlahTransfer: string;

  namaLengkap: string;
  noIdentitas: string;
  noWa: string;
  tempatLahir: string;
  tanggalLahir: string;

  namaIbu: string;
  namaSekolah: string;
  kelas: string;

  namaKampus: string;
  programStudi: string;
  angkatan: string;

  domisiliSaatIni: string;
  jenisKelamin: string;
  ukuranJersey: string;
  golonganDarah: string;
  komunitas: string;

  kontakDaruratNama: string;
  kontakDaruratStatus: string;
  kontakDaruratNoTelp: string;

  setujuDataBenar: boolean;
  bersediaMengikutiEvent: boolean;
  bersediaHadirSesuaiJadwal: boolean;
  bersediaMengikutiSeluruhRangkaian: boolean;
  bersediaMematuhiPeraturan: boolean;
  bersediaMenjagaKeselamatan: boolean;
  siapDanBertanggungJawab: boolean;
};

export const Route = createFileRoute("/form")({
  validateSearch: (search: Record<string, unknown>) => ({
    code:
      typeof search["code"] === "string"
        ? search["code"]
        : "",

    email:
      typeof search["email"] === "string"
        ? search["email"]
        : "",

    category:
      typeof search["category"] === "string"
        ? search["category"]
        : "",

    amount:
      typeof search["amount"] === "string"
        ? search["amount"]
        : "",
  }),

  component: FormPage,
});

function FormPage() {
  const navigate = useNavigate();

  const {
    code,
    email,
    category: categorySlug,
    amount,
  } = Route.useSearch();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [participantType, setParticipantType] =
    useState<ParticipantType>("");

  const [form, setForm] = useState<FormDataState>({
    paymentCode: code,
    email,

    participantType: "",

    buktiTransfer: null,
    namaPengirim: "",
    jumlahTransfer: amount,

    namaLengkap: "",
    noIdentitas: "",
    noWa: "",
    tempatLahir: "",
    tanggalLahir: "",

    namaIbu: "",
    namaSekolah: "",
    kelas: "",

    namaKampus: "",
    programStudi: "",
    angkatan: "",

    domisiliSaatIni: "",
    jenisKelamin: "",
    ukuranJersey: "",
    golonganDarah: "",
    komunitas: "",

    kontakDaruratNama: "",
    kontakDaruratStatus: "",
    kontakDaruratNoTelp: "",

    setujuDataBenar: false,
    bersediaMengikutiEvent: false,
    bersediaHadirSesuaiJadwal: false,
    bersediaMengikutiSeluruhRangkaian: false,
    bersediaMematuhiPeraturan: false,
    bersediaMenjagaKeselamatan: false,
    siapDanBertanggungJawab: false,
  });

  const [fileError, setFileError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState("");

  const isPelajarMahasiswa =
    categorySlug === "pelajar-mahasiswa";

  const isUmum =
    categorySlug === "5k-umum" ||
    categorySlug === "2-5k-umum";

  const isPelajar =
    isPelajarMahasiswa &&
    participantType === "pelajar";

  const isMahasiswa =
    isPelajarMahasiswa &&
    participantType === "mahasiswa";

  const categoryLabel = useMemo(() => {
    switch (categorySlug) {
      case "5k-umum":
        return "5K Umum";

      case "2-5k-umum":
        return "2.5K Umum";

      case "pelajar-mahasiswa":
        return "5K Pelajar / Mahasiswa";

      default:
        return "PKU Fresh Run";
    }
  }, [categorySlug]);

  function updateField<K extends keyof FormDataState>(
    key: K,
    value: FormDataState[K],
  ) {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  function handleParticipantType(
    type: ParticipantType,
  ) {
    setParticipantType(type);

    setForm((previous) => ({
      ...previous,
      participantType: type,

      /*
       * Bersihkan data kategori sebelumnya
       * agar tidak ada data pelajar tersisa
       * ketika peserta berganti ke mahasiswa,
       * atau sebaliknya.
       */
      namaIbu: "",
      namaSekolah: "",
      kelas: "",

      namaKampus: "",
      programStudi: "",
      angkatan: "",
    }));
  }

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    setFileError("");

    const file =
      event.target.files?.[0] ?? null;

    if (!file) {
      updateField("buktiTransfer", null);
      return;
    }

    /*
     * Maksimal 1 MB
     */
    const maxSize =
      1 * 1024 * 1024;

    if (file.size > maxSize) {
      setFileError(
        "Ukuran bukti transfer maksimal 1 MB.",
      );

      event.target.value = "";

      updateField(
        "buktiTransfer",
        null,
      );

      return;
    }

    /*
     * Batasi format gambar.
     */
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (
      !allowedTypes.includes(
        file.type,
      )
    ) {
      setFileError(
        "Bukti transfer harus berupa JPG, PNG, atau WEBP.",
      );

      event.target.value = "";

      updateField(
        "buktiTransfer",
        null,
      );

      return;
    }

    updateField(
      "buktiTransfer",
      file,
    );
  }

  function validateForm() {
    if (!code) {
      return "Kode pembayaran tidak ditemukan.";
    }

    if (!email) {
      return "Email pembayaran tidak ditemukan.";
    }

    if (
      isPelajarMahasiswa &&
      !participantType
    ) {
      return "Silakan pilih status Anda sebagai pelajar atau mahasiswa.";
    }

    if (!form.buktiTransfer) {
      return "Silakan upload bukti transfer.";
    }

    if (!form.namaPengirim.trim()) {
      return "Nama pengirim wajib diisi.";
    }

    if (!form.namaLengkap.trim()) {
      return "Nama lengkap wajib diisi.";
    }

    if (!form.noIdentitas.trim()) {
      return "Nomor identitas wajib diisi.";
    }

    if (!form.email.trim()) {
      return "Email wajib diisi.";
    }

    if (!form.noWa.trim()) {
      return "Nomor WhatsApp wajib diisi.";
    }

    if (!form.tempatLahir.trim()) {
      return "Tempat lahir wajib diisi.";
    }

    if (!form.tanggalLahir) {
      return "Tanggal lahir wajib diisi.";
    }

    if (
      isPelajar &&
      !form.namaIbu.trim()
    ) {
      return "Nama ibu wajib diisi.";
    }

    if (
      isPelajar &&
      !form.namaSekolah.trim()
    ) {
      return "Nama sekolah wajib diisi.";
    }

    if (
      isPelajar &&
      !form.kelas.trim()
    ) {
      return "Kelas wajib diisi.";
    }

    if (
      isMahasiswa &&
      !form.namaKampus.trim()
    ) {
      return "Nama kampus wajib diisi.";
    }

    if (
      isMahasiswa &&
      !form.programStudi.trim()
    ) {
      return "Program studi wajib diisi.";
    }

    if (
      isMahasiswa &&
      !form.angkatan.trim()
    ) {
      return "Angkatan wajib diisi.";
    }

    if (!form.domisiliSaatIni.trim()) {
      return "Domisili saat ini wajib diisi.";
    }

    if (!form.jenisKelamin) {
      return "Jenis kelamin wajib dipilih.";
    }

    if (!form.ukuranJersey) {
      return "Ukuran jersey wajib dipilih.";
    }

    if (!form.golonganDarah) {
      return "Golongan darah wajib dipilih.";
    }

    if (!form.kontakDaruratNama.trim()) {
      return "Nama kontak darurat wajib diisi.";
    }

    if (!form.kontakDaruratStatus.trim()) {
      return "Status kontak darurat wajib diisi.";
    }

    if (!form.kontakDaruratNoTelp.trim()) {
      return "Nomor telepon kontak darurat wajib diisi.";
    }

    const agreements = [
      form.setujuDataBenar,
      form.bersediaMengikutiEvent,
      form.bersediaHadirSesuaiJadwal,
      form.bersediaMengikutiSeluruhRangkaian,
      form.bersediaMematuhiPeraturan,
      form.bersediaMenjagaKeselamatan,
      form.siapDanBertanggungJawab,
    ];

    if (agreements.some((item) => !item)) {
      return "Anda harus menyetujui seluruh pernyataan persetujuan.";
    }

    return "";
  }

  async function fileToBase64(
    file: File,
  ): Promise<string> {
    return new Promise(
      (
        resolve,
        reject,
      ) => {
        const reader =
          new FileReader();

        reader.onload = () => {
          const result =
            reader.result;

          if (
            typeof result !==
            "string"
          ) {
            reject(
              new Error(
                "Gagal membaca file.",
              ),
            );

            return;
          }

          /*
           * Hapus prefix:
           * data:image/png;base64,...
           */
          const base64 =
            result.split(",")[1] ??
            "";

          resolve(base64);
        };

        reader.onerror = () => {
          reject(
            new Error(
              "Gagal membaca bukti transfer.",
            ),
          );
        };

        reader.readAsDataURL(file);
      },
    );
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSubmitError("");

    const validationError =
      validateForm();

    if (validationError) {
      setSubmitError(
        validationError,
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    if (!form.buktiTransfer) {
      return;
    }

    if (!PARTICIPANT_API_URL) {
      setSubmitError(
        "URL Google Apps Script belum dikonfigurasi. Tambahkan VITE_PAYMENT_API_URL pada file .env.",
      );

      return;
    }

    setSubmitting(true);

    try {
      const buktiTransfer =
        await fileToBase64(
          form.buktiTransfer,
        );

      /*
       * Data dikirim ke Apps Script.
       *
       * Endpoint action=submit
       * akan kita buat di kode.gs.
       */
      const payload = {
        action: "submit",

        paymentCode:
          form.paymentCode,

        email:
          form.email.trim(),

        participantType:
          form.participantType,

        buktiTransfer: {
          name:
            form.buktiTransfer.name,
          type:
            form.buktiTransfer.type,
          size:
            form.buktiTransfer.size,
          base64:
            buktiTransfer,
        },

        namaPengirim:
          form.namaPengirim.trim(),

        jumlahTransfer:
          form.jumlahTransfer,

        kategori:
          categoryLabel,

        namaLengkap:
          form.namaLengkap.trim(),

        noIdentitas:
          form.noIdentitas.trim(),

        noWa:
          form.noWa.trim(),

        tempatLahir:
          form.tempatLahir.trim(),

        tanggalLahir:
          form.tanggalLahir,

        namaIbu:
          form.namaIbu.trim(),

        namaSekolah:
          form.namaSekolah.trim(),

        kelas:
          form.kelas.trim(),

        namaKampus:
          form.namaKampus.trim(),

        programStudi:
          form.programStudi.trim(),

        angkatan:
          form.angkatan.trim(),

        domisiliSaatIni:
          form.domisiliSaatIni.trim(),

        jenisKelamin:
          form.jenisKelamin,

        ukuranJersey:
          form.ukuranJersey,

        golonganDarah:
          form.golonganDarah,

        komunitas:
          form.komunitas.trim(),

        kontakDaruratNama:
          form.kontakDaruratNama.trim(),

        kontakDaruratStatus:
          form.kontakDaruratStatus.trim(),

        kontakDaruratNoTelp:
          form.kontakDaruratNoTelp.trim(),

        setujuDataBenar:
          form.setujuDataBenar,

        bersediaMengikutiEvent:
          form.bersediaMengikutiEvent,

        bersediaHadirSesuaiJadwal:
          form.bersediaHadirSesuaiJadwal,

        bersediaMengikutiSeluruhRangkaian:
          form.bersediaMengikutiSeluruhRangkaian,

        bersediaMematuhiPeraturan:
          form.bersediaMematuhiPeraturan,

        bersediaMenjagaKeselamatan:
          form.bersediaMenjagaKeselamatan,

        siapDanBertanggungJawab:
          form.siapDanBertanggungJawab,
      };

      const response =
        await fetch(
          PARTICIPANT_API_URL,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "text/plain;charset=utf-8",
            },

            body:
              JSON.stringify(
                payload,
              ),
          },
        );

      if (!response.ok) {
        throw new Error(
          "Gagal mengirim data pendaftaran.",
        );
      }

      const result =
        (await response.json()) as {
          success?: boolean;
          registrationId?: string;
          message?: string;
        };

      if (!result.success) {
        throw new Error(
          result.message ??
            "Pendaftaran gagal disimpan.",
        );
      }

      setRegistrationId(
        result.registrationId ??
          "",
      );

      setSubmitted(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(error);

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat mengirim pendaftaran.",
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setSubmitting(false);
    }
  }

  /*
   * ==========================================================
   * SUCCESS
   * ==========================================================
   */

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EAF6FF] px-4 py-10">
        <section className="w-full max-w-xl overflow-hidden rounded-[2rem] bg-white shadow-[0_15px_45px_rgba(20,43,77,0.1)]">

          <div className="bg-[#0A5490] px-6 py-10 text-center text-white sm:px-10">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#97D91B]">
              <Check className="h-8 w-8 text-white" />
            </div>

            <h1 className="mt-5 font-display text-3xl uppercase sm:text-4xl">
              Pendaftaran Berhasil
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/70">
              Data pendaftaran Anda telah
              berhasil diterima oleh sistem
              PKU Fresh Run.
            </p>
          </div>

          <div className="p-6 sm:p-8">

            {registrationId && (
              <div className="rounded-2xl bg-[#EAF6FF] p-5 text-center">
                <p className="text-[9px] font-extrabold tracking-[0.18em] text-[#062D50]/40 uppercase">
                  Registration ID
                </p>

                <p className="mt-2 break-all font-mono text-sm font-bold text-[#062D50]">
                  {registrationId}
                </p>
              </div>
            )}

            <div className="mt-5 rounded-2xl border border-[#97D91B]/30 bg-[#F2FBDD] p-5">
              <p className="text-sm font-bold text-[#468519]">
                Simpan informasi pendaftaran Anda.
              </p>

              <p className="mt-2 text-xs leading-relaxed text-[#468519]/70">
                Panitia akan melakukan pemeriksaan
                data dan bukti pembayaran. Pastikan
                email yang Anda masukkan aktif untuk
                menerima konfirmasi pendaftaran.
              </p>
            </div>

            <Link
              to="/"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#F18B1F] px-6 py-4 font-display text-sm tracking-wide text-white uppercase transition hover:bg-[#D97706]"
            >
              Kembali ke Beranda

              <ArrowRight className="h-4 w-4" />
            </Link>

          </div>
        </section>
      </main>
    );
  }

  /*
   * ==========================================================
   * INVALID PAYMENT DATA
   * ==========================================================
   */

  if (!code || !email || !categorySlug) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EAF6FF] px-4">
        <div className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-[0_15px_45px_rgba(20,43,77,0.1)]">

          <TriangleAlert className="mx-auto h-12 w-12 text-[#F18B1F]" />

          <h1 className="mt-5 font-display text-3xl uppercase text-[#062D50]">
            Data Pembayaran Tidak Lengkap
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-[#062D50]/60">
            Silakan kembali ke halaman pembayaran
            dan lanjutkan dari kode pembayaran Anda.
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

      <div className="mx-auto max-w-4xl">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <header className="text-center">

          <div className="inline-flex items-center gap-2 rounded-full bg-[#0A5490] px-4 py-2 text-[10px] font-extrabold tracking-[0.2em] text-white uppercase">
            <ShieldCheck className="h-3.5 w-3.5" />
            Form Pendaftaran
          </div>

          <h1 className="mt-5 font-display text-4xl leading-none text-[#062D50] uppercase sm:text-5xl">
            Lengkapi
            <br />
            <span className="text-[#F18B1F]">
              Data Peserta
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#062D50]/60">
            Lengkapi seluruh data dengan benar.
            Data yang Anda masukkan akan digunakan
            untuk proses verifikasi dan administrasi
            PKU Fresh Run.
          </p>

        </header>

        {/* ====================================================
            PAYMENT SUMMARY
        ==================================================== */}

        <section className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-[0_15px_45px_rgba(20,43,77,0.1)]">

          <div className="bg-[#0A5490] px-6 py-5 text-white sm:px-8">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-[9px] font-extrabold tracking-[0.2em] text-white/50 uppercase">
                  Kategori
                </p>

                <p className="mt-1 font-display text-xl uppercase sm:text-2xl">
                  {categoryLabel}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-[9px] font-extrabold tracking-[0.2em] text-white/50 uppercase">
                  Kode Pembayaran
                </p>

                <p className="mt-1 font-mono text-2xl font-bold tracking-widest text-[#F18B1F]">
                  {code}
                </p>
              </div>

            </div>

          </div>

          {/* ==================================================
              DISCLAIMER
          ================================================== */}

          <div className="p-6 sm:p-8">

            {isUmum && (
              <Disclaimer
                title="Penting untuk Peserta Umum"
                text="Pastikan data Anda sesuai dengan data yang ada di kartu identitas (KTP) Anda. Data akan digunakan untuk proses administrasi dan verifikasi peserta."
              />
            )}

            {isPelajarMahasiswa && (
              <Disclaimer
                title="Penting untuk Peserta Pelajar / Mahasiswa"
                text="Silakan pilih status Anda terlebih dahulu. Data akan diperiksa kesesuaiannya dengan status pendidikan aktif Anda."
              />
            )}

            {/* =================================================
                PILIH STATUS
            ================================================= */}

            {isPelajarMahasiswa && (
              <section className="mt-6">

                <SectionTitle
                  number="01"
                  title="Status Peserta"
                />

                <div className="grid gap-3 sm:grid-cols-2">

                  <ChoiceButton
                    active={
                      participantType ===
                      "pelajar"
                    }
                    title="Pelajar"
                    description="Peserta yang masih berstatus pelajar aktif."
                    onClick={() =>
                      handleParticipantType(
                        "pelajar",
                      )
                    }
                  />

                  <ChoiceButton
                    active={
                      participantType ===
                      "mahasiswa"
                    }
                    title="Mahasiswa"
                    description="Peserta yang masih berstatus mahasiswa aktif."
                    onClick={() =>
                      handleParticipantType(
                        "mahasiswa",
                      )
                    }
                  />

                </div>

                {participantType === "pelajar" && (
                  <div className="mt-4 rounded-2xl border border-[#0A5490]/10 bg-[#F8FCFF] p-4 text-xs leading-relaxed text-[#062D50]/65">
                    <strong className="text-[#062D50]">
                      Pelajar:
                    </strong>{" "}
                    pastikan data Anda sesuai dan
                    dalam status pelajar aktif di{" "}
                    <span className="font-semibold text-[#0A5490]">
                      NISN
                    </span>
                    . Kami akan memeriksa kesesuaian
                    data Anda.
                  </div>
                )}

                {participantType === "mahasiswa" && (
                  <div className="mt-4 rounded-2xl border border-[#0A5490]/10 bg-[#F8FCFF] p-4 text-xs leading-relaxed text-[#062D50]/65">
                    <strong className="text-[#062D50]">
                      Mahasiswa:
                    </strong>{" "}
                    pastikan data Anda sesuai dan
                    dalam status mahasiswa aktif di{" "}
                    <span className="font-semibold text-[#0A5490]">
                      PDDIKTI
                    </span>
                    . Kami akan memeriksa kesesuaian
                    data Anda.
                  </div>
                )}

              </section>
            )}

            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="mt-8"
            >

              {/* =============================================
                  DATA PEMBAYARAN
              ============================================== */}

              <SectionTitle
                number={
                  isPelajarMahasiswa
                    ? "02"
                    : "01"
                }
                title="Data Pembayaran"
              />

              <div className="grid gap-5 sm:grid-cols-2">

                <InputField
                  label="Kode Pembayaran"
                  value={form.paymentCode}
                  disabled
                />

                <InputField
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(value) =>
                    updateField(
                      "email",
                      value,
                    )
                  }
                  required
                  helper="Email aktif untuk konfirmasi pendaftaran."
                />

                <InputField
                  label="Nama Pengirim"
                  value={
                    form.namaPengirim
                  }
                  onChange={(value) =>
                    updateField(
                      "namaPengirim",
                      value,
                    )
                  }
                  required
                  placeholder="Nama sesuai rekening pengirim"
                />

                <InputField
                  label="Jumlah Transfer"
                  value={
                    form.jumlahTransfer
                  }
                  disabled
                  helper="Nominal berasal dari kode pembayaran."
                />

              </div>

              {/* =============================================
                  BUKTI TRANSFER
              ============================================== */}

              <div className="mt-5">

                <label className="text-[10px] font-extrabold tracking-[0.16em] text-[#062D50]/50 uppercase">
                  Bukti Transfer
                  <span className="ml-1 text-[#F18B1F]">
                    *
                  </span>
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={
                    handleFileChange
                  }
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="mt-2 flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#0A5490]/20 bg-[#F8FCFF] px-5 py-8 text-center transition hover:border-[#F18B1F]/50 hover:bg-[#FFF8F1]"
                >
                  {form.buktiTransfer ? (
                    <>
                      <FileImage className="h-8 w-8 text-[#468519]" />

                      <p className="mt-3 text-sm font-bold text-[#062D50]">
                        {form.buktiTransfer.name}
                      </p>

                      <p className="mt-1 text-xs text-[#062D50]/45">
                        {formatFileSize(
                          form.buktiTransfer.size,
                        )}
                      </p>

                      <span className="mt-3 rounded-full bg-[#EAF6FF] px-4 py-2 text-[10px] font-bold text-[#0A5490]">
                        Ganti File
                      </span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-[#0A5490]/50" />

                      <p className="mt-3 text-sm font-bold text-[#062D50]">
                        Upload Bukti Transfer
                      </p>

                      <p className="mt-1 text-xs text-[#062D50]/45">
                        JPG, PNG, WEBP — maksimal 1 MB
                      </p>
                    </>
                  )}
                </button>

                {fileError && (
                  <p className="mt-2 text-xs font-semibold text-red-600">
                    {fileError}
                  </p>
                )}

              </div>

              {/* =============================================
                  DATA DIRI
              ============================================== */}

              <div className="mt-10">

                <SectionTitle
                  number={
                    isPelajarMahasiswa
                      ? "03"
                      : "02"
                  }
                  title="Data Diri"
                />

                <div className="grid gap-5 sm:grid-cols-2">

                  <InputField
                    label="Nama Lengkap"
                    value={
                      form.namaLengkap
                    }
                    onChange={(value) =>
                      updateField(
                        "namaLengkap",
                        value,
                      )
                    }
                    required
                    placeholder="Sesuai KTP / identitas"
                    fullWidth
                  />

                  <InputField
                    label={
                      isPelajar
                        ? "NISN"
                        : isMahasiswa
                          ? "NPM"
                          : "NIK"
                    }
                    value={
                      form.noIdentitas
                    }
                    onChange={(value) =>
                      updateField(
                        "noIdentitas",
                        value,
                      )
                    }
                    required
                    placeholder={
                      isPelajar
                        ? "Nomor Induk Siswa Nasional"
                        : isMahasiswa
                          ? "Nomor Pokok Mahasiswa"
                          : "Nomor Induk Kependudukan"
                    }
                  />

                  <InputField
                    label="Nomor WhatsApp"
                    value={
                      form.noWa
                    }
                    onChange={(value) =>
                      updateField(
                        "noWa",
                        value,
                      )
                    }
                    required
                    placeholder="08xxxxxxxxxx"
                  />

                  <InputField
                    label="Tempat Lahir"
                    value={
                      form.tempatLahir
                    }
                    onChange={(value) =>
                      updateField(
                        "tempatLahir",
                        value,
                      )
                    }
                    required
                    placeholder="Contoh: Sukoharjo"
                  />

                  <InputField
                    label="Tanggal Lahir"
                    type="date"
                    value={
                      form.tanggalLahir
                    }
                    onChange={(value) =>
                      updateField(
                        "tanggalLahir",
                        value,
                      )
                    }
                    required
                  />

                </div>

              </div>

              {/* =============================================
                  PELAJAR
              ============================================== */}

              {isPelajar && (
                <div className="mt-10">

                  <SectionTitle
                    number="04"
                    title="Data Pelajar"
                  />

                  <div className="grid gap-5 sm:grid-cols-2">

                    <InputField
                      label="Nama Ibu"
                      value={
                        form.namaIbu
                      }
                      onChange={(value) =>
                        updateField(
                          "namaIbu",
                          value,
                        )
                      }
                      required
                    />

                    <InputField
                      label="Nama Sekolah"
                      value={
                        form.namaSekolah
                      }
                      onChange={(value) =>
                        updateField(
                          "namaSekolah",
                          value,
                        )
                      }
                      required
                    />

                    <InputField
                      label="Kelas"
                      value={
                        form.kelas
                      }
                      onChange={(value) =>
                        updateField(
                          "kelas",
                          value,
                        )
                      }
                      required
                      placeholder="Contoh: XII IPA 1"
                    />

                  </div>

                </div>
              )}

              {/* =============================================
                  MAHASISWA
              ============================================== */}

              {isMahasiswa && (
                <div className="mt-10">

                  <SectionTitle
                    number="04"
                    title="Data Mahasiswa"
                  />

                  <div className="grid gap-5 sm:grid-cols-2">

                    <InputField
                      label="Nama Kampus"
                      value={
                        form.namaKampus
                      }
                      onChange={(value) =>
                        updateField(
                          "namaKampus",
                          value,
                        )
                      }
                      required
                    />

                    <InputField
                      label="Program Studi"
                      value={
                        form.programStudi
                      }
                      onChange={(value) =>
                        updateField(
                          "programStudi",
                          value,
                        )
                      }
                      required
                    />

                    <InputField
                      label="Angkatan"
                      value={
                        form.angkatan
                      }
                      onChange={(value) =>
                        updateField(
                          "angkatan",
                          value,
                        )
                      }
                      required
                      placeholder="Contoh: 2024"
                    />

                  </div>

                </div>
              )}

              {/* =============================================
                  INFORMASI TAMBAHAN
              ============================================== */}

              <div className="mt-10">

                <SectionTitle
                  number={
                    isPelajarMahasiswa
                      ? "05"
                      : "03"
                  }
                  title="Informasi Peserta"
                />

                <div className="grid gap-5 sm:grid-cols-2">

                  <InputField
                    label="Domisili Saat Ini"
                    value={
                      form.domisiliSaatIni
                    }
                    onChange={(value) =>
                      updateField(
                        "domisiliSaatIni",
                        value,
                      )
                    }
                    required
                    placeholder="Contoh: Sukoharjo"
                  />

                  <SelectField
                    label="Jenis Kelamin"
                    value={
                      form.jenisKelamin
                    }
                    onChange={(value) =>
                      updateField(
                        "jenisKelamin",
                        value,
                      )
                    }
                    options={[
                      {
                        value:
                          "Laki-laki",
                        label:
                          "Laki-laki",
                      },
                      {
                        value:
                          "Perempuan",
                        label:
                          "Perempuan",
                      },
                    ]}
                    required
                  />

                  <SelectField
                    label="Ukuran Jersey"
                    value={
                      form.ukuranJersey
                    }
                    onChange={(value) =>
                      updateField(
                        "ukuranJersey",
                        value,
                      )
                    }
                    options={[
                      "S",
                      "M",
                      "L",
                      "XL",
                      "2XL",
                      "3XL",
                    ].map(
                      (size) => ({
                        value: size,
                        label: size,
                      }),
                    )}
                    required
                  />

                  <SelectField
                    label="Golongan Darah"
                    value={
                      form.golonganDarah
                    }
                    onChange={(value) =>
                      updateField(
                        "golonganDarah",
                        value,
                      )
                    }
                    options={[
                      "A",
                      "B",
                      "AB",
                      "O",
                    ].map(
                      (blood) => ({
                        value:
                          blood,
                        label:
                          blood,
                      }),
                    )}
                    required
                  />

                  <InputField
                    label="Komunitas"
                    value={
                      form.komunitas
                    }
                    onChange={(value) =>
                      updateField(
                        "komunitas",
                        value,
                      )
                    }
                    placeholder="Opsional"
                    fullWidth
                  />

                </div>

              </div>

              {/* =============================================
                  KONTAK DARURAT
              ============================================== */}

              <div className="mt-10">

                <SectionTitle
                  number={
                    isPelajarMahasiswa
                      ? "06"
                      : "04"
                  }
                  title="Kontak Darurat"
                />

                <div className="grid gap-5 sm:grid-cols-2">

                  <InputField
                    label="Nama"
                    value={
                      form.kontakDaruratNama
                    }
                    onChange={(value) =>
                      updateField(
                        "kontakDaruratNama",
                        value,
                      )
                    }
                    required
                  />

                  <InputField
                    label="Status / Hubungan"
                    value={
                      form.kontakDaruratStatus
                    }
                    onChange={(value) =>
                      updateField(
                        "kontakDaruratStatus",
                        value,
                      )
                    }
                    required
                    placeholder="Contoh: Ayah"
                  />

                  <InputField
                    label="Nomor Telepon"
                    value={
                      form.kontakDaruratNoTelp
                    }
                    onChange={(value) =>
                      updateField(
                        "kontakDaruratNoTelp",
                        value,
                      )
                    }
                    required
                    placeholder="08xxxxxxxxxx"
                  />

                </div>

              </div>

              {/* =============================================
                  PERSETUJUAN
              ============================================== */}

              <div className="mt-10">

                <SectionTitle
                  number={
                    isPelajarMahasiswa
                      ? "07"
                      : "05"
                  }
                  title="Persetujuan Peserta"
                />

                <div className="rounded-[1.5rem] border border-[#0A5490]/10 bg-[#F8FCFF] p-5 sm:p-6">

                  <Agreement
                    checked={
                      form.setujuDataBenar
                    }
                    onChange={(value) =>
                      updateField(
                        "setujuDataBenar",
                        value,
                      )
                    }
                    text="Saya menyatakan bahwa data yang telah diisi pada formulir pendaftaran adalah benar dan dapat dipertanggungjawabkan."
                  />

                  <Agreement
                    checked={
                      form.bersediaMengikutiEvent
                    }
                    onChange={(value) =>
                      updateField(
                        "bersediaMengikutiEvent",
                        value,
                      )
                    }
                    text="Saya bersedia mengikuti event PKU Fresh Run."
                  />

                  <Agreement
                    checked={
                      form.bersediaHadirSesuaiJadwal
                    }
                    onChange={(value) =>
                      updateField(
                        "bersediaHadirSesuaiJadwal",
                        value,
                      )
                    }
                    text="Saya bersedia hadir di lokasi sesuai dengan jadwal yang telah ditentukan oleh panitia."
                  />

                  <Agreement
                    checked={
                      form.bersediaMengikutiSeluruhRangkaian
                    }
                    onChange={(value) =>
                      updateField(
                        "bersediaMengikutiSeluruhRangkaian",
                        value,
                      )
                    }
                    text="Saya bersedia mengikuti seluruh rangkaian kegiatan PKU Fresh Run sesuai arahan panitia."
                  />

                  <Agreement
                    checked={
                      form.bersediaMematuhiPeraturan
                    }
                    onChange={(value) =>
                      updateField(
                        "bersediaMematuhiPeraturan",
                        value,
                      )
                    }
                    text="Saya bersedia mematuhi seluruh peraturan dan ketentuan yang berlaku selama event berlangsung."
                  />

                  <Agreement
                    checked={
                      form.bersediaMenjagaKeselamatan
                    }
                    onChange={(value) =>
                      updateField(
                        "bersediaMenjagaKeselamatan",
                        value,
                      )
                    }
                    text="Saya bersedia menjaga ketertiban, keamanan, dan keselamatan diri sendiri maupun peserta lain selama event berlangsung."
                  />

                  <Agreement
                    checked={
                      form.siapDanBertanggungJawab
                    }
                    onChange={(value) =>
                      updateField(
                        "siapDanBertanggungJawab",
                        value,
                      )
                    }
                    text="Saya menyatakan siap mengikuti PKU Fresh Run dan bertanggung jawab atas kesiapan diri selama mengikuti event."
                    last
                  />

                </div>

              </div>

              {/* =============================================
                  ERROR
              ============================================== */}

              {submitError && (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">

                  <div className="flex gap-3">

                    <TriangleAlert className="h-5 w-5 shrink-0 text-red-500" />

                    <div>
                      <p className="text-sm font-bold text-red-700">
                        Data belum dapat dikirim
                      </p>

                      <p className="mt-1 text-xs leading-relaxed text-red-600">
                        {submitError}
                      </p>
                    </div>

                  </div>

                </div>
              )}

              {/* =============================================
                  SUBMIT
              ============================================== */}

              <div className="mt-8">

                <button
                  type="submit"
                  disabled={submitting}
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#F18B1F] px-6 py-4 font-display text-sm tracking-wide text-white uppercase shadow-[0_8px_25px_rgba(241,139,31,.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D97706] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Mengirim Pendaftaran...
                    </>
                  ) : (
                    <>
                      Kirim Pendaftaran

                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-[10px] leading-relaxed text-[#062D50]/45">
                  Dengan mengirim formulir ini, Anda
                  menyatakan bahwa seluruh data yang
                  diberikan adalah benar.
                </p>

              </div>

            </form>

          </div>
        </section>

        {/* BACK */}

        <div className="mt-6 flex justify-center">

          <Link
            to="/bayar"
            search={{
              category: categorySlug,
            }}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#0A5490]/60 uppercase transition-colors hover:text-[#F18B1F]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali ke Pembayaran
          </Link>

        </div>

      </div>
    </main>
  );
}

/*
 * ============================================================
 * DISCLAIMER
 * ============================================================
 */

function Disclaimer({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-[#F18B1F]/20 bg-[#FFF8F1] p-5">

      <div className="flex gap-3">

        <TriangleAlert className="h-5 w-5 shrink-0 text-[#F18B1F]" />

        <div>
          <p className="text-xs font-extrabold text-[#8A3D06]">
            {title}
          </p>

          <p className="mt-1 text-xs leading-relaxed text-[#8A3D06]/70">
            {text}
          </p>
        </div>

      </div>

    </div>
  );
}

/*
 * ============================================================
 * SECTION TITLE
 * ============================================================
 */

function SectionTitle({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">

      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#0A5490] text-[10px] font-extrabold text-white">
        {number}
      </div>

      <h2 className="font-display text-xl text-[#062D50] uppercase">
        {title}
      </h2>

    </div>
  );
}

/*
 * ============================================================
 * INPUT
 * ============================================================
 */

function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  disabled = false,
  helper,
  fullWidth = false,
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  helper?: string;
  fullWidth?: boolean;
}) {
  return (
    <div
      className={
        fullWidth
          ? "sm:col-span-2"
          : ""
      }
    >

      <label className="text-[10px] font-extrabold tracking-[0.16em] text-[#062D50]/50 uppercase">

        {label}

        {required && (
          <span className="ml-1 text-[#F18B1F]">
            *
          </span>
        )}

      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange?.(
            event.target.value,
          )
        }
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-[#062D50] outline-none transition placeholder:text-[#062D50]/25 focus:border-[#0A5490]/40 focus:ring-4 focus:ring-[#0A5490]/5 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-[#062D50]/50"
      />

      {helper && (
        <p className="mt-1.5 text-[10px] leading-relaxed text-[#062D50]/40">
          {helper}
        </p>
      )}

    </div>
  );
}

/*
 * ============================================================
 * SELECT
 * ============================================================
 */

function SelectField({
  label,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: {
    value: string;
    label: string;
  }[];
  required?: boolean;
}) {
  return (
    <div>

      <label className="text-[10px] font-extrabold tracking-[0.16em] text-[#062D50]/50 uppercase">

        {label}

        {required && (
          <span className="ml-1 text-[#F18B1F]">
            *
          </span>
        )}

      </label>

      <div className="relative">

        <select
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value,
            )
          }
          required={required}
          className="mt-2 h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-[#062D50] outline-none transition focus:border-[#0A5490]/40 focus:ring-4 focus:ring-[#0A5490]/5"
        >
          <option value="">
            Pilih {label}
          </option>

          {options.map(
            (option) => (
              <option
                key={
                  option.value
                }
                value={
                  option.value
                }
              >
                {option.label}
              </option>
            ),
          )}
        </select>

        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 text-[#062D50]/35" />

      </div>

    </div>
  );
}

/*
 * ============================================================
 * CHOICE BUTTON
 * ============================================================
 */

function ChoiceButton({
  active,
  title,
  description,
  onClick,
}: {
  active: boolean;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border-2 p-5 text-left transition ${
        active
          ? "border-[#F18B1F] bg-[#FFF8F1]"
          : "border-slate-200 bg-white hover:border-[#0A5490]/30"
      }`}
    >

      <div className="flex items-center justify-between gap-3">

        <p className="font-display text-xl text-[#062D50] uppercase">
          {title}
        </p>

        {active && (
          <div className="grid h-7 w-7 place-items-center rounded-full bg-[#F18B1F] text-white">
            <Check className="h-4 w-4" />
          </div>
        )}

      </div>

      <p className="mt-2 text-xs leading-relaxed text-[#062D50]/50">
        {description}
      </p>

    </button>
  );
}

/*
 * ============================================================
 * AGREEMENT
 * ============================================================
 */

function Agreement({
  checked,
  onChange,
  text,
  last = false,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  text: string;
  last?: boolean;
}) {
  return (
    <label
      className={`flex cursor-pointer gap-3 py-4 ${
        !last
          ? "border-b border-slate-200"
          : ""
      }`}
    >

      <input
        type="checkbox"
        checked={checked}
        onChange={(event) =>
          onChange(
            event.target.checked,
          )
        }
        className="mt-0.5 h-5 w-5 shrink-0 accent-[#F18B1F]"
      />

      <span className="text-xs leading-relaxed text-[#062D50]/65">
        {text}
      </span>

    </label>
  );
}

/*
 * ============================================================
 * FILE SIZE
 * ============================================================
 */

function formatFileSize(
  bytes: number,
) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(
      bytes / 1024
    ).toFixed(0)} KB`;
  }

  return `${(
    bytes /
    (1024 * 1024)
  ).toFixed(2)} MB`;
}