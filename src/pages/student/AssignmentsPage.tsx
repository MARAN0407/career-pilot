import React, { useEffect, useState } from 'react';
import { classService } from '../../services/classService';
import { useAuth } from '../../context/AuthContext';
import { Assignment } from '../../types';
import { FileCheck2, Calendar, CheckCircle2, Clock, Upload, AlertCircle, FileText } from 'lucide-react';

export const AssignmentsPage: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'graded'>('all');

  useEffect(() => {
    classService.getAssignments().then(setAssignments);
  }, []);

  const filtered = assignments.filter(a => {
    if (filter === 'pending') return a.status !== 'graded';
    if (filter === 'graded') return a.status === 'graded';
    return true;
  });

  const { user } = useAuth();

  const handleSubmit = async (asgId: string) => {
    const fileName = `${(user?.name || 'Student').replace(/\s+/g, '')}_Submission.zip`;
    await classService.submitAssignment(asgId, fileName);
    const updated = await classService.getAssignments();
    setAssignments(updated);
    alert('Assignment submission uploaded successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#173B63] flex items-center gap-2">
            <FileCheck2 className="w-6 h-6 text-[#2F9C95]" />
            <span>Assignments & Coursework Submissions</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track active deadlines, submit code projects, and inspect faculty feedback and rubric grades
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          {(['all', 'pending', 'graded'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                filter === f ? 'bg-white text-[#173B63] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Assignment cards */}
      <div className="grid grid-cols-1 gap-5">
        {filtered.map(asg => (
          <div key={asg.id} className="academic-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3B82C4]">
                  {asg.courseTitle}
                </span>
                <h3 className="text-base font-bold text-[#173B63] mt-0.5">{asg.title}</h3>
              </div>

              <span
                className={`text-xs font-bold px-3 py-1 rounded-full w-fit ${
                  asg.status === 'graded'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : asg.status === 'submitted'
                    ? 'bg-blue-50 text-blue-800 border border-blue-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                {asg.status === 'graded'
                  ? `Graded (${asg.obtainedMarks} / ${asg.totalMarks})`
                  : asg.status === 'submitted'
                  ? 'Submitted • Under Review'
                  : 'Action Required'}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{asg.description}</p>

            {/* Rubric grid */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Rubric Criteria Breakdown:
              </span>
              <div className="grid sm:grid-cols-2 gap-2 text-xs">
                {asg.rubric.map((r, i) => (
                  <div key={i} className="flex justify-between items-center bg-white p-2 rounded border border-slate-200 text-slate-700">
                    <span className="text-[11px]">{r.criteria}</span>
                    <span className="font-mono font-bold text-[#173B63]">{r.points} pts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Faculty Feedback */}
            {asg.tutorFeedback && (
              <div className="p-3.5 bg-teal-50/70 border border-teal-200 rounded-xl text-xs space-y-1">
                <span className="font-bold text-teal-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  Faculty Feedback (Dr. Suresh Kumar):
                </span>
                <p className="text-slate-700 italic leading-relaxed">{asg.tutorFeedback}</p>
              </div>
            )}

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2 text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>Due Date: {new Date(asg.dueDate).toLocaleDateString()} at 11:59 PM</span>
              </div>

              {asg.status !== 'graded' && asg.status !== 'submitted' ? (
                <button
                  onClick={() => handleSubmit(asg.id)}
                  className="px-4 py-2 rounded-lg bg-[#173B63] hover:bg-[#204B7D] text-white font-semibold transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Solution (ZIP / Notebook)</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px]">
                  <FileText className="w-3.5 h-3.5 text-teal-600" />
                  <span>{asg.submissionFile || `${(user?.name || 'Student').replace(/\s+/g, '')}_Submission.zip`}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
