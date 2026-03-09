import { useState, useEffect, useRef } from "react";
import { keyframes } from "@emotion/react";
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  chakra,
  shouldForwardProp,
  useColorModeValue,
} from "@chakra-ui/react";
import { isValidMotionProp, motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (p) => isValidMotionProp(p) || shouldForwardProp(p),
});
const MotionText = chakra(motion.p, {
  shouldForwardProp: (p) => isValidMotionProp(p) || shouldForwardProp(p),
});

// ── Keyframes ──────────────────────────────────────────────────────────────
const breathe = keyframes`
  0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.5; }
  50%       { transform: scale(1.08) rotate(1.5deg); opacity: 0.7; }
`;
const floatY = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-14px); }
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
const shimmerLine = keyframes`
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
`;
const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
`;
const rotateHalo = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

// ── Typing hook ────────────────────────────────────────────────────────────
function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIdx((c) => c + 1);
        }
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx((w) => (w + 1) % words.length);
          setCharIdx(0);
        } else {
          setCharIdx((c) => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

// ── Magnetic button ────────────────────────────────────────────────────────
function MagneticBtn({ children, href = "#", variant = "primary", ...props }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };
  const handleLeave = () => { x.set(0); y.set(0); setHovered(false); };

  const isPrimary = variant === "primary";

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy, display: "inline-block", textDecoration: "none" }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <Box
        position="relative"
        px={7}
        py={3}
        borderRadius="full"
        overflow="hidden"
        bg={isPrimary ? "transparent" : "transparent"}
        border="1.5px solid"
        borderColor={isPrimary ? "transparent" : "rgba(255,255,255,0.12)"}
        cursor="pointer"
        style={{
          background: isPrimary
            ? "linear-gradient(135deg, #1e40af, #7c3aed, #ec4899)"
            : undefined,
          backgroundSize: isPrimary ? "200% 200%" : undefined,
          animation: isPrimary ? `${gradShift} 4s ease infinite` : undefined,
        }}
        _hover={!isPrimary ? { borderColor: "rgba(255,255,255,0.3)", bg: "rgba(255,255,255,0.04)" } : {}}
        transition="all 0.25s"
      >
        {/* shimmer sweep */}
        {hovered && (
          <Box
            position="absolute"
            top={0} bottom={0}
            w="40px"
            bg="linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)"
            animation={`${shimmerLine} 0.55s ease forwards`}
            pointerEvents="none"
          />
        )}
        <Text
          fontFamily="'Sora', sans-serif"
          fontSize="13px"
          fontWeight={600}
          color="white"
          letterSpacing="0.06em"
          position="relative"
          zIndex={1}
        >
          {children}
        </Text>
      </Box>
    </motion.a>
  );
}

// ── Floating tag pill ──────────────────────────────────────────────────────
function TagPill({ label, color, delay }) {
  const [hovered, setHovered] = useState(false);
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
      <HStack
        spacing={2}
        px={3}
        py={1.5}
        borderRadius="full"
        bg={hovered ? `${color}18` : "rgba(255,255,255,0.04)"}
        border="1px solid"
        borderColor={hovered ? `${color}50` : "rgba(255,255,255,0.08)"}
        transition="all 0.25s"
        boxShadow={hovered ? `0 4px 20px ${color}25` : "none"}
      >
        <Box w="6px" h="6px" borderRadius="full" bg={color} opacity={hovered ? 1 : 0.6}
          boxShadow={hovered ? `0 0 8px ${color}` : "none"}
          transition="all 0.25s"
        />
        <Text fontSize="11.5px" fontFamily="'Sora', sans-serif" color={hovered ? "white" : "whiteAlpha.600"}
          letterSpacing="0.04em" transition="color 0.25s">
          {label}
        </Text>
      </HStack>
    </MotionBox>
  );
}

// ── Stat counter ───────────────────────────────────────────────────────────
function StatItem({ value, label, color, delay }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const target = parseInt(value);

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      let start = 0;
      const step = Math.ceil(target / 30);
      const interval = setInterval(() => {
        start = Math.min(start + step, target);
        setCount(start);
        if (start >= target) clearInterval(interval);
      }, 40);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [inView, target, delay]);

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      textAlign="center"
      cursor="default"
      role="group"
    >
      <Text
        fontFamily="'Orbitron', sans-serif"
        fontSize={{ base: "22px", md: "28px" }}
        fontWeight={800}
        color={color}
        lineHeight={1}
        _groupHover={{ textShadow: `0 0 20px ${color}` }}
        transition="text-shadow 0.3s"
      >
        {count}{value.replace(/[0-9]/g, "")}
      </Text>
      <Text
        fontSize="11px"
        color="whiteAlpha.400"
        letterSpacing="0.12em"
        textTransform="uppercase"
        fontFamily="'Sora', sans-serif"
        mt={1}
      >
        {label}
      </Text>
    </MotionBox>
  );
}

// ── Avatar card (right side) ───────────────────────────────────────────────
function AvatarPanel() {
  const [activeNote, setActiveNote] = useState(null);

  const notes = [
    { id: "coffee", emoji: "☕", label: "Powered by coffee", x: "-30px", y: "18%", color: "#f59e0b", delay: 1.2 },
    { id: "music",  emoji: "🎧", label: "Lo-fi while coding", x: "calc(100% - 10px)", y: "25%", color: "#ec4899", delay: 1.5 },
    { id: "open",  emoji: "✨", label: "Open to opportunities", x: "-20px", y: "68%", color: "#14b8a6", delay: 1.8 },
    { id: "gmt",   emoji: "🌍", label: "GMT+1", x: "calc(100% - 10px)", y: "72%", color: "#7c3aed", delay: 2.0 },
  ];

  return (
    <Box position="relative" w="full" h={{ base: "400px", md: "520px" }} display="flex" alignItems="center" justifyContent="center">

      {/* Ambient blobs */}
      <Box position="absolute" w="280px" h="280px" borderRadius="full"
        bg="radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)"
        filter="blur(30px)" animation={`${breathe} 7s ease-in-out infinite`} />
      <Box position="absolute" w="200px" h="200px" borderRadius="full"
        bg="radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)"
        filter="blur(25px)" top="10%" right="10%"
        animation={`${breathe} 9s ease-in-out 2s infinite`} />

      {/* Rotating dashed halo */}
      <Box
        position="absolute"
        w="310px" h="310px"
        borderRadius="full"
        border="1.5px dashed rgba(124,58,237,0.2)"
        animation={`${rotateHalo} 18s linear infinite`}
      />
      <Box
        position="absolute"
        w="260px" h="260px"
        borderRadius="full"
        border="1px dashed rgba(20,184,166,0.15)"
        animation={`${rotateHalo} 12s linear reverse infinite`}
      />

      {/* Main image card */}
      <MotionBox
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
        position="relative"
        zIndex={2}
        animation={`${floatY} 6s ease-in-out infinite`}
      >
        {/* gradient border */}
        <Box
          p="3px"
          borderRadius="28px"
          bg="linear-gradient(135deg, #7c3aed, #ec4899, #14b8a6, #3b82f6)"
          backgroundSize="300% 300%"
          animation={`${gradShift} 5s ease infinite`}
          boxShadow="0 30px 80px rgba(0,0,0,0.5)"
        >
          <Box
            w={{ base: "200px", md: "230px" }}
            h={{ base: "260px", md: "300px" }}
            borderRadius="26px"
            overflow="hidden"
            bg="#1a1a2e"
            position="relative"
          >
            <Box
              as="img"
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face&auto=format"
              alt="Profile"
              w="full" h="full"
              objectFit="cover"
              style={{ display: "block" }}
            />
            {/* Glass overlay at bottom */}
            <Box
              position="absolute" bottom={0} left={0} right={0}
              h="80px"
              bgGradient="linear(to-t, rgba(10,10,10,0.9), transparent)"
            />
            {/* Inner shine */}
            <Box
              position="absolute" top={0} left={0} right={0} bottom={0}
              borderRadius="26px"
              bg="linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)"
              pointerEvents="none"
            />
          </Box>
        </Box>
      </MotionBox>

      {/* Floating note cards */}
      {notes.map((note) => (
        <MotionBox
          key={note.id}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: note.delay, type: "spring", stiffness: 180 }}
          whileHover={{ scale: 1.12, y: -4, transition: { duration: 0.2 } }}
          onMouseEnter={() => setActiveNote(note.id)}
          onMouseLeave={() => setActiveNote(null)}
          position="absolute"
          left={note.x}
          top={note.y}
          cursor="default"
          zIndex={3}
        >
          <HStack
            px={3} py={2}
            borderRadius="14px"
            bg="rgba(15,15,15,0.85)"
            backdropFilter="blur(16px)"
            border="1px solid"
            borderColor={activeNote === note.id ? `${note.color}50` : "rgba(255,255,255,0.08)"}
            spacing={2}
            boxShadow={activeNote === note.id
              ? `0 8px 30px ${note.color}30, 0 0 0 1px ${note.color}20`
              : "0 4px 20px rgba(0,0,0,0.4)"}
            transition="all 0.25s"
            whiteSpace="nowrap"
          >
            <Text fontSize="14px">{note.emoji}</Text>
            <Text fontSize="11px" color={activeNote === note.id ? "white" : "whiteAlpha.600"}
              fontFamily="'Sora', sans-serif" letterSpacing="0.03em" transition="color 0.25s">
              {note.label}
            </Text>
          </HStack>
        </MotionBox>
      ))}
    </Box>
  );
}

// ── Main sentence reveal ───────────────────────────────────────────────────
function RevealText({ text, delay = 0, fontSize, fontWeight, color, fontFamily, lineHeight, as }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");

  return (
    <Box ref={ref} as={as || "p"} display="flex" flexWrap="wrap" gap="0.3em" lineHeight={lineHeight || 1.5}>
      {words.map((word, i) => (
        <motion.span
          key={i}
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

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function AboutIntro() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const roles = ["Full-Stack Developer", "UI/UX Enthusiast", "Open Source Lover", "Problem Solver"];
  const typed = useTypewriter(roles, 75, 2000);

  const tags = [
    { label: "React & TypeScript", color: "#61dafb", delay: 0.9 },
    { label: "Node.js", color: "#68a063", delay: 1.0 },
    { label: "UI Systems", color: "#ec4899", delay: 1.1 },
    { label: "Motion Design", color: "#7c3aed", delay: 1.2 },
    { label: "Cloud & DevOps", color: "#3b82f6", delay: 1.3 },
  ];

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  };

  return (
    <Box
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      minH="100vh"
      bg="#0a0a0a"
      position="relative"
      overflow="hidden"
      display="flex"
      alignItems="center"
      px={{ base: 5, md: 12, lg: 20 }}
      py={{ base: 20, md: 0 }}
      fontFamily="'Sora', sans-serif"
    >
      {/* ── Background ── */}
      <Box position="absolute" inset={0} pointerEvents="none">
        {/* Mesh gradient */}
        <Box
          position="absolute" inset={0}
          bgImage={`
            radial-gradient(ellipse 60% 50% at ${mousePos.x * 100}% ${mousePos.y * 100}%,
              rgba(124,58,237,0.07) 0%, transparent 60%),
            radial-gradient(ellipse at 90% 10%, rgba(20,184,166,0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 10% 90%, rgba(236,72,153,0.05) 0%, transparent 50%)
          `}
          transition="background-image 1.4s ease"
        />
        {/* Subtle noise grain */}
        <Box
          position="absolute" inset={0}
          opacity={0.025}
          backgroundImage="url('data:image/svg+xml,%3Csvg viewBox%3D%220 0 200 200%22 xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cfilter id%3D%22n%22%3E%3CfeTurbulence type%3D%22fractalNoise%22 baseFrequency%3D%220.9%22 numOctaves%3D%224%22/%3E%3C/filter%3E%3Crect width%3D%22100%25%22 height%3D%22100%25%22 filter%3D%22url(%23n)%22/%3E%3C/svg%3E')"
          backgroundSize="180px"
        />
        {/* Fine grid */}
        <Box
          position="absolute" inset={0}
          opacity={0.018}
          backgroundImage="linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)"
          backgroundSize="80px 80px"
        />
        {/* Left fade vignette */}
        <Box
          position="absolute" inset={0}
          bgGradient="radial(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)"
        />
      </Box>

      {/* ── Split layout ── */}
      <Flex
        direction={{ base: "column", lg: "row" }}
        align="center"
        justify="space-between"
        w="full"
        maxW="1200px"
        mx="auto"
        gap={{ base: 16, lg: 8 }}
        position="relative"
        zIndex={1}
      >
        {/* ──────── LEFT: TEXT ──────── */}
        <VStack
          align="flex-start"
          spacing={0}
          flex={1}
          maxW={{ lg: "580px" }}
        >
          {/* Eyebrow */}
          <MotionBox
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            mb={5}
          >
            <HStack
              spacing={3}
              px={4} py={2}
              borderRadius="full"
              bg="rgba(20,184,166,0.06)"
              border="1px solid rgba(20,184,166,0.18)"
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

          {/* Main headline */}
          <Box mb={4}>
            <RevealText
              text="Hey, I'm Lorem"
              delay={0.15}
              fontSize="clamp(38px, 6vw, 64px)"
              fontWeight="800"
              color="white"
              fontFamily="'Orbitron', sans-serif"
              lineHeight={1.1}
              as="h1"
            />
            {/* Typewriter role */}
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
                  fontWeight={400}
                  bgGradient="linear(to-r, #1e40af, #7c3aed, #ec4899)"
                  bgClip="text"
                  backgroundSize="200% 200%"
                  animation={`${gradShift} 5s ease infinite`}
                  letterSpacing="0.02em"
                >
                  {typed}
                </Text>
                <Box
                  w="2px" h="22px"
                  bg="#7c3aed"
                  ml={1}
                  animation={`${blink} 1s step-end infinite`}
                  borderRadius="full"
                />
              </HStack>
            </MotionBox>
          </Box>

          {/* Thin accent line */}
          <MotionBox
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
            h="2px"
            w="80px"
            borderRadius="full"
            mb={7}
            style={{
              background: "linear-gradient(90deg, #14b8a6, #7c3aed, transparent)",
            }}
          />

          {/* Bio */}
          <Box mb={8} maxW="500px">
            <RevealText
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. I craft digital experiences that feel alive — blending clean engineering with considered design to build things people actually enjoy using."
              delay={0.5}
              fontSize="15.5px"
              fontWeight="400"
              color="rgba(255,255,255,0.58)"
              fontFamily="'Sora', sans-serif"
              lineHeight={1.9}
            />
            <Box mt={4}>
              <RevealText
                text="I believe the best products live at the intersection of empathy and precision. When I'm not shipping features, you'll find me exploring design systems, contributing to open source, or staring at a sunset pretending to be productive."
                delay={0.75}
                fontSize="15.5px"
                fontWeight="400"
                color="rgba(255,255,255,0.42)"
                fontFamily="'Sora', sans-serif"
                lineHeight={1.9}
              />
            </Box>
          </Box>

          {/* Tag pills */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.85 }}
            mb={9}
          >
            <Flex gap={2} flexWrap="wrap">
              {tags.map((t) => (
                <TagPill key={t.label} {...t} />
              ))}
            </Flex>
          </MotionBox>

          {/* CTA row */}
          <MotionBox
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1, duration: 0.5 }}
            mb={12}
          >
            <HStack spacing={4} flexWrap="wrap">
              <MagneticBtn href="#work" variant="primary">View my work →</MagneticBtn>
              <MagneticBtn href="#contact" variant="ghost">Let's talk</MagneticBtn>
            </HStack>
          </MotionBox>

          {/* Stats row */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.3 }}
            w="full"
          >
            {/* Divider */}
            <Box h="1px" bg="rgba(255,255,255,0.06)" mb={7} />
            <HStack spacing={10} flexWrap="wrap" rowGap={6}>
              <StatItem value="48+" label="Projects shipped" color="#14b8a6" delay={1.4} />
              <StatItem value="9+" label="Years building" color="#7c3aed" delay={1.5} />
              <StatItem value="12+" label="Happy clients" color="#ec4899" delay={1.6} />
            </HStack>
          </MotionBox>
        </VStack>

        {/* ──────── RIGHT: VISUAL ──────── */}
        <MotionBox
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          flex={{ base: "unset", lg: "0 0 420px" }}
          w={{ base: "full", lg: "420px" }}
        >
          <AvatarPanel />
        </MotionBox>
      </Flex>

      {/* ── Decorative bottom fade ── */}
      <Box
        position="absolute" bottom={0} left={0} right={0}
        h="120px"
        bgGradient="linear(to-t, rgba(10,10,10,1), transparent)"
        pointerEvents="none"
      />
    </Box>
  );
}
