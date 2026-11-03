import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { interviewService } from '../../services/interviewService';
import { InterviewResultScorecard } from '../../types';
import { 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  BookOpen, 
  Sparkles, 
  TrendingUp, 
  XCircle,
  HelpCircle,
  School,
  Lightbulb,
  Check,
  ChevronRight,
  Target
} from 'lucide-react';

export const InterviewResultsPage: React.FC = () => {
  const [report, setReport] = useState<InterviewResultScorecard | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    interviewService.getLatestReport()
      .then(res => {
        setReport(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="p-12 text-center text-xs text-slate-500 space-y-3">
        <div className="w-8 h-8 border-2 border-[#173B63] border-t-transparent rounded-full animate-spin mx-auto" />
        <p>Loading your comprehensive interview evaluation scorecard...</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="p-12 text-center text-xs text-slate-500 space-y-4">
        <p>No interview report found. Please complete an interview simulation first.</p>
        <button
          onClick={() => navigate('/student/interview-center')}
          className="px-4 py-2 bg-[#173B63] text-white rounded-xl font-bold hover:bg-[#204B7D] transition"
        >
          Go to Interview Center
        </button>
      </div>
    );
  }

  // Derive counts if not already on report
  const totalQuestions = report.totalQuestions ?? report.transcript.length;
  const correctCount = report.correctCount ?? report.transcript.filter(t => (t.result === 'Correct' || t.score >= 75)).length;
  const partiallyCorrectCount = report.partiallyCorrectCount ?? report.transcript.filter(t => (t.result === 'Partially Correct' || (t.score >= 42 && t.score < 75))).length;
  const incorrectCount = report.incorrectCount ?? (totalQuestions - correctCount - partiallyCorrectCount);

  // Verdict style based on overall score
  const getVerdict = (score: number) => {
    if (score >= 80) return { text: 'Strong Hire Bar Met', color: 'text-emerald-300' };
    if (score >= 60) return { text: 'Competent Foundation', color: 'text-teal-300' };
    if (score >= 40) return { text: 'Developing • Review Needed', color: 'text-amber-300' };
    return { text: 'Needs Significant Practice', color: 'text-rose-300' };
  };

  const verdict = getVerdict(report.overallScore);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* TOP HERO BANNER */}
      <div className="bg-gradient-to-r from-[#173B63] via-[#1E4D82] to-[#2F9C95] rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
              Assessment Completed • {report.date}
            </span>
            {report.department && (
              <span className="px-3 py-1 rounded-full bg-teal-500/30 text-teal-200 text-xs font-bold border border-teal-300/30">
                {report.department}
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Interview Evaluation Scorecard
          </h1>
          <p className="text-xs sm:text-sm text-slate-200">
            Subject: <strong className="text-white">{report.subject || report.role}</strong> ({report.interviewType.toUpperCase()} Simulation)
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
            <div>Status: <strong className={verdict.color}>{verdict.text}</strong></div>
            <div>Duration: <strong>{report.durationMinutes} minutes</strong></div>
          </div>
        </div>
      </div>

      {/* SUMMARY STATS TILES (Total, Correct, Partially Correct, Incorrect, Score) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="academic-card p-4 text-center space-y-1 border-t-4 border-t-slate-400">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Total Questions
          </span>
          <span className="text-2xl font-extrabold font-mono text-slate-800">
            {totalQuestions}
          </span>
          <span className="text-[10px] text-slate-400 block">Assessed Prompts</span>
        </div>

        <div className="academic-card p-4 text-center space-y-1 border-t-4 border-t-emerald-500 bg-emerald-50/20">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
            Correct Answers
          </span>
          <span className="text-2xl font-extrabold font-mono text-emerald-600">
            {correctCount}
          </span>
          <span className="text-[10px] text-emerald-600/80 block">Fully Met Rubric</span>
        </div>

        <div className="academic-card p-4 text-center space-y-1 border-t-4 border-t-amber-500 bg-amber-50/20">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
            Partially Correct
          </span>
          <span className="text-2xl font-extrabold font-mono text-amber-600">
            {partiallyCorrectCount}
          </span>
          <span className="text-[10px] text-amber-600/80 block">Basic Concepts Met</span>
        </div>

        <div className="academic-card p-4 text-center space-y-1 border-t-4 border-t-rose-500 bg-rose-50/20">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block">
            Incorrect / Blank
          </span>
          <span className="text-2xl font-extrabold font-mono text-rose-600">
            {incorrectCount}
          </span>
          <span className="text-[10px] text-rose-600/80 block">Missing Key Details</span>
        </div>

        <div className="academic-card p-4 text-center space-y-1 border-t-4 border-t-[#2F9C95] bg-teal-50/20 col-span-2 sm:col-span-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#2F9C95] block">
            Overall Score
          </span>
          <span className="text-2xl font-extrabold font-mono text-[#173B63]">
            {report.overallScore}%
          </span>
          <span className="text-[10px] text-teal-700 block">Weighted Rubric</span>
        </div>
      </div>

      {/* PERFORMANCE FEEDBACK & RECOMMENDED TOPICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Performance Feedback */}
        <div className="academic-card p-5 space-y-2 border-l-4 border-l-[#173B63]">
          <div className="flex items-center gap-2 text-[#173B63]">
            <Sparkles className="w-4 h-4 text-[#2F9C95]" />
            <h3 className="font-bold text-xs uppercase tracking-wider">Performance Feedback</h3>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            {report.performanceFeedback || report.aiSummary || 'Responses demonstrated good foundational grounding. Review the detailed feedback and expected answers below for areas needing technical precision.'}
          </p>
        </div>

        {/* Recommended Topics for Improvement */}
        <div className="academic-card p-5 space-y-2 border-l-4 border-l-[#2F9C95]">
          <div className="flex items-center gap-2 text-[#173B63]">
            <Target className="w-4 h-4 text-[#2F9C95]" />
            <h3 className="font-bold text-xs uppercase tracking-wider">Recommended Topics for Improvement</h3>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(report.recommendedTopics && report.recommendedTopics.length > 0 
              ? report.recommendedTopics 
              : ['Fundamental Governing Laws', 'Mathematical Formulations', 'Real-world Edge Cases', 'Tradeoff Analysis']
            ).map((topic, i) => (
              <span key={i} className="px-2.5 py-1 bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-semibold rounded-lg">
                • {topic}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* DETAILED QUESTION-BY-QUESTION RESULTS (Section 5 layout) */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-base font-extrabold text-[#173B63] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#2F9C95]" />
              <span>Question-by-Question Evaluation & Explanations</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Review your submitted response, the benchmark correct answer, concept explanation, and improvement suggestions for each question.
            </p>
          </div>

          <button
            onClick={() => navigate('/student/interview-center')}
            className="px-4 py-2 rounded-xl bg-[#173B63] hover:bg-[#204B7D] text-white text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Practice Another Subject</span>
          </button>
        </div>

        {/* REPEAT STRUCTURE FOR EVERY QUESTION */}
        <div className="space-y-6">
          {report.transcript.map((item, idx) => {
            // Determine result classification: Correct, Partially Correct, Incorrect
            const resultLabel: 'Correct' | 'Partially Correct' | 'Incorrect' = 
              item.result || 
              (item.score >= 75 ? 'Correct' : item.score >= 42 ? 'Partially Correct' : 'Incorrect');

            const isCorrect = resultLabel === 'Correct';
            const isPartial = resultLabel === 'Partially Correct';
            const isIncorrect = resultLabel === 'Incorrect';

            return (
              <div 
                key={idx} 
                className={`academic-card p-6 space-y-5 border-l-4 transition-all shadow-sm ${
                  isCorrect 
                    ? 'border-l-emerald-500' 
                    : isPartial 
                    ? 'border-l-amber-500' 
                    : 'border-l-rose-500'
                }`}
              >
                {/* 1. QUESTION HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Question {item.questionNumber || idx + 1} of {report.transcript.length}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {item.question}
                    </h3>
                  </div>

                  {/* 4. RESULT BADGE */}
                  <div className="shrink-0 flex items-center gap-2 self-start">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold ${
                      isCorrect 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                        : isPartial 
                        ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}>
                      {isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      {isPartial && <AlertCircle className="w-3.5 h-3.5 text-amber-600" />}
                      {isIncorrect && <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                      <span>Result: {resultLabel}</span>
                    </span>

                    <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                      {item.score}%
                    </span>
                  </div>
                </div>

                {/* 2. USER'S SUBMITTED ANSWER */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                    Your Answer:
                  </span>
                  <div className={`p-3.5 rounded-xl border text-xs leading-relaxed font-sans ${
                    !item.userAnswer || item.userAnswer === '(No answer provided)' || item.score === 0
                      ? 'bg-rose-50/70 border-rose-200 text-rose-800 italic'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}>
                    {item.userAnswer || '(Silence / No answer recorded)'}
                  </div>
                </div>

                {/* 3. CORRECT ANSWER / EXPECTED ANSWER */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-[#173B63] uppercase tracking-wider flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2F9C95]" />
                    <span>Correct Answer / Expected Benchmark:</span>
                  </span>
                  <div className="p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs text-slate-800 leading-relaxed font-sans">
                    {item.correctAnswer || 'A comprehensive explanation covering core governing principles, equations, and applications.'}
                  </div>
                </div>

                {/* 5. EXPLANATION OF THE CORRECT ANSWER */}
                {item.explanation && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                      <span>Explanation:</span>
                    </span>
                    <div className="p-3.5 bg-teal-50/50 border border-teal-200/80 rounded-xl text-xs text-slate-700 leading-relaxed">
                      {item.explanation}
                    </div>
                  </div>
                )}

                {/* 6. FEEDBACK ON HOW THE USER'S ANSWER COULD BE IMPROVED */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Feedback & Improvement Guide:</span>
                  </span>
                  <div className="p-3.5 bg-indigo-50/60 border border-indigo-200/80 rounded-xl text-xs text-slate-700 leading-relaxed">
                    {item.feedback}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            All mock evaluation reports are persisted in your Career Accelerator readiness profile.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate('/student/interview-history')}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 transition"
            >
              View Interview History
            </button>
            <button
              onClick={() => navigate('/student/interview-center')}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#173B63] hover:bg-[#204B7D] text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Practice Another Interview</span>
              <ChevronRight className="w-4 h-4 text-teal-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
