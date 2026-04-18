/** Shared easing / transition presets for consistent motion across the site */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeInOutSharp = [0.76, 0, 0.24, 1] as const;

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.55, ease: easeOutExpo },
};
