import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { careerService } from '../../services/careerService';
import { SkillGapItem } from '../../types';
import { GitFork, Sparkles, CheckCircle2, AlertTriangle, Clock, BookOpen, ArrowRight, Play } from 'lucide-react';

export const SkillGapPage: React.FC = () => {
  const [skillGaps, setSkillGaps] = useState<SkillGapItem[]>([]);
  const [targetRole, setTargetRole] = useState<string>('Machine Learning Engineer');
  const navigate = useNavigate();

  useEffect(() => {
    careerService.getSkillGaps().then(setSkillGaps);
  }, []);

  const strongSkills = skillGaps.filter(s => s.currentLevel === 'Strong');
  const gapSkills = skillGaps.filter(s => s.currentLevel !== 'Strong');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#173B63] flex items-center gap-2">
            <GitFork className="w-6 h-6 text-[#2F9C95]" />
            <span>Target Role Skill Gap Analysis</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Compare your current academic competencies against target job descriptions and close gaps with curated micro-modules
          </p>
        </div>

        {/* Target Role Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-600 uppercase">Target Role:</label>
          <select
            value={targetRole}
            onChange={e => setTargetRole(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-[#173B63] focus:outline-none focus:border-[#2F9C95] shadow-2xs"
          >
            <option value="Machine Learning Engineer">Machine Learning Engineer</option>
            <option value="AI Systems Engineer">AI Systems Engineer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Generative AI Specialist">Generative AI Specialist</option>
          </select>
        </div>
      </div>

      {/* Skills Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Your Verified Skills */}
        <div className="academic-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#2F9C95]" />
              <h3 className="font-bold text-sm text-[#173B63]">Your Strong Skills ({strongSkills.length})</h3>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">
              Ready for Interviews
            </span>
          </div>

          <div className="space-y-3">
            {strongSkills.map((s, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">{s.skill}</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">
                  {s.currentLevel}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Identified Missing Skills & Gaps */}
        <div className="academic-card p-6 space-y-4 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-sm text-[#173B63]">Missing / Gap Skills ({gapSkills.length})</h3>
            </div>
            <span className="text-[10px] bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded">
              Action Required
            </span>
          </div>

          <div className="space-y-3">
            {gapSkills.map((s, idx) => (
              <div key={idx} className="p-3 bg-amber-50/40 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-slate-900 block">{s.skill}</span>
                  <span className="text-[10px] text-slate-500">
                    Current: <strong className="text-amber-700">{s.currentLevel}</strong> • Required: <strong className="text-emerald-700">{s.requiredLevel}</strong>
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-600 bg-white px-2 py-1 rounded border border-amber-200">
                  ~{s.estimatedHours} hrs to master
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Actions / Learning Cards */}
      <div className="space-y-4 pt-2">
        <div>
          <h2 className="text-base font-bold text-[#173B63]">Recommended Learning Actions</h2>
          <p className="text-xs text-slate-500">Fastest pathway to bridge missing skills for {targetRole}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {gapSkills.map((gap, idx) => (
            <div key={idx} className="academic-card p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#2F9C95]">{gap.skill}</span>
                  <span className="text-slate-400 font-mono">{gap.difficulty}</span>
                </div>

                <h4 className="font-bold text-sm text-[#173B63]">{gap.recommendedCourse}</h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Estimated learning: {gap.estimatedHours} hours</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/student/learning-hub')}
                className="w-full py-2 rounded-lg bg-[#173B63] hover:bg-[#204B7D] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-2xs"
              >
                <Play className="w-3.5 h-3.5 fill-teal-300 text-teal-300" />
                <span>Start Learning Course →</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
