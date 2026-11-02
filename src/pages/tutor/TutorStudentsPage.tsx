import React, { useEffect, useState } from 'react';
import { classService } from '../../services/classService';
import { StudentRosterItem } from '../../types';
import { Users, Search, Filter, ShieldCheck, Mail, Award, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

export const TutorStudentsPage: React.FC = () => {
  const [students, setStudents] = useState<StudentRosterItem[]>([]);
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentRosterItem | null>(null);

  useEffect(() => {
    classService.getStudentRoster().then(setStudents);
  }, []);

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.registerNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#173B63] flex items-center gap-2">
            <Users className="w-6 h-6 text-[#3B82C4]" />
            <span>Student Cohort & Placement Tracking</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Monitor individual coursework submissions, attendance %, mock interview results, and placement eligibility
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 self-start font-mono">
          184 Total Department Students
        </span>
      </div>

      {/* Search Filter */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Filter students by name or register number..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#3B82C4] shadow-2xs"
        />
      </div>

      {/* Table */}
      <div className="academic-card overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-4">Student</th>
              <th className="p-4">Register No</th>
              <th className="p-4">Course</th>
              <th className="p-4">Attendance</th>
              <th className="p-4">Coursework Progress</th>
              <th className="p-4">Mock Interview Score</th>
              <th className="p-4">Career Readiness</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(s => (
              <tr
                key={s.id}
                onClick={() => setSelectedStudent(s)}
                className="hover:bg-slate-50 cursor-pointer transition"
              >
                <td className="p-4 flex items-center gap-3">
                  <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover" />
                  <span className="font-semibold text-slate-800">{s.name}</span>
                </td>
                <td className="p-4 font-mono text-slate-500">{s.registerNumber}</td>
                <td className="p-4 text-slate-700">{s.course}</td>
                <td className="p-4 font-semibold text-slate-800">{s.attendancePercentage}%</td>
                <td className="p-4 font-semibold text-[#3B82C4]">{s.assignmentProgress}%</td>
                <td className="p-4 font-semibold text-[#7567C7]">{s.interviewScore}%</td>
                <td className="p-4 font-semibold text-[#2F9C95]">{s.careerReadiness}%</td>
                <td className="p-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      s.status === 'Exceptional'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : s.status === 'On Track'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
