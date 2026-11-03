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
import { ResumeAiPage } from './pages/student/ResumeAiPage';
import { CareerIntelligencePage } from './pages/student/CareerIntelligencePage';
import { SkillGapPage } from './pages/student/SkillGapPage';
import { JobMatcherPage } from './pages/student/JobMatcherPage';
import { CareerRoadmapPage } from './pages/student/CareerRoadmapPage';
import { InterviewCenterPage } from './pages/student/InterviewCenterPage';
import { InterviewResultsPage } from './pages/student/InterviewResultsPage';
import { InterviewHistoryPage } from './pages/student/InterviewHistoryPage';
import { AiCareerAssistantPage } from './pages/student/AiCareerAssistantPage';

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
            <Route path="/login/tutor" element={<Navigate to="/login/student" replace />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Student Career & Mock Interview Portal */}
            <Route path="/student" element={<StudentLayout />}>
              <Route index element={<Navigate to="/student/dashboard" replace />} />
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="resume-ai" element={<ResumeAiPage />} />
              <Route path="career-intel" element={<CareerIntelligencePage />} />
              <Route path="skill-gap" element={<SkillGapPage />} />
              <Route path="jobs" element={<JobMatcherPage />} />
              <Route path="roadmap" element={<CareerRoadmapPage />} />
              <Route path="interview-center" element={<InterviewCenterPage />} />
              <Route path="interview-results" element={<InterviewResultsPage />} />
              <Route path="interview-history" element={<InterviewHistoryPage />} />
              <Route path="performance" element={<InterviewResultsPage />} />
              <Route path="ai-assistant" element={<AiCareerAssistantPage />} />
              <Route path="profile" element={<LinkedInProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />

              {/* Redirect removed tutor/class routes */}
              <Route path="classes" element={<Navigate to="/student/dashboard" replace />} />
              <Route path="classes/:courseId" element={<Navigate to="/student/dashboard" replace />} />
              <Route path="materials" element={<Navigate to="/student/dashboard" replace />} />
              <Route path="assignments" element={<Navigate to="/student/dashboard" replace />} />
              <Route path="learning-hub" element={<Navigate to="/student/dashboard" replace />} />
            </Route>

            {/* Redirect legacy tutor paths to student dashboard */}
            <Route path="/tutor" element={<Navigate to="/student/dashboard" replace />} />
            <Route path="/tutor/*" element={<Navigate to="/student/dashboard" replace />} />

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
