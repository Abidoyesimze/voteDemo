'use client';

interface RangeInputProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
  label?: string;
  className?: string;
}

export default function RangeInput({
  min,
  max,
  value,
  onChange,
  step = 1,
  label,
  className = '',
}: RangeInputProps) {
  const handleMinChange = (newMin: number) => {
    onChange([Math.min(newMin, value[1]), value[1]]);
  };

  const handleMaxChange = (newMax: number) => {
    onChange([value[0], Math.max(newMax, value[0])]);
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="flex items-center gap-4">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-ring transition-colors hover:border-blue-400 dark:hover:border-blue-500"
          aria-label={`Minimum ${label || 'value'}`}
        />
        <span className="text-gray-500 dark:text-gray-400" aria-hidden="true">to</span>
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-ring transition-colors hover:border-blue-400 dark:hover:border-blue-500"
          aria-label={`Maximum ${label || 'value'}`}
        />
      </div>
    </div>
  );
}



