import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { easeOutExpo } from "../lib/motionPresets";

const STORAGE_KEY = "monboum_preface_seen";

function readSeen(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function writeSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
}

/**
 * Opening sequence: logo + slogan + loader bar (CSS-driven — avoids Motion repeat blocking exit).
 * Once per browser tab session. Skipped if prefers-reduced-motion.
 */
export function IntroPreface() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readSeen()) return;
    if (reduceMotion) {
      writeSeen();
      return;
    }
    setVisible(true);
  }, [reduceMotion]);

  useEffect(() => {
    if (!visible) return;
    const t = window.setTimeout(() => setVisible(false), 2800);
    return () => window.clearTimeout(t);
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        writeSeen();
      }}
    >
      {visible && (
        <motion.div
          key="preface"
          className="preface-overlay fixed inset-0 z-[12000] flex flex-col items-center justify-center px-6"
          style={{ backgroundColor: "var(--b-black)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: easeOutExpo }}
          aria-hidden="true"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-12deg, transparent 0, transparent 48px, rgba(229,37,10,0.15) 48px, rgba(229,37,10,0.15) 49px)",
            }}
          />
          <motion.div
            className="pointer-events-none absolute top-1/3 left-1/2 h-[min(50vh,28rem)] w-[min(90vw,28rem)] -translate-x-1/2 rounded-full blur-[100px]"
            style={{ background: "radial-gradient(circle, rgba(229,37,10,0.35) 0%, transparent 70%)" }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: easeOutExpo }}
          />

          <div className="relative z-[1] flex flex-col items-center text-center max-w-md">
            <motion.img
              src="/branding/logo-boum.png"
              alt=""
              width={200}
              height={64}
              className="h-14 sm:h-16 w-auto object-contain drop-shadow-[0_12px_48px_rgba(229,37,10,0.35)]"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.05 }}
            />
            <motion.p
              className="font-franchise mt-5 text-lg sm:text-xl tracking-[0.12em]"
              style={{ color: "rgba(240,237,232,0.88)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5, ease: easeOutExpo }}
            >
              Le meilleur du street-food
            </motion.p>
            <motion.p
              className="mt-2 text-[0.65rem] sm:text-xs uppercase tracking-[0.25em]"
              style={{ color: "var(--b-muted)", fontWeight: 700 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.45 }}
            >
              Depuis 2004 · Toulouse
            </motion.p>
          </div>

          <div
            className="preface-loader-track absolute bottom-[12vh] left-1/2 w-[min(220px,70vw)] -translate-x-1/2 h-1 rounded-full overflow-hidden z-[2]"
            style={{ backgroundColor: "var(--b-card2)", border: "1px solid var(--b-border)" }}
          >
            <div className="preface-loader-bar h-full w-[45%] rounded-full" />
          </div>

          <span className="sr-only">Chargement de Mon Boum</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
