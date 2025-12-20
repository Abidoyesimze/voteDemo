'use client';

import { useState } from 'react';

export type SortOption = 'votes-desc' | 'votes-asc' | 'code-asc' | 'code-desc';
export type FilterOption = 'all' | 'leading' | 'trailing';

interface ContenderFiltersProps {
  onSortChange: (sort: SortOption) => void;
  onFilterChange: (filter: FilterOption) => void;
  currentSort: SortOption;
  currentFilter: FilterOption;
  totalVotes: number;
}

export default function ContenderFilters({
  onSortChange,
  onFilterChange,
  currentSort,
  currentFilter,
  totalVotes,
}: ContenderFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="w-full sm:w-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Sort By
                </label>
                <select
                  value={currentSort}
                  onChange={(e) => onSortChange(e.target.value as SortOption)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="votes-desc">Most Votes</option>
                  <option value="votes-asc">Least Votes</option>
                  <option value="code-asc">Code A-Z</option>
                  <option value="code-desc">Code Z-A</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Filter
                </label>
                <select
                  value={currentFilter}
                  onChange={(e) => onFilterChange(e.target.value as FilterOption)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Contenders</option>
                  <option value="leading">Leading (Top 50%)</option>
                  <option value="trailing">Trailing (Bottom 50%)</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

