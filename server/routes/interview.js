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

// GET /api/interview/questions?department=...&category=...&count=...&difficulty=...
router.get('/questions', (req, res) => {
  const { department, category, count, difficulty } = req.query;

  let pool = [...interviewQuestions];

  // 1. Department-based filtering
  let deptCode = null;
  if (department && department !== 'All' && department !== 'all') {
    const dUpper = department.toUpperCase();
    if (dUpper.includes('ELECTRONIC') || dUpper.includes('ECE') || dUpper.includes('COMMUNICATION')) deptCode = 'ECE';
    else if (dUpper.includes('COMPUTER') || dUpper.includes('CSE') || dUpper.includes('SOFTWARE')) deptCode = 'CSE';
    else if (dUpper.includes('AI') || dUpper.includes('ARTIFICIAL') || dUpper.includes('DATA SCIENCE') || dUpper.includes('MACHINE LEARNING')) deptCode = 'AI & ML';
    else if (dUpper.includes('ELECTRICAL') || dUpper.includes('EEE') || dUpper.includes('POWER')) deptCode = 'EEE';
    else if (dUpper.includes('MECHANICAL') || dUpper.includes('MECH')) deptCode = 'MECH';
    else if (dUpper.includes('CIVIL') || dUpper.includes('STRUCT')) deptCode = 'CIVIL';
    else if (dUpper.includes('INFO') || dUpper.includes('IT')) deptCode = 'CSE';

    if (deptCode) {
      pool = interviewQuestions.filter(q => q.department === deptCode || q.department === 'COMMON');
    }
  }

  // 2. Category filtering
  if (category && category !== 'All' && category !== 'all' && category !== 'Mixed') {
    const catLower = category.toLowerCase();
    const catFiltered = pool.filter(q => 
      q.category.toLowerCase() === catLower ||
      q.category.toLowerCase().includes(catLower) ||
      catLower.includes(q.category.toLowerCase())
    );
    if (catFiltered.length > 0) {
      pool = catFiltered;
    }
  }

  // 3. Difficulty filtering
  if (difficulty && difficulty !== 'All') {
    const diffFiltered = pool.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());
    if (diffFiltered.length > 0) pool = diffFiltered;
  }

  // Fallback to full pool if somehow empty
  if (pool.length === 0) {
    pool = [...interviewQuestions];
  }

  // Shuffle pool using Fisher-Yates
  const shuffled = shuffleArray(pool);

  // Take requested count (default 5, min 3, max 15)
  const questionCount = Math.min(15, Math.max(3, parseInt(count, 10) || 5));
  const selected = shuffled.slice(0, questionCount);

  // Map out questions with dynamic numbering
  const candidateQuestions = selected.map((q, idx) => ({
    id: q.id,
    questionNumber: idx + 1,
    totalQuestions: selected.length,
    role: q.role,
    department: q.department,
    departmentName: q.departmentName,
    difficulty: q.difficulty,
    category: q.category,
    questionText: q.questionText,
    expectedKeypoints: q.expectedKeypoints
  }));

  res.json({
    success: true,
    department: deptCode || department || 'General Engineering',
    category: category || 'Department Core & Systems',
    totalPoolSize: pool.length,
    questions: candidateQuestions
  });
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

// GET /api/interview/latest
router.get('/latest', (req, res) => {
  const report = getLatestStoredReport();
  if (report) {
    return res.json({ success: true, report });
  }

  // Fallback initial benchmark evaluation
  const initialBenchmark = evaluateInterviewAnswers('camera', [
    {
      questionId: interviewQuestions[0].id,
      question: interviewQuestions[0].questionText,
      answerText: interviewQuestions[0].modelAnswer
    },
    {
      questionId: interviewQuestions[1].id,
      question: interviewQuestions[1].questionText,
      answerText: interviewQuestions[1].modelAnswer
    },
    {
      questionId: interviewQuestions[2].id,
      question: interviewQuestions[2].questionText,
      answerText: interviewQuestions[2].modelAnswer
    }
  ]);

  res.json({ success: true, report: initialBenchmark });
});

// GET /api/interview/history
router.get('/history', (req, res) => {
  const history = getStoredHistory();
  res.json({ success: true, history });
});

export default router;
