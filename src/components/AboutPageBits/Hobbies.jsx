// TODO: redesign this entire component 
// import React, { useEffect, useRef } from 'react';
// import {
//   Box,
//   Container,
//   Heading,
//   Text,
//   SimpleGrid,
//   VStack,
//   Icon,
//   useColorMode,
// } from '@chakra-ui/react';
// import { motion } from 'framer-motion';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import {
//   FaCode,
//   FaGamepad,
//   FaBook,
//   FaMusic,
//   FaCamera,
//   FaPalette,
// } from 'react-icons/fa';

// gsap.registerPlugin(ScrollTrigger);

// const MotionBox = motion(Box);

// const hobbiesData = [
//   {
//     icon: FaCode,
//     title: 'Coding',
//     description: 'Building projects and learning new technologies every day',
//     color: 'brand.400',
//   },
//   {
//     icon: FaGamepad,
//     title: 'Gaming',
//     description: 'Strategy games and problem-solving adventures',
//     color: 'purple.400',
//   },
//   {
//     icon: FaBook,
//     title: 'Reading',
//     description: 'Tech blogs, sci-fi novels, and continuous learning',
//     color: 'blue.400',
//   },
//   {
//     icon: FaMusic,
//     title: 'Music',
//     description: 'Listening to lo-fi beats while coding',
//     color: 'pink.400',
//   },
//   {
//     icon: FaCamera,
//     title: 'Photography',
//     description: 'Capturing moments and exploring perspectives',
//     color: 'orange.400',
//   },
//   {
//     icon: FaPalette,
//     title: 'Design',
//     description: 'UI/UX design and creative visual experiments',
//     color: 'teal.400',
//   },
// ];

// const Hobbies = () => {
//   const { colorMode } = useColorMode();
//   const sectionRef = useRef(null);
//   const headingRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from(headingRef.current, {
//         scrollTrigger: {
//           trigger: headingRef.current,
//           start: 'top 80%',
//         },
//         y: 50,
//         opacity: 0,
//         duration: 1,
//         ease: 'power3.out',
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.15,
//       },
//     },
//   };

//   const cardVariants = {
//     hidden: {
//       opacity: 0,
//       y: 50,
//       scale: 0.9,
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: {
//         duration: 0.6,
//         ease: [0.43, 0.13, 0.23, 0.96],
//       },
//     },
//   };

//   return (
//     <Box
//       ref={sectionRef}
//       py={{ base: 16, md: 24 }}
//       bg="transparent"
//       position="relative"
//       overflow="hidden"
//     >
//       {/* Animated background decoration */}
//       <Box
//         position="absolute"
//         top="10%"
//         right="-5%"
//         w="400px"
//         h="400px"
//         bg={colorMode === 'dark' ? 'brand.900' : 'brand.50'}
//         opacity={0.3}
//         borderRadius="full"
//         filter="blur(80px)"
//         pointerEvents="none"
//       />
//       <Box
//         position="absolute"
//         bottom="10%"
//         left="-5%"
//         w="300px"
//         h="300px"
//         bg={colorMode === 'dark' ? 'purple.900' : 'purple.50'}
//         opacity={0.3}
//         borderRadius="full"
//         filter="blur(80px)"
//         pointerEvents="none"
//       />

//       <Container maxW="container.xl" position="relative" zIndex={1}>
//         <VStack spacing={12} align="stretch">
//           {/* Section Header */}
//           <VStack ref={headingRef} spacing={4} textAlign="center">
//             <Heading
//               as="h2"
//               size="2xl"
//               bgGradient={
//                 colorMode === 'dark'
//                   ? 'linear(to-r, brand.300, purple.300)'
//                   : 'linear(to-r, brand.500, purple.500)'
//               }
//               bgClip="text"
//               fontWeight="normal"
//             >
//               Hobbies & Interests
//             </Heading>
//             <Text
//               fontSize="lg"
//               color="text.secondary"
//               maxW="600px"
//               mx="auto"
//             >
//               Beyond coding, here's what keeps me inspired and creative
//             </Text>
//           </VStack>

//           {/* Hobbies Grid */}
//           <MotionBox
//             as={SimpleGrid}
//             columns={{ base: 1, md: 2, lg: 3 }}
//             spacing={8}
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: '-100px' }}
//           >
//             {hobbiesData.map((hobby, index) => (
//               <MotionBox
//                 key={index}
//                 variants={cardVariants}
//                 whileHover={{
//                   y: -8,
//                   transition: { duration: 0.3 },
//                 }}
//               >
//                 <Box
//                   bg="surface.card"
//                   p={8}
//                   borderRadius="2xl"
//                   borderWidth="1px"
//                   borderColor="border.primary"
//                   h="100%"
//                   position="relative"
//                   overflow="hidden"
//                   cursor="pointer"
//                   transition="all 0.3s ease"
//                   _hover={{
//                     borderColor: hobby.color,
//                     boxShadow: colorMode === 'dark' 
//                       ? `0 8px 30px rgba(20, 184, 166, 0.2)`
//                       : `0 8px 30px rgba(20, 184, 166, 0.15)`,
//                   }}
//                 >
//                   {/* Animated background on hover */}
//                   <MotionBox
//                     position="absolute"
//                     top={0}
//                     left={0}
//                     right={0}
//                     bottom={0}
//                     bgGradient={`linear(to-br, ${hobby.color}, transparent)`}
//                     opacity={0}
//                     transition="opacity 0.3s"
//                     whileHover={{ opacity: 0.05 }}
//                     pointerEvents="none"
//                   />

//                   <VStack align="start" spacing={4} position="relative">
//                     {/* Icon with pulse animation */}
//                     <MotionBox
//                       whileHover={{
//                         rotate: [0, -10, 10, -10, 0],
//                         transition: { duration: 0.5 },
//                       }}
//                     >
//                       <Box
//                         p={4}
//                         bg={
//                           colorMode === 'dark'
//                             ? 'rgba(20, 184, 166, 0.1)'
//                             : 'rgba(20, 184, 166, 0.08)'
//                         }
//                         borderRadius="xl"
//                         w="fit-content"
//                       >
//                         <Icon
//                           as={hobby.icon}
//                           boxSize={8}
//                           color={hobby.color}
//                         />
//                       </Box>
//                     </MotionBox>

//                     <VStack align="start" spacing={2}>
//                       <Heading as="h3" size="md" color="text.primary">
//                         {hobby.title}
//                       </Heading>
//                       <Text color="text.secondary" lineHeight="tall">
//                         {hobby.description}
//                       </Text>
//                     </VStack>
//                   </VStack>
//                 </Box>
//               </MotionBox>
//             ))}
//           </MotionBox>
//         </VStack>
//       </Container>
//     </Box>
//   );
// };

// export default Hobbies;
import { useState, useRef } from "react";
import { keyframes } from "@emotion/react";
import {
  Box,
  ChakraProvider,
  extendTheme,
  Flex,
  Grid,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";

// ─── Theme ───────────────────────────────────────────────────────────────────
const theme = extendTheme({
  styles: {
    global: {
      "@import":
        "url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,wght@0,300;0,400;1,300&display=swap')",
      body: {
        bg: "transparent",
        fontFamily: "'DM Sans', sans-serif",
        color: "white",
      },
    },
  },
});

// ─── Keyframes ────────────────────────────────────────────────────────────────
const floatAnim = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-8px) rotate(1deg); }
  66% { transform: translateY(-4px) rotate(-1deg); }
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px var(--glow-color, rgba(120,80,255,0.3)); }
  50% { box-shadow: 0 0 40px var(--glow-color, rgba(120,80,255,0.6)); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const orbitAnim = keyframes`
  from { transform: rotate(0deg) translateX(18px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(18px) rotate(-360deg); }
`;

// ─── Data ─────────────────────────────────────────────────────────────────────
const hobbies = [
  {
    id: 1,
    title: "Photography",
    emoji: "📸",
    level: 88,
    tag: "Creative",
    desc: "Capturing fleeting moments through urban landscapes and portrait sessions.",
    color: "#ff6b6b",
    glow: "rgba(255,107,107,0.4)",
    accent: "linear-gradient(135deg, #ff6b6b, #feca57)",
    orbs: ["#ff6b6b", "#feca57"],
    years: "6 yrs",
    freq: "Weekly",
  },
  {
    id: 2,
    title: "Rock Climbing",
    emoji: "🧗",
    level: 72,
    tag: "Sport",
    desc: "Bouldering indoors and outdoor sport climbing across granite faces.",
    color: "#48dbfb",
    glow: "rgba(72,219,251,0.4)",
    accent: "linear-gradient(135deg, #48dbfb, #0abde3)",
    orbs: ["#48dbfb", "#00d2d3"],
    years: "3 yrs",
    freq: "Daily",
  },
  {
    id: 3,
    title: "Generative Art",
    emoji: "🎨",
    level: 65,
    tag: "Digital",
    desc: "Crafting algorithmic visuals with p5.js and custom WebGL shaders.",
    color: "#ff9ff3",
    glow: "rgba(255,159,243,0.4)",
    accent: "linear-gradient(135deg, #ff9ff3, #a29bfe)",
    orbs: ["#ff9ff3", "#a29bfe"],
    years: "2 yrs",
    freq: "Monthly",
  },
  {
    id: 4,
    title: "Fermentation",
    emoji: "🧫",
    level: 80,
    tag: "Culinary",
    desc: "Brewing kombucha, fermenting hot sauces and crafting sourdough cultures.",
    color: "#55efc4",
    glow: "rgba(85,239,196,0.4)",
    accent: "linear-gradient(135deg, #55efc4, #00b894)",
    orbs: ["#55efc4", "#00b894"],
    years: "4 yrs",
    freq: "Weekly",
  },
  {
    id: 5,
    title: "Synthesizers",
    emoji: "🎹",
    level: 91,
    tag: "Music",
    desc: "Patching modular systems and designing ambient soundscapes from noise.",
    color: "#fdcb6e",
    glow: "rgba(253,203,110,0.4)",
    accent: "linear-gradient(135deg, #fdcb6e, #e17055)",
    orbs: ["#fdcb6e", "#e17055"],
    years: "8 yrs",
    freq: "Daily",
  },
  {
    id: 6,
    title: "Speleology",
    emoji: "🕳️",
    level: 55,
    tag: "Adventure",
    desc: "Exploring cave systems and mapping underground river passages.",
    color: "#a29bfe",
    glow: "rgba(162,155,254,0.4)",
    accent: "linear-gradient(135deg, #a29bfe, #6c5ce7)",
    orbs: ["#a29bfe", "#6c5ce7"],
    years: "1 yr",
    freq: "Monthly",
  },
];

// ─── Floating Orb ─────────────────────────────────────────────────────────────
const FloatingOrb = ({ color, size, top, left, delay, duration }) => (
  <Box
    position="absolute"
    top={top}
    left={left}
    w={size}
    h={size}
    borderRadius="full"
    bg={color}
    filter="blur(60px)"
    opacity={0.15}
    animation={`${floatAnim} ${duration}s ease-in-out ${delay}s infinite`}
    pointerEvents="none"
  />
);

// ─── Orbit Dot ────────────────────────────────────────────────────────────────
const OrbitDot = ({ color, delay }) => (
  <Box
    position="absolute"
    top="50%"
    left="50%"
    w="6px"
    h="6px"
    borderRadius="full"
    bg={color}
    boxShadow={`0 0 8px ${color}`}
    ml="-3px"
    mt="-3px"
    animation={`${orbitAnim} 3s linear ${delay}s infinite`}
  />
);

// ─── Hobby Card ───────────────────────────────────────────────────────────────
const HobbyCard = ({ hobby, index }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -8, y: dx * 8 });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 400);
  };

  return (
    <Box
      ref={cardRef}
      position="relative"
      borderRadius="24px"
      overflow="hidden"
      cursor="pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.04 : 1}) ${clicked ? "scale(0.97)" : ""}`,
        transition: "transform 0.2s cubic-bezier(.23,1,.32,1)",
        "--glow-color": hobby.glow,
      }}
      animation={
        hovered
          ? `${glowPulse} 1.8s ease-in-out infinite`
          : `${floatAnim} ${4 + index * 0.4}s ease-in-out ${index * 0.3}s infinite`
      }
    >
      {/* Glass layer */}
      <Box
        position="absolute"
        inset={0}
        bg="rgba(255,255,255,0.04)"
        backdropFilter="blur(24px) saturate(180%)"
        borderRadius="24px"
        border="1px solid rgba(255,255,255,0.12)"
        zIndex={0}
      />

      {/* Gradient shimmer on hover */}
      {hovered && (
        <Box
          position="absolute"
          inset={0}
          borderRadius="24px"
          zIndex={1}
          opacity={0.12}
          background={hobby.accent}
          animation={`${shimmer} 1.5s linear infinite`}
          backgroundSize="200% auto"
        />
      )}

      {/* Top accent line */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="2px"
        background={hobby.accent}
        zIndex={2}
        opacity={hovered ? 1 : 0.5}
        transition="opacity 0.3s"
      />

      {/* Content */}
      <VStack
        position="relative"
        zIndex={3}
        align="start"
        p={6}
        spacing={4}
      >
        {/* Header row */}
        <Flex w="full" justify="space-between" align="center">
          {/* Emoji with orbit */}
          <Box position="relative" w="52px" h="52px">
            <Box
              w="52px"
              h="52px"
              borderRadius="16px"
              bg="rgba(255,255,255,0.06)"
              border="1px solid rgba(255,255,255,0.1)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="26px"
              backdropFilter="blur(8px)"
              transition="transform 0.3s"
              style={{ transform: hovered ? "rotate(-8deg) scale(1.1)" : "none" }}
            >
              {hobby.emoji}
            </Box>
            {hovered && (
              <>
                <OrbitDot color={hobby.orbs[0]} delay={0} />
                <OrbitDot color={hobby.orbs[1]} delay={1.5} />
              </>
            )}
          </Box>

          <VStack align="end" spacing={1}>
            <Badge
              px={3}
              py={1}
              borderRadius="full"
              fontSize="10px"
              fontWeight="700"
              letterSpacing="0.08em"
              textTransform="uppercase"
              bg="rgba(255,255,255,0.07)"
              color={hobby.color}
              border={`1px solid ${hobby.color}44`}
              fontFamily="'Syne', sans-serif"
            >
              {hobby.tag}
            </Badge>
            <Text
              fontSize="10px"
              color="whiteAlpha.500"
              fontFamily="'DM Sans', sans-serif"
              fontStyle="italic"
            >
              {hobby.freq}
            </Text>
          </VStack>
        </Flex>

        {/* Title */}
        <VStack align="start" spacing={1} w="full">
          <Heading
            fontFamily="'Syne', sans-serif"
            fontSize="22px"
            fontWeight="800"
            letterSpacing="-0.02em"
            color="white"
            lineHeight={1.1}
            style={{
              background: hovered ? hobby.accent : "white",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: hovered ? "transparent" : "white",
              transition: "all 0.3s",
            }}
          >
            {hobby.title}
          </Heading>
          <Text
            fontSize="11px"
            color="whiteAlpha.400"
            fontFamily="'Syne', sans-serif"
            letterSpacing="0.1em"
            textTransform="uppercase"
          >
            {hobby.years} experience
          </Text>
        </VStack>

        {/* Description */}
        <Text
          fontSize="13px"
          color="whiteAlpha.600"
          lineHeight={1.6}
          fontWeight="300"
          noOfLines={hovered ? undefined : 2}
          transition="all 0.3s"
        >
          {hobby.desc}
        </Text>

        {/* Skill bar */}
        <Box w="full">
          <Flex justify="space-between" mb={1}>
            <Text fontSize="10px" color="whiteAlpha.500" letterSpacing="0.1em" textTransform="uppercase">
              Proficiency
            </Text>
            <Text
              fontSize="10px"
              fontWeight="700"
              fontFamily="'Syne', sans-serif"
              color={hobby.color}
            >
              {hobby.level}%
            </Text>
          </Flex>
          <Box
            h="4px"
            w="full"
            borderRadius="full"
            bg="rgba(255,255,255,0.07)"
            overflow="hidden"
          >
            <Box
              h="full"
              borderRadius="full"
              background={hobby.accent}
              style={{
                width: hovered ? `${hobby.level}%` : "0%",
                transition: "width 0.8s cubic-bezier(.23,1,.32,1)",
                boxShadow: `0 0 12px ${hobby.color}`,
              }}
            />
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HobbiesComponent() {
  const [filter, setFilter] = useState("All");
  const tags = ["All", ...new Set(hobbies.map((h) => h.tag))];

  const filtered =
    filter === "All" ? hobbies : hobbies.filter((h) => h.tag === filter);

  return (
      <Box
        minH="100vh"
        position="relative"
        overflow="hidden"
        bg="#080810"
        fontFamily="'DM Sans', sans-serif"
        p={{ base: 6, md: 12 }}
      >
        {/* Background orbs */}
        <FloatingOrb color="#6c5ce7" size="500px" top="-10%" left="-15%" delay={0} duration={7} />
        <FloatingOrb color="#00b894" size="400px" top="40%" left="70%" delay={1} duration={9} />
        <FloatingOrb color="#e17055" size="350px" top="70%" left="-5%" delay={2} duration={8} />
        <FloatingOrb color="#0984e3" size="300px" top="10%" left="60%" delay={0.5} duration={10} />

        {/* Subtle grid overlay */}
        <Box
          position="absolute"
          inset={0}
          opacity={0.03}
          backgroundImage="linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)"
          backgroundSize="40px 40px"
          pointerEvents="none"
        />

        {/* Header */}
        <VStack align="start" mb={10} spacing={3} position="relative" zIndex={1}>
          <HStack spacing={3} align="center">
            <Box
              px={3}
              py={1}
              borderRadius="full"
              bg="rgba(255,255,255,0.05)"
              border="1px solid rgba(255,255,255,0.1)"
              backdropFilter="blur(10px)"
            >
              <Text
                fontSize="11px"
                color="whiteAlpha.500"
                letterSpacing="0.2em"
                textTransform="uppercase"
                fontFamily="'Syne', sans-serif"
              >
                Personal interests
              </Text>
            </Box>
          </HStack>

          <Heading
            fontFamily="'Syne', sans-serif"
            fontSize={{ base: "42px", md: "60px" }}
            fontWeight="800"
            letterSpacing="-0.04em"
            lineHeight={0.95}
            color="white"
          >
            My
            <Box
              as="span"
              display="block"
              style={{
                background: "linear-gradient(135deg, #a29bfe, #fd79a8, #fdcb6e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Hobbies.
            </Box>
          </Heading>

          <Text
            color="whiteAlpha.400"
            fontSize="15px"
            fontWeight="300"
            maxW="420px"
            lineHeight={1.6}
          >
            Things I obsess over outside of work — hover a card to explore.
          </Text>
        </VStack>

        {/* Filter pills */}
        <HStack mb={8} spacing={2} flexWrap="wrap" position="relative" zIndex={1}>
          {tags.map((t) => (
            <Box
              key={t}
              as="button"
              px={4}
              py={2}
              borderRadius="full"
              fontSize="12px"
              fontWeight={filter === t ? "700" : "400"}
              fontFamily="'Syne', sans-serif"
              letterSpacing="0.05em"
              border="1px solid"
              borderColor={filter === t ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.08)"}
              bg={filter === t ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)"}
              color={filter === t ? "white" : "whiteAlpha.500"}
              backdropFilter="blur(10px)"
              onClick={() => setFilter(t)}
              transition="all 0.2s"
              _hover={{ borderColor: "rgba(255,255,255,0.2)", color: "white" }}
            >
              {t}
            </Box>
          ))}
        </HStack>

        {/* Grid */}
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={5}
          position="relative"
          zIndex={1}
        >
          {filtered.map((hobby, i) => (
            <HobbyCard key={hobby.id} hobby={hobby} index={i} />
          ))}
        </Grid>

        {/* Footer stat strip */}
        <Flex
          mt={10}
          gap={6}
          flexWrap="wrap"
          position="relative"
          zIndex={1}
          px={4}
          py={4}
          borderRadius="16px"
          bg="rgba(255,255,255,0.02)"
          border="1px solid rgba(255,255,255,0.06)"
          backdropFilter="blur(10px)"
          justify="center"
        >
          {[
            { label: "Active Hobbies", val: hobbies.length },
            { label: "Avg. Proficiency", val: `${Math.round(hobbies.reduce((a, h) => a + h.level, 0) / hobbies.length)}%` },
            { label: "Daily Practices", val: hobbies.filter((h) => h.freq === "Daily").length },
            { label: "Years Combined", val: "24+" },
          ].map((s) => (
            <VStack key={s.label} spacing={0} align="center" minW="80px">
              <Text
                fontFamily="'Syne', sans-serif"
                fontSize="24px"
                fontWeight="800"
                color="white"
                letterSpacing="-0.03em"
              >
                {s.val}
              </Text>
              <Text fontSize="10px" color="whiteAlpha.400" letterSpacing="0.1em" textTransform="uppercase">
                {s.label}
              </Text>
            </VStack>
          ))}
        </Flex>
      </Box>
  
  );
}