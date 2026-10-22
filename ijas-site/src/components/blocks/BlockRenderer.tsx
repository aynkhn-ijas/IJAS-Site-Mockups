import type { Block } from "@/content/types";
import SectionHeader from "./SectionHeader";
import RichText from "./RichText";
import MediaText from "./MediaText";
import AnchorNav from "./AnchorNav";
import Steps from "./Steps";
import Embed from "./Embed";
import CardGrid from "./CardGrid";
import Button from "./Button";
import Placeholder from "./Placeholder";
import IssueList from "./IssueList";
import LogoGrid from "./LogoGrid";
import Columns from "./Columns";
import StripedSections from "./StripedSections";

function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "sectionHeader": return <SectionHeader {...block} />;
    case "richText":      return <RichText {...block} />;
    case "mediaText":     return <MediaText {...block} />;
    case "anchorNav":     return <AnchorNav {...block} />;
    case "steps":         return <Steps {...block} />;
    case "embed":         return <Embed {...block} />;
    case "cardGrid":      return <CardGrid {...block} />;
    case "button":        return <Button {...block} />;
    case "placeholder":   return <Placeholder {...block} />;
    case "issueList":     return <IssueList {...block} />;
    case "logoGrid":      return <LogoGrid {...block} />;
    case "columns":       return <Columns {...block} />;
    case "stripedSections": return <StripedSections {...block} />;
    default:              return block satisfies never;
  }
}

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="mx-auto max-w-[1100px] px-5 pb-16">
      {blocks.map((block, i) => (
        // scroll-mt keeps anchored sections from hiding under the sticky header
        <div key={i} id={block.id} className="scroll-mt-28">
          <RenderBlock block={block} />
        </div>
      ))}
    </div>
  );
}