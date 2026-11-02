import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Layouts
import { StudentLayout } from './components/layout/StudentLayout';
import { TutorLayout } from './components/layout/TutorLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { StudentLoginPage } from './pages/public/StudentLoginPage';
import { TutorLoginPage } from './pages/public/TutorLoginPage';
import { RegisterPage } from './pages/public/RegisterPage';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { MyClassesPage } from './pages/student/MyClassesPage';
import { ClassDetailPage } from './pages/student/ClassDetailPage';
import { AssignmentsPage } from './pages/student/AssignmentsPage';
import { ResumeAiPage } from './pages/student/ResumeAiPage';
import { CareerIntelligencePage } from './pages/student/CareerIntelligencePage';
import { SkillGapPage } from './pages/student/SkillGapPage';
import { JobMatcherPage } from './pages/student/JobMatcherPage';
import { LearningHubPage } from './pages/student/LearningHubPage';
import { CareerRoadmapPage } from './pages/student/CareerRoadmapPage';
import { InterviewCenterPage } from './pages/student/InterviewCenterPage';
import { InterviewResultsPage } from './pages/student/InterviewResultsPage';
import { InterviewHistoryPage } from './pages/student/InterviewHistoryPage';
import { AiCareerAssistantPage } from './pages/student/AiCareerAssistantPage';

// Tutor Pages
import { TutorDashboard } from './pages/tutor/TutorDashboard';
import { TutorClassroomPage } from './pages/tutor/TutorClassroomPage';
import { TutorAssignmentsPage } from './pages/tutor/TutorAssignmentsPage';
import { TutorStudentsPage } from './pages/tutor/TutorStudentsPage';
import { TutorAnalyticsPage } from './pages/tutor/TutorAnalyticsPage';
import { TutorKnowledgeBasePage } from './pages/tutor/TutorKnowledgeBasePage';

// Shared Editable Profile & Comprehensive Settings
import { LinkedInProfilePage } from './pages/common/LinkedInProfilePage';
import { SettingsPage } from './pages/common/SettingsPage';

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public & Authentication */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Navigate to="/login/student" replace />} />
            <Route path="/login/student" element={<StudentLoginPage />} />
            <Route path="/login/tutor" element={<TutorLoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Student Portal */}
            <Route path="/student" element={<StudentLayout />}>
              <Route index element={<Navigate to="/student/dashboard" replace />} />
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="classes" element={<MyClassesPage />} />
              <Route path="classes/:courseId" element={<ClassDetailPage />} />
              <Route path="materials" element={<MyClassesPage />} />
              <Route path="assignments" element={<AssignmentsPage />} />
              <Route path="resume-ai" element={<ResumeAiPage />} />
              <Route path="career-intel" element={<CareerIntelligencePage />} />
              <Route path="skill-gap" element={<SkillGapPage />} />
              <Route path="jobs" element={<JobMatcherPage />} />
              <Route path="learning-hub" element={<LearningHubPage />} />
              <Route path="roadmap" element={<CareerRoadmapPage />} />
              <Route path="interview-center" element={<InterviewCenterPage />} />
              <Route path="interview-results" element={<InterviewResultsPage />} />
              <Route path="interview-history" element={<InterviewHistoryPage />} />
              <Route path="performance" element={<InterviewResultsPage />} />
              <Route path="ai-assistant" element={<AiCareerAssistantPage />} />
              <Route path="profile" element={<LinkedInProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Tutor & Faculty Portal */}
            <Route path="/tutor" element={<TutorLayout />}>
              <Route index element={<Navigate to="/tutor/dashboard" replace />} />
              <Route path="dashboard" element={<TutorDashboard />} />
              <Route path="classes" element={<TutorClassroomPage />} />
              <Route path="students" element={<TutorStudentsPage />} />
              <Route path="assignments" element={<TutorAssignmentsPage />} />
              <Route path="materials" element={<TutorKnowledgeBasePage />} />
              <Route path="announcements" element={<TutorClassroomPage />} />
              <Route path="analytics" element={<TutorAnalyticsPage />} />
              <Route path="interview-analytics" element={<TutorAnalyticsPage />} />
              <Route path="student-progress" element={<TutorStudentsPage />} />
              <Route path="knowledge-base" element={<TutorKnowledgeBasePage />} />
              <Route path="question-bank" element={<TutorKnowledgeBasePage />} />
              <Route path="ai-insights" element={<TutorAnalyticsPage />} />
              <Route path="profile" element={<LinkedInProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
