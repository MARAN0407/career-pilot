import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, LogOut, Sparkles } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-[#173B63] to-[#2F9C95] text-white text-[11px] px-4 py-1.5 flex items-center justify-between z-50 select-none shadow-xs">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-teal-300 animate-pulse" />
        <span className="font-bold text-white">Career Accelerator:</span>
        <span className="hidden sm:inline text-slate-100">AI Student Career & Placement Intelligence</span>
        <span className="px-2 py-0.5 bg-white/20 text-white text-[10px] font-bold rounded-md backdrop-blur-xs flex items-center gap-1">
          <GraduationCap className="w-3 h-3 text-teal-300" />
          Student Workspace
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-teal-200 hidden md:inline font-semibold">
          Active Student: <span className="text-white underline">{user?.name || 'Ilamaran'}</span>
        </span>

        <button
          onClick={() => navigate('/student/dashboard')}
          className="px-3 py-1 rounded-lg font-bold bg-white text-[#173B63] shadow-xs transition flex items-center gap-1.5 cursor-pointer hover:bg-slate-100"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#2F9C95]" />
          <span>Student Dashboard</span>
        </button>

        <button
          onClick={() => navigate('/')}
          className="px-2.5 py-1 rounded-lg hover:bg-white/20 text-white transition flex items-center gap-1 ml-1 cursor-pointer"
          title="Return to Public Landing Page"
        >
          <LogOut className="w-3 h-3" />
          <span className="hidden lg:inline">Landing</span>
        </button>
      </div>
    </div>
  );
};
