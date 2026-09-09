import WorkArchive from "@/components/WorkArchive";
import { client } from "@/sanity/lib/client";
import { workProjectsQuery } from "@/sanity/lib/queries";
import { getIllustrationAssets } from "@/lib/getIllustrations";

export default async function WorkPage() {
  const projects = await client.fetch(workProjectsQuery);
  const illustrations = getIllustrationAssets();

  return <WorkArchive projects={projects} illustrations={illustrations} />;
}