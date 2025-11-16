// import React from "react";
// import { Container, Button, Box, VStack, Heading } from '@chakra-ui/react';
// import pdf from "./assets/Anandita_Dakshayani_Garimella.pdf";
// import { motion } from 'framer-motion';
// import { FaFileDownload} from 'react-icons/fa';
// // Motion components
// const MotionBox = motion.create(Box);
// const MotionHeading = motion.create(Heading);
// const MotionText = motion.create(Text);
// // Animation variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { 
//     opacity: 1, 
//     y: 0,
//     transition: { duration: 0.6, ease: "easeOut" }
//   }
// };

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.2
//     }
//   }
// };

// function Resume() {
//   return (
//     <Box bg="transparent" minH="100vh" py={20} id="resume">
//       <Container maxW="container.xl">
//         <VStack spacing={8}>
//           <Heading color="#14b8a6" size="2xl">Resume</Heading>
          
//             <MotionBox variants={fadeInUp} textAlign="center">
//               <Button
//                 as="a"
//                 href="/path-to-your-resume.pdf"
//                 download
//                 size="lg"
//                 colorScheme="teal"
//                 px={10}
//                 py={7}
//                 fontSize="md"
//                 fontWeight="600"
//                 leftIcon={<FaFileDownload />}
//                 _hover={{
//                   transform: 'translateY(-2px)',
//                   boxShadow: '0 8px 25px rgba(20, 184, 166, 0.4)'
//                 }}
//                 transition="all 0.3s"
//               >
//                 Download Resume
//               </Button>
//             </MotionBox>

//           {/* Simple iframe - works everywhere */}
//           <Box
//             as="iframe"
//             src={`${pdf}#toolbar=0`}
//             width="60%"
//             height="800px"
//             border="none"
//             borderRadius="lg"
//             bg="white"
//           />
//         </VStack>
//       </Container>
//     </Box>
//   );
// }

// export default Resume;
import React from "react";
import { Container, Button, Box, VStack, Heading, Text } from '@chakra-ui/react';
import pdf from "./assets/Anandita_Dakshayani_Garimella.pdf";
import { motion } from 'framer-motion';
import { FaFileDownload } from 'react-icons/fa';

// Motion components
const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

function Resume() {
  return (
    <Box bg="transparent" minH="100vh" py={20} id="resume">
      <Container maxW="container.xl">
        <VStack spacing={8}>
          <MotionHeading 
            color="brand.400" 
            size="2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Resume
          </MotionHeading>
          
          <MotionBox 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            textAlign="center"
          >
            <Button
              as="a"
              href={pdf}
              download
              size="lg"
              bg="brand.400"
              color="white"
              px={10}
              py={7}
              fontSize="md"
              fontWeight="600"
              leftIcon={<FaFileDownload />}
              _hover={{
                bg: 'brand.500',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(20, 184, 166, 0.4)'
              }}
              transition="all 0.3s"
            >
              Download Resume
            </Button>
          </MotionBox>

          {/* Simple iframe - works everywhere */}
          <Box
            as="iframe"
            src={`${pdf}#toolbar=0`}
            width="60%"
            height="800px"
            border="none"
            borderRadius="lg"
            bg="white"
          />
        </VStack>
      </Container>
    </Box>
  );
}

export default Resume;