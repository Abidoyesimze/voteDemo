'use client';

interface DividerProps {
  text?: string;
  className?: string;
}

export default function Divider({ text, className = '' }: DividerProps) {
  if (text) {
    return (
      <div className={`flex items-center gap-4 my-6 ${className}`} role="separator" aria-label={text}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-gray-200 dark:to-gray-700"></div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 px-2">
          {text}
        </span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-200 dark:via-gray-700 to-gray-200 dark:to-gray-700"></div>
      </div>
    );
  }

  return (
    <div className={`h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-6 ${className}`} role="separator"></div>
  );
}



