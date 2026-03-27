// import { useRef, useEffect, useState } from 'react';
// import GitHubCalendar from 'react-github-calendar';
// import { Box, Text, HStack, Flex, useColorMode, useColorModeValue } from '@chakra-ui/react';
// import { GitCommitHorizontal, BookMarked, Flame, CalendarDays } from 'lucide-react';
// import { motion, animate } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import gsap from 'gsap';

// const USERNAME = 'anandita-3217';
// // ── Count-up ──────────────────────────────────────────────────────────────────
// function CountUp({ to, trigger }) {
//   const [v, setV] = useState(0);
//   const isNum = to !== null && to !== undefined && !isNaN(parseInt(to));
//   useEffect(() => {
//     if (!trigger || !isNum) return;
//     const c = animate(0, parseInt(to), {
//       duration: 1.8, ease: [0.16, 1, 0.3, 1],
//       onUpdate: n => setV(Math.floor(n)),
//     });
//     return () => c.stop();
//   }, [trigger, to, isNum]);
//   if (!isNum) return <>{to ?? '–'}</>;
//   return <>{v}</>;
// }

// // ── Stat card ─────────────────────────────────────────────────────────────────
// const StatCard = ({ value, suffix = '', label, sub, color, trigger, icon }) => {
//   const [hov, setHov] = useState(false);
//   const cardBg     = useColorModeValue('rgba(247,247,248,0.92)', 'rgba(10,10,10,0.82)');
//   const cardBgHov  = useColorModeValue('#ffffff',                `${color}0a`);
//   const borderBase = useColorModeValue('rgba(0,0,0,0.08)',       'rgba(255,255,255,0.06)');
//   const subColor   = useColorModeValue('gray.500',               'whiteAlpha.300');
//   const labelColor = useColorModeValue('gray.400',               'whiteAlpha.350');

//   return (
//     <Box flex={1} minW="110px" px={5} py={5} borderRadius="14px"
//       bg={hov ? cardBgHov : cardBg}
//       border="1px solid"
//       borderColor={hov ? `${color}55` : borderBase}
//       backdropFilter="blur(10px)"
//       transition="all 0.35s" cursor="default"
//       position="relative" overflow="hidden"
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//     >
//       <Box position="absolute" inset={0} pointerEvents="none"
//         background={`radial-gradient(circle at 50% 0%, ${color}18, transparent 70%)`}
//         opacity={hov ? 1 : 0} transition="opacity 0.4s" />
//       <Box position="absolute" top={0} left="15%" right="15%" h="1px"
//         bg={color} opacity={hov ? 0.55 : 0.15} transition="opacity 0.3s" />
//       <HStack spacing={1.5} mb={2} align="center" justify="flex-end">
//         <Text fontFamily='Orbitron' fontSize="9px" letterSpacing="0.22em"
//           textTransform="uppercase" color={labelColor}>{label}</Text>
//         <Box color={labelColor}>{icon}</Box>
//       </HStack>
//       <Text fontFamily='Orbitron' fontWeight="900" lineHeight={1} mb={1}
//         fontSize={{ base: '24px', md: '30px' }} textAlign="right"
//         display="inline-block" w="100%"
//         style={{ background: `linear-gradient(135deg, ${color}, ${color}88)`,
//           WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//         {value === null
//           ? <Box as="span" fontSize="14px" opacity={0.4}>…</Box>
//           : <><CountUp to={value} trigger={trigger} />{suffix}</>
//         }
//       </Text>
//       {sub && <Text fontFamily='Sora' fontSize="11px" color={subColor}
//         mt={1} textAlign="right">{sub}</Text>}
//     </Box>
//   );
// };

// // ── SVG gradient + cell interactions (hover + click-wave, NO mouse tracking) ──
// function setupCalendar(calendarEl, isDark) {
//   const svg   = calendarEl.querySelector('svg');
//   const cells = Array.from(calendarEl.querySelectorAll('rect[data-level]'));
//   if (!svg || !cells.length) return null;

//   const emptyFill  = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)';
//   const BASE_FILL  = '#7c3aed';
//   const WAVE_FILL  = '#c084fc';
//   // More commits = more opaque purple
//   const opacityMap = { '0': 0, '1': 0.28, '2': 0.50, '3': 0.72, '4': 0.95 };

//   cells.forEach(cell => {
//     const level = cell.getAttribute('data-level') ?? '0';
//     const op    = opacityMap[level] ?? 0;
//     if (level === '0') {
//       cell.style.fill        = emptyFill;
//       cell.style.fillOpacity = '1';
//     } else {
//       cell.style.fill        = BASE_FILL;
//       cell.style.fillOpacity = op;
//     }
//     cell.style.cursor   = 'pointer';
//     cell.dataset.baseOp = op;
//     cell.dataset.level  = level;
//   });

//   const restoreFill = c => {
//     const empty = (c.dataset.level ?? '0') === '0';
//     c.style.fill        = empty ? emptyFill : BASE_FILL;
//     c.style.fillOpacity = empty ? '1' : parseFloat(c.dataset.baseOp ?? 0);
//   };

//   cells.forEach(cell => {
//     const baseOp  = () => parseFloat(cell.dataset.baseOp ?? 0);
//     const isEmpty = () => (cell.dataset.level ?? '0') === '0';

//     const enter = () => {
//       cell.style.fill        = BASE_FILL;
//       cell.style.fillOpacity = Math.min(1, baseOp() + (isEmpty() ? 0.15 : 0.28));
//       cell.style.filter      = 'brightness(1.8) drop-shadow(0 0 6px rgba(192,132,252,0.85))';
//       gsap.to(cell, { attr: { rx: 6, ry: 6, 'stroke-width': 2 }, duration: 0.18, ease: 'back.out(2)' });
//     };

//     const leave = () => {
//       restoreFill(cell);
//       cell.style.filter = '';
//       gsap.to(cell, { attr: { rx: 4, ry: 4, 'stroke-width': 1 }, duration: 0.25, ease: 'power2.out' });
//     };

//     const click = () => {
//       const b  = cell.getBBox();
//       const cx = b.x + b.width  / 2;
//       const cy = b.y + b.height / 2;

//       const sorted = cells.map(c => {
//         const cb = c.getBBox();
//         const dx = (cb.x + cb.width  / 2) - cx;
//         const dy = (cb.y + cb.height / 2) - cy;
//         return { c, dist: Math.sqrt(dx * dx + dy * dy) };
//       }).sort((a, b) => a.dist - b.dist);

//       const maxDist = sorted.at(-1)?.dist || 1;

//       sorted.forEach(({ c, dist }) => {
//         const delay  = (dist / maxDist) * 0.65;
//         const origin = dist < 2;
//         const glow   = origin
//           ? 'brightness(2.8) drop-shadow(0 0 12px rgba(192,132,252,1))'
//           : 'brightness(2.0) drop-shadow(0 0 5px rgba(192,132,252,0.75))';

//         setTimeout(() => {
//           c.style.fill        = WAVE_FILL;
//           c.style.fillOpacity = 1;
//           c.style.filter      = glow;
//           gsap.to(c, { attr: { rx: origin ? 8 : 5, ry: origin ? 8 : 5 }, duration: 0.14 });
//           setTimeout(() => {
//             restoreFill(c);
//             c.style.filter = '';
//             gsap.to(c, { attr: { rx: 4, ry: 4 }, duration: 0.45, ease: 'power3.out' });
//           }, 200);
//         }, delay * 1000);
//       });
//     };

//     cell.addEventListener('mouseenter', enter);
//     cell.addEventListener('mouseleave', leave);
//     cell.addEventListener('click',      click);
//     cell._cleanup = () => {
//       cell.removeEventListener('mouseenter', enter);
//       cell.removeEventListener('mouseleave', leave);
//       cell.removeEventListener('click',      click);
//     };
//   });

//   return () => cells.forEach(c => c._cleanup?.());
// }

// // ── Real GitHub stats ─────────────────────────────────────────────────────────
// function useGitHubStats(username) {
//   const [stats, setStats] = useState({ contributions: null, repos: null, streak: null, years: null });
//   useEffect(() => {
//     let cancelled = false;
//     async function fetchAll() {
//       try {
//         const [userRes, contribRes] = await Promise.all([
//           fetch(`https://api.github.com/users/${username}`),
//           fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`),
//         ]);
//         const userData    = await userRes.json();
//         const contribData = await contribRes.json();
//         const repos  = userData.public_repos ?? null;
//         const years  = userData.created_at
//           ? new Date().getFullYear() - new Date(userData.created_at).getFullYear() : null;
//         const totalContribs = contribData?.total
//           ? Object.values(contribData.total).reduce((a, b) => a + b, 0) : null;
//         let streak = 0;
//         if (contribData?.contributions) {
//           const sorted = [...contribData.contributions].sort(
//             (a, b) => new Date(b.date) - new Date(a.date)
//           );
//           for (const day of sorted) { if (day.count > 0) streak++; else break; }
//         }
//         if (!cancelled) setStats({ contributions: totalContribs, repos, streak: streak || null, years });
//       } catch (e) { console.warn('GitHub stats:', e); }
//     }
//     fetchAll();
//     return () => { cancelled = true; };
//   }, [username]);
//   return stats;
// }

// // ─────────────────────────────────────────────────────────────────────────────
// export default function ContributionMap() {
//   const calendarRef = useRef(null);
//   const teardownRef = useRef(null);
//   const { colorMode } = useColorMode();
//   const isDark = colorMode === 'dark';

//   const [sectionRef, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
//   const stats = useGitHubStats(USERNAME);

//   // Semantic colours from theme
//   const cardBg       = useColorModeValue('rgba(247,247,248,0.92)', 'rgba(10,10,10,0.82)');
//   const cardBorder   = useColorModeValue('rgba(0,0,0,0.08)',       'rgba(255,255,255,0.06)');
//   const eyebrowColor = useColorModeValue('gray.500',               'whiteAlpha.400');
//   const labelColor   = useColorModeValue('gray.400',               'whiteAlpha.200');
//   const cellStroke   = useColorModeValue('rgba(0,0,0,0.08)',       'rgba(255,255,255,0.07)');
//   const svgTextFill  = useColorModeValue('rgba(0,0,0,0.35)',       'rgba(255,255,255,0.28)');
//   const legendBorder = useColorModeValue('rgba(0,0,0,0.06)',       'rgba(255,255,255,0.04)');
//   const hairline     = useColorModeValue(
//     'linear-gradient(to right, transparent, rgba(124,58,237,0.2), transparent)',
//     'linear-gradient(to right, transparent, rgba(124,58,237,0.35), transparent)'
//   );
//   const cornerBorder = useColorModeValue('rgba(124,58,237,0.15)', 'rgba(124,58,237,0.25)');
//   const legendSquareBorder = useColorModeValue('rgba(0,0,0,0.08)', 'rgba(255,255,255,0.07)');

//   const calTheme = {
//     dark: [
//       isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)',
//       'rgba(124,58,237,0.28)',
//       'rgba(124,58,237,0.50)',
//       'rgba(124,58,237,0.72)',
//       'rgba(124,58,237,0.95)',
//     ],
//   };

//   // Wait for SVG rects via MutationObserver, re-run when theme flips
//   useEffect(() => {
//     if (!calendarRef.current) return;
//     const trySetup = () => {
//       const cells = calendarRef.current?.querySelectorAll('rect[data-level]');
//       if (!cells?.length) return false;
//       teardownRef.current?.();
//       teardownRef.current = setupCalendar(calendarRef.current, isDark);
//       return true;
//     };
//     if (trySetup()) return;
//     const observer = new MutationObserver(() => { if (trySetup()) observer.disconnect(); });
//     observer.observe(calendarRef.current, { childList: true, subtree: true });
//     return () => { observer.disconnect(); teardownRef.current?.(); };
//   }, [isDark]);

//   return (
//     <Box
//       ref={sectionRef}
//       position="relative"
//       py={{ base: 4, md: 6 }}
//       maxW="1100px" mx="auto"
//       bg="transparent"
//     >
//       {/* ── Header ─────────────────────────────────────────────────── */}
//       <motion.div
//         initial={{ opacity: 0, y: 24 }}
//         animate={inView ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.55 }}
//       >
//         <HStack spacing={3} mb={3}>
//           <Box w="24px" h="1px"
//             style={{ background: 'linear-gradient(to right, #ec4899, #7c3aed)' }} />
//           <Text fontFamily='Orbitron' fontSize="9px" letterSpacing="0.3em"
//             textTransform="uppercase" color={eyebrowColor}>
//             Activity
//           </Text>
//         </HStack>

//         <Text fontFamily='Orbitron' fontWeight="900" fontSize={{ base: '26px', md: '40px' }}
//           letterSpacing="-0.02em"
//           lineHeight={1.05} bgGradient="linear(to-r, #7c3aed, #ec4899)"
//             bgClip="text" display="inline-block" width="fit-content"
//           >
//           GitHub
//         </Text>

//         <Text fontFamily='Orbitron' fontWeight="900" fontSize={{ base: '26px', md: '40px' }} 
//           letterSpacing="-0.02em" lineHeight={1.05} 
//           color="text.subdued" mb={10}>
//           Contributions
//         </Text>
//       </motion.div>

//       {/* ── Stats ──────────────────────────────────────────────────── */}
//       <motion.div
//         initial={{ opacity: 0, y: 18 }}
//         animate={inView ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.5, delay: 0.15 }}
//       >
//         <Flex gap={3} mb={8} flexWrap="wrap">
//           <StatCard value={stats.contributions} label="Contributions" sub="this year"
//             color='#14b8a6'    trigger={inView} icon={<GitCommitHorizontal size={13} />} />
//           <StatCard value={stats.repos}         label="Repositories"  sub="public"
//             color="#a855f7" trigger={inView} icon={<BookMarked size={13} />} />
//           <StatCard value={stats.streak}        label="Streak"        sub="days"
//             color="#3b82f6" trigger={inView} icon={<Flame size={13} />} />
//           <StatCard value={stats.years} suffix="+" label="Years"      sub="on GitHub"
//             color="#ec4899" trigger={inView} icon={<CalendarDays size={13} />} />
//         </Flex>
//       </motion.div>

//       {/* ── Calendar card ──────────────────────────────────────────── */}
//       <motion.div
//         initial={{ opacity: 0, y: 32 }}
//         animate={inView ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.65, delay: 0.28 }}
//       >
//         <Box position="relative" borderRadius="20px" overflow="hidden"
//           border="1px solid" borderColor={cardBorder}
//           bg={cardBg} backdropFilter="blur(10px)"
//           p={{ base: 5, md: 8, lg: 10 }}>

//           {/* Ambient glow — static, no mouse tracking */}
//           <Box position="absolute" inset={0} pointerEvents="none" zIndex={0}
//             background="radial-gradient(ellipse 80% 60% at 50% 110%, rgba(124,58,237,0.07), transparent)" />

//           {/* Top hairline */}
//           <Box position="absolute" top={0} left="8%" right="8%" h="1px"
//             background={hairline} />

//           {/* Corner accents */}
//           {[
//             { top: '14px',    left: '14px',  borderRight: 'none', borderBottom: 'none' },
//             { top: '14px',    right: '14px', borderLeft:  'none', borderBottom: 'none' },
//             { bottom: '14px', left: '14px',  borderRight: 'none', borderTop:    'none' },
//             { bottom: '14px', right: '14px', borderLeft:  'none', borderTop:    'none' },
//           ].map((s, i) => (
//             <Box key={i} position="absolute" w="14px" h="14px"
//               border="1px solid" borderColor={cornerBorder} borderRadius="2px" {...s} />
//           ))}

//           {/* Calendar */}
//           <Box ref={calendarRef} position="relative" zIndex={1}
//             overflowX="auto" display="flex" justifyContent="center"
//             sx={{
//               '& rect[data-level]': {
//                 rx: '4px', ry: '4px',
//                 strokeWidth: '1px',
//                 stroke: cellStroke,
//                 cursor: 'pointer',
//                 transformOrigin: 'center center',
//                 transformBox: 'fill-box',
//               },
//               'svg text': {
//                 fill: `${svgTextFill} !important`,
//                 fontFamily: 'JetBrains Mono',
//                 fontSize: '11px',
//               },
//               'svg': { maxWidth: '100%', height: 'auto' },
//               scrollbarWidth: 'none',
//               '&::-webkit-scrollbar': { display: 'none' },
//             }}
//           >
//             <GitHubCalendar
//               username={USERNAME}
//               blockSize={16}
//               blockMargin={5}
//               fontSize={13}
//               theme={calTheme}
//               fontFamily="JetBrains Mono"
//               colorScheme="dark"
//               labels={{
//                 months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
//                 weekdays: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
//                 totalCount: '{{count}} contributions in {{year}}',
//                 legend: { less: 'Less', more: 'More' },
//               }}
//             />
//           </Box>

//           {/* Legend */}
//           <Flex mt={6} pt={4} justify="space-between" align="center"
//             borderTop="1px solid" borderColor={legendBorder}
//             position="relative" zIndex={1}>
//             <Text fontFamily='JetBrains Mono' fontSize="10px" color={labelColor}>
//               {USERNAME}
//             </Text>
//             <HStack spacing={1.5} align="center">
//               <Text fontFamily='Orbitron' fontSize="7px" letterSpacing="0.12em"
//                 textTransform="uppercase" color={labelColor} mr={1}>Less</Text>
//               {[0.28, 0.50, 0.72, 0.95].map((o, i) => (
//                 <Box key={i} w="10px" h="10px" borderRadius="3px"
//                   style={{ background: '#7c3aed', opacity: o }}
//                   border="1px solid" borderColor={legendSquareBorder} />
//               ))}
//               <Text fontFamily='Orbitron' fontSize="7px" letterSpacing="0.12em"
//                 textTransform="uppercase" color={labelColor} ml={1}>More</Text>
//             </HStack>
//           </Flex>

//         </Box>
//       </motion.div>
//     </Box>
//   );
// }

import { useRef, useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { Box, Text, HStack, Flex, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { GitCommitHorizontal, BookMarked, Flame, CalendarDays } from 'lucide-react';
import { motion, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';

const USERNAME = 'anandita-3217';

// ── Count-up ──────────────────────────────────────────────────────────────────
function CountUp({ to, trigger }) {
  const [v, setV] = useState(0);
  const isNum = to !== null && to !== undefined && !isNaN(parseInt(to));
  useEffect(() => {
    if (!trigger || !isNum) return;
    const c = animate(0, parseInt(to), {
      duration: 1.8, ease: [0.16, 1, 0.3, 1],
      onUpdate: n => setV(Math.floor(n)),
    });
    return () => c.stop();
  }, [trigger, to, isNum]);
  if (!isNum) return <>{to ?? '–'}</>;
  return <>{v}</>;
}

// ── Stat card ─────────────────────────────────────────────────────────────────
const StatCard = ({ value, suffix = '', label, sub, color, trigger, icon }) => {
  const [hov, setHov] = useState(false);
  const cardBg     = useColorModeValue('rgba(247,247,248,0.92)', 'rgba(10,10,10,0.82)');
  const cardBgHov  = useColorModeValue('#ffffff',                `${color}0a`);
  const borderBase = useColorModeValue('rgba(0,0,0,0.08)',       'rgba(255,255,255,0.06)');
  const subColor   = useColorModeValue('gray.500',               'whiteAlpha.300');
  const labelColor = useColorModeValue('gray.400',               'whiteAlpha.350');

  return (
    <Box flex={1} minW="110px" px={5} py={5} borderRadius="14px"
      bg={hov ? cardBgHov : cardBg}
      border="1px solid" borderColor={hov ? `${color}55` : borderBase}
      backdropFilter="blur(10px)" transition="all 0.35s" cursor="default"
      position="relative" overflow="hidden"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <Box position="absolute" inset={0} pointerEvents="none"
        background={`radial-gradient(circle at 50% 0%, ${color}18, transparent 70%)`}
        opacity={hov ? 1 : 0} transition="opacity 0.4s" />
      <Box position="absolute" top={0} left="15%" right="15%" h="1px"
        bg={color} opacity={hov ? 0.55 : 0.15} transition="opacity 0.3s" />
      <HStack spacing={1.5} mb={2} align="center" justify="flex-end">
        <Text fontFamily='Orbitron' fontSize="9px" letterSpacing="0.22em"
          textTransform="uppercase" color={labelColor}>{label}</Text>
        <Box color={labelColor}>{icon}</Box>
      </HStack>
      <Text fontFamily='Orbitron' fontWeight="900" lineHeight={1} mb={1}
        fontSize={{ base: '24px', md: '30px' }} textAlign="right"
        display="inline-block" w="100%"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}88)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {value === null
          ? <Box as="span" fontSize="14px" opacity={0.4}>…</Box>
          : <><CountUp to={value} trigger={trigger} />{suffix}</>
        }
      </Text>
      {sub && <Text fontFamily='Sora' fontSize="11px" color={subColor}
        mt={1} textAlign="right">{sub}</Text>}
    </Box>
  );
};

// ── Calendar cell setup ───────────────────────────────────────────────────────
function setupCalendar(calendarEl, isDark) {
  const cells = Array.from(calendarEl.querySelectorAll('rect[data-level]'));
  if (!cells.length) return null;

  const emptyFill = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)';
  const BASE_FILL = '#7c3aed';
  const WAVE_FILL = '#c084fc';
  const opacityMap = { '0': 0, '1': 0.28, '2': 0.50, '3': 0.72, '4': 0.95 };

  // Apply base fills
  cells.forEach(cell => {
    const level = cell.getAttribute('data-level') ?? '0';
    const op    = opacityMap[level] ?? 0;
    if (level === '0') {
      cell.style.fill        = emptyFill;
      cell.style.fillOpacity = '1';
    } else {
      cell.style.fill        = BASE_FILL;
      cell.style.fillOpacity = String(op);
    }
    cell.style.cursor   = 'pointer';
    cell.dataset.baseOp = String(op);
    cell.dataset.level  = level;
  });

  const restoreFill = c => {
    const empty = (c.dataset.level ?? '0') === '0';
    c.style.fill        = empty ? emptyFill : BASE_FILL;
    c.style.fillOpacity = empty ? '1' : (c.dataset.baseOp ?? '0');
  };

  // Track active wave timeouts so overlapping clicks can be cancelled
  const activeTimeouts = new Set();

  cells.forEach(cell => {
    const baseOp  = () => parseFloat(cell.dataset.baseOp ?? 0);
    const isEmpty = () => (cell.dataset.level ?? '0') === '0';

    const enter = () => {
      cell.style.fill        = BASE_FILL;
      cell.style.fillOpacity = String(Math.min(1, baseOp() + (isEmpty() ? 0.15 : 0.28)));
      cell.style.filter      = 'brightness(1.8) drop-shadow(0 0 6px rgba(192,132,252,0.85))';
      gsap.to(cell, { attr: { rx: 6, ry: 6 }, duration: 0.18, ease: 'back.out(2)' });
    };

    const leave = () => {
      restoreFill(cell);
      cell.style.filter = '';
      gsap.to(cell, { attr: { rx: 4, ry: 4 }, duration: 0.25, ease: 'power2.out' });
    };

    const click = () => {
      // Cancel any in-flight wave timeouts first
      activeTimeouts.forEach(id => clearTimeout(id));
      activeTimeouts.clear();

      const b  = cell.getBBox();
      const cx = b.x + b.width  / 2;
      const cy = b.y + b.height / 2;

      const sorted = cells.map(c => {
        const cb = c.getBBox();
        const dx = (cb.x + cb.width  / 2) - cx;
        const dy = (cb.y + cb.height / 2) - cy;
        return { c, dist: Math.sqrt(dx * dx + dy * dy) };
      }).sort((a, b) => a.dist - b.dist);

      const maxDist = sorted.at(-1)?.dist || 1;
      // Total wave travel time: 600ms. Each cell flashes for 350ms then restores.
      // Restore starts at (delayMs + 350) so it always trails the flash.
      const WAVE_DURATION = 600;
      const FLASH_HOLD    = 350;

      sorted.forEach(({ c, dist }) => {
        const delayMs = (dist / maxDist) * WAVE_DURATION;
        const origin  = dist < 2;

        const glow = origin
          ? 'brightness(2.8) drop-shadow(0 0 12px rgba(192,132,252,1))'
          : 'brightness(2.0) drop-shadow(0 0 5px rgba(192,132,252,0.75))';

        // Flash in
        const t1 = setTimeout(() => {
          c.style.fill        = WAVE_FILL;
          c.style.fillOpacity = '1';
          c.style.filter      = glow;
          gsap.to(c, { attr: { rx: origin ? 8 : 5, ry: origin ? 8 : 5 }, duration: 0.14 });
          activeTimeouts.delete(t1);
        }, delayMs);
        activeTimeouts.add(t1);

        // Restore after flash hold — always fires AFTER the flash-in
        const t2 = setTimeout(() => {
          restoreFill(c);
          c.style.filter = '';
          gsap.to(c, { attr: { rx: 4, ry: 4 }, duration: 0.45, ease: 'power3.out' });
          activeTimeouts.delete(t2);
        }, delayMs + FLASH_HOLD);
        activeTimeouts.add(t2);
      });
    };

    cell.addEventListener('mouseenter', enter);
    cell.addEventListener('mouseleave', leave);
    cell.addEventListener('click',      click);
    cell._cleanup = () => {
      cell.removeEventListener('mouseenter', enter);
      cell.removeEventListener('mouseleave', leave);
      cell.removeEventListener('click',      click);
    };
  });

  return () => cells.forEach(c => c._cleanup?.());
}

// ── GitHub stats hook ─────────────────────────────────────────────────────────
function useGitHubStats(username) {
  const [stats, setStats] = useState({ contributions: null, repos: null, streak: null, years: null });
  useEffect(() => {
    let cancelled = false;
    async function fetchAll() {
      try {
        const [userRes, contribRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`),
        ]);
        const userData    = await userRes.json();
        const contribData = await contribRes.json();
        const repos  = userData.public_repos ?? null;
        const years  = userData.created_at
          ? new Date().getFullYear() - new Date(userData.created_at).getFullYear() : null;
        const totalContribs = contribData?.total
          ? Object.values(contribData.total).reduce((a, b) => a + b, 0) : null;
        let streak = 0;
        if (contribData?.contributions) {
          const sorted = [...contribData.contributions].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          for (const day of sorted) { if (day.count > 0) streak++; else break; }
        }
        if (!cancelled) setStats({ contributions: totalContribs, repos, streak: streak || null, years });
      } catch (e) { console.warn('GitHub stats:', e); }
    }
    fetchAll();
    return () => { cancelled = true; };
  }, [username]);
  return stats;
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ContributionMap() {
  const calendarRef = useRef(null);
  const teardownRef = useRef(null);
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const [sectionRef, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const stats = useGitHubStats(USERNAME);

  const cardBg       = useColorModeValue('rgba(247,247,248,0.92)', 'rgba(10,10,10,0.82)');
  const cardBorder   = useColorModeValue('rgba(0,0,0,0.08)',       'rgba(255,255,255,0.06)');
  const eyebrowColor = useColorModeValue('gray.500',               'whiteAlpha.400');
  const labelColor   = useColorModeValue('gray.400',               'whiteAlpha.200');
  const cellStroke   = useColorModeValue('rgba(0,0,0,0.08)',       'rgba(255,255,255,0.07)');
  const svgTextFill  = useColorModeValue('rgba(0,0,0,0.35)',       'rgba(255,255,255,0.28)');
  const legendBorder = useColorModeValue('rgba(0,0,0,0.06)',       'rgba(255,255,255,0.04)');
  const hairline     = useColorModeValue(
    'linear-gradient(to right, transparent, rgba(124,58,237,0.2), transparent)',
    'linear-gradient(to right, transparent, rgba(124,58,237,0.35), transparent)'
  );
  const cornerBorder       = useColorModeValue('rgba(124,58,237,0.15)', 'rgba(124,58,237,0.25)');
  const legendSquareBorder = useColorModeValue('rgba(0,0,0,0.08)',      'rgba(255,255,255,0.07)');

  const calTheme = {
    dark: [
      isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)',
      'rgba(124,58,237,0.28)',
      'rgba(124,58,237,0.50)',
      'rgba(124,58,237,0.72)',
      'rgba(124,58,237,0.95)',
    ],
  };

  useEffect(() => {
    if (!calendarRef.current) return;

    const trySetup = () => {
      const cells = calendarRef.current?.querySelectorAll('rect[data-level]');
      if (!cells?.length) return false;
      teardownRef.current?.();
      teardownRef.current = setupCalendar(calendarRef.current, isDark);
      return true;
    };

    // Keep the observer alive continuously — react-github-calendar re-renders
    // the SVG internally which would wipe attached event listeners without this.
    const observer = new MutationObserver(() => { trySetup(); });
    observer.observe(calendarRef.current, { childList: true, subtree: true });
    trySetup(); // also attempt immediately in case cells already exist

    return () => {
      observer.disconnect();
      teardownRef.current?.();
    };
  }, [isDark]);

  return (
    <Box
      ref={sectionRef}
      position="relative"
      py={{ base: 4, md: 6 }}
      maxW="1100px" mx="auto"
      bg="transparent"
    >
      {/* ── Header ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
      >
        <HStack spacing={3} mb={3}>
          <Box w="24px" h="1px"
            style={{ background: 'linear-gradient(to right, #ec4899, #7c3aed)' }} />
          <Text fontFamily='Orbitron' fontSize="9px" letterSpacing="0.3em"
            textTransform="uppercase" color={eyebrowColor}>
            Activity
          </Text>
        </HStack>
        <Text fontFamily='Orbitron' fontWeight="900" fontSize={{ base: '26px', md: '40px' }}
          letterSpacing="-0.02em" lineHeight={1.05}
          bgGradient="linear(to-r, #7c3aed, #ec4899)"
          bgClip="text" display="inline-block" width="fit-content">
          GitHub
        </Text>
        <Text fontFamily='Orbitron' fontWeight="900" fontSize={{ base: '26px', md: '40px' }}
          letterSpacing="-0.02em" lineHeight={1.05}
          color="text.subdued" mb={10}>
          Contributions
        </Text>
      </motion.div>

      {/* ── Stats ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <Flex gap={3} mb={8} flexWrap="wrap">
          <StatCard value={stats.contributions} label="Contributions" sub="this year"
            color='#14b8a6'    trigger={inView} icon={<GitCommitHorizontal size={13} />} />
          <StatCard value={stats.repos}         label="Repositories"  sub="public"
            color="#a855f7" trigger={inView} icon={<BookMarked size={13} />} />
          <StatCard value={stats.streak}        label="Streak"        sub="days"
            color="#3b82f6" trigger={inView} icon={<Flame size={13} />} />
          <StatCard value={stats.years} suffix="+" label="Years"      sub="on GitHub"
            color="#ec4899" trigger={inView} icon={<CalendarDays size={13} />} />
        </Flex>
      </motion.div>

      {/* ── Calendar card ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.28 }}
      >
        <Box position="relative" borderRadius="20px" overflow="hidden"
          border="1px solid" borderColor={cardBorder}
          bg={cardBg} backdropFilter="blur(10px)"
          p={{ base: 5, md: 8, lg: 10 }}>

          <Box position="absolute" inset={0} pointerEvents="none" zIndex={0}
            background="radial-gradient(ellipse 80% 60% at 50% 110%, rgba(124,58,237,0.07), transparent)" />

          <Box position="absolute" top={0} left="8%" right="8%" h="1px"
            background={hairline} />

          {[
            { top: '14px',    left: '14px',  borderRight: 'none', borderBottom: 'none' },
            { top: '14px',    right: '14px', borderLeft:  'none', borderBottom: 'none' },
            { bottom: '14px', left: '14px',  borderRight: 'none', borderTop:    'none' },
            { bottom: '14px', right: '14px', borderLeft:  'none', borderTop:    'none' },
          ].map((s, i) => (
            <Box key={i} position="absolute" w="14px" h="14px"
              border="1px solid" borderColor={cornerBorder} borderRadius="2px" {...s} />
          ))}

          <Box ref={calendarRef} position="relative" zIndex={1}
            fontFamily="Sora"
            overflowX="auto" display="flex" justifyContent="center"
            sx={{
              '& rect[data-level]': {
                rx: '4px', ry: '4px',
                strokeWidth: '1px', stroke: cellStroke,
                cursor: 'pointer',
                transformOrigin: 'center center',
                transformBox: 'fill-box',
              },
              'svg text': {
                fill: `${svgTextFill} !important`,
                fontFamily: 'JetBrains Mono',
                fontSize: '11px',
              },
              'svg': { maxWidth: '100%', height: 'auto' },
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            <GitHubCalendar
              username={USERNAME}
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
            />
          </Box>

          <Flex mt={6} pt={4} justify="space-between" align="center"
            borderTop="1px solid" borderColor={legendBorder}
            position="relative" zIndex={1}>
            <Text fontFamily='JetBrains Mono' fontSize="10px" color={labelColor}>
              {USERNAME}
            </Text>
            <HStack spacing={1.5} align="center">
              <Text fontFamily='Orbitron' fontSize="7px" letterSpacing="0.12em"
                textTransform="uppercase" color={labelColor} mr={1}>Less</Text>
              {[0.28, 0.50, 0.72, 0.95].map((o, i) => (
                <Box key={i} w="10px" h="10px" borderRadius="3px"
                  style={{ background: '#7c3aed', opacity: o }}
                  border="1px solid" borderColor={legendSquareBorder} />
              ))}
              <Text fontFamily='Orbitron' fontSize="7px" letterSpacing="0.12em"
                textTransform="uppercase" color={labelColor} ml={1}>More</Text>
            </HStack>
          </Flex>

        </Box>
      </motion.div>
    </Box>
  );
}