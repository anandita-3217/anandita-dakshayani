import { useState, useEffect, useRef, useCallback } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

// ── ReelCarousel ───────────────────────────────────────────────────────────
// Props:
//   reels    — array from reels.json (tagIcon is a string key)
//   iconMap  — object mapping those strings to lucide components
//
// Example:
//   import { Paintbrush, CodeXml, Sparkles, Handshake } from 'lucide-react';
//   import reelsData from '../data/reels.json';
//
//   const MY_ICON_MAP = { Paintbrush, CodeXml, Sparkles, Handshake };
//
//   <ReelCarousel reels={reelsData} iconMap={MY_ICON_MAP} />
// ──────────────────────────────────────────────────────────────────────────

export default function ReelCarousel({ reels = [], iconMap = {} }) {
  // Resolve tagIcon string → component using the caller-supplied map
  const REELS = reels.map(r => ({
    ...r,
    tagIcon: iconMap[r.tagIcon] ?? null,
  }));

  const [active, setActive]     = useState(0);
  const [paused, setPaused]     = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef  = useRef(null);
  const startTimeRef = useRef(null);
  const pausedAtRef  = useRef(0);

  // Guard — nothing to render until reels load
  if (!REELS.length) return null;

  const reel = REELS[active];

  const goTo = useCallback((idx) => {
    cancelAnimationFrame(progressRef.current);
    setActive(idx);
    setProgress(0);
    startTimeRef.current = null;
    pausedAtRef.current  = 0;
  }, []);

  const next = useCallback(() => goTo((active + 1) % REELS.length), [active, goTo, REELS.length]);
  const prev = useCallback(() => goTo((active - 1 + REELS.length) % REELS.length), [active, goTo, REELS.length]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // RAF progress + auto-advance
  useEffect(() => {
    if (paused) return;
    const duration = reel.duration;
    const tick = (ts) => {
      if (!startTimeRef.current) startTimeRef.current = ts - pausedAtRef.current;
      const elapsed = ts - startTimeRef.current;
      const pct     = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        progressRef.current = requestAnimationFrame(tick);
      } else {
        goTo((active + 1) % REELS.length);
      }
    };
    progressRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(progressRef.current);
  }, [active, paused, reel.duration, goTo, REELS.length]);

  const togglePause = () => {
    if (!paused) {
      cancelAnimationFrame(progressRef.current);
      pausedAtRef.current  = (progress / 100) * reel.duration;
      startTimeRef.current = null;
    }
    setPaused((p) => !p);
  };

  const handleDragEnd = (e, info) => {
    if (info.offset.x < -50) next();
    else if (info.offset.x > 50) prev();
  };

  return (
    <Box
      position="relative"
      w={{ base: "300px", md: "340px" }}
      h={{ base: "460px", md: "520px" }}
      borderRadius="28px"
      overflow="hidden"
      mx="auto"
      boxShadow="0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)"
      userSelect="none"
    >
      {REELS.map((r, i) => (
        <motion.div
          key={r.id}
          initial={false}
          animate={{
            opacity: i === active ? 1 : 0,
            scale:   i === active ? 1 : 1.04,
            zIndex:  i === active ? 5 : 0,
          }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          drag={i === active ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.13}
          onDragEnd={i === active ? handleDragEnd : undefined}
          style={{
            position: "absolute", inset: 0,
            cursor: i === active ? "grab" : "default",
            pointerEvents: i === active ? "auto" : "none",
          }}
        >
          <img src={r.bg} alt={r.label} draggable={false}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", pointerEvents: "none", userSelect: "none",
            }}
          />
          <div style={{ position: "absolute", inset: 0, background: r.gradient }} />

          {i === active && (
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              justifyContent: "flex-end", padding: 24,
            }}>
              {/* Tag pill */}
              <motion.div key={`tag-${r.id}`}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.32 }}>
                <div style={{
                  display: "inline-block", padding: "4px 12px",
                  borderRadius: 999, marginBottom: 8,
                  background: `${r.accent}22`, border: `1px solid ${r.accent}55`,
                  backdropFilter: "blur(8px)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {r.tagIcon && <r.tagIcon size={11} color={r.accent} />}
                    <span style={{
                      fontSize: 11, color: r.accent,
                      fontFamily: "'Orbitron', sans-serif", letterSpacing: "0.12em",
                    }}>
                      {r.tagLabel}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Label */}
              <motion.div key={`label-${r.id}`}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24, duration: 0.32 }}>
                <p style={{
                  fontFamily: "'Orbitron', sans-serif", fontSize: 22,
                  fontWeight: 800, color: "white", lineHeight: 1.2, margin: "0 0 8px",
                }}>
                  {r.label}
                </p>
              </motion.div>

              {/* Caption */}
              <motion.div key={`caption-${r.id}`}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.32 }}>
                <p style={{
                  fontFamily: "'Sora', sans-serif", fontSize: 13,
                  color: "rgba(255,255,255,0.65)", lineHeight: 1.65,
                  margin: "0 0 20px", fontStyle: "italic",
                }}>
                  {r.caption}
                </p>
              </motion.div>

              {/* Bottom glow line */}
              <div style={{
                position: "absolute", bottom: 0, left: "10%", right: "10%",
                height: 1, background: r.accent,
                boxShadow: `0 0 20px 4px ${r.accent}80`,
                transition: "background 0.4s, box-shadow 0.4s",
              }} />
            </div>
          )}
        </motion.div>
      ))}

      {/* Progress bars */}
      <Flex position="absolute" top={4} left={4} right={4} gap={1.5} zIndex={10}>
        {REELS.map((r, i) => (
          <Box key={r.id} flex={1} h="2.5px" borderRadius="full"
            bg="rgba(255,255,255,0.18)" overflow="hidden"
            cursor="pointer" onClick={() => goTo(i)}>
            <Box h="full" borderRadius="full"
              bg={i === active ? REELS[i].accent : i < active ? "rgba(255,255,255,0.65)" : "transparent"}
              w={i === active ? `${progress}%` : i < active ? "100%" : "0%"}
              style={{ transition: i !== active ? "width 0.2s" : "none" }}
            />
          </Box>
        ))}
      </Flex>

      {/* Counter */}
      <Box position="absolute" top="44px" left={4} zIndex={10}>
        <Text fontFamily="'Orbitron', sans-serif" fontSize="9px"
          color="whiteAlpha.400" letterSpacing="0.15em">
          {String(active + 1).padStart(2, "0")} / {String(REELS.length).padStart(2, "0")}
        </Text>
      </Box>

      {/* Pause / play */}
      <Box position="absolute" top="40px" right={4} zIndex={10}
        onClick={togglePause} cursor="pointer"
        w="26px" h="26px" borderRadius="full"
        bg="rgba(0,0,0,0.5)" backdropFilter="blur(8px)"
        border="1px solid rgba(255,255,255,0.12)"
        display="flex" alignItems="center" justifyContent="center"
        _hover={{ bg: "rgba(0,0,0,0.7)" }} transition="all 0.2s">
        <Text fontSize="9px" color="white">{paused ? "▶" : "⏸"}</Text>
      </Box>

      {/* Tap zones */}
      <Box position="absolute" left={0} top={0} w="38%" h="full" zIndex={9} onClick={prev} cursor="pointer" />
      <Box position="absolute" right={0} top={0} w="38%" h="full" zIndex={9} onClick={next} cursor="pointer" />
    </Box>
  );
}