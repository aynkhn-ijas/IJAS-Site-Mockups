import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const sponsors = [
  { quote: "", name: "Matthew & Emily Dawson", title: "Gold Partner" },
  { quote: "", name: "Kevin Keehn", title: "Bronze Partner" },
  { quote: "", name: "Lokesh Family", title: "Bronze Partner" },
  { quote: "", name: "Ali Uslu", title: "Bronze Partner" },
  { quote: "", name: "Jann Hawkins", title: "Bronze Partner" },
  { quote: "", name: "Ball Seed", title: "Special Award Partner" },
  { quote: "", name: "Illinois Soybean Association", title: "Special Award Partner" },
  { quote: "", name: "Illinois Psychological Association", title: "Special Award Partner" },
  { quote: "", name: "Thermo Fisher", title: "Special Award Partner" },
];

export default function SponsorMarquee() {
  return (
    <section className="bg-white px-4 pb-10">
      <h2 className="pt-8 text-center text-[28px] font-bold text-ijas-ink sm:pt-10 sm:text-[34px]">
        Thank you so much to our supporters!
      </h2>
      <div className="mx-auto mt-6 max-w-[1180px]">
        <InfiniteMovingCards
          items={sponsors}
          direction="left"
          speed="slow"
          pauseOnHover
          className="max-w-full"
        />
      </div>
    </section>
  );
}
