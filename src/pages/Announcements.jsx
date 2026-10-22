import PageContent from "@/components/PageContent";
import PageHero from "@/components/PageHero";
import TextLink from "@/components/TextLink";
import { aboutSubnav } from "@/data/nav";
import usePageTitle from "@/hooks/usePageTitle";

export default function Announcements() {
  usePageTitle("Announcements");

  return (
    <>
      <PageHero title="Announcements" />
      <PageContent subnav={aboutSubnav}>
        <h2>State Qualifiers: Update your Info in zFairs</h2>
        <p>
          Students advancing to the State Exposition must update their information and upload papers
          at <TextLink href="http://ijas.zfairs.com" external>ijas.zfairs.com</TextLink> within two
          weeks of receiving a promotion email. Questions:{" "}
          <TextLink href="mailto:zfairssupport@ijas.org">zfairssupport@ijas.org</TextLink>.
        </p>
        <h2>Memberships are open</h2>
        <p>
          School, club, and individual memberships for the 2026–2027 season are open. Payment is due
          by December 31 at 11:59 PM CT. Late fees apply after that date.{" "}
          <TextLink to="/membership">View membership details</TextLink>.
        </p>
        <h2>Office Hours with the Student Board</h2>
        <p>
          Join monthly Zoom office hours for project questions, forms, and exposition logistics. See
          the current schedule on the <TextLink to="/students/help-sessions">Help Sessions</TextLink>{" "}
          page.
        </p>
        <h2>Intro to IJAS Webinars</h2>
        <p>
          Teacher webinars introduce IJAS opportunities, membership, and regional timelines.{" "}
          <TextLink to="/teachers">More information for teachers</TextLink>.
        </p>
      </PageContent>
    </>
  );
}
