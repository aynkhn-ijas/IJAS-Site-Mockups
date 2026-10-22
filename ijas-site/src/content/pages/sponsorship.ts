import type { Page } from "../types";

export const sponsorship: Page = {
  slug: "sponsorship",
  title: "Become a Sponsor",
  description:
    "Support the Illinois Junior Academy of Science. Download the sponsorship information packet to see sponsorship levels, recognition benefits, and impact.",
  hero: { title: "Become a Sponsor" },
  blocks: [
    {
      type: "richText",
      centered: true,
      markdown: `## [Download the 2025–2026 IJAS Sponsorship Information Packet](#)

### Thank you for your interest in sponsoring the Illinois Junior Academy of Science!

[Donate to IJAS](/donations)`,
    },
    {
      type: "mediaText",
      boxed: true,
      mediaSize: "small",
      // TODO: save the packet cover to public/images/ (screenshot the PDF's first page)
      media: { kind: "image", src: "/images/sponsorship-packet-cover.png", alt: "IJAS Partnership Prospectus cover" },
      markdown: `The IJAS Sponsorship Package provides a **complete overview** of how organizations and individuals can support the Illinois Junior Academy of Science. Inside, you'll find details about sponsorship levels, **recognition benefits**, along with visibility opportunities and the impact your support makes on student research and STEM education across Illinois. **If you want more information or have any questions, please reach out to us at [info@ijas.org](mailto:info@ijas.org) at any time!**`,
    },
  ],
};