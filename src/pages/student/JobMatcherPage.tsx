import React, { useEffect, useState } from 'react';
import { careerService } from '../../services/careerService';
import { JobListing } from '../../types';
import { JobMatchModal } from '../../components/career/JobMatchModal';
import { 
  Briefcase, 
  Search, 
  Filter, 
  MapPin, 
  Building, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Clock,
  ChevronRight
} from 'lucide-react';

export const JobMatcherPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [roleFilter, setRoleFilter] = useState<'All' | 'Internship' | 'Full-time'>('All');

  useEffect(() => {
    careerService.getJobListings().then(setJobs);
  }, []);

  const filteredJobs = jobs.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(searchTerm.toLowerCase()) || j.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || j.type === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#173B63] flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-[#3B82C4]" />
            <span>AI Job Discovery & Match Intelligence</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Verified campus placements, tech internships, and full-time engineering roles ranked by profile compatibility
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by job title, company, or required technology..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-white text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#3B82C4] shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value as any)}
            className="w-full bg-white text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#3B82C4] shadow-2xs text-slate-700 font-medium"
          >
            <option value="All">All Employment Types</option>
            <option value="Internship">Internship (On-Campus Recruiter)</option>
            <option value="Full-time">Full-time Engineering</option>
          </select>
        </div>
      </div>

      {/* Job Cards List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredJobs.map(job => (
          <div key={job.id} className="academic-card p-6 flex flex-col justify-between space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl shrink-0 border border-slate-200">
                  {job.companyLogo}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-[#173B63]">{job.title}</h3>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                      {job.type}
                    </span>
                  </div>

                  <p className="text-xs text-slate-800 font-medium mt-0.5 flex items-center gap-2">
                    <strong className="text-slate-900 font-bold">{job.company}</strong>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-slate-600" />
                      {job.location}
                    </span>
                  </p>
                </div>
              </div>

              {/* Match Score Badge */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-[#0F766E] font-bold text-xs border border-teal-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{job.matchPercentage}% Match</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#173B63] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">{job.stipendOrSalary}</span>
              </div>
            </div>

            <p className="text-xs text-slate-800 font-medium leading-relaxed">{job.description}</p>

            {/* Skills & Missing pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="text-[10px] font-bold uppercase text-slate-800 mr-1">Required:</span>
              {job.requiredSkills.map((s, i) => (
                <span key={i} className="px-2.5 py-0.5 bg-slate-100 text-slate-900 border border-slate-300 rounded text-[11px] font-bold">
                  {s}
                </span>
              ))}

              {job.missingSkills.length > 0 && (
                <span className="px-2.5 py-0.5 bg-amber-50 text-amber-950 border border-amber-300 rounded text-[11px] font-bold">
                  Gap: {job.missingSkills.join(', ')}
                </span>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
              <span className="text-[11px] text-slate-700 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Posted {job.postedDaysAgo} days ago via College Placement Cell
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedJob(job)}
                  className="px-3.5 py-1.5 rounded-lg border border-[#7567C7] text-[#7567C7] hover:bg-[#7567C7]/10 text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Why am I a match?</span>
                </button>

                <button
                  onClick={() => alert(`Submitting application for ${job.title} at ${job.company}`)}
                  className="px-4 py-1.5 rounded-lg bg-[#173B63] hover:bg-[#204B7D] text-white text-xs font-semibold shadow-2xs transition"
                >
                  View Job & Apply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Why Am I Match Modal */}
      <JobMatchModal
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
      />
    </div>
  );
};
