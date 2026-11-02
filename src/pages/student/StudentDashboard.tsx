import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { classService } from '../../services/classService';
import { careerService } from '../../services/careerService';
import { Course, Assignment, CareerRole } from '../../types';
import { MetricCard } from '../../components/common/MetricCard';
import { ProgressBar } from '../../components/common/ProgressBar';
import {
  Briefcase,
  FileText,
  Video,
  TrendingUp,
  ArrowRight,
  BookOpen,
  Calendar,
  Sparkles,
  Award,
  ChevronRight,
  PlayCircle
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
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [careerRoles, setCareerRoles] = useState<CareerRole[]>([]);

  useEffect(() => {
    classService.getCourses().then(setCourses);
    classService.getAssignments().then(setAssignments);
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
    { name: 'Python', score: 92 },
    { name: 'Machine Learning', score: 86 },
    { name: 'Deep Learning', score: 78 },
    { name: 'SQL', score: 85 },
    { name: 'NLP / RAG', score: 74 },
    { name: 'Communication', score: 82 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#173B63] via-[#1E4D82] to-[#2F9C95] p-6 sm:p-8 rounded-2xl text-white shadow-lg relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        <div className="space-y-1.5 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-teal-300">
            <Sparkles className="w-3.5 h-3.5" />
            AI Career Readiness Active
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Good Morning, {user.name} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
            Continue your academic learning and prepare for top AI & Machine Learning career placements.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <button
            onClick={() => navigate('/student/interview-center')}
            className="px-4 py-2.5 rounded-xl bg-white text-[#173B63] font-bold text-xs hover:bg-slate-100 transition shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Video className="w-4 h-4 text-[#2F9C95]" />
            <span>Practice Mock Interview</span>
          </button>
        </div>
      </div>

      {/* 4 Core Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Career Readiness"
          value="78%"
          subtitle="Top 15th percentile in batch"
          icon={TrendingUp}
          trend={{ value: "+4% this month", isPositive: true }}
          accentColor="teal"
          onClick={() => navigate('/student/roadmap')}
        />
        <MetricCard
          title="Resume Score"
          value="86%"
          subtitle="ATS Verified for Tech Roles"
          icon={FileText}
          trend={{ value: "Optimized", isPositive: true }}
          accentColor="blue"
          onClick={() => navigate('/student/resume-ai')}
        />
        <MetricCard
          title="Interview Score"
          value="82%"
          subtitle="Latest Camera Assessment"
          icon={Video}
          trend={{ value: "+6 pts gain", isPositive: true }}
          accentColor="indigo"
          onClick={() => navigate('/student/performance')}
        />
        <MetricCard
          title="Skill Progress"
          value="72%"
          subtitle="Across 6 core benchmarks"
          icon={Award}
          trend={{ value: "On Track", isPositive: true }}
          accentColor="navy"
          onClick={() => navigate('/student/skill-gap')}
        />
      </div>

      {/* Continue Learning & Assignments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#173B63]">Continue Learning</h2>
              <p className="text-xs text-slate-500">Pick up right where you left off</p>
            </div>
            <button
              onClick={() => navigate('/student/classes')}
              className="text-xs text-[#3B82C4] hover:text-[#173B63] font-semibold flex items-center gap-1"
            >
              <span>View All Classes</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {courses.slice(0, 2).map(course => (
              <div
                key={course.id}
                className="academic-card p-5 flex flex-col justify-between space-y-4 academic-card-hover"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono mb-2">
                    <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-900 font-bold border border-slate-300">
                      {course.code}
                    </span>
                    <span className="font-semibold text-slate-700">Last accessed {course.lastActivity}</span>
                  </div>
                  <h3 className="font-bold text-sm text-[#173B63] line-clamp-1">{course.title}</h3>
                  <p className="text-xs text-slate-700 font-medium mt-0.5">Faculty: {course.tutorName}</p>
                </div>

                <div className="space-y-2">
                  <ProgressBar value={course.progress} label="Course Progress" size="sm" color="blue" />

                  <button
                    onClick={() => navigate(`/student/classes/${course.id}`)}
                    className="w-full py-2 rounded-lg bg-[#173B63] hover:bg-[#204B7D] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-2xs"
                  >
                    <PlayCircle className="w-4 h-4 text-teal-300" />
                    <span>Continue Learning →</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Assignments */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#173B63]">Upcoming Assignments</h2>
            <button
              onClick={() => navigate('/student/assignments')}
              className="text-xs text-[#1D4ED8] font-bold hover:underline"
            >
              All Assignments →
            </button>
          </div>

          <div className="academic-card p-4 divide-y divide-slate-200 space-y-3">
            {assignments.slice(0, 3).map(asg => (
              <div key={asg.id} className="pt-3 first:pt-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-900 line-clamp-1">{asg.title}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 border ${
                      asg.status === 'graded'
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                        : asg.status === 'in_progress'
                        ? 'bg-amber-50 text-amber-900 border-amber-300'
                        : 'bg-slate-100 text-slate-800 border-slate-300'
                    }`}
                  >
                    {asg.status === 'graded'
                      ? `Graded (${asg.obtainedMarks}/${asg.totalMarks})`
                      : asg.status === 'in_progress'
                      ? 'In Progress'
                      : 'Not Started'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-700 font-medium">
                  <span>{asg.courseTitle.split('&')[0]}</span>
                  <span className="flex items-center gap-1 text-slate-800 font-bold">
                    <Calendar className="w-3.5 h-3.5 text-slate-600" />
                    {new Date(asg.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Career Recommendations Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#173B63]">AI Career Recommendations</h2>
            <p className="text-xs text-slate-700 font-medium">Tailored roles based on your coursework and mock interview scores</p>
          </div>
          <button
            onClick={() => navigate('/student/career-intel')}
            className="text-xs text-[#6D28D9] hover:text-[#5d50ae] font-bold flex items-center gap-1"
          >
            <span>Explore All Careers</span>
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
                  className="w-full py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#173B63] text-xs font-bold border border-blue-200 transition"
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
              <h3 className="text-sm font-bold text-[#173B63]">Skill Mastery Progress</h3>
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
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={90} />
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
              className="text-xs text-[#3B82C4] font-semibold hover:underline"
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
