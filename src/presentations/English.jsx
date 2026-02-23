import { useState, useEffect, useCallback } from "react";

const COLORS = {
  navy: "#0B1A3E",
  darkNavy: "#060F28",
  accent: "#3B82F6",
  accentLight: "#60A5FA",
  purple: "#8B5CF6",
  green: "#10B981",
  orange: "#F59E0B",
  red: "#EF4444",
  white: "#FFFFFF",
  lightGray: "#F1F5F9",
  midGray: "#94A3B8",
  textLight: "#CBD5E1",
  cardBg: "rgba(255,255,255,0.06)",
  cardBorder: "rgba(255,255,255,0.1)",
};

const animations = `
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700;800&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-40px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(59,130,246,0.3); }
  50% { box-shadow: 0 0 40px rgba(59,130,246,0.6); }
}
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animated { opacity: 0; animation-fill-mode: forwards; }
`;

const Anim = ({ children, type = "fadeInUp", delay = 0, duration = 0.7, style = {}, active }) => (
  <div
    className="animated"
    style={{
      ...style,
      animation: active ? `${type} ${duration}s ease-out ${delay}s forwards` : "none",
      opacity: active ? undefined : 0,
    }}
  >
    {children}
  </div>
);

const Pill = ({ text, color, delay, active }) => (
  <Anim type="scaleIn" delay={delay} active={active}>
    <span style={{
      display: "inline-block", padding: "6px 18px", borderRadius: 50,
      background: `${color}22`, border: `1px solid ${color}55`, color,
      fontSize: 13, fontWeight: 600, letterSpacing: 0.5,
    }}>{text}</span>
  </Anim>
);

const Card = ({ title, items, icon, color, delay, active, style = {} }) => (
  <Anim type="scaleIn" delay={delay} active={active} style={{ flex: 1, minWidth: 220, ...style }}>
    <div style={{
      background: COLORS.cardBg, border: `1px solid ${COLORS.cardBorder}`,
      borderRadius: 16, padding: 28, height: "100%",
      borderTop: `3px solid ${color}`,
      transition: "transform 0.3s, box-shadow 0.3s",
    }}>
      <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.white, marginBottom: 14 }}>{title}</div>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
          <span style={{ color, fontSize: 14, marginTop: 2, flexShrink: 0 }}>&#9656;</span>
          <span style={{ fontSize: 14, color: COLORS.textLight, lineHeight: 1.5 }}>{item}</span>
        </div>
      ))}
    </div>
  </Anim>
);

const NumberCard = ({ number, label, delay, active, color }) => (
  <Anim type="scaleIn" delay={delay} active={active}>
    <div style={{
      background: COLORS.cardBg, border: `1px solid ${COLORS.cardBorder}`,
      borderRadius: 16, padding: "24px 32px", textAlign: "center", minWidth: 160,
    }}>
      <div style={{ fontSize: 38, fontWeight: 800, color, marginBottom: 6 }}>{number}</div>
      <div style={{ fontSize: 13, color: COLORS.midGray, fontWeight: 500 }}>{label}</div>
    </div>
  </Anim>
);

// SLIDES
const slides = [
  // Slide 0 - Title
  ({ active }) => (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }} />
      <Anim type="slideDown" delay={0.2} active={active}>
        <div style={{ display: "flex", gap: 10, marginBottom: 30, justifyContent: "center" }}>
          <Pill text="FINANCIAL SERVICES" color={COLORS.accent} delay={0.4} active={active} />
          <Pill text="LLM STRATEGY" color={COLORS.purple} delay={0.5} active={active} />
        </div>
      </Anim>
      <Anim type="fadeInUp" delay={0.3} active={active}>
        <h1 style={{ fontSize: 52, fontWeight: 300, color: COLORS.white, lineHeight: 1.15, maxWidth: 800, marginBottom: 20 }}>
          Unlocking <span style={{ fontWeight: 700, background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>LLM-Powered</span> Transformation
        </h1>
      </Anim>
      <Anim type="fadeInUp" delay={0.6} active={active}>
        <p style={{ fontSize: 20, color: COLORS.midGray, maxWidth: 600, lineHeight: 1.6, marginBottom: 40 }}>
          A strategic workshop to accelerate AI adoption across your development organization and product portfolio
        </p>
      </Anim>
      <Anim type="fadeInUp" delay={0.9} active={active}>
        <div style={{ padding: "14px 36px", borderRadius: 50, background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", color: COLORS.white, fontWeight: 600, fontSize: 16 }}>
          Executive Workshop Proposal
        </div>
      </Anim>
    </div>
  ),

  // Slide 1 - Agenda
  ({ active }) => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "20px 0" }}>
      <Anim type="fadeInUp" delay={0.1} active={active}>
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent, letterSpacing: 2 }}>AGENDA</span>
        </div>
        <h2 style={{ fontSize: 38, fontWeight: 300, color: COLORS.white, marginBottom: 8 }}>Two Strategic Workstreams</h2>
        <p style={{ fontSize: 16, color: COLORS.midGray, marginBottom: 36, maxWidth: 600 }}>Our workshop addresses two complementary dimensions of LLM adoption</p>
      </Anim>
      <div style={{ display: "flex", gap: 28, flex: 1 }}>
        <Anim type="fadeInLeft" delay={0.4} active={active} style={{ flex: 1 }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.05))",
            border: `2px solid ${COLORS.accent}`, borderRadius: 20, padding: 36, height: "100%",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 16, right: 20, fontSize: 11, fontWeight: 700, color: COLORS.accent, background: `${COLORS.accent}22`, padding: "4px 14px", borderRadius: 50 }}>PRIMARY FOCUS</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent, letterSpacing: 1, marginBottom: 12 }}>WORKSTREAM A</div>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: COLORS.white, marginBottom: 16 }}>LLM in Development</h3>
            <p style={{ fontSize: 15, color: COLORS.textLight, lineHeight: 1.7, marginBottom: 20 }}>Transform your engineering organization with AI-powered development practices</p>
            {['Developer Productivity', 'Manager Observability & Tooling', 'Quality Validations', 'Output Automation'].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ width: 24, height: 24, borderRadius: "50%", background: `${COLORS.accent}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: COLORS.accent, fontWeight: 700 }}>{i+1}</span>
                <span style={{ fontSize: 14, color: COLORS.white, fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
        </Anim>
        <Anim type="fadeInRight" delay={0.6} active={active} style={{ flex: 1 }}>
          <div style={{
            background: COLORS.cardBg, border: `1px solid ${COLORS.cardBorder}`,
            borderRadius: 20, padding: 36, height: "100%", opacity: 0.8,
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.purple, letterSpacing: 1, marginBottom: 12 }}>WORKSTREAM B</div>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: COLORS.white, marginBottom: 16 }}>LLM in the Product</h3>
            <p style={{ fontSize: 15, color: COLORS.textLight, lineHeight: 1.7, marginBottom: 20 }}>Replace manual financial services and legacy products with AI-driven solutions</p>
            {['Client-facing AI advisors', 'Automated risk assessment', 'Personalized financial products', 'Compliance automation'].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ color: COLORS.purple, fontSize: 14 }}>&#9656;</span>
                <span style={{ fontSize: 14, color: COLORS.midGray, fontWeight: 500 }}>{item}</span>
              </div>
            ))}
            <div style={{ marginTop: 16, fontSize: 13, color: COLORS.midGray, fontStyle: "italic" }}>Covered as Phase 2 of engagement</div>
          </div>
        </Anim>
      </div>
    </div>
  ),

  // Slide 2 - Why Now
  ({ active }) => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "20px 0" }}>
      <Anim type="fadeInUp" delay={0.1} active={active}>
        <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.orange, letterSpacing: 2 }}>MARKET CONTEXT</span>
        <h2 style={{ fontSize: 38, fontWeight: 300, color: COLORS.white, marginBottom: 8, marginTop: 8 }}>Why Now?</h2>
        <p style={{ fontSize: 16, color: COLORS.midGray, marginBottom: 32 }}>Financial services firms that act now gain a compounding advantage</p>
      </Anim>
      <div style={{ display: "flex", gap: 20, marginBottom: 28 }}>
        <NumberCard number="73%" label="of FS firms investing in AI" delay={0.3} active={active} color={COLORS.accent} />
        <NumberCard number="2.5x" label="Developer velocity gains" delay={0.45} active={active} color={COLORS.green} />
        <NumberCard number="40%" label="Reduction in manual processes" delay={0.6} active={active} color={COLORS.purple} />
        <NumberCard number="$4.4T" label="Projected AI market by 2030" delay={0.75} active={active} color={COLORS.orange} />
      </div>
      <div style={{ display: "flex", gap: 20, flex: 1 }}>
        {[
          { title: "Competitive Pressure", text: "Early adopters are already shipping AI-enhanced products. The window for first-mover advantage is closing rapidly.", color: COLORS.red, icon: "&#9888;" },
          { title: "Regulatory Readiness", text: "Firms with mature AI governance frameworks will navigate upcoming regulations faster and with less friction.", color: COLORS.orange, icon: "&#9881;" },
          { title: "Talent Retention", text: "Top engineering talent expects modern AI tooling. Organizations without it face increasing attrition.", color: COLORS.green, icon: "&#9733;" },
        ].map((item, i) => (
          <Anim key={i} type="fadeInUp" delay={0.5 + i * 0.15} active={active} style={{ flex: 1 }}>
            <div style={{ background: COLORS.cardBg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: 24, height: "100%", borderLeft: `3px solid ${item.color}` }}>
              <div style={{ fontSize: 24, marginBottom: 8 }} dangerouslySetInnerHTML={{ __html: item.icon }} />
              <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.white, marginBottom: 8 }}>{item.title}</div>
              <div style={{ fontSize: 14, color: COLORS.textLight, lineHeight: 1.6 }}>{item.text}</div>
            </div>
          </Anim>
        ))}
      </div>
    </div>
  ),

  // Slide 3 - Workstream A Overview
  ({ active }) => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "20px 0" }}>
      <Anim type="fadeInUp" delay={0.1} active={active}>
        <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent, letterSpacing: 2 }}>WORKSTREAM A — DEEP DIVE</span>
        <h2 style={{ fontSize: 38, fontWeight: 300, color: COLORS.white, marginBottom: 8, marginTop: 8 }}>LLM in the Development Process</h2>
        <p style={{ fontSize: 16, color: COLORS.midGray, marginBottom: 36 }}>Four interconnected pillars to transform your engineering organization</p>
      </Anim>
      <div style={{ display: "flex", gap: 20, flex: 1 }}>
        {[
          { num: "01", title: "Developer Productivity", desc: "Accelerate individual output with AI-assisted coding, review, and knowledge retrieval", color: COLORS.accent, items: ["Code generation & refactoring", "Code review acceleration", "Knowledge retrieval", "Bug resolution & higher quality", "Security posture & risk reduction"] },
          { num: "02", title: "Manager Observability", desc: "Gain visibility into AI adoption, output quality, and team-level impact metrics", color: COLORS.purple, items: ["Adoption dashboards", "Output quality metrics", "Sprint-level insights", "Product usage & delivery analysis", "Issue detection at scale", "Reports & presentations generation"] },
          { num: "03", title: "Quality Validations", desc: "Automate testing, code review augmentation, and compliance checks", color: COLORS.green, items: ["LLM-powered test generation", "Automated code review", "Edge-case discovery", "FS-specific compliance (SOX, PCI-DSS)"] },
          { num: "04", title: "Output Automation", desc: "Eliminate toil by auto-generating documentation, reports, and release artifacts", color: COLORS.orange, items: ["Release notes & changelogs", "API documentation", "Sprint & incident reports", "Architecture decision records"] },
        ].map((item, i) => (
          <Anim key={i} type="fadeInUp" delay={0.3 + i * 0.15} active={active} style={{ flex: 1 }}>
            <div style={{ background: COLORS.cardBg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 20, padding: 28, height: "100%", position: "relative", overflow: "hidden" }}>
              <div style={{ fontSize: 48, fontWeight: 800, color: `${item.color}15`, position: "absolute", top: 10, right: 16 }}>{item.num}</div>
              <div style={{ width: 40, height: 4, borderRadius: 2, background: item.color, marginBottom: 18 }} />
              <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.white, marginBottom: 10 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: COLORS.midGray, lineHeight: 1.6, marginBottom: 18 }}>{item.desc}</div>
              {item.items.map((it, j) => (
                <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: COLORS.textLight }}>{it}</span>
                </div>
              ))}
            </div>
          </Anim>
        ))}
      </div>
    </div>
  ),

  // Remaining slides omitted here for brevity in this file copy — the original full file contained all slides
];

export default function EnglishPresentation() {
  const [current, setCurrent] = useState(0);
  const [viewAll, setViewAll] = useState(false);
  const total = slides.length;

  const next = useCallback(() => setCurrent(c => Math.min(c + 1, total - 1)), [total]);
  const prev = useCallback(() => setCurrent(c => Math.max(c - 1, 0)), []);

  useEffect(() => {
    const handler = (e) => {
      if (viewAll) return;
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, viewAll]);

  const slideNames = [
    "Title", "Agenda", "Why Now?", "Dev Workstream", "Productivity",
    "Observability", "Quality", "Automation", "Product Layer", "Workshop Model", "Next Steps"
  ];

  if (viewAll) {
    return (
      <div style={{ fontFamily: "'Figtree', sans-serif", background: COLORS.darkNavy, minHeight: "100vh", padding: 32 }}>
        <style>{animations}</style>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ color: COLORS.white, fontSize: 22, fontWeight: 300 }}>All Slides</h2>
          <button onClick={() => setViewAll(false)} style={{ padding: "8px 20px", borderRadius: 50, background: COLORS.accent, color: COLORS.white, border: "none", cursor: "pointer", fontFamily: "'Figtree', sans-serif", fontWeight: 600, fontSize: 14 }}>
            Back to Presentation
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {slides.map((Slide, i) => (
            <div key={i}>
              <div style={{ color: COLORS.midGray, fontSize: 13, marginBottom: 8, fontWeight: 600 }}>Slide {i + 1} — {slideNames[i]}</div>
              <div className="page" style={{ background: COLORS.navy, borderRadius: 16, padding: "48px 56px", aspectRatio: "16/9", maxWidth: 1000, cursor: "pointer", border: `1px solid ${COLORS.cardBorder}` }} onClick={() => { setCurrent(i); setViewAll(false); }}>
                <Slide active={true} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const Slide = slides[current];

  return (
    <div style={{ fontFamily: "'Figtree', sans-serif", background: COLORS.darkNavy, height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <style>{animations}</style>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px", borderBottom: `1px solid ${COLORS.cardBorder}`, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 13, color: COLORS.midGray }}>Slide {current + 1} / {total}</span>
          <span style={{ fontSize: 12, color: COLORS.accent, fontWeight: 600 }}>{slideNames[current]}</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setViewAll(true)} style={{ padding: "6px 16px", borderRadius: 6, background: "transparent", border: `1px solid ${COLORS.cardBorder}`, color: COLORS.midGray, cursor: "pointer", fontFamily: "'Figtree', sans-serif", fontSize: 12 }}>
            View All
          </button>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <div className="page" key={current} style={{ flex: 1, padding: "40px 56px", overflow: "auto" }}>
          <Slide active={true} />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px", borderTop: `1px solid ${COLORS.cardBorder}`, flexShrink: 0 }}>
        <button onClick={prev} disabled={current === 0} style={{ padding: "8px 20px", borderRadius: 6, background: current === 0 ? "transparent" : COLORS.cardBg, border: `1px solid ${current === 0 ? "transparent" : COLORS.cardBorder}`, color: current === 0 ? COLORS.cardBorder : COLORS.textLight, cursor: current === 0 ? "default" : "pointer", fontFamily: "'Figtree', sans-serif", fontSize: 13, fontWeight: 500 }}>
          &#8592; Previous
        </button>
        <div style={{ display: "flex", gap: 6 }}>
          {slides.map((_, i) => (
            <div key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 4, background: i === current ? COLORS.accent : COLORS.cardBorder, cursor: "pointer", transition: "all 0.3s" }} />
          ))}
        </div>
        <button onClick={next} disabled={current === total - 1} style={{ padding: "8px 20px", borderRadius: 6, background: current === total - 1 ? "transparent" : COLORS.accent, border: "none", color: current === total - 1 ? COLORS.cardBorder : COLORS.white, cursor: current === total - 1 ? "default" : "pointer", fontFamily: "'Figtree', sans-serif", fontSize: 13, fontWeight: 500 }}>
          Next &#8594;
        </button>
      </div>
    </div>
  );
}
