import Image from "next/image";
import type { Issue } from "@/content/types";
import SectionHeader from "./SectionHeader";
import Placeholder from "./Placeholder";
import ButtonLink from "./ButtonLink";

function IssueBody({ issue }: { issue: Issue }) {
  if (issue.pdf && issue.cover) {
    return (
      <a
        href={issue.pdf}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto mt-6 block w-full max-w-sm border border-ijas-ink/20 p-2 transition-shadow hover:shadow-lg"
      >
        <Image src={issue.cover} alt={`${issue.title} newsletter cover`} width={612} height={792} className="h-auto w-full" />
        <span className="sr-only">Open the {issue.title} newsletter (PDF)</span>
      </a>
    );
  }
  if (issue.pdf) {
    return (
      <div className="mt-6 flex justify-center">
        <ButtonLink label={`Read the ${issue.title} issue`} href={issue.pdf} />
      </div>
    );
  }
  return <Placeholder label={`${issue.title} — cover and PDF coming soon`} />;
}

export default function IssueList({ issues }: { issues: Issue[] }) {
  return (
    <>
      {issues.map((issue) => (
        <section key={issue.title}>
          <SectionHeader title={issue.title} />
          <IssueBody issue={issue} />
        </section>
      ))}
    </>
  );
}