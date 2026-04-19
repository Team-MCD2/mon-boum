import { useRef, useState } from "react";
import { motion } from "motion/react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  strength?: number;
  as?: "button" | "a" | "div";
  href?: string;
  onClick?: () => void;
  "aria-label"?: string;
  target?: string;
  rel?: string;
}

export function MagneticButton({
  children,
  className = "",
  style,
  strength = 0.35,
  as: Tag = "div",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [innerPos, setInnerPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    setPos({ x: dx * strength, y: dy * strength });
    setInnerPos({ x: dx * (strength * 0.5), y: dy * (strength * 0.5) });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
    setInnerPos({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className="mag-btn"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
    >
      <motion.div
        animate={{ x: innerPos.x, y: innerPos.y }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* @ts-ignore */}
        <Tag className={className} style={style} {...props}>
          {children}
        </Tag>
      </motion.div>
    </motion.div>
  );
}
