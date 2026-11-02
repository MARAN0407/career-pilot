import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface ResumeScoreGaugeProps {
  score: number; // 0 to 100
  quality: string;
}

export const ResumeScoreGauge: React.FC<ResumeScoreGaugeProps> = ({ score, quality }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 85) return '#0F766E';
    if (score >= 70) return '#1D4ED8';
    return '#D97706';
  };

  return (
    <div className="academic-card p-6 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white">
      <div className="flex items-center gap-6">
        {/* Circular Gauge */}
        <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="#CBD5E1"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke={getScoreColor()}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl sm:text-4xl font-black text-[#173B63] font-mono leading-none">
              {score}
            </span>
            <span className="text-[11px] uppercase font-bold text-slate-700 mt-0.5">/ 100</span>
          </div>
        </div>

        {/* Text overview */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              ATS Readiness Score
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
              {quality}
            </span>
          </div>
          <h3 className="text-lg font-bold text-[#173B63]">
            Verified for AI & Software Engineer Applications
          </h3>
          <p className="text-xs text-slate-800 font-medium max-w-md">
            Your resume passes automated parser screenings for Tier-1 technology companies and campus recruiters.
          </p>
        </div>
      </div>

      {/* Quick stats checklist */}
      <div className="grid grid-cols-2 gap-3 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-slate-200 pt-4 sm:pt-0 sm:pl-6 text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#0F766E]" />
          <span className="text-slate-900 font-bold">10 Core Skills Found</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#0F766E]" />
          <span className="text-slate-900 font-bold">Standard Formatting</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#0F766E]" />
          <span className="text-slate-900 font-bold">Action Verbs Verified</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span className="text-slate-900 font-bold">2 Keywords Missing</span>
        </div>
      </div>
    </div>
  );
};
