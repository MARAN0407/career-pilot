import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { interviewService } from '../../services/interviewService';
import { InterviewResultScorecard } from '../../types';
import { History, Video, Mic, Keyboard, ArrowRight, TrendingUp, Calendar, Clock, Sparkles, Target } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const InterviewHistoryPage: React.FC = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<InterviewResultScorecard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    interviewService.getHistory(user?.department)
      .then(res => {
        const deptFiltered = res.filter(item => !user?.department || !item.department || item.department === user.department);
        setHistory(deptFiltered);
      })
      .catch(() => {
        setHistory([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user?.department]);

  // Real chart data computed solely from actual historical sessions
  const chartData = history.map((item, idx) => ({
    date: item.date || `Session ${idx + 1}`,
    score: item.overallScore,
    subject: item.subject || item.role,
  }));

  const hasGain = history.length > 1;
  const scoreDiff = hasGain ? history[history.length - 1].overallScore - history[0].overallScore : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-bold">
              {user?.department || 'Department Sessions'}
            </span>
          </div>
          <h1 className="text-xl font-bold text-[#173B63] flex items-center gap-2">
            <History className="w-6 h-6 text-[#7567C7]" />
            <span>Interview History & Performance Trends</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Historical progression of your mock assessment scores for {user?.department || 'your department'}.
          </p>
        </div>

        <button
          onClick={() => navigate('/student/interview-center')}
          className="px-4 py-2 rounded-xl bg-[#2F9C95] hover:bg-[#3EBAB2] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto"
        >
          <Video className="w-4 h-4" />
          <span>New Mock Interview</span>
        </button>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-xs text-slate-500 space-y-3">
          <div className="w-8 h-8 border-2 border-[#173B63] border-t-transparent rounded-full animate-spin mx-auto" />
          <p>Loading historical assessment logs...</p>
        </div>
      ) : history.length === 0 ? (
        /* Clean Empty State when no interviews attended */
        <div className="academic-card p-12 text-center space-y-4 max-w-xl mx-auto my-8 border-dashed border-2 border-slate-300">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <History className="w-8 h-8 text-[#173B63]" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-slate-800">No Interview History Found</h2>
            <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
              You haven't completed any mock interviews for <strong className="text-[#173B63]">{user?.department || 'your department'}</strong> yet. All completed simulations, scorecards, and progress trajectories will be logged here.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate('/student/interview-center')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#173B63] hover:bg-[#204B7D] text-white text-xs font-bold transition shadow-sm cursor-pointer"
            >
              <span>Attend First Mock Interview</span>
              <ArrowRight className="w-4 h-4 text-teal-300" />
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Progress Chart (Shown ONLY when real sessions exist) */}
          <div className="academic-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#173B63]">
                  Score Progression {hasGain ? `(${scoreDiff >= 0 ? '+' : ''}${scoreDiff} pts)` : `(${history[0].overallScore}% baseline)`}
                </h3>
                <p className="text-xs text-slate-500">Track your technical and communication growth over time</p>
              </div>
              {hasGain && (
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                  scoreDiff >= 0 
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200' 
                    : 'text-amber-700 bg-amber-50 border-amber-200'
                }`}>
                  {scoreDiff >= 0 ? `↑ +${scoreDiff}% Growth` : `${scoreDiff}% Change`}
                </span>
              )}
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#2F9C95" strokeWidth={3} dot={{ r: 6, fill: '#173B63' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

      {/* Historical List Table / Cards */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[#173B63]">Completed Interview Sessions</h3>

        <div className="grid grid-cols-1 gap-4">
          {history.map(item => (
            <div
              key={item.id}
              onClick={() => navigate('/student/interview-results')}
              className="academic-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer academic-card-hover"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#173B63] shrink-0">
                  {item.interviewType === 'camera' ? (
                    <Video className="w-6 h-6 text-[#2F9C95]" />
                  ) : item.interviewType === 'voice' ? (
                    <Mic className="w-6 h-6 text-[#7567C7]" />
                  ) : (
                    <Keyboard className="w-6 h-6 text-[#3B82C4]" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-[#173B63]">{item.role}</h4>
                    <span className="px-2 py-0.2 rounded uppercase text-[9px] font-mono font-bold bg-slate-100 text-slate-700">
                      {item.interviewType}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.durationMinutes} mins
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="text-right">
                  <span className="text-2xl font-bold font-mono text-[#2F9C95]">
                    {item.overallScore}%
                  </span>
                  <span className="text-[10px] text-slate-400 block font-semibold">Overall Score</span>
                </div>

                <button className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition flex items-center gap-1">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </>
      )}
    </div>
  );
};
