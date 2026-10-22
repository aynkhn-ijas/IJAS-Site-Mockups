import { cn } from "@/lib/utils";

type Tone = "gray" | "green" | "navy" | "light";
type Props = { title: string; tone?: Tone };

const TONES: Record<Tone, string> = {
  gray: "bg-ijas-wash text-ijas-ink",
  green: "bg-ijas-green text-white",
  navy: "bg-ijas-navy text-white",
  light: "bg-ijas-light/30 text-ijas-ink",
};

export default function SectionHeader({ title, tone = "gray" }: Props) {
  return <h2 className={cn("mt-10 px-4 py-3 text-center text-2xl font-bold", TONES[tone])}>{title}</h2>;
}