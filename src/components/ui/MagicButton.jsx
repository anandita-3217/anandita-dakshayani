import { Button, Box } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { GoArrowRight } from "react-icons/go";

const MotionButton = motion(Button);
const MotionBox = motion(Box);

export default function MagicButton() {
  const controls = useAnimation();

  const handleHoverStart = async () => {
    // move out to the right
    await controls.start({
      x: 30,
      opacity: 0,
      transition: { duration: 0.15, ease: "easeIn" },
    });

    // jump to left instantly
    await controls.set({
      x: -30,
      opacity: 0,
    });

    // spring back into center
    await controls.start({
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 20,
      },
    });
  };

  return (
    <MotionButton
      onHoverStart={handleHoverStart}
      size="lg"
      px={3}
      py={3}
      minW="260px"
      bg="rgba(255, 255, 255, 0.1)"
      color="white"
      border="2px solid"
      borderColor="rgba(255, 255, 255, 0.2)"
      borderRadius="full"
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 30px rgba(255, 255, 255, 0.3)",
      }}
      whileTap={{ scale: 0.98 }}
      _hover={{
        bg: "white",
        color: "gray.900",
      }}
      transition={{ duration: 0.3 }}
    >
      <Box
        w="full"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        pl={4}
      >
        {/* Text */}
        <Box fontWeight="600" fontSize="md">
          Let's Connect
        </Box>

        {/* Icon circle */}
        <Box
          bg="white"
          h={10}
          w={10}
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
        >
          <MotionBox animate={controls}>
            <GoArrowRight fontSize={16} color="black" />
          </MotionBox>
        </Box>
      </Box>
    </MotionButton>
  );
}
