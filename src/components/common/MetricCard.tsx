import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  accentColor?: 'navy' | 'blue' | 'teal' | 'indigo' | 'amber';
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  accentColor = 'navy',
  onClick
}) => {
  const colorMap = {
    navy: {
      bg: 'bg-blue-50 text-[#173B63] border-blue-200',
      borderHover: 'hover:border-[#173B63]',
      textAccent: 'text-[#173B63]'
    },
    blue: {
      bg: 'bg-blue-50 text-[#1D4ED8] border-blue-200',
      borderHover: 'hover:border-[#1D4ED8]',
      textAccent: 'text-[#1D4ED8]'
    },
    teal: {
      bg: 'bg-teal-50 text-[#0F766E] border-teal-200',
      borderHover: 'hover:border-[#0F766E]',
      textAccent: 'text-[#0F766E]'
    },
    indigo: {
      bg: 'bg-purple-50 text-[#6D28D9] border-purple-200',
      borderHover: 'hover:border-[#6D28D9]',
      textAccent: 'text-[#6D28D9]'
    },
    amber: {
      bg: 'bg-amber-50 text-amber-900 border-amber-200',
      borderHover: 'hover:border-amber-600',
      textAccent: 'text-amber-900'
    }
  };

  const colors = colorMap[accentColor];

  return (
    <div
      onClick={onClick}
      className={`academic-card p-5 relative overflow-hidden transition-all ${
        onClick ? 'cursor-pointer academic-card-hover' : ''
      } ${colors.borderHover}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${colors.textAccent}`}>
              {value}
            </h3>
            {trend && (
              <span
                className={`text-[11px] font-bold px-1.5 py-0.5 rounded border ${
                  trend.isPositive 
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300' 
                    : 'bg-rose-50 text-rose-900 border-rose-300'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-slate-700 font-medium mt-1">{subtitle}</p>}
        </div>

        <div className={`p-3 rounded-xl border ${colors.bg}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
