import React from 'react';
import { RoadmapMilestone } from '../../types';
import { CheckCircle2, Clock, Circle, ArrowDown, BookOpen, Sparkles } from 'lucide-react';
import { ProgressBar } from '../common/ProgressBar';

interface RoadmapTimelineProps {
  milestones: RoadmapMilestone[];
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ milestones }) => {
  return (
    <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
      {milestones.map((m, idx) => {
        const isCompleted = m.status === 'completed';
        const isInProgress = m.status === 'in_progress';

        return (
          <div key={m.id} className="relative group">
            {/* Step Icon Node */}
            <div
              className={`absolute -left-6 sm:-left-8 top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                isCompleted
                  ? 'bg-[#2F9C95] border-white text-white shadow-sm ring-4 ring-teal-100'
                  : isInProgress
                  ? 'bg-[#3B82C4] border-white text-white shadow-md ring-4 ring-blue-100 animate-pulse-subtle'
                  : 'bg-white border-slate-300 text-slate-400 ring-2 ring-slate-100'
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : isInProgress ? (
                <Clock className="w-4 h-4" />
              ) : (
                <span className="text-[11px] font-bold">{m.order}</span>
              )}
            </div>

            {/* Content Card */}
            <div
              className={`academic-card p-5 transition-all ${
                isInProgress
                  ? 'border-[#3B82C4]/40 shadow-sm bg-gradient-to-r from-white to-blue-50/20'
                  : 'hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    Phase 0{m.order}
                  </span>
                  <h4 className="font-bold text-sm text-[#173B63]">{m.title}</h4>
                </div>

                <span
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full w-fit ${
                    isCompleted
                      ? 'bg-teal-50 text-[#2F9C95] border border-teal-200'
                      : isInProgress
                      ? 'bg-blue-50 text-[#3B82C4] border border-blue-200'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Upcoming'}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-3">{m.description}</p>

              {/* Progress bar */}
              <div className="mb-4 max-w-md">
                <ProgressBar
                  value={m.completionPercentage}
                  size="sm"
                  color={isCompleted ? 'teal' : isInProgress ? 'blue' : 'navy'}
                />
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase text-slate-400 mr-1">Skills:</span>
                {m.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
