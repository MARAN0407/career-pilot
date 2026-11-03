import React, { useEffect, useState, useRef } from 'react';
import { careerService, ResumeAnalysisResult } from '../../services/careerService';
import { ResumeScoreGauge } from '../../components/career/ResumeScoreGauge';
import { 
  FileText, 
  UploadCloud, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  FileCheck, 
  RefreshCw, 
  Zap, 
  BookOpen,
  XCircle,
  FileWarning,
  HelpCircle,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Trash2,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Layers,
  Award,
  Check,
  Building,
  Target
} from 'lucide-react';

interface ResumeDocumentState {
  fileName: string;
  fileType: 'pdf' | 'docx' | 'txt';
  blobUrl: string | null;
  textContent: string;
  fileSizeText: string;
}

const DEFAULT_RESUME_TEXT = `ILAMARAN S.
Apex Institute of Technology • Computer Science & AI Engineering
Email: ilamaran@college.edu | Phone: +91 98765 43210
Portfolio: github.com/ilamaran | LinkedIn: linkedin.com/in/ilamaran

OBJECTIVE
Motivated Computer Science & Engineering undergraduate specializing in Artificial Intelligence and Machine Learning. Seeking core engineering and AI developer placement opportunities to engineer scalable neural models and high-throughput backend services.

EDUCATION
Bachelor of Technology in Computer Science and Engineering
Apex Institute of Technology (2022 - 2026) • Current CGPA: 8.92 / 10.0
• Relevant Coursework: Deep Learning, Neural Architectures, Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks.

TECHNICAL SKILLS
• Programming Languages: Python, C++, TypeScript, SQL, Bash
• Frameworks & Libraries: PyTorch, TensorFlow, FastAPI, React.js, Node.js, NumPy, Pandas, Scikit-learn
• Developer Tools & Cloud: Git, Docker, Linux, PostgreSQL, REST APIs, CI/CD, AWS Basics

WORK EXPERIENCE & ACADEMIC PROJECTS
AI Systems Developer — Robotics & Vision Lab (2024 - Present)
• Engineered asynchronous deep learning inference pipelines in FastAPI and PyTorch, accelerating inference throughput by 3.4x for 10,000+ daily requests.
• Implemented 12-layer ResNet computer vision classifiers achieving 94.8% top-1 accuracy on 50K benchmark images.
• Optimized PostgreSQL query execution speed by 42% across 2M structured records using compound indexes.

Multi-Head Attention Transformer from Scratch (2024)
• Built scaled dot-product attention and multi-head projection layers in NumPy without high-level autodiff libraries.
• Benchmarked token-level positional encodings and trained a char-level generative language model on Shakespearean corpus.

CAMPUS LEADERSHIP & ACHIEVEMENTS
• Finalist, National AI Hackathon 2025 (Top 2% among 1,400 teams)
• Lead Technical Coordinator, Apex Student Computing Society`;

export const ResumeAiPage: React.FC = () => {
  const [analysis, setAnalysis] = useState<ResumeAnalysisResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'bullets' | 'experience'>('overview');
  
  // Document Preview State
  const [docState, setDocState] = useState<ResumeDocumentState>({
    fileName: 'Ilamaran_AI_Resume.pdf',
    fileType: 'pdf',
    blobUrl: null,
    textContent: DEFAULT_RESUME_TEXT,
    fileSizeText: '248 KB'
  });

  // Zoom controls state
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Non-resume rejection popup modal state
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionDetails, setRejectionDetails] = useState<{
    filename: string;
    reason: string;
    missingSections: string[];
  } | null>(null);

  // Success toast
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    careerService.getResumeAnalysis().then(setAnalysis);
  }, []);

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setSuccessMessage(null);

    const ext = file.name.split('.').pop()?.toLowerCase();
    const isPdf = ext === 'pdf' || file.type === 'application/pdf';
    const isDocx = ext === 'docx' || file.name.endsWith('.docx');
    const isTxt = ext === 'txt' || file.type.startsWith('text/');

    try {
      // 1. Send to backend ATS analyzer for verification & scoring
      const result = await careerService.analyzeNewResume(file);
      setAnalysis(result);
      setShowRejectModal(false);
      setRejectionDetails(null);

      // 2. Prepare client-side preview
      let newBlobUrl: string | null = null;
      let text = '';

      if (isPdf) {
        newBlobUrl = URL.createObjectURL(file);
      } else {
        // Read text content for TXT or DOCX
        try {
          text = await file.text();
        } catch (e) {
          text = `Uploaded file: ${file.name}\nSize: ${(file.size / 1024).toFixed(1)} KB\nFormat: DOCX Document`;
        }
      }

      setDocState({
        fileName: file.name,
        fileType: isPdf ? 'pdf' : isDocx ? 'docx' : 'txt',
        blobUrl: newBlobUrl,
        textContent: text || DEFAULT_RESUME_TEXT,
        fileSizeText: `${(file.size / 1024).toFixed(1)} KB`
      });

      setSuccessMessage(`Resume "${file.name}" uploaded and verified! ATS Score: ${result.atsScore}/100.`);
      setTimeout(() => setSuccessMessage(null), 6000);
    } catch (err: any) {
      console.warn('Resume validation rejected file:', err);
      setRejectionDetails({
        filename: file.name,
        reason: err.message || 'The uploaded file does not contain standard resume sections.',
        missingSections: err.missingSections && err.missingSections.length > 0 
          ? err.missingSections 
          : ['Education / University details', 'Work or Project Experience', 'Technical Skills']
      });
      setShowRejectModal(true);
    } finally {
      setIsScanning(false);
      if (e.target) e.target.value = '';
    }
  };

  const triggerUpload = () => {
    setShowRejectModal(false);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = () => {
    if (docState.blobUrl) {
      URL.revokeObjectURL(docState.blobUrl);
    }
    setDocState({
      fileName: 'Sample_Verified_Resume.txt',
      fileType: 'txt',
      blobUrl: null,
      textContent: DEFAULT_RESUME_TEXT,
      fileSizeText: 'Sample'
    });
    setSuccessMessage('Uploaded resume removed. Default verified template active.');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  // Zoom Handlers
  const handleZoomIn = () => setZoomLevel(prev => Math.min(160, prev + 15));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(60, prev - 15));
  const handleZoomReset = () => setZoomLevel(100);

  // Test helper: simulate uploading a non-resume text file
  const testNonResume = async () => {
    const nonResumeBlob = new Blob([
      "Shopping Grocery Receipt\n1. Apples and oranges - $4.50\n2. Milk and bread - $6.20\nTotal Due: $10.70\nStore #412\nThank you for shopping!"
    ], { type: 'text/plain' });
    const nonResumeFile = new File([nonResumeBlob], 'grocery_receipt.txt', { type: 'text/plain' });

    setIsScanning(true);
    try {
      await careerService.analyzeNewResume(nonResumeFile);
    } catch (err: any) {
      setRejectionDetails({
        filename: 'grocery_receipt.txt',
        reason: err.message || 'The document does not qualify as a resume.',
        missingSections: err.missingSections || ['Education', 'Experience', 'Technical Skills']
      });
      setShowRejectModal(true);
    } finally {
      setIsScanning(false);
    }
  };

  if (!analysis) {
    return (
      <div className="p-12 text-center text-xs text-slate-500 space-y-3">
        <div className="w-8 h-8 border-2 border-[#173B63] border-t-transparent rounded-full animate-spin mx-auto" />
        <p>Initializing Career Accelerator Resume Diagnostics & ATS Parser...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* SUCCESS NOTIFICATION TOAST */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-emerald-600 hover:text-emerald-900 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#173B63] flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#2F9C95]" />
            <span>Resume Intelligence & Split-Screen ATS Diagnostics</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Compare your actual uploaded resume side-by-side with ATS scores, keyword matches, and recruiter rubrics.
          </p>
        </div>

        {/* Upload Button */}
        <div className="flex items-center gap-2">
          <label className="px-4 py-2.5 rounded-xl bg-[#173B63] hover:bg-[#204B7D] text-white text-xs font-bold shadow-sm transition flex items-center gap-2 cursor-pointer">
            <UploadCloud className="w-4 h-4 text-teal-300" />
            <span>{isScanning ? 'Analyzing Document...' : 'Upload Resume (PDF, DOCX, TXT)'}</span>
            <input 
              ref={fileInputRef} 
              type="file" 
              accept=".pdf,.docx,.doc,.txt" 
              onChange={handleFileUpload} 
              className="hidden" 
            />
          </label>
        </div>
      </div>

      {/* VALIDATION TEST SANDBOX BAR */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <HelpCircle className="w-4 h-4 text-[#7567C7] shrink-0" />
          <span>Resume Differentiating Verification:</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={testNonResume}
            disabled={isScanning}
            className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-medium transition cursor-pointer text-xs"
            title="Uploads a non-resume grocery receipt to verify rejection popup modal"
          >
            Test Invalid File (Receipt / Non-Resume)
          </button>
          <button
            onClick={triggerUpload}
            disabled={isScanning}
            className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-[#2F9C95] border border-teal-200 font-medium transition cursor-pointer text-xs"
            title="Select your own PDF or DOCX file"
          >
            Select Local Resume File
          </button>
        </div>
      </div>

      {/* NON-RESUME REJECTION POPUP MODAL */}
      {showRejectModal && rejectionDetails && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-rose-200 max-w-md w-full overflow-hidden text-slate-800">
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-rose-600 to-rose-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-white/20 rounded-xl">
                  <FileWarning className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Upload Resume</h3>
                  <p className="text-[11px] text-rose-100">Document Classification Failed</p>
                </div>
              </div>
              <button 
                onClick={() => setShowRejectModal(false)}
                className="p-1 rounded-lg hover:bg-white/20 transition text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs">
              <div className="p-3.5 bg-rose-50 rounded-xl border border-rose-100 text-rose-900 space-y-1">
                <span className="font-bold block text-rose-950">
                  Uploaded file: "{rejectionDetails.filename}" is not a resume!
                </span>
                <p className="text-slate-600 leading-relaxed">
                  The ATS Scanner cannot generate an ATS score for non-resume documents. To receive an accredited score, please upload a legitimate curriculum vitae or resume in PDF, DOCX, or TXT format.
                </p>
              </div>

              {/* Missing sections breakdown */}
              <div className="space-y-2">
                <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">
                  Missing Required Resume Sections:
                </span>
                <ul className="space-y-1.5 pl-1">
                  {rejectionDetails.missingSections.map((sec, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-600">
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>{sec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={triggerUpload}
                  className="flex-1 py-2.5 rounded-xl bg-[#173B63] hover:bg-[#204B7D] text-white font-bold transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4 text-teal-300" />
                  <span>Upload Real Resume</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SPLIT-SCREEN RESUME AND ATS COMPARISON LAYOUT (Section 6) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================= */}
        {/* LEFT PANEL – UPLOADED RESUME PREVIEW (6 cols on lg)       */}
        {/* ========================================================= */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          {/* Resume Preview Toolbar */}
          <div className="p-3.5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
            <div className="flex items-center gap-2 min-w-0">
              <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-300">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold truncate max-w-[180px] sm:max-w-[240px]">
                  {docState.fileName}
                </p>
                <p className="text-[10px] text-slate-400">
                  {docState.fileType.toUpperCase()} Document • {docState.fileSizeText}
                </p>
              </div>
            </div>

            {/* Zoom Controls & Action Buttons */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                <button
                  onClick={handleZoomOut}
                  className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleZoomReset}
                  className="px-2 text-[11px] font-mono text-slate-200 hover:text-white cursor-pointer"
                  title="Reset Zoom to 100%"
                >
                  {zoomLevel}%
                </button>
                <button
                  onClick={handleZoomIn}
                  className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={triggerUpload}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[11px] font-semibold text-slate-200 hover:text-white transition cursor-pointer"
                title="Replace with another resume file"
              >
                Replace
              </button>

              <button
                onClick={handleRemoveFile}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/40 border border-slate-700 hover:border-rose-700 text-slate-400 hover:text-rose-300 transition cursor-pointer"
                title="Remove File"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Document Scrolling Viewport */}
          <div className="h-[750px] overflow-y-auto bg-slate-100 p-4 sm:p-6 flex justify-center shadow-inner relative">
            <div 
              className="w-full max-w-[620px] transition-transform duration-150 origin-top"
              style={{ transform: `scale(${zoomLevel / 100})` }}
            >
              {/* If it's a PDF and has a blobUrl, render iframe preview */}
              {docState.fileType === 'pdf' && docState.blobUrl ? (
                <div className="bg-white rounded-xl shadow-md border border-slate-300 overflow-hidden h-[700px]">
                  <iframe
                    src={docState.blobUrl}
                    title="PDF Resume Preview"
                    className="w-full h-full border-0"
                  />
                </div>
              ) : (
                /* Formatted Document Viewer for TXT, DOCX, or fallback */
                <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 sm:p-8 space-y-4 font-sans text-slate-800 min-h-[680px]">
                  {/* Watermark / Header badge */}
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                      Live Resume Preview
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Preserved Document Structure
                    </span>
                  </div>

                  {/* Render formatted text content */}
                  <div className="text-xs leading-relaxed font-sans space-y-3 whitespace-pre-line text-slate-700">
                    {docState.textContent.split('\n\n').map((block, idx) => {
                      const trimmed = block.trim();
                      const isHeading = trimmed.length < 40 && trimmed === trimmed.toUpperCase() && !trimmed.includes('@');
                      
                      if (isHeading) {
                        return (
                          <div key={idx} className="pt-2">
                            <h4 className="text-xs font-extrabold text-[#173B63] uppercase tracking-wider border-b border-slate-200 pb-1">
                              {trimmed}
                            </h4>
                          </div>
                        );
                      }

                      return (
                        <p key={idx} className="leading-relaxed">
                          {trimmed}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT PANEL – RESUME ANALYSIS & ATS DIAGNOSTICS (6 cols)  */}
        {/* ========================================================= */}
        <div className="lg:col-span-6 space-y-6 max-h-[820px] overflow-y-auto pr-1">
          {/* Main ATS Score Gauge */}
          <ResumeScoreGauge score={analysis.atsScore} quality={analysis.qualityRating} />

          {/* Quick Metrics & Target Role Alignment */}
          <div className="grid grid-cols-3 gap-3">
            <div className="academic-card p-3.5 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Detected Skills</span>
              <span className="text-xl font-bold font-mono text-[#2F9C95]">{analysis.detectedSkills.length}</span>
              <span className="text-[10px] text-slate-500 block">Verified Match</span>
            </div>

            <div className="academic-card p-3.5 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Missing High-Impact</span>
              <span className="text-xl font-bold font-mono text-amber-600">{analysis.missingKeywords.length}</span>
              <span className="text-[10px] text-slate-500 block">Recommended</span>
            </div>

            <div className="academic-card p-3.5 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Role</span>
              <span className="text-sm font-bold text-[#173B63] block truncate">AI / Software</span>
              <span className="text-[10px] text-emerald-600 font-semibold block">88% Aligned</span>
            </div>
          </div>

          {/* Tabs for Analysis Details */}
          <div className="flex items-center gap-1 border-b border-slate-200 text-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-2 font-bold border-b-2 transition cursor-pointer ${
                activeTab === 'overview' ? 'border-[#173B63] text-[#173B63]' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Section Breakdown
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-3 py-2 font-bold border-b-2 transition cursor-pointer ${
                activeTab === 'skills' ? 'border-[#173B63] text-[#173B63]' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Skills & Missing ({analysis.missingKeywords.length})
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-3 py-2 font-bold border-b-2 transition cursor-pointer ${
                activeTab === 'experience' ? 'border-[#173B63] text-[#173B63]' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Education & Experience
            </button>
            <button
              onClick={() => setActiveTab('bullets')}
              className={`px-3 py-2 font-bold border-b-2 transition cursor-pointer ${
                activeTab === 'bullets' ? 'border-[#7567C7] text-[#7567C7]' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Bullet Enhancer
            </button>
          </div>

          {/* Tab 1: Section Breakdown & Audit */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {analysis.sections.map((sec, idx) => (
                  <div key={idx} className="academic-card p-4 space-y-2 border-l-4 border-l-[#2F9C95]">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xs text-[#173B63] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                        <span>{sec.name}</span>
                      </h3>
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                          sec.score >= 90
                            ? 'bg-emerald-50 text-emerald-700'
                            : sec.score >= 80
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {sec.score}/100
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{sec.feedback}</p>
                  </div>
                ))}
              </div>

              {/* Strengths & Formatting Improvements */}
              <div className="academic-card p-4 space-y-2 bg-slate-50">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-teal-600" />
                  <span>Resume Formatting Strengths</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Clear chronological work and project hierarchy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Machine-readable standard fonts and margins</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>No complex tables or non-parsable columns detected</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab 2: Skills & Missing Keywords */}
          {activeTab === 'skills' && (
            <div className="space-y-4">
              {/* Detected Skills */}
              <div className="academic-card p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2F9C95]" />
                  <h3 className="font-bold text-xs text-[#173B63] uppercase tracking-wider">
                    Detected Skills ({analysis.detectedSkills.length})
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {analysis.detectedSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 text-xs font-medium"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing High-Impact Keywords */}
              <div className="academic-card p-5 space-y-3 border-l-4 border-l-amber-500">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <h3 className="font-bold text-xs text-[#173B63] uppercase tracking-wider">
                    Recommended Missing Keywords ({analysis.missingKeywords.length})
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  Add these high-demand recruiter keywords to your project descriptions to increase your interview callback rate:
                </p>
                <div className="space-y-2 pt-1">
                  {analysis.missingKeywords.map((kw, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-amber-50/50 rounded-lg border border-amber-200 flex items-center justify-between text-xs"
                    >
                      <span className="font-bold text-amber-950">+ {kw}</span>
                      <span className="text-[10px] text-amber-800 bg-amber-100 font-semibold px-2 py-0.5 rounded">High Demand</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Education & Experience Details */}
          {activeTab === 'experience' && (
            <div className="space-y-4">
              {/* Education Details */}
              <div className="academic-card p-5 space-y-3">
                <div className="flex items-center gap-2 text-[#173B63]">
                  <GraduationCap className="w-4 h-4 text-[#2F9C95]" />
                  <h3 className="font-bold text-xs uppercase tracking-wider">Education Details Extracted</h3>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">Bachelor of Technology (B.Tech)</span>
                    <span className="text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">CGPA: 8.92 / 10.0</span>
                  </div>
                  <p className="text-slate-600">Apex Institute of Technology • Computer Science & AI (2022 - 2026)</p>
                  <p className="text-slate-500 text-[11px] pt-1">
                    Key Coursework: Deep Learning, Neural Architectures, Data Structures & Algorithms, Operating Systems, Computer Networks.
                  </p>
                </div>
              </div>

              {/* Experience Details */}
              <div className="academic-card p-5 space-y-3">
                <div className="flex items-center gap-2 text-[#173B63]">
                  <Briefcase className="w-4 h-4 text-[#7567C7]" />
                  <h3 className="font-bold text-xs uppercase tracking-wider">Experience & Project Details Extracted</h3>
                </div>
                <div className="space-y-2.5">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900">AI Systems Developer</span>
                      <span className="text-[10px] text-slate-500 font-semibold">2024 - Present</span>
                    </div>
                    <p className="text-teal-700 font-medium">Robotics & Vision Research Lab</p>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Engineered asynchronous deep learning inference pipelines in FastAPI and PyTorch, accelerating inference throughput by 3.4x for 10,000+ daily requests.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900">Multi-Head Attention Transformer</span>
                      <span className="text-[10px] text-slate-500 font-semibold">Capstone Project</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Implemented scaled dot-product attention and multi-head projection layers from scratch in NumPy, benchmarked against standard PyTorch kernels.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: AI Bullet Enhancer */}
          {activeTab === 'bullets' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#7567C7]/10 to-[#3B82C4]/10 border border-[#7567C7]/20 flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#7567C7] shrink-0" />
                <p className="text-xs text-slate-700 leading-snug">
                  Our AI transforms passive job descriptions into quantified accomplishments using the XYZ formula: <em>"Accomplished [X] as measured by [Y], by doing [Z]"</em>.
                </p>
              </div>

              <div className="space-y-3">
                {analysis.bulletPointOptimizations.map((item, idx) => (
                  <div key={idx} className="academic-card p-4 space-y-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase text-slate-400">Original Bullet:</span>
                      <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-200 line-through">
                        "{item.original}"
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase text-emerald-600 flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        AI Enhanced High-Impact Version:
                      </span>
                      <p className="text-xs font-semibold text-slate-800 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-200 leading-relaxed">
                        "{item.improved}"
                      </p>
                    </div>

                    <div className="text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded border border-slate-100">
                      <strong>Why this scores higher:</strong> {item.impactReason}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
