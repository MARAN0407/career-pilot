import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { careerService } from '../../services/careerService';
import { CareerRole } from '../../types';
import { MetricCard } from '../../components/common/MetricCard';
import { getDepartmentByName } from '../../constants/departments';
import {
  Briefcase,
  FileText,
  Video,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Award,
  ChevronRight,
  School,
  CheckCircle2,
  Mic,
  ShieldCheck,
  Target,
  Zap,
  Upload,
  Cpu
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [careerRoles, setCareerRoles] = useState<CareerRole[]>([]);
  const currentDept = user?.department || 'Electronics & Communication Engineering (ECE)';
  const deptMeta = getDepartmentByName(currentDept);

  useEffect(() => {
    careerService.getCareerRoles().then(setCareerRoles);
  }, []);

  const interviewRadarData = [
    { subject: 'Technical Knowledge', A: 88, fullMark: 100 },
    { subject: 'Answer Relevance', A: 86, fullMark: 100 },
    { subject: 'Communication', A: 82, fullMark: 100 },
    { subject: 'Fluency', A: 80, fullMark: 100 },
    { subject: 'Completeness', A: 84, fullMark: 100 },
  ];

  const skillBarData = [
    { name: deptMeta.shortCode === 'ECE' ? 'Embedded C' : 'Core Systems', score: 92 },
    { name: deptMeta.shortCode === 'ECE' ? 'VLSI / Circuits' : 'Algorithms', score: 86 },
    { name: deptMeta.shortCode === 'ECE' ? 'DSP / Signals' : 'Architecture', score: 78 },
    { name: deptMeta.shortCode === 'ECE' ? 'Protocols (I2C/SPI)' : 'Databases', score: 85 },
    { name: 'STAR HR / Leadership', score: 88 },
    { name: 'Technical Composure', score: 82 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome & Department Focus Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#173B63] via-[#1E4D82] to-[#2F9C95] p-6 sm:p-8 rounded-2xl text-white shadow-lg relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-teal-300">
            <School className="w-3.5 h-3.5" />
            <span>Academic Department: {currentDept}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user.name} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
            Your AI Career Accelerator is active. Prepare with department-specific technical mock interviews, ATS resume diagnostics, and placement readiness tracking.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10">
          <button
            onClick={() => navigate('/student/interview-center')}
            className="px-4 py-2.5 rounded-xl bg-white text-[#173B63] font-bold text-xs hover:bg-slate-100 transition shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Video className="w-4 h-4 text-[#2F9C95]" />
            <span>Start {deptMeta.shortCode} Mock Interview</span>
          </button>

          <button
            onClick={() => navigate('/student/resume-ai')}
            className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs backdrop-blur-md transition flex items-center gap-2 cursor-pointer border border-white/20"
          >
            <FileText className="w-4 h-4 text-teal-300" />
            <span>ATS Resume Score</span>
          </button>
        </div>
      </div>

      {/* 4 Core Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Career Readiness"
          value="82%"
          subtitle={`Calibrated for ${deptMeta.shortCode}`}
          icon={TrendingUp}
          trend={{ value: "+4% this month", isPositive: true }}
          accentColor="teal"
          onClick={() => navigate('/student/roadmap')}
        />
        <MetricCard
          title="Resume Score"
          value="86%"
          subtitle="ATS Verified for Department Roles"
          icon={FileText}
          trend={{ value: "Optimized", isPositive: true }}
          accentColor="blue"
          onClick={() => navigate('/student/resume-ai')}
        />
        <MetricCard
          title="Interview Performance"
          value="88%"
          subtitle={`Latest ${deptMeta.shortCode} Technical Mock`}
          icon={Video}
          trend={{ value: "+8 pts gain", isPositive: true }}
          accentColor="indigo"
          onClick={() => navigate('/student/performance')}
        />
        <MetricCard
          title="Domain Mastery"
          value="79%"
          subtitle="Across Department Core Rubrics"
          icon={Award}
          trend={{ value: "On Track", isPositive: true }}
          accentColor="navy"
          onClick={() => navigate('/student/skill-gap')}
        />
      </div>

      {/* REPLACED SECTION: Department Mock Interview & Resume ATS Diagnostic Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Mock Interview Suite (2 cols) */}
        <div className="lg:col-span-2 academic-card p-6 flex flex-col justify-between space-y-5 border-t-4 border-t-[#2F9C95]">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-[#2F9C95]" />
                <h2 className="text-base font-bold text-[#173B63]">
                  {deptMeta.name} Interview Suite
                </h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0F766E] font-bold text-[11px] border border-teal-200">
                Department Verified
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Real-time AI mock interviews specifically customized with technical engineering questions for <strong>{currentDept}</strong>. Practice speaking equations, protocols, system architecture, and STAR leadership answers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#173B63]" />
                <h4 className="font-bold text-xs text-slate-800">Technical Domain Round</h4>
              </div>
              <p className="text-[11px] text-slate-600 leading-normal">
                Deep-dive into {deptMeta.shortCode} fundamentals, circuit/code analysis, and design tradeoffs.
              </p>
              <button
                onClick={() => navigate('/student/interview-center')}
                className="w-full mt-1 py-2 bg-[#173B63] hover:bg-[#204B7D] text-white font-bold text-xs rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Start Technical Mock</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-[#7567C7]" />
                <h4 className="font-bold text-xs text-slate-800">HR & STAR Leadership Round</h4>
              </div>
              <p className="text-[11px] text-slate-600 leading-normal">
                Behavioral interview questions assessing project conflict resolution, failure recovery, and teamwork.
              </p>
              <button
                onClick={() => navigate('/student/interview-center')}
                className="w-full mt-1 py-2 bg-[#7567C7] hover:bg-[#6456b8] text-white font-bold text-xs rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Start HR / STAR Mock</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Silence detection (0 marks for blank answers) & model answer comparisons active</span>
            </span>
            <button
              onClick={() => navigate('/student/interview-history')}
              className="text-[#3B82C4] font-bold hover:underline"
            >
              Past Sessions →
            </button>
          </div>
        </div>

        {/* Resume ATS & Readiness Card (1 col) */}
        <div className="academic-card p-6 flex flex-col justify-between space-y-4 border-t-4 border-t-[#3B82C4]">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#3B82C4]" />
                <h2 className="text-base font-bold text-[#173B63]">ATS Resume Analyzer</h2>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[11px] border border-blue-200">
                86% Score
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automatic validation ensures your uploaded document is an authentic resume before computing keyword match rates for {deptMeta.shortCode} roles.
            </p>
          </div>

          <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div className="flex items-center justify-between font-semibold text-slate-700 text-[11px]">
              <span>Department Keyword Density</span>
              <span className="text-emerald-700 font-bold">Strong (14 matches)</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '86%' }} />
            </div>
            <p className="text-[10px] text-slate-500">
              Validated against Tier-1 campus hiring ATS algorithms.
            </p>
          </div>

          <button
            onClick={() => navigate('/student/resume-ai')}
            className="w-full py-2.5 rounded-xl bg-[#3B82C4] hover:bg-[#2e6ea9] text-white font-bold text-xs transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Upload & Re-Scan Resume</span>
          </button>
        </div>
      </div>

      {/* Department Career Pathways Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#173B63]">
              Target Career Pathways for {deptMeta.shortCode}
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              Roles aligned with your academic department curriculum and mock interview metrics
            </p>
          </div>
          <button
            onClick={() => navigate('/student/career-intel')}
            className="text-xs text-[#6D28D9] hover:text-[#5d50ae] font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>Explore All Career Paths</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {careerRoles.slice(0, 3).map(role => (
            <div
              key={role.id}
              className="academic-card p-5 flex flex-col justify-between space-y-4 border-t-4 border-t-[#6D28D9] hover:border-slate-400"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-bold text-sm text-[#173B63]">{role.title}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-teal-50 text-[#0F766E] font-bold text-xs border border-teal-300">
                    {role.matchScore}% Match
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-medium line-clamp-2">{role.description}</p>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-700 block mb-1">
                    Matching Skills:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {role.currentSkills.slice(0, 3).map((s, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-900 border border-slate-300 font-semibold rounded text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigate('/student/career-intel')}
                  className="w-full py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#173B63] text-xs font-bold border border-blue-200 transition cursor-pointer"
                >
                  View Career Pathway ({role.salaryRange}) →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Charts Row (Skill Progress & Interview Radar) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Progress Bar Chart */}
        <div className="academic-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#173B63]">Department Skill Mastery</h3>
              <p className="text-xs text-slate-500">Benchmark comparison vs Industry expectations</p>
            </div>
            <span className="text-xs font-semibold text-[#2F9C95] bg-teal-50 px-2 py-1 rounded">
              Strong Fundamentals
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillBarData} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={110} />
                <Tooltip />
                <Bar dataKey="score" fill="#3B82C4" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Interview Performance Radar Chart */}
        <div className="academic-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#173B63]">AI Mock Interview Competencies</h3>
              <p className="text-xs text-slate-500">Multi-axis rubric evaluation from latest session</p>
            </div>
            <button
              onClick={() => navigate('/student/performance')}
              className="text-xs text-[#3B82C4] font-semibold hover:underline cursor-pointer"
            >
              Full Scorecard
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={interviewRadarData}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748B' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Radar name={user?.name || "Student"} dataKey="A" stroke="#7567C7" fill="#7567C7" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
