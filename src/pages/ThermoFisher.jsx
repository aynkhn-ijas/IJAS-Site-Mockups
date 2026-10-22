import PageContent from "@/components/PageContent";
import PageHero from "@/components/PageHero";
import TextLink from "@/components/TextLink";
import usePageTitle from "@/hooks/usePageTitle";

export default function ThermoFisher() {
  usePageTitle("Thermo Fisher JIC");

  return (
    <>
      <PageHero title="IJAS — Thermo Fisher JIC" />
      <PageContent>
        <h2>Thermo Fisher Scientific Junior Innovators Challenge (JIC)</h2>
        <p>
          The Thermo Fisher Scientific Junior Innovators Challenge is the premier national STEM
          competition for middle school students in the United States. Students qualify through their
          regional and state science fairs. Each year, the top 300 projects nationwide advance, and
          finalists are invited to Washington, D.C. Competitors have the chance to win over $100,000
          in prizes and scholarships.
        </p>
        <p>
          More information:{" "}
          <TextLink href="https://www.societyforscience.org/jic" external>
            societyforscience.org/jic
          </TextLink>
        </p>
        <h2>IJAS Rules</h2>
        <ul>
          <li>
            Students must take part in either a participating IJAS Regional Exposition (1, 3, 4, 5,
            6, 7, 10, and 12) or the IJAS State Exposition.
          </li>
          <li>
            The top 10% of middle school students at either a participating regional exposition or
            the State Exposition are eligible for nomination.
          </li>
        </ul>
        <h2>Schedule</h2>
        <ul>
          <li>IJAS Regional Expositions: throughout March 2027</li>
          <li>IJAS State Exposition: April 30–May 1, 2027</li>
          <li>Nominees honored at the Awards Ceremony on May 1, 2027 — Bradley University, Peoria</li>
          <li>
            Application portal:{" "}
            <TextLink href="https://thermofisherjic.smapply.org/" external>
              thermofisherjic.smapply.org
            </TextLink>
          </li>
        </ul>
        <h2>IJAS Fair Codes</h2>
        <ul>
          <li>Regions 1 &amp; 7 — USIL03</li>
          <li>Region 3 — USIL01</li>
          <li>Region 4 — USIL78</li>
          <li>Region 5 — USIL06</li>
          <li>Region 6 — USIL05</li>
          <li>Region 10 — USIL04</li>
          <li>Region 12 — USIL02</li>
          <li>State Exposition — USIL50</li>
        </ul>
      </PageContent>
    </>
  );
}
