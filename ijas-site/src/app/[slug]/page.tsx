import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pages } from "@/content/pages";
import PageHero from "@/components/blocks/PageHero";
import BlockRenderer from "@/components/blocks/BlockRenderer";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = pages[(await params).slug];
  return page ? { title: page.title, description: page.description } : {};
}

export default async function GenericPage({ params }: Props) {
  const page = pages[(await params).slug];
  if (!page) notFound();
  return (
    <>
      <PageHero {...page.hero} />
      <BlockRenderer blocks={page.blocks} />
    </>
  );
}