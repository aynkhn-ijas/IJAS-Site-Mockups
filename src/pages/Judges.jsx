import PageContent from "@/components/PageContent";
import PageHero from "@/components/PageHero";
import TextLink from "@/components/TextLink";
import usePageTitle from "@/hooks/usePageTitle";

export default function Judges() {
  usePageTitle("Judges");

  return (
    <>
      <PageHero title="Judges" />
      <PageContent>
        <h2>Volunteer as an IJAS Judge!</h2>
        <p>
          Every year, thousands of students across Illinois put their creativity, curiosity, and
          problem-solving skills to the test through local and regional science fairs. The very best
          of these projects advance to the IJAS State Exposition. This event would not be possible
          without our judges.
        </p>
        <p>
          Each project is reviewed through student-judge interviews and evaluation by judging teams.
          Judges offer encouragement, ask thoughtful questions, and celebrate student work.{" "}
          <TextLink href="https://www.ijas.org/judgesmailinglist" external>
            Subscribe to the Judges Mailing List
          </TextLink>
          .
        </p>
        <h2>How it Works</h2>
        <ol>
          <li>
            <strong>Find your fair.</strong> In addition to the State Science Fair, regional fairs
            run across Illinois. Explore dates on the <TextLink to="/competition/regionals">Regionals</TextLink>{" "}
            page. The State Fair is April 30–May 1, 2027 in Peoria.
          </li>
          <li>
            <strong>Sign up.</strong> First-time and returning judges must create a new account each
            year. For regional fairs, contact your regional chair.
          </li>
          <li>
            <strong>Spread the word.</strong> Invite STEM colleagues. Any science background is
            welcome.
          </li>
          <li>
            <strong>Enjoy the fair.</strong> Arrive on time. Questions:{" "}
            <TextLink href="mailto:info@ijas.org">info@ijas.org</TextLink>.
          </li>
        </ol>
        <h2>Qualifications</h2>
        <ul>
          <li>All judge volunteers must have at least completed high school.</li>
          <li>High school students are not allowed to volunteer as judges.</li>
          <li>Volunteers may be parents, adult family members, and other professionals.</li>
        </ul>
        <h2>What Happens on Fair Day</h2>
        <ul>
          <li>
            You will work in one of the 22 categories (see the{" "}
            <TextLink to="/students/category-guide">Category Guide</TextLink>) or evaluate special
            awards provided by professional organizations.
          </li>
          <li>Orientation is provided before the fair and on the morning of the fair.</li>
          <li>
            About a week before the fair, each judge receives a category or special award assignment
            and scoring rubric.
          </li>
        </ul>
        <h2>Judge Guidelines</h2>
        <p>
          Expositions are not contests between students or schools. Each exhibitor is judged on the
          IJAS rubric or the given special award criteria. Judges should remember that exhibitors are
          junior or senior high school students, many experiencing scientific evaluation for the
          first time.
        </p>
        <ul>
          <li>Each judge is assigned five to six projects or papers.</li>
          <li>Allow fifteen to thirty minutes for each project or paper.</li>
          <li>You may judge Junior (grades 7–8) and Senior (grades 9–12) divisions.</li>
          <li>Do not show or discuss students&apos; scores with them.</li>
          <li>Do not use cell phones while judging.</li>
          <li>If a student cannot be located, the project is a No Show and no rating is given.</li>
          <li>Return scoring rubrics as each project is completed.</li>
        </ul>
        <h2>Rubrics</h2>
        <ul>
          <li>
            <TextLink href="https://www.ijas.org/_files/ugd/497522_3cdc6a31f1d34c07b650e0ca2a1515c4.pdf" external>
              Poster Session Design Rubric
            </TextLink>
          </li>
          <li>
            <TextLink href="https://www.ijas.org/_files/ugd/497522_9828ee7e4ae44169b6a9a67a77a1f0ed.pdf" external>
              Paper Session Design Rubric
            </TextLink>
          </li>
          <li>
            <TextLink href="https://www.ijas.org/_files/ugd/497522_22ee37a02f5c4eaea8ecaaa03d05872b.pdf" external>
              Paper Session Experimental Rubric
            </TextLink>
          </li>
          <li>
            <TextLink href="https://www.ijas.org/_files/ugd/497522_2e9778590af64220b986d2f1586a5a15.pdf" external>
              Poster Session Experimental Rubric
            </TextLink>
          </li>
        </ul>
        <p>
          Organizations interested in supporting judging and awards can{" "}
          <TextLink to="/support/sponsor">learn about fair sponsorship</TextLink>.
        </p>
      </PageContent>
    </>
  );
}
