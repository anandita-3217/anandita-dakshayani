import React, { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  VStack,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import DevGif from "./assets/developer.gif";
import {
  Menu,
  X,
  Home,
  User,
  File ,
  FolderGit2,
  Mail,
} from "lucide-react";

// Chakra + Motion wrapper
const MotionBox = motion.create(Box);

const Header = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const links = [
    { name: "Home", icon: Home, href: "#hero" },
    { name: "About", icon: User, href: "#about" },
    { name: "Projects", icon: FolderGit2, href: "#projects" },
    // { name: "Experience", icon: Briefcase, href: "#experience" },
    { name: "Contact", icon: Mail, href: "#contact" },
    { name: "Resume", icon: File , href: "#resume" },
  ];

  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      left={0}
      w="100%"
      zIndex={50}
      bg="rgba(0,0,0,0.4)"
      backdropFilter="blur(10px)"
      color="white"
    >
      {/* Desktop Header */}
      <Flex
        maxW="7xl"
        mx="auto"
        align="center"
        justify="space-between"
        px={6}
        py={4}
      >
        {/* Logo - Clickable to Hero */}
        <Link href="#hero" _hover={{ opacity: 0.8 }} transition="0.2s ease">
          <Image src={DevGif} alt="Developer" boxSize="50px" />
        </Link>

        {/* Desktop Links */}
        <HStack spacing={8} display={{ base: "none", md: "flex" }}>
          {links.map(({ name, icon: Icon, href }) => (
            <Link
              key={name}
              href={href}
              display="flex"
              alignItems="center"
              gap={2}
              _hover={{ color: "#14b8a6" }}
              transition="0.2s ease"
            >
              <Icon size={18} /> {name}
            </Link>
          ))}
        </HStack>

        {/* Mobile Menu Toggle */}
        <IconButton
          aria-label="Menu"
          icon={isOpen ? <X size={26} /> : <Menu size={26} />}
          display={{ base: "flex", md: "none" }}
          variant="ghost"
          color="white"
          onClick={onToggle}
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
            display={{ md: "none" }}
            bg="rgba(0,0,0,0.9)"
            backdropFilter="blur(12px)"
          >
            <VStack py={6} spacing={6}>
              {links.map(({ name, icon: Icon, href }) => (
                <Link
                  key={name}
                  href={href}
                  display="flex"
                  alignItems="center"
                  gap={3}
                  _hover={{ color: "#14b8a6" }}
                  transition="0.2s ease"
                  onClick={onClose}
                >
                  <Icon size={20} /> {name}
                </Link>
              ))}
            </VStack>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Header;