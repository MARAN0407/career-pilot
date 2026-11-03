import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { interviewService } from '../../services/interviewService';
import { InterviewQuestion, InterviewType } from '../../types';
import { CameraStudio } from '../../components/interview/CameraStudio';
import { VoiceStudio } from '../../components/interview/VoiceStudio';
import { TextStudio } from '../../components/interview/TextStudio';
import { DEPARTMENT_NAMES, getDepartmentByName } from '../../constants/departments';
import { 
  Video, 
  Mic, 
  Keyboard, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  History, 
  ShieldCheck, 
  RefreshCw,
  Sliders,
  Layers,
  Code2,
  Bot,
  Target,
  ChevronDown,
  ChevronUp,
  Clock,
  School,
  Cpu,
  Radio,
  Activity,
  Wifi,
  Server,
  Zap,
  Wrench,
  Flame,
  Waves,
  Building2
} from 'lucide-react';

function getTracksForDepartment(deptName: string) {
  const dUpper = (deptName || '').toUpperCase();
  if (dUpper.includes('ELECTRONIC') || dUpper.includes('ECE') || dUpper.includes('COMMUNICATION')) {
    return [
      { id: 'all', label: 'All ECE Core Technical (Mixed)', icon: Cpu, desc: 'Embedded, VLSI, DSP, Wireless & Hardware' },
      { id: 'Embedded Systems & Microcontrollers', label: 'Embedded Systems & Microcontrollers', icon: Cpu, desc: 'ARM Cortex, ISRs, Latency, RTOS & Peripherals' },
      { id: 'VLSI & Digital Circuit Design', label: 'VLSI & Digital Circuits', icon: Layers, desc: 'Setup/Hold Time, STA, CMOS & Metastability' },
      { id: 'Wireless Communications & 5G', label: 'Wireless Communications & 5G', icon: Radio, desc: 'OFDM, 5G MIMO, Multipath & Cyclic Prefix' },
      { id: 'Digital Signal Processing (DSP)', label: 'Digital Signal Processing (DSP)', icon: Activity, desc: 'FIR/IIR Filters, FFT, Stability & Sampling' },
      { id: 'HR & Behavioral Leadership (STAR)', label: 'HR & Behavioral Leadership (STAR)', icon: Target, desc: 'Conflict Resolution, Outages & Project Deadlines' }
    ];
  } else if (dUpper.includes('COMPUTER') || dUpper.includes('CSE') || dUpper.includes('SOFTWARE') || dUpper.includes('INFO') || dUpper.includes('IT')) {
    return [
      { id: 'all', label: 'All CSE/IT Core Technical (Mixed)', icon: Code2, desc: 'Operating Systems, Networks, DSA & Databases' },
      { id: 'Operating Systems & Concurrency', label: 'Operating Systems & Concurrency', icon: Layers, desc: 'Deadlocks, Virtual Memory, Paging & Mutex' },
      { id: 'Computer Networks & Protocols', label: 'Computer Networks & Protocols', icon: Wifi, desc: 'TCP Handshake, DNS, HTTP/3 & Sockets' },
      { id: 'Data Structures & Algorithms', label: 'Data Structures & Algorithms', icon: Code2, desc: 'B-Trees, LRU Cache, BFS/DFS & Graphs' },
      { id: 'Database Systems & Storage', label: 'Database Systems & Storage', icon: Server, desc: 'ACID, B+ Tree Indexing & Sharding' },
      { id: 'HR & Behavioral Leadership (STAR)', label: 'HR & Behavioral Leadership (STAR)', icon: Target, desc: 'Team Disagreements, Failures & Agile Delivery' }
    ];
  } else if (dUpper.includes('AI') || dUpper.includes('ARTIFICIAL') || dUpper.includes('DATA SCIENCE') || dUpper.includes('MACHINE LEARNING')) {
    return [
      { id: 'all', label: 'All AI & ML Technical Tracks', icon: Bot, desc: 'ML Foundations, LLMs, Neural Nets & Optimization' },
      { id: 'Machine Learning Foundations', label: 'Machine Learning Foundations', icon: Bot, desc: 'Regularization, Bias-Variance, Loss & Gradients' },
      { id: 'Generative AI & LLMs', label: 'Generative AI & LLMs', icon: Sparkles, desc: 'RAG Architecture, Attention, Embeddings & Safety' },
      { id: 'Deep Learning & Neural Architectures', label: 'Deep Learning & Neural Nets', icon: Layers, desc: 'Transformers, ResNets, Backpropagation' },
      { id: 'HR & Behavioral Leadership (STAR)', label: 'HR & Behavioral Leadership (STAR)', icon: Target, desc: 'Model Failures, Tradeoffs & Technical Debates' }
    ];
  } else if (dUpper.includes('ELECTRICAL') || dUpper.includes('EEE') || dUpper.includes('POWER')) {
    return [
      { id: 'all', label: 'All EEE Core Technical (Mixed)', icon: Zap, desc: 'Power Systems, Power Electronics & Controls' },
      { id: 'Power Systems & Grids', label: 'Power Systems & Grids', icon: Zap, desc: 'Power Factor, Transmission, Grid Losses & kVAR' },
      { id: 'Power Electronics & Converters', label: 'Power Electronics & Converters', icon: Cpu, desc: 'Buck-Boost, Inverters, PWM & Duty Cycles' },
      { id: 'Control Systems & Stability', label: 'Control Systems & Stability', icon: Sliders, desc: 'PID Tuning, Bode/Nyquist & Feedback Loops' },
      { id: 'HR & Behavioral Leadership (STAR)', label: 'HR & Behavioral Leadership (STAR)', icon: Target, desc: 'Safety Protocols, Incident Triage & Teamwork' }
    ];
  } else if (dUpper.includes('MECHANICAL') || dUpper.includes('MECH')) {
    return [
      { id: 'all', label: 'All Mechanical Core Technical (Mixed)', icon: Wrench, desc: 'Thermodynamics, Fluids, Solid Mechanics & CAD' },
      { id: 'Thermodynamics & Heat Transfer', label: 'Thermodynamics & Heat Transfer', icon: Flame, desc: 'Second Law, Carnot Efficiency, Heat Exchangers' },
      { id: 'Fluid Mechanics & Hydraulics', label: 'Fluid Mechanics & Hydraulics', icon: Waves, desc: 'Bernoulli Equation, Reynolds Number, Streamlines' },
      { id: 'Mechanics of Materials & Strength', label: 'Mechanics of Materials & Strength', icon: Layers, desc: 'Von Mises Yield, Tresca, Stress-Strain Analysis' },
      { id: 'HR & Behavioral Leadership (STAR)', label: 'HR & Behavioral Leadership (STAR)', icon: Target, desc: 'Manufacturing Deadlines, Design Revisions & Safety' }
    ];
  } else if (dUpper.includes('CIVIL') || dUpper.includes('STRUCT')) {
    return [
      { id: 'all', label: 'All Civil Core Technical (Mixed)', icon: Building2, desc: 'Structural RCC, Soil Mechanics, Water & BIM' },
      { id: 'Structural Analysis & RCC Design', label: 'Structural Analysis & RCC Design', icon: Building2, desc: 'Limit State Method, Collapse vs Serviceability' },
      { id: 'Geotechnical & Soil Mechanics', label: 'Geotechnical & Soil Mechanics', icon: Layers, desc: 'Terzaghi Bearing Capacity, Cohesion & Surcharge' },
      { id: 'HR & Behavioral Leadership (STAR)', label: 'HR & Behavioral Leadership (STAR)', icon: Target, desc: 'Site Safety, Contractor Communication & Quality' }
    ];
  } else {
    return [
      { id: 'all', label: `${deptName} Core Technical (Mixed)`, icon: Sparkles, desc: 'Applied engineering principles and systems' },
      { id: 'HR & Behavioral Leadership (STAR)', label: 'HR & Behavioral Leadership (STAR)', icon: Target, desc: 'Leadership, Conflict Resolution & Problem Solving' }
    ];
  }
}

const QUESTION_COUNTS = [
  { count: 3, label: '3 Questions', time: '~8 mins', badge: 'Quick Sprint' },
  { count: 5, label: '5 Questions', time: '~15 mins', badge: 'Standard Round' },
  { count: 8, label: '8 Questions', time: '~25 mins', badge: 'Deep Mock' },
  { count: 12, label: '12 Questions', time: '~35 mins', badge: 'Mastery Drill' },
];

export const InterviewCenterPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const currentDept = user?.department || 'Electronics & Communication Engineering (ECE)';
  const [selectedDept, setSelectedDept] = useState<string>(currentDept);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCount, setSelectedCount] = useState<number>(5);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [activeSessionType, setActiveSessionType] = useState<InterviewType | null>(null);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const navigate = useNavigate();

  // Synchronize state when user changes department in profile
  useEffect(() => {
    if (user?.department && user.department !== selectedDept) {
      setSelectedDept(user.department);
      setSelectedCategory('all');
    }
  }, [user?.department]);

  const tracks = getTracksForDepartment(selectedDept);

  const fetchQuestions = async (dept = selectedDept, cat = selectedCategory, cnt = selectedCount) => {
    setIsLoadingQuestions(true);
    try {
      const res = await interviewService.getQuestions('camera', cat, cnt, dept);
      setQuestions(res);
    } catch (err) {
      console.error('Error fetching department questions:', err);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  useEffect(() => {
    fetchQuestions(selectedDept, selectedCategory, selectedCount);
  }, [selectedDept, selectedCategory, selectedCount]);

  const handleDepartmentChange = async (newDept: string) => {
    setSelectedDept(newDept);
    setSelectedCategory('all');
    if (updateUser) {
      await updateUser({ department: newDept });
    }
  };

  const handleComplete = async (answers: { questionId: string; question: string; answerText: string }[]) => {
    if (!activeSessionType) return;
    await interviewService.submitInterviewSession(activeSessionType, answers);
    setActiveSessionType(null);
    navigate('/student/interview-results');
  };

  const selectedTrackObj = tracks.find(t => t.id === selectedCategory) || tracks[0];
  const selectedCountObj = QUESTION_COUNTS.find(c => c.count === selectedCount) || QUESTION_COUNTS[1];
  const deptMeta = getDepartmentByName(selectedDept);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-[#173B63] flex items-center gap-2.5">
            <Video className="w-7 h-7 text-[#7567C7]" />
            <span>AI Mock Interview Center</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Department-tailored mock interviews with real-time audio, speech, and technical rubric evaluation.
          </p>
        </div>

        <button
          onClick={() => navigate('/student/interview-history')}
          className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition flex items-center gap-2 self-start cursor-pointer"
        >
          <History className="w-4 h-4 text-slate-500" />
          <span>View Past Reports</span>
        </button>
      </div>

      {/* DEPARTMENT BANNER & SELECTOR */}
      <div className="bg-gradient-to-r from-[#173B63] via-[#1E4D82] to-[#2F9C95] text-white p-5 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-[11px] font-bold text-teal-300">
            <School className="w-3.5 h-3.5" />
            <span>Academic Department Aligned</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight">
            Target Focus: {selectedDept}
          </h2>
          <p className="text-xs text-slate-200 max-w-xl">
            Questions, rubrics, and keywords are calibrated for {deptMeta.defaultRole} roles.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 self-start md:self-auto min-w-[280px]">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-teal-200 mb-1">
            Switch Department:
          </label>
          <select
            value={selectedDept}
            onChange={e => handleDepartmentChange(e.target.value)}
            className="w-full px-3 py-1.5 bg-white text-slate-800 rounded-lg text-xs font-bold border-0 focus:outline-none focus:ring-2 focus:ring-teal-300 cursor-pointer"
          >
            {DEPARTMENT_NAMES.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Dynamic Configuration Panel */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#3B82C4]" />
            <h2 className="text-sm font-bold text-slate-800">Customize Your Technical & HR Interview</h2>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 font-semibold border border-teal-200">
              {deptMeta.shortCode} Question Bank
            </span>
          </div>

          <button
            onClick={() => fetchQuestions(selectedDept, selectedCategory, selectedCount)}
            disabled={isLoadingQuestions}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer self-start sm:self-auto"
            title="Generate a completely new set of randomized questions"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingQuestions ? 'animate-spin text-[#3B82C4]' : 'text-slate-500'}`} />
            <span>Shuffle New Questions</span>
          </button>
        </div>

        {/* Step 1: Select Track / Subject */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
            Step 1: Choose Technical Domain or HR Leadership Track
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tracks.map(t => {
              const Icon = t.icon;
              const isSelected = selectedCategory === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedCategory(t.id)}
                  className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'border-[#2F9C95] bg-teal-50/70 ring-2 ring-teal-500/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/70'
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-[#2F9C95] text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xs font-bold ${isSelected ? 'text-[#173B63]' : 'text-slate-800'}`}>
                      {t.label}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {t.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Select Question Count & Duration */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
            Step 2: Number of Questions & Target Duration
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {QUESTION_COUNTS.map(c => {
              const isSelected = selectedCount === c.count;
              return (
                <button
                  key={c.count}
                  type="button"
                  onClick={() => setSelectedCount(c.count)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#173B63] bg-blue-50/70 ring-2 ring-blue-500/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/70'
                  }`}
                >
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    isSelected ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {c.badge}
                  </span>
                  <p className="text-base font-extrabold text-[#173B63] mt-1.5">{c.label}</p>
                  <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{c.time}</span>
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Active Questions Preview */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-slate-700">
                Ready: {questions.length} Questions for {deptMeta.shortCode}
              </span>
              <span className="text-[11px] text-slate-500">
                • Track: <strong className="text-slate-700">{selectedTrackObj.label}</strong>
              </span>
            </div>

            <button
              onClick={() => setShowPreview(!showPreview)}
              className="text-xs font-semibold text-[#3B82C4] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{showPreview ? 'Hide Prompts' : 'Preview Question Prompts'}</span>
              {showPreview ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {showPreview && (
            <div className="mt-3.5 space-y-2 border-t border-slate-200 pt-3">
              {questions.map((q, idx) => (
                <div key={q.id} className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800">{q.questionText}</p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                      <span className="px-1.5 py-0.2 rounded bg-slate-100 font-medium">{q.category}</span>
                      <span>Difficulty: <strong className="text-slate-600">{q.difficulty}</strong></span>
                      <span>Target Role: <strong className="text-slate-600">{q.role}</strong></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3 Large Mode Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Camera Interview */}
        <div className="academic-card p-6 flex flex-col justify-between space-y-6 border-t-4 border-t-[#2F9C95] hover:border-slate-300 relative overflow-hidden group">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-[#2F9C95] border border-teal-200 flex items-center justify-center group-hover:scale-105 transition shadow-sm">
              <Video className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2 py-0.5 rounded">
                Full Immersion
              </span>
              <h3 className="text-lg font-bold text-[#173B63] mt-1.5">🎥 Camera Interview</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Live webcam and audio assessment. Evaluates domain knowledge in {selectedDept}, eye composure, and response structure.
              </p>
            </div>

            <ul className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2F9C95]" />
                <span>Camera + Speech Analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2F9C95]" />
                <span>{deptMeta.shortCode} Technical Rubrics</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2F9C95]" />
                <span>{questions.length || selectedCount} Questions ({selectedCountObj.time})</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setActiveSessionType('camera')}
            className="w-full py-3 rounded-xl bg-[#173B63] hover:bg-[#204B7D] text-white text-xs font-bold transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start Camera Interview ({questions.length || selectedCount} Qs)</span>
            <ArrowRight className="w-4 h-4 text-teal-300" />
          </button>
        </div>

        {/* Card 2: Voice Interview */}
        <div className="academic-card p-6 flex flex-col justify-between space-y-6 border-t-4 border-t-[#7567C7] hover:border-slate-300 relative overflow-hidden group">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-[#7567C7] border border-indigo-200 flex items-center justify-center group-hover:scale-105 transition shadow-sm">
              <Mic className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                Speech Focused
              </span>
              <h3 className="text-lg font-bold text-[#173B63] mt-1.5">🎙 Voice Interview</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Practice answering with your voice. Automated speech recognition transcribes answers and checks {deptMeta.shortCode} technical vocabulary.
              </p>
            </div>

            <ul className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7567C7]" />
                <span>Interactive voice visualizer</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7567C7]" />
                <span>Acoustic fluency analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7567C7]" />
                <span>{questions.length || selectedCount} Questions ({selectedCountObj.time})</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setActiveSessionType('voice')}
            className="w-full py-3 rounded-xl bg-[#7567C7] hover:bg-[#6456b8] text-white text-xs font-bold transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start Voice Interview ({questions.length || selectedCount} Qs)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card 3: Text Interview */}
        <div className="academic-card p-6 flex flex-col justify-between space-y-6 border-t-4 border-t-[#3B82C4] hover:border-slate-300 relative overflow-hidden group">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#3B82C4] border border-blue-200 flex items-center justify-center group-hover:scale-105 transition shadow-sm">
              <Keyboard className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                Technical Depth
              </span>
              <h3 className="text-lg font-bold text-[#173B63] mt-1.5">⌨ Text Interview</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Technical chat-based questions in {deptMeta.shortCode} with instant step-by-step scoring against model engineering answers.
              </p>
            </div>

            <ul className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82C4]" />
                <span>Conversational chat interface</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82C4]" />
                <span>Equations & code typing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82C4]" />
                <span>{questions.length || selectedCount} Questions ({selectedCountObj.time})</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setActiveSessionType('text')}
            className="w-full py-3 rounded-xl bg-[#3B82C4] hover:bg-[#2e6ea9] text-white text-xs font-bold transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start Text Interview ({questions.length || selectedCount} Qs)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Assessment Guidelines callout */}
      <div className="p-6 bg-slate-100/80 rounded-2xl border border-slate-200 flex items-start gap-4">
        <ShieldCheck className="w-6 h-6 text-[#173B63] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-slate-600 leading-relaxed">
          <h4 className="font-bold text-slate-900 text-sm">Academic Integrity & AI Privacy Protocol</h4>
          <p>
            All mock interviews are evaluated using college-accredited rubrics aligned with Tier-1 tech and core engineering hiring bars for {selectedDept}. Scores are automatically synchronized with your Career Readiness index.
          </p>
        </div>
      </div>

      {/* Render Active Studio */}
      {activeSessionType === 'camera' && questions.length > 0 && (
        <CameraStudio
          questions={questions}
          onComplete={handleComplete}
          onCancel={() => setActiveSessionType(null)}
        />
      )}

      {activeSessionType === 'voice' && questions.length > 0 && (
        <VoiceStudio
          questions={questions}
          onComplete={handleComplete}
          onCancel={() => setActiveSessionType(null)}
        />
      )}

      {activeSessionType === 'text' && questions.length > 0 && (
        <TextStudio
          questions={questions}
          onComplete={handleComplete}
          onCancel={() => setActiveSessionType(null)}
        />
      )}
    </div>
  );
};
