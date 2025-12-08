import { motion, useAnimation } from "framer-motion";
import { Box } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export const MotionBox = ({ children, delay = 0, ...props }) => {
  const controls = useAnimation();

  const [ref, inView] = useInView({
    triggerOnce: false,  // 👈 allows repeated triggering
    threshold: 0.2,      // 20% in view before animation starts
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");   // 👈 play animation when in view
    } else {
      controls.start("hidden");    // 👈 reset when leaving view
    }
  }, [inView, controls]);

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
      initial="hidden"     // 👈 start hidden every time
      animate={controls}
      variants={variants}
      {...props}
    >
      {children}
    </Box>
  );
};
// TODO: Works for learning, certificates but not for many of the others test again and modify the code 