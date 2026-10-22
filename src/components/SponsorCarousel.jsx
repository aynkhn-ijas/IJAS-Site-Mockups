import { carouselLogos } from "@/data/sponsors";

export default function SponsorCarousel() {
  const items = [...carouselLogos, ...carouselLogos];

  return (
    <section className="bg-white px-4 pb-12 pt-4">
      <h2 className="pt-6 text-center text-[28px] font-bold text-ijas-ink sm:text-[34px]">
        Thank you so much to our supporters!
      </h2>
      <div
        className="scroller relative z-10 mx-auto mt-6 max-w-[1180px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]"
        style={{ "--animation-duration": "55s", "--animation-direction": "forwards" }}
      >
        <ul className="animate-scroll flex w-max min-w-full shrink-0 items-center gap-4 py-5 hover:[animation-play-state:paused]">
          {items.map((logo, index) => (
            <li
              key={`${logo.name}-${index}`}
              className="flex h-[88px] w-[170px] shrink-0 items-center justify-center rounded-md border border-[#e5e7eb] bg-white px-4 py-3 shadow-sm"
            >
              <img src={logo.src} alt={logo.name} className="max-h-16 max-w-full object-contain" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
