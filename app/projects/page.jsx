import { loadProjects } from "@/lib/liveProjects";
import ProjectDatabase from "@/views/ProjectDatabase";

export const dynamic = "force-dynamic";

export default function Page() {
  return <ProjectDatabase projects={loadProjects()} />;
}
