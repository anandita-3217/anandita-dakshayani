import { useRef, useEffect, useState, useCallback } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { Box, Text, HStack, Flex } from '@chakra-ui/react';
import { GitCommitHorizontal, BookMarked, Flame, CalendarDays } from 'lucide-react';
import { motion, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';

const USERNAME = 'anandita-3217';
const H    = 'Orbitron, sans-serif';
const B    = 'Sora, sans-serif';
const MONO = "'JetBrains Mono', monospace";
const TEAL = '#14b8a6';
const GRAD = 'linear-gradient(135deg, #1e40af, #7c3aed, #ec4899)';

// ── Level → fill-opacity mapping ─────────────────────────────────────────────
const LEVEL_OPACITY = { '0': 0.07, '1': 0.32, '2': 0.54, '3': 0.75, '4': 0.95 };

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
  return (
    <Box flex={1} minW="110px" px={5} py={5} borderRadius="14px"
      bg={hov ? `${color}0a` : 'rgba(255,255,255,0.025)'}
      border="1px solid"
      borderColor={hov ? `${color}40` : 'rgba(255,255,255,0.06)'}
      backdropFilter="blur(10px)"
      transition="all 0.35s" cursor="default"
      position="relative" overflow="hidden"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <Box position="absolute" inset={0} pointerEvents="none"
        background={`radial-gradient(circle at 50% 0%, ${color}18, transparent 70%)`}
        opacity={hov ? 1 : 0} transition="opacity 0.4s" />
      <Box position="absolute" top={0} left="15%" right="15%" h="1px"
        bg={color} opacity={hov ? 0.55 : 0.15} transition="opacity 0.3s" />
      <HStack spacing={1.5} mb={2} align="center" justify="flex-end">
        <Text fontFamily={H} fontSize="9px" letterSpacing="0.22em"
          textTransform="uppercase" color="whiteAlpha.350">{label}</Text>
        <Box color="whiteAlpha.350">{icon}</Box>
      </HStack>
      <Text fontFamily={H} fontWeight="900" lineHeight={1} mb={1}
        fontSize={{ base: '24px', md: '30px' }} textAlign="right"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}66)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {value === null
          ? <Box as="span" fontSize="14px" opacity={0.4}>…</Box>
          : <><CountUp to={value} trigger={trigger} />{suffix}</>
        }
      </Text>
      {sub && <Text fontFamily={B} fontSize="11px" color="whiteAlpha.300"
        mt={1} textAlign="right">{sub}</Text>}
    </Box>
  );
};

// ── Inject SVG gradient + GSAP interactions ───────────────────────────────────
function setupCalendar(calendarEl, glowEl) {
  const svg   = calendarEl.querySelector('svg');
  const cells = Array.from(calendarEl.querySelectorAll('rect[data-level]'));
  if (!svg || !cells.length) return null;

  // ── 1. Build time-spanning gradient in <defs> ─────────────────────────────
  // react-github-calendar sets fill via inline style — we MUST override
  // cell.style.fill (not setAttribute) or it gets clobbered.
  // We use a <linearGradient> with userSpaceOnUse + real viewBox coords so
  // the gradient spans the full calendar: leftmost col = blue, right = pink.
  let defs = svg.querySelector('defs');
  if (!defs) {
    defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    svg.prepend(defs);
  }
  ['cm-base-grad', 'cm-wave-grad'].forEach(id => defs.querySelector(`#${id}`)?.remove());

  // Read actual rendered SVG width from viewBox or fallback to getBBox
  const vbRaw = svg.getAttribute('viewBox');
  let x1 = 0, x2 = 800;
  if (vbRaw) {
    const parts = vbRaw.trim().split(/\s+/).map(Number);
    x1 = parts[0] ?? 0;
    x2 = x1 + (parts[2] ?? 800);
  } else {
    // No viewBox — use actual pixel width
    x2 = svg.getBoundingClientRect().width || 800;
  }

  const makeGrad = (id, colorStops) => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    g.setAttribute('id', id);
    g.setAttribute('gradientUnits', 'userSpaceOnUse');
    g.setAttribute('x1', x1); g.setAttribute('y1', '0');
    g.setAttribute('x2', x2); g.setAttribute('y2', '0');
    colorStops.forEach(([off, col]) => {
      const s = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      s.setAttribute('offset', off);
      s.setAttribute('stop-color', col);
      g.appendChild(s);
    });
    defs.appendChild(g);
    return `url(#${id})`;
  };

  const BASE_FILL = makeGrad('cm-base-grad', [
    ['0%',   '#1e40af'],
    ['50%',  '#7c3aed'],
    ['100%', '#ec4899'],
  ]);
  const WAVE_FILL = makeGrad('cm-wave-grad', [
    ['0%',   '#60a5fa'],
    ['50%',  '#c084fc'],
    ['100%', '#f472b6'],
  ]);

  // ── 2. Apply fill + opacity to every cell ────────────────────────────────
  // IMPORTANT: override style.fill not setAttribute — react sets fill inline
  const opacityMap = { '0': 0.07, '1': 0.30, '2': 0.52, '3': 0.74, '4': 0.96 };

  cells.forEach(cell => {
    const level = cell.getAttribute('data-level') ?? '0';
    const op    = opacityMap[level] ?? 0.07;

    cell.style.fill        = BASE_FILL;
    cell.style.fillOpacity = op;
    cell.style.cursor      = 'pointer';
    // Store on dataset so it survives across closures safely
    cell.dataset.baseOp    = op;
  });

  // ── 3. Interactions ──────────────────────────────────────────────────────
  cells.forEach(cell => {
    const baseOp = () => parseFloat(cell.dataset.baseOp ?? 0.07);

    const enter = () => {
      cell.style.fill        = BASE_FILL;
      cell.style.fillOpacity = Math.min(1, baseOp() + 0.28);
      cell.style.filter      = 'brightness(1.8) drop-shadow(0 0 6px rgba(192,132,252,0.9))';
      gsap.to(cell, { attr: { rx: 6, ry: 6, 'stroke-width': 2 }, duration: 0.2, ease: 'back.out(2)' });
    };

    const leave = () => {
      cell.style.fill        = BASE_FILL;
      cell.style.fillOpacity = baseOp();
      cell.style.filter      = '';
      gsap.to(cell, { attr: { rx: 4, ry: 4, 'stroke-width': 1 }, duration: 0.28, ease: 'power2.out' });
    };

    const click = () => {
      const b  = cell.getBBox();
      const cx = b.x + b.width  / 2;
      const cy = b.y + b.height / 2;

      // Sort all cells by Euclidean distance from clicked cell
      const sorted = cells.map(c => {
        const cb = c.getBBox();
        const dx = (cb.x + cb.width  / 2) - cx;
        const dy = (cb.y + cb.height / 2) - cy;
        return { c, dist: Math.sqrt(dx * dx + dy * dy) };
      }).sort((a, b) => a.dist - b.dist);

      const maxDist = sorted.at(-1)?.dist || 1;

      sorted.forEach(({ c, dist }) => {
        const delay    = (dist / maxDist) * 0.7;
        const origin   = dist < 2;
        const glow     = origin
          ? 'brightness(2.8) drop-shadow(0 0 12px rgba(192,132,252,1))'
          : 'brightness(2.0) drop-shadow(0 0 6px rgba(192,132,252,0.8))';

        setTimeout(() => {
          c.style.fill        = WAVE_FILL;
          c.style.fillOpacity = 1;
          c.style.filter      = glow;
          gsap.to(c, { attr: { rx: origin ? 8 : 5, ry: origin ? 8 : 5 }, duration: 0.15 });

          setTimeout(() => {
            c.style.fill        = BASE_FILL;
            c.style.fillOpacity = parseFloat(c.dataset.baseOp ?? 0.07);
            c.style.filter      = '';
            gsap.to(c, { attr: { rx: 4, ry: 4 }, duration: 0.45, ease: 'power3.out' });
          }, 200);
        }, delay * 1000);
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

  // ── 4. Mouse-follow glow ─────────────────────────────────────────────────
  const onMove = e => {
    if (!glowEl) return;
    const r = calendarEl.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width)  * 100;
    const py = ((e.clientY - r.top)  / r.height) * 100;
    gsap.to(glowEl, {
      background: `radial-gradient(500px circle at ${px}% ${py}%, rgba(124,58,237,0.13), transparent 60%)`,
      duration: 0.3, ease: 'power1.out',
    });
  };
  const onContainerLeave = () => gsap.to(glowEl, {
    background: 'radial-gradient(500px circle at 50% 50%, rgba(20,184,166,0.04), transparent 60%)',
    duration: 0.8,
  });

  calendarEl.addEventListener('mousemove', onMove);
  calendarEl.addEventListener('mouseleave', onContainerLeave);

  return () => {
    cells.forEach(c => c._cleanup?.());
    calendarEl.removeEventListener('mousemove', onMove);
    calendarEl.removeEventListener('mouseleave', onContainerLeave);
  };
}

// ── Real GitHub stats via REST API ────────────────────────────────────────────
function useGitHubStats(username) {
  const [stats, setStats] = useState({
    contributions: null, repos: null, streak: null, years: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      try {
        // User info — repos + account age
        const userRes  = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userRes.json();
        const repos    = userData.public_repos ?? null;
        const years    = userData.created_at
          ? new Date().getFullYear() - new Date(userData.created_at).getFullYear()
          : null;

        // Contribution data (same source react-github-calendar uses)
        const contribRes  = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
        );
        const contribData = await contribRes.json();

        // Total contributions this year
        const totalContribs = contribData?.total
          ? Object.values(contribData.total).reduce((a, b) => a + b, 0)
          : null;

        // Current streak — walk backwards from today
        let streak = 0;
        if (contribData?.contributions) {
          const sorted = [...contribData.contributions].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          for (const day of sorted) {
            if (day.count > 0) streak++;
            else break;
          }
        }

        if (!cancelled) {
          setStats({
            contributions: totalContribs,
            repos,
            streak: streak || null,
            years,
          });
        }
      } catch (err) {
        console.warn('GitHub stats fetch failed:', err);
      }
    }

    fetchAll();
    return () => { cancelled = true; };
  }, [username]);

  return stats;
}

// ─────────────────────────────────────────────────────────────────────────────
export default function ContributionMap() {
  const calendarRef = useRef(null);
  const glowRef     = useRef(null);
  const teardownRef = useRef(null);

  const [sectionRef, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const stats = useGitHubStats(USERNAME);

  // MutationObserver: watches calendarRef for SVG rects being added to DOM
  // This is more reliable than onRender which fires before paint
  useEffect(() => {
    if (!calendarRef.current) return;

    const trySetup = () => {
      const cells = calendarRef.current?.querySelectorAll('rect[data-level]');
      if (!cells?.length) return false;

      // Teardown previous if any
      teardownRef.current?.();
      teardownRef.current = setupCalendar(calendarRef.current, glowRef.current);
      return true;
    };

    // Try immediately (calendar may already be rendered)
    if (trySetup()) return;

    // Otherwise observe DOM mutations until rects appear
    const observer = new MutationObserver(() => {
      if (trySetup()) observer.disconnect();
    });
    observer.observe(calendarRef.current, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      teardownRef.current?.();
    };
  }, []);

  const calTheme = {
    dark: [
      'rgba(255,255,255,0.04)',   // level 0 — overridden by JS but needed as fallback
      'rgba(30,64,175,0.35)',     // level 1
      'rgba(124,58,237,0.55)',    // level 2
      'rgba(124,58,237,0.75)',    // level 3
      'rgba(236,72,153,0.95)',    // level 4
    ],
  };

  return (
    <Box
      ref={sectionRef}
      position="relative"
      py={{ base: 4, md: 6 }}
      maxW="900px" mx="auto"
      bg="rgba(10,10,10,0.82)"
      backdropFilter="blur(10px)"
    >

      {/* ── Header — left aligned ───────────────────────────────────── */}
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
        <Flex gap={3} mb={8} flexWrap="wrap">
          <StatCard
            value={stats.contributions} suffix=""
            label="Contributions" sub="this year"
            color={TEAL} trigger={inView}
            icon={<GitCommitHorizontal size={13} />}
          />
          <StatCard
            value={stats.repos} suffix=""
            label="Repositories" sub="public"
            color="#a855f7" trigger={inView}
            icon={<BookMarked size={13} />}
          />
          <StatCard
            value={stats.streak} suffix=""
            label="Streak" sub="days"
            color="#3b82f6" trigger={inView}
            icon={<Flame size={13} />}
          />
          <StatCard
            value={stats.years} suffix="+"
            label="Years" sub="on GitHub"
            color="#ec4899" trigger={inView}
            icon={<CalendarDays size={13} />}
          />
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
          bg="rgba(255,255,255,0.03)" backdropFilter="blur(10px)"
          p={{ base: 5, md: 8, lg: 10 }}>

          {/* Static ambient glow */}
          <Box position="absolute" inset={0} pointerEvents="none" zIndex={0}
            background="radial-gradient(ellipse 80% 60% at 50% 110%, rgba(124,58,237,0.08), transparent)" />

          {/* Mouse-follow glow */}
          <Box ref={glowRef} position="absolute" inset={0} pointerEvents="none" zIndex={0}
            background="radial-gradient(500px circle at 50% 50%, rgba(20,184,166,0.04), transparent 60%)" />

          {/* Top hairline */}
          <Box position="absolute" top={0} left="8%" right="8%" h="1px"
            background="linear-gradient(to right, transparent, rgba(124,58,237,0.35), transparent)" />

          {/* Corner accents */}
          {[
            { top: '14px', left: '14px', borderRight: 'none', borderBottom: 'none' },
            { top: '14px', right: '14px', borderLeft: 'none', borderBottom: 'none' },
            { bottom: '14px', left: '14px', borderRight: 'none', borderTop: 'none' },
            { bottom: '14px', right: '14px', borderLeft: 'none', borderTop: 'none' },
          ].map((s, i) => (
            <Box key={i} position="absolute" w="14px" h="14px"
              border="1px solid rgba(124,58,237,0.25)" borderRadius="2px" {...s} />
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
              'svg text': {
                fill: 'rgba(255,255,255,0.28) !important',
                fontFamily: MONO,
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

          {/* Legend footer */}
          <Flex mt={6} pt={4} justify="space-between" align="center"
            borderTop="1px solid rgba(255,255,255,0.04)"
            position="relative" zIndex={1}>
            <Text fontFamily={MONO} fontSize="10px" color="whiteAlpha.200">
              {USERNAME}
            </Text>
            <HStack spacing={1.5} align="center">
              <Text fontFamily={H} fontSize="7px" letterSpacing="0.12em"
                textTransform="uppercase" color="whiteAlpha.250" mr={1}>Less</Text>
              {[[0.07,'#1e40af'],[0.32,'#7c3aed'],[0.54,'#7c3aed'],[0.75,'#ec4899'],[0.95,'#ec4899']].map(([o, c], i) => (
                <Box key={i} w="10px" h="10px" borderRadius="3px"
                  style={{ background: `linear-gradient(135deg, #1e40af, #7c3aed, #ec4899)`, opacity: o * 1.05 }}
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