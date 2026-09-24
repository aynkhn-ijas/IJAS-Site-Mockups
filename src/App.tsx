import AudienceCards from "@/components/AudienceCards";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SocialEmbeds from "@/components/SocialEmbeds";
import SponsorMarquee from "@/components/SponsorMarquee";
import Stats from "@/components/Stats";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <AudienceCards />
        <Stats />
        <SponsorMarquee />
        <SocialEmbeds />
      </main>
      <Footer />
    </div>
  );
}
