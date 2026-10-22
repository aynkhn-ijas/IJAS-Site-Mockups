import PageContent from "@/components/PageContent";
import PageHero from "@/components/PageHero";
import TextLink from "@/components/TextLink";
import { studentSubnav } from "@/data/nav";
import usePageTitle from "@/hooks/usePageTitle";

const dates = [
  "September 20, 2026 at 6:00 PM",
  "October 18, 2026 at 6:00 PM",
  "November 15, 2026 at 6:00 PM",
  "December 13, 2026 at 6:00 PM",
  "January 17, 2027 at 6:00 PM",
  "February 21, 2027 at 6:00 PM",
  "March 21, 2027 at 6:00 PM",
  "April 18, 2027 at 6:00 PM",
];

export default function HelpSessions() {
  usePageTitle("Help Sessions");

  return (
    <>
      <PageHero title="Office Hours / Help Sessions" />
      <PageContent subnav={studentSubnav}>
        <h2>Office Hours Dates for 2026–2027 Season</h2>
        <p>
          Join the Student Board on Zoom for project questions, forms, and exposition logistics. All
          sessions use the same meeting link.
        </p>
        <ul>
          {dates.map((date) => (
            <li key={date}>{date}</li>
          ))}
        </ul>
        <p>
          Zoom link for all office hour sessions:{" "}
          <TextLink href="https://us02web.zoom.us/j/89773120675?pwd=w6tCz9sFulkJMAhvb50nwopK4uFrY8.1" external>
            Join Zoom
          </TextLink>
        </p>
        <p>
          How-To videos that complement these sessions are on the{" "}
          <TextLink to="/students/how-to-videos">How-To Videos</TextLink> page.
        </p>
      </PageContent>
    </>
  );
}
