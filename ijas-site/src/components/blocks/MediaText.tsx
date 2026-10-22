import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Link, Media } from "@/content/types";
import RichText from "./RichText";
import ButtonLink from "./ButtonLink";

type Props = {
  media: Media;
  markdown: string;
  mediaSide?: "left" | "right";
  mediaSize?: "small" | "medium";
  boxed?: boolean;
  textCentered?: boolean;
  button?: Link;
};

function MediaView({ media }: { media: Media }) {
  if (media.kind === "image") {
    return <Image src={media.src} alt={media.alt} width={800} height={570} className="h-auto w-full" />;
  }
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg bg-ijas-wash">
      <iframe
        src={media.src}
        title={media.title}
        className="h-full w-full"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default function MediaText({
  media,
  markdown,
  mediaSide = "left",
  mediaSize = "medium",
  boxed,
  textCentered = true,
  button,
}: Props) {
  return (
    <div
      className={cn(
        "mt-10 grid items-center gap-8",
        mediaSize === "small" ? "md:grid-cols-[1fr_4fr]" : "md:grid-cols-[2fr_3fr]",
        boxed && "rounded-2xl bg-ijas-light/25 p-6",
      )}
    >
      <div className={cn(mediaSide === "right" && "md:order-last")}>
        <MediaView media={media} />
      </div>
      <div>
        <RichText markdown={markdown} centered={textCentered} />
        {button && <ButtonLink {...button} className="mt-6 w-full" />}
      </div>
    </div>
  );
}