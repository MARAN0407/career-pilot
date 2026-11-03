import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { interviewService } from '../../services/interviewService';
import { InterviewQuestion, InterviewType } from '../../types';
import { CameraStudio } from '../../components/interview/CameraStudio';
import { VoiceStudio } from '../../components/interview/VoiceStudio';
import { TextStudio } from '../../components/interview/TextStudio';
import { 
  Video, 
  Mic, 
  Keyboard, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  History, 
  ShieldCheck, 
  RefreshCw,
  Sliders,
  Layers,
  Code2,
  Bot,
  Target,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Clock
} from 'lucide-react';

const TRACKS = [
  { id: 'all', label: 'All Tracks (Mixed Topics)', icon: Sparkles, desc: 'Balanced mix of ML, System Design, DSA & STAR' },
  { id: 'AI & Machine Learning', label: 'AI & Machine Learning', icon: Bot, desc: 'Regularization, ResNets, Vanishing Gradients, Optimizers' },
  { id: 'Generative AI & LLMs', label: 'Generative AI & LLMs', icon: Sparkles, desc: 'RAG Architecture, Self-Attention, Fine-Tuning & Hallucinations' },
  { id: 'System Design & Backend', label: 'System Design & Backend', icon: Layers, desc: 'B-Trees, CAP Theorem, Cache Invalidation, REST vs GraphQL' },
  { id: 'Algorithms & Data Structures', label: 'Data Structures & Algorithms', icon: Code2, desc: 'Hash Tables, LRU Cache, BFS/DFS, Tree & Graph Traversals' },
  { id: 'Behavioral & STAR Leadership', label: 'Behavioral & STAR Leadership', icon: Target, desc: 'Conflict Resolution, Outage Recovery, Cross-Functional Teamwork' },
];

const QUESTION_COUNTS = [
  { count: 3, label: '3 Questions', time: '~8 mins', badge: 'Quick Sprint' },
  { count: 5, label: '5 Questions', time: '~15 mins', badge: 'Standard Round' },
  { count: 8, label: '8 Questions', time: '~25 mins', badge: 'Deep Mock' },
  { count: 12, label: '12 Questions', time: '~35 mins', badge: 'Mastery Drill' },
];

export const InterviewCenterPage: React.FC = () => {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCount, setSelectedCount] = useState<number>(5);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [activeSessionType, setActiveSessionType] = useState<InterviewType | null>(null);
  const navigate = useNavigate();

  const fetchQuestions = async (cat = selectedCategory, cnt = selectedCount) => {
    setIsLoadingQuestions(true);
    try {
      const res = await interviewService.getQuestions('camera', cat, cnt);
      setQuestions(res);
    } catch (err) {
      console.error('Error fetching questions:', err);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  useEffect(() => {
    fetchQuestions(selectedCategory, selectedCount);
  }, [selectedCategory, selectedCount]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
  };

  const handleCountChange = (count: number) => {
    setSelectedCount(count);
  };

  const handleComplete = async (answers: { questionId: string; question: string; answerText: string }[]) => {
    if (!activeSessionType) return;
    await interviewService.submitInterviewSession(activeSessionType, answers);
    setActiveSessionType(null);
    navigate('/student/interview-results');
  };

  const selectedTrackObj = TRACKS.find(t => t.id === selectedCategory) || TRACKS[0];
  const selectedCountObj = QUESTION_COUNTS.find(c => c.count === selectedCount) || QUESTION_COUNTS[1];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-[#173B63] flex items-center gap-2.5">
            <Video className="w-7 h-7 text-[#7567C7]" />
            <span>AI Interview Center</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Dynamic AI-driven interviews with realistic randomized question sets across top engineering tracks.
          </p>
        </div>

        <button
          onClick={() => navigate('/student/interview-history')}
          className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition flex items-center gap-2 self-start cursor-pointer"
        >
          <History className="w-4 h-4 text-slate-500" />
          <span>View Past Reports</span>
        </button>
      </div>

      {/* Dynamic Configuration Panel */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#3B82C4]" />
            <h2 className="text-sm font-bold text-slate-800">Customize Your Interview Session</h2>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200">
              Randomized Pool
            </span>
          </div>

          <button
            onClick={() => fetchQuestions(selectedCategory, selectedCount)}
            disabled={isLoadingQuestions}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer self-start sm:self-auto"
            title="Generate a completely new set of randomized questions"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingQuestions ? 'animate-spin text-[#3B82C4]' : 'text-slate-500'}`} />
            <span>Shuffle New Questions</span>
          </button>
        </div>

        {/* Step 1: Select Track / Subject */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
            Step 1: Choose Technical or Behavioral Track
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TRACKS.map(t => {
              const Icon = t.icon;
              const isSelected = selectedCategory === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleCategoryChange(t.id)}
                  className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'border-[#3B82C4] bg-blue-50/60 ring-2 ring-blue-500/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/70'
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-[#3B82C4] text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xs font-bold ${isSelected ? 'text-[#173B63]' : 'text-slate-800'}`}>
                      {t.label}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {t.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Select Question Count & Duration */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
            Step 2: Number of Questions & Target Duration
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {QUESTION_COUNTS.map(c => {
              const isSelected = selectedCount === c.count;
              return (
                <button
                  key={c.count}
                  type="button"
                  onClick={() => handleCountChange(c.count)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#2F9C95] bg-teal-50/60 ring-2 ring-teal-500/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/70'
                  }`}
                >
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    isSelected ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {c.badge}
                  </span>
                  <p className="text-base font-extrabold text-[#173B63] mt-1.5">{c.label}</p>
                  <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{c.time}</span>
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Active Questions Preview */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-slate-700">
                Ready: {questions.length} Randomized Questions Selected
              </span>
              <span className="text-[11px] text-slate-500">
                • Track: <strong className="text-slate-700">{selectedTrackObj.label}</strong>
              </span>
            </div>

            <button
              onClick={() => setShowPreview(!showPreview)}
              className="text-xs font-semibold text-[#3B82C4] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{showPreview ? 'Hide Prompts' : 'Preview Question Prompts'}</span>
              {showPreview ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {showPreview && (
            <div className="mt-3.5 space-y-2 border-t border-slate-200 pt-3">
              {questions.map((q, idx) => (
                <div key={q.id} className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800">{q.questionText}</p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                      <span className="px-1.5 py-0.2 rounded bg-slate-100 font-medium">{q.category}</span>
                      <span>Difficulty: <strong className="text-slate-600">{q.difficulty}</strong></span>
                      <span>Target: {q.idealDuration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3 Large Mode Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Camera Interview */}
        <div className="academic-card p-6 flex flex-col justify-between space-y-6 border-t-4 border-t-[#2F9C95] hover:border-slate-300 relative overflow-hidden group">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-[#2F9C95] border border-teal-200 flex items-center justify-center group-hover:scale-105 transition shadow-sm">
              <Video className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2 py-0.5 rounded">
                Full Immersion
              </span>
              <h3 className="text-lg font-bold text-[#173B63] mt-1.5">🎥 Camera Interview</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Realistic video interview environment with live webcam feed, audio analysis, response timers, and facial composure feedback.
              </p>
            </div>

            <ul className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2F9C95]" />
                <span>Camera + Speech Analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2F9C95]" />
                <span>Eye contact & pacing evaluation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2F9C95]" />
                <span>{questions.length || selectedCount} Questions ({selectedCountObj.time})</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setActiveSessionType('camera')}
            className="w-full py-3 rounded-xl bg-[#173B63] hover:bg-[#204B7D] text-white text-xs font-bold transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start Camera Interview ({questions.length || selectedCount} Qs)</span>
            <ArrowRight className="w-4 h-4 text-teal-300" />
          </button>
        </div>

        {/* Card 2: Voice Interview */}
        <div className="academic-card p-6 flex flex-col justify-between space-y-6 border-t-4 border-t-[#7567C7] hover:border-slate-300 relative overflow-hidden group">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-[#7567C7] border border-indigo-200 flex items-center justify-center group-hover:scale-105 transition shadow-sm">
              <Mic className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                Speech Focused
              </span>
              <h3 className="text-lg font-bold text-[#173B63] mt-1.5">🎙 Voice Interview</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Practice answering with your voice. Automated speech recognition transcribes your responses and checks technical vocabulary.
              </p>
            </div>

            <ul className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7567C7]" />
                <span>Interactive voice visualizer</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7567C7]" />
                <span>Acoustic fluency analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7567C7]" />
                <span>{questions.length || selectedCount} Questions ({selectedCountObj.time})</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setActiveSessionType('voice')}
            className="w-full py-3 rounded-xl bg-[#7567C7] hover:bg-[#6456b8] text-white text-xs font-bold transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start Voice Interview ({questions.length || selectedCount} Qs)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card 3: Text Interview */}
        <div className="academic-card p-6 flex flex-col justify-between space-y-6 border-t-4 border-t-[#3B82C4] hover:border-slate-300 relative overflow-hidden group">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#3B82C4] border border-blue-200 flex items-center justify-center group-hover:scale-105 transition shadow-sm">
              <Keyboard className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                Technical Depth
              </span>
              <h3 className="text-lg font-bold text-[#173B63] mt-1.5">⌨ Text Interview</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Technical chat-based coding and systems questions with adaptive follow-ups based on code complexity.
              </p>
            </div>

            <ul className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82C4]" />
                <span>Conversational chat interface</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82C4]" />
                <span>Math & code block typing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82C4]" />
                <span>{questions.length || selectedCount} Questions ({selectedCountObj.time})</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setActiveSessionType('text')}
            className="w-full py-3 rounded-xl bg-[#3B82C4] hover:bg-[#2e6ea9] text-white text-xs font-bold transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start Text Interview ({questions.length || selectedCount} Qs)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Assessment Guidelines callout */}
      <div className="p-6 bg-slate-100/80 rounded-2xl border border-slate-200 flex items-start gap-4">
        <ShieldCheck className="w-6 h-6 text-[#173B63] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-slate-600 leading-relaxed">
          <h4 className="font-bold text-slate-900 text-sm">Academic Integrity & AI Privacy Protocol</h4>
          <p>
            All mock interviews are evaluated using college-accredited rubrics aligned with Tier-1 tech industry hiring bars. Scores are automatically synchronized with your Career Readiness index. Silence or blank responses receive 0 marks, and complete model answers are provided upon completion.
          </p>
        </div>
      </div>

      {/* Render Active Studio */}
      {activeSessionType === 'camera' && questions.length > 0 && (
        <CameraStudio
          questions={questions}
          onComplete={handleComplete}
          onCancel={() => setActiveSessionType(null)}
        />
      )}

      {activeSessionType === 'voice' && questions.length > 0 && (
        <VoiceStudio
          questions={questions}
          onComplete={handleComplete}
          onCancel={() => setActiveSessionType(null)}
        />
      )}

      {activeSessionType === 'text' && questions.length > 0 && (
        <TextStudio
          questions={questions}
          onComplete={handleComplete}
          onCancel={() => setActiveSessionType(null)}
        />
      )}
    </div>
  );
};
