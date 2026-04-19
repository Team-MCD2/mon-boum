import { useRef, useEffect, useState } from "react";
import { useInView } from "motion/react";

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Animated counter — starts at 0, eases to `end` once the element becomes
 * visible in the viewport. Respects reduced-motion by jumping directly to
 * the final value.
 *
 * Bug fix (2026-04-19): the previous implementation relied on a `startedRef`
 * guard + `margin: "-80px"` which could silently keep the counter stuck at 0
 * when (a) React 18 strict-mode double-invoked the effect or (b) the element
 * scrolled into view but never reached the -80px offset (short pages). The
 * new version uses `amount: 0.1`, cancels the rAF on cleanup, and derives the
 * animation from a single effect keyed on `inView`.
 */
export function CountUp({
  end,
  duration = 2,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = "",
  style,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    // Respect reduced motion — skip the animation entirely.
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setValue(end);
      return;
    }

    let raf = 0;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(eased * end);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{value.toFixed(decimals).replace(".", ",")}{suffix}
    </span>
  );
}
