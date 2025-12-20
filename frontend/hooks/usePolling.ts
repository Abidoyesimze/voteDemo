'use client';

import { useEffect, useRef } from 'react';

interface UsePollingOptions {
  callback: () => void | Promise<void>;
  interval: number;
  enabled?: boolean;
  immediate?: boolean;
}

export function usePolling({
  callback,
  interval,
  enabled = true,
  immediate = false,
}: UsePollingOptions) {
  const callbackRef = useRef(callback);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    if (immediate) {
      callbackRef.current();
    }

    intervalRef.current = setInterval(() => {
      callbackRef.current();
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, interval, immediate]);
}

