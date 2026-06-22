import { portfolioDB } from "@/data/portfolio";

export default function AboutPage() {
  const { bio, cv } = portfolioDB.about;

  return (
    <section className=" pb-[100px] min-h-screen"
      style={{
        paddingTop: "220px",

        paddingLeft: "var(--site-padding-x)",
        paddingRight: "var(--site-padding-x)"
      }}>
      <div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-[8vw] items-start mb-[15vh]">
          <div className="w-full aspect-[4/5] overflow-hidden border border-border-color fade-in">
            <img src="/assets/about-portrait.png" alt="Muthiri portrait" className="w-full h-full object-cover grayscale" />
          </div>
          <div className="flex flex-col gap-[40px]">
            <h1 className="reveal-wrapper block overflow-hidden">
              <span className="reveal-text font-serif text-[4vw] max-md:text-[2rem] font-light leading-[1.1]">
                ABOUT THE PRACTICE
              </span>
            </h1>
            <div className="font-sans text-[1.15rem] leading-[1.7] text-fg-secondary [&_p]:mb-[25px] fade-in">
              {bio.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>

        <div className="border-t border-border-color pt-[10vh] fade-in">
          <h2 className="font-display text-[1.5rem] font-bold tracking-[0.15em] uppercase mb-[60px]">
            Selected exhibitions &amp; education
          </h2>
          <div className="flex flex-col">
            {cv.map((item, i) => (
              <div key={i} className="grid grid-cols-[150px_1fr_200px] max-sm:grid-cols-1 gap-[30px] max-sm:gap-[10px] py-[30px] max-sm:py-[20px] border-b border-border-muted">
                <span className="font-sans text-[0.95rem] text-fg-muted">{item.year}</span>
                <div>
                  <h3 className="font-serif text-[1.4rem] font-normal mb-[4px]">{item.title}</h3>
                  <p className="font-sans text-[0.85rem] text-fg-secondary">{item.desc}</p>
                </div>
                <span className="text-right max-sm:text-left font-sans text-[0.85rem] text-fg-muted">{item.loc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
