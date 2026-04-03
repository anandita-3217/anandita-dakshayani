// // HeroIntro.jsx
// // Compact above-the-fold intro strip
// // Focus: Availability status + CTA (open to work) + GSAP scroll-to-explore
// // Stack: React 18 + Chakra UI v2 + Framer Motion + GSAP

// import { useEffect, useRef, useState } from "react";
// import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
// import { motion, AnimatePresence } from "framer-motion";
// import { gsap } from "gsap";

// const MotionBox = motion(Box);
// const MotionFlex = motion(Flex);

// // ── Roles that cycle in the subtitle ─────────────────────────────────────────
// const ROLES = [
//   "Software Engineer",
//   "Systems Architect",
//   "OSS Contributor",
//   "Frontend Craftsman",
//   "AI Integration Lead",
// ];

// // ── Availability config — edit this ─────────────────────────────────────────
// const AVAILABILITY = {
//   open: true,            // flip to false to show "Not Available"
//   label: "Open to work",
//   detail: "Available for full-time & contract · Remote",
//   accentOpen: "#14b8a6",
//   accentClosed: "#f4845f",
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Role cycler with clip-path wipe transition
// function RoleCycler() {
//   const [idx, setIdx] = useState(0);
//   const [prev, setPrev] = useState(null);
//   const dimColor = useColorModeValue("#4b5563", "rgba(255,255,255,0.42)");

//   useEffect(() => {
//     const id = setInterval(() => {
//       setPrev(idx);
//       setIdx((i) => (i + 1) % ROLES.length);
//     }, 2800);
//     return () => clearInterval(id);
//   }, [idx]);

//   return (
//     <Box position="relative" h="22px" overflow="hidden" mt={1}>
//       <AnimatePresence mode="popLayout">
//         <MotionBox
//           key={idx}
//           initial={{ y: 18, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           exit={{ y: -18, opacity: 0 }}
//           transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
//           position="absolute"
//           whiteSpace="nowrap"
//         >
//           <Text
//             fontFamily="'JetBrains Mono', monospace"
//             fontSize={{ base: "11px", md: "13px" }}
//             letterSpacing="0.18em"
//             textTransform="uppercase"
//             color={dimColor}
//           >
//             {ROLES[idx]}
//           </Text>
//         </MotionBox>
//       </AnimatePresence>
//     </Box>
//   );
// }

// // ── Availability pill ─────────────────────────────────────────────────────────
// function AvailabilityPill() {
//   const accent = AVAILABILITY.open ? AVAILABILITY.accentOpen : AVAILABILITY.accentClosed;
//   const [expanded, setExpanded] = useState(false);

//   return (
//     <MotionBox
//       layout
//       onClick={() => setExpanded((e) => !e)}
//       display="inline-flex"
//       alignItems="center"
//       gap={2.5}
//       px={3}
//       py={1.5}
//       borderRadius="8px"
//       border="1px solid"
//       borderColor={`${accent}40`}
//       bg={`${accent}0e`}
//       cursor="pointer"
//       style={{ transition: "background 0.2s ease, border-color 0.2s ease" }}
//       _hover={{ bg: `${accent}18`, borderColor: `${accent}60` }}
//       whileTap={{ scale: 0.97 }}
//     >
//       {/* Pulsing dot */}
//       <Box position="relative" w="7px" h="7px" flexShrink={0}>
//         <Box
//           position="absolute"
//           inset={0}
//           borderRadius="50%"
//           bg={accent}
//           style={{ animation: AVAILABILITY.open ? "ping 1.8s ease-out infinite" : "none" }}
//         />
//         <Box
//           position="absolute"
//           inset={0}
//           borderRadius="50%"
//           bg={accent}
//           boxShadow={`0 0 6px ${accent}`}
//         />
//       </Box>

//       <Text
//         fontFamily="'JetBrains Mono', monospace"
//         fontSize="9px"
//         letterSpacing="0.2em"
//         textTransform="uppercase"
//         color={accent}
//         whiteSpace="nowrap"
//       >
//         {AVAILABILITY.label}
//       </Text>

//       <AnimatePresence>
//         {expanded && (
//           <MotionBox
//             initial={{ opacity: 0, width: 0 }}
//             animate={{ opacity: 1, width: "auto" }}
//             exit={{ opacity: 0, width: 0 }}
//             overflow="hidden"
//           >
//             <Box
//               h="12px"
//               w="1px"
//               bg={`${accent}40`}
//               mx={1}
//               display="inline-block"
//               verticalAlign="middle"
//             />
//             <Text
//               as="span"
//               fontFamily="'Sora', sans-serif"
//               fontSize="10px"
//               color={`${accent}cc`}
//               whiteSpace="nowrap"
//             >
//               {AVAILABILITY.detail}
//             </Text>
//           </MotionBox>
//         )}
//       </AnimatePresence>

//       <Text
//         fontFamily="'JetBrains Mono', monospace"
//         fontSize="9px"
//         color={`${accent}70`}
//         style={{ transform: expanded ? "rotate(45deg)" : "none", transition: "transform 0.2s ease" }}
//       >
//         +
//       </Text>
//     </MotionBox>
//   );
// }

// // ── Scroll indicator ─────────────────────────────────────────────────────────
// function ScrollIndicator({ targetId }) {
//   const lineRef = useRef(null);
//   const dotRef = useRef(null);
//   const dimColor = useColorModeValue("rgba(0,0,0,0.2)", "rgba(255,255,255,0.18)");

//   useEffect(() => {
//     if (!lineRef.current || !dotRef.current) return;

//     // GSAP: dot slides down the line, line draws in, loops
//     const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });

//     tl.fromTo(
//       lineRef.current,
//       { scaleY: 0, transformOrigin: "top center" },
//       { scaleY: 1, duration: 0.55, ease: "power2.out" }
//     )
//       .fromTo(
//         dotRef.current,
//         { y: 0, opacity: 1 },
//         { y: 36, opacity: 0, duration: 0.7, ease: "power1.in" },
//         "-=0.1"
//       )
//       .to(lineRef.current, { scaleY: 0, transformOrigin: "bottom center", duration: 0.3, ease: "power2.in" }, "-=0.2");

//     return () => tl.kill();
//   }, []);

//   const handleClick = () => {
//     if (targetId) {
//       document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <MotionFlex
//       initial={{ opacity: 0, y: 8 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 1.4, duration: 0.5 }}
//       direction="column"
//       align="center"
//       gap={2}
//       cursor="pointer"
//       onClick={handleClick}
//       role="button"
//       aria-label="Scroll to explore"
//       _hover={{ opacity: 0.7 }}
//       style={{ transition: "opacity 0.2s ease" }}
//     >
//       <Text
//         fontFamily="'JetBrains Mono', monospace"
//         fontSize="8px"
//         letterSpacing="0.28em"
//         textTransform="uppercase"
//         color={dimColor}
//         style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
//       >
//         Scroll
//       </Text>

//       {/* Rail */}
//       <Box position="relative" w="1px" h="44px">
//         <Box
//           ref={lineRef}
//           position="absolute"
//           inset={0}
//           bgGradient="linear(to-b, #7c3aed, #ec4899)"
//         />
//         <Box
//           ref={dotRef}
//           position="absolute"
//           top={0}
//           left="50%"
//           transform="translateX(-50%)"
//           w="5px"
//           h="5px"
//           borderRadius="50%"
//           bg="#7c3aed"
//           boxShadow="0 0 8px #7c3aed"
//         />
//       </Box>
//     </MotionFlex>
//   );
// }

// // ── Decorative grid lines ─────────────────────────────────────────────────────
// function GridLines() {
//   const lineColor = useColorModeValue("rgba(0,0,0,0.04)", "rgba(255,255,255,0.025)");
//   return (
//     <Box position="absolute" inset={0} pointerEvents="none" overflow="hidden">
//       {[20, 40, 60, 80].map((pct) => (
//         <Box
//           key={pct}
//           position="absolute"
//           top={0}
//           bottom={0}
//           left={`${pct}%`}
//           w="1px"
//           bg={lineColor}
//         />
//       ))}
//       {[33, 66].map((pct) => (
//         <Box
//           key={pct}
//           position="absolute"
//           left={0}
//           right={0}
//           top={`${pct}%`}
//           h="1px"
//           bg={lineColor}
//         />
//       ))}
//     </Box>
//   );
// }

// // ── Floating metadata chips ───────────────────────────────────────────────────
// function MetaChip({ label, value, accent, delay }) {
//   const bg = useColorModeValue("rgba(247,247,248,0.92)", "rgba(10,10,10,0.82)");
//   const border = useColorModeValue("rgba(0,0,0,0.08)", "rgba(255,255,255,0.07)");

//   return (
//     <MotionBox
//       initial={{ opacity: 0, y: 12 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
//       px={3}
//       py={1.5}
//       bg={bg}
//       backdropFilter="blur(12px)"
//       border="1px solid"
//       borderColor={border}
//       borderRadius="8px"
//       display="inline-flex"
//       alignItems="center"
//       gap={2}
//     >
//       <Box w="5px" h="5px" borderRadius="50%" bg={accent} flexShrink={0} />
//       <Text
//         fontFamily="'JetBrains Mono', monospace"
//         fontSize="8px"
//         letterSpacing="0.16em"
//         textTransform="uppercase"
//         color={useColorModeValue("#6b7280", "rgba(255,255,255,0.3)")}
//       >
//         {label}
//       </Text>
//       <Text
//         fontFamily="'JetBrains Mono', monospace"
//         fontSize="9px"
//         letterSpacing="0.12em"
//         color={accent}
//       >
//         {value}
//       </Text>
//     </MotionBox>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// export default function ProjectsHero({ scrollTargetId = "projects" }) {
//   const wrapperRef = useRef(null);
//   const nameRef = useRef(null);

//   const dimColor = useColorModeValue("#9ca3af", "rgba(255,255,255,0.28)");
//   const borderColor = useColorModeValue("rgba(0,0,0,0.07)", "rgba(255,255,255,0.06)");
//   const line2Color = useColorModeValue("#d1d5db", "rgba(255,255,255,0.12)");
//   const bg = useColorModeValue("rgba(247,247,248,0.0)", "rgba(10,10,10,0.0)");

//   // GSAP name shimmer on mount
//   useEffect(() => {
//     if (!nameRef.current) return;
//     gsap.fromTo(
//       nameRef.current,
//       { backgroundPosition: "200% center" },
//       {
//         backgroundPosition: "-200% center",
//         duration: 2.2,
//         ease: "power2.inOut",
//         delay: 0.3,
//       }
//     );
//   }, []);

//   // Stagger entrance for the whole block
//   const containerVariants = {
//     hidden: {},
//     show: { transition: { staggerChildren: 0.09 } },
//   };
//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] } },
//   };

//   return (
//     <>
//       {/* CSS for ping animation */}
//       <style>{`
//         @keyframes ping {
//           0%   { transform: scale(1); opacity: 0.8; }
//           70%  { transform: scale(2.4); opacity: 0; }
//           100% { transform: scale(2.4); opacity: 0; }
//         }
//       `}</style>

//       <Box
//         as="section"
//         ref={wrapperRef}
//         position="relative"
//         bg={bg}
//         minH={{ base: "auto", md: "100vh" }}
//         display="flex"
//         alignItems="center"
//         overflow="hidden"
//         px={{ base: 5, md: 12, lg: 20 }}
//         py={{ base: 20, md: 0 }}
//       >
//         {/* Subtle grid */}
//         <GridLines />

//         {/* Outer glow orb */}
//         <Box
//           position="absolute"
//           top="-20%"
//           right="-10%"
//           w={{ base: "300px", md: "520px" }}
//           h={{ base: "300px", md: "520px" }}
//           borderRadius="50%"
//           bg="radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)"
//           pointerEvents="none"
//         />
//         <Box
//           position="absolute"
//           bottom="-15%"
//           left="-8%"
//           w={{ base: "240px", md: "400px" }}
//           h={{ base: "240px", md: "400px" }}
//           borderRadius="50%"
//           bg="radial-gradient(circle, rgba(20,184,166,0.06) 0%, transparent 70%)"
//           pointerEvents="none"
//         />

//         <Flex
//           w="full"
//           maxW="1200px"
//           mx="auto"
//           direction={{ base: "column", md: "row" }}
//           align={{ base: "flex-start", md: "center" }}
//           justify="space-between"
//           gap={{ base: 12, md: 6 }}
//           position="relative"
//           zIndex={1}
//         >
//           {/* ── LEFT: Main content ── */}
//           <MotionFlex
//             variants={containerVariants}
//             initial="hidden"
//             animate="show"
//             direction="column"
//             align="flex-start"
//             gap={0}
//             flex={1}
//             maxW={{ base: "full", md: "640px" }}
//           >
//             {/* Eyebrow */}
//             <MotionBox variants={itemVariants} mb={5}>
//               <Flex align="center" gap={3}>
//                 <Box w="24px" h="1px" bgGradient="linear(to-r, #ec4899, #7c3aed)" />
//                 <Text
//                   fontFamily="'JetBrains Mono', monospace"
//                   fontSize="9px"
//                   letterSpacing="0.3em"
//                   textTransform="uppercase"
//                   color={dimColor}
//                 >
//                   Portfolio · 2025
//                 </Text>
//               </Flex>
//             </MotionBox>

//             {/* Availability pill */}
//             <MotionBox variants={itemVariants} mb={6}>
//               <AvailabilityPill />
//             </MotionBox>

//             {/* Name */}
//             <MotionBox variants={itemVariants} mb={0}>
//               <Text
//                 ref={nameRef}
//                 fontFamily="'Orbitron', sans-serif"
//                 fontWeight={900}
//                 fontSize={{ base: "clamp(38px, 10vw, 72px)" }}
//                 letterSpacing="-0.03em"
//                 lineHeight={0.95}
//                 bgGradient="linear(to-r, #1e40af, #7c3aed, #ec4899, #7c3aed, #1e40af)"
//                 bgClip="text"
//                 bgSize="200% auto"
//                 display="inline-block"
//                 w="fit-content"
//               >
//                 Alex
//               </Text>
//             </MotionBox>

//             <MotionBox variants={itemVariants} mb={4}>
//               <Text
//                 fontFamily="'Orbitron', sans-serif"
//                 fontWeight={900}
//                 fontSize={{ base: "clamp(38px, 10vw, 72px)" }}
//                 letterSpacing="-0.03em"
//                 lineHeight={0.95}
//                 color={line2Color}
//               >
//                 Morgan.
//               </Text>
//             </MotionBox>

//             {/* Role cycler */}
//             <MotionBox variants={itemVariants} mb={7}>
//               <RoleCycler />
//             </MotionBox>

//             {/* Bio line */}
//             <MotionBox variants={itemVariants} mb={8} maxW="480px">
//               <Text
//                 fontFamily="'Sora', sans-serif"
//                 fontSize={{ base: "13px", md: "14px" }}
//                 color={dimColor}
//                 lineHeight={1.8}
//               >
//                 I build the software layer between ambitious ideas and the people
//                 who depend on them — fast, reliable, and with obsessive attention
//                 to detail.
//               </Text>
//             </MotionBox>

//             {/* CTA row */}
//             <MotionBox variants={itemVariants}>
//               <Flex gap={3} flexWrap="wrap">
//                 {/* Primary CTA */}
//                 <MotionBox
//                   as="a"
//                   href="#projects"
//                   display="inline-flex"
//                   alignItems="center"
//                   gap={2.5}
//                   px={5}
//                   py={3}
//                   borderRadius="10px"
//                   border="1px solid"
//                   borderColor="rgba(124,58,237,0.45)"
//                   bg="rgba(124,58,237,0.12)"
//                   color="#7c3aed"
//                   fontFamily="'JetBrains Mono', monospace"
//                   fontSize="9px"
//                   letterSpacing="0.2em"
//                   textTransform="uppercase"
//                   textDecoration="none"
//                   whileHover={{ y: -2, backgroundColor: "rgba(124,58,237,0.2)" }}
//                   whileTap={{ scale: 0.97 }}
//                   style={{ transition: "all 0.2s cubic-bezier(0.23,1,0.32,1)" }}
//                 >
//                   <Box as="span">View Projects</Box>
//                   <Box as="span" fontSize="13px">→</Box>
//                 </MotionBox>

//                 {/* Secondary CTA — Resume */}
//                 <MotionBox
//                   as="a"
//                   href="/resume.pdf"
//                   target="_blank"
//                   display="inline-flex"
//                   alignItems="center"
//                   gap={2.5}
//                   px={5}
//                   py={3}
//                   borderRadius="10px"
//                   border="1px solid"
//                   borderColor="rgba(255,255,255,0.08)"
//                   bg="rgba(255,255,255,0.03)"
//                   color={dimColor}
//                   fontFamily="'JetBrains Mono', monospace"
//                   fontSize="9px"
//                   letterSpacing="0.2em"
//                   textTransform="uppercase"
//                   textDecoration="none"
//                   whileHover={{ y: -2, borderColor: "rgba(255,255,255,0.16)", color: "rgba(255,255,255,0.7)" }}
//                   whileTap={{ scale: 0.97 }}
//                   style={{ transition: "all 0.2s cubic-bezier(0.23,1,0.32,1)" }}
//                 >
//                   <Box as="span">Résumé</Box>
//                   <Box as="span" fontSize="11px">↗</Box>
//                 </MotionBox>

//                 {/* Hire me CTA */}
//                 <MotionBox
//                   as="a"
//                   href="#contact"
//                   display="inline-flex"
//                   alignItems="center"
//                   gap={2.5}
//                   px={5}
//                   py={3}
//                   borderRadius="10px"
//                   border="1px solid"
//                   borderColor={`${AVAILABILITY.accentOpen}40`}
//                   bg={`${AVAILABILITY.accentOpen}0c`}
//                   color={AVAILABILITY.accentOpen}
//                   fontFamily="'JetBrains Mono', monospace"
//                   fontSize="9px"
//                   letterSpacing="0.2em"
//                   textTransform="uppercase"
//                   textDecoration="none"
//                   whileHover={{ y: -2, backgroundColor: `${AVAILABILITY.accentOpen}18` }}
//                   whileTap={{ scale: 0.97 }}
//                   style={{ transition: "all 0.2s cubic-bezier(0.23,1,0.32,1)" }}
//                 >
//                   <Box
//                     w="5px" h="5px" borderRadius="50%"
//                     bg={AVAILABILITY.accentOpen}
//                     style={{ animation: "ping 1.8s ease-out infinite" }}
//                   />
//                   <Box as="span">Hire Me</Box>
//                 </MotionBox>
//               </Flex>
//             </MotionBox>
//           </MotionFlex>

//           {/* ── RIGHT: Metadata column ── */}
//           <Flex
//             direction="column"
//             align={{ base: "flex-start", md: "flex-end" }}
//             gap={4}
//             flexShrink={0}
//           >
//             {/* Floating chips */}
//             <Flex direction="column" align={{ base: "flex-start", md: "flex-end" }} gap={2.5}>
//               <MetaChip label="Base" value="San Francisco, CA" accent="#14b8a6" delay={0.6} />
//               <MetaChip label="Timezone" value="PST · UTC−8" accent="#7c3aed" delay={0.72} />
//               <MetaChip label="Experience" value="8+ Years" accent="#ec4899" delay={0.84} />
//               <MetaChip label="Stack" value="Full-stack · Systems" accent="#e8c547" delay={0.96} />
//             </Flex>

//             {/* Divider */}
//             <MotionBox
//               initial={{ scaleX: 0 }}
//               animate={{ scaleX: 1 }}
//               transition={{ delay: 1.1, duration: 0.5 }}
//               h="1px"
//               w={{ base: "160px", md: "200px" }}
//               bgGradient="linear(to-r, transparent, rgba(124,58,237,0.4), transparent)"
//               style={{ transformOrigin: "right center" }}
//               alignSelf={{ base: "flex-start", md: "flex-end" }}
//             />

//             {/* Social links */}
//             <MotionBox
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 1.2, duration: 0.5 }}
//             >
//               <Flex gap={3} justify={{ base: "flex-start", md: "flex-end" }}>
//                 {[
//                   { label: "GH", href: "https://github.com", accent: "#7c3aed" },
//                   { label: "LI", href: "https://linkedin.com", accent: "#14b8a6" },
//                   { label: "TW", href: "https://twitter.com", accent: "#ec4899" },
//                 ].map((s) => (
//                   <MotionBox
//                     key={s.label}
//                     as="a"
//                     href={s.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     w="32px"
//                     h="32px"
//                     borderRadius="8px"
//                     border="1px solid"
//                     borderColor={`${s.accent}30`}
//                     bg={`${s.accent}0a`}
//                     color={s.accent}
//                     display="flex"
//                     alignItems="center"
//                     justifyContent="center"
//                     fontFamily="'JetBrains Mono', monospace"
//                     fontSize="8px"
//                     letterSpacing="0.1em"
//                     textDecoration="none"
//                     whileHover={{ y: -2, borderColor: `${s.accent}60`, backgroundColor: `${s.accent}18` }}
//                     whileTap={{ scale: 0.95 }}
//                     style={{ transition: "all 0.18s cubic-bezier(0.23,1,0.32,1)" }}
//                   >
//                     {s.label}
//                   </MotionBox>
//                 ))}
//               </Flex>
//             </MotionBox>

//             {/* Scroll indicator — only on md+ */}
//             <Box display={{ base: "none", md: "flex" }} justifyContent="flex-end" mt={2}>
//               <ScrollIndicator targetId={scrollTargetId} />
//             </Box>
//           </Flex>
//         </Flex>

//         {/* Bottom border rule */}
//         <Box
//           position="absolute"
//           bottom={0}
//           left={0}
//           right={0}
//           h="1px"
//           bgGradient="linear(to-r, transparent, rgba(124,58,237,0.3), rgba(236,72,153,0.2), transparent)"
//         />

//         {/* Mobile scroll indicator */}
//         <Flex
//           display={{ base: "flex", md: "none" }}
//           position="absolute"
//           bottom={8}
//           left="50%"
//           transform="translateX(-50%)"
//           direction="column"
//           align="center"
//         >
//           <ScrollIndicator targetId={scrollTargetId} />
//         </Flex>
//       </Box>
//     </>
//   );
// }

// // ── Usage ─────────────────────────────────────────────────────────────────────
// // <HeroIntro scrollTargetId="projects" />
// //
// // Props:
// //   scrollTargetId  — id of the section to scroll to on click (default: "projects")
// //
// // Customise:
// //   ROLES[]         — cycling subtitle strings
// //   AVAILABILITY{}  — toggle open/closed, edit label & detail text
// //   MetaChip rows   — location, timezone, experience, stack
// //   Social links[]  — GH / LI / TW hrefs

// ProjectsIntro.jsx
// Compact intro strip that sits at the TOP of the Projects page,
// above the search bar and filter toggles.
// Tells the visitor: who built this, how many projects, what to expect.
// Stack: React 18 + Chakra UI v2 + Framer Motion + GSAP

import { useEffect, useRef, useState } from "react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

// ── Config — edit these ───────────────────────────────────────────────────────
const CONFIG = {
  name: "Alex Morgan",
  handle: "@alexmorgan",
  totalProjects: 6,
  totalTech: 18,
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
        bg={cardBg}
        px={{ base: 5, md: 12, lg: 20 }}
        py={{ base: 25, md: 16 }}
        backdropFilter="blur(18px)"
        border="1px solid"
        borderColor={borderColor}
        borderRadius="20px"
        position="relative"
        overflow="hidden"
        mb={8}
      >
        {/* Top gradient hairline */}
        <Box
          position="absolute"
          top={0} left={0} right={0} h="1px"
          bgGradient="linear(to-r, transparent, #7c3aed, #ec4899, transparent)"
        />

        {/* GSAP shimmer sweep */}
        <Box
          className="shimmer-line"
          position="absolute"
          top={0} bottom={0}
          w="60px"
          bgGradient="linear(to-r, transparent, rgba(255,255,255,0.04), transparent)"
          pointerEvents="none"
          zIndex={1}
        />

        {/* Corner brackets */}
        {[
          { top: "12px", left: "12px",  borderTop: "1px solid", borderLeft: "1px solid" },
          { top: "12px", right: "12px", borderTop: "1px solid", borderRight: "1px solid" },
          { bottom: "12px", left: "12px",  borderBottom: "1px solid", borderLeft: "1px solid" },
          { bottom: "12px", right: "12px", borderBottom: "1px solid", borderRight: "1px solid" },
        ].map((s, i) => (
          <Box
            key={i}
            position="absolute"
            w="16px" h="16px"
            borderColor="rgba(124,58,237,0.2)"
            pointerEvents="none"
            style={s}
          />
        ))}

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