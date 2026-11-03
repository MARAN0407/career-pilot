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

// GET /api/interview/questions?category=...&count=...&difficulty=...
router.get('/questions', (req, res) => {
  const { category, count, difficulty } = req.query;

  let pool = [...interviewQuestions];

  // Filter by category if requested
  if (category && category !== 'All' && category !== 'Mixed') {
    pool = pool.filter(q => q.category.toLowerCase() === category.toLowerCase());
  }

  // Filter by difficulty if requested
  if (difficulty && difficulty !== 'All') {
    pool = pool.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());
  }

  // If filtered pool is too small, fallback to full pool
  if (pool.length === 0) {
    pool = [...interviewQuestions];
  }

  // Shuffle pool so students get fresh, different questions every session!
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
    difficulty: q.difficulty,
    category: q.category,
    questionText: q.questionText,
    expectedKeypoints: q.expectedKeypoints
  }));

  res.json({
    success: true,
    category: category || 'Mixed Technical & Systems',
    totalPoolSize: interviewQuestions.length,
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
