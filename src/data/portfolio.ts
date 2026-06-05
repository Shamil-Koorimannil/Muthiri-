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

export interface Dissertation {
  title: string;
  subtitle: string;
  teaser: string;
  author: string;
  citation: string;
  chapters: Chapter[];
  footnotes: Footnote[];
}

export interface Publication {
  id: string;
  title: string;
  journal: string;
  year: string;
  summary: string;
}

export interface Writing {
  dissertation: Dissertation;
  publications: Publication[];
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
    dissertation: {
      title: "The Architecture of Absence",
      subtitle: "Spatial Void as Creative Medium in Contemporary Art and Digital Aesthetics",
      teaser: "A comprehensive inquiry into Japanese negative space, mid-century musical silence, and how negative layouts act as an antidote to algorithmic attention tracking on the modern web.",
      author: "Muthiri",
      citation: "Muthiri. (2025). The Architecture of Absence: Spatial Void as Creative Medium. London: Royal College of Art Press.",
      chapters: [
        {
          id: "chapter-1",
          num: "Chapter I",
          title: "Introduction: Defining the Void",
          content: `
            <p>In the contemporary digital landscape, space is rarely empty. Every pixel is occupied, every scroll is tracked, and every second of attention is commodified. This thesis investigates the conceptual and spatial 'void' not as a lack of content, but as a deliberate creative medium<a href="#fn-1" class="citation-ref" id="fn-ref-1">1</a>.</p>
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
            <p>Web interfaces have evolved into uniform, highly optimized marketing machines. The 'SaaS landing page' archetype has stripped the digital environment of its experimental culture<a href="#fn-2" class="citation-ref" id="fn-ref-2">2</a>. This chapter analyses 'brutalist websites' and 'digital deserts'—spaces on the internet designed with zero user tracking, extreme layouts, and deliberate whitespace.</p>
            <p>Through visual analysis of net-art archives, we demonstrate how these digital deserts evoke feelings akin to standing inside an empty concrete gallery. They reject the commodified UX patterns in favor of visual friction, raw HTML structure, and intellectual distance.</p>
          `
        }
      ],
      footnotes: [
        { id: "fn-1", label: "1. Muthiri. Spatial Voids and Digital Overload, pp. 45-48. London Art Press, 2024.", refId: "fn-ref-1" },
        { id: "fn-2", label: "2. Sagmeister, Stefan. Beauty and the Bauhaus Archive, p. 112. Phaidon Press, 2019.", refId: "fn-ref-2" }
      ]
    },
    publications: [
      {
        id: "aesthetic-noise",
        title: "Aesthetic Noise: Glitch as Digital Craftsmanship",
        journal: "Journal of Contemporary Media Studies, Vol. 12",
        year: "2025",
        summary: "An analysis of intentional visual noise, film grain, and glitch artifacts in digital spaces as a search for organic tactile experience in flat, vector-based screen designs."
      },
      {
        id: "typographic-silence",
        title: "Typographic Silence: Negative Space in Editorial Font Systems",
        journal: "Design Monograph Series, Tate Press",
        year: "2024",
        summary: "A study on negative leading and spatial kerning in the works of Alex Trochut and contemporary fashion campaigns, formulating a grammar for silent typography."
      }
    ]
  }
} as const;
