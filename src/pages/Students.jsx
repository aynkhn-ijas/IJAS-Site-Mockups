import usePageTitle from "@/hooks/usePageTitle";
import { Link } from "react-router-dom";
import "./Students.css";

const POLICY_QUICK =
  "https://www.ijas.org/_files/ugd/497522_932de54b80a7491b8177a41c4bb1b7f6.pdf";
const POLICY_MANUAL =
  "https://www.ijas.org/_files/ugd/497522_042a76cbe4e64c88aa30bf600032bdd6.pdf";

const importantDates = [
  "February 15th: Student registration due to State",
  "February - March: Regional fairs across Illinois",
  "April 30th - May 1st: State Fair at Bradley University in Peoria",
];

const quickLinks = [
  { label: "Policy and Procedure Manual", href: POLICY_QUICK, external: true },
  { label: "Judging & Rubrics", to: "/volunteer/judges" },
  { label: "Abstract & Safety Forms", to: "/resources/rules" },
  { label: "IJAS Categories", to: "/resources/category-guide" },
  { label: "Regional Fair Info/Dates", to: "/competition/regionals" },
  { label: "Find My School Number", href: "http://members.ijas.org", external: true },
  { label: "IJAS ISEF Contest", to: "/competition/isef" },
  { label: "IJAS Thermo Fisher JIC", to: "/thermo-fisher" },
  { label: "Office Hours/How-To-Videos", to: "/resources/office-hours" },
];

function PageLink({ to, href, external = false, className, children }) {
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export default function Students() {
  usePageTitle("Students");

  return (
    <div className="students-page">
      <section className="announcement">
        <h2>
          The State Exposition is Here!{" "}
          <PageLink to="/competition/state-exposition">All State Related Information</PageLink>
        </h2>
      </section>

      <section className="hero">
        <img src={import.meta.env.BASE_URL + "ijas-assets/student-hero.png"} alt="" />
        <div className="hero-overlay">
          <h1>Students</h1>
        </div>
      </section>

      <section className="student-overview content">
        <div className="intro-section">
          <h2 className="student-guide-callout">
            Are you new to IJAS? Check our guide for new students{" "}
            <PageLink to="/students/starting-a-project">HERE</PageLink>
          </h2>
          <div className="membership-callout">
            <h2>IJAS Individual and School Memberships are Now Open!</h2>
            <p>
              More info at: <PageLink to="/membership">Memberships</PageLink>
            </p>
            <p>Payment is due on December 31st at 11:59PM CT</p>
          </div>
          <p className="general-reminder">
            <strong>General Reminder:</strong> If your school is not affiliated with the IJAS State
            or region, you may join an affiliated group or individually to enter your project at the
            regional exposition to qualify for the state exposition.
          </p>

          <div className="date-block">
            <p className="section-label">Important Dates:</p>
            <ul>
              {importantDates.map((date) => (
                <li key={date}>{date}</li>
              ))}
            </ul>
          </div>

          <PageLink className="contest-link" to="/competition/additional-contests">
            Additional IJAS Contests (Essay, Design, Decal, Scholarships, President&apos;s Grant)
          </PageLink>
        </div>

        <aside className="quick-links" aria-label="Quick Links">
          <h2>Quick Links:</h2>
          <div className="quick-link-list">
            {quickLinks.map((link) => (
              <PageLink key={link.label} {...link}>
                {link.label}
              </PageLink>
            ))}
          </div>
        </aside>
      </section>

      <section className="content project-section">
        <div className="project-heading-box">
          <h2 className="project-heading">Starting a Project - Tips</h2>
        </div>
        <div className="project-copy-box">
          <p>
            The science exposition allows students to discover virtually anything they want about
            STEM! Categories include everything from aerospace to zoology and so much more in
            between! For a full list of all 20 categories, please see the{" "}
            <PageLink to="/resources/category-guide">Category Guide</PageLink>.
          </p>
          <p>
            Students have the opportunity to create either an experimental project or a design
            project. What&apos;s the difference? A complete breakdown of the two types of projects
            can be viewed on pages 10-12 of the{" "}
            <PageLink href={POLICY_MANUAL} external>
              Policy and Procedure Manual 2024-2026
            </PageLink>
            . Additional How-To videos can also be found on the &quot;
            <PageLink to="/resources/office-hours">How-To Videos</PageLink>&quot; page under the
            &quot;Getting Started&quot; dropdown menu on the IJAS website. See below for a general
            version of the similarities and differences between these two types of investigations!
          </p>
        </div>
        <img
          className="comparison-image"
          src={import.meta.env.BASE_URL + "ijas-assets/experimental-vs-design-small.png"}
          alt="Experimental project versus design project comparison"
        />
      </section>

      <section className="content text-section">
        <h2>Poster vs. Paper Session</h2>
        <p>
          IJAS gives students the opportunity to compete in two different sessions--the paper and
          poster sessions. Students may compete in one of the sessions at State. Additional details
          for the sessions can be found in the{" "}
          <PageLink href={POLICY_MANUAL} external>
            Policy and Procedure Manual 2024-2026
          </PageLink>
          .
        </p>
        <p>
          Students who choose to present their project in the Paper Session will develop their own
          slide presentation (i.e. PowerPoint, Google Slides, Prezi, etc.) in addition to having a
          written report and oral presentation.
        </p>
        <p>
          Students who choose to present their project in the Poster Session will create a backboard
          with all of the parts mentioned above. The backboard is to be used to augment the
          student&apos;s written report and oral presentation.
        </p>
        <p className="note">
          NOTE: Students may NOT participate in both paper and poster session at the State Fair(It
          is allowed at regional fairs, however if they qualify for the state exposition in both
          events, they must chose one). Students may use a previous year&apos;s poster session
          project for paper session.
        </p>
      </section>

      <section className="content text-section final-section">
        <h2>Developing a Project Idea</h2>
        <p>
          A common theme between good projects is that they are meaningful to the student. Don&apos;t
          do a project just because you think it will look good. Instead, do a project that you are
          passionate and excited about, and one that really serves to solve a problem. Judges want
          to know the real-world applications of your project.
        </p>
        <p>
          A list of resources to inspire you to develop a good project can be found under the &quot;
          <PageLink to="/resources/office-hours">Project Resources</PageLink>&quot; page of the IJAS
          website. However, make sure to develop a unique project idea. Don&apos;t just copy science
          that has already been done!
        </p>
        <p>
          If you have any questions, please contact your sponsor or email us at{" "}
          <PageLink href="mailto:info@ijas.org">info@ijas.org</PageLink>
        </p>
      </section>
    </div>
  );
}
