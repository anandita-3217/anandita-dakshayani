// // import { useRef, useState, useEffect, useCallback } from 'react';
// // import { Box, Text, HStack } from '@chakra-ui/react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import gsap from 'gsap';
// // import { Camera, Music4, MountainSnow, Book, Coffee } from 'lucide-react';

// // const hobbies = [
// //   {
// //     title: 'Photography',
// //     subtitle: 'Chasing light',
// //     icon: <Camera />,
// //     accent: '#1e40af',
// //     tags: ['Street', 'Analog', 'Portrait'],
// //     years: '6 yrs',
// //     description: 'Chasing light through a 35mm lens. Film photography fanatic with a growing collection of vintage cameras and an unhealthy darkroom habit.',
// //     image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80',
// //   },
// //   {
// //     title: 'Rock Climbing',
// //     subtitle: 'Vertical problems',
// //     icon: <Music4 />,
// //     accent: '#7c3aed',
// //     tags: ['Bouldering', 'Sport', 'Outdoor'],
// //     years: '4 yrs',
// //     description: 'Problem-solving at altitude. Nothing quite like the focus required when the only thing between you and the ground is grip strength.',
// //     image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=80',
// //   },
// //   {
// //     title: 'Music Production',
// //     subtitle: 'Sculpting sound',
// //     icon: <Music4 />,
// //     accent: '#ec4899',
// //     tags: ['Ambient', 'Electronic', 'Synths'],
// //     years: '5 yrs',
// //     description: 'Patching synthesizers and sculpting sound. Each session is a conversation with a machine that has no memory and infinite patience.',
// //     image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80',
// //   },
// //   {
// //     title: 'Hiking',
// //     subtitle: 'Moving meditation',
// //     icon: <MountainSnow />,
// //     accent: '#059669',
// //     tags: ['Trail', 'Alpine', 'Endurance'],
// //     years: '8 yrs',
// //     description: 'Running as moving meditation. The body becomes background noise and the mind goes somewhere else entirely past mile 15.',
// //     image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
// //   },
// //   {
// //     title: 'Reading',
// //     subtitle: 'Other worlds',
// //     icon: <Book />,
// //     accent: '#06b6d4',
// //     tags: ['Sci-fi', 'Philosophy', 'History'],
// //     years: '∞',
// //     description: 'Getting lost in other worlds, other minds, other centuries. A good book is the most efficient form of time travel available.',
// //     image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
// //   },
// //   {
// //     title: 'Coffee',
// //     subtitle: 'The ritual',
// //     icon: <Coffee />,
// //     accent: '#fb923c',
// //     tags: ['Pour-over', 'Espresso', 'Origin'],
// //     years: '7 yrs',
// //     description: 'From green bean to cup. The ritual of slow coffee is the only acceptable reason to wake up before 7am.',
// //     image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
// //   },
// // ];

// // export default function Hobbies() {
// //   const sectionRef    = useRef(null);
// //   const trackRef      = useRef(null);
// //   const tweenRef      = useRef(null);
// //   const isHoveredRef  = useRef(false);
// //   const [activeIdx, setActiveIdx] = useState(null);
// //   const [isMobile, setIsMobile]   = useState(false);

// //   useEffect(() => {
// //     const check = () => setIsMobile(window.innerWidth < 768);
// //     check();
// //     window.addEventListener('resize', check);
// //     return () => window.removeEventListener('resize', check);
// //   }, []);

// //   const CARD_W_IDLE     = isMobile ? 160 : 220;
// //   const CARD_W_EXPANDED = isMobile ? 300 : 520;
// //   const CARD_W_COMPRESS = isMobile ?  60 :  80;
// //   const TRACK_H         = isMobile ? 340 : 480;

// //   const startScroll = useCallback(() => {
// //     const el = trackRef.current;
// //     if (!el) return;
// //     const totalW = el.scrollWidth - el.clientWidth;
// //     tweenRef.current = gsap.to(el, {
// //       scrollLeft: totalW,
// //       duration: 28,
// //       ease: 'none',
// //       repeat: -1,
// //       repeatRefresh: true,
// //       onRepeat: () => { el.scrollLeft = 0; },
// //     });
// //   }, []);

// //   useEffect(() => {
// //     startScroll();
// //     return () => { tweenRef.current?.kill(); };
// //   }, [startScroll]);

// //   const pauseScroll = () => {
// //     isHoveredRef.current = true;
// //     gsap.to(tweenRef.current, { timeScale: 0, duration: 0.6, ease: 'power2.out' });
// //   };

// //   const resumeScroll = () => {
// //     isHoveredRef.current = false;
// //     setActiveIdx(null);
// //     gsap.to(tweenRef.current, { timeScale: 1, duration: 1.2, ease: 'power2.inOut' });
// //   };

// //   return (
// //     <Box
// //       ref={sectionRef}
// //       minH="1100px"
// //       bg="transparent"
// //       position="relative"
// //       overflow="hidden"
// //       display="flex"
// //       justifyContent="center"
// //       px={{ base: 5, md: 12, lg: 20 }}
// //       py={{ base: 20, md: 0 }}
// //       fontFamily="'Sora', sans-serif"
// //       transition="background-color 0.3s ease"
// //     >
// //       {/* ── Constrained inner column — matches TechSkills ── */}
// //       <Box
// //         display="flex"
// //         flexDirection="column"
// //         w="full"
// //         maxW="1200px"
// //         mx="auto"
// //         gap={8}
// //         position="relative"
// //         zIndex={1}
// //         // vertically center contents the same way TechSkills does
// //         alignSelf="center"
// //       >

// //         {/* ── Header ── */}
// //         <Box>
// //           <HStack spacing={3} mb={3}>
// //             <Box w="24px" h="1px" flexShrink={0} bgGradient="linear(to-r, #ec4899, #7c3aed)" />
// //             <Text
// //               fontSize="9px"
// //               letterSpacing="0.3em"
// //               fontFamily="Orbitron"
// //               textTransform="uppercase"
// //               color="text.eyebrow"
// //             >
// //               Beyond the screen
// //             </Text>
// //           </HStack>
// //           <Text
// //             fontSize="clamp(26px, 4vw, 40px)"
// //             fontWeight="900"
// //             fontFamily="Orbitron"
// //             letterSpacing="-0.02em"
// //             lineHeight={1.05}
// //             bgGradient="linear(to-r, #7c3aed, #ec4899)"
// //             bgClip="text"
// //             display="inline-block"
// //             w="fit-content"
// //           >
// //             What I Do
// //           </Text>
// //           <Text
// //             fontSize="clamp(26px, 4vw, 40px)"
// //             fontWeight="900"
// //             fontFamily="Orbitron"
// //             letterSpacing="-0.02em"
// //             lineHeight={1.05}
// //             color="text.subdued"
// //           >
// //             When I'm Not Coding
// //           </Text>
// //         </Box>

// //         {/* ── Carousel ── */}
// //         <Box
// //           w="full"
// //           position="relative"
// //           onMouseEnter={pauseScroll}
// //           onMouseLeave={resumeScroll}
// //           onTouchStart={pauseScroll}
// //           onTouchEnd={resumeScroll}
// //         >
// //           {/* Edge fades */}
// //           <Box
// //             position="absolute" left={0} top={0} bottom={0}
// //             w={{ base: '40px', md: '80px' }} zIndex={3}
// //             bgGradient="linear(to-r, var(--chakra-colors-bg-primary, #f7f7f8), transparent)"
// //             pointerEvents="none"
// //           />
// //           <Box
// //             position="absolute" right={0} top={0} bottom={0}
// //             w={{ base: '40px', md: '80px' }} zIndex={3}
// //             bgGradient="linear(to-l, var(--chakra-colors-bg-primary, #f7f7f8), transparent)"
// //             pointerEvents="none"
// //           />

// //           {/* Track */}
// //           <Box
// //             ref={trackRef}
// //             display="flex"
// //             alignItems="stretch"
// //             gap="12px"
// //             overflowX="auto"
// //             overflowY="hidden"
// //             h={`${TRACK_H}px`}
// //             pb={2}
// //             sx={{
// //               scrollbarWidth: 'none',
// //               '&::-webkit-scrollbar': { display: 'none' },
// //               userSelect: 'none',
// //             }}
// //           >
// //             {[...hobbies, ...hobbies].map((hobby, i) => {
// //               const isExpanded   = activeIdx === i;
// //               const isCompressed = activeIdx !== null && !isExpanded;

// //               return (
// //                 <motion.div
// //                   key={`${hobby.title}-${i}`}
// //                   onHoverStart={() => setActiveIdx(i)}
// //                   onHoverEnd={() => setActiveIdx(null)}
// //                   onTap={() => setActiveIdx(prev => prev === i ? null : i)}
// //                   animate={{
// //                     width: isExpanded
// //                       ? CARD_W_EXPANDED
// //                       : isCompressed
// //                       ? CARD_W_COMPRESS
// //                       : CARD_W_IDLE,
// //                     flexShrink: 0,
// //                   }}
// //                   transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
// //                   style={{
// //                     height: `${TRACK_H - 8}px`,
// //                     flexShrink: 0,
// //                     borderRadius: '18px',
// //                     overflow: 'hidden',
// //                     cursor: 'pointer',
// //                     position: 'relative',
// //                   }}
// //                 >
// //                   {/* Background image */}
// //                   <motion.div
// //                     animate={{ scale: isExpanded ? 1.04 : 1 }}
// //                     transition={{ duration: 0.6, ease: 'easeOut' }}
// //                     style={{
// //                       position: 'absolute', inset: 0,
// //                       backgroundImage: `url(${hobby.image})`,
// //                       backgroundSize: 'cover',
// //                       backgroundPosition: 'center',
// //                     }}
// //                   />

// //                   {/* Dark overlay */}
// //                   <motion.div
// //                     animate={{ opacity: isExpanded ? 0.55 : isCompressed ? 0.82 : 0.7 }}
// //                     transition={{ duration: 0.4 }}
// //                     style={{
// //                       position: 'absolute', inset: 0,
// //                       background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%)',
// //                     }}
// //                   />

// //                   {/* Color tint */}
// //                   <motion.div
// //                     animate={{ opacity: isExpanded ? 0 : 0.25 }}
// //                     transition={{ duration: 0.4 }}
// //                     style={{
// //                       position: 'absolute', inset: 0,
// //                       background: hobby.accent,
// //                       mixBlendMode: 'color',
// //                     }}
// //                   />

// //                   {/* Border highlight */}
// //                   <motion.div
// //                     animate={{ opacity: isExpanded ? 1 : 0 }}
// //                     transition={{ duration: 0.3 }}
// //                     style={{
// //                       position: 'absolute', inset: 0,
// //                       borderRadius: '18px',
// //                       border: `1px solid ${hobby.accent}55`,
// //                       pointerEvents: 'none',
// //                     }}
// //                   />

// //                   {/* Collapsed: rotated title */}
// //                   <AnimatePresence>
// //                     {isCompressed && (
// //                       <motion.div
// //                         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
// //                         transition={{ duration: 0.2 }}
// //                         style={{
// //                           position: 'absolute', inset: 0,
// //                           display: 'flex', alignItems: 'center', justifyContent: 'center',
// //                         }}
// //                       >
// //                         <div style={{
// //                           transform: 'rotate(-90deg)', whiteSpace: 'nowrap',
// //                           fontSize: '10px', letterSpacing: '0.2em',
// //                           textTransform: 'uppercase', color: `${hobby.accent}99`, fontWeight: 700,
// //                         }}>
// //                           {hobby.title}
// //                         </div>
// //                       </motion.div>
// //                     )}
// //                   </AnimatePresence>

// //                   {/* Content (expanded or idle) */}
// //                   <AnimatePresence>
// //                     {!isCompressed && (
// //                       <motion.div
// //                         initial={{ opacity: 0, y: 16 }}
// //                         animate={{ opacity: 1, y: 0 }}
// //                         exit={{ opacity: 0, y: 8 }}
// //                         transition={{ duration: 0.35, delay: isExpanded ? 0.15 : 0 }}
// //                         style={{
// //                           position: 'absolute', inset: 0,
// //                           display: 'flex', flexDirection: 'column',
// //                           justifyContent: 'flex-end',
// //                           padding: isMobile ? '18px' : '28px',
// //                         }}
// //                       >
// //                         {/* Icon */}
// //                         <div style={{
// //                           position: 'absolute',
// //                           top: isMobile ? 16 : 24,
// //                           left: isMobile ? 18 : 28,
// //                           fontSize: isMobile ? '18px' : '24px',
// //                           color: hobby.accent,
// //                           opacity: isExpanded ? 1 : 0.8,
// //                         }}>
// //                           {hobby.icon}
// //                         </div>

// //                         {/* Years pill */}
// //                         <div style={{
// //                           position: 'absolute',
// //                           top: isMobile ? 14 : 22,
// //                           right: isMobile ? 16 : 24,
// //                           fontSize: '8px', letterSpacing: '0.2em',
// //                           textTransform: 'uppercase', color: hobby.accent,
// //                           background: `${hobby.accent}18`,
// //                           border: `1px solid ${hobby.accent}35`,
// //                           borderRadius: '6px', padding: '4px 10px',
// //                           opacity: isExpanded ? 1 : 0,
// //                           transition: 'opacity 0.3s',
// //                         }}>
// //                           {hobby.years}
// //                         </div>

// //                         {/* Bottom content */}
// //                         <div>
// //                           <div style={{
// //                             fontSize: isExpanded ? (isMobile ? '18px' : '22px') : (isMobile ? '13px' : '15px'),
// //                             fontWeight: 800, letterSpacing: '-0.02em',
// //                             color: 'white', lineHeight: 1.15,
// //                             marginBottom: '6px', transition: 'font-size 0.4s',
// //                           }}>
// //                             {hobby.title}
// //                           </div>

// //                           {!isExpanded && (
// //                             <div style={{
// //                               fontSize: isMobile ? '10px' : '11px',
// //                               color: `${hobby.accent}bb`, marginBottom: '12px',
// //                             }}>
// //                               {hobby.subtitle}
// //                             </div>
// //                           )}

// //                           <AnimatePresence>
// //                             {isExpanded && (
// //                               <motion.div
// //                                 initial={{ opacity: 0, height: 0 }}
// //                                 animate={{ opacity: 1, height: 'auto' }}
// //                                 exit={{ opacity: 0, height: 0 }}
// //                                 transition={{ duration: 0.35, delay: 0.1 }}
// //                                 style={{ overflow: 'hidden' }}
// //                               >
// //                                 <div style={{
// //                                   fontSize: isMobile ? '12px' : '13px',
// //                                   lineHeight: 1.75,
// //                                   color: 'rgba(255,255,255,0.6)',
// //                                   marginBottom: '16px',
// //                                   maxWidth: isMobile ? '260px' : '380px',
// //                                 }}>
// //                                   {hobby.description}
// //                                 </div>
// //                               </motion.div>
// //                             )}
// //                           </AnimatePresence>

// //                           {/* Tags */}
// //                           <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
// //                             {hobby.tags.map(tag => (
// //                               <div key={tag} style={{
// //                                 fontSize: '8px', letterSpacing: '0.12em',
// //                                 textTransform: 'uppercase', padding: '3px 8px',
// //                                 borderRadius: '5px', border: `1px solid ${hobby.accent}45`,
// //                                 color: isExpanded ? hobby.accent : `${hobby.accent}88`,
// //                                 background: 'transparent',
// //                                 transition: 'color 0.3s, border-color 0.3s',
// //                               }}>
// //                                 {tag}
// //                               </div>
// //                             ))}
// //                           </div>
// //                         </div>
// //                       </motion.div>
// //                     )}
// //                   </AnimatePresence>

// //                 </motion.div>
// //               );
// //             })}
// //           </Box>
// //         </Box>

// //         {/* ── Dot indicators ── */}
// //         <HStack spacing={2} justify="center">
// //           {hobbies.map((hobby, i) => (
// //             <Box
// //               key={i}
// //               w={activeIdx !== null && activeIdx % hobbies.length === i ? '20px' : '6px'}
// //               h="6px"
// //               borderRadius="full"
// //               bg={activeIdx !== null && activeIdx % hobbies.length === i
// //                 ? hobby.accent
// //                 : 'border.badge'}
// //               transition="all 0.35s cubic-bezier(0.23,1,0.32,1)"
// //             />
// //           ))}
// //         </HStack>

// //       </Box>
// //     </Box>
// //   );
// // }

// import { useRef, useState, useEffect, useCallback } from 'react';
// import { Box, Flex, Text, HStack, useColorModeValue } from '@chakra-ui/react';
// import { motion, AnimatePresence } from 'framer-motion';
// import gsap from 'gsap';
// import { Camera, Music4, MountainSnow, Book, Coffee, X } from 'lucide-react';

// // ── Import components that hobby cards can open ───────────────────────────────
// // Add more here as you build them:
// import BookNook from './BookNook';
// // import PhotoGallery from './PhotoGallery';
// // import MusicPlayer from './MusicPlayer';

// const MONO = "'JetBrains Mono', monospace";
// const H    = "'Orbitron', sans-serif";

// // ── Hobby data — add `component` to any hobby that has one ───────────────────
// // component: null means the card just expands (existing behaviour)
// // component: <SomeComponent /> means clicking opens the modal
// const hobbies = [
//   {
//     title: 'Photography',
//     subtitle: 'Chasing light',
//     icon: <Camera />,
//     accent: '#1e40af',
//     tags: ['Street', 'Analog', 'Portrait'],
//     years: '6 yrs',
//     description: 'Chasing light through a 35mm lens. Film photography fanatic with a growing collection of vintage cameras and an unhealthy darkroom habit.',
//     image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80',
//     component: null,
//   },
//   {
//     title: 'Rock Climbing',
//     subtitle: 'Vertical problems',
//     icon: <Music4 />,
//     accent: '#7c3aed',
//     tags: ['Bouldering', 'Sport', 'Outdoor'],
//     years: '4 yrs',
//     description: 'Problem-solving at altitude. Nothing quite like the focus required when the only thing between you and the ground is grip strength.',
//     image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=80',
//     component: null,
//   },
//   {
//     title: 'Music Production',
//     subtitle: 'Sculpting sound',
//     icon: <Music4 />,
//     accent: '#ec4899',
//     tags: ['Ambient', 'Electronic', 'Synths'],
//     years: '5 yrs',
//     description: 'Patching synthesizers and sculpting sound. Each session is a conversation with a machine that has no memory and infinite patience.',
//     image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80',
//     component: null,
//   },
//   {
//     title: 'Hiking',
//     subtitle: 'Moving meditation',
//     icon: <MountainSnow />,
//     accent: '#059669',
//     tags: ['Trail', 'Alpine', 'Endurance'],
//     years: '8 yrs',
//     description: 'Running as moving meditation. The body becomes background noise and the mind goes somewhere else entirely past mile 15.',
//     image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
//     component: null,
//   },
//   {
//     title: 'Reading',
//     subtitle: 'Other worlds',
//     icon: <Book />,
//     accent: '#06b6d4',
//     tags: ['Sci-fi', 'Philosophy', 'History'],
//     years: '∞',
//     description: 'Getting lost in other worlds, other minds, other centuries. A good book is the most efficient form of time travel available.',
//     image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
//     component: <BookNook />,  // ← opens BookNook when clicked
//   },
//   {
//     title: 'Coffee',
//     subtitle: 'The ritual',
//     icon: <Coffee />,
//     accent: '#fb923c',
//     tags: ['Pour-over', 'Espresso', 'Origin'],
//     years: '7 yrs',
//     description: 'From green bean to cup. The ritual of slow coffee is the only acceptable reason to wake up before 7am.',
//     image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
//     component: null,
//   },
// ];

// // ── Hobby modal ───────────────────────────────────────────────────────────────
// function HobbyModal({ hobby, onClose }) {
//   const overlayBg = useColorModeValue('rgba(247,247,248,0.75)', 'rgba(0,0,0,0.85)');
//   const closeBg   = useColorModeValue('rgba(0,0,0,0.06)',       'rgba(255,255,255,0.06)');
//   const closeBdr  = useColorModeValue('rgba(0,0,0,0.12)',       'rgba(255,255,255,0.10)');
//   const closeCol  = useColorModeValue('gray.500',               'whiteAlpha.500');

//   // Close on Escape
//   useEffect(() => {
//     const onKey = (e) => { if (e.key === 'Escape') onClose(); };
//     window.addEventListener('keydown', onKey);
//     return () => window.removeEventListener('keydown', onKey);
//   }, [onClose]);

//   // Prevent body scroll while open
//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     return () => { document.body.style.overflow = ''; };
//   }, []);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.25 }}
//       style={{
//         position: 'fixed', inset: 0, zIndex: 9999,
//         backdropFilter: 'blur(16px)',
//         backgroundColor: overlayBg,
//         overflowY: 'auto',
//         display: 'flex', flexDirection: 'column',
//       }}
//       onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 32, scale: 0.97 }}
//         animate={{ opacity: 1, y: 0,  scale: 1    }}
//         exit={{    opacity: 0, y: 16, scale: 0.98  }}
//         transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
//         style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '24px 16px 48px' }}
//       >
//         {/* Modal header bar */}
//         <Flex align="center" justify="space-between" mb={6}>
//           <HStack spacing={3}>
//             {/* Accent dot */}
//             <Box w="10px" h="10px" borderRadius="3px" bg={hobby.accent} flexShrink={0} />
//             <Box>
//               <Text fontFamily={MONO} fontSize="8px" letterSpacing="0.25em"
//                 textTransform="uppercase" color={hobby.accent}>
//                 {hobby.subtitle}
//               </Text>
//               <Text fontFamily={H} fontSize={{ base: '18px', md: '24px' }}
//                 fontWeight="900" letterSpacing="-0.02em" color="text.primary">
//                 {hobby.title}
//               </Text>
//             </Box>
//           </HStack>

//           {/* Close button */}
//           <Box
//             as="button" onClick={onClose}
//             display="flex" alignItems="center" justifyContent="center"
//             w="36px" h="36px" borderRadius="10px"
//             bg={closeBg} border="1px solid" borderColor={closeBdr}
//             color={closeCol} cursor="pointer"
//             _hover={{ borderColor: hobby.accent, color: hobby.accent }}
//             transition="all 0.2s"
//             flexShrink={0}
//           >
//             <X size={16} />
//           </Box>
//         </Flex>

//         {/* The hobby's component */}
//         {hobby.component}
//       </motion.div>
//     </motion.div>
//   );
// }

// // ── Main ──────────────────────────────────────────────────────────────────────
// export default function Hobbies() {
//   const trackRef     = useRef(null);
//   const tweenRef     = useRef(null);
//   const isHoveredRef = useRef(false);
//   const [activeIdx, setActiveIdx]     = useState(null);
//   const [openHobby,  setOpenHobby]    = useState(null); // hobby object whose modal is open
//   const [isMobile, setIsMobile]       = useState(false);

//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 768);
//     check();
//     window.addEventListener('resize', check);
//     return () => window.removeEventListener('resize', check);
//   }, []);

//   const CARD_W_IDLE     = isMobile ? 160 : 220;
//   const CARD_W_EXPANDED = isMobile ? 300 : 520;
//   const CARD_W_COMPRESS = isMobile ?  60 :  80;
//   const TRACK_H         = isMobile ? 340 : 480;

//   // ── Auto-scroll (logic untouched) ─────────────────────────────────────────
//   const startScroll = useCallback(() => {
//     const el = trackRef.current;
//     if (!el) return;
//     const totalW = el.scrollWidth - el.clientWidth;
//     tweenRef.current = gsap.to(el, {
//       scrollLeft: totalW, duration: 28, ease: 'none',
//       repeat: -1, repeatRefresh: true,
//       onRepeat: () => { el.scrollLeft = 0; },
//     });
//   }, []);

//   useEffect(() => {
//     startScroll();
//     return () => { tweenRef.current?.kill(); };
//   }, [startScroll]);

//   const pauseScroll = () => {
//     isHoveredRef.current = true;
//     gsap.to(tweenRef.current, { timeScale: 0, duration: 0.6, ease: 'power2.out' });
//   };

//   const resumeScroll = () => {
//     isHoveredRef.current = false;
//     setActiveIdx(null);
//     gsap.to(tweenRef.current, { timeScale: 1, duration: 1.2, ease: 'power2.inOut' });
//   };

//   // When a card is clicked — open modal if it has a component, otherwise just expand
//   const handleCardClick = (hobby, i) => {
//     if (hobby.component) {
//       pauseScroll();
//       setOpenHobby(hobby);
//     }
//   };

//   const handleCloseModal = () => {
//     setOpenHobby(null);
//     resumeScroll();
//   };

//   const subColor = useColorModeValue('gray.400', 'whiteAlpha.350');

//   return (
//     <Box
//       bg="transparent" position="relative" overflow="hidden"
//       display="flex" justifyContent="center"
//       px={{ base: 5, md: 12, lg: 20 }}
//       py={{ base: 20, md: 16 }}
//       fontFamily="'Sora', sans-serif"
//       transition="background-color 0.3s ease"
//     >
//       <Flex direction="column" align="flex-start" w="full" maxW="1200px" mx="auto"
//         gap={8} position="relative" zIndex={1}>

//         {/* ── Header ─────────────────────────────────────────────────── */}
//         <Box>
//           <Flex align="center" gap={3} mb={3}>
//             <Box w="24px" h="1px" flexShrink={0} bgGradient="linear(to-r, #ec4899, #7c3aed)" />
//             <Text fontFamily={H} fontSize="9px" letterSpacing="0.3em"
//               textTransform="uppercase" color="text.eyebrow">
//               Beyond the screen
//             </Text>
//           </Flex>
//           <Text fontFamily={H} fontSize={{ base: '26px', md: '40px' }}
//             fontWeight="900" letterSpacing="-0.02em" lineHeight={1.05}
//             bgGradient="linear(to-r, #7c3aed, #ec4899)" bgClip="text"
//             display="inline-block" w="fit-content">
//             What I Do
//           </Text>
//           <Text fontFamily={H} fontSize={{ base: '26px', md: '40px' }}
//             fontWeight="900" letterSpacing="-0.02em" lineHeight={1.05}
//             color="text.subdued">
//             When I'm Not Coding
//           </Text>
//         </Box>

//         {/* ── Carousel ───────────────────────────────────────────────── */}
//         <Box w="full">
//           <Box
//             position="relative"
//             mx={{ base: '-20px', md: '-48px', lg: '-80px' }}
//             onMouseEnter={pauseScroll}
//             onMouseLeave={resumeScroll}
//             onTouchStart={pauseScroll}
//             onTouchEnd={resumeScroll}
//           >
//             {/* Edge fades */}
//             <Box position="absolute" left={0} top={0} bottom={0}
//               w={{ base: '40px', md: '80px' }} zIndex={3}
//               bgGradient="linear(to-r, var(--chakra-colors-bg-primary, #f7f7f8), transparent)"
//               pointerEvents="none" />
//             <Box position="absolute" right={0} top={0} bottom={0}
//               w={{ base: '40px', md: '80px' }} zIndex={3}
//               bgGradient="linear(to-l, var(--chakra-colors-bg-primary, #f7f7f8), transparent)"
//               pointerEvents="none" />

//             {/* Track */}
//             <Box ref={trackRef} display="flex" alignItems="stretch" gap="12px"
//               overflowX="auto" overflowY="hidden" h={`${TRACK_H}px`} pb={2}
//               px={{ base: '20px', md: '48px', lg: '80px' }}
//               sx={{
//                 scrollbarWidth: 'none',
//                 '&::-webkit-scrollbar': { display: 'none' },
//                 userSelect: 'none',
//               }}
//             >
//               {[...hobbies, ...hobbies].map((hobby, i) => {
//                 const isExpanded   = activeIdx === i;
//                 const isCompressed = activeIdx !== null && !isExpanded;
//                 const hasComponent = Boolean(hobby.component);

//                 return (
//                   <motion.div
//                     key={`${hobby.title}-${i}`}
//                     onHoverStart={() => setActiveIdx(i)}
//                     onHoverEnd={() => setActiveIdx(null)}
//                     onTap={() => {
//                       if (hasComponent) {
//                         handleCardClick(hobby, i);
//                       } else {
//                         setActiveIdx(prev => prev === i ? null : i);
//                       }
//                     }}
//                     animate={{
//                       width: isExpanded ? CARD_W_EXPANDED : isCompressed ? CARD_W_COMPRESS : CARD_W_IDLE,
//                       flexShrink: 0,
//                     }}
//                     transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
//                     style={{
//                       height: `${TRACK_H - 8}px`, flexShrink: 0,
//                       borderRadius: '18px', overflow: 'hidden',
//                       cursor: 'pointer', position: 'relative',
//                     }}
//                   >
//                     {/* Background image */}
//                     <motion.div
//                       animate={{ scale: isExpanded ? 1.04 : 1 }}
//                       transition={{ duration: 0.6, ease: 'easeOut' }}
//                       style={{
//                         position: 'absolute', inset: 0,
//                         backgroundImage: `url(${hobby.image})`,
//                         backgroundSize: 'cover', backgroundPosition: 'center',
//                       }}
//                     />

//                     {/* Dark overlay */}
//                     <motion.div
//                       animate={{ opacity: isExpanded ? 0.55 : isCompressed ? 0.82 : 0.7 }}
//                       transition={{ duration: 0.4 }}
//                       style={{
//                         position: 'absolute', inset: 0,
//                         background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%)',
//                       }}
//                     />

//                     {/* Color tint */}
//                     <motion.div
//                       animate={{ opacity: isExpanded ? 0 : 0.25 }}
//                       transition={{ duration: 0.4 }}
//                       style={{ position: 'absolute', inset: 0, background: hobby.accent, mixBlendMode: 'color' }}
//                     />

//                     {/* Border highlight */}
//                     <motion.div
//                       animate={{ opacity: isExpanded ? 1 : 0 }}
//                       transition={{ duration: 0.3 }}
//                       style={{
//                         position: 'absolute', inset: 0, borderRadius: '18px',
//                         border: `1px solid ${hobby.accent}55`, pointerEvents: 'none',
//                       }}
//                     />

//                     {/* "Click to open" hint — only on cards with a component */}
//                     {hasComponent && isExpanded && (
//                       <motion.div
//                         initial={{ opacity: 0, y: -8 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.2, duration: 0.25 }}
//                         style={{
//                           position: 'absolute', top: 16, left: '50%',
//                           transform: 'translateX(-50%)',
//                           zIndex: 10,
//                         }}
//                       >
//                         <div style={{
//                           fontFamily: MONO, fontSize: '8px',
//                           letterSpacing: '0.2em', textTransform: 'uppercase',
//                           color: hobby.accent,
//                           background: `${hobby.accent}18`,
//                           border: `1px solid ${hobby.accent}40`,
//                           backdropFilter: 'blur(8px)',
//                           borderRadius: '6px', padding: '4px 12px',
//                           whiteSpace: 'nowrap',
//                         }}>
//                           Click to open
//                         </div>
//                       </motion.div>
//                     )}

//                     {/* Collapsed: rotated title */}
//                     <AnimatePresence>
//                       {isCompressed && (
//                         <motion.div
//                           initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//                           transition={{ duration: 0.2 }}
//                           style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//                         >
//                           <div style={{
//                             transform: 'rotate(-90deg)', whiteSpace: 'nowrap',
//                             fontSize: '10px', letterSpacing: '0.2em',
//                             textTransform: 'uppercase', color: `${hobby.accent}99`, fontWeight: 700,
//                           }}>
//                             {hobby.title}
//                           </div>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>

//                     {/* Content (expanded or idle) */}
//                     <AnimatePresence>
//                       {!isCompressed && (
//                         <motion.div
//                           initial={{ opacity: 0, y: 16 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, y: 8 }}
//                           transition={{ duration: 0.35, delay: isExpanded ? 0.15 : 0 }}
//                           style={{
//                             position: 'absolute', inset: 0,
//                             display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
//                             padding: isMobile ? '18px' : '28px',
//                           }}
//                         >
//                           {/* Icon */}
//                           <div style={{
//                             position: 'absolute',
//                             top: isMobile ? 16 : 24, left: isMobile ? 18 : 28,
//                             fontSize: isMobile ? '18px' : '24px',
//                             color: hobby.accent, opacity: isExpanded ? 1 : 0.8,
//                           }}>
//                             {hobby.icon}
//                           </div>

//                           {/* Years pill */}
//                           <div style={{
//                             position: 'absolute',
//                             top: isMobile ? 14 : 22, right: isMobile ? 16 : 24,
//                             fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase',
//                             color: hobby.accent, background: `${hobby.accent}18`,
//                             border: `1px solid ${hobby.accent}35`, borderRadius: '6px',
//                             padding: '4px 10px', opacity: isExpanded ? 1 : 0, transition: 'opacity 0.3s',
//                           }}>
//                             {hobby.years}
//                           </div>

//                           <div>
//                             <div style={{
//                               fontSize: isExpanded ? (isMobile ? '18px' : '22px') : (isMobile ? '13px' : '15px'),
//                               fontWeight: 800, letterSpacing: '-0.02em',
//                               color: 'white', lineHeight: 1.15, marginBottom: '6px',
//                               transition: 'font-size 0.4s',
//                             }}>
//                               {hobby.title}
//                             </div>

//                             {!isExpanded && (
//                               <div style={{
//                                 fontSize: isMobile ? '10px' : '11px',
//                                 color: `${hobby.accent}bb`, marginBottom: '12px',
//                               }}>
//                                 {hobby.subtitle}
//                               </div>
//                             )}

//                             <AnimatePresence>
//                               {isExpanded && !hasComponent && (
//                                 <motion.div
//                                   initial={{ opacity: 0, height: 0 }}
//                                   animate={{ opacity: 1, height: 'auto' }}
//                                   exit={{ opacity: 0, height: 0 }}
//                                   transition={{ duration: 0.35, delay: 0.1 }}
//                                   style={{ overflow: 'hidden' }}
//                                 >
//                                   <div style={{
//                                     fontSize: isMobile ? '12px' : '13px', lineHeight: 1.75,
//                                     color: 'rgba(255,255,255,0.6)', marginBottom: '16px',
//                                     maxWidth: isMobile ? '260px' : '380px',
//                                   }}>
//                                     {hobby.description}
//                                   </div>
//                                 </motion.div>
//                               )}
//                             </AnimatePresence>

//                             <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
//                               {hobby.tags.map(tag => (
//                                 <div key={tag} style={{
//                                   fontSize: '8px', letterSpacing: '0.12em', textTransform: 'uppercase',
//                                   padding: '3px 8px', borderRadius: '5px',
//                                   border: `1px solid ${hobby.accent}45`,
//                                   color: isExpanded ? hobby.accent : `${hobby.accent}88`,
//                                   background: 'transparent', transition: 'color 0.3s, border-color 0.3s',
//                                 }}>
//                                   {tag}
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>

//                   </motion.div>
//                 );
//               })}
//             </Box>
//           </Box>

//           {/* Dot indicators */}
//           <HStack spacing={2} justify="center" mt={6}>
//             {hobbies.map((hobby, i) => (
//               <Box key={i}
//                 w={activeIdx !== null && activeIdx % hobbies.length === i ? '20px' : '6px'}
//                 h="6px" borderRadius="full"
//                 bg={activeIdx !== null && activeIdx % hobbies.length === i ? hobby.accent : 'border.badge'}
//                 transition="all 0.35s cubic-bezier(0.23,1,0.32,1)"
//               />
//             ))}
//           </HStack>
//         </Box>
//       </Flex>

//       {/* ── Hobby modal ─────────────────────────────────────────────── */}
//       <AnimatePresence>
//         {openHobby && (
//           <HobbyModal hobby={openHobby} onClose={handleCloseModal} />
//         )}
//       </AnimatePresence>
//     </Box>
//   );
// }

import { useRef, useState, useEffect } from 'react';
import { Box, Flex, Text, HStack, useColorModeValue } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Camera, Music4, MountainSnow, Book, Coffee, ChevronUp } from 'lucide-react';

// ── Import components that hobby cards can open ───────────────────────────────
// Add more imports here as you build them:
import BookNook from './BookNook';
// import PhotoGallery from './PhotoGallery';

const MONO = "'JetBrains Mono', monospace";
const H    = "'Orbitron', sans-serif";

// ── Hobby data ────────────────────────────────────────────────────────────────
// component: null  → card just expands on hover (existing behaviour)
// component: <X /> → clicking toggles inline panel below the carousel
const hobbies = [
  {
    title: 'Photography',
    subtitle: 'Chasing light',
    icon: <Camera />,
    accent: '#1e40af',
    tags: ['Street', 'Analog', 'Portrait'],
    years: '6 yrs',
    description: 'Chasing light through a 35mm lens. Film photography fanatic with a growing collection of vintage cameras and an unhealthy darkroom habit.',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80',
    component: null,
  },
  {
    title: 'Rock Climbing',
    subtitle: 'Vertical problems',
    icon: <Music4 />,
    accent: '#7c3aed',
    tags: ['Bouldering', 'Sport', 'Outdoor'],
    years: '4 yrs',
    description: 'Problem-solving at altitude. Nothing quite like the focus required when the only thing between you and the ground is grip strength.',
    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=80',
    component: null,
  },
  {
    title: 'Music Production',
    subtitle: 'Sculpting sound',
    icon: <Music4 />,
    accent: '#ec4899',
    tags: ['Ambient', 'Electronic', 'Synths'],
    years: '5 yrs',
    description: 'Patching synthesizers and sculpting sound. Each session is a conversation with a machine that has no memory and infinite patience.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80',
    component: null,
  },
  {
    title: 'Hiking',
    subtitle: 'Moving meditation',
    icon: <MountainSnow />,
    accent: '#059669',
    tags: ['Trail', 'Alpine', 'Endurance'],
    years: '8 yrs',
    description: 'Running as moving meditation. The body becomes background noise and the mind goes somewhere else entirely past mile 15.',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    component: null,
  },
  {
    title: 'Reading',
    subtitle: 'Other worlds',
    icon: <Book />,
    accent: '#06b6d4',
    tags: ['Sci-fi', 'Philosophy', 'History'],
    years: '∞',
    description: 'Getting lost in other worlds, other minds, other centuries. A good book is the most efficient form of time travel available.',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
    component: () => <BookNook />,   // ← lazy: only mounts when panel opens
  },
  {
    title: 'Coffee',
    subtitle: 'The ritual',
    icon: <Coffee />,
    accent: '#fb923c',
    tags: ['Pour-over', 'Espresso', 'Origin'],
    years: '7 yrs',
    description: 'From green bean to cup. The ritual of slow coffee is the only acceptable reason to wake up before 7am.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    component: null,
  },
];

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Hobbies() {
  const trackRef     = useRef(null);
  const tweenRef     = useRef(null);
  const panelRef     = useRef(null);
  const isHoveredRef = useRef(false);

  const [activeIdx,   setActiveIdx]   = useState(null); // hovered card index
  const [openHobby, setOpenHobby] = useState(null);

  // ── isMobile as a REF so it never triggers a re-render (which would
  //    remount the track element and break the GSAP tween target) ────────────
  const isMobileRef = useRef(window.innerWidth < 768);
  const [isMobile,  setIsMobile]  = useState(isMobileRef.current);

  useEffect(() => {
    const check = () => {
      isMobileRef.current = window.innerWidth < 768;
      setIsMobile(isMobileRef.current); // still needed for card width re-calc
    };
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const CARD_W_IDLE     = isMobile ? 160 : 220;
  const CARD_W_EXPANDED = isMobile ? 300 : 520;
  const CARD_W_COMPRESS = isMobile ?  60 :  80;
  const TRACK_H         = isMobile ? 340 : 480;

  // ── Auto-scroll — runs ONCE on mount, never re-runs ──────────────────────
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // Small delay so the track is fully painted before measuring scrollWidth
    const id = setTimeout(() => {
      const totalW = el.scrollWidth - el.clientWidth;
      tweenRef.current = gsap.to(el, {
        scrollLeft: totalW,
        duration: 28,
        ease: 'none',
        repeat: -1,
        repeatRefresh: true,
        onRepeat: () => { el.scrollLeft = 0; },
      });
    }, 100);

    return () => {
      clearTimeout(id);
      tweenRef.current?.kill();
    };
  }, []); // ← empty deps: never restarts, tween target never changes

  const pauseScroll = () => {
    isHoveredRef.current = true;
    gsap.to(tweenRef.current, { timeScale: 0, duration: 0.6, ease: 'power2.out' });
  };

  const resumeScroll = () => {
    isHoveredRef.current = false;
    setActiveIdx(null);
    gsap.to(tweenRef.current, { timeScale: 1, duration: 1.2, ease: 'power2.inOut' });
  };

  // Clicking a card with a component toggles the inline panel
  const handleCardClick = (hobby) => {
    if (typeof hobby.component !== 'function') return;
    setOpenHobby(prev => prev?.title === hobby.title ? null : hobby);
    // Scroll panel into view after animation settles
    if (!openHobby || openHobby.title !== hobby.title) {
      setTimeout(() => {
        panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  // Tokens
  const panelBg    = useColorModeValue('rgba(247,247,248,0.92)', 'rgba(10,10,10,0.82)');
  const panelBdr   = useColorModeValue('rgba(0,0,0,0.08)',       'rgba(255,255,255,0.06)');
  const closeBg    = useColorModeValue('rgba(0,0,0,0.04)',       'rgba(255,255,255,0.04)');
  const closeColor = useColorModeValue('gray.400',               'whiteAlpha.400');
  const subColor   = useColorModeValue('gray.400',               'whiteAlpha.350');

  return (
    <Box
      bg="transparent" position="relative" overflow="hidden"
      display="flex" justifyContent="center"
      px={{ base: 5, md: 12, lg: 20 }}
      py={{ base: 20, md: 16 }}
      fontFamily="'Sora', sans-serif"
      transition="background-color 0.3s ease"
    >
      <Flex direction="column" align="flex-start" w="full" maxW="1200px"
        mx="auto" gap={8} position="relative" zIndex={1}>

        {/* ── Header ─────────────────────────────────────────────────── */}
        <Box>
          <Flex align="center" gap={3} mb={3}>
            <Box w="24px" h="1px" flexShrink={0} bgGradient="linear(to-r, #ec4899, #7c3aed)" />
            <Text fontFamily={H} fontSize="9px" letterSpacing="0.3em"
              textTransform="uppercase" color="text.eyebrow">
              Beyond the screen
            </Text>
          </Flex>
          <Text fontFamily={H} fontSize={{ base: '26px', md: '40px' }}
            fontWeight="900" letterSpacing="-0.02em" lineHeight={1.05}
            bgGradient="linear(to-r, #7c3aed, #ec4899)" bgClip="text"
            display="inline-block" w="fit-content">
            What I Do
          </Text>
          <Text fontFamily={H} fontSize={{ base: '26px', md: '40px' }}
            fontWeight="900" letterSpacing="-0.02em" lineHeight={1.05}
            color="text.subdued">
            When I'm Not Coding
          </Text>
        </Box>

        {/* ── Carousel ───────────────────────────────────────────────── */}
        <Box w="full">
          <Box
            position="relative"
            mx={{ base: '-20px', md: '-48px', lg: '-80px' }}
            onMouseEnter={pauseScroll}
            onMouseLeave={resumeScroll}
            onTouchStart={pauseScroll}
            onTouchEnd={resumeScroll}
          >
            {/* Edge fades */}
            <Box position="absolute" left={0} top={0} bottom={0}
              w={{ base: '40px', md: '80px' }} zIndex={3}
              bgGradient="linear(to-r, var(--chakra-colors-bg-primary, #f7f7f8), transparent)"
              pointerEvents="none" />
            <Box position="absolute" right={0} top={0} bottom={0}
              w={{ base: '40px', md: '80px' }} zIndex={3}
              bgGradient="linear(to-l, var(--chakra-colors-bg-primary, #f7f7f8), transparent)"
              pointerEvents="none" />

            {/* Track */}
            <Box ref={trackRef} display="flex" alignItems="stretch" gap="12px"
              overflowX="auto" overflowY="hidden" h={`${TRACK_H}px`} pb={2}
              px={{ base: '20px', md: '48px', lg: '80px' }}
              sx={{
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
                userSelect: 'none',
              }}
            >
              {[...hobbies, ...hobbies].map((hobby, i) => {
                const isExpanded   = activeIdx === i;
                const isCompressed = activeIdx !== null && !isExpanded;
                const hasComponent = typeof hobby.component === 'function';
                const isOpen       = openHobby?.title === hobby.title;

                return (
                  <motion.div
                    key={`${hobby.title}-${i}`}
                    onHoverStart={() => setActiveIdx(i)}
                    onHoverEnd={() => setActiveIdx(null)}
                    onTap={() => {
                      if (hasComponent) {
                        handleCardClick(hobby);
                      } else {
                        setActiveIdx(prev => prev === i ? null : i);
                      }
                    }}
                    animate={{
                      width: isExpanded ? CARD_W_EXPANDED : isCompressed ? CARD_W_COMPRESS : CARD_W_IDLE,
                    }}
                    transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                    style={{
                      height: `${TRACK_H - 8}px`, flexShrink: 0,
                      borderRadius: '18px', overflow: 'hidden',
                      cursor: 'pointer', position: 'relative',
                    }}
                  >
                    {/* Background image */}
                    <motion.div
                      animate={{ scale: isExpanded ? 1.04 : 1 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: `url(${hobby.image})`,
                        backgroundSize: 'cover', backgroundPosition: 'center',
                      }}
                    />

                    {/* Dark overlay */}
                    <motion.div
                      animate={{ opacity: isExpanded ? 0.55 : isCompressed ? 0.82 : 0.7 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%)',
                      }}
                    />

                    {/* Color tint */}
                    <motion.div
                      animate={{ opacity: isExpanded ? 0 : 0.25 }}
                      transition={{ duration: 0.4 }}
                      style={{ position: 'absolute', inset: 0, background: hobby.accent, mixBlendMode: 'color' }}
                    />

                    {/* Active border — also lit when panel is open */}
                    <motion.div
                      animate={{ opacity: isExpanded || isOpen ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        position: 'absolute', inset: 0, borderRadius: '18px',
                        border: `1px solid ${hobby.accent}${isOpen ? '99' : '55'}`,
                        pointerEvents: 'none',
                      }}
                    />

                    {/* "Click to open / click to close" hint */}
                    {hasComponent && isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.2 }}
                        style={{
                          position: 'absolute', top: 16, left: '50%',
                          transform: 'translateX(-50%)', zIndex: 10,
                        }}
                      >
                        <div style={{
                          fontFamily: MONO, fontSize: '8px',
                          letterSpacing: '0.2em', textTransform: 'uppercase',
                          color: hobby.accent,
                          background: `${hobby.accent}18`,
                          border: `1px solid ${hobby.accent}40`,
                          backdropFilter: 'blur(8px)',
                          borderRadius: '6px', padding: '4px 12px',
                          whiteSpace: 'nowrap',
                        }}>
                          {isOpen ? '↑ close' : '↓ open shelf'}
                        </div>
                      </motion.div>
                    )}

                    {/* Collapsed: rotated title */}
                    <AnimatePresence>
                      {isCompressed && (
                        <motion.div
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <div style={{
                            transform: 'rotate(-90deg)', whiteSpace: 'nowrap',
                            fontSize: '10px', letterSpacing: '0.2em',
                            textTransform: 'uppercase', color: `${hobby.accent}99`, fontWeight: 700,
                          }}>
                            {hobby.title}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Content (expanded or idle) */}
                    <AnimatePresence>
                      {!isCompressed && (
                        <motion.div
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.35, delay: isExpanded ? 0.15 : 0 }}
                          style={{
                            position: 'absolute', inset: 0,
                            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                            padding: isMobile ? '18px' : '28px',
                          }}
                        >
                          {/* Icon */}
                          <div style={{
                            position: 'absolute',
                            top: isMobile ? 16 : 24, left: isMobile ? 18 : 28,
                            fontSize: isMobile ? '18px' : '24px',
                            color: hobby.accent, opacity: isExpanded ? 1 : 0.8,
                          }}>
                            {hobby.icon}
                          </div>

                          {/* Years pill */}
                          <div style={{
                            position: 'absolute',
                            top: isMobile ? 14 : 22, right: isMobile ? 16 : 24,
                            fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase',
                            color: hobby.accent, background: `${hobby.accent}18`,
                            border: `1px solid ${hobby.accent}35`, borderRadius: '6px',
                            padding: '4px 10px',
                            opacity: isExpanded ? 1 : 0, transition: 'opacity 0.3s',
                          }}>
                            {hobby.years}
                          </div>

                          <div>
                            <div style={{
                              fontSize: isExpanded ? (isMobile ? '18px' : '22px') : (isMobile ? '13px' : '15px'),
                              fontWeight: 800, letterSpacing: '-0.02em',
                              color: 'white', lineHeight: 1.15, marginBottom: '6px',
                              transition: 'font-size 0.4s',
                            }}>
                              {hobby.title}
                            </div>

                            {!isExpanded && (
                              <div style={{
                                fontSize: isMobile ? '10px' : '11px',
                                color: `${hobby.accent}bb`, marginBottom: '12px',
                              }}>
                                {hobby.subtitle}
                              </div>
                            )}

                            {/* Description — only for cards without a component */}
                            <AnimatePresence>
                              {isExpanded && !hasComponent && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.35, delay: 0.1 }}
                                  style={{ overflow: 'hidden' }}
                                >
                                  <div style={{
                                    fontSize: isMobile ? '12px' : '13px', lineHeight: 1.75,
                                    color: 'rgba(255,255,255,0.6)', marginBottom: '16px',
                                    maxWidth: isMobile ? '260px' : '380px',
                                  }}>
                                    {hobby.description}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              {hobby.tags.map(tag => (
                                <div key={tag} style={{
                                  fontSize: '8px', letterSpacing: '0.12em', textTransform: 'uppercase',
                                  padding: '3px 8px', borderRadius: '5px',
                                  border: `1px solid ${hobby.accent}45`,
                                  color: isExpanded ? hobby.accent : `${hobby.accent}88`,
                                  background: 'transparent', transition: 'color 0.3s, border-color 0.3s',
                                }}>
                                  {tag}
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </motion.div>
                );
              })}
            </Box>
          </Box>

          {/* Dot indicators */}
          <HStack spacing={2} justify="center" mt={6}>
            {hobbies.map((hobby, i) => (
              <Box key={i}
                w={activeIdx !== null && activeIdx % hobbies.length === i ? '20px' : '6px'}
                h="6px" borderRadius="full"
                bg={activeIdx !== null && activeIdx % hobbies.length === i ? hobby.accent : 'border.badge'}
                transition="all 0.35s cubic-bezier(0.23,1,0.32,1)"
              />
            ))}
          </HStack>
        </Box>

        {/* ── Inline panel — slides open below the carousel ──────────── */}
        <AnimatePresence>
          {openHobby && (
            <motion.div
              ref={panelRef}
              key={openHobby.title}
              initial={{ opacity: 0, height: 0, y: -16 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{   opacity: 0, height: 0,    y: -8  }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              style={{ width: '100%', overflow: 'hidden' }}
            >
              <Box
                bg={panelBg} backdropFilter="blur(12px)"
                border="1px solid" borderColor={panelBdr}
                borderRadius="20px" position="relative" overflow="hidden"
                // Top accent stripe in the hobby's accent color
                _before={{
                  content: '""', position: 'absolute', top: 0, left: 0, right: 0, h: '2px',
                  background: `linear-gradient(to right, ${openHobby.accent}, ${openHobby.accent}44, transparent)`,
                }}
              >
                {/* Panel header */}
                <Flex align="center" justify="space-between"
                  px={{ base: 5, md: 8 }} pt={6} pb={4}
                  borderBottom="1px solid" borderColor={panelBdr}>
                  <HStack spacing={3}>
                    <Box w="8px" h="8px" borderRadius="2px" bg={openHobby.accent} flexShrink={0} />
                    <Box>
                      <Text fontFamily={MONO} fontSize="8px" letterSpacing="0.25em"
                        textTransform="uppercase" color={openHobby.accent}>
                        {openHobby.subtitle}
                      </Text>
                      <Text fontFamily={H} fontSize={{ base: '16px', md: '20px' }}
                        fontWeight="900" letterSpacing="-0.02em" color="text.primary">
                        {openHobby.title}
                      </Text>
                    </Box>
                  </HStack>

                  {/* Close button */}
                  <Box as="button"
                    onClick={() => setOpenHobby(null)}
                    display="flex" alignItems="center" gap={1.5}
                    fontFamily={MONO} fontSize="8px" letterSpacing="0.15em"
                    textTransform="uppercase"
                    px={3} py={1.5} borderRadius="8px"
                    bg={closeBg} border="1px solid" borderColor={panelBdr}
                    color={closeColor} cursor="pointer"
                    _hover={{ borderColor: openHobby.accent, color: openHobby.accent }}
                    transition="all 0.2s"
                  >
                    <ChevronUp size={12} />
                    Close
                  </Box>
                </Flex>

                {/* The hobby's component — called as function so it only mounts here */}
                <Box px={{ base: 5, md: 8 }} py={6}>
                  {openHobby.component()}
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

      </Flex>
    </Box>
  );
}