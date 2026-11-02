import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Users, School, Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const TutorLoginPage: React.FC = () => {
  const [email, setEmail] = useState('suresh.kumar@college.edu');
  const [password, setPassword] = useState('••••••••');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login('tutor', email, password);
    navigate('/tutor/dashboard');
  };

  const handleDemoLogin = async () => {
    await login('tutor');
    navigate('/tutor/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#0F2642] to-[#173B63] text-white text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto shadow-md">
            <Users className="w-6 h-6 text-blue-300" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Tutor & Faculty Portal</h2>
          <p className="text-xs text-slate-300">Apex Institute Academic Administration & LMS</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Faculty / Institutional Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="professor@college.edu"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2F9C95] focus:bg-white text-xs text-slate-800 transition"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-[11px] text-[#3B82C4] hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2F9C95] focus:bg-white text-xs text-slate-800 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#0F2642] hover:bg-[#173B63] text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Sign In to Faculty Portal</span>
            <ArrowRight className="w-4 h-4 text-teal-300" />
          </button>

          {/* Quick SSO & Demo button */}
          <div className="pt-3 border-t border-slate-200 space-y-2 text-center">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-[#173B63] font-bold text-xs rounded-xl border border-blue-200 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#3B82C4]" />
              <span>Instant 1-Click Demo Login (Dr. Suresh Kumar)</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/login/student')}
              className="text-xs text-slate-500 hover:text-slate-800 block pt-1"
            >
              Are you a student? Switch to <strong>Student Portal →</strong>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
