import React from 'react';
import { BarChart3, TrendingUp, Users, Award, ShieldCheck } from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export const TutorAnalyticsPage: React.FC = () => {
  const performanceDistribution = [
    { grade: '90-100% (A+)', students: 28 },
    { grade: '80-89% (A)', students: 64 },
    { grade: '70-79% (B)', students: 56 },
    { grade: '60-69% (C)', students: 24 },
    { grade: '< 60% (At Risk)', students: 12 },
  ];

  const interviewReadinessPie = [
    { name: 'Placement Ready (80%+)', value: 68, color: '#2F9C95' },
    { name: 'Intermediate (70-79%)', value: 24, color: '#3B82C4' },
    { name: 'Needs Coaching (<70%)', value: 8, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#173B63] flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#2F9C95]" />
            <span>Classroom & Placement Analytics</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Department-level cohort insights across academic assignments, AI mock interview scores, and placement conversion rates
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 font-mono">
          82% Mean Class Score
        </span>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Distribution */}
        <div className="academic-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#173B63]">Grade & Performance Distribution</h3>
            <span className="text-xs text-slate-400 font-mono">184 Students Evaluated</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceDistribution} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="grade" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="students" fill="#173B63" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mock Interview Placement Readiness */}
        <div className="academic-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#173B63]">AI Mock Interview Placement Readiness</h3>
            <span className="text-xs font-semibold text-[#2F9C95] bg-teal-50 px-2 py-0.5 rounded">
              68% Top Tier
            </span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={interviewReadinessPie}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }: any) => `${name ? name.split(' ')[0] : ''} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                >
                  {interviewReadinessPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
