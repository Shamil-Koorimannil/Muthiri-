import WorkArchive from "@/components/WorkArchive";
import { client } from "@/sanity/lib/client";
import { workProjectsQuery } from "@/sanity/lib/queries";

export default async function WorkPage() {
  // const projects = await client.fetch(workProjectsQuery);
  const projects: any[] = [];

  return <WorkArchive projects={projects} />;
}