import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  User as UserIcon, 
  Edit3, 
  MapPin, 
  Mail, 
  Phone,
  GraduationCap, 
  Building2, 
  Briefcase, 
  Award, 
  Sparkles, 
  Plus, 
  ShieldCheck, 
  Camera, 
  Trash2, 
  CheckCircle2, 
  X,
  BookOpen
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

const AUTHORIZED_DEPARTMENTS = [
  'Agricultural Engineering',
  'Civil Engineering',
  'Computer Science and Engineering (CSE)',
  'Electrical and Electronics Engineering (EEE)',
  'Electronics and Communication Engineering (ECE)',
  'Mechanical Engineering',
  'Biomedical Engineering (BME)',
  'Information Technology (IT)',
  'Biotechnology',
  'Food Technology',
  'Artificial Intelligence and Data Science',
  'Artificial Intelligence and Machine Learning',
  'Computer Science and Engineering (Cyber Security)',
  'Electronics Engineering (VLSI Design and Technology)'
];

interface Experience {
  id: string;
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
}

export const LinkedInProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();

  // Profile Header State
  const [profileName, setProfileName] = useState(user.name || 'Candidate');
  const [headline, setHeadline] = useState(
    user.headline || `${user.department || 'Engineering'} Student • Career Accelerator Placement Track`
  );
  const [location, setLocation] = useState(user.location || 'Chennai, Tamil Nadu, India');
  const [phone, setPhone] = useState(user.phone || '+91 98765 43210');
  const [department, setDepartment] = useState(user.department || AUTHORIZED_DEPARTMENTS[2]);
  const [aboutBio, setAboutBio] = useState(
    user.bio || `Engineering candidate in ${user.department || 'Computer Science'}. Focused on core engineering fundamentals, hands-on laboratory projects, and technical mock interview readiness.`
  );

  const [skills, setSkills] = useState<string[]>([
    'Technical Problem Solving',
    'Department Domain Core',
    'Mathematical Modeling',
    'Laboratory Instrumentation',
    'Project Engineering',
    'Team Collaboration'
  ]);

  // Experience state
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: 'exp_1',
      title: 'Department Technical Project Lead',
      organization: user.institution || 'Apex Institute of Technology',
      location: 'Campus Engineering Lab',
      period: '2025 - Present',
      description: `Spearheaded hands-on laboratory simulations and capstone engineering investigations in ${user.department || 'core engineering'}.`
    }
  ]);

  // Certifications state
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: 'cert_1',
      name: `Accredited ${user.department || 'Engineering'} Placement Assessment`,
      issuer: 'Career Accelerator Evaluation Board',
      issueDate: '2026',
      credentialId: 'CA-EVAL-2026'
    }
  ]);

  // Modals state
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddExpOpen, setIsAddExpOpen] = useState(false);
  const [isAddCertOpen, setIsAddCertOpen] = useState(false);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states for modals
  const [newExpTitle, setNewExpTitle] = useState('');
  const [newExpOrg, setNewExpOrg] = useState('');
  const [newExpPeriod, setNewExpPeriod] = useState('');
  const [newExpDesc, setNewExpDesc] = useState('');

  const [newCertName, setNewCertName] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('');
  const [newCertDate, setNewCertDate] = useState('');

  // File Upload Refs
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Avatar Upload Handler
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      if (typeof reader.result === 'string') {
        await updateUser({ avatar: reader.result });
        showToast('Profile photo updated successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  // Banner Upload Handler
  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      if (typeof reader.result === 'string') {
        await updateUser({ banner: reader.result });
        showToast('Profile banner updated successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  // Save Profile Edits
  const handleSaveProfile = async () => {
    await updateUser({
      name: profileName,
      department: department,
      headline: headline,
      bio: aboutBio,
      location: location,
      phone: phone
    });
    setIsEditProfileOpen(false);
    showToast('Profile details updated successfully!');
  };

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !skills.includes(newSkillInput.trim())) {
      setSkills([...skills, newSkillInput.trim()]);
      setNewSkillInput('');
      showToast('Skill added to profile!');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpTitle.trim()) return;
    const item: Experience = {
      id: `exp_${Date.now()}`,
      title: newExpTitle,
      organization: newExpOrg || user.institution || 'Engineering Institute',
      location: location,
      period: newExpPeriod || '2025 - Present',
      description: newExpDesc
    };
    setExperiences([item, ...experiences]);
    setIsAddExpOpen(false);
    setNewExpTitle('');
    setNewExpOrg('');
    setNewExpDesc('');
    showToast('Project experience added!');
  };

  const handleAddCertification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertName.trim()) return;
    const item: Certification = {
      id: `cert_${Date.now()}`,
      name: newCertName,
      issuer: newCertIssuer || 'Accreditation Board',
      issueDate: newCertDate || '2026'
    };
    setCertifications([item, ...certifications]);
    setIsAddCertOpen(false);
    setNewCertName('');
    setNewCertIssuer('');
    showToast('Certification added!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-600 hover:text-emerald-900 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Hidden File Inputs for Banner and Avatar */}
      <input 
        ref={bannerInputRef} 
        type="file" 
        accept="image/*" 
        onChange={handleBannerUpload} 
        className="hidden" 
      />
      <input 
        ref={avatarInputRef} 
        type="file" 
        accept="image/*" 
        onChange={handleAvatarUpload} 
        className="hidden" 
      />

      {/* 1. Hero Banner & Profile Card */}
      <div className="academic-card overflow-hidden relative border border-slate-200 shadow-sm">
        {/* Cover Photo */}
        <div 
          className="h-44 sm:h-52 bg-gradient-to-r from-[#173B63] via-[#1E4D82] to-[#2F9C95] relative bg-cover bg-center"
          style={user.banner ? { backgroundImage: `url(${user.banner})` } : undefined}
        >
          <div className="absolute inset-0 bg-black/15" />
          <button
            onClick={() => bannerInputRef.current?.click()}
            className="absolute top-4 right-4 p-2 rounded-lg bg-black/60 hover:bg-black/80 text-white text-xs backdrop-blur-md transition flex items-center gap-1.5 cursor-pointer shadow-md"
            title="Upload and change cover banner"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="font-semibold">Change Banner</span>
          </button>
        </div>

        {/* Profile Details Container */}
        <div className="px-6 pb-6 pt-0 relative">
          {/* Avatar floating over banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-4">
            <div className="relative group">
              <img
                src={user.avatar}
                alt={profileName}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white shadow-xl ring-2 ring-slate-200 bg-white"
              />
              <button
                onClick={() => avatarInputRef.current?.click()}
                className="absolute bottom-1 right-1 p-2.5 rounded-full bg-[#173B63] hover:bg-[#204B7D] text-white shadow-lg transition cursor-pointer"
                title="Upload and change profile picture"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Edit Profile Button */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#173B63] hover:bg-[#204B7D] text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile Details</span>
              </button>
            </div>
          </div>

          {/* User Info with High Contrast */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-[#173B63]">
                {profileName}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 font-extrabold text-xs border border-teal-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                {user.department || 'Verified Department Candidate'}
              </span>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-800 max-w-2xl leading-relaxed">
              {headline}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-700 font-bold pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-600" />
                {location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-600" />
                {user.institution || 'Engineering Institute'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-[#173B63] font-mono">
                <Mail className="w-3.5 h-3.5 text-slate-600" />
                {user.email}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-mono text-slate-800">
                <Phone className="w-3.5 h-3.5 text-slate-600" />
                {phone}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Academic & Department Credential Overview */}
      <div className="academic-card p-6 space-y-4">
        <h3 className="text-base font-bold text-[#173B63] flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-[#2F9C95]" />
          <span>Academic & Placement Profile</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Department</span>
            <span className="font-extrabold text-[#173B63] block mt-0.5 truncate" title={user.department}>
              {user.department}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Register Number</span>
            <span className="font-bold font-mono text-slate-800 block mt-0.5">
              {user.registerNumber || '20240982'}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Semester</span>
            <span className="font-bold text-slate-800 block mt-0.5">
              {user.semester || '6th Semester'}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Current CGPA</span>
            <span className="font-bold font-mono text-emerald-700 block mt-0.5">
              {user.gpa ? `${user.gpa} / 10.0` : '8.85 / 10.0'}
            </span>
          </div>
        </div>
      </div>

      {/* 3. About / Bio */}
      <div className="academic-card p-6 space-y-3">
        <h3 className="text-base font-bold text-[#173B63]">About & Career Focus</h3>
        <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed whitespace-pre-line">
          {aboutBio}
        </p>
      </div>

      {/* 4. Projects & Practical Experience */}
      <div className="academic-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#173B63]">
            Projects & Practical Experience
          </h3>
          <button
            onClick={() => setIsAddExpOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Project</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {experiences.map(exp => (
            <div key={exp.id} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-slate-100 text-[#173B63] shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="space-y-1 flex-1 text-xs">
                <h4 className="font-bold text-sm text-slate-900">{exp.title}</h4>
                <p className="text-slate-800 font-medium">{exp.organization} • {exp.location}</p>
                <span className="text-[11px] text-slate-500 block font-semibold">{exp.period}</span>
                <p className="text-slate-700 pt-1 leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Licenses & Certifications */}
      <div className="academic-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#173B63]">
            Certifications & Accreditations
          </h3>
          <button
            onClick={() => setIsAddCertOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Certification</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {certifications.map(cert => (
            <div key={cert.id} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-teal-50 text-[#2F9C95] shrink-0 border border-teal-100">
                <Award className="w-5 h-5" />
              </div>
              <div className="space-y-0.5 flex-1 text-xs">
                <h4 className="font-bold text-sm text-slate-900">{cert.name}</h4>
                <p className="text-slate-800 font-medium">{cert.issuer}</p>
                <span className="text-[11px] text-slate-500 block font-semibold">Issued {cert.issueDate}</span>
                {cert.credentialId && (
                  <span className="text-[11px] font-mono text-slate-600 block">
                    Credential ID: {cert.credentialId}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Technical Skills Matrix */}
      <div className="academic-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#173B63]">
            Technical Competencies & Skills ({skills.length})
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-900 text-xs font-semibold border border-slate-200 flex items-center gap-2 group"
            >
              <span>{skill}</span>
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="opacity-40 hover:opacity-100 text-slate-600 hover:text-rose-600 cursor-pointer"
                title="Remove skill"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Add new skill inline */}
        <div className="flex items-center gap-2 pt-2">
          <input
            type="text"
            placeholder="Add new engineering skill..."
            value={newSkillInput}
            onChange={e => setNewSkillInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAddSkill()}
            className="flex-1 bg-slate-50 px-3 py-2.5 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-[#2F9C95] text-slate-900"
          />
          <button
            onClick={handleAddSkill}
            className="px-4 py-2.5 bg-[#2F9C95] hover:bg-[#3EBAB2] text-white font-bold text-xs rounded-xl transition cursor-pointer"
          >
            Add Skill
          </button>
        </div>
      </div>

      {/* MODAL 1: Edit Profile Details */}
      <Modal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        title="Edit Candidate Profile Information"
        subtitle="Update your full name, department, headline, and bio"
        maxWidth="lg"
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-800 mb-1">Full Name</label>
            <input
              type="text"
              value={profileName}
              onChange={e => setProfileName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-[#2F9C95]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Department</label>
            <select
              value={department}
              onChange={e => setDepartment(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-[#2F9C95] font-semibold"
            >
              {AUTHORIZED_DEPARTMENTS.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Professional Headline</label>
            <textarea
              rows={2}
              value={headline}
              onChange={e => setHeadline(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-[#2F9C95]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-[#2F9C95]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-[#2F9C95]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">About / Bio</label>
            <textarea
              rows={4}
              value={aboutBio}
              onChange={e => setAboutBio(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-[#2F9C95]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
            <button
              onClick={() => setIsEditProfileOpen(false)}
              className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              className="px-5 py-2 rounded-xl bg-[#173B63] hover:bg-[#204B7D] text-white font-bold cursor-pointer shadow-sm"
            >
              Save Profile Changes
            </button>
          </div>
        </div>
      </Modal>

      {/* MODAL 2: Add Experience */}
      <Modal
        isOpen={isAddExpOpen}
        onClose={() => setIsAddExpOpen(false)}
        title="Add Project or Experience"
        subtitle="Document technical projects, lab experience, or internships"
        maxWidth="md"
      >
        <form onSubmit={handleAddExperience} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-800 mb-1">Project / Role Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Automated Irrigation Sensor Subsystem"
              value={newExpTitle}
              onChange={e => setNewExpTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-[#2F9C95]"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-800 mb-1">Organization / Lab</label>
            <input
              type="text"
              placeholder="e.g. Department Automation Laboratory"
              value={newExpOrg}
              onChange={e => setNewExpOrg(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-[#2F9C95]"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-800 mb-1">Period</label>
            <input
              type="text"
              placeholder="e.g. Aug 2025 - Dec 2025"
              value={newExpPeriod}
              onChange={e => setNewExpPeriod(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-[#2F9C95]"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-800 mb-1">Description</label>
            <textarea
              rows={3}
              placeholder="Describe tools used, governing equations, and measurable outcomes..."
              value={newExpDesc}
              onChange={e => setNewExpDesc(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-[#2F9C95]"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddExpOpen(false)}
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-[#173B63] hover:bg-[#204B7D] text-white font-bold"
            >
              Add Project
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL 3: Add Certification */}
      <Modal
        isOpen={isAddCertOpen}
        onClose={() => setIsAddCertOpen(false)}
        title="Add Certification or License"
        subtitle="Include verified professional credentials"
        maxWidth="md"
      >
        <form onSubmit={handleAddCertification} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-800 mb-1">Certification Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Certified STAAD.Pro Structural Associate"
              value={newCertName}
              onChange={e => setNewCertName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-[#2F9C95]"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-800 mb-1">Issuing Body</label>
            <input
              type="text"
              placeholder="e.g. Bentley Systems / IEEE / Coursera"
              value={newCertIssuer}
              onChange={e => setNewCertIssuer(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-[#2F9C95]"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-800 mb-1">Issue Year</label>
            <input
              type="text"
              placeholder="e.g. 2026"
              value={newCertDate}
              onChange={e => setNewCertDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-[#2F9C95]"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddCertOpen(false)}
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-[#2F9C95] hover:bg-[#3EBAB2] text-white font-bold"
            >
              Save Certification
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
