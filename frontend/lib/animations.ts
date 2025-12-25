/**
 * Animation utility functions
 */

export interface AnimationOptions {
  duration?: number;
  easing?: string;
  delay?: number;
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}

export function createKeyframeAnimation(
  name: string,
  keyframes: Record<string, Record<string, string | number>>,
  options: AnimationOptions = {}
): string {
  const { duration = 1000, easing = 'ease', delay = 0, fillMode = 'forwards' } = options;
  
  // This would typically be used with CSS-in-JS or injected styles
  // For now, return a CSS string representation
  const keyframeString = Object.entries(keyframes)
    .map(([percentage, properties]) => {
      const props = Object.entries(properties)
        .map(([prop, value]) => `    ${prop}: ${value};`)
        .join('\n');
      return `  ${percentage} {\n${props}\n  }`;
    })
    .join('\n');

  return `@keyframes ${name} {\n${keyframeString}\n}`;
}

export function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export function easeIn(t: number): number {
  return t * t;
}

export function easeOut(t: number): number {
  return t * (2 - t);
}

export function linear(t: number): number {
  return t;
}

export function animateValue(
  start: number,
  end: number,
  duration: number,
  callback: (value: number) => void,
  easing: (t: number) => number = easeInOut
): void {
  const startTime = performance.now();
  
  function animate(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easing(progress);
    const value = start + (end - start) * eased;
    
    callback(value);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  
  requestAnimationFrame(animate);
}

export function staggerAnimation(
  items: number,
  staggerDelay: number = 50
): number[] {
  return Array.from({ length: items }, (_, i) => i * staggerDelay);
}

export function createSpringAnimation(
  target: number,
  current: number = 0,
  velocity: number = 0,
  stiffness: number = 100,
  damping: number = 10,
  onUpdate: (value: number) => void
): () => void {
  let position = current;
  let currentVelocity = velocity;
  let animationId: number | null = null;
  let isRunning = true;

  function animate() {
    if (!isRunning) return;

    const springForce = (target - position) * stiffness;
    const dampingForce = -currentVelocity * damping;
    const acceleration = springForce + dampingForce;

    currentVelocity += acceleration * 0.016; // ~60fps
    position += currentVelocity * 0.016;

    onUpdate(position);

    if (Math.abs(target - position) < 0.01 && Math.abs(currentVelocity) < 0.01) {
      position = target;
      onUpdate(position);
      isRunning = false;
      return;
    }

    animationId = requestAnimationFrame(animate);
  }

  animationId = requestAnimationFrame(animate);

  return () => {
    isRunning = false;
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
    }
  };
}
