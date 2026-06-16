/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FiCopy, FiCheck, FiArrowUpRight } from "react-icons/fi";
import { FaBehance, FaDribbble, FaMedium, FaLinkedin } from "react-icons/fa6";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Charan" },
      { name: "description", content: "Let's work together — get in touch." },
    ],
  }),
  component: ContactPage,
});

const socials = [
  { name: "Behance", url: "https://behance.net", icon: FaBehance },
  { name: "Dribbble", url: "https://dribbble.com", icon: FaDribbble },
  { name: "Medium", url: "https://medium.com", icon: FaMedium },
  { name: "LinkedIn", url: "https://linkedin.com", icon: FaLinkedin },
];

function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("sravanamcharan20@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=La+Belle+Aurore&display=swap" />

      {/* Mobile menu */}
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

      <div className="min-h-screen bg-background flex flex-col">
        {/* Mobile header */}
        <div className="md:hidden sticky top-0 z-50 bg-background/80 backdrop-blur-md">
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
          <a href="/" className="px-4 py-1.5 rounded-full text-[13px] font-medium text-ink/60 hover:text-ink/90 hover:bg-black/[0.06] transition-all duration-200">Charan</a>
          <span className="w-px h-3.5 bg-black/10" />
          <a href="/#work" className="px-4 py-1.5 rounded-full text-[13px] font-medium text-ink/60 hover:text-ink/90 hover:bg-black/[0.06] transition-all duration-200">Work</a>
          <a href="/about" className="px-4 py-1.5 rounded-full text-[13px] font-medium text-ink/60 hover:text-ink/90 hover:bg-black/[0.06] transition-all duration-200">About</a>
          <a href="/contact" className="px-4 py-1.5 rounded-full text-[13px] font-medium text-ink/90 bg-black/[0.06] transition-all duration-200">Contact</a>
        </nav>

        {/* Content */}
        <main className="flex-1 flex items-center justify-center px-6 md:px-16 py-16 md:py-0">
          <div className="w-full max-w-3xl">
            {/* Headline */}
            <div className="mb-16 md:mb-20">
              <p className="text-xs uppercase tracking-[0.2em] text-ink-soft mb-4">Contact</p>
              <h1 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-ink mb-6">
                Say hello.
              </h1>
              <p className="text-base md:text-lg text-ink-soft leading-relaxed max-w-lg">
                Whether you have a project in mind, want to collaborate, or just want to chat — I&apos;d love to hear from you.
              </p>
            </div>

            {/* Email block */}
            <div className="mb-12 md:mb-16">
              <p className="text-xs uppercase tracking-[0.2em] text-ink-soft mb-3">Email</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <a
                  href="mailto:sravanamcharan20@gmail.com"
                  className="text-xl md:text-2xl font-medium text-ink hover:text-ink-soft transition-colors"
                >
                  sravanamcharan20@gmail.com
                </a>
                <button
                  onClick={handleCopy}
                  className={`self-start px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    copied
                      ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
                      : "bg-surface-2 text-ink-soft hover:text-ink ring-1 ring-border"
                  }`}
                >
                  {copied ? <><FiCheck size={12} /> Copied</> : <><FiCopy size={12} /> Copy</>}
                </button>
              </div>
            </div>

            {/* Two-column: Socials + Status */}
            <div className="grid sm:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-ink-soft mb-4">Elsewhere</p>
                <div className="flex flex-col gap-1">
                  {socials.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between py-2.5 text-ink hover:text-ink-soft transition-colors"
                      >
                        <span className="flex items-center gap-3 text-sm font-medium">
                          <Icon size={16} className="text-ink-soft" />
                          {s.name}
                        </span>
                        <FiArrowUpRight size={14} className="text-ink-soft opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-ink-soft mb-4">Availability</p>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_theme(colors.emerald.400)]" />
                  <span className="text-sm font-medium text-ink">Open to new projects</span>
                </div>
                <p className="text-sm text-ink-soft leading-relaxed">
                  Based in Bengaluru, India. Open to remote collaboration worldwide.
                </p>
              </div>
            </div>

            {/* Footer line */}
            <div className="border-t border-border pt-6 pb-8">
              <p className="text-xs text-ink-soft/50">&copy; {new Date().getFullYear()} Charan. All rights reserved.</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
