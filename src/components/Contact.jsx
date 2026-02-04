// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Container,
//   Heading,
//   Text,
//   Button,
//   VStack,
//   HStack,
//   Grid,
//   GridItem,
//   Icon,
//   Link,
//   FormControl,
//   FormLabel,
//   Input,
//   Textarea,
//   useToast,
//   Spinner,
//   Center
// } from '@chakra-ui/react';
// import { motion } from 'framer-motion';
// import { FaGithub,FaLinkedin,FaEnvelope,FaCode,FaPhone,FaPaperPlane} from 'react-icons/fa';
// import { useForm, ValidationError } from '@formspree/react';

// const MotionBox = motion.create(Box);
// const MotionHeading = motion.create(Heading);
// const MotionText = motion.create(Text);
// const MotionGridItem = motion.create(GridItem);

// // Animation variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { 
//     opacity: 1, 
//     y: 0,
//     transition: { duration: 0.6, ease: "easeOut" }
//   }
// };

// const fadeInLeft = {
//   hidden: { opacity: 0, x: -30 },
//   visible: { 
//     opacity: 1, 
//     x: 0,
//     transition: { duration: 0.6, ease: "easeOut" }
//   }
// };

// const fadeInRight = {
//   hidden: { opacity: 0, x: 30 },
//   visible: { 
//     opacity: 1, 
//     x: 0,
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

// const iconMap = {
//   FaEnvelope,
//   FaLinkedin,
//   FaGithub,
//   FaPhone
// };

// function Contact() {
//   const toast = useToast();
//   const [contactLinks, setContactLinks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [state, handleSubmit] = useForm('mpwvrlbk');
//   useEffect(() => {
//     fetch('../data/contact.json')
//       .then(response => response.json())
//       .then(data => {
//         setContactLinks(data.contact || []);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error loading contact: ', error);
//         setLoading(false);
//       });
//   }, []);
//   const formRef = React.useRef();
//   useEffect(() => {
//     if(state.succeeded){
//       toast({
//         title: 'Message Sent!',
//         description: 'Message sent!',
//         status: 'success',
//         duration: 5000,
//         isClosable: true
//       });
//       if (formRef.current){
//         formRef.current.reset();
//       }
//     }
//   },[state.succeeded,toast]);

//   if (loading) {
//     return (
//       <Box
//         id="contact"
//         bg="transparent"
//         color="text.primary"
//         py={{ base: 16, md: 24 }}
//       >
//         <Container maxW="container.xl">
//           <Center h="400px">
//             <Spinner size="xl" color="brand.400" thickness="4px" />
//           </Center>
//         </Container>
//       </Box>
//     );
//   }

//   return (
//     <MotionBox>
//     <Box
//       id="contact"
//       bg="transparent"
//       color="text.primary"
//       py={{ base: 16, md: 24 }}
//       position="relative"
//       overflow="hidden"
//       p={90}
//     >
//       {/* Background decoration */}
//       <MotionBox
//         position="absolute"
//         bottom="10%"
//         right="10%"
//         w="300px"
//         h="300px"
//         bg="rgba(20, 184, 166, 0.05)"
//         borderRadius="full"
//         filter="blur(60px)"
//         animate={{
//           scale: [1, 1.3, 1],
//           opacity: [0.2, 0.4, 0.2]
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut"
//         }}
//       />

//       <Container maxW="container.xl" position="relative" zIndex={1}>
//         <MotionBox
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           variants={staggerContainer}
//         >
//           {/* Section Title */}
//           <MotionHeading
//             as="h2"
//             fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
//             fontWeight="bold"
//             textAlign="center"
//             mb={4}
//             variants={fadeInUp}
//           >
//             <Text as="span" color="brand.400">Get in Touch</Text>
//           </MotionHeading>

//           <MotionText
//             textAlign="center"
//             color="text.secondary"
//             fontSize={{ base: 'md', md: 'lg' }}
//             mb={12}
//             maxW="600px"
//             mx="auto"
//             lineHeight="1.8"
//             variants={fadeInUp}
//           >
//             I'm currently seeking software development opportunities. 
//             Feel free to reach out if you'd like to work together or just chat about tech!
//           </MotionText>

//           {/* Grid Layout */}
//           <Grid
//             templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
//             gap={8}
//             alignItems="start"
//           >
//             {/* Contact Form - Left */}
//             <MotionGridItem
//               variants={fadeInLeft}
//             >
//               <Box
//                 bg="bg.primary"
//                 p={8}
//                 borderRadius="xl"
//                 border="2px solid"
//                 borderColor="border.primary"
//                 _hover={{
//                   borderColor: 'brand.400',
//                   boxShadow: '0 8px 25px rgba(20, 184, 166, 0.1)'
//                 }}
//                 transition="all 0.3s"
//               >
//                 <Heading
//                   as="h3"
//                   fontSize={{ base: 'xl', md: '2xl' }}
//                   mb={6}
//                   color="text.primary"
//                 >
//                   Send me a message
//                 </Heading>
                
//                 <VStack spacing={5} as="form" onSubmit={handleSubmit} ref={formRef}>
//                   <FormControl isRequired>
//                     <FormLabel color="text.secondary" fontSize="sm">Name</FormLabel>
//                     <Input
//                       name="name"
//                       placeholder="Your name"
//                       bg="bg.secondary"
//                       border="1px solid"
//                       borderColor="border.primary"
//                       color="text.primary"
//                       _hover={{ borderColor: 'brand.400' }}
//                       _focus={{
//                         borderColor: 'brand.400',
//                         boxShadow: '0 0 0 1px #14b8a6'
//                       }}
//                       _placeholder={{ color: 'gray.500' }}
//                     />
//                   </FormControl>

//                   <FormControl isRequired>
//                     <FormLabel color="text.secondary" fontSize="sm">Email</FormLabel>
//                     <Input
//                       name="email"
//                       type="email"
//                       placeholder="your.email@example.com"
//                       bg="bg.secondary"
//                       border="1px solid"
//                       borderColor="border.primary"
//                       color="text.primary"
//                       _hover={{ borderColor: 'brand.400' }}
//                       _focus={{
//                         borderColor: 'brand.400',
//                         boxShadow: '0 0 0 1px #14b8a6'
//                       }}
//                       _placeholder={{ color: 'gray.500' }}
//                     />
//                     <ValidationError prefix="Email" field="email" errors={state.errors}/>
//                   </FormControl>

//                   <FormControl isRequired>
//                     <FormLabel color="text.secondary" fontSize="sm">Message</FormLabel>
//                     <Textarea
//                       name="message"
//                       placeholder="Your message..."
//                       rows={3}
//                       bg="bg.secondary"
//                       border="1px solid"
//                       borderColor="border.primary"
//                       color="text.primary"
//                       _hover={{ borderColor: 'brand.400' }}
//                       _focus={{
//                         borderColor: 'brand.400',
//                         boxShadow: '0 0 0 1px #14b8a6'
//                       }}
//                       _placeholder={{ color: 'gray.500' }}
//                       resize="vertical"
//                     />
//                     <ValidationError prefix="Message" field="message" errors={state.errors}/>
//                   </FormControl>

//                   <Button
//                     type="submit"
//                     isLoading={state.submitting}
//                     disabled={state.submitting}
//                     loadingText="Sending..."
//                     width="full"
//                     bg="brand.400"
//                     color="white"
//                     size="lg"
//                     _hover={{
//                       bg: 'brand.500',
//                       transform: 'translateY(-2px)',
//                       boxShadow: '0 8px 25px rgba(20, 184, 166, 0.3)'
//                     }}
//                     _active={{ transform: 'translateY(0)' }}
//                     transition="all 0.3s"
//                     rightIcon={<Icon as={FaPaperPlane} />}
//                   >
//                     Send Message
//                   </Button>
//                 </VStack>
//               </Box>
//             </MotionGridItem>

//             {/* Contact Links - Right */}
//             <MotionGridItem
//               variants={fadeInRight}
//             >
//               <VStack spacing={5} h="full" justify="center">
//                 {contactLinks.map((contact, index) => (
//                   <MotionBox
//                     key={contact.name}
//                     variants={fadeInUp}
//                     w="full"
//                     whileHover={{ scale: 1.02 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <Link
//                       href={contact.href}
//                       isExternal
//                       _hover={{ textDecoration: 'none' }}
//                       w="full"
//                     >
//                       <HStack
//                         bg="bg.primary"
//                         p={6}
//                         borderRadius="xl"
//                         border="2px solid"
//                         borderColor="border.primary"
//                         spacing={4}
//                         w="full"
//                         _hover={{
//                           borderColor: 'brand.400',
//                           bg: 'bg.hover',
//                           boxShadow: '0 8px 25px rgba(20, 184, 166, 0.2)'
//                         }}
//                         transition="all 0.3s"
//                       >
//                         <Icon 
//                           as={iconMap[contact.icon]} 
//                           boxSize={{ base: 6, md: 8 }}
//                           color="brand.400"
//                         />
//                         <VStack align="start" spacing={1} flex={1}>
//                           <Text 
//                             fontWeight="700" 
//                             fontSize={{ base: 'md', md: 'lg' }}
//                             color="text.primary"
//                           >
//                             {contact.name}
//                           </Text>
//                           <Text 
//                             fontSize={{ base: 'xs', md: 'sm' }}
//                             color="text.secondary"
//                           >
//                             {contact.label}
//                           </Text>
//                         </VStack>
//                         <Icon 
//                           as={FaCode} 
//                           boxSize={4}
//                           color="brand.400"
//                           transform="rotate(-45deg)"
//                         />
//                       </HStack>
//                     </Link>
//                   </MotionBox>
//                 ))}
//               </VStack>
//             </MotionGridItem>
//           </Grid>
//         </MotionBox>
//       </Container>
//     </Box>
//     </MotionBox>
//   );
// }

// export default Contact;

import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Textarea,
  Button,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Mail, MessageSquare, Send, Github, Linkedin } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';

const MotionBox = motion(Box);

export default function Contact({ isOpen, onClose }) {
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const textPrimary = useColorModeValue('text.primary', 'white');
  const textSecondary = useColorModeValue('text.secondary', 'text.secondary');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Success - reset form and close
        setFormData({ name: '', email: '', message: '' });
        setShowMessageForm(false);
        onClose();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setShowMessageForm(false);
    setFormData({ name: '', email: '', message: '' });
    onClose();
  };

  const CTAButton = ({ icon: Icon, label, onClick, gradient }) => {
    const { r, g, b } = hexToRgb(gradient);
    const rgba = (a) => `rgba(${r},${g},${b},${a})`;

    return (
      <MotionBox
        as="button"
        onClick={onClick}
        p={6}
        borderRadius="2xl"
        border="1px solid"
        borderColor={rgba(0.3)}
        bg={rgba(0.15)}
        backdropFilter="blur(20px)"
        cursor="pointer"
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        w="full"
      >
        <VStack spacing={3}>
          <Box
            p={3}
            borderRadius="xl"
            bg={rgba(0.25)}
            border="1px solid"
            borderColor={rgba(0.35)}
          >
            <Icon size={24} color={gradient} />
          </Box>
          <Text fontSize="lg" fontWeight="600" color={textPrimary}>
            {label}
          </Text>
        </VStack>
      </MotionBox>
    );
  };

  const SocialIcon = ({ icon: Icon, href, color }) => {
    const { r, g, b } = hexToRgb(color);
    const rgba = (a) => `rgba(${r},${g},${b},${a})`;

    return (
      <MotionBox
        as="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        p={3}
        borderRadius="xl"
        border="1px solid"
        borderColor={rgba(0.3)}
        bg={rgba(0.12)}
        cursor="pointer"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon size={20} color={color} />
      </MotionBox>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered size="xl">
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(10px)" />
      <ModalContent
        bg="surface.card"
        backdropFilter="blur(40px)"
        border="1px solid"
        borderColor="border.primary"
        borderRadius="3xl"
        overflow="hidden"
        mx={4}
      >
        <ModalHeader
          fontSize="2xl"
          fontWeight="800"
          color={textPrimary}
          fontFamily="heading"
          pt={8}
          px={8}
          pb={0}
        >
          {showMessageForm ? "Send a Message" : "Let's Connect"}
        </ModalHeader>
        <ModalCloseButton
          top={6}
          right={6}
          color={textSecondary}
          _hover={{ color: textPrimary }}
        />

        <ModalBody p={8}>
          <AnimatePresence mode="wait">
            {!showMessageForm ? (
              <MotionBox
                key="cta-options"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <VStack spacing={4} mb={8}>
                  <CTAButton
                    icon={Calendar}
                    label="Book a Call"
                    onClick={() => window.open('https://calendly.com/your-link', '_blank')}
                    gradient="#6366f1"
                  />
                  <CTAButton
                    icon={Mail}
                    label="Email Me"
                    onClick={() => window.location.href = 'mailto:your@email.com'}
                    gradient="#10b981"
                  />
                  <CTAButton
                    icon={MessageSquare}
                    label="Write a Message"
                    onClick={() => setShowMessageForm(true)}
                    gradient="#ec4899"
                  />
                </VStack>

                {/* Social Links */}
                <Box>
                  <Text
                    fontSize="sm"
                    color={textSecondary}
                    textTransform="uppercase"
                    letterSpacing="wider"
                    mb={4}
                    textAlign="center"
                    fontWeight="600"
                  >
                    Connect on Socials
                  </Text>
                  <HStack spacing={4} justify="center">
                    <SocialIcon
                      icon={Github}
                      href="https://github.com/anandita-3217"
                      color="text.secondary"
                    />
                    <SocialIcon
                      icon={Linkedin}
                      href="https://linkedin.com/in/yourusername"
                      color="#0a66c2"
                    />
                    <SocialIcon
                      icon={FaXTwitter}
                      href="https://x.com/yourusername"
                      color="text.secondary"
                    />
                  </HStack>
                </Box>
              </MotionBox>
            ) : (
              <MotionBox
                key="message-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4}>
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      size="lg"
                      variant="outline"
                      bg="rgba(255, 255, 255, 0.05)"
                      border="1px solid"
                      borderColor="border.primary"
                      color={textPrimary}
                      _hover={{ borderColor: 'brand.400' }}
                      _focus={{
                        borderColor: 'brand.400',
                        boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)',
                      }}
                    />
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      size="lg"
                      variant="outline"
                      bg="rgba(255, 255, 255, 0.05)"
                      border="1px solid"
                      borderColor="border.primary"
                      color={textPrimary}
                      _hover={{ borderColor: 'brand.400' }}
                      _focus={{
                        borderColor: 'brand.400',
                        boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)',
                      }}
                    />
                    <Textarea
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      variant="outline"
                      bg="rgba(255, 255, 255, 0.05)"
                      border="1px solid"
                      borderColor="border.primary"
                      color={textPrimary}
                      _hover={{ borderColor: 'brand.400' }}
                      _focus={{
                        borderColor: 'brand.400',
                        boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)',
                      }}
                    />

                    <HStack w="full" spacing={3}>
                      <Button
                        variant="outline"
                        size="lg"
                        flex={1}
                        onClick={() => setShowMessageForm(false)}
                        borderColor="border.primary"
                        color={textSecondary}
                        _hover={{ borderColor: 'brand.400', color: textPrimary }}
                      >
                        Back
                      </Button>
                      <MotionBox flex={1} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="submit"
                          size="lg"
                          w="full"
                          bgGradient="linear(to-r, #7c3aed, #ec4899)"
                          color="white"
                          rightIcon={<Send size={18} />}
                          isLoading={isSubmitting}
                          _hover={{ opacity: 0.9 }}
                        >
                          Send Message
                        </Button>
                      </MotionBox>
                    </HStack>
                  </VStack>
                </form>
              </MotionBox>
            )}
          </AnimatePresence>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

// Helper function (same as in your project)
const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};