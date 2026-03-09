import { useRef, useState, useEffect, useCallback } from 'react';
import { Box, Text, HStack, VStack, Badge, Flex } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {Camera,Music4,MountainSnow,Book,Coffee} from 'lucide-react';
const MotionBox = motion.create(Box);

const GRAD = 'linear(to-r, #1e40af, #7c3aed, #ec4899)';

const hobbies = [
  {
    title: 'Photography',
    subtitle: 'Chasing light',
    icon: <Camera/>,
    accent: '#1e40af',
    tags: ['Street', 'Analog', 'Portrait'],
    years: '6 yrs',
    description: 'Chasing light through a 35mm lens. Film photography fanatic with a growing collection of vintage cameras and an unhealthy darkroom habit.',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80',
  },
  {
    title: 'Rock Climbing',
    subtitle: 'Vertical problems',
    icon: <Music4/>,
    accent: '#7c3aed',
    tags: ['Bouldering', 'Sport', 'Outdoor'],
    years: '4 yrs',
    description: 'Problem-solving at altitude. Nothing quite like the focus required when the only thing between you and the ground is grip strength.',
    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=80',
  },
  {
    title: 'Music Production',
    subtitle: 'Sculpting sound',
    icon: <Music4/>,
    accent: '#ec4899',
    tags: ['Ambient', 'Electronic', 'Synths'],
    years: '5 yrs',
    description: 'Patching synthesizers and sculpting sound. Each session is a conversation with a machine that has no memory and infinite patience.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80',
  },
  {
    title: 'Hiking',
    subtitle: 'Moving meditation',
    icon: <MountainSnow/>,
    accent: '#059669',
    tags: ['Trail', 'Alpine', 'Endurance'],
    years: '8 yrs',
    description: 'Running as moving meditation. The body becomes background noise and the mind goes somewhere else entirely past mile 15.',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
  },
  {
    title: 'Reading',
    subtitle: 'Other worlds',
    icon: <Book/>,
    accent: '#06b6d4',
    tags: ['Sci-fi', 'Philosophy', 'History'],
    years: '∞',
    description: 'Getting lost in other worlds, other minds, other centuries. A good book is the most efficient form of time travel available.',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
  },
  {
    title: 'Coffee',
    subtitle: 'The ritual',
    icon: <Coffee/>,
    accent: '#fb923c',
    tags: ['Pour-over', 'Espresso', 'Origin'],
    years: '7 yrs',
    description: 'From green bean to cup. The ritual of slow coffee is the only acceptable reason to wake up before 7am.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
  },
];

const COLLAPSED_W = 80;   // px — width of a compressed card
const EXPANDED_W  = 520;  // px — width of the active expanded card
const CARD_H      = 480;  // px
const GAP         = 12;   // px

export default function Hobbies() {
  const trackRef      = useRef(null);
  const tweenRef      = useRef(null);
  const isHoveredRef  = useRef(false);
  const [activeIdx, setActiveIdx] = useState(null);

  // ── Auto-scroll via GSAP ──────────────────────────────────────────────────
  const startScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const totalW = el.scrollWidth - el.clientWidth;

    tweenRef.current = gsap.to(el, {
      scrollLeft: totalW,
      duration: 28,
      ease: 'none',
      repeat: -1,
      repeatRefresh: true,
      onRepeat: () => { el.scrollLeft = 0; },
    });
  }, []);

  useEffect(() => {
    startScroll();
    return () => { tweenRef.current?.kill(); };
  }, [startScroll]);

  const pauseScroll = () => {
    isHoveredRef.current = true;
    gsap.to(tweenRef.current, { timeScale: 0, duration: 0.6, ease: 'power2.out' });
  };

  const resumeScroll = () => {
    isHoveredRef.current = false;
    setActiveIdx(null);
    gsap.to(tweenRef.current, { timeScale: 1, duration: 1.2, ease: 'power2.inOut' });
  };

  return (
    <Box bg="transparent" py={{ base: 4, md: 6 }} position="relative" maxW="1100px" mx="auto">

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <Box mb={10}>
        <HStack spacing={3} mb={3}>
          <Box w="24px" h="1px" bgGradient="linear(to-r, #ec4899, #7c3aed)" />
          <Text fontSize="9px" letterSpacing="0.3em"
            textTransform="uppercase" color="text.eyebrow">
            Beyond the screen
          </Text>
        </HStack>
        <Text fontSize={{ base: '26px', md: '40px' }} fontWeight="900"
          letterSpacing="-0.02em" lineHeight={1.05} bgGradient="linear(to-r, #7c3aed, #ec4899)" bgClip="text">
          What I Do
        </Text>
        <Text fontSize={{ base: '26px', md: '40px' }} fontWeight="900"
          letterSpacing="-0.02em" lineHeight={1.05} color="text.subdued">
          When I'm Not Coding
        </Text>
      </Box>

      {/* ── Carousel ─────────────────────────────────────────────────────── */}
      <Box
        position="relative"
        onMouseEnter={pauseScroll}
        onMouseLeave={resumeScroll}
      >
        {/* Edge fades */}
        <Box position="absolute" left={0} top={0} bottom={0} w="80px" zIndex={3}
          bgGradient="linear(to-r, var(--chakra-colors-bg-primary, #f7f7f8), transparent)" pointerEvents="none" />
        <Box position="absolute" right={0} top={0} bottom={0} w="80px" zIndex={3}
          bgGradient="linear(to-l, var(--chakra-colors-bg-primary, #f7f7f8), transparent)" pointerEvents="none" />

        {/* Track */}
        <Box
          ref={trackRef}
          display="flex"
          alignItems="stretch"
          gap={`${GAP}px`}
          overflowX="auto"
          h={`${CARD_H}px`}
          pb={2}
          sx={{
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            userSelect: 'none',
          }}
        >
          {/* Duplicate for seamless loop feel */}
          {[...hobbies, ...hobbies].map((hobby, i) => {
            const realIdx    = i % hobbies.length;
            const isExpanded = activeIdx === i;
            const isCompressed = activeIdx !== null && !isExpanded;

            return (
              <motion.div
                key={`${hobby.title}-${i}`}
                onHoverStart={() => setActiveIdx(i)}
                onHoverEnd={() => setActiveIdx(null)}
                animate={{
                  width: isExpanded
                    ? EXPANDED_W
                    : isCompressed
                    ? COLLAPSED_W
                    : 220,
                  flexShrink: 0,
                }}
                transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  height: `${CARD_H}px`,
                  flexShrink: 0,
                  borderRadius: '18px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                {/* ── Background image ── */}
                <motion.div
                  animate={{ scale: isExpanded ? 1.04 : 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url(${hobby.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />

                {/* ── Dark overlay ── */}
                <motion.div
                  animate={{ opacity: isExpanded ? 0.55 : isCompressed ? 0.82 : 0.7 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%)',
                  }}
                />

                {/* ── Color tint overlay ── */}
                <motion.div
                  animate={{ opacity: isExpanded ? 0 : 0.25 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position: 'absolute', inset: 0,
                    background: hobby.accent,
                    mixBlendMode: 'color',
                  }}
                />

                {/* ── Border highlight ── */}
                <motion.div
                  animate={{ opacity: isExpanded ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute', inset: 0,
                    borderRadius: '18px',
                    border: `1px solid ${hobby.accent}55`,
                    pointerEvents: 'none',
                  }}
                />

                {/* ── Collapsed: rotated title ── */}
                <AnimatePresence>
                  {isCompressed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <div style={{
                        transform: 'rotate(-90deg)',
                        whiteSpace: 'nowrap',
                        fontSize: '10px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: `${hobby.accent}99`,
                        fontWeight: 700,
                      }}>
                        {hobby.title}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Content (visible when expanded or idle) ── */}
                <AnimatePresence>
                  {!isCompressed && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.35, delay: isExpanded ? 0.15 : 0 }}
                      style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '28px',
                      }}
                    >
                      {/* Top icon */}
                      <div style={{
                        position: 'absolute', top: 24, left: 28,
                        fontSize: '24px', color: hobby.accent,
                        opacity: isExpanded ? 1 : 0.8,
                      }}>
                        {hobby.icon}
                      </div>

                      {/* Years pill */}
                      <div style={{
                        position: 'absolute', top: 22, right: 24,
                        fontSize: '8px', letterSpacing: '0.2em',
                        textTransform: 'uppercase', color: hobby.accent,
                        background: `${hobby.accent}18`,
                        border: `1px solid ${hobby.accent}35`,
                        borderRadius: '6px', padding: '4px 10px',
                        opacity: isExpanded ? 1 : 0,
                        transition: 'opacity 0.3s',
                      }}>
                        {hobby.years}
                      </div>

                      {/* Bottom content */}
                      <div>
                        <div style={{
                          fontSize: isExpanded ? '22px' : '15px',
                          fontWeight: 800, letterSpacing: '-0.02em',
                          color: 'white', lineHeight: 1.15,
                          marginBottom: '6px',
                          transition: 'font-size 0.4s',
                        }}>
                          {hobby.title}
                        </div>

                        {/* Subtitle — idle only */}
                        {!isExpanded && (
                          <div style={{
                            fontSize: '11px',
                            color: `${hobby.accent}bb`, marginBottom: '12px',
                          }}>
                            {hobby.subtitle}
                          </div>
                        )}

                        {/* Description — expanded only */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.35, delay: 0.1 }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div style={{
                                fontSize: '13px', lineHeight: 1.75,
                                color: 'rgba(255,255,255,0.6)', marginBottom: '16px',
                                maxWidth: '380px',
                              }}>
                                {hobby.description}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Tags */}
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {hobby.tags.map(tag => (
                            <div key={tag} style={{
                              fontSize: '8px', letterSpacing: '0.12em',
                              textTransform: 'uppercase', padding: '3px 8px',
                              borderRadius: '5px', border: `1px solid ${hobby.accent}45`,
                              color: isExpanded ? hobby.accent : `${hobby.accent}88`,
                              background: 'transparent',
                              transition: 'color 0.3s, border-color 0.3s',
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

      {/* ── Dot indicators ───────────────────────────────────────────────── */}
      <HStack spacing={2} justify="center" mt={6}>
        {hobbies.map((hobby, i) => (
          <Box
            key={i}
            w={activeIdx !== null && activeIdx % hobbies.length === i ? '20px' : '6px'}
            h="6px"
            borderRadius="full"
            bg={activeIdx !== null && activeIdx % hobbies.length === i
              ? hobby.accent
              : 'border.badge'}
            transition="all 0.35s cubic-bezier(0.23,1,0.32,1)"
          />
        ))}
      </HStack>

    </Box>
  );
}