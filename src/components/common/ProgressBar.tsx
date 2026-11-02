import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'navy' | 'blue' | 'teal' | 'indigo' | 'amber';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showPercentage = true,
  size = 'md',
  color = 'blue'
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  const heightMap = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  const colorMap = {
    navy: 'bg-[#173B63]',
    blue: 'bg-[#3B82C4]',
    teal: 'bg-[#2F9C95]',
    indigo: 'bg-[#7567C7]',
    amber: 'bg-amber-500'
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs mb-1.5">
          {label && <span className="font-medium text-slate-700">{label}</span>}
          {showPercentage && (
            <span className="font-semibold text-slate-600 tabular-nums">{clampedValue}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-slate-200/80 rounded-full overflow-hidden ${heightMap[size]}`}>
        <div
          className={`${heightMap[size]} ${colorMap[color]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};
