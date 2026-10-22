import Image from "next/image";
import { cn } from "@/lib/utils";
import RichText from "./RichText";

type Props = { image: string; alt: string; markdown: string; imageSide?: "left" | "right" };

export default function ImageText({ image, alt, markdown, imageSide = "left" }: Props) {
  return (
    <div className="mt-10 grid items-center gap-8 md:grid-cols-[2fr_3fr]">
      <Image
        src={image}
        alt={alt}
        width={800}
        height={570}
        className={cn("h-auto w-full", imageSide === "right" && "md:order-last")}
      />
      <RichText markdown={markdown} centered />
    </div>
  );
}