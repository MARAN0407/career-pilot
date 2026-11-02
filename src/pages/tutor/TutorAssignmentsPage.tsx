import React, { useEffect, useState } from 'react';
import { classService } from '../../services/classService';
import { Assignment, StudentSubmission } from '../../types';
import { FileCheck2, PlusCircle, CheckCircle2, Clock, FileText, Send, X, AlertCircle } from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const TutorAssignmentsPage: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<StudentSubmission | null>(null);
  const [gradeInput, setGradeInput] = useState<number>(95);
  const [feedbackInput, setFeedbackInput] = useState<string>('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // New assignment state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newMarks, setNewMarks] = useState(100);

  useEffect(() => {
    classService.getAssignments().then(setAssignments);
    classService.getStudentSubmissions().then(setSubmissions);
  }, []);

  const handleGradeSubmit = async () => {
    if (!selectedSubmission) return;
    await classService.gradeSubmission(selectedSubmission.id, gradeInput, feedbackInput);
    const updated = await classService.getStudentSubmissions();
    setSubmissions(updated);
    setSelectedSubmission(null);
    alert('Student submission graded and synced to portal!');
  };

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    await classService.createAssignment({
      title: newTitle,
      description: newDesc,
      totalMarks: newMarks
    });

    const updated = await classService.getAssignments();
    setAssignments(updated);
    setIsCreateOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#173B63] flex items-center gap-2">
            <FileCheck2 className="w-6 h-6 text-[#2F9C95]" />
            <span>Assignment & Submissions Grading Portal</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Author coursework prompts, configure rubrics, and grade student submissions with automated plagiarism checks
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0F2642] hover:bg-[#173B63] text-white text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-teal-300" />
          <span>Create New Assignment</span>
        </button>
      </div>

      {/* Submissions Roster to Grade */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#173B63]">Recent Student Submissions</h2>
          <span className="text-xs text-slate-500 font-mono">3 Submissions Received</span>
        </div>

        <div className="academic-card overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">Roll Number</th>
                <th className="p-4">Submitted File</th>
                <th className="p-4">Submission Time</th>
                <th className="p-4">Status</th>
                <th className="p-4">Score</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {submissions.map(sub => (
                <tr key={sub.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 flex items-center gap-3">
                    <img src={sub.studentAvatar} alt={sub.studentName} className="w-8 h-8 rounded-full object-cover" />
                    <span className="font-semibold text-slate-800">{sub.studentName}</span>
                  </td>
                  <td className="p-4 font-mono text-slate-500">{sub.studentRegisterNo}</td>
                  <td className="p-4 font-mono text-[#3B82C4]">{sub.fileName}</td>
                  <td className="p-4 text-slate-500">{new Date(sub.submittedAt).toLocaleTimeString()}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        sub.status === 'graded'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {sub.status === 'graded' ? 'Graded' : 'Pending Grading'}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-800">
                    {sub.marksAwarded !== undefined ? `${sub.marksAwarded} / ${sub.totalMarks}` : '—'}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedSubmission(sub);
                        setGradeInput(sub.marksAwarded || 92);
                        setFeedbackInput(sub.feedback || 'Great implementation and clean gradient verification.');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#173B63] hover:bg-[#204B7D] text-white text-xs font-semibold shadow-2xs"
                    >
                      {sub.status === 'graded' ? 'Edit Grade' : 'Grade Submission'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grade Submission Modal */}
      {selectedSubmission && (
        <Modal
          isOpen={!!selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
          title={`Grade Submission: ${selectedSubmission.studentName}`}
          subtitle={`Roll: ${selectedSubmission.studentRegisterNo} • File: ${selectedSubmission.fileName}`}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Marks Awarded (out of {selectedSubmission.totalMarks})
              </label>
              <input
                type="number"
                min={0}
                max={selectedSubmission.totalMarks}
                value={gradeInput}
                onChange={e => setGradeInput(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm font-bold font-mono text-[#173B63] rounded-lg border border-slate-200 focus:outline-none focus:border-[#2F9C95]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Faculty Written Feedback
              </label>
              <textarea
                rows={4}
                value={feedbackInput}
                onChange={e => setFeedbackInput(e.target.value)}
                placeholder="Write specific feedback regarding mathematical derivations, code vectorization, or rubric criteria..."
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#2F9C95]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleGradeSubmit}
                className="px-5 py-2 bg-[#2F9C95] hover:bg-[#3EBAB2] text-white font-bold rounded-lg shadow-sm"
              >
                Save & Publish Grade
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Create Assignment Modal */}
      {isCreateOpen && (
        <Modal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          title="Create New Classroom Assignment"
          subtitle="Publish instructions, deadlines, and rubric weights"
          maxWidth="lg"
        >
          <form onSubmit={handleCreateAssignment} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Assignment Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Assignment 5: Transformer Multi-Head Self Attention in PyTorch"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#2F9C95]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Description & Starter Instructions</label>
              <textarea
                rows={3}
                placeholder="Describe experimental requirements, datasets, and expected performance benchmarks..."
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#2F9C95]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Total Marks</label>
                <input
                  type="number"
                  value={newMarks}
                  onChange={e => setNewMarks(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#2F9C95]"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Course</label>
                <select className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white">
                  <option>CS602 — Machine Learning</option>
                  <option>CS605 — Applied AI & LLMs</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#0F2642] hover:bg-[#173B63] text-white font-bold rounded-lg shadow-sm"
              >
                Publish Assignment
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
