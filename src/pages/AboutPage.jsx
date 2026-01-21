// import React from 'react';
// import { Box, Container, VStack } from '@chakra-ui/react';
// import AboutPart from '../components/AboutPageBits/AboutPart';
// import Hobbies from '../components/AboutPageBits/Hobbies';
// import Certificates from '../components/AboutPageBits/Certificates';
// import TechSkills from '../components/AboutPageBits/TechSkills';
// import ContributionMap from '../components/AboutPageBits/ContributionMap';
// import Learning from '../components/AboutPageBits/Learning';
// import Resume from '../components/Resume';
// import DotGrid from '../components/assets/DotGrid/DotGrid';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { motion, useScroll } from 'framer-motion';
// import { useColorModeValue } from '@chakra-ui/react';

// /**
//  * LAYOUT OPTION 1: Diagonal Sections (Dynamic & Modern)
//  * Creates visual interest with angled transitions between sections
//  */
// const AboutPageDiagonal = () => {
//   const { scrollYProgress } = useScroll();
//   const baseColor = useColorModeValue("#d4dadc", '#1a1a1a');
  
//   return (
//     <>
//       <motion.div
//         style={{
//           scaleX: scrollYProgress,
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           height: '4px',
//           background: 'linear-gradient(to right, #059669, #2563eb, #9333ea)',
//           transformOrigin: '0%',
//           zIndex: 9999
//         }}
//       />

//         <DotGrid
//           dotSize={5}
//           gap={15}
//           baseColor={baseColor}
//           activeColor={['#ff0080', '#6366f1', '#3b82f6']}
//           proximity={85}
//           shockRadius={170}
//           shockStrength={3}
//           resistance={750}
//           returnDuration={1.5}
//         />

//         <Header />

//         {/* Hero - Full height with gradient accent */}
//         <Box
//           position="relative"
//           minH="100vh"
//           display="flex"
//           alignItems="center"
//           _before={{
//             content: '""',
//             position: 'absolute',
//             top: 0,
//             right: 0,
//             width: '40%',
//             height: '100%',
//             bgGradient: 'gradients.jewel',
//             opacity: 0.05,
//             transform: 'skewX(-12deg)',
//             transformOrigin: 'top right'
//           }}
//         >
//           <Container maxW="container.xl" zIndex={1}>
//             <AboutPart />
//           </Container>
//         </Box>

//         {/* TechSkills - Diagonal clip top */}
//         <Box
//           position="relative"
//           bg="surface.card"
//           py={{ base: 20, md: 32 }}
//           mt={-20}
//           clipPath="polygon(0 5%, 100% 0, 100% 100%, 0 100%)"
//         >
//           <Container maxW="container.xl" pt={16}>
//             <TechSkills />
//           </Container>
//         </Box>

//         {/* ContributionMap - Angled both sides */}
//         <Box
//           position="relative"
//           py={{ base: 20, md: 28 }}
//           clipPath="polygon(0 3%, 100% 0, 100% 97%, 0 100%)"
//           mt={-12}
//         >
//           <Container maxW="container.xl">
//             <ContributionMap />
//           </Container>
//         </Box>

//         {/* Learning - Diagonal clip bottom */}
//         <Box
//           position="relative"
//           bg="surface.card"
//           py={{ base: 20, md: 28 }}
//           mt={-12}
//           clipPath="polygon(0 0, 100% 3%, 100% 100%, 0 97%)"
//         >
//           <Container maxW="container.xl">
//             <Learning />
//           </Container>
//         </Box>

//         {/* Certificates */}
//         <Box py={{ base: 16, md: 24 }}>
//           <Container maxW="container.xl">
//             <Certificates />
//           </Container>
//         </Box>

//         {/* Hobbies - Gradient background */}
//         <Box
//           position="relative"
//           py={{ base: 20, md: 28 }}
//           _before={{
//             content: '""',
//             position: 'absolute',
//             inset: 0,
//             bgGradient: 'gradients.jewel',
//             opacity: 0.03
//           }}
//         >
//           <Container maxW="container.xl" position="relative" zIndex={1}>
//             <Hobbies />
//           </Container>
//         </Box>

//         {/* Resume - CTA Section */}
//         <Box bg="surface.card" py={{ base: 20, md: 32 }}>
//           <Container maxW="container.lg">
//             <Resume />
//           </Container>
//         </Box>

//         <Footer />
      
//     </>
//   );
// };

// /**
//  * LAYOUT OPTION 3: Offset Cards with Sticky Elements
//  * Cards slide in from alternating sides, creates rhythm
//  */
// const AboutPageOffset = () => {
//   const { scrollYProgress } = useScroll();
//   const baseColor = useColorModeValue("#d4dadc", '#1a1a1a');

//   return (
//     <>
//       <motion.div
//         style={{
//           scaleX: scrollYProgress,
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           height: '4px',
//           background: 'linear-gradient(to right, #059669, #2563eb, #9333ea)',
//           transformOrigin: '0%',
//           zIndex: 9999
//         }}
//       />

//       <Box position="relative" bg="bg.secondary">
//         <DotGrid
//           dotSize={5}
//           gap={15}
//           baseColor={baseColor}
//           activeColor={['#ff0080', '#6366f1', '#3b82f6']}
//           proximity={85}
//           shockRadius={170}
//           shockStrength={3}
//           resistance={750}
//           returnDuration={1.5}
//         />

//         <Header />

//         {/* Hero - Full width */}
//         <Box minH="100vh" display="flex" alignItems="center" py={20}>
//           <Container maxW="container.xl">
//             <AboutPart />
//           </Container>
//         </Box>

//         <Container maxW="container.xl" py={12}>
//           <VStack spacing={20} align="stretch">
//             {/* Left Aligned */}
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.6 }}
//             >
//               <Box
//                 bg="surface.card"
//                 borderRadius="2xl"
//                 p={{ base: 8, md: 12 }}
//                 borderWidth="1px"
//                 borderColor="border.primary"
//                 maxW={{ base: "100%", lg: "85%" }}
//                 ml={0}
//                 position="relative"
//                 _before={{
//                   content: '""',
//                   position: 'absolute',
//                   left: -4,
//                   top: "20%",
//                   height: "60%",
//                   width: "4px",
//                   bgGradient: "gradients.jewel",
//                   borderRadius: "full"
//                 }}
//               >
//                 <TechSkills />
//               </Box>
//             </motion.div>

//             {/* Right Aligned */}
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.6 }}
//             >
//               <Box
//                 bg="surface.card"
//                 borderRadius="2xl"
//                 p={{ base: 8, md: 12 }}
//                 borderWidth="1px"
//                 borderColor="border.primary"
//                 maxW={{ base: "100%", lg: "85%" }}
//                 ml={{ base: 0, lg: "auto" }}
//               >
//                 <ContributionMap />
//               </Box>
//             </motion.div>

//             {/* Left Aligned */}
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.6 }}
//             >
//               <Box
//                 bg="surface.card"
//                 borderRadius="2xl"
//                 p={{ base: 8, md: 12 }}
//                 borderWidth="1px"
//                 borderColor="border.primary"
//                 maxW={{ base: "100%", lg: "85%" }}
//               >
//                 <Learning />
//               </Box>
//             </motion.div>

//             {/* Right Aligned */}
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.6 }}
//             >
//               <Box
//                 bg="surface.card"
//                 borderRadius="2xl"
//                 p={{ base: 8, md: 12 }}
//                 borderWidth="1px"
//                 borderColor="border.primary"
//                 maxW={{ base: "100%", lg: "85%" }}
//                 ml={{ base: 0, lg: "auto" }}
//               >
//                 <Certificates />
//               </Box>
//             </motion.div>

//             {/* Center - Hobbies */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               <Box
//                 bg="surface.card"
//                 borderRadius="2xl"
//                 p={{ base: 8, md: 12 }}
//                 borderWidth="1px"
//                 borderColor="border.primary"
//               >
//                 <Hobbies />
//               </Box>
//             </motion.div>

//             {/* Resume - Full width CTA */}
//             <Box
//               bg="surface.card"
//               borderRadius="2xl"
//               p={{ base: 10, md: 16 }}
//               borderWidth="1px"
//               borderColor="border.primary"
//               textAlign="center"
//               position="relative"
//               overflow="hidden"
//               _before={{
//                 content: '""',
//                 position: 'absolute',
//                 inset: 0,
//                 bgGradient: 'gradients.jewel',
//                 opacity: 0.08
//               }}
//             >
//               <Box position="relative" zIndex={1}>
//                 <Resume />
//               </Box>
//             </Box>
//           </VStack>
//         </Container>

//         <Footer />
//       </Box>
//     </>
//   );
// };

// export default AboutPageOffset; // My recommended default
// export {  AboutPageDiagonal };
// import React from 'react';
// import AboutPart from '../components/AboutPageBits/AboutPart'
// import Hobbies from '../components/AboutPageBits/Hobbies';
// import Certificates from '../components/AboutPageBits/Certificates';
// import TechSkills from '../components/AboutPageBits/TechSkills';
// import ContributionMap from '../components/AboutPageBits/ContributionMap';
// import Learning from '../components/AboutPageBits/Learning';
// import Resume from '../components/Resume';
// import DotGrid from '../components/assets/DotGrid/DotGrid';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import {motion,useScroll} from 'framer-motion'
// import {  useColorModeValue } from '@chakra-ui/react';
// function AboutPage() {
//   const {scrollYProgress}= useScroll();
//   const gradientColors=useColorModeValue(

//     ['#ff0080', '#6366f1', '#3b82f6'], // light mode: pink → indigo → blue
//     ['#ff00ff', '#8000ff', '#0080ff']  // dark mode: lighter versions
//   );
//   const baseColor = useColorModeValue("#d4dadc", '#1a1a1a');
//   return (
//     <>
//       <motion.div
//       style={{
//         scaleX: scrollYProgress,
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         right:'4px',
//         background: 'linear(to-r, #059669, #2563eb, #9333ea)',
//         transformOrigin: '0%',
//         zIndex: 9999
//       }}/>
//           <>
//             <DotGrid
//             dotSize={5}
//             gap={15}
//             baseColor={baseColor}
//             activeColor={gradientColors}
//             proximity={85}
//             shockRadius={170}
//             shockStrength={3}
//             resistance={750}
//             returnDuration={1.5}/>
//             <Header/>
//             <AboutPart />
//             <Hobbies />
//             <Certificates />
//             <TechSkills />
//             <Learning/>
//             <ContributionMap />
//             <Resume />
//             <Footer/>
//           </>
//     </>
//   );
// }
// // Add contacts here
// export default AboutPage;


/**
 * LAYOUT 1: Split-Screen (Left Profile Sticky, Right Scrollable)
 * Modern, personal branding focused
 */
// export const AboutPageSplitScreen = () => {
//   const { scrollYProgress } = useScroll();
//   const baseColor = useColorModeValue("#d4dadc", '#1a1a1a');

//   return (
//     <>
//       <motion.div
//         style={{
//           scaleX: scrollYProgress,
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           height: '4px',
//           background: 'linear-gradient(to right, #059669, #2563eb, #9333ea)',
//           transformOrigin: '0%',
//           zIndex: 9999
//         }}
//       />

//       <Box position="relative" bg="transparent" minH="100vh">
//         <DotGrid
//           dotSize={5}
//           gap={15}
//           baseColor={baseColor}
//           activeColor={['#ff0080', '#6366f1', '#3b82f6']}
//         />

//         <Header />

//         <Grid
//           templateColumns={{ base: '1fr', lg: '400px 1fr' }}
//           gap={0}
//           position="relative"
//         >
//           {/* LEFT SIDEBAR - STICKY */}
//           <GridItem
//             position={{ base: 'relative', lg: 'sticky' }}
//             top="80px"
//             h={{ base: 'auto', lg: 'calc(100vh - 80px)' }}
//             bg="transparent"
//             borderRightWidth={{ base: 0, lg: '1px' }}
//             borderColor="border.primary"
//             overflowY="auto"
//           >
//             <VStack spacing={8} p={8} align="stretch">
//               {/* Profile Image */}
//               <Box textAlign="center">
//                 <Avatar
//                   size="2xl"
//                   name="Your Name"
//                   src="/api/placeholder/200/200"
//                   mb={4}
//                   border="4px solid"
//                   borderColor="brand.400"
//                 />
//                 <Heading size="lg" mb={2}>Your Name</Heading>
//                 <Text color="text.muted" fontSize="md">
//                   Full Stack Developer
//                 </Text>
//                 <Badge
//                   mt={2}
//                   colorScheme="green"
//                   fontSize="sm"
//                   px={3}
//                   py={1}
//                   borderRadius="full"
//                 >
//                   Open to Work
//                 </Badge>
//               </Box>

//               <Divider />

//               {/* Quick Bio */}
//               <Box>
//                 <Text fontSize="sm" color="text.secondary" lineHeight="tall">
//                   Passionate developer building modern web applications with React and Node.js. 
//                   Love learning new technologies and solving complex problems.
//                 </Text>
//               </Box>

//               <Divider />

//               {/* Quick Stats */}
//               <SimpleGrid columns={2} spacing={4}>
//                 <Box textAlign="center" p={3} bg="bg.accent" borderRadius="lg">
//                   <Text fontSize="2xl" fontWeight="bold" color="brand.400">15+</Text>
//                   <Text fontSize="xs" color="text.muted">Projects</Text>
//                 </Box>
//                 <Box textAlign="center" p={3} bg="bg.accent" borderRadius="lg">
//                   <Text fontSize="2xl" fontWeight="bold" color="brand.400">2+</Text>
//                   <Text fontSize="xs" color="text.muted">Years</Text>
//                 </Box>
//                 <Box textAlign="center" p={3} bg="bg.accent" borderRadius="lg">
//                   <Text fontSize="2xl" fontWeight="bold" color="brand.400">8</Text>
//                   <Text fontSize="xs" color="text.muted">Certificates</Text>
//                 </Box>
//                 <Box textAlign="center" p={3} bg="bg.accent" borderRadius="lg">
//                   <Text fontSize="2xl" fontWeight="bold" color="brand.400">500+</Text>
//                   <Text fontSize="xs" color="text.muted">Contributions</Text>
//                 </Box>
//               </SimpleGrid>

//               <Divider />

//               {/* Social Links */}
//               <VStack align="stretch" spacing={2}>
//                 <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase">
//                   Connect
//                 </Text>
//                 <HStack justify="space-around">
//                   {['GitHub', 'LinkedIn', 'Twitter', 'Email'].map(social => (
//                     <IconButton
//                       key={social}
//                       icon={<Box w={5} h={5} bg="brand.400" borderRadius="md" />}
//                       size="lg"
//                       variant="ghost"
//                       colorScheme="brand"
//                       aria-label={social}
//                     />
//                   ))}
//                 </HStack>
//               </VStack>

//               {/* Resume Download */}
//               <Box
//                 as="button"
//                 w="full"
//                 py={3}
//                 bgGradient="gradients.jewel"
//                 color="white"
//                 borderRadius="lg"
//                 fontWeight="semibold"
//                 _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
//                 transition="all 0.3s"
//               >
//                 Download Resume
//               </Box>
//             </VStack>
//           </GridItem>

//           {/* RIGHT CONTENT - SCROLLABLE */}
//           <GridItem>
//             <VStack spacing={0} align="stretch">
//               <Box py={{ base: 12, md: 20 }} px={{ base: 6, md: 12 }}>
//                 <AboutPart />
//               </Box>

//               <Box bg="transparent" py={{ base: 12, md: 16 }} px={{ base: 6, md: 12 }}>
//                 <TechSkills />
//               </Box>

//               <Box py={{ base: 12, md: 16 }} px={{ base: 6, md: 12 }}>
//                 <Learning />
//               </Box>

//               <Box bg="transparent" py={{ base: 12, md: 16 }} px={{ base: 6, md: 12 }}>
//                 <Certificates />
//               </Box>

//               <Box py={{ base: 12, md: 16 }} px={{ base: 6, md: 12 }}>
//                 <ContributionMap />
//               </Box>

//               <Box bg="transparent" py={{ base: 12, md: 16 }} px={{ base: 6, md: 12 }}>
//                 <Hobbies />
//               </Box>
//             </VStack>
//           </GridItem>
//         </Grid>

//         <Footer />
//       </Box>
//     </>
//   );
// };

/**
 * LAYOUT 2: Card-Based Modular Grid
 * Flexible, rearrangeable, great for theming
 */
// export const AboutPageCardModular = () => {
//   const { scrollYProgress } = useScroll();
//   const baseColor = useColorModeValue("#d4dadc", '#1a1a1a');

//   const CardWrapper = ({ children, ...props }) => (
//     <Box
//       bg="transparent"
//       borderRadius="2xl"
//       p={{ base: 6, md: 8 }}
//       borderWidth="1px"
//       borderColor="border.primary"
//       _hover={{ shadow: 'lg', borderColor: 'brand.400' }}
//       transition="all 0.3s"
//       {...props}
//     >
//       {children}
//     </Box>
//   );

//   return (
//     <>
//       <motion.div
//         style={{
//           scaleX: scrollYProgress,
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           height: '4px',
//           background: 'linear-gradient(to right, #059669, #2563eb, #9333ea)',
//           transformOrigin: '0%',
//           zIndex: 9999
//         }}
//       />

//       <Box position="relative" bg="transparent" minH="100vh">
//         <DotGrid
//           dotSize={5}
//           gap={15}
//           baseColor={baseColor}
//           activeColor={['#ff0080', '#6366f1', '#3b82f6']}
//         />

//         <Header />

//         <Container maxW="container.xl" py={12}>
//           <VStack spacing={6} align="stretch">
//             {/* Row 1: About + Skills */}
//             <Grid
//               templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
//               gap={6}
//             >
//               <CardWrapper>
//                 <AboutPart />
//               </CardWrapper>
//               <CardWrapper>
//                 <TechSkills />
//               </CardWrapper>
//             </Grid>

//             {/* Row 2: Learning + Hobbies */}
//             <Grid
//               templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
//               gap={6}
//             >
//               <CardWrapper>
//                 <Learning />
//               </CardWrapper>
//               <CardWrapper>
//                 <Hobbies />
//               </CardWrapper>
//             </Grid>

//             {/* Row 3: Certificates - Full Width */}
//             <CardWrapper>
//               <Certificates />
//             </CardWrapper>

//             {/* Row 4: Contribution Map - Full Width */}
//             <CardWrapper
//               position="relative"
//               overflow="hidden"
//               _before={{
//                 content: '""',
//                 position: 'absolute',
//                 inset: 0,
//                 bgGradient: 'linear(to-r, #059669, #2563eb, #9333ea)',
//                 opacity: 0.03
//               }}
//             >
//               <Box position="relative" zIndex={1}>
//                 <ContributionMap />
//               </Box>
//             </CardWrapper>

//             {/* Row 5: Resume - CTA Card */}
//             <CardWrapper
//               textAlign="center"
//               position="relative"
//               overflow="hidden"
//               _before={{
//                 content: '""',
//                 position: 'absolute',
//                 inset: 0,
//                 bgGradient: 'linear(to-r, #059669, #2563eb, #9333ea)',
//                 opacity: 0.05
//               }}
//             >
//               <Box position="relative" zIndex={1}>
//                 <Resume />
//               </Box>
//             </CardWrapper>
//           </VStack>
//         </Container>

//         <Footer />
//       </Box>
//     </>
//   );
// };

/**
 * LAYOUT 3: Timeline-Based Growth Story
 * Shows journey as a fresher developer
 */


/**
 * LAYOUT 4: Interactive Scroll-Driven (Advanced Animations)
 * Sections animate based on scroll position
 */


/**
 * LAYOUT 5: Minimal One-Pager with Smooth Scroll
 * Each section = one viewport, anchor navigation
 */


/**
 * LAYOUT 6: Developer Dashboard
 * Data-driven, stats-heavy, engineering mindset
 */
// export const AboutPageDashboard = () => {
//   const { scrollYProgress } = useScroll();
//   const baseColor = useColorModeValue("#d4dadc", '#1a1a1a');

//   const stats = [
//     { label: 'Projects Completed', value: '15', change: '+3 this month', color: 'green' },
//     { label: 'Technologies', value: '12', change: '+2 learning', color: 'blue' },
//     { label: 'Certifications', value: '8', change: 'All verified', color: 'purple' },
//     { label: 'GitHub Contributions', value: '500+', change: 'This year', color: 'teal' },
//   ];

//   return (
//     <>
//       <motion.div
//         style={{
//           scaleX: scrollYProgress,
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           height: '4px',
//           background: 'linear-gradient(to right, #059669, #2563eb, #9333ea)',
//           transformOrigin: '0%',
//           zIndex: 9999
//         }}
//       />

//       <Box position="relative" bg="transparent" minH="100vh">
//         <DotGrid
//           dotSize={5}
//           gap={15}
//           baseColor={baseColor}
//           activeColor={['#ff0080', '#6366f1', '#3b82f6']}
//         />

//         <Header />

//         <Container maxW="container.xl" py={8}>
//           {/* Dashboard Header */}
//           <VStack spacing={8} align="stretch">
//             <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
//               <Box>
//                 <Heading size="2xl" mb={2}>Developer Dashboard</Heading>
//                 <Text color="text.muted">Real-time overview of my skills and progress</Text>
//               </Box>
//               <HStack spacing={3}>
//                 <Badge colorScheme="green" fontSize="sm" px={3} py={1}>
//                   Active
//                 </Badge>
//                 <Badge colorScheme="blue" fontSize="sm" px={3} py={1}>
//                   Last updated: Today
//                 </Badge>
//               </HStack>
//             </Flex>

//             {/* Stats Grid */}
//             <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
//               {stats.map((stat, idx) => (
//                 <motion.div
//                   key={stat.label}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: idx * 0.1 }}
//                 >
//                   <Box
//                     bg="surface.card"
//                     p={6}
//                     borderRadius="xl"
//                     borderWidth="1px"
//                     borderColor="border.primary"
//                     position="relative"
//                     overflow="hidden"
//                     _hover={{ borderColor: 'brand.400', shadow: 'lg' }}
//                     transition="all 0.3s"
//                   >
//                     <VStack align="flex-start" spacing={2}>
//                       <Text fontSize="sm" color="text.muted" fontWeight="medium">
//                         {stat.label}
//                       </Text>
//                       <Heading size="2xl" color={`${stat.color}.400`}>
//                         {stat.value}
//                       </Heading>
//                       <Text fontSize="xs" color="text.muted">
//                         {stat.change}
//                       </Text>
//                     </VStack>
//                     <Box
//                       position="absolute"
//                       bottom={-2}
//                       left={0}
//                       right={0}
//                       h={1}
//                       bg={`${stat.color}.400`}
//                       opacity={0.3}
//                     />
//                   </Box>
//                 </motion.div>
//               ))}
//             </SimpleGrid>

//             {/* Main Dashboard Grid */}
//             <Grid
//               templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }}
//               gap={6}
//             >
//               {/* Profile Panel */}
//               <GridItem colSpan={{ base: 1, lg: 1 }} rowSpan={{ base: 1, lg: 2 }}>
//                 <Box
//                   bg="surface.card"
//                   borderRadius="xl"
//                   p={6}
//                   borderWidth="1px"
//                   borderColor="border.primary"
//                   h="full"
//                 >
//                   <AboutPart />
//                 </Box>
//               </GridItem>

//               {/* Skills Panel */}
//               <GridItem colSpan={{ base: 1, lg: 2 }}>
//                 <Box
//                   bg="surface.card"
//                   borderRadius="xl"
//                   p={6}
//                   borderWidth="1px"
//                   borderColor="border.primary"
//                   h="full"
//                 >
//                   <TechSkills />
//                 </Box>
//               </GridItem>

//               {/* Learning Progress */}
//               <GridItem colSpan={{ base: 1, lg: 2 }}>
//                 <Box
//                   bg="surface.card"
//                   borderRadius="xl"
//                   p={6}
//                   borderWidth="1px"
//                   borderColor="border.primary"
//                   h="full"
//                 >
//                   <Learning />
//                 </Box>
//               </GridItem>
//             </Grid>

//             {/* Wide Panels */}
//             <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
//               <Box
//                 bg="surface.card"
//                 borderRadius="xl"
//                 p={6}
//                 borderWidth="1px"
//                 borderColor="border.primary"
//               >
//                 <Certificates />
//               </Box>

//               <Box
//                 bg="surface.card"
//                 borderRadius="xl"
//                 p={6}
//                 borderWidth="1px"
//                 borderColor="border.primary"
//               >
//                 <Hobbies />
//               </Box>
//             </Grid>

//             {/* Full Width Contribution Graph */}
//             <Box
//               bg="surface.card"
//               borderRadius="xl"
//               p={6}
//               borderWidth="1px"
//               borderColor="border.primary"
//               position="relative"
//               overflow="hidden"
//             >
//               <Box
//                 position="absolute"
//                 top={0}
//                 left={0}
//                 right={0}
//                 h="2px"
//                 bgGradient="linear(to-r, #059669, #2563eb, #9333ea)"
//               />
//               <ContributionMap />
//             </Box>

//             {/* Resume CTA */}
//             <Box
//               bg="surface.card"
//               borderRadius="xl"
//               p={10}
//               borderWidth="2px"
//               borderColor="brand.400"
//               textAlign="center"
//               position="relative"
//               overflow="hidden"
//               _before={{
//                 content: '""',
//                 position: 'absolute',
//                 inset: 0,
//                 bgGradient: 'linear(to-r, #059669, #2563eb, #9333ea)',
//                 opacity: 0.05
//               }}
//             >
//               <Box position="relative" zIndex={1}>
//                 <Resume />
//               </Box>
//             </Box>
//           </VStack>
//         </Container>

//         <Footer />
//       </Box>
//     </>
//   );
// };

/**
 * LAYOUT 7: Floating Islands / Layers
 * Creative, depth-based design with parallax
 */
// export const AboutPageFloatingIslands = () => {
//   const { scrollYProgress } = useScroll();
//   const baseColor = useColorModeValue("#d4dadc", '#1a1a1a');
  
//   // Parallax effects
//   const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
//   const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
//   const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '70%']);

//   return (
//     <>
//       <motion.div
//         style={{
//           scaleX: scrollYProgress,
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           height: '4px',
//           background: 'linear-gradient(to right, #059669, #2563eb, #9333ea)',
//           transformOrigin: '0%',
//           zIndex: 9999
//         }}
//       />

//       <Box position="relative" bg="bg.secondary" minH="100vh" overflow="hidden">
//         <DotGrid
//           dotSize={5}
//           gap={15}
//           baseColor={baseColor}
//           activeColor={['#ff0080', '#6366f1', '#3b82f6']}
//         />

//         <Header />

//         <Container maxW="container.xl" py={20} position="relative">
//           <VStack spacing={24} align="stretch">
//             {/* Island 1 - About (Front layer) */}
//             <motion.div style={{ y: y1 }}>
//               <Box
//                 bg="surface.card"
//                 borderRadius="3xl"
//                 p={{ base: 8, md: 12 }}
//                 borderWidth="1px"
//                 borderColor="border.primary"
//                 shadow="2xl"
//                 transform="rotate(-1deg)"
//                 _hover={{ transform: 'rotate(0deg) scale(1.02)', shadow: '2xl' }}
//                 transition="all 0.4s"
//                 position="relative"
//                 _before={{
//                   content: '""',
//                   position: 'absolute',
//                   inset: -4,
//                   borderRadius: '3xl',
//                   bgGradient: 'linear(to-r, #059669, #2563eb, #9333ea)',
//                   opacity: 0.1,
//                   zIndex: -1,
//                   filter: 'blur(20px)'
//                 }}
//               >
//                 <AboutPart />
//               </Box>
//             </motion.div>

//             {/* Island 2 - Skills (Middle layer) */}
//             <motion.div style={{ y: y2 }}>
//               <Box
//                 bg="surface.card"
//                 borderRadius="3xl"
//                 p={{ base: 8, md: 12 }}
//                 borderWidth="1px"
//                 borderColor="border.primary"
//                 shadow="xl"
//                 transform="rotate(1deg)"
//                 ml={{ base: 0, md: 12 }}
//                 _hover={{ transform: 'rotate(0deg) scale(1.02)' }}
//                 transition="all 0.4s"
//               >
//                 <TechSkills />
//               </Box>
//             </motion.div>

//             {/* Island 3 - Learning (Back layer) */}
//             <motion.div style={{ y: y3 }}>
//               <Box
//                 bg="surface.card"
//                 borderRadius="3xl"
//                 p={{ base: 8, md: 12 }}
//                 borderWidth="1px"
//                 borderColor="border.primary"
//                 shadow="lg"
//                 transform="rotate(-0.5deg)"
//                 mr={{ base: 0, md: 12 }}
//                 _hover={{ transform: 'rotate(0deg) scale(1.02)' }}
//                 transition="all 0.4s"
//               >
//                 <Learning />
//               </Box>
//             </motion.div>

//             {/* Regular stacked islands */}
//             <Box
//               bg="surface.card"
//               borderRadius="3xl"
//               p={{ base: 8, md: 12 }}
//               borderWidth="1px"
//               borderColor="border.primary"
//               shadow="xl"
//             >
//               <Certificates />
//             </Box>

//             <Box
//               bg="surface.card"
//               borderRadius="3xl"
//               p={{ base: 8, md: 12 }}
//               borderWidth="1px"
//               borderColor="border.primary"
//               shadow="xl"
//               ml={{ base: 0, md: 8 }}
//             >
//               <ContributionMap />
//             </Box>

//             <Box
//               bg="surface.card"
//               borderRadius="3xl"
//               p={{ base: 8, md: 12 }}
//               borderWidth="1px"
//               borderColor="border.primary"
//               shadow="2xl"
//               position="relative"
//               overflow="hidden"
//               _before={{
//                 content: '""',
//                 position: 'absolute',
//                 inset: 0,
//                 bgGradient: 'linear(to-r, #059669, #2563eb, #9333ea)',
//                 opacity: 0.08
//               }}
//             >
//               <Box position="relative" zIndex={1}>
//                 <Resume />
//               </Box>
//             </Box>
//           </VStack>
//         </Container>

//         <Footer />
//       </Box>
//     </>
//   );
// };

// Export all layouts
// export default AboutPageDashboard;

import React, { useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useColorModeValue } from '@chakra-ui/react';

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

// Wrapper for parallax sections
const ParallaxSection = ({ children, speed = 0.5, direction = 1 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to Y position
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    [100 * direction * speed, -100 * direction * speed]
  );
  
  // Add spring physics for smooth motion
  const springY = useSpring(y, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Box ref={ref} position="relative">
      <motion.div style={{ y: springY }}>
        {children}
      </motion.div>
    </Box>
  );
};

// Fade in as section enters viewport
const FadeInSection = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.5"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <Box ref={ref}>
      <motion.div 
        style={{ opacity, scale }}
        transition={{ delay }}
      >
        {children}
      </motion.div>
    </Box>
  );
};

function AboutPage() {
  const { scrollYProgress } = useScroll();
  
  const gradientColors = useColorModeValue(
    ['#ff0080', '#6366f1', '#3b82f6'],
    ['#ff00ff', '#8000ff', '#0080ff']
  );
  
  const baseColor = useColorModeValue("#d4dadc", '#1a1a1a');
  
  // Progress bar background
  const progressBg = useColorModeValue(
    'linear-gradient(to right, #059669, #2563eb, #9333ea)',
    'linear-gradient(to right, #10b981, #3b82f6, #a855f7)'
  );

  return (
    <Box position="relative" overflow="hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: progressBg,
          transformOrigin: '0%',
          zIndex: 9999
        }}
      />

      {/* Animated Dot Grid Background */}
      <DotGrid
        dotSize={5}
        gap={15}
        baseColor={baseColor}
        activeColor={gradientColors}
        proximity={85}
        shockRadius={170}
        shockStrength={3}
        resistance={750}
        returnDuration={1.5}
      />

      {/* Fixed Header */}
      <Header />

      {/* Main Content with Parallax Layers */}
      <Box position="relative" zIndex={1}>
        
        {/* About Section - Slow upward parallax */}
        <FadeInSection>
          <ParallaxSection speed={0.3} direction={1}>
            <AboutPart />
          </ParallaxSection>
        </FadeInSection>

        {/* Hobbies - Faster downward parallax */}
        <FadeInSection delay={0.1}>
          <ParallaxSection speed={0.6} direction={-1}>
            <Hobbies />
          </ParallaxSection>
        </FadeInSection>

        {/* Certificates - Slow upward */}
        <FadeInSection delay={0.2}>
          <ParallaxSection speed={0.4} direction={1}>
            <Certificates />
          </ParallaxSection>
        </FadeInSection>

        {/* Tech Skills - Medium speed downward */}
        <FadeInSection delay={0.1}>
          <ParallaxSection speed={0.5} direction={-1}>
            <TechSkills />
          </ParallaxSection>
        </FadeInSection>

        {/* Learning - Slow upward */}
        <FadeInSection delay={0.2}>
          <ParallaxSection speed={0.35} direction={1}>
            <Learning />
          </ParallaxSection>
        </FadeInSection>

        {/* Contribution Map - Subtle parallax */}
        <FadeInSection delay={0.15}>
          <ParallaxSection speed={0.3} direction={-1}>
            <ContributionMap />
          </ParallaxSection>
        </FadeInSection>

        {/* Resume - Final section, gentle parallax */}
        <FadeInSection delay={0.1}>
          <ParallaxSection speed={0.2} direction={1}>
            <Resume />
          </ParallaxSection>
        </FadeInSection>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default AboutPage;