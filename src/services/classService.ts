import { 
  Course, 
  Announcement, 
  CourseMaterial, 
  Assignment, 
  StudentSubmission, 
  StudentRosterItem, 
  MaterialType 
} from '../types';
import { 
  mockCourses, 
  mockAnnouncements, 
  mockMaterials, 
  mockAssignments, 
  mockStudentRoster, 
  mockStudentSubmissions 
} from './mockData';
import { ApiService, delay } from './api';

const COURSES_KEY = 'courses_list';
const ANNOUNCEMENTS_KEY = 'announcements_list';
const MATERIALS_KEY = 'materials_list';
const ASSIGNMENTS_KEY = 'assignments_list';
const ROSTER_KEY = 'roster_list';
const SUBMISSIONS_KEY = 'submissions_list';

export const classService = {
  async getCourses(): Promise<Course[]> {
    await delay(200);
    return ApiService.getItem<Course[]>(COURSES_KEY, mockCourses);
  },

  async getCourseById(courseId: string): Promise<Course | undefined> {
    const courses = await this.getCourses();
    return courses.find(c => c.id === courseId);
  },

  async getAnnouncements(courseId?: string): Promise<Announcement[]> {
    await delay(150);
    const list = ApiService.getItem<Announcement[]>(ANNOUNCEMENTS_KEY, mockAnnouncements);
    return courseId ? list.filter(a => a.courseId === courseId) : list;
  },

  async addAnnouncement(courseId: string, content: string, authorName: string, authorAvatar: string): Promise<Announcement> {
    await delay(300);
    const announcements = await this.getAnnouncements();
    const course = (await this.getCourses()).find(c => c.id === courseId);
    const newAnn: Announcement = {
      id: `ann_${Date.now()}`,
      courseId,
      courseTitle: course ? course.title : 'Course Announcement',
      authorName,
      authorRole: 'Course Faculty',
      authorAvatar,
      timestamp: 'Just now',
      content,
      comments: []
    };
    const updated = [newAnn, ...announcements];
    ApiService.setItem(ANNOUNCEMENTS_KEY, updated);
    return newAnn;
  },

  async addComment(announcementId: string, content: string, userName: string, userAvatar: string): Promise<void> {
    await delay(200);
    const list = ApiService.getItem<Announcement[]>(ANNOUNCEMENTS_KEY, mockAnnouncements);
    const updated = list.map(ann => {
      if (ann.id === announcementId) {
        return {
          ...ann,
          comments: [
            ...ann.comments,
            {
              id: `c_${Date.now()}`,
              userName,
              userAvatar,
              timestamp: 'Just now',
              content
            }
          ]
        };
      }
      return ann;
    });
    ApiService.setItem(ANNOUNCEMENTS_KEY, updated);
  },

  async getMaterials(courseId?: string): Promise<CourseMaterial[]> {
    await delay(150);
    const list = ApiService.getItem<CourseMaterial[]>(MATERIALS_KEY, mockMaterials);
    return courseId ? list.filter(m => m.courseId === courseId) : list;
  },

  async uploadMaterial(data: {
    courseId: string;
    title: string;
    description: string;
    type: MaterialType;
    topic: string;
    fileSizeOrDuration: string;
    isRagIndexed: boolean;
  }): Promise<CourseMaterial> {
    await delay(400);
    const materials = await this.getMaterials();
    const course = (await this.getCourses()).find(c => c.id === data.courseId);
    const newMaterial: CourseMaterial = {
      id: `mat_${Date.now()}`,
      courseId: data.courseId,
      courseTitle: course ? course.title : 'Course Material',
      title: data.title,
      description: data.description,
      type: data.type,
      fileSizeOrDuration: data.fileSizeOrDuration,
      uploadedAt: 'Just now',
      url: '#',
      isRagIndexed: data.isRagIndexed,
      topic: data.topic,
      downloadsCount: 0
    };
    const updated = [newMaterial, ...materials];
    ApiService.setItem(MATERIALS_KEY, updated);
    return newMaterial;
  },

  async getAssignments(courseId?: string): Promise<Assignment[]> {
    await delay(150);
    const list = ApiService.getItem<Assignment[]>(ASSIGNMENTS_KEY, mockAssignments);
    return courseId ? list.filter(a => a.courseId === courseId) : list;
  },

  async submitAssignment(assignmentId: string, fileName: string): Promise<Assignment> {
    await delay(400);
    const list = await this.getAssignments();
    const updated = list.map(a => {
      if (a.id === assignmentId) {
        return {
          ...a,
          status: 'submitted' as const,
          submittedAt: new Date().toISOString(),
          submissionFile: fileName
        };
      }
      return a;
    });
    ApiService.setItem(ASSIGNMENTS_KEY, updated);
    return updated.find(a => a.id === assignmentId)!;
  },

  async createAssignment(data: Partial<Assignment>): Promise<Assignment> {
    await delay(350);
    const assignments = await this.getAssignments();
    const newAsg: Assignment = {
      id: `asg_${Date.now()}`,
      courseId: data.courseId || 'crs_ml_101',
      courseTitle: data.courseTitle || 'Machine Learning & Neural Architectures',
      title: data.title || 'New Assignment',
      description: data.description || '',
      instructions: data.instructions || [],
      dueDate: data.dueDate || new Date(Date.now() + 7 * 86400000).toISOString(),
      totalMarks: data.totalMarks || 100,
      status: 'not_started',
      rubric: data.rubric || [
        { criteria: 'Technical Accuracy & Methodology', points: 50 },
        { criteria: 'Execution & Test Results', points: 30 },
        { criteria: 'Documentation & Code Quality', points: 20 }
      ]
    };
    ApiService.setItem(ASSIGNMENTS_KEY, [newAsg, ...assignments]);
    return newAsg;
  },

  async getStudentRoster(): Promise<StudentRosterItem[]> {
    await delay(150);
    return ApiService.getItem<StudentRosterItem[]>(ROSTER_KEY, mockStudentRoster);
  },

  async getStudentSubmissions(assignmentId?: string): Promise<StudentSubmission[]> {
    await delay(150);
    const list = ApiService.getItem<StudentSubmission[]>(SUBMISSIONS_KEY, mockStudentSubmissions);
    return assignmentId ? list.filter(s => s.assignmentId === assignmentId) : list;
  },

  async gradeSubmission(submissionId: string, marks: number, feedback: string): Promise<void> {
    await delay(300);
    const list = ApiService.getItem<StudentSubmission[]>(SUBMISSIONS_KEY, mockStudentSubmissions);
    const updated = list.map(s => {
      if (s.id === submissionId) {
        return {
          ...s,
          status: 'graded' as const,
          marksAwarded: marks,
          feedback
        };
      }
      return s;
    });
    ApiService.setItem(SUBMISSIONS_KEY, updated);
  }
};
