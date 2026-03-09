// // // import { useRef, useState, useEffect } from 'react';
// // // import { Box, Text, HStack, VStack, chakra } from '@chakra-ui/react';
// // // import {
// // //   motion, useScroll, useTransform,
// // //   useMotionValue, useSpring, animate,
// // // } from 'framer-motion';

// // // const H    = 'Orbitron, sans-serif';
// // // const B    = 'Sora, sans-serif';
// // // const MONO = "'JetBrains Mono', monospace";
// // // const TEAL = '#14b8a6';

// // // // ── Scramble ──────────────────────────────────────────────────────────────────
// // // const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&';
// // // function useScramble(target, trigger) {
// // //   const [out, setOut] = useState(target);
// // //   const t = useRef(null);
// // //   useEffect(() => {
// // //     if (!trigger) return;
// // //     let i = 0;
// // //     clearInterval(t.current);
// // //     t.current = setInterval(() => {
// // //       setOut(target.split('').map((c, j) => {
// // //         if (c === ' ') return ' ';
// // //         if (j < i) return target[j];
// // //         return CHARS[Math.floor(Math.random() * CHARS.length)];
// // //       }).join(''));
// // //       if (i >= target.length) clearInterval(t.current);
// // //       i += 0.55;
// // //     }, 28);
// // //     return () => clearInterval(t.current);
// // //   }, [trigger, target]);
// // //   return out;
// // // }

// // // // ── Count-up ──────────────────────────────────────────────────────────────────
// // // function CountUp({ to, suffix = '', trigger }) {
// // //   const [v, setV] = useState(0);
// // //   const isNum = !isNaN(parseInt(to));
// // //   useEffect(() => {
// // //     if (!trigger || !isNum) return;
// // //     const c = animate(0, parseInt(to), {
// // //       duration: 1.6, ease: [0.16, 1, 0.3, 1],
// // //       onUpdate: n => setV(Math.floor(n)),
// // //     });
// // //     return () => c.stop();
// // //   }, [trigger, to, isNum]);
// // //   return <>{isNum ? `${v}${suffix}` : to}</>;
// // // }

// // // // ── Magnetic ──────────────────────────────────────────────────────────────────
// // // function Magnetic({ children, strength = 0.28 }) {
// // //   const ref = useRef(null);
// // //   const mx = useMotionValue(0), my = useMotionValue(0);
// // //   const sx = useSpring(mx, { stiffness: 200, damping: 22 });
// // //   const sy = useSpring(my, { stiffness: 200, damping: 22 });
// // //   return (
// // //     <motion.div ref={ref} style={{ x: sx, y: sy, display: 'inline-block' }}
// // //       onMouseMove={e => {
// // //         const r = ref.current.getBoundingClientRect();
// // //         mx.set((e.clientX - (r.left + r.width  / 2)) * strength);
// // //         my.set((e.clientY - (r.top  + r.height / 2)) * strength);
// // //       }}
// // //       onMouseLeave={() => { mx.set(0); my.set(0); }}
// // //     >{children}</motion.div>
// // //   );
// // // }

// // // // ── Inline highlight ──────────────────────────────────────────────────────────
// // // const Hl = ({ children, color = '#7c3aed' }) => {
// // //   const [h, setH] = useState(false);
// // //   return (
// // //     <chakra.span fontWeight="700" color="white" position="relative" cursor="default"
// // //       onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
// // //       {children}
// // //       <chakra.span position="absolute" bottom="0.05em" left={0} height="0.2em"
// // //         bg={color} opacity={0.45} zIndex={-1}
// // //         style={{ width: h ? '100%' : '0%', transition: 'width 0.35s cubic-bezier(0.23,1,0.32,1)' }}
// // //       />
// // //     </chakra.span>
// // //   );
// // // };

// // // // ── Tagline ticker ────────────────────────────────────────────────────────────
// // // const LINES = [
// // //   'Making pixels behave since 2020.',
// // //   'CSS is my love language.',
// // //   'Ships fast. Iterates faster.',
// // //   'Debugging is detective work.',
// // //   'Dark mode only. Obviously.',
// // // ];
// // // function Ticker() {
// // //   const [i, setI] = useState(0);
// // //   const [vis, setVis] = useState(true);
// // //   useEffect(() => {
// // //     const t = setInterval(() => {
// // //       setVis(false);
// // //       setTimeout(() => { setI(n => (n + 1) % LINES.length); setVis(true); }, 380);
// // //     }, 3000);
// // //     return () => clearInterval(t);
// // //   }, []);
// // //   return (
// // //     <HStack spacing={2} mt={2}>
// // //       <Box w="6px" h="6px" borderRadius="full" bg={TEAL} flexShrink={0}
// // //         style={{ animation: 'ab-ping 1.8s cubic-bezier(0,0,0.2,1) infinite' }} />
// // //       <Text fontFamily={MONO} fontSize="11px" color="whiteAlpha.350"
// // //         style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(6px)',
// // //           transition: 'opacity 0.32s, transform 0.32s' }}>
// // //         {LINES[i]}
// // //       </Text>
// // //     </HStack>
// // //   );
// // // }

// // // // ── Polaroid card — same idea as Hobbies cards ────────────────────────────────
// // // // image IS the card; overlay + text sit on top
// // // const Polaroid = ({ src, label, rotate, w, h, delay, style: extraStyle }) => {
// // //   const [hov, setHov] = useState(false);
// // //   return (
// // //     <motion.div
// // //       initial={{ opacity: 0, scale: 0.85, rotate: rotate - 6 }}
// // //       animate={{ opacity: 1, scale: 1,    rotate }}
// // //       whileHover={{ scale: 1.06, rotate: 0, zIndex: 30 }}
// // //       transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
// // //       onHoverStart={() => setHov(true)}
// // //       onHoverEnd={() => setHov(false)}
// // //       style={{ position: 'absolute', width: w, cursor: 'default', ...extraStyle }}
// // //     >
// // //       <Box
// // //         borderRadius="10px" overflow="hidden"
// // //         border="1px solid"
// // //         borderColor={hov ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)'}
// // //         boxShadow={hov ? '0 24px 64px rgba(0,0,0,0.7)' : '0 8px 32px rgba(0,0,0,0.55)'}
// // //         transition="border-color 0.3s, box-shadow 0.3s"
// // //         position="relative"
// // //       >
// // //         {/* The image */}
// // //         <div style={{
// // //           width: '100%', height: h,
// // //           backgroundImage: `url(${src})`,
// // //           backgroundSize: 'cover',
// // //           backgroundPosition: 'center',
// // //           filter: hov ? 'saturate(1.1) brightness(1.05)' : 'saturate(0.75) brightness(0.85)',
// // //           transition: 'filter 0.5s',
// // //         }} />

// // //         {/* Dark gradient bottom */}
// // //         <div style={{
// // //           position: 'absolute', inset: 0,
// // //           background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)',
// // //           pointerEvents: 'none',
// // //         }} />

// // //         {/* Shimmer sweep on hover — exact same as Hobbies */}
// // //         <div style={{
// // //           position: 'absolute', inset: 0, pointerEvents: 'none',
// // //           background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)',
// // //           transform: hov ? 'translateX(100%)' : 'translateX(-100%)',
// // //           transition: 'transform 0.6s',
// // //         }} />

// // //         {/* Label */}
// // //         {label && (
// // //           <div style={{
// // //             position: 'absolute', bottom: 10, left: 12,
// // //             fontFamily: H, fontSize: '8px', letterSpacing: '0.18em',
// // //             textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
// // //           }}>
// // //             {label}
// // //           </div>
// // //         )}
// // //       </Box>
// // //     </motion.div>
// // //   );
// // // };

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // export default function AboutPart() {
// // //   const ref = useRef(null);
// // //   const [visible, setVisible] = useState(false);

// // //   const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
// // //   // Hero bg drifts up as you scroll down — same parallax as Hobbies bg images
// // //   const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

// // //   useEffect(() => {
// // //     const obs = new IntersectionObserver(
// // //       ([e]) => { if (e.isIntersecting) setVisible(true); },
// // //       { threshold: 0.12 }
// // //     );
// // //     if (ref.current) obs.observe(ref.current);
// // //     return () => obs.disconnect();
// // //   }, []);

// // //   const s1 = useScramble("CAN'T", visible);
// // //   const s2 = useScramble('DRAW.',  visible);

// // //   return (
// // //     <Box ref={ref} position="relative">

// // //       {/* ════════════════════════════════════════════════════════════════
// // //           HERO — full-bleed image card, text on top
// // //           Same technique as each Hobbies card
// // //       ════════════════════════════════════════════════════════════════ */}
// // //       <Box
// // //         position="relative"
// // //         borderRadius="20px"
// // //         overflow="hidden"
// // //         h={{ base: '520px', md: '600px', lg: '640px' }}
// // //         mb={14}
// // //       >
// // //         {/* ── Background image — parallax scrolls independently ── */}
// // //         <motion.div
// // //           style={{
// // //             y: bgY,
// // //             position: 'absolute', inset: '-10%',
// // //             backgroundImage: "url('/avatar.jpg')",  // ← your photo
// // //             backgroundSize: 'cover',
// // //             backgroundPosition: 'center top',
// // //             zIndex: 0,
// // //           }}
// // //         />

// // //         {/* ── Dark overlay — same pattern as Hobbies cards ── */}
// // //         <div style={{
// // //           position: 'absolute', inset: 0, zIndex: 1,
// // //           background: 'linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.15) 100%)',
// // //         }} />
// // //         {/* left vignette so text pops */}
// // //         <div style={{
// // //           position: 'absolute', inset: 0, zIndex: 1,
// // //           background: 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.05) 55%)',
// // //         }} />

// // //         {/* ── Floating polaroid images ── */}
// // //         {/* Top-right: workspace shot */}
// // //         <Polaroid
// // //           src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&q=80"
// // //           label="workspace"
// // //           w="160px" h="110px"
// // //           rotate={4} delay={0.4}
// // //           style={{ top: '6%', right: '4%', zIndex: 5 }}
// // //         />
// // //         {/* Mid-right: code on screen */}
// // //         <Polaroid
// // //           src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&q=80"
// // //           label="in the zone"
// // //           w="130px" h="130px"
// // //           rotate={-3} delay={0.55}
// // //           style={{ top: '36%', right: '9%', zIndex: 5 }}
// // //         />
// // //         {/* Bottom-right: coffee */}
// // //         <Polaroid
// // //           src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80"
// // //           label="fuel"
// // //           w="110px" h="90px"
// // //           rotate={5} delay={0.7}
// // //           style={{ bottom: '12%', right: '3%', zIndex: 5 }}
// // //         />

// // //         {/* ── Text sits on top of the image ── */}
// // //         <Box position="absolute" inset={0} zIndex={6}
// // //           p={{ base: 8, md: 12, lg: 14 }}
// // //           display="flex" flexDirection="column" justifyContent="flex-end">

// // //           {/* Eyebrow */}
// // //           <motion.div initial={{ opacity: 0, x: -18 }}
// // //             animate={visible ? { opacity: 1, x: 0 } : {}}
// // //             transition={{ duration: 0.45 }}>
// // //             <HStack spacing={3} mb={5}>
// // //               <Box w="20px" h="1px"
// // //                 style={{ background: 'linear-gradient(to right, #ec4899, #7c3aed)' }} />
// // //               <Text fontFamily={H} fontSize="9px" letterSpacing="0.3em"
// // //                 textTransform="uppercase" color="whiteAlpha.500">
// // //                 Who I am
// // //               </Text>
// // //             </HStack>
// // //           </motion.div>

// // //           {/* Big scrambled heading */}
// // //           <motion.div initial={{ opacity: 0, y: 28 }}
// // //             animate={visible ? { opacity: 1, y: 0 } : {}}
// // //             transition={{ duration: 0.6, delay: 0.08 }}>
// // //             <Text
// // //               fontFamily={H} fontWeight="900" letterSpacing="-0.03em"
// // //               lineHeight={0.9} userSelect="none"
// // //               fontSize={{ base: '48px', md: '72px', lg: '88px' }}
// // //             >
// // //               <chakra.span color="white">I </chakra.span>
// // //               <chakra.span color={TEAL}>{s1}</chakra.span>
// // //               {' '}
// // //               <chakra.span color="rgba(255,255,255,0.22)">{s2}</chakra.span>
// // //               <br />
// // //               <chakra.span style={{
// // //                 background: 'linear-gradient(135deg, #1e40af, #7c3aed, #ec4899)',
// // //                 WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
// // //               }}>
// // //                 on paper.
// // //               </chakra.span>
// // //             </Text>
// // //           </motion.div>

// // //           {/* Sub copy */}
// // //           <motion.div initial={{ opacity: 0, y: 16 }}
// // //             animate={visible ? { opacity: 1, y: 0 } : {}}
// // //             transition={{ duration: 0.5, delay: 0.28 }}>
// // //             <Text fontFamily={B} fontSize={{ base: '14px', md: '16px' }}
// // //               lineHeight={1.85} color="whiteAlpha.550" maxW="480px" mt={6}>
// // //               Never could sketch. But when I discovered the browser,{' '}
// // //               <Hl color="#7c3aed">code became my canvas.</Hl>{' '}
// // //               CSS became my paintbrush — suddenly everything I visualised
// // //               had somewhere to live.
// // //             </Text>
// // //           </motion.div>

// // //           {/* Open-to-work badge */}
// // //           <motion.div initial={{ opacity: 0 }}
// // //             animate={visible ? { opacity: 1 } : {}}
// // //             transition={{ delay: 0.45, duration: 0.4 }}>
// // //             <Magnetic strength={0.3}>
// // //               <Box
// // //                 display="inline-flex" alignItems="center" gap={2}
// // //                 mt={6} px={4} py={2.5}
// // //                 bg="rgba(8,8,8,0.82)" backdropFilter="blur(20px)"
// // //                 border="1px solid rgba(20,184,166,0.35)"
// // //                 borderRadius="8px"
// // //               >
// // //                 <Box w="7px" h="7px" borderRadius="full" bg={TEAL} flexShrink={0}
// // //                   style={{ animation: 'ab-ping 1.8s cubic-bezier(0,0,0.2,1) infinite' }} />
// // //                 <Text fontFamily={H} fontSize="8px" letterSpacing="0.18em"
// // //                   textTransform="uppercase" color={TEAL}>
// // //                   Open to work
// // //                 </Text>
// // //               </Box>
// // //             </Magnetic>
// // //           </motion.div>

// // //         </Box>
// // //       </Box>

// // //       {/* ════════════════════════════════════════════════════════════════
// // //           BELOW HERO — second para, stats, small image strip
// // //       ════════════════════════════════════════════════════════════════ */}
// // //       <Box display="flex" gap={{ base: 10, lg: 16 }}
// // //         flexDirection={{ base: 'column', lg: 'row' }} alignItems="flex-start">

// // //         {/* Left — copy + stats + ticker */}
// // //         <Box flex={1} minW={0}>

// // //           <motion.div initial={{ opacity: 0, y: 18 }}
// // //             animate={visible ? { opacity: 1, y: 0 } : {}}
// // //             transition={{ duration: 0.5, delay: 0.4 }}>
// // //             <Text fontFamily={B} fontSize={{ base: '14px', md: '15px' }}
// // //               lineHeight={1.9} color="whiteAlpha.500" mb={8}>
// // //               Now I build interfaces that feel{' '}
// // //               <Hl color={TEAL}>alive</Hl> — where motion carries meaning,
// // //               layouts break expectations, and{' '}
// // //               <Hl color="#ec4899">the scroll becomes a story.</Hl>{' '}
// // //               I obsess over the details nobody notices until they're gone.
// // //             </Text>
// // //           </motion.div>

// // //           {/* Stats */}
// // //           <motion.div initial={{ opacity: 0, y: 14 }}
// // //             animate={visible ? { opacity: 1, y: 0 } : {}}
// // //             transition={{ duration: 0.45, delay: 0.52 }}>
// // //             <HStack spacing={3} flexWrap="wrap" mb={6}>
// // //               {[
// // //                 { v: '4',  s: '+', l: 'Years exp.', c: TEAL      },
// // //                 { v: '30', s: '+', l: 'Projects',   c: '#a855f7' },
// // //                 { v: '∞',  s: '',  l: 'Curiosity',  c: '#3b82f6' },
// // //               ].map(({ v, s, l, c }) => (
// // //                 <Magnetic key={l} strength={0.22}>
// // //                   <Box px={5} py={4} borderRadius="10px" minW="82px"
// // //                     bg="rgba(255,255,255,0.025)" backdropFilter="blur(12px)"
// // //                     border="1px solid rgba(255,255,255,0.07)"
// // //                     transition="border-color 0.3s"
// // //                     _hover={{ borderColor: `${c}40` }}>
// // //                     <Text fontFamily={H} fontSize="26px" fontWeight="900"
// // //                       lineHeight={1} mb={1}
// // //                       style={{ background: `linear-gradient(135deg, ${c}, ${c}55)`,
// // //                         WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
// // //                       <CountUp to={v} suffix={s} trigger={visible} />
// // //                     </Text>
// // //                     <Text fontFamily={H} fontSize="8px" letterSpacing="0.2em"
// // //                       textTransform="uppercase" color="whiteAlpha.350">{l}</Text>
// // //                   </Box>
// // //                 </Magnetic>
// // //               ))}
// // //             </HStack>
// // //           </motion.div>

// // //           <motion.div initial={{ opacity: 0 }}
// // //             animate={visible ? { opacity: 1 } : {}}
// // //             transition={{ delay: 0.68 }}>
// // //             <Ticker />
// // //           </motion.div>
// // //         </Box>

// // //         {/* Right — vertical strip of image cards, same as Hobbies */}
// // //         <motion.div
// // //           initial={{ opacity: 0, x: 28 }}
// // //           animate={visible ? { opacity: 1, x: 0 } : {}}
// // //           transition={{ duration: 0.65, delay: 0.35 }}
// // //           style={{ flexShrink: 0, display: 'flex', gap: 10, alignItems: 'flex-start' }}
// // //         >
// // //           {/* Tall card */}
// // //           <Box borderRadius="14px" overflow="hidden" w="130px"
// // //             border="1px solid rgba(255,255,255,0.07)"
// // //             boxShadow="0 8px 32px rgba(0,0,0,0.5)">
// // //             <div style={{
// // //               width: '100%', height: 210,
// // //               backgroundImage: "url('https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=400&q=80')",
// // //               backgroundSize: 'cover', backgroundPosition: 'center',
// // //               filter: 'saturate(0.7) brightness(0.85)',
// // //             }} />
// // //           </Box>

// // //           {/* Two stacked cards */}
// // //           <Box display="flex" flexDirection="column" gap={2.5} w="104px">
// // //             {[
// // //               { src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80', h: 98 },
// // //               { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80', h: 104 },
// // //             ].map(({ src, h }, i) => (
// // //               <Box key={i} borderRadius="12px" overflow="hidden"
// // //                 border="1px solid rgba(255,255,255,0.07)"
// // //                 boxShadow="0 6px 20px rgba(0,0,0,0.45)">
// // //                 <div style={{
// // //                   width: '100%', height: h,
// // //                   backgroundImage: `url(${src})`,
// // //                   backgroundSize: 'cover', backgroundPosition: 'center',
// // //                   filter: 'saturate(0.7) brightness(0.8)',
// // //                 }} />
// // //               </Box>
// // //             ))}
// // //           </Box>
// // //         </motion.div>

// // //       </Box>

// // //       <style>{`
// // //         @keyframes ab-ping {
// // //           75%, 100% { transform: scale(2.2); opacity: 0; }
// // //         }
// // //       `}</style>
// // //     </Box>
// // //   );
// // // }

// // import { useState, useEffect, useRef } from "react";
// // import { keyframes } from "@emotion/react";
// // import {
// //   Box,
// //   Flex,
// //   Text,
// //   VStack,
// //   HStack,
// //   Badge,
// //   Avatar,
// //   chakra,
// //   shouldForwardProp,
// // } from "@chakra-ui/react";
// // import { isValidMotionProp, motion } from "framer-motion";

// // // ─── Motion wrappers ────────────────────────────────────────────────────────
// // const MotionBox = chakra(motion.div, {
// //   shouldForwardProp: (p) => isValidMotionProp(p) || shouldForwardProp(p),
// // });

// // // ─── Keyframe animations ─────────────────────────────────────────────────────
// // const float = keyframes`
// //   0%,100% { transform: translateY(0px) rotate(0deg); }
// //   33%      { transform: translateY(-12px) rotate(1deg); }
// //   66%      { transform: translateY(-6px) rotate(-1deg); }
// // `;
// // const pulse = keyframes`
// //   0%,100% { opacity: 0.4; transform: scale(1); }
// //   50%      { opacity: 0.8; transform: scale(1.05); }
// // `;
// // const gradientShift = keyframes`
// //   0%   { background-position: 0% 50%; }
// //   50%  { background-position: 100% 50%; }
// //   100% { background-position: 0% 50%; }
// // `;
// // const orbit = keyframes`
// //   from { transform: rotate(0deg) translateX(110px) rotate(0deg); }
// //   to   { transform: rotate(360deg) translateX(110px) rotate(-360deg); }
// // `;
// // const counterOrbit = keyframes`
// //   from { transform: rotate(0deg) translateX(80px) rotate(0deg); }
// //   to   { transform: rotate(-360deg) translateX(80px) rotate(360deg); }
// // `;
// // const shimmer = keyframes`
// //   0%   { background-position: -200% center; }
// //   100% { background-position: 200% center; }
// // `;
// // const scanline = keyframes`
// //   0%   { top: -2px; }
// //   100% { top: 100%; }
// // `;

// // // ─── Chapter data ─────────────────────────────────────────────────────────────
// // const chapters = [
// //   {
// //     id: "origin",
// //     year: "2015",
// //     label: "Origin",
// //     icon: "✦",
// //     color: "#14b8a6",
// //     accent: "rgba(20,184,166,0.15)",
// //     border: "rgba(20,184,166,0.3)",
// //     headline: "The Spark",
// //     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula tortor vitae nunc tincidunt, nec interdum velit pharetra. Sed euismod augue vel ligula fermentum, in efficitur neque pretium.",
// //     tag: "Curiosity",
// //   },
// //   {
// //     id: "craft",
// //     year: "2018",
// //     label: "Craft",
// //     icon: "◈",
// //     color: "#7c3aed",
// //     accent: "rgba(124,58,237,0.15)",
// //     border: "rgba(124,58,237,0.3)",
// //     headline: "The Grind",
// //     body: "Praesent faucibus, enim non dignissim commodo, dui erat dapibus dolor, vel laoreet risus sapien nec libero. Morbi tincidunt felis at lorem viverra, eget tincidunt urna malesuada.",
// //     tag: "Discipline",
// //   },
// //   {
// //     id: "build",
// //     year: "2021",
// //     label: "Build",
// //     icon: "⬡",
// //     color: "#ec4899",
// //     accent: "rgba(236,72,153,0.15)",
// //     border: "rgba(236,72,153,0.3)",
// //     headline: "The Momentum",
// //     body: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur scelerisque arcu ac nibh condimentum, ac posuere nulla scelerisque.",
// //     tag: "Execution",
// //   },
// //   {
// //     id: "now",
// //     year: "Now",
// //     label: "Now",
// //     icon: "◉",
// //     color: "#3b82f6",
// //     accent: "rgba(59,130,246,0.15)",
// //     border: "rgba(59,130,246,0.3)",
// //     headline: "The Vision",
// //     body: "Aliquam erat volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.",
// //     tag: "Future",
// //   },
// // ];

// // const skills = [
// //   { label: "React", color: "#61dafb" },
// //   { label: "TypeScript", color: "#3178c6" },
// //   { label: "Node.js", color: "#68a063" },
// //   { label: "UI/UX", color: "#ec4899" },
// //   { label: "Motion", color: "#7c3aed" },
// //   { label: "Systems", color: "#14b8a6" },
// //   { label: "APIs", color: "#f59e0b" },
// //   { label: "Cloud", color: "#3b82f6" },
// // ];

// // // ─── Floating orb ──────────────────────────────────────────────────────────
// // const Orb = ({ size, top, left, color, delay = "0s", duration = "8s" }) => (
// //   <Box
// //     position="absolute"
// //     w={size} h={size}
// //     top={top} left={left}
// //     borderRadius="full"
// //     bg={color}
// //     filter="blur(60px)"
// //     opacity={0.18}
// //     animation={`${pulse} ${duration} ease-in-out ${delay} infinite`}
// //     pointerEvents="none"
// //     zIndex={0}
// //   />
// // );

// // // ─── Chapter card ──────────────────────────────────────────────────────────
// // const ChapterCard = ({ chapter, isActive, onClick, index }) => {
// //   const [hovered, setHovered] = useState(false);

// //   return (
// //     <MotionBox
// //       initial={{ opacity: 0, x: -30 }}
// //       animate={{ opacity: 1, x: 0 }}
// //       transition={{ duration: 0.5, delay: index * 0.1 }}
// //       onClick={onClick}
// //       onMouseEnter={() => setHovered(true)}
// //       onMouseLeave={() => setHovered(false)}
// //       cursor="pointer"
// //       position="relative"
// //       borderRadius="20px"
// //       p="1px"
// //       mb={3}
// //       style={{
// //         background: isActive
// //           ? `linear-gradient(135deg, ${chapter.color}80, ${chapter.color}20)`
// //           : hovered
// //           ? `linear-gradient(135deg, ${chapter.color}40, transparent)`
// //           : "transparent",
// //         transition: "all 0.3s ease",
// //       }}
// //     >
// //       <Box
// //         borderRadius="20px"
// //         p={4}
// //         bg={isActive ? chapter.accent : "rgba(255,255,255,0.02)"}
// //         backdropFilter="blur(12px)"
// //         border="1px solid"
// //         borderColor={isActive ? chapter.border : "rgba(255,255,255,0.06)"}
// //         transition="all 0.3s ease"
// //         _hover={{ borderColor: chapter.border }}
// //       >
// //         <HStack spacing={3}>
// //           <Box
// //             w="38px" h="38px"
// //             borderRadius="12px"
// //             bg={isActive ? chapter.color : "rgba(255,255,255,0.05)"}
// //             display="flex" alignItems="center" justifyContent="center"
// //             fontSize="16px"
// //             transition="all 0.3s"
// //             boxShadow={isActive ? `0 0 20px ${chapter.color}60` : "none"}
// //           >
// //             {chapter.icon}
// //           </Box>
// //           <VStack align="start" spacing={0} flex={1}>
// //             <Text
// //               fontFamily="'Orbitron', sans-serif"
// //               fontSize="10px"
// //               color={chapter.color}
// //               letterSpacing="0.15em"
// //               textTransform="uppercase"
// //               opacity={0.8}
// //             >
// //               {chapter.year}
// //             </Text>
// //             <Text
// //               fontFamily="'Sora', sans-serif"
// //               fontSize="13px"
// //               fontWeight={600}
// //               color={isActive ? "white" : "whiteAlpha.700"}
// //               transition="color 0.3s"
// //             >
// //               {chapter.label}
// //             </Text>
// //           </VStack>
// //           {isActive && (
// //             <Box
// //               w="6px" h="6px"
// //               borderRadius="full"
// //               bg={chapter.color}
// //               boxShadow={`0 0 10px ${chapter.color}`}
// //             />
// //           )}
// //         </HStack>
// //       </Box>
// //     </MotionBox>
// //   );
// // };

// // // ─── MAIN COMPONENT ────────────────────────────────────────────────────────
// // export default function AboutMe() {
// //   const [active, setActive] = useState(0);
// //   const [time, setTime] = useState(new Date());
// //   const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
// //   const containerRef = useRef(null);
// //   const chapter = chapters[active];

// //   // Clock
// //   useEffect(() => {
// //     const t = setInterval(() => setTime(new Date()), 1000);
// //     return () => clearInterval(t);
// //   }, []);

// //   // Parallax orbs follow mouse
// //   const handleMouseMove = (e) => {
// //     const rect = containerRef.current?.getBoundingClientRect();
// //     if (!rect) return;
// //     setMousePos({
// //       x: (e.clientX - rect.left) / rect.width,
// //       y: (e.clientY - rect.top) / rect.height,
// //     });
// //   };

// //   const pad = (n) => String(n).padStart(2, "0");

// //   return (
// //     <Box
// //       ref={containerRef}
// //       onMouseMove={handleMouseMove}
// //       minH="100vh"
// //       bg="#0a0a0a"
// //       position="relative"
// //       overflow="hidden"
// //       display="flex"
// //       alignItems="center"
// //       justifyContent="center"
// //       p={{ base: 4, md: 8 }}
// //       fontFamily="'Sora', sans-serif"
// //     >
// //       {/* ── Ambient background ── */}
// //       <Box
// //         position="absolute" inset={0}
// //         bgImage="radial-gradient(ellipse at 20% 20%, rgba(124,58,237,0.12) 0%, transparent 60%),
// //                  radial-gradient(ellipse at 80% 80%, rgba(20,184,166,0.08) 0%, transparent 60%),
// //                  radial-gradient(ellipse at 60% 30%, rgba(236,72,153,0.06) 0%, transparent 50%)"
// //         pointerEvents="none"
// //       />

// //       {/* Moving orbs */}
// //       <Box
// //         position="absolute"
// //         w="500px" h="500px"
// //         borderRadius="full"
// //         bg="radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)"
// //         filter="blur(40px)"
// //         style={{
// //           left: `calc(${mousePos.x * 60}% - 100px)`,
// //           top: `calc(${mousePos.y * 40}% - 100px)`,
// //           transition: "left 1.2s ease, top 1.2s ease",
// //         }}
// //         pointerEvents="none"
// //       />

// //       {/* Grid overlay */}
// //       <Box
// //         position="absolute" inset={0}
// //         opacity={0.025}
// //         backgroundImage="linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
// //                           linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)"
// //         backgroundSize="60px 60px"
// //         pointerEvents="none"
// //       />

// //       {/* Scanline */}
// //       <Box
// //         position="absolute"
// //         left={0} right={0}
// //         h="2px"
// //         bg="linear-gradient(90deg, transparent, rgba(20,184,166,0.15), transparent)"
// //         animation={`${scanline} 8s linear infinite`}
// //         pointerEvents="none"
// //         zIndex={1}
// //       />

// //       {/* ── MAIN CARD ── */}
// //       <MotionBox
// //         initial={{ opacity: 0, y: 40 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.8, ease: "easeOut" }}
// //         w="full"
// //         maxW="1100px"
// //         position="relative"
// //         zIndex={2}
// //       >
// //         {/* Glass card */}
// //         <Box
// //           borderRadius="32px"
// //           p="1px"
// //           bg="linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 50%, rgba(20,184,166,0.15) 100%)"
// //           boxShadow="0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset"
// //         >
// //           <Box
// //             borderRadius="32px"
// //             bg="rgba(10,10,10,0.85)"
// //             backdropFilter="blur(40px)"
// //             overflow="hidden"
// //           >
// //             {/* Top bar */}
// //             <Flex
// //               px={6} py={3}
// //               borderBottom="1px solid rgba(255,255,255,0.05)"
// //               align="center"
// //               justify="space-between"
// //             >
// //               <HStack spacing={2}>
// //                 {["#ff5f57","#ffbd2e","#28c840"].map((c, i) => (
// //                   <Box key={i} w="10px" h="10px" borderRadius="full" bg={c} opacity={0.7} />
// //                 ))}
// //               </HStack>
// //               <Text
// //                 fontFamily="'Orbitron', sans-serif"
// //                 fontSize="10px"
// //                 color="whiteAlpha.400"
// //                 letterSpacing="0.2em"
// //               >
// //                 ABOUT.ME — v2.0
// //               </Text>
// //               <Text
// //                 fontFamily="'Orbitron', sans-serif"
// //                 fontSize="10px"
// //                 color="whiteAlpha.300"
// //                 letterSpacing="0.1em"
// //               >
// //                 {pad(time.getHours())}:{pad(time.getMinutes())}:{pad(time.getSeconds())}
// //               </Text>
// //             </Flex>

// //             {/* Content grid */}
// //             <Flex
// //               direction={{ base: "column", lg: "row" }}
// //               gap={0}
// //               minH="600px"
// //             >
// //               {/* ── LEFT PANEL ── */}
// //               <Box
// //                 w={{ base: "full", lg: "280px" }}
// //                 flexShrink={0}
// //                 borderRight={{ lg: "1px solid rgba(255,255,255,0.05)" }}
// //                 borderBottom={{ base: "1px solid rgba(255,255,255,0.05)", lg: "none" }}
// //                 p={6}
// //                 position="relative"
// //               >
// //                 {/* Avatar constellation */}
// //                 <Box position="relative" w="220px" h="220px" mx="auto" mb={6}>
// //                   {/* Orbit rings */}
// //                   {[110, 80].map((r, i) => (
// //                     <Box
// //                       key={i}
// //                       position="absolute"
// //                       top="50%" left="50%"
// //                       w={`${r * 2}px`} h={`${r * 2}px`}
// //                       borderRadius="full"
// //                       border="1px solid"
// //                       borderColor={i === 0 ? "rgba(124,58,237,0.2)" : "rgba(20,184,166,0.15)"}
// //                       transform="translate(-50%,-50%)"
// //                     />
// //                   ))}

// //                   {/* Orbiting dots */}
// //                   {[
// //                     { color: "#7c3aed", size: "10px", anim: orbit, dur: "12s" },
// //                     { color: "#ec4899", size: "8px", anim: orbit, dur: "18s", delay: "6s" },
// //                     { color: "#14b8a6", size: "8px", anim: counterOrbit, dur: "10s" },
// //                   ].map((dot, i) => (
// //                     <Box
// //                       key={i}
// //                       position="absolute"
// //                       top="50%" left="50%"
// //                       w={dot.size} h={dot.size}
// //                       borderRadius="full"
// //                       bg={dot.color}
// //                       boxShadow={`0 0 8px ${dot.color}`}
// //                       transform="translate(-50%,-50%)"
// //                       animation={`${dot.anim} ${dot.dur} linear ${dot.delay || "0s"} infinite`}
// //                     />
// //                   ))}

// //                   {/* Avatar */}
// //                   <Box
// //                     position="absolute"
// //                     top="50%" left="50%"
// //                     transform="translate(-50%,-50%)"
// //                     animation={`${float} 6s ease-in-out infinite`}
// //                   >
// //                     <Box
// //                       p="3px"
// //                       borderRadius="full"
// //                       bg="linear-gradient(135deg, #7c3aed, #ec4899, #14b8a6)"
// //                     >
// //                       <Avatar
// //                         size="xl"
// //                         src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face"
// //                         name="Lorem Ipsum"
// //                         border="3px solid #0a0a0a"
// //                       />
// //                     </Box>
// //                   </Box>
// //                 </Box>

// //                 {/* Name */}
// //                 <VStack spacing={1} mb={5}>
// //                   <Text
// //                     fontFamily="'Orbitron', sans-serif"
// //                     fontSize="18px"
// //                     fontWeight={800}
// //                     bgGradient="linear(to-r, #14b8a6, #7c3aed, #ec4899)"
// //                     bgClip="text"
// //                     bgSize="200% 200%"
// //                     animation={`${gradientShift} 4s ease infinite`}
// //                     letterSpacing="0.05em"
// //                     textAlign="center"
// //                   >
// //                     LOREM IPSUM
// //                   </Text>
// //                   <Text
// //                     fontSize="11px"
// //                     color="whiteAlpha.500"
// //                     letterSpacing="0.2em"
// //                     textTransform="uppercase"
// //                     textAlign="center"
// //                   >
// //                     Full-Stack Developer
// //                   </Text>
// //                 </VStack>

// //                 {/* Status badge */}
// //                 <HStack
// //                   justify="center"
// //                   mb={6}
// //                   px={4} py={2}
// //                   borderRadius="full"
// //                   bg="rgba(20,184,166,0.08)"
// //                   border="1px solid rgba(20,184,166,0.2)"
// //                   w="fit-content"
// //                   mx="auto"
// //                 >
// //                   <Box
// //                     w="7px" h="7px"
// //                     borderRadius="full"
// //                     bg="#14b8a6"
// //                     boxShadow="0 0 8px #14b8a6"
// //                     animation={`${pulse} 2s ease-in-out infinite`}
// //                   />
// //                   <Text fontSize="11px" color="#14b8a6" letterSpacing="0.1em">
// //                     Available for work
// //                   </Text>
// //                 </HStack>

// //                 {/* Mini stats */}
// //                 <VStack spacing={2} w="full">
// //                   {[
// //                     { label: "Projects", value: "48+", color: "#7c3aed" },
// //                     { label: "Experience", value: "9 yrs", color: "#ec4899" },
// //                     { label: "Coffee / day", value: "∞", color: "#14b8a6" },
// //                   ].map((s, i) => (
// //                     <MotionBox
// //                       key={i}
// //                       initial={{ opacity: 0, x: -20 }}
// //                       animate={{ opacity: 1, x: 0 }}
// //                       transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
// //                       w="full"
// //                     >
// //                       <Flex
// //                         px={3} py={2}
// //                         borderRadius="12px"
// //                         bg="rgba(255,255,255,0.02)"
// //                         border="1px solid rgba(255,255,255,0.05)"
// //                         align="center"
// //                         justify="space-between"
// //                         _hover={{
// //                           bg: "rgba(255,255,255,0.05)",
// //                           borderColor: `${s.color}40`,
// //                           transform: "translateX(4px)",
// //                         }}
// //                         transition="all 0.2s"
// //                         cursor="default"
// //                       >
// //                         <Text fontSize="12px" color="whiteAlpha.500" letterSpacing="0.05em">
// //                           {s.label}
// //                         </Text>
// //                         <Text
// //                           fontFamily="'Orbitron', sans-serif"
// //                           fontSize="13px"
// //                           fontWeight={700}
// //                           color={s.color}
// //                         >
// //                           {s.value}
// //                         </Text>
// //                       </Flex>
// //                     </MotionBox>
// //                   ))}
// //                 </VStack>
// //               </Box>

// //               {/* ── CENTER PANEL ── */}
// //               <Box flex={1} p={8} position="relative">
// //                 {/* Chapter nav */}
// //                 <HStack spacing={3} mb={8} flexWrap="wrap">
// //                   {chapters.map((c, i) => (
// //                     <MotionBox
// //                       key={c.id}
// //                       initial={{ opacity: 0, y: -10 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       transition={{ delay: i * 0.08, duration: 0.4 }}
// //                       onClick={() => setActive(i)}
// //                       cursor="pointer"
// //                       px={4} py={1.5}
// //                       borderRadius="full"
// //                       border="1px solid"
// //                       borderColor={active === i ? c.color : "rgba(255,255,255,0.08)"}
// //                       bg={active === i ? `${c.color}18` : "transparent"}
// //                       boxShadow={active === i ? `0 0 16px ${c.color}30` : "none"}
// //                       transition={{ duration: 0.2 }}
// //                       whileHover={{ scale: 1.05 }}
// //                       whileTap={{ scale: 0.95 }}
// //                     >
// //                       <Text
// //                         fontSize="11px"
// //                         fontFamily="'Orbitron', sans-serif"
// //                         letterSpacing="0.12em"
// //                         color={active === i ? c.color : "whiteAlpha.500"}
// //                         transition="color 0.2s"
// //                       >
// //                         {c.icon} {c.label}
// //                       </Text>
// //                     </MotionBox>
// //                   ))}
// //                 </HStack>

// //                 {/* Story content */}
// //                 <MotionBox
// //                   key={chapter.id}
// //                   initial={{ opacity: 0, y: 20 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   exit={{ opacity: 0, y: -20 }}
// //                   transition={{ duration: 0.45 }}
// //                 >
// //                   {/* Year badge */}
// //                   <HStack spacing={3} mb={4}>
// //                     <Box
// //                       px={3} py={1}
// //                       borderRadius="8px"
// //                       bg={chapter.accent}
// //                       border="1px solid"
// //                       borderColor={chapter.border}
// //                     >
// //                       <Text
// //                         fontFamily="'Orbitron', sans-serif"
// //                         fontSize="11px"
// //                         color={chapter.color}
// //                         letterSpacing="0.15em"
// //                       >
// //                         {chapter.year}
// //                       </Text>
// //                     </Box>
// //                     <Badge
// //                       px={3} py={1}
// //                       borderRadius="full"
// //                       bg="rgba(255,255,255,0.04)"
// //                       color="whiteAlpha.500"
// //                       fontSize="10px"
// //                       letterSpacing="0.1em"
// //                       textTransform="uppercase"
// //                       fontFamily="'Sora', sans-serif"
// //                     >
// //                       Chapter {active + 1} / {chapters.length}
// //                     </Badge>
// //                   </HStack>

// //                   {/* Big headline */}
// //                   <Text
// //                     fontFamily="'Orbitron', sans-serif"
// //                     fontSize={{ base: "28px", md: "40px" }}
// //                     fontWeight={800}
// //                     lineHeight={1.1}
// //                     mb={4}
// //                     color="white"
// //                     position="relative"
// //                   >
// //                     {chapter.headline}
// //                     <Box
// //                       as="span"
// //                       display="inline-block"
// //                       w="6px" h="6px"
// //                       borderRadius="full"
// //                       bg={chapter.color}
// //                       boxShadow={`0 0 12px ${chapter.color}`}
// //                       ml={2}
// //                       verticalAlign="middle"
// //                     />
// //                   </Text>

// //                   {/* Divider */}
// //                   <Box
// //                     h="2px"
// //                     w="60px"
// //                     borderRadius="full"
// //                     bg={`linear-gradient(90deg, ${chapter.color}, transparent)`}
// //                     mb={5}
// //                   />

// //                   {/* Body */}
// //                   <Text
// //                     fontSize="15px"
// //                     color="whiteAlpha.600"
// //                     lineHeight={1.85}
// //                     maxW="500px"
// //                     mb={6}
// //                   >
// //                     {chapter.body}
// //                   </Text>

// //                   {/* Tag */}
// //                   <HStack spacing={2} mb={8}>
// //                     <Box
// //                       w="5px" h="5px"
// //                       borderRadius="full"
// //                       bg={chapter.color}
// //                       boxShadow={`0 0 8px ${chapter.color}`}
// //                     />
// //                     <Text
// //                       fontSize="12px"
// //                       color={chapter.color}
// //                       letterSpacing="0.15em"
// //                       textTransform="uppercase"
// //                       fontFamily="'Orbitron', sans-serif"
// //                     >
// //                       {chapter.tag}
// //                     </Text>
// //                   </HStack>

// //                   {/* Progress bar */}
// //                   <Box
// //                     h="3px"
// //                     borderRadius="full"
// //                     bg="rgba(255,255,255,0.06)"
// //                     overflow="hidden"
// //                     maxW="340px"
// //                     mb={2}
// //                   >
// //                     <MotionBox
// //                       h="full"
// //                       borderRadius="full"
// //                       style={{ background: `linear-gradient(90deg, ${chapter.color}, ${chapter.color}60)` }}
// //                       initial={{ width: "0%" }}
// //                       animate={{ width: `${((active + 1) / chapters.length) * 100}%` }}
// //                       transition={{ duration: 0.6, ease: "easeOut" }}
// //                     />
// //                   </Box>
// //                   <Text fontSize="11px" color="whiteAlpha.300" letterSpacing="0.1em">
// //                     Story progress — {Math.round(((active + 1) / chapters.length) * 100)}%
// //                   </Text>
// //                 </MotionBox>

// //                 {/* Navigation arrows */}
// //                 <HStack spacing={3} mt={8}>
// //                   {[
// //                     { label: "←", action: () => setActive((a) => Math.max(0, a - 1)), disabled: active === 0 },
// //                     { label: "→", action: () => setActive((a) => Math.min(chapters.length - 1, a + 1)), disabled: active === chapters.length - 1 },
// //                   ].map((btn, i) => (
// //                     <MotionBox
// //                       key={i}
// //                       onClick={!btn.disabled ? btn.action : undefined}
// //                       whileHover={!btn.disabled ? { scale: 1.1 } : {}}
// //                       whileTap={!btn.disabled ? { scale: 0.9 } : {}}
// //                       w="44px" h="44px"
// //                       borderRadius="14px"
// //                       border="1px solid"
// //                       borderColor={btn.disabled ? "rgba(255,255,255,0.05)" : chapter.border}
// //                       bg={btn.disabled ? "transparent" : chapter.accent}
// //                       display="flex"
// //                       alignItems="center"
// //                       justifyContent="center"
// //                       cursor={btn.disabled ? "not-allowed" : "pointer"}
// //                       opacity={btn.disabled ? 0.3 : 1}
// //                       fontSize="18px"
// //                       color={btn.disabled ? "whiteAlpha.200" : chapter.color}
// //                       transition={{ duration: 0.2 }}
// //                     >
// //                       {btn.label}
// //                     </MotionBox>
// //                   ))}
// //                 </HStack>
// //               </Box>

// //               {/* ── RIGHT PANEL ── */}
// //               <Box
// //                 w={{ base: "full", lg: "220px" }}
// //                 flexShrink={0}
// //                 borderLeft={{ lg: "1px solid rgba(255,255,255,0.05)" }}
// //                 borderTop={{ base: "1px solid rgba(255,255,255,0.05)", lg: "none" }}
// //                 p={6}
// //               >
// //                 {/* Skills label */}
// //                 <Text
// //                   fontFamily="'Orbitron', sans-serif"
// //                   fontSize="9px"
// //                   color="whiteAlpha.300"
// //                   letterSpacing="0.25em"
// //                   textTransform="uppercase"
// //                   mb={4}
// //                 >
// //                   Tech Stack
// //                 </Text>

// //                 <VStack spacing={2} mb={8}>
// //                   {skills.map((s, i) => (
// //                     <MotionBox
// //                       key={s.label}
// //                       initial={{ opacity: 0, x: 20 }}
// //                       animate={{ opacity: 1, x: 0 }}
// //                       transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
// //                       whileHover={{ x: -4, transition: { duration: 0.15 } }}
// //                       w="full"
// //                     >
// //                       <Flex
// //                         align="center"
// //                         justify="space-between"
// //                         px={3} py={2}
// //                         borderRadius="10px"
// //                         bg="rgba(255,255,255,0.02)"
// //                         border="1px solid rgba(255,255,255,0.04)"
// //                         cursor="default"
// //                         _hover={{
// //                           bg: `${s.color}10`,
// //                           borderColor: `${s.color}30`,
// //                         }}
// //                         transition="all 0.2s"
// //                         role="group"
// //                       >
// //                         <Text fontSize="12px" color="whiteAlpha.600" _groupHover={{ color: "white" }} transition="color 0.2s">
// //                           {s.label}
// //                         </Text>
// //                         <Box
// //                           w="6px" h="6px"
// //                           borderRadius="full"
// //                           bg={s.color}
// //                           opacity={0.6}
// //                           _groupHover={{ opacity: 1, boxShadow: `0 0 8px ${s.color}` }}
// //                           transition="all 0.2s"
// //                         />
// //                       </Flex>
// //                     </MotionBox>
// //                   ))}
// //                 </VStack>

// //                 {/* Divider */}
// //                 <Box h="1px" bg="rgba(255,255,255,0.05)" mb={6} />

// //                 {/* Socials / links label */}
// //                 <Text
// //                   fontFamily="'Orbitron', sans-serif"
// //                   fontSize="9px"
// //                   color="whiteAlpha.300"
// //                   letterSpacing="0.25em"
// //                   textTransform="uppercase"
// //                   mb={4}
// //                 >
// //                   Connect
// //                 </Text>

// //                 <VStack spacing={2}>
// //                   {[
// //                     { label: "GitHub", icon: "⌥", color: "#a1a1aa" },
// //                     { label: "LinkedIn", icon: "◎", color: "#3b82f6" },
// //                     { label: "Twitter", icon: "◈", color: "#14b8a6" },
// //                     { label: "Dribbble", icon: "◉", color: "#ec4899" },
// //                   ].map((link, i) => (
// //                     <MotionBox
// //                       key={link.label}
// //                       whileHover={{ scale: 1.03, x: -3, transition: { duration: 0.15 } }}
// //                       whileTap={{ scale: 0.97 }}
// //                       w="full"
// //                       cursor="pointer"
// //                     >
// //                       <HStack
// //                         px={3} py={2}
// //                         borderRadius="10px"
// //                         bg="rgba(255,255,255,0.02)"
// //                         border="1px solid rgba(255,255,255,0.04)"
// //                         spacing={3}
// //                         _hover={{
// //                           bg: `${link.color}10`,
// //                           borderColor: `${link.color}30`,
// //                         }}
// //                         transition="all 0.2s"
// //                         role="group"
// //                       >
// //                         <Text fontSize="14px" color={link.color}>{link.icon}</Text>
// //                         <Text fontSize="12px" color="whiteAlpha.500" _groupHover={{ color: "white" }} transition="color 0.2s">
// //                           {link.label}
// //                         </Text>
// //                         <Box flex={1} />
// //                         <Text fontSize="10px" color="whiteAlpha.200" _groupHover={{ color: link.color }} transition="color 0.2s">↗</Text>
// //                       </HStack>
// //                     </MotionBox>
// //                   ))}
// //                 </VStack>

// //                 {/* Bottom decorative element */}
// //                 <Box mt={8}>
// //                   <Box
// //                     position="relative"
// //                     h="60px"
// //                     borderRadius="16px"
// //                     overflow="hidden"
// //                     bg="rgba(255,255,255,0.02)"
// //                     border="1px solid rgba(255,255,255,0.05)"
// //                   >
// //                     <Box
// //                       position="absolute" inset={0}
// //                       bgGradient="linear(135deg, rgba(124,58,237,0.2), rgba(20,184,166,0.1), rgba(236,72,153,0.15))"
// //                       backgroundSize="200% 200%"
// //                       animation={`${gradientShift} 6s ease infinite`}
// //                     />
// //                     <Flex
// //                       position="relative"
// //                       h="full"
// //                       align="center"
// //                       justify="center"
// //                       direction="column"
// //                     >
// //                       <Text
// //                         fontFamily="'Orbitron', sans-serif"
// //                         fontSize="9px"
// //                         color="whiteAlpha.500"
// //                         letterSpacing="0.2em"
// //                         textTransform="uppercase"
// //                       >
// //                         Location
// //                       </Text>
// //                       <Text fontSize="12px" color="whiteAlpha.700" mt={0.5}>
// //                         📍 San Francisco, CA
// //                       </Text>
// //                     </Flex>
// //                   </Box>
// //                 </Box>
// //               </Box>
// //             </Flex>
// //           </Box>
// //         </Box>

// //         {/* Bottom label */}
// //         <Flex justify="center" mt={4} gap={6}>
// //           {chapters.map((c, i) => (
// //             <Box
// //               key={c.id}
// //               w={active === i ? "24px" : "6px"}
// //               h="3px"
// //               borderRadius="full"
// //               bg={active === i ? c.color : "rgba(255,255,255,0.1)"}
// //               boxShadow={active === i ? `0 0 8px ${c.color}` : "none"}
// //               transition="all 0.3s ease"
// //               cursor="pointer"
// //               onClick={() => setActive(i)}
// //             />
// //           ))}
// //         </Flex>
// //       </MotionBox>
// //     </Box>
// //   );
// // }

// import { useState, useEffect, useRef } from "react";
// import { keyframes } from "@emotion/react";
// import {
//   Box,
//   Flex,
//   Text,
//   VStack,
//   HStack,
//   chakra,
//   shouldForwardProp,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import { isValidMotionProp, motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

// const MotionBox = chakra(motion.div, {
//   shouldForwardProp: (p) => isValidMotionProp(p) || shouldForwardProp(p),
// });
// const MotionText = chakra(motion.p, {
//   shouldForwardProp: (p) => isValidMotionProp(p) || shouldForwardProp(p),
// });

// // ── Keyframes ──────────────────────────────────────────────────────────────
// const breathe = keyframes`
//   0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.5; }
//   50%       { transform: scale(1.08) rotate(1.5deg); opacity: 0.7; }
// `;
// const floatY = keyframes`
//   0%, 100% { transform: translateY(0px); }
//   50%       { transform: translateY(-14px); }
// `;
// const softPulse = keyframes`
//   0%, 100% { box-shadow: 0 0 0 0 rgba(20,184,166,0); }
//   50%       { box-shadow: 0 0 0 10px rgba(20,184,166,0.08); }
// `;
// const gradShift = keyframes`
//   0%   { background-position: 0% 50%; }
//   50%  { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// `;
// const shimmerLine = keyframes`
//   0%   { transform: translateX(-100%); }
//   100% { transform: translateX(400%); }
// `;
// const blink = keyframes`
//   0%, 100% { opacity: 1; }
//   50%       { opacity: 0; }
// `;
// const rotateHalo = keyframes`
//   from { transform: rotate(0deg); }
//   to   { transform: rotate(360deg); }
// `;

// // ── Typing hook ────────────────────────────────────────────────────────────
// function useTypewriter(words, speed = 80, pause = 1800) {
//   const [display, setDisplay] = useState("");
//   const [wordIdx, setWordIdx] = useState(0);
//   const [charIdx, setCharIdx] = useState(0);
//   const [deleting, setDeleting] = useState(false);

//   useEffect(() => {
//     const current = words[wordIdx];
//     const timeout = setTimeout(() => {
//       if (!deleting) {
//         setDisplay(current.slice(0, charIdx + 1));
//         if (charIdx + 1 === current.length) {
//           setTimeout(() => setDeleting(true), pause);
//         } else {
//           setCharIdx((c) => c + 1);
//         }
//       } else {
//         setDisplay(current.slice(0, charIdx - 1));
//         if (charIdx - 1 === 0) {
//           setDeleting(false);
//           setWordIdx((w) => (w + 1) % words.length);
//           setCharIdx(0);
//         } else {
//           setCharIdx((c) => c - 1);
//         }
//       }
//     }, deleting ? speed / 2 : speed);
//     return () => clearTimeout(timeout);
//   }, [charIdx, deleting, wordIdx, words, speed, pause]);

//   return display;
// }

// // ── Magnetic button ────────────────────────────────────────────────────────
// function MagneticBtn({ children, href = "#", variant = "primary", ...props }) {
//   const ref = useRef(null);
//   const [hovered, setHovered] = useState(false);
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
//   const sx = useSpring(x, { stiffness: 200, damping: 15 });
//   const sy = useSpring(y, { stiffness: 200, damping: 15 });

//   const handleMove = (e) => {
//     const rect = ref.current.getBoundingClientRect();
//     const cx = rect.left + rect.width / 2;
//     const cy = rect.top + rect.height / 2;
//     x.set((e.clientX - cx) * 0.35);
//     y.set((e.clientY - cy) * 0.35);
//   };
//   const handleLeave = () => { x.set(0); y.set(0); setHovered(false); };

//   const isPrimary = variant === "primary";

//   return (
//     <motion.a
//       ref={ref}
//       href={href}
//       onMouseMove={handleMove}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={handleLeave}
//       style={{ x: sx, y: sy, display: "inline-block", textDecoration: "none" }}
//       whileTap={{ scale: 0.95 }}
//       {...props}
//     >
//       <Box
//         position="relative"
//         px={7}
//         py={3}
//         borderRadius="full"
//         overflow="hidden"
//         bg={isPrimary ? "transparent" : "transparent"}
//         border="1.5px solid"
//         borderColor={isPrimary ? "transparent" : "rgba(255,255,255,0.12)"}
//         cursor="pointer"
//         style={{
//           background: isPrimary
//             ? "linear-gradient(135deg, #1e40af, #7c3aed, #ec4899)"
//             : undefined,
//           backgroundSize: isPrimary ? "200% 200%" : undefined,
//           animation: isPrimary ? `${gradShift} 4s ease infinite` : undefined,
//         }}
//         _hover={!isPrimary ? { borderColor: "rgba(255,255,255,0.3)", bg: "rgba(255,255,255,0.04)" } : {}}
//         transition="all 0.25s"
//       >
//         {/* shimmer sweep */}
//         {hovered && (
//           <Box
//             position="absolute"
//             top={0} bottom={0}
//             w="40px"
//             bg="linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)"
//             animation={`${shimmerLine} 0.55s ease forwards`}
//             pointerEvents="none"
//           />
//         )}
//         <Text
//           fontFamily="'Sora', sans-serif"
//           fontSize="13px"
//           fontWeight={600}
//           color="white"
//           letterSpacing="0.06em"
//           position="relative"
//           zIndex={1}
//         >
//           {children}
//         </Text>
//       </Box>
//     </motion.a>
//   );
// }

// // ── Floating tag pill ──────────────────────────────────────────────────────
// function TagPill({ label, color, delay }) {
//   const [hovered, setHovered] = useState(false);
//   return (
//     <MotionBox
//       initial={{ opacity: 0, scale: 0.8, y: 10 }}
//       animate={{ opacity: 1, scale: 1, y: 0 }}
//       transition={{ delay, duration: 0.4, type: "spring", stiffness: 200 }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       whileHover={{ y: -4, scale: 1.07, transition: { duration: 0.2 } }}
//       cursor="default"
//     >
//       <HStack
//         spacing={2}
//         px={3}
//         py={1.5}
//         borderRadius="full"
//         bg={hovered ? `${color}18` : "rgba(255,255,255,0.04)"}
//         border="1px solid"
//         borderColor={hovered ? `${color}50` : "rgba(255,255,255,0.08)"}
//         transition="all 0.25s"
//         boxShadow={hovered ? `0 4px 20px ${color}25` : "none"}
//       >
//         <Box w="6px" h="6px" borderRadius="full" bg={color} opacity={hovered ? 1 : 0.6}
//           boxShadow={hovered ? `0 0 8px ${color}` : "none"}
//           transition="all 0.25s"
//         />
//         <Text fontSize="11.5px" fontFamily="'Sora', sans-serif" color={hovered ? "white" : "whiteAlpha.600"}
//           letterSpacing="0.04em" transition="color 0.25s">
//           {label}
//         </Text>
//       </HStack>
//     </MotionBox>
//   );
// }

// // ── Stat counter ───────────────────────────────────────────────────────────
// function StatItem({ value, label, color, delay }) {
//   const [count, setCount] = useState(0);
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true });
//   const target = parseInt(value);

//   useEffect(() => {
//     if (!inView) return;
//     const timeout = setTimeout(() => {
//       let start = 0;
//       const step = Math.ceil(target / 30);
//       const interval = setInterval(() => {
//         start = Math.min(start + step, target);
//         setCount(start);
//         if (start >= target) clearInterval(interval);
//       }, 40);
//       return () => clearInterval(interval);
//     }, delay * 1000);
//     return () => clearTimeout(timeout);
//   }, [inView, target, delay]);

//   return (
//     <MotionBox
//       ref={ref}
//       initial={{ opacity: 0, y: 20 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ delay, duration: 0.5 }}
//       textAlign="center"
//       cursor="default"
//       role="group"
//     >
//       <Text
//         fontFamily="'Orbitron', sans-serif"
//         fontSize={{ base: "22px", md: "28px" }}
//         fontWeight={800}
//         color={color}
//         lineHeight={1}
//         _groupHover={{ textShadow: `0 0 20px ${color}` }}
//         transition="text-shadow 0.3s"
//       >
//         {count}{value.replace(/[0-9]/g, "")}
//       </Text>
//       <Text
//         fontSize="11px"
//         color="whiteAlpha.400"
//         letterSpacing="0.12em"
//         textTransform="uppercase"
//         fontFamily="'Sora', sans-serif"
//         mt={1}
//       >
//         {label}
//       </Text>
//     </MotionBox>
//   );
// }

// // ── Avatar card (right side) ───────────────────────────────────────────────
// function AvatarPanel() {
//   const [activeNote, setActiveNote] = useState(null);

//   const notes = [
//     { id: "coffee", emoji: "☕", label: "Powered by coffee", x: "-30px", y: "18%", color: "#f59e0b", delay: 1.2 },
//     { id: "music",  emoji: "🎧", label: "Lo-fi while coding", x: "calc(100% - 10px)", y: "25%", color: "#ec4899", delay: 1.5 },
//     { id: "open",  emoji: "✨", label: "Open to opportunities", x: "-20px", y: "68%", color: "#14b8a6", delay: 1.8 },
//     { id: "gmt",   emoji: "🌍", label: "GMT+1", x: "calc(100% - 10px)", y: "72%", color: "#7c3aed", delay: 2.0 },
//   ];

//   return (
//     <Box position="relative" w="full" h={{ base: "400px", md: "520px" }} display="flex" alignItems="center" justifyContent="center">

//       {/* Ambient blobs */}
//       <Box position="absolute" w="280px" h="280px" borderRadius="full"
//         bg="radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)"
//         filter="blur(30px)" animation={`${breathe} 7s ease-in-out infinite`} />
//       <Box position="absolute" w="200px" h="200px" borderRadius="full"
//         bg="radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)"
//         filter="blur(25px)" top="10%" right="10%"
//         animation={`${breathe} 9s ease-in-out 2s infinite`} />

//       {/* Rotating dashed halo */}
//       <Box
//         position="absolute"
//         w="310px" h="310px"
//         borderRadius="full"
//         border="1.5px dashed rgba(124,58,237,0.2)"
//         animation={`${rotateHalo} 18s linear infinite`}
//       />
//       <Box
//         position="absolute"
//         w="260px" h="260px"
//         borderRadius="full"
//         border="1px dashed rgba(20,184,166,0.15)"
//         animation={`${rotateHalo} 12s linear reverse infinite`}
//       />

//       {/* Main image card */}
//       <MotionBox
//         initial={{ opacity: 0, scale: 0.85, y: 30 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
//         position="relative"
//         zIndex={2}
//         animation={`${floatY} 6s ease-in-out infinite`}
//       >
//         {/* gradient border */}
//         <Box
//           p="3px"
//           borderRadius="28px"
//           bg="linear-gradient(135deg, #7c3aed, #ec4899, #14b8a6, #3b82f6)"
//           backgroundSize="300% 300%"
//           animation={`${gradShift} 5s ease infinite`}
//           boxShadow="0 30px 80px rgba(0,0,0,0.5)"
//         >
//           <Box
//             w={{ base: "200px", md: "230px" }}
//             h={{ base: "260px", md: "300px" }}
//             borderRadius="26px"
//             overflow="hidden"
//             bg="#1a1a2e"
//             position="relative"
//           >
//             <Box
//               as="img"
//               src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face&auto=format"
//               alt="Profile"
//               w="full" h="full"
//               objectFit="cover"
//               style={{ display: "block" }}
//             />
//             {/* Glass overlay at bottom */}
//             <Box
//               position="absolute" bottom={0} left={0} right={0}
//               h="80px"
//               bgGradient="linear(to-t, rgba(10,10,10,0.9), transparent)"
//             />
//             {/* Inner shine */}
//             <Box
//               position="absolute" top={0} left={0} right={0} bottom={0}
//               borderRadius="26px"
//               bg="linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)"
//               pointerEvents="none"
//             />
//           </Box>
//         </Box>
//       </MotionBox>

//       {/* Floating note cards */}
//       {notes.map((note) => (
//         <MotionBox
//           key={note.id}
//           initial={{ opacity: 0, scale: 0.5 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: note.delay, type: "spring", stiffness: 180 }}
//           whileHover={{ scale: 1.12, y: -4, transition: { duration: 0.2 } }}
//           onMouseEnter={() => setActiveNote(note.id)}
//           onMouseLeave={() => setActiveNote(null)}
//           position="absolute"
//           left={note.x}
//           top={note.y}
//           cursor="default"
//           zIndex={3}
//         >
//           <HStack
//             px={3} py={2}
//             borderRadius="14px"
//             bg="rgba(15,15,15,0.85)"
//             backdropFilter="blur(16px)"
//             border="1px solid"
//             borderColor={activeNote === note.id ? `${note.color}50` : "rgba(255,255,255,0.08)"}
//             spacing={2}
//             boxShadow={activeNote === note.id
//               ? `0 8px 30px ${note.color}30, 0 0 0 1px ${note.color}20`
//               : "0 4px 20px rgba(0,0,0,0.4)"}
//             transition="all 0.25s"
//             whiteSpace="nowrap"
//           >
//             <Text fontSize="14px">{note.emoji}</Text>
//             <Text fontSize="11px" color={activeNote === note.id ? "white" : "whiteAlpha.600"}
//               fontFamily="'Sora', sans-serif" letterSpacing="0.03em" transition="color 0.25s">
//               {note.label}
//             </Text>
//           </HStack>
//         </MotionBox>
//       ))}
//     </Box>
//   );
// }

// // ── Main sentence reveal ───────────────────────────────────────────────────
// function RevealText({ text, delay = 0, fontSize, fontWeight, color, fontFamily, lineHeight, as }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-60px" });
//   const words = text.split(" ");

//   return (
//     <Box ref={ref} as={as || "p"} display="flex" flexWrap="wrap" gap="0.3em" lineHeight={lineHeight || 1.5}>
//       {words.map((word, i) => (
//         <motion.span
//           key={i}
//           initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
//           animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
//           transition={{ delay: delay + i * 0.045, duration: 0.45, ease: "easeOut" }}
//           style={{ fontSize, fontWeight, color, fontFamily, display: "inline-block" }}
//         >
//           {word}
//         </motion.span>
//       ))}
//     </Box>
//   );
// }

// // ── MAIN COMPONENT ─────────────────────────────────────────────────────────
// export default function AboutIntro() {
//   const sectionRef = useRef(null);
//   const inView = useInView(sectionRef, { once: true, margin: "-80px" });
//   const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

//   const roles = ["Full-Stack Developer", "UI/UX Enthusiast", "Open Source Lover", "Problem Solver"];
//   const typed = useTypewriter(roles, 75, 2000);

//   const tags = [
//     { label: "React & TypeScript", color: "#61dafb", delay: 0.9 },
//     { label: "Node.js", color: "#68a063", delay: 1.0 },
//     { label: "UI Systems", color: "#ec4899", delay: 1.1 },
//     { label: "Motion Design", color: "#7c3aed", delay: 1.2 },
//     { label: "Cloud & DevOps", color: "#3b82f6", delay: 1.3 },
//   ];

//   const handleMouseMove = (e) => {
//     const rect = sectionRef.current?.getBoundingClientRect();
//     if (!rect) return;
//     setMousePos({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
//   };

//   return (
//     <Box
//       ref={sectionRef}
//       onMouseMove={handleMouseMove}
//       minH="100vh"
//       bg="#0a0a0a"
//       position="relative"
//       overflow="hidden"
//       display="flex"
//       alignItems="center"
//       px={{ base: 5, md: 12, lg: 20 }}
//       py={{ base: 20, md: 0 }}
//       fontFamily="'Sora', sans-serif"
//     >
//       {/* ── Background ── */}
//       <Box position="absolute" inset={0} pointerEvents="none">
//         {/* Mesh gradient */}
//         <Box
//           position="absolute" inset={0}
//           bgImage={`
//             radial-gradient(ellipse 60% 50% at ${mousePos.x * 100}% ${mousePos.y * 100}%,
//               rgba(124,58,237,0.07) 0%, transparent 60%),
//             radial-gradient(ellipse at 90% 10%, rgba(20,184,166,0.06) 0%, transparent 50%),
//             radial-gradient(ellipse at 10% 90%, rgba(236,72,153,0.05) 0%, transparent 50%)
//           `}
//           transition="background-image 1.4s ease"
//         />
//         {/* Subtle noise grain */}
//         <Box
//           position="absolute" inset={0}
//           opacity={0.025}
//           backgroundImage="url('data:image/svg+xml,%3Csvg viewBox%3D%220 0 200 200%22 xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cfilter id%3D%22n%22%3E%3CfeTurbulence type%3D%22fractalNoise%22 baseFrequency%3D%220.9%22 numOctaves%3D%224%22/%3E%3C/filter%3E%3Crect width%3D%22100%25%22 height%3D%22100%25%22 filter%3D%22url(%23n)%22/%3E%3C/svg%3E')"
//           backgroundSize="180px"
//         />
//         {/* Fine grid */}
//         <Box
//           position="absolute" inset={0}
//           opacity={0.018}
//           backgroundImage="linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)"
//           backgroundSize="80px 80px"
//         />
//         {/* Left fade vignette */}
//         <Box
//           position="absolute" inset={0}
//           bgGradient="radial(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)"
//         />
//       </Box>

//       {/* ── Split layout ── */}
//       <Flex
//         direction={{ base: "column", lg: "row" }}
//         align="center"
//         justify="space-between"
//         w="full"
//         maxW="1200px"
//         mx="auto"
//         gap={{ base: 16, lg: 8 }}
//         position="relative"
//         zIndex={1}
//       >
//         {/* ──────── LEFT: TEXT ──────── */}
//         <VStack
//           align="flex-start"
//           spacing={0}
//           flex={1}
//           maxW={{ lg: "580px" }}
//         >
//           {/* Eyebrow */}
//           <MotionBox
//             initial={{ opacity: 0, x: -20 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.5 }}
//             mb={5}
//           >
//             <HStack
//               spacing={3}
//               px={4} py={2}
//               borderRadius="full"
//               bg="rgba(20,184,166,0.06)"
//               border="1px solid rgba(20,184,166,0.18)"
//               w="fit-content"
//               animation={`${softPulse} 3s ease-in-out infinite`}
//             >
//               <Box w="7px" h="7px" borderRadius="full" bg="#14b8a6"
//                 boxShadow="0 0 10px #14b8a6"
//                 animation={`${breathe} 2s ease-in-out infinite`}
//               />
//               <Text fontSize="12px" color="#14b8a6" letterSpacing="0.14em" fontWeight={500}>
//                 ABOUT ME
//               </Text>
//             </HStack>
//           </MotionBox>

//           {/* Main headline */}
//           <Box mb={4}>
//             <RevealText
//               text="Hey, I'm Lorem"
//               delay={0.15}
//               fontSize="clamp(38px, 6vw, 64px)"
//               fontWeight="800"
//               color="white"
//               fontFamily="'Orbitron', sans-serif"
//               lineHeight={1.1}
//               as="h1"
//             />
//             {/* Typewriter role */}
//             <MotionBox
//               initial={{ opacity: 0 }}
//               animate={inView ? { opacity: 1 } : {}}
//               transition={{ delay: 0.6, duration: 0.5 }}
//               mt={2}
//             >
//               <HStack spacing={0} align="center" h="36px">
//                 <Text
//                   fontFamily="'Sora', sans-serif"
//                   fontSize={{ base: "17px", md: "21px" }}
//                   fontWeight={400}
//                   bgGradient="linear(to-r, #1e40af, #7c3aed, #ec4899)"
//                   bgClip="text"
//                   backgroundSize="200% 200%"
//                   animation={`${gradShift} 5s ease infinite`}
//                   letterSpacing="0.02em"
//                 >
//                   {typed}
//                 </Text>
//                 <Box
//                   w="2px" h="22px"
//                   bg="#7c3aed"
//                   ml={1}
//                   animation={`${blink} 1s step-end infinite`}
//                   borderRadius="full"
//                 />
//               </HStack>
//             </MotionBox>
//           </Box>

//           {/* Thin accent line */}
//           <MotionBox
//             initial={{ scaleX: 0, originX: 0 }}
//             animate={inView ? { scaleX: 1 } : {}}
//             transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
//             h="2px"
//             w="80px"
//             borderRadius="full"
//             mb={7}
//             style={{
//               background: "linear-gradient(90deg, #14b8a6, #7c3aed, transparent)",
//             }}
//           />

//           {/* Bio */}
//           <Box mb={8} maxW="500px">
//             <RevealText
//               text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. I craft digital experiences that feel alive — blending clean engineering with considered design to build things people actually enjoy using."
//               delay={0.5}
//               fontSize="15.5px"
//               fontWeight="400"
//               color="rgba(255,255,255,0.58)"
//               fontFamily="'Sora', sans-serif"
//               lineHeight={1.9}
//             />
//             <Box mt={4}>
//               <RevealText
//                 text="I believe the best products live at the intersection of empathy and precision. When I'm not shipping features, you'll find me exploring design systems, contributing to open source, or staring at a sunset pretending to be productive."
//                 delay={0.75}
//                 fontSize="15.5px"
//                 fontWeight="400"
//                 color="rgba(255,255,255,0.42)"
//                 fontFamily="'Sora', sans-serif"
//                 lineHeight={1.9}
//               />
//             </Box>
//           </Box>

//           {/* Tag pills */}
//           <MotionBox
//             initial={{ opacity: 0 }}
//             animate={inView ? { opacity: 1 } : {}}
//             transition={{ delay: 0.85 }}
//             mb={9}
//           >
//             <Flex gap={2} flexWrap="wrap">
//               {tags.map((t) => (
//                 <TagPill key={t.label} {...t} />
//               ))}
//             </Flex>
//           </MotionBox>

//           {/* CTA row */}
//           <MotionBox
//             initial={{ opacity: 0, y: 16 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 1.1, duration: 0.5 }}
//             mb={12}
//           >
//             <HStack spacing={4} flexWrap="wrap">
//               <MagneticBtn href="#work" variant="primary">View my work →</MagneticBtn>
//               <MagneticBtn href="#contact" variant="ghost">Let's talk</MagneticBtn>
//             </HStack>
//           </MotionBox>

//           {/* Stats row */}
//           <MotionBox
//             initial={{ opacity: 0 }}
//             animate={inView ? { opacity: 1 } : {}}
//             transition={{ delay: 1.3 }}
//             w="full"
//           >
//             {/* Divider */}
//             <Box h="1px" bg="rgba(255,255,255,0.06)" mb={7} />
//             <HStack spacing={10} flexWrap="wrap" rowGap={6}>
//               <StatItem value="48+" label="Projects shipped" color="#14b8a6" delay={1.4} />
//               <StatItem value="9+" label="Years building" color="#7c3aed" delay={1.5} />
//               <StatItem value="12+" label="Happy clients" color="#ec4899" delay={1.6} />
//             </HStack>
//           </MotionBox>
//         </VStack>

//         {/* ──────── RIGHT: VISUAL ──────── */}
//         <MotionBox
//           initial={{ opacity: 0, x: 40 }}
//           animate={inView ? { opacity: 1, x: 0 } : {}}
//           transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
//           flex={{ base: "unset", lg: "0 0 420px" }}
//           w={{ base: "full", lg: "420px" }}
//         >
//           <AvatarPanel />
//         </MotionBox>
//       </Flex>

//       {/* ── Decorative bottom fade ── */}
//       <Box
//         position="absolute" bottom={0} left={0} right={0}
//         h="120px"
//         bgGradient="linear(to-t, rgba(10,10,10,1), transparent)"
//         pointerEvents="none"
//       />
//     </Box>
//   );
// }
