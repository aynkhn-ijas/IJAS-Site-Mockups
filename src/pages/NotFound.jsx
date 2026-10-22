import PageContent from "@/components/PageContent";
import PageHero from "@/components/PageHero";
import TextLink from "@/components/TextLink";
import usePageTitle from "@/hooks/usePageTitle";

export default function NotFound() {
  usePageTitle("Page not found");

  return (
    <>
      <PageHero title="Page not found" />
      <PageContent>
        <p>That page is not in this site. Return to the homepage or try one of these sections.</p>
        <ul>
          <li>
            <TextLink to="/">Home</TextLink>
          </li>
          <li>
            <TextLink to="/students">Students</TextLink>
          </li>
          <li>
            <TextLink to="/awards">Awards &amp; Results</TextLink>
          </li>
          <li>
            <TextLink to="/contact">Contact</TextLink>
          </li>
        </ul>
      </PageContent>
    </>
  );
}
