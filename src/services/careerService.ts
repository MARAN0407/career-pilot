import { 
  CareerRole, 
  SkillGapItem, 
  JobListing, 
  LearningCourse, 
  RoadmapMilestone 
} from '../types';
import { 
  mockCareerRoles, 
  mockSkillGaps, 
  mockJobListings, 
  mockLearningCourses, 
  mockRoadmapMilestones 
} from './mockData';
import { ApiService, delay } from './api';

const CAREER_ROLES_KEY = 'career_roles';
const SKILL_GAPS_KEY = 'skill_gaps';
const JOBS_KEY = 'job_listings';
const LEARNING_COURSES_KEY = 'learning_courses';
const ROADMAP_KEY = 'career_roadmap';
const RESUME_DATA_KEY = 'resume_analysis_data';

export interface ResumeAnalysisResult {
  atsScore: number;
  qualityRating: 'Exceptional' | 'Excellent' | 'Good' | 'Needs Improvement';
  summary: string;
  detectedSkills: string[];
  missingKeywords: string[];
  formattingIssues: string[];
  sections: {
    name: string;
    score: number;
    feedback: string;
  }[];
  bulletPointOptimizations: {
    original: string;
    improved: string;
    impactReason: string;
  }[];
}

const defaultResumeAnalysis: ResumeAnalysisResult = {
  atsScore: 88,
  qualityRating: 'Excellent',
  summary: 'Strong technical profile with verifiable machine learning projects and coursework in Neural Architectures. Well-formatted with standard typography.',
  detectedSkills: ['Python', 'Machine Learning', 'PyTorch', 'FastAPI', 'NumPy', 'Pandas', 'SQL', 'Git', 'Backpropagation', 'Linear Algebra'],
  missingKeywords: ['Docker', 'AWS SageMaker / Cloud', 'MLOps', 'Vector Search / RAG', 'CI/CD Pipelines'],
  formattingIssues: [
    'Add numerical impact metrics to your third project bullet point',
    'Include LinkedIn and GitHub profile hyperlinks in header section'
  ],
  sections: [
    { name: 'Contact & Portfolio Links', score: 95, feedback: 'Clear institutional email, contact details, and name.' },
    { name: 'Education & Academic Standing', score: 98, feedback: 'Dean’s Honor list & 3.88 GPA featured prominently.' },
    { name: 'Technical Skills Matrix', score: 88, feedback: 'Good grouping by category; recommend adding Cloud & Containerization tags.' },
    { name: 'Projects & Coursework', score: 84, feedback: 'Great code complexity; quantify inference speedups or dataset size.' },
    { name: 'ATS Formatting & Cleanliness', score: 92, feedback: 'Standard layout parses seamlessly across enterprise ATS scanners.' }
  ],
  bulletPointOptimizations: [
    {
      original: 'Worked on neural network models for classifying images in Python.',
      improved: 'Architected and trained a 12-layer ResNet model in PyTorch, achieving 94.2% top-1 accuracy on 50K image dataset with 3.2x faster inference using TensorRT.',
      impactReason: 'Adds concrete model architecture, accuracy metric, dataset scale, and tangible performance optimization.'
    },
    {
      original: 'Wrote backend APIs for student data.',
      improved: 'Developed asynchronous REST APIs with FastAPI and PostgreSQL, serving 1,200+ daily queries with sub-45ms p99 latency.',
      impactReason: 'Quantifies throughput, p99 latency guarantees, and demonstrates enterprise-readiness.'
    }
  ]
};

export const careerService = {
  async getCareerRoles(): Promise<CareerRole[]> {
    await delay(100);
    return ApiService.getItem<CareerRole[]>(CAREER_ROLES_KEY, mockCareerRoles);
  },

  async getSkillGaps(): Promise<SkillGapItem[]> {
    await delay(100);
    return ApiService.getItem<SkillGapItem[]>(SKILL_GAPS_KEY, mockSkillGaps);
  },

  async getJobListings(): Promise<JobListing[]> {
    await delay(100);
    return ApiService.getItem<JobListing[]>(JOBS_KEY, mockJobListings);
  },

  async getLearningCourses(): Promise<LearningCourse[]> {
    await delay(100);
    return ApiService.getItem<LearningCourse[]>(LEARNING_COURSES_KEY, mockLearningCourses);
  },

  async getRoadmap(): Promise<RoadmapMilestone[]> {
    await delay(100);
    return ApiService.getItem<RoadmapMilestone[]>(ROADMAP_KEY, mockRoadmapMilestones);
  },

  async getResumeAnalysis(): Promise<ResumeAnalysisResult> {
    try {
      const res = await fetch('/api/resume/latest');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          ApiService.setItem(RESUME_DATA_KEY, json.data);
          return json.data;
        }
      }
    } catch (err) {
      console.warn('Backend /api/resume/latest fetch failed, using cached state', err);
    }
    return ApiService.getItem<ResumeAnalysisResult>(RESUME_DATA_KEY, defaultResumeAnalysis);
  },

  async analyzeNewResume(file: File): Promise<ResumeAnalysisResult> {
    const formData = new FormData();
    formData.append('resumeFile', file);

    const res = await fetch('/api/resume/analyze', {
      method: 'POST',
      body: formData
    });

    const json = await res.json();

    // Check if backend rejected it because it is NOT a resume!
    if (!res.ok || !json.isResume) {
      const error: any = new Error(json.error || 'The uploaded file does not appear to be a valid resume.');
      error.isResume = false;
      error.missingSections = json.missingSections || [];
      error.detectedSections = json.detectedSections || [];
      error.filename = file.name;
      throw error;
    }

    if (json.data) {
      ApiService.setItem(RESUME_DATA_KEY, json.data);
      return json.data;
    }

    throw new Error('Could not parse resume data');
  }
};
