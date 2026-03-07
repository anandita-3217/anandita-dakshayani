
// // import { useState, useRef } from 'react';
// // import { Box, Text, HStack, VStack, Badge, Button, Flex, chakra } from '@chakra-ui/react';
// // import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
// // import { useInView } from 'react-intersection-observer';
// // import { Github, ExternalLink, ChevronRight } from 'lucide-react';

// // const MotionBox = motion.create(Box);

// // const H    = 'Orbitron, sans-serif';
// // const B    = 'Sora, sans-serif';
// // const GRAD = 'linear(to-r, #1e40af, #7c3aed, #ec4899)';
// // const TEAL = '#14b8a6';

// // const categories = [
// //   { id: 'all',    label: 'All',   color: TEAL      },
// //   { id: 'web',    label: 'Web',   color: '#667eea' },
// //   { id: 'game',   label: 'Games', color: '#f093fb' },
// //   { id: 'design', label: 'UI/UX', color: '#4facfe' },
// //   { id: 'tool',   label: 'Tools', color: '#68d391' },
// // ];

// // const learningProjects = [
// //   {
// //     id: 1,
// //     title: 'Noracle',
// //     description: 'Ask the chatbot any question and it finds reasons to not do it.',
// //     category: 'web',
// //     techStack: ['NextJS', 'Vercel'],
// //     color: '#667eea',
// //     emoji: '🚫',
// //     githubUrl: 'https://github.com/anandita-3217/Noracle',
// //     liveUrl: '#',
// //     funFact: 'Spent 3 days making a chatbot that will make your blood boil.',
// //     index: '01',
// //   },
// //   {
// //     id: 2,
// //     title: 'Retro Snake Game',
// //     description: 'Classic snake from scratch — neon colours and dubstep vibes.',
// //     category: 'game',
// //     techStack: ['Canvas API', 'JavaScript', 'Game Logic'],
// //     color: '#f093fb',
// //     emoji: '🐍',
// //     githubUrl: '#',
// //     liveUrl: '#',
// //     funFact: 'My high score is embarrassingly low.',
// //     index: '02',
// //   },
// //   {
// //     id: 3,
// //     title: 'GitHub User Finder',
// //     description: "Find any GitHub user's stats with just their username.",
// //     category: 'tool',
// //     techStack: ['React', 'GitHub API', 'REST API'],
// //     color: '#4a90d9',
// //     emoji: '🔍',
// //     githubUrl: '#',
// //     liveUrl: '#',
// //     funFact: 'Stalk anyone on GitHub. Clipboard copy coming soon.',
// //     index: '03',
// //   },
// //   {
// //     id: 4,
// //     title: 'Glassmorphism Generator',
// //     description: 'Generate glass-effect cards live. Used on this very site.',
// //     category: 'tool',
// //     techStack: ['React', 'CSS', 'Design Systems'],
// //     color: '#4facfe',
// //     emoji: '✨',
// //     githubUrl: '#',
// //     liveUrl: '#',
// //     funFact: 'Meta: I used it to style this portfolio.',
// //     index: '04',
// //   },
// //   {
// //     id: 5,
// //     title: 'Wordle Clone',
// //     description: 'Infinite Wordle challenges running locally via Electron.',
// //     category: 'game',
// //     techStack: ['JavaScript', 'Electron', 'DOM'],
// //     color: '#f093fb',
// //     emoji: '⌨️',
// //     githubUrl: 'https://github.com/anandita-3217/WordGame',
// //     liveUrl: '#',
// //     funFact: 'I wasted an embarrassing amount of time playing this.',
// //     index: '05',
// //   },
// //   {
// //     id: 6,
// //     title: 'Meme Generator',
// //     description: 'Create dank memes with custom text. Essential developer toolkit.',
// //     category: 'web',
// //     techStack: ['React', 'Canvas', 'Imgflip API'],
// //     color: '#667eea',
// //     emoji: '😂',
// //     githubUrl: '#',
// //     liveUrl: '#',
// //     funFact: 'Made 50+ memes about semicolons.',
// //     index: '06',
// //   },
// // ];

// // // ── Single full-width row ─────────────────────────────────────────────────────
// // const ProjectRow = ({ project, rowIndex }) => {
// //   const [expanded, setExpanded] = useState(false);
// //   const [hovered, setHovered]   = useState(false);
// //   const rowRef = useRef(null);
// //   const cat    = categories.find(c => c.id === project.category);

// //   const { scrollYProgress } = useScroll({
// //     target: rowRef,
// //     offset: ['start 0.95', 'start 0.35'],
// //   });
// //   const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
// //   const x       = useTransform(scrollYProgress, [0, 1], [rowIndex % 2 === 0 ? -40 : 40, 0]);

// //   return (
// //     <MotionBox
// //       ref={rowRef}
// //       style={{ opacity, x }}
// //     >
// //       <Box
// //         position="relative"
// //         borderBottom="1px solid"
// //         borderColor={hovered ? `${project.color}40` : 'rgba(255,255,255,0.06)'}
// //         transition="border-color 0.4s"
// //         overflow="hidden"
// //         onMouseEnter={() => setHovered(true)}
// //         onMouseLeave={() => setHovered(false)}
// //         onClick={() => setExpanded(e => !e)}
// //         cursor="pointer"
// //       >
// //         {/* Hover background fill — slides in from left */}
// //         <Box
// //           position="absolute" inset={0}
// //           bg={`${project.color}08`}
// //           transform={hovered ? 'scaleX(1)' : 'scaleX(0)'}
// //           transformOrigin="left"
// //           transition="transform 0.5s cubic-bezier(0.23,1,0.32,1)"
// //           pointerEvents="none"
// //         />

// //         {/* Left accent bar */}
// //         <Box
// //           position="absolute" left={0} top={0} bottom={0} w="2px"
// //           bg={project.color}
// //           transform={hovered || expanded ? 'scaleY(1)' : 'scaleY(0)'}
// //           transformOrigin="top"
// //           transition="transform 0.4s cubic-bezier(0.23,1,0.32,1)"
// //         />

// //         {/* Main row content */}
// //         <Flex
// //           align="center"
// //           px={{ base: 5, md: 8 }}
// //           py={{ base: 5, md: 6 }}
// //           gap={{ base: 4, md: 8 }}
// //           position="relative" zIndex={1}
// //         >
// //           {/* Index */}
// //           <Text
// //             fontFamily={H}
// //             fontSize="11px"
// //             letterSpacing="0.2em"
// //             color={hovered ? project.color : 'rgba(255,255,255,0.18)'}
// //             transition="color 0.3s"
// //             flexShrink={0}
// //             w="28px"
// //           >
// //             {project.index}
// //           </Text>

// //           {/* Emoji */}
// //           <Text
// //             fontSize={{ base: '22px', md: '28px' }}
// //             flexShrink={0}
// //             style={{
// //               transform: hovered ? 'scale(1.2) rotate(8deg)' : 'scale(1)',
// //               transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
// //               display: 'inline-block',
// //             }}
// //           >
// //             {project.emoji}
// //           </Text>

// //           {/* Title */}
// //           <Text
// //             fontFamily={H}
// //             fontSize={{ base: '15px', md: '20px', lg: '24px' }}
// //             fontWeight="800"
// //             letterSpacing="-0.02em"
// //             color={hovered ? 'white' : 'rgba(255,255,255,0.75)'}
// //             transition="color 0.3s"
// //             flex="0 0 auto"
// //             minW={{ base: '120px', md: '200px' }}
// //           >
// //             {project.title}
// //           </Text>

// //           {/* Description — hidden on mobile, visible md+ */}
// //           <Text
// //             display={{ base: 'none', md: 'block' }}
// //             fontFamily={B}
// //             fontSize="13px"
// //             color="rgba(255,255,255,0.38)"
// //             flex={1}
// //             noOfLines={1}
// //           >
// //             {project.description}
// //           </Text>

// //           {/* Tags — right side */}
// //           <Flex gap={1.5} flexShrink={0} display={{ base: 'none', lg: 'flex' }}>
// //             {project.techStack.slice(0, 2).map(t => (
// //               <Badge
// //                 key={t}
// //                 fontFamily={H} fontSize="8px" letterSpacing="0.1em"
// //                 textTransform="uppercase" px={2} py={0.5} borderRadius="5px"
// //                 bg="transparent" border="1px solid"
// //                 borderColor={hovered ? `${project.color}45` : 'rgba(255,255,255,0.08)'}
// //                 color={hovered ? project.color : 'rgba(255,255,255,0.25)'}
// //                 transition="all 0.3s"
// //               >
// //                 {t}
// //               </Badge>
// //             ))}
// //           </Flex>

// //           {/* Category pill */}
// //           <Badge
// //             fontFamily={H} fontSize="8px" letterSpacing="0.12em"
// //             textTransform="uppercase" px={2} py={1} borderRadius="6px"
// //             bg={`${cat?.color ?? TEAL}14`}
// //             color={cat?.color ?? TEAL}
// //             border="1px solid" borderColor={`${cat?.color ?? TEAL}30`}
// //             flexShrink={0}
// //             display={{ base: 'none', sm: 'block' }}
// //           >
// //             {cat?.label}
// //           </Badge>

// //           {/* Chevron */}
// //           <Box
// //             flexShrink={0}
// //             color={hovered ? project.color : 'rgba(255,255,255,0.2)'}
// //             transition="all 0.3s"
// //             style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
// //           >
// //             <ChevronRight size={16} />
// //           </Box>
// //         </Flex>

// //         {/* Expanded panel */}
// //         <AnimatePresence>
// //           {expanded && (
// //             <motion.div
// //               initial={{ height: 0, opacity: 0 }}
// //               animate={{ height: 'auto', opacity: 1 }}
// //               exit={{ height: 0, opacity: 0 }}
// //               transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
// //               style={{ overflow: 'hidden' }}
// //             >
// //               <Flex
// //                 px={{ base: 5, md: 8 }}
// //                 pb={6}
// //                 pt={2}
// //                 gap={8}
// //                 flexWrap="wrap"
// //                 borderTop="1px solid rgba(255,255,255,0.04)"
// //                 position="relative" zIndex={1}
// //               >
// //                 {/* Description */}
// //                 <Box flex={1} minW="200px">
// //                   <Text
// //                     fontFamily={H} fontSize="8px" letterSpacing="0.25em"
// //                     textTransform="uppercase" color="rgba(255,255,255,0.25)" mb={2}
// //                   >
// //                     About
// //                   </Text>
// //                   <Text fontFamily={B} fontSize="13px" color="rgba(255,255,255,0.55)" lineHeight={1.75}>
// //                     {project.description}
// //                   </Text>
// //                 </Box>

// //                 {/* Fun fact */}
// //                 <Box flex={1} minW="200px">
// //                   <Text
// //                     fontFamily={H} fontSize="8px" letterSpacing="0.25em"
// //                     textTransform="uppercase" color="rgba(255,255,255,0.25)" mb={2}
// //                   >
// //                     Fun Fact ✦
// //                   </Text>
// //                   <Text
// //                     fontFamily={B} fontSize="13px" lineHeight={1.75}
// //                     color={project.color} opacity={0.85}
// //                   >
// //                     {project.funFact}
// //                   </Text>
// //                 </Box>

// //                 {/* All tech tags */}
// //                 <Box flex={1} minW="200px">
// //                   <Text
// //                     fontFamily={H} fontSize="8px" letterSpacing="0.25em"
// //                     textTransform="uppercase" color="rgba(255,255,255,0.25)" mb={2}
// //                   >
// //                     Stack
// //                   </Text>
// //                   <Flex flexWrap="wrap" gap={1.5}>
// //                     {project.techStack.map(t => (
// //                       <Badge
// //                         key={t}
// //                         fontFamily={B} fontSize="11px" px={3} py={1} borderRadius="8px"
// //                         bg={`${project.color}12`} color={project.color}
// //                         border="1px solid" borderColor={`${project.color}30`}
// //                       >
// //                         {t}
// //                       </Badge>
// //                     ))}
// //                   </Flex>
// //                 </Box>

// //                 {/* Links */}
// //                 <Flex gap={3} alignItems="flex-end" flexShrink={0}>
// //                   <Button
// //                     as="a" href={project.githubUrl} target="_blank"
// //                     leftIcon={<Github size={13} />} size="sm"
// //                     fontFamily={H} fontSize="9px" letterSpacing="0.12em"
// //                     bg={`${project.color}14`} color={project.color}
// //                     border="1px solid" borderColor={`${project.color}35`}
// //                     _hover={{ bg: `${project.color}24`, transform: 'translateY(-1px)' }}
// //                     transition="all 0.2s"
// //                     onClick={e => e.stopPropagation()}
// //                   >
// //                     Code
// //                   </Button>
// //                   <Button
// //                     as="a" href={project.liveUrl} target="_blank"
// //                     leftIcon={<ExternalLink size={13} />} size="sm"
// //                     fontFamily={H} fontSize="9px" letterSpacing="0.12em"
// //                     bg="rgba(255,255,255,0.04)" color="rgba(255,255,255,0.4)"
// //                     border="1px solid" borderColor="rgba(255,255,255,0.09)"
// //                     _hover={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)', transform: 'translateY(-1px)' }}
// //                     transition="all 0.2s"
// //                     onClick={e => e.stopPropagation()}
// //                   >
// //                     Demo
// //                   </Button>
// //                 </Flex>
// //               </Flex>
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //       </Box>
// //     </MotionBox>
// //   );
// // };

// // // ── Animation variants ────────────────────────────────────────────────────────
// // const headerVariants   = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
// // const statsVariants    = { hidden: { opacity: 0, scale: 0.82 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: 'backOut' } } };
// // const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } } };

// // // ── Main ──────────────────────────────────────────────────────────────────────
// // export default function Learning() {
// //   const [selectedCategory, setSelectedCategory] = useState('all');
// //   const [headerRef, headerInView] = useInView({ triggerOnce: false, threshold: 0.2 });

// //   const filtered = selectedCategory === 'all'
// //     ? learningProjects
// //     : learningProjects.filter(p => p.category === selectedCategory);

// //   return (
// //     <Box bg="transparent" py={{ base: 4, md: 6 }} position="relative">

// //       {/* Ambient glow */}
// //       <MotionBox
// //         position="absolute" top="5%" left="3%" w="280px" h="280px"
// //         bgGradient="radial(circle, rgba(124,58,237,0.09), transparent)"
// //         filter="blur(70px)" pointerEvents="none"
// //         animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
// //         transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
// //       />

// //       <VStack spacing={12} align="stretch" position="relative" zIndex={1}>

// //         {/* ── Header ─────────────────────────────────────────────────────── */}
// //         <VStack spacing={6} textAlign="center">
// //           <MotionBox ref={headerRef} initial="hidden" animate={headerInView ? 'visible' : 'hidden'} variants={headerVariants}>
// //             <Text
// //               fontFamily={H}
// //               fontSize={{ base: '26px', md: '42px' }}
// //               fontWeight="900"
// //               letterSpacing="-0.02em"
// //               lineHeight={1.05}
// //               bgGradient={GRAD}
// //               bgClip="text"
// //             >
// //               Learning &amp; Experiments
// //             </Text>
// //           </MotionBox>

// //           <MotionBox
// //             initial={{ opacity: 0, y: 12 }}
// //             animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
// //             transition={{ duration: 0.5, delay: 0.4 }}
// //           >
// //             <Text fontFamily={B} fontSize="14px" color="whiteAlpha.400" maxW="460px" mx="auto">
// //               Side projects built for learning, experimenting, and having fun.
// //               No pressure — just vibes and good code. ✨
// //             </Text>
// //           </MotionBox>

// //           {/* Stats */}
// //           <MotionBox
// //             as={HStack} spacing={{ base: 8, md: 14 }} pt={2} flexWrap="wrap" justify="center"
// //             initial="hidden" animate={headerInView ? 'visible' : 'hidden'} variants={staggerContainer}
// //           >
// //             {[
// //               { value: learningProjects.length, label: 'Projects',       color: TEAL      },
// //               { value: '∞',                     label: 'Things Learned',  color: '#a855f7' },
// //               { value: '100%',                  label: 'Fun Factor',      color: '#3b82f6' },
// //             ].map(({ value, label, color }) => (
// //               <MotionBox key={label} variants={statsVariants}>
// //                 <VStack spacing={0}>
// //                   <Text
// //                     fontFamily={H} fontWeight="900" lineHeight={1}
// //                     fontSize={{ base: '28px', md: '36px' }}
// //                     style={{ background: `linear-gradient(135deg, ${color}, ${color}55)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
// //                   >
// //                     {value}
// //                   </Text>
// //                   <Text fontFamily={H} fontSize="9px" letterSpacing="0.2em" textTransform="uppercase" color="whiteAlpha.350" mt={1}>
// //                     {label}
// //                   </Text>
// //                 </VStack>
// //               </MotionBox>
// //             ))}
// //           </MotionBox>
// //         </VStack>

// //         {/* ── Category filter ───────────────────────────────────────────── */}
// //         <Flex gap={2} flexWrap="wrap" justify="center">
// //           {categories.map(cat => {
// //             const active = selectedCategory === cat.id;
// //             return (
// //               <Button
// //                 key={cat.id}
// //                 onClick={() => setSelectedCategory(cat.id)}
// //                 size="sm"
// //                 fontFamily={H} fontSize="9px" letterSpacing="0.14em"
// //                 bg={active ? `${cat.color}14` : 'rgba(255,255,255,0.03)'}
// //                 color={active ? cat.color : 'whiteAlpha.400'}
// //                 border="1px solid"
// //                 borderColor={active ? `${cat.color}40` : 'rgba(255,255,255,0.07)'}
// //                 backdropFilter="blur(12px)"
// //                 _hover={{ bg: `${cat.color}10`, borderColor: `${cat.color}35`, color: cat.color, transform: 'translateY(-2px)' }}
// //                 transition="all 0.25s"
// //               >
// //                 {cat.label}
// //               </Button>
// //             );
// //           })}
// //         </Flex>

// //         {/* ── Project rows ──────────────────────────────────────────────── */}
// //         <Box
// //           border="1px solid rgba(255,255,255,0.06)"
// //           borderRadius="16px"
// //           overflow="hidden"
// //           backdropFilter="blur(12px)"
// //           bg="rgba(255,255,255,0.015)"
// //         >
// //           {/* Table header */}
// //           <Flex
// //             px={{ base: 5, md: 8 }} py={3}
// //             borderBottom="1px solid rgba(255,255,255,0.05)"
// //             bg="rgba(255,255,255,0.02)"
// //           >
// //             {['#', '', 'Project', 'Description', 'Stack', 'Type', ''].map((col, i) => (
// //               <Text
// //                 key={i}
// //                 fontFamily={H} fontSize="8px" letterSpacing="0.2em"
// //                 textTransform="uppercase" color="rgba(255,255,255,0.2)"
// //                 flex={i === 3 ? 1 : i === 4 ? '0 0 auto' : '0 0 auto'}
// //                 minW={i === 2 ? { base: '120px', md: '200px' } : i === 0 ? '28px' : i === 1 ? '40px' : 'auto'}
// //                 display={i === 3 ? { base: 'none', md: 'block' } : i === 4 ? { base: 'none', lg: 'block' } : i === 5 ? { base: 'none', sm: 'block' } : 'block'}
// //                 mr={i === 4 ? 4 : i === 5 ? 2 : 0}
// //               >
// //                 {col}
// //               </Text>
// //             ))}
// //           </Flex>

// //           <AnimatePresence mode="popLayout">
// //             {filtered.map((project, i) => (
// //               <motion.div
// //                 key={project.id}
// //                 layout
// //                 initial={{ opacity: 0, y: 12 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 exit={{ opacity: 0, y: -8 }}
// //                 transition={{ duration: 0.3, delay: i * 0.05 }}
// //               >
// //                 <ProjectRow project={project} rowIndex={i} />
// //               </motion.div>
// //             ))}
// //           </AnimatePresence>

// //           {filtered.length === 0 && (
// //             <Box py={12} textAlign="center">
// //               <Text fontFamily={B} fontSize="13px" color="whiteAlpha.300">No projects in this category.</Text>
// //             </Box>
// //           )}
// //         </Box>

// //         {/* ── CTA ──────────────────────────────────────────────────────── */}
// //         <Box
// //           bg="rgba(255,255,255,0.025)" backdropFilter="blur(18px)"
// //           border="1px solid rgba(255,255,255,0.06)"
// //           borderRadius="16px" p={8} textAlign="center"
// //           position="relative" overflow="hidden"
// //         >
// //           <Box position="absolute" inset={0} pointerEvents="none" borderRadius="16px"
// //             bgGradient="linear(to-br, rgba(124,58,237,0.04), rgba(236,72,153,0.04))" />
// //           <VStack spacing={4} position="relative" zIndex={1}>
// //             <Text fontFamily={H} fontSize={{ base: '14px', md: '16px' }} fontWeight="800"
// //               letterSpacing="-0.01em" color="white">
// //               Want to see more?{' '}
// //               <chakra.span bgGradient={GRAD} bgClip="text">🚀</chakra.span>
// //             </Text>
// //             <Text fontFamily={B} fontSize="13px" color="whiteAlpha.400" maxW="400px">
// //               Check my GitHub for more experiments, half-finished ideas, and projects that taught me valuable lessons.
// //             </Text>
// //             <Button
// //               as="a" href="https://github.com/anandita-3217" target="_blank"
// //               leftIcon={<Github size={15} />} size="md" px={7}
// //               fontFamily={H} fontSize="10px" letterSpacing="0.15em"
// //               bg="rgba(255,255,255,0.05)" color="white"
// //               border="1px solid rgba(255,255,255,0.1)"
// //               _hover={{ bg: 'rgba(124,58,237,0.15)', borderColor: 'rgba(124,58,237,0.45)', transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(124,58,237,0.2)' }}
// //               transition="all 0.25s"
// //             >
// //               View All on GitHub
// //             </Button>
// //           </VStack>
// //         </Box>

// //       </VStack>
// //     </Box>
// //   );
// // }

// import { useState, useRef } from 'react';
// import { Box, Text, HStack, VStack, Badge, Flex, chakra } from '@chakra-ui/react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { Github, ExternalLink, Sparkles, Code2, Gamepad2, Palette, Zap } from 'lucide-react';

// const MotionBox = motion.create(Box);

// const H    = 'Orbitron, sans-serif';
// const B    = 'Sora, sans-serif';
// const GRAD = 'linear(to-r, #1e40af, #7c3aed, #ec4899)';
// const TEAL = '#14b8a6';

// const categories = [
//   { id: 'all',    label: 'All',   icon: Sparkles, color: TEAL      },
//   { id: 'web',    label: 'Web',   icon: Code2,    color: '#667eea' },
//   { id: 'game',   label: 'Games', icon: Gamepad2, color: '#f093fb' },
//   { id: 'design', label: 'UI/UX', icon: Palette,  color: '#4facfe' },
//   { id: 'tool',   label: 'Tools', icon: Zap,      color: '#68d391' },
// ];

// const projects = [
//   {
//     id: 1, title: 'Noracle', category: 'web', color: '#667eea', emoji: '🚫',
//     description: 'Ask the chatbot any question — it finds every possible reason to not do it.',
//     techStack: ['NextJS', 'Vercel'],
//     githubUrl: 'https://github.com/anandita-3217/Noracle', liveUrl: '#',
//     funFact: 'Spent 3 days building a chatbot specifically designed to make your blood boil.',
//     size: 'tall',   // tall | wide | normal
//   },
//   {
//     id: 2, title: 'Retro Snake', category: 'game', color: '#f093fb', emoji: '🐍',
//     description: 'Classic snake from scratch with neon colours and dubstep vibes.',
//     techStack: ['Canvas API', 'JavaScript'],
//     githubUrl: '#', liveUrl: '#',
//     funFact: 'My high score is embarrassingly low.',
//     size: 'normal',
//   },
//   {
//     id: 3, title: 'GitHub Finder', category: 'tool', color: '#4a90d9', emoji: '🔍',
//     description: "Any GitHub user's full stats from just their username.",
//     techStack: ['React', 'GitHub API'],
//     githubUrl: '#', liveUrl: '#',
//     funFact: 'Basically a stalking tool. Clipboard copy still pending.',
//     size: 'wide',
//   },
//   {
//     id: 4, title: 'Glass Generator', category: 'tool', color: '#4facfe', emoji: '✨',
//     description: 'Live glassmorphism card generator. This site uses it.',
//     techStack: ['React', 'CSS'],
//     githubUrl: '#', liveUrl: '#',
//     funFact: 'Meta: built a tool I immediately used on the portfolio itself.',
//     size: 'normal',
//   },
//   {
//     id: 5, title: 'Wordle Clone', category: 'game', color: '#f093fb', emoji: '⌨️',
//     description: 'Infinite local Wordle with Electron — no streaks, no pressure.',
//     techStack: ['JavaScript', 'Electron'],
//     githubUrl: 'https://github.com/anandita-3217/WordGame', liveUrl: '#',
//     funFact: 'Lost an embarrassing amount of hours to this.',
//     size: 'tall',
//   },
//   {
//     id: 6, title: 'Meme Generator', category: 'web', color: '#667eea', emoji: '😂',
//     description: 'Custom text on dank memes. Essential developer infrastructure.',
//     techStack: ['React', 'Canvas', 'Imgflip API'],
//     githubUrl: '#', liveUrl: '#',
//     funFact: '50+ memes made. All about semicolons.',
//     size: 'normal',
//   },
// ];

// // ── Single project card ───────────────────────────────────────────────────────
// const ProjectCard = ({ project, index }) => {
//   const [hovered, setHovered] = useState(false);
//   const [open, setOpen]       = useState(false);
//   const cardRef = useRef(null);

//   const isTall = project.size === 'tall';
//   const isWide = project.size === 'wide';

//   return (
//     <MotionBox
//       ref={cardRef}
//       onHoverStart={() => setHovered(true)}
//       onHoverEnd={() => setHovered(false)}
//       onClick={() => setOpen(o => !o)}
//       initial={{ opacity: 0, y: 28 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: index * 0.07 }}
//       cursor="pointer"
//       // Sizing — tall cards get more min-height, wide cards stretch in the masonry
//       minH={isTall ? '380px' : '280px'}
//       w={isWide ? '100%' : 'auto'}
//       flex={isWide ? '1 1 100%' : isTall ? '1 1 260px' : '1 1 220px'}
//       maxW={isWide ? '100%' : isTall ? '320px' : '280px'}
//     >
//       <Box
//         h="100%"
//         minH="inherit"
//         bg={hovered ? 'rgba(255,255,255,0.055)' : 'rgba(255,255,255,0.025)'}
//         backdropFilter="blur(18px)"
//         borderRadius="20px"
//         border="1px solid"
//         borderColor={hovered ? project.color : 'rgba(255,255,255,0.07)'}
//         p={6}
//         position="relative"
//         overflow="hidden"
//         transition="all 0.4s cubic-bezier(0.23,1,0.32,1)"
//         boxShadow={hovered ? `0 20px 56px ${project.color}22` : '0 2px 20px rgba(0,0,0,0.3)'}
//       >
//         {/* Glow */}
//         <Box position="absolute" top="-60px" right="-60px" w="180px" h="180px"
//           borderRadius="full" bg={project.color}
//           opacity={hovered ? 0.18 : 0.06} filter="blur(50px)"
//           transition="opacity 0.5s" pointerEvents="none" />

//         {/* Top edge accent */}
//         <Box position="absolute" top={0} left="12%" right="12%" h="1px"
//           bgGradient={`linear(to-r, transparent, ${project.color}55, transparent)`}
//           opacity={hovered ? 1 : 0} transition="opacity 0.4s" />

//         {/* Shimmer */}
//         <Box position="absolute" top={0} left="-100%" w="50%" h="100%"
//           bgGradient="linear(to-r, transparent, rgba(255,255,255,0.05), transparent)"
//           transform={hovered ? 'translateX(300%)' : 'translateX(0)'}
//           transition="transform 0.9s" pointerEvents="none" />

//         <VStack align="start" spacing={0} h="100%" position="relative" zIndex={1}>

//           {/* Emoji + badge row */}
//           <Flex w="100%" justify="space-between" align="start" mb={4}>
//             <Text
//               fontSize="32px" lineHeight={1}
//               style={{
//                 transform: hovered ? 'scale(1.18) rotate(8deg)' : 'scale(1)',
//                 transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
//                 display: 'inline-block',
//               }}
//             >
//               {project.emoji}
//             </Text>
//             <Badge
//               fontFamily={H} fontSize="8px" letterSpacing="0.12em"
//               textTransform="uppercase" px={2} py={1} borderRadius="6px"
//               bg={`${project.color}14`} color={project.color}
//               border="1px solid" borderColor={`${project.color}30`}
//             >
//               {categories.find(c => c.id === project.category)?.label}
//             </Badge>
//           </Flex>

//           {/* Title */}
//           <Text fontFamily={H} fontSize="15px" fontWeight="800"
//             letterSpacing="-0.01em" color="white" lineHeight={1.25} mb={2}>
//             {project.title}
//           </Text>

//           {/* Description */}
//           <Text fontFamily={B} fontSize="13px" color="rgba(255,255,255,0.45)"
//             lineHeight={1.7} mb={4} flex={1}>
//             {project.description}
//           </Text>

//           {/* Fun fact — appears on hover/click */}
//           <AnimatePresence>
//             {(hovered || open) && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 transition={{ duration: 0.28 }}
//                 style={{ overflow: 'hidden', width: '100%', marginBottom: 12 }}
//               >
//                 <Box
//                   bg={`${project.color}0d`}
//                   border="1px solid" borderColor={`${project.color}28`}
//                   borderLeft="2px solid" borderLeftColor={project.color}
//                   borderRadius="8px" p={3}
//                 >
//                   <Text fontFamily={H} fontSize="8px" letterSpacing="0.2em"
//                     textTransform="uppercase" color={project.color} mb={1}>
//                     Fun Fact ✦
//                   </Text>
//                   <Text fontFamily={B} fontSize="12px" color="rgba(255,255,255,0.5)"
//                     lineHeight={1.65}>
//                     {project.funFact}
//                   </Text>
//                 </Box>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Stack tags */}
//           <Flex flexWrap="wrap" gap={1.5} mb={4}>
//             {project.techStack.map((t, i) => (
//               <Badge key={i} fontFamily={B} fontSize="9px" px={2} py={0.5}
//                 borderRadius="5px" bg="rgba(255,255,255,0.04)"
//                 color="rgba(255,255,255,0.4)" border="1px solid rgba(255,255,255,0.07)">
//                 {t}
//               </Badge>
//             ))}
//           </Flex>

//           {/* Buttons */}
//           <HStack spacing={2} w="100%">
//             <Box as="a" href={project.githubUrl} target="_blank"
//               onClick={e => e.stopPropagation()}
//               display="flex" alignItems="center" gap={1.5}
//               fontFamily={H} fontSize="9px" letterSpacing="0.12em"
//               textTransform="uppercase" color={project.color}
//               bg="transparent" border="1px solid" borderColor={`${project.color}35`}
//               borderRadius="7px" px={3} py={1.5}
//               _hover={{ bg: `${project.color}12`, borderColor: `${project.color}60` }}
//               transition="all 0.2s" flex={1} justifyContent="center"
//             >
//               <Github size={12} /> Code
//             </Box>
//             <Box as="a" href={project.liveUrl} target="_blank"
//               onClick={e => e.stopPropagation()}
//               display="flex" alignItems="center" gap={1.5}
//               fontFamily={H} fontSize="9px" letterSpacing="0.12em"
//               textTransform="uppercase" color="rgba(255,255,255,0.35)"
//               bg="transparent" border="1px solid" borderColor="rgba(255,255,255,0.08)"
//               borderRadius="7px" px={3} py={1.5}
//               _hover={{ color: project.color, borderColor: `${project.color}35` }}
//               transition="all 0.2s" flex={1} justifyContent="center"
//             >
//               <ExternalLink size={12} /> Demo
//             </Box>
//           </HStack>

//         </VStack>
//       </Box>
//     </MotionBox>
//   );
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Main
// // ─────────────────────────────────────────────────────────────────────────────
// export default function Learning() {
//   const [selected, setSelected] = useState('all');
//   const [headerRef, headerInView] = useInView({ triggerOnce: false, threshold: 0.15 });

//   const filtered = selected === 'all'
//     ? projects
//     : projects.filter(p => p.category === selected);

//   return (
//     <Box bg="transparent" py={{ base: 4, md: 6 }} position="relative" overflow="hidden">

//       {/* Ambient glow */}
//       <MotionBox
//         position="absolute" top="5%" left="3%" w="280px" h="280px"
//         bgGradient="radial(circle, rgba(124,58,237,0.1), transparent)"
//         filter="blur(80px)" pointerEvents="none"
//         animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
//         transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
//       />

//       <VStack spacing={12} align="stretch" position="relative" zIndex={1}>

//         {/* ── Header ─────────────────────────────────────────────────────── */}
//         <VStack spacing={5} textAlign="center">
//           <motion.div
//             ref={headerRef}
//             initial={{ opacity: 0, y: 28 }}
//             animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
//             transition={{ duration: 0.6 }}
//           >
//             <Text fontFamily={H} fontSize={{ base: '26px', md: '42px' }} fontWeight="900"
//               letterSpacing="-0.02em" lineHeight={1.05} bgGradient={GRAD} bgClip="text">
//               Learning &amp; Experiments
//             </Text>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 14 }}
//             animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <Text fontFamily={B} fontSize="14px" color="whiteAlpha.400" maxW="440px" mx="auto">
//               Side projects built for learning, experimenting, and having fun.
//               No pressure — just vibes and good code. ✨
//             </Text>
//           </motion.div>

//           {/* Stats */}
//           <motion.div
//             initial={{ opacity: 0, y: 12 }}
//             animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
//             transition={{ duration: 0.5, delay: 0.35 }}
//           >
//             <HStack spacing={{ base: 8, md: 14 }} justify="center" flexWrap="wrap" pt={2}>
//               {[
//                 { v: projects.length, l: 'Projects',      c: TEAL      },
//                 { v: '∞',             l: 'Things Learned', c: '#a855f7' },
//                 { v: '100%',          l: 'Fun Factor',    c: '#3b82f6' },
//               ].map(({ v, l, c }) => (
//                 <VStack key={l} spacing={0}>
//                   <Text fontFamily={H} fontSize={{ base: '28px', md: '36px' }} fontWeight="900"
//                     lineHeight={1}
//                     style={{ background: `linear-gradient(135deg, ${c}, ${c}55)`,
//                       WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//                     {v}
//                   </Text>
//                   <Text fontFamily={H} fontSize="9px" letterSpacing="0.2em"
//                     textTransform="uppercase" color="whiteAlpha.380" mt={1}>{l}</Text>
//                 </VStack>
//               ))}
//             </HStack>
//           </motion.div>
//         </VStack>

//         {/* ── Category filter ───────────────────────────────────────────── */}
//         <Flex gap={2} flexWrap="wrap" justify="center">
//           {categories.map(cat => {
//             const active = selected === cat.id;
//             return (
//               <Box
//                 key={cat.id}
//                 as="button"
//                 onClick={() => setSelected(cat.id)}
//                 display="flex" alignItems="center" gap={1.5}
//                 fontFamily={H} fontSize="9px" letterSpacing="0.14em"
//                 textTransform="uppercase"
//                 bg={active ? `${cat.color}14` : 'rgba(255,255,255,0.025)'}
//                 color={active ? cat.color : 'rgba(255,255,255,0.35)'}
//                 border="1px solid"
//                 borderColor={active ? `${cat.color}40` : 'rgba(255,255,255,0.07)'}
//                 backdropFilter="blur(12px)"
//                 borderRadius="8px" px={4} py={2}
//                 transition="all 0.22s"
//                 _hover={{ bg: `${cat.color}10`, borderColor: `${cat.color}38`, color: cat.color, transform: 'translateY(-2px)' }}
//               >
//                 <cat.icon size={12} />
//                 {cat.label}
//               </Box>
//             );
//           })}
//         </Flex>

//         {/* ── Masonry-style flex wrap — NOT a grid ─────────────────────── */}
//         <Box>
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={selected}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.25 }}
//             >
//               <Flex
//                 flexWrap="wrap"
//                 gap={5}
//                 align="flex-start"
//                 justify="flex-start"
//               >
//                 {filtered.map((project, i) => (
//                   <ProjectCard key={project.id} project={project} index={i} />
//                 ))}
//               </Flex>
//             </motion.div>
//           </AnimatePresence>
//         </Box>

//         {/* ── CTA ──────────────────────────────────────────────────────── */}
//         <Box
//           bg="rgba(255,255,255,0.025)" backdropFilter="blur(18px)"
//           border="1px solid rgba(255,255,255,0.07)" borderRadius="18px"
//           p={{ base: 8, md: 10 }} textAlign="center" position="relative" overflow="hidden"
//         >
//           <Box position="absolute" inset={0} borderRadius="18px" pointerEvents="none"
//             bgGradient="linear(to-br, rgba(124,58,237,0.04), rgba(236,72,153,0.04))" />

//           <VStack spacing={4} position="relative" zIndex={1}>
//             <Text fontFamily={H} fontSize={{ base: '15px', md: '20px' }} fontWeight="800"
//               letterSpacing="-0.01em" color="white">
//               Want to see more?{' '}
//               <chakra.span bgGradient={GRAD} bgClip="text">🚀</chakra.span>
//             </Text>
//             <Text fontFamily={B} fontSize="13px" color="rgba(255,255,255,0.4)" maxW="400px">
//               More experiments, half-finished ideas, and projects that taught me everything.
//             </Text>
//             <Box
//               as="a" href="https://github.com/anandita-3217" target="_blank"
//               display="flex" alignItems="center" gap={2}
//               fontFamily={H} fontSize="10px" letterSpacing="0.15em" textTransform="uppercase"
//               bg="rgba(255,255,255,0.05)" color="white"
//               border="1px solid rgba(255,255,255,0.1)"
//               borderRadius="10px" px={6} py={3}
//               transition="all 0.25s"
//               _hover={{
//                 bg: 'rgba(124,58,237,0.15)',
//                 borderColor: 'rgba(124,58,237,0.45)',
//                 transform: 'translateY(-2px)',
//                 boxShadow: '0 8px 24px rgba(124,58,237,0.2)',
//               }}
//             >
//               <Github size={16} />
//               View All on GitHub
//             </Box>
//           </VStack>
//         </Box>

//       </VStack>
//     </Box>
//   );
// }
import { useState, useRef } from 'react';
import { Box, Text, HStack, VStack, Badge, Flex, chakra } from '@chakra-ui/react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';

const MotionBox = motion.create(Box);

const H    = 'Orbitron, sans-serif';
const B    = 'Sora, sans-serif';
const MONO = "'JetBrains Mono', monospace";
const GRAD = 'linear(to-r, #1e40af, #7c3aed, #ec4899)';

const learningProjects = [
  {
    id: 1,
    num: '01',
    title: 'Noracle',
    description: 'Ask the chatbot any question and it finds reasons to not do it. An API-wrapped reverse motivator that will make your blood boil.',
    category: 'Web',
    accent: '#667eea',
    techStack: ['NextJS', 'Vercel', 'OpenAI API'],
    funFact: 'Spent 3 days building a chatbot designed to be useless.',
    githubUrl: 'https://github.com/anandita-3217/Noracle',
    liveUrl: '#',
  },
  {
    id: 2,
    num: '02',
    title: 'Retro Snake',
    description: 'The classic snake game rebuilt from scratch with neon aesthetics and a game loop written entirely without libraries.',
    category: 'Game',
    accent: '#f093fb',
    techStack: ['Canvas API', 'JavaScript', 'Vanilla'],
    funFact: 'My personal high score is embarrassingly low.',
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 3,
    num: '03',
    title: 'GitHub Stalker',
    description: 'Pull any GitHub user\'s full stats, repos, and activity using only their username. Clipboard copy coming soon.',
    category: 'Tool',
    accent: '#4a90d9',
    techStack: ['React', 'GitHub API', 'REST'],
    funFact: 'The name says it all.',
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 4,
    num: '04',
    title: 'Glass Generator',
    description: 'A live glassmorphism card generator. Tweak blur, opacity, and color in real time. Used to style this very portfolio.',
    category: 'Tool',
    accent: '#4facfe',
    techStack: ['React', 'CSS', 'Design Systems'],
    funFact: 'Meta: I used it to build this site.',
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 5,
    num: '05',
    title: 'Wordle Clone',
    description: 'Infinite Wordle challenges that run offline as a desktop app. Built to understand Electron and local app distribution.',
    category: 'Game',
    accent: '#f093fb',
    techStack: ['JavaScript', 'Electron', 'DOM'],
    funFact: 'I wasted an embarrassing amount of time on this.',
    githubUrl: 'https://github.com/anandita-3217/WordGame',
    liveUrl: '#',
  },
  {
    id: 6,
    num: '06',
    title: 'Meme Generator',
    description: 'Create custom memes with text overlays using the Imgflip API and Canvas rendering. Essential developer utility.',
    category: 'Web',
    accent: '#667eea',
    techStack: ['React', 'Canvas', 'Imgflip API'],
    funFact: 'Produced 50+ memes about semicolons.',
    githubUrl: '#',
    liveUrl: '#',
  },
];

// ── Single cinematic row ──────────────────────────────────────────────────────
const ProjectRow = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  const rowRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start 0.95', 'start 0.3'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x       = useTransform(scrollYProgress, [0, 1], [-40, 0]);

  return (
    <MotionBox
      ref={rowRef}
      style={{ opacity, x }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      position="relative"
    >
      {/* Full-width row */}
      <Box
        position="relative"
        py={8}
        px={0}
        cursor="default"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '1px',
          background: hovered
            ? `linear-gradient(to right, transparent, ${project.accent}55, transparent)`
            : 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)',
          transition: 'background 0.4s',
        }}
      >
        {/* Hover: full-row background wash */}
        <Box
          position="absolute"
          inset={0}
          bgGradient={`linear(to-r, ${project.accent}06, transparent)`}
          opacity={hovered ? 1 : 0}
          transition="opacity 0.5s"
          pointerEvents="none"
          borderRadius="12px"
        />

        <Flex
          align="center"
          gap={{ base: 4, md: 8 }}
          position="relative"
          zIndex={1}
          flexWrap={{ base: 'wrap', md: 'nowrap' }}
        >

          {/* Number */}
          <Text
            fontFamily={MONO}
            fontSize={{ base: '32px', md: '56px' }}
            fontWeight="900"
            lineHeight={1}
            color={hovered ? project.accent : 'rgba(255,255,255,0.06)'}
            transition="color 0.4s"
            flexShrink={0}
            w={{ base: '60px', md: '90px' }}
            userSelect="none"
          >
            {project.num}
          </Text>

          {/* Title block */}
          <Box flex="0 0 auto" w={{ base: '100%', md: '280px' }}>
            <HStack spacing={3} mb={1.5} align="center">
              <Text
                fontFamily={H}
                fontSize={{ base: '18px', md: '24px' }}
                fontWeight="900"
                letterSpacing="-0.02em"
                color={hovered ? 'white' : 'rgba(255,255,255,0.8)'}
                transition="color 0.3s"
                lineHeight={1.1}
              >
                {project.title}
              </Text>
              {/* Arrow animates on hover */}
              <Box
                color={project.accent}
                opacity={hovered ? 1 : 0}
                transform={hovered ? 'translate(0,0)' : 'translate(-4px, 4px)'}
                transition="all 0.3s"
              >
                <ArrowUpRight size={18} />
              </Box>
            </HStack>

            <Badge
              fontFamily={H}
              fontSize="8px"
              letterSpacing="0.18em"
              textTransform="uppercase"
              px={2} py={0.5}
              borderRadius="5px"
              bg={`${project.accent}14`}
              color={project.accent}
              border="1px solid"
              borderColor={`${project.accent}30`}
            >
              {project.category}
            </Badge>
          </Box>

          {/* Description — expands on hover */}
          <Box
            flex={1}
            minW={0}
            overflow="hidden"
          >
            <Text
              fontFamily={B}
              fontSize="14px"
              lineHeight={1.75}
              color={hovered ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.28)'}
              transition="color 0.4s"
              noOfLines={hovered ? undefined : 2}
            >
              {project.description}
            </Text>

            {/* Fun fact — slides in on hover */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -4 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  <HStack spacing={2} mt={3}>
                    <Box w="2px" h="28px" bg={project.accent} borderRadius="full" flexShrink={0} />
                    <Text
                      fontFamily={B}
                      fontSize="12px"
                      color={project.accent}
                      opacity={0.8}
                      fontStyle="italic"
                    >
                      {project.funFact}
                    </Text>
                  </HStack>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>

          {/* Right side: tech stack + links */}
          <VStack
            align="flex-end"
            spacing={3}
            flexShrink={0}
            w={{ base: '100%', md: 'auto' }}
          >
            {/* Tech tags */}
            <Flex gap={1.5} flexWrap="wrap" justify="flex-end">
              {project.techStack.map(t => (
                <Badge
                  key={t}
                  fontFamily={B}
                  fontSize="9px"
                  px={2} py={0.5}
                  borderRadius="5px"
                  bg="rgba(255,255,255,0.04)"
                  color={hovered ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.22)'}
                  border="1px solid rgba(255,255,255,0.07)"
                  transition="color 0.3s"
                >
                  {t}
                </Badge>
              ))}
            </Flex>

            {/* Link buttons */}
            <HStack spacing={2}>
              <Box
                as="a"
                href={project.githubUrl}
                target="_blank"
                display="flex" alignItems="center" gap={1}
                fontFamily={H} fontSize="9px" letterSpacing="0.15em"
                color={hovered ? project.accent : 'rgba(255,255,255,0.2)'}
                transition="color 0.3s"
                _hover={{ color: project.accent }}
                onClick={e => e.stopPropagation()}
              >
                <Github size={13} />
                <Text>Code</Text>
              </Box>
              <Text color="rgba(255,255,255,0.1)" fontSize="10px">/</Text>
              <Box
                as="a"
                href={project.liveUrl}
                target="_blank"
                display="flex" alignItems="center" gap={1}
                fontFamily={H} fontSize="9px" letterSpacing="0.15em"
                color={hovered ? project.accent : 'rgba(255,255,255,0.2)'}
                transition="color 0.3s"
                _hover={{ color: project.accent }}
                onClick={e => e.stopPropagation()}
              >
                <ExternalLink size={13} />
                <Text>Demo</Text>
              </Box>
            </HStack>
          </VStack>

        </Flex>
      </Box>

      {/* Bottom border — last item has none */}
      {index < learningProjects.length - 1 && (
        <Box
          h="1px"
          bgGradient="linear(to-r, transparent, rgba(255,255,255,0.05), transparent)"
        />
      )}
    </MotionBox>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Learning() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Web', 'Game', 'Tool'];

  const filtered = filter === 'All'
    ? learningProjects
    : learningProjects.filter(p => p.category === filter);

  return (
    <Box bg="transparent" py={{ base: 4, md: 6 }}>

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <Flex justify="space-between" align="flex-end" mb={12} flexWrap="wrap" gap={4}>
        <Box>
          <HStack spacing={3} mb={3}>
            <Box w="24px" h="1px" bgGradient="linear(to-r, #ec4899, #7c3aed)" />
            <Text fontFamily={H} fontSize="9px" letterSpacing="0.3em"
              textTransform="uppercase" color="whiteAlpha.400">
              Side quests
            </Text>
          </HStack>
          <Text
            fontFamily={H}
            fontSize={{ base: '26px', md: '40px' }}
            fontWeight="900"
            letterSpacing="-0.02em"
            lineHeight={1.05}
            bgGradient={GRAD}
            bgClip="text"
          >
            Learning &amp;
          </Text>
          <Text
            fontFamily={H}
            fontSize={{ base: '26px', md: '40px' }}
            fontWeight="900"
            letterSpacing="-0.02em"
            lineHeight={1.05}
            color="rgba(255,255,255,0.13)"
          >
            Experiments
          </Text>
        </Box>

        {/* Stats */}
        <HStack spacing={8} align="flex-end" pb={1}>
          {[
            { val: learningProjects.length, label: 'Projects',      color: '#14b8a6' },
            { val: '∞',                     label: 'Things Learned', color: '#a855f7' },
            { val: '100%',                  label: 'Fun Factor',    color: '#3b82f6' },
          ].map(({ val, label, color }) => (
            <VStack key={label} spacing={0} align="center">
              <Text
                fontFamily={H}
                fontSize={{ base: '24px', md: '32px' }}
                fontWeight="900"
                lineHeight={1}
                style={{
                  background: `linear-gradient(135deg, ${color}, ${color}55)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {val}
              </Text>
              <Text fontFamily={H} fontSize="8px" letterSpacing="0.2em"
                textTransform="uppercase" color="whiteAlpha.350" mt={0.5}>
                {label}
              </Text>
            </VStack>
          ))}
        </HStack>
      </Flex>

      {/* ── Filter pills ──────────────────────────────────────────────── */}
      <HStack spacing={2} mb={6} flexWrap="wrap">
        {filters.map(f => (
          <Box
            key={f}
            as="button"
            onClick={() => setFilter(f)}
            fontFamily={H}
            fontSize="9px"
            letterSpacing="0.18em"
            textTransform="uppercase"
            px={4} py={2}
            borderRadius="8px"
            border="1px solid"
            borderColor={filter === f ? 'rgba(20,184,166,0.45)' : 'rgba(255,255,255,0.07)'}
            bg={filter === f ? 'rgba(20,184,166,0.08)' : 'rgba(255,255,255,0.02)'}
            color={filter === f ? '#14b8a6' : 'rgba(255,255,255,0.3)'}
            backdropFilter="blur(12px)"
            transition="all 0.2s"
            _hover={{ borderColor: 'rgba(20,184,166,0.3)', color: '#14b8a6' }}
          >
            {f}
          </Box>
        ))}
        <Text fontFamily={MONO} fontSize="11px" color="whiteAlpha.200" pl={2}>
          {filtered.length} projects
        </Text>
      </HStack>

      {/* ── Cinematic list ────────────────────────────────────────────── */}
      <Box>
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <ProjectRow project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <Box
        mt={12} pt={8}
        borderTop="1px solid rgba(255,255,255,0.05)"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={4}
      >
        <VStack align="start" spacing={0.5}>
          <Text fontFamily={H} fontSize="14px" fontWeight="800" color="white">
            There's more.
          </Text>
          <Text fontFamily={B} fontSize="13px" color="whiteAlpha.400">
            Half-finished ideas, experiments, and lessons on GitHub.
          </Text>
        </VStack>

        <Box
          as="a"
          href="https://github.com/anandita-3217"
          target="_blank"
          display="flex" alignItems="center" gap={2}
          fontFamily={H} fontSize="10px" letterSpacing="0.18em"
          textTransform="uppercase"
          px={5} py={3}
          borderRadius="10px"
          bg="rgba(255,255,255,0.04)"
          border="1px solid rgba(255,255,255,0.1)"
          color="white"
          _hover={{
            bg: 'rgba(124,58,237,0.14)',
            borderColor: 'rgba(124,58,237,0.4)',
            transform: 'translateY(-2px)',
          }}
          transition="all 0.25s"
        >
          <Github size={15} />
          <Text>GitHub</Text>
          <ArrowUpRight size={13} />
        </Box>
      </Box>

    </Box>
  );
}