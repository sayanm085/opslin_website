"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function RevealGroup({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-8%" }} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.05 } } }}>{children}</motion.div>;
}

export function RevealItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} variants={{ hidden: { opacity: 0, y: reduce ? 0 : 10 }, visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0.01 : 0.42, ease: [0.22, 1, 0.36, 1] } } }}>{children}</motion.div>;
}
