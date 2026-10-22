import usePageTitle from "@/hooks/usePageTitle";
import AudienceCards from "@/home/AudienceCards";
import HomeHero from "@/home/HomeHero";
import SocialEmbeds from "@/home/SocialEmbeds";
import SponsorMarquee from "@/home/SponsorMarquee";
import Stats from "@/home/Stats";
import TextLink from "@/components/TextLink";

export default function Home() {
  usePageTitle("Home");

  return (
    <>
      <HomeHero />
      <section className="bg-[#F3F7FD] px-5 py-6 text-center">
        <div className="mx-auto max-w-[900px]">
          <h2 className="text-xl font-bold text-ijas-navy md:text-2xl">
            State Qualifiers: Update your Info in zFairs!
          </h2>
          <p className="mt-2 text-[15px] text-[#374151]">
            Update now at{" "}
            <TextLink href="http://ijas.zfairs.com" external>
              ijas.zfairs.com
            </TextLink>
            . Students have 2 weeks from receiving their promotion email to upload their paper and
            update their information. Questions? Email{" "}
            <TextLink href="mailto:zfairssupport@ijas.org">zfairssupport@ijas.org</TextLink>.
          </p>
        </div>
      </section>
      <AudienceCards />
      <Stats />
      <SponsorMarquee />
      <SocialEmbeds />
    </>
  );
}
