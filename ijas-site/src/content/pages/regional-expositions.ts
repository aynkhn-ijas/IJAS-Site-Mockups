import type { Page } from "../types";

// Each region has an id (region-1 … region-12), so /regional-expositions#region-6 jumps straight to it.
// TODO: fill in the "Region X Website" links.
export const regionalExpositions: Page = {
  slug: "regional-expositions",
  title: "Regional Fairs",
  description:
    "Find your IJAS region, regional chair contact, regional fair dates and locations, and registration fees for all 12 regions.",
  hero: { title: "IJAS Regional Fair Information" },
  blocks: [
    {
      type: "embed",
      aspect: "app",
      src: "https://aynkhn.com/ijas-map-demo/",
      title: "Find your IJAS region — interactive map",
    },
    {
      type: "richText",
      boxed: true,
      tone: "green",
      centered: true,
      markdown: `***Important Notice:** All students participating through a regional fair must submit their abstract and required safety/endorsement forms through zFairs. All registration information can be found in the relevant tabs on the zFairs home page. **zFairs will open in December.***`,
    },
    {
      type: "richText",
      centered: true,
      markdown: `**Regional Contact Information and Regional Fair Dates**

All students wanting to participate in the IJAS State Exposition series must first compete and qualify at their Regional Fair. Students must compete in the region where they live or the region where the school or group is registered with IJAS.

IJAS membership information is under the "[Membership](/membership)" tab on the IJAS website.`,
    },
    {
      type: "stripedSections",
      sections: [
        {
          id: "region-1",
          markdown: `### Region 1 – Central

Fulton, Henderson, Henry, Knox, Marshall, Mason, McDonough, Menard, Mercer, Peoria, Rock Island, Stark, Tazewell, Warren, and Woodford Counties

Regional Chair – Andrew Kluesner ([IJASRegion1@ijas.org](mailto:IJASRegion1@ijas.org))

**Regional Fair**\\
March 13, 2027 Poster & Paper Session – Western Illinois University (WIU) – Student Union

Regional Registration fee: $10 per project, this will be invoiced to the school member or individual member on Feb 16th.`,
        },
        {
          id: "region-2",
          markdown: `### Region 2 – Chicago & Metropolitan Area Non-Public Schools

East of Route 83, North of Route 12/20, South of I-90 to O'Hare Field, West of Lake Michigan

[Region 2 Website](#)\\
Regional Chair – John Bobek & Ali Uslu ([IJASRegion2@ijas.org](mailto:IJASRegion2@ijas.org))

**Regional Fair**\\
Paper Session: March 6, 2027 – Horizon Science Academy\\
Poster Session: March 13, 2027 – Northeastern Illinois University

Regional Registration fee: See the Region 2 Website for details and directions for Regional Membership`,
        },
        {
          id: "region-3",
          markdown: `### Region 3 – Chicago Public Schools (CPS)

[Region 3 Website](#)\\
Regional Chair – Monique Murray & Lucy Young ([IJASRegion3@ijas.org](mailto:IJASRegion3@ijas.org))

**Regional Fair**\\
Paper Session: March 11, 2027 – Museum of Science and Industry (MSI)\\
Poster Session: March 12, 2027 – Museum of Science and Industry (MSI)

Award Ceremony: March 14, 2027 – Museum of Science and Industry (MSI)

Region 3 Qualifiers will be notified at the Region 3 (City Fair)

All Region 3/CPS schools are current IJAS members – Students are also eligible to enter the IJAS USIL50 ISEF Virtual Fair`,
        },
        {
          id: "region-4",
          markdown: `### Region 4 – East Central

Champaign, DeWitt, Ford, Grundy, Iroquois, Kankakee, Livingston, Logan, Macon, McLean, Piatt, and Vermilion Counties

Regional Chair – Emily Dawson ([IJASRegion4@ijas.org](mailto:IJASRegion4@ijas.org))\\
**Regional Fair** – To Be Announced – Location TBD

Regional Registration fee: $10 per project, this will be invoiced to the school member or individual member on Feb 16th.`,
        },
        {
          id: "region-5",
          markdown: `### Region 5 – Northern

Boone, Bureau, Carroll, DeKalb, Jo Daviess, Kane, Kendall, LaSalle, Lee, McHenry, Ogle, Putnam, Stephenson, Whiteside, and Winnebago Counties

Regional Chair – Rachel Kurtz ([IJASRegion5@ijas.org](mailto:IJASRegion5@ijas.org))

**Regional Fair**\\
To Be Announced – Poster & Paper Session – TBA

Regional Registration fee: $20 per project for poster session and $20 per project for paper session, this will be invoiced to the school member or individual member on Feb 16th.`,
        },
        {
          id: "region-6",
          markdown: `### Region 6 – North Suburban

North Half of Cook and DuPage Counties (Route 20 extended is the dividing line), and Lake County

[Region 6 Website](#)\\
Regional Chair – Vacant (email [emily.dawson@ijas.org](mailto:emily.dawson@ijas.org) if interested)\\
Paper Session Chair – Christina Palffy\\
[IJASRegion6@ijas.org](mailto:IJASRegion6@ijas.org)

**Regional Fair**\\
Paper Session: March 3, 2027 – Stevenson High School\\
Poster Session: March 6, 2027 – Wheeling High School

Regional Registration fee: $25 per STUDENT for poster session and $25 per STUDENT for paper session, this will be invoiced to the school member or individual member on Feb 16th.`,
        },
        {
          id: "region-7",
          markdown: `### Region 7 – Southeastern

Clark, Clay, Coles, Crawford, Cumberland, Douglas, Edgar, Edwards, Effingham, Fayette, Jasper, Lawrence, Moultrie, Richland, Shelby, and Wabash Counties

Regional Chair – Emily Dawson ([IJASRegion7@ijas.org](mailto:IJASRegion7@ijas.org))

**Regional Fair**\\
To Be Announced – Poster and Paper Session\\
Ramsey Junior High School – 4–7 pm\\
702 W. 6th Street, Ramsey, IL

Regional Registration fee: $10 per project, this will be invoiced to the school member or individual member on Feb 16th.`,
        },
        {
          id: "region-8",
          markdown: `### Region 8 – Southern

Alexander, Franklin, Gallatin, Hamilton, Hardin, Jackson, Jefferson, Johnson, Marion, Massac, Perry, Pope, Pulaski, Randolph, Saline, Union, Wayne, White, and Williamson Counties

Regional Chair – Vina Castelli ([IJASRegion8@ijas.org](mailto:IJASRegion8@ijas.org))

**Regional Fair**\\
To Be Announced – Poster & Paper Session – Southern Illinois University

Regional Registration fee: Please see regional website and/or regional emails for details`,
        },
        {
          id: "region-9",
          markdown: `### Region 9 – South Suburban

Southern Half of Cook and DuPage Counties (Route 20 Extended is the dividing line) and Will County

[Region 9 Website](#)\\
Regional Chair – Jann Hawkins & Sue Ellen Gerchman ([IJASRegion9@ijas.org](mailto:IJASRegion9@ijas.org))

**Regional Fair**\\
Paper Session – March 6, 2027 – North Central College\\
Poster Session – March 13, 2027 – North Central College

Regional Registration fee: Please refer to the regional website for fees and payment instructions`,
        },
        {
          id: "region-10",
          markdown: `### Region 10 – Southwestern

Adams, Brown, Cass, Christian, Greene, Hancock, Macoupin (North of Route 16), Montgomery (North of Route 16), Morgan, Pike, Sangamon, Schuyler, and Scott Counties

Regional Chair – Kassie Henry ([IJASRegion10@ijas.org](mailto:IJASRegion10@ijas.org))

**Regional Fair**\\
March 20, 2027 – Lincoln Land Community College

Regional Registration fee: Please refer to the regional website for fees and payment instructions`,
        },
        {
          id: "region-11",
          markdown: `### Region 11 – Joliet Area Non-Public Schools

Parochial and Private Schools in DuPage, Grundy, Kankakee, Kendall, and Will Counties (including the Diocese of Joliet schools)

[Region 11 Website](#)\\
Regional Chair – Kathy Winter & Annamarie Boyle ([IJASRegion11@ijas.org](mailto:IJASRegion11@ijas.org))

**Regional Fair**\\
March 12, 2027 – University of St. Francis

Regional Registration fee: Please refer to the regional website for fees and payment instructions`,
        },
        {
          id: "region-12",
          markdown: `### Region 12 – Edwardsville Area

Bond, Calhoun, Clinton, Jersey, Macoupin (South of Route 16), Madison, Monroe, Montgomery (South of Route 16), St. Clair, and Washington Counties

[Region 12 Website](#)\\
Regional Chair – Bev Friend and Christine Stewart ([IJASRegion12@ijas.org](mailto:IJASRegion12@ijas.org))

**Regional Fair**\\
March 6, 2027 – Southwestern Illinois College

Regional Registration fee: $5 per project and will be invoiced to the member school or the individual member.`,
        },
      ],
    },
  ],
};