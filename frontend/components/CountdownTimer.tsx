'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  endTime: number;
  onComplete?: () => void;
}

export default function CountdownTimer({ endTime, onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Math.floor(Date.now() / 1000);
      const difference = endTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        onComplete?.();
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / 86400),
        hours: Math.floor((difference % 86400) / 3600),
        minutes: Math.floor((difference % 3600) / 60),
        seconds: difference % 60,
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [endTime, onComplete]);

  if (!timeLeft) return null;

  const { days, hours, minutes, seconds } = timeLeft;
  const isExpired = days === 0 && hours === 0 && minutes === 0 && seconds === 0;

  if (isExpired) {
    return (
      <div className="text-center py-4">
        <p className="text-lg font-bold text-red-600 dark:text-red-400">Voting Ended</p>
      </div>
    );
  }

  const timeUnits = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ].filter(unit => unit.value > 0 || unit.label === 'Seconds');

  return (
    <div className="flex items-center justify-center gap-4 flex-wrap" role="timer" aria-live="polite" aria-atomic="true">
      {timeUnits.map((unit, index) => (
        <div
          key={unit.label}
          className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700 min-w-[70px] shadow-sm hover:shadow-md transition-shadow duration-200 animate-scale-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <span 
            className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums"
            aria-label={`${unit.value} ${unit.label}`}
          >
            {String(unit.value).padStart(2, '0')}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}



