import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
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

export const ResumeAiPage: React.FC = () => {
  const { user } = useAuth();
  const [analysis, setAnalysis] = useState<ResumeAnalysisResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'bullets' | 'experience'>('overview');
  
  // Document Preview State (Initial state is completely empty - no default fake resume)
  const [docState, setDocState] = useState<ResumeDocumentState>({
    fileName: '',
    fileType: 'pdf',
    blobUrl: null,
    textContent: '',
    fileSizeText: ''
  });

  // Zoom controls state
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Resume rejection popup modal state
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionDetails, setRejectionDetails] = useState<{
    filename: string;
    reason: string;
    departmentMismatch?: boolean;
    missingSections: string[];
  } | null>(null);

  // Success toast
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    careerService.getResumeAnalysis(user?.department).then(res => {
      setAnalysis(res);
    });
  }, [user?.department]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (docState.blobUrl) {
        URL.revokeObjectURL(docState.blobUrl);
      }
    };
  }, [docState.blobUrl]);

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setSuccessMessage(null);
    setShowRejectModal(false);

    const ext = file.name.split('.').pop()?.toLowerCase();
    const isPdf = ext === 'pdf' || file.type === 'application/pdf';
    const isDocx = ext === 'docx' || file.name.endsWith('.docx');
    const isTxt = ext === 'txt' || file.type.startsWith('text/');

    // 1. Immediately create preview blob URL so PDF preview renders on split screen without delay
    let clientBlobUrl: string | null = null;
    let text = '';

    if (isPdf) {
      clientBlobUrl = URL.createObjectURL(file);
    } else {
      try {
        text = await file.text();
      } catch (err) {
        text = `Uploaded file: ${file.name}\nSize: ${(file.size / 1024).toFixed(1)} KB`;
      }
    }

    setDocState({
      fileName: file.name,
      fileType: isPdf ? 'pdf' : isDocx ? 'docx' : 'txt',
      blobUrl: clientBlobUrl,
      textContent: text,
      fileSizeText: `${(file.size / 1024).toFixed(1)} KB`
    });

    try {
      // 2. Validate and analyze against user's selected department
      const result = await careerService.analyzeNewResume(file, user?.department);
      setAnalysis(result);
      setShowRejectModal(false);
      setRejectionDetails(null);
      setSuccessMessage(`Resume "${file.name}" verified and evaluated successfully for ${user?.department || 'your department'}! ATS Score: ${result.atsScore}/100.`);
      setTimeout(() => setSuccessMessage(null), 6000);
    } catch (err: any) {
      console.warn('Resume validation rejected file:', err);
      // Revoke the preview blob URL if rejected
      if (clientBlobUrl) {
        URL.revokeObjectURL(clientBlobUrl);
      }
      setDocState({
        fileName: '',
        fileType: 'pdf',
        blobUrl: null,
        textContent: '',
        fileSizeText: ''
      });
      setRejectionDetails({
        filename: file.name,
        reason: err.message || (err.departmentMismatch 
          ? 'Please upload a resume corresponding to your selected department.' 
          : 'Please upload a valid resume.'),
        departmentMismatch: !!err.departmentMismatch,
        missingSections: err.missingSections && err.missingSections.length > 0 
          ? err.missingSections 
          : []
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
      fileName: '',
      fileType: 'pdf',
      blobUrl: null,
      textContent: '',
      fileSizeText: ''
    });
    setAnalysis(null);
    setSuccessMessage('Uploaded resume removed. Awaiting new document upload.');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  // Zoom Handlers
  const handleZoomIn = () => setZoomLevel(prev => Math.min(160, prev + 15));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(60, prev - 15));
  const handleZoomReset = () => setZoomLevel(100);

  const hasUploadedDoc = !!(docState.blobUrl || docState.textContent);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
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
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-bold">
              {user?.department || 'Department ATS Scanner'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#173B63] flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#2F9C95]" />
            <span>AI Resume Analyzer & Split-Screen ATS Diagnostics</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Validate and preview your uploaded resume side-by-side with department keyword audit and recruiter rubrics.
          </p>
        </div>

        {/* Upload Button */}
        <div className="flex items-center gap-2">
          <label className="px-4 py-2.5 rounded-xl bg-[#173B63] hover:bg-[#204B7D] text-white text-xs font-bold shadow-sm transition flex items-center gap-2 cursor-pointer self-start sm:self-auto">
            <UploadCloud className="w-4 h-4 text-teal-300" />
            <span>{isScanning ? 'Analyzing Document...' : 'Upload Resume (PDF, DOCX)'}</span>
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

      {/* REJECTION POPUP MODAL */}
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
                  <h3 className="font-bold text-sm">
                    {rejectionDetails.departmentMismatch ? 'Department Mismatch' : 'Invalid Resume'}
                  </h3>
                  <p className="text-[11px] text-rose-100">Validation Check Failed</p>
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
                <span className="font-bold block text-rose-950 text-sm">
                  {rejectionDetails.reason}
                </span>
                <p className="text-slate-600 leading-relaxed text-xs">
                  {rejectionDetails.departmentMismatch
                    ? `Your account is registered under "${user?.department || 'your department'}". Please upload a resume with credentials and technical scope matching this department.`
                    : 'The ATS engine could not verify this file as an accredited engineering resume. Please ensure the document includes standard contact, education, and technical project details.'}
                </p>
              </div>

              {/* Missing sections if applicable */}
              {rejectionDetails.missingSections && rejectionDetails.missingSections.length > 0 && (
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
              )}

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
                  <span>Upload Correct Resume</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SPLIT-SCREEN RESUME AND ATS COMPARISON LAYOUT */}
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
                  {hasUploadedDoc ? docState.fileName : 'Document Preview'}
                </p>
                <p className="text-[10px] text-slate-400">
                  {hasUploadedDoc 
                    ? `${docState.fileType.toUpperCase()} Document • ${docState.fileSizeText}` 
                    : 'Awaiting Upload'}
                </p>
              </div>
            </div>

            {/* Controls */}
            {hasUploadedDoc && (
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
            )}
          </div>

          {/* Document Scrolling Viewport */}
          <div className="h-[750px] overflow-y-auto bg-slate-100 p-4 sm:p-6 flex justify-center items-center shadow-inner relative">
            {!hasUploadedDoc ? (
              /* Clean Empty State when no resume uploaded */
              <div className="p-8 text-center space-y-4 max-w-sm">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center mx-auto text-[#173B63]">
                  <UploadCloud className="w-8 h-8 text-[#2F9C95]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-800">No Resume Uploaded</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Upload your <strong className="text-[#173B63]">{user?.department || 'department'}</strong> resume in PDF or DOCX format to inspect live document layout and ATS diagnostics side-by-side.
                  </p>
                </div>
                <button
                  onClick={triggerUpload}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#173B63] hover:bg-[#204B7D] text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4 text-teal-300" />
                  <span>Choose Resume File</span>
                </button>
              </div>
            ) : (
              <div 
                className="w-full max-w-[620px] h-full transition-transform duration-150 origin-top"
                style={{ transform: `scale(${zoomLevel / 100})` }}
              >
                {/* PDF Live Preview via iframe */}
                {docState.fileType === 'pdf' && docState.blobUrl ? (
                  <div className="bg-white rounded-xl shadow-md border border-slate-300 overflow-hidden h-[700px]">
                    <iframe
                      src={docState.blobUrl}
                      title="PDF Resume Preview"
                      className="w-full h-full border-0"
                    />
                  </div>
                ) : (
                  /* Formatted Document Viewer for TXT/DOCX */
                  <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 sm:p-8 space-y-4 font-sans text-slate-800 min-h-[680px]">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                        Live Document Preview
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {user?.department || 'Department Candidate'}
                      </span>
                    </div>

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
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT PANEL – RESUME ANALYSIS & ATS DIAGNOSTICS (6 cols)  */}
        {/* ========================================================= */}
        <div className="lg:col-span-6 space-y-6 max-h-[820px] overflow-y-auto pr-1">
          {!analysis ? (
            /* Clean Empty Diagnostics State */
            <div className="academic-card p-12 text-center space-y-4 border-dashed border-2 border-slate-300">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Target className="w-8 h-8 text-[#173B63]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-800">ATS Diagnostics Awaiting Resume</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                  Upload your <strong className="text-[#173B63]">{user?.department || 'department'}</strong> resume to calculate verified ATS score, detect core technical competencies, evaluate missing keywords, and get AI bullet optimizations.
                </p>
              </div>
              <div className="pt-2">
                <button
                  onClick={triggerUpload}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#173B63] hover:bg-[#204B7D] text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4 text-teal-300" />
                  <span>Upload Resume Now</span>
                </button>
              </div>
            </div>
          ) : (
            <>
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
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Department</span>
                  <span className="text-xs font-bold text-[#173B63] block truncate" title={user?.department || 'Department Role'}>
                    {user?.department || 'Department Role'}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold block">ATS Aligned</span>
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
                  Education & Scope
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

                  {/* Formatting Strengths */}
                  <div className="academic-card p-4 space-y-2 bg-slate-50">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-teal-600" />
                      <span>Resume Formatting Strengths</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Clear chronological engineering hierarchy</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Machine-readable typography with zero unparsable glyphs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Standard ATS headers aligned with recruiter parsing guidelines</span>
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
                        Detected Department Skills ({analysis.detectedSkills.length})
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
                        Recommended Department Keywords ({analysis.missingKeywords.length})
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500">
                      Add these high-demand {user?.department || 'department'} technical keywords to your descriptions to maximize ATS ranking:
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
                      <h3 className="font-bold text-xs uppercase tracking-wider">Department Degree Alignment</h3>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-900">
                          Bachelor of Technology (B.Tech / B.E.)
                        </span>
                        <span className="text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                          Verified Department Track
                        </span>
                      </div>
                      <p className="text-slate-700 font-medium">{user?.department || 'Engineering Degree'}</p>
                      <p className="text-slate-500 text-[11px] pt-1">
                        Curriculum accreditation and academic credentials verified for core {user?.department || 'engineering'} placement recruitment.
                      </p>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="academic-card p-5 space-y-2">
                    <div className="flex items-center gap-2 text-[#173B63]">
                      <Briefcase className="w-4 h-4 text-[#7567C7]" />
                      <h3 className="font-bold text-xs uppercase tracking-wider">Recruiter Profile Summary</h3>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      {analysis.summary}
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 4: AI Bullet Enhancer */}
              {activeTab === 'bullets' && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#7567C7]/10 to-[#3B82C4]/10 border border-[#7567C7]/20 flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#7567C7] shrink-0" />
                    <p className="text-xs text-slate-700 leading-snug">
                      Tailored {user?.department || 'department'} bullet optimizations using the XYZ action-metric formula: <em>"Accomplished [X] as measured by [Y], by doing [Z]"</em>.
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
                            Department Enhanced High-Impact Version:
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};
