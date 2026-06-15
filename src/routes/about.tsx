/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useMemo } from "react";
import Lenis from "lenis";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About me" },
      { name: "description", content: "About me — horizontal scroll experience." },
    ],
  }),
  component: AboutPage,
});

const REVEAL_TEXT =
  "After years of writing code, I realized perfect codebases are fundamentally broken when they never ship. I build for screens that real humans actually touch — fast, opinionated, alive. Let's stop treating dev like a high score game and start shipping things that actually feel alive.";

function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..1 across the horizontal journey
  const [vw, setVw] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1280);
  const [vh, setVh] = useState<number>(typeof window !== "undefined" ? window.innerHeight : 800);

  useEffect(() => {
    const onResize = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);


  const isMobile = vw < 640;
  const isTablet = vw >= 640 && vw < 1024;

  // Bigger = more vertical scroll distance => slower horizontal travel & text reveal
  const SCROLL_MULTIPLIER = 10;

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      smoothWheel: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Phase mapping (progress 0..1 across total vertical scroll):
  //   0.00 - 0.08 : "About me" intro overlay slides up & fades out
  //   0.08 - 0.50 : panel 1 pinned, text reveals character-by-character
  //   0.50 - 1.00 : horizontal scroll across the 3 panels (-200vw)
  const INTRO_END = 0.08;
  const REVEAL_END = 0.5;

  const introOut = Math.min(Math.max((progress - 0.0) / INTRO_END, 0), 1);
  const revealProgress = Math.min(
    Math.max((progress - INTRO_END) / (REVEAL_END - INTRO_END), 0),
    1,
  );
  const horizProgress = Math.min(
    Math.max((progress - REVEAL_END) / (1 - REVEAL_END), 0),
    1,
  );
  const translateX = -horizProgress * 200; // 300vw track - 100vw viewport

  const chars = useMemo(() => REVEAL_TEXT.split(""), []);
  const revealedCount = Math.floor(revealProgress * chars.length);

  const [menuOpen, setMenuOpen] = useState(false);

  if (isMobile) {
    return <MobileAbout />;
  }



  return (
    <div
      ref={containerRef}
      style={{ height: `${SCROLL_MULTIPLIER * 100}vh` }}
      className="relative bg-background"
    >
      
      
      <div className="sticky top-0 h-screen w-screen overflow-hidden">
        {/* Intro "About me" overlay */}
        <header className="absolute top-0 left-0 right-0 px-8 justify-between md:px-16 z-50 py-8 flex items-center">
          <a href="/" className="font-display text-xl font-medium">Charan</a>

          <nav className="hidden md:flex items-center gap-10 text-sm text-ink-soft ml-6">
            <a href="/#work" className="hover:text-ink transition-colors">Work</a>
            <a href="/about" className="hover:text-ink text-blue-500 text-semibold transition-colors">About</a>
            <a href="/contact" className="hover:text-ink transition-colors">Contact</a>
          </nav>

          <button className="md:hidden ml-auto p-2" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>

          {menuOpen && (
            <div className="fixed inset-0 z-50 md:hidden flex items-end" role="dialog" aria-modal="true" aria-label="Main menu">
              <button
                className="absolute inset-0 bg-black/60"
                onClick={() => setMenuOpen(false)}
                aria-hidden="true"
              />

              <div
                className="bg-white text-black w-full rounded-t-2xl p-6"
                onClick={(e) => e.stopPropagation()}
                style={{
                  transform: menuOpen ? "translateY(0%)" : "translateY(100%)",
                  transition: "transform 520ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <a href="/" className="font-display text-lg">Charan</a>
                  <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                <nav className="flex flex-col gap-4">
                  <a href="/#work" className="text-lg">Work</a>
                  <a href="/about" className="text-lg">About</a>
                  <a href="/contact" className="text-lg">Contact</a>
                </nav>
              </div>
            </div>
          )}
        </header>

        <div
          className="absolute inset-0 z-20 flex items-center justify-center bg-background"
          style={{
            transform: `translateY(${-introOut * 100}%)`,
            opacity: 1 - introOut,
            transition: "none",
          }}
        >
          <h1 className="text-[12vw] font-light tracking-tight text-foreground leading-none">
            About me
          </h1>
        </div>
        

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="relative flex h-full"
          style={{
            width: "300vw",
            transform: `translate3d(${translateX}vw, 0, 0)`,
            willChange: "transform",
          }}
        >
          
          {/* Panel 1: text reveal */}
          <section className="h-screen w-screen shrink-0 bg-background flex items-center justify-center px-[8vw]">
            <p className="text-[3.2vw] leading-[1.15] font-medium tracking-tight text-foreground max-w-[84vw]">
              {chars.map((c, i) => (
                <span
                  key={i}
                  style={{
                    opacity: i < revealedCount ? 1 : 0.12,
                    transition: "opacity 120ms linear",
                  }}
                >
                  {c}
                </span>
              ))}
            </p>
          </section>

          {/* Panel 2 — big "Logic meets design" with scroll reveal */}
          <section
            className="relative h-screen w-screen shrink-0 flex items-center justify-center overflow-hidden px-[6vw]"
            style={{ backgroundColor: "#fafafa" }}
          >
            {(() => {
              // Two-stage reveal: "Logic meets" first, then "design."
              const line1 = "Logic meets";
              const line2 = "design.";
              const p1 = Math.min(Math.max((horizProgress - 0.04) / 0.16, 0), 1);
              const p2 = Math.min(Math.max((horizProgress - 0.24) / 0.18, 0), 1);
              const revealed1 = Math.floor(p1 * line1.length);
              const revealed2 = Math.floor(p2 * line2.length);
              return (
                <h2
                  className="text-center font-semibold"
                  style={{
                    fontSize: isMobile ? "16vw" : isTablet ? "12vw" : "10vw",
                    lineHeight: 1.02,
                    letterSpacing: "-0.045em",
                    color: "#1d1d1f",
                    maxWidth: "92vw",
                  }}
                >
                  <span>
                    {line1.split("").map((c, i) => (
                      <span
                        key={i}
                        style={{
                          opacity: i < revealed1 ? 1 : 0.1,
                          transition: "opacity 120ms linear",
                          color: i < 5 ? "#16a34a" : undefined,
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </span>
                  <br />
                  <span
                    style={{
                      backgroundImage:
                        "linear-gradient(95deg, #FF5E3A 0%, #FF9500 18%, #FFCC00 34%, #34C759 52%, #5AC8FA 70%, #007AFF 84%, #AF52DE 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent",
                      fontStyle: "italic",
                      fontWeight: 600,
                    }}
                  >
                    {line2.split("").map((c, i) => (
                      <span
                        key={i}
                        style={{
                          opacity: i < revealed2 ? 1 : 0.12,
                          transition: "opacity 120ms linear",
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </span>
                </h2>
              );
            })()}
          </section>


          {/* Panel 3 — Bento grid about me */}
          <section
            className="relative h-screen w-screen shrink-0 flex items-center justify-center"
            style={{
              backgroundColor: "#ffffff",
              padding: isMobile ? "5vw 4vw" : isTablet ? "4vw" : "3vw 4vw",
              overflowY: isMobile || isTablet ? "auto" : "hidden",
            }}
          >
            {(() => {
              const ease = (t: number) => 1 - Math.pow(1 - t, 3);
              // Start entering as soon as panel 3 begins coming into view
              const enter = ease(Math.min(Math.max((horizProgress - 0.55) / 0.35, 0), 1));
              const pick = (d: string, t: string, m: string) =>
                isMobile ? m : isTablet ? t : d;

              const cardBase: React.CSSProperties = {
                background: "#ffffff",
                border: "1px solid rgba(0,0,0,0.06)",
                borderRadius: pick("28px", "24px", "20px"),
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,1), 0 1px 2px rgba(0,0,0,0.04), 0 30px 60px -20px rgba(0,0,0,0.08)",
                color: "#1d1d1f",
                overflow: "hidden",
                position: "relative",
              };

              const labelStyle: React.CSSProperties = {
                fontSize: pick("11px", "10px", "10px"),
                letterSpacing: "0.28em",
                color: "#86868b",
                textTransform: "uppercase",
                fontWeight: 500,
              };

              return (
                <div
                  className="relative w-full"
                  style={{
                    maxWidth: pick("84vw", "92vw", "100%"),
                    transform: `translateY(${(1 - enter) * 40}px)`,
                    opacity: enter,
                    willChange: "transform, opacity",
                  }}
                >
                  <div
                    className="grid"
                    style={{
                      gridTemplateColumns: pick("1.1fr 1fr", "1fr 1fr", "1fr"),
                      gap: pick("16px", "14px", "12px"),
                      height: pick("78vh", "auto", "auto"),
                    }}
                  >
                    {/* LEFT — Profile pic (tall) */}
                    <div
                      data-profile-card
                      style={{
                        ...cardBase,
                        background:
                          "linear-gradient(160deg, #f5f5f7 0%, #ffffff 60%, #fafafa 100%)",
                        display: "flex",
                        flexDirection: "column",
                        padding: pick("28px", "22px", "18px"),
                        minHeight: pick("auto", "420px", "360px"),
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "radial-gradient(70% 50% at 50% 30%, rgba(212,175,55,0.10), transparent 70%)",
                          pointerEvents: "none",
                        }}
                      />
                      <div
                        style={{
                          flex: 1,
                          borderRadius: pick("20px", "18px", "16px"),
                          background:
                            "linear-gradient(180deg, #1f1f22 0%, #0f0f11 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minHeight: pick("auto", "240px", "200px"),
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "radial-gradient(60% 50% at 50% 20%, rgba(255,255,255,0.08), transparent 60%)",
                          }}
                        />
                        <span
                          style={{
                            fontSize: pick("7vw", "84px", "64px"),
                            fontWeight: 600,
                            color: "rgba(255,255,255,0.95)",
                            letterSpacing: "-0.05em",
                          }}
                        >
                          AS
                        </span>
                      </div>
                      <div style={{ marginTop: pick("22px", "18px", "16px"), position: "relative", zIndex: 1 }}>
                        <div style={{ ...labelStyle, marginBottom: "8px" }}>
                          Designer · Engineer
                        </div>
                        <div
                          style={{
                            fontSize: pick("2vw", "26px", "22px"),
                            fontWeight: 600,
                            letterSpacing: "-0.03em",
                            lineHeight: 1.05,
                          }}
                        >
                          Aarav Sharma
                        </div>
                        <div
                          style={{
                            marginTop: "6px",
                            fontSize: pick("0.95vw", "13px", "12px"),
                            color: "#6e6e73",
                            lineHeight: 1.4,
                          }}
                        >
                          Bengaluru, IN · Building since 2017
                        </div>
                      </div>
                    </div>

                    {/* RIGHT column — stacked */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateRows: "1fr auto",
                        gap: pick("16px", "14px", "12px"),
                      }}
                    >
                      {/* About card */}
                      <div
                        style={{
                          ...cardBase,
                          padding: pick("28px", "22px", "20px"),
                          display: "flex",
                          flexDirection: "column",
                          gap: pick("20px", "16px", "14px"),
                          minHeight: pick("auto", "320px", "280px"),
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div style={labelStyle}>About</div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: pick("12px", "11px", "11px"), color: "#6e6e73" }}>
                            <span style={{ width: "7px", height: "7px", borderRadius: "999px", background: "#34d399", boxShadow: "0 0 8px #34d399" }} />
                            Available
                          </div>
                        </div>

                        <div
                          style={{
                            fontSize: pick("1.6vw", "20px", "17px"),
                            fontWeight: 500,
                            lineHeight: 1.3,
                            letterSpacing: "-0.025em",
                            color: "#1d1d1f",
                          }}
                        >
                          I design like an engineer and ship like a designer —{" "}
                          <span style={{ color: "#86868b" }}>
                            obsessed with the seam where systems become feelings.
                          </span>
                        </div>

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: pick("14px", "12px", "10px"),
                            paddingTop: pick("16px", "14px", "12px"),
                            borderTop: "1px solid rgba(0,0,0,0.06)",
                          }}
                        >
                          {[
                            { v: "8+", l: "years" },
                            { v: "42", l: "shipped" },
                            { v: "11", l: "awards" },
                          ].map((s) => (
                            <div key={s.l}>
                              <div
                                style={{
                                  fontSize: pick("2vw", "26px", "22px"),
                                  fontWeight: 600,
                                  letterSpacing: "-0.04em",
                                  lineHeight: 1,
                                  background: "linear-gradient(180deg,#1d1d1f,#86868b)",
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                }}
                              >
                                {s.v}
                              </div>
                              <div style={{ fontSize: pick("0.8vw", "11px", "10px"), color: "#86868b", marginTop: "4px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                                {s.l}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div style={{ marginTop: "auto", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                          {["Figma", "React", "TypeScript", "Motion", "Swift", "Rust"].map((t) => (
                            <span
                              key={t}
                              style={{
                                fontSize: pick("12px", "11px", "11px"),
                                padding: "5px 10px",
                                borderRadius: "999px",
                                background: "#f5f5f7",
                                border: "1px solid rgba(0,0,0,0.05)",
                                color: "#1d1d1f",
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom row — CTAs */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: pick("16px", "14px", "12px"),
                        }}
                      >
                        <button
                          style={{
                            ...cardBase,
                            padding: pick("20px 22px", "16px 18px", "14px 16px"),
                            background: "#1d1d1f",
                            color: "#ffffff",
                            fontSize: pick("15px", "14px", "13px"),
                            fontWeight: 600,
                            border: "none",
                            cursor: "pointer",
                            letterSpacing: "-0.01em",
                            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.4)",
                          }}
                        >
                          View Work  →
                        </button>
                        <button
                          style={{
                            ...cardBase,
                            padding: pick("20px 22px", "16px 18px", "14px 16px"),
                            background: "#ffffff",
                            color: "#1d1d1f",
                            fontSize: pick("15px", "14px", "13px"),
                            fontWeight: 500,
                            cursor: "pointer",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          Contact me
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </section>



          {/* One continuous animated path: panel1 → intersection grid → profile pic */}
          {(() => {
            const W = vw;
            const H = vh;
            // Anchor points in pixel space (no distortion — viewBox matches render box)
            const startX = 0.30 * W;        // panel 1, somewhere in the text block
            const startY = 0.78 * H;
            const gridX = 1.50 * W;         // panel 2 horizontal center
            const gridY = 0.80 * H;         // pass BELOW the big text
            const endX = 2.00 * W + 0.08 * W; // panel 3, profile card left edge (~8% in)
            const endY = 0.50 * H;


            // Smooth cubic from start → grid, then cubic from grid → end, joined with matching tangents
            // Tangent at gridX is horizontal (so the curve passes through the grid like a flat line)
            const c1x = startX + (gridX - startX) * 0.55;
            const c1y = startY;
            const c2x = gridX - (gridX - startX) * 0.25;
            const c2y = gridY;
            const c3x = gridX + (endX - gridX) * 0.25;
            const c3y = gridY;
            const c4x = endX - (endX - gridX) * 0.4;
            const c4y = endY;

            const d = `M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${gridX} ${gridY} C ${c3x} ${c3y}, ${c4x} ${c4y}, ${endX} ${endY}`;

            return (
              <svg
                className="pointer-events-none absolute inset-0"
                viewBox={`0 0 ${3 * W} ${H}`}
                preserveAspectRatio="none"
                style={{ width: "300vw", height: "100vh" }}
              >
                <defs>
                  <linearGradient id="vecGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1d1d1f" stopOpacity="0.55" />
                    <stop offset="50%" stopColor="#1d1d1f" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#1d1d1f" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                <path
                  d={d}
                  fill="none"
                  stroke="url(#vecGrad)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1 - horizProgress}
                  style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))" }}
                />
              </svg>
            );
          })()}



        </div>

        {/* Subtle scroll progress bar */}
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 z-30"
          style={{ height: "2px", background: "rgba(255,255,255,0.06)" }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress * 100}%`,
              background: "linear-gradient(90deg, #86868b 0%, #d4af37 100%)",
              transition: "width 80ms linear",
              boxShadow: "0 0 8px rgba(212,175,55,0.4)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function MobileAbout() {
  const cardBase: React.CSSProperties = {
    background: "#ffffff",
    border: "1px solid rgba(0,0,0,0.06)",
    borderRadius: "22px",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,1), 0 1px 2px rgba(0,0,0,0.04), 0 20px 40px -20px rgba(0,0,0,0.08)",
    color: "#1d1d1f",
    overflow: "hidden",
    position: "relative",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: "10px",
    letterSpacing: "0.28em",
    color: "#86868b",
    textTransform: "uppercase",
    fontWeight: 500,
  };

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: "#ffffff", padding: "20px 16px 32px" }}
    >
      <h1
        style={{
          fontSize: "44px",
          fontWeight: 600,
          letterSpacing: "-0.04em",
          color: "#1d1d1f",
          lineHeight: 1,
          margin: "8px 0 20px",
        }}
      >
        About me
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {/* Profile card */}
        <div
          style={{
            ...cardBase,
            background: "linear-gradient(160deg,#f5f5f7 0%,#ffffff 60%,#fafafa 100%)",
            padding: "20px",
          }}
        >
          <div
            style={{
              borderRadius: "16px",
              background: "linear-gradient(180deg,#1f1f22 0%,#0f0f11 100%)",
              height: "220px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(60% 50% at 50% 20%, rgba(255,255,255,0.08), transparent 60%)",
              }}
            />
            <span
              style={{
                fontSize: "72px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.95)",
                letterSpacing: "-0.05em",
              }}
            >
              AS
            </span>
          </div>
          <div style={{ marginTop: "18px" }}>
            <div style={{ ...labelStyle, marginBottom: "6px" }}>
              Designer · Engineer
            </div>
            <div
              style={{
                fontSize: "26px",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              Aarav Sharma
            </div>
            <div
              style={{
                marginTop: "4px",
                fontSize: "13px",
                color: "#6e6e73",
              }}
            >
              Bengaluru, IN · Building since 2017
            </div>
          </div>
        </div>

        {/* About card */}
        <div
          style={{
            ...cardBase,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={labelStyle}>About</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "11px",
                color: "#6e6e73",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "999px",
                  background: "#34d399",
                  boxShadow: "0 0 8px #34d399",
                }}
              />
              Available
            </div>
          </div>

          <div
            style={{
              fontSize: "17px",
              fontWeight: 500,
              lineHeight: 1.35,
              letterSpacing: "-0.025em",
              color: "#1d1d1f",
            }}
          >
            I design like an engineer and ship like a designer —{" "}
            <span style={{ color: "#86868b" }}>
              obsessed with the seam where systems become feelings.
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
              paddingTop: "14px",
              borderTop: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            {[
              { v: "8+", l: "years" },
              { v: "42", l: "shipped" },
              { v: "11", l: "awards" },
            ].map((s) => (
              <div key={s.l}>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: 600,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    background: "linear-gradient(180deg,#1d1d1f,#86868b)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.v}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#86868b",
                    marginTop: "4px",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {["Figma", "React", "TypeScript", "Motion", "Swift", "Rust"].map(
              (t) => (
                <span
                  key={t}
                  style={{
                    fontSize: "11px",
                    padding: "5px 10px",
                    borderRadius: "999px",
                    background: "#f5f5f7",
                    border: "1px solid rgba(0,0,0,0.05)",
                    color: "#1d1d1f",
                  }}
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>

        {/* CTAs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          <button
            style={{
              ...cardBase,
              padding: "16px",
              background: "#1d1d1f",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              letterSpacing: "-0.01em",
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.4)",
            }}
          >
            View Work →
          </button>
          <button
            style={{
              ...cardBase,
              padding: "16px",
              background: "#ffffff",
              color: "#1d1d1f",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              letterSpacing: "-0.01em",
            }}
          >
            Contact me
          </button>
        </div>
      </div>
    </div>
  );
}
