import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  Edit3, 
  MapPin, 
  Mail, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  Award, 
  Sparkles, 
  Plus, 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  Send, 
  ShieldCheck, 
  ExternalLink, 
  Camera, 
  Image as ImageIcon, 
  FileText, 
  Trash2, 
  CheckCircle2, 
  X,
  BookOpen
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

interface Post {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  timestamp: string;
  content: string;
  tag: 'Achievement' | 'Certification' | 'Research' | 'Coursework' | 'Project';
  likesCount: number;
  isLiked: boolean;
  comments: Array<{
    id: string;
    userName: string;
    userAvatar: string;
    timestamp: string;
    text: string;
  }>;
  badge?: string;
}

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
  const { user, role } = useAuth();

  // Profile Header State
  const [profileName, setProfileName] = useState(user.name);
  const [headline, setHeadline] = useState(
    role === 'tutor'
      ? 'Professor & Head of AI Research @ Apex Institute of Tech • Deep Learning & Transformer Architectures'
      : 'Computer Science & AI Junior @ Apex Institute of Technology • Aspiring Machine Learning Engineer'
  );
  const [location, setLocation] = useState('Boston, Massachusetts, United States');
  const [aboutBio, setAboutBio] = useState(
    role === 'tutor'
      ? 'Academic lead and researcher specializing in scalable neural architectures, backpropagation acceleration, and LLM alignment. Published 24+ peer-reviewed papers in NeurIPS, ICML, and CVPR. Passionate about empowering students through AI-driven pedagogy and grounded RAG knowledge systems.'
      : 'Passionate Junior Computer Science student focusing on Deep Learning, Transformer Architectures, and Applied AI systems. Experienced in building PyTorch neural models from scratch, implementing RAG pipelines with vector databases, and designing high-throughput REST inference APIs with FastAPI.'
  );

  const [skills, setSkills] = useState<string[]>(
    role === 'tutor'
      ? ['Deep Learning', 'Neural Architectures', 'Curriculum Design', 'RAG Vector Systems', 'PyTorch', 'Research Mentorship', 'Machine Learning', 'Computer Vision']
      : ['Python', 'Machine Learning', 'PyTorch', 'FastAPI', 'NumPy/Pandas', 'SQL', 'Deep Neural Nets', 'Backpropagation', 'Git', 'Docker']
  );

  // Experience state
  const [experiences, setExperiences] = useState<Experience[]>([
    role === 'tutor'
      ? {
          id: 'exp_1',
          title: 'Professor & Head of AI Research',
          organization: 'Apex Institute of Technology & AI',
          location: 'Boston, MA',
          period: 'Aug 2019 - Present',
          description: 'Leading the AI department, teaching CS602 (Neural Architectures) and CS605 (Applied AI). Directing student research laboratories.'
        }
      : {
          id: 'exp_1',
          title: 'Machine Learning Research Assistant',
          organization: 'Apex Institute AI Lab',
          location: 'Boston, MA',
          period: 'Sep 2025 - Present',
          description: 'Implemented PyTorch neural network modules and analyzed computational gradient loss surfaces for medical vision tasks.'
        }
  ]);

  // Certifications state
  const [certifications, setCertifications] = useState<Certification[]>([
    role === 'tutor'
      ? {
          id: 'cert_1',
          name: 'NVIDIA Certified Instructor — Deep Learning Institute',
          issuer: 'NVIDIA',
          issueDate: 'Jan 2024',
          credentialId: 'NV-INST-88421'
        }
      : {
          id: 'cert_1',
          name: 'AWS Certified Cloud Practitioner & SageMaker Specialist',
          issuer: 'Amazon Web Services (AWS)',
          issueDate: 'Jul 2025',
          credentialId: 'AWS-CERT-99412'
        }
  ]);

  // Posts Feed State
  const [posts, setPosts] = useState<Post[]>([
    role === 'tutor'
      ? {
          id: 'post_tutor_1',
          authorName: user.name,
          authorRole: 'Professor & Head of AI Research',
          authorAvatar: user.avatar,
          timestamp: '2 days ago',
          content: '🎉 Proud to announce that our CS602 Neural Architectures student cohort achieved a 94.2% average accuracy on analytical backpropagation checks! We have also indexed 4 complete lecture recordings into the Career Pilot course RAG knowledge base for 24/7 AI tutoring.',
          tag: 'Research',
          likesCount: 38,
          isLiked: false,
          badge: '🏆 Faculty Excellence Award 2026',
          comments: [
            {
              id: 'c1',
              userName: 'Elena Rostova',
              userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
              timestamp: '1 day ago',
              text: 'Thank you for the detailed lecture notes Dr. Kumar! The RAG assistant was very helpful for homework prep.'
            }
          ]
        }
      : {
          id: 'post_student_1',
          authorName: user.name,
          authorRole: 'CS Junior • Apex Institute',
          authorAvatar: user.avatar,
          timestamp: '3 hours ago',
          content: '🚀 Excited to share that I just completed the Camera AI Mock Interview for the Machine Learning Engineer role on Career Pilot, scoring 84/100 (Top 10th percentile in Technical Knowledge)! Also finished implementing multi-head self attention from scratch in NumPy.',
          tag: 'Achievement',
          likesCount: 19,
          isLiked: true,
          badge: '🌟 Top 10% Technical Assessment',
          comments: [
            {
              id: 'c2',
              userName: 'Priya Sharma',
              userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
              timestamp: '2 hours ago',
              text: 'Congratulations Alex! That attention mechanism formulation is awesome.'
            }
          ]
        }
  ]);

  // Create Post state
  const [newPostText, setNewPostText] = useState('');
  const [newPostTag, setNewPostTag] = useState<Post['tag']>('Achievement');
  const [newPostBadge, setNewPostBadge] = useState('');

  // Comment input per post
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  // Modals
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddExpOpen, setIsAddExpOpen] = useState(false);
  const [isAddCertOpen, setIsAddCertOpen] = useState(false);
  const [newSkillInput, setNewSkillInput] = useState('');

  // Form states for modals
  const [newExpTitle, setNewExpTitle] = useState('');
  const [newExpOrg, setNewExpOrg] = useState('');
  const [newExpPeriod, setNewExpPeriod] = useState('');
  const [newExpDesc, setNewExpDesc] = useState('');

  const [newCertName, setNewCertName] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('');
  const [newCertDate, setNewCertDate] = useState('');

  // Handle Create Post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: Post = {
      id: `post_${Date.now()}`,
      authorName: profileName,
      authorRole: role === 'tutor' ? 'Faculty Lead • Apex Institute' : 'CS Junior • Apex Institute',
      authorAvatar: user.avatar,
      timestamp: 'Just now',
      content: newPostText,
      tag: newPostTag,
      likesCount: 1,
      isLiked: true,
      badge: newPostBadge ? newPostBadge : undefined,
      comments: []
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
    setNewPostBadge('');
  };

  // Toggle Like
  const handleToggleLike = (postId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            isLiked: !p.isLiked,
            likesCount: p.isLiked ? p.likesCount - 1 : p.likesCount + 1
          };
        }
        return p;
      })
    );
  };

  // Add Comment
  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [
              ...p.comments,
              {
                id: `c_${Date.now()}`,
                userName: profileName,
                userAvatar: user.avatar,
                timestamp: 'Just now',
                text
              }
            ]
          };
        }
        return p;
      })
    );

    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !skills.includes(newSkillInput.trim())) {
      setSkills([...skills, newSkillInput.trim()]);
      setNewSkillInput('');
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
      organization: newExpOrg,
      location: 'Boston, MA',
      period: newExpPeriod || '2025 - Present',
      description: newExpDesc
    };
    setExperiences([item, ...experiences]);
    setIsAddExpOpen(false);
    setNewExpTitle('');
    setNewExpOrg('');
    setNewExpDesc('');
  };

  const handleAddCertification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertName.trim()) return;
    const item: Certification = {
      id: `cert_${Date.now()}`,
      name: newCertName,
      issuer: newCertIssuer,
      issueDate: newCertDate || '2026'
    };
    setCertifications([item, ...certifications]);
    setIsAddCertOpen(false);
    setNewCertName('');
    setNewCertIssuer('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* 1. LinkedIn-style Hero Banner & Profile Card */}
      <div className="academic-card overflow-hidden relative">
        {/* Cover Photo */}
        <div className="h-44 sm:h-52 bg-gradient-to-r from-[#173B63] via-[#1E4D82] to-[#2F9C95] relative">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px]" />
          <button
            onClick={() => alert('Banner background updated!')}
            className="absolute top-4 right-4 p-2 rounded-lg bg-black/40 hover:bg-black/60 text-white text-xs backdrop-blur-md transition flex items-center gap-1.5 cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Change Cover</span>
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
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl ring-2 ring-slate-200 dark:ring-slate-700 bg-white"
              />
              <button
                onClick={() => alert('Profile photo edit modal')}
                className="absolute bottom-1 right-1 p-2 rounded-full bg-[#173B63] hover:bg-[#204B7D] text-white shadow-md transition cursor-pointer"
                title="Update photo"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#173B63] dark:bg-blue-600 hover:bg-[#204B7D] text-white font-semibold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
              <button
                onClick={() => alert('Profile link copied to clipboard!')}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-[#173B63]">
                {profileName}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0F766E] font-bold text-xs border border-teal-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0F766E]" />
                {role === 'tutor' ? 'Accredited Faculty' : 'Verified College Student'}
              </span>
            </div>

            <p className="text-xs sm:text-sm font-bold text-slate-800 max-w-2xl leading-relaxed">
              {headline}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-700 font-semibold pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-600" />
                {location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-slate-600" />
                Apex Institute of Technology & AI
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#1D4ED8] font-mono font-bold">
                <Mail className="w-3.5 h-3.5" />
                {user.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Create Post & Achievement Share Box (LinkedIn Style) */}
      <div className="academic-card p-5 space-y-3 shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src={user.avatar}
            alt={profileName}
            className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
          />
          <button
            onClick={() => {}}
            className="flex-1 text-left px-4 py-3 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 rounded-full text-xs text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 transition"
          >
            Share an achievement, certificate, research update, or coursework milestone...
          </button>
        </div>

        <form onSubmit={handleCreatePost} className="space-y-3 pt-2">
          <textarea
            rows={2}
            value={newPostText}
            onChange={e => setNewPostText(e.target.value)}
            placeholder="What academic or career accomplishment would you like to post?"
            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#2F9C95]"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <select
                value={newPostTag}
                onChange={e => setNewPostTag(e.target.value as any)}
                className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 focus:outline-none"
              >
                <option value="Achievement">🏆 Achievement</option>
                <option value="Certification">📜 Certification</option>
                <option value="Research">🔬 Research Update</option>
                <option value="Project">💻 Code Project</option>
                <option value="Coursework">📚 Coursework</option>
              </select>

              <input
                type="text"
                placeholder="Optional badge / award name"
                value={newPostBadge}
                onChange={e => setNewPostBadge(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 w-44"
              />
            </div>

            <button
              type="submit"
              disabled={!newPostText.trim()}
              className="px-5 py-1.5 rounded-xl bg-[#173B63] dark:bg-blue-600 hover:bg-[#204B7D] disabled:opacity-50 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post to Feed</span>
            </button>
          </div>
        </form>
      </div>

      {/* 3. About Section */}
      <div className="academic-card p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#173B63] dark:text-slate-100">About</h3>
          <button
            onClick={() => setIsEditProfileOpen(true)}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
          {aboutBio}
        </p>
      </div>

      {/* 4. Activity & Posts Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#173B63] dark:text-slate-100">
            Activity & Academic Achievements ({posts.length})
          </h3>
        </div>

        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="academic-card p-6 space-y-4 shadow-sm">
              {/* Post Author */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {post.authorName}
                    </h4>
                    <p className="text-[10px] text-slate-400">{post.authorRole} • {post.timestamp}</p>
                  </div>
                </div>

                <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-blue-50 dark:bg-blue-950 text-[#3B82C4] border border-blue-200 dark:border-blue-800">
                  {post.tag}
                </span>
              </div>

              {/* Post Text */}
              <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>

              {/* Badge Callout if any */}
              {post.badge && (
                <div className="p-3 rounded-xl bg-gradient-to-r from-amber-50 to-teal-50 dark:from-amber-950/40 dark:to-teal-950/40 border border-amber-200 dark:border-amber-800/50 flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <Award className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{post.badge}</span>
                </div>
              )}

              {/* Like / Comment / Share Bar */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleToggleLike(post.id)}
                    className={`flex items-center gap-1.5 font-semibold transition cursor-pointer ${
                      post.isLiked ? 'text-[#2F9C95] font-bold' : 'hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${post.isLiked ? 'fill-[#2F9C95]' : ''}`} />
                    <span>{post.likesCount} Likes</span>
                  </button>

                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{post.comments.length} Comments</span>
                  </span>
                </div>
              </div>

              {/* Comments Feed */}
              {post.comments.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  {post.comments.map(c => (
                    <div key={c.id} className="flex gap-2.5 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl text-xs">
                      <img src={c.userAvatar} alt={c.userName} className="w-6 h-6 rounded-full object-cover shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800 dark:text-slate-200">{c.userName}</span>
                          <span className="text-[10px] text-slate-400">{c.timestamp}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Comment Input */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Write a congratulatory comment or question..."
                  value={commentInputs[post.id] || ''}
                  onChange={e => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                  onKeyDown={e => e.key === 'Enter' && handleAddComment(post.id)}
                  className="flex-1 bg-slate-50 dark:bg-slate-800 text-xs px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#3B82C4]"
                />
                <button
                  onClick={() => handleAddComment(post.id)}
                  className="p-2 bg-[#173B63] hover:bg-[#204B7D] text-white rounded-lg transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Experience Section */}
      <div className="academic-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#173B63] dark:text-slate-100">
            {role === 'tutor' ? 'Teaching & Academic Leadership' : 'Experience & Research Labs'}
          </h3>
          <button
            onClick={() => setIsAddExpOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:text-slate-300 transition flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Position</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {experiences.map(exp => (
            <div key={exp.id} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#173B63] dark:text-blue-300 shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="space-y-1 flex-1 text-xs">
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{exp.title}</h4>
                <p className="text-slate-700 dark:text-slate-300 font-medium">{exp.organization} • {exp.location}</p>
                <span className="text-[11px] text-slate-400 block">{exp.period}</span>
                <p className="text-slate-600 dark:text-slate-400 pt-1 leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Licenses & Certifications */}
      <div className="academic-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#173B63] dark:text-slate-100">
            Licenses & Certifications
          </h3>
          <button
            onClick={() => setIsAddCertOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:text-slate-300 transition flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Certification</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {certifications.map(cert => (
            <div key={cert.id} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950 text-[#2F9C95] shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div className="space-y-0.5 flex-1 text-xs">
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{cert.name}</h4>
                <p className="text-slate-700 dark:text-slate-300 font-medium">{cert.issuer}</p>
                <span className="text-[11px] text-slate-400 block">Issued {cert.issueDate}</span>
                {cert.credentialId && (
                  <span className="text-[11px] font-mono text-slate-500 block">
                    Credential ID: {cert.credentialId}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Skills & Endorsements */}
      <div className="academic-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#173B63] dark:text-slate-100">
            Skills & Endorsements ({skills.length})
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium border border-slate-200 dark:border-slate-700 flex items-center gap-2 group"
            >
              <span>{skill}</span>
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="opacity-40 hover:opacity-100 text-slate-500 hover:text-rose-500"
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
            placeholder="Add new skill (e.g. PyTorch, MLOps, RAG, Kubernetes)..."
            value={newSkillInput}
            onChange={e => setNewSkillInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAddSkill()}
            className="flex-1 bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-lg text-xs border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#2F9C95]"
          />
          <button
            onClick={handleAddSkill}
            className="px-4 py-2 bg-[#2F9C95] hover:bg-[#3EBAB2] text-white font-semibold text-xs rounded-lg transition cursor-pointer"
          >
            Add Skill
          </button>
        </div>
      </div>

      {/* MODAL 1: Edit Profile */}
      <Modal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        title="Edit LinkedIn Profile Information"
        subtitle="Update your public headline, location, and bio"
        maxWidth="lg"
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              value={profileName}
              onChange={e => setProfileName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-[#2F9C95]"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Headline</label>
            <textarea
              rows={2}
              value={headline}
              onChange={e => setHeadline(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-[#2F9C95]"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-[#2F9C95]"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">About / Bio</label>
            <textarea
              rows={4}
              value={aboutBio}
              onChange={e => setAboutBio(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-[#2F9C95]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setIsEditProfileOpen(false)}
              className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsEditProfileOpen(false)}
              className="px-5 py-2 bg-[#2F9C95] hover:bg-[#3EBAB2] text-white font-bold rounded-lg shadow-sm"
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
        title="Add Experience / Research Position"
        subtitle="Add a new role to your academic and professional timeline"
        maxWidth="md"
      >
        <form onSubmit={handleAddExperience} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Position Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. AI Engineering Intern / Teaching Assistant"
              value={newExpTitle}
              onChange={e => setNewExpTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#2F9C95]"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Company / Lab / University *</label>
            <input
              type="text"
              required
              placeholder="e.g. Anthropic Innovation Labs / MIT CSAIL"
              value={newExpOrg}
              onChange={e => setNewExpOrg(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#2F9C95]"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Time Period</label>
            <input
              type="text"
              placeholder="e.g. May 2025 - Aug 2025"
              value={newExpPeriod}
              onChange={e => setNewExpPeriod(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#2F9C95]"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Description & Impact</label>
            <textarea
              rows={3}
              placeholder="Quantified contributions and technologies used..."
              value={newExpDesc}
              onChange={e => setNewExpDesc(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#2F9C95]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsAddExpOpen(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#173B63] hover:bg-[#204B7D] text-white font-bold rounded-lg shadow-sm"
            >
              Add Experience
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL 3: Add Certification */}
      <Modal
        isOpen={isAddCertOpen}
        onClose={() => setIsAddCertOpen(false)}
        title="Add License or Certification"
        subtitle="Showcase verified credentials on your profile"
        maxWidth="md"
      >
        <form onSubmit={handleAddCertification} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Certification Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Deep Learning Specialization (DeepLearning.AI)"
              value={newCertName}
              onChange={e => setNewCertName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#2F9C95]"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Issuing Organization *</label>
            <input
              type="text"
              required
              placeholder="e.g. Coursera / AWS / NVIDIA"
              value={newCertIssuer}
              onChange={e => setNewCertIssuer(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#2F9C95]"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Issue Date</label>
            <input
              type="text"
              placeholder="e.g. September 2025"
              value={newCertDate}
              onChange={e => setNewCertDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#2F9C95]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsAddCertOpen(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#2F9C95] hover:bg-[#3EBAB2] text-white font-bold rounded-lg shadow-sm"
            >
              Add Certification
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
