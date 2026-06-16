/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import p4 from "@/assets/project-4.jpg";

export const Route = createFileRoute("/work/ttd")({
  head: () => ({
    meta: [
      { title: "TTD Darshan Booking Redesign — Case Study" },
      { name: "description", content: "A structural redesign of the TTD app's darshan booking flow — where the bottleneck was never server capacity, but the order of operations." },
    ],
  }),
  component: TTDCaseStudy,
});

const sections = [
  { id: "overview", label: "Overview" },
  { id: "diagnosis", label: "The Diagnosis" },
  { id: "archetypes", label: "Who It Hurts Most" },
  { id: "core-move", label: "The Core Move" },
  { id: "hero-interaction", label: "The Hero Interaction" },
  { id: "upstream-fix", label: "The Upstream Fix" },
  { id: "guarantee", label: "The Guarantee" },
  { id: "designing-loss", label: "Designing the Loss" },
  { id: "edges", label: "The Edges" },
  { id: "not-built", label: "What I Didn't Build" },
  { id: "metrics", label: "How I'd Know It Worked" },
  { id: "reflection", label: "Reflection" },
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

function TTDCaseStudy() {
  const [active, setActive] = useState("overview");
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
                  className={`text-left text-base py-1 cursor-pointer transition-colors ${active === s.id ? "text-purple-700 font-medium" : "text-ink-soft"}`}
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

        {/* HERO */}
        <section className="px-8 md:px-16 pt-16 md:pt-24 pb-16 overflow-hidden">
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes ttd-fade-up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
            @keyframes ttd-line-grow{from{opacity:0;transform:scaleX(0)}to{opacity:1;transform:scaleX(1)}}
            .ttd-hero-anim{opacity:0;animation:ttd-fade-up .8s cubic-bezier(.22,1,.36,1) var(--d,0s) forwards}
            .ttd-line-reveal{opacity:0;transform:scaleX(0);animation:ttd-line-grow 1s cubic-bezier(.22,1,.36,1) .5s forwards}
            .ttd-scroll-bounce{animation:bounce 2s infinite}
            @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
          `}} />
          <p className="ttd-hero-anim text-sm text-ink-soft tracking-wider uppercase mb-6" style={{ '--d': '0.1s' } as React.CSSProperties}>
            UX Case Study · Civic Service · Mobile
          </p>
          <h1 className="ttd-hero-anim font-display font-light text-[7vw] sm:text-[10vw] md:text-[7vw] leading-[1.10] tracking-[-0.04em] text-ink max-w-7xl" style={{ '--d': '0.25s' } as React.CSSProperties}>
            Designing fairness into a ~900,000-person race
          </h1>
          <div className="ttd-line-reveal mt-6 h-px bg-ink/10 max-w-2xl origin-left" />
          <p className="ttd-hero-anim mt-8 text-lg md:text-xl text-ink-soft max-w-2xl leading-relaxed" style={{ '--d': '0.55s' } as React.CSSProperties}>
            A structural redesign of the TTD app's darshan booking flow — where the bottleneck was never server capacity, but the order of operations.
          </p>
          <div className="ttd-hero-anim mt-12 flex items-center gap-3 text-ink-soft/50" style={{ '--d': '0.9s' } as React.CSSProperties}>
            <div className="w-px h-8 bg-current ttd-scroll-bounce" />
            <span className="text-xs tracking-wider uppercase">Scroll to explore</span>
          </div>
        </section>
        {/* BODY w/ sidebar */}
        <div className="px-8 md:px-16 pb-32 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-12 md:gap-20">
          {/* SIDEBAR — hidden on mobile, replaced by floating FAB */}
          <aside className="hidden md:block md:sticky md:top-24 md:self-start">
            <ul className="space-y-4 text-[15px]">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => scrollTo(s.id)}
                    className={`text-left transition-colors cursor-pointer ${
                      active === s.id ? "text-purple-700/90 font-medium text-[16px]" : "text-ink-soft hover:text-purple-800"
                    }`}
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
          <article className="min-w-0 w-full space-y-24">
            {/* OVERVIEW */}
            <section ref={setRef("overview")} id="overview" className="scroll-mt-24">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 sm:gap-y-8 mb-12">
                <div>
                  <p className="text-sm font-medium text-ink mb-2">My Role</p>
                  <p className="text-ink-soft">Product Designer (end to end)</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-ink mb-2">Timeline</p>
                  <p className="text-ink-soft">1 week</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-ink mb-2">Scope</p>
                  <p className="text-ink-soft">SED booking flow — 5 screens, 18 states</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-ink mb-2">Sector</p>
                  <p className="text-ink-soft">Civic Service · Mobile</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-ink mb-2">Tools</p>
                  <p className="text-ink-soft">Figma, secondary research</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-ink mb-2">Type</p>
                  <p className="text-ink-soft">Concept Redesign</p>
                </div>
              </div>

              <div className="rounded-2xl bg-surface p-8 mb-12">
                <p className="text-sm font-medium text-ink mb-3 tracking-wider uppercase">The Stakes</p>
                <p className="text-ink text-lg leading-relaxed">
                  The Sri Venkateswara Temple at Tirumala is the most visited Hindu temple on earth — roughly 25 million pilgrims a year. When the booking fails, it is not experienced as an inconvenience. It is experienced as being turned away from something sacred.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
                {[
                  { stat: "~900K", label: "Concurrent users at release" },
                  { stat: "~240K", label: "Tickets per month" },
                  { stat: "~70%", label: "Leave with nothing" },
                  { stat: "<5 min", label: "Full sell-out" },
                ].map((m) => (
                  <div key={m.label} className="rounded-2xl bg-surface p-6">
                    <p className="font-display text-2xl md:text-3xl font-medium">{m.stat}</p>
                    <p className="text-sm text-ink-soft mt-2">{m.label}</p>
                  </div>
                ))}
              </div>

              <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight mb-6">Challenge</h2>
              <p className="text-ink-soft text-lg leading-relaxed mb-6">
                Special Entry Darshan tickets at Rs 300 are released once a month, in a single batch. At release time, roughly 900,000 people open the app at once to compete for about 240,000 tickets. Everything sells out within minutes.
              </p>
              <div className="rounded-2xl bg-surface p-8">
                <p className="text-ink text-lg leading-relaxed font-medium">
                  The thesis: the problem is not server capacity. It is allocation design. A system that lets you pick a slot but does not hold it while you fill in your details is structurally unfair — and no amount of extra servers fixes an unfair sequence.
                </p>
              </div>
            </section>

            {/* THE DIAGNOSIS */}
            <section ref={setRef("diagnosis")} id="diagnosis" className="scroll-mt-24">
              <div className="mb-8">
                <span className="font-display text-4xl sm:text-5xl text-ink-soft/40 block mb-2">01</span>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight">The Diagnosis</h2>
              </div>
              <p className="text-ink-soft text-lg leading-relaxed mb-8">
                I mapped the current booking flow step by step from the live app, Play Store reviews, and a published system-design teardown. The failure sits at one specific seam.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  { step: "1", name: "Login (mobile + OTP)", issue: "Aggressive auto-logout drops users at the worst moment" },
                  { step: "2", name: "Virtual queue + countdown", issue: "Opaque timer, no position shown" },
                  { step: "3", name: "Calendar + time slot", issue: "Popular dates vanish in seconds" },
                  { step: "4", name: "Choose slot + ticket count", issue: "Slot is NOT held — open to all 900K users" },
                  { step: "5", name: "Type details for up to 6 pilgrims", issue: "3–5 minutes of typing. Slot fills mid-form.", highlight: true },
                  { step: "6", name: "Payment", issue: "Gateway timeouts debit money without issuing a ticket" },
                  { step: "7", name: "Confirmation", issue: "Non-cancellable, non-refundable; name must match ID exactly" },
                ].map((s) => (
                  <div key={s.step} className={`rounded-xl p-4 flex gap-4 ${s.highlight ? "bg-red-50 border border-red-200" : "bg-surface"}`}>
                    <span className={`font-display text-lg font-medium w-8 shrink-0 ${s.highlight ? "text-red-600" : "text-ink-soft"}`}>{s.step}</span>
                    <div>
                      <p className={`font-medium ${s.highlight ? "text-red-900" : "text-ink"}`}>{s.name}</p>
                      <p className={`text-sm mt-1 ${s.highlight ? "text-red-700" : "text-ink-soft"}`}>{s.issue}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-surface p-8">
                <p className="text-ink text-lg leading-relaxed">
                  <span className="font-medium">Step 5 is the wound.</span> The user selects a slot, then spends three to five minutes typing names, ages, genders and ID numbers for up to six people. Through all of it, the selected slot is never reserved. It stays available to every other person in the country.
                </p>
                <p className="text-ink-soft text-base mt-4 italic">
                  "This slot was just booked by another pilgrim." — after five minutes of careful, pressured typing.
                </p>
              </div>

              {/* Video placeholder — will be added later */}
            </section>

            {/* WHO IT HURTS MOST */}
            <section ref={setRef("archetypes")} id="archetypes" className="scroll-mt-24">
              <div className="mb-8">
                <span className="font-display text-4xl sm:text-5xl text-ink-soft/40 block mb-2">02</span>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight">Who It Hurts Most</h2>
              </div>
              <p className="text-ink-soft text-lg leading-relaxed mb-8">
                A first-come-first-served typing race does not distribute pain evenly. It systematically disadvantages exactly the devotees with the least technical advantage.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  { name: "The Proxy Booker", desc: "22–35, urban", pain: "Books for elderly parents; juggles 6 people's IDs. Carries the whole family's hopes; pre-types IDs in Notes to paste fast." },
                  { name: "The Low-Connectivity Devotee", desc: "45–70, rural", pain: "Budget Android, slow data, slow typing. The system's worst victim — loses the race before finishing the form." },
                  { name: "The NRI Planner", desc: "30–55, abroad", pain: "Passport not Aadhaar; wrong time zone. Fights extra form fields and timing mismatch under the same clock." },
                  { name: "The Repeat Pilgrim", desc: "35–60", pain: "Has failed before; deeply distrustful. Knows all the workarounds and still cannot guarantee a ticket." },
                ].map((a) => (
                  <div key={a.name} className="rounded-2xl bg-surface p-6">
                    <p className="font-display text-lg font-medium mb-1">{a.name}</p>
                    <p className="text-sm text-ink-soft mb-3">{a.desc}</p>
                    <p className="text-ink-soft leading-relaxed">{a.pain}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-surface p-8">
                <p className="text-ink text-lg leading-relaxed font-medium">
                  If the fix depends on typing faster, having better internet, or knowing tricks, it fails the people who need it most. The intervention has to remove the speed advantage altogether — not optimise it.
                </p>
              </div>
            </section>

            {/* THE CORE MOVE */}
            <section ref={setRef("core-move")} id="core-move" className="scroll-mt-24">
              <div className="mb-8">
                <span className="font-display text-4xl sm:text-5xl text-ink-soft/40 block mb-2">03</span>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight">The Core Move</h2>
              </div>
              <p className="text-ink-soft text-lg leading-relaxed mb-8">
                Don't make it faster. Change the order. Every robust booking system I studied — Ticketmaster's Smart Queue, IRCTC's berth block, the Hajj Nusuk platform — shares one principle: never make the user enter data under allocation pressure, and always hold what they select.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="rounded-2xl bg-surface p-6">
                  <p className="text-sm font-medium text-ink mb-4 tracking-wider uppercase">Before — type under the clock</p>
                  <ol className="space-y-2 text-ink-soft">
                    <li>1. Login</li>
                    <li>2. Queue</li>
                    <li>3. Pick slot</li>
                    <li className="text-red-600 font-medium">4. Type 6 pilgrims (3–5 min)</li>
                    <li className="text-red-600 font-medium">5. Pay — no hold</li>
                    <li>6. Win or lose</li>
                  </ol>
                </div>
                <div className="rounded-2xl bg-surface p-6">
                  <p className="text-sm font-medium text-ink mb-4 tracking-wider uppercase">After — prepare in calm, lock on tap</p>
                  <ol className="space-y-2 text-ink-soft">
                    <li>1. Login</li>
                    <li className="text-green-700 font-medium">2. Pick saved pilgrims (5 sec)</li>
                    <li>3. Queue</li>
                    <li className="text-green-700 font-medium">4. Pick slot — locks instantly</li>
                    <li className="text-green-700 font-medium">5. Review + pay (3-min hold)</li>
                    <li>6. Confirm</li>
                  </ol>
                </div>
              </div>

              <p className="text-ink-soft text-lg leading-relaxed">
                Three things shift, and nothing else has to. The same data is collected. The same payment methods are used. The same virtual queue runs. Only the timing changes — and that single reordering removes the race condition, the wasted typing, and the system's primary source of distress.
              </p>
            </section>

            {/* THE HERO INTERACTION */}
            <section ref={setRef("hero-interaction")} id="hero-interaction" className="scroll-mt-24">
              <div className="mb-8">
                <span className="font-display text-4xl sm:text-5xl text-ink-soft/40 block mb-2">04</span>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight">The Hero Interaction</h2>
              </div>
              <p className="text-ink-soft text-lg leading-relaxed mb-6">
                Five minutes of typing becomes five seconds of tapping. Instead of typing six people's details against a countdown, the user taps saved profile pills. Selection takes seconds. The data was entered earlier, in a calm pre-booking moment with no clock running.
              </p>
              <p className="text-ink-soft text-lg leading-relaxed mb-8">
                Pills are 44px tall for fumble-free tapping on a budget phone. A blocked pill (a pilgrim already booked this cycle) is shown, dimmed, with a tap-to-explain — so the constraint is surfaced here, before the queue, not discovered after a 30-minute wait.
              </p>

              <TTDScreenStrip
                screens={[
                  { id: "select", label: "Select Pilgrims" },
                  { id: "constraintInfo", label: "Constraint Info" },
                ]}
                caption="Select Pilgrims with profile pills · Tap a blocked pill to see why"
              />
            </section>

            {/* THE UPSTREAM FIX */}
            <section ref={setRef("upstream-fix")} id="upstream-fix" className="scroll-mt-24">
              <div className="mb-8">
                <span className="font-display text-4xl sm:text-5xl text-ink-soft/40 block mb-2">05</span>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight">The Upstream Fix</h2>
              </div>
              <p className="text-ink-soft text-lg leading-relaxed mb-6">
                For the pills to exist, the data has to be captured earlier. A new 'My Pilgrims' section lets devotees save up to 12 profiles any time — at home, on the train, days before release. Twelve is deliberate: TTD allows two transactions of six pilgrims each per cycle, so 12 covers both without re-entry.
              </p>
              <p className="text-ink-soft text-lg leading-relaxed mb-8">
                One detail that prevents a gate-day disaster: the Name field placeholder reads 'Full name exactly as on ID proof'. TTD turns away pilgrims whose ticket name doesn't match their ID — a single Lakshmi / Laxmi difference is enough. Solving it at calm profile-creation time, not under the countdown, is the difference between a saved trip and a wasted one.
              </p>

              <TTDScreenStrip
                screens={[
                  { id: "menu", label: "Services Menu" },
                  { id: "pilEmpty", label: "Empty State" },
                  { id: "pilList", label: "Saved List" },
                  { id: "add", label: "Add Pilgrim" },
                ]}
                caption="Menu with new entry · Empty state · Saved pilgrim list · Add Pilgrim calm form"
              />
            </section>

            {/* THE GUARANTEE */}
            <section ref={setRef("guarantee")} id="guarantee" className="scroll-mt-24">
              <div className="mb-8">
                <span className="font-display text-4xl sm:text-5xl text-ink-soft/40 block mb-2">06</span>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight">The Guarantee</h2>
              </div>
              <p className="text-ink-soft text-lg leading-relaxed mb-6">
                Lock the slot, then start the clock. The moment a user confirms a slot, the backend locks it and a payment timer begins. The slot disappears from everyone else's screen. A two-tap confirm (pick, then confirm in a sheet) prevents accidental locks.
              </p>

              <h3 className="font-display text-2xl font-medium mb-4 mt-10">Why three minutes — not ten, not sixty seconds</h3>
              <div className="space-y-4 mb-8">
                {[
                  { option: "10 minutes", verdict: "Fails", reason: "At 240K slots, bots could hoard the entire inventory. Backend holds 3x more concurrent state. Built for 20K-seat concerts, not 900K pilgrims." },
                  { option: "60 seconds", verdict: "Fails", reason: "Read summary + pick payment + UPI round-trip on a slow phone is already 35–55s. One fumble and the slot is gone mid-payment. Replaces one cruelty with another." },
                  { option: "3 minutes", verdict: "Chosen", reason: "Enough for one real attempt plus one retry. Short enough that bot-held slots cycle back fast and the queue keeps moving." },
                ].map((t) => (
                  <div key={t.option} className={`rounded-xl p-4 ${t.verdict === "Chosen" ? "bg-green-50 border border-green-200" : "bg-surface"}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-medium text-ink">{t.option}</span>
                      <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${t.verdict === "Chosen" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"}`}>{t.verdict}</span>
                    </div>
                    <p className="text-ink-soft text-sm leading-relaxed">{t.reason}</p>
                  </div>
                ))}
              </div>

              <TTDScreenStrip
                screens={[
                  { id: "slot", label: "Confirm Lock" },
                  { id: "payDefault", label: "Payment Hold" },
                  { id: "payWarn", label: "Timer Critical" },
                ]}
                caption="Confirm Slot Lock sheet · Payment hold with live timer · Timer critical state"
              />
            </section>

            {/* DESIGNING THE LOSS */}
            <section ref={setRef("designing-loss")} id="designing-loss" className="scroll-mt-24">
              <div className="mb-8">
                <span className="font-display text-4xl sm:text-5xl text-ink-soft/40 block mb-2">07</span>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight">Designing the Loss</h2>
              </div>
              <p className="text-ink-soft text-lg leading-relaxed mb-6">
                70% of users lose. That's the majority experience. If the winning path is polished and the losing path is a dead end, I've designed for the minority. So every failure state answers three questions: what's happening, why, and what you can do next.
              </p>
              <p className="text-ink-soft text-lg leading-relaxed mb-8">
                The key reversal from today's app: when a payment fails, the slot stays locked for the rest of the window. The user switches from UPI to card and tries again — without losing the slot or re-typing anything. The current app drops them back into the queue to start over.
              </p>

              <TTDScreenStrip
                screens={[
                  { id: "payFail", label: "Payment Failed" },
                  { id: "paySuccess", label: "Confirmed" },
                  { id: "expiredOpen", label: "Expired (Open)" },
                  { id: "expiredClosed", label: "Expired (Closed)" },
                ]}
                caption="Payment failed (slot still locked) · Booking confirmed · Hold expired (queue open) · Hold expired (queue closed)"
              />
            </section>

            {/* THE EDGES */}
            <section ref={setRef("edges")} id="edges" className="scroll-mt-24">
              <div className="mb-8">
                <span className="font-display text-4xl sm:text-5xl text-ink-soft/40 block mb-2">08</span>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight">The Edges</h2>
              </div>
              <p className="text-ink-soft text-lg leading-relaxed mb-8">
                A booking flow is only as honest as its edge cases. These aren't decoration; they're where 25 million users' trust is won or lost.
              </p>

              <div className="space-y-3">
                {[
                  { edge: "First-timer with zero saved profiles", fix: "Manual-entry fallback on the Select Pilgrims screen. Saved profiles are the fast path, never the only path." },
                  { edge: "UPI sends the user out to GPay/PhonePe", fix: "Timer keeps running in-app; on return, a clear 'awaiting confirmation' state. The slot stays locked through the round-trip." },
                  { edge: "Money debited but no confirmation", fix: "Honest 'payment processing — refunded in 3–5 days if debited' plus a Check Booking Status path." },
                  { edge: "Same person booked from two accounts", fix: "One booking per ID per seva per cycle. Block shown on the pill with a tap-to-explain, before the queue." },
                  { edge: "Accidental slot tap", fix: "Two-tap confirm: pick, then confirm in a sheet. Accidents are caught before the lock." },
                  { edge: "User goes idle on the slot page", fix: "'Still looking?' prompt at 5 min; auto-release after 60s of no response." },
                ].map((e) => (
                  <div key={e.edge} className="rounded-xl bg-surface p-4">
                    <p className="font-medium text-ink mb-1">{e.edge}</p>
                    <p className="text-ink-soft text-sm leading-relaxed">{e.fix}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
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
              </div>
            </section>

            {/* WHAT I DELIBERATELY DIDN'T BUILD */}
            <section ref={setRef("not-built")} id="not-built" className="scroll-mt-24">
              <div className="mb-8">
                <span className="font-display text-4xl sm:text-5xl text-ink-soft/40 block mb-2">09</span>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight">What I Didn't Build</h2>
              </div>
              <p className="text-ink-soft text-lg leading-relaxed mb-8">
                Scope discipline was half this project. Several 'impressive' features were considered and killed on purpose.
              </p>

              <div className="space-y-4">
                {[
                  { feature: "In-app Aadhaar / biometric verification", why: "TTD verifies ID physically at the gate, not in the app. Building in-app verification solves a problem the gate already owns and excludes elderly and rural devotees without Aadhaar-linked phones." },
                  { feature: "Anti-broker architecture as a design surface", why: "Device fingerprinting, behavioural anomaly detection — all real, all engineering. A designer surfaces the constraint; a designer does not architect the bot-detection system." },
                  { feature: "A live 'slots on hold' counter", why: "It reads as helpful but turns booking into a live auction — users do mental math on expiring holds and start camping." },
                  { feature: "Priority re-entry for failed payments", why: "It feels kind and creates a death loop: prioritised retries mean the back of a 300K queue never advances. The 3-minute hold is the grace period; after it, everyone is equal." },
                ].map((f) => (
                  <div key={f.feature} className="rounded-xl bg-surface p-5">
                    <p className="font-medium text-ink mb-2">{f.feature}</p>
                    <p className="text-ink-soft text-sm leading-relaxed">{f.why}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* HOW I'D KNOW IT WORKED */}
            <section ref={setRef("metrics")} id="metrics" className="scroll-mt-24">
              <div className="mb-8">
                <span className="font-display text-4xl sm:text-5xl text-ink-soft/40 block mb-2">10</span>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight">How I'd Know It Worked</h2>
              </div>
              <p className="text-ink-soft text-lg leading-relaxed mb-8">
                This is a concept redesign without production data, so these are hypotheses — each one tied to a specific structural change, each one measurable.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-border">
                <table className="w-full text-sm min-w-[500px]">
                  <thead>
                    <tr className="bg-surface">
                      <th className="text-left p-4 font-medium text-ink">Metric</th>
                      <th className="text-left p-4 font-medium text-ink">Today (est.)</th>
                      <th className="text-left p-4 font-medium text-ink">Target</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { metric: "Drop-off after slot pick", today: "40–60%", target: "< 10%" },
                      { metric: "Time from slot to payment", today: "3–5 min", target: "< 30 sec" },
                      { metric: "Payment completion in window", today: "No hold", target: "85%+" },
                      { metric: "'Booked by another' error", today: "#1 complaint", target: "0" },
                      { metric: "Re-typing after a failure", today: "100%", target: "0" },
                    ].map((r) => (
                      <tr key={r.metric}>
                        <td className="p-4 text-ink">{r.metric}</td>
                        <td className="p-4 text-ink-soft">{r.today}</td>
                        <td className="p-4 font-medium text-green-700">{r.target}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* REFLECTION */}
            <section ref={setRef("reflection")} id="reflection" className="scroll-mt-24">
              <div className="mb-8">
                <span className="font-display text-4xl sm:text-5xl text-ink-soft/40 block mb-2">11</span>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight">Reflection</h2>
              </div>
              <p className="text-ink-soft text-lg leading-relaxed mb-6">
                The most valuable design decision here wasn't a screen — it was refusing to add screens. The instinct to build a verification system, an anti-broker engine, a richer queue, was strong. Killing those and reducing the intervention to five surgical screens on top of a live app was harder, and more correct.
              </p>
              <p className="text-ink-soft text-lg leading-relaxed mb-8">
                Coming from a development background, my edge is the unglamorous middle of a flow: the webhook that never returns, the app-switch mid-payment, the concurrent device race. I treated those states as first-class design problems rather than engineering afterthoughts, because for 25 million users that is where trust is actually built or broken.
              </p>

              <div className="rounded-2xl bg-surface p-8 mb-8">
                <p className="text-sm font-medium text-ink mb-3 tracking-wider uppercase">Honest next step</p>
                <p className="text-ink-soft text-lg leading-relaxed">
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
