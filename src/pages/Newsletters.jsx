import PageHero from "@/components/PageHero";
import { newsletters } from "@/data/newsletters";
import usePageTitle from "@/hooks/usePageTitle";
import { useState } from "react";

export default function Newsletters() {
  usePageTitle("Newsletter");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <>
      <PageHero title="IJAS Newsletter" />
      <div className="mx-auto max-w-[880px] px-6 py-12 text-center text-[16px] leading-[1.85] text-[#1f2937] md:py-14 md:text-[17px]">
        <p>
          Each month, the Illinois Junior Academy of Science (IJAS) releases a newsletter featuring
          updates, upcoming events, student highlights, and stories from across Illinois&apos; science
          and research community. Our goal is to keep students, educators, and supporters connected
          and inspired through news, opportunities, and resources that celebrate scientific discovery.{" "}
          <strong>
            You can fill out the form below to receive our newsletters directly in your email inbox
            every month.
          </strong>{" "}
          All newsletter editions are also posted below for your viewing.
        </p>
        {subscribed ? (
          <p className="mt-10 text-[16px] font-medium text-ijas-green">
            Thank you. You are subscribed to the IJAS newsletter.
          </p>
        ) : (
          <form
            className="mx-auto mt-10 max-w-[420px] text-center"
            onSubmit={(event) => {
              event.preventDefault();
              setSubscribed(true);
            }}
          >
            <label className="block text-[14px] text-[#374151]">
              Email
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                className="mt-1 w-full rounded-sm border border-[#d1d5db] bg-white px-3 py-2 text-left text-[15px] text-[#1f2937]"
              />
            </label>
            <label className="mt-4 flex items-center justify-center gap-2 text-center text-[15px] text-[#1f2937]">
              <input type="checkbox" required className="h-4 w-4 accent-ijas-navy" />
              Yes, subscribe me to your newsletter.*
            </label>
            <div className="mt-5 text-center">
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center bg-ijas-navy px-8 text-sm font-medium text-white hover:bg-[#0a2f63]"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="pb-20">
        {newsletters.map((issue) => {
          const cover = (
            <img
              src={issue.src}
              alt={`${issue.date} IJAS newsletter cover`}
              className="mx-auto max-h-[760px] w-auto max-w-[min(100%,540px)] border border-[#cfcfcf] bg-white object-contain shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
            />
          );
          return (
            <article key={issue.date} className="mb-2">
              <div className="bg-[#F2F2F2] px-4 py-5 text-center md:py-6">
                <h2 className="text-[26px] font-semibold text-[#1f2937] md:text-[30px]">{issue.date}</h2>
              </div>
              <div className="px-5 py-12 md:py-14">{issue.href ? (
                <a href={issue.href} target="_blank" rel="noreferrer" className="block">
                  {cover}
                </a>
              ) : (
                cover
              )}</div>
            </article>
          );
        })}
      </div>
    </>
  );
}
