import PageContent from "@/components/PageContent";
import PageHero from "@/components/PageHero";
import TextLink from "@/components/TextLink";
import { studentSubnav } from "@/data/nav";
import usePageTitle from "@/hooks/usePageTitle";

const quickLinks = [
  {
    label: "Policy and Procedure Manual",
    href: "https://www.ijas.org/_files/ugd/497522_932de54b80a7491b8177a41c4bb1b7f6.pdf",
  },
  { label: "Judging & Rubrics", to: "/volunteer/judges" },
  { label: "Abstract & Safety Forms", to: "/resources/rules" },
  { label: "IJAS Categories", to: "/resources/category-guide" },
  { label: "Regional Fair Info/Dates", to: "/competition/regionals" },
  { label: "Find My School Number", to: "/resources/find-school-number" },
  { label: "IJAS ISEF Contest", to: "/competition/isef" },
  { label: "IJAS Thermo Fisher JIC", to: "/thermo-fisher" },
  { label: "Office Hours/How-To-Videos", to: "/resources/office-hours" },
];

export default function Students() {
  usePageTitle("Students");

  return (
    <>
      <PageHero title="Students" image={import.meta.env.BASE_URL + "ijas-assets/student-hero.png"} />
      <PageContent subnav={studentSubnav}>
        <p className="callout">
          Are you new to IJAS? Check our guide for new students on{" "}
          <TextLink to="/students/starting-a-project">Starting a Project</TextLink>.
        </p>
        <div className="callout">
          <h2>IJAS Individual and School Memberships are Now Open!</h2>
          <p>
            More info at <TextLink to="/membership">Memberships</TextLink>. Payment is due by
            December 31st at 11:59 PM CT.
          </p>
        </div>
        <p>
          <strong>General Reminder:</strong> If your school is not affiliated with the IJAS State or
          region, you may join an affiliated group or individually to enter your project at the
          regional exposition to qualify for the state exposition.
        </p>
        <h2>Important Dates</h2>
        <ul>
          <li>February 15th: Student registration due to State</li>
          <li>February–March: Regional fairs across Illinois</li>
          <li>April 30th–May 1st: State Fair at Bradley University in Peoria</li>
        </ul>
        <p>
          <TextLink to="/competition/additional-contests">
            Additional IJAS Contests (Essay, Design, Decal, Scholarships, President&apos;s Grant)
          </TextLink>
        </p>
        <h2>Quick Links</h2>
        <ul>
          {quickLinks.map((link) => (
            <li key={link.label}>
              {link.to ? (
                <TextLink to={link.to}>{link.label}</TextLink>
              ) : (
                <TextLink href={link.href} external={link.href.startsWith("http")}>
                  {link.label}
                </TextLink>
              )}
            </li>
          ))}
        </ul>
        <h2>Poster vs. Paper Session</h2>
        <p>
          IJAS gives students the opportunity to compete in two different sessions—the paper and
          poster sessions. Students may compete in one of the sessions at State. Additional details
          for the sessions can be found in the{" "}
          <TextLink
            href="https://www.ijas.org/_files/ugd/497522_932de54b80a7491b8177a41c4bb1b7f6.pdf"
            external
          >
            Policy and Procedure Manual
          </TextLink>
          .
        </p>
        <p>
          Students who choose to present their project in the Paper Session will develop their own
          slide presentation (PowerPoint, Google Slides, Prezi, etc.) in addition to having a written
          report and oral presentation.
        </p>
        <p>
          Students who choose to present their project in the Poster Session will create a backboard
          with all of the parts mentioned above. The backboard is to be used to augment the
          student&apos;s written report and oral presentation.
        </p>
        <p>
          <strong>NOTE:</strong> Students may not participate in both paper and poster session at the
          State Fair. It is allowed at regional fairs; however, if they qualify for the state
          exposition in both events, they must choose one. Students may use a previous year&apos;s
          poster session project for paper session.
        </p>
      </PageContent>
    </>
  );
}
