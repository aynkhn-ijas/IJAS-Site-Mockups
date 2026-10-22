import PageContent from "@/components/PageContent";
import PageHero from "@/components/PageHero";
import TextLink from "@/components/TextLink";
import { studentSubnav } from "@/data/nav";
import usePageTitle from "@/hooks/usePageTitle";

export default function StartingProject() {
  usePageTitle("Starting a Project");

  return (
    <>
      <PageHero title="Starting a Project" image={import.meta.env.BASE_URL + "ijas-assets/experimental-vs-design.png"} />
      <PageContent subnav={studentSubnav}>
        <h2>Starting a Project — Tips</h2>
        <p>
          The science exposition allows students to discover virtually anything they want about STEM!
          Categories include everything from aerospace to zoology and so much more in between. For a
          full list of all 20 categories, please see the{" "}
          <TextLink to="/students/category-guide">Category Guide</TextLink>.
        </p>
        <p>
          Students have the opportunity to create either an experimental project or a design project.
          A complete breakdown of the two types of projects can be viewed on pages 10–12 of the{" "}
          <TextLink
            href="https://www.ijas.org/_files/ugd/497522_932de54b80a7491b8177a41c4bb1b7f6.pdf"
            external
          >
            Policy and Procedure Manual
          </TextLink>
          . Additional How-To videos can also be found on the{" "}
          <TextLink to="/students/how-to-videos">How-To Videos</TextLink> page.
        </p>
        <img
          src={import.meta.env.BASE_URL + "ijas-assets/experimental-vs-design-small.png"}
          alt="Experimental project versus design project comparison"
          className="my-6 w-full max-w-[820px] rounded border border-[#e5e7eb]"
        />
        <h2>Developing a Project Idea</h2>
        <p>
          A common theme between good projects is that they are meaningful to the student. Don&apos;t
          do a project just because you think it will look good. Instead, do a project that you are
          passionate and excited about, and one that really serves to solve a problem. Judges want to
          know the real-world applications of your project.
        </p>
        <p>
          A list of resources to inspire you can be found under{" "}
          <TextLink to="/students/how-to-videos">Project Resources / How-To Videos</TextLink>.
          Develop a unique project idea rather than copying science that has already been done.
        </p>
        <p>
          If you have any questions, please contact your sponsor or email{" "}
          <TextLink href="mailto:info@ijas.org">info@ijas.org</TextLink>.
        </p>
      </PageContent>
    </>
  );
}
