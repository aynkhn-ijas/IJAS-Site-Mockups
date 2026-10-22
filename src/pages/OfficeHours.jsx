import PageContent from "@/components/PageContent";
import PageHero from "@/components/PageHero";
import TextLink from "@/components/TextLink";
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

export default function OfficeHours() {
  usePageTitle("Office Hours / How-To Videos");

  return (
    <>
      <PageHero title="Office Hours / How-To Videos" />
      <PageContent>
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
        <h2>How-To Videos</h2>
        <p>
          How-To videos describe aspects of the project that apply to both experimental and design
          projects, as well as other aspects of the IJAS expositions.
        </p>
        <h3>General</h3>
        <ul>
          {generalVideos.map((item) => (
            <li key={item.label}>
              <TextLink href={item.href} external>
                {item.label}
              </TextLink>
            </li>
          ))}
        </ul>
        <h3>Experimental Projects</h3>
        <ul>
          {experimentalVideos.map((item) => (
            <li key={item.label}>
              <TextLink href={item.href} external>
                {item.label}
              </TextLink>
            </li>
          ))}
        </ul>
        <p>
          A complete written explanation of experimental and design projects is in the{" "}
          <TextLink
            href="https://www.ijas.org/_files/ugd/497522_932de54b80a7491b8177a41c4bb1b7f6.pdf"
            external
          >
            Policy and Procedure Manual
          </TextLink>
          . Forms are on the <TextLink to="/resources/rules">Rules &amp; Forms</TextLink> page.
        </p>
      </PageContent>
    </>
  );
}
