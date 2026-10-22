import type { Page } from "../types";
import { rubricCards } from "../shared/rubrics";

export const judges: Page = {
  slug: "judges",
  title: "Judges",
  description:
    "Volunteer as a judge at IJAS regional fairs and the State Exposition. How it works, qualifications, judging guidelines, and rubrics.",
  hero: { title: "Judges" },
  blocks: [
    {
      type: "anchorNav",
      links: [
        { label: "Judging Information", href: "#judging-information" },
        { label: "How to Judge", href: "#how-to-judge" },
        { label: "2027 State Judge Interest Form", href: "/judgesmailinglist" },
        { label: "Rubrics", href: "#rubrics" },
      ],
    },

    // ── Intro: video + pitch + CTA ───────────────────────────
    {
      type: "mediaText",
      id: "judging-information",
      // TODO: replace with the real video's embed URL (https://www.youtube.com/embed/VIDEO_ID)
      media: { kind: "embed", src: "https://www.youtube.com/embed/VIDEO_ID", title: "IJAS Judges Video 2026" },
      markdown: `## Volunteer as an IJAS Judge!

Every year, thousands of students across Illinois put their creativity, curiosity, and problem-solving skills to the test through local and regional science fairs. The very best of these projects advance to the IJAS State Exposition, a celebration of student-driven STEM innovation!

**This event wouldn't be possible without our judges.** Each project is thoughtfully reviewed through student-judge interviews and evaluation by judging teams, ensuring a fair and inspiring competition. Judges play a huge role, offering encouragement, asking thoughtful questions, and celebrating our students' work! By judging, you're inspiring the next generation of innovators and problem solvers. **Your time and experience make a real impact.** Join us in shaping the future of STEM!`,
      button: { label: "Subscribe to the Judges Mailing List", href: "/judgesmailinglist" },
    },

    // ── How it works ─────────────────────────────────────────
    { type: "sectionHeader", title: "How it Works" },
    {
      type: "steps",
      items: [
        {
          title: "Find your Fair",
          markdown: `In addition to our State Science Fair, you have regional fairs across the state to choose from! Explore the dates and locations ***[here](/regional-expositions)*** to find an event that fits your schedule. **The State Fair is April 30th – May 1st, 2027 in Peoria, IL (You can judge any session – very flexible!)**`,
        },
        {
          title: "Sign Up!",
          markdown: `Register to become a judge! All first time and returning judges must create a new account each year. For Regional Fairs, contact your regional chair to register! ***[Subscribe to the mailing list](/judgesmailinglist)*** *to get notified when judge registration opens!*`,
        },
        {
          title: "Spread the Word!",
          markdown: `Invite your STEM friends and co-workers to join you! Any science backgrounds are welcome! Showcase your commitment to STEM education and inspire others to do the same! [Facebook](https://www.facebook.com/IJASorg/), [Instagram](https://www.instagram.com/ijas_il/), [LinkedIn](https://www.linkedin.com/in/illinois-junior-academy-of-science-a02159365), [X](https://x.com/ijasorg)`,
        },
        {
          title: "Enjoy the Fair!",
          markdown: `Please arrive on time! More info about judging can be found in the "How to Judge" section and will be communicated via email. If you have any questions please email [info@ijas.org](mailto:info@ijas.org)! Thank you so much for your time!`,
        },
      ],
    },
    {
      type: "richText",
      boxed: true,
      centered: true,
      markdown: `**Schedule:**\\
To Be Announced`,
    },
    {
      type: "richText",
      centerHeadings: true,
      markdown: `### Qualifications:

- All Judge Volunteers for either session **must have at least completed high school**.
- High School students are **NOT** allowed to volunteer as Judges. Volunteers may be parents, adult family members, and other professionals.
- Questions may be directed to [info@ijas.org](mailto:info@ijas.org)

### What Happens on Fair Day:

- You'll work in one of the 22 categories (Here's the ***[Category Guide](/category-guide)***) or in evaluating projects for special awards provided by professional organizations, like the DOD, Accelsius, NOAA, etc. Be sure to indicate what you are interested in judging when you sign up.
- Orientation training will be provided before the fair describing the process in greater detail as well as on the morning of the fair!
- About a week before the fair, each judge will receive their category or special award assignment and the scoring rubric as well as a lot more information about the judging process.`,
    },
    {
      type: "richText",
      boxed: true,
      centerHeadings: true,
      markdown: `### Sponsor the Fair!

Do you work for an organization passionate about STEM education? By sponsoring the Fair your company will enjoy valuable visibility in front of our state's future problem-solvers while supporting valuable STEM programming for Illinois youth.

***[Learn More About Fair Sponsorship](/sponsorship)***`,
    },

    // ── How to judge ─────────────────────────────────────────
    { type: "sectionHeader", id: "how-to-judge", title: "How to Judge" },
    {
      type: "embed",
      // TODO: replace with the Google Slides embed URL (File → Share → Publish to web → Embed)
      src: "https://docs.google.com/presentation/d/SLIDES_ID/embed",
      title: "2025 Judge Training Slideshow",
      caption: "2025 Judge Training Slideshow – Day of the Fair",
    },
    {
      type: "richText",
      id: "rubrics",
      centered: true,
      markdown: `## Rubrics:

*Below are the updated rubrics for the 2025–2026 Competition Season. Please take a moment to familiarize yourself with the rubrics before you arrive for judging.*`,
    },
    {
      type: "cardGrid",
      // TODO: save the rubric thumbnails to public/images/rubrics/ and add e.g. image: "/images/rubrics/poster-design.png"
      cards: rubricCards,
    },

    // ── Guidelines ───────────────────────────────────────────
    // TODO: "Banterra Center" (last bullet) is the Carbondale venue — 2027 is in Peoria.
    {
      type: "richText",
      centerHeadings: true,
      markdown: `### Judge Guidelines:

**Regional Chair/Sponsor Information:**

- Remember to NOT contact anyone at the host colleges or schools at the regional level or the host university at the state level to recruit judges. Professors and other staff members have been recruited by the host, the regional chair, or IJAS already to judge.
- For 2027, one (1) judge is required for every two (2) papers submitted from the region/school advancing to the State Exposition. One (1) judge is required for every two (2) posters submitted from the region/school advancing to the State Exposition.

**Judging Overview:**

Judging is, without a doubt, one of the most important phases of any science exposition. Because of its extreme importance, all judges should carefully review the following:

- Expositions are not intended to be contests between students or schools. Each exhibitor is to be judged based on the rating criteria of the IJAS rubric or the given special award criteria/rubric.
- Even though many exhibits show a remarkable degree of scientific knowledge, judges are asked to remember that all of the exhibitors are junior or senior high school students, many of whom are experiencing their first taste of scientific evaluation by a distinguished critic.
- As a judge, use your own good judgement at all times. Be honest with yourself and the student. Remember that only a small percentage of the students will ever actually go into scientific research; however, many of them will have a great deal to say about the future of science. Certainly, a valuable experience with science at this level might potentially reap valuable rewards later.
- The opportunity to discuss their project with interested adults acting as judges is a high point for most students. Be aware that most students have spent many months preparing for a judging period, which normally lasts 15 minutes. Feel free to discuss any aspect of the student's work; they deeply appreciate all questions and comments.

**Judging Mechanics:**

- Be sure to report for final instructions promptly on the day of the Exposition. Allow yourself enough time to park your car, and to allow for traffic interference so that you will report on time. You will receive information in the week of the fair with where to meet as well as timing.
- At the judges meeting, you will be informed of any last minute changes and/or special instructions concerning judging assignments.
- Each judge is to be assigned five to six projects or papers to judge.
- The Regional and State Expositions are planned so that judge is allowed fifteen to thirty minutes for each project or paper.
- You may be asked to judge projects in both divisions: Junior (grades 7 and 8) and Senior (grades 9, 10, 11, and 12). Please keep the age of the exhibitor in mind.
- Each project judged must have a final score so that the certificate of award can be made. Be certain that you are using the correct rubric when scoring the project. Do not show or discuss students' scores with them. Information on specific guidelines and procedures concerning ratings will be supplied by and discussed with the judging chair.
- Be pleasant and interested. Do not use cell phones while judging.
- Please remember that you are working with tomorrow's scientists; their "decision for science" may rest on the impression you give them.
- Students must be with their project or at their assigned paper session room at the time of judging. If the student cannot be located within a reasonable amount of time, then the project or paper is considered a "No Show", and no rating is to be given.
- Many intangible factors are involved in judging. These can be evaluated only by talking with the student and cannot be estimated merely by looking at the physical aspects of the exhibit. Judges should keep in mind that a spectacular exhibit or one composed of costly equipment is not necessarily the best science project.
- Fill out the judges' comment sheet BUT DO NOT return it to the student. Please indicate comments that would help the student improve. Comments might be positive or constructive, but they should not be sarcastic. Please make sure that your comments are clear and to the point. Do not indicate the award on this sheet. Judges may give verbal feedback BUT not the score.
- It is imperative that each judge finishes their judging responsibilities in the allotted time, and have their judging results turned into a student runner or score table as they are completed. Enough time must be available to prepare the awards by the Awards Chair. Please allot your time accordingly so that results are turned in by the end of each session.
- Be sure every project for which you are responsible has been judged. Return the scoring rubric immediately following the judging of each project. Do not hold all scoring rubrics until you are finished judging all projects.
- Judges must return all materials/papers to the student. You may not keep any portion of the student's paper.
- Questions may be directed to the IJAS Staff in the judge meeting area in the Banterra Center.

**Although this might seem like a lot of information, all of this will be explained throughout the process and in orientation, do not feel like you have to remember all of this information. Thank you so much for supporting these young scientists!**`,
    },
  ],
};