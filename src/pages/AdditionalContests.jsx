import PageContent from "@/components/PageContent";
import PageHero from "@/components/PageHero";
import TextLink from "@/components/TextLink";
import { studentSubnav } from "@/data/nav";
import usePageTitle from "@/hooks/usePageTitle";

export default function AdditionalContests() {
  usePageTitle("Additional Contests");

  return (
    <>
      <PageHero title="Additional Contests / Competitions" />
      <PageContent subnav={studentSubnav}>
        <p>
          Jump to: Essay Contest · Artistic Design Contest · IJAS Scholarships · President&apos;s
          Grant · <TextLink to="/competition/isef">IJAS ISEF</TextLink> · <TextLink to="/isas">IJAS ISAS</TextLink>{" "}
          · <TextLink to="/thermo-fisher">Thermo Fisher JIC</TextLink>
        </p>
        <h2>President&apos;s Research Grant</h2>
        <p>
          Many scientifically adventurous students can be hindered by limited financial resources. The
          Board of Directors of the IJAS and their generous donors support students&apos; efforts by
          providing grants of up to $250 per year per project.
        </p>
        <p>
          This grant is open to all students of IJAS member schools or individual members who intend
          to participate in the IJAS State Exposition in Illinois. The primary focus is supplies
          required to conduct the experiment. Consideration is given more heavily to projects with
          reusable equipment, which becomes the school&apos;s property.
        </p>
        <p>Application deadline: To Be Announced. Questions: info@ijas.org.</p>
        <h2>Artistic Design Contests</h2>
        <p>
          All 7th–12th grade students who are individual members or attend a current IJAS member
          school are eligible. Students do not need to compete in a science fair to enter.
        </p>
        <h3>T-Shirt / Program Design Contest</h3>
        <p>Theme: “Driven by Discovery: Research is Key”. Prize: $100 / $50. Deadline: TBA.</p>
        <ul>
          <li>Line art must be dark enough to copy. Hand-drawn work should use black ink (no pencil).</li>
          <li>You may use IJAS brand colors #0E3B7B, #631D33, #72A9F1, #427C54, and #75A8ED.</li>
          <li>The design should not exceed 8.5&quot;×11&quot;.</li>
          <li>Original work only. No AI-created work.</li>
          <li>Include “2026–2027” and the IJAS logo or a spot for the logo.</li>
          <li>The designer&apos;s name should not appear on the artwork.</li>
        </ul>
        <h3>Decal Design Contest</h3>
        <p>
          2024–2025 theme: “Impossible to I&apos;m Possible: Progress Bit by Bit”. Entry deadline
          March 1, 2025 (now closed).
        </p>
        <h2>Essay Contest</h2>
        <p>
          Theme: “Driven by Discovery: Research is Key”. Prizes: $100 / $50. Deadline: TBA.
        </p>
        <p>
          <strong>Middle School (Grades 7–8):</strong> Investigate a university scientist or research
          team whose curiosity reshaped their field. How did their questions redefine what was
          possible?
        </p>
        <p>
          <strong>High School (Grades 9–12):</strong> Build a case using real-world examples of how
          university research has benefitted society. How does cross-field collaboration accelerate
          progress?
        </p>
        <h2>IJAS Scholarships</h2>
        <p>
          Applicants must be high school seniors who attend an IJAS member school or are individual
          IJAS members. Students may apply for more than one scholarship but will be granted only
          one. Amounts are determined by the Board of Directors and/or the selection committee.
        </p>
        <h2>Past Essay &amp; Design Contest Winners</h2>
        <ul>
          <li>2026 Sr. Essay: Shaurya Sharma · Jr. Essay: Sakshi Mathur · Decal: Ahana Chatterjee · T-Shirt: Seraphine Zun</li>
          <li>2025 Sr. Essay: Indigo Wall</li>
          <li>2024 Sr. Essay: Paulina Briones · Jr. Essay: Platon Belesiotis · Decal: Amrutha Dara and Claire Susanto · T-Shirt: Zoey Magsino</li>
        </ul>
        <h2>Past State Exposition Themes</h2>
        <ul>
          <li>2026 — Driven by Discovery: Research is Key</li>
          <li>2025 — Impossible to I&apos;m Possible: Progress Bit By Bit</li>
          <li>2024 — Innovate and Aggregate</li>
          <li>2023 — It&apos;s Our Turn to Lead</li>
          <li>2022 — Houston, We Have a Problem</li>
          <li>2021 — From Fundamental to Futuristic</li>
          <li>2020 — Revolutionizing Science</li>
        </ul>
      </PageContent>
    </>
  );
}
