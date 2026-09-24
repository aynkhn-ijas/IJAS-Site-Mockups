export default function Hero() {
  return (
    <section className="relative isolate h-[340px] overflow-hidden sm:h-[420px] lg:h-[500px]">
      <img
        src="/assets/hero.jpg"
        alt="IJAS state science fair hall with student poster boards"
        className="absolute inset-0 h-full w-full object-cover object-[center_42%]"
      />
      <div className="absolute inset-0 bg-white/70" />
      <div className="relative mx-auto flex h-full max-w-[1180px] items-center px-5 lg:px-8">
        <div className="flex max-w-full items-center gap-4 sm:gap-6 lg:gap-8">
          <img
            src="/assets/ijas-seal.png"
            alt="Illinois Junior Academy of Science seal, since 1927"
            className="h-[140px] w-[140px] shrink-0 sm:h-[210px] sm:w-[210px] lg:h-[280px] lg:w-[280px]"
          />
          <h1 className="text-[26px] font-extrabold leading-[1.08] text-[#1f2937] sm:text-[40px] lg:text-[52px]">
            Illinois Junior Academy of
            <br />
            Science
          </h1>
        </div>
      </div>
    </section>
  );
}
