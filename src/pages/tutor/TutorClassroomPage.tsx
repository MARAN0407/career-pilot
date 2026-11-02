import React, { useEffect, useState } from 'react';
import { classService } from '../../services/classService';
import { Course, Announcement, CourseMaterial, Assignment, StudentRosterItem } from '../../types';
import { MaterialUploadModal } from '../../components/classroom/MaterialUploadModal';
import { 
  GraduationCap, 
  MessageSquare, 
  FileCheck2, 
  BookOpen, 
  Users, 
  BarChart3, 
  PlusCircle, 
  Send, 
  FileText, 
  Video, 
  Headphones, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const TutorClassroomPage: React.FC = () => {
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<'stream' | 'classwork' | 'materials' | 'students' | 'analytics'>('stream');
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [materials, setMaterials] = useState<CourseMaterial[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [students, setStudents] = useState<StudentRosterItem[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // New announcement post form
  const [newPostText, setNewPostText] = useState('');

  useEffect(() => {
    classService.getCourseById('crs_ml_101').then(c => {
      if (c) setCourse(c);
      else classService.getCourses().then(list => setCourse(list[0]));
    });
    classService.getAnnouncements('crs_ml_101').then(setAnnouncements);
    classService.getMaterials('crs_ml_101').then(setMaterials);
    classService.getAssignments('crs_ml_101').then(setAssignments);
    classService.getStudentRoster().then(setStudents);
  }, []);

  const handlePostAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim() || !course) return;

    await classService.addAnnouncement(
      course.id,
      newPostText,
      'Dr. Suresh Kumar',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    );
    setNewPostText('');
    const updated = await classService.getAnnouncements(course.id);
    setAnnouncements(updated);
  };

  if (!course) {
    return <div className="p-8 text-center text-xs text-slate-500">Loading classroom data...</div>;
  }

  const tabs = [
    { id: 'stream', label: 'Stream', icon: MessageSquare },
    { id: 'classwork', label: 'Classwork', icon: FileCheck2 },
    { id: 'materials', label: 'Materials', icon: BookOpen, count: materials.length },
    { id: 'students', label: 'Students', icon: Users, count: students.length },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      {/* Course Banner */}
      <div className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-r ${course.bannerColor} text-white shadow-md relative overflow-hidden`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 z-10">
            <span className="text-[11px] font-mono font-bold bg-white/20 px-2.5 py-0.5 rounded backdrop-blur-xs">
              {course.code} • Faculty Classroom Management
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{course.title}</h1>
            <p className="text-xs sm:text-sm text-slate-200">
              Department: <strong>{course.department}</strong> • {course.enrolledStudentsCount} Enrolled Students
            </p>
          </div>

          <button
            onClick={() => setIsUploadOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-white text-[#173B63] hover:bg-slate-100 font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer z-10"
          >
            <PlusCircle className="w-4 h-4 text-[#2F9C95]" />
            <span>Upload New Material</span>
          </button>
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
                  ? 'border-[#2F9C95] text-[#173B63] font-bold'
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
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post Announcement Box */}
            <form onSubmit={handlePostAnnouncement} className="academic-card p-5 space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                  alt="Faculty"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-xs font-bold text-[#173B63]">Announce something to your class</span>
              </div>
              <textarea
                rows={3}
                required
                value={newPostText}
                onChange={e => setNewPostText(e.target.value)}
                placeholder="Share a lecture update, syllabus clarification, or study guide..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#2F9C95] focus:bg-white transition"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newPostText.trim()}
                  className="px-4 py-2 bg-[#173B63] hover:bg-[#204B7D] disabled:opacity-50 text-white font-semibold text-xs rounded-lg transition flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish to Class</span>
                </button>
              </div>
            </form>

            {/* Announcements list */}
            <div className="space-y-4">
              {announcements.map(ann => (
                <div key={ann.id} className="academic-card p-6 space-y-4">
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

                  <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                    {ann.content}
                  </p>

                  <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
                    <span>{ann.comments.length} student comments</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="academic-card p-5 space-y-3">
              <h3 className="text-xs font-bold text-[#173B63] uppercase tracking-wider">
                Class Stats Summary
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Enrolled Students:</span>
                  <strong className="text-slate-800 font-mono">64</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Materials in RAG:</span>
                  <strong className="text-teal-700 font-mono">4 files (442 chunks)</strong>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Assignment 3 Submissions:</span>
                  <strong className="text-slate-800 font-mono">58 / 64 (91%)</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: CLASSWORK */}
      {activeTab === 'classwork' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#173B63]">Assignments & Tests</h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {assignments.map(asg => (
              <div key={asg.id} className="academic-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-[#173B63]">{asg.title}</h3>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-800">
                    Max Marks: {asg.totalMarks}
                  </span>
                </div>
                <p className="text-xs text-slate-600">{asg.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <span>Due: {new Date(asg.dueDate).toLocaleDateString()}</span>
                  <button className="text-xs text-[#3B82C4] font-semibold hover:underline">
                    View Submissions & Grade Roster →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: MATERIALS */}
      {activeTab === 'materials' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#173B63]">Classroom Materials & AI Vectors</h2>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="px-4 py-2 rounded-lg bg-[#0F2642] hover:bg-[#173B63] text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4 text-teal-300" />
              <span>Upload Learning Material</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {materials.map(mat => (
              <div key={mat.id} className="academic-card p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {mat.type.toUpperCase()} • {mat.fileSizeOrDuration}
                    </span>
                    {mat.isRagIndexed && (
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-indigo-500" />
                        Indexed in RAG
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-bold text-sm text-[#173B63]">{mat.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{mat.description}</p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>Topic: {mat.topic}</span>
                  <span>{mat.downloadsCount} student views</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: STUDENTS */}
      {activeTab === 'students' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-[#173B63]">Enrolled Student Roster</h2>

          <div className="academic-card overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Student</th>
                  <th className="p-4">Roll Number</th>
                  <th className="p-4">Attendance</th>
                  <th className="p-4">Assignment Progress</th>
                  <th className="p-4">Mock Interview</th>
                  <th className="p-4">Career Readiness</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-4 flex items-center gap-3">
                      <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover" />
                      <span className="font-semibold text-slate-800">{s.name}</span>
                    </td>
                    <td className="p-4 font-mono text-slate-500">{s.registerNumber}</td>
                    <td className="p-4 font-semibold text-slate-700">{s.attendancePercentage}%</td>
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
      )}

      {/* Tab 5: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="academic-card p-6 space-y-4">
          <h3 className="text-base font-bold text-[#173B63]">Classroom Performance Distribution</h3>
          <p className="text-xs text-slate-500">
            Average cohort performance stands at <strong>82%</strong> with 94% assignment submission rate and 84% average interview readiness.
          </p>
        </div>
      )}

      <MaterialUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={() => classService.getMaterials(course.id).then(setMaterials)}
      />
    </div>
  );
};
