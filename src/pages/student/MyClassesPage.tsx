import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { classService } from '../../services/classService';
import { Course } from '../../types';
import { ProgressBar } from '../../components/common/ProgressBar';
import { BookOpen, FileCheck2, Users, ArrowRight, Sparkles, GraduationCap } from 'lucide-react';

export const MyClassesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    classService.getCourses().then(setCourses);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#173B63] flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-[#2F9C95]" />
            <span>My Enrolled Classes</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Google Classroom-integrated course modules, active syllabus, and RAG knowledge bases
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-[#173B63] font-semibold border border-blue-200">
            Spring Semester 2026
          </span>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div
            key={course.id}
            onClick={() => navigate(`/student/classes/${course.id}`)}
            className="academic-card overflow-hidden flex flex-col justify-between cursor-pointer academic-card-hover group border border-slate-200"
          >
            {/* Course Card Banner */}
            <div className={`p-6 bg-gradient-to-r ${course.bannerColor} text-white relative`}>
              <span className="text-[11px] font-mono font-bold bg-white/20 px-2 py-0.5 rounded backdrop-blur-xs">
                {course.code}
              </span>
              <h3 className="text-base font-bold text-white mt-2 group-hover:underline leading-snug">
                {course.title}
              </h3>
              <p className="text-xs text-slate-200 mt-1">{course.department}</p>
            </div>

            {/* Course Details Body */}
            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                {/* Tutor info */}
                <div className="flex items-center gap-2.5">
                  <img
                    src={course.tutorAvatar}
                    alt={course.tutorName}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-slate-800">{course.tutorName}</span>
                    <span className="text-slate-400 block text-[10px]">Lead Faculty</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#3B82C4]" />
                    <span>{course.materialsCount} Materials</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FileCheck2 className="w-3.5 h-3.5 text-[#2F9C95]" />
                    <span>{course.assignmentsCount} Assignments</span>
                  </div>
                </div>
              </div>

              {/* Progress and Button */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <ProgressBar value={course.progress} label="Syllabus Progress" size="sm" color="blue" />

                <div className="flex items-center justify-between text-xs font-semibold text-[#173B63] group-hover:text-[#3B82C4] pt-1">
                  <span>Open Classroom →</span>
                  <span className="text-[10px] text-slate-400 font-normal">Active {course.lastActivity}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
