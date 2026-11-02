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
  X
} from 'lucide-react';

export const ResumeAiPage: React.FC = () => {
  const [analysis, setAnalysis] = useState<ResumeAnalysisResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'bullets'>('overview');
  
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setSuccessMessage(null);

    try {
      const result = await careerService.analyzeNewResume(file);
      setAnalysis(result);
      setShowRejectModal(false);
      setRejectionDetails(null);
      setSuccessMessage(`Resume "${file.name}" verified successfully! ATS Score: ${result.atsScore}/100.`);
      setTimeout(() => setSuccessMessage(null), 6000);
    } catch (err: any) {
      console.warn('Resume validation rejected file:', err);
      // File was NOT a resume! Do NOT give ATS score!
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
      // Reset input value so same file can be selected again if needed
      if (e.target) e.target.value = '';
    }
  };

  const triggerUpload = () => {
    setShowRejectModal(false);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Test helper: simulate uploading a non-resume text file
  const testNonResume = async () => {
    const nonResumeBlob = new Blob([
      "Shopping Grocery List\n1. Apples and oranges\n2. Milk and bread\n3. Total payment due: $24.50\nThank you for shopping!"
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

  // Test helper: simulate uploading a valid resume text file
  const testValidResume = async () => {
    const validResumeBlob = new Blob([
      `Ilamaran - AI & Software Engineer
Email: ilamaran@college.edu | Phone: +1 555-0192 | GitHub: github.com/ilamaran | LinkedIn: linkedin.com/in/ilamaran

EDUCATION
Bachelor of Technology in Computer Science & AI
Apex Institute of Technology, GPA: 3.91 / 4.0
Coursework: Deep Neural Networks, Transformer Architectures, Distributed Systems, Data Structures & Algorithms

TECHNICAL SKILLS
Languages: Python, C++, TypeScript, SQL, Bash
Frameworks & ML: PyTorch, TensorFlow, FastAPI, React, Node.js, Pandas, NumPy, Scikit-learn
Tools & Infrastructure: Docker, Kubernetes, Git, PostgreSQL, REST APIs, Linux

WORK EXPERIENCE & PROJECTS
AI Systems Developer - Robotics & Vision Lab (2024 - Present)
• Engineered asynchronous deep learning inference pipelines in FastAPI and PyTorch, accelerating model throughput by 3.4x for 10,000+ daily requests.
• Implemented 12-layer ResNet vision classifiers achieving 94.8% top-1 accuracy on 50K benchmark images.
• Optimized PostgreSQL query execution speed by 42% across 2M structured records using compound indices.

CERTIFICATIONS & AWARDS
• Deep Learning Specialization Certificate (DeepLearning.AI)
• Dean’s Academic Honor List (All Semesters)`
    ], { type: 'text/plain' });
    const validResumeFile = new File([validResumeBlob], 'Ilamaran_AI_Resume.txt', { type: 'text/plain' });

    setIsScanning(true);
    try {
      const res = await careerService.analyzeNewResume(validResumeFile);
      setAnalysis(res);
      setShowRejectModal(false);
      setSuccessMessage('Verified real resume for Ilamaran! ATS Score updated to ' + res.atsScore + '/100.');
      setTimeout(() => setSuccessMessage(null), 6000);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  if (!analysis) {
    return <div className="p-8 text-center text-xs text-slate-500">Loading Resume Intelligence engine...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Success Notification Banner */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-emerald-600 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#173B63] flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#7567C7]" />
            <span>Resume Intelligence & ATS Scanner</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Strict AI resume validation, ATS syntax parsing, and quantifiable achievement optimizers
          </p>
        </div>

        {/* Upload Button */}
        <div className="flex items-center gap-2">
          <label className="px-4 py-2.5 rounded-xl bg-[#173B63] hover:bg-[#204B7D] text-white text-xs font-semibold shadow-sm transition flex items-center gap-2 cursor-pointer">
            <UploadCloud className="w-4 h-4 text-teal-300" />
            <span>{isScanning ? 'Validating Resume...' : 'Upload Resume (PDF/DOCX/TXT)'}</span>
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

      {/* Validation Test Sandbox Bar (Demonstrating Resume vs Non-Resume Handling) */}
      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <HelpCircle className="w-4 h-4 text-[#7567C7] shrink-0" />
          <span>Test ATS Differentiating Engine:</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={testNonResume}
            disabled={isScanning}
            className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-medium transition cursor-pointer"
            title="Uploads a non-resume receipt to verify rejection popup"
          >
            Test Invalid File (Receipt / Non-Resume)
          </button>
          <button
            onClick={testValidResume}
            disabled={isScanning}
            className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-[#2F9C95] border border-teal-200 font-medium transition cursor-pointer"
            title="Uploads a comprehensive AI engineering resume"
          >
            Test Valid Resume (Ilamaran)
          </button>
        </div>
      </div>

      {/* REQUIRED REJECTION POPUP MODAL: Pop "Upload Resume" if not a resume */}
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
                className="p-1 rounded-lg hover:bg-white/20 transition text-white"
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
                  The ATS Scanner cannot generate an ATS score for non-resume documents. To receive an accredited score, please upload a legitimate curriculum vitae or resume.
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

      {/* Main ATS Score Gauge */}
      <ResumeScoreGauge score={analysis.atsScore} quality={analysis.qualityRating} />

      {/* Secondary Nav Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 font-semibold border-b-2 transition ${
            activeTab === 'overview' ? 'border-[#173B63] text-[#173B63]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Section Breakdown & Audit
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`px-4 py-2.5 font-semibold border-b-2 transition ${
            activeTab === 'skills' ? 'border-[#173B63] text-[#173B63]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Skills & Missing Keywords ({analysis.missingKeywords.length})
        </button>
        <button
          onClick={() => setActiveTab('bullets')}
          className={`px-4 py-2.5 font-semibold border-b-2 transition ${
            activeTab === 'bullets' ? 'border-[#7567C7] text-[#7567C7]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          AI Bullet Point Enhancer
        </button>
      </div>

      {/* Tab 1: Section Breakdown */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {analysis.sections.map((sec, idx) => (
            <div key={idx} className="academic-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[#173B63]">{sec.name}</h3>
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
      )}

      {/* Tab 2: Skills & Missing Keywords */}
      {activeTab === 'skills' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Detected Skills */}
          <div className="academic-card p-6 space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#2F9C95]" />
              <h3 className="font-bold text-sm text-[#173B63]">Detected Skills ({analysis.detectedSkills.length})</h3>
            </div>
            <p className="text-xs text-slate-500">
              Skills extracted directly from your coursework, project descriptions, and skill headers.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {analysis.detectedSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 text-xs font-medium"
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Keywords */}
          <div className="academic-card p-6 space-y-4 border-l-4 border-l-amber-500">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-sm text-[#173B63]">Recommended Missing Keywords</h3>
            </div>
            <p className="text-xs text-slate-500">
              High-frequency recruiter search terms currently missing from your resume draft:
            </p>
            <div className="space-y-2 pt-2">
              {analysis.missingKeywords.map((kw, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-amber-50/50 rounded-lg border border-amber-200 flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-amber-950">+ {kw}</span>
                  <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded">High Demand</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: AI Bullet Enhancer */}
      {activeTab === 'bullets' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#7567C7]/10 to-[#3B82C4]/10 border border-[#7567C7]/20 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#7567C7] shrink-0" />
            <p className="text-xs text-slate-700">
              Our AI transforms vague task descriptions into quantified, high-impact achievements using industry standard XYZ formula: <em>"Accomplished [X] as measured by [Y], by doing [Z]"</em>.
            </p>
          </div>

          <div className="space-y-4">
            {analysis.bulletPointOptimizations.map((item, idx) => (
              <div key={idx} className="academic-card p-6 space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Original Resume Bullet:</span>
                  <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200 line-through">
                    "{item.original}"
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-emerald-600 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" />
                    AI Optimized High-Impact Version:
                  </span>
                  <p className="text-xs font-medium text-slate-800 bg-emerald-50/60 p-3 rounded-lg border border-emerald-200 leading-relaxed">
                    "{item.improved}"
                  </p>
                </div>

                <div className="text-[11px] text-slate-500 italic bg-slate-50 p-2.5 rounded border border-slate-100">
                  <strong>Why this scores higher:</strong> {item.impactReason}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
