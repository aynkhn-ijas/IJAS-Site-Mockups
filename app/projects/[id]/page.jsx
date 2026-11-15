import ProjectProfile from "@/views/ProjectProfile";
import { getProject, projects } from "@/data/projects";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = getProject(id);
  return { title: project?.title || "Project" };
}

export default async function Page({ params }) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();
  return <ProjectProfile project={project} />;
}
