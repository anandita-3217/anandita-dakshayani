
// TODO: Change the about part from lorem ipsum

import { useState, useEffect, useRef, useCallback } from "react";
import { keyframes } from "@emotion/react";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import TextType from "../ui/TextType";
import {isValidMotionProp,motion,useInView} from "framer-motion";
import {CodeXml , Paintbrush, Sparkles, Handshake  } from 'lucide-react';

const MotionBox = motion.create(Box)

// ── Keyframes ──────────────────────────────────────────────────────────────
const breathe = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50%       { transform: scale(1.08); opacity: 0.7; }
`;
const softPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(20,184,166,0); }
  50%       { box-shadow: 0 0 0 10px rgba(20,184,166,0.08); }
`;
const gradShift = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
`;

// ── Reel data ──────────────────────────────────────────────────────────────
const REELS = [
  {
    id: "design",
    bg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop&auto=format",
    gradient: "linear-gradient(180deg, transparent 30%, rgba(10,10,10,0.95) 100%)",
    accent: "#ec4899",
    label: "UI Design",
    caption: "Crafting interfaces that feel inevitable.",
    tagIcon: Paintbrush,
    tagLabel: "Design Systems",

    duration: 4000,
  },
  {
    id: "code",
    bg: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=600&fit=crop&auto=format",
    gradient: "linear-gradient(180deg, transparent 30%, rgba(10,10,10,0.95) 100%)",
    accent: "#14b8a6",
    label: "Engineering",
    caption: "Clean code is a love letter to the next developer.",
    tagIcon: CodeXml ,
    tagLabel: "Full-Stack",

    duration: 4500,
  },
  {
    id: "motion",
    bg: "https://images.unsplash.com/photo-1579762715459-a28e1d7e32e3?w=400&h=600&fit=crop&auto=format",
    gradient: "linear-gradient(180deg, transparent 30%, rgba(10,10,10,0.95) 100%)",
    accent: "#7c3aed",
    label: "Motion",
    caption: "Animation is the soul of interaction.",
    tagIcon: Sparkles ,
    tagLabel: "Micro-interactions",
    duration: 3800,
  },
  {
    id: "collab",
    bg: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=600&fit=crop&auto=format",
    gradient: "linear-gradient(180deg, transparent 30%, rgba(10,10,10,0.95) 100%)",
    accent: "#3b82f6",
    label: "Collaboration",
    caption: "The best products are built together.",
    tagIcon: Handshake ,
    tagLabel: "Teamwork",
    duration: 4200,
  },
];

// ── Tag pill ───────────────────────────────────────────────────────────────
function TagPill({ label, color, delay }) {
  const [hovered, setHovered] = useState(false);
  // Uses surface.glass from theme — translucent card surface
  const baseBg     = useColorModeValue("rgba(255,255,255,0.6)", "rgba(255,255,255,0.04)");
  const baseText   = useColorModeValue("gray.600",              "whiteAlpha.600");

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.4, type: "spring", stiffness: 200 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4, scale: 1.07, transition: { duration: 0.2 } }}
      cursor="default"
    >
      <HStack spacing={2} px={3} py={1.5} borderRadius="full"
        bg={hovered ? `${color}18` : baseBg}
        border="1px solid"
        borderColor={hovered ? `${color}50` : "border.subdued"}
        transition="all 0.25s"
        boxShadow={hovered ? `0 4px 20px ${color}25` : "none"}
        backdropFilter="blur(8px)"
      >
        <Box w="6px" h="6px" borderRadius="full" bg={color}
          opacity={hovered ? 1 : 0.6}
          boxShadow={hovered ? `0 0 8px ${color}` : "none"}
          transition="all 0.25s"
        />
        <Text fontSize="11.5px" fontFamily="'Sora', sans-serif"
          color={hovered ? "text.primary" : baseText}
          letterSpacing="0.04em" transition="color 0.25s">
          {label}
        </Text>
      </HStack>
    </MotionBox>
  );
}

// ── Word reveal ────────────────────────────────────────────────────────────
function RevealText({ text, delay = 0, fontSize, fontWeight, color, fontFamily, lineHeight, as }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <Box ref={ref} as={as || "p"} display="flex" flexWrap="wrap" gap="0.3em" lineHeight={lineHeight || 1.5}>
      {text.split(" ").map((word, i) => (
        <motion.span key={i}
          initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ delay: delay + i * 0.045, duration: 0.45, ease: "easeOut" }}
          style={{ fontSize, fontWeight, color, fontFamily, display: "inline-block" }}
        >
          {word}
        </motion.span>
      ))}
    </Box>
  );
}

// ── REEL CAROUSEL ──────────────────────────────────────────────────────────
function ReelCarousel() {
  const [active, setActive]     = useState(0);
  const [paused, setPaused]     = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef  = useRef(null);
  const startTimeRef = useRef(null);
  const pausedAtRef  = useRef(0);
  const reel = REELS[active];

  const goTo = useCallback((idx) => {
    cancelAnimationFrame(progressRef.current);
    setActive(idx);
    setProgress(0);
    startTimeRef.current = null;
    pausedAtRef.current  = 0;
  }, []);

  const next = useCallback(() => goTo((active + 1) % REELS.length), [active, goTo]);
  const prev = useCallback(() => goTo((active - 1 + REELS.length) % REELS.length), [active, goTo]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

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
  }, [active, paused, reel.duration, goTo]);

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
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", pointerEvents: "none", userSelect: "none" }} />
          <div style={{ position: "absolute", inset: 0, background: r.gradient }} />

          {i === active && (
            <div style={{ position: "absolute", inset: 0, display: "flex",
              flexDirection: "column", justifyContent: "flex-end", padding: 24 }}>
              <motion.div key={`tag-${r.id}`} initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.32 }}>
                <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 999,
                  marginBottom: 8, background: `${r.accent}22`,
                  border: `1px solid ${r.accent}55`, backdropFilter: "blur(8px)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <r.tagIcon size={11} color={r.accent} />
                    <span style={{ fontSize: 11, color: r.accent,
                      fontFamily: "'Orbitron', sans-serif", letterSpacing: "0.12em" }}>
                      {r.tagLabel}
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div key={`label-${r.id}`} initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24, duration: 0.32 }}>
                <p style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 22,
                  fontWeight: 800, color: "white", lineHeight: 1.2, margin: "0 0 8px" }}>
                  {r.label}
                </p>
              </motion.div>

              <motion.div key={`caption-${r.id}`} initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.32 }}>
                <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 13,
                  color: "rgba(255,255,255,0.65)", lineHeight: 1.65,
                  margin: "0 0 20px", fontStyle: "italic" }}>
                  {r.caption}
                </p>
              </motion.div>

              <div style={{ position: "absolute", bottom: 0, left: "10%", right: "10%",
                height: 1, background: r.accent,
                boxShadow: `0 0 20px 4px ${r.accent}80`,
                transition: "background 0.4s, box-shadow 0.4s" }} />
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

      {/* Pause/play */}
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
      <Box position="absolute" left={0} top={0} w="38%" h="full" zIndex={9}
        onClick={prev} cursor="pointer" />
      <Box position="absolute" right={0} top={0} w="38%" h="full" zIndex={9}
        onClick={next} cursor="pointer" />
    </Box>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function AboutIntro() {
  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const tags = [
    { label: "React & TypeScript", color: "#61dafb", delay: 0.9 },
    { label: "Node.js",            color: "#68a063", delay: 1.0 },
    { label: "UI Systems",         color: "#ec4899", delay: 1.1 },
    { label: "Motion Design",      color: "#7c3aed", delay: 1.2 },
    { label: "Cloud & DevOps",     color: "#3b82f6", delay: 1.3 },
  ];
  // "ABOUT ME" badge
  const badgeBg        = useColorModeValue("rgba(20,184,166,0.08)",   "rgba(20,184,166,0.06)");
  const badgeBorder    = useColorModeValue("rgba(20,184,166,0.25)",   "rgba(20,184,166,0.18)");
  // Divider line below name
  const dividerGrad    = useColorModeValue(
    "linear-gradient(90deg, #14b8a6, #7c3aed, transparent)",
    "linear-gradient(90deg, #14b8a6, #7c3aed, transparent)"
  );
  // Typewriter cursor
  const cursorColor    = useColorModeValue("#7c3aed", "#7c3aed");
  // Glow behind reel card
  const reelGlowColor  = useColorModeValue(
    "rgba(124,58,237,0.08)",
    "rgba(124,58,237,0.14)"
  );
  // Keyboard hint
  const hintBg         = useColorModeValue("rgba(0,0,0,0.05)",   "rgba(255,255,255,0.05)");
  const hintBorder     = useColorModeValue("rgba(0,0,0,0.10)",   "rgba(255,255,255,0.10)");
  const hintKeyColor   = useColorModeValue("gray.400",            "whiteAlpha.300");
  const hintLabelColor = useColorModeValue("gray.300",            "whiteAlpha.200");

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top)  / rect.height,
    });
  };

  return (
    <Box
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      minH="1100px"
      bg="transparent"
      position="relative"
      overflow="hidden"
      display="flex"
      alignItems="center"
      px={{ base: 5, md: 12, lg: 20 }}
      py={{ base: 20, md: 0 }}
      fontFamily="'Sora', sans-serif"
      transition="background-color 0.3s ease"
    >
      

      {/* ── Split layout ───────────────────────────────────────────── */}
      <Flex
        direction={{ base: "column", lg: "row" }}
        align="center" justify="space-between"
        w="full" maxW="1200px" mx="auto"
        gap={{ base: 16, lg: 12 }}
        position="relative" zIndex={1}
      >
        {/* LEFT: TEXT */}
        <VStack align="flex-start" spacing={0} flex={1} maxW={{ lg: "560px" }}>

          {/* "About me" badge */}
          <MotionBox
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            mb={5}
          >
            <HStack spacing={3} px={4} py={2} borderRadius="full"
              bg={badgeBg}
              border="1px solid"
              borderColor={badgeBorder}
              w="fit-content"
              animation={`${softPulse} 3s ease-in-out infinite`}
            >
              <Box w="7px" h="7px" borderRadius="full" bg="#14b8a6"
                boxShadow="0 0 10px #14b8a6"
                animation={`${breathe} 2s ease-in-out infinite`}
              />
              <Text fontSize="12px" color="#14b8a6" letterSpacing="0.14em" fontWeight={500}>
                ABOUT ME
              </Text>
            </HStack>
          </MotionBox>

          {/* Name + typewriter */}
          <Box mb={4}>
            <RevealText
              text="Hey, I'm Anandita"
              delay={0.15}
              fontSize="clamp(38px, 6vw, 64px)"
              fontWeight="800"
              color={isDark ? "white" : "#1a1a1a"}
              fontFamily="'Orbitron', sans-serif"
              lineHeight={1.1}
              as="h1"
            />
            

            <MotionBox
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              mt={2}
            >
              <HStack spacing={0} align="center" h="36px">
                <Text
                fontFamily="'Sora', sans-serif"
                fontSize={{ base: "17px", md: "21px" }}
                initial="hidden"
                bgGradient="linear(to-r, #1e40af, #7c3aed,#ec4899)"
                bgClip="text"
                backgroundSize="200% 200%"
                animation={`${gradShift} 5s ease infinite`}
                letterSpacing="0.02em"
            >
                <TextType 
                text={["Full-Stack Developer", "UI/UX Enthusiast", "Open Source Lover", "Problem Solver"]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={false}
              />

            </Text>
                <Box w="2px" h="22px" bg={cursorColor} ml={1}
                  animation={`${blink} 1s step-end infinite`}
                  borderRadius="full"
                />
              </HStack>
            </MotionBox>
          </Box>

          {/* Divider */}
          <MotionBox
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
            h="2px" w="80px" borderRadius="full" mb={7}
            style={{ background: dividerGrad }}
          />

          {/* Body copy — uses text.secondary / text.dim semantic tokens */}
          <Box mb={8} maxW="500px">
            <RevealText
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. I craft digital experiences that feel alive — blending clean engineering with considered design to build things people actually enjoy using."
              delay={0.5} fontSize="15.5px" fontWeight="400"
              color="text.dim"
              fontFamily="'Sora', sans-serif" lineHeight={1.9}
            />
            <Box mt={4}>
              <RevealText
                text="I believe the best products live at the intersection of empathy and precision. When I'm not shipping features, you'll find me exploring design systems, contributing to open source, or staring at a sunset pretending to be productive."
                delay={0.75} fontSize="15.5px" fontWeight="400"
                color="text.dim"
                fontFamily="'Sora', sans-serif" lineHeight={1.9}
              />
            </Box>
          </Box>

          {/* Tag pills — use surface.glass via TagPill internally */}
          <MotionBox initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.85 }} mb={9}>
            <Flex gap={2} flexWrap="wrap">
              {tags.map((t) => <TagPill key={t.label} {...t} />)}
            </Flex>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1, duration: 0.5 }}
            mb={12}
          />

        </VStack>

        {/* RIGHT: REEL CAROUSEL */}
        <MotionBox
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          flex={{ base: "unset", lg: "0 0 400px" }}
          w={{ base: "full", lg: "400px" }}
          display="flex" alignItems="center" justifyContent="center"
          position="relative"
          pb="48px"
        >
          {/* Glow behind reel */}
          <Box
            position="absolute"
            w="360px" h="500px"
            borderRadius="40px"
            style={{ background: `radial-gradient(ellipse, ${reelGlowColor} 0%, transparent 70%)` }}
            filter="blur(30px)"
            animation={`${breathe} 8s ease-in-out infinite`}
            pointerEvents="none"
          />

          <Box position="relative">
            <ReelCarousel />
            {/* Keyboard hint */}
            <HStack spacing={2} justify="center" mt={4}>
              <Box px={2} py={0.5} borderRadius="6px"
                bg={hintBg} border="1px solid" borderColor={hintBorder}>
                <Text fontSize="10px" color={hintKeyColor}
                  fontFamily="'Orbitron', sans-serif">←</Text>
              </Box>
              <Text fontSize="10px" color={hintLabelColor}
                fontFamily="'Orbitron', sans-serif" letterSpacing="0.1em">
                keyboard nav
              </Text>
              <Box px={2} py={0.5} borderRadius="6px"
                bg={hintBg} border="1px solid" borderColor={hintBorder}>
                <Text fontSize="10px" color={hintKeyColor}
                  fontFamily="'Orbitron', sans-serif">→</Text>
              </Box>
            </HStack>
          </Box>
        </MotionBox>
      </Flex>
    </Box>
  );
}

