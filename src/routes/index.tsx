/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { FiCopy, FiExternalLink, FiCheck } from "react-icons/fi";
import { FaBehance, FaDribbble, FaMedium, FaLinkedin } from "react-icons/fa6";
import heroLandscape from "@/assets/hero-landscape.jpg";
import p1 from "@/assets/omakase-coverpage.png";
import p2 from "@/assets/project-4.jpg";
import p4 from "@/assets/ttd-casestudy-coverpage.png";

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
  }
];

function Index() {
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("sravanamcharan20@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=La+Belle+Aurore&display=swap" />

      {/* Mobile bottom-sheet menu — outside backdrop-blur to avoid containment bug */}
      <div
        className={`fixed inset-0 z-[100] md:hidden flex items-end ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        role="dialog"
        aria-modal={menuOpen}
        aria-label="Main menu"
      >
        <button
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${menuOpen ? "opacity-60" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
          tabIndex={menuOpen ? 0 : -1}
        />
        <div
          className={`relative w-full bg-white text-black rounded-t-3xl p-6 pb-10 transition-transform duration-500 ${menuOpen ? "translate-y-0" : "translate-y-full"}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-10 h-1 bg-black/20 rounded-full mx-auto mb-6" />
          <div className="flex items-center justify-between mb-8">
            <a href="/" className="font-display text-lg font-medium">Charan</a>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="p-2 -mr-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-5">
            <a href="/#work" onClick={() => setMenuOpen(false)} className="text-xl font-medium py-1">Work</a>
            <a href="/about" onClick={() => setMenuOpen(false)} className="text-xl font-medium py-1">About</a>
            <a href="/contact" onClick={() => setMenuOpen(false)} className="text-xl font-medium py-1">Contact</a>
          </nav>
        </div>
      </div>

      {/* Scrollable content sits above sticky footer */}
      <div className="relative z-10 hero-page" style={{ marginBottom: "100vh" }}>
        {/* Mobile header */}
        <div className="md:hidden sticky top-0 z-[60] bg-background/80 backdrop-blur-md">
          <header className="px-6 py-6 flex items-center justify-between">
            <a href="/" className="font-display text-xl font-medium">Charan</a>
            <button className="p-2" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          </header>
        </div>

        {/* Desktop floating pill navbar */}
        <nav className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-[60] items-center gap-1 px-2 py-2 rounded-full bg-black/[0.06] backdrop-blur-xl shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_8px_40px_-12px_rgba(0,0,0,0.1)] pill-nav">
          <a href="/" className="px-4 py-1.5 rounded-full text-[13px] font-medium text-ink/90 hover:bg-black/[0.06] transition-all duration-200">Charan</a>
          <span className="w-px h-3.5 bg-black/10" />
          <a href="/#work" className="px-4 py-1.5 rounded-full text-[13px] font-medium text-ink/60 hover:text-ink/90 hover:bg-black/[0.06] transition-all duration-200">Work</a>
          <a href="/about" className="px-4 py-1.5 rounded-full text-[13px] font-medium text-ink/60 hover:text-ink/90 hover:bg-black/[0.06] transition-all duration-200">About</a>
          <a href="/contact" className="px-4 py-1.5 rounded-full text-[13px] font-medium text-ink/60 hover:text-ink/90 hover:bg-black/[0.06] transition-all duration-200">Contact</a>
        </nav>

        <section className="hero">
          <div className="hero-shell hero__stage">
            <div className="hero__lead hero-stagger" style={{ '--d': '0.1s' } as React.CSSProperties}>
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

            <aside className="hero__aside hero-stagger" style={{ '--d': '0.4s' } as React.CSSProperties}>
              <div className="group/bio relative">
                <p className="hero__bio transition-opacity duration-500 group-hover/bio:opacity-0">
                  I&apos;m a product designer who loves turning complex problems into simple, meaningful experiences. Currently shaping products and helping ideas come to life.
                </p>
                <div className="absolute inset-0 opacity-0 group-hover/bio:opacity-100 transition-all duration-500 pointer-events-none">
                  <p className="text-[0.6875rem] font-mono leading-relaxed text-ink-soft/70 tracking-wide">
                    <span className="text-emerald-600/80">const</span> charan = {"{"}<br />
                    &nbsp;&nbsp;stack: [<span className="text-amber-600/80">&apos;Figma&apos;</span>, <span className="text-amber-600/80">&apos;React&apos;</span>, <span className="text-amber-600/80">&apos;Tailwind&apos;</span>, <span className="text-amber-600/80">&apos;Framer&apos;</span>],<br />
                    &nbsp;&nbsp;focus: <span className="text-amber-600/80">&apos;product design&apos;</span>,<br />
                    &nbsp;&nbsp;location: <span className="text-amber-600/80">&apos;Vishakapatnam IN&apos;</span>,<br />
                    &nbsp;&nbsp;open_to: <span className="text-amber-600/80">&apos;full-time &amp; contract&apos;</span>,<br />
                    &nbsp;&nbsp;status: <span className="text-emerald-600/80">&apos;available&apos;</span><br />
                    {"}"};
                  </p>
                </div>
              </div>
              <p className="hero__cta">Let&apos;s create something great together.</p>
              <svg className="hero__arrow" viewBox="0 0 300 20" fill="none" aria-hidden="true">
                <path
                  d="M2 12C34 10 66 14 98 11C130 8 162 13 194 10C226 7 258 12 290 10"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  className="hero-arrow-line"
                />
                <path
                  d="M282 5L296 10L282 15"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="hero-arrow-head"
                />
              </svg>
            </aside>
          </div>

        </section>

        {/* WORK — sticky title + scrolling cards */}
        <section id="work" className="relative">
          {/* Sticky "Featured work" background */}
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center pointer-events-none select-none z-0">
            <h2 className="text-[12vw] font-extralight tracking-tight text-foreground leading-none">
              Featured work
            </h2>
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-ink-soft">(Scroll to explore)</p>
          </div>

          {/* Cards that scroll over the title */}
          <div className="relative z-10 -mt-[100vh] pt-[100vh] pb-[40vh] flex flex-col items-center gap-24 md:gap-[80vh] px-6 md:px-16">
            {projects.map((project, i) => {
              const isLink = !!project.href;
              const Tag = isLink ? "a" : "div";
              const offsets = ["md:-translate-x-16 lg:-translate-x-84", "md:translate-x-12 lg:translate-x-60", "md:-translate-x-8 lg:-translate-x-54"];
              const offset = offsets[i % offsets.length];
              return (
                <Tag
                  key={project.title}
                  {...(isLink ? { href: project.href } : {})}
                  className={`group relative w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl bg-surface-2 ${offset}`}
                >
                  <img
                    src={project.img}
                    alt={project.title}
                    loading="lazy"
                    className="block w-full aspect-[16/10] object-cover transition-transform duration-700 ease-out md:group-hover:scale-105"
                  />
                  {/* Desktop hover overlay */}
                  <div className="hidden md:flex absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex-col justify-end p-10">
                    <p className="text-white/70 text-sm uppercase tracking-[0.16em] mb-2">{project.eyebrow}</p>
                    <h3 className="font-display text-3xl font-semibold text-white mb-3 tracking-tight">{project.title}</h3>
                    <p className="text-white/80 text-base leading-relaxed max-w-lg mb-6">{project.summary}</p>
                    {isLink && (
                      <span className="inline-flex items-center gap-1.5 bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-full w-fit shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)]">
                        View case study <span aria-hidden="true">→</span>
                      </span>
                    )}
                    {!isLink && (
                      <span className="inline-flex items-center gap-1.5 text-white/50 text-sm font-medium px-5 py-2.5 rounded-full border border-white/15 w-fit">
                        In progress
                      </span>
                    )}
                  </div>
                  {/* Mobile info below image */}
                  <div className="md:hidden p-5">
                    <p className="text-ink-soft text-xs uppercase tracking-[0.16em] mb-1.5">{project.eyebrow}</p>
                    <h3 className="font-display text-lg font-semibold text-ink mb-2 tracking-tight">{project.title}</h3>
                    <p className="text-ink-soft text-sm leading-relaxed mb-4">{project.summary}</p>
                    {isLink && (
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                        View case study <span aria-hidden="true">→</span>
                      </span>
                    )}
                    {!isLink && (
                      <span className="inline-flex items-center gap-1.5 text-ink-soft text-sm font-medium">
                        In progress
                      </span>
                    )}
                  </div>
                </Tag>
              );
            })}
          </div>
        </section>
      </div>

      {/* sticky footer revealed underneath */}
      <footer
        id="contact"
        className="fixed inset-x-0 bottom-0 md:h-screen h-auto bg-[#0a0a0a] text-white flex items-center justify-center z-0 pt-12 pb-20 md:pb-0"
      >
        <div className="w-full max-w-5xl px-6 md:px-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12 md:gap-16 mb-16 md:mb-24">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Get in touch</p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-semibold leading-[1.02] tracking-tight">
                Let&apos;s work
                <br />
                together.
              </h2>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_theme(colors.emerald.400)]" />
                <span className="text-sm text-white/60">Available for new projects</span>
              </div>
              <a
                href="mailto:sravanamcharan20@gmail.com"
                className="text-lg md:text-xl font-medium text-white hover:text-white/70 transition-colors"
              >
                sravanamcharan20@gmail.com
              </a>
              <button
                onClick={handleCopyEmail}
                className={`mt-1 px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  copied ? "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30" : "bg-white/10 text-white/70 hover:bg-white/15 ring-1 ring-white/10"
                }`}
              >
                {copied ? <><FiCheck size={12} /> Copied</> : <><FiCopy size={12} /> Copy email</>}
              </button>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              {[
                { name: "Behance", url: "https://behance.net" },
                { name: "Dribbble", url: "https://dribbble.com" },
                { name: "Medium", url: "https://medium.com" },
                { name: "LinkedIn", url: "https://linkedin.com" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/40 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <p className="text-xs text-white/25">&copy; {new Date().getFullYear()} Charan</p>
          </div>
        </div>
      </footer>
    </>
  );
}
