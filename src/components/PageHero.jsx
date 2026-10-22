export default function PageHero({ title, image = (import.meta.env.BASE_URL + "audience.jpg"), kicker }) {
  return (
    <section className="relative flex h-[190px] items-center justify-center overflow-hidden md:h-[250px]">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_42%] grayscale brightness-[1.15]"
      />
      <div className="absolute inset-0 bg-white/58" />
      <div className="relative px-6 text-center">
        {kicker ? (
          <p className="mb-1 text-sm font-semibold uppercase tracking-[0.18em] text-[#1f2937]">{kicker}</p>
        ) : null}
        <h1 className="text-[34px] font-medium leading-tight text-[#1f2937] md:text-[46px]">{title}</h1>
      </div>
    </section>
  );
}
