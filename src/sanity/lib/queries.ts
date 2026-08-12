import { groq } from "next-sanity";

export const projectsQuery = groq`
*[_type == "project"] | order(_createdAt desc){
  _id,
  title,
  slug,
  type,
  subCategory,
  description,
  coverImage,
  "pdfUrl": pdfFile.asset->url,
  year,
  featured
}
`;
export const projectQuery = groq`
*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  type,
  subCategory,
  description,
  coverImage,
  "pdfUrl": pdfFile.asset->url,
  year,
  services,
  gallery,
  featured
}
`;


export const workProjectsQuery = groq`
*[_type == "project"] | order(_createdAt desc){
  _id,
  title,
  slug,
  type,
  subCategory,
  coverImage,
  "pdfUrl": pdfFile.asset->url,
  year
}
`;

export const projectBySlugQuery = groq`
*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  type,
  subCategory,
  description,
  coverImage,
  "pdfUrl": pdfFile.asset->url,
  year,
  services,
  gallery,
  featured
}
`;


export const blogsQuery = groq`
*[_type == "blogs"][0]{
  _id,
  title,
  subtitle,
  teaser,
  coverImage,
  chapters[]{
    _key,
    id,
    num,
    title,
    content
  }
}
`;