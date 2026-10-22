import PageContent from "@/components/PageContent";
import PageHero from "@/components/PageHero";
import TextLink from "@/components/TextLink";
import usePageTitle from "@/hooks/usePageTitle";

export default function Rules() {
  usePageTitle("Rules & Forms");

  return (
    <>
      <PageHero title="Rules & Forms" />
      <PageContent>
        <h2>Policy and Procedure Manual</h2>
        <p>
          <TextLink
            href="https://www.ijas.org/_files/ugd/497522_932de54b80a7491b8177a41c4bb1b7f6.pdf"
            external
          >
            Download the 2026–2028 IJAS Policy and Procedure (P&amp;P) Manual
          </TextLink>
          . All rules and safety instructions are in the manual. The manual is valid through August
          2028.
        </p>
        <p>
          <strong>New for the 2026–2027 school year:</strong> All high school students will now use{" "}
          <TextLink href="https://www.societyforscience.org/isef/forms/" external>
            ISEF forms
          </TextLink>
          , and IJAS will adopt ISEF rules for the High School Division. The IJAS forms listed below
          are only for middle school projects.
        </p>
        <p>
          If you are unsure about a safety issue, contact your sponsor first. Sponsors may contact
          the Regional IJAS Chair. Regional Chairs may forward requests for exemptions to the SRC
          (Scientific Review Committee) or the safety coordinator.
        </p>
        <h2>Rubrics</h2>
        <ul>
          <li>
            <TextLink href="https://www.ijas.org/_files/ugd/497522_3cdc6a31f1d34c07b650e0ca2a1515c4.pdf" external>
              Poster Session Design Rubric
            </TextLink>
          </li>
          <li>
            <TextLink href="https://www.ijas.org/_files/ugd/497522_9828ee7e4ae44169b6a9a67a77a1f0ed.pdf" external>
              Paper Session Design Rubric
            </TextLink>
          </li>
          <li>
            <TextLink href="https://www.ijas.org/_files/ugd/497522_22ee37a02f5c4eaea8ecaaa03d05872b.pdf" external>
              Paper Session Experimental Rubric
            </TextLink>
          </li>
          <li>
            <TextLink href="https://www.ijas.org/_files/ugd/497522_2e9778590af64220b986d2f1586a5a15.pdf" external>
              Poster Session Experimental Rubric
            </TextLink>
          </li>
        </ul>
        <h2>Middle School Required Forms (2026–2028)</h2>
        <p>Abstract 2026–2028:</p>
        <ul>
          <li>
            <TextLink href="https://docs.google.com/document/d/1WskqVYH01BzKwMemWHHbMAzNVOD1PrKfm6oAyEw5kyM/copy" external>
              Google Docs
            </TextLink>{" "}
            ·{" "}
            <TextLink href="https://www.ijas.org/_files/ugd/497522_7581043593f64a859025c3b4acd060ba.pdf" external>
              PDF
            </TextLink>
          </li>
        </ul>
        <p>Safety Sheet 2026–2028:</p>
        <ul>
          <li>
            <TextLink href="https://docs.google.com/document/d/1_GI4EsNJAOTyNe5PkKcrdnvVNFMkkly28sG-R5UY9BQ/copy" external>
              Google Docs
            </TextLink>{" "}
            ·{" "}
            <TextLink href="https://www.ijas.org/_files/ugd/497522_6966429a1a9b424bba92cede8295bfc5.pdf" external>
              PDF
            </TextLink>
          </li>
        </ul>
        <h2>Endorsement Forms</h2>
        <ul>
          <li>Humans as Test Subjects Endorsement 2026–2028</li>
          <li>Microorganism Endorsement 2026–2028</li>
          <li>Non-Human Vertebrate Endorsement 2026–2028</li>
          <li>Tissue Culture Endorsement 2026–2028</li>
        </ul>
        <p>
          High school students:{" "}
          <TextLink href="https://www.societyforscience.org/isef/forms/" external>
            access ISEF forms
          </TextLink>
          .
        </p>
      </PageContent>
    </>
  );
}
