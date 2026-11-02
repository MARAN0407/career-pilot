import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, Mail, Lock, User, School, ArrowRight } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('Computer Science & AI');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      const registeredEmail = email.trim() || `${name.trim().toLowerCase().replace(/\s+/g, '')}@college.edu`;
      await register(name.trim(), registeredEmail, department, password || 'password123', 'student');
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
        <div className="p-6 bg-gradient-to-r from-[#173B63] to-[#2F9C95] text-white text-center space-y-1">
          <h2 className="text-xl font-bold">Register for Career Pilot</h2>
          <p className="text-xs text-slate-200">Connect with college classrooms and AI career tools</p>
        </div>

        <form onSubmit={handleRegister} className="p-6 sm:p-8 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Full Legal Name</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Ilamaran"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3B82C4]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">College Email (.edu)</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ilamaran@college.edu"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3B82C4]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Create a secure password"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3B82C4]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Academic Department</label>
            <div className="relative">
              <School className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                value={department}
                onChange={e => setDepartment(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3B82C4]"
              >
                <option>Computer Science & AI</option>
                <option>Data Systems Engineering</option>
                <option>Information Technology</option>
                <option>Electronics & Communication</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#173B63] hover:bg-[#204B7D] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isSubmitting ? 'Creating Profile...' : 'Create Student Account'}</span>
            <ArrowRight className="w-4 h-4 text-teal-300" />
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => navigate('/login/student')}
              className="text-xs text-[#3B82C4] hover:underline"
            >
              Already registered? Sign in here →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
