/**
 * Shared Motion Tokens and Transition Constants
 * Aligned with .impeccable/design.json and B2B healthcare design rules:
 * - Restrained, purposeful motion (no bouncing, no floating blobs, zero glow)
 * - Cubic bezier curve: [0.16, 1, 0.3, 1]
 * - Fast interaction duration: 150ms
 * - Medium elevation duration: 280ms - 350ms
 */

export const TRANSITION_EASE = [0.16, 1, 0.3, 1];

export const transitionFast = {
  duration: 0.15,
  ease: TRANSITION_EASE,
};

export const transitionMedium = {
  duration: 0.28,
  ease: TRANSITION_EASE,
};

export const transitionEntrance = {
  duration: 0.35,
  ease: TRANSITION_EASE,
};

// Reusable variants for section and hero reveals
export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionEntrance,
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitionMedium,
  },
};

/**
 * Dispatches a custom event across the window so CartBadge and any open
 * cart / product views synchronize immediately without polling delays.
 */
export function dispatchCartUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('alphamed-cart-updated'));
  }
}
