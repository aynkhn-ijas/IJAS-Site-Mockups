import Hero from "@/components/home/Hero";
import AudienceCards from "@/components/home/AudienceCards";
import Stats from "@/components/home/Stats";
import SponsorMarquee from "@/components/home/SponsorMarquee";
import SocialEmbeds from "@/components/home/SocialEmbeds";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AudienceCards />
      <Stats />
      <SponsorMarquee />
      <SocialEmbeds />
    </>
  );
}