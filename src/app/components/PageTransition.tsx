import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useLocation } from "react-router";
import { easeInOutSharp, easeOutExpo } from "../lib/motionPresets";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [reduceMotion, setReduceMotion] = useState(false);
  const [routeChangeCount, setRouteChangeCount] = useState(0);
  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (prevPathRef.current === null) {
      prevPathRef.current = location.pathname;
      return;
    }
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      setRouteChangeCount((c) => c + 1);
    }
  }, [location.pathname]);

  const showCurtain = !reduceMotion && routeChangeCount > 0;

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <>
      {showCurtain && (
        <>
          <motion.div
            key={location.pathname + "-overlay-1"}
            className="fixed inset-0 z-[7000] pointer-events-none"
            style={{ backgroundColor: "var(--b-red)", transformOrigin: "left center" }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: [0, 1, 1, 0], originX: [0, 0, 1, 1] }}
            transition={{ duration: 0.55, times: [0, 0.42, 0.58, 1], ease: easeInOutSharp }}
          />

          <motion.div
            key={location.pathname + "-overlay-2"}
            className="fixed inset-0 z-[6999] pointer-events-none"
            style={{ backgroundColor: "var(--b-black)", transformOrigin: "left center" }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: [0, 1, 1, 0], originX: [0, 0, 1, 1] }}
            transition={{ duration: 0.55, times: [0, 0.42, 0.58, 1], ease: easeInOutSharp, delay: 0.04 }}
          />
        </>
      )}

      <motion.div
        key={location.pathname + "-content"}
        initial={{ opacity: 0, y: showCurtain ? 16 : 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: showCurtain ? 0.45 : 0.35,
          ease: easeOutExpo,
          delay: showCurtain ? 0.22 : 0,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
