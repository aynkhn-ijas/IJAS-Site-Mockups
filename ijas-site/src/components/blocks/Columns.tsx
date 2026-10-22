import { cn } from "@/lib/utils";
import RichText from "./RichText";

type Props = { columns: string[]; centered?: boolean };

// Tailwind only ships classes it can see written out, so map counts to full class names.
const GRID: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

export default function Columns({ columns, centered = true }: Props) {
  return (
    <div className={cn("grid gap-x-10", GRID[columns.length])}>
      {columns.map((markdown, i) => (
        <RichText key={i} markdown={markdown} centered={centered} />
      ))}
    </div>
  );
}