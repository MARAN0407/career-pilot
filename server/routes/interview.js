import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { interviewQuestions } from '../questionsData.js';
import { evaluateInterviewAnswers } from '../interviewEvaluator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');
const LATEST_REPORT_FILE = path.join(DATA_DIR, 'latestInterview.json');
const HISTORY_FILE = path.join(DATA_DIR, 'interviewHistory.json');

const router = express.Router();

function getLatestStoredReport() {
  try {
    if (fs.existsSync(LATEST_REPORT_FILE)) {
      return JSON.parse(fs.readFileSync(LATEST_REPORT_FILE, 'utf-8'));
    }
  } catch (e) {
    console.warn('Error reading latestInterview.json', e.message);
  }
  return null;
}

function getStoredHistory() {
  try {
    if (fs.existsSync(HISTORY_FILE)) {
      return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
    }
  } catch (e) {
    console.warn('Error reading interviewHistory.json', e.message);
  }
  return [];
}

function saveReport(report) {
  try {
    fs.writeFileSync(LATEST_REPORT_FILE, JSON.stringify(report, null, 2), 'utf-8');
    const history = getStoredHistory();
    history.unshift(report);
    // Keep last 30 reports
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history.slice(0, 30), null, 2), 'utf-8');
  } catch (e) {
    console.error('Error saving interview report', e.message);
  }
}

// Utility: Fisher-Yates array shuffle
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

import { generateSubjectQuestions } from '../subjectQuestionEngine.js';
import { getSubjectsForDepartment, isValidDepartment, DEPARTMENT_SUBJECTS } from '../departmentSubjects.js';
import { generateHrQuestions } from '../hrQuestions.js';
import { generateStarQuestions } from '../starQuestions.js';

// GET /api/interview/questions?department=...&subject=...&category=...&count=...&difficulty=...&round=...
router.get('/questions', (req, res) => {
  let { department, subject, category, count = 5, difficulty = 'Intermediate', round = 'technical' } = req.query;

  // Department handling
  if (!department || department === 'all' || department === 'All') {
    department = 'Computer Science and Engineering (CSE)';
  }

  const normalizedRound = (round || 'technical').toLowerCase();
  const qCount = Math.min(12, Math.max(3, parseInt(count, 10) || 5));

  try {
    // 1. HR Round
    if (normalizedRound === 'hr' || normalizedRound.includes('hr')) {
      const hrQuestions = generateHrQuestions(department, qCount);
      return res.json({
        success: true,
        department,
        round: 'HR Round',
        subject: 'HR & Behavioral Evaluation',
        difficulty,
        totalQuestions: hrQuestions.length,
        questions: hrQuestions
      });
    }

    // 2. STAR Leadership Round
    if (normalizedRound === 'star' || normalizedRound.includes('leadership')) {
      const starQuestions = generateStarQuestions(department, qCount);
      return res.json({
        success: true,
        department,
        round: 'Star Leadership Round',
        subject: 'STAR Leadership & Crisis Scenarios',
        difficulty,
        totalQuestions: starQuestions.length,
        questions: starQuestions
      });
    }

    // 3. Technical Domain Round (Default)
    // Target subject: prefer subject parameter, fallback to category if it's a valid subject
    let targetSubject = subject;
    if (!targetSubject && category && category !== 'all' && category !== 'Mixed') {
      targetSubject = category;
    }

    // If still no subject, pick the first subject from that department
    if (!targetSubject) {
      const deptSubjects = getSubjectsForDepartment(department);
      if (deptSubjects && deptSubjects.length > 0) {
        targetSubject = deptSubjects[0];
      } else {
        targetSubject = 'Programming in C and Data Structures';
      }
    }

    const rawQuestions = generateSubjectQuestions(department, targetSubject, difficulty, qCount * 2);
    const shuffled = shuffleArray(rawQuestions);
    const questions = shuffled.slice(0, qCount).map((q, i) => ({
      ...q,
      questionNumber: i + 1,
      totalQuestions: qCount
    }));

    return res.json({
      success: true,
      department,
      round: 'Technical Domain Round',
      subject: targetSubject,
      difficulty,
      totalQuestions: questions.length,
      questions
    });
  } catch (err) {
    console.error('Error generating interview questions:', err.message);
    return res.status(400).json({
      success: false,
      message: err.message,
      department,
      round: normalizedRound
    });
  }
});

// POST /api/interview/evaluate
router.post('/evaluate', (req, res) => {
  const { type = 'camera', answers = [] } = req.body;

  if (!Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Answers array is required for evaluation.'
    });
  }

  // Evaluate responses against genuine rubrics & model answers
  const report = evaluateInterviewAnswers(type, answers);
  saveReport(report);

  res.json({
    success: true,
    message: 'Interview evaluated successfully',
    report
  });
});

// GET /api/interview/latest?department=...
router.get('/latest', (req, res) => {
  const { department } = req.query;
  const history = getStoredHistory();
  
  if (department && department !== 'all') {
    const matching = history.find(r => r.department && r.department.toLowerCase().includes(department.toLowerCase()));
    if (matching) {
      return res.json({ success: true, report: matching });
    }
  }

  const report = getLatestStoredReport();
  if (report) {
    if (department && department !== 'all' && report.department && !report.department.toLowerCase().includes(department.toLowerCase())) {
      // Doesn't match requested department
      return res.json({ success: true, report: null });
    }
    return res.json({ success: true, report });
  }

  // Strictly no fabricated report
  res.json({ success: true, report: null });
});

// GET /api/interview/history?department=...
router.get('/history', (req, res) => {
  const { department } = req.query;
  let history = getStoredHistory();

  if (department && department !== 'all') {
    history = history.filter(item => 
      item.department && item.department.toLowerCase().includes(department.toLowerCase())
    );
  }

  res.json({ success: true, history });
});

export default router;
