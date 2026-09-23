"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const pageVariants = {
  initial: {
    opacity: 0.6,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0.6,
    filter: "blur(4px)",
  },
};

const pageTransition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1] as const, // Gentle, smooth easing
};

/**
 * Setara dengan kombinasi <AnimatePresence> di RootLayout.tsx + <PageTransition>
 * di tiap halaman pada versi React Router. Di App Router, transisi cukup
 * dipasang sekali di sini karena `children` berganti setiap navigasi.
 */
export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
