import React, { useEffect, useState } from 'react';
import { careerService } from '../../services/careerService';
import { LearningCourse } from '../../types';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Flame, Star, Users, Clock, PlayCircle, BookOpen, Sparkles, Filter } from 'lucide-react';

export const LearningHubPage: React.FC = () => {
  const [courses, setCourses] = useState<LearningCourse[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    careerService.getLearningCourses().then(setCourses);
  }, []);

  const categories = ['All', 'Skill Gap', 'Interview Prep', 'Career Prep'];

  const filtered = courses.filter(c => selectedCategory === 'All' || c.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#173B63] flex items-center gap-2">
            <Flame className="w-6 h-6 text-[#2F9C95]" />
            <span>AI Learning Hub & Micro-Certifications</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Personalized learning tracks based on identified skill gaps, interview rubrics, and career pathways
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat ? 'bg-white text-[#173B63] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(course => (
          <div
            key={course.id}
            className="academic-card overflow-hidden flex flex-col justify-between academic-card-hover border border-slate-200"
          >
            {/* Thumbnail banner */}
            <div className={`p-6 bg-gradient-to-r ${course.thumbnailColor} text-white flex flex-col justify-between h-36 relative`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded backdrop-blur-xs">
                  {course.category}
                </span>
                <div className="flex items-center gap-1 text-amber-300 text-xs font-bold font-mono">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  <span>{course.rating}</span>
                </div>
              </div>

              <h3 className="font-bold text-base text-white line-clamp-2 leading-snug">
                {course.title}
              </h3>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Instructor: <strong className="text-slate-700">{course.instructor}</strong></span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {course.skillsTaught.map((skill, sIdx) => (
                    <span key={sIdx} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="space-y-2 pt-3 border-t border-slate-100">
                {course.progress !== undefined ? (
                  <ProgressBar value={course.progress} label="Module Progress" size="sm" color="teal" />
                ) : null}

                <button
                  onClick={() => alert(`Launching ${course.title} video player`)}
                  className="w-full py-2 rounded-lg bg-[#173B63] hover:bg-[#204B7D] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-2xs"
                >
                  <PlayCircle className="w-4 h-4 text-teal-300" />
                  <span>{course.progress ? 'Continue Course' : 'Start Learning Module'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
