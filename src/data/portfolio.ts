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
  design: [
    {
      id: "transient-spaces",
      num: "DES // 01",
      title: "Transient Spaces",
      year: "2025",
      type: "Editorial Monograph",
      image: "/assets/design-1.png",
      client: "Städtische Galerie Berlin",
      role: "Lead Designer & Editor",
      medium: "Heavyweight Linen Cover, Matte Uncoated Paper",
      dimensions: "240 x 320 mm, 280 pages",
      headline: "Designing a physical archive for fleeting architectural interventions.",
      description: `
        <p>Transient Spaces is a comprehensive editorial monograph documenting temporary architecture installations across post-industrial Berlin. The publication is treated as a space itself, using asymmetrical grids and varying page widths to echo the raw structural boundaries of the documented exhibitions.</p>
        <p>Designed over a span of twelve months, the book utilizes a strict dual-column typographic system that shifts based on the physical texture of the materials described. In contrast to standard commercial monographs, the white space occupies over 65% of each page spread, creating a slow, meditative, and museum-like reading rhythm.</p>
      `,
      process: "The production process involved close collaboration with master printers, selecting a tactile coarse linen binding and three distinct uncoated paper stocks. We customized the layout margins using mathematical ratios derived from the blueprint coordinates of the original installations.",
      gallery: [
        { type: "col-8", img: "/assets/design-1.png", aspect: "aspect-wide" },
        { type: "col-4", img: "/assets/hero-home.png", aspect: "aspect-portrait" },
        { type: "col-6", img: "/assets/design-2.png", aspect: "aspect-square" },
        { type: "col-6", img: "/assets/writing-cover.png", aspect: "aspect-square" }
      ]
    },
    {
      id: "kinetic-identities",
      num: "DES // 02",
      title: "Kinetic Identities",
      year: "2024",
      type: "Brand Identity Monograph",
      image: "/assets/design-2.png",
      client: "Tate Modern (Co-Lab)",
      role: "Creative Director",
      medium: "Digital Design System & Brand Ephemera",
      dimensions: "Responsive Web Framework & Generative Typography",
      headline: "A dynamic branding system that evolves based on real-time crowd movement.",
      description: `
        <p>Kinetic Identities is a branding framework commissioned for Tate Modern's generative design exhibitions. The visual identity shifts, stretches, and morphs in response to visitor traffic density in the main gallery halls, captured by optical sensors and mapped to custom variable typeface weights.</p>
        <p>This project bridges the gap between structured corporate identities and generative art, proving that brand frameworks can behave like living organisms. The printed documentation translates this motion into freeze-frame typographic monographs using custom-developed interpolation software.</p>
      `,
      process: "We developed a custom JavaScript node wrapper that feeds spatial coordinates from webcam nodes into a variable font axis (specifically morphing font width and optical size). The resulting brand tokens are mathematically perfect yet visually chaotic and unpredictable.",
      gallery: [
        { type: "col-12", img: "/assets/design-2.png", aspect: "aspect-wide" },
        { type: "col-6", img: "/assets/design-1.png", aspect: "aspect-portrait" },
        { type: "col-6", img: "/assets/hero-home.png", aspect: "aspect-portrait" }
      ]
    }
  ],
  art: [
    {
      id: "digital-liminality",
      num: "ART // 01",
      title: "Digital Liminality",
      year: "2026",
      medium: "Generative Projections & Light Sculptures",
      image: "/assets/art-1.png",
      location: "Barbican Centre, London",
      dimensions: "Room-scale, Dimensions Variable",
      headline: "Exploring the threshold between physical space and infinite virtual voids.",
      description: `
        <p>Digital Liminality is an immersive installation featuring architectural light beams and generative code-driven soundscapes that explore structural emptiness. The room is left completely black, save for thin, horizontal laser projections that react to the sub-bass frequencies echoing in the space.</p>
        <p>Visitors are invited to sit or lie down, letting their vision adjust to the slow-moving planes of light. The work critiques the sensory overload of contemporary digital media, offering an alternative environment of extreme reduction, digital silence, and raw physical presence.</p>
      `,
      concept: "By stripping away colors, recognizable shapes, and interfaces, the installation forces a state of physical introspection. The architecture of the gallery itself becomes visible only through light scattering off microscopic dust particles, highlighting the poetry of emptiness."
    },
    {
      id: "shadow-architectures",
      num: "ART // 02",
      title: "Shadow Architectures",
      year: "2025",
      medium: "Tactile Concrete & Projective Shadows",
      image: "/assets/art-2.png",
      location: "König Galerie, Tokyo",
      dimensions: "4.2m x 3.6m x 2.2m",
      headline: "Sculptures that are only complete through the absence of light.",
      description: `
        <p>Shadow Architectures is a series of brutalist concrete blocks suspended from iron cables. Moving spotlights orbit the concrete forms, casting complex, distorted architectural shadows across the gallery walls.</p>
        <p>While the physical concrete remains static and heavy, the shadow projections are dynamic, light, and endlessly changing. This tension challenges the viewer's perception of permanence, architectural strength, and the creative weight of darkness.</p>
      `,
      concept: "The concrete serves merely as a stencil. The actual artwork is the shadow itself — a temporary drawing of pure darkness on a white canvas. This work pays homage to Tanizaki's 'In Praise of Shadows' and Japanese concepts of Ma."
    }
  ],
  about: {
    bio: {
      paragraphs: [
        "Noufan Muthiri is a Visualization Faculty, digital artist, creative educator, and entrepreneur from Kerala, India. He is the Founder of Muthiri Creative School and Muthiri Creative Consultancy, where he mentors aspiring artists, designers, and creative professionals while providing creative direction, branding, and visual communication solutions.",
        "With 8 years of teaching experience in art and design, and a Bachelor of Fine Arts (BFA) and Master of Fine Arts (MFA) in Applied Art, Noufan has dedicated his career to nurturing creativity, critical thinking, and professional excellence. His artistic practice is deeply rooted in the cultural landscape of the Malabar Mappila Muslim community, exploring Mappila culture, Sufi mysticism, and poetic visual narration through contemporary digital media. His research-driven works reinterpret themes of identity, migration, spirituality, memory, and cultural transformation.",
        "His artworks have been selected for the 52nd Kerala Government State Exhibition of Art, the National Art Camp (Akhi Camp), and the First International Kala Mela, Delhi. His new media digital artworks have also been featured at the NNC Art Gallery, London, reflecting his growing contribution to contemporary art and visual storytelling."
      ]
    },
    cv: [
      { year: "Featured", title: "NNC Art Gallery, London", desc: "New media digital artworks featured in contemporary art showcase.", loc: "London, UK" },
      { year: "Selected", title: "52nd Kerala Government State Exhibition of Art", desc: "Selected for state level exhibition of art.", loc: "Kerala, India" },
      { year: "Selected", title: "National Art Camp (Akhi Camp)", desc: "Selected and participated in Akhi Camp.", loc: "India" },
      { year: "Selected", title: "First International Kala Mela", desc: "Selected for international art showcase.", loc: "Delhi, India" },
      { year: "Degree", title: "Master of Fine Arts (MFA)", desc: "MFA in Applied Art.", loc: "India" },
      { year: "Degree", title: "Bachelor of Fine Arts (BFA)", desc: "BFA in Applied Art.", loc: "India" }
    ]
  },
  contact: {
    email: "info@muthiri.com",
    location: "Kerala, India",
    representedBy: "Muthiri Creative Consultancy"
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
