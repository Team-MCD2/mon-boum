import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MagneticButton } from "./MagneticButton";
import { easeOutExpo } from "../lib/motionPresets";

export type CelebrityEntry = {
  id: string;
  name: string;
  role: string;
  img: string;
  quote: string;
  attribution?: string;
};

interface CelebritySliderProps {
  celebrities: CelebrityEntry[];
  intervalMs?: number;
}

export function CelebritySlider({ celebrities, intervalMs = 6000 }: CelebritySliderProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % celebrities.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [celebrities.length, intervalMs, isHovered]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = celebrities.length - 1;
      if (next >= celebrities.length) next = 0;
      return next;
    });
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 300 : -300,
        opacity: 0,
        scale: 0.95,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 300 : -300,
        opacity: 0,
        scale: 0.95,
      };
    },
  };

  const current = celebrities[index];

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto flex flex-col pt-8 pb-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[480px] sm:h-[520px] w-full overflow-visible">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.4, ease: easeOutExpo }
            }}
            className="absolute inset-0 w-full shadow-2xl rounded-3xl"
            style={{ backgroundColor: "var(--b-card)" }}
          >
            <div className="h-full flex flex-col md:flex-row overflow-hidden rounded-3xl border border-[var(--b-border)] bg-[var(--b-card)]">
              
              {/* Image Side */}
              <div className="relative w-full md:w-5/12 h-[220px] md:h-full shrink-0">
                <ImageWithFallback 
                  src={current.img} 
                  alt={current.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[rgba(0,0,0,0.85)] to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                  <div className="font-franchise text-3xl drop-shadow-md">
                    {current.name}
                  </div>
                  <div className="text-[0.65rem] uppercase tracking-widest mt-1 text-[var(--b-yellow)] font-bold">
                    {current.role}
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="flex-1 p-6 md:p-10 flex flex-col relative justify-center">
                <Quote size={48} className="absolute top-6 right-6 opacity-10 text-[var(--b-red)]" aria-hidden />
                
                <div className="flex items-center gap-1.5 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="var(--b-yellow)" className="text-[var(--b-yellow)]" />
                  ))}
                  <span className="ml-2 text-xs font-bold uppercase tracking-widest text-[var(--b-muted)]">
                    Validé
                  </span>
                </div>

                <p className="text-lg md:text-2xl leading-relaxed font-medium italic text-[var(--b-white)]">
                  "{current.quote}"
                </p>

                {current.attribution && (
                  <p className="mt-6 text-[0.7rem] uppercase tracking-wider text-[var(--b-muted)]">
                    {current.attribution}
                  </p>
                )}
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-between px-2">
        <div className="flex gap-2.5">
          <MagneticButton as="div">
            <button
              onClick={() => paginate(-1)}
              className="w-12 h-12 flex items-center justify-center rounded-full border transition-colors hover:bg-[var(--b-border)] text-[var(--b-white)] border-[var(--b-border)]"
              aria-label="Précédent"
            >
              <ChevronLeft size={20} />
            </button>
          </MagneticButton>
          <MagneticButton as="div">
            <button
              onClick={() => paginate(1)}
              className="w-12 h-12 flex items-center justify-center rounded-full border transition-colors hover:bg-[var(--b-border)] text-[var(--b-white)] border-[var(--b-border)]"
              aria-label="Suivant"
            >
              <ChevronRight size={20} />
            </button>
          </MagneticButton>
        </div>
        
        {/* Pagination Dots */}
        <div className="hidden sm:flex gap-1.5">
          {celebrities.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === index ? "24px" : "8px",
                backgroundColor: i === index ? "var(--b-red)" : "var(--b-border)",
              }}
              aria-label={`Aller à la citation ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
