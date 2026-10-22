import PageContent from "@/components/PageContent";
import PageHero from "@/components/PageHero";
import TextLink from "@/components/TextLink";
import usePageTitle from "@/hooks/usePageTitle";

export default function ISAS() {
  usePageTitle("IJAS ISAS Competition");

  return (
    <>
      <PageHero title="IJAS Section of ISAS" />
      <PageContent>
        <h2>Illinois State Academy of Science</h2>
        <p>
          ISAS Annual Meeting: April 10, 2027 — Illinois College, Jacksonville, IL. Students may
          apply under both opportunities but can compete in only one.
        </p>
        <h3>1. Apply directly to ISAS</h3>
        <p>
          Students/teams can apply directly to ISAS to compete within the given sections/categories
          against undergraduate posters in the same category. Abstract submissions made directly to
          ISAS are due February 1, 2027, 11:59 PM CST. Registration for the ISAS Annual Meeting is
          also required by March 15, 2027. More information:{" "}
          <TextLink href="https://myisas.org/" external>
            myisas.org
          </TextLink>
          .
        </p>
        <h3>2. Compete in the IJAS Section</h3>
        <p>
          Students/teams compete only against the top 25 projects in the IJAS Section. The IJAS
          Selection Committee selects the Top 25 projects, announced on Facebook/Instagram, the IJAS
          website, and email.
        </p>
        <h2>IJAS Section of ISAS — Rules</h2>
        <ul>
          <li>
            Applicant must be enrolled in an Illinois school or Illinois-based program (such as
            IMSA-RISE or Illinois STEM Society) or be an Illinois resident being homeschooled.
          </li>
          <li>Applicant must be an individual IJAS member or a student of an IJAS member school.</li>
        </ul>
        <p>
          Contact <TextLink href="mailto:ISAS@ijas.org">ISAS@ijas.org</TextLink> with questions.
        </p>
      </PageContent>
    </>
  );
}
