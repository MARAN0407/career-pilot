import React from 'react';
import { JobListing } from '../../types';
import { Sparkles, CheckCircle, AlertCircle, ArrowRight, Building, MapPin, DollarSign, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface JobMatchModalProps {
  job: JobListing | null;
  isOpen: boolean;
  onClose: () => void;
}

export const JobMatchModal: React.FC<JobMatchModalProps> = ({ job, isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#173B63] to-[#3B82C4] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-xl">
              {job.companyLogo}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base">{job.title}</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#2F9C95] text-white text-[11px] font-bold">
                  {job.matchPercentage}% Match
                </span>
              </div>
              <p className="text-xs text-slate-200">{job.company} • {job.location}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/20 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Breakdown Body */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          {/* AI Matching Analysis Header */}
          <div className="p-4 rounded-xl bg-[#F3F1FD] border border-[#7567C7]/20 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#7567C7] text-white shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-[#173B63]">AI Match Justification</h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {job.whyMatch.strengthsNotes}
              </p>
            </div>
          </div>

          {/* Aligned Skills */}
          <div>
            <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#2F9C95]" />
              Strongly Aligned Skills in Your Profile
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {job.whyMatch.alignedSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Skills / Recommendations */}
          <div>
            <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
              Identified Skill Gaps
            </h5>
            <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 text-xs text-slate-700 space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {job.missingSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded bg-white text-amber-900 border border-amber-300 font-semibold"
                  >
                    Missing: {skill}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-slate-600">
                {job.whyMatch.gapSuggestions}
              </p>
            </div>
          </div>

          {/* Role Specs Summary */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Compensation</span>
              <span className="font-semibold text-slate-800">{job.stipendOrSalary}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Work Arrangement</span>
              <span className="font-semibold text-slate-800">{job.isRemote ? 'Remote / Hybrid' : 'On-Site'}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-200">
            <button
              onClick={() => {
                onClose();
                navigate('/student/skill-gap');
              }}
              className="text-xs text-[#7567C7] hover:underline font-semibold flex items-center gap-1"
            >
              <span>View Skill Gap Actions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                alert(`Redirecting to college job portal for ${job.title} at ${job.company}`);
              }}
              className="px-5 py-2 rounded-lg bg-[#173B63] hover:bg-[#204B7D] text-white text-xs font-semibold shadow-sm transition"
            >
              Apply via College Career Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
