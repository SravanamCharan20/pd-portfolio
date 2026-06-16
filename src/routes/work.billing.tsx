/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/work/billing")({
  head: () => ({
    meta: [
      { title: "Omakase — The Duel · Case Study" },
      { name: "description", content: "A last-mile decision tool for food delivery — binary comparison to beat scroll fatigue." },
    ],
  }),
  component: OmakaseCaseStudy,
});

const sections = [
  { id: "overview", label: "Overview" },
  { id: "scroll-trap", label: "The Scroll Trap" },
  { id: "why-two", label: "Why 2, Not 20" },
  { id: "duel-flow", label: "How a Duel Plays" },
  { id: "three-endings", label: "Three Endings" },
  { id: "what-broke", label: "What Almost Broke It" },
  { id: "why-matters", label: "Why This Matters" },
  { id: "design-system", label: "Design System" },
  { id: "honest-gaps", label: "What This Doesn't Solve" },
];

function ScreenStrip({ screens, caption }: { screens: { src: string; label?: string }[]; caption: string }) {
  return (
    <div className="mb-8">
      <div className="rounded-2xl overflow-hidden bg-[#ECEFF1] p-4 sm:p-8 md:p-12">
        <div className="flex items-start justify-start sm:justify-center gap-4 sm:gap-8 overflow-x-auto pb-2 snap-x snap-mandatory">
          {screens.map((s, i) => (
            <div key={i} className="flex flex-col items-center shrink-0 snap-center">
              <div className="bg-[#111] rounded-[1.8rem] sm:rounded-[2.2rem] p-2 sm:p-2.5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)]">
                <iframe
                  src={s.src}
                  title={s.label || "Screen"}
                  className="rounded-[1.4rem] sm:rounded-[1.8rem] border-0 bg-white block w-[220px] sm:w-[260px] md:w-[300px]"
                  style={{ aspectRatio: "9/20" }}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-sm text-ink-soft mt-4">{caption}</p>
    </div>
  );
}

function OmakaseCaseStudy() {
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
                  className={`text-left text-base py-1 cursor-pointer transition-colors ${active === s.id ? "text-red-500 font-medium" : "text-ink-soft"}`}
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
            UX Case Study · Concept Feature · Mobile
          </p>
          <h1 className="ttd-hero-anim font-display font-light text-[7vw] sm:text-[10vw] md:text-[7vw] leading-[1.10] tracking-[-0.04em] text-ink max-w-7xl" style={{ '--d': '0.25s' } as React.CSSProperties}>
            Omakase — The <span className="text-red-500/90">Duel</span>
          </h1>
          <div className="ttd-line-reveal mt-6 h-px bg-ink/10 max-w-2xl origin-left" />
          <p className="ttd-hero-anim mt-8 text-lg md:text-xl text-ink-soft max-w-2xl leading-relaxed" style={{ '--d': '0.55s' } as React.CSSProperties}>
            A last-mile decision tool for food delivery. Two dishes, side by side. Pick one. Repeat. Under 75 seconds from duel entry to add-to-cart.
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
                    className={`text-left cursor-pointer transition-colors ${
                      active === s.id ? "text-red-500/90 font-medium text-[16px]" : "text-ink-soft hover:text-red-600"
                    }`}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
              <li className="pt-4">
                <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-ink-soft hover:text-ink cursor-pointer">
                  | Back to top |
                </button>
              </li>
            </ul>
          </aside>

          {/* CONTENT */}
          <article className="w-full space-y-24">
            {/* OVERVIEW */}
            <section ref={setRef("overview")} id="overview" className="scroll-mt-24">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 sm:gap-y-8 mb-12">
                <div>
                  <p className="text-sm font-medium text-ink mb-2">My Role</p>
                  <p className="text-ink-soft">Product Designer — concept, interaction logic, UI, design system</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-ink mb-2">Timeline</p>
                  <p className="text-ink-soft">May — June 2026</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-ink mb-2">Team</p>
                  <p className="text-ink-soft">Solo designer</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-ink mb-2">Sector</p>
                  <p className="text-ink-soft">Food Delivery</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-ink mb-2">Type</p>
                  <p className="text-ink-soft">Concept Feature</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-ink mb-2">Tools</p>
                  <p className="text-ink-soft">Figma</p>
                </div>
              </div>

              <div className="rounded-2xl bg-surface p-8 mb-12">
                <p className="text-sm font-medium text-ink mb-3 tracking-wider uppercase">The Bet</p>
                <p className="text-ink text-lg leading-relaxed">
                  A stuck user takes 5–7 minutes to decide after they've stopped browsing. The duel's hypothesis: under 75 seconds from duel entry to add-to-cart, in at most four taps.
                </p>
              </div>

              <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight mb-6">Challenge</h2>
              <p className="text-ink-soft text-lg leading-relaxed mb-6">
                People open food delivery apps hungry but undecided. They scroll past dozens of options, tap into a few, back out, and either settle for something familiar or close the app entirely. Existing tools — filters, recommendations, curated lists — help users find food but offer nothing for the final decision between the last few options they'd happily eat.
              </p>

              <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight mt-16 mb-6">Solution</h2>
              <p className="text-ink-soft text-lg leading-relaxed mb-12">
                A binary comparison feature that takes the user's browsed pool and presents two dishes at a time. Pick one, repeat. Each tap sets a preference boundary — non-veg over veg, budget over premium — and the system narrows to a winner in at most four rounds, one per dimension. Most sessions resolve in two or three.
              </p>

              {/* INTERACTIVE PROTOTYPE — between Solution and Scroll Trap */}
              <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight mt-16 mb-6">Interactive Prototype</h2>
              <div className="-mx-8 sm:mx-0 rounded-none sm:rounded-2xl overflow-hidden overflow-y-auto bg-[#ECEFF1]" style={{ height: "min(980px, 85vh)" }}>
                <iframe
                  src="/omakase-dc/prototype.html?mode=phone"
                  title="Omakase Duel — Interactive Prototype"
                  className="h-full border-0"
                  style={{ width: "100%", minWidth: "375px" }}
                  loading="lazy"
                />
              </div>
              <div className="mt-6 rounded-2xl bg-surface p-6 md:p-8">
                <p className="text-sm font-medium text-ink mb-3 tracking-wider uppercase">How to interact</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-ink-soft text-[15px] leading-relaxed">
                  <div>
                    <p><span className="font-medium text-ink">Gallery</span> — overview of every screen at a glance.</p>
                    <p className="mt-2"><span className="font-medium text-ink">Prototype</span> — tap "Start the duel" to begin the flow.</p>
                    <p className="mt-2"><span className="font-medium text-ink">Dish cards</span> — tap either card to pick it and advance.</p>
                  </div>
                  <div>
                    <p><span className="font-medium text-ink">Toss both</span> — skip both dishes, moves to next pairing.</p>
                    <p className="mt-2"><span className="font-medium text-ink">Winner → See runner-ups</span> — browse near-misses.</p>
                    <p className="mt-2"><span className="font-medium text-ink">Restart flow</span> — resets the prototype to the beginning.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 01 — THE SCROLL TRAP */}
            <section ref={setRef("scroll-trap")} id="scroll-trap" className="scroll-mt-24">
              <div className="mb-8">
                <span className="font-display text-4xl sm:text-5xl text-ink-soft/40 block mb-2">01</span>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight">The Scroll Trap</h2>
              </div>
              <p className="text-ink-soft text-lg leading-relaxed mb-8 italic">
                I opened Swiggy three times last Tuesday before I ordered anything. Scrolled. Closed the app. Opened it again. Scrolled more. Eventually I ordered the same biryani I always get — not because I wanted it, but because I ran out of patience.
              </p>
              <p className="text-ink-soft text-lg leading-relaxed mb-8">
                I asked five friends. Same pattern. Open, scroll, close, settle. Food delivery apps have solved discovery. Filters, "popular near you," curated lists — finding good food is easy. The hard part is what comes after. You're staring at eight dishes you'd happily order, and the app gives you nothing to help you pick between them.
              </p>
              <p className="text-ink-soft text-lg leading-relaxed mb-8">
                For the six of us, that decision phase burned 5–7 minutes. Sometimes it ends with an order. Often it ends with a closed app and an empty cart.
              </p>
              <div className="rounded-2xl bg-surface p-8">
                <p className="text-ink text-xl md:text-2xl font-display font-medium leading-relaxed">
                  The problem isn't too many options. It's the absence of a tool for the last-mile decision.
                </p>
              </div>
            </section>

            {/* 02 — WHY 2, NOT 20 */}
            <section ref={setRef("why-two")} id="why-two" className="scroll-mt-24">
              <div className="mb-8">
                <span className="font-display text-4xl sm:text-5xl text-ink-soft/40 block mb-2">02</span>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight">Why 2, Not 20</h2>
              </div>
              <p className="text-ink-soft text-lg leading-relaxed mb-6">
                Two dishes, side by side. Pick one. Repeat. It took two wrong sketches to get here.
              </p>
              <p className="text-ink-soft text-lg leading-relaxed mb-6">
                My first sketch was a Tinder-style swipe — left to reject, right to accept. It felt fun for the first ten dishes. Then I realized I was just browsing again, one card at a time. There was no clear stopping point.
              </p>
              <p className="text-ink-soft text-lg leading-relaxed mb-6">
                My second sketch was a ranking screen — drag five dishes into the order you want them. To rank five, you have to hold all five in your head. Ten mental comparisons for a feature meant to reduce effort. I'd rebuilt the scrolling exhaustion in different clothes.
              </p>

              {/* EVOLUTION STRIP — interactive embed */}
              <div className="-mx-8 sm:mx-0 rounded-none sm:rounded-2xl overflow-hidden overflow-x-auto bg-white mb-8">
                <iframe
                  src="/omakase-evolution/index.html"
                  title="Evolution strip — Swipe → Rank → Binary Duel"
                  className="border-0"
                  style={{ width: "100%", height: "min(540px, 70vh)", minWidth: 600 }}
                  loading="lazy"
                />
              </div>

              <p className="text-ink-soft text-lg leading-relaxed mb-6">
                The answer is just two. Two is the easiest decision a person can make. Anything more turns into a list, and lists are what got the user stuck.
              </p>
              <p className="text-ink-soft text-lg leading-relaxed">
                But here's what I almost missed. The user isn't picking a dish in each round. They're picking a direction. Non-veg over veg. Chicken over mutton. Premium over budget. Each tap sets a boundary, and the system finds the best dish inside it. That's the gap filters and recommendations never close.
              </p>
            </section>

            {/* 03 — HOW A DUEL PLAYS OUT */}
            <section ref={setRef("duel-flow")} id="duel-flow" className="scroll-mt-24">
              <div className="mb-8">
                <span className="font-display text-4xl sm:text-5xl text-ink-soft/40 block mb-2">03</span>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight">How a Duel Plays Out</h2>
              </div>
              <p className="text-ink-soft text-lg leading-relaxed mb-8">
                The duel appears when the user has scrolled past thirty dishes, tapped into three, backed out of each in seconds, and stalled. That's not browsing. That's being stuck.
              </p>

              {/* ENTRY POINT SCREEN */}
              <ScreenStrip
                screens={[{ src: "/omakase-dc/embed.html?screen=entry", label: "Entry point" }]}
                caption="Entry point — dark inline card in the browse feed"
              />

              <div className="space-y-6 mb-12">
                <div className="rounded-2xl bg-surface p-6">
                  <p className="text-sm font-medium text-ink mb-2">Round 1 — Dietary Type</p>
                  <p className="text-ink-soft leading-relaxed">Chicken Biryani vs Andhra Paneer Biryani. User taps Chicken Biryani. One tap — the entire veg category is gone. Eight dishes eliminated by a single decision. The "Non-veg" tag locks at the top of the screen.</p>
                </div>
                <div className="rounded-2xl bg-surface p-6">
                  <p className="text-sm font-medium text-ink mb-2">Round 2 — Protein</p>
                  <p className="text-ink-soft leading-relaxed">Chicken Biryani vs Mutton Biryani from Shah Ghouse. User picks chicken. Mutton and every other non-chicken option get down-weighted. Not deleted — pushed lower.</p>
                </div>
              </div>

              {/* DUEL ROUNDS 1 & 2 */}
              <ScreenStrip
                screens={[
                  { src: "/omakase-dc/embed.html?screen=duel1", label: "Round 1" },
                  { src: "/omakase-dc/embed.html?screen=duel2", label: "Round 2" },
                ]}
                caption="Round 1 — Veg vs Non-veg · Round 2 — Meat-Type"
              />

              <div className="space-y-6 mb-12">
                <div className="rounded-2xl bg-surface p-6">
                  <p className="text-sm font-medium text-ink mb-2">Round 3 — Price</p>
                  <p className="text-ink-soft leading-relaxed">A ₹430 Special Chicken Biryani vs a ₹180 Chicken Biryani — the price extremes of what's left. User picks the ₹180 dish. "Budget" locks as a tag.</p>
                </div>
                <div className="rounded-2xl bg-surface p-6">
                  <p className="text-sm font-medium text-ink mb-2">Round 4 — Spice</p>
                  <p className="text-ink-soft leading-relaxed">Lucknow Biryani (mild) vs Chicken Dum Biryani (spicy). User picks spicy. Four taps. About 45 seconds.</p>
                </div>
              </div>

              {/* DUEL ROUNDS 3 & 4 */}
              <ScreenStrip
                screens={[
                  { src: "/omakase-dc/embed.html?screen=duel3", label: "Round 3" },
                  { src: "/omakase-dc/embed.html?screen=duel4", label: "Round 4" },
                ]}
                caption="Round 3 — Price · Round 4 — Spice-level"
              />

              <div className="rounded-2xl bg-surface p-8">
                <p className="text-ink text-lg leading-relaxed">
                  <span className="font-medium">Winner: Chicken Dum Biryani, Meghana Foods, ₹260.</span> That price was on neither card in Round 3. The user never "picked" the winner — they drew four boundaries, and the best-rated dish standing inside all four won. That's the directions-not-dishes idea doing real work.
                </p>
              </div>

              <p className="text-ink-soft text-lg leading-relaxed mt-8">
                The whole card is the button — no small "pick this" link inside it. Bigger surface, faster tap, nothing to aim at. There's no AI under any of this. Each pick adds a tag. The user can see exactly why every comparison is happening, because they made it happen.
              </p>
            </section>

            {/* 04 — THREE ENDINGS */}
            <section ref={setRef("three-endings")} id="three-endings" className="scroll-mt-24">
              <div className="mb-8">
                <span className="font-display text-4xl sm:text-5xl text-ink-soft/40 block mb-2">04</span>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight">Three Ways It Ends</h2>
              </div>
              <p className="text-ink-soft text-lg leading-relaxed mb-8">
                A game with one ending gets boring. A game with no ending breaks trust. The duel has three, each designed for a different emotional state.
              </p>

              <div className="space-y-6 mb-8">
                <div className="rounded-2xl bg-surface p-6">
                  <p className="font-display text-xl font-medium mb-3">Direct Strike</p>
                  <p className="text-ink-soft leading-relaxed">One dish clearly won across every round. The user feels decisive — they chose this, round by round. No algorithm override. Just a clean result and an Add-to-cart button.</p>
                </div>
                <div className="rounded-2xl bg-surface p-6">
                  <p className="font-display text-xl font-medium mb-3">Split Decision</p>
                  <p className="text-ink-soft leading-relaxed">The winner is clear, but two or three dishes came close. Instead of discarding them, the runner-up tray surfaces them with "Order Now" buttons — an insurance net that keeps the session alive if the winner doesn't land.</p>
                </div>
                <div className="rounded-2xl bg-surface p-6">
                  <p className="font-display text-xl font-medium mb-3">Stalemate</p>
                  <p className="text-ink-soft leading-relaxed">The user's taste was too specific, or they tossed too many pairs. Instead of forcing a bad answer, it offers two soft exits — adjust and retry, or drop back into the full list.</p>
                </div>
              </div>

              {/* WINNER, RUNNER-UP & STALEMATE SCREENS */}
              <ScreenStrip
                screens={[
                  { src: "/omakase-dc/embed.html?screen=winner", label: "Winner" },
                  { src: "/omakase-dc/embed.html?screen=runner", label: "Runner-ups" },
                  { src: "/omakase-dc/embed.html?screen=stalemate", label: "Stalemate" },
                ]}
                caption="Winner — Direct Strike · Runner-up tray — Split Decision · Stalemate — graceful exit"
              />

              <p className="text-ink-soft text-lg leading-relaxed">
                The stalemate is the most important screen I designed. Most features only plan for success. How you handle the moment the tool fails is what decides whether the user trusts it next time.
              </p>
            </section>

            {/* 05 — WHAT ALMOST BROKE IT */}
            <section ref={setRef("what-broke")} id="what-broke" className="scroll-mt-24">
              <div className="mb-8">
                <span className="font-display text-4xl sm:text-5xl text-ink-soft/40 block mb-2">05</span>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight">What Almost Broke It</h2>
              </div>
              <p className="text-ink-soft text-lg leading-relaxed mb-6">
                Nothing here broke in code, because nothing was built. It broke on paper. I pulled twenty-five real dishes from my own browse history into a sheet and ran the algorithm by hand — playing both user and system, round by round, for hours. Three breaks surfaced.
              </p>

              <h3 className="font-display text-2xl font-medium mb-4 mt-10">Break 1 — Fairness</h3>
              <p className="text-ink-soft text-lg leading-relaxed mb-6">
                The pool has twenty-five dishes — ten chicken, four mutton, three seafood, a few others. The first version always compared the two biggest groups. A user who wanted fish never saw a single seafood dish. The system was fast, but quietly ignoring smaller groups.
              </p>
              <p className="text-ink-soft text-lg leading-relaxed mb-6">
                The real fix: don't let the duel start if the pool is too wide. If any dimension has more than three groups, the duel skips it. If every dimension is too wide, the duel doesn't trigger at all. The user's own browsing does the narrowing first.
              </p>

              <h3 className="font-display text-2xl font-medium mb-4 mt-10">Break 2 — Deadlock</h3>
              <p className="text-ink-soft text-lg leading-relaxed mb-6">
                Two chicken biryanis with the same rating, same price, same distance. Every number matched, and the logic froze. So I built a tiebreaker cascade with five steps.
              </p>

              {/* EDGE CASE SCREENS */}
              <ScreenStrip
                screens={[
                  { src: "/omakase-dc/embed.html?screen=duel5", label: "Tiebreaker" },
                  { src: "/omakase-dc/embed.html?screen=duel6", label: "Toss-both" },
                ]}
                caption="Tiebreaker scenario · Toss-both scenario"
              />

              <h3 className="font-display text-2xl font-medium mb-4 mt-10">Break 3 — What "Toss" Means</h3>
              <p className="text-ink-soft text-lg leading-relaxed">
                When a user taps "Toss both," the early version deleted both dishes permanently. But tossing doesn't mean hating. It means "these two don't work together right now." So I replaced deletion with down-weighting. Tossed dishes drop to 30% of their original score. If the main pool runs dry, the highest-scoring tossed dishes come back for one last-resort round. If the user rejects that too, the system accepts defeat and shows the stalemate.
              </p>
            </section>

            {/* 06 — WHY THIS MATTERS */}
            <section ref={setRef("why-matters")} id="why-matters" className="scroll-mt-24">
              <div className="mb-8">
                <span className="font-display text-4xl sm:text-5xl text-ink-soft/40 block mb-2">06</span>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight">Why This Matters</h2>
              </div>
              <p className="text-ink-soft text-lg leading-relaxed mb-8">
                Every duel session that ends in an add-to-cart is an order that almost didn't happen. The user was ready to close the app. The duel caught them. That — recovered abandonment — is where the money is.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
                {[
                  { stat: "<75s", label: "Target time-to-cart from duel entry" },
                  { stat: "~45s", label: "Worked session in Section 03" },
                  { stat: "5–7 min", label: "Avg. stuck phase (anecdotal baseline)" },
                ].map((m) => (
                  <div key={m.label} className="rounded-2xl bg-surface p-6">
                    <p className="font-display text-3xl font-medium">{m.stat}</p>
                    <p className="text-sm text-ink-soft mt-2">{m.label}</p>
                  </div>
                ))}
              </div>

              <p className="text-ink-soft text-lg leading-relaxed mb-6">
                A note of honesty about the Runner-Up Tray: it is not an incremental-revenue surface. A user ordering a runner-up instead of the winner is substitution — same order, different dish, zero new rupees. The tray's real job is insurance. When the winner doesn't land, the tray keeps the session alive instead of dumping the user back into the scroll.
              </p>
              <p className="text-ink-soft text-lg leading-relaxed">
                There's also a data angle. Each session produces a structured tag profile — non-veg, chicken, budget, spicy. Across thousands of sessions, that becomes a taste graph, and it's cleaner than passive browsing data because the user actively stated every preference.
              </p>
            </section>

            {/* 07 — DESIGN SYSTEM */}
            <section ref={setRef("design-system")} id="design-system" className="scroll-mt-24">
              <div className="mb-8">
                <span className="font-display text-4xl sm:text-5xl text-ink-soft/40 block mb-2">07</span>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight">The System Underneath</h2>
              </div>
              <p className="text-ink-soft text-lg leading-relaxed mb-8">
                The visual theme is loosely inspired by Zomato. This isn't a redesign for Zomato — the duel is the feature concept, and Zomato's visual language gave it a familiar roof to live under. Everything sits on a 4pt grid in Figma.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="rounded-2xl bg-surface p-6">
                  <p className="text-sm font-medium text-ink mb-3">Colors</p>
                  <p className="text-ink-soft leading-relaxed">Brand red (#F04F5F), eight-step neutral ramp, semantic tokens — traffic-light rating tiers, delivery, card border.</p>
                </div>
                <div className="rounded-2xl bg-surface p-6">
                  <p className="text-sm font-medium text-ink mb-3">Typography</p>
                  <p className="text-ink-soft leading-relaxed">Inter, five-step scale: 44 / 34 / 26 / 20 / 16. Revised after on-device testing — what looked right on 720px read small on a real phone.</p>
                </div>
                <div className="rounded-2xl bg-surface p-6">
                  <p className="text-sm font-medium text-ink mb-3">Spacing</p>
                  <p className="text-ink-soft leading-relaxed">Ten tokens on the 4pt base: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64. Every value snaps to the grid.</p>
                </div>
                <div className="rounded-2xl bg-surface p-6">
                  <p className="text-sm font-medium text-ink mb-3">Layout</p>
                  <p className="text-ink-soft leading-relaxed">Four-column grid, 16px margins and gutters, 720px canvas. Device-tested overrides: 32px card padding, 32px card radius, 64px VS badge.</p>
                </div>
              </div>

              <div className="rounded-2xl bg-surface-2 aspect-[16/6] mb-4 flex items-center justify-center">
                <p className="text-ink-soft text-sm">Design system images — coming soon</p>
              </div>
              <p className="text-sm text-ink-soft mb-8">Color tokens · Typography scale · Spacing ladder</p>

              <h3 className="font-display text-2xl font-medium mb-4 mt-10">Components</h3>
              <p className="text-ink-soft text-lg leading-relaxed mb-6">
                Duel card (the whole card is the tap target), buttons (primary / secondary / ghost), rating pill (three tiers), filter pill, status bar, VS badge.
              </p>
              <div className="rounded-2xl bg-surface-2 aspect-[16/10] mb-4 flex items-center justify-center">
                <p className="text-ink-soft text-sm">Component sheet — coming soon</p>
              </div>
            </section>

            {/* 08 — WHAT THIS DOESN'T SOLVE */}
            <section ref={setRef("honest-gaps")} id="honest-gaps" className="scroll-mt-24">
              <div className="mb-8">
                <span className="font-display text-4xl sm:text-5xl text-ink-soft/40 block mb-2">08</span>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight">What This Doesn't Solve</h2>
              </div>
              <p className="text-ink-soft text-lg leading-relaxed mb-6">
                The duel solves one specific moment. It's built for one person ordering alone, not groups. It handles veg and non-veg but not deeper dietary needs — Jain, gluten-free, allergies. It assumes the food category is already chosen. And if the user's browsing is too scattered, the duel never triggers at all.
              </p>
              <p className="text-ink-soft text-lg leading-relaxed mb-6">
                The marketplace distortion is mine to own. If a restaurant's dishes keep losing duels, that restaurant loses visibility. Two mitigation directions I'd explore: a visibility floor, and rotating group representatives so a dish that lost one matchup isn't buried for the next hundred sessions.
              </p>
              <p className="text-ink-soft text-lg leading-relaxed mb-6">
                And the biggest gap: no real users have tested any of this. The dimensions, the trigger thresholds, the round logic — all assumptions waiting for contact with reality.
              </p>

              <h3 className="font-display text-2xl font-medium mb-4 mt-10">Where It Goes Next</h3>
              <p className="text-ink-soft text-lg leading-relaxed mb-6">
                Every completed session leaves behind a tag profile. One session is a snapshot; ten are a pattern. A user who picks spicy budget chicken five sessions running doesn't need four rounds anymore. The shortcut is one card: "Your usual call — spicy chicken, under ₹300?" One add-to-cart, one "run the duel anyway" escape hatch.
              </p>
              <p className="text-ink-soft text-lg leading-relaxed mb-8">
                The validation I'd run first: five users, think-aloud sessions, one metric — Time-to-Cart from duel entry, against the 5–7 minute baseline. If the under-75-seconds hypothesis holds, the feature earns its place.
              </p>

              <div className="rounded-2xl bg-surface p-8 mb-8">
                <p className="text-ink text-xl md:text-2xl font-display font-medium leading-relaxed">
                  I used to evaluate my designs by how thorough they were. Now I evaluate them by what they say no to.
                </p>
              </div>

              <p className="text-ink-soft text-lg leading-relaxed">
                The duel became good the moment I stopped trying to make it work for every user and accepted that it only works for one specific moment.
              </p>

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
