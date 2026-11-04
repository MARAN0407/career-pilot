import React from 'react';
import { Bell, CheckCircle2, Video, Sparkles, X, Briefcase, Target, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { user, clearNotifications } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const dept = user?.department || 'Engineering';

  const notifications = [
    {
      id: 1,
      title: 'Mock Interview Evaluation Ready',
      desc: `Your recent Technical Domain assessment for ${dept} has been processed with multi-rubric evaluation.`,
      time: '15 mins ago',
      icon: <Sparkles className="w-4 h-4 text-[#7567C7]" />,
      unread: true,
      path: '/student/interview-results'
    },
    {
      id: 2,
      title: 'Career Match Calibration Updated',
      desc: `3 new job and role profiles have been matched to your ${dept} skill profile.`,
      time: '2 hours ago',
      icon: <Briefcase className="w-4 h-4 text-[#2F9C95]" />,
      unread: true,
      path: '/student/jobs'
    },
    {
      id: 3,
      title: 'Interview Performance Metric',
      desc: 'Competency radar chart calibrated with latest technical fluency and composure scores.',
      time: '1 day ago',
      icon: <Target className="w-4 h-4 text-[#3B82C4]" />,
      unread: false,
      path: '/student/interview-results'
    },
    {
      id: 4,
      title: 'Career Skill Gap Progress',
      desc: `Track recommended core competencies to boost your hiring readiness for ${dept} roles.`,
      time: '2 days ago',
      icon: <TrendingUp className="w-4 h-4 text-emerald-600" />,
      unread: false,
      path: '/student/skill-gap'
    }
  ];

  return (
    <div className="absolute right-0 top-12 w-84 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
      <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#173B63]" />
          <h3 className="font-semibold text-sm text-[#173B63]">Career Notifications</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearNotifications}
            className="text-[11px] text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
          >
            Mark all read
          </button>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {notifications.map(n => (
          <div
            key={n.id}
            onClick={() => {
              navigate(n.path);
              onClose();
            }}
            className={`p-3 text-xs transition flex gap-3 cursor-pointer ${
              n.unread ? 'bg-blue-50/40 hover:bg-blue-50/70' : 'hover:bg-slate-50'
            }`}
          >
            <div className="mt-0.5 p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs shrink-0 h-fit">
              {n.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="font-semibold text-slate-800">{n.title}</span>
                <span className="text-[10px] text-slate-400">{n.time}</span>
              </div>
              <p className="text-slate-600 line-clamp-2 leading-relaxed">{n.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-center">
        <span className="text-[11px] text-slate-500">Career Accelerator Real-Time Notification System</span>
      </div>
    </div>
  );
};

