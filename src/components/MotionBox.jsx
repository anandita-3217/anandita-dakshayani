import { motion, useAnimation } from "framer-motion";
import { Box } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export const MotionBox = ({ children, delay = 0, ...props }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay },
    },
  };

  return (
    <Box
      as={motion.div}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      {...props}
    >
      {children}
    </Box>
  );
};
