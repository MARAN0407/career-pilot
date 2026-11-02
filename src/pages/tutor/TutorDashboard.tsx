import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { classService } from '../../services/classService';
import { Course } from '../../types';
import { MetricCard } from '../../components/common/MetricCard';
import { ProgressBar } from '../../components/common/ProgressBar';
import { MaterialUploadModal } from '../../components/classroom/MaterialUploadModal';
import { 
  GraduationCap, 
  Users, 
  FileCheck2, 
  TrendingUp, 
  PlusCircle, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Video,
  ArrowRight
} from 'lucide-react';

export const TutorDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  useEffect(() => {
    classService.getCourses().then(setCourses);
  }, []);

  const activities = [
    {
      id: 1,
      text: '12 students submitted Assignment 3: Neural Backpropagation',
      course: 'CS602',
      time: '15 mins ago',
      icon: <FileCheck2 className="w-4 h-4 text-[#2F9C95]" />
    },
    {
      id: 2,
      text: '4 students completed AI Camera Mock Interviews for ML Engineer role',
      course: 'Career Readiness',
      time: '1 hour ago',
      icon: <Video className="w-4 h-4 text-[#7567C7]" />
    },
    {
      id: 3,
      text: 'AI Knowledge Base finished vector-indexing Lecture 7 video transcript',
      course: 'CS602 RAG',
      time: '2 hours ago',
      icon: <Sparkles className="w-4 h-4 text-[#3B82C4]" />
    },
    {
      id: 4,
      text: 'Alex Chen achieved 94% on analytical gradient verification check',
      course: 'CS602',
      time: 'Yesterday',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Faculty Hero Banner */}
      <div className="bg-gradient-to-r from-[#0F2642] via-[#173B63] to-[#204B7D] p-6 sm:p-8 rounded-2xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-teal-300 font-mono">
            Faculty & Academic Administration
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            {user.title || 'Professor & Head of AI Research'} • School of Artificial Intelligence & Data Systems
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsUploadOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#2F9C95] hover:bg-[#3EBAB2] text-white text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Upload Material / Lecture</span>
          </button>
        </div>
      </div>

      {/* 4 Core Tutor Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Classes"
          value="6"
          subtitle="64 students in CS602"
          icon={GraduationCap}
          accentColor="navy"
          onClick={() => navigate('/tutor/classes')}
        />
        <MetricCard
          title="Total Students"
          value="184"
          subtitle="Across AI & Data Sciences"
          icon={Users}
          accentColor="blue"
          onClick={() => navigate('/tutor/students')}
        />
        <MetricCard
          title="Pending Submissions"
          value="23"
          subtitle="Assignments to grade"
          icon={FileCheck2}
          accentColor="amber"
          onClick={() => navigate('/tutor/assignments')}
        />
        <MetricCard
          title="Avg Class Performance"
          value="82%"
          subtitle="Coursework + Mock Interviews"
          icon={TrendingUp}
          trend={{ value: "+3.2%", isPositive: true }}
          accentColor="teal"
          onClick={() => navigate('/tutor/analytics')}
        />
      </div>

      {/* Courses & Activity Stream Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Managed Classes (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#173B63]">My Managed Classes</h2>
              <p className="text-xs text-slate-500">Curriculum progress, student cohorts, and RAG index status</p>
            </div>
            <button
              onClick={() => navigate('/tutor/classes')}
              className="text-xs text-[#3B82C4] font-semibold hover:underline"
            >
              View All Classes →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {courses.slice(0, 2).map(course => (
              <div
                key={course.id}
                onClick={() => navigate(`/tutor/classes`)}
                className="academic-card p-5 flex flex-col justify-between space-y-4 cursor-pointer academic-card-hover border border-slate-200"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold">
                      {course.code}
                    </span>
                    <span>{course.enrolledStudentsCount} Enrolled</span>
                  </div>

                  <h3 className="font-bold text-sm text-[#173B63]">{course.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{course.description}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>{course.materialsCount} Materials</span>
                    <span>{course.assignmentsCount} Assignments</span>
                  </div>
                  <ProgressBar value={course.progress} label="Syllabus Delivered" size="sm" color="teal" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Academic Activity Stream */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#173B63]">Recent Activity Stream</h2>
            <span className="text-xs text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded">Live Sync</span>
          </div>

          <div className="academic-card p-4 divide-y divide-slate-100 space-y-3">
            {activities.map(act => (
              <div key={act.id} className="pt-3 first:pt-0 flex items-start gap-3 text-xs">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 shrink-0 mt-0.5">
                  {act.icon}
                </div>
                <div className="flex-1">
                  <p className="text-slate-800 leading-snug">{act.text}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                    <span className="font-semibold text-[#173B63]">{act.course}</span>
                    <span>{act.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MaterialUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={() => classService.getCourses().then(setCourses)}
      />
    </div>
  );
};
