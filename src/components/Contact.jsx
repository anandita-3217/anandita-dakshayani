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
import { FileText , Mail, MessageSquare, Send, ArrowLeft } from 'lucide-react';
import { FaXTwitter,FaGithub, FaLinkedin   } from 'react-icons/fa6';

const MotionBox = motion.create(Box);

export default function Contact({ isOpen, onClose }) {
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const textPrimary = useColorModeValue('text.primary', 'white');
  // const textSecondary = useColorModeValue('text.secondary', 'text.secondary');

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
  const CTAButton = ({ icon: Icon, label, onClick, gradient, subtext }) => {
  const { r, g, b } = hexToRgb(gradient);
  const rgba = (a) => `rgba(${r},${g},${b},${a})`;

  return (
    <MotionBox
      as="button"
      onClick={onClick}
      p={6}
      borderRadius="2xl"
      border="1px solid"
      borderColor="transparent"
      bg="surface.darker"
      backdropFilter="blur(20px)"
      cursor="pointer"
      whileHover={{ borderColor: 'var(--chakra-colors-border-primary)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      w="full"
    >
      <HStack spacing={4} align="start" w="full">
        {/* Icon */}
        <Box
          p={3}
          borderRadius="50%"
          bg={rgba(0.25)}
          border="1px solid"
          borderColor={rgba(0.35)}
          flexShrink={0}
          color={"text.primary"}
        >
          <Icon size={24}  />
        </Box>

        {/* Text content */}
        <VStack align="start" spacing={1} flex={1}>
          <Text fontSize="lg" fontWeight="600" color="text.primary">
            {label}
          </Text>
          <Text fontSize="md" color="text.secondary" fontWeight="400">
            {subtext}
          </Text>
        </VStack>
      </HStack>
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
        bg="surface.darker"
        cursor="pointer"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon size={20} color={color} />
      </MotionBox>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered motionPreset="slideInBottom" size="4xl">
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(10px)" />
      <ModalContent
        bg="surface.glassElevated"
        backdropFilter="blur(40px)"
        border="1px solid"
        borderColor="border.primary"
        borderRadius="3xl"
        overflow="hidden"
        mx={4}
        mb={0}  // Bottom margin
        mt="auto"  // Push to bottom
        maxH="90vh"  // Prevent overflow on small screens
        overflowY="auto"
      >
        <ModalHeader
          fontSize="2xl"
          fontWeight="800"
          color="text.primary"
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
          color="text.secondary"
          _hover={{ color: "text.primary", 
            transform: 'rotate(90deg)'
          }}
          transition="all 0.3s ease"
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
                  <HStack spacing={4} w="full">
                  <CTAButton flex="1"
                  w="full"
                    icon={FileText}
                    label="View Resume"
                    onClick={() => window.open('/#resume', '_blank')} // TODO: Change this link
                    gradient="text.primary"
                    subtext="View my experience & skills"
                  />
                  <CTAButton flex="1"
                  w="full"
                    icon={Mail}
                    label="Email Me"
                    onClick={() => window.location.href = 'mailto:your@email.com'}
                    gradient="#text.primary"
                    subtext="ananditad21@gmail.com"
                  />

                  </HStack>
                  <CTAButton
                    icon={MessageSquare}
                    label="Write a Message"
                    onClick={() => setShowMessageForm(true)}
                    gradient="#text.primary"
                    subtext="Send a message directly"
                  />
                </VStack>

                {/* Social Links */}
                <Box>
                  <Text
                    fontSize="sm"
                    color="text.secondary"
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
                      icon={FaGithub}
                      href="https://github.com/anandita-3217"
                      color="text.secondary"
                    />
                    <SocialIcon
                      icon={FaLinkedin}
                      href="https://linkedin.com/in/yourusername"
                      color="text.secondary"
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
                 
                  <VStack w="full" spacing={4} align="stretch">
                    {/* Back link */}
                    <Box
                      as="button"
                      type="button"
                      onClick={() => setShowMessageForm(false)}
                      fontSize="md"
                      color="text.secondary"
                      textAlign="left"
                      cursor="pointer"
                      _hover={{ color: 'text.primary' }}
                      transition="color 0.2s"
                    >
                      ← Back
                    </Box>

                    {/* Name & Email row with labels */}
                    <HStack spacing={4} align="start" w="full">
                      <VStack align="start" spacing={2} flex={1}>
                        <Text fontSize="sm" fontWeight="600" color="text.secondary">
                          Name
                        </Text>
                        <Input
                          placeholder="Jane Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          size="lg"
                          variant="outline"
                          bg="rgba(255, 255, 255, 0.05)"
                          border="1px solid"
                          borderColor="border.primary"
                          color="text.primary"
                          _hover={{ borderColor: 'button.primary.bg' }}
                          _focus={{
                            borderColor: 'button.primary.bg',
                            boxShadow: '0 0 0 1px var(--chakra-colors-button-primary-bg)',
                          }}
                        />
                      </VStack>
                        
                      <VStack align="start" spacing={2} flex={1}>
                        <Text fontSize="sm" fontWeight="600" color="text.secondary">
                          Email
                        </Text>
                        <Input
                          type="email"
                          placeholder="janedoe@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          size="lg"
                          variant="outline"
                          bg="rgba(255, 255, 255, 0.05)"
                          border="1px solid"
                          borderColor="border.primary"
                          color="text.primary"
                          _hover={{ borderColor: 'button.primary.bg' }}
                          _focus={{
                            borderColor: 'button.primary.bg',
                            boxShadow: '0 0 0 1px var(--chakra-colors-button-primary-bg)',
                          }}
                        />
                      </VStack>
                    </HStack>
                        
                    {/* Message with label */}
                    <VStack align="start" spacing={2} w="full">
                      <Text fontSize="sm" fontWeight="600" color="text.secondary">
                        Message
                      </Text>
                      <Textarea
                        placeholder="How can I help?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={6}
                        variant="outline"
                        bg="rgba(255, 255, 255, 0.05)"
                        border="1px solid"
                        borderColor="border.primary"
                        color="text.primary"
                        _hover={{ borderColor: 'button.primary.bg' }}
                        _focus={{
                          borderColor: 'button.primary.bg',
                          boxShadow: '0 0 0 1px var(--chakra-colors-button-primary-bg)',
                        }}
                      />
                    </VStack>
                      
                    {/* Send button */}
                    <MotionBox whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        size="lg"
                        w="full"
                        bg="button.primary.bg"
                        color="button.primary.text"
                        rightIcon={<Send size={18} />}
                        isLoading={isSubmitting}
                        _hover={{ opacity: 0.9 }}
                      >
                        Send Message
                      </Button>
                    </MotionBox>
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