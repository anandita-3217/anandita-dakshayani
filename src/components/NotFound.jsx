// import React from "react"
// import {  Box,
//   Container,
//   Button,
//   VStack,
//   HStack,
//   Image} from '@chakra-ui/react'
// import { motion } from 'framer-motion';
// import Error from "./assets/Error404.gif"
// // Create motion components
// const MotionBox = motion(Box);
// const MotionButton = motion(Button);
// const MotionImage = motion(Image);

// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { 
//     opacity: 1, 
//     y: 0,
//     transition: { duration: 0.6, ease: "easeOut" }
//   }
// };


// const scaleIn = {
//   hidden: { opacity: 0, scale: 0.8 },
//   visible: { 
//     opacity: 1, 
//     scale: 1,
//     transition: { duration: 0.5, ease: "easeOut" }
//   }
// };
// // Animation variants

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.2,
//       delayChildren: 0.1
//     }
//   }
// };
// function NotFound(){
//     return (
//         <Box id="notFound" bg="transparent" >
//             <Container maxW="container.xl" position="relative" zIndex={1}>
//                 <MotionBox
//                     initial="hidden"
//                     animate="visible"
//                     variants={staggerContainer}
//                     position="relative"
//                     display="flex"
//                     flexDirection="column"
//                     alignItems="center"
//                     justifyContent="center"
//                     >
//                       {/* Coding Image with float animation */}
//                     <MotionImage
//                     src={Error}
//                     alt="Coding"
//                     boxSize={{ base: "200px", md: "250px", lg: "300px" }}
//                     variants={scaleIn}
//                     animate={{
//                     y: [0, -20, 0]
//                     }}
//                     transition={{
//                         duration: 4,
//                         repeat: Infinity,
//                         ease: "easeInOut"
//                     }}
//                     filter="drop-shadow(0 10px 30px rgba(20, 184, 166, 0.3))"
//                     />
//                                         <MotionButton
//                       as="a"
//                       href="#contact"
//                       variant="outline"
//                       size="lg"
//                       px={8}
//                       py={6}
//                       fontSize="md"
//                       fontWeight="600"
//                       bg="#0a0a0a"
//                       borderColor="#2a2a2a"
//                       color="white"
//                       _hover={{
//                         borderColor: '#14b8a6',
//                         color: '#14b8a6'
//                       }}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       Lost? Back to Home page
//                     </MotionButton>
//                     </MotionBox>
//             </Container>
//         </Box>
//     )
// }
// export default NotFound;
import React from "react"
import {  
  Box,
  Container,
  Button,
  VStack,
  Text,
  Code,
  Heading,
  Image
} from '@chakra-ui/react'
import { motion } from 'framer-motion';
import Error from "./assets/Error404.gif"

// Create motion components
const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionImage = motion(Image);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

function NotFound(){
    return (
        <Box 
          id="notFound" 
          bg="#0a0a0a" 
          minH="100vh"
          display="flex"
          alignItems="center"
          py={{ base: 12, md: 20 }}
        >
            <Container maxW="container.md" position="relative" zIndex={1}>
                <MotionBox
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    position="relative"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    >
                    {/* 404 Header */}
                    <MotionHeading
                      as="h1"
                      fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                      fontWeight="bold"
                      color="#14b8a6"
                      mb={4}
                      variants={fadeInUp}
                    >
                      404: Null Pointer Exception
                    </MotionHeading>

                    {/* Error Image with float animation */}
                    <MotionImage
                      src={Error}
                      alt="Error 404"
                      boxSize={{ base: "200px", md: "280px", lg: "350px" }}
                      variants={scaleIn}
                      animate={{
                        y: [0, -15, 0]
                      }}
                      transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                      }}
                      filter="drop-shadow(0 10px 30px rgba(20, 184, 166, 0.3))"
                      mb={8}
                    />

                    {/* Code Block */}
                    <MotionBox
                      variants={fadeInUp}
                      bg="#1a1a1a"
                      p={{ base: 4, md: 6 }}
                      borderRadius="xl"
                      border="2px solid"
                      borderColor="#2a2a2a"
                      mb={8}
                      maxW="500px"
                      w="full"
                      fontFamily="'Courier New', monospace"
                      fontSize={{ base: 'sm', md: 'md' }}
                      color="#e0e0e0"
                      textAlign="left"
                      _hover={{
                        borderColor: '#14b8a6',
                        boxShadow: '0 0 20px rgba(20, 184, 166, 0.2)'
                      }}
                      transition="all 0.3s"
                    >
                      <Code 
                        bg="transparent" 
                        color="#14b8a6" 
                        fontSize="inherit"
                        fontFamily="inherit"
                      >
                        try &#123;
                      </Code>
                      <br />
                      <Code 
                        bg="transparent" 
                        color="#e0e0e0" 
                        fontSize="inherit"
                        fontFamily="inherit"
                        pl={4}
                      >
                        findPage(requestedURL);
                      </Code>
                      <br />
                      <Code 
                        bg="transparent" 
                        color="#ff6b6b" 
                        fontSize="inherit"
                        fontFamily="inherit"
                      >
                        &#125; catch (PageNotFoundException e) &#123;
                      </Code>
                      <br />
                      <Code 
                        bg="transparent" 
                        color="#666" 
                        fontSize="inherit"
                        fontFamily="inherit"
                        pl={4}
                      >
                        // TODO: Maybe create this page?
                      </Code>
                      <br />
                      <Code 
                        bg="transparent" 
                        color="#e0e0e0" 
                        fontSize="inherit"
                        fontFamily="inherit"
                        pl={4}
                      >
                        return "Let's get you somewhere that exists";
                      </Code>
                      <br />
                      <Code 
                        bg="transparent" 
                        color="#ff6b6b" 
                        fontSize="inherit"
                        fontFamily="inherit"
                      >
                        &#125;
                      </Code>
                    </MotionBox>

                    {/* Error Message */}
                    <MotionText
                      variants={fadeInUp}
                      fontSize={{ base: 'md', md: 'lg' }}
                      color="#b0b0b0"
                      mb={8}
                      maxW="600px"
                    >
                      The page you're looking for doesn't exist. Either I forgot to build it, 
                      or you've discovered a bug. Let's get you back on track.
                    </MotionText>

                    {/* Action Buttons */}
                    <MotionBox variants={fadeInUp}>
                      <VStack spacing={4} w="full">
                        <MotionButton
                          as="a"
                          href="/"
                          colorScheme="teal"
                          size="lg"
                          px={10}
                          py={6}
                          fontSize="md"
                          fontWeight="600"
                          w={{ base: "full", sm: "auto" }}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: '0 8px 25px rgba(20, 184, 166, 0.4)'
                          }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          Return to Home
                        </MotionButton>

                        <MotionButton
                          as="a"
                          href="#projects"
                          variant="outline"
                          size="lg"
                          px={10}
                          py={6}
                          fontSize="md"
                          fontWeight="600"
                          borderColor="#2a2a2a"
                          color="white"
                          w={{ base: "full", sm: "auto" }}
                          _hover={{
                            borderColor: '#14b8a6',
                            color: '#14b8a6'
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          View Projects
                        </MotionButton>
                      </VStack>
                    </MotionBox>

                    {/* Footer Note */}
                    <MotionText
                      variants={fadeInUp}
                      fontSize="xs"
                      color="#666"
                      mt={12}
                      fontStyle="italic"
                    >
                      Error code: 404 | Status: Page not compiled
                    </MotionText>
                </MotionBox>
            </Container>
        </Box>
    )
}

export default NotFound;