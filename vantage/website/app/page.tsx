import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/marketing/Hero";
import ProblemCards from "@/components/marketing/ProblemCards";
import SprintOffer from "@/components/marketing/SprintOffer";
import DashboardPreview from "@/components/marketing/DashboardPreview";
import LegalDisclaimer from "@/components/layout/LegalDisclaimer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Header overlays the hero with absolute positioning */}
        <div className="relative">
          <Header overlay />
          <Hero />
        </div>
        <ProblemCards />
        <SprintOffer />
        <DashboardPreview />
        {/* Legal boundary section */}
        <section className="bg-white py-14 border-t border-vantage-black-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-lg font-semibold text-vantage-black mb-4">VANTAGE service boundaries</h2>
            <LegalDisclaimer variant="short" className="max-w-2xl" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
