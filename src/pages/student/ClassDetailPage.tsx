import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { classService } from '../../services/classService';
import { ragService, RagQueryResponse } from '../../services/ragService';
import { Course, Announcement, CourseMaterial, Assignment } from '../../types';
import { PdfViewerModal } from '../../components/classroom/PdfViewerModal';
import { VideoPlayerModal } from '../../components/classroom/VideoPlayerModal';
import { AudioPlayerModal } from '../../components/classroom/AudioPlayerModal';
import { 
  GraduationCap, 
  MessageSquare, 
  FileCheck2, 
  BookOpen, 
  Sparkles, 
  FileText, 
  Video, 
  Headphones, 
  Presentation, 
  Send, 
  Bot, 
  Calendar, 
  Clock, 
  Download, 
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const ClassDetailPage: React.FC = () => {
  const { user } = useAuth();
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<'stream' | 'classwork' | 'materials' | 'assignments' | 'ai_assistant'>('stream');
  
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [materials, setMaterials] = useState<CourseMaterial[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  
  // Media Viewer states
  const [selectedPdf, setSelectedPdf] = useState<CourseMaterial | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<CourseMaterial | null>(null);
  const [selectedAudio, setSelectedAudio] = useState<CourseMaterial | null>(null);

  // AI Assistant tab states
  const [aiQuery, setAiQuery] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiMessages, setAiMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; sources?: RagQueryResponse['sourceDocuments'] }>>([
    {
      sender: 'ai',
      text: "Hello! I am the Course AI Assistant for Machine Learning & Neural Architectures. All lecture slides, PDF notes, and video transcripts uploaded by Dr. Suresh Kumar are indexed in my memory. What would you like to explore?"
    }
  ]);

  // Comment input state for stream
  const [newComment, setNewComment] = useState<Record<string, string>>({});

  useEffect(() => {
    const cid = courseId || 'crs_ml_101';
    classService.getCourseById(cid).then(c => {
      if (c) setCourse(c);
      else classService.getCourses().then(list => setCourse(list[0]));
    });
    classService.getAnnouncements(cid).then(setAnnouncements);
    classService.getMaterials(cid).then(setMaterials);
    classService.getAssignments(cid).then(setAssignments);
  }, [courseId]);

  const handleSendAi = async (customPrompt?: string) => {
    const text = customPrompt || aiQuery;
    if (!text.trim() || isAiLoading) return;

    setAiMessages(prev => [...prev, { sender: 'user', text }]);
    setAiQuery('');
    setIsAiLoading(true);

    const res = await ragService.queryCourseRag(course?.title || 'Machine Learning', text);
    setAiMessages(prev => [...prev, { sender: 'ai', text: res.answer, sources: res.sourceDocuments }]);
    setIsAiLoading(false);
  };

  const handleAddComment = async (annId: string) => {
    const text = newComment[annId];
    const studentName = user?.name || 'Ilamaran';
    const studentAvatar = user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
    await classService.addComment(annId, text, studentName, studentAvatar);
    setNewComment(prev => ({ ...prev, [annId]: '' }));
    // Refresh announcements
    const updated = await classService.getAnnouncements(course?.id);
    setAnnouncements(updated);
  };

  if (!course) {
    return <div className="p-8 text-center text-xs text-slate-500">Loading classroom environment...</div>;
  }

  const tabs = [
    { id: 'stream', label: 'Stream', icon: MessageSquare },
    { id: 'classwork', label: 'Classwork', icon: FileCheck2 },
    { id: 'materials', label: 'Materials', icon: BookOpen, count: materials.length },
    { id: 'assignments', label: 'Assignments', icon: FileText, count: assignments.length },
    { id: 'ai_assistant', label: 'AI Assistant', icon: Sparkles, isAi: true },
  ];

  return (
    <div className="space-y-6">
      {/* Course Banner */}
      <div className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-r ${course.bannerColor} text-white shadow-md relative overflow-hidden`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 z-10">
            <span className="text-[11px] font-mono font-bold bg-white/20 px-2.5 py-0.5 rounded backdrop-blur-xs">
              {course.code} • {course.semester}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{course.title}</h1>
            <p className="text-xs sm:text-sm text-slate-200">
              Instructor: <strong className="text-white">{course.tutorName}</strong> • {course.department}
            </p>
          </div>

          <div className="flex items-center gap-2 z-10">
            <button
              onClick={() => setActiveTab('ai_assistant')}
              className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-md transition flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-teal-300" />
              <span>Ask Course AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Classroom Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto select-none">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition whitespace-nowrap cursor-pointer ${
                isActive
                  ? tab.isAi
                    ? 'border-[#7567C7] text-[#7567C7]'
                    : 'border-[#173B63] text-[#173B63]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 font-mono">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab 1: STREAM */}
      {activeTab === 'stream' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Announcements Feed (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            {announcements.map(ann => (
              <div key={ann.id} className="academic-card p-6 space-y-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <img
                    src={ann.authorAvatar}
                    alt={ann.authorName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#173B63]">{ann.authorName}</h4>
                    <p className="text-[10px] text-slate-400">{ann.authorRole} • {ann.timestamp}</p>
                  </div>
                </div>

                {/* Content */}
                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  {ann.content}
                </p>

                {/* Attachments */}
                {ann.attachments && ann.attachments.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Attached Resources:
                    </span>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {ann.attachments.map((att, aIdx) => (
                        <div
                          key={aIdx}
                          onClick={() => {
                            if (att.type === 'pdf') setSelectedPdf(materials[0]);
                            else if (att.type === 'video') setSelectedVideo(materials[1]);
                          }}
                          className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition flex items-center gap-2 text-xs"
                        >
                          {att.type === 'pdf' ? (
                            <FileText className="w-4 h-4 text-rose-500 shrink-0" />
                          ) : (
                            <Video className="w-4 h-4 text-blue-500 shrink-0" />
                          )}
                          <span className="font-medium text-slate-800 truncate">{att.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comments Section */}
                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <span className="text-[11px] font-bold text-slate-500">
                    {ann.comments.length} Class Comments
                  </span>

                  <div className="space-y-2">
                    {ann.comments.map(c => (
                      <div key={c.id} className="flex gap-2.5 text-xs bg-slate-50 p-2.5 rounded-lg">
                        <img
                          src={c.userAvatar}
                          alt={c.userName}
                          className="w-6 h-6 rounded-full object-cover shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-800">{c.userName}</span>
                            <span className="text-[10px] text-slate-400">{c.timestamp}</span>
                          </div>
                          <p className="text-slate-600 mt-0.5 leading-relaxed">{c.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add comment form */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Add a class comment..."
                      value={newComment[ann.id] || ''}
                      onChange={e => setNewComment({ ...newComment, [ann.id]: e.target.value })}
                      onKeyDown={e => e.key === 'Enter' && handleAddComment(ann.id)}
                      className="flex-1 bg-slate-50 text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#3B82C4]"
                    />
                    <button
                      onClick={() => handleAddComment(ann.id)}
                      className="p-2 bg-[#173B63] hover:bg-[#204B7D] text-white rounded-lg transition"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stream Sidebar Info */}
          <div className="space-y-4">
            <div className="academic-card p-5 space-y-3">
              <h3 className="text-xs font-bold text-[#173B63] uppercase tracking-wider">
                Upcoming Deadlines
              </h3>
              {assignments.map(asg => (
                <div key={asg.id} className="text-xs space-y-0.5 border-b border-slate-100 pb-2 last:border-0">
                  <span className="font-semibold text-slate-800 block truncate">{asg.title}</span>
                  <span className="text-[10px] text-slate-500">
                    Due: {new Date(asg.dueDate).toLocaleDateString()} at 11:59 PM
                  </span>
                </div>
              ))}
              <button
                onClick={() => setActiveTab('assignments')}
                className="text-xs text-[#3B82C4] font-semibold hover:underline block pt-1"
              >
                View all assignments →
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-tr from-[#7567C7]/15 to-[#3B82C4]/10 border border-[#7567C7]/20 space-y-2">
              <div className="flex items-center gap-2 text-[#7567C7]">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold">Course RAG Assistant</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Have questions regarding Dr. Kumar's lectures? Chat with the RAG assistant grounded in class notes.
              </p>
              <button
                onClick={() => setActiveTab('ai_assistant')}
                className="w-full py-2 rounded-lg bg-[#7567C7] hover:bg-[#6456b8] text-white text-xs font-semibold transition mt-2 shadow-xs cursor-pointer"
              >
                Open Course AI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2 & 4: CLASSWORK / ASSIGNMENTS */}
      {(activeTab === 'classwork' || activeTab === 'assignments') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#173B63]">Assignments & Projects</h2>
            <span className="text-xs text-slate-500 font-medium">Graded via College Rubric</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {assignments.map(asg => (
              <div key={asg.id} className="academic-card p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Total Marks: {asg.totalMarks}
                    </span>
                    <h3 className="text-base font-bold text-[#173B63] mt-0.5">{asg.title}</h3>
                  </div>

                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full w-fit ${
                      asg.status === 'graded'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : asg.status === 'submitted'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : asg.status === 'in_progress'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {asg.status === 'graded'
                      ? `Graded: ${asg.obtainedMarks} / ${asg.totalMarks}`
                      : asg.status === 'submitted'
                      ? 'Submitted (Pending Review)'
                      : asg.status === 'in_progress'
                      ? 'In Progress'
                      : 'Not Started'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{asg.description}</p>

                {/* Rubric Breakdown */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    Grading Rubric Criteria:
                  </span>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {asg.rubric.map((r, rIdx) => (
                      <div key={rIdx} className="flex items-center justify-between text-slate-700 bg-white p-2 rounded border border-slate-200 text-[11px]">
                        <span>{r.criteria}</span>
                        <strong className="text-[#173B63] font-mono">{r.points} pts</strong>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tutor Feedback if graded */}
                {asg.tutorFeedback && (
                  <div className="p-3.5 bg-teal-50/70 border border-teal-200 rounded-xl text-xs text-slate-800 space-y-1">
                    <span className="font-bold text-teal-900 block flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                      Faculty Feedback (Dr. Suresh Kumar):
                    </span>
                    <p className="text-slate-700 leading-relaxed italic">{asg.tutorFeedback}</p>
                  </div>
                )}

                {/* Action Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Due: {new Date(asg.dueDate).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {asg.status !== 'graded' && asg.status !== 'submitted' ? (
                      <button
                        onClick={async () => {
                          const fileName = `${(user?.name || 'Student').replace(/\s+/g, '')}_CS602_Submission.zip`;
                          await classService.submitAssignment(asg.id, fileName);
                          const updated = await classService.getAssignments(course.id);
                          setAssignments(updated);
                          alert('Assignment submitted successfully!');
                        }}
                        className="px-4 py-2 rounded-lg bg-[#173B63] hover:bg-[#204B7D] text-white font-semibold transition shadow-2xs"
                      >
                        Upload & Submit Assignment
                      </button>
                    ) : (
                      <span className="text-slate-500 font-mono text-[11px]">
                        Submitted file: {asg.submissionFile || 'Submission.zip'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: MATERIALS (Dedicated Viewers) */}
      {activeTab === 'materials' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#173B63]">Course Materials & Lectures</h2>
              <p className="text-xs text-slate-500">Click any resource to launch the interactive viewer and AI study assistant</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {materials.map(mat => {
              const iconMap = {
                pdf: <FileText className="w-6 h-6 text-rose-500" />,
                video: <Video className="w-6 h-6 text-blue-500" />,
                audio: <Headphones className="w-6 h-6 text-emerald-500" />,
                ppt: <Presentation className="w-6 h-6 text-amber-500" />,
                doc: <FileText className="w-6 h-6 text-indigo-500" />
              };

              return (
                <div
                  key={mat.id}
                  onClick={() => {
                    if (mat.type === 'pdf') setSelectedPdf(mat);
                    else if (mat.type === 'video') setSelectedVideo(mat);
                    else if (mat.type === 'audio') setSelectedAudio(mat);
                    else setSelectedPdf(mat);
                  }}
                  className="academic-card p-5 flex flex-col justify-between space-y-4 cursor-pointer academic-card-hover group border border-slate-200"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 group-hover:scale-105 transition shrink-0">
                        {iconMap[mat.type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            {mat.type.toUpperCase()} • {mat.fileSizeOrDuration}
                          </span>
                          {mat.isRagIndexed && (
                            <span className="text-[9px] bg-indigo-50 text-indigo-700 font-semibold px-1.5 py-0.2 rounded">
                              AI Indexed
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-sm text-[#173B63] group-hover:text-[#3B82C4] leading-snug">
                          {mat.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {mat.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-semibold text-[#173B63]">
                    <span className="flex items-center gap-1 text-[#3B82C4]">
                      Open Interactive Viewer →
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      Uploaded {mat.uploadedAt}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 5: COURSE AI ASSISTANT */}
      {activeTab === 'ai_assistant' && (
        <div className="academic-card overflow-hidden flex flex-col h-[650px] border border-slate-200 shadow-md">
          <div className="p-4 bg-gradient-to-r from-[#173B63] to-[#7567C7] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-teal-300" />
              </div>
              <div>
                <h3 className="font-bold text-sm">{course.title} — AI Assistant</h3>
                <p className="text-[11px] text-slate-200">Grounded strictly in Dr. Suresh Kumar's materials</p>
              </div>
            </div>

            <span className="text-[10px] bg-teal-400/20 text-teal-200 px-2.5 py-1 rounded-full font-mono font-semibold border border-teal-400/30">
              4 Documents Vector Indexed
            </span>
          </div>

          {/* Quick Prompts */}
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex gap-2 overflow-x-auto text-xs">
            {[
              'What is backpropagation?',
              'Explain L1 vs L2 Regularization',
              'Summarize Lecture 7 video key takeaways',
              'What are the starter instructions for Assignment 3?'
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendAi(chip)}
                className="px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-[#7567C7] hover:text-[#7567C7] text-slate-600 font-medium shrink-0 transition text-xs"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 text-xs">
            {aiMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-xl bg-[#7567C7] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl p-4 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#173B63] text-white rounded-br-none'
                      : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-bl-none shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200 space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Source Reference Citations:
                      </span>
                      {msg.sources.map((s, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-2 rounded bg-white border border-slate-200 text-[11px] text-slate-700 flex items-center justify-between"
                        >
                          <div>
                            <span className="font-semibold text-[#173B63] block">{s.title}</span>
                            <span className="text-[10px] text-teal-600 font-medium">{s.pageOrTimestamp}</span>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isAiLoading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                <Bot className="w-4 h-4 animate-spin text-[#7567C7]" />
                <span className="animate-pulse">Retrieving vector chunks and formulating response...</span>
              </div>
            )}
          </div>

          {/* Form */}
          <div className="p-4 bg-white border-t border-slate-200">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendAi();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={aiQuery}
                onChange={e => setAiQuery(e.target.value)}
                placeholder="Ask anything about the lecture notes, homework, or exam equations..."
                className="flex-1 bg-slate-50 text-xs px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#7567C7] focus:bg-white transition"
              />
              <button
                type="submit"
                disabled={!aiQuery.trim() || isAiLoading}
                className="px-5 py-3 bg-[#7567C7] hover:bg-[#6456b8] disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Ask AI</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Viewers */}
      <PdfViewerModal
        material={selectedPdf}
        isOpen={!!selectedPdf}
        onClose={() => setSelectedPdf(null)}
      />

      <VideoPlayerModal
        material={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      <AudioPlayerModal
        material={selectedAudio}
        isOpen={!!selectedAudio}
        onClose={() => setSelectedAudio(null)}
      />
    </div>
  );
};
