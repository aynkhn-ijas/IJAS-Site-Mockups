import type { Block, Page } from "../types";
import { rubricCards } from "../shared/rubrics";

import { PNP_MANUAL } from "../shared/links";

// Appears twice on the page, so it's defined once here.
// TODO: add the ISEF forms link
const isefFormsLink: Block = {
  type: "richText",
  centered: true,
  markdown: `## ***[High School Students: Click HERE to access the ISEF Forms](#)***`,
};

export const rules: Page = {
  slug: "rules",
  title: "Rules & Forms",
  description:
    "The IJAS Policy and Procedure Manual, judging rubrics, and middle school safety and endorsement forms. High school students use ISEF forms.",
  hero: { title: "Rules & Forms" },
  blocks: [
    {
      type: "richText",
      centered: true,
      markdown: `## [Download the 2026–2028 IJAS Policy and Procedure (P&P) Manual](${PNP_MANUAL})

### ALL Rules/Safety Instructions can be found in the Policy and Procedure Manual`,
    },
    {
      type: "richText",
      boxed: true,
      tone: "green",
      centered: true,
      // TODO: link the ISEF forms and the Updates Document
      markdown: `**NEW FOR THE 2026–2027 School Year: [ALL HIGH SCHOOL STUDENTS WILL NOW USE ISEF FORMS](#) and IJAS will adopt ISEF rules for the High School Division. The IJAS forms listed below are ONLY for middle school projects.** *There have also been several important rule and procedural changes for the 2026–2027 school year. We strongly encourage all students, sponsors, and regional coordinators to review the [Updates Document](#) and the revised [IJAS Policy and Procedure Manual](${PNP_MANUAL}) before beginning the competition process.*`,
    },
    {
      type: "richText",
      boxed: true,
      tone: "blue",
      centered: true,
      markdown: `The IJAS Policy and Procedure Manual has been updated and is valid through August 2028. If you are unsure about a safety issue, please contact your sponsor first. Sponsors may contact the Regional IJAS Chair if they have questions. Regional Chairs can address many safety issues and concerns. Regional Chairs may forward requests for exemptions and questions to the SRC (Scientific Review Committee) or the safety coordinator.`,
    },
    isefFormsLink,

    // ── Rubrics ──────────────────────────────────────────────
    {
      type: "richText",
      centered: true,
      markdown: `### Rubrics:

*These rubrics may be used by Member Schools, Individual Members, and IJAS Regional Fairs.*`,
    },
    { type: "cardGrid", cards: rubricCards },
    isefFormsLink,

    // ── Middle school forms ──────────────────────────────────
    {
      type: "richText",
      centered: true,
      markdown: `### Middle School Safety Forms:

*Required for **every** IJAS Project – Find more info about the forms applicable for your project in the Policy and Procedure Manual.*

\\*By clicking on these links, you will begin to download or make a copy of the 2026–2028 versions of the files. Check your downloads for the files.

Each download may take a minute, and you may need to allow pop-ups from this site.

***Reminder: These forms are only for middle school students***`,
    },
    // TODO: fill in every form link
    {
      type: "columns",
      columns: [
        `### Required Forms:

Abstract 2026–2028:\\
[Google Docs Link](#) | [Microsoft Word](#) | [PDF](#)

Safety Sheet 2026–2028:\\
[Google Docs Link](#) | [Microsoft Word](#) | [PDF](#)`,
        `### Endorsement Forms:

Humans as Test Subjects Endorsement 2026–2028:\\
[Google Docs Link](#) | [Microsoft Word](#) | [PDF](#)\\
*[Sample Human Consent Form (Docs)](#)*

Microorganism Endorsement 2026–2028:\\
[Google Docs Link](#) | [Microsoft Word](#) | [PDF](#)

Non-Human Vertebrate Endorsement 2026–2028:\\
[Google Docs Link](#) | [Microsoft Word](#) | [PDF](#)

Tissue Culture Endorsement 2026–2028:\\
[Google Docs Link](#) | [Microsoft Word](#) | [PDF](#)`,
      ],
    },

    // ── Safety regulations ───────────────────────────────────
    {
      type: "richText",
      centered: true,
      markdown: `### Commonly Overlooked Safety Regulations:`,
    },
    {
      type: "embed",
      aspect: "document",
      src: "https://docs.google.com/document/d/1HnNc7g6TMXKoEms3oQrx2_yLG6G4H6MuH24KMCvO84A/preview",
      title: "Commonly Overlooked Safety Regulations",
    },
  ],
};