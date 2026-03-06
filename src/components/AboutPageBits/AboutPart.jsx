// import React from 'react';
// import {
//   Box,
//   Text,
//   VStack,
//   Heading,
// } from '@chakra-ui/react';


// export default function AboutPart() {
//   return (

//       <Box maxW="800px" mx="auto" py={20} px={6}>
//         <VStack align="start" spacing={8}>
//           <Heading
//             as="h2"
//             fontSize={{ base: '3xl', md: '5xl' }}
//             fontWeight="normal"
//             bgGradient='linear(to-r, #1e40af, #7c3aed,#ec4899)'
//             bgClip="text"
//             letterSpacing="tight"
//           >
//             About Me
//           </Heading>

//           <VStack align="start" spacing={6} fontSize="xl" lineHeight="1.8">
//             <Text color="text.secondary">
//               I can't draw on paper. Never could. My sketches look like a
//               toddler's refrigerator art.
//             </Text>
//             <Text color="text.secondary">
//               But when I discovered web design, everything clicked.{' '}
//               <Text
//                 as="span"
//                 fontWeight="600"
//                 color="text.primary"
//                 position="relative"
//                 _after={{
//                   content: '""',
//                   position: 'absolute',
//                   bottom: '0.1em',
//                   left: 0,
//                   right: 0,
//                   height: '0.3em',
//                   bgGradient: 'gradients.jewel',
//                   opacity: 0.3,
//                   zIndex: -1,
//                 }}
//               >
//                 Code became my canvas.
//               </Text>{' '}
//               CSS became my paintbrush. Suddenly, I could build the things I
//               visualized in my head.
//             </Text>
//             <Text color="text.secondary">
//               Now I'm obsessed with creating websites that feel{' '}
//               <Text
//                 as="span"
//                 fontWeight="600"
//                 color="text.primary"
//                 position="relative"
//                 _after={{
//                   content: '""',
//                   position: 'absolute',
//                   bottom: '0.1em',
//                   left: 0,
//                   right: 0,
//                   height: '0.3em',
//                   bgGradient: 'gradients.jewel',
//                   opacity: 0.3,
//                   zIndex: -1,
//                 }}
//               >
//                 alive
//               </Text>{' '}
//               — where animations enhance the story, where layouts break
//               expectations, and where users discover something new with every
//               scroll.
//             </Text>
//           </VStack>
//         </VStack>
//       </Box>

//   );
// }

import React from 'react';
import { useRef } from 'react';
import {
  Box,
  Text,
  Grid,
  GridItem,
  HStack,
  VStack,
  chakra,
  shouldForwardProp,
} from '@chakra-ui/react';
import { motion, useScroll, useTransform, isValidMotionProp } from 'framer-motion';

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (p) => isValidMotionProp(p) || shouldForwardProp(p),
});

// ─── Reusable highlighted word ────────────────────────────────────────────────
const Highlight = ({ children }) => (
  <chakra.span
    fontWeight="700"
    color="white"
    position="relative"
    _after={{
      content: '""',
      position: 'absolute',
      bottom: '0.05em',
      left: 0,
      right: 0,
      height: '0.25em',
      bgGradient: 'linear(to-r, #1e40af, #7c3aed, #ec4899)',
      opacity: 0.35,
      zIndex: -1,
    }}
  >
    {children}
  </chakra.span>
);

// ─── Stat pill ────────────────────────────────────────────────────────────────
const Stat = ({ value, label }) => (
  <Box
    px={5}
    py={4}
    bg="surface.glass"
    border="1px solid"
    borderColor="whiteAlpha.100"
    borderRadius="2px"
    backdropFilter="blur(8px)"
    flex={1}
    minW="100px"
    transition="border-color 0.2s"
    _hover={{ borderColor: 'brand.400' }}
  >
    <Text
      fontFamily="Orbitron, sans-serif"
      fontSize={{ base: '22px', md: '28px' }}
      fontWeight="900"
      bgGradient="linear(to-r, #1e40af, #7c3aed, #ec4899)"
      bgClip="text"
      lineHeight={1}
      mb={1}
    >
      {value}
    </Text>
    <Text
      fontFamily="Sora, sans-serif"
      fontSize="10px"
      letterSpacing="0.15em"
      textTransform="uppercase"
      color="whiteAlpha.400"
    >
      {label}
    </Text>
  </Box>
);

export default function AboutPart() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <Box ref={ref}>
      <Grid
        templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
        gap={{ base: 12, lg: 16 }}
        alignItems="center"
      >

        {/* ── LEFT: Text content ─────────────────────────────────────────── */}
        <GridItem>
          <VStack align="start" spacing={8}>

            {/* Eyebrow */}
            <HStack spacing={3}>
              <Box w="24px" h="1px" bgGradient="linear(to-r, #ec4899, #7c3aed)" />
              <Text
                fontFamily="Orbitron, sans-serif"
                fontSize="10px"
                letterSpacing="0.3em"
                textTransform="uppercase"
                color="whiteAlpha.400"
              >
                Who I am
              </Text>
            </HStack>

            {/* Heading */}
            <Text
              fontFamily="Orbitron, sans-serif"
              fontSize={{ base: '28px', md: '40px' }}
              fontWeight="900"
              letterSpacing="-0.02em"
              lineHeight={1.05}
              color="white"
            >
              I can't draw
              <br />
              <chakra.span
                bgGradient="linear(to-r, #1e40af, #7c3aed, #ec4899)"
                bgClip="text"
              >
                on paper.
              </chakra.span>
            </Text>

            {/* Body copy */}
            <VStack align="start" spacing={5}>
              <Text
                fontFamily="Sora, sans-serif"
                fontSize={{ base: '15px', md: '16px' }}
                lineHeight={1.85}
                color="whiteAlpha.600"
              >
                Never could. My sketches look like refrigerator art. But when I
                discovered web design, everything clicked.{' '}
                <Highlight>Code became my canvas.</Highlight>{' '}
                CSS became my paintbrush — suddenly I could build the things I
                visualized in my head.
              </Text>

              <Text
                fontFamily="Sora, sans-serif"
                fontSize={{ base: '15px', md: '16px' }}
                lineHeight={1.85}
                color="whiteAlpha.600"
              >
                Now I'm obsessed with creating websites that feel{' '}
                <Highlight>alive</Highlight> — where animations enhance the
                story, layouts break expectations, and users discover something
                new with every scroll.
              </Text>
            </VStack>

            {/* Stats row */}
            <HStack spacing={3} w="full" pt={2} flexWrap="wrap">
              <Stat value="4+" label="Years exp." />
              <Stat value="30+" label="Projects" />
              <Stat value="∞" label="Curiosity" />
            </HStack>

          </VStack>
        </GridItem>

        {/* ── RIGHT: Visual asset area ───────────────────────────────────── */}
        <GridItem display={{ base: 'none', lg: 'block' }}>
          <MotionBox style={{ y: imgY }} position="relative">

            {/* 
              ╔══════════════════════════════════════════════════════════════╗
              ║  IMAGE SLOT — replace the Box below with:                   ║
              ║                                                              ║
              ║  Option A (recommended): A portrait/photo of yourself        ║
              ║    <Image src="/images/avatar.jpg" .../>                    ║
              ║    Works great: candid shot, workspace photo, side profile   ║
              ║                                                              ║
              ║  Option B: A creative/abstract visual                        ║
              ║    - Screenshot of your best project                         ║
              ║    - A short looping video (MP4 via <video autoPlay muted>)  ║
              ║    - An SVG illustration of your workspace                   ║
              ║                                                              ║
              ║  Option C: Keep the placeholder below as a code window       ║
              ║    aesthetic — works well if you have no photo               ║
              ╚══════════════════════════════════════════════════════════════╝
            */}

            {/* Decorative glow behind image */}
            <Box
              position="absolute"
              top="10%"
              left="10%"
              right="10%"
              bottom="10%"
              bgGradient="linear(to-br, #1e40af33, #7c3aed33, #ec489933)"
              filter="blur(48px)"
              borderRadius="full"
              zIndex={0}
            />

            {/* Main image/placeholder container */}
            <Box
              position="relative"
              zIndex={1}
              borderRadius="4px"
              overflow="hidden"
              border="1px solid"
              borderColor="whiteAlpha.100"
              aspectRatio="4/5"
              bg="surface.glass"
              backdropFilter="blur(4px)"
            >
              {/* ── REPLACE THIS BOX with <Image> or <video> ── */}
              <Box
                w="full"
                h="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                gap={4}
                minH="400px"
              >
                {/* Fake code lines — remove once you have an image */}
                {[
                  '// about me',
                  'const canvas = document;',
                  'const brush = CSS;',
                  '',
                  'while (curious) {',
                  '  build();',
                  '  iterate();',
                  '  ship();',
                  '}',
                ].map((line, i) => (
                  <Text
                    key={i}
                    fontFamily="'JetBrains Mono', 'Courier New', monospace"
                    fontSize="13px"
                    color={
                      line.startsWith('//')
                        ? 'whiteAlpha.300'
                        : line.startsWith('const') || line.startsWith('while')
                        ? '#7c3aed'
                        : line === ''
                        ? 'transparent'
                        : 'whiteAlpha.500'
                    }
                    w="full"
                    px={8}
                    userSelect="none"
                  >
                    {line || '\u00A0'}
                  </Text>
                ))}
              </Box>
              {/* ─────────────────────────────────────────────────────────── */}

              {/* Corner accent lines */}
              <Box position="absolute" top={3} left={3} w="20px" h="20px"
                borderTop="1px solid" borderLeft="1px solid"
                borderColor="whiteAlpha.200" />
              <Box position="absolute" bottom={3} right={3} w="20px" h="20px"
                borderBottom="1px solid" borderRight="1px solid"
                borderColor="whiteAlpha.200" />
            </Box>

            {/* Floating tag — sits outside the image card */}
            <Box
              position="absolute"
              bottom={-4}
              left={-6}
              px={4}
              py={2}
              bg="surface.card"
              border="1px solid"
              borderColor="whiteAlpha.100"
              borderRadius="2px"
              zIndex={2}
            >
              <Text
                fontFamily="Orbitron, sans-serif"
                fontSize="9px"
                letterSpacing="0.2em"
                textTransform="uppercase"
                color="whiteAlpha.400"
              >
                {/* 
                  SUGGESTION: swap this for your current city/location,
                  or a fun tagline like "Based in NYC · Open to remote"
                */}
                Open to work · 2025
              </Text>
            </Box>

          </MotionBox>
        </GridItem>

      </Grid>
    </Box>
  );
}