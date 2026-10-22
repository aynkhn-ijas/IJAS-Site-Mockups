import PageHero from "@/components/PageHero";
import TextLink from "@/components/TextLink";
import usePageTitle from "@/hooks/usePageTitle";

const PACKET =
  "https://32006e0d-c980-4185-8925-c91d4150e02e.filesusr.com/ugd/497522_d89aa8dc47214b7e913808f08fa34d5c.pdf";

export default function BecomeSponsor() {
  usePageTitle("Become a Sponsor");

  return (
    <>
      <PageHero title="Become a Sponsor" />
      <div className="mx-auto max-w-[980px] px-5 py-12 text-center md:px-8 md:py-14">
        <p>
          <a
            href={PACKET}
            target="_blank"
            rel="noreferrer"
            className="text-[22px] font-medium leading-snug text-ijas-navy underline decoration-ijas-navy underline-offset-4 md:text-[28px]"
          >
            Download the 2025-2026 IJAS Sponsorship Information Packet
          </a>
        </p>
        <p className="mt-6 text-[17px] font-bold text-[#1f2937] md:text-[18px]">
          Thank you for your interest in sponsoring the Illinois Junior Academy of Science!
        </p>
        <p className="mt-5">
          <TextLink to="/support/donate">Donate to IJAS</TextLink>
        </p>

        <div className="mt-12 rounded-2xl bg-[#D6EAF8] px-5 py-8 text-left md:px-10 md:py-10">
          <div className="grid items-center gap-8 md:grid-cols-[150px_1fr] md:gap-10">
            <a href={PACKET} target="_blank" rel="noreferrer" className="mx-auto block w-[140px] shrink-0">
              <img
                src={import.meta.env.BASE_URL + "page/sponsorship-packet.jpg"}
                alt="2025-2026 IJAS Donors and Sponsorship Packet cover"
                className="w-full border border-[#9ca3af] object-cover shadow-sm"
              />
            </a>
            <p className="text-[16px] leading-[1.75] text-[#1f2937] md:text-[17px]">
              The IJAS Sponsorship Package provides a <strong>complete overview</strong> of how
              organizations and individuals can support the Illinois Junior Academy of Science. Inside,
              you&apos;ll find details about sponsorship levels, <strong>recognition benefits</strong>,
              along with visibility opportunities and the impact your support makes on student research
              and STEM education across Illinois. If you want more information or have any questions,
              please reach out to us at <TextLink href="mailto:info@ijas.org">info@ijas.org</TextLink>{" "}
              at any time!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
