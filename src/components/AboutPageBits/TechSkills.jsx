import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const H = "'Orbitron', sans-serif";
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
              color: "text.subdued", background: "transparent",
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
      <AnimatePresence mode="wait">
        <Terminal />
        
      </AnimatePresence>
    </div>
  );
}