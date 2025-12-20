'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseVoteCounterOptions {
  initialValue: number;
  updateInterval?: number;
  onUpdate?: (newValue: number) => void;
}

export function useVoteCounter({
  initialValue,
  updateInterval = 5000,
  onUpdate,
}: UseVoteCounterOptions) {
  const [count, setCount] = useState(initialValue);
  const [isAnimating, setIsAnimating] = useState(false);

  const updateCount = useCallback((newValue: number) => {
    if (newValue !== count) {
      setIsAnimating(true);
      setCount(newValue);
      onUpdate?.(newValue);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 600);
    }
  }, [count, onUpdate]);

  useEffect(() => {
    setCount(initialValue);
  }, [initialValue]);

  return {
    count,
    isAnimating,
    updateCount,
  };
}

/**
 * Animated number formatter with count-up effect
 */
export function useAnimatedNumber(value: number, duration: number = 1000) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value !== displayValue) {
      setIsAnimating(true);
      const startValue = displayValue;
      const endValue = value;
      const difference = endValue - startValue;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(startValue + difference * easeOut);
        
        setDisplayValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [value, displayValue, duration]);

  return { displayValue, isAnimating };
}

