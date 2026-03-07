import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const H = "'Orbitron', sans-serif";
const B = "'Sora', sans-serif";
const MONO = "'JetBrains Mono', 'Fira Code', monospace";

const skills = [
  { symbol: "Js",  name: "JavaScript", num: "01", category: "Frontend", years: 4, level: 90, mass: "ES2024" },
  { symbol: "Ts",  name: "TypeScript", num: "02", category: "Frontend", years: 3, level: 82, mass: "5.x" },
  { symbol: "Re",  name: "React",      num: "03", category: "Frontend", years: 4, level: 88, mass: "18.x" },
  { symbol: "Nx",  name: "Next.js",    num: "04", category: "Frontend", years: 2, level: 78, mass: "14.x" },
  { symbol: "Nd",  name: "Node.js",    num: "05", category: "Backend",  years: 3, level: 80, mass: "20 LTS" },
  { symbol: "Py",  name: "Python",     num: "06", category: "Backend",  years: 3, level: 75, mass: "3.12" },
  { symbol: "Pg",  name: "PostgreSQL", num: "07", category: "Backend",  years: 2, level: 70, mass: "16.x" },
  { symbol: "Gq",  name: "GraphQL",    num: "08", category: "Backend",  years: 2, level: 65, mass: "Oct'21" },
  { symbol: "Dk",  name: "Docker",     num: "09", category: "DevOps",   years: 2, level: 68, mass: "24.x" },
  { symbol: "Gw",  name: "Git",        num: "10", category: "DevOps",   years: 5, level: 92, mass: "2.x" },
  { symbol: "Aw",  name: "AWS",        num: "11", category: "DevOps",   years: 1, level: 58, mass: "Cloud" },
  { symbol: "Fg",  name: "Figma",      num: "12", category: "Design",   years: 3, level: 80, mass: "UI/UX" },
  { symbol: "Cs",  name: "CSS",        num: "13", category: "Frontend", years: 5, level: 91, mass: "CSS4" },
  { symbol: "Th",  name: "Three.js",   num: "14", category: "Frontend", years: 1, level: 55, mass: "r159" },
  { symbol: "Mo",  name: "MongoDB",    num: "15", category: "Backend",  years: 2, level: 72, mass: "7.x" },
];

const catColors = {
  Frontend: { color: "#14b8a6", bg: "rgba(20,184,166,0.08)",  border: "rgba(20,184,166,0.25)" },
  Backend:  { color: "#a855f7", bg: "rgba(168,85,247,0.08)",  border: "rgba(168,85,247,0.25)" },
  DevOps:   { color: "#f4845f", bg: "rgba(244,132,95,0.08)",  border: "rgba(244,132,95,0.25)"  },
  Design:   { color: "#e8c547", bg: "rgba(232,197,71,0.08)",  border: "rgba(232,197,71,0.25)"  },
};

// ─── LAYOUT 1: Periodic Table ────────────────────────────────────────────────
function PeriodicTable() {
  const [hovered, setHovered] = useState(null);

  const rows = [
    skills.filter(s => s.category === "Frontend"),
    skills.filter(s => s.category === "Backend"),
    skills.filter(s => s.category === "DevOps" || s.category === "Design"),
  ];

  const rowLabels = ["Frontend", "Backend", "DevOps & Design"];

  return (
    <div style={{ fontFamily: H, padding: "0 0 32px" }}>
      {/* Legend */}
      <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
        {Object.entries(catColors).map(([cat, style]) => (
          <div key={cat} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: style.color }} />
            <span style={{ fontFamily: B, fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em" }}>{cat}</span>
          </div>
        ))}
      </div>

      {rows.map((row, ri) => (
        <div key={ri} style={{ marginBottom: 12 }}>
          <div style={{ fontFamily: H, fontSize: "8px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", marginBottom: 8, paddingLeft: 2 }}>
            {rowLabels[ri]}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {row.map((skill, i) => {
              const cs = catColors[skill.category];
              const isHov = hovered === skill.name;
              return (
                <motion.div
                  key={skill.name}
                  onHoverStart={() => setHovered(skill.name)}
                  onHoverEnd={() => setHovered(null)}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (ri * 5 + i) * 0.04, duration: 0.4, ease: [0.23,1,0.32,1] }}
                  style={{
                    width: 88,
                    height: 96,
                    borderRadius: 10,
                    border: `1px solid ${isHov ? cs.color : "rgba(255,255,255,0.07)"}`,
                    background: isHov ? cs.bg : "rgba(255,255,255,0.025)",
                    backdropFilter: "blur(12px)",
                    padding: "8px 8px 10px",
                    cursor: "default",
                    position: "relative",
                    overflow: "hidden",
                    transition: "border-color 0.3s, background 0.3s",
                    boxShadow: isHov ? `0 12px 32px ${cs.color}22` : "none",
                    flexShrink: 0,
                  }}
                >
                  {/* Glow */}
                  {isHov && (
                    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 0%, ${cs.color}22, transparent 70%)`, pointerEvents: "none" }} />
                  )}

                  {/* Atomic number */}
                  <div style={{ fontFamily: MONO, fontSize: 9, color: cs.color, opacity: 0.7, lineHeight: 1 }}>{skill.num}</div>

                  {/* Symbol */}
                  <div style={{
                    fontFamily: H, fontWeight: 900, fontSize: 26,
                    color: isHov ? cs.color : "rgba(255,255,255,0.85)",
                    lineHeight: 1, margin: "4px 0 2px",
                    transition: "color 0.3s",
                  }}>{skill.symbol}</div>

                  {/* Name */}
                  <div style={{ fontFamily: B, fontSize: 8.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.2, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{skill.name}</div>

                  {/* Mass / version */}
                  <div style={{ fontFamily: MONO, fontSize: 8, color: cs.color, opacity: 0.6 }}>{skill.mass}</div>

                  {/* Level bar at bottom */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.05)" }}>
                    <motion.div
                      animate={{ width: isHov ? `${skill.level}%` : "0%" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      style={{ height: "100%", background: cs.color, borderRadius: 1 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Hover detail */}
      <AnimatePresence>
        {hovered && (() => {
          const s = skills.find(x => x.name === hovered);
          const cs = catColors[s.category];
          return (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
              style={{
                marginTop: 24, padding: "14px 20px",
                background: cs.bg, border: `1px solid ${cs.border}`,
                borderRadius: 12, display: "flex", gap: 24, alignItems: "center",
                backdropFilter: "blur(12px)",
              }}
            >
              <div style={{ fontFamily: H, fontSize: 36, fontWeight: 900, color: cs.color }}>{s.symbol}</div>
              <div>
                <div style={{ fontFamily: H, fontSize: 14, color: "white", fontWeight: 700 }}>{s.name}</div>
                <div style={{ fontFamily: B, fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
                  {s.category} · {s.years} yrs · v{s.mass}
                </div>
              </div>
              <div style={{ marginLeft: "auto", textAlign: "right" }}>
                <div style={{ fontFamily: H, fontSize: 22, fontWeight: 900, color: cs.color }}>{s.level}%</div>
                <div style={{ fontFamily: B, fontSize: 10, color: "rgba(255,255,255,0.3)" }}>proficiency</div>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}

// ─── LAYOUT 2: Terminal ──────────────────────────────────────────────────────
const ALL_LINES = [
  { type: "prompt", text: "ls --skills --verbose" },
  { type: "gap" },
  ...["Frontend", "Backend", "DevOps", "Design"].flatMap(cat => {
    const s = skills.filter(x => x.category === cat);
    if (!s.length) return [];
    return [
      { type: "header", text: "── " + cat.toUpperCase() + " ──────────────────────────────", cat },
      ...s.map(sk => ({ type: "skill", skill: sk, cat })),
      { type: "gap" },
    ];
  }),
  { type: "prompt", text: "█" },
];

function Terminal() {
  const [lines, setLines] = useState([]);
  const [cursor, setCursor] = useState(true);
  const termRef     = useRef(null);
  const timerRef    = useRef(null);

  const startTyping = () => {
    setLines([]);
    let idx = 0;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (idx >= ALL_LINES.length) { clearInterval(timerRef.current); return; }
      const line = ALL_LINES[idx];
      setLines(prev => [...prev, line]);
      idx++;
      if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
    }, 55);
  };

  useEffect(() => {
    startTyping();
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ fontFamily: MONO }}>
      {/* Terminal window chrome */}
      <div style={{
        background: "rgba(0,0,0,0.6)", backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, overflow: "hidden",
      }}>
        {/* Title bar */}
        <div style={{
          padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", gap: 8,
          background: "rgba(255,255,255,0.02)",
        }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
          <span style={{ marginLeft: 12, fontFamily: MONO, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
            anandita@portfolio — bash
          </span>
          <button
            onClick={startTyping}
            style={{
              marginLeft: "auto", fontFamily: MONO, fontSize: 9, letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.3)", background: "transparent",
              border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4,
              padding: "2px 8px", cursor: "pointer",
            }}
          >
            clear
          </button>
        </div>

        {/* Output */}
        <div
          ref={termRef}
          style={{ padding: "20px 24px", height: 420, overflowY: "auto", scrollbarWidth: "none" }}
        >
          {lines.map((line, i) => {
            const cs = line.cat ? catColors[line.cat] : null;

            if (line.type === "gap") return <div key={i} style={{ height: 8 }} />;

            if (line.type === "prompt") return (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 12 }}>
                <span style={{ color: "#14b8a6" }}>anandita</span>
                <span style={{ color: "rgba(255,255,255,0.3)" }}>@</span>
                <span style={{ color: "#a855f7" }}>portfolio</span>
                <span style={{ color: "rgba(255,255,255,0.3)" }}>:~$ </span>
                <span style={{ color: "rgba(255,255,255,0.85)", marginLeft: 4, fontSize: 13 }}>
                  {line.text.replace("anandita@portfolio:~$ ", "")}
                  {i === lines.length - 1 && (
                    <span style={{ opacity: cursor ? 1 : 0, color: "#14b8a6" }}>█</span>
                  )}
                </span>
              </motion.div>
            );

            if (line.type === "header") return (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                style={{ fontSize: 10, letterSpacing: "0.15em", color: cs.color, marginBottom: 8, opacity: 0.6 }}>
                {line.text}
              </motion.div>
            );

            if (line.type === "skill") {
              const s = line.skill;
              return (
                <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 6, fontSize: 13 }}>
                  <span style={{ color: cs.color, minWidth: 16 }}>▸ </span>
                  <span style={{ color: "rgba(255,255,255,0.75)", minWidth: 130 }}>{s.name}</span>
                  <span style={{ color: "rgba(255,255,255,0.2)", minWidth: 60, fontSize: 11 }}>v{s.mass}</span>
                  <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, marginRight: 8 }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.level}%` }}
                      transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
                      style={{ height: "100%", background: cs.color, borderRadius: 2 }}
                    />
                  </div>
                  <span style={{ color: cs.color, minWidth: 32, textAlign: "right", fontSize: 11 }}>{s.level}%</span>
                </motion.div>
              );
            }

            return <div key={i} />;
          })}
        </div>
      </div>
    </div>
  );
}



// ─── Switcher shell ──────────────────────────────────────────────────────────
const layouts = [
  { id: "periodic", label: "Periodic Table" },
  { id: "terminal", label: "Terminal" },
];

export default function TechSkillsPreview() {
  const [active, setActive] = useState("periodic");

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      padding: "40px 32px",
      fontFamily: H,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Sora:wght@300;400;600&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />

      {/* Switcher */}
      <div style={{ display: "flex", gap: 8, marginBottom: 40, justifyContent: "center" }}>
        {layouts.map(l => (
          <button
            key={l.id}
            onClick={() => setActive(l.id)}
            style={{
              fontFamily: H, fontSize: "9px", letterSpacing: "0.2em",
              textTransform: "uppercase", padding: "8px 18px", borderRadius: 8,
              border: `1px solid ${active === l.id ? "rgba(20,184,166,0.5)" : "rgba(255,255,255,0.07)"}`,
              background: active === l.id ? "rgba(20,184,166,0.1)" : "rgba(255,255,255,0.02)",
              color: active === l.id ? "#14b8a6" : "rgba(255,255,255,0.35)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {l.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          {active === "periodic"     && <PeriodicTable />}
          {active === "terminal"     && <Terminal />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}