import { useEffect, useRef, useState } from "react";

/**
 * Street-food / franchise vibe: red core + warm ring with subtle trail.
 * Only mounted when `useCustomCursorEnabled()` is true (desktop + fine pointer).
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
      }
      raf = requestAnimationFrame(animate);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor], input, select, textarea, [role='button']")) {
        setHovering(true);
      }
    };
    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor], input, select, textarea, [role='button']")) {
        setHovering(false);
      }
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onEnter, { passive: true });
    window.addEventListener("mouseout", onLeave, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onEnter);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: clicking ? 0 : 1 }}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${hovering ? "hovering" : ""} ${clicking ? "clicking" : ""}`}
      />
    </>
  );
}
