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
  Award,
  Clock
} from 'lucide-react';

export const InterviewCenterPage: React.FC = () => {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [activeSessionType, setActiveSessionType] = useState<InterviewType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    interviewService.getQuestions().then(setQuestions);
  }, []);

  const handleComplete = async (answers: { questionId: string; question: string; answerText: string }[]) => {
    if (!activeSessionType) return;
    await interviewService.submitInterviewSession(activeSessionType, answers);
    setActiveSessionType(null);
    navigate('/student/interview-results');
  };

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
            Practice realistic interviews, receive instant AI rubric feedback, and master technical communication
          </p>
        </div>

        <button
          onClick={() => navigate('/student/interview-history')}
          className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition flex items-center gap-2 self-start"
        >
          <History className="w-4 h-4 text-slate-500" />
          <span>View Past Reports</span>
        </button>
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
                <span>5 Adaptive questions (~15 mins)</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setActiveSessionType('camera')}
            className="w-full py-3 rounded-xl bg-[#173B63] hover:bg-[#204B7D] text-white text-xs font-bold transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start Camera Interview</span>
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
                <span>Ideal for phone screens</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setActiveSessionType('voice')}
            className="w-full py-3 rounded-xl bg-[#7567C7] hover:bg-[#6456b8] text-white text-xs font-bold transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start Voice Interview</span>
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
                <span>Instant step-by-step scoring</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setActiveSessionType('text')}
            className="w-full py-3 rounded-xl bg-[#3B82C4] hover:bg-[#2e6ea9] text-white text-xs font-bold transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start Text Interview</span>
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
            All mock interviews are conducted locally and evaluated using college-accredited rubrics aligned with Tier-1 tech industry hiring bars. Scores are automatically synchronized with your Career Readiness index.
          </p>
        </div>
      </div>

      {/* Render Active Studio */}
      {activeSessionType === 'camera' && (
        <CameraStudio
          questions={questions}
          onComplete={handleComplete}
          onCancel={() => setActiveSessionType(null)}
        />
      )}

      {activeSessionType === 'voice' && (
        <VoiceStudio
          questions={questions}
          onComplete={handleComplete}
          onCancel={() => setActiveSessionType(null)}
        />
      )}

      {activeSessionType === 'text' && (
        <TextStudio
          questions={questions}
          onComplete={handleComplete}
          onCancel={() => setActiveSessionType(null)}
        />
      )}
    </div>
  );
};
