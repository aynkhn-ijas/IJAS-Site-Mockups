import Markdown from "react-markdown";
import { cn } from "@/lib/utils";

const BOX_TONES = {
  gray: "bg-ijas-wash",
  green: "bg-ijas-green/20",
  blue: "bg-ijas-light/25",
} as const;

type Props = {
  markdown: string;
  centered?: boolean;
  centerHeadings?: boolean;
  boxed?: boolean;
  tone?: "gray" | "green" | "blue";
  spacing?: "normal" | "loose";
};

export default function RichText({ markdown, centered, centerHeadings, boxed, tone = "gray", spacing = "normal" }: Props) {
  return (
    <div
      className={cn(
        "prose prose-neutral mt-6 max-w-none prose-a:text-ijas-navy prose-hr:border-ijas-ink/50",
        centered && "text-center",
        centerHeadings && "prose-headings:text-center",
        boxed && "rounded-lg px-6 py-5",
        boxed && BOX_TONES[tone],
        spacing === "loose" && "prose-p:my-8",
      )}
    >
      <Markdown>{markdown}</Markdown>
    </div>
  );
}