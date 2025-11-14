import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  VStack,
  Link,
  useDisclosure,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import DevGif from "./assets/developer.gif";
import {
  Menu,
  X,
  Home,
  User,
  File,
  FolderGit2,
  Mail,
  Sun,
  Moon,
} from "lucide-react";

// Chakra + Motion wrapper
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const Header = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  const links = [
    { name: "Home", icon: Home, href: "#hero" },
    { name: "About", icon: User, href: "#about" },
    { name: "Projects", icon: FolderGit2, href: "#projects" },
    { name: "Contact", icon: Mail, href: "#contact" },
    { name: "Resume", icon: File, href: "#resume" },
  ];

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  // Dynamic backgrounds based on scroll and theme
  const bgScrolled = useColorModeValue(
    "rgba(255, 255, 255, 0.7)",
    "rgba(26, 26, 26, 0.7)"
  );
  const bgTop = useColorModeValue(
    "rgba(255, 255, 255, 0.3)",
    "rgba(26, 26, 26, 0.3)"
  );
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const linkColor = useColorModeValue("gray.700", "gray.300");
  const activeLinkBg = useColorModeValue("teal.50", "teal.900");
  const hoverBg = useColorModeValue("teal.50", "teal.900");
  const shadowColor = colorMode === "dark" 
    ? "0 8px 32px rgba(255,255,255,0.05)" 
    : "0 8px 32px rgba(0,0,0,0.1)";

  return (

    <MotionFlex
  as="nav"
  position="fixed"
  top="16px"
  left="0"
  right="0"
  mx="auto"
  w="90%"
  maxW="6xl"
  zIndex={50}
  bg={isScrolled ? bgScrolled : bgTop}
  backdropFilter="blur(12px)"
  borderRadius="xl"
  border="1px solid"
  borderColor={borderColor}
  boxShadow={shadowColor}
  px={{ base: 3, sm: 4 }}
  py={3}
  align="center"
  justify="space-between"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>

          {/* Logo - Fixed Width */}
          <Box w={{ base: "auto", md: "160px" }}>
            <Link 
              href="#hero" 
              _hover={{ opacity: 0.8 }} 
              transition="0.2s ease"
              onClick={() => setActiveSection("#hero")}
            >
              <Image src={DevGif} alt="Developer" boxSize="50px" />
            </Link>
          </Box>

          {/* Desktop Links - Centered */}
          <HStack 
            spacing={1} 
            display={{ base: "none", md: "flex" }}
            flex={1}
            justify="center"
          >
            {links.map(({ name, icon: Icon, href }, i) => (
              <MotionBox
                key={name}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={href}
                  display="flex"
                  alignItems="center"
                  gap={2}
                  px={4}
                  py={2}
                  borderRadius="md"
                  fontSize="sm"
                  fontWeight="medium"
                  bg={activeSection === href ? activeLinkBg : "transparent"}
                  color={activeSection === href ? "teal.400" : linkColor}
                  _hover={{
                    bg: hoverBg,
                    color: "teal.400",
                    textDecoration: "none",
                  }}
                  transition="all 0.2s ease"
                  onClick={() => setActiveSection(href)}
                >
                  <Icon size={18} />
                  {name}
                </Link>
              </MotionBox>
            ))}
          </HStack>

          {/* Theme Toggle & Mobile Menu - Fixed Width */}
          <Flex 
            w={{ base: "auto", md: "160px" }} 
            justify="flex-end" 
            align="center" 
            gap={2}
          >
            {/* Theme Toggle */}
            <MotionBox
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <IconButton
                aria-label="Toggle theme"
                icon={colorMode === "light" ? <Moon size={20} /> : <Sun size={20} />}
                onClick={toggleColorMode}
                variant="ghost"
                borderRadius="full"
                size="md"
                _hover={{
                  bg: useColorModeValue("gray.100", "whiteAlpha.200"),
                }}
              />
            </MotionBox>

            {/* Mobile Menu Toggle */}
            <IconButton
              aria-label="Menu"
              icon={isOpen ? <X size={24} /> : <Menu size={24} />}
              display={{ base: "flex", md: "none" }}
              variant="ghost"
              borderRadius="full"
              onClick={onToggle}
              _hover={{
                bg: useColorModeValue("gray.100", "whiteAlpha.200"),
              }}
            />
          </Flex>

          {/* Mobile Dropdown */}
          <AnimatePresence>
            {isOpen && (
              <MotionBox
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                position="absolute"
                top="calc(100% + 8px)"
                left={0}
                right={0}
                display={{ md: "none" }}
                bg={useColorModeValue("white", "gray.900")}
                borderRadius="xl"
                border="1px solid"
                borderColor={borderColor}
                backdropFilter="blur(12px)"
                boxShadow={shadowColor}
                overflow="hidden"
              >
                <VStack py={4} spacing={1} align="stretch">
                  {links.map(({ name, icon: Icon, href }, i) => (
                    <MotionBox
                      key={name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <Link
                        href={href}
                        display="flex"
                        alignItems="center"
                        gap={3}
                        px={6}
                        py={3}
                        fontSize="lg"
                        fontWeight="medium"
                        bg={activeSection === href ? activeLinkBg : "transparent"}
                        color={activeSection === href ? "teal.400" : linkColor}
                        _hover={{
                          bg: hoverBg,
                          color: "teal.400",
                          textDecoration: "none",
                        }}
                        transition="all 0.2s ease"
                        onClick={() => {
                          setActiveSection(href);
                          onClose();
                        }}
                      >
                        <Icon size={20} />
                        {name}
                      </Link>
                    </MotionBox>
                  ))}
                </VStack>
              </MotionBox>
            )}
          </AnimatePresence>
        </MotionFlex>
  );
};

export default Header;