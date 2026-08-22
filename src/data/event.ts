// ============================================================
// SEMUA DATA EVENT ADA DI SINI
// Mudah diedit / dipindah ke Blade
// ============================================================

// ============================================================
// EVENT INFO
// ============================================================

export const eventInfo = {
  name: "PKU Muhammadiyah Sukoharjo Fun Run",
  subtitle: "Dalam rangka Milad RS PKU Muhammadiyah Sukoharjo",
  dateISO: "2026-11-18T05:30:00+07:00",
  dateLabel: "18 November 2026",
  location: "RS PKU Muhammadiyah Sukoharjo",
  startTime: "05.30 WIB",
  distances: "5K & 2.5K FUN RUN",
  totalPrize: "Rp 25.000.000",
  instagram: "https://instagram.com/",
  whatsapp: "https://wa.me/6281234567890",
  registerUrl: "/register",
  pdfUrl: "/assets/pdf/tata-cara-daftar.pdf",
};

// ============================================================
// NAVIGATION
// ============================================================

export const navItems = [
  { label: "Informasi", href: "#race" },
  { label: "Kategori", href: "#kategori" },
  { label: "Race Pack", href: "#racepack" },
  { label: "Rute", href: "#rute" },
  { label: "Rundown", href: "#rundown" },
  { label: "Cara Daftar", href: "#cara-daftar" },
  { label: "FAQ", href: "#faq" },
  { label: "Sponsor", href: "#sponsor" },
];

// ============================================================
// PODIUM
// ============================================================

export const podium = {
  putra: [
    { medal: "🥇", place: "Juara 1", prize: "Rp1.500.000" },
    { medal: "🥈", place: "Juara 2", prize: "Rp1.000.000" },
    { medal: "🥉", place: "Juara 3", prize: "Rp750.000" },
  ],
  putri: [
    { medal: "🥇", place: "Juara 1", prize: "Rp1.500.000" },
    { medal: "🥈", place: "Juara 2", prize: "Rp1.000.000" },
    { medal: "🥉", place: "Juara 3", prize: "Rp750.000" },
  ],
};

// ============================================================
// CATEGORY TYPE
// ============================================================

export type Category = {
  slug: string;
  name: string;
  price: string;
  note?: string;
  registrationPeriod?: string;
  benefits: string[];
  requirement?: string;
  tone:
    | "bright"
    | "sky"
    | "deep"
    | "cyan"
    | "light"
    | "navy";
  quota: number;
  registered: number;
};

// ============================================================
// CATEGORIES
// ============================================================

export const categories: Category[] = [
  // ==========================================================
  // 5K UMUM
  // ==========================================================

  {
    slug: "5k-umum",
    name: "5K UMUM",
    price: "Rp 150.000",
    note: "PRESALE",
    registrationPeriod: "1 September – 31 Oktober 2026",
    benefits: ["Jersey", "Medal", "Race Pack", "Snack"],
    requirement: "NIK",
    tone: "bright",
    quota: 300,
    registered: 30,
  },

  // ==========================================================
  // 2.5K UMUM
  // ==========================================================

  {
    slug: "2-5k-umum",
    name: "2.5K UMUM",
    price: "Rp 50.000",
    note: "PRESALE",
    registrationPeriod: "1 September – 31 Oktober 2026",
    benefits: ["Jersey", "BIB"],
    requirement: "NIK",
    tone: "cyan",
    quota: 300,
    registered: 30,
  },

  // ==========================================================
  // PELAJAR / MAHASISWA
  // ==========================================================

  {
    slug: "pelajar-mahasiswa",
    name: "PELAJAR / MAHASISWA 5K",
    price: "Rp 125.000",
    registrationPeriod: "1 September – 31 Oktober 2026",
    benefits: ["Jersey", "Medal", "Race Pack", "Snack"],
    requirement: "NISN / NPM / NIM",
    tone: "light",
    quota: 500,
    registered: 0,
  },

  // ==========================================================
  // STAFF RS PKU
  // NONAKTIF
  // ==========================================================

  /*
  {
    slug: "staff-rs-pku",
    name: "STAFF RS PKU 5K",
    price: "Rp 125.000",
    registrationPeriod: "1 September – 31 Oktober 2026",
    benefits: ["Jersey", "Medal", "Race Bag", "Snack"],
    tone: "navy",
    quota: 300,
    registered: 0,
  },
  */

  // ==========================================================
  // WARGA MUHAMMADIYAH
  // NONAKTIF
  // ==========================================================

  /*
  {
    slug: "warga-muhammadiyah",
    name: "WARGA MUHAMMADIYAH",
    price: "Rp 75.000",
    registrationPeriod: "1 September – 31 Oktober 2026",
    benefits: ["BIB Only"],
    requirement: "KTA Muhammadiyah",
    tone: "sky",
    quota: 300,
    registered: 0,
  },
  */
];

// ============================================================
// RUNDOWN
// ============================================================

export const rundown = [
  {
    time: "04.30",
    title: "Registrasi",
    desc: "Peserta hadir & penukaran BIB terakhir",
  },
  {
    time: "05.00",
    title: "Warm Up",
    desc: "Senam bersama instruktur",
  },
  {
    time: "05.20",
    title: "Race Briefing",
    desc: "Penjelasan rute & aturan lomba",
  },
  {
    time: "05.30",
    title: "Start 5K",
    desc: "Flag off kategori 5 kilometer",
  },
  {
    time: "05.45",
    title: "Start 2.5K",
    desc: "Flag off kategori 2.5 kilometer",
  },
  {
    time: "07.00",
    title: "Finish & Refreshment",
    desc: "Finisher menerima medali & snack",
  },
  {
    time: "07.30",
    title: "Podium",
    desc: "Penyerahan hadiah pemenang",
  },
  {
    time: "08.00",
    title: "Entertainment / Doorprize",
    desc: "Hiburan & undian hadiah",
  },
  {
    time: "09.00",
    title: "Closing",
    desc: "Penutupan acara",
  },
];

// ============================================================
// REGISTRATION STEPS
// ============================================================

export const steps = [
  {
    no: "01",
    title: "PILIH KATEGORI",
    desc: "Tentukan jarak dan kategori yang sesuai denganmu.",
  },
  {
    no: "02",
    title: "ISI FORM",
    desc: "Lengkapi data diri & unggah persyaratan kategori.",
  },
  {
    no: "03",
    title: "TUNGGU EMAIL",
    desc: "Konfirmasi pembayaran dikirim ke email kamu.",
  },
  {
    no: "04",
    title: "DOWNLOAD E-TICKET",
    desc: "Simpan e-ticket sebagai bukti pendaftaran.",
  },
  {
    no: "05",
    title: "AMBIL RACEPACK",
    desc: "Tukarkan e-ticket di lokasi race pack collection.",
  },
];

// ============================================================
// SPONSORS
// ============================================================

export const sponsors = [
  "SEHAT CARE",
  "AQUAPURE",
  "SUKOHARJO SPORT",
  "MUHAMMADIYAH MEDIA",
  "BANK SYARIAH",
  "RUN LAB",
  "VITA GO",
  "PKU PHARMA",
  "KOPI LANGKAH",
  "FIT GEAR",
  "SOLO RAYA",
  "AMANAH GROUP",
];

// ============================================================
// FAQ
// ============================================================

export const faqs = [
  {
    q: "Siapa yang bisa mengikuti event ini?",
    a: "Terbuka untuk umum, pelajar/mahasiswa, warga Muhammadiyah, staff RS PKU, dan AUM. Peserta dalam kondisi sehat dan mengisi form kesehatan saat pendaftaran.",
  },
  {
    q: "Apa syarat kategori 5K Umum?",
    a: "Cukup mendaftar dengan NIK yang valid dan melakukan pembayaran sesuai kategori.",
  },
  {
    q: "Apa syarat Pelajar / Mahasiswa?",
    a: "Melampirkan NISN / NPM / NIM aktif beserta kartu pelajar atau kartu mahasiswa.",
  },
  {
    q: "Apa syarat Warga Muhammadiyah?",
    a: "Melampirkan KTA Muhammadiyah yang masih berlaku. Kategori ini mendapatkan BIB only.",
  },
  {
    q: "Apa benefit setiap kategori?",
    a: "Kategori 5K mendapat Jersey, Medal, Race Bag, dan Snack. Kategori 2.5K mendapat Jersey & BIB. Warga Muhammadiyah mendapat BIB only.",
  },
  {
    q: "Bagaimana mendapatkan e-ticket?",
    a: "Setelah pembayaran terverifikasi, e-ticket dikirim otomatis ke email dan dapat diunduh dari tautan pada email tersebut.",
  },
  {
    q: "Bagaimana mengambil racepack?",
    a: "Tunjukkan e-ticket dan identitas asli di lokasi race pack collection sesuai jadwal yang diumumkan.",
  },
];