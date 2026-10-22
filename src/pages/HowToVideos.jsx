import PageContent from "@/components/PageContent";
import PageHero from "@/components/PageHero";
import TextLink from "@/components/TextLink";
import { studentSubnav } from "@/data/nav";
import usePageTitle from "@/hooks/usePageTitle";

const generalVideos = [
  { label: "Comparison of Design and Experimental", href: "https://youtu.be/fnuhucwfJGE" },
  { label: "Background Research and Citations", href: "https://youtu.be/wnxLMW7hMO0" },
  { label: "Choosing a Topic", href: "https://youtu.be/nJB94jGlXs0" },
  { label: "Statistics", href: "https://vimeo.com/862935669/5e558ac5a6" },
  { label: "Safety and Endorsements", href: "https://youtu.be/FxeDZ3Fj3As" },
  { label: "Excel and Google Sheets", href: "https://youtu.be/W3i3BPZfWGc" },
  { label: "Comparison of Paper Session and Poster Session", href: "https://youtu.be/NIyV4RZBUFU" },
  { label: "Creating a Poster", href: "https://youtu.be/ImaDPvOUlE4" },
];

const experimentalVideos = [
  { label: "Purpose", href: "https://youtu.be/xITS6IjXf1w" },
  { label: "Hypothesis", href: "https://youtu.be/EK8M6dA6MBM" },
  { label: "Materials and Procedure", href: "https://youtu.be/mpfACDpg2s8" },
  { label: "Conclusion (Experimental)", href: "https://youtu.be/kOt1JSvwQZo" },
  { label: "Constructing the Report (Experimental)", href: "https://youtu.be/CsJwks5ryxM" },
];

export default function HowToVideos() {
  usePageTitle("How-To Videos");

  return (
    <>
      <PageHero title="How-To Videos" />
      <PageContent subnav={studentSubnav}>
        <p>
          How-To videos describe aspects of the project that apply to both experimental and design
          projects, as well as other aspects of the IJAS expositions.
        </p>
        <h2>General</h2>
        <ul>
          {generalVideos.map((item) => (
            <li key={item.label}>
              <TextLink href={item.href} external>
                {item.label}
              </TextLink>
            </li>
          ))}
          <li>Judging: Coming soon</li>
          <li>Paper Session: Coming soon</li>
          <li>Special Awards: Coming soon</li>
          <li>APA Video: Coming soon</li>
        </ul>
        <h2>Experimental Projects</h2>
        <p>
          A complete written explanation of experimental projects is in the{" "}
          <TextLink
            href="https://www.ijas.org/_files/ugd/497522_932de54b80a7491b8177a41c4bb1b7f6.pdf"
            external
          >
            Policy and Procedure Manual
          </TextLink>
          . Each project must also include an Abstract, Safety Sheet, and any other required
          documents from <TextLink to="/resources/rules">Rules and Forms</TextLink>.
        </p>
        <ul>
          {experimentalVideos.map((item) => (
            <li key={item.label}>
              <TextLink href={item.href} external>
                {item.label}
              </TextLink>
            </li>
          ))}
        </ul>
        <h2>Design Projects</h2>
        <p>
          A complete written guide to design projects is in the Policy and Procedure Manual. Page 26
          includes details regarding the physical arrangement of the paper for a design project.
        </p>
        <ul>
          <li>Prototype Redesign</li>
          <li>Conclusion (Design)</li>
          <li>Constructing the Report (Design)</li>
        </ul>
      </PageContent>
    </>
  );
}
