/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact me" },
      { name: "description", content: "Let's work together — get in touch." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [vw, setVw] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1280);
  const [vh, setVh] = useState<number>(typeof window !== "undefined" ? window.innerHeight : 800);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

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

  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you'd typically send the form data to a server
    setSubmitted(true);
    setTimeout(() => {
      setFormState({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const cardBase: React.CSSProperties = {
    background: "#ffffff",
    border: "1px solid rgba(0,0,0,0.06)",
    borderRadius: "28px",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,1), 0 1px 2px rgba(0,0,0,0.04), 0 30px 60px -20px rgba(0,0,0,0.08)",
    color: "#1d1d1f",
    overflow: "hidden",
    position: "relative",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    letterSpacing: "0.28em",
    color: "#86868b",
    textTransform: "uppercase",
    fontWeight: 500,
  };

  if (isMobile) {
    return <MobileContact />;
  }

  return (
    <div ref={containerRef} className="relative bg-background">
      {/* Header */}
      <div className="sticky top-0 z-999 bg-background/10 backdrop-blur-md border-b border-border">
        <header className="relative top-0 left-0 right-0 px-8 justify-between md:px-16 z-50 py-8 flex items-center">
          <a href="/" className="font-display text-xl font-medium">Charan</a>

          <nav className="hidden md:flex items-center gap-10 text-sm text-ink-soft ml-6">
            <a href="/#work" className="hover:text-ink transition-colors">Work</a>
            <a href="/about" className="hover:text-ink text-semibold transition-colors">About</a>
            <a href="/contact" className="hover:text-ink text-blue-600 transition-colors">Contact</a>
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
                  <a href="/contact" className="text-blue-600 text-lg">Contact</a>
                </nav>
              </div>
            </div>
          )}
        </header>
      </div>

      {/* Hero intro */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-8 md:px-16 py-20">
        <div className="max-w-3xl">
          <h1 className="text-[8vw] md:text-[6vw] font-semibold tracking-tight text-foreground leading-[1.1] mb-8">
            Let's build something
            <span
              style={{
                backgroundImage:
                  "linear-gradient(95deg, #FF5E3A 0%, #FF9500 18%, #FFCC00 34%, #34C759 52%, #5AC8FA 70%, #007AFF 84%, #AF52DE 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              {" "}together
            </span>
          </h1>
          <p
            style={{
              fontSize: "1.4vw",
              lineHeight: 1.6,
              color: "#86868b",
              maxWidth: "80vw",
            }}
          >
            I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to get in touch.
          </p>
        </div>
      </section>

      {/* Main contact section */}
      <section className="px-8 md:px-16 py-20 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact form */}
          <div>
            <div style={labelStyle} className="mb-6">Contact Information</div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: 500,
                    marginBottom: "8px",
                    color: "#1d1d1f",
                  }}
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: "12px",
                    fontSize: "15px",
                    background: "#ffffff",
                    color: "#1d1d1f",
                    transition: "border-color 200ms",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.2)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.08)")}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: 500,
                    marginBottom: "8px",
                    color: "#1d1d1f",
                  }}
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: "12px",
                    fontSize: "15px",
                    background: "#ffffff",
                    color: "#1d1d1f",
                    transition: "border-color 200ms",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.2)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.08)")}
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: 500,
                    marginBottom: "8px",
                    color: "#1d1d1f",
                  }}
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: "12px",
                    fontSize: "15px",
                    background: "#ffffff",
                    color: "#1d1d1f",
                    transition: "border-color 200ms",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.2)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.08)")}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: 500,
                    marginBottom: "8px",
                    color: "#1d1d1f",
                  }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formState.message}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: "12px",
                    fontSize: "15px",
                    background: "#ffffff",
                    color: "#1d1d1f",
                    fontFamily: "inherit",
                    resize: "none",
                    transition: "border-color 200ms",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.2)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.08)")}
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                style={{
                  ...cardBase,
                  width: "100%",
                  padding: "16px 24px",
                  background: "#1d1d1f",
                  color: "#ffffff",
                  fontSize: "15px",
                  fontWeight: 600,
                  border: "none",
                  cursor: submitted ? "default" : "pointer",
                  letterSpacing: "-0.01em",
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.4)",
                  transition: "all 300ms ease",
                  opacity: submitted ? 0.8 : 1,
                }}
              >
                {submitted ? "Message sent! 🎉" : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact info cards */}
          <div className="space-y-6">
            {/* Direct contact */}
            <div style={{ ...cardBase, padding: "32px 28px" }}>
              <div style={labelStyle} className="mb-4">Email</div>
              <a
                href="mailto:hey@charan.dev"
                style={{
                  display: "block",
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "#1d1d1f",
                  textDecoration: "none",
                  marginBottom: "16px",
                  transition: "color 200ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#86868b")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#1d1d1f")}
              >
                hey@charan.dev
              </a>
              <p style={{ fontSize: "14px", color: "#86868b", lineHeight: 1.6 }}>
                Drop me an email anytime. I usually reply within 24 hours.
              </p>
            </div>

            {/* Social links */}
            <div style={{ ...cardBase, padding: "32px 28px" }}>
              <div style={labelStyle} className="mb-6">Social</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { name: "Twitter", url: "https://twitter.com", icon: "𝕏" },
                  { name: "LinkedIn", url: "https://linkedin.com", icon: "in" },
                  { name: "Dribbble", url: "https://dribbble.com", icon: "🏀" },
                  { name: "GitHub", url: "https://github.com", icon: "↗" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 14px",
                      borderRadius: "8px",
                      background: "#f5f5f7",
                      border: "1px solid rgba(0,0,0,0.05)",
                      textDecoration: "none",
                      color: "#1d1d1f",
                      fontSize: "14px",
                      fontWeight: 500,
                      transition: "all 200ms",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "#ffffff";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "#f5f5f7";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.05)";
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>{social.icon}</span>
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Location & availability */}
            <div style={{ ...cardBase, padding: "32px 28px" }}>
              <div style={labelStyle} className="mb-4">Status</div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "999px",
                    background: "#34d399",
                    boxShadow: "0 0 12px #34d399",
                  }}
                />
                <span style={{ fontSize: "14px", fontWeight: 500, color: "#1d1d1f" }}>
                  Available for new projects
                </span>
              </div>
              <p style={{ fontSize: "14px", color: "#86868b", lineHeight: 1.6 }}>
                Based in Bengaluru, India. Open to remote collaboration and occasional travel for in-person sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section
        style={{
          background: "linear-gradient(180deg, rgba(212,175,55,0.04) 0%, transparent 100%)",
          padding: "60px 32px",
          marginTop: "60px",
          textAlign: "center",
          borderTop: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <h2
          style={{
            fontSize: "2.8vw",
            fontWeight: 600,
            color: "#1d1d1f",
            marginBottom: "16px",
            letterSpacing: "-0.03em",
          }}
        >
          Let's create something meaningful
        </h2>
        <p style={{ fontSize: "1.1vw", color: "#86868b", marginBottom: "32px", letterSpacing: "-0.01em" }}>
          Whether it's a quick chat or a full project, I'm here to help bring your ideas to life.
        </p>
        <a
          href="mailto:hey@charan.dev"
          style={{
            display: "inline-block",
            padding: "16px 32px",
            background: "#1d1d1f",
            color: "#ffffff",
            borderRadius: "999px",
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: 600,
            transition: "all 300ms ease",
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.4)",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 15px 40px -10px rgba(0,0,0,0.5)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 30px -10px rgba(0,0,0,0.4)";
          }}
        >
          Get in touch →
        </a>
      </section>
    </div>
  );
}

function MobileContact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormState({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const cardBase: React.CSSProperties = {
    background: "#ffffff",
    border: "1px solid rgba(0,0,0,0.06)",
    borderRadius: "20px",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,1), 0 1px 2px rgba(0,0,0,0.04), 0 20px 40px -20px rgba(0,0,0,0.08)",
    color: "#1d1d1f",
    overflow: "hidden",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "10px",
    letterSpacing: "0.28em",
    color: "#86868b",
    textTransform: "uppercase",
    fontWeight: 500,
  };

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ padding: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <a href="/" style={{ fontSize: "18px", fontWeight: 600, textDecoration: "none", color: "#1d1d1f" }}>
            Charan
          </a>
          <nav style={{ display: "flex", gap: "16px", fontSize: "12px", textDecoration: "none" }}>
            <a href="/#work" style={{ color: "#86868b", textDecoration: "none" }}>Work</a>
            <a href="/about" style={{ color: "#86868b", textDecoration: "none" }}>About</a>
            <a href="/contact" style={{ color: "#1d1d1f", textDecoration: "none", fontWeight: 500 }}>Contact</a>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: "32px 16px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 600, lineHeight: 1.2, marginBottom: "16px", color: "#1d1d1f" }}>
          Let's build something together
        </h1>
        <p style={{ fontSize: "15px", color: "#86868b", lineHeight: 1.6 }}>
          I'm always interested in hearing about new projects and opportunities.
        </p>
      </div>

      {/* Contact form */}
      <div style={{ padding: "20px 16px 32px" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label
              htmlFor="name"
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 500,
                marginBottom: "6px",
                color: "#1d1d1f",
              }}
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formState.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "10px",
                fontSize: "15px",
                background: "#f5f5f7",
                color: "#1d1d1f",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 500,
                marginBottom: "6px",
                color: "#1d1d1f",
              }}
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "10px",
                fontSize: "15px",
                background: "#f5f5f7",
                color: "#1d1d1f",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 500,
                marginBottom: "6px",
                color: "#1d1d1f",
              }}
            >
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formState.subject}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "10px",
                fontSize: "15px",
                background: "#f5f5f7",
                color: "#1d1d1f",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 500,
                marginBottom: "6px",
                color: "#1d1d1f",
              }}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formState.message}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "10px",
                fontSize: "15px",
                background: "#f5f5f7",
                color: "#1d1d1f",
                fontFamily: "inherit",
                resize: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={submitted}
            style={{
              ...cardBase,
              width: "100%",
              padding: "14px 16px",
              background: "#1d1d1f",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: 600,
              border: "none",
              cursor: submitted ? "default" : "pointer",
              marginTop: "8px",
            }}
          >
            {submitted ? "Message sent! 🎉" : "Send Message"}
          </button>
        </form>

        {/* Direct contact cards */}
        <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ ...cardBase, padding: "20px" }}>
            <div style={labelStyle} className="mb-3">Email</div>
            <a
              href="mailto:hey@charan.dev"
              style={{
                display: "block",
                fontSize: "18px",
                fontWeight: 600,
                color: "#1d1d1f",
                textDecoration: "none",
              }}
            >
              hey@charan.dev
            </a>
          </div>

          <div style={{ ...cardBase, padding: "20px" }}>
            <div style={labelStyle} className="mb-4">Social</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { name: "Twitter", url: "https://twitter.com" },
                { name: "LinkedIn", url: "https://linkedin.com" },
                { name: "Dribbble", url: "https://dribbble.com" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#86868b",
                    textDecoration: "none",
                  }}
                >
                  {social.name} →
                </a>
              ))}
            </div>
          </div>

          <div style={{ ...cardBase, padding: "20px" }}>
            <div style={labelStyle} className="mb-3">Status</div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "999px",
                  background: "#34d399",
                  boxShadow: "0 0 8px #34d399",
                }}
              />
              <span style={{ fontSize: "13px", fontWeight: 500 }}>Available for projects</span>
            </div>
            <p style={{ fontSize: "12px", color: "#86868b", lineHeight: 1.5 }}>
              Based in Bengaluru, India. Open to remote work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
