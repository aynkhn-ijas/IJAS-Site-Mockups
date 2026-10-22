import PageHero from "@/components/PageHero";
import { sponsorGroups } from "@/data/sponsors";
import usePageTitle from "@/hooks/usePageTitle";

export default function CurrentSponsors() {
  usePageTitle("Current Sponsors");

  return (
    <>
      <PageHero title="Current Donors & Sponsors" />
      <div className="mx-auto max-w-[1180px] px-5 py-10 md:px-8 md:py-12">
        <p className="mb-12 text-center text-[18px] text-[#1f2937] md:text-[20px]">
          Thank you to all of our incredible Donors &amp; Sponsors, your support makes IJAS possible!
        </p>
        {sponsorGroups.map((group) => (
          <section key={group.title} className="mb-14">
            <div className="mb-8 rounded-xl bg-[#D6EAF8] px-4 py-5 md:py-6">
              <h2 className="text-center text-[32px] font-semibold leading-tight text-[#1f2937] md:text-[42px]">
                {group.title}
              </h2>
            </div>
            <ul className="flex flex-wrap items-stretch justify-center gap-6 md:gap-8">
              {group.logos.map((logo) => {
                const image = (
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-h-[140px] max-w-[200px] object-contain"
                  />
                );
                return (
                  <li
                    key={`${group.title}-${logo.name}`}
                    className="flex h-[180px] w-[230px] items-center justify-center rounded-xl border border-black bg-white p-5"
                  >
                    {logo.href ? (
                      <a
                        href={logo.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-full w-full items-center justify-center"
                      >
                        {image}
                      </a>
                    ) : (
                      image
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
