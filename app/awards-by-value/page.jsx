import { loadProjects } from "@/lib/liveProjects";
import AwardsByValue from "@/views/AwardsByValue";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Awards",
};

export default function Page() {
  return <AwardsByValue projects={loadProjects()} />;
}
