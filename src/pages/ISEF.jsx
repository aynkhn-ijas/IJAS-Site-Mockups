import PageContent from "@/components/PageContent";
import PageHero from "@/components/PageHero";
import TextLink from "@/components/TextLink";
import usePageTitle from "@/hooks/usePageTitle";

export default function ISEF() {
  usePageTitle("IJAS ISEF Contest");

  return (
    <>
      <PageHero title="IJAS ISEF Contest" />
      <PageContent>
        <h2>Regeneron International Science and Engineering Fair</h2>
        <p>
          ISEF 2027 — Los Angeles, California. Each year, the Illinois Junior Academy of Science
          selects nine outstanding high school researchers to represent Illinois at Regeneron ISEF,
          the world&apos;s largest pre-college STEM competition. Finalists are chosen through a
          multi-round virtual selection process involving students from IJAS regional fairs across
          the state.
        </p>
        <h2>IJAS Affiliated Fair — USIL50</h2>
        <h3>IJAS Rules</h3>
        <ul>
          <li>
            Applicant must be enrolled in an Illinois school or Illinois-based program (such as
            IMSA-RISE or Illinois STEM Society) or be a homeschooled Illinois resident.
          </li>
          <li>Applicant must be an individual IJAS member or a student of an IJAS member school.</li>
          <li>Applicant must be a 9th–12th grade student.</li>
          <li>Applicant and project must follow all IJAS Policy &amp; Procedures and all ISEF rules.</li>
          <li>Applicant must compete in their IJAS Regional Poster Session.</li>
          <li>Submit a $20 entry fee to IJAS for the IJAS ISEF USIL50 virtual fair.</li>
        </ul>
        <h2>Schedule &amp; Deadlines</h2>
        <ul>
          <li>SRC Approval Questions &amp; Review of ISEF Safety Documents — TBA</li>
          <li>Round 1 Entry Deadline — TBA — Submit ISEF Abstract</li>
          <li>Round 2 SRC Final Approval — TBA — Submit ISEF Safety Documents</li>
          <li>Semi-finalists announced — TBA</li>
          <li>Round 3 Semi-finalist documents — TBA</li>
          <li>Round 4 Semi-finalist interviews — Zoom — TBA</li>
          <li>Up to the top 9 IJAS ISEF projects announced — TBA</li>
          <li>IJAS ISEF USIL50 Projects Showcase — April 30–May 1, 2026 — Bradley University</li>
        </ul>
        <h2>Resources</h2>
        <ul>
          <li>
            <TextLink href="https://www.societyforscience.org/isef/" external>
              ISEF Website
            </TextLink>
          </li>
          <li>
            <TextLink href="https://www.societyforscience.org/isef/international-rules/" external>
              ISEF Rules
            </TextLink>
          </li>
          <li>
            <TextLink href="https://www.societyforscience.org/isef/forms/" external>
              ISEF Documents / Forms
            </TextLink>
          </li>
        </ul>
        <p>
          Questions: <TextLink href="mailto:info@ijas.org">info@ijas.org</TextLink>
        </p>
      </PageContent>
    </>
  );
}
