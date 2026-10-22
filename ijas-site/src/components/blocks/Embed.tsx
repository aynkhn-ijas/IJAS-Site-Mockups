import { cn } from "@/lib/utils";

type Aspect = "video" | "document" | "app";
type Props = { src: string; title: string; caption?: string; aspect?: Aspect };

const WIDTH: Record<Aspect, string> = {
  video: "max-w-[720px]",
  document: "max-w-3xl",
  app: "max-w-none",
};

const FRAME: Record<Aspect, string> = {
  video: "aspect-video",
  document: "h-[75vh] border border-ijas-gray",
  app: "h-[85vh] max-h-[760px] border border-ijas-gray",
};

export default function Embed({ src, title, caption, aspect = "video" }: Props) {
  return (
    <figure className={cn("mx-auto mt-8", WIDTH[aspect])}>
      <div className={cn("overflow-hidden rounded-lg bg-ijas-wash", FRAME[aspect])}>
        <iframe src={src} title={title} className="h-full w-full" loading="lazy" allowFullScreen />
      </div>
      {caption && <figcaption className="mt-3 text-center font-semibold text-ijas-ink">{caption}</figcaption>}
    </figure>
  );
}