import PageContent from "@/components/PageContent";
import PageHero from "@/components/PageHero";
import TextLink from "@/components/TextLink";
import usePageTitle from "@/hooks/usePageTitle";

const teacherLinks = [
  {
    label: "Policy and Procedure Manual",
    href: "https://www.ijas.org/_files/ugd/497522_932de54b80a7491b8177a41c4bb1b7f6.pdf",
  },
  { label: "Judging Information & Rubrics", to: "/volunteer/judges" },
  { label: "Abstract & Safety Forms", to: "/resources/rules" },
  { label: "Membership", to: "/membership" },
  { label: "Teacher Resources / Office Hours", to: "/resources/office-hours" },
  { label: "Regional Fair Info/Dates", to: "/competition/regionals" },
  { label: "IJAS Membership Directory", href: "http://members.ijas.org" },
  { label: "Additional Contests for Students", to: "/competition/additional-contests" },
  { label: "State Fair Information", to: "/competition/state-exposition" },
];

export default function Teachers() {
  usePageTitle("Teachers");

  return (
    <>
      <PageHero title="Teachers" />
      <PageContent>
        <p className="callout">
          Are you new to IJAS? Review the Policy and Procedure Manual and join the monthly teacher
          webinar.
        </p>
        <div className="callout">
          <h2>IJAS Individual and School Memberships are Now Open!</h2>
          <p>
            More info at <TextLink to="/membership">Memberships</TextLink>. Payment is due on
            December 31st at 11:59 PM CT.
          </p>
        </div>
        <p>
          <strong>General Reminder:</strong> Sponsors are responsible for registering their school
          with the IJAS regional and state exposition, as well as attending meetings. Individual
          schools pay an IJAS State registration fee and submit a registration form or renewal to the
          state.
        </p>
        <ul>
          <li>Do not hesitate to reach out to your region&apos;s chair with additional questions.</li>
          <li>Membership registration for 2026–2027 opened September 1st.</li>
        </ul>
        <p>
          Sponsors are also responsible for reading the important documents, aiding their students in
          preparation for the exposition, and keeping track of deadlines. Be sure to read the Policy
          and Procedure Manual thoroughly. Encourage students to enter contests, scholarships, and
          student board applications.
        </p>
        <h2>Important Dates</h2>
        <ul>
          <li>January 15th: Initial membership deadline for schools (late fees apply)</li>
          <li>February 15th: Student registration due to State via zFairs</li>
          <li>February–March: Regional fairs across the state</li>
          <li>April 30th–May 1st: State Fair — Bradley University in Peoria</li>
        </ul>
        <h2>Quick Links</h2>
        <ul>
          {teacherLinks.map((link) => (
            <li key={link.label}>
              {link.to ? (
                <TextLink to={link.to}>{link.label}</TextLink>
              ) : (
                <TextLink href={link.href} external>
                  {link.label}
                </TextLink>
              )}
            </li>
          ))}
        </ul>
        <h2>Monthly Info / Questions Webinar</h2>
        <p>
          Next webinar: TBD on{" "}
          <TextLink href="https://us02web.zoom.us/j/84077035460?pwd=R8yVL1lutEpY8tebebejaBaXezNTK4.1" external>
            Zoom
          </TextLink>
          .
        </p>
        <h2>Sponsors Meeting Schedule</h2>
        <ul>
          <li>February 11th — 6 PM</li>
        </ul>
        <p>
          <TextLink href="https://us02web.zoom.us/j/85752237241?pwd=eIe93fmeZSrb6ehrA9nOhEnG8Rc0kQ.1" external>
            Zoom link for all meetings
          </TextLink>
        </p>
      </PageContent>
    </>
  );
}
