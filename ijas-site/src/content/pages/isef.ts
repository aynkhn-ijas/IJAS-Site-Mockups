import type { Page } from "../types";

export const isef: Page = {
  slug: "isef",
  title: "ISEF",
  description:
    "How Illinois students qualify for the Regeneron International Science and Engineering Fair through the IJAS ISEF USIL50 affiliated fair.",
  hero: { title: "IJAS ISEF Contest" },
  blocks: [
    // ── Intro: logo + overview ───────────────────────────────
    { type: "sectionHeader", title: "Regeneron International Science and Engineering Fair" },
    {
      type: "mediaText",
      media: { kind: "image", src: "/images/isef-logo.png", alt: "Regeneron ISEF logo" },
      markdown: `## ISEF 2027 – Los Angeles, California

Each year, the Illinois Junior Academy of Science selects nine outstanding high school researchers to represent the State of Illinois at the Regeneron International Science and Engineering Fair (ISEF), the world's largest pre-college STEM competition. These finalists are chosen through a multi-round virtual selection process involving students from IJAS regional fairs across the state.

**Initial ISEF SRC Deadline:** To Be Announced`,
    },

    // ── Eligibility rules ────────────────────────────────────
    { type: "sectionHeader", title: "IJAS Affiliated Fair – USIL50" },
    {
      type: "richText",
      centerHeadings: true,
      markdown: `### IJAS Rules:

- Applicant must be enrolled in an Illinois school or Illinois based program (such as IMSA-RISE or Illinois STEM Society) or be a homeschooled Illinois resident.
- **Applicant must be an individual IJAS member or a student of an IJAS member school.**
- **Applicant must be a 9th-12th grade student.**
- Applicant & Project must follow ALL IJAS Policy & Procedures and ALL ISEF Rules & Regulations.
- **Applicant MUST compete in their IJAS Regional Poster Session.**
- **Submit $20 entry fee** to IJAS for the IJAS ISEF USIL50 virtual fair.

Questions may be directed to [info@ijas.org](mailto:info@ijas.org)`,
    },

    // ── Schedule (\\ = line break inside one item, blank line = gap between items) ──
    { type: "sectionHeader", title: "IJAS ISEF – Schedule & Deadlines" },
    {
      type: "richText",
      centered: true,
      spacing: "loose",
      markdown: `**SRC Approval Questions & Review of ISEF Safety Documents**\\
To Be Announced\\
Submit ISEF USIL50 questions via email

**Round 1 – Entry Deadline**\\
To Be Announced\\
Submit ISEF Abstract\\
[ISEF Abstract Form 22](#)

**Round 2 – SRC Final Approval – Safety Documents Deadline**\\
To Be Announced\\
Submit ISEF Safety Documents\\
[ISEF Forms](#)

**Semi-finalists Announced**\\
To Be Announced\\
Facebook/Instagram – IJAS Website – Email

**Round 3 – Semi-finalists All Document Deadline**\\
To Be Announced\\
Submit the Final IJAS Competition Paper, Project Display – Poster, Quad Chart, and 2-Minute Project Video\\
[Project-Material-Guidelines.pdf](#)

**Round 4 – Semi-Finalist Interviews & Presentations**\\
Zoom\\
To Be Announced

**IJAS ISEF Projects Announced**\\
Up to the Top 9 projects\\
To Be Announced\\
Facebook/Instagram – IJAS Website – Email

**IJAS ISEF USIL50 Projects Showcase**\\
All Selected Finalists\\
April 30 – May 1, 2026 — Bradley University`,
    },

    // ── Resources ────────────────────────────────────────────
    { type: "sectionHeader", title: "ISEF Resources & Documents" },
    {
      type: "richText",
      centered: true,
      spacing: "loose",
      markdown: `[ISEF Website](https://www.societyforscience.org/isef/)

[ISEF Rules](https://www.societyforscience.org/isef/international-rules/)

[ISEF 2026 Documents/Forms](#)`,
    },
  ],
};