import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { careerService } from '../../services/careerService';
import { SkillGapItem, CareerRole } from '../../types';
import { GitFork, Sparkles, CheckCircle2, AlertTriangle, Clock, Target, ArrowRight } from 'lucide-react';

export const SkillGapPage: React.FC = () => {
  const { user } = useAuth();
  const [skillGaps, setSkillGaps] = useState<SkillGapItem[]>([]);
  const [roles, setRoles] = useState<CareerRole[]>([]);
  const [targetRole, setTargetRole] = useState<string>('');

  useEffect(() => {
    careerService.getSkillGaps(user?.department).then(setSkillGaps);
    careerService.getCareerRoles(user?.department).then(res => {
      setRoles(res);
      if (res.length > 0) {
        setTargetRole(res[0].title);
      }
    });
  }, [user?.department]);

  const strongSkills = skillGaps.filter(s => s.currentLevel === 'Strong' || s.currentLevel === 'Intermediate');
  const gapSkills = skillGaps.filter(s => s.currentLevel === 'Beginner' || s.currentLevel === 'Missing');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-bold">
              {user?.department || 'Department Skill Matrix'}
            </span>
          </div>
          <h1 className="text-xl font-bold text-[#173B63] flex items-center gap-2">
            <GitFork className="w-6 h-6 text-[#2F9C95]" />
            <span>Target Role Skill Gap Analysis</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Analyze your technical competencies against {user?.department || 'core engineering'} industry hiring requirements.
          </p>
        </div>

        {/* Target Role Selector - Dynamic to Selected Department */}
        {roles.length > 0 && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <label className="text-xs font-bold text-slate-600 uppercase">Target Role:</label>
            <select
              value={targetRole}
              onChange={e => setTargetRole(e.target.value)}
              className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-[#173B63] focus:outline-none focus:border-[#2F9C95] shadow-2xs"
            >
              {roles.map(r => (
                <option key={r.id} value={r.title}>{r.title}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Skills Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Your Verified Department Skills */}
        <div className="academic-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#2F9C95]" />
              <h3 className="font-bold text-sm text-[#173B63]">Your Verified Skills ({strongSkills.length})</h3>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">
              Ready for Interviews
            </span>
          </div>

          <div className="space-y-3">
            {strongSkills.map((s, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-slate-800 block">{s.skill}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Proficiency: {s.currentLevel}</span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">
                  {s.currentLevel}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Identified Missing Department Skills & Gaps */}
        <div className="academic-card p-6 space-y-4 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-sm text-[#173B63]">Missing / Gap Skills ({gapSkills.length})</h3>
            </div>
            <span className="text-[10px] bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded border border-amber-200">
              Action Required
            </span>
          </div>

          <div className="space-y-3">
            {gapSkills.map((s, idx) => (
              <div key={idx} className="p-3 bg-amber-50/40 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-slate-900 block">{s.skill}</span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Current: <strong className="text-amber-700">{s.currentLevel}</strong> • Required: <strong className="text-emerald-700">{s.requiredLevel}</strong>
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-600 bg-white px-2 py-1 rounded border border-amber-200 shrink-0">
                  ~{s.estimatedHours} hrs to master
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
