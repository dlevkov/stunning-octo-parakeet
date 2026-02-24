
import React, { useState, useEffect, useCallback } from "react";

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

  // // Slide 1 - Agenda
  // ({ active }) => (
  //   <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "20px 0" }}>
  //     <Anim type="fadeInUp" delay={0.1} active={active}>
  //       <div style={{ marginBottom: 8 }}>
  //         <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent, letterSpacing: 2 }}>AGENDA</span>
  //       </div>
  //       <h2 style={{ fontSize: 38, fontWeight: 300, color: COLORS.white, marginBottom: 8 }}>Two Strategic Workstreams</h2>
  //       <p style={{ fontSize: 16, color: COLORS.midGray, marginBottom: 36, maxWidth: 600 }}>Our workshop addresses two complementary dimensions of LLM adoption</p>
  //     </Anim>
  //     <div style={{ display: "flex", gap: 28, flex: 1 }}>
  //       <Anim type="fadeInLeft" delay={0.4} active={active} style={{ flex: 1 }}>
  //         <div style={{
  //           background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.05))",
  //           border: `2px solid ${COLORS.accent}`, borderRadius: 20, padding: 36, height: "100%",
  //           position: "relative", overflow: "hidden",
  //         }}>
  //           <div style={{ position: "absolute", top: 16, right: 20, fontSize: 11, fontWeight: 700, color: COLORS.accent, background: `${COLORS.accent}22`, padding: "4px 14px", borderRadius: 50 }}>PRIMARY FOCUS</div>
  //           <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent, letterSpacing: 1, marginBottom: 12 }}>WORKSTREAM A</div>
  //           <h3 style={{ fontSize: 24, fontWeight: 700, color: COLORS.white, marginBottom: 16 }}>LLM in Development</h3>
  //           <p style={{ fontSize: 15, color: COLORS.textLight, lineHeight: 1.7, marginBottom: 20 }}>Transform your engineering organization with AI-powered development practices</p>
  //           {["Developer Productivity", "Manager Observability & Tooling", "Quality Validations", "Output Automation"].map((item, i) => (
  //             <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
  //               <span style={{ width: 24, height: 24, borderRadius: "50%", background: `${COLORS.accent}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: COLORS.accent, fontWeight: 700 }}>{i+1}</span>
  //               <span style={{ fontSize: 14, color: COLORS.white, fontWeight: 500 }}>{item}</span>
  //             </div>
  //           ))}
  //         </div>
  //       </Anim>
  //       <Anim type="fadeInRight" delay={0.6} active={active} style={{ flex: 1 }}>
  //         <div style={{
  //           background: COLORS.cardBg, border: `1px solid ${COLORS.cardBorder}`,
  //           borderRadius: 20, padding: 36, height: "100%", opacity: 0.8,
  //         }}>
  //           <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.purple, letterSpacing: 1, marginBottom: 12 }}>WORKSTREAM B</div>
  //           <h3 style={{ fontSize: 24, fontWeight: 700, color: COLORS.white, marginBottom: 16 }}>LLM in the Product</h3>
  //           <p style={{ fontSize: 15, color: COLORS.textLight, lineHeight: 1.7, marginBottom: 20 }}>Replace manual financial services and legacy products with AI-driven solutions</p>
  //           {["Client-facing AI advisors", "Automated risk assessment", "Personalized financial products", "Compliance automation"].map((item, i) => (
  //             <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
  //               <span style={{ color: COLORS.purple, fontSize: 14 }}>&#9656;</span>
  //               <span style={{ fontSize: 14, color: COLORS.midGray, fontWeight: 500 }}>{item}</span>
  //             </div>
  //           ))}
  //           <div style={{ marginTop: 16, fontSize: 13, color: COLORS.midGray, fontStyle: "italic" }}>Covered as Phase 2 of engagement</div>
  //         </div>
  //       </Anim>
  //     </div>
  //   </div>
  // ),

  // // Slide 2 - Why Now
  // ({ active }) => (
  //   <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "20px 0" }}>
  //     <Anim type="fadeInUp" delay={0.1} active={active}>
  //       <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.orange, letterSpacing: 2 }}>MARKET CONTEXT</span>
  //       <h2 style={{ fontSize: 38, fontWeight: 300, color: COLORS.white, marginBottom: 8, marginTop: 8 }}>Why Now?</h2>
  //       <p style={{ fontSize: 16, color: COLORS.midGray, marginBottom: 32 }}>Financial services firms that act now gain a compounding advantage</p>
  //     </Anim>
  //     <div style={{ display: "flex", gap: 20, marginBottom: 28 }}>
  //       <NumberCard number="73%" label="of FS firms investing in AI" delay={0.3} active={active} color={COLORS.accent} />
  //       <NumberCard number="2.5x" label="Developer velocity gains" delay={0.45} active={active} color={COLORS.green} />
  //       <NumberCard number="40%" label="Reduction in manual processes" delay={0.6} active={active} color={COLORS.purple} />
  //       <NumberCard number="$4.4T" label="Projected AI market by 2030" delay={0.75} active={active} color={COLORS.orange} />
  //     </div>
  //     <div style={{ display: "flex", gap: 20, flex: 1 }}>
  //       {[
  //         { title: "Competitive Pressure", text: "Early adopters are already shipping AI-enhanced products. The window for first-mover advantage is closing rapidly.", color: COLORS.red, icon: "&#9888;" },
  //         { title: "Regulatory Readiness", text: "Firms with mature AI governance frameworks will navigate upcoming regulations faster and with less friction.", color: COLORS.orange, icon: "&#9881;" },
  //         { title: "Talent Retention", text: "Top engineering talent expects modern AI tooling. Organizations without it face increasing attrition.", color: COLORS.green, icon: "&#9733;" },
  //       ].map((item, i) => (
  //         <Anim key={i} type="fadeInUp" delay={0.5 + i * 0.15} active={active} style={{ flex: 1 }}>
  //           <div style={{ background: COLORS.cardBg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: 24, height: "100%", borderLeft: `3px solid ${item.color}` }}>
  //             <div style={{ fontSize: 24, marginBottom: 8 }} dangerouslySetInnerHTML={{ __html: item.icon }} />
  //             <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.white, marginBottom: 8 }}>{item.title}</div>
  //             <div style={{ fontSize: 14, color: COLORS.textLight, lineHeight: 1.6 }}>{item.text}</div>
  //           </div>
  //         </Anim>
  //       ))}
  //     </div>
  //   </div>
  // ),

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

  // Slide 4 - Developer Productivity
  ({ active }) => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "20px 0" }}>
      <Anim type="fadeInUp" delay={0.1} active={active}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent, letterSpacing: 2 }}>PILLAR 01</span>
          <span style={{ width: 40, height: 1, background: COLORS.accent }} />
        </div>
        <h2 style={{ fontSize: 38, fontWeight: 300, color: COLORS.white, marginBottom: 32 }}>Developer Productivity</h2>
      </Anim>
      <div style={{ display: "flex", gap: 24, flex: 1 }}>
        <div style={{ flex: 1.2, display: "flex", flexDirection: "column", gap: 16 }}>
          <Card active={active} delay={0.3} color={COLORS.accent} icon="&#60;/&#62;" title="AI-Assisted Code Generation" items={["Context-aware code suggestions tuned to your codebase", "Multi-file edits and complex refactoring in seconds", "Support for all major languages and frameworks"]} />
          <Card active={active} delay={0.5} color={COLORS.accentLight} icon="&#128269;" title="Knowledge Retrieval" items={["Instant answers from internal documentation and wikis", "Codebase-aware search across repositories", "Reduce context-switching and tribal knowledge dependency"]} />
          <Card active={active} delay={0.6} color={COLORS.green} icon="&#9878;" title="Bug Resolution & Higher Quality" items={["AI-assisted root cause analysis for faster bug triage", "Predictive defect detection before code reaches production", "Automated fix suggestions with context-aware solutions"]} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          <Card active={active} delay={0.4} color={COLORS.purple} icon="&#9889;" title="Code Review Acceleration" items={["AI-powered review suggestions before human review", "Automated style and convention enforcement", "Faster PR turnaround times"]} />
          <Card active={active} delay={0.55} color={COLORS.red} icon="&#128737;" title="Security Posture & Risk Reduction" items={["Proactive vulnerability detection during development", "Automated security scanning on every commit and PR", "Reduced attack surface through AI-enforced secure coding patterns"]} />
          <Anim type="scaleIn" delay={0.65} active={active} style={{ flex: 1 }}>
            <div style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(139,92,246,0.12))", border: `1px solid ${COLORS.accent}44`, borderRadius: 16, padding: 28, height: "100%" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent, marginBottom: 12 }}>Validated metrics and market-specific expected impact</div>

              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 5 }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: "left", padding: "6px 8px", color: COLORS.midGray, width: "45%" }}>Metric in ZoomInfo</th>
                        <th style={{ textAlign: "left", padding: "6px 8px", color: COLORS.midGray }}>Industry Benchmark (2025-2026)</th>
                     
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ padding: "8px", color: COLORS.textLight }}>91% Adoption</td>
                        <td style={{ padding: "8px", color: COLORS.textLight }}>90% – 91%</td>
                      </tr>
                      <tr>
                        <td style={{ padding: "8px", color: COLORS.textLight }}>2.5x PR Throughput</td>
                        <td style={{ padding: "8px", color: COLORS.textLight }}>2.1x (113%)</td>
                      </tr>
                      <tr>
                        <td style={{ padding: "8px", color: COLORS.textLight }}>20% Reduction in Cycle Time</td>
                        <td style={{ padding: "8px", color: COLORS.textLight }}>24%</td>
                      </tr>
                      <tr>
                        <td style={{ padding: "8px", color: COLORS.textLight }}>15% Quality & Security Gain</td>
                        <td style={{ padding: "8px", color: COLORS.textLight }}>~5–15%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: COLORS.textLight, marginBottom: 8 }}><strong style={{ color: COLORS.white }}>US Market</strong></div>
                  <ul style={{ color: COLORS.textLight, fontSize: 6, marginTop: 0, marginBottom: 12 }}>
                    <li>Shift to "Agentic" R&D — AI agents handling end-to-end tickets push PR throughput for top firms toward 3x–4x.</li>
                    <li>~49% of developers expect AI to automate deployment pipelines (IDC), reducing DevOps overhead and pipeline toil.</li>
                    <li>20% time savings are commonly reallocated to technical debt reduction and product scaling rather than headcount cuts.</li>
                  </ul>

                  <div style={{ fontSize: 13, color: COLORS.textLight, marginBottom: 8 }}><strong style={{ color: COLORS.white }}>Israel Market</strong></div>
                  <ul style={{ color: COLORS.textLight, fontSize: 6, marginTop: 0 }}>
                    <li>Hyper-adoption (~95% in high-tech); ~78% daily AI usage creates a labour-force multiplier effect.</li>
                    <li>AI mitigates manpower gaps (reserve duty, talent shortages); some sectors report effective time recovery up to 50%.</li>
                    <li>Strong focus on deep-tech: tooling, red-teaming, governance and security productization for global users.</li>
                  </ul>
                </div>
              </div>

              <div style={{ marginTop: 12, fontSize: 12, color: COLORS.midGray }}>
                <strong style={{ color: COLORS.textLight }}>Sources:</strong> DX Q4 2025; Jellyfish "2025 AI Metrics in Review"; Israel Innovation Authority; GitHub/Accenture; Myers-JDC-Brookdale.
              </div>
            </div>
          </Anim>
        </div>
      </div>
    </div>
  ),

  // Slide 5 - Manager Observability
  ({ active }) => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "16px 0" }}>
      <Anim type="fadeInUp" delay={0.1} active={active}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.purple, letterSpacing: 2 }}>PILLAR 02</span>
          <span style={{ width: 40, height: 1, background: COLORS.purple }} />
        </div>
        <h2 style={{ fontSize: 36, fontWeight: 300, color: COLORS.white, marginBottom: 24 }}>Manager Observability & Tooling</h2>
      </Anim>
      <div style={{ display: "flex", gap: 20, flex: 1 }}>
        <div style={{ flex: 1.1, display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { title: "AI Adoption Dashboards", desc: "Track AI tool usage, feature adoption rates, and utilization patterns across teams and individuals", color: COLORS.purple },
            { title: "Output Quality Metrics", desc: "Monitor AI-generated code quality through acceptance rates, revision frequency, and defect correlation", color: COLORS.accent },
            { title: "Sprint-Level Insights", desc: "Visualize AI impact on velocity, story completion, and engineering capacity at team and org level", color: COLORS.green },
            { title: "Product Usage & Delivery Analysis", desc: "Correlate engineering output with product adoption, feature utilization, and delivery performance to drive data-informed decisions", color: COLORS.orange },
            { title: "Issue Detection at Scale", desc: "AI-powered debugging that identifies and triages issues across the stack — delivering developers cooked, actionable bugs with root cause analysis and potential solutions", color: COLORS.red },
            { title: "Reports & Presentations Generation", desc: "Auto-generate managerial reports, executive summaries, and stakeholder presentations from real-time engineering and delivery data", color: COLORS.accentLight },
          ].map((item, i) => (
            <Anim key={i} type="fadeInLeft" delay={0.3 + i * 0.12} active={active} style={{ flex: 1 }}>
              <div style={{ background: COLORS.cardBg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 14, padding: "16px 20px", height: "100%", borderLeft: `3px solid ${item.color}`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.white, marginBottom: 6 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: COLORS.textLight, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </Anim>
          ))}
        </div>
        <Anim type="fadeInRight" delay={0.5} active={active} style={{ flex: 0.9 }}>
          <div style={{ background: "linear-gradient(180deg, rgba(139,92,246,0.1), rgba(59,130,246,0.05))", border: `1px solid ${COLORS.purple}33`, borderRadius: 20, padding: 28, height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.purple, marginBottom: 16 }}>FINANCIAL SERVICES GOVERNANCE</div>
            <p style={{ fontSize: 13, color: COLORS.textLight, lineHeight: 1.6, marginBottom: 16 }}>Regulated environments require enhanced visibility. Our framework addresses:</p>
            {[
              "Risk & compliance visibility into all AI-generated code",
              "Audit trail for every AI-assisted change",
              "Sensitive data handling verification",
              "Model usage policies and guardrails enforcement",
              "Regulatory reporting on AI adoption metrics",
              "Role-based access to observability data",
              "Production issue correlation with delivery metrics",
              "Automated root-cause analysis and resolution tracking",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                <span style={{ color: COLORS.purple, fontSize: 14, marginTop: 1, flexShrink: 0 }}>&#10003;</span>
                <span style={{ fontSize: 13, color: COLORS.textLight, lineHeight: 1.45 }}>{item}</span>
              </div>
            ))}
          </div>
        </Anim>
      </div>
    </div>
  ),

  // Slide 6 - Quality Validations
  ({ active }) => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "20px 0" }}>
      <Anim type="fadeInUp" delay={0.1} active={active}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.green, letterSpacing: 2 }}>PILLAR 03</span>
          <span style={{ width: 40, height: 1, background: COLORS.green }} />
        </div>
        <h2 style={{ fontSize: 38, fontWeight: 300, color: COLORS.white, marginBottom: 32 }}>Quality Validations</h2>
      </Anim>
      <div style={{ display: "flex", gap: 24, flex: 1 }}>
        <Card active={active} delay={0.3} color={COLORS.green} icon="&#9745;" title="LLM-Powered Test Generation" style={{ flex: 1 }}
          items={["Auto-generate unit, integration, and e2e tests", "Edge-case discovery from code analysis", "Test coverage gap identification", "Regression suite augmentation"]} />
        <Card active={active} delay={0.45} color={COLORS.accent} icon="&#128737;" title="Automated Code Review" style={{ flex: 1 }}
          items={["Security vulnerability detection", "Compliance pattern enforcement", "Best practice validation", "Performance anti-pattern flagging"]} />
        <Card active={active} delay={0.6} color={COLORS.orange} icon="&#9878;" title="FS-Specific Considerations" style={{ flex: 1 }}
          items={["Data integrity verification layers", "Complete audit trail generation", "PII/sensitive data leak prevention", "Regulatory compliance checks (SOX, PCI-DSS)"]} />
      </div>
      <Anim type="fadeInUp" delay={0.8} active={active}>
        <div style={{ marginTop: 20, background: `${COLORS.green}11`, border: `1px solid ${COLORS.green}33`, borderRadius: 12, padding: "16px 24px", display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 20, color: COLORS.green }}>&#9432;</span>
          <span style={{ fontSize: 14, color: COLORS.textLight }}>
            <strong style={{ color: COLORS.green }}>Key insight:</strong> In financial services, quality validation is not optional — it's a regulatory requirement. LLM-powered validations provide both speed and auditability that manual processes cannot match.
          </span>
        </div>
      </Anim>
    </div>
  ),

  // Slide 7 - Output Automation
  ({ active }) => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "20px 0" }}>
      <Anim type="fadeInUp" delay={0.1} active={active}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.orange, letterSpacing: 2 }}>PILLAR 04</span>
          <span style={{ width: 40, height: 1, background: COLORS.orange }} />
        </div>
        <h2 style={{ fontSize: 38, fontWeight: 300, color: COLORS.white, marginBottom: 32 }}>Output Automation</h2>
      </Anim>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, flex: 1 }}>
        {[
          { title: "Release Notes & Changelogs", desc: "Auto-generate comprehensive, stakeholder-ready release notes from commit history, PR descriptions, and Jira tickets", icon: "&#128196;", color: COLORS.orange },
          { title: "API Documentation", desc: "Keep API docs perpetually up-to-date with auto-generated endpoint descriptions, request/response schemas, and usage examples", icon: "&#128218;", color: COLORS.accent },
          { title: "Sprint & Incident Reports", desc: "Automated sprint summaries, velocity reports, and incident post-mortems — reducing engineering managers' administrative overhead by hours per week", icon: "&#128202;", color: COLORS.purple },
          { title: "Architecture Decision Records", desc: "Capture and formalize architectural decisions with AI-assisted ADR generation, linking context, rationale, and consequences", icon: "&#127959;", color: COLORS.green },
        ].map((item, i) => (
          <Anim key={i} type="scaleIn" delay={0.3 + i * 0.15} active={active}>
            <div style={{ background: COLORS.cardBg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: 28, height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <span style={{ fontSize: 24 }} dangerouslySetInnerHTML={{ __html: item.icon }} />
                <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.white }}>{item.title}</span>
              </div>
              <p style={{ fontSize: 14, color: COLORS.textLight, lineHeight: 1.7, flex: 1 }}>{item.desc}</p>
              <div style={{ marginTop: 14, width: 40, height: 3, borderRadius: 2, background: item.color }} />
            </div>
          </Anim>
        ))}
      </div>
      <Anim type="fadeInUp" delay={0.85} active={active}>
        <div style={{ marginTop: 20, textAlign: "center", fontSize: 15, color: COLORS.midGray }}>
          <strong style={{ color: COLORS.orange }}>Goal:</strong> Eliminate engineering toil so your team focuses on high-value problem solving
        </div>
      </Anim>
    </div>
  ),

  // // Slide 8 - Workstream B Overview
  // ({ active }) => (
  //   <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "20px 0" }}>
  //     <Anim type="fadeInUp" delay={0.1} active={active}>
  //       <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
  //         <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.purple, letterSpacing: 2 }}>WORKSTREAM B — OVERVIEW</span>
  //       </div>
  //       <h2 style={{ fontSize: 38, fontWeight: 300, color: COLORS.white, marginBottom: 8 }}>LLM in the Product & Service Layer</h2>
  //       <p style={{ fontSize: 16, color: COLORS.midGray, marginBottom: 32 }}>Replacing manual financial services with intelligent, AI-driven alternatives</p>
  //     </Anim>
  //     <div style={{ display: "flex", gap: 24, flex: 1 }}>
  //       {[
  //         { title: "AI Financial Advisors", desc: "Replace or augment manual advisory services with LLM-powered conversational agents that provide personalized financial guidance at scale", items: ["24/7 client availability", "Consistent compliance", "Scalable personalization"], color: COLORS.purple },
  //         { title: "Automated Risk & Reporting", desc: "Transform manually-compiled risk assessments and client reports into real-time, AI-generated intelligence", items: ["Real-time risk scoring", "Automated regulatory filings", "Dynamic portfolio reports"], color: COLORS.accent },
  //         { title: "Smart Product Engines", desc: "Create dynamically personalized financial products tailored to individual client profiles, risk tolerance, and life events", items: ["Hyper-personalization", "Dynamic pricing models", "Predictive client needs"], color: COLORS.green },
  //       ].map((item, i) => (
  //         <Anim key={i} type="fadeInUp" delay={0.3 + i * 0.2} active={active} style={{ flex: 1 }}>
  //           <div style={{ background: COLORS.cardBg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 20, padding: 28, height: "100%", display: "flex", flexDirection: "column" }}>
  //             <div style={{ width: 50, height: 50, borderRadius: 12, background: `${item.color}22`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
  //               <div style={{ width: 20, height: 20, borderRadius: "50%", background: item.color }} />
  //             </div>
  //             <h3 style={{ fontSize: 19, fontWeight: 700, color: COLORS.white, marginBottom: 12 }}>{item.title}</h3>
  //             <p style={{ fontSize: 14, color: COLORS.textLight, lineHeight: 1.7, marginBottom: 20, flex: 1 }}>{item.desc}</p>
  //             {item.items.map((it, j) => (
  //               <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
  //                 <span style={{ color: item.color, fontSize: 14 }}>&#9656;</span>
  //                 <span style={{ fontSize: 13, color: COLORS.textLight }}>{it}</span>
  //               </div>
  //             ))}
  //           </div>
  //         </Anim>
  //       ))}
  //     </div>
  //     <Anim type="fadeInUp" delay={0.9} active={active}>
  //       <div style={{ marginTop: 20, background: `${COLORS.purple}11`, border: `1px solid ${COLORS.purple}33`, borderRadius: 12, padding: "14px 24px", textAlign: "center" }}>
  //         <span style={{ fontSize: 14, color: COLORS.textLight }}>
  //           <strong style={{ color: COLORS.purple }}>Phase 2 Engagement</strong> — We'll map these opportunities in detail after establishing development foundations
  //         </span>
  //       </div>
  //     </Anim>
  //   </div>
  // ),

  // // Slide 9 - Workshop Model
  // ({ active }) => (
  //   <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "20px 0" }}>
  //     <Anim type="fadeInUp" delay={0.1} active={active}>
  //       <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent, letterSpacing: 2 }}>ENGAGEMENT MODEL</span>
  //       <h2 style={{ fontSize: 38, fontWeight: 300, color: COLORS.white, marginBottom: 32, marginTop: 8 }}>Workshop Structure</h2>
  //     </Anim>
  //     <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
  //       {[
  //         { phase: "Phase 1", title: "Assess", duration: "Week 1-2", desc: "Evaluate current tooling, workflows, and readiness across engineering teams", color: COLORS.accent, items: ["Tech stack audit", "Team interviews", "Gap analysis"] },
  //         { phase: "Phase 2", title: "Pilot", duration: "Week 3-6", desc: "Deploy LLM tools with select teams, measure impact, and iterate on configuration", color: COLORS.purple, items: ["Tool deployment", "KPI baseline", "Iterative tuning"] },
  //         { phase: "Phase 3", title: "Scale", duration: "Week 7-12", desc: "Roll out proven practices org-wide with governance frameworks and training programs", color: COLORS.green, items: ["Org-wide rollout", "Governance setup", "Training programs"] },
  //       ].map((item, i) => (
  //         <Anim key={i} type="fadeInUp" delay={0.3 + i * 0.2} active={active} style={{ flex: 1 }}>
  //           <div style={{ background: COLORS.cardBg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 20, padding: 28, height: "100%", position: "relative" }}>
  //             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
  //               <span style={{ fontSize: 12, fontWeight: 700, color: item.color, letterSpacing: 1 }}>{item.phase}</span>
  //               <span style={{ fontSize: 11, color: COLORS.midGray, background: COLORS.cardBg, padding: "4px 12px", borderRadius: 50 }}>{item.duration}</span>
  //             </div>
  //             <h3 style={{ fontSize: 22, fontWeight: 700, color: COLORS.white, marginBottom: 10 }}>{item.title}</h3>
  //             <p style={{ fontSize: 14, color: COLORS.textLight, lineHeight: 1.6, marginBottom: 16 }}>{item.desc}</p>
  //             {item.items.map((it, j) => (
  //               <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
  //                 <span style={{ width: 6, height: 6, borderRadius: "50%", background: item.color }} />
  //                 <span style={{ fontSize: 13, color: COLORS.textLight }}>{it}</span>
  //               </div>
  //             ))}
  //           </div>
  //         </Anim>
  //       ))}
  //     </div>
  //     <Anim type="fadeInUp" delay={0.9} active={active}>
  //       <div style={{ background: COLORS.cardBg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: 24, display: "flex", gap: 40, justifyContent: "center" }}>
  //         {[
  //           ["Tailored", "Customized to your tech stack and regulatory constraints"],
  //           ["Measurable", "Clear KPIs and ROI benchmarks at every phase"],
  //           ["Hands-on", "Your teams build real skills, not just theory"],
  //         ].map(([title, desc], i) => (
  //           <div key={i} style={{ textAlign: "center", flex: 1 }}>
  //             <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.white, marginBottom: 4 }}>{title}</div>
  //             <div style={{ fontSize: 13, color: COLORS.midGray }}>{desc}</div>
  //           </div>
  //         ))}
  //       </div>
  //     </Anim>
  //   </div>
  // ),

  // // Slide 10 - CTA
  // ({ active }) => (
  //   <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", textAlign: "center", position: "relative", overflow: "hidden" }}>
  //     <div style={{ position: "absolute", top: -120, left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 60%)" }} />
  //     <div style={{ position: "absolute", bottom: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 60%)" }} />
  //     <Anim type="scaleIn" delay={0.2} active={active}>
  //       <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32, boxShadow: "0 0 40px rgba(59,130,246,0.3)" }}>
  //         <span style={{ fontSize: 36, color: COLORS.white }}>&#10140;</span>
  //       </div>
  //     </Anim>
  //     <Anim type="fadeInUp" delay={0.4} active={active}>
  //       <h2 style={{ fontSize: 46, fontWeight: 300, color: COLORS.white, lineHeight: 1.2, maxWidth: 700, marginBottom: 16 }}>
  //         Let's <span style={{ fontWeight: 700 }}>Get Started</span>
  //       </h2>
  //     </Anim>
  //     <Anim type="fadeInUp" delay={0.6} active={active}>
  //       <p style={{ fontSize: 18, color: COLORS.midGray, maxWidth: 550, lineHeight: 1.6, marginBottom: 40 }}>
  //         Schedule the workshop, define your pilot teams, and begin transforming your engineering organization with LLM
  //       </p>
  //     </Anim>
  //     <div style={{ display: "flex", gap: 20, marginBottom: 40 }}>
  //       {[
  //         { label: "Schedule Workshop", primary: true },
  //         { label: "Define Pilot Teams", primary: false },
  //         { label: "Align on KPIs", primary: false },
  //       ].map((btn, i) => (
  //         <Anim key={i} type="fadeInUp" delay={0.8 + i * 0.1} active={active}>
  //           <div style={{
  //             padding: "14px 28px", borderRadius: 50, fontWeight: 600, fontSize: 15,
  //             background: btn.primary ? "linear-gradient(135deg, #3B82F6, #8B5CF6)" : "transparent",
  //             color: COLORS.white,
  //             border: btn.primary ? "none" : `1px solid ${COLORS.cardBorder}`,
  //             cursor: "pointer",
  //           }}>{btn.label}</div>
  //         </Anim>
  //       ))}
  //     </div>
  //     <Anim type="fadeIn" delay={1.2} active={active}>
  //       <p style={{ fontSize: 14, color: COLORS.midGray }}>
  //         Ready to discuss next steps? Let's align on timeline and scope.
  //       </p>
  //     </Anim>
  //   </div>
  // ),
];

export default function App() {
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

  // Create readable slugs for each slide and helper funcs for path <-> index
  const slideSlugs = slideNames.map((n, i) => {
    if (i === 0) return "";
    return n.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
  });

  const indexToPath = (i) => {
    if (i === 0) return "/";
    return `/${slideSlugs[i]}`;
  };

  const pathToIndex = (path) => {
    if (!path || path === "/") return 0;
    const cleaned = path.replace(/^\//, "");
    const idx = slideSlugs.indexOf(cleaned);
    if (idx !== -1) return idx;
    // fallback: try /slide-N pattern
    const m = cleaned.match(/^slide-(\\d+)$/);
    if (m) {
      const num = Number(m[1]);
      if (!Number.isNaN(num) && num >= 0 && num < slideNames.length) return num;
    }
    return 0;
  };

  // Sync current slide from URL on load and when history changes
  useEffect(() => {
    const syncFromLocation = () => {
      const idx = pathToIndex(window.location.pathname);
      setCurrent(idx);
    };
    syncFromLocation();
    const onPop = () => syncFromLocation();
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Push URL when current changes
  useEffect(() => {
    const desired = indexToPath(current);
    if (window.location.pathname !== desired) {
      window.history.pushState({}, "", desired);
    }
  }, [current]);

  // Adjust font sizes by 1.35x for specific routes (/agenda, /why-now)
  useEffect(() => {
    const scaleRoutes = ["/agenda", "/why-now", "/dev-workstream", "/productivity", "/observability"];
    const scale = scaleRoutes.includes(window.location.pathname) ? 1.35 : 1;
    const page = document.querySelector('.page');
    if (!page) return;

    const elements = Array.from(page.querySelectorAll('*'));

    if (scale === 1) {
      // revert any previously stored original sizes
      elements.forEach((el) => {
        const orig = el.dataset.origFontSize;
        if (orig) {
          el.style.fontSize = orig;
          delete el.dataset.origFontSize;
        }
      });
      return;
    }

    elements.forEach((el) => {
      const cs = window.getComputedStyle(el);
      const font = cs && cs.fontSize;
      if (!font) return;
      if (!el.dataset.origFontSize) el.dataset.origFontSize = font;
      const px = parseFloat(font);
      if (Number.isFinite(px)) el.style.fontSize = `${px * scale}px`;
    });
  }, [current, viewAll]);

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
      {/* Top Bar */}


      {/* Slide */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <div className="page" key={current} style={{ flex: 1, padding: "40px 56px", overflow: "auto" }}>
          <Slide active={true} />
        </div>
      </div>

      {/* Bottom Nav */}
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
