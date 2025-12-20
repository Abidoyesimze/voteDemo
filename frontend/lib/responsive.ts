/**
 * Responsive design utilities
 */

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * Check if screen size matches breakpoint
 */
export function isBreakpoint(breakpoint: keyof typeof breakpoints): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints[breakpoint];
}

/**
 * Get responsive class names based on screen size
 */
export function getResponsiveClasses(
  base: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string
): string {
  const classes = [base];
  if (sm) classes.push(`sm:${sm}`);
  if (md) classes.push(`md:${md}`);
  if (lg) classes.push(`lg:${lg}`);
  if (xl) classes.push(`xl:${xl}`);
  return classes.join(' ');
}

/**
 * Mobile-first responsive values
 */
export function responsive<T>(values: {
  base: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
}): T {
  if (typeof window === 'undefined') return values.base;

  if (window.innerWidth >= breakpoints.xl && values.xl !== undefined) {
    return values.xl;
  }
  if (window.innerWidth >= breakpoints.lg && values.lg !== undefined) {
    return values.lg;
  }
  if (window.innerWidth >= breakpoints.md && values.md !== undefined) {
    return values.md;
  }
  if (window.innerWidth >= breakpoints.sm && values.sm !== undefined) {
    return values.sm;
  }
  return values.base;
}









