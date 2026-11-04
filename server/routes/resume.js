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

function getStoredResume(department) {
  try {
    if (fs.existsSync(RESUME_STORE_FILE)) {
      const data = JSON.parse(fs.readFileSync(RESUME_STORE_FILE, 'utf-8'));
      if (department && data.department && data.department !== department) {
        return null;
      }
      return data;
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

// GET /api/resume/latest?department=...
router.get('/latest', (req, res) => {
  const { department } = req.query;
  const stored = getStoredResume(department);
  if (stored) {
    return res.json({ success: true, isResume: true, data: stored });
  }

  // Pure clean state when no resume has been uploaded by the user
  return res.json({ success: true, isResume: false, data: null });
});

// POST /api/resume/analyze
router.post('/analyze', upload.single('resumeFile'), async (req, res) => {
  try {
    let fileText = '';
    let filename = 'document.txt';
    const department = req.body?.department || req.query?.department || '';

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
        error: 'Please upload a valid resume.'
      });
    }

    // 1. Differentiate whether it is actually a resume, and whether it matches user's department
    const validation = validateAndDifferentiateResume(fileText, filename, department);

    if (!validation.isResume) {
      return res.status(422).json({
        success: false,
        isResume: false,
        departmentMismatch: false,
        error: 'Please upload a valid resume.',
        filename,
        detectedSections: validation.detectedSections || [],
        missingSections: validation.missingSections || ['Education / University details', 'Work or Project Experience', 'Technical Skills']
      });
    }

    if (validation.departmentMismatch) {
      return res.status(422).json({
        success: false,
        isResume: true,
        departmentMismatch: true,
        error: 'Please upload a resume corresponding to your selected department.',
        filename,
        targetDepartment: validation.targetDepartment,
        conflictingDepartment: validation.conflictingDepartment
      });
    }

    // 2. Verified as genuine department-aligned resume! Calculate ATS score and diagnostics
    const analysisResult = analyzeResumeATS(fileText, filename, department);
    storeResume(analysisResult);

    return res.json({
      success: true,
      isResume: true,
      message: `Resume "${filename}" verified and evaluated successfully for ${department || 'your department'}.`,
      data: analysisResult
    });
  } catch (err) {
    console.error('Error in /api/resume/analyze:', err);
    res.status(500).json({
      success: false,
      isResume: false,
      error: 'Please upload a valid resume.'
    });
  }
});

export default router;
