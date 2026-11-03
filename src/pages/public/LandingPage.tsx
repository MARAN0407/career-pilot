import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  GraduationCap, 
  Video, 
  TrendingUp, 
  BookOpen, 
  FileCheck2, 
  Compass, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  School, 
  Users, 
  Award,
  Bot
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col font-sans text-slate-800 selection:bg-[#3B82C4]/20 selection:text-[#173B63]">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#173B63] to-[#2F9C95] flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-[#173B63] tracking-tight">Career Pilot</span>
              <span className="px-2 py-0.5 rounded bg-blue-50 text-[#173B63] text-[10px] font-bold border border-blue-200">
                Hub
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">AI-Powered Learning & Career Portal</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/register')}
            className="hidden sm:flex px-4 py-2 rounded-xl text-xs font-bold text-[#173B63] hover:bg-slate-100 transition"
          >
            Create Student Account
          </button>
          <button
            onClick={() => navigate('/login/student')}
            className="px-5 py-2.5 rounded-xl bg-[#173B63] hover:bg-[#204B7D] text-white text-xs font-bold shadow-md transition flex items-center gap-1.5 cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-teal-300" />
            <span>Sign In to Student Portal</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 sm:py-24 max-w-6xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#173B63] border border-blue-200 text-xs font-semibold shadow-2xs">
          <School className="w-4 h-4 text-[#2F9C95]" />
          <span>The Official Digital Learning & Career Platform of Modern Colleges</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#173B63] tracking-tight leading-tight max-w-4xl mx-auto">
          Build Your Skills. <span className="text-[#3B82C4]">Practice Interviews.</span> Prepare for Your Career.
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          An AI-powered learning and career platform connecting Google Classroom-style coursework, personalized skill development, ATS resume audits, and realistic AI mock interview simulations.
        </p>

        {/* Student Portal Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => navigate('/login/student')}
            className="px-8 py-3.5 rounded-xl bg-[#173B63] hover:bg-[#204B7D] text-white text-sm font-bold shadow-xl flex items-center gap-2.5 transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            <GraduationCap className="w-5 h-5 text-teal-300" />
            <span>Enter Student Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate('/register')}
            className="px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#173B63] border border-slate-300 text-sm font-bold shadow-md flex items-center gap-2.5 transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-[#3B82C4]" />
            <span>Create Student Account</span>
          </button>
        </div>

        {/* Live Platform Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto">
          <div className="academic-card p-5 text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#173B63] font-mono">184</span>
            <span className="text-xs text-slate-500 font-medium block mt-1">Enrolled Students</span>
          </div>
          <div className="academic-card p-5 text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#2F9C95] font-mono">94.2%</span>
            <span className="text-xs text-slate-500 font-medium block mt-1">Placement Match Rate</span>
          </div>
          <div className="academic-card p-5 text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#7567C7] font-mono">1,420+</span>
            <span className="text-xs text-slate-500 font-medium block mt-1">AI Mock Interviews</span>
          </div>
          <div className="academic-card p-5 text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#3B82C4] font-mono">442</span>
            <span className="text-xs text-slate-500 font-medium block mt-1">RAG Vector Chunks</span>
          </div>
        </div>
      </section>

      {/* Ecosystem Pillars Section */}
      <section className="px-6 py-16 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2F9C95]">Unified Academic Ecosystem</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#173B63]">
              From Classroom Lectures to Tier-1 Placement Offers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              Everything students and professors need under one accredited institutional platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="academic-card p-6 space-y-4 border-t-4 border-t-[#173B63]">
              <div className="p-3 bg-blue-50 text-[#173B63] rounded-xl w-fit">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#173B63]">Google Classroom-Style LMS</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Integrated course stream, assignment submission engine, interactive PDF and video players, and course-grounded RAG AI study assistants.
              </p>
            </div>

            {/* Card 2 */}
            <div className="academic-card p-6 space-y-4 border-t-4 border-t-[#2F9C95]">
              <div className="p-3 bg-teal-50 text-[#2F9C95] rounded-xl w-fit">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#173B63]">AI Career & Skill Intelligence</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated ATS resume scanner, target role skill gap analysis, job matching algorithms with "Why am I a match?" explanations, and milestone roadmaps.
              </p>
            </div>

            {/* Card 3 */}
            <div className="academic-card p-6 space-y-4 border-t-4 border-t-[#7567C7]">
              <div className="p-3 bg-indigo-50 text-[#7567C7] rounded-xl w-fit">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#173B63]">AI Mock Interview Center</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Realistic Camera, Voice, and Text interview simulators with automated speech recognition, rubric evaluations, radar analytics, and scorecards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F2642] text-slate-400 text-xs py-12 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#2F9C95] flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white text-sm">Career Pilot</span>
              <p className="text-[10px] text-slate-400">Apex Institute of Technology & AI</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/login/student')} className="hover:text-white transition">Student Login</button>
            <button onClick={() => navigate('/register')} className="hover:text-white transition">Register</button>
            <span className="text-slate-500">© 2026 Career Pilot Platform</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
