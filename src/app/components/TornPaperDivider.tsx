import { motion, useReducedMotion } from "motion/react";

/**
 * Horizontal torn-paper strip (matches monboum.fr grunge separator feel).
 * Uses official asset from monboum.fr — see /public/branding/welcome-grunge.png
 */
export function TornPaperDivider({ flip = false, className = "" }: { flip?: boolean; className?: string }) {
  const reduce = useReducedMotion();

  const style = {
    transform: flip ? "scaleY(-1)" : undefined,
  } as const;

  if (reduce) {
    return (
      <div
        className={`torn-paper-divider pointer-events-none select-none ${className}`}
        aria-hidden="true"
        style={style}
      />
    );
  }

  return (
    <motion.div
      className={`torn-paper-divider pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={style}
      initial={{ opacity: 0, scaleY: 0.85 }}
      whileInView={{ opacity: 0.95, scaleY: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
