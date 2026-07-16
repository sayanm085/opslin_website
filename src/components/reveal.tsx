"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

/** Compatibility wrapper for the older landing components. Active site pages
 * use the same Framer Motion reveal behavior through site/scroll-reveal. */
export function Reveal({ children, className = "", delay = 0, style }: { children: ReactNode; className?: string; delay?: number; style?: CSSProperties }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} style={style} initial={{ opacity: 0, y: reduce ? 0 : 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8%" }} transition={{ duration: reduce ? .01 : .42, delay: reduce ? 0 : Math.min(delay / 1000, .3), ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
