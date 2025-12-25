/**
 * Performance utility functions
 */

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function requestAnimationFrameThrottle<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;

  return function executedFunction(...args: Parameters<T>) {
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        func(...args);
        rafId = null;
      });
    }
  };
}

export function measurePerformance(name: string, fn: () => void) {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`);
  } else {
    fn();
  }
}

export function createPerformanceMarker(name: string): () => void {
  if (typeof window !== 'undefined' && 'performance' in window && 'mark' in performance) {
    performance.mark(`${name}-start`);
    return () => {
      performance.mark(`${name}-end`);
      try {
        performance.measure(name, `${name}-start`, `${name}-end`);
      } catch (e) {
        // Measure might already exist
      }
    };
  }
  return () => {};
}

export function lazyLoad<T>(
  importFn: () => Promise<{ default: T }>
): Promise<T> {
  return importFn().then((module) => module.default);
}

export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

export function batchUpdates<T>(
  updates: (() => T)[],
  batchSize: number = 10
): Promise<T[]> {
  return new Promise((resolve) => {
    const results: T[] = [];
    let index = 0;

    const processBatch = () => {
      const batch = updates.slice(index, index + batchSize);
      batch.forEach((update) => results.push(update()));
      index += batchSize;

      if (index < updates.length) {
        requestAnimationFrame(processBatch);
      } else {
        resolve(results);
      }
    };

    processBatch();
  });
}
