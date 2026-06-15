/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import heroLandscape from "@/assets/hero-landscape.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p4 from "@/assets/project-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Charan — Product Designer" },
      { name: "description", content: "Product designer crafting calm, considered interfaces. Based in Berlin." },
    ],
  }),
  component: Index,
});

const projects = [
  {
    title: "Omakase — The Duel",
    year: "2026",
    img: p1,
    role: "Product Designer",
    href: "/work/billing",
    eyebrow: "Product strategy · Interaction design",
    summary: "A decision-first food discovery concept that turns menu overload into a focused four-tap experience.",
    contribution: "Concept, interaction model, UI system",
  },
  {
    title: "TTD Darshan Redesign",
    year: "2025",
    img: p4,
    role: "Product Designer",
    href: "/work/ttd",
    eyebrow: "Service design · Mobile UX",
    summary: "A calmer booking flow for a high-stress civic service, designed around clarity, timing, and trust.",
    contribution: "End-to-end product design",
  },
  {
    title: "Maison",
    year: "2025",
    img: p2,
    role: "Brand & Product",
    href: undefined,
    eyebrow: "Brand direction · Product",
    summary: "An ongoing brand-to-product exploration shaped around mood, texture, and quiet luxury.",
    contribution: "Brand direction, interface concepts",
  },
];

function Index() {
  const [featuredProject, ...supportingProjects] = projects;

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=La+Belle+Aurore&display=swap" />

      {/* Scrollable content sits above sticky footer */}
      <div className="relative z-10 hero-page" style={{ marginBottom: "100vh" }}>
        <header className="hero-shell hero-nav">
          <a href="#" className="hero-nav__logo">Charan</a>
          <nav className="hero-nav__links">
            <a href="#work">Work</a>
            <a href="/about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <section className="hero">
          <div className="hero__location" aria-hidden="true">
            <span className="hero__location-label">| BERLIN, GERMANY</span>
            <span className="hero__location-year">&apos;24</span>
          </div>

          <div className="hero-shell hero__stage">
            <div className="hero__lead">
              <p className="hero__signature" aria-hidden="true">Charan</p>
              <h1 className="hero__headline">
                Designing
                <br />
                digital products
                <br />
                that feel human.
              </h1>
            </div>

            <div className="hero__collage">
              <div className="hero__note" aria-hidden="true">
                <ul className="hero__note-list">
                  <li>Clarity</li>
                  <li>Curiosity</li>
                  <li>Empathy</li>
                  <li>Impact</li>
                </ul>
                <span className="hero__note-line" />
              </div>

              <figure className="hero__photo">
                <span className="hero__tape" aria-hidden="true" />
                <div className="hero__photo-frame">
                  <img
                    src={heroLandscape}
                    alt="Misty mountain landscape"
                    className="hero__photo-img"
                  />
                </div>
              </figure>
            </div>

            <aside className="hero__aside">
              <p className="hero__bio">
                I&apos;m a product designer who loves turning complex problems into simple, meaningful experiences. Currently shaping products at Grey Gray, helping ideas come to life.
              </p>
              <p className="hero__cta">Let&apos;s create something great together.</p>
              <svg className="hero__arrow" viewBox="0 0 300 20" fill="none" aria-hidden="true">
                <path
                  d="M2 12C34 10 66 14 98 11C130 8 162 13 194 10C226 7 258 12 290 10"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <path
                  d="M282 5L296 10L282 15"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </aside>
          </div>

          <div id="work" className="hero-shell hero__footer">
            <h2 className="hero__work-title">Work</h2>
            <span className="hero__work-meta">Selected — 2024 / 2026</span>
          </div>
        </section>

        <section className="px-8 md:px-32 pb-20 pt-4">
          <div className="mx-auto max-w-6xl">
            <a
              href={featuredProject.href}
              className="group block rounded-[36px] bg-surface p-4 transition-colors hover:bg-surface-2 md:p-6"
            >
              <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
                <div className="relative min-h-[300px] overflow-hidden rounded-[28px] bg-surface-2 md:min-h-[430px] lg:col-span-8">
                  <img
                    src={featuredProject.img}
                    alt={featuredProject.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.035]"
                  />
                  <span className="absolute right-5 top-5 inline-flex h-11 w-11 translate-y-1 items-center justify-center rounded-full bg-background/90 text-ink opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>

                <div className="flex flex-col justify-between px-2 py-2 md:px-3 md:py-4 lg:col-span-4">
                  <div>
                    <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.16em] text-ink-soft">
                      <span>01 · Featured</span>
                      <span className="tabular-nums">{featuredProject.year}</span>
                    </div>
                    <p className="mt-7 text-xs uppercase tracking-[0.16em] text-ink-soft">{featuredProject.eyebrow}</p>
                    <h3 className="mt-3 font-display text-4xl font-medium leading-[1.02] tracking-tight text-ink md:text-5xl">
                      {featuredProject.title}
                    </h3>
                    <p className="mt-6 text-base leading-relaxed text-ink-soft">{featuredProject.summary}</p>
                  </div>
                  <div className="mt-10 border-t border-border pt-5">
                    <p className="text-xs uppercase tracking-[0.16em] text-ink-soft">Contribution</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink">{featuredProject.contribution}</p>
                    <div className="mt-6 flex items-center gap-3 text-sm text-ink">
                      <span>View case study</span>
                      <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>

            <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-8">
              {supportingProjects.map((project, index) => {
                const Project: any = project.href ? "a" : "article";

                return (
                  <Project
                    key={project.title}
                    {...(project.href ? { href: project.href } : {})}
                    className={`group block ${index === 0 ? "lg:col-span-7" : "lg:col-span-5 lg:mt-24"}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[30px] bg-surface-2">
                      <img
                        src={project.img}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035]"
                      />
                      {project.href && (
                        <span className="absolute right-4 top-4 inline-flex h-10 w-10 translate-y-1 items-center justify-center rounded-full bg-background/90 text-ink opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                          <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden>
                            <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      )}
                    </div>

                    <div className="mt-5 grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(180px,0.7fr)]">
                      <div>
                        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-ink-soft">
                          <span>0{index + 2}</span>
                          <span>{project.eyebrow}</span>
                        </div>
                        <h3 className="mt-3 font-display text-3xl font-medium leading-tight tracking-tight text-ink md:text-4xl">
                          {project.title}
                        </h3>
                        <div className="mt-3 flex items-center gap-3 text-sm text-ink-soft">
                          <span>{project.role}</span>
                          <span className="h-1 w-1 rounded-full bg-border" />
                          <span>{project.year}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm leading-relaxed text-ink-soft">{project.summary}</p>
                        <div className="mt-4 flex items-center gap-2 text-sm text-ink">
                          <span>{project.href ? "View case study" : "In progress"}</span>
                          {project.href && <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>}
                        </div>
                      </div>
                    </div>
                  </Project>
                );
              })}
            </div>
          </div>
        </section>

        {/* spacer before footer reveal */}
        <section className="px-8 md:px-32 pt-4 pb-32">
          <p className="font-display text-3xl md:text-5xl max-w-4xl leading-tight text-ink">
            Selected work from the last few years — independent studios, lean teams, and a few quiet weekends.
          </p>
        </section>
      </div>

      {/* sticky footer revealed underneath */}
      <footer id="contact" className="fixed inset-x-0 bottom-0 h-screen bg-ink text-background flex flex-col z-0">
        <div className="flex-1 px-8 md:px-32 pt-20 md:pt-32 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-4xl md:text-6xl font-medium leading-[1.05] tracking-tight max-w-xl">
              Ready to transform your next product with considered design?
            </h2>
            <p className="mt-8 text-base text-background/60">Currently available for new opportunities</p>
            <a href="mailto:hello@lia.studio" className="inline-flex items-center gap-2 mt-12 px-7 py-4 rounded-full bg-background/10 hover:bg-background/20 transition-colors text-background">
              Let&apos;s talk <span aria-hidden>↗</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 md:justify-self-end md:text-right text-background">
            <ul className="space-y-4">
              {["Home","Work","About","Contact"].map((item) => (
                <li key={item}><a href="#" className="hover:text-background/70 transition-colors">{item}</a></li>
              ))}
            </ul>
            <ul className="space-y-4 text-background/80">
              {["Sample Work","Behance","Dribbble","Medium","Linkedin","Email"].map((item) => (
                <li key={item}><a href="#" className="inline-flex items-center gap-2 hover:text-background transition-colors">{item} <span aria-hidden>↗</span></a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="px-8 md:px-16 py-8 text-sm text-background/50 border-t border-background/10">
          © 2025–2030 Charan. Designed and crafted with intention.
        </div>
      </footer>
    </>
  );
}
