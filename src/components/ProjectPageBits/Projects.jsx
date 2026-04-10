// // // Search For now is ok but optimize it
// // import { useState, useRef, useEffect, useCallback } from "react";
// // import {
// //   Box,
// //   Flex,
// //   Text,
// //   Input,
// //   InputGroup,
// //   InputLeftElement,
// //   SimpleGrid,
// //   useColorModeValue,
// //   Portal,
// // } from "@chakra-ui/react";
// // import { motion, AnimatePresence, useInView } from "framer-motion";
// // import { gsap } from "gsap";

// // import ProjectsFilterBar from './ProjectsFilterbar';
// // import { PROJECTS, ALL_TECH, ALL_USECASES, ALL_TYPES } from "./data/projects";


// // // ─── Motion primitives ───────────────────────────────────────────────────────
// // const MotionBox = motion.create(Box);

// // // TODO: On opening the page it auto scrolls to the bottom why?
// // // TODO: Filter region - needs to be collapsable
// // // TODO: sort funtionality - change styling 
// // const STATUS_META = {
// //   Live: { bg: "rgba(20,184,166,0.12)", border: "rgba(20,184,166,0.35)", color: "#14b8a6" },
// //   Beta: { bg: "rgba(232,197,71,0.12)", border: "rgba(232,197,71,0.35)", color: "#e8c547" },
// //   OSS: { bg: "rgba(124,58,237,0.12)", border: "rgba(124,58,237,0.35)", color: "#7c3aed" },
// // };

// // // ─── Sub-components ──────────────────────────────────────────────────────────

// // function SectionHeader({ eyebrow, line1, line2 }) {
// //   const eyebrowColor = useColorModeValue("#9ca3af", "rgba(255,255,255,0.35)");
// //   const line2Color = useColorModeValue("#2a2a2a", "rgba(255,255,255,0.18)");

// //   return (
// //     <Box mb={10}>
// //       {/* Eyebrow */}
// //       <Flex align="center" gap={3} mb={3}>
// //         <Box w="24px" h="1px" bgGradient="linear(to-r, #ec4899, #7c3aed)" flexShrink={0} />
// //         <Text
// //           fontFamily="'JetBrains Mono', monospace"
// //           fontSize="9px"
// //           letterSpacing="0.3em"
// //           textTransform="uppercase"
// //           color={eyebrowColor}
// //         >
// //           {eyebrow}
// //         </Text>
// //       </Flex>

// //       {/* Heading line 1 — gradient */}
// //       <Text
// //         fontFamily="'Orbitron', sans-serif"
// //         fontWeight={900}
// //         fontSize={{ base: "26px", md: "clamp(26px, 4vw, 40px)" }}
// //         letterSpacing="-0.02em"
// //         lineHeight={1.05}
// //         bgGradient="linear(to-r, #1e40af, #7c3aed, #ec4899)"
// //         bgClip="text"
// //         display="inline-block"
// //         w="fit-content"
// //       >
// //         {line1}
// //       </Text>

// //       {/* Heading line 2 — muted */}
// //       <Text
// //         fontFamily="'Orbitron', sans-serif"
// //         fontWeight={900}
// //         fontSize={{ base: "26px", md: "clamp(26px, 4vw, 40px)" }}
// //         letterSpacing="-0.02em"
// //         lineHeight={1.05}
// //         color={line2Color}
// //       >
// //         {line2}
// //       </Text>
// //     </Box>
// //   );
// // }

// // function FilterPill({ label, active, onClick, accent = "#7c3aed" }) {
// //   return (
// //     <MotionBox
// //       as="button"
// //       onClick={onClick}
// //       px={3}
// //       py={1}
// //       borderRadius="6px"
// //       border="1px solid"
// //       borderColor={active ? accent : "rgba(255,255,255,0.08)"}
// //       bg={active ? `${accent}18` : "rgba(255,255,255,0.03)"}
// //       color={accent}
// //       fontFamily="'JetBrains Mono', monospace"
// //       fontSize="9px"
// //       letterSpacing="0.18em"
// //       textTransform="uppercase"
// //       cursor="pointer"

// //       whiteSpace="nowrap"
// //       whileTap={{ scale: 0.96 }}
// //       transition={{ duration: 0.15 }}
// //       style={{ transition: "all 0.18s cubic-bezier(0.23,1,0.32,1)" }}
// //       _hover={{
// //         borderColor: accent,
// //         color: accent,
// //         bg: `${accent}18`,
// //         transform: "translateY(-1px)",
// //       }}
// //     >
// //       {label}
// //     </MotionBox>
// //   );
// // }

// // function SuggestionDropdown({ suggestions, query, onSelect }) {
// //   const bg = useColorModeValue("rgba(247,247,248,0.97)", "rgba(10,10,10,0.97)");
// //   const borderColor = useColorModeValue("rgba(0,0,0,0.10)", "rgba(255,255,255,0.08)");
// //   const hoverBg = useColorModeValue("rgba(124,58,237,0.06)", "rgba(124,58,237,0.12)");
  
// //   if (!suggestions.length || !query) return null;

// //   return (
// //     <AnimatePresence>
// //       <MotionBox
// //         initial={{ opacity: 0, y: -8 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         exit={{ opacity: 0, y: -8 }}
// //         transition={{ duration: 0.18 }}
// //         position="absolute"
// //         top="calc(100% + 6px)"
// //         left={0}
// //         right={0}
// //         zIndex={200}
// //         bg={bg}
// //         backdropFilter="blur(18px)"
// //         border="1px solid"
// //         borderColor={borderColor}
// //         borderRadius="12px"
// //         overflow="hidden"
// //         boxShadow="0 16px 40px rgba(0,0,0,0.35)"
// //       >
// //         {/* Top hairline */}
// //         <Box h="1px" bgGradient="linear(to-r, transparent, #7c3aed, transparent)" />

// //         {suggestions.map((s, i) => (
// //           <MotionBox
// //             key={s.id}
// //             initial={{ opacity: 0, x: -8 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             transition={{ delay: i * 0.04 }}
// //             px={4}
// //             py={3}
// //             cursor="pointer"
// //             borderBottom={i < suggestions.length - 1 ? "1px solid" : "none"}
// //             borderColor={borderColor}
// //             _hover={{ bg: hoverBg }}
// //             onClick={() => onSelect(s)}
// //             style={{ transition: "background 0.15s ease" }}
// //           >
// //             <Flex justify="space-between" align="center">
// //               <Box>
// //                 <Text
// //                   fontFamily="'Orbitron', sans-serif"
// //                   fontSize="11px"
// //                   fontWeight={700}
// //                   color="text.primary"
// //                   letterSpacing="0.02em"
// //                 >
// //                   {s.title}
// //                 </Text>
// //                 <Text
// //                   fontFamily="'Sora', sans-serif"
// //                   fontSize="11px"
// //                   color="text.dim"
// //                   mt={0.5}
// //                 >
// //                   {s.tagline}
// //                 </Text>
// //               </Box>
// //               <Box
// //                 px={2}
// //                 py={0.5}
// //                 borderRadius="5px"
// //                 border="1px solid"
// //                 borderColor={`${s.accent}45`}
// //                 bg={`${s.accent}10`}
// //                 color={s.accent}
// //                 fontFamily="'JetBrains Mono', monospace"
// //                 fontSize="8px"
// //                 letterSpacing="0.12em"
// //                 textTransform="uppercase"
// //                 flexShrink={0}
// //                 ml={3}
// //               >
// //                 {s.type}
// //               </Box>
// //             </Flex>
// //           </MotionBox>
// //         ))}
// //       </MotionBox>
// //     </AnimatePresence>
// //   );
// // }

// // function ProjectCard({ project, index, isHighlighted }) {
// //   const ref = useRef(null);
// //   const inView = useInView(ref, { once: true, margin: "-60px" });
// //   const cardBg = useColorModeValue("rgba(247,247,248,0.92)", "rgba(10,10,10,0.82)");
// //   const borderColor = useColorModeValue("rgba(0,0,0,0.08)", "rgba(255,255,255,0.06)");
// //   const descColor = useColorModeValue("#4b5563", "rgba(255,255,255,0.5)");
// //   const statLabelColor = useColorModeValue("#9ca3af", "rgba(255,255,255,0.3)");
// //   const cornerColor = "rgba(124,58,237,0.25)";

  

// //   const status = STATUS_META[project.status] || STATUS_META.Live;

// //   return (
// //     <MotionBox
// //       ref={ref}
// //       initial={{ opacity: 0, y: 32 }}
// //       animate={inView ? { opacity: 1, y: 0 } : {}}
// //       transition={{ duration: 0.55, delay: index * 0.07, ease: [0.23, 1, 0.32, 1] }}
// //       style={{ transformStyle: "preserve-3d" }}
// //       position="relative"
// //       role="group"
// //     >
// //       <Box
// //         position="relative"
// //         bg={cardBg}
// //         backdropFilter="blur(16px)"
// //         border="1px solid"
// //         borderColor={isHighlighted ? project.accent : borderColor}
// //         borderRadius="16px"
// //         overflow="hidden"
// //         p={{ base: 5, md: 6 }}
// //         h="full"
// //         style={{
// //           transition: "border-color 0.25s ease, box-shadow 0.25s ease",
// //           boxShadow: isHighlighted ? `0 0 0 1px ${project.accent}40` : "none",
// //         }}
// //         _groupHover={{
// //           borderColor: project.accent,
// //           boxShadow: `0 0 32px ${project.accent}20`,
// //         }}
// //       >
// //         {/* Top hairline */}
// //         <Box
// //           position="absolute"
// //           top={0}
// //           left={0}
// //           right={0}
// //           h="1px"
// //           bgGradient={`linear(to-r, transparent, ${project.accent}55, transparent)`}
// //         />

// //         {/* Corner brackets */}
// //         {[
// //           { top: "10px", left: "10px", borderTop: "2px solid", borderLeft: "2px solid" },
// //           { top: "10px", right: "10px", borderTop: "2px solid", borderRight: "2px solid" },
// //           { bottom: "10px", left: "10px", borderBottom: "2px solid", borderLeft: "2px solid" },
// //           { bottom: "10px", right: "10px", borderBottom: "2px solid", borderRight: "2px solid" },
// //         ].map((style, i) => (
// //           <Box
// //             key={i}
// //             position="absolute"
// //             w="14px"
// //             h="14px"
// //             borderColor={cornerColor}
// //             opacity={0}
// //             _groupHover={{ opacity: 1 }}
// //             style={{ transition: "opacity 0.2s ease", ...style }}
// //           />
// //         ))}

// //         {/* Header row */}
// //         <Flex justify="space-between" align="flex-start" mb={4}>
// //           <Box>
// //             {/* Live dot + Status */}
// //             <Flex align="center" gap={2} mb={2}>
// //               <Box
// //                 w="6px"
// //                 h="6px"
// //                 borderRadius="50%"
// //                 bg={project.accent}
// //                 boxShadow={`0 0 6px ${project.accent}`}
// //               />
// //               <Box
// //                 px={2}
// //                 py={0.5}
// //                 borderRadius="5px"
// //                 border="1px solid"
// //                 borderColor={status.border}
// //                 bg={status.bg}
// //                 color={status.color}
// //                 fontFamily="'JetBrains Mono', monospace"
// //                 fontSize="8px"
// //                 letterSpacing="0.18em"
// //                 textTransform="uppercase"
// //               >
// //                 {project.status}
// //               </Box>
// //               <Text
// //                 fontFamily="'JetBrains Mono', monospace"
// //                 fontSize="9px"
// //                 color={statLabelColor}
// //                 letterSpacing="0.12em"
// //               >
// //                 {project.year}
// //               </Text>
// //             </Flex>

// //             <Text
// //               fontFamily="'Orbitron', sans-serif"
// //               fontWeight={800}
// //               fontSize={{ base: "15px", md: "17px" }}
// //               letterSpacing="-0.01em"
// //               color="text.primary"
// //               _groupHover={{ color: project.accent }}
// //               style={{ transition: "color 0.2s ease" }}
// //             >
// //               {project.title}
// //             </Text>
// //             <Text
// //               fontFamily="'Sora', sans-serif"
// //               fontSize="11px"
// //               color={descColor}
// //               mt={0.5}
// //             >
// //               {project.tagline}
// //             </Text>
// //           </Box>

// //           {/* Type badge */}
// //           <Box
// //             px={2.5}
// //             py={1}
// //             borderRadius="6px"
// //             border="1px solid"
// //             borderColor={`${project.accent}35`}
// //             bg={`${project.accent}10`}
// //             color={project.accent}
// //             fontFamily="'JetBrains Mono', monospace"
// //             fontSize="8px"
// //             letterSpacing="0.2em"
// //             textTransform="uppercase"
// //             flexShrink={0}
// //             ml={2}
// //           >
// //             {project.type}
// //           </Box>
// //         </Flex>

// //         {/* Description */}
// //         <Text
// //           fontFamily="'Sora', sans-serif"
// //           fontSize={{ base: "12px", md: "13px" }}
// //           color={descColor}
// //           lineHeight={1.7}
// //           mb={5}
// //         >
// //           {project.description}
// //         </Text>

// //         {/* Metrics */}
// //         <Flex gap={6} mb={5}>
// //           {project.metrics.map((m) => (
// //             <Box key={m.label}>
// //               <Text
// //                 fontFamily="'Orbitron', sans-serif"
// //                 fontWeight={800}
// //                 fontSize={{ base: "18px", md: "22px" }}
// //                 color={project.accent}
// //                 _groupHover={{ textShadow: `0 0 20px ${project.accent}` }}
// //                 style={{ transition: "text-shadow 0.25s ease" }}
// //               >
// //                 {m.value}
// //               </Text>
// //               <Text
// //                 fontFamily="'Sora', sans-serif"
// //                 fontSize="10px"
// //                 letterSpacing="0.12em"
// //                 textTransform="uppercase"
// //                 color={statLabelColor}
// //               >
// //                 {m.label}
// //               </Text>
// //             </Box>
// //           ))}
// //         </Flex>

// //         {/* Divider */}
// //         <Box h="1px" bgGradient="linear(to-r, transparent, rgba(124,58,237,0.35), transparent)" mb={4} />

// //         {/* Tech Stack pills */}
// //         <Flex flexWrap="wrap" gap={1.5} mb={4}>
// //           {project.techStack.map((t) => (
// //             <Box
// //               key={t}
// //               px={2}
// //               py={0.5}
// //               borderRadius="5px"
// //               border="1px solid"
// //               borderColor="rgba(255,255,255,0.08)"
// //               bg="rgba(255,255,255,0.04)"
// //               color={descColor}
// //               fontFamily="'JetBrains Mono', monospace"
// //               fontSize="8px"
// //               letterSpacing="0.12em"
// //               textTransform="uppercase"
// //             >
// //               {t}
// //             </Box>
// //           ))}
// //         </Flex>

// //         {/* Use case pills */}
// //         <Flex flexWrap="wrap" gap={1.5} mb={5}>
// //           {project.useCase.map((u) => (
// //             <Box
// //               key={u}
// //               px={2}
// //               py={0.5}
// //               borderRadius="5px"
// //               border="1px solid"
// //               borderColor={`${project.accent}28`}
// //               bg={`${project.accent}08`}
// //               color={project.accent}
// //               fontFamily="'JetBrains Mono', monospace"
// //               fontSize="8px"
// //               letterSpacing="0.12em"
// //               textTransform="uppercase"
// //             >
// //               {u}
// //             </Box>
// //           ))}
// //         </Flex>

// //         {/* CTA */}
// //         <MotionBox
// //           as="a"
// //           href={project.url}
// //           display="inline-flex"
// //           alignItems="center"
// //           gap={2}
// //           px={4}
// //           py={2}
// //           borderRadius="8px"
// //           border="1px solid"
// //           borderColor={`${project.accent}35`}
// //           bg={`${project.accent}10`}
// //           color={project.accent}
// //           fontFamily="'JetBrains Mono', monospace"
// //           fontSize="9px"
// //           letterSpacing="0.18em"
// //           textTransform="uppercase"
// //           cursor="pointer"
// //           textDecoration="none"
// //           whileHover={{ y: -1, backgroundColor: `${project.accent}20` }}
// //           whileTap={{ scale: 0.97 }}
// //           style={{ transition: "all 0.18s cubic-bezier(0.23,1,0.32,1)" }}
// //         >
// //           <Box as="span">View Project</Box>
// //           <Box as="span" fontSize="12px">→</Box>
// //         </MotionBox>
// //       </Box>
// //     </MotionBox>
// //   );
// // }

// // // ─── Tab Group ────────────────────────────────────────────────────────────────
// // function FilterTabGroup({ label, options, active, onChange, accent }) {
// //   const labelColor = useColorModeValue("#9ca3af", "rgba(255,255,255,0.28)");

// //   return (
// //     <Box>
// //       <Text
// //         fontFamily="'JetBrains Mono', monospace"
// //         fontSize="8px"
// //         letterSpacing="0.2em"
// //         textTransform="uppercase"
// //         color={labelColor}
// //         mb={2}
// //       >
// //         {label}
// //       </Text>
// //       <Flex flexWrap="wrap" gap={1.5}>
// //         <FilterPill
// //           label="All"
// //           active={active.length === 0}
// //           onClick={() => onChange([])}
// //           accent={accent}
// //         />
// //         {options.map((o) => (
// //           <FilterPill
// //             key={o}
// //             label={o}
// //             active={active.includes(o)}
// //             onClick={() =>
// //               onChange(active.includes(o) ? active.filter((x) => x !== o) : [...active, o])
// //             }
// //             accent={accent}
// //           />
// //         ))}
// //       </Flex>
// //     </Box>
// //   );
// // }

// // // ─── Main Component ───────────────────────────────────────────────────────────
// // export default function Projects() {
// //   const [query, setQuery] = useState("");
// //   const [techFilters, setTechFilters] = useState([]);
// //   const [useCaseFilters, setUseCaseFilters] = useState([]);
// //   const [typeFilters, setTypeFilters] = useState([]);
// //   const [suggestions, setSuggestions] = useState([]);
// //   const [showSuggestions, setShowSuggestions] = useState(false);
// //   const [highlightedId, setHighlightedId] = useState(null);
// //   // Add sort state near your other useState hooks
// // const [sortOrder, setSortOrder] = useState("latest");
  


// //   const searchRef = useRef(null);
// //   const counterRef = useRef(null);
// //   const prevCount = useRef(0);

// //   const inputBg = useColorModeValue("rgba(247,247,248,0.92)", "rgba(10,10,10,0.82)");
// //   const inputBorder = useColorModeValue("rgba(0,0,0,0.10)", "rgba(255,255,255,0.08)");
// //   const inputColor = useColorModeValue("#1a1a1a", "rgba(255,255,255,0.85)");
// //   const placeholderColor = useColorModeValue("#9ca3af", "rgba(255,255,255,0.25)");
// //   const filterBg = useColorModeValue("rgba(247,247,248,0.90)", "rgba(10,10,10,0.76)");
// //   const filterBorder = useColorModeValue("rgba(0,0,0,0.08)", "rgba(255,255,255,0.06)");
// //   const dividerColor = useColorModeValue("rgba(0,0,0,0.06)", "rgba(255,255,255,0.06)");
// //   const labelColor = useColorModeValue("#9ca3af", "rgba(255,255,255,0.28)");



// //   // Search logic
// //   const getSuggestions = useCallback((q) => {
// //     if (!q || q.length < 2) return [];
// //     const lower = q.toLowerCase();
// //     return PROJECTS.filter(
// //       (p) =>
// //         p.title.toLowerCase().includes(lower) ||
// //         p.description.toLowerCase().includes(lower) ||
// //         p.tagline.toLowerCase().includes(lower) ||
// //         p.techStack.some((t) => t.toLowerCase().includes(lower)) ||
// //         p.useCase.some((u) => u.toLowerCase().includes(lower))
// //     );
// //   }, []);

// //   const filteredProjects = PROJECTS.filter((p) => {
// //     const q = query.toLowerCase();
// //     const matchesQuery =
// //       !q ||
// //       p.title.toLowerCase().includes(q) ||
// //       p.description.toLowerCase().includes(q) ||
// //       p.tagline.toLowerCase().includes(q) ||
// //       p.techStack.some((t) => t.toLowerCase().includes(q)) ||
// //       p.useCase.some((u) => u.toLowerCase().includes(q));

// //     const matchesTech = techFilters.length === 0 || techFilters.every((t) => p.techStack.includes(t));
// //     const matchesUse = useCaseFilters.length === 0 || useCaseFilters.some((u) => p.useCase.includes(u));
// //     const matchesType = typeFilters.length === 0 || typeFilters.includes(p.type);

// //     return matchesQuery && matchesTech && matchesUse && matchesType;
// //   }).sort((a, b) => {
// //        if (sortOrder === "latest") return parseInt(b.year) - parseInt(a.year);
// //        if (sortOrder === "oldest") return parseInt(a.year) - parseInt(b.year);
// //        if (sortOrder === "az")     return a.title.localeCompare(b.title);
// //        return 0;
// //      });


// //   // GSAP counter animation on result count change
// //   useEffect(() => {
// //     if (!counterRef.current) return;
// //     const target = filteredProjects.length;
// //     gsap.fromTo(
// //       counterRef.current,
// //       { textContent: prevCount.current },
// //       {
// //         textContent: target,
// //         duration: 0.5,
// //         ease: "power2.out",
// //         snap: { textContent: 1 },
// //         onUpdate() {
// //           if (counterRef.current) {
// //             counterRef.current.textContent = Math.round(
// //               parseFloat(counterRef.current.textContent)
// //             );
// //           }
// //         },
// //       }
// //     );
// //     prevCount.current = target;
// //   }, [filteredProjects.length]);

// //   const handleQueryChange = (e) => {
// //     const val = e.target.value;
// //     setQuery(val);
// //     const s = getSuggestions(val);
// //     setSuggestions(s);
// //     setShowSuggestions(true);
// //     setHighlightedId(null);
// //   };

// //   const handleSelectSuggestion = (project) => {
// //     setQuery(project.title);
// //     setShowSuggestions(false);
// //     setHighlightedId(project.id);
// //     setTimeout(() => setHighlightedId(null), 2000);
// //   };

// //   // Click-away
// //   useEffect(() => {
// //     const handler = (e) => {
// //       if (searchRef.current && !searchRef.current.contains(e.target)) {
// //         setShowSuggestions(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handler);
// //     return () => document.removeEventListener("mousedown", handler);
// //   }, []);

// //   const activeFilterCount =
// //     techFilters.length + useCaseFilters.length + typeFilters.length;

// //   return (
// //     <Box
// //       as="section"
// //       bg="transparent"
// //       px={{ base: 5, md: 12, lg: 20 }}
// //       py={{ base: 20, md: 16 }}
// //     >
// //       <Flex direction="column" align="flex-start" w="full" maxW="1200px" mx="auto" gap={8}>
// //         {/* ── Section Header ── */}
// //         <SectionHeader
// //           eyebrow="Selected Work"
// //           line1="Projects that"
// //           line2="ship and scale."
// //         />

// //         {/* ── Search + Filters ── */}
// //         <Box
// //           w="full"
// //           bg={filterBg}
// //           backdropFilter="blur(16px)"
// //           border="1px solid"
// //           borderColor={filterBorder}
// //           borderRadius="16px"
// //           p={{ base: 4, md: 6 }}
// //           position="relative"
// //         >
// //           {/* Top hairline */}
// //           <Box
// //             position="absolute"
// //             top={0}
// //             left={0}
// //             right={0}
// //             h="1px"
// //             borderRadius="16px 16px 0 0"
// //             bgGradient="linear(to-r, transparent, rgba(124,58,237,0.35), transparent)"
// //           />
// //   <ProjectsFilterBar
// //      query={query}                 setQuery={setQuery}
// //      suggestions={suggestions}     showSuggestions={showSuggestions}
// //      setShowSuggestions={setShowSuggestions}
// //      onSelectSuggestion={handleSelectSuggestion}
// //      techFilters={techFilters}     setTechFilters={setTechFilters}
// //      useCaseFilters={useCaseFilters} setUseCaseFilters={setUseCaseFilters}
// //      typeFilters={typeFilters}     setTypeFilters={setTypeFilters}
// //      allTech={ALL_TECH}            allUseCases={ALL_USECASES}
// //      allTypes={ALL_TYPES}
// //      sortOrder={sortOrder}         setSortOrder={setSortOrder}
// //      resultCount={filteredProjects.length}
// //    />
// //           {/* Search Bar */}
// //           <Box position="relative" ref={searchRef} mb={6}>
// //             <InputGroup>
// //               <InputLeftElement pointerEvents="none" h="full" pl={4}>
// //                 <Text fontSize="14px" color={placeholderColor}>⌕</Text>
// //               </InputLeftElement>
// //               <Input
// //                 value={query}
// //                 onChange={handleQueryChange}
// //                 onFocus={() => query.length >= 2 && setShowSuggestions(true)}
// //                 placeholder="Search by title, tech, use case…"
// //                 bg={inputBg}
// //                 backdropFilter="blur(8px)"
// //                 border="1px solid"
// //                 borderColor={inputBorder}
// //                 borderRadius="10px"
// //                 color={inputColor}
// //                 fontFamily="'Sora', sans-serif"
// //                 fontSize="13px"
// //                 h="46px"
// //                 pl={10}
// //                 _placeholder={{ color: placeholderColor, fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.08em" }}
// //                 _focus={{ borderColor: "rgba(124,58,237,0.5)", boxShadow: "0 0 0 1px rgba(124,58,237,0.25)", outline: "none" }}
// //                 _hover={{ borderColor: "rgba(124,58,237,0.3)" }}
// //               />
// //             </InputGroup>

// //             {showSuggestions && (
// //               <SuggestionDropdown
// //                 suggestions={suggestions}
// //                 query={query}
// //                 onSelect={handleSelectSuggestion}
// //               />
// //             )}
// //           </Box> 

// //           {/* Filter Groups */}
// //           <Flex direction="column" gap={5}>
// //             <FilterTabGroup
// //               label="Tech Stack"
// //               options={ALL_TECH}
// //               active={techFilters}
// //               onChange={setTechFilters}
// //               color={inputColor}
// //               accent="#14b8a6"
// //             />

// //             <FilterTabGroup
// //               label="Use Case"
// //               options={ALL_USECASES}
// //               active={useCaseFilters}
// //               onChange={setUseCaseFilters}
// //               accent="#7c3aed"
// //             />
// //             <FilterTabGroup
// //               label="Type"
// //               options={ALL_TYPES}
// //               active={typeFilters}
// //               onChange={setTypeFilters}
// //               accent="#ec4899"
// //             />
// //             {/* Sort — add this block after Type */}
// // <Box>
// //   <Text
// //     fontFamily="'JetBrains Mono', monospace"
// //     fontSize="8px"
// //     letterSpacing="0.2em"
// //     textTransform="uppercase"
// //     color={labelColor}
// //     mb={2}
// //   >
// //     Sort
// //   </Text>
// //   <Flex gap={1.5}>
// //     {["latest", "oldest"].map((order) => (
// //       <FilterPill
// //         key={order}
// //         label={order}
// //         active={sortOrder === order}
// //         onClick={() => setSortOrder(order)}
// //         accent="#14b8a6"
// //       />
// //     ))}
// //   </Flex>
// // </Box>

// //           </Flex>

// //           {/* Clear all */}
// //           <AnimatePresence>
// //             {activeFilterCount > 0 && (
// //               <MotionBox
// //                 initial={{ opacity: 0, y: 6 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 exit={{ opacity: 0, y: 6 }}
// //                 mt={4}
// //               >
// //                 <MotionBox
// //                   as="button"
// //                   onClick={() => {
// //                     setTechFilters([]);
// //                     setUseCaseFilters([]);
// //                     setTypeFilters([]);
// //                     setQuery("");
// //                   }}
// //                   px={3}
// //                   py={1}
// //                   borderRadius="6px"
// //                   border="1px solid rgba(239,68,68,0.3)"
// //                   bg="rgba(239,68,68,0.08)"
// //                   color="rgba(239,68,68,0.8)"
// //                   fontFamily="'JetBrains Mono', monospace"
// //                   fontSize="9px"
// //                   letterSpacing="0.18em"
// //                   textTransform="uppercase"
// //                   cursor="pointer"
// //                   whileTap={{ scale: 0.96 }}
// //                   style={{ transition: "all 0.18s ease" }}
// //                   _hover={{ bg: "rgba(239,68,68,0.14)" }}
// //                 >
// //                   Clear {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}
// //                 </MotionBox>
// //               </MotionBox>
// //             )}
// //           </AnimatePresence>
// //         </Box>

// //         {/* ── Results Meta ── */}
// //         <Flex align="center" gap={4} w="full">
// //           <Flex align="baseline" gap={1.5}>
// //             <Text
// //               ref={counterRef}
// //               fontFamily="'Orbitron', sans-serif"
// //               fontWeight={800}
// //               fontSize="28px"
// //               color="#14b8a6"
// //             >
// //               {filteredProjects.length}
// //             </Text>
// //             <Text
// //               fontFamily="'Sora', sans-serif"
// //               fontSize="11px"
// //               letterSpacing="0.12em"
// //               textTransform="uppercase"
// //               color="rgba(255,255,255,0.3)"
// //             >
// //               {filteredProjects.length === 1 ? "project" : "projects"}
// //             </Text>
// //           </Flex>
// //           <Box flex={1} h="1px" bgGradient="linear(to-r, rgba(124,58,237,0.3), transparent)" />
// //         </Flex>

// //         {/* ── Project Grid ── */}
// //         <AnimatePresence mode="wait">
// //           {filteredProjects.length > 0 ? (
// //             <SimpleGrid
// //               key="grid"
// //               columns={{ base: 1, md: 2, xl: 3 }}
// //               spacing={{ base: 4, md: 5 }}
// //               w="full"
// //             >
// //               {filteredProjects.map((p, i) => (
// //                 <ProjectCard
// //                   key={p.id}
// //                   project={p}
// //                   index={i}
// //                   isHighlighted={p.id === highlightedId}
// //                 />
// //               ))}
// //             </SimpleGrid>
// //           ) : (
// //             <MotionBox
// //               key="empty"
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               exit={{ opacity: 0 }}
// //               w="full"
// //               py={20}
// //               textAlign="center"
// //             >
// //               <Text
// //                 fontFamily="'Orbitron', sans-serif"
// //                 fontSize="13px"
// //                 letterSpacing="0.15em"
// //                 color="rgba(255,255,255,0.18)"
// //                 textTransform="uppercase"
// //               >
// //                 No projects match those filters
// //               </Text>
// //               <Text
// //                 fontFamily="'JetBrains Mono', monospace"
// //                 fontSize="10px"
// //                 color="rgba(255,255,255,0.1)"
// //                 mt={2}
// //                 letterSpacing="0.1em"
// //               >
// //                 try clearing some filters
// //               </Text>
// //             </MotionBox>
// //           )}
// //         </AnimatePresence>
// //       </Flex>
// //     </Box>
// //   );
// // }

// // Projects.jsx — clean rewrite
// // Inline collapsible filter bar · ecommerce dropdowns · sort · lucide-react icons
// // NO separate FilterBar component — everything lives here
// // Stack: React 18 + Chakra UI v2 + Framer Motion + GSAP

// import { useState, useRef, useEffect, useCallback } from "react";
// import {
//   Box, Flex, Text, Input, SimpleGrid, useColorModeValue,
// } from "@chakra-ui/react";
// import { motion, AnimatePresence, useInView } from "framer-motion";
// import { gsap } from "gsap";
// import {
//   Search, SlidersHorizontal, ChevronDown, ArrowUpDown,
//   X, Check, Layers, Tag, LayoutGrid, Clock, ArrowDownAZ,
// } from "lucide-react";

// import { PROJECTS, ALL_TECH, ALL_USECASES, ALL_TYPES } from "./data/projects";

// const MotionBox = motion.create(Box);

// // ── Constants ─────────────────────────────────────────────────────────────────
// const STATUS_META = {
//   Live: { bg: "rgba(20,184,166,0.12)", border: "rgba(20,184,166,0.35)", color: "#14b8a6" },
//   Beta: { bg: "rgba(232,197,71,0.12)", border: "rgba(232,197,71,0.35)", color: "#e8c547" },
//   OSS:  { bg: "rgba(124,58,237,0.12)", border: "rgba(124,58,237,0.35)", color: "#7c3aed" },
// };

// const SORT_OPTIONS = [
//   { value: "latest", label: "Latest first", Icon: Clock },
//   { value: "oldest", label: "Oldest first", Icon: Clock },
//   { value: "az",     label: "A → Z",        Icon: ArrowDownAZ },
// ];

// // ── Helpers ───────────────────────────────────────────────────────────────────
// function getMatchingSuggestions(q) {
//   if (!q || q.length < 2) return [];
//   const lower = q.toLowerCase();
//   return PROJECTS.filter(
//     (p) =>
//       p.title.toLowerCase().includes(lower) ||
//       p.description.toLowerCase().includes(lower) ||
//       p.tagline.toLowerCase().includes(lower) ||
//       p.techStack.some((t) => t.toLowerCase().includes(lower)) ||
//       p.useCase.some((u) => u.toLowerCase().includes(lower))
//   );
// }

// // ── Filter dropdown ───────────────────────────────────────────────────────────
// function FilterDropdown({ label, LucideIcon, options, selected, onChange, accent }) {
//   const [open, setOpen] = useState(false);
//   const ref = useRef(null);

//   const panelBg  = useColorModeValue("rgba(250,250,251,0.99)", "rgba(8,8,12,0.99)");
//   const border   = useColorModeValue("rgba(0,0,0,0.09)", "rgba(255,255,255,0.07)");
//   const textCol  = useColorModeValue("#111", "rgba(255,255,255,0.88)");
//   const dimCol   = useColorModeValue("#6b7280", "rgba(255,255,255,0.35)");
//   const rowHover = useColorModeValue("rgba(0,0,0,0.03)", "rgba(255,255,255,0.04)");
//   const btnBg    = useColorModeValue("rgba(247,247,248,0.9)", "rgba(12,12,16,0.8)");

//   useEffect(() => {
//     const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
//     document.addEventListener("mousedown", h);
//     return () => document.removeEventListener("mousedown", h);
//   }, []);

//   const hasActive = selected.length > 0;
//   const toggle = (opt) =>
//     onChange(selected.includes(opt) ? selected.filter((x) => x !== opt) : [...selected, opt]);

//   return (
//     <Box ref={ref} position="relative" userSelect="none">
//       <Flex as="button" align="center" gap={2} px={3} py={2}
//         borderRadius="9px" border="1px solid"
//         borderColor={hasActive ? `${accent}55` : border}
//         bg={hasActive ? `${accent}0f` : btnBg}
//         backdropFilter="blur(10px)"
//         color={hasActive ? accent : dimCol}
//         cursor="pointer" onClick={() => setOpen((o) => !o)}
//         whiteSpace="nowrap"
//         style={{ transition: "all 0.18s ease" }}
//         _hover={{ borderColor: `${accent}45`, color: accent }}>
//         <LucideIcon size={12} />
//         <Text fontFamily="'JetBrains Mono', monospace" fontSize="9px"
//           letterSpacing="0.16em" textTransform="uppercase">{label}</Text>
//         {hasActive && (
//           <Flex w="16px" h="16px" borderRadius="50%" bg={accent} color="white"
//             align="center" justify="center"
//             fontFamily="'JetBrains Mono', monospace" fontSize="8px" fontWeight={700}>
//             {selected.length}
//           </Flex>
//         )}
//         <ChevronDown size={10} style={{
//           transform: open ? "rotate(180deg)" : "none",
//           transition: "transform 0.2s ease",
//         }} />
//       </Flex>

//       <AnimatePresence>
//         {open && (
//           <MotionBox
//             initial={{ opacity: 0, y: -6, scale: 0.97 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -6, scale: 0.97 }}
//             transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
//             position="absolute" top="calc(100% + 8px)" left={0}
//             zIndex={500} minW="210px" maxW="270px"
//             bg={panelBg} backdropFilter="blur(24px)"
//             border="1px solid" borderColor={border}
//             borderRadius="13px" overflow="hidden"
//             boxShadow="0 16px 48px rgba(0,0,0,0.32)">
//             <Box h="1px" bgGradient={`linear(to-r, transparent, ${accent}60, transparent)`} />
//             <Flex px={3} py={2.5} justify="space-between" align="center"
//               borderBottom="1px solid" borderColor={border}>
//               <Text fontFamily="'JetBrains Mono', monospace" fontSize="8px"
//                 letterSpacing="0.2em" textTransform="uppercase" color={dimCol}>
//                 {hasActive ? `${selected.length} selected` : label}
//               </Text>
//               {hasActive && (
//                 <Box as="button" onClick={() => onChange([])}
//                   fontFamily="'JetBrains Mono', monospace" fontSize="8px"
//                   letterSpacing="0.12em" textTransform="uppercase"
//                   color="rgba(239,68,68,0.7)" cursor="pointer"
//                   _hover={{ color: "rgba(239,68,68,1)" }}
//                   style={{ transition: "color 0.12s ease" }}>
//                   Clear
//                 </Box>
//               )}
//             </Flex>
//             <Box maxH="230px" overflowY="auto" css={{
//               "&::-webkit-scrollbar": { width: "3px" },
//               "&::-webkit-scrollbar-thumb": { background: `${accent}40`, borderRadius: "3px" },
//             }}>
//               {options.map((opt, i) => {
//                 const isActive = selected.includes(opt);
//                 return (
//                   <Flex key={opt} as="button" align="center" gap={3}
//                     px={3} py={2.5} w="full" cursor="pointer"
//                     bg={isActive ? `${accent}0d` : "transparent"}
//                     borderBottom={i < options.length - 1 ? "1px solid" : "none"}
//                     borderColor={border}
//                     onClick={() => toggle(opt)}
//                     style={{ transition: "background 0.12s ease" }}
//                     _hover={{ bg: isActive ? `${accent}18` : rowHover }}>
//                     <Flex w="14px" h="14px" borderRadius="4px"
//                       border="1px solid"
//                       borderColor={isActive ? accent : border}
//                       bg={isActive ? accent : "transparent"}
//                       align="center" justify="center" flexShrink={0}
//                       style={{ transition: "all 0.14s ease" }}>
//                       {isActive && <Check size={9} color="white" />}
//                     </Flex>
//                     <Text fontFamily="'Sora', sans-serif" fontSize="12px"
//                       color={isActive ? accent : textCol} flex={1} textAlign="left"
//                       style={{ transition: "color 0.12s ease" }}>
//                       {opt}
//                     </Text>
//                   </Flex>
//                 );
//               })}
//             </Box>
//           </MotionBox>
//         )}
//       </AnimatePresence>
//     </Box>
//   );
// }

// // ── Sort dropdown ─────────────────────────────────────────────────────────────
// function SortDropdown({ value, onChange }) {
//   const [open, setOpen] = useState(false);
//   const ref = useRef(null);
//   const accent = "#14b8a6";

//   const panelBg  = useColorModeValue("rgba(250,250,251,0.99)", "rgba(8,8,12,0.99)");
//   const border   = useColorModeValue("rgba(0,0,0,0.09)", "rgba(255,255,255,0.07)");
//   const textCol  = useColorModeValue("#111", "rgba(255,255,255,0.88)");
//   const dimCol   = useColorModeValue("#6b7280", "rgba(255,255,255,0.35)");
//   const rowHover = useColorModeValue("rgba(0,0,0,0.03)", "rgba(255,255,255,0.04)");
//   const btnBg    = useColorModeValue("rgba(247,247,248,0.9)", "rgba(12,12,16,0.8)");

//   useEffect(() => {
//     const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
//     document.addEventListener("mousedown", h);
//     return () => document.removeEventListener("mousedown", h);
//   }, []);

//   const current = SORT_OPTIONS.find((s) => s.value === value) || SORT_OPTIONS[0];

//   return (
//     <Box ref={ref} position="relative" userSelect="none">
//       <Flex as="button" align="center" gap={2} px={3} py={2}
//         borderRadius="9px" border="1px solid" borderColor={border}
//         bg={btnBg} backdropFilter="blur(10px)" color={dimCol}
//         cursor="pointer" onClick={() => setOpen((o) => !o)}
//         whiteSpace="nowrap"
//         style={{ transition: "all 0.18s ease" }}
//         _hover={{ borderColor: `${accent}40`, color: accent }}>
//         <ArrowUpDown size={12} />
//         <Text fontFamily="'JetBrains Mono', monospace" fontSize="9px"
//           letterSpacing="0.16em" textTransform="uppercase">{current.label}</Text>
//         <ChevronDown size={10} style={{
//           transform: open ? "rotate(180deg)" : "none",
//           transition: "transform 0.2s ease",
//         }} />
//       </Flex>

//       <AnimatePresence>
//         {open && (
//           <MotionBox
//             initial={{ opacity: 0, y: -6, scale: 0.97 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -6, scale: 0.97 }}
//             transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
//             position="absolute" top="calc(100% + 8px)" right={0}
//             zIndex={500} minW="180px"
//             bg={panelBg} backdropFilter="blur(24px)"
//             border="1px solid" borderColor={border}
//             borderRadius="13px" overflow="hidden"
//             boxShadow="0 16px 48px rgba(0,0,0,0.32)">
//             <Box h="1px" bgGradient={`linear(to-r, transparent, ${accent}60, transparent)`} />
//             {SORT_OPTIONS.map((opt, i) => {
//               const isActive = value === opt.value;
//               return (
//                 <Flex key={opt.value} as="button" align="center" gap={3}
//                   px={3} py={3} w="full" cursor="pointer"
//                   bg={isActive ? `${accent}0d` : "transparent"}
//                   borderBottom={i < SORT_OPTIONS.length - 1 ? "1px solid" : "none"}
//                   borderColor={border}
//                   onClick={() => { onChange(opt.value); setOpen(false); }}
//                   style={{ transition: "background 0.12s ease" }}
//                   _hover={{ bg: isActive ? `${accent}18` : rowHover }}>
//                   <opt.Icon size={12} color={isActive ? accent : dimCol} />
//                   <Text fontFamily="'Sora', sans-serif" fontSize="12px" flex={1} textAlign="left"
//                     color={isActive ? accent : textCol}
//                     style={{ transition: "color 0.12s ease" }}>
//                     {opt.label}
//                   </Text>
//                   {isActive && <Check size={11} color={accent} />}
//                 </Flex>
//               );
//             })}
//           </MotionBox>
//         )}
//       </AnimatePresence>
//     </Box>
//   );
// }

// // ── Active chips row ──────────────────────────────────────────────────────────
// function ActiveChips({ techFilters, useCaseFilters, typeFilters, query,
//   setTechFilters, setUseCaseFilters, setTypeFilters, setQuery }) {

//   const dimCol = useColorModeValue("#6b7280", "rgba(255,255,255,0.35)");
//   const chips = [
//     ...techFilters.map((v)    => ({ label: v, accent: "#14b8a6", onRemove: () => setTechFilters((p) => p.filter((x) => x !== v)) })),
//     ...useCaseFilters.map((v) => ({ label: v, accent: "#7c3aed", onRemove: () => setUseCaseFilters((p) => p.filter((x) => x !== v)) })),
//     ...typeFilters.map((v)    => ({ label: v, accent: "#ec4899", onRemove: () => setTypeFilters((p) => p.filter((x) => x !== v)) })),
//     ...(query ? [{ label: `"${query}"`, accent: "#e8c547", onRemove: () => setQuery("") }] : []),
//   ];
//   if (!chips.length) return null;

//   return (
//     <Flex align="center" gap={2} flexWrap="wrap" pt={3}>
//       <Text fontFamily="'JetBrains Mono', monospace" fontSize="8px"
//         letterSpacing="0.18em" textTransform="uppercase" color={dimCol} flexShrink={0}>
//         Active:
//       </Text>
//       <AnimatePresence mode="popLayout">
//         {chips.map((chip) => (
//           <MotionBox key={chip.label} layout
//             initial={{ opacity: 0, scale: 0.85 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.85 }}
//             transition={{ duration: 0.15 }}>
//             <Flex align="center" gap={1.5} px={2.5} py={1} borderRadius="6px"
//               border="1px solid" borderColor={`${chip.accent}35`} bg={`${chip.accent}0e`}>
//               <Text fontFamily="'JetBrains Mono', monospace" fontSize="9px"
//                 letterSpacing="0.1em" textTransform="uppercase" color={chip.accent}>
//                 {chip.label}
//               </Text>
//               <Box as="button" onClick={chip.onRemove} color={`${chip.accent}80`}
//                 cursor="pointer" display="flex" alignItems="center"
//                 _hover={{ color: chip.accent }} style={{ transition: "color 0.12s ease" }}>
//                 <X size={9} />
//               </Box>
//             </Flex>
//           </MotionBox>
//         ))}
//       </AnimatePresence>
//       <Box as="button"
//         onClick={() => { setTechFilters([]); setUseCaseFilters([]); setTypeFilters([]); setQuery(""); }}
//         px={2.5} py={1} borderRadius="6px"
//         border="1px solid rgba(239,68,68,0.25)" bg="rgba(239,68,68,0.06)"
//         color="rgba(239,68,68,0.7)"
//         fontFamily="'JetBrains Mono', monospace" fontSize="8px"
//         letterSpacing="0.15em" textTransform="uppercase" cursor="pointer"
//         style={{ transition: "all 0.15s ease" }}
//         _hover={{ bg: "rgba(239,68,68,0.12)", color: "rgba(239,68,68,1)" }}>
//         Clear all
//       </Box>
//     </Flex>
//   );
// }

// // ── Suggestion list ───────────────────────────────────────────────────────────
// function SuggestionList({ suggestions, query, onSelect }) {
//   const bg       = useColorModeValue("rgba(250,250,251,0.99)", "rgba(8,8,12,0.99)");
//   const border   = useColorModeValue("rgba(0,0,0,0.09)", "rgba(255,255,255,0.07)");
//   const textCol  = useColorModeValue("#111", "rgba(255,255,255,0.88)");
//   const dimCol   = useColorModeValue("#6b7280", "rgba(255,255,255,0.35)");
//   const rowHover = useColorModeValue("rgba(124,58,237,0.05)", "rgba(124,58,237,0.10)");

//   if (!suggestions.length || !query) return null;

//   return (
//     <AnimatePresence>
//       <MotionBox
//         initial={{ opacity: 0, y: -6 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -6 }}
//         transition={{ duration: 0.15 }}
//         position="absolute" top="calc(100% + 6px)" left={0} right={0}
//         zIndex={500}
//         bg={bg} backdropFilter="blur(24px)"
//         border="1px solid" borderColor={border}
//         borderRadius="13px" overflow="hidden"
//         boxShadow="0 16px 48px rgba(0,0,0,0.28)">
//         <Box h="1px" bgGradient="linear(to-r, transparent, #7c3aed55, transparent)" />
//         {suggestions.map((s, i) => (
//           <MotionBox key={s.id}
//             initial={{ opacity: 0, x: -6 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: i * 0.04 }}
//             px={4} py={3} cursor="pointer"
//             borderBottom={i < suggestions.length - 1 ? "1px solid" : "none"}
//             borderColor={border}
//             onClick={() => onSelect(s)}
//             style={{ transition: "background 0.12s ease" }}
//             _hover={{ bg: rowHover }}>
//             <Flex justify="space-between" align="center" gap={3}>
//               <Flex align="center" gap={2.5}>
//                 <Box w="6px" h="6px" borderRadius="50%" bg={s.accent} flexShrink={0} />
//                 <Box>
//                   <Text fontFamily="'Orbitron', sans-serif" fontSize="11px"
//                     fontWeight={700} color={textCol} letterSpacing="0.02em">
//                     {s.title}
//                   </Text>
//                   <Text fontFamily="'Sora', sans-serif" fontSize="10px" color={dimCol} mt={0.5}>
//                     {s.tagline}
//                   </Text>
//                 </Box>
//               </Flex>
//               <Box px={2} py={0.5} borderRadius="4px"
//                 border="1px solid" borderColor={`${s.accent}40`}
//                 bg={`${s.accent}0e`} color={s.accent}
//                 fontFamily="'JetBrains Mono', monospace" fontSize="7px"
//                 letterSpacing="0.12em" textTransform="uppercase" flexShrink={0}>
//                 {s.type}
//               </Box>
//             </Flex>
//           </MotionBox>
//         ))}
//       </MotionBox>
//     </AnimatePresence>
//   );
// }

// // ── Project card ──────────────────────────────────────────────────────────────
// function ProjectCard({ project, index, isHighlighted }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-60px" });

//   const cardBg    = useColorModeValue("rgba(247,247,248,0.92)", "rgba(10,10,10,0.82)");
//   const border    = useColorModeValue("rgba(0,0,0,0.08)", "rgba(255,255,255,0.06)");
//   const textColor = useColorModeValue("#111", "rgba(255,255,255,0.88)");
//   const descColor = useColorModeValue("#4b5563", "rgba(255,255,255,0.5)");
//   const statLabel = useColorModeValue("#9ca3af", "rgba(255,255,255,0.3)");

//   const status = STATUS_META[project.status] || STATUS_META.Live;

//   return (
//     <MotionBox ref={ref}
//       initial={{ opacity: 0, y: 28 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.52, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
//       position="relative" role="group" h="full">
//       <Box position="relative" bg={cardBg} backdropFilter="blur(16px)"
//         border="1px solid"
//         borderColor={isHighlighted ? project.accent : border}
//         borderRadius="16px" overflow="hidden" p={{ base: 5, md: 6 }} h="full"
//         style={{
//           transition: "border-color 0.25s ease, box-shadow 0.25s ease",
//           boxShadow: isHighlighted ? `0 0 0 1px ${project.accent}40` : "none",
//         }}
//         _groupHover={{ borderColor: project.accent, boxShadow: `0 0 28px ${project.accent}1a` }}>

//         {/* Top hairline */}
//         <Box position="absolute" top={0} left={0} right={0} h="1px"
//           bgGradient={`linear(to-r, transparent, ${project.accent}55, transparent)`} />

//         {/* Corner brackets */}
//         {[
//           { top: "10px",    left: "10px",  borderTop: "2px solid",    borderLeft: "2px solid" },
//           { top: "10px",    right: "10px", borderTop: "2px solid",    borderRight: "2px solid" },
//           { bottom: "10px", left: "10px",  borderBottom: "2px solid", borderLeft: "2px solid" },
//           { bottom: "10px", right: "10px", borderBottom: "2px solid", borderRight: "2px solid" },
//         ].map((s, i) => (
//           <Box key={i} position="absolute" w="14px" h="14px"
//             borderColor="rgba(124,58,237,0.25)" opacity={0}
//             _groupHover={{ opacity: 1 }}
//             style={{ transition: "opacity 0.2s ease", ...s }} />
//         ))}

//         {/* Header */}
//         <Flex justify="space-between" align="flex-start" mb={4}>
//           <Box>
//             <Flex align="center" gap={2} mb={2}>
//               <Box w="6px" h="6px" borderRadius="50%" bg={project.accent}
//                 boxShadow={`0 0 6px ${project.accent}`} />
//               <Box px={2} py={0.5} borderRadius="5px" border="1px solid"
//                 borderColor={status.border} bg={status.bg} color={status.color}
//                 fontFamily="'JetBrains Mono', monospace" fontSize="8px"
//                 letterSpacing="0.18em" textTransform="uppercase">
//                 {project.status}
//               </Box>
//               <Text fontFamily="'JetBrains Mono', monospace" fontSize="9px"
//                 color={statLabel} letterSpacing="0.12em">{project.year}</Text>
//             </Flex>
//             <Text fontFamily="'Orbitron', sans-serif" fontWeight={800}
//               fontSize={{ base: "15px", md: "17px" }} letterSpacing="-0.01em"
//               color={textColor}
//               _groupHover={{ color: project.accent }}
//               style={{ transition: "color 0.2s ease" }}>
//               {project.title}
//             </Text>
//             <Text fontFamily="'Sora', sans-serif" fontSize="11px" color={descColor} mt={0.5}>
//               {project.tagline}
//             </Text>
//           </Box>
//           <Box px={2.5} py={1} borderRadius="6px" border="1px solid"
//             borderColor={`${project.accent}35`} bg={`${project.accent}10`}
//             color={project.accent}
//             fontFamily="'JetBrains Mono', monospace" fontSize="8px"
//             letterSpacing="0.2em" textTransform="uppercase" flexShrink={0} ml={2}>
//             {project.type}
//           </Box>
//         </Flex>

//         {/* Description */}
//         <Text fontFamily="'Sora', sans-serif" fontSize={{ base: "12px", md: "13px" }}
//           color={descColor} lineHeight={1.7} mb={5}>
//           {project.description}
//         </Text>

//         {/* Metrics */}
//         <Flex gap={6} mb={5}>
//           {project.metrics.map((m) => (
//             <Box key={m.label}>
//               <Text fontFamily="'Orbitron', sans-serif" fontWeight={800}
//                 fontSize={{ base: "18px", md: "22px" }} color={project.accent}
//                 _groupHover={{ textShadow: `0 0 20px ${project.accent}` }}
//                 style={{ transition: "text-shadow 0.25s ease" }}>
//                 {m.value}
//               </Text>
//               <Text fontFamily="'Sora', sans-serif" fontSize="10px"
//                 letterSpacing="0.12em" textTransform="uppercase" color={statLabel}>
//                 {m.label}
//               </Text>
//             </Box>
//           ))}
//         </Flex>

//         <Box h="1px" bgGradient="linear(to-r, transparent, rgba(124,58,237,0.3), transparent)" mb={4} />

//         {/* Tech pills */}
//         <Flex flexWrap="wrap" gap={1.5} mb={3}>
//           {project.techStack.map((t) => (
//             <Box key={t} px={2} py={0.5} borderRadius="5px"
//               border="1px solid" borderColor="rgba(255,255,255,0.07)"
//               bg="rgba(255,255,255,0.03)" color={descColor}
//               fontFamily="'JetBrains Mono', monospace" fontSize="8px"
//               letterSpacing="0.12em" textTransform="uppercase">{t}</Box>
//           ))}
//         </Flex>

//         {/* Use case pills */}
//         <Flex flexWrap="wrap" gap={1.5} mb={5}>
//           {project.useCase.map((u) => (
//             <Box key={u} px={2} py={0.5} borderRadius="5px"
//               border="1px solid" borderColor={`${project.accent}28`}
//               bg={`${project.accent}08`} color={project.accent}
//               fontFamily="'JetBrains Mono', monospace" fontSize="8px"
//               letterSpacing="0.12em" textTransform="uppercase">{u}</Box>
//           ))}
//         </Flex>

//         {/* What I learned */}
//         {project.learnt && (
//           <Box mb={5} px={3} py={2.5} borderRadius="8px"
//             border="1px solid" borderColor={`${project.accent}20`}
//             bg={`${project.accent}07`}>
//             <Text fontFamily="'JetBrains Mono', monospace" fontSize="7px"
//               letterSpacing="0.18em" textTransform="uppercase"
//               color={`${project.accent}80`} mb={1}>
//               What I learned
//             </Text>
//             <Text fontFamily="'Sora', sans-serif" fontSize="11px"
//               color={descColor} fontStyle="italic" lineHeight={1.6}>
//               {project.learnt}
//             </Text>
//           </Box>
//         )}

//         {/* CTAs */}
//         <Flex gap={2} flexWrap="wrap">
//           <MotionBox as="a" href={project.url}
//             display="inline-flex" alignItems="center" gap={2}
//             px={4} py={2} borderRadius="8px" border="1px solid"
//             borderColor={`${project.accent}35`} bg={`${project.accent}10`}
//             color={project.accent}
//             fontFamily="'JetBrains Mono', monospace" fontSize="9px"
//             letterSpacing="0.18em" textTransform="uppercase"
//             cursor="pointer" textDecoration="none"
//             whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
//             style={{ transition: "all 0.18s cubic-bezier(0.23,1,0.32,1)" }}>
//             View Project <Box as="span" fontSize="12px">→</Box>
//           </MotionBox>
//           {project.github && (
//             <MotionBox as="a" href={project.github} target="_blank"
//               display="inline-flex" alignItems="center" gap={2}
//               px={4} py={2} borderRadius="8px" border="1px solid"
//               borderColor="rgba(255,255,255,0.08)" bg="rgba(255,255,255,0.03)"
//               color={descColor}
//               fontFamily="'JetBrains Mono', monospace" fontSize="9px"
//               letterSpacing="0.18em" textTransform="uppercase"
//               cursor="pointer" textDecoration="none"
//               whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
//               style={{ transition: "all 0.18s cubic-bezier(0.23,1,0.32,1)" }}>
//               GitHub <Box as="span" fontSize="11px">↗</Box>
//             </MotionBox>
//           )}
//         </Flex>
//       </Box>
//     </MotionBox>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// export default function Projects() {
//   const [query, setQuery]                   = useState("");
//   const [techFilters, setTechFilters]       = useState([]);
//   const [useCaseFilters, setUseCaseFilters] = useState([]);
//   const [typeFilters, setTypeFilters]       = useState([]);
//   const [suggestions, setSuggestions]       = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [highlightedId, setHighlightedId]   = useState(null);
//   const [sortOrder, setSortOrder]           = useState("latest");
//   const [filtersOpen, setFiltersOpen]       = useState(true);

//   const searchRef  = useRef(null);
//   const counterRef = useRef(null);
//   const prevCount  = useRef(0);

//   const cardBg      = useColorModeValue("rgba(247,247,248,0.90)", "rgba(10,10,10,0.80)");
//   const borderColor = useColorModeValue("rgba(0,0,0,0.08)", "rgba(255,255,255,0.06)");
//   const dimColor    = useColorModeValue("#9ca3af", "rgba(255,255,255,0.28)");
//   const textColor   = useColorModeValue("#111", "rgba(255,255,255,0.88)");
//   const inputBg     = useColorModeValue("rgba(255,255,255,0.85)", "rgba(255,255,255,0.04)");
//   const line2Color  = useColorModeValue("#2a2a2a", "rgba(255,255,255,0.18)");

//   // Filtered + sorted
//   const filteredProjects = PROJECTS.filter((p) => {
//     const q = query.toLowerCase();
//     const matchesQuery = !q
//       || p.title.toLowerCase().includes(q)
//       || p.description.toLowerCase().includes(q)
//       || p.tagline.toLowerCase().includes(q)
//       || p.techStack.some((t) => t.toLowerCase().includes(q))
//       || p.useCase.some((u) => u.toLowerCase().includes(q));
//     const matchesTech = techFilters.length === 0 || techFilters.every((t) => p.techStack.includes(t));
//     const matchesUse  = useCaseFilters.length === 0 || useCaseFilters.some((u) => p.useCase.includes(u));
//     const matchesType = typeFilters.length === 0 || typeFilters.includes(p.type);
//     return matchesQuery && matchesTech && matchesUse && matchesType;
//   }).sort((a, b) => {
//     if (sortOrder === "latest") return parseInt(b.year) - parseInt(a.year);
//     if (sortOrder === "oldest") return parseInt(a.year) - parseInt(b.year);
//     if (sortOrder === "az")     return a.title.localeCompare(b.title);
//     return 0;
//   });

//   // GSAP count-up
//   useEffect(() => {
//     if (!counterRef.current) return;
//     const target = filteredProjects.length;
//     const obj = { val: prevCount.current };
//     gsap.to(obj, {
//       val: target, duration: 0.5, ease: "power2.out", snap: { val: 1 },
//       onUpdate() { if (counterRef.current) counterRef.current.textContent = Math.round(obj.val); },
//     });
//     prevCount.current = target;
//   }, [filteredProjects.length]);

//   const handleQueryChange = (e) => {
//     const val = e.target.value;
//     setQuery(val);
//     setSuggestions(getMatchingSuggestions(val));
//     setShowSuggestions(true);
//     setHighlightedId(null);
//   };

//   const handleSelectSuggestion = useCallback((project) => {
//     setQuery(project.title);
//     setShowSuggestions(false);
//     setSuggestions([]);
//     setHighlightedId(project.id);
//     setTimeout(() => setHighlightedId(null), 2000);
//   }, []);

//   // Click-away for suggestions
//   useEffect(() => {
//     const h = (e) => {
//       if (searchRef.current && !searchRef.current.contains(e.target)) setShowSuggestions(false);
//     };
//     document.addEventListener("mousedown", h);
//     return () => document.removeEventListener("mousedown", h);
//   }, []);

//   const activeFilterCount = techFilters.length + useCaseFilters.length + typeFilters.length + (query ? 1 : 0);

//   return (
//     <Box as="section" bg="transparent"
//       px={{ base: 5, md: 12, lg: 20 }}
//       py={{ base: 20, md: 16 }}>
//       <Flex direction="column" align="flex-start" w="full" maxW="1200px" mx="auto" gap={8}>

//         {/* Header */}
//         <Box mb={2}>
//           <Flex align="center" gap={3} mb={3}>
//             <Box w="24px" h="1px" bgGradient="linear(to-r, #ec4899, #7c3aed)" flexShrink={0} />
//             <Text fontFamily="'JetBrains Mono', monospace" fontSize="9px"
//               letterSpacing="0.3em" textTransform="uppercase" color={dimColor}>
//               Selected Work
//             </Text>
//           </Flex>
//           <Text fontFamily="'Orbitron', sans-serif" fontWeight={900}
//             fontSize={{ base: "26px", md: "clamp(26px, 4vw, 40px)" }}
//             letterSpacing="-0.02em" lineHeight={1.05}
//             bgGradient="linear(to-r, #1e40af, #7c3aed, #ec4899)"
//             bgClip="text" display="inline-block" w="fit-content">
//             Projects that
//           </Text>
//           <Text fontFamily="'Orbitron', sans-serif" fontWeight={900}
//             fontSize={{ base: "26px", md: "clamp(26px, 4vw, 40px)" }}
//             letterSpacing="-0.02em" lineHeight={1.05} color={line2Color}>
//             ship and scale.
//           </Text>
//         </Box>

//         {/* ── Filter bar ── */}
//         <Box w="full" bg={cardBg} backdropFilter="blur(16px)"
//           border="1px solid" borderColor={borderColor}
//           borderRadius="16px" overflow="visible" position="relative">

//           <Box position="absolute" top={0} left={0} right={0} h="1px"
//             borderRadius="16px 16px 0 0"
//             bgGradient="linear(to-r, transparent, rgba(124,58,237,0.35), transparent)" />

//           {/* Control row */}
//           <Flex align="center" gap={3} px={{ base: 4, md: 5 }} py={4} flexWrap="wrap">

//             {/* Search */}
//             <Box ref={searchRef} flex={1} minW="200px" position="relative">
//               <Flex align="center" gap={2.5} px={3.5} py={2.5}
//                 borderRadius="10px" border="1px solid" borderColor={borderColor}
//                 bg={inputBg} backdropFilter="blur(8px)"
//                 style={{ transition: "border-color 0.18s ease, box-shadow 0.18s ease" }}
//                 _focusWithin={{ borderColor: "rgba(124,58,237,0.5)", boxShadow: "0 0 0 1px rgba(124,58,237,0.2)" }}>
//                 <Box color={dimColor} display="flex" alignItems="center" flexShrink={0}>
//                   <Search size={13} />
//                 </Box>
//                 <Input
//                   value={query}
//                   onChange={handleQueryChange}
//                   onFocus={() => suggestions.length && setShowSuggestions(true)}
//                   placeholder="Search by title, tech, use case…"
//                   variant="unstyled"
//                   fontFamily="'Sora', sans-serif" fontSize="13px" color={textColor}
//                   _placeholder={{ color: dimColor, fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.06em" }}
//                 />
//                 {query && (
//                   <Box as="button" onClick={() => { setQuery(""); setSuggestions([]); }}
//                     color={dimColor} display="flex" alignItems="center"
//                     cursor="pointer" _hover={{ color: textColor }}
//                     style={{ transition: "color 0.12s ease" }}>
//                     <X size={12} />
//                   </Box>
//                 )}
//               </Flex>

//               {showSuggestions && (
//                 <SuggestionList
//                   suggestions={suggestions}
//                   query={query}
//                   onSelect={handleSelectSuggestion}
//                 />
//               )}
//             </Box>

//             <Box w="1px" h="26px" bg={borderColor}
//               display={{ base: "none", md: "block" }} flexShrink={0} />

//             {/* Filters toggle */}
//             <Flex as="button" align="center" gap={2} px={3} py={2}
//               borderRadius="9px" border="1px solid"
//               borderColor={filtersOpen ? "rgba(124,58,237,0.4)" : borderColor}
//               bg={filtersOpen ? "rgba(124,58,237,0.08)" : "transparent"}
//               color={filtersOpen ? "#7c3aed" : dimColor}
//               cursor="pointer" onClick={() => setFiltersOpen((o) => !o)}
//               whiteSpace="nowrap" flexShrink={0}
//               style={{ transition: "all 0.18s ease" }}
//               _hover={{ borderColor: "rgba(124,58,237,0.35)", color: "#7c3aed" }}>
//               <SlidersHorizontal size={12} />
//               <Text fontFamily="'JetBrains Mono', monospace" fontSize="9px"
//                 letterSpacing="0.16em" textTransform="uppercase">
//                 Filters
//               </Text>
//               {activeFilterCount > 0 && (
//                 <Flex w="16px" h="16px" borderRadius="50%" bg="#7c3aed" color="white"
//                   align="center" justify="center"
//                   fontFamily="'JetBrains Mono', monospace" fontSize="8px" fontWeight={700}>
//                   {activeFilterCount}
//                 </Flex>
//               )}
//               <ChevronDown size={10} style={{
//                 transform: filtersOpen ? "rotate(180deg)" : "none",
//                 transition: "transform 0.2s ease",
//               }} />
//             </Flex>

//             {/* Sort */}
//             <Box flexShrink={0}>
//               <SortDropdown value={sortOrder} onChange={setSortOrder} />
//             </Box>

//             {/* Count */}
//             <Flex align="baseline" gap={1.5} ml={{ base: 0, md: "auto" }} flexShrink={0}>
//               <Text ref={counterRef}
//                 fontFamily="'Orbitron', sans-serif" fontWeight={800}
//                 fontSize="22px" color="#14b8a6">
//                 {filteredProjects.length}
//               </Text>
//               <Text fontFamily="'Sora', sans-serif" fontSize="10px"
//                 letterSpacing="0.12em" textTransform="uppercase" color={dimColor}>
//                 {filteredProjects.length === 1 ? "project" : "projects"}
//               </Text>
//             </Flex>
//           </Flex>

//           {/* Collapsible filter dropdowns */}
//           <AnimatePresence initial={false}>
//             {filtersOpen && (
//               <MotionBox key="panel"
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: "auto", opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
//                 overflow="hidden">
//                 <Box borderTop="1px solid" borderColor={borderColor}
//                   px={{ base: 4, md: 5 }} py={4}>
//                   <Flex gap={3} flexWrap="wrap">
//                     <FilterDropdown label="Tech Stack" LucideIcon={Layers}
//                       options={ALL_TECH} selected={techFilters}
//                       onChange={setTechFilters} accent="#14b8a6" />
//                     <FilterDropdown label="Use Case" LucideIcon={Tag}
//                       options={ALL_USECASES} selected={useCaseFilters}
//                       onChange={setUseCaseFilters} accent="#7c3aed" />
//                     <FilterDropdown label="Type" LucideIcon={LayoutGrid}
//                       options={ALL_TYPES} selected={typeFilters}
//                       onChange={setTypeFilters} accent="#ec4899" />
//                   </Flex>
//                   <AnimatePresence>
//                     {activeFilterCount > 0 && (
//                       <ActiveChips
//                         techFilters={techFilters} useCaseFilters={useCaseFilters}
//                         typeFilters={typeFilters} query={query}
//                         setTechFilters={setTechFilters} setUseCaseFilters={setUseCaseFilters}
//                         setTypeFilters={setTypeFilters} setQuery={setQuery}
//                       />
//                     )}
//                   </AnimatePresence>
//                 </Box>
//               </MotionBox>
//             )}
//           </AnimatePresence>
//         </Box>

//         {/* Grid */}
//         <AnimatePresence mode="wait">
//           {filteredProjects.length > 0 ? (
//             <SimpleGrid key="grid"
//               columns={{ base: 1, md: 2, xl: 3 }}
//               spacing={{ base: 4, md: 5 }} w="full">
//               {filteredProjects.map((p, i) => (
//                 <ProjectCard key={p.id} project={p} index={i}
//                   isHighlighted={p.id === highlightedId} />
//               ))}
//             </SimpleGrid>
//           ) : (
//             <MotionBox key="empty"
//               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//               w="full" py={20} textAlign="center">
//               <Text fontFamily="'Orbitron', sans-serif" fontSize="13px"
//                 letterSpacing="0.15em" color={dimColor} textTransform="uppercase">
//                 No projects match those filters
//               </Text>
//               <Text fontFamily="'JetBrains Mono', monospace" fontSize="10px"
//                 color={dimColor} mt={2} letterSpacing="0.1em" opacity={0.5}>
//                 try clearing some filters
//               </Text>
//             </MotionBox>
//           )}
//         </AnimatePresence>

//       </Flex>
//     </Box>
//   );
// }

// Projects.jsx
// Pill buttons for filters (Tech Stack, Use Case, Type) — original working approach
// Dropdown ONLY for Sort
// Collapsible filter panel · lucide-react icons · GSAP count-up
// Stack: React 18 + Chakra UI v2 + Framer Motion + GSAP



//TODO: Reduce the description and add modal on click to view more about the project 


import { useState, useRef, useEffect, useCallback } from "react";
import { Box, Flex, Text, Input, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { gsap } from "gsap";
import {
  Search, SlidersHorizontal, ChevronDown, ArrowUpDown,
  X, Check, Layers, Tag, LayoutGrid, Clock, ArrowDownAZ,
} from "lucide-react";

import { PROJECTS, ALL_TECH, ALL_USECASES, ALL_TYPES } from "./data/projects";

const MotionBox = motion.create(Box);

// ── Constants ─────────────────────────────────────────────────────────────────
const STATUS_META = {
  Live: { bg: "rgba(20,184,166,0.12)", border: "rgba(20,184,166,0.35)", color: "#14b8a6" },
  Beta: { bg: "rgba(232,197,71,0.12)", border: "rgba(232,197,71,0.35)", color: "#e8c547" },
  OSS:  { bg: "rgba(124,58,237,0.12)", border: "rgba(124,58,237,0.35)", color: "#7c3aed" },
};

const SORT_OPTIONS = [
  { value: "latest", label: "Latest first", Icon: Clock },
  { value: "oldest", label: "Oldest first", Icon: Clock },
  { value: "az",     label: "A → Z",        Icon: ArrowDownAZ },
];

// ── Search suggestions ────────────────────────────────────────────────────────
function getMatchingSuggestions(q) {
  if (!q || q.length < 2) return [];
  const lower = q.toLowerCase();
  return PROJECTS.filter(
    (p) =>
      p.title.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower) ||
      p.tagline.toLowerCase().includes(lower) ||
      p.techStack.some((t) => t.toLowerCase().includes(lower)) ||
      p.useCase.some((u) => u.toLowerCase().includes(lower))
  );
}

// ── Filter pill ───────────────────────────────────────────────────────────────
function FilterPill({ label, active, onClick, accent }) {
  const inactiveBorder = useColorModeValue("rgba(0,0,0,0.10)", "rgba(255,255,255,0.08)");
  const inactiveBg     = useColorModeValue("rgba(247,247,248,0.6)", "rgba(255,255,255,0.03)");
  const inactiveColor  = useColorModeValue("#6b7280", "rgba(255,255,255,0.4)");
  return (
    <MotionBox
      as="button"
      onClick={onClick}
      px={3} py={1}
      borderRadius="6px"
      border="1px solid"
      borderColor={active ? accent : inactiveBorder}
      bg={active ? `${accent}18` : inactiveBg}
      color={active ? accent : inactiveColor}
      fontFamily="'JetBrains Mono', monospace"
      fontSize="9px" letterSpacing="0.18em" textTransform="uppercase"
      cursor="pointer" whiteSpace="nowrap"
      whileTap={{ scale: 0.96 }}
      style={{ transition: "all 0.18s cubic-bezier(0.23,1,0.32,1)" }}
      _hover={{ borderColor: accent, color: accent, bg: `${accent}18` }}
    >
      {label}
    </MotionBox>
  );
}

// ── Filter pill group (label + All + options) ─────────────────────────────────
function FilterPillGroup({ label, LucideIcon, options, selected, onChange, accent }) {
  const dimCol = useColorModeValue("#9ca3af", "rgba(255,255,255,0.28)");
  return (
    <Box>
      <Flex align="center" gap={1.5} mb={2.5}>
        <LucideIcon size={10} color="text.dim" />
        <Text fontFamily="'JetBrains Mono', monospace" fontSize="8px"
          letterSpacing="0.22em" textTransform="uppercase" color="text.dim">
          {label}
        </Text>
      </Flex>
      <Flex flexWrap="wrap" gap={1.5}>
        <FilterPill
          label="All"
          active={selected.length === 0}
          onClick={() => onChange([])}
          accent={accent}
        />
        {options.map((o) => (
          <FilterPill
            key={o}
            label={o}
            active={selected.includes(o)}
            onClick={() =>
              onChange(
                selected.includes(o)
                  ? selected.filter((x) => x !== o)
                  : [...selected, o]
              )
            }
            accent={accent}
          />
        ))}
      </Flex>
    </Box>
  );
}

// ── Sort dropdown (the ONE dropdown in this component) ────────────────────────
function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const accent = "#14b8a6";

  const panelBg  = useColorModeValue("rgba(250,250,251,0.99)", "rgba(8,8,12,0.99)");
  const border   = useColorModeValue("rgba(0,0,0,0.09)", "rgba(255,255,255,0.08)");
  const textCol  = useColorModeValue("#111", "rgba(255,255,255,0.88)");
  const dimCol   = useColorModeValue("#6b7280", "rgba(255,255,255,0.35)");
  const rowHover = useColorModeValue("rgba(20,184,166,0.06)", "rgba(20,184,166,0.10)");
  const btnBg    = useColorModeValue("rgba(247,247,248,0.9)", "rgba(12,12,16,0.8)");
  const btnBorder = useColorModeValue("rgba(0,0,0,0.09)", "rgba(255,255,255,0.08)");

  // click-away
  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const current = SORT_OPTIONS.find((s) => s.value === value) || SORT_OPTIONS[0];

  return (
    <Box ref={ref} position="relative" userSelect="none">
      {/* Trigger */}
      <Flex
        as="button"
        align="center" gap={2}
        px={3} py={2}
        borderRadius="9px"
        border="1px solid" borderColor={btnBorder}
        bg={btnBg} backdropFilter="blur(10px)"
        color="text.dim" cursor="pointer"
        onClick={() => setOpen((o) => !o)}
        whiteSpace="nowrap"
        style={{ transition: "all 0.18s ease" }}
        _hover={{ borderColor: `${accent}40`, color: accent }}
      >
        <ArrowUpDown size={12} />
        <Text fontFamily="'JetBrains Mono', monospace" fontSize="9px"
          letterSpacing="0.16em" textTransform="uppercase">
          {current.label}
        </Text>
        <ChevronDown
          size={10}
          style={{
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.2s ease",
          }}
        />
      </Flex>

      {/* Panel — rendered in normal flow, zIndex handles layering */}
      <AnimatePresence>
        {open && (
          <MotionBox
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
            position="absolute"
            top="calc(100% + 8px)"
            right={0}
            zIndex={9999}
            minW="180px"
            bg={panelBg}
            backdropFilter="blur(24px)"
            border="1px solid" borderColor={border}
            borderRadius="13px"
            overflow="hidden"
            boxShadow="0 16px 48px rgba(0,0,0,0.35)"
          >
            <Box h="1px" bgGradient={`linear(to-r, transparent, ${accent}60, transparent)`} />
            {SORT_OPTIONS.map((opt, i) => {
              const isActive = value === opt.value;
              return (
                <Flex
                  key={opt.value}
                  as="button"
                  align="center" gap={3}
                  px={3} py={3}
                  w="full" cursor="pointer"
                  bg={isActive ? `${accent}0d` : "transparent"}
                  borderBottom={i < SORT_OPTIONS.length - 1 ? "1px solid" : "none"}
                  borderColor={border}
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  style={{ transition: "background 0.12s ease" }}
                  _hover={{ bg: isActive ? `${accent}18` : rowHover }}
                >
                  <opt.Icon size={12} color={isActive ? accent : dimCol} />
                  <Text
                    fontFamily="'Sora', sans-serif" fontSize="12px"
                    flex={1} textAlign="left"
                    color={isActive ? accent : textCol}
                    style={{ transition: "color 0.12s ease" }}
                  >
                    {opt.label}
                  </Text>
                  {isActive && <Check size={11} color={accent} />}
                </Flex>
              );
            })}
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
}

// ── Suggestion list ───────────────────────────────────────────────────────────
function SuggestionList({ suggestions, query, onSelect }) {
  const bg       = useColorModeValue("rgba(250,250,251,0.99)", "rgba(8,8,12,0.99)");
  const border   = useColorModeValue("rgba(0,0,0,0.09)", "rgba(255,255,255,0.08)");
  const textCol  = useColorModeValue("#111", "rgba(255,255,255,0.88)");
  const dimCol   = useColorModeValue("#6b7280", "rgba(255,255,255,0.35)");
  const rowHover = useColorModeValue("rgba(124,58,237,0.05)", "rgba(124,58,237,0.10)");

  if (!suggestions.length || !query) return null;

  return (
    <AnimatePresence>
      <MotionBox
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.15 }}
        position="absolute" top="calc(100% + 6px)" left={0} right={0}
        zIndex={9999}
        bg={bg} backdropFilter="blur(24px)"
        border="1px solid" borderColor={border}
        borderRadius="13px" overflow="hidden"
        boxShadow="0 16px 48px rgba(0,0,0,0.28)"
      >
        <Box h="1px" bgGradient="linear(to-r, transparent, #7c3aed55, transparent)" />
        {suggestions.map((s, i) => (
          <MotionBox
            key={s.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            px={4} py={3} cursor="pointer"
            borderBottom={i < suggestions.length - 1 ? "1px solid" : "none"}
            borderColor={border}
            onClick={() => onSelect(s)}
            style={{ transition: "background 0.12s ease" }}
            _hover={{ bg: rowHover }}
          >
            <Flex justify="space-between" align="center" gap={3}>
              <Flex align="center" gap={2.5}>
                <Box w="6px" h="6px" borderRadius="50%" bg={s.accent} flexShrink={0} />
                <Box>
                  <Text fontFamily="'Orbitron', sans-serif" fontSize="11px"
                    fontWeight={700} color={textCol} letterSpacing="0.02em">
                    {s.title}
                  </Text>
                  <Text fontFamily="'Sora', sans-serif" fontSize="10px"
                    color="text.dim" mt={0.5}>{s.tagline}</Text>
                </Box>
              </Flex>
              <Box px={2} py={0.5} borderRadius="4px"
                border="1px solid" borderColor={`${s.accent}40`}
                bg={`${s.accent}0e`} color={s.accent}
                fontFamily="'JetBrains Mono', monospace" fontSize="7px"
                letterSpacing="0.12em" textTransform="uppercase" flexShrink={0}>
                {s.type}
              </Box>
            </Flex>
          </MotionBox>
        ))}
      </MotionBox>
    </AnimatePresence>
  );
}

// ── Active chips ──────────────────────────────────────────────────────────────
function ActiveChips({ techFilters, useCaseFilters, typeFilters, query,
  setTechFilters, setUseCaseFilters, setTypeFilters, setQuery }) {
  const dimCol = useColorModeValue("#6b7280", "rgba(255,255,255,0.35)");
  const chips = [
    ...techFilters.map((v)    => ({ label: v, accent: "#14b8a6", onRemove: () => setTechFilters((p) => p.filter((x) => x !== v)) })),
    ...useCaseFilters.map((v) => ({ label: v, accent: "#7c3aed", onRemove: () => setUseCaseFilters((p) => p.filter((x) => x !== v)) })),
    ...typeFilters.map((v)    => ({ label: v, accent: "#ec4899", onRemove: () => setTypeFilters((p) => p.filter((x) => x !== v)) })),
    ...(query ? [{ label: `"${query}"`, accent: "#e8c547", onRemove: () => setQuery("") }] : []),
  ];
  if (!chips.length) return null;
  return (
    <Flex align="center" gap={2} flexWrap="wrap" pt={4}
      borderTop="1px solid" borderColor={useColorModeValue("rgba(0,0,0,0.06)", "rgba(255,255,255,0.05)")}>
      <Text fontFamily="'JetBrains Mono', monospace" fontSize="8px"
        letterSpacing="0.18em" textTransform="uppercase" color="text.dim" flexShrink={0}>
        Active:
      </Text>
      <AnimatePresence mode="popLayout">
        {chips.map((chip) => (
          <MotionBox key={chip.label} layout
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.15 }}>
            <Flex align="center" gap={1.5} px={2.5} py={1} borderRadius="6px"
              border="1px solid" borderColor={`${chip.accent}35`} bg={`${chip.accent}0e`}>
              <Text fontFamily="'JetBrains Mono', monospace" fontSize="9px"
                letterSpacing="0.1em" textTransform="uppercase" color={chip.accent}>
                {chip.label}
              </Text>
              <Box as="button" onClick={chip.onRemove} color={`${chip.accent}80`}
                cursor="pointer" display="flex" alignItems="center"
                _hover={{ color: chip.accent }} style={{ transition: "color 0.12s ease" }}>
                <X size={9} />
              </Box>
            </Flex>
          </MotionBox>
        ))}
      </AnimatePresence>
      <Box as="button"
        onClick={() => { setTechFilters([]); setUseCaseFilters([]); setTypeFilters([]); setQuery(""); }}
        px={2.5} py={1} borderRadius="6px"
        border="1px solid rgba(239,68,68,0.25)" bg="rgba(239,68,68,0.06)"
        color="rgba(239,68,68,0.7)"
        fontFamily="'JetBrains Mono', monospace" fontSize="8px"
        letterSpacing="0.15em" textTransform="uppercase" cursor="pointer"
        style={{ transition: "all 0.15s ease" }}
        _hover={{ bg: "rgba(239,68,68,0.12)", color: "rgba(239,68,68,1)" }}>
        Clear all
      </Box>
    </Flex>
  );
}

// ── Project card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, index, isHighlighted }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const cardBg    = useColorModeValue("rgba(247,247,248,0.92)", "rgba(10,10,10,0.82)");
  const border    = useColorModeValue("rgba(0,0,0,0.08)", "rgba(255,255,255,0.06)");
  const textColor = useColorModeValue("#111", "rgba(255,255,255,0.88)");
  const descColor = useColorModeValue("#4b5563", "rgba(255,255,255,0.5)");
  const statLabel = useColorModeValue("#9ca3af", "rgba(255,255,255,0.3)");

  const status = STATUS_META[project.status] || STATUS_META.Live;

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.52, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
      position="relative" role="group" h="full"
    >
      <Box
        position="relative" bg={cardBg} backdropFilter="blur(16px)"
        border="1px solid"
        borderColor={isHighlighted ? project.accent : border}
        borderRadius="16px" overflow="hidden"
        p={{ base: 5, md: 6 }} h="full"
        style={{
          transition: "border-color 0.25s ease, box-shadow 0.25s ease",
          boxShadow: isHighlighted ? `0 0 0 1px ${project.accent}40` : "none",
        }}
        _groupHover={{ borderColor: project.accent, boxShadow: `0 0 28px ${project.accent}1a` }}
      >
        {/* Top hairline */}
        <Box position="absolute" top={0} left={0} right={0} h="1px"
          bgGradient={`linear(to-r, transparent, ${project.accent}55, transparent)`} />

        {/* Corner brackets */}
        {[
          { top: "10px",    left: "10px",  borderTop: "2px solid",    borderLeft: "2px solid" },
          { top: "10px",    right: "10px", borderTop: "2px solid",    borderRight: "2px solid" },
          { bottom: "10px", left: "10px",  borderBottom: "2px solid", borderLeft: "2px solid" },
          { bottom: "10px", right: "10px", borderBottom: "2px solid", borderRight: "2px solid" },
        ].map((s, i) => (
          <Box key={i} position="absolute" w="14px" h="14px"
            borderColor="rgba(124,58,237,0.25)" opacity={0}
            _groupHover={{ opacity: 1 }}
            style={{ transition: "opacity 0.2s ease", ...s }} />
        ))}

        {/* Status row */}
        <Flex align="center" gap={2} mb={2}>
          <Box w="6px" h="6px" borderRadius="50%" bg={project.accent}
            boxShadow={`0 0 6px ${project.accent}`} />
          <Box px={2} py={0.5} borderRadius="5px" border="1px solid"
            borderColor={status.border} bg={status.bg} color={status.color}
            fontFamily="'JetBrains Mono', monospace" fontSize="8px"
            letterSpacing="0.18em" textTransform="uppercase">
            {project.status}
          </Box>
          <Text fontFamily="'JetBrains Mono', monospace" fontSize="9px"
            color={statLabel} letterSpacing="0.12em">{project.year}</Text>
        </Flex>

        {/* Title + type badge */}
        <Flex justify="space-between" align="flex-start" mb={3}>
          <Box>
            <Text fontFamily="'Orbitron', sans-serif" fontWeight={800}
              fontSize={{ base: "15px", md: "17px" }} letterSpacing="-0.01em"
              color={textColor}
              _groupHover={{ color: project.accent }}
              style={{ transition: "color 0.2s ease" }}>
              {project.title}
            </Text>
            <Text fontFamily="'Sora', sans-serif" fontSize="11px"
              color={descColor} mt={0.5}>{project.tagline}</Text>
          </Box>
          <Box px={2.5} py={1} borderRadius="6px" border="1px solid"
            borderColor={`${project.accent}35`} bg={`${project.accent}10`}
            color={project.accent} fontFamily="'JetBrains Mono', monospace"
            fontSize="8px" letterSpacing="0.2em" textTransform="uppercase"
            flexShrink={0} ml={2}>
            {project.type}
          </Box>
        </Flex>

        {/* Description */}
        <Text fontFamily="'Sora', sans-serif"
          fontSize={{ base: "12px", md: "13px" }}
          color={descColor} lineHeight={1.7} mb={4}>
          {project.description}
        </Text>

        {/* Metrics */}
        <Flex gap={6} mb={4}>
          {project.metrics.map((m) => (
            <Box key={m.label}>
              <Text fontFamily="'Orbitron', sans-serif" fontWeight={800}
                fontSize={{ base: "18px", md: "22px" }} color={project.accent}
                _groupHover={{ textShadow: `0 0 20px ${project.accent}` }}
                style={{ transition: "text-shadow 0.25s ease" }}>
                {m.value}
              </Text>
              <Text fontFamily="'Sora', sans-serif" fontSize="10px"
                letterSpacing="0.12em" textTransform="uppercase" color={statLabel}>
                {m.label}
              </Text>
            </Box>
          ))}
        </Flex>

        <Box h="1px" bgGradient="linear(to-r, transparent, rgba(124,58,237,0.3), transparent)" mb={4} />

        {/* Tech pills */}
        <Flex flexWrap="wrap" gap={1.5} mb={3}>
          {project.techStack.map((t) => (
            <Box key={t} px={2} py={0.5} borderRadius="5px"
              border="1px solid" borderColor="rgba(255,255,255,0.07)"
              bg="rgba(255,255,255,0.03)" color={descColor}
              fontFamily="'JetBrains Mono', monospace" fontSize="8px"
              letterSpacing="0.12em" textTransform="uppercase">{t}</Box>
          ))}
        </Flex>

        {/* Use case pills */}
        <Flex flexWrap="wrap" gap={1.5} mb={4}>
          {project.useCase.map((u) => (
            <Box key={u} px={2} py={0.5} borderRadius="5px"
              border="1px solid" borderColor={`${project.accent}28`}
              bg={`${project.accent}08`} color={project.accent}
              fontFamily="'JetBrains Mono', monospace" fontSize="8px"
              letterSpacing="0.12em" textTransform="uppercase">{u}</Box>
          ))}
        </Flex>

        {/* What I learned */}
        {project.learnt && (
          <Box mb={4} px={3} py={2.5} borderRadius="8px"
            border="1px solid" borderColor={`${project.accent}20`}
            bg={`${project.accent}07`}>
            <Text fontFamily="'JetBrains Mono', monospace" fontSize="7px"
              letterSpacing="0.18em" textTransform="uppercase"
              color={`${project.accent}80`} mb={1}>
              What I learned
            </Text>
            <Text fontFamily="'Sora', sans-serif" fontSize="11px"
              color={descColor} fontStyle="italic" lineHeight={1.6}>
              {project.learnt}
            </Text>
          </Box>
        )}

        {/* CTAs */}
        <Flex gap={2} flexWrap="wrap">
          <MotionBox as="a" href={project.url}
            display="inline-flex" alignItems="center" gap={2}
            px={4} py={2} borderRadius="8px" border="1px solid"
            borderColor={`${project.accent}35`} bg={`${project.accent}10`}
            color={project.accent} fontFamily="'JetBrains Mono', monospace"
            fontSize="9px" letterSpacing="0.18em" textTransform="uppercase"
            cursor="pointer" textDecoration="none"
            whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
            style={{ transition: "all 0.18s cubic-bezier(0.23,1,0.32,1)" }}>
            View Project <Box as="span" fontSize="12px">→</Box>
          </MotionBox>
          {project.github && (
            <MotionBox as="a" href={project.github} target="_blank"
              display="inline-flex" alignItems="center" gap={2}
              px={4} py={2} borderRadius="8px" border="1px solid"
              borderColor="rgba(255,255,255,0.08)" bg="rgba(255,255,255,0.03)"
              color={descColor} fontFamily="'JetBrains Mono', monospace"
              fontSize="9px" letterSpacing="0.18em" textTransform="uppercase"
              cursor="pointer" textDecoration="none"
              whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
              style={{ transition: "all 0.18s cubic-bezier(0.23,1,0.32,1)" }}>
              GitHub <Box as="span" fontSize="11px">↗</Box>
            </MotionBox>
          )}
        </Flex>
      </Box>
    </MotionBox>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Projects() {
  const [query, setQuery]                   = useState("");
  const [techFilters, setTechFilters]       = useState([]);
  const [useCaseFilters, setUseCaseFilters] = useState([]);
  const [typeFilters, setTypeFilters]       = useState([]);
  const [suggestions, setSuggestions]       = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedId, setHighlightedId]   = useState(null);
  const [sortOrder, setSortOrder]           = useState("latest");
  const [filtersOpen, setFiltersOpen]       = useState(true);

  const searchRef  = useRef(null);
  const counterRef = useRef(null);
  const prevCount  = useRef(0);

  const panelBg   = useColorModeValue("rgba(247,247,248,0.90)", "rgba(10,10,10,0.80)");
  const borderCol = useColorModeValue("rgba(0,0,0,0.08)", "rgba(255,255,255,0.06)");
  const dimColor  = useColorModeValue("#9ca3af", "rgba(255,255,255,0.28)");
  const textColor = useColorModeValue("#111", "rgba(255,255,255,0.88)");
  const inputBg   = useColorModeValue("rgba(255,255,255,0.85)", "rgba(255,255,255,0.04)");
  const line2Col  = useColorModeValue("#2a2a2a", "rgba(255,255,255,0.18)");

  // Filtered + sorted projects
  const filteredProjects = PROJECTS.filter((p) => {
    const q = query.toLowerCase();
    const matchesQuery = !q
      || p.title.toLowerCase().includes(q)
      || p.description.toLowerCase().includes(q)
      || p.tagline.toLowerCase().includes(q)
      || p.techStack.some((t) => t.toLowerCase().includes(q))
      || p.useCase.some((u) => u.toLowerCase().includes(q));
    const matchesTech = techFilters.length === 0 || techFilters.every((t) => p.techStack.includes(t));
    const matchesUse  = useCaseFilters.length === 0 || useCaseFilters.some((u) => p.useCase.includes(u));
    const matchesType = typeFilters.length === 0 || typeFilters.includes(p.type);
    return matchesQuery && matchesTech && matchesUse && matchesType;
  }).sort((a, b) => {
    if (sortOrder === "latest") return parseInt(b.year) - parseInt(a.year);
    if (sortOrder === "oldest") return parseInt(a.year) - parseInt(b.year);
    if (sortOrder === "az")     return a.title.localeCompare(b.title);
    return 0;
  });

  // GSAP count-up
  useEffect(() => {
    if (!counterRef.current) return;
    const target = filteredProjects.length;
    const obj = { val: prevCount.current };
    gsap.to(obj, {
      val: target, duration: 0.5, ease: "power2.out", snap: { val: 1 },
      onUpdate() {
        if (counterRef.current) counterRef.current.textContent = Math.round(obj.val);
      },
    });
    prevCount.current = target;
  }, [filteredProjects.length]);

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setSuggestions(getMatchingSuggestions(val));
    setShowSuggestions(true);
    setHighlightedId(null);
  };

  const handleSelectSuggestion = useCallback((project) => {
    setQuery(project.title);
    setShowSuggestions(false);
    setSuggestions([]);
    setHighlightedId(project.id);
    setTimeout(() => setHighlightedId(null), 2000);
  }, []);

  // Click-away for search suggestions
  useEffect(() => {
    const h = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setShowSuggestions(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const activeFilterCount =
    techFilters.length + useCaseFilters.length + typeFilters.length + (query ? 1 : 0);

  return (
    <Box as="section" bg="transparent"
      px={{ base: 5, md: 12, lg: 20 }}
      py={{ base: 20, md: 16 }}>
      <Flex direction="column" align="flex-start" w="full" maxW="1200px" mx="auto" gap={8}>

        {/* ── Section header ── */}
        <Box mb={2}>
          <Flex align="center" gap={3} mb={3}>
            <Box w="24px" h="1px" bgGradient="linear(to-r, #ec4899, #7c3aed)" flexShrink={0} />
            <Text fontFamily="'JetBrains Mono', monospace" fontSize="9px"
              letterSpacing="0.3em" textTransform="uppercase" color={dimColor}>
              Selected Work
            </Text>
          </Flex>
          <Text fontFamily="'Orbitron', sans-serif" fontWeight={900}
            fontSize={{ base: "26px", md: "clamp(26px, 4vw, 40px)" }}
            letterSpacing="-0.02em" lineHeight={1.05}
            bgGradient="linear(to-r, #1e40af, #7c3aed, #ec4899)"
            bgClip="text" display="inline-block" w="fit-content">
            Projects that
          </Text>
          <Text fontFamily="'Orbitron', sans-serif" fontWeight={900}
            fontSize={{ base: "26px", md: "clamp(26px, 4vw, 40px)" }}
            letterSpacing="-0.02em" lineHeight={1.05} color={line2Col}>
            ship and scale.
          </Text>
        </Box>

        {/* ── Filter bar ── */}
        {/* overflow:visible is critical — lets the sort dropdown escape the card */}
        <Box w="full" bg={panelBg} backdropFilter="blur(16px)"
          border="1px solid" borderColor={borderCol}
          borderRadius="16px"
          overflow="visible"
          position="relative">

          {/* Top hairline */}
          <Box position="absolute" top={0} left={0} right={0} h="1px"
            borderRadius="16px 16px 0 0"
            bgGradient="linear(to-r, transparent, rgba(124,58,237,0.35), transparent)"
            pointerEvents="none" />

          {/* ── Control row: search · filters toggle · sort · count ── */}
          <Flex align="center" gap={3} px={{ base: 4, md: 5 }} py={4} flexWrap="wrap">

            {/* Search */}
            <Box ref={searchRef} flex={1} minW="200px" position="relative">
              <Flex align="center" gap={2.5} px={3.5} py={2.5}
                borderRadius="10px" border="1px solid" borderColor={borderCol}
                bg={inputBg} backdropFilter="blur(8px)"
                style={{ transition: "border-color 0.18s ease, box-shadow 0.18s ease" }}
                _focusWithin={{ borderColor: "rgba(124,58,237,0.5)", boxShadow: "0 0 0 1px rgba(124,58,237,0.2)" }}>
                <Box color={dimColor} display="flex" alignItems="center" flexShrink={0}>
                  <Search size={13} />
                </Box>
                <Input
                  value={query}
                  onChange={handleQueryChange}
                  onFocus={() => suggestions.length && setShowSuggestions(true)}
                  placeholder="Search by title, tech, use case…"
                  variant="unstyled"
                  fontFamily="'Sora', sans-serif" fontSize="13px" color={textColor}
                  _placeholder={{ color: dimColor, fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.06em" }}
                />
                {query && (
                  <Box as="button"
                    onClick={() => { setQuery(""); setSuggestions([]); }}
                    color={dimColor} display="flex" alignItems="center"
                    cursor="pointer" _hover={{ color: textColor }}
                    style={{ transition: "color 0.12s ease" }}>
                    <X size={12} />
                  </Box>
                )}
              </Flex>
              {showSuggestions && (
                <SuggestionList
                  suggestions={suggestions}
                  query={query}
                  onSelect={handleSelectSuggestion}
                />
              )}
            </Box>

            {/* Divider */}
            <Box w="1px" h="26px" bg={borderCol}
              display={{ base: "none", md: "block" }} flexShrink={0} />

            {/* Filters toggle */}
            <Flex as="button" align="center" gap={2} px={3} py={2}
              borderRadius="9px" border="1px solid"
              borderColor={filtersOpen ? "rgba(124,58,237,0.4)" : borderCol}
              bg={filtersOpen ? "rgba(124,58,237,0.08)" : "transparent"}
              color={filtersOpen ? "#7c3aed" : dimColor}
              cursor="pointer" onClick={() => setFiltersOpen((o) => !o)}
              whiteSpace="nowrap" flexShrink={0}
              style={{ transition: "all 0.18s ease" }}
              _hover={{ borderColor: "rgba(124,58,237,0.35)", color: "#7c3aed" }}>
              <SlidersHorizontal size={12} />
              <Text fontFamily="'JetBrains Mono', monospace" fontSize="9px"
                letterSpacing="0.16em" textTransform="uppercase">Filters</Text>
              {activeFilterCount > 0 && (
                <Flex w="16px" h="16px" borderRadius="50%" bg="#7c3aed" color="white"
                  align="center" justify="center"
                  fontFamily="'JetBrains Mono', monospace" fontSize="8px" fontWeight={700}>
                  {activeFilterCount}
                </Flex>
              )}
              <ChevronDown size={10} style={{
                transform: filtersOpen ? "rotate(180deg)" : "none",
                transition: "transform 0.2s ease",
              }} />
            </Flex>

            {/* Sort dropdown — only dropdown in this component */}
            <Box flexShrink={0}>
              <SortDropdown value={sortOrder} onChange={setSortOrder} />
            </Box>

            {/* Result count */}
            <Flex align="baseline" gap={1.5} ml={{ base: 0, md: "auto" }} flexShrink={0}>
              <Text ref={counterRef}
                fontFamily="'Orbitron', sans-serif" fontWeight={800}
                fontSize="22px" color="#14b8a6">
                {filteredProjects.length}
              </Text>
              <Text fontFamily="'Sora', sans-serif" fontSize="10px"
                letterSpacing="0.12em" textTransform="uppercase" color={dimColor}>
                {filteredProjects.length === 1 ? "project" : "projects"}
              </Text>
            </Flex>
          </Flex>

          {/* ── Collapsible pill filter panel ── */}
          <AnimatePresence initial={false}>
            {filtersOpen && (
              <MotionBox
                key="pill-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
                overflow="hidden"
              >
                <Box borderTop="1px solid" borderColor={borderCol}
                  px={{ base: 4, md: 5 }} py={5}>
                  <Flex direction="column" gap={5}>
                    <FilterPillGroup
                      label="Tech Stack"
                      LucideIcon={Layers}
                      options={ALL_TECH}
                      selected={techFilters}
                      onChange={setTechFilters}
                      accent="#14b8a6"
                    />
                    <FilterPillGroup
                      label="Use Case"
                      LucideIcon={Tag}
                      options={ALL_USECASES}
                      selected={useCaseFilters}
                      onChange={setUseCaseFilters}
                      accent="#7c3aed"
                    />
                    <FilterPillGroup
                      label="Type"
                      LucideIcon={LayoutGrid}
                      options={ALL_TYPES}
                      selected={typeFilters}
                      onChange={setTypeFilters}
                      accent="#ec4899"
                    />
                  </Flex>

                  {/* Active chips */}
                  <AnimatePresence>
                    {activeFilterCount > 0 && (
                      <ActiveChips
                        techFilters={techFilters}
                        useCaseFilters={useCaseFilters}
                        typeFilters={typeFilters}
                        query={query}
                        setTechFilters={setTechFilters}
                        setUseCaseFilters={setUseCaseFilters}
                        setTypeFilters={setTypeFilters}
                        setQuery={setQuery}
                      />
                    )}
                  </AnimatePresence>
                </Box>
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>

        {/* ── Project grid ── */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <SimpleGrid key="grid"
              columns={{ base: 1, md: 2, xl: 3 }}
              spacing={{ base: 4, md: 5 }} w="full">
              {filteredProjects.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i}
                  isHighlighted={p.id === highlightedId} />
              ))}
            </SimpleGrid>
          ) : (
            <MotionBox key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              w="full" py={20} textAlign="center">
              <Text fontFamily="'Orbitron', sans-serif" fontSize="13px"
                letterSpacing="0.15em" color={dimColor} textTransform="uppercase">
                No projects match those filters
              </Text>
              <Text fontFamily="'JetBrains Mono', monospace" fontSize="10px"
                color={dimColor} mt={2} letterSpacing="0.1em" opacity={0.5}>
                try clearing some filters
              </Text>
            </MotionBox>
          )}
        </AnimatePresence>

      </Flex>
    </Box>
  );
}