import PageHero from "@/components/PageHero";
import SectionBar from "@/components/SectionBar";
import TextLink from "@/components/TextLink";
import usePageTitle from "@/hooks/usePageTitle";

const BUY_NOW = "https://www.ijas.org/pricing-plans/list";
const DIRECTORY = "http://members.ijas.org";

const plans = [
  {
    title: "School/Club Membership (Yearly)",
    price: "100",
    lines: ["Yearly Membership for Teachers & After School Clubs", "Valid for 12 months"],
  },
  {
    title: "Individual Membership (Yearly)",
    price: "100",
    lines: ["Membership for Individuals (MUST NOT BE ENROLLED IN AN IJAS SCHOOL)", "Valid for 12 months"],
  },
  {
    title: "IJAS Alumni",
    price: "15",
    lines: ["Every year", "Members/Donors who competed in at least 1 IJAS Regional or State Exposition Event"],
  },
  {
    title: "IJAS Board Membership (Student & Adult)",
    price: "0",
    lines: [
      "This membership IS NOT FOR STUDENTS (Only IJAS Adult & Student Board Members)",
      "Free Plan",
    ],
  },
];

export default function Membership() {
  usePageTitle("Membership");

  return (
    <>
      <PageHero title="Membership" />

      <div className="bg-[#F2F2F2] px-5 py-8 text-center md:py-10">
        <h2 className="text-[32px] font-medium text-[#1f2937] md:text-[40px]">Membership</h2>
      </div>

      <div className="mx-auto max-w-[920px] px-5 py-8 md:px-8 md:py-10">
        <div className="rounded-[28px] bg-[#C5F0A0] px-6 py-9 text-center text-[#1f2937] md:px-12 md:py-11">
          <p className="text-[20px] font-semibold leading-snug md:text-[24px]">
            Membership for the 2026–2027 school year is now open! Register for a new membership at the
            bottom of this page. Memberships (both school and individual) are $100.
          </p>
        </div>

        <div className="mt-10 space-y-5 text-center text-[16px] leading-relaxed text-[#1f2937]">
          <p>
            Schools, Clubs, and/or Individuals must be members of the Illinois Junior Academy of
            Science, Inc.
            <br />
            in order to compete in the state exposition series.
          </p>
          <p>
            Join or renew memberships for IJAS at the bottom of this page using the membership
            platform.
          </p>
          <p>Please pay membership fees by December 31, 2026. Late fees will apply.</p>
          <p>*Note - Regions may also have membership or registration fees.</p>
        </div>

        <div className="mt-10">
          <a
            href={DIRECTORY}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-[52px] items-center justify-center rounded-full bg-ijas-navy px-6 py-3 text-center text-[16px] font-medium text-white hover:bg-[#0a2f63] md:text-[18px]"
          >
            Check My School&apos;s Membership Status
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-[760px] px-6 pb-10 pt-2 text-center text-[16px] leading-relaxed text-[#1f2937]">
        <h2 className="text-[26px] font-semibold md:text-[30px]">IJAS 2026–2027 Membership Information</h2>
        <p className="mt-6 font-semibold">New School/Club/Individual: Registration is currently open!</p>
        <p className="mt-3">Fill out the form below to register and pay for a new membership!</p>
        <p className="mt-3">
          If you have any questions, please contact{" "}
          <TextLink href="mailto:info@ijas.org">info@ijas.org</TextLink>!
        </p>
      </div>

      <div className="mx-auto max-w-[820px] px-8">
        <hr className="border-t border-[#222]" />
      </div>

      <div className="mx-auto max-w-[760px] px-6 py-10 text-center text-[16px] leading-relaxed text-[#1f2937]">
        <h2 className="text-[20px] font-bold">2026-2027 Membership Fees:</h2>
        <p className="mt-4 italic">
          School/Club (new/renewal): $100
          <br />
          Individual (school must <strong className="not-italic">not</strong> be IJAS member): $100
        </p>
        <p className="mt-4 italic">
          Must be paid online or postmarked by <strong className="not-italic">December 31, 2026</strong>
        </p>

        <h2 className="mt-10 text-[20px] font-bold">2026-2027 Late Fees:</h2>
        <p className="mt-4">
          <strong>December 31, 2026 - January 31, 2027</strong>
          <br />
          $150.00 per School/Club - $150 per Individual
        </p>
        <p className="mt-5">
          <strong>After February 15, 2027 - In order to participate in the REGIONAL FAIR</strong>
          <br />
          $250 per School/Club - $250 per Individual
        </p>
        <p className="mt-5">
          <strong>After your Regional Fair - In order to participate in the STATE FAIR</strong>
          <br />
          $500.00 per School/Club - $500 per Individual
        </p>
        <p className="mt-8 text-[15px] italic">
          Fill out the form at the bottom of the page to register/pay for membership! If you have any
          questions, please contact <TextLink href="mailto:info@ijas.org">info@ijas.org</TextLink>!
        </p>
      </div>

      <div className="mx-auto max-w-[820px] px-8">
        <hr className="border-t border-[#222]" />
      </div>

      <div className="mx-auto max-w-[920px] px-6 py-10 text-[15px] leading-relaxed text-[#1f2937] md:px-8">
        <h2 className="text-[17px] font-bold">Additional Information:</h2>
        <p className="mt-3">
          Payments and registration may be alternatively mailed to the IJAS mailing address. Purchase
          Orders are not accepted.
        </p>
        <p className="mt-3">
          For new schools, please mail a filled out registration form along with your payment or check
          to the address below. Existing IJAS schools should include a copy of their renewal invoice
          (sent to the email on the school account) with payment.
        </p>
        <p className="mt-5">
          Illinois Junior Academy of Science
          <br />
          6310 N. University St. #9055
          <br />
          Peoria, IL 61612
        </p>
      </div>

      <div className="bg-[#F2F2F2] px-5 py-8 text-center md:py-10">
        <h2 className="text-[28px] font-semibold text-[#1f2937] md:text-[34px]">
          Register for 2026–2027 IJAS Membership
        </h2>
      </div>

      <div id="plans" className="bg-white px-5 py-12 md:px-8 md:py-16">
        <h2 className="mb-12 text-center text-[28px] font-medium text-[#1f2937] md:text-[36px]">
          Choose your IJAS Membership Type
        </h2>
        <div className="mx-auto grid max-w-[1180px] gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <article
              key={plan.title}
              className="flex min-h-[460px] flex-col border border-[#d1d5db] bg-white px-6 pb-6 pt-8 text-center"
            >
              <h3 className="min-h-[52px] text-[16px] font-medium leading-snug text-[#1f2937]">
                {plan.title}
              </h3>
              <p className="mt-6 text-[14px] text-[#6b7280]">$</p>
              <p className="text-[58px] font-normal leading-none tracking-tight text-[#1f2937]">
                {plan.price}
              </p>
              <div className="mt-6 flex flex-1 flex-col gap-4 text-[13px] leading-relaxed text-[#4b5563]">
                {plan.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <a
                href={BUY_NOW}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex h-12 w-full items-center justify-center bg-[#2563EB] text-sm font-medium text-white hover:bg-[#1d4ed8]"
              >
                Buy Now
              </a>
            </article>
          ))}
        </div>
      </div>

      <div id="honorary">
        <SectionBar tone="green">Honorary Lifetime Membership</SectionBar>
      </div>
      <div className="bg-white px-6 py-10 text-center md:px-10 md:py-12">
        <p className="mx-auto max-w-[980px] text-[16px] leading-[1.8] text-[#1f2937] md:text-[17px]">
          Each year IJAS grants Honorary Lifetime Memberships to individuals who have made significant
          contributions to the objectives of the organization. Any member of the IJAS may make
          nominations. The nomination should be accompanied by a typed description of the nominee&apos;s
          service to IJAS and to the students of the State of Illinois. Please send the nomination and
          a brief summary of the candidate&apos;s performance to the president, Emily Dawson, by email
          to{" "}
          <a href="mailto:emily.dawson@ijas.org" className="font-medium text-ijas-navy underline">
            emily.dawson@ijas.org
          </a>
          .
        </p>
      </div>
    </>
  );
}
