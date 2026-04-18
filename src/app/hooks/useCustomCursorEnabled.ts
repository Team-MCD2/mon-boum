import { useEffect, useState } from "react";

/** True when large desktop + fine pointer + user did not ask for reduced motion */
export function useCustomCursorEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");

    const sync = () => {
      setEnabled(mq.matches && !reduce.matches && !coarse.matches);
    };

    sync();
    mq.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    coarse.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
      coarse.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("custom-cursor-active", enabled);
    return () => document.documentElement.classList.remove("custom-cursor-active");
  }, [enabled]);

  return enabled;
}
