'use client';

import { useState, useCallback } from 'react';

export function useConfetti() {
  const [isActive, setIsActive] = useState(false);

  const trigger = useCallback((duration: number = 3000) => {
    setIsActive(true);
    setTimeout(() => setIsActive(false), duration);
  }, []);

  return {
    isActive,
    trigger,
  };
}

