import Image from "next/image";

type Props = { title: string; subtitle?: string; image?: string };

export default function PageHero({ title, subtitle, image = "/assets/hero.jpg" }: Props) {
  return (
    <section className="relative isolate flex h-[220px] items-center justify-center overflow-hidden sm:h-[300px]">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-white/60" />
      <div className="px-5 text-center">
        <h1 className="text-3xl font-medium text-ijas-ink sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-3 text-xl italic text-ijas-navy sm:text-3xl">{subtitle}</p>}
      </div>
    </section>
  );
}