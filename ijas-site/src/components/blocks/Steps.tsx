import Markdown from "react-markdown";
import type { Step } from "@/content/types";

export default function Steps({ items }: { items: Step[] }) {
  return (
    <ol className="mt-6 divide-y divide-ijas-gray">
      {items.map((step, i) => (
        <li key={step.title} className="flex items-start gap-5 py-5">
          <div className="flex w-16 shrink-0 flex-col items-center rounded-md bg-ijas-light/30 py-2 text-ijas-navy">
            <span className="text-xs">Step</span>
            <span className="text-3xl font-medium leading-none">{String(i + 1).padStart(2, "0")}</span>
          </div>
          <div>
            <h3 className="text-2xl font-light text-ijas-ink">{step.title}</h3>
            <div className="prose prose-sm prose-neutral mt-1 max-w-none prose-a:text-ijas-navy prose-p:my-1">
              <Markdown>{step.markdown}</Markdown>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}