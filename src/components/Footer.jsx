// import React from "react";
// import {
//   Box,
//   Container,
//   Text,
//   Heading,
//   HStack,
//   VStack,
//   Link,
//   IconButton,
//   Divider,
//   Kbd,
//   SimpleGrid,
// } from "@chakra-ui/react";
// import { motion } from "framer-motion";
// import {
//   FaGithub,
//   FaLinkedin,
//   FaEnvelope,
//   FaPhone,
//   FaExternalLinkAlt,
//   FaHeart,
// } from "react-icons/fa";
// // Motion wrapper
// const MotionBox = motion.create(Box);

// export default function Footer() {
//   const socialLinks = [
//     { id: 1, name: "GitHub", icon: FaGithub, url: "https://github.com/anandita-3217" },
//     { id: 2, name: "LinkedIn", icon: FaLinkedin, url: "https://linkedin.com/in/anandita-dakshayani-9621a0199" },
//     { id: 3, name: "Mail", icon: FaEnvelope, url: "mailto:ananditad21@gmail.com" },
//     { id: 4, name: "Phone", icon: FaPhone, url: "tel:+1234567890" },
//   ];

//   return (
//     <Box
//       as="footer"
//     //   bg="rgba(15,15,15,0.6)"
//     bg="transparent"
//       borderTop="1px solid"
//       borderColor="gray.700"
//       backdropFilter="blur(10px)"
//       pt={10}
//       pb={6}
//       color="gray.300"
//     >
//       <MotionBox
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.5 }}
//       >
//         <Container maxW="7xl">
//           <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
//             {/* About Section */}
//             <VStack align="flex-start" spacing={4}>
//               <Heading size="md" color="#14b8a6">
//                 Anandita Dakshayani
//               </Heading>
//               <Text fontSize="sm" color="gray.400" maxW="xs">
//                 Full Stack Developer and Machine Learning Enthusiast.
//               </Text>
//             </VStack>

//             {/* Quick Links */}
//             <VStack align="flex-start" spacing={3}>
//               <Heading size="md" color="#14b8a6">
//                 Quick Links
//               </Heading>
//               <VStack align="flex-start" spacing={2}>
//                 <Link href="#about" fontSize="sm" _hover={{ color: "#14b8a6" }}>
//                   About Me
//                 </Link>
//                 <Link href="#projects" fontSize="sm" _hover={{ color: "#14b8a6" }}>
//                   Projects
//                 </Link>
//                 <Link
//                   href="#resume"
//                   fontSize="sm"
//                   isExternal
//                   _hover={{ color: "#14b8a6" }}
//                 >
//                   Resume <FaExternalLinkAlt style={{ display: "inline", marginLeft: 4 }} />
//                 </Link>
//               </VStack>
//             </VStack>

//             {/* Connect Section */}
//             <VStack align="flex-start" spacing={4}>
//               <Heading size="md" color="#14b8a6">
//                 Connect
//               </Heading>
//               <HStack spacing={3} flexWrap="wrap">
//                 {socialLinks.map((social) => (
//                   <IconButton
//                     key={social.id}
//                     as="a"
//                     href={social.url}
//                     target="_blank"
//                     aria-label={social.name}
//                     icon={<social.icon />}
//                     variant="ghost"
//                     bg="gray.800"
//                     _hover={{
//                       bg: "rgba(20,184,166,0.1)",
//                       color: "#14b8a6",
//                     }}
//                     borderRadius="full"
//                   />
//                 ))}
//               </HStack>
//             </VStack>

//             {/* Keyboard Shortcuts */}
//             <VStack align="flex-start" spacing={4}>
//               <Heading size="md" color="#14b8a6">
//                 Keyboard Shortcuts
//               </Heading>
//               <VStack align="flex-start" spacing={2}>
//                 <HStack>
//                   <HStack spacing={1}>
//                     <Kbd>⌘</Kbd>
//                     <Kbd>K</Kbd>
//                   </HStack>
//                   <Text fontSize="sm" color="gray.400">
//                     Search
//                   </Text>
//                 </HStack>
//                 <HStack>
//                   <Kbd>T</Kbd>
//                   <Text fontSize="sm" color="gray.400">
//                     Toggle theme
//                   </Text>
//                 </HStack>
//               </VStack>
//             </VStack>
//           </SimpleGrid>

//           <MotionBox
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             mt={10}
//           >
//             <Divider borderColor="gray.700" mb={4} />
//             <HStack
//               justify="space-between"
//               align={{ base: "center", md: "center" }}
//               flexDir={{ base: "column", md: "row" }}
//               spacing={4}
//             >
//               <HStack fontSize="sm" color="gray.500" spacing={2}>
//                 <Text>Built with</Text>
//                 <FaHeart color="#14b8a6" />
//                 <Text>using React & Chakra UI</Text>
//               </HStack>
//             </HStack>
//           </MotionBox>
//         </Container>
//       </MotionBox>
//     </Box>
//   );
// }

import React from "react";
import {
  Box,
  Container,
  Text,
  Heading,
  HStack,
  VStack,
  Link,
  IconButton,
  Divider,
  Kbd,
  SimpleGrid,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaExternalLinkAlt,
  FaHeart,
} from "react-icons/fa";

// Motion wrapper
const MotionBox = motion.create(Box);

export default function Footer() {
  const socialLinks = [
    { id: 1, name: "GitHub", icon: FaGithub, url: "https://github.com/anandita-3217" },
    { id: 2, name: "LinkedIn", icon: FaLinkedin, url: "https://linkedin.com/in/anandita-dakshayani-9621a0199" },
    { id: 3, name: "Mail", icon: FaEnvelope, url: "mailto:ananditad21@gmail.com" },
    { id: 4, name: "Phone", icon: FaPhone, url: "tel:+1234567890" },
  ];

  return (
    <Box
      as="footer"
      bg="transparent"
      borderTop="1px solid"
      borderColor="border.secondary"
      backdropFilter="blur(10px)"
      pt={10}
      pb={6}
      color="text.secondary"
    >
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Container maxW="7xl">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            {/* About Section */}
            <VStack align="flex-start" spacing={4}>
              <Heading size="md" color="brand.400">
                Anandita Dakshayani
              </Heading>
              <Text fontSize="sm" color="text.secondary" maxW="xs">
                Full Stack Developer and Machine Learning Enthusiast.
              </Text>
            </VStack>

            {/* Quick Links */}
            <VStack align="flex-start" spacing={3}>
              <Heading size="md" color="brand.400">
                Quick Links
              </Heading>
              <VStack align="flex-start" spacing={2}>
                <Link href="#about" fontSize="sm" _hover={{ color: "brand.400" }}>
                  About Me
                </Link>
                <Link href="#projects" fontSize="sm" _hover={{ color: "brand.400" }}>
                  Projects
                </Link>
                <Link
                  href="#resume"
                  fontSize="sm"
                  isExternal
                  _hover={{ color: "brand.400" }}
                >
                  Resume <FaExternalLinkAlt style={{ display: "inline", marginLeft: 4 }} />
                </Link>
              </VStack>
            </VStack>

            {/* Connect Section */}
            <VStack align="flex-start" spacing={4}>
              <Heading size="md" color="brand.400">
                Connect
              </Heading>
              <HStack spacing={3} flexWrap="wrap">
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.id}
                    as="a"
                    href={social.url}
                    target="_blank"
                    aria-label={social.name}
                    icon={<social.icon />}
                    variant="ghost"
                    bg="bg.hover"
                    _hover={{
                      bg: "rgba(20,184,166,0.1)",
                      color: "brand.400",
                    }}
                    borderRadius="full"
                  />
                ))}
              </HStack>
            </VStack>

            {/* Keyboard Shortcuts */}
            <VStack align="flex-start" spacing={4}>
              <Heading size="md" color="brand.400">
                Keyboard Shortcuts
              </Heading>
              <VStack align="flex-start" spacing={2}>
                <HStack>
                  <HStack spacing={1}>
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                  </HStack>
                  <Text fontSize="sm" color="text.secondary">
                    Search
                  </Text>
                </HStack>
                <HStack>
                  <Kbd>T</Kbd>
                  <Text fontSize="sm" color="text.secondary">
                    Toggle theme
                  </Text>
                </HStack>
              </VStack>
            </VStack>
          </SimpleGrid>

          <MotionBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            mt={10}
          >
            <Divider borderColor="border.secondary" mb={4} />
            <HStack
              justify="space-between"
              align={{ base: "center", md: "center" }}
              flexDir={{ base: "column", md: "row" }}
              spacing={4}
            >
              <HStack fontSize="sm" color="text.secondary" spacing={2}>
                <Text>Built with</Text>
                <FaHeart color="#14b8a6" />
                <Text>using React & Chakra UI</Text>
              </HStack>
            </HStack>
          </MotionBox>
        </Container>
      </MotionBox>
    </Box>
  );
}