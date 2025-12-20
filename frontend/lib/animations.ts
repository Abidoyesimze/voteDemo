/**
 * Animation utility functions and constants
 */

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 1000,
} as const;

export const ANIMATION_EASING = {
  ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

/**
 * Stagger animation delay calculator
 */
export function getStaggerDelay(index: number, baseDelay: number = 50): number {
  return index * baseDelay;
}

/**
 * Fade in animation style
 */
export function fadeIn(delay: number = 0, duration: number = ANIMATION_DURATION.normal) {
  return {
    animation: `fadeIn ${duration}ms ease-out ${delay}ms both`,
  };
}

/**
 * Slide up animation style
 */
export function slideUp(delay: number = 0, duration: number = ANIMATION_DURATION.normal) {
  return {
    animation: `slideUp ${duration}ms ease-out ${delay}ms both`,
  };
}

/**
 * Scale animation style
 */
export function scale(delay: number = 0, duration: number = ANIMATION_DURATION.fast) {
  return {
    animation: `scale ${duration}ms ease-out ${delay}ms both`,
  };
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get animation duration respecting user preferences
 */
export function getAnimationDuration(baseDuration: number): number {
  return prefersReducedMotion() ? 0 : baseDuration;
}

