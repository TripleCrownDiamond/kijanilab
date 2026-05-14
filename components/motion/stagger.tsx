"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

type StaggerProps = Omit<HTMLMotionProps<"div">, "ref" | "children"> & {
  children: ReactNode;
  delay?: number;
  childDelay?: number;
  once?: boolean;
};

/**
 * <Stagger> — orchestrates a staggered cascade for direct <StaggerItem> children.
 * Each item rises and fades in sequence. Reduced-motion is respected.
 */
export function Stagger({ children, delay = 0, childDelay = 0.08, once = true, ...rest }: StaggerProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <motion.div {...rest}>{children}</motion.div>;
  }
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10%" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: childDelay, delayChildren: delay },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = Omit<HTMLMotionProps<"div">, "ref">;

export function StaggerItem({ children, ...rest }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 22 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2, 0.7, 0.2, 1] } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
