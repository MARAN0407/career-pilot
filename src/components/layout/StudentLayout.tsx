import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DemoBanner } from './DemoBanner';
import { NotificationDrawer } from './NotificationDrawer';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Compass, 
  Target, 
  Briefcase, 
  Video, 
  Clock, 
  MessageSquare, 
  User, 
  Settings, 
  Menu, 
  X, 
  Bell, 
  Search, 
  Sparkles, 
  ShieldCheck,
  Award
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: any;
  isAi?: boolean;
  highlight?: string;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const StudentLayout: React.FC = () => {
  const { user, notificationCount } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navSections: NavSection[] = [
    {
      title: 'CLASSROOM & LEARNING',
      items: [
        { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
        { label: 'My Classes', path: '/student/classes', icon: BookOpen },
        { label: 'Assignments', path: '/student/assignments', icon: GraduationCap, badge: '1 Due' },
        { label: 'Learning Hub', path: '/student/learning-hub', icon: Award },
      ]
    },
    {
      title: 'CAREER INTELLIGENCE',
      items: [
        { label: 'Resume AI (ATS)', path: '/student/resume-ai', icon: FileText, highlight: '86%' },
        { label: 'Career Intelligence', path: '/student/career-intel', icon: Compass },
        { label: 'Skill Gap Analysis', path: '/student/skill-gap', icon: Target },
        { label: 'Job Matcher', path: '/student/jobs', icon: Briefcase, badge: '4 New' },
        { label: 'Career Roadmap', path: '/student/roadmap', icon: Compass },
      ]
    },
    {
      title: 'AI ASSESSMENT & INTERVIEW',
      items: [
        { label: 'AI Interview Center', path: '/student/interview-center', icon: Video, isAi: true, highlight: 'Live' },
        { label: 'Scorecards & Radar', path: '/student/interview-results', icon: Target },
        { label: 'Interview History', path: '/student/interview-history', icon: Clock },
        { label: 'AI Career Assistant', path: '/student/ai-assistant', icon: MessageSquare, isAi: true },
      ]
    },
    {
      title: 'ACCOUNT & SYSTEM',
      items: [
        { label: 'Profile', path: '/student/profile', icon: User },
        { label: 'Settings', path: '/student/settings', icon: Settings },
      ]
    }
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#F5F7FA] flex flex-col font-sans text-[#173B63] selection:bg-blue-100 selection:text-[#173B63]">
      {/* Top Banner (Fixed) */}
      <div className="shrink-0 z-50">
        <DemoBanner />
      </div>

      {/* Main App Workspace (Sidebar Fixed + Content Scrollable) */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Desktop Sidebar (FIXED - NEVER SCROLLS WITH PAGE) */}
        <aside className="hidden lg:flex flex-col w-68 h-full bg-white border-r border-slate-200 shrink-0 select-none transition-colors z-20 shadow-2xs">
          {/* Brand Logo Header */}
          <div className="p-4 border-b border-slate-100 flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#173B63] to-[#2F9C95] flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base text-[#173B63] tracking-tight">Career Pilot</span>
                <span className="px-1.5 py-0.5 bg-blue-50 text-[#173B63] text-[10px] font-bold rounded-md border border-blue-200">Hub</span>
              </div>
              <p className="text-[11px] text-slate-500">Student Portal</p>
            </div>
          </div>

          {/* Nav Links (Internal Scroll only if needed) */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
            {navSections.map((section, idx) => (
              <div key={idx} className="space-y-1">
                <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {section.title}
                </p>
                {section.items.map((item, itemIdx) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={itemIdx}
                      to={item.path}
                      className={({ isActive }) => `
                        flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group
                        ${
                          isActive
                            ? item.isAi
                              ? 'bg-purple-50 text-purple-900 border border-purple-200 shadow-xs'
                              : 'bg-blue-50 text-[#173B63] border border-blue-200 shadow-xs font-bold'
                            : item.isAi
                            ? 'text-purple-700 hover:bg-purple-50/50'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-[#173B63]'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                          item.isAi ? 'text-[#7567C7]' : 'text-slate-400 group-hover:text-[#173B63]'
                        }`} />
                        <span>{item.label}</span>
                      </div>

                      {item.highlight && (
                        <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-[#2F9C95] text-white">
                          {item.highlight}
                        </span>
                      )}

                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-slate-100 text-slate-700 font-mono">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* User Footer Profile */}
          <div className="p-3 border-t border-slate-100 shrink-0">
            <div
              onClick={() => navigate('/student/profile')}
              className="p-2 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 transition flex items-center gap-3 cursor-pointer"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#173B63] truncate">{user.name}</p>
                <p className="text-[10px] text-slate-500 truncate">{user.registerNumber || 'CS2023-8842'}</p>
              </div>
              <span title="Verified College Student">
                <ShieldCheck className="w-4 h-4 text-[#2F9C95] shrink-0" />
              </span>
            </div>
          </div>
        </aside>

        {/* Mobile Drawer */}
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsMobileOpen(false)} />
            <div className="relative flex flex-col w-72 max-w-[80%] bg-white h-full shadow-2xl z-10 border-r border-slate-200">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#173B63] flex items-center justify-center text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm text-[#173B63]">Career Pilot</span>
                </div>
                <button onClick={() => setIsMobileOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
                {navSections.map((section, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{section.title}</p>
                    {section.items.map((item, itemIdx) => (
                      <NavLink
                        key={itemIdx}
                        to={item.path}
                        onClick={() => setIsMobileOpen(false)}
                        className={({ isActive }) => `
                          flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold
                          ${isActive ? 'bg-blue-50 text-[#173B63] font-bold' : 'text-slate-600'}
                        `}
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content Area (INDEPENDENTLY SCROLLABLE CONTAINER) */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto bg-[#F5F7FA]">
          {/* Topbar (Sticky Header) */}
          <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 shadow-2xs shrink-0">
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-600"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Instagram / Chrome Pill Search */}
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search courses, skills, assignments, AI tools..."
                  className="w-full bg-slate-50 hover:bg-slate-100 focus:bg-white text-xs text-slate-800 pl-10 pr-4 py-2 rounded-full border border-slate-200 focus:border-[#3B82C4] focus:outline-none transition shadow-2xs"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Quick AI Interview Center CTA */}
              <button
                onClick={() => navigate('/student/interview-center')}
                className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#173B63] hover:bg-[#204B7D] text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                <span>AI Interview Studio</span>
              </button>

              {/* Notification Button */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-600 relative transition cursor-pointer"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {notificationCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-[#2F9C95] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </button>

                <NotificationDrawer
                  isOpen={isNotificationsOpen}
                  onClose={() => setIsNotificationsOpen(false)}
                />
              </div>

              {/* User Dropdown Profile */}
              <div
                onClick={() => navigate('/student/profile')}
                className="flex items-center gap-2 pl-2 border-l border-slate-200 cursor-pointer group"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-slate-200 group-hover:ring-2 group-hover:ring-[#3B82C4]/50 transition"
                />
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-bold text-[#173B63] group-hover:text-[#3B82C4] leading-tight">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-slate-500">CS Junior</p>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content Body */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
