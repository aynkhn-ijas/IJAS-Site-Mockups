import AwardsSection from "@/components/AwardsSection";
import Hero from "@/components/Hero";
import YearTabs from "@/components/YearTabs";
import { YEAR_EVENTS } from "@/data/years";
import usePageTitle from "@/hooks/usePageTitle";
import { useState } from "react";

export default function Awards() {
  const [year, setYear] = useState(2026);
  usePageTitle(YEAR_EVENTS[year].title);

  return (
    <>
      <Hero year={year} />
      <YearTabs year={year} onChange={setYear} />
      <AwardsSection key={year} year={year} />
    </>
  );
}
