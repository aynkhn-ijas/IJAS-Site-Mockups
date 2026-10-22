import PageHero from "@/components/PageHero";
import SectionBar from "@/components/SectionBar";
import { boardSections } from "@/data/board";
import usePageTitle from "@/hooks/usePageTitle";

const BYLAWS_DRIVE =
  "https://drive.google.com/file/d/0B72J70LPcSv3REMzcmJLV2oyRG8/view?resourcekey=0-ph_cHsHXsc653qBYgN7IkQ";
const BYLAWS_PDF = (import.meta.env.BASE_URL + "docs/ijas-bylaws.pdf");

export default function About() {
  usePageTitle("About Us");

  return (
    <>
      <PageHero title="About Us" />
      <SectionBar>Our Mission</SectionBar>
      <div className="mx-auto max-w-[980px] px-6 py-10 text-center text-[16px] leading-[1.75] text-[#1f2937] md:px-8 md:py-12 md:text-[17px]">
        <p>
          The mission of the Illinois Junior Academy of Science is to present science as a{" "}
          <strong>rational observation</strong> and <strong>systematic investigation</strong> of natural
          phenomena; to stress the importance of <strong>critical thinking</strong> and{" "}
          <strong>logical reasoning</strong>; and to encourage students to view science as an
          interdisciplinary study applicable to society and its interactions with the environment.
        </p>
        <p className="mt-6">
          The Illinois Junior Academy of Science exists for the benefit of students in the state of
          Illinois, by <strong>guiding them</strong> and hosting several science expositions throughout
          Illinois, which culminate with the <strong>State Exposition</strong>. The process students
          follow when participating gives them <strong>insights into the problems faced by scientists</strong>{" "}
          and <strong>methodologies</strong> scientists use. It encourages students to{" "}
          <strong>find information</strong> concerning new investigations and discoveries in science. It
          allows students to get <strong>experience</strong> with scientific equipment, while also
          allowing them to develop their own investigation beyond the classroom and{" "}
          <strong>progress towards a career in STEM</strong>.
        </p>
      </div>
      <SectionBar>Organization By-Laws</SectionBar>
      <div className="bg-white px-6 py-10 text-center md:px-8 md:py-12">
        <p className="mx-auto max-w-[720px] text-[16px] leading-relaxed text-[#1f2937]">
          The Illinois Junior Academy of Science is governed by the Organization By-Laws adopted by
          the Board of Directors.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={BYLAWS_DRIVE}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center bg-ijas-navy px-6 text-sm font-medium text-white hover:bg-[#0a2f63]"
          >
            View the Organization By-Laws
          </a>
          <a
            href={BYLAWS_PDF}
            download="IJAS-Organization-By-Laws.pdf"
            className="inline-flex h-11 items-center justify-center border border-ijas-navy px-6 text-sm font-medium text-ijas-navy hover:bg-[#F8F9FA]"
          >
            Download PDF
          </a>
        </div>
        <a
          href={BYLAWS_DRIVE}
          target="_blank"
          rel="noreferrer"
          className="mx-auto mt-8 block max-w-[720px] overflow-hidden border border-[#d1d5db] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
        >
          <img
            src={import.meta.env.BASE_URL + "docs/ijas-bylaws-preview.png"}
            alt="IJAS Organization By-Laws, page 1 — By-Laws and Rules of Procedure of the Illinois Junior Academy of Science, Incorporated"
            className="w-full bg-white object-contain"
          />
        </a>
      </div>
      <div className="bg-white px-4 pb-10 md:px-8 md:pb-12">
        <div className="mx-auto max-w-[1180px] overflow-x-auto">
          <table className="board-table">
            <caption className="sr-only">IJAS Board of Directors and Corporate Board</caption>
            <thead>
              <tr>
                <th colSpan={5} className="title-row">
                  IJAS BOARD OF DIRECTORS &amp; CORPORATE BOARD
                </th>
              </tr>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Term Ends</th>
                <th>
                  Title <span className="font-normal">(Elected positions are bolded)</span>
                </th>
                <th>Primary E-Mail</th>
              </tr>
            </thead>
            <tbody>
              {boardSections.map((section) => (
                <BoardSection key={section.heading} section={section} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const electedTitles = new Set([
  "President",
  "Past President",
  "President Elect",
  "Treasurer",
  "Secretary",
  "Board Member at Large",
  "Regional Representative",
  "Student President",
  "Student Vice President",
]);

function BoardSection({ section }) {
  return (
    <>
      <tr className="section-row">
        <td colSpan={5}>{section.heading}</td>
      </tr>
      {section.rows.map((row, index) => (
        <tr key={`${section.heading}-${row[0]}-${row[3]}-${index}`}>
          <td>{row[0]}</td>
          <td>{row[1]}</td>
          <td>{row[2]}</td>
          <td>{electedTitles.has(row[3]) ? <strong>{row[3]}</strong> : row[3]}</td>
          <td>
            <a href={`mailto:${row[4]}`} className="text-ijas-navy underline">
              {row[4]}
            </a>
          </td>
        </tr>
      ))}
    </>
  );
}
