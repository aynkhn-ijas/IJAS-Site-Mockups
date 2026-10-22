export type Link = { label: string; href: string };

export type Media =
  | { kind: "image"; src: string; alt: string }
  | { kind: "embed"; src: string; title: string };

export type Step = { title: string; markdown: string };

// pdf + cover → clickable cover; pdf only → button; neither → placeholder
export type Issue = { title: string; pdf?: string; cover?: string };

export type Sponsor = { name: string; logo?: string; href?: string };

export type Card = { title: string; href: string; image?: string; linkLabel?: string };

// Every block can carry an optional id so anchor links (#rubrics) can jump to it.
type BlockBase = { id?: string };

export type Block = BlockBase &
  (
    | { type: "sectionHeader"; title: string; tone?: "gray" | "green" | "navy" | "light" }
    | {
        type: "richText";
        markdown: string;
        centered?: boolean;
        centerHeadings?: boolean;
        boxed?: boolean;
        tone?: "gray" | "green" | "blue";
        spacing?: "normal" | "loose";
      }
    | {
        type: "mediaText";
        media: Media;
        markdown: string;
        mediaSide?: "left" | "right";
        mediaSize?: "small" | "medium";
        boxed?: boolean;
        textCentered?: boolean;
        button?: Link;
      }
    | { type: "anchorNav"; links: Link[] }
    | { type: "steps"; items: Step[] }
    | { type: "embed"; src: string; title: string; caption?: string; aspect?: "video" | "document" | "app" }
    | { type: "cardGrid"; cards: Card[] }
    | { type: "button"; label: string; href: string }
    | { type: "placeholder"; label: string }
    | { type: "issueList"; issues: Issue[] }
    | { type: "stripedSections"; sections: { id?: string; markdown: string }[] }
    | { type: "columns"; columns: string[]; centered?: boolean }
    | { type: "logoGrid"; title?: string; size?: "sm" | "md" | "lg"; items: Sponsor[] }
  );

export type Page = {
  slug: string;
  title: string;
  description?: string;
  hero: { title: string; subtitle?: string; image?: string };
  blocks: Block[];
};