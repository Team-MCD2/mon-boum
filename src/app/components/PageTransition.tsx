import { motion } from "motion/react";
import { useLocation } from "react-router";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();

  return (
    <>
      <motion.div
        key={location.pathname + "-overlay-1"}
        className="fixed inset-0 z-[7000] pointer-events-none"
        style={{ backgroundColor: "var(--b-red)", transformOrigin: "left center" }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: [0, 1, 1, 0], originX: [0, 0, 1, 1] }}
        transition={{ duration: 0.9, times: [0, 0.45, 0.55, 1], ease: [0.76, 0, 0.24, 1] }}
      />

      <motion.div
        key={location.pathname + "-overlay-2"}
        className="fixed inset-0 z-[6999] pointer-events-none"
        style={{ backgroundColor: "var(--b-black)", transformOrigin: "left center" }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: [0, 1, 1, 0], originX: [0, 0, 1, 1] }}
        transition={{ duration: 0.9, times: [0, 0.45, 0.55, 1], ease: [0.76, 0, 0.24, 1], delay: 0.06 }}
      />

      <motion.div
        key={location.pathname + "-content"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
      >
        {children}
      </motion.div>
    </>
  );
}
