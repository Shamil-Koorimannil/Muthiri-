export interface DesignProject {
  id: string;
  num: string;
  title: string;
  year: string;
  type: string;
  image: string;
  client: string;
  role: string;
  medium: string;
  dimensions: string;
  headline: string;
  description: string;
  process: string;
  gallery: { type: string; img: string; aspect: string }[];
}

export interface ArtProject {
  id: string;
  num: string;
  title: string;
  year: string;
  medium: string;
  image: string;
  location: string;
  dimensions: string;
  headline: string;
  description: string;
  concept: string;
}

export interface BioItem {
  paragraphs: string[];
}

export interface CVItem {
  year: string;
  title: string;
  desc: string;
  loc: string;
}

export interface ContactInfo {
  email: string;
  location: string;
  representedBy: string;
}

export interface About {
  bio: BioItem;
  cv: CVItem[];
}

export interface Chapter {
  id: string;
  num: string;
  title: string;
  content: string;
}

export interface Footnote {
  id: string;
  label: string;
  refId: string;
}

export interface Blog {
  title: string;
  subtitle: string;
  teaser: string;
  chapters: Chapter[];
}

export interface Writing {
  blogs: Blog;
}

export const portfolioDB = {
  design: [] as DesignProject[],
  art: [] as ArtProject[],
  about: {
    bio: {
      paragraphs: [
        "Muthiri (b. 1996) is a designer, digital media artist, and design theorist working at the intersection of print monographs, software art, and academic research. She holds an MA with Distinction in Visual Communication from the Royal College of Art, London.",
        "Her practice critiques our hyper-accelerated digital landscape. Using the medium of the 'void'—empty pages, dark code, low auditory frequencies, and brutalist layouts—she constructs monuments of structural silence. She consults with global cultural institutions, design agencies, and publication firms who seek to design meaningful archival artifacts."
      ]
    },
    cv: [
      { year: "2026", title: "Digital Liminality (Solo Exhibition)", desc: "Curated projection sculpture installations examining mathematical voids.", loc: "Barbican, London" },
      { year: "2025", title: "MA in Visual Communication", desc: "Royal College of Art, London — Thesis on Spatial Negative Voids.", loc: "RCA, London" },
      { year: "2025", title: "Shadow Architectures (Group Show)", desc: "Exhibition exploring structural cast shadows on raw concrete blocks.", loc: "König Galerie, Tokyo" },
      { year: "2024", title: "Tate Generative Brand Co-Lab", desc: "Variable typographic system adapting dynamically to visitor traffic.", loc: "Tate Modern, London" }
    ]
  },
  contact: {
    email: "studio@muthiri.com",
    location: "London / Berlin",
    representedBy: "Art & Archives Ltd"
  },
  writing: {
    blogs: {
      title: "The Architecture of Absence",
      subtitle: "Spatial Void as Creative Medium in Contemporary Art and Digital Aesthetics",
      teaser: "A comprehensive inquiry into Japanese negative space, mid-century musical silence, and how negative layouts act as an antidote to algorithmic attention tracking on the modern web.",
      chapters: [
        {
          id: "chapter-1",
          num: "Chapter I",
          title: "Introduction: Defining the Void",
          content: `
            <p>In the contemporary digital landscape, space is rarely empty. Every pixel is occupied, every scroll is tracked, and every second of attention is commodified. This thesis investigates the conceptual and spatial 'void' not as a lack of content, but as a deliberate creative medium.</p>
            <p>From the architectural concept of Japanese <em>Ma</em> (間)—which translates to 'negative space' or 'the silence between notes'—to the minimal soundscapes of John Cage, emptiness has long functioned as a structural container. This chapter establishes a theoretical framework that connects physical minimalist sculpture with emerging digital structures of silence.</p>
            <blockquote>
              "Empty space is not an absence. It is a presence that demands observation, a clearing in which thought can finally crystallize."
            </blockquote>
            <p>By tracing the genealogy of empty space from mid-century minimalism to current web-art practices, we can understand how digital voids counteract the overwhelming weight of modern algorithmic interfaces. Rather than treating white space as a placeholder for content, we must analyze it as the content itself.</p>
          `
        },
        {
          id: "chapter-2",
          num: "Chapter II",
          title: "Brutalist Webs & Digital Deserts",
          content: `
            <p>Web interfaces have evolved into uniform, highly optimized marketing machines. The 'SaaS landing page' archetype has stripped the digital environment of its experimental culture. This chapter analyses 'brutalist websites' and 'digital deserts'—spaces on the internet designed with zero user tracking, extreme layouts, and deliberate whitespace.</p>
            <p>Through visual analysis of net-art archives, we demonstrate how these digital deserts evoke feelings akin to standing inside an empty concrete gallery. They reject the commodified UX patterns in favor of visual friction, raw HTML structure, and intellectual distance.</p>
          `
        }
      ]
    }
  }
} as const;
