'use client';

import { useEffect, useRef } from 'react';

export function useMount(callback: () => void | (() => void)) {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return callback();
    }
  }, [callback]);
}

export function useUnmount(callback: () => void) {
  useEffect(() => {
    return callback;
  }, [callback]);
}

