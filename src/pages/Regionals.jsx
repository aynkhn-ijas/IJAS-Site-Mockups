import PageContent from "@/components/PageContent";
import PageHero from "@/components/PageHero";
import TextLink from "@/components/TextLink";
import usePageTitle from "@/hooks/usePageTitle";

const regions = [
  {
    name: "Region 1 — Central",
    counties:
      "Fulton, Henderson, Henry, Knox, Marshall, Mason, McDonough, Menard, Mercer, Peoria, Rock Island, Stark, Tazewell, Warren, and Woodford Counties",
    chair: "Andrew Kluesner (IJASRegion1@ijas.org)",
    fair: "March 13, 2027 Poster & Paper Session — Western Illinois University (WIU) Student Union",
    fee: "$10 per project, invoiced February 16",
  },
  {
    name: "Region 2 — Chicago & Metropolitan Area Non-Public Schools",
    counties: "East of Route 83, North of Route 12/20, South of I-90 to O'Hare Field, West of Lake Michigan",
    chair: "John Bobek & Ali Uslu (IJASRegion2@ijas.org)",
    fair: "Paper: March 6, 2027 — Horizon Science Academy. Poster: March 13, 2027 — Northeastern Illinois University",
    fee: "See the Region 2 website",
    site: "http://www.ijasregion2.org/",
  },
  {
    name: "Region 3 — Chicago Public Schools (CPS)",
    counties: "Chicago Public Schools",
    chair: "Monique Murray & Lucy Young (IJASRegion3@ijas.org)",
    fair: "Paper: March 11, 2027 MSI · Poster: March 12, 2027 MSI · Awards: March 14, 2027 MSI",
    fee: "CPS schools are current IJAS members",
    site: "https://cpsstemfair.org/",
  },
  {
    name: "Region 4 — East Central",
    counties:
      "Champaign, DeWitt, Ford, Grundy, Iroquois, Kankakee, Livingston, Logan, Macon, McLean, Piatt, and Vermillion Counties",
    chair: "Emily Dawson (IJASRegion4@ijas.org)",
    fair: "To Be Announced — Location TBD",
    fee: "$10 per project, invoiced February 16",
  },
  {
    name: "Region 5 — Northern",
    counties:
      "Boone, Bureau, Carroll, DeKalb, Jo Daviess, Kane, Kendall, LaSalle, Lee, McHenry, Ogle, Putnam, Stephenson, Whiteside, and Winnebago Counties",
    chair: "Rachel Kurtz (IJASRegion5@ijas.org)",
    fair: "To Be Announced — Poster & Paper Session",
    fee: "$20 per project for poster and $20 per project for paper",
  },
  {
    name: "Region 6 — North Suburban",
    counties: "North half of Cook and DuPage Counties (Route 20 extended) and Lake County",
    chair: "Vacant; Paper Session Chair Christina Palffy (IJASRegion6@ijas.org)",
    fair: "Paper: March 3, 2027 Stevenson High School · Poster: March 6, 2027 Wheeling High School",
    fee: "$25 per student for poster and $25 per student for paper",
    site: "https://sites.google.com/ijas.org/ijas-region-6/about",
  },
  {
    name: "Region 7 — Southeastern",
    counties:
      "Clark, Clay, Coles, Crawford, Cumberland, Douglas, Edgar, Edwards, Effingham, Fayette, Jasper, Lawrence, Moultrie, Richland, Shelby, and Wabash Counties",
    chair: "Emily Dawson (IJASRegion7@ijas.org)",
    fair: "TBA — Ramsey Junior High School, 702 W. 6th Street, Ramsey, IL",
    fee: "$10 per project, invoiced February 16",
  },
  {
    name: "Region 8 — Southern",
    counties:
      "Alexander, Franklin, Gallatin, Hamilton, Hardin, Jackson, Jefferson, Johnson, Marion, Massac, Perry, Pope, Pulaski, Randolph, Saline, Union, Wayne, White, and Williamson Counties",
    chair: "Vina Castelli (IJASRegion8@ijas.org)",
    fair: "TBA — Poster & Paper Session — Southern Illinois University",
    fee: "See regional website and emails",
  },
  {
    name: "Region 9 — South Suburban",
    counties: "Southern half of Cook and DuPage Counties (Route 20 extended) and Will County",
    chair: "Jann Hawkins & Sue Ellen Gerchman (IJASRegion9@ijas.org)",
    fair: "Paper: March 6, 2027 North Central College · Poster: March 13, 2027 North Central College",
    fee: "See the regional website",
    site: "https://sites.google.com/ijas.org/ijas-region-9-science-fair/home",
  },
  {
    name: "Region 10 — Southwestern",
    counties:
      "Adams, Brown, Cass, Christian, Green, Hancock, Macoupin (north of Route 16), Montgomery (north of Route 16), Morgan, Pike, Sangamon, Schuyler, and Scott Counties",
    chair: "Kassie Henry (IJASRegion10@ijas.org)",
    fair: "March 20, 2027 — Lincoln Land Community College",
    fee: "See the regional website",
  },
  {
    name: "Region 11 — Joliet Area Non-Public Schools",
    counties: "Parochial and private schools in DuPage, Grundy, Kankakee, Kendall, and Will Counties",
    chair: "Kathy Winter & Annamarie Boyle (IJASRegion11@ijas.org)",
    fair: "March 12, 2027 — University of St. Francis",
    fee: "See the regional website",
    site: "https://jdstaregion11.weebly.com/",
  },
  {
    name: "Region 12 — Edwardsville Area",
    counties:
      "Bond, Calhoun, Clinton, Jersey, Macoupin (south of Route 16), Madison, Monroe, Montgomery (south of Route 16), St. Clair, and Washington Counties",
    chair: "Bev Friend and Christine Stewart (IJASRegion12@ijas.org)",
    fair: "March 6, 2027 — Southwestern Illinois College",
    fee: "$5 per project, invoiced to the member school or individual",
    site: "https://ijasregion12.weebly.com/",
  },
];

export default function Regionals() {
  usePageTitle("Regional Science Fairs");

  return (
    <>
      <PageHero title="IJAS Regional Fair Information" />
      <PageContent>
        <p className="callout">
          All students participating through a regional fair must submit their abstract and required
          safety/endorsement forms through zFairs. zFairs opens in December.
        </p>
        <p>
          All students wanting to participate in the IJAS State Exposition series must first compete
          and qualify at their Regional Fair. Students must compete in the region where they live or
          the region where the school or group is registered with IJAS. Membership information is
          under <TextLink to="/membership">Membership</TextLink>.
        </p>
        {regions.map((region) => (
          <section key={region.name}>
            <h2>{region.name}</h2>
            <p>{region.counties}</p>
            <p>Regional Chair — {region.chair}</p>
            <p>{region.fair}</p>
            <p>Regional registration fee: {region.fee}</p>
            {region.site ? (
              <p>
                <TextLink href={region.site} external>
                  Regional website
                </TextLink>
              </p>
            ) : null}
          </section>
        ))}
      </PageContent>
    </>
  );
}
