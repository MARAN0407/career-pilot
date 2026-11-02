import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { extractTextFromFile, validateAndDifferentiateResume, analyzeResumeATS } from '../resumeEngine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RESUME_STORE_FILE = path.join(__dirname, '..', 'data', 'latestResume.json');

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

function getStoredResume() {
  try {
    if (fs.existsSync(RESUME_STORE_FILE)) {
      return JSON.parse(fs.readFileSync(RESUME_STORE_FILE, 'utf-8'));
    }
  } catch (err) {
    console.warn('Error reading latestResume.json', err.message);
  }
  return null;
}

function storeResume(data) {
  try {
    fs.writeFileSync(RESUME_STORE_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving latestResume.json', err.message);
  }
}

// GET /api/resume/latest
router.get('/latest', (req, res) => {
  const stored = getStoredResume();
  if (stored) {
    return res.json({ success: true, isResume: true, data: stored });
  }

  // Fallback initial benchmark
  const initial = analyzeResumeATS(
    `Ilamaran
Computer Science & AI Engineering
Apex Institute of Technology • GPA: 3.88
Email: ilamaran@college.edu | LinkedIn: linkedin.com/in/ilamaran | GitHub: github.com/ilamaran

EDUCATION
Bachelor of Technology in Computer Science & AI (2022 - 2026)
Coursework: Deep Learning, Neural Networks, Distributed Systems, Data Structures & Algorithms

TECHNICAL SKILLS
Languages: Python, C++, TypeScript, SQL
Frameworks & Libraries: PyTorch, TensorFlow, FastAPI, React, Node.js, Pandas, NumPy
Tools & Platforms: Docker, Git, Linux, PostgreSQL, REST APIs

EXPERIENCE & PROJECTS
Deep Learning ResNet Classifier: Architected a 12-layer ResNet model in PyTorch, achieving 94.2% accuracy.
Enterprise AI Assistant: Built asynchronous REST APIs with FastAPI and PostgreSQL handling 1,200+ requests.`,
    'Ilamaran_AI_Resume.pdf'
  );

  res.json({ success: true, isResume: true, data: initial });
});

// POST /api/resume/analyze
router.post('/analyze', upload.single('resumeFile'), async (req, res) => {
  try {
    let fileText = '';
    let filename = 'document.txt';

    if (req.file) {
      filename = req.file.originalname;
      fileText = await extractTextFromFile(req.file.buffer, filename, req.file.mimetype);
    } else if (req.body && req.body.text) {
      fileText = req.body.text;
      filename = req.body.filename || 'Pasted_Resume_Text.txt';
    } else {
      return res.status(400).json({
        success: false,
        isResume: false,
        error: 'No file or resume content was uploaded. Please upload your resume in PDF, DOCX, or TXT format.'
      });
    }

    // 1. Differentiate whether it is actually a resume or not!
    const validation = validateAndDifferentiateResume(fileText, filename);

    if (!validation.isResume) {
      // Must NOT return an ATS score! Must alert user that uploaded file is not a resume.
      return res.status(422).json({
        success: false,
        isResume: false,
        error: validation.reason,
        filename,
        detectedSections: validation.detectedSections || [],
        missingSections: validation.missingSections || ['Education', 'Experience', 'Technical Skills']
      });
    }

    // 2. Verified as a genuine resume! Calculate ATS score and section audit
    const analysisResult = analyzeResumeATS(fileText, filename);
    storeResume(analysisResult);

    return res.json({
      success: true,
      isResume: true,
      message: `Resume "${filename}" verified and evaluated successfully.`,
      data: analysisResult
    });
  } catch (err) {
    console.error('Error in /api/resume/analyze:', err);
    res.status(500).json({
      success: false,
      isResume: false,
      error: 'An internal error occurred while parsing the resume file. Please ensure it is a valid PDF or DOCX file.'
    });
  }
});

export default router;
