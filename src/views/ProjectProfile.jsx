"use client";

import PageHero from "@/components/PageHero";
import { displayAward, presenterLine, visibleAwards } from "@/data/projects";
import usePageTitle from "@/hooks/usePageTitle";
import { awardBand } from "@/lib/awardValue";
import Link from "next/link";

function formatAward(name) {
  const cleaned = displayAward(name);
  if (!cleaned || /^(silver|bronze)$/i.test(cleaned)) return "";
  return cleaned.replace(/\$\s*(?!\d+\.)(\d{1,3}(?:,\d{3})+|\d+)(?:\s*([kK]))?/g, (_, num, suffix) => {
    const amount = Number(num.replace(/,/g, "")) * (suffix ? 1000 : 1);
    return Number.isFinite(amount) ? `$${amount.toLocaleString("en-US")}` : _;
  });
}

function metaLine(project) {
  return [project.school, project.region, project.category, project.projectType].map((value) => String(value || "").trim()).filter(Boolean);
}

function awardRank(name) {
  if (/^gold$/i.test(name)) return { band: 9, sort: 0 };
  const ranked = awardBand(name);
  if (ranked) return ranked;
  if (/thermo fisher/i.test(name)) {
    if (/state/i.test(name) && !/region/i.test(name)) return { band: 3, sort: 0 };
    const region = name.match(/region\s*(\d+)/i);
    return { band: 3, sort: region ? Number(region[1]) : 80 };
  }
  return { band: 6, sort: 0 };
}

function orderedAwards(awards) {
  return visibleAwards(awards)
    .map(formatAward)
    .filter(Boolean)
    .map((name, index) => ({ name, index, ...awardRank(name) }))
    .sort((a, b) => a.band - b.band || a.sort - b.sort || a.name.localeCompare(b.name) || a.index - b.index);
}

function BackNav() {
  const className =
    "inline-flex items-center gap-2 rounded-md bg-[#D6EAF8] px-3 py-1.5 text-[14px] font-semibold text-ijas-navy transition-colors duration-200 hover:bg-[#c5dff3]";
  return (
    <nav aria-label="Back" className="flex flex-wrap gap-2">
      <Link href="/projects/" className={className}>
        <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
          <path fill="currentColor" d="M3 4h2v2H3V4zm4 0h10v2H7V4zM3 9h2v2H3V9zm4 0h10v2H7V9zM3 14h2v2H3v-2zm4 0h10v2H7v-2z" />
        </svg>
        Project Database
      </Link>
      <Link href="/awards-by-value/" className={className}>
        <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M6 2h8v1h2.5v3.2a3.2 3.2 0 0 1-2.4 3.1A5 5 0 0 1 11 12.8V16h3v2H6v-2h3v-3.2a5 5 0 0 1-3.1-3.5A3.2 3.2 0 0 1 3.5 6.2V3H6V2zm0 3H5v1.2c0 .7.4 1.3 1 1.6V5zm8 0v2.8c.6-.3 1-.9 1-1.6V5h-1z"
          />
        </svg>
        Awards
      </Link>
    </nav>
  );
}

export default function ProjectProfile({ project }) {
  usePageTitle(project.title);
  const presenters = presenterLine(project);
  const awards = orderedAwards(project.awards);
  const meta = metaLine(project);

  return (
    <>
      <PageHero title="Project Profile" />
      <article className="bg-white px-5 py-6 sm:px-8 md:py-8">
        <div className="mx-auto max-w-[1100px]">
          <div className="mt-4 rounded-md border border-[#75A8ED] bg-white px-5 py-5 sm:px-6">
            <h1 className="text-2xl font-bold leading-snug text-ijas-navy md:text-3xl">{project.title}</h1>
            {presenters ? <p className="mt-2 text-[14px] text-[#374151]">{presenters}</p> : null}
            {awards.length ? (
              <ul className="mt-3 flex list-none flex-col items-start gap-2">
                {awards.map((award) => (
                  <li
                    key={`${award.index}-${award.name}`}
                    className="rounded-full bg-[#D6EAF8] px-3 py-1 text-[16px] font-semibold leading-snug text-ijas-navy md:text-[18px]"
                  >
                    {award.name}
                  </li>
                ))}
              </ul>
            ) : null}
            {meta.length ? <p className="mt-3 text-[14px] text-[#374151]">{meta.join(" · ")}</p> : null}

            <section className="mt-6 max-w-[760px]">
              <h2 className="text-[20px] font-bold leading-snug text-ijas-navy md:text-[22px]">Abstract</h2>
              {project.abstract ? (
                <p className="mt-2 text-[16px] leading-relaxed text-[#374151]">{project.abstract}</p>
              ) : (
                <p className="mt-2 text-[14px] text-ijas-muted">Abstract coming soon.</p>
              )}
            </section>
          </div>

          <div className="mt-4">
            <BackNav />
          </div>
        </div>
      </article>
    </>
  );
}
