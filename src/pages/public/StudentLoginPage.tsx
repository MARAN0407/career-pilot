import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, Sparkles, Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';

export const StudentLoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('ilamaran');
  const [password, setPassword] = useState('••••••••');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;

    setIsSubmitting(true);
    try {
      await login('student', identifier, password);
      navigate('/student/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = async (username: string) => {
    setIdentifier(username);
    setIsSubmitting(true);
    try {
      await login('student', username, 'demo1234');
      navigate('/student/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#173B63] to-[#2F9C95] text-white text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center mx-auto shadow-md">
            <GraduationCap className="w-6 h-6 text-teal-300" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Welcome to Student Portal</h2>
          <p className="text-xs text-slate-200">Sign in with any student username or institutional email</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Username or College Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                placeholder="e.g. ilamaran or ilamaran@college.edu"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3B82C4] focus:bg-white text-xs text-slate-800 transition"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Tip: You can enter <strong>ilamaran</strong> or any custom name to sign in directly!
            </p>
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
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3B82C4] focus:bg-white text-xs text-slate-800 transition"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" defaultChecked className="w-4 h-4 accent-[#173B63]" />
            <label htmlFor="remember" className="text-slate-600 text-xs cursor-pointer">Remember my device</label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#173B63] hover:bg-[#204B7D] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isSubmitting ? 'Signing In...' : `Sign In as ${identifier ? identifier : 'Student'}`}</span>
            <ArrowRight className="w-4 h-4 text-teal-300" />
          </button>

          {/* Quick SSO with dynamic options */}
          <div className="pt-3 border-t border-slate-200 space-y-2 text-center">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('ilamaran')}
                className="flex-1 py-2 bg-teal-50 hover:bg-teal-100 text-[#2F9C95] font-bold text-[11px] rounded-xl border border-teal-200 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Login as Ilamaran</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('alex.chen')}
                className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-[11px] rounded-xl border border-slate-200 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Login as Alex</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 text-[11px]">
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-[#3B82C4] font-semibold hover:underline"
              >
                New student? Create Account →
              </button>
              <button
                type="button"
                onClick={() => navigate('/login/tutor')}
                className="text-slate-500 hover:text-slate-800"
              >
                Tutor Portal →
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
