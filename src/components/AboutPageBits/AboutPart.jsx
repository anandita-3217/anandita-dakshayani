
// TODO: Change the about part from lorem ipsum
// TODO: get rid of the text floating in 
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
import ReelCarousel from "../ui/ReelCarousel";

import {motion,useInView} from "framer-motion";

import {CodeXml , Paintbrush, Sparkles, Handshake  } from 'lucide-react';

import reelsData from '../AboutPageBits/data/reels.json';

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


// 2. The Icon Map
const REEL_ICON_MAP = { Paintbrush, CodeXml, Sparkles, Handshake };
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
            <ReelCarousel reels={reelsData} iconMap={REEL_ICON_MAP}/>
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

