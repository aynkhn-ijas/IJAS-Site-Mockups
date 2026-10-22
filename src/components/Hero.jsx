import { YEAR_EVENTS } from "../data/years";

export default function Hero({ year }) {
  const event = YEAR_EVENTS[year];

  return (
    <section className="relative flex h-[220px] items-center justify-center overflow-hidden md:h-[300px]" aria-labelledby="hero-title">
      <img
        src={import.meta.env.BASE_URL + "audience.jpg"}
        alt=""
        className="absolute inset-0 h-full w-full object-cover grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E3B7B]/80 via-[#0E3B7B]/65 to-[#0E3B7B]/75" />
      <div className="relative px-6 text-center text-white">
        <h1 id="hero-title" className="text-[34px] font-bold leading-tight md:text-[56px]">
          {event.title}
        </h1>
        <p className="mt-3 text-[16px] md:text-[18px]">{event.dates}</p>
        <p className="mt-1 text-[16px] md:text-[18px]">{event.location}</p>
      </div>
    </section>
  );
}
