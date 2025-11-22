// components/ScrollToTop.js
import React, { useState, useEffect } from 'react';
import { IconButton } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const MotionIconButton = motion.create(IconButton);

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <MotionIconButton
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          icon={<ArrowUp size={20} />}
          aria-label="Scroll to top"
          position="fixed"
          bottom={{ base: 4, md: 8 }}
          right={{ base: 4, md: 8 }}
          size="lg"
          bg="brand.400"
          color="white"
          borderRadius="full"
          boxShadow="lg"
          zIndex={999}
          _hover={{
            bg: 'brand.500',
            boxShadow: '0 8px 25px rgba(20, 184, 166, 0.4)',
          }}
          _active={{
            bg: 'brand.600',
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;