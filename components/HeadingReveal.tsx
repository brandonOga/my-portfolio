// app/components/HeadingReveal.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import React from "react";

type Props = {
  text: string;
  className?: string;      // Tailwind styles for the <h1>
  delay?: number;          // initial delay before animation starts
  once?: boolean;          // animate only the first time it enters the viewport
};

export default function HeadingReveal({
  text,
  className = "text-5xl md:text-7xl font-bold tracking-tight",
  delay = 0,
  once = true,
}: Props) {
  const shouldReduce = useReducedMotion();

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduce ? 0 : 0.035,
        delayChildren: delay,
      },
    },
  };

  const letter = {
    hidden: {
      y: shouldReduce ? 0 : 20,
      opacity: shouldReduce ? 1 : 0,
      filter: shouldReduce ? "blur(0px)" : "blur(6px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }, // easeOutExpo-ish
    },
  };

  // Split text into characters while preserving spaces
  const chars = Array.from(text);

  return (
    <motion.h1
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.7 }}
      aria-label={text}
    >
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          variants={letter}
          style={{ display: "inline-block", whiteSpace: ch === " " ? "pre" : "normal" }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.h1>
  );
}
