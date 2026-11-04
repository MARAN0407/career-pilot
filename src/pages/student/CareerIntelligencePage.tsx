import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { careerService } from '../../services/careerService';
import { CareerRole } from '../../types';
import { Compass, Sparkles, TrendingUp, DollarSign, CheckCircle2, AlertCircle, ArrowRight, Briefcase } from 'lucide-react';

export const CareerIntelligencePage: React.FC = () => {
  const { user } = useAuth();
  const [roles, setRoles] = useState<CareerRole[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    careerService.getCareerRoles(user?.department).then(setRoles);
  }, [user?.department]);

  const topRole = roles[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-bold">
              {user?.department || 'Department Intelligence'}
            </span>
          </div>
          <h1 className="text-xl font-bold text-[#173B63] flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#7567C7]" />
            <span>AI Career Intelligence & Role Predictor</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Predictive career role recommendations calibrated strictly for {user?.department || 'your department'}.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {topRole && (
            <span className="text-xs px-3 py-1.5 rounded-lg bg-teal-50 text-[#2F9C95] font-semibold border border-teal-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Top Match: {topRole.title} ({topRole.matchScore}%)
            </span>
          )}
        </div>
      </div>

      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map(role => (
          <div
            key={role.id}
            className="academic-card p-6 flex flex-col justify-between space-y-5 border-t-4 border-t-[#3B82C4]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#173B63]">{role.title}</h3>
                  <span className="text-xs font-bold text-emerald-900 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                    Demand: {role.marketDemand} ({role.growthRate})
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-[#0F766E] font-mono leading-none">
                    {role.matchScore}%
                  </span>
                  <span className="text-[10px] text-slate-800 block font-bold">Match Score</span>
                </div>
              </div>

              <p className="text-xs text-slate-800 font-medium leading-relaxed">{role.description}</p>

              {/* Salary & Open roles banner */}
              <div className="grid grid-cols-2 gap-2 p-3 bg-blue-50/50 rounded-xl border border-blue-200 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-700 block">Expected Package</span>
                  <span className="font-bold text-[#173B63] text-sm">{role.salaryRange}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-700 block">Active Openings</span>
                  <span className="font-bold text-slate-900">{role.openPositionsCount} positions</span>
                </div>
              </div>

              {/* Skills matched vs missing */}
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-800 flex items-center gap-1 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0F766E]" />
                    Current Aligned Skills ({role.currentSkills.length}):
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {role.currentSkills.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 bg-emerald-50 text-emerald-900 rounded border border-emerald-300 text-[11px] font-bold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-800 flex items-center gap-1 mb-1">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    Recommended Skill Gaps ({role.missingSkills.length}):
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {role.missingSkills.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 bg-amber-50 text-amber-950 rounded border border-amber-300 text-[11px] font-bold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <button
                onClick={() => navigate('/student/skill-gap')}
                className="text-xs text-[#1D4ED8] hover:text-[#173B63] font-bold flex items-center gap-1"
              >
                <span>Analyze Skill Gaps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => navigate('/student/jobs')}
                className="px-4 py-2 rounded-lg bg-[#173B63] hover:bg-[#204B7D] text-white text-xs font-semibold shadow-2xs transition"
              >
                Find Matching Jobs →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
