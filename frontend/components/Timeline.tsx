'use client';

import { ReactNode } from 'react';

interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  icon?: ReactNode;
  status?: 'completed' | 'active' | 'pending';
}

interface TimelineProps {
  items: TimelineItem[];
  orientation?: 'vertical' | 'horizontal';
}

export default function Timeline({ items, orientation = 'vertical' }: TimelineProps) {
  if (orientation === 'horizontal') {
    return (
      <div className="flex items-center gap-4 overflow-x-auto pb-4">
        {items.map((item, index) => (
          <div key={item.id} className="flex items-center flex-shrink-0">
            <div className="flex flex-col items-center min-w-[150px]">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all duration-300 ${
                  item.status === 'completed'
                    ? 'bg-gradient-to-br from-green-500 to-green-600'
                    : item.status === 'active'
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 animate-pulse'
                    : 'bg-gradient-to-br from-gray-400 to-gray-500'
                }`}
              >
                {item.icon || (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </div>
              <div className="mt-2 text-center">
                <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.title}</div>
                {item.description && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.description}</div>
                )}
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{item.timestamp}</div>
              </div>
            </div>
            {index < items.length - 1 && (
              <div
                className={`h-1 w-16 mx-2 transition-all duration-300 ${
                  item.status === 'completed'
                    ? 'bg-gradient-to-r from-green-500 to-blue-500'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={item.id} className="relative flex gap-4">
            <div
              className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all duration-300 ${
                item.status === 'completed'
                  ? 'bg-gradient-to-br from-green-500 to-green-600'
                  : item.status === 'active'
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 animate-pulse'
                  : 'bg-gradient-to-br from-gray-400 to-gray-500'
              }`}
            >
              {item.icon || (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>
            <div className="flex-1 pb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{item.title}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{item.timestamp}</span>
                </div>
                {item.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

