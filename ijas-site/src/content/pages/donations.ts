import type { Page } from "../types";

export const donations: Page = {
  slug: "donations",
  title: "Donate to IJAS",
  description:
    "Support student researchers across Illinois. Donate to IJAS online through Zeffy or by check.",
  hero: { title: "Donate to IJAS" },
  blocks: [
    {
      type: "mediaText",
      // TODO: save the "Donate Now" graphic to public/images/
      media: { kind: "image", src: "/images/donate-now.png", alt: "Donate now — support student researchers across Illinois by becoming an IJAS donor" },
      markdown: `## Thank you for supporting the next generation of scientists!

**IJAS Online Donations now are through Zeffy!**

Click the link below to go to the Zeffy Platform. IJAS uses Zeffy to maximize your donation dollars. **To avoid additional charges, make sure to click custom in the "Zeffy Tip" section and enter $0.** Thank you again for donating to IJAS!

**We also welcome donations by check. Please mail checks to:**

Illinois Junior Academy of Science – 6310 N University St #9055, Peoria, IL 61612`,
      // TODO: add the Zeffy donation URL
      button: { label: "Donate to IJAS on Zeffy", href: "#" },
    },
  ],
};