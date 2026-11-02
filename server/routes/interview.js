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

// GET /api/interview/questions
router.get('/questions', (req, res) => {
  // Map out questions for the candidate studio (without exposing the hidden model answers directly during the test)
  const candidateQuestions = interviewQuestions.map(q => ({
    id: q.id,
    questionNumber: q.questionNumber,
    totalQuestions: q.totalQuestions,
    role: q.role,
    difficulty: q.difficulty,
    category: q.category,
    questionText: q.questionText,
    expectedKeypoints: q.expectedKeypoints
  }));

  res.json({ success: true, questions: candidateQuestions });
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
      questionId: 'q_01',
      question: interviewQuestions[0].questionText,
      answerText: interviewQuestions[0].modelAnswer
    },
    {
      questionId: 'q_02',
      question: interviewQuestions[1].questionText,
      answerText: interviewQuestions[1].modelAnswer
    },
    {
      questionId: 'q_03',
      question: interviewQuestions[2].questionText,
      answerText: interviewQuestions[2].modelAnswer
    },
    {
      questionId: 'q_04',
      question: interviewQuestions[3].questionText,
      answerText: interviewQuestions[3].modelAnswer
    },
    {
      questionId: 'q_05',
      question: interviewQuestions[4].questionText,
      answerText: interviewQuestions[4].modelAnswer
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
