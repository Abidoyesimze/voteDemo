'use client';

interface DividerProps {
  text?: string;
  className?: string;
}

export default function Divider({ text, className = '' }: DividerProps) {
  if (text) {
    return (
      <div className={`flex items-center gap-4 my-6 ${className}`}>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {text}
        </span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
      </div>
    );
  }

  return (
    <div className={`h-px bg-gray-200 dark:bg-gray-700 my-6 ${className}`}></div>
  );
}

