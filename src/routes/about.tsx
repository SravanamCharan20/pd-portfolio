/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Lia Jimenez" },
      { name: "description", content: "From developer to designer — a horizontal journey across three acts." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const sec = sectionRef.current;
      const track = trackRef.current;
      if (!sec || !track) return;
      const rect = sec.getBoundingClientRect();
      const total = sec.offsetHeight - window.innerHeight;
      const p = Math.min(Math.max(-rect.top / total, 0), 1);
      const max = track.scrollWidth - window.innerWidth;
      setProgress(p);
      setX(p * max);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const act = progress < 0.34 ? "Developer" : progress < 0.66 ? "Transition" : "Designer";

  return (
    <>
      <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Instrument+Serif&display=swap" />

      <div className="bg-background min-h-screen">
        {/* NAV */}
        <header className="px-8 md:px-16 py-8 flex items-center justify-between sticky top-0 z-30 bg-background/80 backdrop-blur">
          <a href="/" className="font-display text-xl font-medium">Lia</a>
          <nav className="flex items-center gap-10 text-sm text-ink-soft">
            <a href="/#work" className="hover:text-ink transition-colors">Work</a>
            <a href="/about" className="text-ink">About</a>
            <a href="/#contact" className="hover:text-ink transition-colors">Contact</a>
          </nav>
        </header>

        {/* INTRO */}
        <section className="px-8 md:px-16 pt-16 md:pt-24 pb-16">
          <p className="text-sm text-ink-soft tracking-wider uppercase mb-6">About — three acts</p>
          <h1 className="font-display font-semibold text-[10vw] md:text-[7vw] leading-[0.95] tracking-[-0.04em] text-ink max-w-5xl">
            From compiler<br/>to canvas.
          </h1>
          <p className="mt-10 text-lg md:text-xl text-ink-soft max-w-2xl leading-relaxed">
            Scroll down to walk through it — left to right. A developer who slowly learned to draw, then never stopped.
          </p>
        </section>

        {/* HORIZONTAL JOURNEY */}
        <section
          ref={sectionRef}
          style={{ height: "320vh" }}
          className="relative"
        >
          <div className="sticky top-0 h-screen overflow-hidden">
            {/* Progress chrome */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-ink-soft">
              <span className={act === "Developer" ? "text-ink" : ""}>Developer</span>
              <span className="w-10 h-px bg-border" />
              <span className={act === "Transition" ? "text-ink" : ""}>Transition</span>
              <span className="w-10 h-px bg-border" />
              <span className={act === "Designer" ? "text-ink" : ""}>Designer</span>
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-[60%] h-px bg-border">
              <div className="h-px bg-ink transition-[width] duration-100" style={{ width: `${progress * 100}%` }} />
            </div>

            <div
              ref={trackRef}
              className="flex h-full will-change-transform"
              style={{ transform: `translate3d(${-x}px, 0, 0)`, transition: "transform 0.1s linear" }}
            >
              <DeveloperScreen />
              <TransitionScreen />
              <DesignerScreen />
            </div>
          </div>
        </section>

        {/* OUTRO */}
        <section className="px-8 md:px-16 py-32 max-w-4xl">
          <p className="font-display text-3xl md:text-5xl leading-tight text-ink tracking-tight">
            Today I live in the seam — close enough to the code to feel the friction, close enough to the canvas to make it beautiful.
          </p>
          <div className="mt-12 flex items-center gap-4">
            <a href="/#work" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-ink text-background hover:bg-ink/90 transition-colors">See the work <span aria-hidden>↗</span></a>
            <a href="mailto:hello@lia.studio" className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-border text-ink hover:bg-surface transition-colors">Say hello</a>
          </div>
        </section>
      </div>
    </>
  );
}

/* ─────────── SCREEN 1 — DEVELOPER (dark, technical, mono) ─────────── */
function DeveloperScreen() {
  return (
    <div className="shrink-0 w-screen h-screen px-8 md:px-16 py-24 bg-[oklch(0.13_0.012_260)] text-background">
      <div className="h-full grid grid-cols-6 grid-rows-6 gap-4">
        {/* Title */}
        <div className="col-span-3 row-span-2 rounded-3xl bg-background/[0.04] border border-background/10 p-8 flex flex-col justify-between">
          <span className="text-xs uppercase tracking-[0.2em] text-background/50">Act 01</span>
          <h2 className="font-display text-5xl md:text-6xl font-medium tracking-tight">
            I started <br/>in the <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-background/70">terminal.</span>
          </h2>
        </div>

        {/* Code block */}
        <div className="col-span-3 row-span-3 rounded-3xl bg-[oklch(0.18_0.015_260)] border border-background/10 p-6 font-mono text-[13px] leading-relaxed text-background/80" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          <div className="flex gap-1.5 mb-4">
            <span className="w-3 h-3 rounded-full bg-background/20" />
            <span className="w-3 h-3 rounded-full bg-background/20" />
            <span className="w-3 h-3 rounded-full bg-background/20" />
          </div>
          <p><span className="text-background/40">$</span> whoami</p>
          <p className="text-background/60">lia · age 14 · ruby on rails kid</p>
          <p className="mt-3"><span className="text-background/40">$</span> stack --list</p>
          <p>→ ruby · postgres · vim · stubborn opinions</p>
          <p className="mt-3"><span className="text-background/40">$</span> cat ~/.bashrc | tail -1</p>
          <p>alias ship="git push origin main --force-with-lease"</p>
          <p className="mt-3"><span className="text-background/40">$</span> ls ./regrets</p>
          <p className="text-background/50">// no items found.</p>
        </div>

        {/* Stat */}
        <div className="col-span-2 row-span-2 rounded-3xl bg-background/[0.04] border border-background/10 p-6 flex flex-col justify-between">
          <span className="text-xs uppercase tracking-[0.2em] text-background/50">First commit</span>
          <p className="font-display text-6xl md:text-7xl font-medium">2011</p>
          <p className="text-sm text-background/60">A blog about basset hounds. Still online, somehow.</p>
        </div>

        {/* Tags */}
        <div className="col-span-2 row-span-2 rounded-3xl bg-background/[0.04] border border-background/10 p-6 flex flex-col justify-between">
          <span className="text-xs uppercase tracking-[0.2em] text-background/50">Toolbelt</span>
          <div className="flex flex-wrap gap-2">
            {["TypeScript","React","Postgres","Rails","Vim","Tailwind","Linear","Node"].map(t => (
              <span key={t} className="px-3 py-1 rounded-full bg-background/10 text-sm text-background/80" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="col-span-2 row-span-1 rounded-3xl bg-background/[0.04] border border-background/10 p-6 flex items-center">
          <p className="text-sm text-background/70 leading-relaxed">"If it compiles, it ships." — every junior dev, including me, 2014.</p>
        </div>

        {/* Terminal stat row */}
        <div className="col-span-6 row-span-1 rounded-3xl bg-background/[0.04] border border-background/10 px-8 grid grid-cols-4 items-center text-background/80" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          <div><p className="text-xs text-background/40">commits</p><p className="text-2xl">12,408</p></div>
          <div><p className="text-xs text-background/40">repos</p><p className="text-2xl">147</p></div>
          <div><p className="text-xs text-background/40">prod incidents</p><p className="text-2xl">3</p></div>
          <div><p className="text-xs text-background/40">cups of coffee</p><p className="text-2xl">∞</p></div>
        </div>
      </div>
    </div>
  );
}

/* ─────────── SCREEN 2 — TRANSITION (split, dawn) ─────────── */
function TransitionScreen() {
  return (
    <div className="shrink-0 w-screen h-screen px-8 md:px-16 py-24 bg-gradient-to-r from-[oklch(0.13_0.012_260)] via-[oklch(0.85_0.02_60)] to-[oklch(0.97_0.01_80)]">
      <div className="h-full grid grid-cols-6 grid-rows-6 gap-4">
        {/* Big poetic line */}
        <div className="col-span-6 row-span-3 rounded-3xl bg-background/40 backdrop-blur-sm border border-background/30 p-10 md:p-16 flex items-center">
          <h2 className="font-display text-5xl md:text-7xl leading-[1.05] tracking-tight text-ink">
            Then one Tuesday I opened <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }} className="text-ink/70">Figma</span> — and never closed it.
          </h2>
        </div>

        {/* Left card — leaving */}
        <div className="col-span-2 row-span-3 rounded-3xl bg-[oklch(0.16_0.012_260)] text-background p-8 flex flex-col justify-between">
          <span className="text-xs uppercase tracking-[0.2em] text-background/50">Leaving behind</span>
          <ul className="space-y-2 text-background/80" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>
            <li>// merge conflicts at 1am</li>
            <li>// "it works on my machine"</li>
            <li>// 800-line PR reviews</li>
            <li>// shipping ugly things fast</li>
          </ul>
          <p className="text-sm text-background/60">— but keeping the rigor.</p>
        </div>

        {/* Middle card — bridge */}
        <div className="col-span-2 row-span-3 rounded-3xl bg-background/60 backdrop-blur border border-background/40 p-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full border border-ink/40 flex items-center justify-center mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="text-ink"/></svg>
          </div>
          <p className="font-display text-2xl text-ink tracking-tight">The seam</p>
          <p className="text-sm text-ink-soft mt-2 leading-relaxed">Where engineers stop and designers start — I just moved my desk into it.</p>
        </div>

        {/* Right card — arriving */}
        <div className="col-span-2 row-span-3 rounded-3xl bg-[oklch(0.99_0.005_80)] border border-border p-8 flex flex-col justify-between">
          <span className="text-xs uppercase tracking-[0.2em] text-ink-soft">Arriving at</span>
          <ul className="space-y-2 text-ink/80 text-[14px] leading-relaxed">
            <li>· slow thinking, fast iteration</li>
            <li>· color and contrast and air</li>
            <li>· typography as engineering</li>
            <li>· interfaces that feel honest</li>
          </ul>
          <p className="text-sm text-ink-soft" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: 18 }}>— a new kind of craft.</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────── SCREEN 3 — DESIGNER (warm, editorial, light) ─────────── */
function DesignerScreen() {
  return (
    <div className="shrink-0 w-screen h-screen px-8 md:px-16 py-24 bg-[oklch(0.985_0.005_85)] text-ink">
      <div className="h-full grid grid-cols-6 grid-rows-6 gap-4">
        {/* Title */}
        <div className="col-span-4 row-span-2 rounded-3xl bg-surface p-10 flex flex-col justify-between">
          <span className="text-xs uppercase tracking-[0.2em] text-ink-soft">Act 03</span>
          <h2 className="font-display text-5xl md:text-6xl font-medium tracking-tight leading-[1.02]">
            Now I design <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }} className="text-ink/70">quietly</span>, on purpose.
          </h2>
        </div>

        {/* Palette */}
        <div className="col-span-2 row-span-2 rounded-3xl bg-surface p-6 flex flex-col justify-between">
          <span className="text-xs uppercase tracking-[0.2em] text-ink-soft">Today's palette</span>
          <div className="flex gap-2 h-16">
            {["oklch(0.99 0.005 85)","oklch(0.93 0.01 80)","oklch(0.78 0.04 60)","oklch(0.42 0.02 260)","oklch(0.12 0.005 260)"].map((c,i) => (
              <div key={i} className="flex-1 rounded-xl border border-border" style={{ background: c }} />
            ))}
          </div>
          <p className="text-sm text-ink-soft">Warm whites, ink black, one whisper of clay.</p>
        </div>

        {/* Type specimen */}
        <div className="col-span-2 row-span-2 rounded-3xl bg-surface p-6 flex flex-col justify-between">
          <span className="text-xs uppercase tracking-[0.2em] text-ink-soft">Type</span>
          <div>
            <p className="font-display text-4xl tracking-tight leading-none">Switzer</p>
            <p className="text-sm text-ink-soft mt-1">Display · 500</p>
            <p className="mt-3 text-lg" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}>Instrument Serif</p>
            <p className="text-sm text-ink-soft">Accent · regular italic</p>
          </div>
        </div>

        {/* Principles */}
        <div className="col-span-2 row-span-3 rounded-3xl bg-surface p-8 flex flex-col justify-between">
          <span className="text-xs uppercase tracking-[0.2em] text-ink-soft">House rules</span>
          <ol className="space-y-3 text-ink/80 leading-relaxed">
            <li><span className="text-ink-soft tabular-nums mr-2">01</span> Clarity beats cleverness.</li>
            <li><span className="text-ink-soft tabular-nums mr-2">02</span> Whitespace is a feature.</li>
            <li><span className="text-ink-soft tabular-nums mr-2">03</span> Motion has manners.</li>
            <li><span className="text-ink-soft tabular-nums mr-2">04</span> Ship the rough edges, then sand.</li>
          </ol>
          <p className="text-sm text-ink-soft">Pinned above the desk, since 2022.</p>
        </div>

        {/* Big quote */}
        <div className="col-span-2 row-span-3 rounded-3xl bg-ink text-background p-8 flex flex-col justify-between">
          <span className="text-xs uppercase tracking-[0.2em] text-background/50">A working belief</span>
          <p className="font-display text-3xl leading-tight tracking-tight">
            "Design is just engineering with better manners."
          </p>
          <p className="text-sm text-background/60">— me, on a tuesday, probably wrong.</p>
        </div>

        {/* Today */}
        <div className="col-span-2 row-span-3 rounded-3xl bg-surface p-8 flex flex-col justify-between">
          <span className="text-xs uppercase tracking-[0.2em] text-ink-soft">Currently</span>
          <div>
            <p className="font-display text-2xl tracking-tight">Senior Product Designer</p>
            <p className="text-ink-soft">Grey Gray · Berlin</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-ink-soft">Shipped</p><p className="font-display text-2xl">38</p></div>
            <div><p className="text-ink-soft">Years in</p><p className="font-display text-2xl">12</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
