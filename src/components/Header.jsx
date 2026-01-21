import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  VStack,
  useDisclosure,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Link as RouterLink, useLocation } from "react-router-dom";
import DevGif from "./assets/developer.gif";
import {
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { FaStar, FaCodeBranch } from "react-icons/fa";

// Chakra + Motion wrapper
const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);

const Header = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // ALL useColorModeValue hooks MUST be at the top, before any conditional logic
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
  const activeLinkBg = useColorModeValue("brand.50", "teal.900");
  // const activeLinkBg = useColorModeValue("brand.50", "teal.900");
  const hoverBg = useColorModeValue("brand.50", "teal.900");
  const iconHoverBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const mobileDropdownBg = useColorModeValue("white", "gray.900");
  const shadowColor = colorMode === "dark"
    ? "0 8px 32px rgba(255,255,255,0.05)"
    : "0 8px 32px rgba(0,0,0,0.1)";
  const activeLinkColor = useColorModeValue("brand.500", "brand.400");

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Work", href: "/#projects" },
    { name: "Contact", href: "/#contact" },
    { name: "Resume",  href: "/#resume" },
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

  // Check if link is active
  const isLinkActive = (href) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    if (href.startsWith("/#")) {
      return location.pathname === "/" && location.hash === href.slice(1);
    }
    return location.pathname === href;
  };

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
        <Box
          as={RouterLink}
          to="/"
          _hover={{ opacity: 0.8 }}
          transition="0.2s ease"
          display="block"
        >
          <Image src={DevGif} alt="Developer" boxSize="50px" />
        </Box>
      </Box>

      {/* Desktop Links - Centered */}
      <HStack
        spacing={1}
        display={{ base: "none", md: "flex" }}
        flex={1}
        justify="center"
      >
        {links.map(({ name, href }, i) => (
          <MotionBox
            key={name}
            custom={i}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Box
              as={RouterLink}
              to={href}
              display="flex"
              alignItems="center"
              gap={2}
              px={4}
              py={2}
              borderRadius="md"
              fontSize="sm"
              fontWeight="medium"
              bg={isLinkActive(href) ? activeLinkBg : "transparent"}
              color={isLinkActive(href) ? activeLinkColor : linkColor}
              _hover={{
                bg: hoverBg,
                color: activeLinkColor,
                textDecoration: "none",
              }}
              transition="all 0.2s ease"
            >
              {name}
            </Box>
          </MotionBox>
        ))}
        <Box
          as="a"
          href="https://github.com/anandita-3217/anandita-dakshayani"
          target="_blank"
          rel="noopener noreferrer"
          display="flex"
          alignItems="center"
          gap={1}
          px={4}
          py={2}
          borderRadius="md"
          fontSize="sm"
          fontWeight="medium"
          bg={useColorModeValue("brand.500", "brand.400")}
          color="white"
          _hover={{
            bg: useColorModeValue("brand.600", "brand.500"),
            textDecoration: "none",
            transform: "scale(1.02)",
          }}
          transition="all 0.2s ease"
        >
          <FaStar size={14} />
          <Box as="span">or</Box>
          <FaCodeBranch size={14} />
        </Box>
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
              bg: iconHoverBg,
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
            bg: iconHoverBg,
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
            bg={mobileDropdownBg}
            borderRadius="xl"
            border="1px solid"
            borderColor={borderColor}
            backdropFilter="blur(12px)"
            boxShadow={shadowColor}
            overflow="hidden"
          >
            <VStack py={4} spacing={1} align="stretch">
              {links.map(({ name, href }, i) => (
                <MotionBox
                  key={name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Box
                    as={RouterLink}
                    to={href}
                    display="flex"
                    alignItems="center"
                    gap={3}
                    px={6}
                    py={3}
                    fontSize="lg"
                    fontWeight="medium"
                    bg={isLinkActive(href) ? activeLinkBg : "transparent"}
                    color={isLinkActive(href) ? activeLinkColor : linkColor}
                    _hover={{
                      bg: hoverBg,
                      color: activeLinkColor,
                      textDecoration: "none",
                    }}
                    transition="all 0.2s ease"
                    onClick={onClose}
                  >
                    {name}
                  </Box>
                </MotionBox>
              ))}
              <MotionBox
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * links.length }}
                px={6}
                py={2}
              >
                <Box
                  as="a"
                  href="https://github.com/anandita-3217/anandita-dakshayani"
                  target="_blank"
                  rel="noopener noreferrer"
                  display="flex"
                  alignItems="center"
                  gap={1}
                  px={4}
                  py={2}
                  borderRadius="md"
                  fontSize="sm"
                  fontWeight="medium"
                  bg={useColorModeValue("brand.500", "brand.400")}
                  color="white"
                  _hover={{
                    bg: useColorModeValue("brand.600", "brand.500"),
                    textDecoration: "none",
                    transform: "scale(1.02)",
                  }}
                  transition="all 0.2s ease"
                >
                  <FaStar size={14} />
                  <Box as="span">or</Box>
                  <FaCodeBranch size={14} />
                </Box>
              </MotionBox>
            </VStack>
          </MotionBox>
        )}
      </AnimatePresence>
    </MotionFlex>
  );
};

export default Header;