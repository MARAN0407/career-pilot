// ==========================================
// CAREER PILOT - COMPLETE TYPES DEFINITIONS
// ==========================================

export type UserRole = 'student' | 'tutor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department: string;
  institution: string;
  title?: string;
  registerNumber?: string;
  semester?: string;
  gpa?: number;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  tutorName: string;
  tutorAvatar: string;
  department: string;
  semester: string;
  progress: number;
  materialsCount: number;
  assignmentsCount: number;
  enrolledStudentsCount: number;
  lastActivity: string;
  bannerColor: string;
  description: string;
}

export interface Announcement {
  id: string;
  courseId: string;
  courseTitle: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  timestamp: string;
  content: string;
  attachments?: {
    name: string;
    type: 'pdf' | 'video' | 'link';
    url: string;
  }[];
  comments: {
    id: string;
    userName: string;
    userAvatar: string;
    timestamp: string;
    content: string;
  }[];
}

export type MaterialType = 'pdf' | 'video' | 'audio' | 'ppt' | 'doc';

export interface CourseMaterial {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  description: string;
  type: MaterialType;
  fileSizeOrDuration: string;
  uploadedAt: string;
  url: string;
  isRagIndexed: boolean;
  topic: string;
  downloadsCount: number;
  transcript?: string;
  summaryNotes?: string[];
}

export type SubmissionStatus = 'not_started' | 'in_progress' | 'submitted' | 'graded' | 'late';

export interface Assignment {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  description: string;
  instructions: string[];
  dueDate: string;
  totalMarks: number;
  obtainedMarks?: number;
  status: SubmissionStatus;
  rubric: {
    criteria: string;
    points: number;
  }[];
  attachments?: {
    name: string;
    url: string;
    size: string;
  }[];
  submittedAt?: string;
  submissionFile?: string;
  tutorFeedback?: string;
}

export interface StudentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  studentRegisterNo: string;
  studentAvatar: string;
  submittedAt: string;
  fileName: string;
  fileUrl: string;
  status: 'submitted' | 'graded' | 'late';
  marksAwarded?: number;
  totalMarks: number;
  feedback?: string;
}

// Career Intelligence Types
export interface CareerRole {
  id: string;
  title: string;
  matchScore: number;
  salaryRange: string;
  marketDemand: 'Very High' | 'High' | 'Moderate';
  description: string;
  requiredSkills: string[];
  currentSkills: string[];
  missingSkills: string[];
  growthRate: string;
  openPositionsCount: number;
}

export interface SkillGapItem {
  skill: string;
  currentLevel: 'Strong' | 'Intermediate' | 'Beginner' | 'Missing';
  requiredLevel: 'Strong' | 'Intermediate';
  estimatedHours: number;
  recommendedCourse: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  isRemote: boolean;
  type: 'Full-time' | 'Internship' | 'Part-time';
  stipendOrSalary: string;
  matchPercentage: number;
  requiredSkills: string[];
  missingSkills: string[];
  description: string;
  postedDaysAgo: number;
  whyMatch: {
    matchingScore: number;
    alignedSkills: string[];
    strengthsNotes: string;
    gapSuggestions: string;
  };
}

export interface LearningCourse {
  id: string;
  title: string;
  category: 'Skill Gap' | 'Interview Prep' | 'Career Prep' | 'Core AI';
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  rating: number;
  enrollments: number;
  skillsTaught: string[];
  thumbnailColor: string;
  progress?: number;
}

export interface RoadmapMilestone {
  id: string;
  order: number;
  title: string;
  description: string;
  skills: string[];
  status: 'completed' | 'in_progress' | 'upcoming';
  completionPercentage: number;
  recommendedResources: string[];
}

// AI Interview Types
export type InterviewType = 'camera' | 'voice' | 'text';

export interface InterviewQuestion {
  id: string;
  questionNumber: number;
  totalQuestions: number;
  role: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questionText: string;
  expectedKeypoints: string[];
  category: string;
  idealDuration?: string;
}

export interface InterviewResultScorecard {
  id: string;
  date: string;
  role: string;
  interviewType: InterviewType;
  overallScore: number;
  durationMinutes: number;
  metrics: {
    technicalKnowledge: number;
    answerRelevance: number;
    communication: number;
    fluency: number;
    completeness: number;
  };
  strengths: string[];
  areasToImprove: string[];
  aiSummary: string;
  transcript: {
    questionNumber: number;
    question: string;
    userAnswer: string;
    feedback: string;
    score: number;
  }[];
}

// RAG & Knowledge Base
export interface RagDocument {
  id: string;
  courseId: string;
  courseTitle: string;
  fileName: string;
  fileType: 'pdf' | 'video' | 'audio' | 'ppt';
  uploadDate: string;
  status: 'indexed' | 'processing' | 'failed';
  chunkCount: number;
  vectorDimension: number;
  size: string;
}

export interface StudentRosterItem {
  id: string;
  name: string;
  registerNumber: string;
  avatar: string;
  course: string;
  attendancePercentage: number;
  assignmentProgress: number;
  interviewScore: number;
  careerReadiness: number;
  status: 'On Track' | 'Needs Attention' | 'Exceptional';
}
