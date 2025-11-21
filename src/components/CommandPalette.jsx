// components/CommandPalette.js
import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Input,
  VStack,
  Text,
  Box,
  HStack,
  Kbd,
  Divider,
  useColorMode,
} from '@chakra-ui/react';
import { 
  Search, 
  Home, 
  User, 
  FolderGit2, 
  Mail, 
  File,
  Code,
  Github,
  Linkedin,
  Phone,
  Sun,
  Moon,
  ArrowRight
} from 'lucide-react';

const CommandPalette = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { colorMode, toggleColorMode } = useColorMode();

  // Navigation items
  const navItems = [
    { title: 'Home', href: '#hero', icon: Home, group: 'Navigation' },
    { title: 'About', href: '#about', icon: User, group: 'Navigation' },
    { title: 'Skills', href: '#skills', icon: Code, group: 'Navigation' },
    { title: 'Projects', href: '#projects', icon: FolderGit2, group: 'Navigation' },
    { title: 'Contact', href: '#contact', icon: Mail, group: 'Navigation' },
    { title: 'Resume', href: '#resume', icon: File, group: 'Navigation' },
  ];

  // Social links
  const socialItems = [
    { title: 'GitHub', url: 'https://github.com/anandita-3217', icon: Github, group: 'Social' },
    { title: 'LinkedIn', url: 'https://linkedin.com/in/anandita-dakshayani-9621a0199', icon: Linkedin, group: 'Social' },
    { title: 'Email', url: 'mailto:ananditad21@gmail.com', icon: Mail, group: 'Social' },
    { title: 'Phone', url: 'tel:+1234567890', icon: Phone, group: 'Social' },
  ];

  // Theme toggle
  const themeItem = {
    title: colorMode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode',
    icon: colorMode === 'light' ? Moon : Sun,
    group: 'Theme',
    action: toggleColorMode
  };

  // Combine all items
  const allItems = [...navItems, ...socialItems, themeItem];

  // Filter items based on search query
  const filteredItems = allItems.filter(item => {
    const query = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(query);
  });

  // Group items by category
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.group]) {
      acc[item.group] = [];
    }
    acc[item.group].push(item);
    return acc;
  }, {});

  // Handle item selection
  const handleSelect = (item) => {
    if (item.href) {
      // Navigation
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (item.url) {
      // External link
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else if (item.action) {
      // Action (like theme toggle)
      item.action();
    }
    onClose();
    setSearchQuery('');
    setSelectedIndex(0);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredItems.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : filteredItems.length - 1
        );
      } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
        e.preventDefault();
        handleSelect(filteredItems[selectedIndex]);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredItems]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="xl"
      motionPreset="slideInBottom"
    >
      <ModalOverlay 
        backdropFilter="blur(10px)" 
        bg="blackAlpha.600"
      />
      <ModalContent
        bg="bg.primary"
        borderColor="border.primary"
        border="1px solid"
        borderRadius="xl"
        overflow="hidden"
        boxShadow="2xl"
        mt="10vh"
      >
        <ModalBody p={0}>
          {/* Search Input */}
          <HStack
            px={4}
            py={3}
            borderBottom="1px solid"
            borderColor="border.primary"
            spacing={3}
          >
            <Search size={20} color="var(--chakra-colors-text-secondary)" />
            <Input
              placeholder="Type a command or search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedIndex(0);
              }}
              variant="unstyled"
              size="lg"
              color="text.primary"
              _placeholder={{ color: 'text.secondary' }}
              autoFocus
            />
            <HStack spacing={1}>
              <Kbd fontSize="xs">ESC</Kbd>
            </HStack>
          </HStack>

          {/* Results */}
          <Box maxH="450px" overflowY="auto">
            {Object.keys(groupedItems).length > 0 ? (
              Object.entries(groupedItems).map(([group, items], groupIndex) => (
                <Box key={group}>
                  {/* Group Header */}
                  <Text
                    px={4}
                    pt={3}
                    pb={2}
                    fontSize="xs"
                    fontWeight="semibold"
                    color="text.secondary"
                    textTransform="uppercase"
                    letterSpacing="wide"
                  >
                    {group}
                  </Text>

                  {/* Group Items */}
                  <VStack align="stretch" spacing={0} pb={2}>
                    {items.map((item, itemIndex) => {
                      const globalIndex = filteredItems.findIndex(i => i === item);
                      const Icon = item.icon;
                      
                      return (
                        <HStack
                          key={item.title}
                          px={4}
                          py={2.5}
                          spacing={3}
                          cursor="pointer"
                          bg={globalIndex === selectedIndex ? 'bg.hover' : 'transparent'}
                          _hover={{ bg: 'bg.hover' }}
                          onClick={() => handleSelect(item)}
                          transition="all 0.15s"
                        >
                          <Icon size={16} color="var(--chakra-colors-brand-400)" />
                          <Text 
                            flex={1} 
                            fontSize="sm" 
                            color="text.primary"
                            fontWeight="medium"
                          >
                            {item.title}
                          </Text>
                          <ArrowRight 
                            size={14} 
                            color="var(--chakra-colors-text-secondary)"
                            opacity={globalIndex === selectedIndex ? 1 : 0}
                          />
                        </HStack>
                      );
                    })}
                  </VStack>

                  {groupIndex < Object.keys(groupedItems).length - 1 && (
                    <Divider borderColor="border.primary" />
                  )}
                </Box>
              ))
            ) : (
              <Box px={4} py={12} textAlign="center">
                <Text color="text.secondary" fontSize="sm">
                  No results found for "{searchQuery}"
                </Text>
              </Box>
            )}
          </Box>

          {/* Footer with shortcuts */}
          <Box
            px={4}
            py={2.5}
            borderTop="1px solid"
            borderColor="border.primary"
            bg="bg.secondary"
          >
            <HStack justify="space-between" fontSize="xs" color="text.secondary">
              <HStack spacing={4}>
                <HStack spacing={1}>
                  <Kbd>↑</Kbd>
                  <Kbd>↓</Kbd>
                  <Text>Navigate</Text>
                </HStack>
                <HStack spacing={1}>
                  <Kbd>↵</Kbd>
                  <Text>Select</Text>
                </HStack>
              </HStack>
              <HStack spacing={1}>
                <Text>Press</Text>
                <Kbd>Ctrl + K</Kbd>
                <Text>to open</Text>
              </HStack>
            </HStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommandPalette;