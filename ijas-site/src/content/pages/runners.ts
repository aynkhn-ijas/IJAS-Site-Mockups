import type { Page } from "../types";

export const runners: Page = {
  slug: "runners",
  title: "Student Runners",
  description:
    "Volunteer as a student runner at the 2027 IJAS State Exposition. Dates, location, how to apply, and the runner training video.",
  hero: { title: "Become a Student Runner!" },
  blocks: [
    {
      type: "mediaText",
      // Save the flyer as public/images/runners-flyer.png
      media: { kind: "image", src: "/images/runners-flyer.png", alt: "IJAS Runner Volunteers flyer" },
      markdown: `## Student Runner Information

### WE NEED YOU!

**Student Volunteer Runners:**\\
April 30, 2027 – May 1, 2027

**Renaissance Center:**\\
*To Be Announced*`,
    },
    // TODO: add the application form link when it opens (and drop "Coming Soon")
    { type: "button", label: "2027 IJAS Runners Application Form (Coming Soon)", href: "#" },
    {
      type: "richText",
      centered: true,
      markdown: `*We will accept applications from responsible students (ages 11 and up) interested in helping the 2027 IJAS State Exposition at Bradley University run smoothly.*`,
    },

    { type: "sectionHeader", title: "Student Runner Training Video" },
    {
      type: "embed",
      src: "https://www.youtube.com/embed/i_GQguvgHz0",
      title: "IJAS Student Runner Training Video",
    },
    {
      type: "richText",
      centered: true,
      markdown: `**Thank you so much for volunteering! You help the IJAS Fair Run Smoothly!**`,
    },
  ],
};