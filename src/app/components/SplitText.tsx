import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface SplitTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  as?: keyof JSX.IntrinsicElements;
  mode?: "words" | "chars";
  once?: boolean;
  margin?: string;
}

const wordVariant = {
  hidden: { y: "105%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const charVariant = {
  hidden: { y: "110%", opacity: 0, rotateZ: 4 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    rotateZ: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.04,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function SplitText({
  text,
  className = "",
  style,
  delay = 0,
  as: Tag = "div",
  mode = "words",
  once = true,
  margin = "-80px",
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: margin as any });

  const tokens = mode === "words" ? text.split(" ") : text.split("");
  const variant = mode === "words" ? wordVariant : charVariant;

  return (
    <div ref={ref}>
      <Tag
        className={className}
        style={{ ...style, display: "flex", flexWrap: "wrap", gap: mode === "words" ? "0.28em" : "0" }}
        aria-label={text}
      >
        {tokens.map((token, i) => (
          <span key={i} className="split-word" style={{ overflow: "hidden" }}>
            <motion.span
              className="split-char"
              style={{ display: "inline-block" }}
              variants={variant}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i + delay * 10}
              aria-hidden="true"
            >
              {token}
              {mode === "words" && i < tokens.length - 1 ? "" : ""}
            </motion.span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
