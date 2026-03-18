import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useColorModeValue } from '@chakra-ui/react';

const H = "'Orbitron', sans-serif";
const MONO = "'JetBrains Mono', 'Fira Code', monospace";

const skills = [
  { name: "JavaScript", num: "01", category: "Frontend", years: 4, level: 90, mass: "ES2024" },
  { name: "TypeScript", num: "02", category: "Frontend", years: 3, level: 82, mass: "5.x" },
  { name: "React",      num: "03", category: "Frontend", years: 4, level: 88, mass: "18.x" },
  { name: "Next.js",    num: "04", category: "Frontend", years: 2, level: 78, mass: "14.x" },
  { name: "Node.js",    num: "05", category: "Backend",  years: 3, level: 80, mass: "20 LTS" },
  { name: "Python",     num: "06", category: "Backend",  years: 3, level: 75, mass: "3.12" },
  { name: "PostgreSQL", num: "07", category: "Backend",  years: 2, level: 70, mass: "16.x" },
  { name: "GraphQL",    num: "08", category: "Backend",  years: 2, level: 65, mass: "Oct'21" },
  { name: "Docker",     num: "09", category: "DevOps",   years: 2, level: 68, mass: "24.x" },
  { name: "Git",        num: "10", category: "DevOps",   years: 5, level: 92, mass: "2.x" },
  { name: "AWS",        num: "11", category: "DevOps",   years: 1, level: 58, mass: "Cloud" },
  { name: "Figma",      num: "12", category: "Design",   years: 3, level: 80, mass: "UI/UX" },
  { name: "CSS",        num: "13", category: "Frontend", years: 5, level: 91, mass: "CSS4" },
  { name: "Three.js",   num: "14", category: "Frontend", years: 1, level: 55, mass: "r159" },
  { name: "MongoDB",    num: "15", category: "Backend",  years: 2, level: 72, mass: "7.x" },
];

const catColors = {
  Frontend: { color: "#14b8a6", bg: "rgba(20,184,166,0.08)",  border: "rgba(20,184,166,0.25)" },
  Backend:  { color: "#a855f7", bg: "rgba(168,85,247,0.08)",  border: "rgba(168,85,247,0.25)" },
  DevOps:   { color: "#f4845f", bg: "rgba(244,132,95,0.08)",  border: "rgba(244,132,95,0.25)" },
  Design:   { color: "#e8c547", bg: "rgba(232,197,71,0.08)",  border: "rgba(232,197,71,0.25)" },
};

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
  const termRef  = useRef(null);
  const timerRef = useRef(null);

  // ── Theme-aware colors ──────────────────────────────────────────────────────
  const termBg         = useColorModeValue("rgba(255,255,255,0.85)", "rgba(0,0,0,0.6)");
  const termBorder     = useColorModeValue("rgba(0,0,0,0.1)",        "rgba(255,255,255,0.08)");
  const titleBarBg     = useColorModeValue("rgba(0,0,0,0.03)",       "rgba(255,255,255,0.02)");
  const titleBarBorder = useColorModeValue("rgba(0,0,0,0.08)",       "rgba(255,255,255,0.06)");
  const terminalLabel  = useColorModeValue("rgba(0,0,0,0.35)",       "rgba(255,255,255,0.3)");
  const clearBtnColor  = useColorModeValue("rgba(0,0,0,0.4)",        "rgba(255,255,255,0.4)");
  const clearBtnBorder = useColorModeValue("rgba(0,0,0,0.12)",       "rgba(255,255,255,0.08)");
  const promptAt       = useColorModeValue("rgba(0,0,0,0.35)",       "rgba(255,255,255,0.3)");
  const promptSep      = useColorModeValue("rgba(0,0,0,0.35)",       "rgba(255,255,255,0.3)");
  const promptText     = useColorModeValue("rgba(0,0,0,0.8)",        "rgba(255,255,255,0.85)");
  const skillName      = useColorModeValue("rgba(0,0,0,0.7)",        "rgba(255,255,255,0.75)");
  const skillVersion   = useColorModeValue("rgba(0,0,0,0.3)",        "rgba(255,255,255,0.2)");
  const barTrack       = useColorModeValue("rgba(0,0,0,0.08)",       "rgba(255,255,255,0.05)");

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
        background: termBg, backdropFilter: "blur(20px)",
        border: `1px solid ${termBorder}`, borderRadius: 14, overflow: "hidden",
      }}>
        {/* Title bar */}
        <div style={{
          padding: "10px 16px", borderBottom: `1px solid ${titleBarBorder}`,
          display: "flex", alignItems: "center", gap: 8,
          background: titleBarBg,
        }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
          <span style={{ marginLeft: 12, fontFamily: MONO, fontSize: 11, color: terminalLabel }}>
            anandita@portfolio — bash
          </span>
          <button
            onClick={startTyping}
            style={{
              marginLeft: "auto", fontFamily: MONO, fontSize: 9, letterSpacing: "0.1em",
              color: clearBtnColor, background: "transparent",
              border: `1px solid ${clearBtnBorder}`, borderRadius: 4,
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
                <span style={{ color: promptAt }}>@</span>
                <span style={{ color: "#a855f7" }}>portfolio</span>
                <span style={{ color: promptSep }}>:~$ </span>
                <span style={{ color: promptText, marginLeft: 4, fontSize: 13 }}>
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
                  <span style={{ color: skillName, minWidth: 130 }}>{s.name}</span>
                  <span style={{ color: skillVersion, minWidth: 60, fontSize: 11 }}>v{s.mass}</span>
                  <div style={{ flex: 1, height: 3, background: barTrack, borderRadius: 2, marginRight: 8 }}>
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

export default function TechSkillsPreview() {
  const eyebrowColor  = useColorModeValue("rgba(0,0,0,0.4)",  "rgba(255,255,255,0.4)");
  const subtitleColor = useColorModeValue("rgba(0, 0, 0, 0.89)",  "rgba(255,255,255,0.4)");

  return (
    <div style={{
      background: "transparent",
      padding: "16px 0",
      fontFamily: H,
      maxWidth: "1100px",
      margin: "0 auto",
    }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{ width: 24, height: 1, background: "linear-gradient(to right, #ec4899, #7c3aed)" }} />
          <span style={{
            fontFamily: H, fontSize: 9, letterSpacing: "0.3em",
            textTransform: "uppercase", color: eyebrowColor,
          }}>
            Arsenal
          </span>
        </div>
        <div style={{
          fontFamily: H,
          fontSize: "clamp(26px, 4vw, 40px)",
          fontWeight: 900,
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
          background: "linear-gradient(to right, #1e40af, #7c3aed, #ec4899)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
          width: "fit-content",
        }}>
          Tools &amp;
        </div>
        <div style={{
          fontFamily: H,
          fontSize: "clamp(26px, 4vw, 40px)",
          fontWeight: 900,
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
          color: subtitleColor,
        }}>
          Technologies
        </div>
      </div>

      <AnimatePresence mode="wait">
        <Terminal />
      </AnimatePresence>
    </div>
  );
}