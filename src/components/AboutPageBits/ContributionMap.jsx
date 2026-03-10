// import { useRef, useEffect, useState } from 'react';
// import GitHubCalendar from 'react-github-calendar';
// import { Box, Text, HStack, Flex, VStack } from '@chakra-ui/react';
// import { GitCommitHorizontal, BookMarked, Flame, CalendarDays } from 'lucide-react';
// import { motion, animate } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import gsap from 'gsap';

// const H    = 'Orbitron, sans-serif';
// const B    = 'Sora, sans-serif';
// const MONO = "'JetBrains Mono', monospace";
// const TEAL = '#14b8a6';
// const GRAD = 'linear-gradient(135deg, #1e40af, #7c3aed, #ec4899)';

// // ── Count-up ──────────────────────────────────────────────────────────────────
// function CountUp({ to, trigger }) {
//   const [v, setV] = useState(0);
//   const isNum = !isNaN(parseInt(to));
//   useEffect(() => {
//     if (!trigger || !isNum) return;
//     const c = animate(0, parseInt(to), {
//       duration: 1.8, ease: [0.16, 1, 0.3, 1],
//       onUpdate: n => setV(Math.floor(n)),
//     });
//     return () => c.stop();
//   }, [trigger, to, isNum]);
//   return <>{isNum ? v : to}</>;
// }

// // ── Stat card ─────────────────────────────────────────────────────────────────
// const StatCard = ({ value, label, sub, color, trigger, icon }) => {
//   const [hov, setHov] = useState(false);
//   return (
//     <Box flex={1} minW="110px" px={5} py={5} borderRadius="14px"
//       bg={hov ? `${color}0a` : 'rgba(255,255,255,0.025)'}
//       border="1px solid"
//       borderColor={hov ? `${color}40` : 'rgba(255,255,255,0.06)'}
//       backdropFilter="blur(16px)"
//       transition="all 0.35s" cursor="default"
//       position="relative" overflow="hidden"
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//     >
//       <Box position="absolute" inset={0} pointerEvents="none"
//         background={`radial-gradient(circle at 50% 0%, ${color}18, transparent 70%)`}
//         opacity={hov ? 1 : 0} transition="opacity 0.4s" />
//       <Box position="absolute" top={0} left="15%" right="15%" h="1px"
//         bg={color} opacity={hov ? 0.6 : 0.2} transition="opacity 0.3s" />
//       <HStack spacing={1.5} mb={2} align="center" justify="flex-end">
//         <Text fontFamily={H} fontSize="9px" letterSpacing="0.22em"
//           textTransform="uppercase" color="whiteAlpha.350">
//           {label}
//         </Text>
//         <Box color="whiteAlpha.350">{icon}</Box>
//       </HStack>
//       <Text fontFamily={H} fontWeight="900" lineHeight={1} mb={1}
//         fontSize={{ base: '26px', md: '32px' }}
//         textAlign="right"
//         style={{ background: `linear-gradient(135deg, ${color}, ${color}55)`,
//           WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//         <CountUp to={value} trigger={trigger} />
//       </Text>
//       {sub && (
//         <Text fontFamily={B} fontSize="11px" color="whiteAlpha.350" mt={1} textAlign="right">{sub}</Text>
//       )}
//     </Box>
//   );
// };

// // ─────────────────────────────────────────────────────────────────────────────
// export default function ContributionMap() {
//   const calendarRef = useRef(null);
//   const glowRef     = useRef(null);
//   const [sectionRef, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
//   const [calReady, setCalReady] = useState(false);

//   // Attach GSAP interactions once calendar SVG is rendered
//   useEffect(() => {
//     if (!calReady || !calendarRef.current) return;

//     const cells = calendarRef.current.querySelectorAll('rect[data-level]');
//     if (!cells.length) return;

//     cells.forEach(cell => {
//       const enter = () => gsap.to(cell, {
//         attr: { 'stroke-width': 2.5, rx: 6, ry: 6 },
//         filter: 'brightness(1.6) saturate(1.5) drop-shadow(0 0 4px rgba(20,184,166,0.7))',
//         duration: 0.25, ease: 'back.out(2)',
//       });
//       const leave = () => gsap.to(cell, {
//         attr: { 'stroke-width': 1, rx: 4, ry: 4 },
//         filter: 'brightness(1) saturate(1)',
//         duration: 0.35, ease: 'power2.out',
//       });
//       const click = () => gsap.timeline()
//         .to(cell, { y: -6,
//           filter: 'brightness(2.2) drop-shadow(0 6px 12px rgba(20,184,166,0.9))',
//           duration: 0.18, ease: 'power2.out' })
//         .to(cell, { y: 0, filter: 'brightness(1)',
//           duration: 0.35, ease: 'bounce.out' });

//       cell.addEventListener('mouseenter', enter);
//       cell.addEventListener('mouseleave', leave);
//       cell.addEventListener('click', click);
//       cell._cleanup = () => {
//         cell.removeEventListener('mouseenter', enter);
//         cell.removeEventListener('mouseleave', leave);
//         cell.removeEventListener('click', click);
//       };
//     });

//     // Mouse-follow ambient glow
//     const container = calendarRef.current;
//     const onMove = e => {
//       if (!glowRef.current) return;
//       const r = container.getBoundingClientRect();
//       const x = ((e.clientX - r.left) / r.width)  * 100;
//       const y = ((e.clientY - r.top)  / r.height) * 100;
//       gsap.to(glowRef.current, {
//         background: `radial-gradient(500px circle at ${x}% ${y}%, rgba(20,184,166,0.09), transparent 60%)`,
//         duration: 0.4, ease: 'power1.out',
//       });
//     };
//     const onLeave = () => gsap.to(glowRef.current, {
//       background: 'radial-gradient(500px circle at 50% 50%, rgba(20,184,166,0.04), transparent 60%)',
//       duration: 0.8,
//     });
//     container.addEventListener('mousemove', onMove);
//     container.addEventListener('mouseleave', onLeave);

//     return () => {
//       cells.forEach(c => c._cleanup?.());
//       container.removeEventListener('mousemove', onMove);
//       container.removeEventListener('mouseleave', onLeave);
//     };
//   }, [calReady]);

//   const calTheme = {
//     dark: [
//       'rgba(255,255,255,0.04)',
//       'rgba(20,184,166,0.22)',
//       'rgba(20,184,166,0.42)',
//       'rgba(20,184,166,0.64)',
//       'rgba(20,184,166,0.88)',
//     ],
//   };

//   return (
//     <Box ref={sectionRef} position="relative" py={{ base: 4, md: 6 }} maxW="900px" mx="auto">

//       {/* ── Header ─────────────────────────────────────────────────── */}
//       <motion.div
//         initial={{ opacity: 0, y: 24 }}
//         animate={inView ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.55 }}
//       >
//         <HStack spacing={3} mb={3} justify="flex-start">
//           <Box w="24px" h="1px"
//             style={{ background: 'linear-gradient(to right, #ec4899, #7c3aed)' }} />
//           <Text fontFamily={H} fontSize="9px" letterSpacing="0.3em"
//             textTransform="uppercase" color="whiteAlpha.400">
//             Activity
//           </Text>
//         </HStack>
//         <Text fontFamily={H} fontWeight="900" letterSpacing="-0.02em"
//           lineHeight={1.05} fontSize={{ base: '26px', md: '40px' }}
//           textAlign="left"
//           style={{ background: GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//           GitHub
//         </Text>
//         <Text fontFamily={H} fontWeight="900" letterSpacing="-0.02em"
//           lineHeight={1.05} fontSize={{ base: '26px', md: '40px' }}
//           textAlign="left"
//           color="text.subdued" mb={10}>
//           Contributions
//         </Text>
//       </motion.div>

//       {/* ── Stats row ──────────────────────────────────────────────── */}
//       <motion.div
//         initial={{ opacity: 0, y: 18 }}
//         animate={inView ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.5, delay: 0.15 }}
//       >
//         <Flex gap={3} mb={8} flexWrap="wrap" justify="center">
//           <StatCard value="500"  label="Contributions" sub="this year"   color={TEAL}    trigger={inView} icon={<GitCommitHorizontal size={13} />} />
//           <StatCard value="30"   label="Repositories"  sub="public"      color="#a855f7" trigger={inView} icon={<BookMarked size={13} />} />
//           <StatCard value="12"   label="Streak"        sub="days"        color="#3b82f6" trigger={inView} icon={<Flame size={13} />} />
//           <StatCard value="4"    label="Years"         sub="on GitHub"   color="#ec4899" trigger={inView} icon={<CalendarDays size={13} />} />
//         </Flex>
//       </motion.div>

//       {/* ── Calendar card ──────────────────────────────────────────── */}
//       <motion.div
//         initial={{ opacity: 0, y: 32 }}
//         animate={inView ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.65, delay: 0.28 }}
//       >
//         <Box position="relative" borderRadius="20px" overflow="hidden"
//           border="1px solid rgba(255,255,255,0.06)"
//           bg="rgba(255,255,255,0.02)" backdropFilter="blur(24px)"
//           p={{ base: 5, md: 8, lg: 10 }}>

//           {/* Static ambient glow */}
//           <Box position="absolute" inset={0} pointerEvents="none" zIndex={0}
//             background="radial-gradient(ellipse 80% 60% at 50% 110%, rgba(20,184,166,0.08), transparent)" />

//           {/* Mouse-follow glow */}
//           <Box ref={glowRef} position="absolute" inset={0} pointerEvents="none" zIndex={0}
//             background="radial-gradient(500px circle at 50% 50%, rgba(20,184,166,0.04), transparent 60%)" />

//           {/* Top hairline */}
//           <Box position="absolute" top={0} left="8%" right="8%" h="1px"
//             background="linear-gradient(to right, transparent, rgba(20,184,166,0.3), transparent)" />

//           {/* Corner accents */}
//           {[
//             { top: '14px', left: '14px', borderRight: 'none', borderBottom: 'none' },
//             { top: '14px', right: '14px', borderLeft: 'none', borderBottom: 'none' },
//             { bottom: '14px', left: '14px', borderRight: 'none', borderTop: 'none' },
//             { bottom: '14px', right: '14px', borderLeft: 'none', borderTop: 'none' },
//           ].map((s, i) => (
//             <Box key={i} position="absolute" w="14px" h="14px"
//               border="1px solid rgba(20,184,166,0.22)" borderRadius="2px" {...s} />
//           ))}

//           {/* Calendar */}
//           <Box ref={calendarRef} position="relative" zIndex={1}
//             overflowX="auto" display="flex" justifyContent="center"
//             sx={{
//               '& rect[data-level]': {
//                 rx: '4px', ry: '4px',
//                 strokeWidth: '1px',
//                 stroke: 'rgba(255,255,255,0.07)',
//                 cursor: 'pointer',
//                 transformOrigin: 'center center',
//                 transformBox: 'fill-box',
//               },
//               'svg text': { fill: 'rgba(255,255,255,0.28) !important', fontFamily: MONO, fontSize: '11px' },
//               'svg': { maxWidth: '100%', height: 'auto' },
//               scrollbarWidth: 'none',
//               '&::-webkit-scrollbar': { display: 'none' },
//             }}
//           >
//             <GitHubCalendar
//               username="anandita-3217"
//               blockSize={16}
//               blockMargin={5}
//               fontSize={13}
//               theme={calTheme}
//               colorScheme="dark"
//               labels={{
//                 months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
//                 weekdays: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
//                 totalCount: '{{count}} contributions in {{year}}',
//                 legend: { less: 'Less', more: 'More' },
//               }}
//               onRender={() => setCalReady(true)}
//             />
//           </Box>

//           {/* Legend footer */}
//           <Flex mt={6} pt={4} justify="space-between" align="center"
//             borderTop="1px solid rgba(255,255,255,0.04)"
//             position="relative" zIndex={1}>
//             <Text fontFamily={MONO} fontSize="10px" color="whiteAlpha.200">
//               anandita-3217
//             </Text>
//             <HStack spacing={1.5} align="center">
//               <Text fontFamily={H} fontSize="7px" letterSpacing="0.12em"
//                 textTransform="uppercase" color="whiteAlpha.250" mr={1}>Less</Text>
//               {[0.05, 0.22, 0.42, 0.64, 0.88].map((o, i) => (
//                 <Box key={i} w="10px" h="10px" borderRadius="3px"
//                   bg={`rgba(20,184,166,${o})`}
//                   border="1px solid rgba(255,255,255,0.07)" />
//               ))}
//               <Text fontFamily={H} fontSize="7px" letterSpacing="0.12em"
//                 textTransform="uppercase" color="whiteAlpha.250" ml={1}>More</Text>
//             </HStack>
//           </Flex>

//         </Box>
//       </motion.div>

//     </Box>
//   );
// }

import { useRef, useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { Box, Text, HStack, Flex, VStack } from '@chakra-ui/react';
import { GitCommitHorizontal, BookMarked, Flame, CalendarDays } from 'lucide-react';
import { motion, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';

const H    = 'Orbitron, sans-serif';
const B    = 'Sora, sans-serif';
const MONO = "'JetBrains Mono', monospace";
const TEAL = '#14b8a6';
const GRAD = 'linear-gradient(135deg, #1e40af, #7c3aed, #ec4899)';

// ── Count-up ──────────────────────────────────────────────────────────────────
function CountUp({ to, trigger }) {
  const [v, setV] = useState(0);
  const isNum = !isNaN(parseInt(to));
  useEffect(() => {
    if (!trigger || !isNum) return;
    const c = animate(0, parseInt(to), {
      duration: 1.8, ease: [0.16, 1, 0.3, 1],
      onUpdate: n => setV(Math.floor(n)),
    });
    return () => c.stop();
  }, [trigger, to, isNum]);
  return <>{isNum ? v : to}</>;
}

// ── Stat card ─────────────────────────────────────────────────────────────────
const StatCard = ({ value, label, sub, color, trigger, icon }) => {
  const [hov, setHov] = useState(false);
  return (
    <Box flex={1} minW="110px" px={5} py={5} borderRadius="14px"
      bg={hov ? `${color}0a` : 'rgba(255,255,255,0.025)'}
      border="1px solid"
      borderColor={hov ? `${color}40` : 'rgba(255,255,255,0.06)'}
      backdropFilter="blur(16px)"
      transition="all 0.35s" cursor="default"
      position="relative" overflow="hidden"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <Box position="absolute" inset={0} pointerEvents="none"
        background={`radial-gradient(circle at 50% 0%, ${color}18, transparent 70%)`}
        opacity={hov ? 1 : 0} transition="opacity 0.4s" />
      <Box position="absolute" top={0} left="15%" right="15%" h="1px"
        bg={color} opacity={hov ? 0.6 : 0.2} transition="opacity 0.3s" />
      <HStack spacing={1.5} mb={2} align="center" justify="flex-end">
        <Text fontFamily={H} fontSize="9px" letterSpacing="0.22em"
          textTransform="uppercase" color="whiteAlpha.350">
          {label}
        </Text>
        <Box color="whiteAlpha.350">{icon}</Box>
      </HStack>
      <Text fontFamily={H} fontWeight="900" lineHeight={1} mb={1}
        fontSize={{ base: '26px', md: '32px' }}
        textAlign="right"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}55)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        <CountUp to={value} trigger={trigger} />
      </Text>
      {sub && (
        <Text fontFamily={B} fontSize="11px" color="whiteAlpha.350" mt={1} textAlign="right">{sub}</Text>
      )}
    </Box>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
export default function ContributionMap() {
  const calendarRef = useRef(null);
  const glowRef     = useRef(null);
  const [sectionRef, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [calReady, setCalReady] = useState(false);

  // Attach GSAP interactions once calendar SVG is rendered
  useEffect(() => {
    if (!calReady || !calendarRef.current) return;

    const svg = calendarRef.current.querySelector('svg');
    const cells = Array.from(calendarRef.current.querySelectorAll('rect[data-level]'));
    if (!cells.length || !svg) return;

    // ── Inject linearGradient into SVG defs ──────────────────────────────────
    let defs = svg.querySelector('defs');
    if (!defs) { defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs'); svg.prepend(defs); }

    // Base gradient (left→right: blue→purple→pink)
    const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    grad.setAttribute('id', 'cell-grad');
    grad.setAttribute('x1', '0%'); grad.setAttribute('y1', '0%');
    grad.setAttribute('x2', '100%'); grad.setAttribute('y2', '0%');
    grad.setAttribute('gradientUnits', 'objectBoundingBox');
    // We'll set x1/x2 per-cell via getBBox so the gradient spans each cell
    const stops = [
      { offset: '0%',   color: '#1e40af' },
      { offset: '50%',  color: '#7c3aed' },
      { offset: '100%', color: '#ec4899' },
    ];
    stops.forEach(({ offset, color }) => {
      const s = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      s.setAttribute('offset', offset);
      s.setAttribute('stop-color', color);
      grad.appendChild(s);
    });
    defs.appendChild(grad);

    // Wave gradient (brighter flash)
    const waveGrad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    waveGrad.setAttribute('id', 'cell-wave-grad');
    waveGrad.setAttribute('x1', '0%'); waveGrad.setAttribute('y1', '0%');
    waveGrad.setAttribute('x2', '100%'); waveGrad.setAttribute('y2', '0%');
    waveGrad.setAttribute('gradientUnits', 'objectBoundingBox');
    const waveStops = [
      { offset: '0%',   color: '#60a5fa' },
      { offset: '50%',  color: '#c084fc' },
      { offset: '100%', color: '#f472b6' },
    ];
    waveStops.forEach(({ offset, color }) => {
      const s = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      s.setAttribute('offset', offset);
      s.setAttribute('stop-color', color);
      waveGrad.appendChild(s);
    });
    defs.appendChild(waveGrad);

    // ── Apply per-cell gradient fill + opacity from data-level ───────────────
    // Level 0 = no commits (keep subtle), 1-4 = progressively more opaque
    const levelOpacity = { '0': 0.06, '1': 0.35, '2': 0.55, '3': 0.75, '4': 0.95 };

    cells.forEach(cell => {
      const level = cell.getAttribute('data-level') || '0';
      // Each cell gets gradient fill; opacity encodes commit level
      cell.setAttribute('fill', 'url(#cell-grad)');
      cell.setAttribute('fill-opacity', levelOpacity[level] ?? 0.06);
      cell._baseOpacity = levelOpacity[level] ?? 0.06;

      // ── Hover ──
      const enter = () => {
        gsap.to(cell, {
          attr: { 'stroke-width': 2.5, rx: 6, ry: 6, 'fill-opacity': Math.min(1, (cell._baseOpacity || 0.06) + 0.25) },
          filter: 'brightness(1.5) drop-shadow(0 0 5px rgba(124,58,237,0.8))',
          duration: 0.25, ease: 'back.out(2)',
        });
      };
      const leave = () => {
        gsap.to(cell, {
          attr: { 'stroke-width': 1, rx: 4, ry: 4, 'fill-opacity': cell._baseOpacity },
          filter: 'none',
          duration: 0.35, ease: 'power2.out',
        });
      };

      // ── Click → ripple wave outward ──────────────────────────────────────
      const click = () => {
        // Get clicked cell centre
        const bbox = cell.getBBox();
        const cx = bbox.x + bbox.width  / 2;
        const cy = bbox.y + bbox.height / 2;

        // Sort all cells by distance from clicked cell
        const sorted = cells
          .map(c => {
            const b = c.getBBox();
            const dx = (b.x + b.width  / 2) - cx;
            const dy = (b.y + b.height / 2) - cy;
            return { c, dist: Math.sqrt(dx * dx + dy * dy) };
          })
          .sort((a, b) => a.dist - b.dist);

        // Max distance for timing
        const maxDist = sorted[sorted.length - 1].dist || 1;

        sorted.forEach(({ c, dist }) => {
          const delay   = (dist / maxDist) * 0.55;   // 0 → 0.55s spread
          const isOrigin = dist < 1;

          gsap.timeline({ delay })
            // Flash to wave gradient
            .to(c, {
              attr: { fill: 'url(#cell-wave-grad)', 'fill-opacity': 1, rx: isOrigin ? 8 : 6, ry: isOrigin ? 8 : 6 },
              filter: `brightness(${isOrigin ? 2.5 : 1.8}) drop-shadow(0 0 ${isOrigin ? 8 : 4}px rgba(192,132,252,0.9))`,
              duration: 0.18, ease: 'power2.out',
            })
            // Fade back to base gradient
            .to(c, {
              attr: { fill: 'url(#cell-grad)', 'fill-opacity': c._baseOpacity, rx: 4, ry: 4 },
              filter: 'none',
              duration: 0.5, ease: 'power3.out',
            });
        });
      };

      cell.addEventListener('mouseenter', enter);
      cell.addEventListener('mouseleave', leave);
      cell.addEventListener('click', click);
      cell._cleanup = () => {
        cell.removeEventListener('mouseenter', enter);
        cell.removeEventListener('mouseleave', leave);
        cell.removeEventListener('click', click);
      };
    });

    // ── Mouse-follow ambient glow ─────────────────────────────────────────────
    const container = calendarRef.current;
    const onMove = e => {
      if (!glowRef.current) return;
      const r = container.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width)  * 100;
      const y = ((e.clientY - r.top)  / r.height) * 100;
      gsap.to(glowRef.current, {
        background: `radial-gradient(500px circle at ${x}% ${y}%, rgba(124,58,237,0.1), transparent 60%)`,
        duration: 0.4, ease: 'power1.out',
      });
    };
    const onLeave = () => gsap.to(glowRef.current, {
      background: 'radial-gradient(500px circle at 50% 50%, rgba(20,184,166,0.04), transparent 60%)',
      duration: 0.8,
    });
    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);

    return () => {
      cells.forEach(c => c._cleanup?.());
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, [calReady]);

  // Theme is overridden by JS gradient injection — these are fallback colours
  // used before calReady fires. Keep them subtle so the swap isn't jarring.
  const calTheme = {
    dark: [
      'rgba(255,255,255,0.04)',
      'rgba(124,58,237,0.3)',
      'rgba(124,58,237,0.5)',
      'rgba(124,58,237,0.7)',
      'rgba(124,58,237,0.92)',
    ],
  };

  return (
    <Box ref={sectionRef} position="relative" py={{ base: 4, md: 6 }} maxW="900px" mx="auto" bg="transparent" backdropFilter="blur(60px)">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
      >
        <HStack spacing={3} mb={3}>
          <Box w="24px" h="1px"
            style={{ background: 'linear-gradient(to right, #ec4899, #7c3aed)' }} />
          <Text fontFamily={H} fontSize="9px" letterSpacing="0.3em"
            textTransform="uppercase" color="whiteAlpha.400">
            Activity
          </Text>
        </HStack>
        <Text fontFamily={H} fontWeight="900" letterSpacing="-0.02em"
          lineHeight={1.05} fontSize={{ base: '26px', md: '40px' }}
          style={{ background: GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          GitHub
        </Text>
        <Text fontFamily={H} fontWeight="900" letterSpacing="-0.02em"
          lineHeight={1.05} fontSize={{ base: '26px', md: '40px' }}
          color="rgba(255,255,255,0.12)" mb={10}>
          Contributions
        </Text>
      </motion.div>

      {/* ── Stats row ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <Flex gap={3} mb={8} flexWrap="wrap" justify="center">
          <StatCard value="500"  label="Contributions" sub="this year"   color={TEAL}    trigger={inView} icon={<GitCommitHorizontal size={13} />} />
          <StatCard value="30"   label="Repositories"  sub="public"      color="#a855f7" trigger={inView} icon={<BookMarked size={13} />} />
          <StatCard value="12"   label="Streak"        sub="days"        color="#3b82f6" trigger={inView} icon={<Flame size={13} />} />
          <StatCard value="4"    label="Years"         sub="on GitHub"   color="#ec4899" trigger={inView} icon={<CalendarDays size={13} />} />
        </Flex>
      </motion.div>

      {/* ── Calendar card ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.28 }}
      >
        <Box position="relative" borderRadius="20px" overflow="hidden"
          border="1px solid rgba(255,255,255,0.06)"
          bg="transparent" backdropFilter="blur(10px)"
          p={{ base: 5, md: 8, lg: 10 }}>

          {/* Static ambient glow */}
          <Box position="absolute" inset={0} pointerEvents="none" zIndex={0}
            background="radial-gradient(ellipse 80% 60% at 50% 110%, rgba(20,184,166,0.08), transparent)" />

          {/* Mouse-follow glow */}
          <Box ref={glowRef} position="absolute" inset={0} pointerEvents="none" zIndex={0}
            background="radial-gradient(500px circle at 50% 50%, rgba(20,184,166,0.04), transparent 60%)" />

          {/* Top hairline */}
          <Box position="absolute" top={0} left="8%" right="8%" h="1px"
            background="linear-gradient(to right, transparent, rgba(20,184,166,0.3), transparent)" />

          {/* Corner accents */}
          {[
            { top: '14px', left: '14px', borderRight: 'none', borderBottom: 'none' },
            { top: '14px', right: '14px', borderLeft: 'none', borderBottom: 'none' },
            { bottom: '14px', left: '14px', borderRight: 'none', borderTop: 'none' },
            { bottom: '14px', right: '14px', borderLeft: 'none', borderTop: 'none' },
          ].map((s, i) => (
            <Box key={i} position="absolute" w="14px" h="14px"
              border="1px solid rgba(20,184,166,0.22)" borderRadius="2px" {...s} />
          ))}

          {/* Calendar */}
          <Box ref={calendarRef} position="relative" zIndex={1}
            overflowX="auto" display="flex" justifyContent="center"
            sx={{
              '& rect[data-level]': {
                rx: '4px', ry: '4px',
                strokeWidth: '1px',
                stroke: 'rgba(255,255,255,0.07)',
                cursor: 'pointer',
                transformOrigin: 'center center',
                transformBox: 'fill-box',
              },
              'svg text': { fill: 'rgba(255,255,255,0.28) !important', fontFamily: MONO, fontSize: '11px' },
              'svg': { maxWidth: '100%', height: 'auto' },
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            <GitHubCalendar
              username="anandita-3217"
              blockSize={16}
              blockMargin={5}
              fontSize={13}
              theme={calTheme}
              colorScheme="dark"
              labels={{
                months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
                weekdays: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
                totalCount: '{{count}} contributions in {{year}}',
                legend: { less: 'Less', more: 'More' },
              }}
              onRender={() => setCalReady(true)}
            />
          </Box>

          {/* Legend footer */}
          <Flex mt={6} pt={4} justify="space-between" align="center"
            borderTop="1px solid rgba(255,255,255,0.04)"
            position="relative" zIndex={1}>
            <Text fontFamily={MONO} fontSize="10px" color="whiteAlpha.200">
              anandita-3217
            </Text>
            <HStack spacing={1.5} align="center">
              <Text fontFamily={H} fontSize="7px" letterSpacing="0.12em"
                textTransform="uppercase" color="whiteAlpha.250" mr={1}>Less</Text>
              {[0.05, 0.22, 0.42, 0.64, 0.88].map((o, i) => (
                <Box key={i} w="10px" h="10px" borderRadius="3px"
                  bg={`rgba(20,184,166,${o})`}
                  border="1px solid rgba(255,255,255,0.07)" />
              ))}
              <Text fontFamily={H} fontSize="7px" letterSpacing="0.12em"
                textTransform="uppercase" color="whiteAlpha.250" ml={1}>More</Text>
            </HStack>
          </Flex>

        </Box>
      </motion.div>

    </Box>
  );
}