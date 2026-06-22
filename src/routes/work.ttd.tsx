/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/work/ttd")({
  head: () => ({
    meta: [
      { title: "TTD Darshan Slot-Booking Redesign — Case Study" },
      { name: "description", content: "A structural redesign of the TTD app's darshan booking flow — where the bottleneck was never server capacity, but the order of operations." },
    ],
  }),
  component: TTDCaseStudy,
});

const ACCENT = "#673AB7";

const sections = [
  { id: "why-this-project", label: "Why This Project" },
  { id: "where-it-breaks", label: "Where It Breaks" },
  { id: "flow-inversion", label: "Flow Inversion" },
  { id: "what-was-tried", label: "What Was Tried" },
  { id: "the-solution", label: "The Solution" },
  { id: "hard-decisions", label: "The Hard Decisions" },
  { id: "metrics", label: "Directional Metrics" },
  { id: "what-i-learned", label: "What I Learned" },
];

const ttdStripCSS = `
.ttd-screen-iframe{transform:scale(${220/375});transform-origin:top left}
@media(min-width:640px){.ttd-screen-iframe{transform:scale(${260/375})}}
@media(min-width:768px){.ttd-screen-iframe{transform:scale(${220/375})}}
@media(min-width:1536px){.ttd-screen-iframe{transform:scale(${300/375})}}
`;

function TTDScreenStrip({ screens, caption }: { screens: { id: string; label?: string }[]; caption: string }) {
  const gridCols = screens.length === 2 ? 'md:grid-cols-2'
    : screens.length === 3 ? 'md:grid-cols-3'
    : screens.length === 4 ? 'md:grid-cols-2'
    : 'md:grid-cols-3';

  return (
    <div className="mb-8">
      <style dangerouslySetInnerHTML={{ __html: ttdStripCSS }} />
      <div className="-mx-8 sm:mx-0 rounded-none sm:rounded-2xl overflow-hidden bg-[#ECEFF1] p-4 sm:p-8 md:p-8">
        <div className={`flex items-start gap-4 sm:gap-8 overflow-x-auto pb-2 snap-x snap-mandatory md:grid ${gridCols} md:gap-6 md:overflow-visible md:snap-none md:pb-0 md:justify-items-center`}>
          {screens.map((s, i) => (
            <div key={i} className="flex flex-col items-center shrink-0 snap-center">
              <div className="bg-[#111] rounded-[1.8rem] sm:rounded-[2.2rem] p-2 sm:p-2.5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)]">
                <div
                  className="relative overflow-hidden rounded-[1.4rem] sm:rounded-[1.8rem] bg-white w-[220px] sm:w-[260px] md:w-[220px] 2xl:w-[300px]"
                  style={{ aspectRatio: "375/780" }}
                >
                  <iframe
                    src={`/ttd-prototype/index.html?embed&bare&screens=${s.id}`}
                    title={s.label || s.id}
                    className="ttd-screen-iframe absolute top-0 left-0 border-0 bg-white block"
                    style={{ width: "375px", height: "780px" }}
                    loading="lazy"
                  />
                </div>
              </div>
              {s.label && <p className="text-xs text-ink-soft mt-2 text-center max-w-[220px] sm:max-w-[260px]">{s.label}</p>}
            </div>
          ))}
        </div>
      </div>
      <p className="text-sm text-ink-soft mt-4">{caption}</p>
    </div>
  );
}

function Placeholder({ text, height = "350px", width, aspectRatio, className = "" }: { text: string; height?: string; width?: string; aspectRatio?: string; className?: string }) {
  return (
    <div
      className={`rounded-xl flex items-center justify-center mx-auto mb-8 ${className}`}
      style={{
        background: "#E8E8E8",
        border: "1px dashed #CCCCCC",
        height: aspectRatio ? "auto" : height,
        width: width || "100%",
        maxWidth: "100%",
        aspectRatio: aspectRatio || undefined,
      }}
    >
      <p className="text-center px-8 italic text-sm leading-relaxed" style={{ color: "#999" }}>{text}</p>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl mb-10 relative overflow-hidden" style={{ borderLeft: `4px solid ${ACCENT}`, background: "linear-gradient(135deg, #f0f7f4 0%, #f5f5f5 100%)", padding: "20px 24px" }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 450, fontSize: "17px", lineHeight: 1.75, color: "#1a1a1a" }}>
        {children}
      </p>
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="ttd-switzer font-semibold mt-14 mb-5 flex items-center gap-3" style={{ fontSize: "20px", color: ACCENT }}>
      <span className="w-1.5 h-6 rounded-full shrink-0" style={{ background: ACCENT, opacity: 0.4 }} />
      {children}
    </h3>
  );
}

function TTDCaseStudy() {
  const [active, setActive] = useState(sections[0].id);
  const refs = useRef<Record<string, HTMLElement | null>>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.3;
      let current = sections[0].id;
      for (const s of sections) {
        const el = refs.current[s.id];
        if (el && el.offsetTop <= y) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = refs.current[id];
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  const setRef = (id: string) => (el: HTMLElement | null) => {
    refs.current[id] = el;
  };

  return (
    <>
      <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" />
      <style dangerouslySetInnerHTML={{ __html: `
        .ttd-switzer { font-family: 'Switzer', sans-serif; }
        @keyframes ttd-fade-up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ttd-line-grow{from{opacity:0;transform:scaleX(0)}to{opacity:1;transform:scaleX(1)}}
        .ttd-hero-anim{opacity:0;animation:ttd-fade-up .8s cubic-bezier(.22,1,.36,1) var(--d,0s) forwards}
        .ttd-line-reveal{opacity:0;transform:scaleX(0);animation:ttd-line-grow 1s cubic-bezier(.22,1,.36,1) .5s forwards}
        .ttd-scroll-bounce{animation:ttd-bounce 2s infinite}
        @keyframes ttd-bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}

        /* Typography scale for readability */
        .ttd-body { font-size: 17px; line-height: 1.75; color: #3a3a3a; }
        @media(max-width:767px){ .ttd-body { font-size: 16px; line-height: 1.8; } }
        .ttd-body-lead { font-size: 19px; line-height: 1.7; color: #2a2a2a; }
        @media(max-width:767px){ .ttd-body-lead { font-size: 17px; } }

        /* Section heading underline */
        .ttd-section-h2::after {
          content: '';
          display: block;
          width: 48px;
          height: 3px;
          background: ${ACCENT};
          margin-top: 12px;
          border-radius: 2px;
        }

        /* Table improvements */
        .ttd-table { border-collapse: separate; border-spacing: 0; }
        .ttd-table th { font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #555; }
        .ttd-table td { font-size: 14.5px; line-height: 1.6; vertical-align: top; }
        .ttd-table tr:hover td { background: rgba(15,110,86,0.03); }
        @media(max-width:767px){ .ttd-table td, .ttd-table th { padding: 12px 14px !important; font-size: 13px; } }

        /* Smooth section fade-in on scroll */
        .ttd-section { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .ttd-section.ttd-visible { opacity: 1; transform: translateY(0); }

        /* Divider between sections */
        .ttd-divider { height: 1px; background: linear-gradient(to right, transparent, #ddd 20%, #ddd 80%, transparent); margin: 0 0 3rem 0; }
      `}} />

      {/* Mobile bottom-sheet menu */}
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

      {/* Mobile floating section nav */}
      <button
        className="md:hidden fixed bottom-6 right-6 z-[90] w-12 h-12 rounded-full bg-black text-white shadow-lg flex items-center justify-center"
        onClick={() => setNavOpen(true)}
        aria-label="Section navigation"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 6h16M4 12h10M4 18h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
      <div
        className={`fixed inset-0 z-[95] md:hidden flex items-end ${navOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        role="dialog"
        aria-modal={navOpen}
        aria-label="Section navigation"
      >
        <button
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${navOpen ? "opacity-60" : "opacity-0"}`}
          onClick={() => setNavOpen(false)}
          aria-hidden="true"
          tabIndex={navOpen ? 0 : -1}
        />
        <div
          className={`relative w-full bg-white text-black rounded-t-3xl p-6 pb-10 transition-transform duration-500 ${navOpen ? "translate-y-0" : "translate-y-full"}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-10 h-1 bg-black/20 rounded-full mx-auto mb-6" />
          <p className="text-xs uppercase tracking-[0.16em] text-ink-soft mb-4">Sections</p>
          <ul className="space-y-3">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => { scrollTo(s.id); setNavOpen(false); }}
                  className={`text-left text-base py-1 cursor-pointer transition-colors ${active === s.id ? "font-medium" : "text-ink-soft"}`}
                  style={active === s.id ? { color: ACCENT } : undefined}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setNavOpen(false); }}
            className="mt-4 pt-4 border-t border-border text-ink-soft text-sm cursor-pointer"
          >
            Back to top
          </button>
        </div>
      </div>

      <div className="bg-background min-h-screen">
        {/* NAV */}
        <div className="relative top-0 md:hidden bg-background/80 backdrop-blur-md border-b border-border">
          <header className="px-6 py-6 flex items-center justify-between">
            <a href="/" className="font-display text-xl font-medium">Charan</a>
            <button className="p-2" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          </header>
        </div>

        <nav className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-[60] items-center gap-1 px-2 py-2 rounded-full bg-black/[0.06] backdrop-blur-xl shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_8px_40px_-12px_rgba(0,0,0,0.1)] pill-nav">
          <a href="/" className="px-4 py-1.5 rounded-full text-[13px] font-medium text-ink/60 hover:text-ink/90 hover:bg-black/[0.06] transition-all duration-200">Charan</a>
          <span className="w-px h-3.5 bg-black/10" />
          <a href="/#work" className="px-4 py-1.5 rounded-full text-[13px] font-medium text-ink/90 bg-black/[0.06] transition-all duration-200">Work</a>
          <a href="/about" className="px-4 py-1.5 rounded-full text-[13px] font-medium text-ink/60 hover:text-ink/90 hover:bg-black/[0.06] transition-all duration-200">About</a>
          <a href="/contact" className="px-4 py-1.5 rounded-full text-[13px] font-medium text-ink/60 hover:text-ink/90 hover:bg-black/[0.06] transition-all duration-200">Contact</a>
        </nav>

        {/* ═══════════ HERO ═══════════ */}
        <section className="px-8 md:px-16 pt-16 md:pt-24 pb-16 overflow-hidden">
          <p className="ttd-hero-anim text-sm text-ink-soft tracking-wider uppercase mb-6" style={{ '--d': '0.1s' } as React.CSSProperties}>
            UX Case Study · Civic Service · Mobile
          </p>
          <h1 className="ttd-hero-anim ttd-switzer font-light text-[7vw] sm:text-[10vw] md:text-[7vw] leading-[1.10] tracking-[-0.04em] text-ink max-w-7xl" style={{ '--d': '0.25s' } as React.CSSProperties}>
            TTD Darshan Slot-Booking System Redesign
          </h1>
          <div className="ttd-line-reveal mt-6 h-px bg-ink/10 max-w-2xl origin-left" />
          <p className="ttd-hero-anim mt-8 text-lg md:text-xl text-ink-soft max-w-2xl leading-relaxed" style={{ '--d': '0.55s' } as React.CSSProperties}>
            Redesigning the SED booking flow within the TTD mobile app to eliminate structural friction for 25 million annual pilgrims. 900,000 concurrent sessions. 240,000 tickets. 70% leave with nothing.
          </p>
          <div className="ttd-hero-anim mt-12 flex items-center gap-3 text-ink-soft/50" style={{ '--d': '0.9s' } as React.CSSProperties}>
            <div className="w-px h-8 bg-current ttd-scroll-bounce" />
            <span className="text-xs tracking-wider uppercase">Scroll to explore</span>
          </div>
        </section>

        {/* Hero composition placeholder */}
        <div className="px-8 md:px-16 pb-12">
          <Placeholder
            text="Hero composition: 2–3 final screens (Pilgrim Pills, Slot Lock, Payment Hold) in phone mockups. Dark background."
            height="60vh"
            className="mb-0"
          />
        </div>

        {/* Metrics cards */}
        <div className="px-8 md:px-16 pb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { stat: "~900K", label: "Concurrent sessions" },
              { stat: "~240K", label: "Tickets per release" },
              { stat: "~70%", label: "Leave empty-handed" },
              { stat: "<5 min", label: "Total sellout time" },
            ].map((m) => (
              <div key={m.label} className="rounded-2xl bg-surface p-6">
                <p className="ttd-switzer text-2xl md:text-3xl font-medium">{m.stat}</p>
                <p className="text-sm text-ink-soft mt-2">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Metadata strip */}
        <div className="px-8 md:px-16 pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-5">
            <div>
              <p className="text-sm font-medium text-ink mb-1">My Role</p>
              <p className="text-ink-soft text-sm">Product Designer (end to end)</p>
            </div>
            <div>
              <p className="text-sm font-medium text-ink mb-1">Project Type</p>
              <p className="text-ink-soft text-sm">Mobile App Redesign (Existing Product)</p>
            </div>
            <div>
              <p className="text-sm font-medium text-ink mb-1">Scope</p>
              <p className="text-ink-soft text-sm">SED Booking Flow — 5 screens</p>
            </div>
            <div>
              <p className="text-sm font-medium text-ink mb-1">Domain</p>
              <p className="text-ink-soft text-sm">Religious Pilgrimage / High-Concurrency Booking</p>
            </div>
            <div>
              <p className="text-sm font-medium text-ink mb-1">Date</p>
              <p className="text-ink-soft text-sm">June 2026</p>
            </div>
            <div>
              <p className="text-sm font-medium text-ink mb-1">Tools</p>
              <p className="text-ink-soft text-sm">Figma, secondary research</p>
            </div>
          </div>
        </div>

        {/* Positioning line */}
        <div className="px-8 md:px-16 pb-16">
          <p className="ttd-switzer text-base font-medium" style={{ color: ACCENT }}>
            Developer-turned-designer. Systems thinking meets interaction design. Concept redesign with real-user research.
          </p>
        </div>

        {/* ═══════════ BODY w/ sidebar ═══════════ */}
        <div className="px-8 md:px-16 pb-32 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-12 md:gap-20">
          {/* SIDEBAR */}
          <aside className="hidden md:block md:sticky md:top-24 md:self-start">
            <ul className="space-y-4 text-[15px]">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => scrollTo(s.id)}
                    className={`text-left transition-colors cursor-pointer ${active === s.id ? "font-medium text-[16px]" : "text-ink-soft"}`}
                    style={active === s.id ? { color: ACCENT } : undefined}
                    onMouseEnter={(e) => { if (active !== s.id) (e.target as HTMLElement).style.color = ACCENT; }}
                    onMouseLeave={(e) => { if (active !== s.id) (e.target as HTMLElement).style.color = ''; }}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
              <li className="pt-4">
                <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-ink-soft cursor-pointer hover:text-ink">
                  | Back to top |
                </button>
              </li>
            </ul>
          </aside>

          {/* CONTENT */}
          <article className="min-w-0 w-full space-y-20">

            {/* ═══════════ WHY THIS PROJECT ═══════════ */}
            <section ref={setRef("why-this-project")} id="why-this-project" className="scroll-mt-24">
              <h2 className="ttd-switzer ttd-section-h2 text-3xl md:text-4xl font-semibold tracking-tight mb-10 text-ink">Why This Project</h2>

              <p className="text-ink-soft text-lg leading-relaxed mb-6 italic">
                I watched my mother try to book darshan tickets on her Redmi phone for 45 minutes. She typed my father's name, my uncle's name, my aunt's name, carefully, with reading glasses. Then the screen said "booked by another pilgrim." She closed the app and called an agent who charged Rs 5,000 for a Rs 300 ticket.
              </p>

              <p className="ttd-body mb-8">
                The Sri Venkateswara Temple at Tirumala is the most visited Hindu temple on earth — roughly 25 million pilgrims a year. When the booking fails, it is not experienced as an inconvenience. It is experienced as being turned away from something sacred.
              </p>

              <Callout>
                This is a concept redesign. I gave it accountability: I tested the prototype with 5 real TTD pilgrims from my family, analyzed the live app step by step, mined Play Store reviews from April 2026, studied comparable allocation systems (Ticketmaster, IRCTC, Hajj Nusuk, TTD eDip), and set every metric as a falsifiable hypothesis. I know this is feasible because I am a computer science engineering student with full-stack development experience.
              </Callout>
            </section>

            {/* ═══════════ WHERE IT BREAKS ═══════════ */}
            <div className="ttd-divider" />
            <section ref={setRef("where-it-breaks")} id="where-it-breaks" className="scroll-mt-24">
              <h2 className="ttd-switzer ttd-section-h2 text-3xl md:text-4xl font-semibold tracking-tight mb-10 text-ink">Where It Breaks</h2>

              <p className="ttd-body-lead mb-8">
                The TTD mobile app serves the Sri Venkateswara Temple at Tirumala. Special Entry Darshan (SED) tickets at Rs 300 are released monthly in a single batch for all dates. At release time, approximately 900,000 concurrent sessions compete for roughly 240,000 tickets. All tickets routinely sell out within minutes.
              </p>

              {/* — The current flow — */}
              <SubHeading>The current flow</SubHeading>

              <div className="overflow-x-auto rounded-xl mb-8" style={{ border: "1px solid #E8E8E8" }}>
                <table className="w-full ttd-table">
                  <thead>
                    <tr style={{ background: "#eef5f2" }}>
                      <th className="text-left p-4 ttd-switzer" style={{ fontWeight: 600 }}>Step</th>
                      <th className="text-left p-4 ttd-switzer" style={{ fontWeight: 600 }}>Action</th>
                      <th className="text-left p-4 ttd-switzer" style={{ fontWeight: 600 }}>What goes wrong</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { step: "1", action: "Login with mobile + OTP", issue: "Auto-logout after short interval forces re-login at critical moments" },
                      { step: "2", action: "Virtual queue / countdown", issue: "Opaque timer with no position. Refreshing changes wait time" },
                      { step: "3", action: "Color-coded calendar", issue: "Popular dates vanish in seconds. No group-size filtering" },
                      { step: "4", action: "Select time slot + pilgrims", issue: "No slot hold. Slot can be taken while user proceeds" },
                      { step: "5", action: "Type pilgrim details (per person)", issue: "3–5 minutes of typing. Slot fills while user types", highlight: true },
                      { step: "6", action: "Payment", issue: "Gateway failures debit money without ticket. Refunds take 10–15 days" },
                      { step: "7", action: "Confirmation", issue: "Non-cancellable, non-refundable. Name must match ID at gate" },
                    ].map((s) => (
                      <tr key={s.step} style={{ borderTop: "1px solid #E8E8E8", background: s.highlight ? "#FEF2F2" : undefined }}>
                        <td className="p-4 font-medium" style={{ color: s.highlight ? "#DC2626" : undefined }}>{s.step}</td>
                        <td className="p-4" style={{ color: s.highlight ? "#991B1B" : undefined, fontWeight: s.highlight ? 500 : 400 }}>{s.action}</td>
                        <td className="p-4 text-ink-soft" style={{ color: s.highlight ? "#B91C1C" : undefined }}>{s.issue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Callout>
                The structural failure is at Step 5. The user selects a slot at Step 4 but the system does not hold it. Slot selection and data entry are sequential, but only payment creates the binding commit. The user invests 3–5 minutes typing details for up to 6 pilgrims while the selected slot remains available to every other concurrent user. This is structurally unfair.
              </Callout>

              <Placeholder
                text="Annotated screenshot of the current TTD app's pilgrim details form (Step 5). Callout arrows showing: no slot hold indicator, 6 fields per pilgrim × 6 pilgrims = 36+ fields, no timer, no progress indicator."
                height="400px"
              />

              {/* — The evidence — */}
              <SubHeading>The evidence</SubHeading>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl flex items-center justify-center p-4"
                    style={{ background: "#E8E8E8", border: "1px dashed #CCCCCC", height: "130px" }}
                  >
                    <p className="text-center text-xs italic" style={{ color: "#999" }}>Play Store review screenshot {i + 1}</p>
                  </div>
                ))}
              </div>

              <p className="ttd-body mb-6">
                A Chrome extension (TTD Autofill Assistant) exists specifically to auto-fill pilgrim details because users cannot type fast enough. On January 8, 2025, a stampede during physical token distribution killed six devotees and injured approximately 40. TTD's vigilance wing busted broker rackets (May 2026) using auto-fill tools to grab tickets instantly, reselling Rs 300 tickets for Rs 5,000 to Rs 35,000.
              </p>

              {/* User quote placeholders */}
              <div className="space-y-4 mb-8">
                {[
                  { name: "Lakshmi, 54", text: "I typed all 6 names and it said booked by someone else. I called an agent." },
                  { name: "User quote placeholder", text: "Testing feedback from family member who books regularly" },
                  { name: "User quote placeholder", text: "Proxy booking experience from a younger family member" },
                ].map((q, i) => (
                  <div key={i} className="rounded-xl p-5" style={{ borderLeft: `3px solid ${ACCENT}`, background: "#E8E8E8", borderRight: "1px dashed #CCCCCC", borderTop: "1px dashed #CCCCCC", borderBottom: "1px dashed #CCCCCC" }}>
                    <p className="italic text-sm" style={{ color: "#999" }}>"{q.text}"</p>
                    <p className="text-xs mt-2" style={{ color: "#999" }}>— {q.name}</p>
                  </div>
                ))}
              </div>

              {/* — What this costs TTD — */}
              <SubHeading>What this costs TTD</SubHeading>

              <p className="ttd-body mb-6">
                The 70% failure rate doesn't just lose bookings. It drives pilgrims toward Rs 2,000–35,000 agents, creating exactly the black market the app was meant to eliminate. Every failed booking generates a support ticket. Every orphan payment (money debited, no ticket) requires staff time, bank coordination, and 10–15 days of float management. TTD is a Rs 1,600+ crore annual operation. The UX failure has direct operational cost.
              </p>

              {/* — How comparable systems solve this — */}
              <SubHeading>How comparable systems solve this</SubHeading>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
                <Placeholder text="Ticketmaster: holds seat on selection" height="250px" className="mb-0" />
                <Placeholder text="IRCTC: blocks berth pending payment" height="250px" className="mb-0" />
                <Placeholder text="Hajj Nusuk: lottery allocation" height="250px" className="mb-0" />
              </div>

              <Callout>
                Every comparable high-demand allocation system holds inventory on selection. TTD's SED booking is the only one that does not. TTD's own Electronic Dip lottery processed 24.05 lakh registrations fairly.
              </Callout>

              {/* — Who it hurts most — */}
              <SubHeading>Who it hurts most</SubHeading>

              <div className="overflow-x-auto rounded-xl mb-8" style={{ border: "1px solid #E8E8E8" }}>
                <table className="w-full ttd-table">
                  <thead>
                    <tr style={{ background: "#eef5f2" }}>
                      <th className="text-left p-4 ttd-switzer" style={{ fontWeight: 600 }}>Persona</th>
                      <th className="text-left p-4 ttd-switzer" style={{ fontWeight: 600 }}>Behavior</th>
                      <th className="text-left p-4 ttd-switzer" style={{ fontWeight: 600 }}>Why this redesign matters for them</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { persona: "The Proxy Booker (25–35)", behavior: "Books for parents/elderly who cannot use the app", impact: "Types 12 names (2 bookings × 6). Profile pills eliminate 10+ minutes of typing under pressure." },
                      { persona: "The Low-Connectivity Devotee (40–60)", behavior: "Budget Android, tier-2/3 town, Jio 4G, reading glasses", impact: "44px pills instead of tiny form fields. 3-min timer calculated on their actual device speed." },
                      { persona: "The NRI Planner (30–50)", behavior: "Books from abroad, unfamiliar with UPI, uses net banking", impact: "Net banking takes 90–120s. 3-minute hold gives them one attempt + one retry." },
                      { persona: "The Repeat Pilgrim (50+)", behavior: "Visits 2–3 times/year, books the same 6 family members", impact: "Profiles saved once, reused across every booking. Never re-types the same names." },
                    ].map((p) => (
                      <tr key={p.persona} style={{ borderTop: "1px solid #E8E8E8" }}>
                        <td className="p-4 font-medium text-ink whitespace-nowrap">{p.persona}</td>
                        <td className="p-4 text-ink-soft">{p.behavior}</td>
                        <td className="p-4 text-ink-soft">{p.impact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ═══════════ FLOW INVERSION ═══════════ */}
            <div className="ttd-divider" />
            <section ref={setRef("flow-inversion")} id="flow-inversion" className="scroll-mt-24">
              <h2 className="ttd-switzer ttd-section-h2 text-3xl md:text-4xl font-semibold tracking-tight mb-10 text-ink">Flow Inversion</h2>

              {/* — Key insights — */}
              <SubHeading>Key insights</SubHeading>

              <div className="space-y-4 mb-8">
                {[
                  "The problem is allocation design, not server capacity. TTD's servers handle 900K sessions. The system isn't slow. It's structurally unfair.",
                  "If the fix depends on typing faster, it fails the people who need it most. Elderly pilgrims in tier-2 towns on budget phones with reading glasses.",
                  "Never make the user enter data under allocation pressure. Separate the 'prepare' step from the 'compete' step.",
                ].map((insight, i) => (
                  <div key={i} className="flex gap-4 rounded-xl bg-surface p-5">
                    <span className="ttd-switzer text-lg font-medium shrink-0" style={{ color: ACCENT }}>{i + 1}</span>
                    <p className="text-ink-soft leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>

              {/* — Design principles — */}
              <SubHeading>Design principles</SubHeading>

              <div className="space-y-3 mb-8">
                {[
                  { title: "Remove the speed advantage", desc: "Typing speed should never determine who gets darshan." },
                  { title: "Prepare in calm, lock on tap", desc: "Data entry happens days before. Selection happens in seconds." },
                  { title: "Design the loss with the same care as the win", desc: "70% of users will fail. Their experience matters equally." },
                ].map((p) => (
                  <div key={p.title} className="rounded-xl bg-surface p-5">
                    <p className="font-medium text-ink mb-1">{p.title}</p>
                    <p className="text-ink-soft text-sm">{p.desc}</p>
                  </div>
                ))}
              </div>

              {/* — Constraints — */}
              <SubHeading>Constraints</SubHeading>

              <div className="space-y-4 mb-8">
                <div className="rounded-xl bg-surface p-5">
                  <p className="font-medium text-ink mb-2">Technical</p>
                  <p className="text-ink-soft text-sm leading-relaxed">Target device is a Rs 9,000 Redmi phone with Jio 4G in a tier-2 town. 240,000 concurrent slot holds at peak. TTD policy: non-cancellable, non-refundable, non-transferable. 2 transactions per account per monthly cycle.</p>
                </div>
                <div className="rounded-xl bg-surface p-5">
                  <p className="font-medium text-ink mb-2">Scope</p>
                  <p className="text-ink-soft text-sm leading-relaxed">5 screens within the existing TTD app. SED booking flow only. No backend engineering (bot detection, device fingerprinting, CAPTCHA). No identity verification (happens at temple gate, as today).</p>
                </div>
                <div className="rounded-xl bg-surface p-5">
                  <p className="font-medium text-ink mb-2">Self-imposed</p>
                  <p className="text-ink-soft text-sm leading-relaxed">Real user research (family interviews). Real app analysis (step-by-step current flow mapping). Real evidence (Play Store reviews, published system analysis). Every metric is a falsifiable hypothesis.</p>
                </div>
              </div>

              {/* — How all pieces connect — */}
              <SubHeading>How all pieces connect</SubHeading>

              <Placeholder
                text="Systems diagram: Profile Creation (calm, days before) → Pilgrim Pills (5-sec selection) → Constraint Check → Queue → Slot Selection → 3-Min Micro Lock → Payment with Retry → On failure: Immediate Release → Back to Queue (profiles saved, no re-typing)"
                height="350px"
              />

              {/* — The core move — */}
              <SubHeading>The core move</SubHeading>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid #E8E8E8" }}>
                  <table className="w-full ttd-table">
                    <thead>
                      <tr style={{ background: "#eef5f2" }}>
                        <th className="text-left p-4 ttd-switzer" style={{ fontWeight: 500 }} colSpan={2}>Current Flow</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        "1. Login",
                        "2. Queue",
                        "3. Calendar + slot selection",
                        "4. Type pilgrim details (3–5 min)",
                        "5. Payment (no slot hold)",
                        "6. Confirmation or failure",
                      ].map((step, i) => (
                        <tr key={i} style={{ borderTop: "1px solid #E8E8E8" }}>
                          <td className="p-3 text-ink-soft" style={{ color: i === 3 || i === 4 ? "#DC2626" : undefined, fontWeight: i === 3 || i === 4 ? 500 : 400 }}>{step}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid #E8E8E8" }}>
                  <table className="w-full ttd-table">
                    <thead>
                      <tr style={{ background: "#eef5f2" }}>
                        <th className="text-left p-4 ttd-switzer" style={{ fontWeight: 500 }} colSpan={2}>Redesigned Flow</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { step: "1. Login (no change)", highlight: false },
                        { step: "2. Select saved pilgrim profiles", highlight: true },
                        { step: "3. Queue (existing)", highlight: false },
                        { step: "4. Calendar + slot selection", highlight: false },
                        { step: "5. Confirm slot (3-min lock starts)", highlight: true },
                        { step: "6. Review + Payment (within 3-min hold)", highlight: true },
                        { step: "7. Confirmation", highlight: false },
                      ].map((s, i) => (
                        <tr key={i} style={{ borderTop: "1px solid #E8E8E8" }}>
                          <td className="p-3" style={{ color: s.highlight ? "#15803D" : undefined, fontWeight: s.highlight ? 500 : 400 }}>{s.step}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* ═══════════ WHAT WAS TRIED BEFORE THIS ═══════════ */}
            <div className="ttd-divider" />
            <section ref={setRef("what-was-tried")} id="what-was-tried" className="scroll-mt-24">
              <h2 className="ttd-switzer ttd-section-h2 text-3xl md:text-4xl font-semibold tracking-tight mb-10 text-ink">What Was Tried Before This</h2>

              <Placeholder
                text="Before/After visual comparison. Left: current TTD pilgrim form (dimmed, red-tinted) with label '3–5 minutes of typing under pressure.' Right: redesigned pilgrim pills screen (full color, phone mockup) with label '5 seconds. Tap saved profiles.'"
                height="400px"
              />

              {/* — Approaches explored and rejected — */}
              <SubHeading>Approaches explored and rejected</SubHeading>

              <div className="space-y-6 mb-8">
                <div className="rounded-xl bg-surface p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <p className="font-medium text-ink">10-minute hold window (Ticketmaster model)</p>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700">Killed</span>
                  </div>
                  <p className="text-ink-soft text-sm leading-relaxed">
                    At TTD's scale (240K slots, 900K users), 10-minute holds mean all slots could be locked simultaneously while the queue stands still. Bots could hoard entire date ranges. Ticketmaster's window works for 20,000 concert seats. TTD's 240,000 slots with 900K concurrent users is a different order of magnitude. 3× more server state, 3× slower slot cycling.
                  </p>
                </div>

                <div className="rounded-xl bg-surface p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <p className="font-medium text-ink">60-second micro lock (maximum speed)</p>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700">Killed</span>
                  </div>
                  <p className="text-ink-soft text-sm leading-relaxed">
                    Walking through real seconds on a Rs 9,000 Redmi with Jio 4G: confirmation read (5–8s) + summary loads (2–3s) + user reads 6 names (10–15s) + selects payment (5–8s) + UPI app opens (3–5s) + PIN + processing (5–10s) + redirect (2–3s) = 35–55 seconds on a fast run with zero mistakes. Net banking takes 90–120 seconds minimum. 60 seconds replaces "slot taken while typing" with "slot released while paying." Different error, same demographic harmed.
                  </p>
                </div>

                <div className="rounded-xl bg-surface p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <p className="font-medium text-ink">In-app Aadhaar OTP verification</p>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700">Killed</span>
                  </div>
                  <p className="text-ink-soft text-sm leading-relaxed">
                    TTD does not verify IDs in-app today. Verification happens physically at the temple gate. Adding verification for one transaction but not another is inconsistent. The design job is to surface TTD's existing constraints clearly in the UI, not to build a verification system TTD hasn't asked for. Engineering scope creep disguised as design thinking.
                  </p>
                </div>
              </div>

              <Placeholder
                text="Evolution states: 2–3 snapshots showing how the pilgrim selection interaction evolved. V1 → V2 → Final. Annotated with what changed and what insight drove each change."
                height="350px"
                width="60%"
              />
            </section>

            {/* ═══════════ DON'T MAKE IT FASTER. CHANGE THE ORDER. ═══════════ */}
            <div className="ttd-divider" />
            <section ref={setRef("the-solution")} id="the-solution" className="scroll-mt-24">
              <h2 className="ttd-switzer ttd-section-h2 text-3xl md:text-4xl font-semibold tracking-tight mb-10 text-ink">Don't Make It Faster. Change the Order.</h2>

              <p className="ttd-body-lead mb-8">
                The redesign does not add features. It reorders existing operations. The same data is collected. The same payment methods are used. The same queue exists. The only change is when each step happens.
              </p>

              <Callout>
                Pilgrim details are saved days before booking in a calm state. On booking day, the user taps profile pills (5 seconds instead of 5 minutes), enters the queue, selects a slot, and the slot locks immediately. Payment happens within a 3-minute hold. That reordering eliminates the race condition, the wasted effort, and the primary source of user distress.
              </Callout>

              {/* Key screens: My Pilgrims */}
              <p className="ttd-body mb-6">
                For the pills to exist, the data has to be captured earlier. A new "My Pilgrims" section lets devotees save up to 12 profiles any time — at home, on the train, days before release. Twelve is deliberate: TTD allows two transactions of six pilgrims each per cycle, so 12 covers both without re-entry.
              </p>

              <TTDScreenStrip
                screens={[
                  { id: "menu", label: "Services Menu" },
                  { id: "pilEmpty", label: "Empty State" },
                  { id: "pilList", label: "Saved List" },
                  { id: "add", label: "Add Pilgrim" },
                ]}
                caption="Menu with new entry · Empty state · Saved pilgrim list · Add pilgrim form (calm, no clock)"
              />

              {/* Key screens: Pilgrim Selection */}
              <p className="ttd-body mb-6">
                Five minutes of typing becomes five seconds of tapping. Instead of typing six people's details against a countdown, the user taps saved profile pills. Pills are 44px tall for fumble-free tapping on a budget phone. A blocked pill (a pilgrim already booked this cycle) is shown dimmed with a tap-to-explain — so the constraint is surfaced before the queue, not discovered after a 30-minute wait.
              </p>

              <TTDScreenStrip
                screens={[
                  { id: "select", label: "Select Pilgrims" },
                  { id: "constraintInfo", label: "Constraint Info" },
                ]}
                caption="Select pilgrims with profile pills · Tap a blocked pill to see why"
              />

              {/* Key screens: Slot Lock + Payment */}
              <p className="ttd-body mb-6">
                The moment a user confirms a slot, the backend locks it and a payment timer begins. The slot disappears from everyone else's screen. A two-tap confirm (pick, then confirm in a sheet) prevents accidental locks.
              </p>

              <TTDScreenStrip
                screens={[
                  { id: "slot", label: "Confirm Lock" },
                  { id: "payDefault", label: "Payment Hold" },
                  { id: "payWarn", label: "Timer Critical" },
                ]}
                caption="Confirm slot lock sheet · Payment hold with live timer · Timer critical state"
              />

              {/* Video placeholder */}
              <div className="mx-auto mb-8" style={{ width: "min(60%, 100%)" }}>
                <div className="rounded-xl flex items-center justify-center" style={{ background: "#E8E8E8", border: "1px dashed #CCCCCC", aspectRatio: "16/9" }}>
                  <p className="text-center px-8 italic text-sm" style={{ color: "#999" }}>
                    30-second video walkthrough: Happy path from pilgrim selection to confirmation. No voiceover.
                  </p>
                </div>
              </div>

              {/* — Three ways it ends — */}
              <SubHeading>Three ways it ends</SubHeading>

              <div className="space-y-4 mb-8">
                <div className="rounded-xl p-5 bg-green-50 border border-green-200">
                  <p className="font-medium text-green-900 mb-1">Payment succeeds</p>
                  <p className="text-green-800 text-sm">Booking confirmed. Ticket issued. The user sees a clear confirmation with all pilgrim names and the darshan date.</p>
                </div>
                <div className="rounded-xl p-5 bg-amber-50 border border-amber-200">
                  <p className="font-medium text-amber-900 mb-1">Payment fails, slot still held</p>
                  <p className="text-amber-800 text-sm">"Payment failed. Your slot is held for [X:XX]. Try again or switch method." The slot stays locked. The user switches from UPI to card and tries again — without losing the slot or re-typing anything. The current app drops them back into the queue to start over.</p>
                </div>
                <div className="rounded-xl p-5 bg-surface" style={{ border: "1px solid #E8E8E8" }}>
                  <p className="font-medium text-ink mb-1">Hold expires</p>
                  <p className="text-ink-soft text-sm">"Your hold has expired. Slot released." Two clear paths: "Re-enter queue" (if slots remain) or "Queue closed for today. Next release: [date]." No dead end. No ambiguity. No blame.</p>
                </div>
              </div>

              <TTDScreenStrip
                screens={[
                  { id: "payFail", label: "Payment Failed" },
                  { id: "paySuccess", label: "Confirmed" },
                  { id: "expiredOpen", label: "Expired (Open)" },
                  { id: "expiredClosed", label: "Expired (Closed)" },
                ]}
                caption="Payment failed (slot still locked) · Booking confirmed · Hold expired (queue open) · Hold expired (queue closed)"
              />

              {/* — Zoom-in moments — */}
              <SubHeading>Zoom-in moments</SubHeading>

              <p className="ttd-body mb-6">
                The placeholder copy: "Full name exactly as on ID proof." A single Lakshmi/Laxmi difference gets a pilgrim turned away at the temple gate. Solving spelling accuracy in calm profile-creation time, not under a countdown, is the entire point of flow inversion.
              </p>

              <Callout>
                The constraint message tone: "Your second booking this month can only include other pilgrims, not yourself." Not an error. Not a wall. A clear explanation surfaced at the moment of decision, before 30 minutes of waiting.
              </Callout>

              {/* — Designing the loss — */}
              <SubHeading>Designing the loss</SubHeading>

              <p className="ttd-body mb-6">
                70% of users will not get tickets. That's the majority experience. If the winning path is polished and the losing path is a dead end, I've designed for the minority.
              </p>

              <Callout>
                The key reversal from today's app: when a payment fails, the slot stays locked for the rest of the window. The user switches from UPI to card and tries again — without losing the slot or re-typing anything. That single sentence eliminates the #1 source of user distress in the current app.
              </Callout>

              {/* — Accessibility — */}
              <SubHeading>Accessibility</SubHeading>

              <p className="ttd-body mb-6">
                The primary users include elderly pilgrims in tier-2/3 cities using Rs 9,000 Redmi phones with Jio 4G and reading glasses. Every design choice reflects this:
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "Touch targets at 44px+ for reduced fine motor control.",
                  "Profile pills instead of form fields — typing on small screens with reading glasses under time pressure is an accessibility barrier, not just a UX inconvenience.",
                  "The 3-minute timer was calculated using real-world seconds on a budget phone with slow 4G, not a flagship on Wi-Fi.",
                  "Constraint messages use plain language, not system jargon.",
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: ACCENT }} />
                    <p className="text-ink-soft leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              {/* — Failure states — */}
              <SubHeading>Failure states</SubHeading>

              <div className="overflow-x-auto rounded-xl mb-8" style={{ border: "1px solid #E8E8E8" }}>
                <table className="w-full ttd-table">
                  <thead>
                    <tr style={{ background: "#eef5f2" }}>
                      <th className="text-left p-4 ttd-switzer" style={{ fontWeight: 600 }}>State</th>
                      <th className="text-left p-4 ttd-switzer" style={{ fontWeight: 600 }}>What the user sees</th>
                      <th className="text-left p-4 ttd-switzer" style={{ fontWeight: 600 }}>What happens next</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { state: "Payment failed, slot still held", sees: '"Payment failed. Your slot is held for [X:XX]. Try again or switch method."', next: "Retry button + change payment method. Slot remains locked for remaining time." },
                      { state: "Hold expired, queue still open", sees: '"Your hold has expired. Slot released." + "Re-enter queue" button', next: "User enters randomized queue. Profiles still saved. No re-typing." },
                      { state: "First-time user, no saved profiles", sees: "Manual entry fallback with same fields as current form + prompt to save", next: "Saved profiles are the fast path, not the only path." },
                    ].map((f, i) => (
                      <tr key={i} style={{ borderTop: "1px solid #E8E8E8" }}>
                        <td className="p-4 font-medium text-ink">{f.state}</td>
                        <td className="p-4 text-ink-soft">{f.sees}</td>
                        <td className="p-4 text-ink-soft">{f.next}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Edge case screens */}
              <p className="ttd-body mb-6">
                A booking flow is only as honest as its edge cases. These aren't decoration; they're where 25 million users' trust is won or lost.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  { edge: "UPI sends the user to GPay/PhonePe", fix: "Timer keeps running in-app; on return, a clear 'awaiting confirmation' state. The slot stays locked through the round-trip." },
                  { edge: "Money debited but no confirmation", fix: "Honest 'payment processing — refunded in 3–5 days if debited' plus a Check Booking Status path." },
                  { edge: "Same person booked from two accounts", fix: "One booking per ID per seva per cycle. Block shown on the pill with a tap-to-explain, before the queue." },
                  { edge: "Accidental slot tap", fix: "Two-tap confirm: pick, then confirm in a sheet. Accidents are caught before the lock." },
                  { edge: "User goes idle on the slot page", fix: "'Still looking?' prompt at 5 min; auto-release after 60s of no response." },
                  { edge: "First-timer with zero saved profiles", fix: "Manual-entry fallback on the Select Pilgrims screen. Saved profiles are the fast path, never the only path." },
                ].map((e) => (
                  <div key={e.edge} className="rounded-xl bg-surface p-4">
                    <p className="font-medium text-ink mb-1">{e.edge}</p>
                    <p className="text-ink-soft text-sm leading-relaxed">{e.fix}</p>
                  </div>
                ))}
              </div>

              <TTDScreenStrip
                screens={[
                  { id: "upiRedirect", label: "UPI Redirect" },
                  { id: "waiting", label: "Waiting" },
                  { id: "webhook", label: "Webhook" },
                  { id: "inactivity", label: "Inactivity" },
                  { id: "deleteDlg", label: "Remove" },
                  { id: "constraintInfo", label: "Constraint" },
                ]}
                caption="UPI redirect · Awaiting confirmation · Webhook pending · Inactivity prompt · Delete confirm · Constraint info"
              />
            </section>

            {/* ═══════════ THE HARD DECISIONS ═══════════ */}
            <div className="ttd-divider" />
            <section ref={setRef("hard-decisions")} id="hard-decisions" className="scroll-mt-24">
              <h2 className="ttd-switzer ttd-section-h2 text-3xl md:text-4xl font-semibold tracking-tight mb-10 text-ink">The Hard Decisions</h2>

              {/* Decision 1 */}
              <SubHeading>Decision 1: Flow Inversion — the meta-decision</SubHeading>
              <p className="ttd-body mb-3">
                <span className="font-medium text-ink">Problem:</span> Slots fill while users type traveler details under time pressure. The current flow places data entry (3–5 minutes) between slot selection and payment, with no hold.
              </p>
              <p className="ttd-body mb-3">
                <span className="font-medium text-ink">What I chose:</span> Invert the sequence. Save pilgrim profiles days before booking. On booking day, select profiles first (5 seconds), then enter queue, then select slot, then lock and pay. The same data is collected. The only change is when.
              </p>
              <p className="ttd-body mb-8">
                <span className="font-medium text-ink">The tradeoff:</span> First-time users without saved profiles still face the old bottleneck. Mitigated by manual entry fallback with prompt to save. The fast path is not the only path.
              </p>

              {/* Decision 2 */}
              <SubHeading>Decision 2: Profile Pills — the interaction solution</SubHeading>
              <p className="ttd-body mb-3">
                <span className="font-medium text-ink">Problem:</span> The pilgrim details form is a 3–5 minute bottleneck.
              </p>
              <p className="ttd-body mb-3">
                <span className="font-medium text-ink">What I chose:</span> Saved profiles as tappable pills. Tap to select, tap to deselect. Counter shows "3 of 6 selected." 44px touch targets for elderly users.
              </p>
              <p className="ttd-body mb-8">
                <span className="font-medium text-ink">Why 12 profiles:</span> TTD allows 2 transactions per account per monthly cycle, with up to 6 pilgrims per transaction. 2 × 6 = 12. The cap matches the system constraint exactly.
              </p>

              {/* Decision 3 */}
              <SubHeading>Decision 3: 3-Minute Micro Lock — the constraint reasoning</SubHeading>
              <p className="ttd-body mb-3">
                <span className="font-medium text-ink">Problem:</span> Users select a slot but it is not held. Another user takes it during payment. But holding slots too long (10 minutes) lets bots hoard inventory and increases server load.
              </p>
              <p className="ttd-body mb-3">
                <span className="font-medium text-ink">What I chose:</span> 3-minute micro lock triggered on confirmation. Slot disappears from other users' screens. Payment within 3 minutes. Timer expires: immediate release.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  { option: "10 minutes", verdict: "Fails", reason: "At 240K slots, bots could hoard the entire inventory. Backend holds 3× more concurrent state. Built for 20K-seat concerts, not 900K pilgrims." },
                  { option: "60 seconds", verdict: "Fails", reason: "Read summary + pick payment + UPI round-trip on a slow phone is already 35–55s. One fumble and the slot is gone mid-payment. Replaces one cruelty with another." },
                  { option: "3 minutes", verdict: "Chosen", reason: "Enough for one real attempt plus one retry. Short enough that bot-held slots cycle back fast and the queue keeps moving." },
                ].map((t) => (
                  <div key={t.option} className={`rounded-xl p-4 ${t.verdict === "Chosen" ? "bg-green-50 border border-green-200" : "bg-surface"}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-medium text-ink">{t.option}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${t.verdict === "Chosen" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"}`}>{t.verdict}</span>
                    </div>
                    <p className="text-ink-soft text-sm leading-relaxed">{t.reason}</p>
                  </div>
                ))}
              </div>

              {/* Decision 4 */}
              <SubHeading>Decision 4: Upfront Constraint Check — designing for failure before it happens</SubHeading>
              <p className="ttd-body mb-3">
                <span className="font-medium text-ink">Problem:</span> TTD allows 2 transactions per account per monthly release. Currently, users discover they've hit the limit after waiting in queue for 30–45 minutes.
              </p>
              <p className="ttd-body mb-3">
                <span className="font-medium text-ink">What I chose:</span> Check constraints on the pilgrim selection page, before queue entry. Account limit reached: "You've used both bookings for this month." Account holder in second transaction: "Your second booking can only include other pilgrims, not yourself."
              </p>
              <p className="ttd-body mb-8">
                <span className="font-medium text-ink">The tradeoff:</span> Surfacing constraints early means some users see a rejection immediately. But a clear rejection in 5 seconds is better than a surprise rejection after 30 minutes of waiting.
              </p>

              {/* Decision 5 */}
              <SubHeading>Decision 5: No Priority Re-Entry — the fairness tradeoff</SubHeading>
              <p className="ttd-body mb-3">
                <span className="font-medium text-ink">Problem:</span> Priority re-entry for failed users creates a loop where back-of-queue users never advance.
              </p>
              <p className="ttd-body mb-3">
                <span className="font-medium text-ink">What I chose:</span> Timer expires, slot releases, user enters randomized queue. No exceptions. The 3-minute lock IS the grace period. After expiry, fairness requires equal treatment.
              </p>

              <Callout>
                A system that gives failed users priority is structurally unfair to waiting users. Saved profiles mean re-queuing is painless (no re-typing). And fairness is the entire design thesis.
              </Callout>

              {/* Where design ends and engineering begins */}
              <SubHeading>Where design ends and engineering begins</SubHeading>
              <p className="ttd-body mb-6">
                The 3-minute lock requires a server-side timer with webhook integration for payment confirmation. The profile system needs a new database table linked to the existing user account. The per-identity constraint check (one ID per SED booking per cycle) requires backend validation against the booking database. The immediate-release-on-payment-failure mechanism depends on definitive webhook responses from payment gateways.
              </p>
              <p className="text-ink-soft leading-relaxed">
                I scoped the design to what a product designer owns and documented where engineering takes over. I know these boundaries because I am a computer science engineering graduate with full-stack development experience.
              </p>
            </section>

            {/* ═══════════ DIRECTIONAL METRICS ═══════════ */}
            <div className="ttd-divider" />
            <section ref={setRef("metrics")} id="metrics" className="scroll-mt-24">
              <h2 className="ttd-switzer ttd-section-h2 text-3xl md:text-4xl font-semibold tracking-tight mb-10 text-ink">Directional Metrics</h2>

              <p className="ttd-body-lead mb-8">
                Falsifiable targets, not measured outcomes. These are the hypotheses this redesign would be tested against if implemented.
              </p>

              <div className="overflow-x-auto rounded-xl mb-8" style={{ border: "1px solid #E8E8E8" }}>
                <table className="w-full ttd-table">
                  <thead>
                    <tr style={{ background: "#eef5f2" }}>
                      <th className="text-left p-4 ttd-switzer" style={{ fontWeight: 600 }}>Metric</th>
                      <th className="text-left p-4 ttd-switzer" style={{ fontWeight: 600 }}>Current (Est.)</th>
                      <th className="text-left p-4 ttd-switzer" style={{ fontWeight: 600 }}>Target</th>
                      <th className="text-left p-4 ttd-switzer" style={{ fontWeight: 600 }}>How Redesign Achieves It</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { metric: "Booking-stage drop-off", current: "40–60%", target: "Under 10%", how: "Form bottleneck eliminated. Slot locks on selection." },
                      { metric: "Time: slot page to payment", current: "3–5 min", target: "Under 30 sec", how: "Profile pills replace typing. Select, confirm, pay." },
                      { metric: "Payment completion within hold", current: "No hold exists", target: "85%+ in 3 min", how: "3-min window allows 1 attempt + 1 retry across methods." },
                      { metric: '"Slot booked by another" error', current: "Primary complaint", target: "Zero", how: "Structurally impossible. Slots lock before payment." },
                      { metric: "Repeat data entry after failure", current: "100%", target: "Zero", how: "Saved profiles persist. Re-queue never requires re-typing." },
                    ].map((r, i) => (
                      <tr key={i} style={{ borderTop: "1px solid #E8E8E8" }}>
                        <td className="p-4 font-medium text-ink">{r.metric}</td>
                        <td className="p-4 text-ink-soft">{r.current}</td>
                        <td className="p-4 font-medium" style={{ color: "#15803D" }}>{r.target}</td>
                        <td className="p-4 text-ink-soft">{r.how}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* — User validation — */}
              <SubHeading>User validation</SubHeading>

              <Placeholder
                text="Results from testing with 3–5 family members who have actually booked TTD tickets. Include: 2–3 specific quotes, task completion rate, time comparison."
                height="300px"
              />

              {/* — What testing changed — */}
              <SubHeading>What testing changed</SubHeading>

              <p className="text-ink-soft text-lg leading-relaxed mb-8 italic">
                [Placeholder: Write 2–3 specific changes made based on testing. Example: "Two participants hesitated at the profile pills because they didn't understand what selecting meant. I added a micro-instruction below the pills: 'Tap to include in this booking.' One participant tried to tap the counter text instead of the pills. I increased the pill touch target from 40px to 48px and added a subtle highlight animation on first load."]
              </p>

              {/* — Business impact — */}
              <SubHeading>Business impact</SubHeading>

              <div className="space-y-6 mb-8">
                <div>
                  <p className="font-medium text-ink mb-2">Payment failure refund costs</p>
                  <p className="text-ink-soft leading-relaxed">Every failed payment where money is debited costs TTD staff time, bank coordination, and 10–15 days of float management. The 3-minute hold with retry reduces orphan transactions: users complete payment on the same locked slot instead of creating debited-but-unbooked states requiring manual reconciliation.</p>
                </div>
                <div>
                  <p className="font-medium text-ink mb-2">Customer support volume</p>
                  <p className="text-ink-soft leading-relaxed">The "slot booked by another pilgrim" error is the #1 driver of support tickets, RTI queries, and social media complaints. Eliminating it structurally removes the #1 support category entirely. The upfront constraint check eliminates the #2 category: users discovering limits after 30 minutes of waiting.</p>
                </div>
                <div>
                  <p className="font-medium text-ink mb-2">Hundi and donation revenue</p>
                  <p className="text-ink-soft leading-relaxed">TTD's hundi collection was Rs 1,611 crore in FY 2024–25. Devotees who trust the system donate more. Devotees who've endured a traumatic failure cycle donate less. Moving laddu and hundi options to a calm pre-queue screen likely increases add-on conversion.</p>
                </div>
              </div>

              {/* — How I used AI — */}
              <SubHeading>How I used AI</SubHeading>

              <p className="ttd-body mb-8">
                Used Claude for initial research synthesis (Play Store review analysis, comparable system research), drafting screen specifications from my written requirements, and generating interactive prototypes from detailed specs. All design decisions, interaction logic, user flows, flow inversion concept, constraint reasoning, and the 3-minute timer calculation are mine. The ideas are mine. AI accelerated the execution.
              </p>

              {/* — Scope and boundaries — */}
              <SubHeading>Scope and boundaries</SubHeading>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="rounded-xl bg-surface p-5">
                  <p className="font-medium text-ink mb-3">In scope</p>
                  <ul className="space-y-2 text-ink-soft text-sm">
                    <li>Profile management (3 screens)</li>
                    <li>Pilgrim selection with pills and constraint checks (1 screen)</li>
                    <li>Payment hold with 3-minute micro lock (1 screen)</li>
                    <li>Constraint messaging</li>
                    <li>Timer states and payment recovery</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-surface p-5">
                  <p className="font-medium text-ink mb-3">Out of scope</p>
                  <ul className="space-y-2 text-ink-soft text-sm">
                    <li>In-app identity verification</li>
                    <li>Anti-bot engineering</li>
                    <li>Queue allocation model</li>
                    <li>Payment gateway reliability</li>
                    <li>Offline/CSC booking pathway</li>
                    <li>Accommodation, Seva, Donation, Live Streaming</li>
                  </ul>
                </div>
              </div>

              <p className="text-ink-soft leading-relaxed">
                <span className="font-medium text-ink">Research limitations:</span> Based on secondary research (Play Store reviews, published system analysis, TTD press releases, comparable system analysis) and primary testing with 3–5 family members. Next step before implementation: moderated usability testing with representative users, particularly low-digital-literacy demographics on budget Android phones with slow 4G connections.
              </p>
            </section>

            {/* ═══════════ WHAT I LEARNED ═══════════ */}
            <div className="ttd-divider" />
            <section ref={setRef("what-i-learned")} id="what-i-learned" className="scroll-mt-24">
              <h2 className="ttd-switzer ttd-section-h2 text-3xl md:text-4xl font-semibold tracking-tight mb-10 text-ink">What I Learned</h2>

              <Callout>
                The most valuable design decision in this project was not a screen. It was refusing to add screens. Every rejected feature (Aadhaar verification, anti-broker architecture, tiered identity system) would have added complexity without solving the structural problem. The structural problem was sequence, not capability. Reordering operations solved what adding features never could.
              </Callout>

              <p className="ttd-body mb-6">
                Coming from a development background, my edge is the unglamorous middle of a flow: the webhook that never returns, the app-switch mid-payment, the concurrent device race. I treated those states as first-class design problems rather than engineering afterthoughts, because for 25 million users that is where trust is actually built or broken.
              </p>

              <div className="rounded-2xl bg-surface p-8 mb-8">
                <p className="text-sm font-medium text-ink mb-3 tracking-wider uppercase">Honest next step</p>
                <p className="ttd-body">
                  Primary research. This redesign rests on secondary sources — the live app, Play Store reviews, a published system teardown, and comparable platforms. Before any real spec, I'd run moderated usability tests of the profile-pill interaction and the 3-minute hold with the exact users the current system fails: elderly, rural, low-connectivity devotees on budget phones.
                </p>
              </div>

              <div className="mt-16 pt-12 border-t border-border flex items-center justify-between">
                <a href="/" className="text-ink-soft hover:text-ink transition-colors">← All work</a>
                <a href="/about" className="text-ink-soft hover:text-ink transition-colors">About me →</a>
              </div>
            </section>

          </article>
        </div>
      </div>
    </>
  );
}
