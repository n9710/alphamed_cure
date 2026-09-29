'use client';

import { motion, useReducedMotion } from 'motion/react';
import { TRANSITION_EASE } from '@/lib/motion';

/**
 * ProductGridAnimated provides a subtle 250ms entrance transition when
 * filter, search, or pagination results change instead of an abrupt visual jump.
 * Respects prefers-reduced-motion.
 */
export default function ProductGridAnimated({ children, layoutKey }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {children}
      </div>
    );
  }

  return (
    <motion.div
      key={layoutKey}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: TRANSITION_EASE }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {children}
    </motion.div>
  );
}
