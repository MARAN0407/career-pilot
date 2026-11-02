import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { interviewService } from '../../services/interviewService';
import { InterviewResultScorecard } from '../../types';
import { 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  FileText, 
  Video, 
  Sparkles, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp,
  XCircle,
  BookOpen,
  Share2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar
} from 'recharts';

export const InterviewResultsPage: React.FC = () => {
  const [report, setReport] = useState<InterviewResultScorecard | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(0);
  const navigate = useNavigate();

  useEffect(() => {
    interviewService.getLatestReport().then(setReport);
  }, []);

  if (!report) {
    return <div className="p-8 text-center text-xs text-slate-500">Loading interview scorecard...</div>;
  }

  const radarData = [
    { subject: 'Technical Knowledge', score: report.metrics.technicalKnowledge, fullMark: 100 },
    { subject: 'Answer Relevance', score: report.metrics.answerRelevance, fullMark: 100 },
    { subject: 'Communication', score: report.metrics.communication, fullMark: 100 },
    { subject: 'Fluency', score: report.metrics.fluency, fullMark: 100 },
    { subject: 'Completeness', score: report.metrics.completeness, fullMark: 100 },
  ];

  // Dynamic hire bar verdict based on actual score
  const getVerdict = (score: number) => {
    if (score >= 85) return { text: 'Strong Hire Bar Met', color: 'text-emerald-300', bg: 'bg-emerald-500/20' };
    if (score >= 70) return { text: 'Qualified • Solid Foundation', color: 'text-teal-300', bg: 'bg-teal-500/20' };
    if (score >= 50) return { text: 'Developing • Reinforcement Needed', color: 'text-amber-300', bg: 'bg-amber-500/20' };
    return { text: 'Incomplete / Silence • Sub-Threshold', color: 'text-rose-300', bg: 'bg-rose-500/20' };
  };

  const verdict = getVerdict(report.overallScore);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner Score Hero */}
      <div className="bg-gradient-to-r from-[#173B63] via-[#1E4D82] to-[#2F9C95] rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
            Assessment Completed • {report.date}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Interview Evaluation Scorecard
          </h1>
          <p className="text-xs sm:text-sm text-slate-200">
            Target Role: <strong className="text-white">{report.role}</strong> ({report.interviewType.toUpperCase()} Simulation)
          </p>
        </div>

        {/* Big Overall Score Badge */}
        <div className="flex items-center gap-6 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 shrink-0">
          <div className="text-center">
            <span className={`text-4xl sm:text-5xl font-extrabold font-mono leading-none ${
              report.overallScore >= 70 ? 'text-white' : report.overallScore >= 40 ? 'text-amber-300' : 'text-rose-300'
            }`}>
              {report.overallScore}
            </span>
            <span className="text-xs text-teal-200 font-bold block mt-1">/ 100 OVERALL</span>
          </div>

          <div className="h-12 w-px bg-white/20" />

          <div className="text-xs text-slate-200 space-y-1">
            <div>Result: <strong className={verdict.color}>{verdict.text}</strong></div>
            <div>Duration: <strong>{report.durationMinutes} minutes</strong></div>
          </div>
        </div>
      </div>

      {/* 5 Core Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { label: 'Technical Knowledge', score: report.metrics.technicalKnowledge, color: 'text-[#173B63]' },
          { label: 'Answer Relevance', score: report.metrics.answerRelevance, color: 'text-[#3B82C4]' },
          { label: 'Communication', score: report.metrics.communication, color: 'text-[#2F9C95]' },
          { label: 'Fluency', score: report.metrics.fluency, color: 'text-[#7567C7]' },
          { label: 'Completeness', score: report.metrics.completeness, color: 'text-amber-600' },
        ].map((m, idx) => (
          <div key={idx} className="academic-card p-4 text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block line-clamp-1">
              {m.label}
            </span>
            <span className={`text-2xl font-bold font-mono ${m.score === 0 ? 'text-rose-500' : m.color}`}>
              {m.score}%
            </span>
            <span className="text-[10px] text-slate-500 block">Accredited Score</span>
          </div>
        ))}
      </div>

      {/* Charts & Qualitative AI Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="academic-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#173B63]">Competency Radar Analysis</h3>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
              report.overallScore >= 70 ? 'bg-teal-50 text-[#2F9C95]' : 'bg-rose-50 text-rose-700'
            }`}>
              {report.overallScore >= 70 ? 'Competency Verified' : 'Reinforcement Required'}
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#475569' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Radar name="Candidate" dataKey="score" stroke={report.overallScore >= 70 ? '#2F9C95' : '#E11D48'} fill={report.overallScore >= 70 ? '#2F9C95' : '#E11D48'} fillOpacity={0.35} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Strengths & Areas to Improve */}
        <div className="academic-card p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#7567C7]" />
              <h3 className="text-sm font-bold text-[#173B63]">AI Qualitative Evaluation</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              "{report.aiSummary}"
            </p>

            {/* Strengths */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Demonstrated Strengths:
              </span>
              <ul className="space-y-1 text-xs text-slate-700 pl-4 list-disc">
                {report.strengths.map((st, i) => (
                  <li key={i}>{st}</li>
                ))}
              </ul>
            </div>

            {/* Areas to Improve */}
            <div className="space-y-1.5 pt-2">
              <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5 uppercase tracking-wider">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                Target Areas for Improvement:
              </span>
              <ul className="space-y-1 text-xs text-slate-700 pl-4 list-disc">
                {report.areasToImprove.map((ar, i) => (
                  <li key={i}>{ar}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => navigate('/student/interview-center')}
              className="flex-1 py-2.5 rounded-xl bg-[#173B63] hover:bg-[#204B7D] text-white text-xs font-bold shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Practice Another Session</span>
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Question-by-Question Transcript & Model Answers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#173B63]">
            Question-by-Question Transcript & AI Rubrics Comparison
          </h3>
          <span className="text-xs text-slate-500">
            Click any question to view Candidate Answer vs Correct Model Answer
          </span>
        </div>

        <div className="space-y-3">
          {report.transcript.map((item: any, idx: number) => {
            const isExpanded = expandedQuestion === idx;

            return (
              <div key={idx} className="academic-card overflow-hidden transition">
                <button
                  onClick={() => setExpandedQuestion(isExpanded ? null : idx)}
                  className="w-full p-4.5 flex items-center justify-between text-left hover:bg-slate-50 transition gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center shrink-0 ${
                      item.score >= 70 ? 'bg-teal-100 text-teal-800' : item.score > 0 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {item.questionNumber}
                    </span>
                    <span className="text-xs font-bold text-slate-800 truncate">
                      {item.question}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      item.score >= 70 
                        ? 'bg-teal-50 text-[#2F9C95]' 
                        : item.score > 0 
                        ? 'bg-amber-50 text-amber-700' 
                        : 'bg-rose-50 text-rose-700'
                    }`}>
                      {item.score}% {item.score === 0 ? '(No Answer)' : ''}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-5 bg-slate-50/70 border-t border-slate-200 text-xs space-y-4">
                    {/* Candidate Answer */}
                    <div className="space-y-1">
                      <span className="font-bold text-slate-600 uppercase text-[10px] block">
                        Your Submitted Response:
                      </span>
                      <p className={`p-3 rounded-lg border text-xs leading-relaxed ${
                        item.score === 0 
                          ? 'bg-rose-50/60 border-rose-200 text-rose-800 italic' 
                          : 'bg-white border-slate-200 text-slate-800'
                      }`}>
                        "{item.userAnswer || '(Silence / No answer recorded)'}"
                      </p>
                    </div>

                    {/* AI Feedback */}
                    <div className="p-3 bg-teal-50/80 rounded-lg border border-teal-200 space-y-1">
                      <span className="font-bold text-teal-900 text-[11px] block flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                        AI Evaluator Commentary:
                      </span>
                      <p className="text-slate-700 leading-relaxed">{item.feedback}</p>
                    </div>

                    {/* Correct / Benchmark Model Answer (Always shown so user learns the right answer!) */}
                    {item.modelAnswer && (
                      <div className="p-3.5 bg-blue-50/70 rounded-lg border border-blue-200 space-y-1.5">
                        <span className="font-bold text-blue-900 text-[11px] flex items-center gap-1.5 uppercase tracking-wide">
                          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                          Correct Benchmark Model Answer:
                        </span>
                        <p className="text-slate-800 leading-relaxed font-sans bg-white/80 p-2.5 rounded border border-blue-100">
                          {item.modelAnswer}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
