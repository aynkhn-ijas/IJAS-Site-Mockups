import type { Page } from "../types";

export const newsletter: Page = {
  slug: "newsletter",
  title: "Newsletter",
  description:
    "The monthly IJAS Newsletter: upcoming events, student highlights, and stories from Illinois' science and research community. Read every past issue.",
  hero: { title: "IJAS Newsletter" },
  blocks: [
    {
      type: "richText",
      centered: true,
      markdown: `Each month, the Illinois Junior Academy of Science (IJAS) releases a newsletter featuring updates, upcoming events, student highlights, and stories from across Illinois' science and research community. Our goal is to keep students, educators, and supporters connected and inspired through news, opportunities, and resources that celebrate scientific discovery. **You can fill out the form below to receive our newsletters directly in your email inbox every month. All newsletter editions are also posted below for your viewing.**`,
    },
    {
      type: "issueList",
      issues: [
        // Demo: these two point at files you still need to add
        { title: "March 2026", pdf: "/newsletters/2026-03.pdf", cover: "/newsletters/2026-03-cover.jpg" },
        { title: "January 2026 (Vol. 2)", pdf: "/newsletters/2026-01-vol2.pdf", cover: "/newsletters/2026-01-vol2-cover.jpg" },
        { title: "January 2026" },
        { title: "October 2025" },
        { title: "September 2025" },
        { title: "February 2025" },
        { title: "January 2025" },
      ],
    },
  ],
};