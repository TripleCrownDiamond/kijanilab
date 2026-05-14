"use client";

import { useEffect, useRef } from "react";
import { animate, inView, useReducedMotion } from "motion/react";

type Props = {
  to: number;
  duration?: number;        // seconds
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  format?: (n: number) => string;
};

/**
 * <CountUp to={42} suffix="+" /> — animates 0 → target when scrolled into view.
 * Uses motion's `animate()` + `inView()` for a one-shot, GC-friendly count.
 */
export function CountUp({ to, duration = 1.4, prefix = "", suffix = "", decimals = 0, className, format }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const formatter = format ?? ((n: number) => n.toLocaleString("fr-FR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }));

    if (reduceMotion) {
      el.textContent = `${prefix}${formatter(to)}${suffix}`;
      return;
    }

    el.textContent = `${prefix}${formatter(0)}${suffix}`;

    const stop = inView(el, () => {
      const controls = animate(0, to, {
        duration,
        ease: [0.2, 0.7, 0.2, 1],
        onUpdate: (v) => { el.textContent = `${prefix}${formatter(v)}${suffix}`; },
      });
      return () => controls.stop();
    });
    return () => stop();
  }, [to, duration, prefix, suffix, decimals, format, reduceMotion]);

  return <span ref={ref} className={className} aria-label={`${prefix}${to}${suffix}`}>{prefix}0{suffix}</span>;
}
