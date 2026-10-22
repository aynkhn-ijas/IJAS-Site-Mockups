import { useMemo, useState } from "react";
import CategoryAccordion from "./CategoryAccordion";
import FilterBar from "./FilterBar";
import { YEAR_EVENTS } from "../data/years";

function hasEpic(project) {
  return project.awards.some((award) => /epic/i.test(award));
}

function hasOtherSpecial(project) {
  return project.unnamedSpecial || project.awards.some((award) => !/epic/i.test(award));
}

function matchesAwardType(project, type) {
  if (type === "epic") return hasEpic(project);
  if (type === "special") return hasOtherSpecial(project);
  if (type === "gold") return project.medal === "gold";
  return false;
}

function highlightFor(project, awardTypes) {
  const epicOn = awardTypes.includes("epic");
  const specialOn = awardTypes.includes("special");
  if (!epicOn && !specialOn) return null;
  if (epicOn && hasEpic(project)) return "epic";
  if (specialOn && hasOtherSpecial(project)) return "special";
  return null;
}

function sortProjects(projects) {
  return [...projects].sort((a, b) => a.students.localeCompare(b.students));
}

function placeProject(project) {
  const epicAwards = project.awards.filter((award) => /epic/i.test(award));
  const otherAwards = project.awards.filter((award) => !/epic/i.test(award));
  if (epicAwards.length > 0) {
    return { section: "epic", project: { ...project, awards: [...epicAwards, ...otherAwards], variant: "epic" } };
  }
  if (otherAwards.length > 0 || project.unnamedSpecial) {
    return { section: "special", project: { ...project, awards: otherAwards, variant: "special" } };
  }
  if (project.medal === "gold") return { section: "gold", project: { ...project, variant: "medal" } };
  return null;
}

function summaryLine(groups) {
  const parts = [];
  const epic = groups.epic.highSchool.length + groups.epic.middleSchool.length;
  const special = groups.special.highSchool.length + groups.special.middleSchool.length;
  const gold = groups.gold.highSchool.length + groups.gold.middleSchool.length;
  if (epic) parts.push(`${epic} EPIC${epic === 1 ? "" : "s"}`);
  if (special) parts.push(`${special} Special`);
  if (gold) parts.push(`${gold} Gold`);
  return parts.join(" · ");
}

function splitDivision(projects) {
  return {
    highSchool: projects.filter((project) => project.division === "highSchool"),
    middleSchool: projects.filter((project) => project.division === "middleSchool"),
  };
}

export default function AwardsSection({ year }) {
  const { awards: awardsData, categories } = YEAR_EVENTS[year];
  const [division, setDivision] = useState("all");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [awardTypes, setAwardTypes] = useState([]);
  const needle = query.trim().toLowerCase();
  const sourceCount = awardsData.reduce((sum, row) => sum + row.projects.length, 0);

  function toggleAward(type) {
    setAwardTypes((current) =>
      current.includes(type) ? current.filter((item) => item !== type) : [...current, type],
    );
  }

  const filteredRows = useMemo(() => {
    return awardsData
      .filter((row) => category === "all" || row.category === category)
      .map((row) => {
        const placed = { epic: [], special: [], gold: [] };
        sortProjects(
          row.projects.filter((project) => {
            if (division === "senior" && project.division !== "highSchool") return false;
            if (division === "junior" && project.division !== "middleSchool") return false;
            if (awardTypes.length > 0 && !awardTypes.some((type) => matchesAwardType(project, type))) return false;
            if (!needle) return true;
            return [project.title, project.students, project.school, row.category, ...project.awards]
              .filter(Boolean)
              .join("\n")
              .toLowerCase()
              .includes(needle);
          }),
        ).forEach((project) => {
          const placedProject = placeProject(project);
          if (!placedProject) return;
          placed[placedProject.section].push({
            ...placedProject.project,
            highlight: highlightFor(project, awardTypes),
          });
        });

        return {
          category: row.category,
          projectCount: placed.epic.length + placed.special.length + placed.gold.length,
          groups: {
            epic: splitDivision(placed.epic),
            special: splitDivision(placed.special),
            gold: splitDivision(placed.gold),
          },
        };
      })
      .filter((row) => row.projectCount > 0);
  }, [awardTypes, awardsData, category, division, needle]);

  const projectCount = filteredRows.reduce((sum, row) => sum + row.projectCount, 0);
  const specialCount = filteredRows.reduce((sum, row) => {
    const groups = row.groups;
    return (
      sum +
      groups.epic.highSchool.length +
      groups.epic.middleSchool.length +
      groups.special.highSchool.length +
      groups.special.middleSchool.length
    );
  }, 0);
  const forceOpen = needle.length > 0 || awardTypes.length > 0;

  return (
    <section id="awards" className="bg-white px-5 py-8 sm:px-8 md:py-10" aria-labelledby="awards-heading">
      <div className="mx-auto max-w-[1100px]">
        <h2 id="awards-heading" className="text-2xl font-bold text-ijas-navy md:text-3xl">
          Category Awards
        </h2>
        <p className="mt-2 max-w-[760px] text-[15px] leading-relaxed text-[#374151]">
          EPIC, special, and Gold award recipients from the {year} State Exposition.
        </p>

        <FilterBar
          division={division}
          onDivision={setDivision}
          query={query}
          onQuery={setQuery}
          category={category}
          onCategory={setCategory}
          categories={categories}
          awardTypes={awardTypes}
          onToggleAward={toggleAward}
          projectCount={projectCount}
          specialCount={specialCount}
        />

        <div className="mt-2">
          {sourceCount === 0 ? (
            <p className="py-10 text-[#374151]">No award records are listed for {year} yet.</p>
          ) : filteredRows.length === 0 ? (
            <p className="py-10 text-[#374151]">No projects match these filters.</p>
          ) : (
            filteredRows.map((row) => (
              <CategoryAccordion
                key={row.category}
                category={row.category}
                projectCount={row.projectCount}
                collapsedSummary={summaryLine(row.groups)}
                epicAwards={row.groups.epic}
                specialAwards={row.groups.special}
                goldWinners={row.groups.gold}
                forceOpen={forceOpen}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
