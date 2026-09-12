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
        "Noufan Muthiri is a Visualization Faculty, digital artist, creative educator, and entrepreneur from Kerala, India. He is the Founder of Muthiri Creative School and Muthiri Creative Consultancy, where he mentors aspiring artists, designers, and creative professionals while providing creative direction, branding, and visual communication solutions.",
        "With 8 years of teaching experience in art and design, and a Bachelor of Fine Arts (BFA) and Master of Fine Arts (MFA) in Applied Art, Noufan has dedicated his career to nurturing creativity, critical thinking, and professional excellence. His artistic practice is deeply rooted in the cultural landscape of the Malabar Mappila Muslim community, exploring Mappila culture, Sufi mysticism, and poetic visual narration through contemporary digital media. His research-driven works reinterpret themes of identity, migration, spirituality, memory, and cultural transformation.",
        "His artworks have been selected for the 52nd Kerala Government State Exhibition of Art, the National Art Camp (Akhi Camp), and the First International Kala Mela, Delhi. His new media digital artworks have also been featured at the NNC Art Gallery, London, reflecting his growing contribution to contemporary art and visual storytelling."
      ]
    }
  },
  contact: {
    email: "studio@muthiri.com",
    location: "London / Berlin",
    representedBy: "Art & Archives Ltd"
  },
  writing: {
    blogs: {
      title: "About Noufan Muthiri: Art, Identity & Spatial Narrative",
      subtitle: "A Reflective Monograph on Sufi Mysticism, Digital Storytelling, and 8 Years of Art Education",
      teaser: "An in-depth inquiry into Noufan Muthiri's artistic practice, exploring how Malabar Mappila culture, Sufi mysticism, and visual education intersect with contemporary digital media and spatial design.",
      chapters: [
        {
          id: "chapter-1",
          num: "Chapter I",
          title: "Introduction: Education & Creative Practice",
          content: `
            <p>Noufan Muthiri is a Visualization Faculty, digital artist, creative educator, and entrepreneur from Kerala, India. As the Founder of Muthiri Creative School and Muthiri Creative Consultancy, he mentors aspiring artists, designers, and creative professionals while providing high-level creative direction, branding, and visual communication solutions.</p>
            <p>With over 8 years of dedicated teaching experience in art and design, backed by a Bachelor of Fine Arts (BFA) and Master of Fine Arts (MFA) in Applied Art, Noufan has committed his career to fostering visual thinking, critical discourse, and artistic excellence across traditional and digital mediums.</p>
            <blockquote>
              "Visual education and creative practice are not distinct domains. They form a continuous dialogue between cultural memory, technical mastery, and spatial awareness."
            </blockquote>
          `
        },
        {
          id: "chapter-2",
          num: "Chapter II",
          title: "Cultural Heritage & Sufi Mysticism",
          content: `
            <p>Noufan's artistic practice is deeply rooted in the rich cultural landscape of the Malabar Mappila Muslim community. Through contemporary digital media, his work explores Mappila folklore, Sufi mysticism, and poetic visual narration.</p>
            <p>His research-driven projects reinterpret complex themes of identity, migration, spirituality, memory, and cultural transformation. By pairing historic community narratives with contemporary minimalist interfaces, he crafts digital spaces that honor spiritual heritage while challenging modern algorithmic visual standards.</p>
          `
        },
        {
          id: "chapter-3",
          num: "Chapter III",
          title: "Exhibitions, Recognition & Spatial Voids",
          content: `
            <p>His artworks have achieved wide recognition across premier state, national, and international art platforms. Noufan's works were selected for the 52nd Kerala Government State Exhibition of Art, the National Art Camp (Akhi Camp), and the First International Kala Mela in Delhi.</p>
            <p>Additionally, his new media digital artworks have been exhibited at the prestigious NNC Art Gallery in London, marking a significant milestone in his contribution to contemporary global digital art. Through his ongoing research into spatial voids, brutalist web aesthetics, and creative direction at Muthiri Creative Consultancy, he continues to shape new paradigms in visual culture.</p>
          `
        }
      ]
    }
  }
} as const;
