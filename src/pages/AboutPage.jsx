import React from 'react';
import { Box, Container, VStack } from '@chakra-ui/react';
import AboutPart from '../components/AboutPageBits/AboutPart';
import Hobbies from '../components/AboutPageBits/Hobbies';
import Certificates from '../components/AboutPageBits/Certificates';
import TechSkills from '../components/AboutPageBits/TechSkills';
import ContributionMap from '../components/AboutPageBits/ContributionMap';
import Learning from '../components/AboutPageBits/Learning';
import Resume from '../components/Resume';
import DotGrid from '../components/assets/DotGrid/DotGrid';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion, useScroll } from 'framer-motion';
import { useColorModeValue } from '@chakra-ui/react';

/**
 * LAYOUT OPTION 1: Diagonal Sections (Dynamic & Modern)
 * Creates visual interest with angled transitions between sections
 */
const AboutPageDiagonal = () => {
  const { scrollYProgress } = useScroll();
  const baseColor = useColorModeValue("#d4dadc", '#1a1a1a');
  
  return (
    <>
      <motion.div
        style={{
          scaleX: scrollYProgress,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(to right, #059669, #2563eb, #9333ea)',
          transformOrigin: '0%',
          zIndex: 9999
        }}
      />

      <Box position="relative" bg="bg.secondary" overflow="hidden">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor={baseColor}
          activeColor={['#ff0080', '#6366f1', '#3b82f6']}
          proximity={85}
          shockRadius={170}
          shockStrength={3}
          resistance={750}
          returnDuration={1.5}
        />

        <Header />

        {/* Hero - Full height with gradient accent */}
        <Box
          position="relative"
          minH="100vh"
          display="flex"
          alignItems="center"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '40%',
            height: '100%',
            bgGradient: 'gradients.jewel',
            opacity: 0.05,
            transform: 'skewX(-12deg)',
            transformOrigin: 'top right'
          }}
        >
          <Container maxW="container.xl" zIndex={1}>
            <AboutPart />
          </Container>
        </Box>

        {/* TechSkills - Diagonal clip top */}
        <Box
          position="relative"
          bg="surface.card"
          py={{ base: 20, md: 32 }}
          mt={-20}
          clipPath="polygon(0 5%, 100% 0, 100% 100%, 0 100%)"
        >
          <Container maxW="container.xl" pt={16}>
            <TechSkills />
          </Container>
        </Box>

        {/* ContributionMap - Angled both sides */}
        <Box
          position="relative"
          py={{ base: 20, md: 28 }}
          clipPath="polygon(0 3%, 100% 0, 100% 97%, 0 100%)"
          mt={-12}
        >
          <Container maxW="container.xl">
            <ContributionMap />
          </Container>
        </Box>

        {/* Learning - Diagonal clip bottom */}
        <Box
          position="relative"
          bg="surface.card"
          py={{ base: 20, md: 28 }}
          mt={-12}
          clipPath="polygon(0 0, 100% 3%, 100% 100%, 0 97%)"
        >
          <Container maxW="container.xl">
            <Learning />
          </Container>
        </Box>

        {/* Certificates */}
        <Box py={{ base: 16, md: 24 }}>
          <Container maxW="container.xl">
            <Certificates />
          </Container>
        </Box>

        {/* Hobbies - Gradient background */}
        <Box
          position="relative"
          py={{ base: 20, md: 28 }}
          _before={{
            content: '""',
            position: 'absolute',
            inset: 0,
            bgGradient: 'gradients.jewel',
            opacity: 0.03
          }}
        >
          <Container maxW="container.xl" position="relative" zIndex={1}>
            <Hobbies />
          </Container>
        </Box>

        {/* Resume - CTA Section */}
        <Box bg="surface.card" py={{ base: 20, md: 32 }}>
          <Container maxW="container.lg">
            <Resume />
          </Container>
        </Box>

        <Footer />
      </Box>
    </>
  );
};

/**
 * LAYOUT OPTION 2: Bento Grid (Like Apple/Modern SaaS)
 * Asymmetric cards, mixed sizes for visual hierarchy
 */
const AboutPageBento = () => {
  const { scrollYProgress } = useScroll();
  const baseColor = useColorModeValue("#d4dadc", '#1a1a1a');

  return (
    <>
      <motion.div
        style={{
          scaleX: scrollYProgress,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(to right, #059669, #2563eb, #9333ea)',
          transformOrigin: '0%',
          zIndex: 9999
        }}
      />

      <Box position="relative" bg="bg.secondary">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor={baseColor}
          activeColor={['#ff0080', '#6366f1', '#3b82f6']}
          proximity={85}
          shockRadius={170}
          shockStrength={3}
          resistance={750}
          returnDuration={1.5}
        />

        <Header />

        <Container maxW="container.xl" py={20}>
          <VStack spacing={6} align="stretch">
            {/* Hero takes full width */}
            <Box
              bg="surface.card"
              borderRadius="2xl"
              p={{ base: 8, md: 16 }}
              borderWidth="1px"
              borderColor="border.primary"
              minH={{ base: "auto", md: "60vh" }}
              display="flex"
              alignItems="center"
            >
              <AboutPart />
            </Box>

            {/* TechSkills + Learning side by side */}
            <Box
              display="grid"
              gridTemplateColumns={{ base: "1fr", lg: "2fr 1fr" }}
              gap={6}
            >
              <Box
                bg="surface.card"
                borderRadius="2xl"
                p={{ base: 6, md: 10 }}
                borderWidth="1px"
                borderColor="border.primary"
              >
                <TechSkills />
              </Box>
              <Box
                bg="surface.card"
                borderRadius="2xl"
                p={{ base: 6, md: 10 }}
                borderWidth="1px"
                borderColor="border.primary"
              >
                <Learning />
              </Box>
            </Box>

            {/* ContributionMap full width */}
            <Box
              bg="surface.card"
              borderRadius="2xl"
              p={{ base: 6, md: 10 }}
              borderWidth="1px"
              borderColor="border.primary"
            >
              <ContributionMap />
            </Box>

            {/* Certificates + Hobbies */}
            <Box
              display="grid"
              gridTemplateColumns={{ base: "1fr", lg: "1fr 2fr" }}
              gap={6}
            >
              <Box
                bg="surface.card"
                borderRadius="2xl"
                p={{ base: 6, md: 10 }}
                borderWidth="1px"
                borderColor="border.primary"
              >
                <Hobbies />
              </Box>
              <Box
                bg="surface.card"
                borderRadius="2xl"
                p={{ base: 6, md: 10 }}
                borderWidth="1px"
                borderColor="border.primary"
              >
                <Certificates />
              </Box>
            </Box>

            {/* Resume CTA */}
            <Box
              bg="surface.card"
              borderRadius="2xl"
              p={{ base: 8, md: 12 }}
              borderWidth="1px"
              borderColor="border.primary"
              position="relative"
              overflow="hidden"
              _before={{
                content: '""',
                position: 'absolute',
                inset: 0,
                bgGradient: 'gradients.jewel',
                opacity: 0.05
              }}
            >
              <Box position="relative" zIndex={1}>
                <Resume />
              </Box>
            </Box>
          </VStack>
        </Container>

        <Footer />
      </Box>
    </>
  );
};

/**
 * LAYOUT OPTION 3: Offset Cards with Sticky Elements
 * Cards slide in from alternating sides, creates rhythm
 */
const AboutPageOffset = () => {
  const { scrollYProgress } = useScroll();
  const baseColor = useColorModeValue("#d4dadc", '#1a1a1a');

  return (
    <>
      <motion.div
        style={{
          scaleX: scrollYProgress,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(to right, #059669, #2563eb, #9333ea)',
          transformOrigin: '0%',
          zIndex: 9999
        }}
      />

      <Box position="relative" bg="bg.secondary">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor={baseColor}
          activeColor={['#ff0080', '#6366f1', '#3b82f6']}
          proximity={85}
          shockRadius={170}
          shockStrength={3}
          resistance={750}
          returnDuration={1.5}
        />

        <Header />

        {/* Hero - Full width */}
        <Box minH="100vh" display="flex" alignItems="center" py={20}>
          <Container maxW="container.xl">
            <AboutPart />
          </Container>
        </Box>

        <Container maxW="container.xl" py={12}>
          <VStack spacing={20} align="stretch">
            {/* Left Aligned */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <Box
                bg="surface.card"
                borderRadius="2xl"
                p={{ base: 8, md: 12 }}
                borderWidth="1px"
                borderColor="border.primary"
                maxW={{ base: "100%", lg: "85%" }}
                ml={0}
                position="relative"
                _before={{
                  content: '""',
                  position: 'absolute',
                  left: -4,
                  top: "20%",
                  height: "60%",
                  width: "4px",
                  bgGradient: "gradients.jewel",
                  borderRadius: "full"
                }}
              >
                <TechSkills />
              </Box>
            </motion.div>

            {/* Right Aligned */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <Box
                bg="surface.card"
                borderRadius="2xl"
                p={{ base: 8, md: 12 }}
                borderWidth="1px"
                borderColor="border.primary"
                maxW={{ base: "100%", lg: "85%" }}
                ml={{ base: 0, lg: "auto" }}
              >
                <ContributionMap />
              </Box>
            </motion.div>

            {/* Left Aligned */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <Box
                bg="surface.card"
                borderRadius="2xl"
                p={{ base: 8, md: 12 }}
                borderWidth="1px"
                borderColor="border.primary"
                maxW={{ base: "100%", lg: "85%" }}
              >
                <Learning />
              </Box>
            </motion.div>

            {/* Right Aligned */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <Box
                bg="surface.card"
                borderRadius="2xl"
                p={{ base: 8, md: 12 }}
                borderWidth="1px"
                borderColor="border.primary"
                maxW={{ base: "100%", lg: "85%" }}
                ml={{ base: 0, lg: "auto" }}
              >
                <Certificates />
              </Box>
            </motion.div>

            {/* Center - Hobbies */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Box
                bg="surface.card"
                borderRadius="2xl"
                p={{ base: 8, md: 12 }}
                borderWidth="1px"
                borderColor="border.primary"
              >
                <Hobbies />
              </Box>
            </motion.div>

            {/* Resume - Full width CTA */}
            <Box
              bg="surface.card"
              borderRadius="2xl"
              p={{ base: 10, md: 16 }}
              borderWidth="1px"
              borderColor="border.primary"
              textAlign="center"
              position="relative"
              overflow="hidden"
              _before={{
                content: '""',
                position: 'absolute',
                inset: 0,
                bgGradient: 'gradients.jewel',
                opacity: 0.08
              }}
            >
              <Box position="relative" zIndex={1}>
                <Resume />
              </Box>
            </Box>
          </VStack>
        </Container>

        <Footer />
      </Box>
    </>
  );
};

export default AboutPageBento; // My recommended default
export { AboutPageOffset, AboutPageDiagonal };