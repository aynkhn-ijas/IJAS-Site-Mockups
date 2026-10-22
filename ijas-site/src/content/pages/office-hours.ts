import type { Page } from "../types";
import { PNP_MANUAL } from "../shared/links";

const ZOOM_LINK = "https://us02web.zoom.us/j/89773120675?pwd=w6tCz9sFulkJMAhvb50nwopK4uFrY8.1";

export const officeHours: Page = {
  slug: "office-hours",
  title: "Office Hours & How-To Videos",
  description:
    "IJAS office hours dates for the 2026–2027 season and short how-to videos on experimental and design projects, research, statistics, and posters.",
  hero: { title: "Office Hours/How-To Videos" },
  blocks: [
    // ── Office hours ─────────────────────────────────────────
    {
      type: "richText",
      centered: true,
      markdown: `## Office Hours Dates for 2026–2027 Season`,
    },
    {
      type: "mediaText",
      mediaSize: "small",
      textCentered: false,
      // Save the logo as public/images/office-hours.png
      media: { kind: "image", src: "/images/office-hours.png", alt: "IJAS Office Hours" },
      markdown: `- September 20, 2026 at 6:00 PM
- October 18, 2026 at 6:00 PM
- November 15, 2026 at 6:00 PM
- December 13, 2026 at 6:00 PM
- January 17, 2027 at 6:00 PM
- February 21, 2027 at 6:00 PM
- March 21, 2027 at 6:00 PM
- April 18, 2027 at 6:00 PM`,
    },
    {
      type: "richText",
      centered: true,
      markdown: `**[Zoom link for ALL Office Hour Sessions](${ZOOM_LINK})**`,
    },

    // ── How-to videos ────────────────────────────────────────
    { type: "sectionHeader", tone: "navy", title: "How-To Videos" },
    {
      type: "richText",
      centerHeadings: true,
      // TODO: fill in every video link
      markdown: `## General

How-To Videos in this category describe aspects of the project that apply to both experimental and design projects, as well as other aspects of the IJAS expositions, like being a runner, judging, and special awards.

For information and guidance, we recommend watching the short How-To videos below!

- [Comparison of Design and Experimental](#)
- [Background Research and Citations](#)
- [Choosing a Topic](#)
- [Statistics](#)
- [Safety and Endorsements](#)
- [Excel and Google Sheets](#)
- [Comparison of Paper Session and Poster Session](#)
- [Creating a Poster](#)
- Judging: Coming soon
- Paper Session: Coming soon
- Special Awards: Coming soon
- APA Video: Coming soon

---

## Experimental Projects

A complete, written explanation of experimental projects can also be found on pages 10–14 of the [Policy and Procedure Manual](${PNP_MANUAL}). Page 25 includes details regarding the physical arrangement of the paper for an experimental project. It is important to note that each project must also include an Abstract, Safety Sheet, and any other documents deemed necessary. These documents can be found under the "[Rules and Forms](/rules)" tab of the IJAS website.

For information and guidance, we recommend watching the short How-To videos below!

- [Purpose](#)
- [Hypothesis](#)
- [Materials and Procedure](#)
- [Conclusion (Experimental)](#)
- [Constructing the Report (Experimental)](#)

---

## Design Projects

A complete written guide on design projects can be found on pages 10–15 of the [Policy and Procedure Manual](${PNP_MANUAL}). Page 26 includes details regarding the physical arrangement of the paper for a design project. It is important to note that each project must also include an Abstract, Safety Sheet, and any other documents deemed necessary. These documents can be found under the "[Rules and Forms](/rules)" tab of the IJAS website.

For information on developing a design project, watch the How-To videos below!

- [Prototype Redesign](#)
- [Conclusion (Design)](#)
- [Constructing the Report (Design)](#)`,
    },
  ],
};