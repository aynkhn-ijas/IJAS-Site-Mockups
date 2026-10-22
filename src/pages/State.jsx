import PageContent from "@/components/PageContent";
import PageHero from "@/components/PageHero";
import TextLink from "@/components/TextLink";
import usePageTitle from "@/hooks/usePageTitle";

export default function State() {
  usePageTitle("State Exposition");

  return (
    <>
      <PageHero title="State Exposition" />
      <PageContent>
        <h2>2026 IJAS State Science Exposition Series</h2>
        <p>Friday, April 24, 2026 – Saturday, April 25, 2026</p>
        <p>Southern Illinois University — Carbondale, Illinois</p>
        <p>
          View Gold, EPIC, and special award recipients on{" "}
          <TextLink to="/awards">Awards &amp; Results</TextLink>.
        </p>
        <h2>2027 IJAS State Exposition Series</h2>
        <p>“Celebrating 100 Years of Student Research”</p>
        <p>Friday, April 30, 2027 – Saturday, May 1, 2027</p>
        <p>Renaissance Center, Bradley University — Peoria, Illinois</p>
        <p>
          Qualifiers must update information in zFairs at{" "}
          <TextLink href="http://ijas.zfairs.com" external>
            ijas.zfairs.com
          </TextLink>
          .
        </p>
      </PageContent>
    </>
  );
}
