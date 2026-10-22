import PageContent from "@/components/PageContent";
import PageHero from "@/components/PageHero";
import TextLink from "@/components/TextLink";
import usePageTitle from "@/hooks/usePageTitle";

export default function FindSchoolNumber() {
  usePageTitle("Find My School Number");

  return (
    <>
      <PageHero title="Find My School Number" />
      <PageContent>
        <p>
          Every IJAS member school has a school number used for membership, regional registration, and
          zFairs. Look up your school in the membership directory to confirm the number and whether
          the school is a current member.
        </p>
        <p>
          <TextLink href="http://members.ijas.org" external>
            Open the IJAS membership directory
          </TextLink>
        </p>
        <p>
          If your school is not listed, a sponsor can start a new school or club membership on the{" "}
          <TextLink to="/membership">Membership</TextLink> page. Individual members whose school is not
          an IJAS member should also register there.
        </p>
        <p>
          Questions: <TextLink href="mailto:info@ijas.org">info@ijas.org</TextLink>.
        </p>
      </PageContent>
    </>
  );
}
