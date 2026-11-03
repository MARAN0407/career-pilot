import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  Lock, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Calendar, 
  Building2, 
  Smartphone, 
  KeyRound, 
  CheckCircle2, 
  Save, 
  Camera, 
  Bell, 
  Eye, 
  Download, 
  LogOut,
  AlertCircle
} from 'lucide-react';
import { DEPARTMENT_NAMES } from '../../constants/departments';

export const SettingsPage: React.FC = () => {
  const { user, role, updateUser } = useAuth();

  // Active Tab
  const [activeTab, setActiveTab] = useState<'personal' | 'security' | 'notifications' | 'privacy'>('personal');

  // Personal Info Form State
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState('+91 98450 22341');
  const [dob, setDob] = useState('2003-08-14');
  const [gender, setGender] = useState('Male');
  const [department, setDepartment] = useState(user.department || DEPARTMENT_NAMES[0]);
  const [registerNo, setRegisterNo] = useState(user.registerNumber || '20240982');

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // Notification States
  const [emailGrades, setEmailGrades] = useState(true);
  const [emailAssignments, setEmailAssignments] = useState(true);
  const [emailPlacements, setEmailPlacements] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  // Privacy State
  const [recruiterVisibility, setRecruiterVisibility] = useState('all_recruiters');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (updateUser) {
        await updateUser({ name, email, department, registerNumber: registerNo });
      }
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#173B63] flex items-center gap-2.5">
            <User className="w-6 h-6 text-[#3B82C4]" />
            <span>Account & Personal Settings</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your official personal information, security credentials, and college notification preferences
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings updated successfully!</span>
          </div>
        )}
      </div>

      {/* Google-style Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-px overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('personal')}
          className={`px-4 py-2.5 rounded-t-lg font-bold transition flex items-center gap-2 border-b-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'personal'
              ? 'border-[#173B63] text-[#173B63] bg-blue-50/50'
              : 'border-transparent text-slate-600 hover:text-[#173B63] hover:bg-slate-50'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Personal info</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2.5 rounded-t-lg font-bold transition flex items-center gap-2 border-b-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'security'
              ? 'border-[#173B63] text-[#173B63] bg-blue-50/50'
              : 'border-transparent text-slate-600 hover:text-[#173B63] hover:bg-slate-50'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Security & Password</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2.5 rounded-t-lg font-bold transition flex items-center gap-2 border-b-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'notifications'
              ? 'border-[#173B63] text-[#173B63] bg-blue-50/50'
              : 'border-transparent text-slate-600 hover:text-[#173B63] hover:bg-slate-50'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Notifications</span>
        </button>

        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-4 py-2.5 rounded-t-lg font-bold transition flex items-center gap-2 border-b-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'privacy'
              ? 'border-[#173B63] text-[#173B63] bg-blue-50/50'
              : 'border-transparent text-slate-600 hover:text-[#173B63] hover:bg-slate-50'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Data & Privacy</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* TAB 1: Personal Info */}
        {activeTab === 'personal' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Profile Photo Card */}
            <div className="academic-card p-6 flex flex-col sm:flex-row items-center gap-6">
              <div className="relative group">
                <img
                  src={user.avatar}
                  alt={name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-slate-200 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => alert('Choose new profile photo modal')}
                  className="absolute bottom-0 right-0 p-1.5 bg-[#173B63] text-white rounded-full shadow-md hover:bg-[#204B7D] transition cursor-pointer"
                  title="Change photo"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-center sm:text-left space-y-1">
                <h3 className="font-bold text-sm text-[#173B63]">Profile photo</h3>
                <p className="text-slate-500 text-xs">
                  A photo helps personalize your college profile and identity across classes
                </p>
                <button
                  type="button"
                  onClick={() => alert('Choose new profile photo')}
                  className="text-xs font-semibold text-[#3B82C4] hover:underline pt-1 inline-block"
                >
                  Change profile picture
                </button>
              </div>
            </div>

            {/* Basic Info Fields */}
            <div className="academic-card p-6 space-y-5">
              <h3 className="font-bold text-sm text-[#173B63] border-b border-slate-100 pb-3">
                Basic Institutional Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-[#3B82C4]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">College Roll / Register No.</label>
                  <input
                    type="text"
                    required
                    value={registerNo}
                    onChange={e => setRegisterNo(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-[#3B82C4] font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Institutional Email (.edu)</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-[#3B82C4]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mobile Contact Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-[#3B82C4]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date of Birth</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="date"
                      value={dob}
                      onChange={e => setDob(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-[#3B82C4]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-[#3B82C4]"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other / Prefer not to say</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Academic Department & Faculty</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      value={department}
                      onChange={e => setDepartment(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:border-[#3B82C4]"
                    >
                      {DEPARTMENT_NAMES.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <p className="text-[11px] text-teal-700 mt-1">
                    Your mock interview questions and rubrics will dynamically align with this department.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Security & Password */}
        {activeTab === 'security' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Change Password Card */}
            <div className="academic-card p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <KeyRound className="w-4 h-4 text-[#173B63]" />
                <h3 className="font-bold text-sm text-[#173B63]">Change Password</h3>
              </div>

              <div className="space-y-3 max-w-md">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:border-[#3B82C4]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="Minimum 8 characters"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:border-[#3B82C4]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Repeat new password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:border-[#3B82C4]"
                  />
                </div>
              </div>
            </div>

            {/* 2-Step Verification Card */}
            <div className="academic-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#2F9C95]" />
                  <h3 className="font-bold text-sm text-[#173B63]">2-Step Verification</h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-slate-800">Prompt on registered mobile device (+91 ********41)</p>
                  <p className="text-slate-500 text-[11px]">Protects your account with an extra verification layer upon sign in</p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={twoFactorEnabled}
                    onChange={e => setTwoFactorEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2F9C95]"></div>
                </label>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="academic-card p-6 space-y-3">
              <h3 className="font-bold text-sm text-[#173B63] border-b border-slate-100 pb-3">
                Your Active Devices
              </h3>

              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-4 h-4 text-[#173B63]" />
                    <div>
                      <span className="font-bold text-slate-800 block">Windows PC • Chrome Browser (This Device)</span>
                      <span className="text-[10px] text-slate-400">Boston, MA • Active now</span>
                    </div>
                  </div>
                  <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded">Active Session</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Notifications */}
        {activeTab === 'notifications' && (
          <div className="academic-card p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Bell className="w-4 h-4 text-[#3B82C4]" />
              <h3 className="font-bold text-sm text-[#173B63]">
                Email & SMS Notification Preferences
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition">
                <div>
                  <span className="font-semibold text-slate-800 block">Assignment Grades & Faculty Feedback</span>
                  <span className="text-[11px] text-slate-500">Receive an email when grades or rubric evaluations are published</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailGrades}
                  onChange={e => setEmailGrades(e.target.checked)}
                  className="w-4 h-4 accent-[#173B63]"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition">
                <div>
                  <span className="font-semibold text-slate-800 block">Upcoming Course Deadlines Reminder</span>
                  <span className="text-[11px] text-slate-500">24 hours reminder before homework or lab assignment due dates</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailAssignments}
                  onChange={e => setEmailAssignments(e.target.checked)}
                  className="w-4 h-4 accent-[#173B63]"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition">
                <div>
                  <span className="font-semibold text-slate-800 block">Campus Placement & Job Match Announcements</span>
                  <span className="text-[11px] text-slate-500">Instant alert when a matching company interview drive is opened</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailPlacements}
                  onChange={e => setEmailPlacements(e.target.checked)}
                  className="w-4 h-4 accent-[#173B63]"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition">
                <div>
                  <span className="font-semibold text-slate-800 block">SMS Alerts to Mobile (+91 ********41)</span>
                  <span className="text-[11px] text-slate-500">Urgent exam schedule changes or classroom venue updates</span>
                </div>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={e => setSmsAlerts(e.target.checked)}
                  className="w-4 h-4 accent-[#173B63]"
                />
              </label>
            </div>
          </div>
        )}

        {/* TAB 4: Data & Privacy */}
        {activeTab === 'privacy' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="academic-card p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Eye className="w-4 h-4 text-[#2F9C95]" />
                <h3 className="font-bold text-sm text-[#173B63]">Profile & Academic Visibility</h3>
              </div>

              <div className="space-y-3 text-xs">
                <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    value="all_recruiters"
                    checked={recruiterVisibility === 'all_recruiters'}
                    onChange={e => setRecruiterVisibility(e.target.value)}
                    className="mt-0.5 accent-[#173B63]"
                  />
                  <div>
                    <span className="font-semibold text-slate-800 block">Verified Campus Recruiters & Faculty (Recommended)</span>
                    <span className="text-[11px] text-slate-500">Allows partner companies to match and invite you to interview drives</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    value="enrolled_classmates"
                    checked={recruiterVisibility === 'enrolled_classmates'}
                    onChange={e => setRecruiterVisibility(e.target.value)}
                    className="mt-0.5 accent-[#173B63]"
                  />
                  <div>
                    <span className="font-semibold text-slate-800 block">Enrolled Classmates Only</span>
                    <span className="text-[11px] text-slate-500">Only visible within classroom discussion streams and cohorts</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Download Data */}
            <div className="academic-card p-6 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-[#173B63]">Download Academic Records</h4>
                <p className="text-slate-500 text-xs mt-0.5">Export your enrolled courses, assignment grades, and verified credentials</p>
              </div>

              <button
                type="button"
                onClick={() => alert('Exporting academic record JSON archive...')}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Data</span>
              </button>
            </div>
          </div>
        )}

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#173B63] hover:bg-[#204B7D] text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4 text-teal-300" />
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
