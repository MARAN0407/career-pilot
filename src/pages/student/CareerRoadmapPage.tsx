import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { careerService } from '../../services/careerService';
import { RoadmapMilestone } from '../../types';
import { RoadmapTimeline } from '../../components/career/RoadmapTimeline';
import { TrendingUp, Sparkles, CheckCircle2, Target, Award, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CareerRoadmapPage: React.FC = () => {
  const { user } = useAuth();
  const [milestones, setMilestones] = useState<RoadmapMilestone[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    careerService.getRoadmap(user?.department).then(setMilestones);
  }, [user?.department]);

  const activeMilestone = milestones.find(m => m.status === 'in_progress') || milestones[0];
  const completedCount = milestones.filter(m => m.status === 'completed').length;
  const inProgressCount = milestones.filter(m => m.status === 'in_progress').length;
  const upcomingCount = milestones.filter(m => m.status === 'upcoming').length;
  const averageProgress = milestones.length > 0 
    ? Math.round(milestones.reduce((acc, m) => acc + m.completionPercentage, 0) / milestones.length)
    : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-bold">
              {user?.department || 'Department Career Track'}
            </span>
          </div>
          <h1 className="text-xl font-bold text-[#173B63] flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#7567C7]" />
            <span>Department Career & Engineering Roadmap</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Structured skill acquisition and placement milestone progression for {user?.department || 'your department'}.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => navigate('/student/interview-center')}
            className="px-4 py-2 rounded-xl bg-[#2F9C95] hover:bg-[#3EBAB2] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Practice Milestone Interview</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Callouts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="academic-card p-5 border-l-4 border-l-[#2F9C95]">
          <span className="text-xs font-bold text-slate-400 uppercase">Current Stage</span>
          <h3 className="text-sm font-bold text-[#173B63] mt-0.5 truncate" title={activeMilestone?.title || 'Core Foundations'}>
            {activeMilestone?.title || 'Core Foundations'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">Active curriculum phase for {user?.department || 'Engineering'}</p>
        </div>

        <div className="academic-card p-5 border-l-4 border-l-[#3B82C4]">
          <span className="text-xs font-bold text-slate-400 uppercase">Department Readiness</span>
          <h3 className="text-lg font-bold text-[#173B63] mt-0.5">{averageProgress}% Complete</h3>
          <p className="text-xs text-slate-500 mt-1">{completedCount} Completed • {inProgressCount} In Progress • {upcomingCount} Upcoming</p>
        </div>

        <div className="academic-card p-5 border-l-4 border-l-[#7567C7]">
          <span className="text-xs font-bold text-slate-400 uppercase">Target Placement</span>
          <h3 className="text-sm font-bold text-[#173B63] mt-0.5 truncate" title={`${user?.department || 'Core Engineering'} Recruitment`}>
            {user?.department || 'Core Engineering'} Recruitment
          </h3>
          <p className="text-xs text-slate-500 mt-1">Projected hiring cycle readiness</p>
        </div>
      </div>

      {/* Timeline Component */}
      <div className="pt-2">
        <RoadmapTimeline milestones={milestones} />
      </div>
    </div>
  );
};
