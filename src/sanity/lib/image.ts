import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "../env";


const builder = createImageUrlBuilder({
  projectId,
  dataset,
});

export function urlFor(source: any) {
  if (!source || (typeof source === "object" && !source.asset)) {
    return {
      width: () => ({ url: () => "/assets/hero-home.png" }),
      height: () => ({ url: () => "/assets/hero-home.png" }),
      url: () => "/assets/hero-home.png",
    } as any;
  }
  try {
    return builder.image(source);
  } catch {
    return {
      width: () => ({ url: () => "/assets/hero-home.png" }),
      height: () => ({ url: () => "/assets/hero-home.png" }),
      url: () => "/assets/hero-home.png",
    } as any;
  }
}