import { portfolioDB } from "@/data/portfolio";

export default function AboutPage() {
  const { bio } = portfolioDB.about;

  return (
    <section
      className="pb-[100px] min-h-screen"
      style={{
        paddingTop: "220px",
        paddingLeft: "var(--site-padding-x)",
        paddingRight: "var(--site-padding-x)",
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-[8vw] items-start mt-10 sm:mt-12 md:mt-0 mb-[10vh]">
          <div className="w-full aspect-[4/5] overflow-hidden border border-border-color rounded-sm fade-in">
            <img
              src="/assets/Noufan muthiri.webp"
              alt="Noufan Muthiri portrait"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-[35px]">
            <h1 className="reveal-wrapper block overflow-hidden">
              <span className="reveal-text font-sans text-[clamp(2.2rem,4vw,3.8rem)] font-light leading-[1.05] uppercase tracking-[-0.02em] text-white">
                ABOUT NOUFAN MUTHIRI
              </span>
            </h1>
            <div className="font-sans text-[1.05rem] md:text-[1.15rem] leading-[1.8] text-fg-secondary [&_p]:mb-[25px] fade-in font-light">
              {bio.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
