/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { FiCopy, FiExternalLink, FiCheck } from "react-icons/fi";
import { FaBehance, FaDribbble, FaMedium, FaLinkedin } from "react-icons/fa6";
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
        <div className="sticky top-0 z-999 bg-background/10 backdrop-blur-md">
          <header className="relative top-0 left-0 right-0 px-8 justify-between md:px-16 z-50 py-8 flex items-center">
            <a href="/" className="font-display text-xl font-medium">Charan</a>

            <nav className="hidden md:flex items-center gap-10 text-sm text-ink-soft ml-6">
              <a href="/#work" className="hover:text-ink transition-colors">Work</a>
              <a href="/about" className="hover:text-ink text-semibold transition-colors">About</a>
              <a href="/contact" className="hover:text-ink transition-colors">Contact</a>
            </nav>

            <button className="md:hidden ml-auto p-2" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>

          </header>
        </div>

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
            <h2 className="font-display font-light text-[14vw] md:text-[12vw] leading-none tracking-[-0.08em] text-ink">
              Featured work
            </h2>
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-ink-soft">(Scroll to explore)</p>
          </div>

          {/* Cards that scroll over the title */}
          <div className="relative z-10 -mt-[100vh] pt-[100vh] pb-[40vh] flex flex-col items-center gap-24 md:gap-[80vh] px-6 md:px-16">
            {projects.map((project, i) => {
              const isLink = !!project.href;
              const Tag: any = isLink ? "a" : "div";
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
                    className="block w-full aspect-[4/3] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 md:p-10">
                    <p className="text-white/70 text-sm uppercase tracking-[0.16em] mb-2">{project.eyebrow}</p>
                    <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-3 tracking-tight">{project.title}</h3>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-lg mb-6">{project.summary}</p>
                    {isLink && (
                      <span className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-5 py-2.5 rounded-full w-fit transition-transform duration-300 group-hover:translate-y-0">
                        View case study
                      </span>
                    )}
                    {!isLink && (
                      <span className="inline-flex items-center gap-2 text-white/60 text-sm font-medium px-5 py-2.5 rounded-full border border-white/20 w-fit">
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
        className="fixed inset-x-0 bottom-0 md:h-screen h-auto bg-black text-white flex items-center justify-center z-0 pt-12 pb-20 md:pb-0"
      >
        <div className="w-full max-w-4xl px-6 md:px-16 text-center">
          {/* Main heading */}
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight mb-8 md:mb-16">
            Open to roles. Feel free to say hello.
          </h2>

          {/* Email with copy button: stacked on mobile */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 md:mb-16">
            <span className="text-base sm:text-lg md:text-xl text-white/90 break-words">sravanamcharan20@gmail.com</span>
            <button
              onClick={handleCopyEmail}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all cursor-pointer flex items-center gap-2 ${
                copied ? "bg-green-500 text-white hover:bg-green-600" : "bg-white text-black hover:bg-gray-100"
              }`}
              aria-pressed={copied}
            >
              {copied ? (
                <>
                  <FiCheck size={16} />
                  Copied
                </>
              ) : (
                <>
                  <FiCopy size={16} />
                  Copy
                </>
              )}
            </button>
          </div>

          {/* Social links: full-width pills on small screens */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 md:gap-6">
            {[
              { name: "Behance", url: "https://behance.net", icon: FaBehance, color: "#1769FF" },
              { name: "Dribbble", url: "https://dribbble.com", icon: FaDribbble, color: "#EA4C89" },
              { name: "Medium", url: "https://medium.com", icon: FaMedium, color: "#00AB6C" },
              { name: "Linkedin", url: "https://linkedin.com", icon: FaLinkedin, color: "#0A66C2" },
              { name: "Resume", url: "#", icon: FiExternalLink, color: "#6B6B6B" },
            ].map((link) => {
              const IconComponent = link.icon as any;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto max-w-xs px-6 py-3 rounded-full bg-white text-black font-medium text-sm hover:bg-gray-100 transition-colors flex items-center gap-2 justify-center"
                >
                  <IconComponent size={18} color={link.color} />
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </>
  );
}
