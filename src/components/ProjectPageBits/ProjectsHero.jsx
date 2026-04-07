import { useEffect, useRef, useState } from "react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { PROJECT_STATS } from "./data/projects"; 

const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);

// ── Config — edit these ───────────────────────────────────────────────────────
const CONFIG = {
  name: "Alex Morgan",
  handle: "@alexmorgan",
  totalProjects: 6,
  totalTech: PROJECT_STATS.total,
  currentlyBuilding: "NeuralDraft — AI writing tooling for devs",
  openToWork: true,
  // Rotating focus areas shown in the "focus" slot
  focusAreas: [
    "Full-stack Web Apps",
    "API Design & Integration",
    "Developer Tooling",
    "Open Source Libraries",
    "AI-powered Products",
  ],
};

// ── Rotating focus chip ───────────────────────────────────────────────────────
function FocusCycler() {
  const [idx, setIdx] = useState(0);
  const accent = "#7c3aed";

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % CONFIG.focusAreas.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <Flex align="center" gap={2} flexShrink={0}>
      <Text
        fontFamily="'JetBrains Mono', monospace"
        fontSize="8px"
        letterSpacing="0.2em"
        textTransform="uppercase"
        color={useColorModeValue("#9ca3af", "rgba(255,255,255,0.28)")}
      >
        Focus
      </Text>
      <Box
        px={2.5}
        py={1}
        borderRadius="6px"
        border="1px solid"
        borderColor={`${accent}35`}
        bg={`${accent}0e`}
        overflow="hidden"
        position="relative"
        h="22px"
        minW="180px"
      >
        <AnimatePresence mode="wait">
          <MotionBox
            key={idx}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
            position="absolute"
            top="50%"
            left="10px"
            style={{ translateY: "-50%" }}
            whiteSpace="nowrap"
          >
            <Text
              fontFamily="'JetBrains Mono', monospace"
              fontSize="9px"
              letterSpacing="0.12em"
              textTransform="uppercase"
              color={accent}
            >
              {CONFIG.focusAreas[idx]}
            </Text>
          </MotionBox>
        </AnimatePresence>
      </Box>
    </Flex>
  );
}

// ── Live building ticker ──────────────────────────────────────────────────────
function BuildingTicker() {
  const accent = "#14b8a6";
  const dimColor = useColorModeValue("#6b7280", "rgba(255,255,255,0.35)");

  return (
    <Flex align="center" gap={2.5} overflow="hidden">
      {/* Animated dot */}
      <Box position="relative" w="7px" h="7px" flexShrink={0}>
        <Box
          position="absolute"
          inset={0}
          borderRadius="50%"
          bg={accent}
          style={{ animation: "ping 2s ease-out infinite" }}
        />
        <Box
          position="absolute"
          inset={0}
          borderRadius="50%"
          bg={accent}
          boxShadow={`0 0 6px ${accent}`}
        />
      </Box>

      <Text
        fontFamily="'JetBrains Mono', monospace"
        fontSize="8px"
        letterSpacing="0.16em"
        textTransform="uppercase"
        color={dimColor}
        flexShrink={0}
      >
        Building
      </Text>

      {/* Scrolling project name */}
      <Box
        flex={1}
        overflow="hidden"
        position="relative"
        maxW={{ base: "160px", md: "260px" }}
      >
        <Text
          fontFamily="'Sora', sans-serif"
          fontSize="11px"
          color={accent}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {CONFIG.currentlyBuilding}
        </Text>
      </Box>
    </Flex>
  );
}

// ── Stat pill ─────────────────────────────────────────────────────────────────
function StatPill({ value, label, accent, delay }) {
  const numRef = useRef(null);
  const cardBg = useColorModeValue("rgba(247,247,248,0.92)", "rgba(10,10,10,0.82)");
  const borderColor = useColorModeValue("rgba(0,0,0,0.08)", "rgba(255,255,255,0.06)");
  const dimColor = useColorModeValue("#9ca3af", "rgba(255,255,255,0.28)");

  // GSAP count-up
  useEffect(() => {
    if (!numRef.current || typeof value !== "number") return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 1.1,
      delay: delay + 0.3,
      ease: "power2.out",
      snap: { val: 1 },
      onUpdate() {
        if (numRef.current) numRef.current.textContent = Math.round(obj.val);
      },
    });
  }, [value, delay]);

  return (
    <MotionBox
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      bg={cardBg}
      backdropFilter="blur(12px)"
      border="1px solid"
      borderColor={borderColor}
      borderRadius="10px"
      px={{ base: 4, md: 5 }}
      py={3}
      position="relative"
      overflow="hidden"
      role="group"
      flexShrink={0}
    >
      <Box
        position="absolute"
        top={0} left={0} right={0} h="1px"
        bgGradient={`linear(to-r, transparent, ${accent}45, transparent)`}
      />
      <Text
        ref={numRef}
        fontFamily="'Orbitron', sans-serif"
        fontWeight={800}
        fontSize={{ base: "20px", md: "24px" }}
        color={accent}
        lineHeight={1}
        mb={0.5}
        _groupHover={{ textShadow: `0 0 16px ${accent}` }}
        style={{ transition: "text-shadow 0.2s ease" }}
      >
        {typeof value === "number" ? 0 : value}
      </Text>
      <Text
        fontFamily="'Sora', sans-serif"
        fontSize="9px"
        letterSpacing="0.12em"
        textTransform="uppercase"
        color={dimColor}
      >
        {label}
      </Text>
    </MotionBox>
  );
}

// ── Availability badge ────────────────────────────────────────────────────────
function AvailBadge() {
  const accent = CONFIG.openToWork ? "#14b8a6" : "#f4845f";
  return (
    <Flex
      align="center"
      gap={2}
      px={2.5}
      py={1}
      borderRadius="6px"
      border="1px solid"
      borderColor={`${accent}35`}
      bg={`${accent}0c`}
      flexShrink={0}
    >
      <Box position="relative" w="6px" h="6px">
        <Box
          position="absolute" inset={0} borderRadius="50%" bg={accent}
          style={{ animation: CONFIG.openToWork ? "ping 2s ease-out infinite" : "none" }}
        />
        <Box position="absolute" inset={0} borderRadius="50%" bg={accent} />
      </Box>
      <Text
        fontFamily="'JetBrains Mono', monospace"
        fontSize="8px"
        letterSpacing="0.18em"
        textTransform="uppercase"
        color={accent}
        whiteSpace="nowrap"
      >
        {CONFIG.openToWork ? "Open to work" : "Not available"}
      </Text>
    </Flex>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function ProjectsHero() {
  const wrapperRef = useRef(null);

  const cardBg      = useColorModeValue("rgba(247,247,248,0.88)", "rgba(8,8,10,0.84)");
  const borderColor = useColorModeValue("rgba(0,0,0,0.08)", "rgba(255,255,255,0.06)");
  const dimColor    = useColorModeValue("#9ca3af", "rgba(255,255,255,0.28)");
  const textColor   = useColorModeValue("#111", "rgba(255,255,255,0.88)");
  const line2Color  = useColorModeValue("#d1d5db", "rgba(255,255,255,0.12)");
  const dividerColor = useColorModeValue("rgba(0,0,0,0.07)", "rgba(255,255,255,0.06)");

  // GSAP: subtle scanline shimmer across the card on mount
  useEffect(() => {
    if (!wrapperRef.current) return;
    const shimmer = wrapperRef.current.querySelector(".shimmer-line");
    if (!shimmer) return;
    gsap.fromTo(
      shimmer,
      { x: "-100%", opacity: 0.6 },
      { x: "200%", opacity: 0, duration: 1.1, delay: 0.5, ease: "power1.inOut" }
    );
  }, []);

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
  };
  const item = {
    hidden: { opacity: 0, y: 14 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
  };

  return (
    <>
      <style>{`
        @keyframes ping {
          0%   { transform: scale(1); opacity: 0.75; }
          70%  { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>

      <Box
        ref={wrapperRef}
        bg="transparent"
        px={{ base: 5, md: 12, lg: 20 }}
        py={{ base: 25, md: 16 }}
        position="relative"
        overflow="hidden"
        mb={8}
      >


        {/* ── Main content ── */}
        <MotionFlex
          variants={containerVariants}
          initial="hidden"
          animate="show"
          direction="column"
          gap={0}
          px={{ base: 5, md: 8 }}
          pt={{ base: 6, md: 7 }}
          pb={{ base: 5, md: 6 }}
        >

          {/* ── Row 1: eyebrow + availability ── */}
          <MotionBox variants={item} mb={5}>
            <Flex justify="space-between" align="center" flexWrap="wrap" gap={3}>
              <Flex align="center" gap={3}>
                <Box w="20px" h="1px" bgGradient="linear(to-r, #ec4899, #7c3aed)" />
                <Text
                  fontFamily="'JetBrains Mono', monospace"
                  fontSize="8px"
                  letterSpacing="0.3em"
                  textTransform="uppercase"
                  color={dimColor}
                >
                  Selected Work
                </Text>
              </Flex>
              <AvailBadge />
            </Flex>
          </MotionBox>

          {/* ── Row 2: Name heading + stat pills ── */}
          <MotionBox variants={item} mb={5}>
            <Flex
              justify="space-between"
              align="flex-end"
              flexWrap="wrap"
              gap={{ base: 5, md: 8 }}
            >
              {/* Name + handle */}
              <Box>
                <Flex align="baseline" gap={3} flexWrap="wrap">
                  <Text
                    fontFamily="'Orbitron', sans-serif"
                    fontWeight={900}
                    fontSize={{ base: "28px", md: "clamp(32px, 4vw, 48px)" }}
                    letterSpacing="-0.03em"
                    lineHeight={0.95}
                    bgGradient="linear(to-r, #1e40af, #7c3aed, #ec4899)"
                    bgClip="text"
                    display="inline-block"
                  >
                    {CONFIG.name.split(" ")[0]}
                  </Text>
                  <Text
                    fontFamily="'Orbitron', sans-serif"
                    fontWeight={900}
                    fontSize={{ base: "28px", md: "clamp(32px, 4vw, 48px)" }}
                    letterSpacing="-0.03em"
                    lineHeight={0.95}
                    color={line2Color}
                    display="inline-block"
                  >
                    {CONFIG.name.split(" ")[1]}.
                  </Text>
                </Flex>
                <Text
                  fontFamily="'JetBrains Mono', monospace"
                  fontSize="10px"
                  letterSpacing="0.18em"
                  color={dimColor}
                  mt={1.5}
                >
                  {CONFIG.handle}
                </Text>
                <Text
                  fontFamily="'JetBrains Mono', monospace"
                  fontSize="10px"
                  letterSpacing="0.18em"
                  color={dimColor}
                  mt={1.5}
                >
                  A peek into my technical intrests
                  {/* For the ProjectsIntro i want to add a tagline - a peek into my technical intrests. - under the config handle how do i style it? */}
                </Text>
              </Box>

              {/* Stat pills row */}
              <Flex gap={3} flexWrap="wrap">
                <StatPill
                  value={CONFIG.totalProjects}
                  label="Projects"
                  accent="#14b8a6"
                  delay={0.25}
                />
                <StatPill
                  value={CONFIG.totalTech}
                  label="Technologies"
                  accent="#7c3aed"
                  delay={0.35}
                />
                <StatPill
                  value="3+"
                  label="Yrs Coding"
                  accent="#ec4899"
                  delay={0.45}
                />
              </Flex>
            </Flex>
          </MotionBox>

          {/* ── Divider ── */}
          <MotionBox variants={item} mb={5}>
            <Box h="1px" bgGradient="linear(to-r, transparent, rgba(124,58,237,0.25), transparent)" />
          </MotionBox>

          {/* ── Row 3: currently building + focus cycler ── */}
          <MotionBox variants={item}>
            <Flex
              justify="space-between"
              align="center"
              flexWrap="wrap"
              gap={{ base: 4, md: 6 }}
            >
              <BuildingTicker />

              {/* Vertical divider (desktop only) */}
              <Box
                display={{ base: "none", md: "block" }}
                w="1px"
                h="20px"
                bg={dividerColor}
                flexShrink={0}
              />

              <FocusCycler />

              {/* Vertical divider (desktop only) */}
              <Box
                display={{ base: "none", md: "block" }}
                w="1px"
                h="20px"
                bg={dividerColor}
                flexShrink={0}
              />

              {/* CTA: scroll hint */}
              <Flex
                align="center"
                gap={2}
                flexShrink={0}
                display={{ base: "none", md: "flex" }}
              >
                <Text
                  fontFamily="'JetBrains Mono', monospace"
                  fontSize="8px"
                  letterSpacing="0.18em"
                  textTransform="uppercase"
                  color={dimColor}
                >
                  {CONFIG.totalProjects} projects below
                </Text>
                <MotionBox
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                  color={dimColor}
                  fontSize="11px"
                >
                  ↓
                </MotionBox>
              </Flex>
            </Flex>
          </MotionBox>
        </MotionFlex>

        {/* Bottom accent rule */}
        <Box
          h="1px"
          bgGradient="linear(to-r, transparent, rgba(124,58,237,0.18), rgba(236,72,153,0.12), transparent)"
        />
      </Box>
    </>
  );
}

// ── Usage — drop this directly above your search bar inside Projects.jsx ──────
//
// import ProjectsIntro from "./ProjectsIntro";
//
// export default function Projects() {
//   return (
//     <Box px={{ base: 5, md: 12, lg: 20 }} py={{ base: 20, md: 16 }}>
//       <Flex direction="column" maxW="1200px" mx="auto" gap={8}>
//         <ProjectsIntro />          ← sits here, above filters
//         {/* search bar */}
//         {/* filter toggles */}
//         {/* project grid */}
//       </Flex>
//     </Box>
//   );
// }
//
// ── Config ────────────────────────────────────────────────────────────────────
// Edit CONFIG{} at the top:
//   name              — your full name (first word gets gradient, second gets muted)
//   handle            — your GitHub/Twitter handle
//   totalProjects     — animates via GSAP count-up
//   totalTech         — same
//   currentlyBuilding — one-liner, shown in the live ticker
//   openToWork        — true/false toggles pill color teal ↔ coral
//   focusAreas[]      — cycles every 2.6s in the focus chip