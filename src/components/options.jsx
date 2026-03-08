import { useRef, useState, useEffect, useCallback } from 'react';
import { Box, Text, HStack, VStack, Flex, chakra } from '@chakra-ui/react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from 'framer-motion';

const MotionBox = motion.create(Box);

const H    = 'Orbitron, sans-serif';
const B    = 'Sora, sans-serif';
const MONO = "'JetBrains Mono', monospace";
const GRAD = 'linear(to-r, #1e40af, #7c3aed, #ec4899)';
const TEAL = '#14b8a6';

// ── Scramble text hook ────────────────────────────────────────────────────────
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
function useScramble(target, trigger) {
  const [display, setDisplay] = useState(target);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;
    let iteration = 0;
    clearInterval(frameRef.current);
    frameRef.current = setInterval(() => {
      setDisplay(
        target.split('').map((char, i) => {
          if (char === ' ') return ' ';
          if (i < iteration) return target[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('')
      );
      if (iteration >= target.length) clearInterval(frameRef.current);
      iteration += 0.5;
    }, 28);
    return () => clearInterval(frameRef.current);
  }, [trigger, target]);

  return display;
}

// ── Count-up number ───────────────────────────────────────────────────────────
function CountUp({ to, suffix = '', trigger }) {
  const [val, setVal] = useState(0);
  const isSymbol = isNaN(parseInt(to));

  useEffect(() => {
    if (!trigger || isSymbol) return;
    const num = parseInt(to);
    const ctrl = animate(0, num, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => setVal(Math.floor(v)),
    });
    return () => ctrl.stop();
  }, [trigger, to, isSymbol]);

  if (isSymbol) return <>{to}</>;
  return <>{val}{suffix}</>;
}

// ── Magnetic button ───────────────────────────────────────────────────────────
function Magnetic({ children, strength = 0.35 }) {
  const ref   = useRef(null);
  const mx    = useMotionValue(0);
  const my    = useMotionValue(0);
  const sx    = useSpring(mx, { stiffness: 180, damping: 18 });
  const sy    = useSpring(my, { stiffness: 180, damping: 18 });

  const onMove = e => {
    const r   = ref.current.getBoundingClientRect();
    const dx  = e.clientX - (r.left + r.width / 2);
    const dy  = e.clientY - (r.top  + r.height / 2);
    mx.set(dx * strength);
    my.set(dy * strength);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, display: 'inline-block' }}
    >
      {children}
    </motion.div>
  );
}

// ── Highlight with animated underline ────────────────────────────────────────
const Highlight = ({ children, color = '#7c3aed' }) => {
  const [hov, setHov] = useState(false);
  return (
    <chakra.span
      fontWeight="700"
      color="white"
      position="relative"
      cursor="default"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
      <chakra.span
        position="absolute"
        bottom="0.05em" left={0}
        height="0.22em"
        bg={color}
        opacity={0.4}
        zIndex={-1}
        style={{
          width: hov ? '100%' : '0%',
          transition: 'width 0.35s cubic-bezier(0.23,1,0.32,1)',
        }}
      />
    </chakra.span>
  );
};

// ── Stat card ─────────────────────────────────────────────────────────────────
const StatCard = ({ value, suffix, label, color, trigger }) => {
  const [hov, setHov] = useState(false);
  return (
    <Magnetic strength={0.25}>
      <Box
        px={5} py={4}
        bg={hov ? `${color}10` : 'rgba(255,255,255,0.03)'}
        border="1px solid"
        borderColor={hov ? `${color}45` : 'rgba(255,255,255,0.07)'}
        borderRadius="10px"
        backdropFilter="blur(12px)"
        flex={1} minW="90px"
        transition="all 0.3s"
        cursor="default"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        position="relative"
        overflow="hidden"
      >
        {/* Glow on hover */}
        <Box
          position="absolute" inset={0}
          bgGradient={`radial(circle at 50% 0%, ${color}18, transparent 70%)`}
          opacity={hov ? 1 : 0}
          transition="opacity 0.4s"
          pointerEvents="none"
        />
        <Text
          fontFamily={H}
          fontSize={{ base: '22px', md: '28px' }}
          fontWeight="900"
          lineHeight={1} mb={1}
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}66)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          <CountUp to={value} suffix={suffix} trigger={trigger} />
        </Text>
        <Text
          fontFamily={H} fontSize="8px"
          letterSpacing="0.2em" textTransform="uppercase"
          color="whiteAlpha.350"
        >
          {label}
        </Text>
      </Box>
    </Magnetic>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AboutPart() {
  const sectionRef    = useRef(null);
  const imgRef        = useRef(null);
  const [visible, setVisible] = useState(false);
  const [imgHov, setImgHov]   = useState(false);

  // Scroll-based parallax on image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imgY    = useTransform(scrollYProgress, [0, 1], [-28, 28]);
  const imgScale= useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);

  // Trigger animations when section enters view
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.25 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Scramble heading words
  const word1 = useScramble("CAN'T", visible);
  const word2 = useScramble('DRAW', visible);

  // Magnetic image pull
  const imgMx  = useMotionValue(0);
  const imgMy  = useMotionValue(0);
  const imgSx  = useSpring(imgMx, { stiffness: 120, damping: 20 });
  const imgSy  = useSpring(imgMy, { stiffness: 120, damping: 20 });
  const imgRx  = useSpring(useTransform(imgMy, [-60, 60], [6, -6]), { stiffness: 120, damping: 20 });
  const imgRy  = useSpring(useTransform(imgMx, [-60, 60], [-6, 6]), { stiffness: 120, damping: 20 });

  const onImgMove = e => {
    const r  = imgRef.current?.getBoundingClientRect();
    if (!r) return;
    imgMx.set((e.clientX - (r.left + r.width  / 2)) * 0.18);
    imgMy.set((e.clientY - (r.top  + r.height / 2)) * 0.18);
  };
  const onImgLeave = () => { imgMx.set(0); imgMy.set(0); };

  return (
    <Box ref={sectionRef}>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        gap={{ base: 14, lg: 16 }}
        align="center"
      >

        {/* ── LEFT: Text ──────────────────────────────────────────────── */}
        <Box flex={1} minW={0}>
          <VStack align="start" spacing={8}>

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <HStack spacing={3}>
                <Box w="24px" h="1px" bgGradient="linear(to-r, #ec4899, #7c3aed)" />
                <Text fontFamily={H} fontSize="9px" letterSpacing="0.3em"
                  textTransform="uppercase" color="whiteAlpha.400">
                  Who I am
                </Text>
              </HStack>
            </motion.div>

            {/* Scramble heading */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <Text
                fontFamily={H}
                fontSize={{ base: '32px', md: '48px', lg: '56px' }}
                fontWeight="900"
                letterSpacing="-0.03em"
                lineHeight={0.95}
                color="white"
                userSelect="none"
              >
                I{' '}
                <chakra.span color={TEAL}>{word1}</chakra.span>
                <br />
                <chakra.span color="rgba(255,255,255,0.18)">{word2}</chakra.span>
                <br />
                <chakra.span
                  bgGradient={GRAD}
                  bgClip="text"
                  fontSize={{ base: '28px', md: '40px', lg: '46px' }}
                >
                  on paper.
                </chakra.span>
              </Text>
            </motion.div>

            {/* Body copy */}
            <VStack align="start" spacing={5}>
              {[
                <>
                  Never could. My sketches look like a confused robot tried to
                  dream. But when I discovered the browser,{' '}
                  <Highlight color="#7c3aed">everything changed.</Highlight>{' '}
                  Code became the canvas I never had — suddenly the visuals trapped
                  in my head had somewhere to live.
                </>,
                <>
                  Now I build interfaces that feel{' '}
                  <Highlight color={TEAL}>alive</Highlight> — where motion carries
                  meaning, layouts break the expected grid, and{' '}
                  <Highlight color="#ec4899">the scroll becomes a story.</Highlight>{' '}
                  I obsess over the details no one notices until they're gone.
                </>,
              ].map((para, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.25 + i * 0.12 }}
                  style={{ width: '100%' }}
                >
                  <Text
                    fontFamily={B}
                    fontSize={{ base: '14px', md: '15px' }}
                    lineHeight={1.9}
                    color="whiteAlpha.550"
                  >
                    {para}
                  </Text>
                </motion.div>
              ))}
            </VStack>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{ width: '100%' }}
            >
              <HStack spacing={3} w="full" flexWrap="wrap">
                <StatCard value="4"  suffix="+"  label="Years exp."  color={TEAL}     trigger={visible} />
                <StatCard value="30" suffix="+"  label="Projects"    color="#a855f7"  trigger={visible} />
                <StatCard value="∞"  suffix=""   label="Curiosity"   color="#3b82f6"  trigger={visible} />
              </HStack>
            </motion.div>

            {/* Surprise: tiny rotating tagline ticker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={visible ? { opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <TaglineTicker />
            </motion.div>

          </VStack>
        </Box>

        {/* ── RIGHT: Image ─────────────────────────────────────────────── */}
        <Box
          display={{ base: 'none', lg: 'block' }}
          flex="0 0 auto"
          w="360px"
        >
          <motion.div
            ref={imgRef}
            onMouseMove={onImgMove}
            onMouseLeave={onImgLeave}
            onMouseEnter={() => setImgHov(true)}
            style={{
              x: imgSx, y: imgSy,
              rotateX: imgRx, rotateY: imgRy,
              transformStyle: 'preserve-3d',
              position: 'relative',
            }}
          >
            {/* Glow blob */}
            <Box
              position="absolute" top="5%" left="5%" right="5%" bottom="5%"
              bgGradient="linear(to-br, #1e40af33, #7c3aed33, #ec489933)"
              filter="blur(52px)"
              borderRadius="full"
              zIndex={0}
            />

            {/* Image frame */}
            <motion.div style={{ y: imgY, scale: imgScale, position: 'relative', zIndex: 1 }}>
              <Box
                borderRadius="16px"
                overflow="hidden"
                border="1px solid"
                borderColor={imgHov ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.08)'}
                transition="border-color 0.4s"
                aspectRatio="4/5"
                bg="rgba(255,255,255,0.03)"
                backdropFilter="blur(4px)"
                position="relative"
                boxShadow={imgHov
                  ? '0 32px 80px rgba(124,58,237,0.25)'
                  : '0 8px 40px rgba(0,0,0,0.5)'}
              >
                {/* ── DROP YOUR PHOTO HERE ──
                    Replace this Box with:
                    <Image src="/your-photo.jpg" w="100%" h="100%" objectFit="cover" />
                ──────────────────────────── */}
                <Box w="full" h="full" minH="440px" position="relative">
                  <img
                    src="/avatar.jpg"
                    alt="Anandita"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      filter: imgHov ? 'saturate(1.1) brightness(1.05)' : 'saturate(0.9)',
                      transition: 'filter 0.5s',
                    }}
                    onError={e => { e.target.style.display = 'none'; }}
                  />

                  {/* Fallback code aesthetic if no image */}
                  <Box
                    position="absolute" inset={0}
                    display="flex" flexDirection="column"
                    justifyContent="center" gap={3} px={8}
                    opacity={0.6}
                  >
                    {['// anandita.dev', 'const me = {', "  canvas: 'browser',", "  brush: 'CSS',", "  curiosity: Infinity,", '};'].map((l, i) => (
                      <Text key={i} fontFamily={MONO} fontSize="13px"
                        color={l.startsWith('//') ? 'whiteAlpha.300' : l.includes('const') ? '#7c3aed' : 'whiteAlpha.500'}>
                        {l}
                      </Text>
                    ))}
                  </Box>
                </Box>

                {/* Scan-line overlay — subtle texture */}
                <Box
                  position="absolute" inset={0}
                  backgroundImage="repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)"
                  pointerEvents="none" zIndex={2}
                />

                {/* Hover shimmer sweep */}
                <Box
                  position="absolute" inset={0}
                  bgGradient="linear(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)"
                  style={{
                    transform: imgHov ? 'translateX(100%)' : 'translateX(-100%)',
                    transition: 'transform 0.7s ease',
                  }}
                  pointerEvents="none" zIndex={3}
                />
              </Box>
            </motion.div>

            {/* Corner accents */}
            {[
              { top: -8, left: -8 },
              { top: -8, right: -8 },
              { bottom: -8, left: -8 },
              { bottom: -8, right: -8 },
            ].map((pos, i) => (
              <Box
                key={i}
                position="absolute"
                {...pos}
                w="16px" h="16px"
                border="1px solid"
                borderColor={imgHov ? 'rgba(124,58,237,0.6)' : 'rgba(255,255,255,0.12)'}
                borderRadius="2px"
                transition="border-color 0.4s"
                zIndex={2}
                style={{
                  borderRight: pos.right !== undefined ? undefined : 'none',
                  borderBottom: pos.bottom !== undefined ? undefined : 'none',
                  borderLeft: pos.left !== undefined ? undefined : 'none',
                  borderTop: pos.top !== undefined ? undefined : 'none',
                }}
              />
            ))}

            {/* Floating status tag */}
            <Magnetic strength={0.4}>
              <Box
                position="absolute"
                bottom={-5} left={-8}
                px={4} py={2.5}
                bg="rgba(8,8,8,0.92)"
                backdropFilter="blur(20px)"
                border="1px solid rgba(20,184,166,0.3)"
                borderRadius="8px"
                zIndex={4}
              >
                <HStack spacing={2}>
                  {/* Pulsing green dot */}
                  <Box position="relative" w="7px" h="7px">
                    <Box w="7px" h="7px" borderRadius="full" bg={TEAL} />
                    <Box
                      position="absolute" inset={0}
                      borderRadius="full" bg={TEAL}
                      style={{ animation: 'ping 1.8s cubic-bezier(0,0,0.2,1) infinite' }}
                    />
                  </Box>
                  <Text fontFamily={H} fontSize="8px" letterSpacing="0.18em"
                    textTransform="uppercase" color={TEAL}>
                    Open to work
                  </Text>
                </HStack>
              </Box>
            </Magnetic>

            {/* Top-right: tech count badge */}
            <Magnetic strength={0.3}>
              <Box
                position="absolute"
                top={-5} right={-8}
                px={3} py={2}
                bg="rgba(124,58,237,0.12)"
                backdropFilter="blur(16px)"
                border="1px solid rgba(124,58,237,0.25)"
                borderRadius="8px"
                zIndex={4}
              >
                <Text fontFamily={H} fontSize="8px" letterSpacing="0.15em"
                  textTransform="uppercase" color="#a855f7">
                  15+ technologies
                </Text>
              </Box>
            </Magnetic>

          </motion.div>
        </Box>

      </Flex>

      {/* Ping keyframe */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </Box>
  );
}

// ── Tagline ticker (surprise microinteraction) ────────────────────────────────
const taglines = [
  'Making pixels behave since 2020.',
  'CSS is my love language.',
  'Ships fast. Iterates faster.',
  'Debugging is just detective work.',
  'Web is the greatest canvas.',
  'Dark mode only. Obviously.',
];

function TaglineTicker() {
  const [idx, setIdx]     = useState(0);
  const [visible, setVis] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVis(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % taglines.length);
        setVis(true);
      }, 400);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <HStack spacing={3}>
      <Box w="6px" h="6px" borderRadius="full"
        bg={TEAL} flexShrink={0}
        style={{ animation: 'ping 1.8s cubic-bezier(0,0,0.2,1) infinite' }}
      />
      <Text
        fontFamily={MONO}
        fontSize="11px"
        color="whiteAlpha.350"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.35s, transform 0.35s',
        }}
      >
        {taglines[idx]}
      </Text>
    </HStack>
  );
}