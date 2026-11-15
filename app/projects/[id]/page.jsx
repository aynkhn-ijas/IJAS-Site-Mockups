import { getLiveProject, loadProjects } from "@/lib/liveProjects";
import ProjectProfile from "@/views/ProjectProfile";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export function generateStaticParams() {
  return loadProjects().map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = getLiveProject(id);
  return { title: project?.title || "Project" };
}

export default async function Page({ params }) {
  const { id } = await params;
  const project = getLiveProject(id);
  if (!project) notFound();
  return <ProjectProfile project={project} />;
}
