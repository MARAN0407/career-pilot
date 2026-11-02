import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, Users, LogOut } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const { user, role, switchRole } = useAuth();
  const navigate = useNavigate();

  const handleSwitchToStudent = async () => {
    await switchRole('student');
    navigate('/student/dashboard');
  };

  const handleSwitchToTutor = async () => {
    await switchRole('tutor');
    navigate('/tutor/dashboard');
  };

  return (
    <div className="bg-gradient-to-r from-[#173B63] to-[#2F9C95] text-white text-[11px] px-4 py-1.5 flex items-center justify-between z-50 select-none shadow-xs">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-teal-300 animate-pulse" />
        <span className="font-bold text-white">Career Pilot:</span>
        <span className="hidden sm:inline text-slate-100">AI Learning & Career Intelligence Platform</span>
        <span className="px-2 py-0.5 bg-white/20 text-white text-[10px] font-bold rounded-md backdrop-blur-xs">
          {role === 'student' ? '🎓 Student View' : '👨‍🏫 Tutor View'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-slate-200 hidden md:inline">Instant Switch:</span>

        <button
          onClick={handleSwitchToStudent}
          className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
            role === 'student'
              ? 'bg-white text-[#173B63] shadow-xs'
              : 'bg-white/15 hover:bg-white/25 text-white'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          Student View ({user?.name ? user.name.split(' ')[0] : 'Student'})
        </button>

        <button
          onClick={handleSwitchToTutor}
          className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
            role === 'tutor'
              ? 'bg-white text-[#173B63] shadow-xs'
              : 'bg-white/15 hover:bg-white/25 text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          Tutor View (Dr. Kumar)
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
