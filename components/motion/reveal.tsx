"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = Omit<HTMLMotionProps<"div">, "ref" | "children"> & {
  children?: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
};

/**
 * <Reveal /> — wraps any block with an opacity/translate-up reveal on scroll.
 * Drop-in for client components in the Next.js side. Respects reduced motion.
 *
 * Usage:
 *   <Reveal delay={0.1}><h2>...</h2></Reveal>
 */
export function Reveal({ delay = 0, y = 28, once = true, children, ...rest }: RevealProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <motion.div {...rest}>{children}</motion.div>;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
