import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, GraduationCap, School, Award, ShieldCheck, CheckCircle2, Key, Bell, Settings } from 'lucide-react';

export const StudentProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Profile Card */}
      <div className="academic-card p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-white to-blue-50/30">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white shadow-lg ring-2 ring-slate-200"
        />

        <div className="space-y-2 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl font-bold text-[#173B63]">{user.name}</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-[#2F9C95] font-bold text-xs border border-teal-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified College Student
            </span>
          </div>

          <p className="text-xs text-slate-600 font-medium">
            {user.registerNumber} • {user.department}
          </p>

          <p className="text-xs text-slate-500">
            {user.institution} • {user.semester}
          </p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 text-center shadow-xs">
          <span className="text-2xl font-extrabold text-[#173B63] font-mono">{user.gpa || 3.88}</span>
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Cumulative GPA</span>
        </div>
      </div>

      {/* Academic Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Credentials */}
        <div className="academic-card p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#173B63] uppercase tracking-wider">
            Academic Credentials & Status
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Institutional Email:</span>
              <strong className="text-slate-800 font-mono">{user.email}</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Major:</span>
              <strong className="text-slate-800">Computer Science & AI</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Graduation Year:</span>
              <strong className="text-slate-800">May 2027</strong>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-500">Placement Cell Status:</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Eligible for On-Campus</span>
            </div>
          </div>
        </div>

        {/* Preferences & Integrations */}
        <div className="academic-card p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#173B63] uppercase tracking-wider">
            AI Mentor & Notification Settings
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg cursor-pointer">
              <span>Automated Mock Interview Grading Notifications</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#2F9C95]" />
            </label>
            <label className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg cursor-pointer">
              <span>Weekly Skill Gap & Placement Alerts</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#2F9C95]" />
            </label>
            <label className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg cursor-pointer">
              <span>Vector RAG Search Sync for Enrolled Courses</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#2F9C95]" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
