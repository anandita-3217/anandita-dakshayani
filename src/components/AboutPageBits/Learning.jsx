import { useState, useRef, useEffect } from 'react';
import { Box, Text, HStack, VStack, Badge, Flex, useColorModeValue } from '@chakra-ui/react';
import { motion, useScroll, useTransform, AnimatePresence, animate } from 'framer-motion'; // ← animate imported
import { RollerCoaster, Shapes, ChartSpline, Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const MotionBox = motion.create(Box);

const learningProjects = [
  {
    id: 1, num: '01', title: 'Noracle',
    description: 'Ask the chatbot any question and it finds reasons to not do it. An API-wrapped reverse motivator that will make your blood boil.',
    category: 'Web', accent: '#667eea',
    techStack: ['NextJS', 'Vercel'],
    funFact: 'Spent 3 days building a chatbot designed to be useless.',
    githubUrl: 'https://github.com/anandita-3217/Noracle', liveUrl: '#',
  },
  {
    id: 2, num: '02', title: 'Experimental Garden ',
    description: "A game inspired by Anna's garden - Plant flowers only if they look like flowers",
    category: 'Game', accent: '#f093fb',
    techStack: ['Canvas API', 'TypeScript', 'NextJS'],
    funFact: 'My personal high score is embarrassingly low.',
    githubUrl: '#', liveUrl: '#',
  },
  {
    id: 3, num: '03', title: 'GitHub Stalker',
    description: "Pull any GitHub user's full stats, repos, and activity using only their username. Clipboard copy coming soon.",
    category: 'Tool', accent: '#4a90d9',
    techStack: ['React', 'GitHub API', 'REST'],
    funFact: 'The name says it all.',
    githubUrl: '#', liveUrl: '#',
  },
  {
    id: 4, num: '04', title: 'Glass Generator',
    description: 'A live glassmorphism card generator. Tweak blur, opacity, and color in real time. Used to style this very portfolio.',
    category: 'Tool', accent: '#4facfe',
    techStack: ['React', 'CSS', 'Design Systems'],
    funFact: 'Meta: I used it to build this site.',
    githubUrl: '#', liveUrl: '#',
  },
  {
    id: 5, num: '05', title: 'Wordle Clone',
    description: 'Infinite Wordle challenges that run offline as a desktop app. Built to understand Electron and local app distribution.',
    category: 'Game', accent: '#f093fb',
    techStack: ['JavaScript', 'Electron', 'DOM'],
    funFact: 'I wasted an embarrassing amount of time on this.',
    githubUrl: 'https://github.com/anandita-3217/WordGame', liveUrl: '#',
  },
  {
    id: 6, num: '06', title: 'Meme Generator',
    description: 'Create custom memes with text overlays using the Imgflip API and Canvas rendering. Essential developer utility.',
    category: 'Web', accent: '#667eea',
    techStack: ['React', 'Canvas', 'Imgflip API'],
    funFact: 'Produced 50+ memes about semicolons.',
    githubUrl: '#', liveUrl: '#',
  },
];

// ── Single cinematic row ──────────────────────────────────────────────────────
function ProjectRow({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const rowRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: rowRef, offset: ['start 0.95', 'start 0.3'] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x       = useTransform(scrollYProgress, [0, 1], [-40, 0]);

  return (
    <MotionBox
      ref={rowRef} style={{ opacity, x }}
      onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
      position="relative"
    >
      <Box position="relative" py={8} px={0} cursor="default"
        _before={{
          content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: hovered
            ? `linear-gradient(to right, transparent, ${project.accent}55, transparent)`
            : 'linear-gradient(to right, transparent, var(--chakra-colors-border-row, rgba(255,255,255,0.06)), transparent)',
          transition: 'background 0.4s',
        }}
      >
        <Box position="absolute" inset={0} bgGradient={`linear(to-r, ${project.accent}06, transparent)`}
          opacity={hovered ? 1 : 0} transition="opacity 0.5s" pointerEvents="none" borderRadius="12px" />

        <Flex align="center" gap={{ base: 4, md: 8 }} position="relative" zIndex={1} flexWrap={{ base: 'wrap', md: 'nowrap' }}>
          <Text fontFamily="Monospace" fontSize={{ base: '32px', md: '56px' }} fontWeight="900" lineHeight={1}
            color={hovered ? project.accent : 'text.ghost'} transition="color 0.4s"
            flexShrink={0} w={{ base: '60px', md: '90px' }} userSelect="none" textAlign="center">
            {project.num}
          </Text>

          <Box flex="0 0 auto" w={{ base: '100%', md: '280px' }} textAlign={{ base: 'center', md: 'left' }}>
            <HStack spacing={3} mb={1.5} align="center" justify={{ base: 'center', md: 'flex-start' }}>
              <Text fontSize={{ base: '18px', md: '24px' }} fontWeight="900" letterSpacing="-0.02em"
                color={hovered ? 'text.primary' : 'text.strong'} transition="color 0.3s" lineHeight={1.1}>
                {project.title}
              </Text>
              <Box color={project.accent} opacity={hovered ? 1 : 0}
                transform={hovered ? 'translate(0,0)' : 'translate(-4px, 4px)'} transition="all 0.3s">
                <ArrowUpRight size={18} />
              </Box>
            </HStack>
            <Flex justify={{ base: 'center', md: 'flex-start' }}>
              <Badge fontFamily='Orbitron' fontSize="8px" letterSpacing="0.18em" textTransform="uppercase"
                px={2} py={0.5} borderRadius="5px" bg={`${project.accent}14`} color={project.accent}
                border="1px solid" borderColor={`${project.accent}30`}>
                {project.category}
              </Badge>
            </Flex>
          </Box>

          <Box flex={1} minW={0} overflow="hidden" textAlign={{ base: 'center', md: 'left' }}>
            <Text fontFamily='Sora' fontSize="14px" lineHeight={1.75}
              color={hovered ? 'text.dimHover' : 'text.dim'} transition="color 0.4s"
              noOfLines={hovered ? undefined : 2}>
              {project.description}
            </Text>
            <AnimatePresence>
              {hovered && (
                <motion.div initial={{ opacity: 0, height: 0, y: -4 }} animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                  <HStack spacing={2} mt={3} justify={{ base: 'center', md: 'flex-start' }}>
                    <Box w="2px" h="28px" bg={project.accent} borderRadius="full" flexShrink={0} />
                    <Text fontFamily='Sora' fontSize="12px" color={project.accent} opacity={0.8} fontStyle="italic">
                      {project.funFact}
                    </Text>
                  </HStack>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>

          <VStack align={{ base: 'center', md: 'flex-end' }} spacing={3} flexShrink={0} w={{ base: '100%', md: 'auto' }}>
            <Flex gap={1.5} flexWrap="wrap" justify={{ base: 'center', md: 'flex-end' }}>
              {project.techStack.map(t => (
                <Badge key={t} fontFamily='Sora' fontSize="9px" px={2} py={0.5} borderRadius="5px"
                  bg="bg.badge" color={hovered ? 'text.badgeHover' : 'text.badge'}
                  borderWidth="1px" borderStyle="solid" borderColor="border.badge" transition="color 0.3s">
                  {t}
                </Badge>
              ))}
            </Flex>
            <HStack spacing={2}>
              <Box as="a" href={project.githubUrl} target="_blank" display="flex" alignItems="center" gap={1}
                fontFamily='Orbitron' fontSize="12px" letterSpacing="0.15em"
                color={hovered ? project.accent : 'text.link'} transition="color 0.3s"
                _hover={{ color: project.accent }} onClick={e => e.stopPropagation()}>
                <Github size={13} /><Text>Code</Text>
              </Box>
              <Text color="text.slash" fontSize="10px">/</Text>
              <Box as="a" href={project.liveUrl} target="_blank" display="flex" alignItems="center" gap={1}
                fontFamily='Orbitron' fontSize="12px" letterSpacing="0.15em"
                color={hovered ? project.accent : 'text.link'} transition="color 0.3s"
                _hover={{ color: project.accent }} onClick={e => e.stopPropagation()}>
                <ExternalLink size={13} /><Text>Demo</Text>
              </Box>
            </HStack>
          </VStack>
        </Flex>
      </Box>
      {index < learningProjects.length - 1 && <Box h="1px" bg="border.row" />}
    </MotionBox>
  );
}

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
      {sub && <Text fontFamily='Sora' fontSize="11px" color={subColor} mt={1} textAlign="right">{sub}</Text>}
    </Box>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Learning() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Web', 'Game', 'Tool'];

  // ← ref is now attached to the stats wrapper below
  const [sectionRef, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const filtered = filter === 'All'
    ? learningProjects
    : learningProjects.filter(p => p.category === filter);

  return (
    <Box bg="transparent" py={{ base: 4, md: 6 }} maxW="1100px" mx="auto">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <Box mb={12}>
        <HStack spacing={3} mb={3} justify="flex-start">
          <Box w="24px" h="1px" bgGradient="linear(to-r, #ec4899, #7c3aed)" />
          <Text fontFamily='Orbitron' fontSize="9px" letterSpacing="0.3em"
            textTransform="uppercase" color="text.eyebrow">
            Side quests
          </Text>
        </HStack>
        <Text fontFamily='Orbitron' fontSize={{ base: '26px', md: '40px' }} fontWeight="900"
          letterSpacing="-0.02em" lineHeight={1.05}
          bgGradient="linear(to-r, #7c3aed, #ec4899)" bgClip="text"
          display="inline-block" w="fit-content">
          Learning &amp;
        </Text>
        <Text fontFamily='Orbitron' fontSize={{ base: '26px', md: '40px' }} fontWeight="900"
          letterSpacing="-0.02em" lineHeight={1.05} color="text.subdued" mb={8}>
          Experiments
        </Text>

        {/* ── Stat cards — ref attached here so inView fires on mount ── */}
        <motion.div
          ref={sectionRef}                      
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}        
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Flex gap={3} flexWrap="wrap">
            <StatCard value={learningProjects.length} label="Projects"
              color="#a855f7" trigger={inView} icon={<Shapes size={13} />} />
            <StatCard value='∞' label="Things Learned"
              color="#3b82f6" trigger={inView} icon={<ChartSpline size={13} />} />
            <StatCard value="100%" label="Fun Factor"
              color="#ec4899" trigger={inView} icon={<RollerCoaster size={13} />} />
          </Flex>
        </motion.div>
      </Box>

      {/* ── Filter pills ──────────────────────────────────────────────── */}
      <HStack spacing={2} mb={6} flexWrap="wrap">
        {filters.map(f => (
          <Box key={f} as="button" onClick={() => setFilter(f)}
            fontFamily='Orbitron' fontSize="9px" letterSpacing="0.18em" textTransform="uppercase"
            px={4} py={2} borderRadius="8px" borderWidth="1px" borderStyle="solid"
            borderColor={filter === f ? 'rgba(20,184,166,0.45)' : 'border.badge'}
            bg={filter === f ? 'rgba(20,184,166,0.08)' : 'bg.badge'}
            color={filter === f ? '#14b8a6' : 'text.badge'}
            backdropFilter="blur(12px)" transition="all 0.2s"
            _hover={{ borderColor: 'rgba(20,184,166,0.3)', color: '#14b8a6' }}>
            {f}
          </Box>
        ))}
        <Text fontFamily='Monospace' fontSize="13px" color='rgba(20,184,166,0.7)' pl={2}>
          {filtered.length} projects
        </Text>
      </HStack>

      {/* ── Cinematic list ────────────────────────────────────────────── */}
      <Box>
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div key={project.id} layout
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, delay: i * 0.04 }}>
              <ProjectRow project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <Flex mt={12} pt={8} borderTop="1px solid" borderColor="border.row"
        align="center" justify="space-between" flexWrap="wrap" gap={4}>
        <VStack align="flex-start" spacing={0.5}>
          <Text fontFamily='Orbitron' fontSize="14px" fontWeight="800" color="text.primary">
            There's more.
          </Text>
          <Text fontFamily='Sora' fontSize="13px" color="text.ctaSubtitle">
            Half-finished ideas, experiments, and lessons on GitHub.
          </Text>
        </VStack>
        <Box as="a" href="https://github.com/anandita-3217" target="_blank"
          display="flex" alignItems="center" gap={2}
          fontFamily='Orbitron' fontSize="10px" letterSpacing="0.18em" textTransform="uppercase"
          px={5} py={3} borderRadius="10px" bg="bg.subdued"
          borderWidth="1px" borderStyle="solid" borderColor="border.subdued" color="text.subdued"
          _hover={{ bg: 'rgba(124,58,237,0.14)', borderColor: 'rgba(124,58,237,0.4)', transform: 'translateY(-2px)' }}
          transition="all 0.25s">
          <Github size={15} />
          <Text>GitHub</Text>
          <ArrowUpRight size={13} />
        </Box>
      </Flex>

    </Box>
  );
}