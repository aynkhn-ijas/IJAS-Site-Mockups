import PageContent from "@/components/PageContent";
import PageHero from "@/components/PageHero";
import TextLink from "@/components/TextLink";
import usePageTitle from "@/hooks/usePageTitle";

export default function Donors() {
  usePageTitle("Donors & Sponsorship");

  return (
    <>
      <PageHero title="Become a Sponsor" />
      <PageContent>
        <h2>Thank you for your interest in sponsoring IJAS</h2>
        <p>
          The IJAS Sponsorship Package provides a complete overview of how organizations and
          individuals can support the Illinois Junior Academy of Science. Inside you will find
          sponsorship levels, recognition benefits, visibility opportunities, and the impact your
          support makes on student research and STEM education across Illinois.
        </p>
        <p>
          Download the 2025–2026 IJAS Sponsorship Packet from the live site:{" "}
          <TextLink href="https://www.ijas.org/sponsorship" external>
            ijas.org/sponsorship
          </TextLink>
          .
        </p>
        <h2>Special Award Partners</h2>
        <p>
          Sponsors such as Ball Seed, the Illinois Soybean Association, the Illinois Psychological
          Association, and Thermo Fisher help fund special awards recognized on the{" "}
          <TextLink to="/awards">Awards &amp; Results</TextLink> archive.
        </p>
        <p>
          Questions: <TextLink href="mailto:info@ijas.org">info@ijas.org</TextLink>.
        </p>
      </PageContent>
    </>
  );
}
