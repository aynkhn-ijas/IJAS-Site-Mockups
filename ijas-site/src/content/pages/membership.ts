import type { Page } from "../types";

export const membership: Page = {
  slug: "membership",
  title: "Membership",
  description:
    "Join or renew IJAS membership for the 2026–2027 school year. School, club, and individual memberships, fees, late fees, and how to register.",
  hero: { title: "Membership" },
  blocks: [
    { type: "sectionHeader", title: "Membership" },
    {
      type: "richText",
      boxed: true,
      tone: "green",
      centered: true,
      markdown: `***Membership for the 2026–2027 school year is now open! Register for a new membership at the bottom of this page. Memberships (both school and individual) are $100.***`,
    },
    {
      type: "richText",
      centered: true,
      markdown: `Schools, Clubs, and/or Individuals must be members of the Illinois Junior Academy of Science, Inc. in order to compete in the state exposition series.

Join or renew memberships for IJAS at the *[bottom of this page](#register)* using the membership platform.

Please pay membership fees by December 31, 2026. Late fees will apply.\\
\\*Note – Regions may also have membership or registration fees.`,
    },
    // TODO: where does this go? (likely the members portal — confirm the URL)
    { type: "button", label: "Check My School's Membership Status", href: "#" },

    // ── Fees ─────────────────────────────────────────────────
    {
      type: "richText",
      centered: true,
      markdown: `---

### IJAS 2026–2027 Membership Information

**New School/Club/Individual: Registration is currently open!**\\
*Fill out the form below to register and pay for a new membership!*

*If you have any questions, please contact [info@ijas.org](mailto:info@ijas.org)!*

### 2026–2027 Membership Fees:

*School/Club (new/renewal): $100*\\
*Individual (school must **not** be IJAS member): $100*

*Must be paid online or postmarked by **December 31, 2026***

### 2026–2027 Late Fees:

**December 31, 2026 – January 31, 2027**\\
$150.00 per School/Club – $150 per Individual

**After February 15, 2027 – In order to participate in the REGIONAL FAIR**\\
$250 per School/Club – $250 per Individual

**After your Regional Fair – In order to participate in the STATE FAIR**\\
$500.00 per School/Club – $500 per Individual

*Fill out the form at the bottom of the page to register/pay for membership! If you have any questions, please contact [info@ijas.org](mailto:info@ijas.org)!*

---`,
    },
    {
      type: "richText",
      markdown: `**Additional Information:**\\
Payments and registration may be alternatively mailed to the IJAS mailing address. Purchase Orders are not accepted.\\
For new schools, please mail a filled out registration form along with your payment or check to the address below. Existing IJAS schools should include a copy of their renewal invoice (sent to the email on the school account) with payment.

Illinois Junior Academy of Science\\
6310 N. University St. #9055\\
Peoria, IL 61612`,
    },

    // ── Registration / payment ───────────────────────────────
    { type: "sectionHeader", id: "register", title: "Register for 2026–2027 IJAS Membership" },
    // TODO: replace with the payment embed once the platform is chosen
    { type: "placeholder", label: "Membership payment widget goes here (School/Club $100 · Individual $100 · Alumni $15 · Board $0)" },

    // ── Honorary ─────────────────────────────────────────────
    { type: "sectionHeader", tone: "green", title: "Honorary Lifetime Membership" },
    {
      type: "richText",
      centered: true,
      markdown: `Each year IJAS grants Honorary Lifetime Memberships to individuals who have made significant contributions to the objectives of the organization. Any member of the IJAS may make nominations. The nomination should be accompanied by a typed description of the nominee's service to IJAS and to the students of the State of Illinois. Please send the nomination and a brief summary of the candidate's performance to the president, Emily Dawson, by email to [emily.dawson@ijas.org](mailto:emily.dawson@ijas.org).`,
    },
  ],
};