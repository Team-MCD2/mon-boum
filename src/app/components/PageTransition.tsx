import { motion, AnimatePresence } from "motion/react";
import { useLocation } from "react-router";

interface PageTransitionProps {
  children: React.ReactNode;
}

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.06 } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
};

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={contentVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
