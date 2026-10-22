import PageHero from "@/components/PageHero";
import usePageTitle from "@/hooks/usePageTitle";

const ZEFFY = "https://www.zeffy.com/en-US/donation-form/ijas-donations";

export default function Donate() {
  usePageTitle("Donate to IJAS");

  return (
    <>
      <PageHero title="Donate to IJAS" />
      <div className="mx-auto max-w-[1180px] px-5 py-12 md:px-8 md:py-14">
        <div className="grid items-center gap-10 lg:grid-cols-[400px_1fr] lg:gap-14">
          <div className="mx-auto w-full max-w-[400px] overflow-hidden bg-[#D9ECFF]">
            <img
              src={import.meta.env.BASE_URL + "page/donate-now.jpg"}
              alt="Donate Now — Illinois Junior Academy of Science"
              className="block w-full object-contain"
            />
          </div>
          <div className="text-center text-[#1f2937]">
            <h2 className="text-[26px] font-semibold leading-snug md:text-[32px]">
              Thank you for supporting the next generation of scientists!
            </h2>
            <p className="mt-6 text-[16px] font-semibold">IJAS Online Donations now are through Zeffy!</p>
            <p className="mx-auto mt-4 max-w-[640px] text-[15px] leading-relaxed md:text-[16px]">
              Click the link below to go to the Zeffy Platform. IJAS uses Zeffy to maximize your
              donation dollars.{" "}
              <strong>
                To avoid additional charges, make sure to click custom in the &quot;Zeffy Tip&quot;
                section and enter $0.
              </strong>{" "}
              Thank you again for donating to IJAS!
            </p>
            <p className="mt-6 text-[15px] font-semibold">
              We also welcome donations by check. Please mail checks to:
            </p>
            <p className="mt-2 text-[15px]">
              Illinois Junior Academy of Science – 6310 N University St #9055, Peoria, IL 61612
            </p>
            <a
              href={ZEFFY}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex h-12 w-full max-w-[720px] items-center justify-center rounded-full bg-ijas-navy px-6 text-[16px] font-medium text-white hover:bg-[#0a2f63]"
            >
              Donate to IJAS on Zeffy
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
