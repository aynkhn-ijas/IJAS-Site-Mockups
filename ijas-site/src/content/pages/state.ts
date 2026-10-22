import type { Page } from "../types";

export const state: Page = {
  slug: "state",
  title: "2027 State Exposition",
  description:
    "The 2027 IJAS State Science Exposition, April 30 – May 1, 2027 at the Renaissance Center, Bradley University, Peoria. Schedule, poster session details, and awards.",
  hero: {
    title: "2027 IJAS State Exposition Series",
    subtitle: "“Celebrating 100 Years of Student Research”",
  },
  blocks: [
    {
      type: "mediaText",
      mediaSize: "small",
      // Save the Bradley logo as public/images/bradley-logo.png
      media: { kind: "image", src: "/images/bradley-logo.png", alt: "Bradley University" },
      markdown: `## 2027 IJAS State Science Exposition Series

Friday, April 30, 2027 – Saturday, May 1, 2027\\
Renaissance Center\\
Bradley University – Peoria, Illinois`,
    },

    { type: "sectionHeader", title: "2027 IJAS State Exposition Information" },
    // TODO: add both links
    {
      type: "columns",
      columns: [`### [Bradley Info Site: Coming Soon](#)`, `### [IJAS Hotel Recommendations](#)`],
    },

    { type: "sectionHeader", title: "Poster Session Additional Details" },
    // TODO: "Banterra Center" in Parents & Sponsors is the Carbondale venue — 2027 is the Renaissance Center
    {
      type: "richText",
      centered: true,
      markdown: `**Student Participants:**\\
Students will present three times (once per session), and their scores will be averaged.\\
Students are required to present during ALL three sessions.\\
Poster boards MUST stay up from Session 1 through Session 3. They may be removed at 12:30 pm on Saturday.\\
Students must have three copies of their papers. If the Regional Chair did not provide an accessible, shareable link to the entire paper document (Abstract, Safety Sheet, Endorsements, and full Paper) during registration, Mrs. Dawson or her designee will collect one copy of the paper for the plagiarism check during the exposition. This copy will NOT be returned.

Students will NOT wait for feedback forms this year. All score sheets and feedback forms will be handed back in an envelope to the sponsors after the awards ceremony.\\
Safety Check/Safety Judging will be done the two weeks before the fair and during Session 1.\\
Students may be visited by a Safety Judge during Session 1 for additional information or to view signatures.\\
A visit from a Safety Judge does NOT count as being judged for a score.\\
Students must stay at their boards during all three sessions.\\
SPECIAL AWARD JUDGING WILL BE ALL THREE SESSIONS THIS YEAR.\\
Schools will be charged a $50 no-show fee for each project not present for the poster or the paper session.

**Parents & Sponsors**\\
Only credentialed volunteers, judges, and registered participants will be allowed through security at the Banterra Center for each session.\\
Sponsors must volunteer and work the event to be credentialed to enter.\\
The Renaissance Center is OPEN to the Public during the Open House on Friday, April 30, 2027.`,
    },

    // ── Special awards / ceremony ────────────────────────────
    {
      type: "columns",
      columns: [
        `## Special Award Judging

Saturday, May 1\\
Renaissance Center

Poster Session 3\\
TBD

---

Saturday, May 1\\
Student Center

Paper Session\\
TBD`,
        // Save the photo as public/images/awards-trophies.jpg
        `![Award trophies on a table](/images/awards-trophies.jpg)`,
        `## Awards Ceremony

Renaissance Center\\
TBD

**Open to the Public.**`,
      ],
    },
  ],
};