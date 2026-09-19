import japfaLogo from "@/assets/opensponsor.png";
import mandiriLogo from "@/assets/opensponsor.png";
import astraLogo from "@/assets/opensponsor.png";
import smartfrenLogo from "@/assets/opensponsor.png";
import telkomselLogo from "@/assets/opensponsor.png";
import danaLogo from "@/assets/opensponsor.png";
import erafoneLogo from "@/assets/opensponsor.png";
import vivoLogo from "@/assets/opensponsor.png";
import xiaomiLogo from "@/assets/opensponsor.png";
import samsungLogo from "@/assets/opensponsor.png";
import kbsyariahLogo from "@/assets/kbsyariah.png";

// ============================================================
// SEMUA DATA EVENT ADA DI SINI
// ============================================================

// ============================================================
// EVENT INFO
// ============================================================

export const eventInfo = {
  name: "PKU Muhammadiyah Sukoharjo Fun Run",
  subtitle: "Dalam rangka Milad RS PKU Muhammadiyah Sukoharjo",
  dateISO: "2026-11-29T05:30:00+07:00",
  dateLabel: "29 November 2026",
  location: "Alun Alun Satya Negara Sukoharjo",
  startTime: "06.00 WIB",
  distances: "5K & 2.5K FRESH RUN",
  totalPrize: "Rp 25.000.000",
  instagram: "https://www.instagram.com/pkufreshrun26/",
  whatsapp: "https://wa.me/6289694719567",

    // BATAS EARLY BIRD
  earlyBirdEndISO: "2026-09-25T23:59:59+07:00",
  earlyBirdEndLabel: "25 September 2026",


  // Tidak lagi digunakan untuk proses pendaftaran React.
  // Pendaftaran dilakukan melalui ticketing EO.
  registerUrl: "https://ayoplayon.com/event/pkufreshrun2026",

  pdfUrl: "/assets/pdf/tata-cara-daftar.pdf",
};

// ============================================================
// NAVIGATION
// ============================================================

export const navItems = [
  { label: "Informasi", href: "#race" },
  // { label: "Kategori", href: "#kategori" },
  { label: "Race Pack", href: "#racepack" },
  { label: "Rute & Rundown", href: "#rute" },
  // { label: "Cara Daftar", href: "#cara-daftar" },
  { label: "Sponsor", href: "#sponsor" },
  { label: "FAQ", href: "#faq" },
];

// ============================================================
// PODIUM
// ============================================================

export const podium = {
  putra: [
    { medal: "🥇", place: "Juara 1", prize: "1.234.567" },
    { medal: "🥈", place: "Juara 2", prize: "750.000" },
    { medal: "🥉", place: "Juara 3", prize: "500.0000" },
  ],

  putri: [
    { medal: "🥇", place: "Juara 1", prize: "1.234.567" },
    { medal: "🥈", place: "Juara 2", prize: "750.000" },
    { medal: "🥉", place: "Juara 3", prize: "500.0000" },
  ],
};

// ============================================================
// CATEGORY TYPE
// ============================================================

export type Category = {
  slug: string;
  name: string;
  productKey: string;
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

  // URL ticketing EO
  registerUrl?: string;

  // true  = kategori tampil
  // false = kategori tidak tampil
  enabled: boolean;

  // true  = tombol Daftar aktif
  // false = tombol Belum Dibuka
  registrationOpen: boolean;
};

// ============================================================
// CATEGORY CONFIGURATION
// ============================================================

export const categories: Category[] = [
  // ==========================================================
  // 1. 5K PRESALE
  // ==========================================================

  {
    slug: "5k-presale",
    name: "5K UMUM",
    productKey: "5K_PRESALE",
    price: "Rp 123.456",
    note: "EARLY BIRD",
    registrationPeriod: "1 September – 10 September 2026",

    benefits: [
      "BIB",
      "Jersey",
      "Medal",
      "Race Pack",
      "Snack",
    ],

    requirement: "NIK",
    tone: "bright",

    quota: 300,
    registered: 0,

    // GANTI DENGAN LINK TICKETING EO
    registerUrl: "https://ayoplayon.com/event/pkufreshrun2026",

    enabled: true,
    registrationOpen: true,
  },

  // ==========================================================
  // 2. 5K UMUM
  // ==========================================================

  {
    slug: "5k-umum",
    name: "5K UMUM",
    productKey: "5K_UMUM",
    price: "Rp 170.000",
    registrationPeriod: "Setelah periode presale",

    benefits: [
      "BIB",
      "Jersey",
      "Medal",
      "Race Pack",
      "Snack",
    ],

    requirement: "NIK",
    tone: "bright",

    quota: 300,
    registered: 0,

    // GANTI DENGAN LINK TICKETING EO
    registerUrl: "https://www.instagram.com/pkufreshrun26?stkn=eW1pNjZkdHNtYWlk",

    enabled: false,
    registrationOpen: false,
  },

  // ==========================================================
  // 3. 2.5K PRESALE
  // ==========================================================

  {
    slug: "2-5k-presale",
    name: "2.5K UMUM",
    productKey: "2_5K_PRESALE",
    price: "Rp 123.456",
    note: "EARLY BIRD",
    registrationPeriod: "1 September – 10 September 2026",

    benefits: [
      "BIB",
      "Jersey",
      "Snack",
    ],

    requirement: "NIK",
    tone: "cyan",

    quota: 300,
    registered: 0,

    // GANTI DENGAN LINK TICKETING EO
    registerUrl: "https://www.instagram.com/pkufreshrun26?stkn=eW1pNjZkdHNtYWlk",

    enabled: true,
    registrationOpen: true,
  },

  // ==========================================================
  // 4. 2.5K UMUM
  // ==========================================================

  {
    slug: "2-5k-umum",
    name: "2.5K UMUM",
    productKey: "2_5K_UMUM",
    price: "Rp 75.000",
    registrationPeriod: "Setelah periode presale",

    benefits: [
      "BIB",
      "Jersey",
      "Snack",
    ],

    requirement: "NIK",
    tone: "cyan",

    quota: 300,
    registered: 0,

    // GANTI DENGAN LINK TICKETING EO
    registerUrl: "https://www.instagram.com/pkufreshrun26?stkn=eW1pNjZkdHNtYWlk",

    enabled: false,
    registrationOpen: false,
  },

  // ==========================================================
  // 5. PELAJAR / MAHASISWA 5K
  // ==========================================================

  {
    slug: "pelajar-mahasiswa",
    name: "PELAJAR / MAHASISWA 5K",
    productKey: "5K_MAHASISWA",
    price: "Rp 123.456",
    registrationPeriod: "11 September – 11 Oktober 2026",

    benefits: [
      "BIB",
      "Jersey",
      "Medal",
      "Race Pack",
      "Snack",
    ],

    requirement: "NISN / NPM / NIM",
    tone: "light",

    quota: 500,
    registered: 0,

    // GANTI DENGAN LINK TICKETING EO
    registerUrl: "https://www.instagram.com/pkufreshrun26?stkn=eW1pNjZkdHNtYWlk",

    enabled: true,
    registrationOpen: true,
  },
];

// ============================================================
// RUNDOWN
// ============================================================

export const rundown = [
  {
    time: "05.00",
    title: "Registrasi",
    desc: "Peserta hadir & penukaran BIB terakhir",
  },
  {
    time: "05.30",
    title: "Warm Up",
    desc: "Senam bersama instruktur",
  },
  {
    time: "05.45",
    title: "Race Briefing",
    desc: "Penjelasan rute & aturan lomba",
  },
  {
    time: "06.00",
    title: "Start 5K",
    desc: "Flag off kategori 5 kilometer",
  },
  {
    time: "06.10",
    title: "Start 2.5K",
    desc: "Flag off kategori 2.5 kilometer",
  },
  {
    time: "07.30",
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

export const mainSponsor = {
  name: "KB SYARIAH",
  logo: kbsyariahLogo,
};

export const sponsors = [
  {
    name: "JAPFA",
    logo: japfaLogo,
  },
  {
    name: "MANDIRI",
    logo: mandiriLogo,
  },
  {
    name: "ASTRA",
    logo: astraLogo,
  },
  {
    name: "SMARTFREN",
    logo: smartfrenLogo,
  },
  {
    name: "TELKOMSEL",
    logo: telkomselLogo,
  },
  {
    name: "DANA",
    logo: danaLogo,
  },
  {
    name: "ERAFONE",
    logo: erafoneLogo,
  },
  {
    name: "VIVO",
    logo: vivoLogo,
  },
  {
    name: "XIAOMI",
    logo: xiaomiLogo,
  },
  {
    name: "SAMSUNG",
    logo: samsungLogo,
  },
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
    q: "Apa saja syarat yang diperlukan",
    a: "Cukup mendaftar dengan NIK yang valid dan melakukan pembayaran sesuai kategori.",
  },
  {
    q: "Apa syarat Pelajar / Mahasiswa?",
    a: "Tetap menginputkan NIK, karna sistem terhubung dengan data kependudukan",
  },
  {
    q: "Apa saja benefit yang didapatkan peserta?",
    a: "Jersey, Medal, Tote Bag, BIB, Refreshment, Doorprize, Waterstation, & Entertainment ",
  },
    {
    q: "Saya sudah transfer, tapi tidak mendapatkan email?",
    a: "untuk status pembayaran silahkan di cek di https://ayoplayon.com/receipt.php dengan input no transaksi yang ada di email anda. simpan barcode untuk pengambilan racepack, dan tunggu info terbaru dari sosial media pkufreshrun26",
  },
    {
    q: "saya sudah daftar 2 tapi saya hanya mendapatkan 1 barcode?",
    a: "Ya, betul runnners. semua data peserta dalam satu payment akan mendapatkan 1 barcode. simpan barcode dan tunggu info pengambilan racepack di sosmed pkufreshrun26",
  },
];