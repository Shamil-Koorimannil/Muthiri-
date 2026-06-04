/* ==========================================================================
   Portfolio Logic Engine & Single Page Application Controller
   ========================================================================== */

// --- Content Database ---
const PORTFOLIO_DB = {
  design: [
    {
      id: "transient-spaces",
      num: "DES // 01",
      title: "Transient Spaces",
      year: "2025",
      type: "Editorial Monograph",
      image: "assets/design-1.png",
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
        { type: "col-8", img: "assets/design-1.png", aspect: "aspect-wide" },
        { type: "col-4", img: "assets/hero-home.png", aspect: "aspect-portrait" },
        { type: "col-6", img: "assets/design-2.png", aspect: "aspect-square" },
        { type: "col-6", img: "assets/writing-cover.png", aspect: "aspect-square" }
      ]
    },
    {
      id: "kinetic-identities",
      num: "DES // 02",
      title: "Kinetic Identities",
      year: "2024",
      type: "Brand Identity Monograph",
      image: "assets/design-2.png",
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
        { type: "col-12", img: "assets/design-2.png", aspect: "aspect-wide" },
        { type: "col-6", img: "assets/design-1.png", aspect: "aspect-portrait" },
        { type: "col-6", img: "assets/hero-home.png", aspect: "aspect-portrait" }
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
      image: "assets/art-1.png",
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
      image: "assets/art-2.png",
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
  writing: {
    dissertation: {
      title: "The Architecture of Absence",
      subtitle: "Spatial Void as Creative Medium in Contemporary Art and Digital Aesthetics",
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
};

// --- Exhibition Sound System (Generative Gallery Hum) ---
let audioCtx = null;
let droneOsc1 = null;
let droneOsc2 = null;
let filterNode = null;
let gainNode = null;
let lfoNode = null;
let soundPlaying = false;

function initSound() {
  if (audioCtx) return;

  // Create audio context
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  
  // Oscillator 1: Deep low drone
  droneOsc1 = audioCtx.createOscillator();
  droneOsc1.type = 'sine';
  droneOsc1.frequency.value = 55; // A1 note - low drone
  
  // Oscillator 2: Slightly detuned to create organic beating
  droneOsc2 = audioCtx.createOscillator();
  droneOsc2.type = 'triangle';
  droneOsc2.frequency.value = 55.3; // detuned
  
  // Low-pass filter to make it a warm, dark background hum
  filterNode = audioCtx.createBiquadFilter();
  filterNode.type = 'lowpass';
  filterNode.frequency.value = 110;
  filterNode.Q.value = 1;

  // LFO (Low Frequency Oscillator) to modulate filter cutoff - makes the sound feel organic and drifting
  lfoNode = audioCtx.createOscillator();
  lfoNode.type = 'sine';
  lfoNode.frequency.value = 0.08; // very slow, 12 seconds per cycle
  
  const lfoGain = audioCtx.createGain();
  lfoGain.gain.value = 30; // modulate by 30Hz

  // Gain node for volume control (soft, background level)
  gainNode = audioCtx.createGain();
  gainNode.gain.value = 0; // start silent

  // Connections
  lfoNode.connect(lfoGain);
  lfoGain.connect(filterNode.frequency); // modulate filter frequency
  
  droneOsc1.connect(filterNode);
  droneOsc2.connect(filterNode);
  
  filterNode.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  // Start oscillators
  droneOsc1.start();
  droneOsc2.start();
  lfoNode.start();
}

function toggleSound() {
  const soundBtn = document.getElementById('sound-btn');
  if (!soundBtn) return;
  
  if (!audioCtx) {
    initSound();
  }
  
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  
  if (!soundPlaying) {
    // Fade in
    gainNode.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 1.5);
    soundBtn.classList.add('playing');
    soundBtn.querySelector('.sound-label').textContent = 'SOUND ON';
    soundPlaying = true;
  } else {
    // Fade out
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.0);
    soundBtn.classList.remove('playing');
    soundBtn.querySelector('.sound-label').textContent = 'SOUND OFF';
    soundPlaying = false;
  }
}

// --- Custom Mouse Cursor Engine ---
const cursor = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  targetX: window.innerWidth / 2,
  targetY: window.innerHeight / 2,
  speed: 0.12, // Lerp speed for smooth delay
  dot: null,
  ring: null,

  init() {
    this.dot = document.querySelector('.cursor-dot');
    this.ring = document.querySelector('.cursor-ring');
    
    window.addEventListener('mousemove', (e) => {
      this.targetX = e.clientX;
      this.targetY = e.clientY;
      
      // Update variables for CSS tracking (used in mix blend view trigger)
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    this.animate();
    this.setupHoverListeners();
  },

  animate() {
    // Lerp (Linear Interpolation) formula: Current + (Target - Current) * Speed
    this.x += (this.targetX - this.x) * this.speed;
    this.y += (this.targetY - this.y) * this.speed;

    if (this.dot) {
      this.dot.style.transform = `translate3d(${this.targetX}px, ${this.targetY}px, 0) translate(-50%, -50%)`;
    }
    if (this.ring) {
      this.ring.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) translate(-50%, -50%)`;
    }

    requestAnimationFrame(() => this.animate());
  },

  setupHoverListeners() {
    document.addEventListener('mouseover', (e) => {
      // Find closest link or hover trigger
      const trigger = e.target.closest('.hover-trigger') || e.target.closest('a') || e.target.closest('button');
      
      if (trigger) {
        document.body.classList.add('cursor-hover');
        
        // Custom project card view triggers
        if (trigger.classList.contains('featured-card') || trigger.classList.contains('design-project-item') || trigger.classList.contains('art-project-item')) {
          document.body.classList.add('cursor-view-project');
        }
      }
    });

    document.addEventListener('mouseout', (e) => {
      const trigger = e.target.closest('.hover-trigger') || e.target.closest('a') || e.target.closest('button');
      if (trigger) {
        document.body.classList.remove('cursor-hover');
        document.body.classList.remove('cursor-view-project');
      }
    });
  }
};

// --- Scroll & Text Reveal Observers ---
function initScrollAnimations() {
  const options = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once triggered to make it cleaner and lighter
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // Grab revealable text wrappers and fade ins
  document.querySelectorAll('.reveal-text, .fade-in, .hero-image').forEach(el => {
    observer.observe(el);
  });
}

// --- Dynamic Parallax Effect on Hero and Large Images ---
function initParallax() {
  window.addEventListener('mousemove', (e) => {
    const heroImage = document.querySelector('.hero-image');
    if (!heroImage) return;

    // Shift image in opposite direction of cursor movement by tiny factor
    const xOffset = (window.innerWidth / 2 - e.clientX) * 0.03;
    const yOffset = (window.innerHeight / 2 - e.clientY) * 0.03;

    heroImage.style.transform = `scale(1.1) translate(${xOffset}px, ${yOffset}px)`;
  });
}

// --- Form Submissions simulated realistically ---
function setupContactForm() {
  const form = document.querySelector('.contact-form');
  const feedback = document.querySelector('.form-feedback');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.submit-btn');
    const oldText = btn.textContent;
    btn.disabled = true;
    btn.textContent = "TRANSMITTING...";
    
    // Simulate delay
    setTimeout(() => {
      btn.textContent = "SUCCESSFULLY SENT";
      feedback.textContent = "Message sent. We will respond within 48 hours.";
      feedback.classList.add('active');
      form.reset();

      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = oldText;
        feedback.classList.remove('active');
      }, 5000);
    }, 1500);
  });
}

// --- Single Page Application Routing ---
const routes = {
  "/": renderHome,
  "/work": renderWorkArchive,
  "/work/design/:id": renderDesignDetail,
  "/work/art/:id": renderArtDetail,
  "/writing": renderWritingArchive,
  "/writing/dissertation": renderDissertation,
  "/about": renderAbout,
  "/contact": renderContact
};

// Main routing controller
function handleRouting() {
  const path = window.location.hash.slice(1) || "/";
  let targetRoute = routes[path];
  let params = {};

  // Check routes with parameters (e.g. /work/design/:id)
  if (!targetRoute) {
    for (const routeKey in routes) {
      if (routeKey.includes(':')) {
        const routeRegex = new RegExp('^' + routeKey.replace(/:[^\s/]+/g, '([\\w-]+)') + '$');
        const match = path.match(routeRegex);
        if (match) {
          targetRoute = routes[routeKey];
          // Extracted ID parameter
          params.id = match[1];
          break;
        }
      }
    }
  }

  // Fallback to Home if route not found
  if (!targetRoute) {
    targetRoute = renderHome;
  }

  // Trigger page transition curtain
  const curtain = document.querySelector('.transition-curtain');
  curtain.classList.remove('exit');
  curtain.classList.add('active');

  // Load page template into mount point after curtain is closed
  setTimeout(() => {
    const appContent = document.getElementById('app-content');
    
    // Render content
    appContent.innerHTML = targetRoute(params);
    
    // Scroll window back to top
    window.scrollTo(0, 0);

    // Update active nav links
    updateActiveNav(path);

    // Trigger curtain exit
    curtain.classList.remove('active');
    curtain.classList.add('exit');

    // Re-initialize dynamic bindings and animations
    initScrollAnimations();
    initParallax();
    setupContactForm();
    cursor.setupHoverListeners();

  }, 800); // Wait 800ms for slide up transition
}

function updateActiveNav(path) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const dataLink = link.getAttribute('data-link');
    // If the hash starts with #/work, activate the Work tab, etc.
    if (path.startsWith('/work') && dataLink === 'work') {
      link.classList.add('active');
    } else if (path.startsWith('/writing') && dataLink === 'writing') {
      link.classList.add('active');
    } else if (path.startsWith('/about') && dataLink === 'about') {
      link.classList.add('active');
    } else if (path.startsWith('/contact') && dataLink === 'contact') {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// --- Route Template Renderers ---

function renderHome() {
  return `
    <section class="home-page">
      <div class="home-hero">
        <div class="hero-headline-container">
          <span class="hero-subtitle reveal-wrapper">
            <span class="reveal-text">London / Berlin — Est. 2020</span>
          </span>
          <h1 class="hero-title reveal-wrapper">
            <span class="reveal-text">
              Muthiri is a <em>multidisciplinary</em> creative designing physical archives & generative art.
            </span>
          </h1>
        </div>
        <div class="hero-visual-frame fade-in">
          <img src="assets/hero-home.png" alt="Muthiri Art Installation" class="hero-image">
        </div>
      </div>

      <div class="home-editorial-split fade-in">
        <div class="editorial-left">
          THE ART OF NEGATIVE SPACE.
        </div>
        <div class="editorial-right">
          <p class="editorial-text">
            Bridging the gap between strict rational brand systems, digital spatial design, and conceptual art. Working with leading museums and luxury publications to construct visual monuments of silence.
          </p>
          <a href="#/about" class="editorial-link-btn hover-trigger">
            <span>Discover the Practice</span>
            <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 6H22M22 6L17 1M22 6L17 11" stroke="currentColor" stroke-width="1.5"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Featured Projects Slider -->
      <div class="home-featured-scroller fade-in">
        <div class="featured-header-block">
          <span class="featured-label">Curated works</span>
          <h3>Selected Exhibitions & Designs</h3>
        </div>
        
        <a href="#/work/design/transient-spaces" class="featured-card hover-trigger">
          <div class="card-image-wrap">
            <img src="assets/design-1.png" alt="Transient Spaces Monograph">
          </div>
          <div class="card-meta">
            <span class="card-tag">DESIGN ARCHIVE</span>
            <span class="card-num">01 / 02</span>
          </div>
          <h4 class="card-title">Transient Spaces Monograph</h4>
        </a>

        <a href="#/work/art/digital-liminality" class="featured-card hover-trigger">
          <div class="card-image-wrap">
            <img src="assets/art-1.png" alt="Digital Liminality Installation">
          </div>
          <div class="card-meta">
            <span class="card-tag">ART ARCHIVE</span>
            <span class="card-num">02 / 02</span>
          </div>
          <h4 class="card-title">Digital Liminality (Barbican)</h4>
        </a>
      </div>
    </section>
  `;
}

function renderWorkArchive() {
  // Check if we are currently showing design or art (uses localStorage or simple class toggle)
  const lastTab = localStorage.getItem('work_archive_tab') || 'design';
  
  setTimeout(() => {
    // Re-bind click handlers for toggle button once page is inserted
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = e.target.getAttribute('data-tab');
        localStorage.setItem('work_archive_tab', type);
        
        // Redraw container list
        document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        const container = document.getElementById('work-list-render');
        if (type === 'design') {
          container.innerHTML = getDesignGrid();
        } else {
          container.innerHTML = getArtGrid();
        }
        initScrollAnimations();
        cursor.setupHoverListeners();
      });
    });
  }, 100);

  function getDesignGrid() {
    return `
      <div class="design-archive-grid fade-in active">
        ${PORTFOLIO_DB.design.map(p => `
          <a href="#/work/design/${p.id}" class="design-project-item hover-trigger">
            <div class="design-img-frame">
              <img src="${p.image}" alt="${p.title}">
            </div>
            <div class="design-project-info">
              <div>
                <h3 class="design-proj-title">${p.title}</h3>
                <span class="design-proj-type">${p.type}</span>
              </div>
              <div class="design-proj-meta">
                <span class="design-proj-num">${p.num}</span>
                <span class="design-proj-year">${p.year}</span>
              </div>
            </div>
          </a>
        `).join('')}
      </div>
    `;
  }

  function getArtGrid() {
    return `
      <div class="art-archive-grid fade-in active">
        ${PORTFOLIO_DB.art.map(p => `
          <a href="#/work/art/${p.id}" class="art-project-item hover-trigger">
            <div class="art-img-frame">
              <img src="${p.image}" alt="${p.title}">
            </div>
            <div class="art-project-info">
              <h3 class="art-proj-title">${p.title}</h3>
              <span class="art-proj-medium">${p.medium}</span>
            </div>
          </a>
        `).join('')}
      </div>
    `;
  }

  return `
    <section class="work-page">
      <div class="archive-intro">
        <div class="archive-title-wrap">
          <h1 class="reveal-wrapper"><span class="reveal-text">WORK ARCHIVE</span></h1>
        </div>
        <div class="archive-toggle fade-in">
          <button class="toggle-btn hover-trigger ${lastTab === 'design' ? 'active' : ''}" data-tab="design">Design</button>
          <button class="toggle-btn hover-trigger ${lastTab === 'art' ? 'active' : ''}" data-tab="art">Art</button>
        </div>
      </div>

      <div class="archive-container" id="work-list-render">
        ${lastTab === 'design' ? getDesignGrid() : getArtGrid()}
      </div>
    </section>
  `;
}

function renderDesignDetail(params) {
  const project = PORTFOLIO_DB.design.find(p => p.id === params.id) || PORTFOLIO_DB.design[0];
  
  // Find next project
  const index = PORTFOLIO_DB.design.findIndex(p => p.id === project.id);
  const nextProj = PORTFOLIO_DB.design[(index + 1) % PORTFOLIO_DB.design.length];

  return `
    <section class="project-detail-page">
      <div class="monograph-header">
        <div class="monograph-title-block">
          <span class="meta-group-label">${project.num}</span>
          <h1 class="reveal-wrapper"><span class="reveal-text">${project.title}</span></h1>
        </div>
        <div class="monograph-metadata-grid fade-in">
          <div>
            <span class="meta-group-label">Client</span>
            <span class="meta-group-val">${project.client}</span>
          </div>
          <div>
            <span class="meta-group-label">Role</span>
            <span class="meta-group-val">${project.role}</span>
          </div>
          <div>
            <span class="meta-group-label">Medium</span>
            <span class="meta-group-val">${project.medium}</span>
          </div>
          <div>
            <span class="meta-group-label">Dimensions</span>
            <span class="meta-group-val">${project.dimensions}</span>
          </div>
        </div>
      </div>

      <div class="monograph-hero-image fade-in">
        <img src="${project.image}" alt="${project.title} main spread">
      </div>

      <div class="monograph-content-container">
        <div class="monograph-narrative fade-in">
          <div class="narrative-headline">${project.headline}</div>
          <div class="narrative-body">
            ${project.description}
          </div>
        </div>

        <div class="monograph-images-sec">
          <div class="monograph-img-row">
            ${project.gallery.map(g => `
              <div class="monograph-img-wrap ${g.aspect} monograph-img-${g.type}">
                <img src="${g.img}" alt="Monograph Process Image" class="fade-in">
              </div>
            `).join('')}
          </div>
        </div>

        <div class="project-pagination-footer">
          <a href="#/work" class="pagination-btn hover-trigger">
            <span class="pag-label">Back to</span>
            <span class="pag-title">Archive</span>
          </a>
          <a href="#/work/design/${nextProj.id}" class="pagination-btn next-proj hover-trigger">
            <span class="pag-label">Next Project</span>
            <span class="pag-title">${nextProj.title}</span>
          </a>
        </div>
      </div>
    </section>
  `;
}

function renderArtDetail(params) {
  const artwork = PORTFOLIO_DB.art.find(p => p.id === params.id) || PORTFOLIO_DB.art[0];
  
  // Find next artwork
  const index = PORTFOLIO_DB.art.findIndex(p => p.id === artwork.id);
  const nextArt = PORTFOLIO_DB.art[(index + 1) % PORTFOLIO_DB.art.length];

  return `
    <section class="art-detail-page">
      <div class="art-exhibit-header">
        <span class="art-exhibit-category reveal-wrapper">
          <span class="reveal-text">${artwork.num}</span>
        </span>
        <h1 class="art-exhibit-title reveal-wrapper">
          <span class="reveal-text">${artwork.title}</span>
        </h1>
      </div>

      <div class="exhibition-view-container">
        <div class="exhibit-large-view fade-in">
          <img src="${artwork.image}" alt="${artwork.title} Installation View">
          <div class="exhibit-caption">Exhibition Mockup — ${artwork.location}</div>
        </div>

        <div class="exhibit-details-split fade-in">
          <div class="exhibit-concept-label">${artwork.headline}</div>
          <div>
            <div class="exhibit-concept-desc">
              ${artwork.description}
            </div>
            
            <div class="exhibit-metadata-strip">
              <div class="exhibit-meta-item">
                <span>Location</span>
                ${artwork.location}
              </div>
              <div class="exhibit-meta-item">
                <span>Medium</span>
                ${artwork.medium}
              </div>
              <div class="exhibit-meta-item">
                <span>Scale</span>
                ${artwork.dimensions}
              </div>
              <div class="exhibit-meta-item">
                <span>Year</span>
                ${artwork.year}
              </div>
            </div>
          </div>
        </div>

        <div class="monograph-content-container" style="padding-bottom: 0;">
          <div class="project-pagination-footer">
            <a href="#/work" class="pagination-btn hover-trigger">
              <span class="pag-label">Back to</span>
              <span class="pag-title">Exhibitions</span>
            </a>
            <a href="#/work/art/${nextArt.id}" class="pagination-btn next-proj hover-trigger">
              <span class="pag-label">Next Exhibition</span>
              <span class="pag-title">${nextArt.title}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderWritingArchive() {
  return `
    <section class="writing-page">
      <div class="writing-container">
        <div class="writing-header">
          <h1 class="reveal-wrapper"><span class="reveal-text">WRITING & RESEARCH</span></h1>
        </div>

        <!-- Dissertation Highlight Monograph Teaser -->
        <div class="dissertation-teaser fade-in">
          <div class="teaser-left-img">
            <img src="assets/writing-cover.png" alt="The Architecture of Absence monograph cover">
          </div>
          <div class="teaser-info-block">
            <span class="teaser-badge">MA DISSERTATION</span>
            <div class="teaser-title">
              <h2>The Architecture of Absence: Spatial Void in Digital Aesthetics</h2>
            </div>
            <p class="teaser-desc">
              A comprehensive inquiry into Japanese negative space, mid-century musical silence, and how negative layouts act as an antidote to algorithmic attention tracking on the modern web.
            </p>
            <a href="#/writing/dissertation" class="teaser-read-btn hover-trigger">Read Publication</a>
          </div>
        </div>

        <!-- Other Journal Publications -->
        <span class="publications-section-label fade-in">Academic Publications & Essays</span>
        
        <div class="publications-list fade-in">
          ${PORTFOLIO_DB.writing.publications.map(pub => `
            <a href="#/writing" class="publication-item hover-trigger">
              <span class="pub-date">${pub.year}</span>
              <div class="pub-title-col">
                <h3 class="pub-title">${pub.title}</h3>
                <span class="pub-journal">${pub.journal}</span>
              </div>
              <div class="pub-action-col">Read Summary</div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderDissertation() {
  const doc = PORTFOLIO_DB.writing.dissertation;

  // Click script to handle citation copy
  setTimeout(() => {
    const copyBtn = document.getElementById('copy-cite');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(doc.citation);
        copyBtn.textContent = "COPIED TO CLIPBOARD";
        setTimeout(() => {
          copyBtn.textContent = "COPY CITATION (APA)";
        }, 3000);
      });
    }
  }, 100);

  return `
    <section class="dissertation-page">
      <div class="dissertation-inner">
        
        <!-- Sticky Sidebar Navigation -->
        <aside class="dissertation-sidebar fade-in">
          <span class="sidebar-doc-label">Dissertation Chapters</span>
          <ul class="sidebar-chapters">
            ${doc.chapters.map(c => `
              <li><a href="#${c.id}" class="sidebar-chap-link hover-trigger">${c.num} — ${c.title.split(':')[0]}</a></li>
            `).join('')}
          </ul>
        </aside>

        <!-- Main academic publication reader panel -->
        <div class="dissertation-reader fade-in">
          <div class="reading-meta-block">
            <span class="doc-citation-tag">${doc.citation}</span>
            <h1 class="doc-main-title">${doc.title}</h1>
            <h2 class="doc-subtitle">${doc.subtitle}</h2>
            <div class="doc-author-stamp">Published by ${doc.author} // Royal College of Art</div>
          </div>

          <article class="journal-content">
            ${doc.chapters.map(c => `
              <section id="${c.id}" style="margin-bottom: 80px;">
                <h3>${c.num}: ${c.title}</h3>
                ${c.content}
              </section>
            `).join('')}
            
            <hr class="footnotes-divider">
            
            <ul class="footnotes-list">
              ${doc.footnotes.map(f => `
                <li id="${f.id}" class="footnote-item">
                  ${f.label} <a href="#${f.refId}" class="hover-trigger">↩</a>
                </li>
              `).join('')}
            </ul>

            <div class="cite-box">
              <span class="cite-box-label">Academic Reference</span>
              <p class="cite-text">"${doc.citation}"</p>
              <button class="copy-cite-btn hover-trigger" id="copy-cite">Copy Citation (APA)</button>
            </div>
          </article>
        </div>
      </div>
    </section>
  `;
}

function renderAbout() {
  return `
    <section class="about-page">
      <div class="about-container">
        
        <div class="about-hero-grid">
          <div class="about-portrait-wrap fade-in">
            <img src="assets/about-portrait.png" alt="Muthiri portrait">
          </div>
          
          <div class="about-bio-block">
            <h1 class="reveal-wrapper"><span class="reveal-text">ABOUT THE PRACTICE</span></h1>
            <div class="about-bio-text fade-in">
              <p>Muthiri (b. 1996) is a designer, digital media artist, and design theorist working at the intersection of print monographs, software art, and academic research. She holds an MA with Distinction in Visual Communication from the Royal College of Art, London.</p>
              <p>Her practice critiques our hyper-accelerated digital landscape. Using the medium of the 'void'—empty pages, dark code, low auditory frequencies, and brutalist layouts—she constructs monuments of structural silence. She consults with global cultural institutions, design agencies, and publication firms who seek to design meaningful archival artifacts.</p>
            </div>
          </div>
        </div>

        <!-- CV section -->
        <div class="about-cv-section fade-in">
          <h2 class="cv-sec-title">Selected exhibitions & education</h2>
          
          <div class="cv-grid">
            <div class="cv-row">
              <span class="cv-year">2026</span>
              <div class="cv-details">
                <h3>Digital Liminality (Solo Exhibition)</h3>
                <p>Curated projection sculpture installations examining mathematical voids.</p>
              </div>
              <span class="cv-location">Barbican, London</span>
            </div>

            <div class="cv-row">
              <span class="cv-year">2025</span>
              <div class="cv-details">
                <h3>MA in Visual Communication</h3>
                <p>Royal College of Art, London — Thesis on Spatial Negative Voids.</p>
              </div>
              <span class="cv-location">RCA, London</span>
            </div>

            <div class="cv-row">
              <span class="cv-year">2025</span>
              <div class="cv-details">
                <h3>Shadow Architectures (Group Show)</h3>
                <p>Exhibition exploring structural cast shadows on raw concrete blocks.</p>
              </div>
              <span class="cv-location">König Galerie, Tokyo</span>
            </div>

            <div class="cv-row">
              <span class="cv-year">2024</span>
              <div class="cv-details">
                <h3>Tate Generative Brand Co-Lab</h3>
                <p>Variable typographic system adapting dynamically to visitor traffic.</p>
              </div>
              <span class="cv-location">Tate Modern, London</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  `;
}

function renderContact() {
  return `
    <section class="contact-page">
      <div class="contact-container">
        
        <div class="contact-info-panel fade-in">
          <div class="contact-headline">
            <h1>Let's build a space together.</h1>
          </div>
          
          <div class="contact-details-grid">
            <div>
              <span class="contact-group-label">ELECTRONIC CORRESPONDENCE</span>
              <a href="mailto:studio@muthiri.com" class="contact-val-link hover-trigger">studio@muthiri.com</a>
            </div>
            <div>
              <span class="contact-group-label">LOCATION</span>
              <span class="contact-val-link">London / Berlin</span>
            </div>
            <div>
              <span class="contact-group-label">REPRESENTED BY</span>
              <span class="contact-val-link">Art & Archives Ltd</span>
            </div>
          </div>
        </div>

        <div class="contact-form-panel fade-in">
          <form class="contact-form">
            <div class="form-group">
              <input type="text" id="form-name" class="form-input hover-trigger" placeholder=" " required autocomplete="off">
              <label for="form-name" class="form-label">YOUR NAME</label>
            </div>
            <div class="form-group">
              <input type="email" id="form-email" class="form-input hover-trigger" placeholder=" " required autocomplete="off">
              <label for="form-email" class="form-label">EMAIL ADDRESS</label>
            </div>
            <div class="form-group">
              <textarea id="form-message" class="form-input hover-trigger" rows="4" placeholder=" " required></textarea>
              <label for="form-message" class="form-label">INQUIRY / CO-LAB PROPOSAL</label>
            </div>
            
            <button type="submit" class="submit-btn hover-trigger">Transmit message</button>
            <div class="form-feedback"></div>
          </form>
        </div>

      </div>
    </section>
  `;
}

// --- Initialization & Global Listeners ---
window.addEventListener('DOMContentLoaded', () => {
  // Initialize Custom Cursor
  cursor.init();

  // Initialize Routing
  window.addEventListener('hashchange', handleRouting);
  // Trigger initial routing check
  handleRouting();

  // Sound Button handler
  document.getElementById('sound-btn').addEventListener('click', toggleSound);

  // Mobile Menu Navigation handler
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu-overlay');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });

    // Close mobile menu on clicking any navigation link
    mobileMenu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' || e.target.classList.contains('mobile-link')) {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
      }
    });
  }
});
