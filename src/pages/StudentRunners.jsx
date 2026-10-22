import PageContent from "@/components/PageContent";
import PageHero from "@/components/PageHero";
import TextLink from "@/components/TextLink";
import usePageTitle from "@/hooks/usePageTitle";

export default function StudentRunners() {
  usePageTitle("Student Runners");

  return (
    <>
      <PageHero title="Student Runners" />
      <PageContent>
        <h2>Volunteer as a Student Runner</h2>
        <p>
          Student runners keep the State Exposition moving. Runners escort judging teams, deliver
          materials, and help students, teachers, and guests find sessions, posters, and special
          events throughout the day.
        </p>
        <p>
          High school students who are IJAS members—or students of member schools—are invited to
          volunteer. Runners should be comfortable walking the venue, following a schedule, and
          representing IJAS with a professional, helpful presence.
        </p>
        <h2>What to expect</h2>
        <ul>
          <li>Arrive for a morning briefing before judging begins.</li>
          <li>Wear comfortable shoes and an IJAS runner badge or shirt if provided.</li>
          <li>Stay with your assigned judging team or station until you are released.</li>
          <li>Ask a board member or volunteer coordinator if you are unsure where to go.</li>
        </ul>
        <p>
          To volunteer as a student runner for the State Exposition, email{" "}
          <TextLink href="mailto:info@ijas.org">info@ijas.org</TextLink> with your name, school, grade,
          and the day you can serve. Judges sign up on the{" "}
          <TextLink to="/volunteer/judges">Judges</TextLink> page.
        </p>
      </PageContent>
    </>
  );
}
