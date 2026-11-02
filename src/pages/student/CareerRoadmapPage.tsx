import React, { useEffect, useState } from 'react';
import { careerService } from '../../services/careerService';
import { RoadmapMilestone } from '../../types';
import { RoadmapTimeline } from '../../components/career/RoadmapTimeline';
import { TrendingUp, Sparkles, CheckCircle2, Target, Award, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CareerRoadmapPage: React.FC = () => {
  const [milestones, setMilestones] = useState<RoadmapMilestone[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    careerService.getRoadmap().then(setMilestones);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#173B63] flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#7567C7]" />
            <span>AI Career & Engineering Roadmap</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Visual progression from fundamental programming to advanced MLOps and top-tier placement readiness
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/student/interview-center')}
            className="px-4 py-2 rounded-xl bg-[#2F9C95] hover:bg-[#3EBAB2] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Practice Milestone Interview</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Callout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="academic-card p-5 border-l-4 border-l-[#2F9C95]">
          <span className="text-xs font-bold text-slate-400 uppercase">Current Stage</span>
          <h3 className="text-lg font-bold text-[#173B63] mt-0.5">Phase 04 & 05: Deep Learning & RAG</h3>
          <p className="text-xs text-slate-500 mt-1">Active coursework in CS602 and CS605</p>
        </div>
        <div className="academic-card p-5 border-l-4 border-l-[#3B82C4]">
          <span className="text-xs font-bold text-slate-400 uppercase">Overall Readiness</span>
          <h3 className="text-lg font-bold text-[#173B63] mt-0.5">78% Complete</h3>
          <p className="text-xs text-slate-500 mt-1">3 Completed • 3 In Progress • 2 Upcoming</p>
        </div>
        <div className="academic-card p-5 border-l-4 border-l-[#7567C7]">
          <span className="text-xs font-bold text-slate-400 uppercase">Target Outcome</span>
          <h3 className="text-lg font-bold text-[#173B63] mt-0.5">AI Engineer Offer ($130k+)</h3>
          <p className="text-xs text-slate-500 mt-1">Projected placement: Summer 2026</p>
        </div>
      </div>

      {/* Timeline Component */}
      <div className="pt-4">
        <RoadmapTimeline milestones={milestones} />
      </div>
    </div>
  );
};
