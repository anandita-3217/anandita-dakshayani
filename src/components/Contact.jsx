// // export default Contact;
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
// import { 
//   FaGithub,
//   FaLinkedin,
//   FaEnvelope,
//   FaCode,
//   FaPhone,
//   FaPaperPlane
// } from 'react-icons/fa';

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
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [contactLinks, setContactLinks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fixed: .json extension was missing
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

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Simulate form submission
//     setTimeout(() => {
//       toast({
//         title: 'Message sent!',
//         description: "I'll get back to you as soon as possible.",
//         status: 'success',
//         duration: 5000,
//         isClosable: true,
//       });
//       setFormData({ name: '', email: '', message: '' });
//       setIsSubmitting(false);
//     }, 1000);
//   };

//   if (loading) {
//     return (
//       <Box
//         id="contact"
//         bg="transparent"
//         color="white"
//         py={{ base: 16, md: 24 }}
//       >
//         <Container maxW="container.xl">
//           <Center h="400px">
//             <Spinner size="xl" color="teal.400" thickness="4px" />
//           </Center>
//         </Container>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       id="contact"
//       bg="transparent"
//       color="white"
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
//             <Text as="span" color="#14b8a6">Get in Touch</Text>
//           </MotionHeading>

//           <MotionText
//             textAlign="center"
//             color="#b0b0b0"
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
//                 bg="#1a1a1a"
//                 p={8}
//                 borderRadius="xl"
//                 border="2px solid"
//                 borderColor="#2a2a2a"
//                 _hover={{
//                   borderColor: '#14b8a6',
//                   boxShadow: '0 8px 25px rgba(20, 184, 166, 0.1)'
//                 }}
//                 transition="all 0.3s"
//               >
//                 <Heading
//                   as="h3"
//                   fontSize={{ base: 'xl', md: '2xl' }}
//                   mb={6}
//                   color="#fff"
//                 >
//                   Send me a message
//                 </Heading>
                
//                 <VStack spacing={5} as="form" onSubmit={handleSubmit}>
//                   <FormControl isRequired>
//                     <FormLabel color="#b0b0b0" fontSize="sm">Name</FormLabel>
//                     <Input
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       placeholder="Your name"
//                       bg="#0a0a0a"
//                       border="1px solid"
//                       borderColor="#2a2a2a"
//                       color="#fff"
//                       _hover={{ borderColor: '#14b8a6' }}
//                       _focus={{
//                         borderColor: '#14b8a6',
//                         boxShadow: '0 0 0 1px #14b8a6'
//                       }}
//                       _placeholder={{ color: '#666' }}
//                     />
//                   </FormControl>

//                   <FormControl isRequired>
//                     <FormLabel color="#b0b0b0" fontSize="sm">Email</FormLabel>
//                     <Input
//                       name="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder="your.email@example.com"
//                       bg="#0a0a0a"
//                       border="1px solid"
//                       borderColor="#2a2a2a"
//                       color="#fff"
//                       _hover={{ borderColor: '#14b8a6' }}
//                       _focus={{
//                         borderColor: '#14b8a6',
//                         boxShadow: '0 0 0 1px #14b8a6'
//                       }}
//                       _placeholder={{ color: '#666' }}
//                     />
//                   </FormControl>

//                   <FormControl isRequired>
//                     <FormLabel color="#b0b0b0" fontSize="sm">Message</FormLabel>
//                     <Textarea
//                       name="message"
//                       value={formData.message}
//                       onChange={handleChange}
//                       placeholder="Your message..."
//                       rows={3}
//                       bg="#0a0a0a"
//                       border="1px solid"
//                       borderColor="#2a2a2a"
//                       color="#fff"
//                       _hover={{ borderColor: '#14b8a6' }}
//                       _focus={{
//                         borderColor: '#14b8a6',
//                         boxShadow: '0 0 0 1px #14b8a6'
//                       }}
//                       _placeholder={{ color: '#666' }}
//                       resize="vertical"
//                     />
//                   </FormControl>

//                   <Button
//                     type="submit"
//                     isLoading={isSubmitting}
//                     loadingText="Sending..."
//                     width="full"
//                     bg="#14b8a6"
//                     color="#fff"
//                     size="lg"
//                     _hover={{
//                       bg: '#0d9488',
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
//                         bg="#1a1a1a"
//                         p={6}
//                         borderRadius="xl"
//                         border="2px solid"
//                         borderColor="#2a2a2a"
//                         spacing={4}
//                         w="full"
//                         _hover={{
//                           borderColor: '#14b8a6',
//                           bg: '#222',
//                           boxShadow: '0 8px 25px rgba(20, 184, 166, 0.2)'
//                         }}
//                         transition="all 0.3s"
//                       >
//                         <Icon 
//                           as={iconMap[contact.icon]} 
//                           boxSize={{ base: 6, md: 8 }}
//                           color="#14b8a6"
//                         />
//                         <VStack align="start" spacing={1} flex={1}>
//                           <Text 
//                             fontWeight="700" 
//                             fontSize={{ base: 'md', md: 'lg' }}
//                             color="#fff"
//                           >
//                             {contact.name}
//                           </Text>
//                           <Text 
//                             fontSize={{ base: 'xs', md: 'sm' }}
//                             color="#b0b0b0"
//                           >
//                             {contact.label}
//                           </Text>
//                         </VStack>
//                         <Icon 
//                           as={FaCode} 
//                           boxSize={4}
//                           color="#14b8a6"
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
//   );
// }

// export default Contact;
import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Grid,
  GridItem,
  Icon,
  Link,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Spinner,
  Center
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaCode,
  FaPhone,
  FaPaperPlane
} from 'react-icons/fa';

const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);
const MotionGridItem = motion.create(GridItem);

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
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

const iconMap = {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaPhone
};

function Contact() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactLinks, setContactLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('../data/contact.json')
      .then(response => response.json())
      .then(data => {
        setContactLinks(data.contact || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading contact: ', error);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: 'Message sent!',
        description: "I'll get back to you as soon as possible.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  if (loading) {
    return (
      <Box
        id="contact"
        bg="transparent"
        color="text.primary"
        py={{ base: 16, md: 24 }}
      >
        <Container maxW="container.xl">
          <Center h="400px">
            <Spinner size="xl" color="brand.400" thickness="4px" />
          </Center>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      id="contact"
      bg="transparent"
      color="text.primary"
      py={{ base: 16, md: 24 }}
      position="relative"
      overflow="hidden"
      p={90}
    >
      {/* Background decoration */}
      <MotionBox
        position="absolute"
        bottom="10%"
        right="10%"
        w="300px"
        h="300px"
        bg="rgba(20, 184, 166, 0.05)"
        borderRadius="full"
        filter="blur(60px)"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Section Title */}
          <MotionHeading
            as="h2"
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            fontWeight="bold"
            textAlign="center"
            mb={4}
            variants={fadeInUp}
          >
            <Text as="span" color="brand.400">Get in Touch</Text>
          </MotionHeading>

          <MotionText
            textAlign="center"
            color="text.secondary"
            fontSize={{ base: 'md', md: 'lg' }}
            mb={12}
            maxW="600px"
            mx="auto"
            lineHeight="1.8"
            variants={fadeInUp}
          >
            I'm currently seeking software development opportunities. 
            Feel free to reach out if you'd like to work together or just chat about tech!
          </MotionText>

          {/* Grid Layout */}
          <Grid
            templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
            gap={8}
            alignItems="start"
          >
            {/* Contact Form - Left */}
            <MotionGridItem
              variants={fadeInLeft}
            >
              <Box
                bg="bg.primary"
                p={8}
                borderRadius="xl"
                border="2px solid"
                borderColor="border.primary"
                _hover={{
                  borderColor: 'brand.400',
                  boxShadow: '0 8px 25px rgba(20, 184, 166, 0.1)'
                }}
                transition="all 0.3s"
              >
                <Heading
                  as="h3"
                  fontSize={{ base: 'xl', md: '2xl' }}
                  mb={6}
                  color="text.primary"
                >
                  Send me a message
                </Heading>
                
                <VStack spacing={5} as="form" onSubmit={handleSubmit}>
                  <FormControl isRequired>
                    <FormLabel color="text.secondary" fontSize="sm">Name</FormLabel>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      bg="bg.secondary"
                      border="1px solid"
                      borderColor="border.primary"
                      color="text.primary"
                      _hover={{ borderColor: 'brand.400' }}
                      _focus={{
                        borderColor: 'brand.400',
                        boxShadow: '0 0 0 1px #14b8a6'
                      }}
                      _placeholder={{ color: 'gray.500' }}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="text.secondary" fontSize="sm">Email</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      bg="bg.secondary"
                      border="1px solid"
                      borderColor="border.primary"
                      color="text.primary"
                      _hover={{ borderColor: 'brand.400' }}
                      _focus={{
                        borderColor: 'brand.400',
                        boxShadow: '0 0 0 1px #14b8a6'
                      }}
                      _placeholder={{ color: 'gray.500' }}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="text.secondary" fontSize="sm">Message</FormLabel>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message..."
                      rows={3}
                      bg="bg.secondary"
                      border="1px solid"
                      borderColor="border.primary"
                      color="text.primary"
                      _hover={{ borderColor: 'brand.400' }}
                      _focus={{
                        borderColor: 'brand.400',
                        boxShadow: '0 0 0 1px #14b8a6'
                      }}
                      _placeholder={{ color: 'gray.500' }}
                      resize="vertical"
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText="Sending..."
                    width="full"
                    bg="brand.400"
                    color="white"
                    size="lg"
                    _hover={{
                      bg: 'brand.500',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(20, 184, 166, 0.3)'
                    }}
                    _active={{ transform: 'translateY(0)' }}
                    transition="all 0.3s"
                    rightIcon={<Icon as={FaPaperPlane} />}
                  >
                    Send Message
                  </Button>
                </VStack>
              </Box>
            </MotionGridItem>

            {/* Contact Links - Right */}
            <MotionGridItem
              variants={fadeInRight}
            >
              <VStack spacing={5} h="full" justify="center">
                {contactLinks.map((contact, index) => (
                  <MotionBox
                    key={contact.name}
                    variants={fadeInUp}
                    w="full"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={contact.href}
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                      w="full"
                    >
                      <HStack
                        bg="bg.primary"
                        p={6}
                        borderRadius="xl"
                        border="2px solid"
                        borderColor="border.primary"
                        spacing={4}
                        w="full"
                        _hover={{
                          borderColor: 'brand.400',
                          bg: 'bg.hover',
                          boxShadow: '0 8px 25px rgba(20, 184, 166, 0.2)'
                        }}
                        transition="all 0.3s"
                      >
                        <Icon 
                          as={iconMap[contact.icon]} 
                          boxSize={{ base: 6, md: 8 }}
                          color="brand.400"
                        />
                        <VStack align="start" spacing={1} flex={1}>
                          <Text 
                            fontWeight="700" 
                            fontSize={{ base: 'md', md: 'lg' }}
                            color="text.primary"
                          >
                            {contact.name}
                          </Text>
                          <Text 
                            fontSize={{ base: 'xs', md: 'sm' }}
                            color="text.secondary"
                          >
                            {contact.label}
                          </Text>
                        </VStack>
                        <Icon 
                          as={FaCode} 
                          boxSize={4}
                          color="brand.400"
                          transform="rotate(-45deg)"
                        />
                      </HStack>
                    </Link>
                  </MotionBox>
                ))}
              </VStack>
            </MotionGridItem>
          </Grid>
        </MotionBox>
      </Container>
    </Box>
  );
}

export default Contact;