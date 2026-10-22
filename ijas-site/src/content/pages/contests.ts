import type { Page } from "../types";

// TODO: every "Coming Soon" button and the ISAS / Thermo Fisher links are placeholders.
// TODO: the theme "Driven by Discovery: Research is Key" is the 2026 theme (see Past Themes) —
// confirm the 2027 theme ("Celebrating 100 Years of Student Research"?) before these go live.

const designRules = (maxSize: string) => `1. Line art must be dark enough to copy or reproduce. If hand-drawn, please use **black ink** (no pencil).\\
   You may use IJAS brand colors #0E3B7B, #631D33, #72A9F1, #427C54, and #75A8ED.
2. The design should not exceed ${maxSize}.
3. The design must be original work. It may be hand-drawn or computerized. No AI-created work.
4. The design must include "2026–2027" and the IJAS Logo, or a spot for the logo, as well as the year "2026–2027".\\
   The design may include the words in the theme title, but it is not required.
5. The designer's name should NOT appear. Submit the designer's name on the entry form and the file name.

Questions may be directed to [info@ijas.org](mailto:info@ijas.org)`;

export const contests: Page = {
  slug: "contests",
  title: "Additional Contests & Competitions",
  description:
    "IJAS contests beyond the science fair: T-shirt and decal design, essay contest, scholarships, the President's Research Grant, and past winners.",
  hero: { title: "Additional Contests/Competitions" },
  blocks: [
    { type: "richText", centered: true, markdown: `### Jump To:` },
    {
      type: "anchorNav",
      links: [
        { label: "Decal Contest", href: "#decal" },
        { label: "Essay Contest", href: "#essay" },
        { label: "Program Design", href: "#tshirt" },
        { label: "IJAS Scholarships", href: "#scholarships" },
        { label: "President's Grant", href: "#presidents-grant" },
        { label: "IJAS ISEF Contest", href: "/isef" },
        { label: "IJAS ISAS Contest", href: "#isas" },
        { label: "Thermo Fisher JIC", href: "#thermo-fisher" },
        { label: "Past Results", href: "#past-winners" },
      ],
    },

    // ── President's Grant ────────────────────────────────────
    { type: "sectionHeader", id: "presidents-grant", title: "President's Grant" },
    {
      type: "mediaText",
      mediaSize: "small",
      // Save the logo as public/images/presidents-grant.png
      media: { kind: "image", src: "/images/presidents-grant.png", alt: "President's Grant — Illinois Junior Academy of Science" },
      markdown: `### President's Research Grant

Many scientifically adventurous students can be hindered or restricted in pursuing research or design due to limited financial resources. The Board of Directors of the IJAS and their generous donors **support students' efforts by providing grants of up to $250 per year per project.**

This grant is open to **all students of IJAS member schools or individuals members** who intend to participate in the IJAS State Exposition in Illinois. Any student with sponsor support can apply for **reimbursement for purchased materials.**

The primary focus of this award is to increase the opportunity to buy the supplies required to conduct their experiment. Consideration is given more heavily to projects with reusable equipment. All reusable equipment purchased and submitted under this grant will **become the school's and the school sponsor's property.**

**APPLICATION DEADLINE: To Be Announced**`,
      button: { label: "Coming Soon", href: "#" },
    },

    // ── Artistic design contests ─────────────────────────────
    { type: "sectionHeader", title: "Artistic Design Contests" },
    {
      type: "richText",
      centered: true,
      markdown: `Do you have an eye for design? Do you have a way with words? IJAS offers something for every student!

*All 7th–12th grade students who are individual members or attend a current IJAS member school are eligible to participate in the contests below, in addition to the traditional poster and paper sessions.* ***Students DO NOT need to compete in any local, regional, or state science fair to be eligible.***

---`,
    },
    {
      type: "richText",
      id: "tshirt",
      centered: true,
      markdown: `**T-Shirt/Program Design Contest**

**"Driven by Discovery: Research is Key"**\\
**Entry Deadline:** To Be Announced\\
**Prize:** $100 / $50`,
    },
    { type: "richText", markdown: designRules('8.5" x 11"') },
    { type: "button", label: "Coming Soon", href: "#" },

    {
      type: "richText",
      id: "decal",
      centered: true,
      markdown: `---

**Decal Design Contest**

**"Driven by Discovery: Research is Key"**\\
**Entry Deadline:** To Be Announced\\
**Prize:** $100 / $50`,
    },
    { type: "richText", markdown: designRules('5" x 5"') },
    { type: "button", label: "Coming Soon", href: "#" },

    // ── Essay contest ────────────────────────────────────────
    { type: "sectionHeader", id: "essay", title: "Essay Contest" },
    {
      type: "richText",
      centered: true,
      markdown: `The IJAS Essay Contest allows students to explore a chosen topic in an essay related to the exposition theme. The contest is terrific for students who prefer to show their creativity through writing.

**"Driven by Discovery: Research is Key"**\\
**Entry Deadline:** To Be Announced\\
**Prizes:** $100 / $50 – $100 / $50

**Middle School Prompts (Grades 7 and 8):**

**Investigate a university scientist or research team whose curiosity reshaped their field.**\\
**How did their questions redefine what was possible?**

**High School Prompts (Grades 9–12):**

**Build a case using real-world examples of how university research has benefited society.**\\
**How does cross-field collaboration and research within universities accelerate progress?**

Questions may be directed to [info@ijas.org](mailto:info@ijas.org)`,
    },
    { type: "button", label: "Coming Soon", href: "#" },

    // ── Scholarships ─────────────────────────────────────────
    { type: "sectionHeader", id: "scholarships", title: "IJAS Scholarships" },
    {
      type: "richText",
      centered: true,
      markdown: `**Applications:**\\
Students may apply for more than one scholarship for which they are eligible. However, selected students will only be granted one scholarship.

**Eligibility:**\\
Applicants must be high school seniors who attend an IJAS member school, or are individual IJAS members.

**Funding:**\\
Annual budget and special grants or donations

**Amount:**\\
To be determined by the Board of Directors and/or the selection committee

**Selection Committee:**\\
President, President-Elect, and Past President of the Illinois Junior Academy of Science\\
Most Senior Board Member-at-Large of the Illinois Junior Academy of Science\\
Student Advisor of the Illinois Junior Academy of Science

---`,
    },
    {
      type: "richText",
      markdown: `***Scholarship Requirements:***

**The IJAS Scholarships for 2027 will be announced soon.**`,
    },
    { type: "richText", centered: true, markdown: `**Entry Deadline:** To Be Announced` },
    { type: "button", label: "Coming Soon", href: "#" },

    // ── Past winners ─────────────────────────────────────────
    { type: "sectionHeader", id: "past-winners", title: "Past Essay & Design Contest Winners" },
    {
      type: "richText",
      // TODO: the 2025 Jr. Essay, Decal, and T-Shirt winners are blank on the live site
      markdown: `- **2026 Sr. Essay Contest Winner:** Shaurya Sharma
- **2026 Jr. Essay Contest Winner:** Sakshi Mathur
- **2026 Decal Design Contest Winner:** Ahana Chatterjee
- **2026 T-Shirt Design Contest Winner:** Seraphine Zun

- **2025 Sr. Essay Contest Winner:** Indigo Wall
- **2025 Jr. Essay Contest Winner:**
- **2025 Decal Design Contest Winners:**
- **2025 T-Shirt Design Contest Winner:**

- **2024 Sr. Essay Contest Winner:** Paulina Briones
- **2024 Jr. Essay Contest Winner:** Platon Belesiotis
- **2024 Decal Design Contest Winners:** Amrrutha Dara and Claire Susanto
- **2024 T-Shirt Design Contest Winner:** Zoey Magsino`,
    },
    { type: "richText", centered: true, markdown: `**Past State Exposition Themes**` },
    {
      type: "columns",
      centered: false,
      columns: [
        `- 2026 – Driven by Discovery: Research is Key
- 2025 – Impossible to I'm Possible: Progress Bit By Bit
- 2024 – Innovate and Aggregate
- 2023 – It's Our Turn to Lead
- 2022 – Houston, We Have a Problem
- 2021 – From Fundamental to Futuristic
- 2020 – Revolutionizing Science
- 2019 – Under the Sea
- 2018 – Science is Universal`,
        `- 2017 – Engaged Learning
- 2016 – A Perfect Swarm
- 2015 – It's an Ice Day for Science
- 2014 – I've Caught the Science Bug
- 2013 – The World Around Us: Under the Science!
- 2012 – The Sound of Music!`,
      ],
    },
    {
      type: "richText",
      id: "thermo-fisher",
      boxed: true,
      centered: true,
      // TODO: link "here" to the competition page
      markdown: `*Are you looking for IJAS ISEF or Thermo Fisher Information? Find it [here](#) on our competition page!*`,
    },
  ],
};