import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/funrun/Navbar";
import {
  Categories,
  Hero,
  Podium,
  RaceInfo,
  TotalPrize,
} from "@/components/funrun/SectionsTop";
import {
  Faq,
  FinalCTA,
  Footer,
  HowTo,
  RacePack,
  RouteMap,
  Rundown,
  Sponsors,
} from "@/components/funrun/SectionsBottom";

const title = "PKU Muhammadiyah Sukoharjo Fun Run 2026 | 5K & 2.5K";
const description =
  "Fun Run 5K & 2.5K Milad RS PKU Muhammadiyah Sukoharjo, 18 November 2026. Total hadiah puluhan juta, jersey, medali, dan doorprize. Daftar sekarang!";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Navbar />
      <main>
        <Hero />
        <RaceInfo />
        <TotalPrize />
        <Podium />
        <Categories />
        <RacePack />
        <RouteMap />
        <Rundown />
        <HowTo />
        <Sponsors />
        <FinalCTA />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
