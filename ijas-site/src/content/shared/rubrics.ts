import type { Card } from "../types";

// Used on both the Judges and Rules & Forms pages — edit here once, both update.
// TODO: these PDFs are hosted on Wix and will break when Wix is shut off.
// Download them to public/docs/rubrics/ and swap in the local paths.
// TODO: live site links Paper Session Experimental to two different PDFs (22ee37… vs 47082a…) — confirm which is current.
export const rubricCards: Card[] = [
  {
    title: "Poster Session Design Rubric",
    href: "https://www.ijas.org/_files/ugd/497522_3cdc6a31f1d34c07b650e0ca2a1515c4.pdf",
    linkLabel: "Click to View Rubric",
  },
  {
    title: "Paper Session Design Rubric",
    href: "https://www.ijas.org/_files/ugd/497522_9828ee7e4ae44169b6a9a67a77a1f0ed.pdf",
    linkLabel: "Click to View Rubric",
  },
  {
    title: "Paper Session Experimental Rubric",
    href: "https://www.ijas.org/_files/ugd/497522_22ee37a02f5c4eaea8ecaaa03d05872b.pdf",
    linkLabel: "Click to View Rubric",
  },
  {
    title: "Poster Session Experimental Rubric",
    href: "https://www.ijas.org/_files/ugd/497522_2e9778590af64220b986d2f1586a5a15.pdf",
    linkLabel: "Click to View Rubric",
  },
];