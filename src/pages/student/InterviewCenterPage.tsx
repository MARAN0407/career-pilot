import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { interviewService } from '../../services/interviewService';
import { InterviewQuestion, InterviewType } from '../../types';
import { CameraStudio } from '../../components/interview/CameraStudio';
import { VoiceStudio } from '../../components/interview/VoiceStudio';
import { TextStudio } from '../../components/interview/TextStudio';
import { 
  EXACT_14_DEPARTMENTS, 
  getSubjectsForDepartment, 
  DEPARTMENT_SUBJECTS 
} from '../../constants/departmentSubjects';
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
  Search,
  BookOpen,
  AlertCircle,
  Award
} from 'lucide-react';

const QUESTION_COUNTS = [
  { count: 3, label: '3 Questions', time: '~8 mins', badge: 'Quick Sprint' },
  { count: 5, label: '5 Questions', time: '~15 mins', badge: 'Standard Round' },
  { count: 8, label: '8 Questions', time: '~25 mins', badge: 'Deep Mock' },
  { count: 12, label: '12 Questions', time: '~35 mins', badge: 'Mastery Drill' },
];

const DIFFICULTY_LEVELS = [
  { level: 'Beginner', desc: 'Core definitions, basic formulas & primary operational concepts', badge: 'Foundational' },
  { level: 'Intermediate', desc: 'Working mechanisms, analytical tradeoffs & parameter dynamics', badge: 'Standard' },
  { level: 'Advanced', desc: 'Nonlinear failure modes, mathematical derivations & edge cases', badge: 'Rigorous' },
];

export const InterviewCenterPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialRoundParam = (searchParams.get('round') || 'technical').toLowerCase();
  
  // 3 distinct rounds: Technical Domain Round, HR Round, Star Leadership Round
  const [selectedRound, setSelectedRound] = useState<'technical' | 'hr' | 'star'>(
    initialRoundParam === 'hr' ? 'hr' : initialRoundParam === 'star' ? 'star' : 'technical'
  );
  
  // Find initial department that matches one of the exact 14
  const defaultDept = EXACT_14_DEPARTMENTS.find(d => d === user?.department) || EXACT_14_DEPARTMENTS[2]; // CSE default
  const [selectedDept, setSelectedDept] = useState<string>(defaultDept);

  // Available subjects strictly belonging to the selected department
  const availableSubjects = getSubjectsForDepartment(selectedDept);

  // Selected subject - defaults to first available subject
  const [selectedSubject, setSelectedSubject] = useState<string>(availableSubjects[0] || '');
  const [subjectSearch, setSubjectSearch] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Intermediate');
  const [selectedCount, setSelectedCount] = useState<number>(5);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState<boolean>(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [activeSessionType, setActiveSessionType] = useState<InterviewType | null>(null);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const navigate = useNavigate();

  // Synchronize state when user changes department in auth profile
  useEffect(() => {
    if (user?.department && EXACT_14_DEPARTMENTS.includes(user.department as any) && user.department !== selectedDept) {
      setSelectedDept(user.department);
      const newSubjects = getSubjectsForDepartment(user.department);
      setSelectedSubject(newSubjects[0] || '');
      setSubjectSearch('');
    }
  }, [user?.department]);

  // Synchronize when round param in URL changes
  useEffect(() => {
    const roundInUrl = searchParams.get('round');
    if (roundInUrl && (roundInUrl === 'hr' || roundInUrl === 'star' || roundInUrl === 'technical')) {
      setSelectedRound(roundInUrl as any);
    }
  }, [searchParams]);

  // Fetch questions customized for department and specific round
  const fetchQuestions = async (
    dept = selectedDept, 
    subj = selectedSubject, 
    diff = selectedDifficulty, 
    cnt = selectedCount,
    rnd = selectedRound
  ) => {
    if (rnd === 'technical' && !subj) {
      setQuestions([]);
      return;
    }
    setIsLoadingQuestions(true);
    setGenerationError(null);
    try {
      const res = await interviewService.getQuestions(
        'camera', 
        rnd === 'technical' ? subj : rnd === 'hr' ? 'HR Round' : 'Star Leadership Round', 
        cnt, 
        dept, 
        diff,
        rnd
      );
      if (res && res.length > 0) {
        setQuestions(res);
      } else {
        setGenerationError(`Unable to generate questions for ${rnd === 'technical' ? subj : rnd.toUpperCase() + ' Round'}. Please retry.`);
      }
    } catch (err: any) {
      console.error('Error fetching questions:', err);
      setGenerationError(err.message || 'Failed to generate department interview questions.');
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  // Re-fetch questions when department, subject, difficulty, count, or round changes
  useEffect(() => {
    fetchQuestions(selectedDept, selectedSubject, selectedDifficulty, selectedCount, selectedRound);
  }, [selectedDept, selectedSubject, selectedDifficulty, selectedCount, selectedRound]);

  // Handle department change: CLEAR previous subject and load subjects of new department
  const handleDepartmentChange = async (newDept: string) => {
    setSelectedDept(newDept);
    const newSubjects = getSubjectsForDepartment(newDept);
    // Requirement 9: Changing department clears the previously selected subject
    setSelectedSubject(newSubjects[0] || '');
    setSubjectSearch('');
    setQuestions([]);
    if (updateUser) {
      await updateUser({ department: newDept });
    }
  };

  const handleStartInterview = async (type: InterviewType) => {
    if (!selectedDept) {
      setGenerationError('Please select a department to start the interview.');
      return;
    }
    if (selectedRound === 'technical' && !selectedSubject) {
      setGenerationError('Please select a subject to start the Technical Domain mock interview.');
      return;
    }
    // If questions aren't loaded or need refresh, load them
    if (questions.length === 0) {
      setIsLoadingQuestions(true);
      try {
        const loaded = await interviewService.getQuestions(
          type, 
          selectedRound === 'technical' ? selectedSubject : selectedRound === 'hr' ? 'HR Round' : 'Star Leadership Round', 
          selectedCount, 
          selectedDept, 
          selectedDifficulty,
          selectedRound
        );
        if (loaded && loaded.length > 0) {
          setQuestions(loaded);
          setActiveSessionType(type);
        } else {
          setGenerationError(`Question generation failed for this round. Please retry.`);
        }
      } catch (err: any) {
        setGenerationError(err.message || 'Question generation failed.');
      } finally {
        setIsLoadingQuestions(false);
      }
    } else {
      setActiveSessionType(type);
    }
  };

  const handleComplete = async (answers: { questionId: string; question: string; answerText: string }[]) => {
    if (!activeSessionType) return;
    
    const roundTitle = selectedRound === 'technical' 
      ? 'Technical Domain Round' 
      : selectedRound === 'hr' 
      ? 'HR Round' 
      : 'Star Leadership Round';

    const subjectTitle = selectedRound === 'technical' 
      ? selectedSubject 
      : selectedRound === 'hr' 
      ? 'HR & Behavioral Evaluation' 
      : 'STAR Leadership & Situational Scenarios';

    // Attach department, round, subject and question metadata so evaluator has full rubric context
    const enrichedAnswers = answers.map((ans, idx) => {
      const matchedQ = questions.find(q => q.id === ans.questionId) || questions[idx];
      return {
        ...ans,
        department: selectedDept,
        round: roundTitle,
        subject: subjectTitle,
        role: `${selectedDept} Candidate`,
        difficulty: selectedDifficulty,
        expectedKeypoints: matchedQ?.expectedKeypoints,
        requiredKeywords: matchedQ?.requiredKeywords,
        modelAnswer: matchedQ?.modelAnswer,
        explanation: matchedQ?.explanation,
        improvementTip: matchedQ?.improvementTip
      };
    });

    await interviewService.submitInterviewSession(activeSessionType, enrichedAnswers);
    setActiveSessionType(null);
    navigate('/student/interview-results');
  };

  // Filter subjects by search input
  const filteredSubjects = availableSubjects.filter(s => 
    s.toLowerCase().includes(subjectSearch.toLowerCase())
  );

  const selectedCountObj = QUESTION_COUNTS.find(c => c.count === selectedCount) || QUESTION_COUNTS[1];
  const currentDeptObj = DEPARTMENT_SUBJECTS.find(d => d.name === selectedDept);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-[#173B63] flex items-center gap-2.5">
            <Video className="w-7 h-7 text-[#2F9C95]" />
            <span>AI Mock Interview Center</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Department and subject-specific technical mock interviews with post-interview evaluation and answer feedback.
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

      {/* DEPARTMENT SELECTOR BANNER - EXACTLY 14 DEPARTMENTS */}
      <div className="bg-gradient-to-r from-[#173B63] via-[#1E4D82] to-[#2F9C95] text-white p-5 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-[11px] font-bold text-teal-300">
            <School className="w-3.5 h-3.5" />
            <span>14 Authorized Engineering Departments</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight">
            Selected Department: {selectedDept}
          </h2>
          <p className="text-xs text-slate-200 max-w-xl">
            {availableSubjects.length} verified curriculum subjects available for technical examination.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 self-start md:self-auto min-w-[300px]">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-teal-200 mb-1">
            Select Department:
          </label>
          <select
            value={selectedDept}
            onChange={e => handleDepartmentChange(e.target.value)}
            className="w-full px-3 py-2 bg-white text-slate-800 rounded-lg text-xs font-bold border-0 focus:outline-none focus:ring-2 focus:ring-teal-300 cursor-pointer shadow-sm"
          >
            {EXACT_14_DEPARTMENTS.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ERROR ALERT IF GENERATION FAILS */}
      {generationError && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{generationError}</span>
          </div>
          <button
            onClick={() => fetchQuestions(selectedDept, selectedSubject, selectedDifficulty, selectedCount)}
            className="px-3 py-1 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* 3 DISTINCT ROUND SELECTOR TABS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => {
            setSelectedRound('technical');
            setSearchParams({ round: 'technical' });
          }}
          className={`p-4 rounded-2xl border text-left transition flex items-start gap-3 cursor-pointer ${
            selectedRound === 'technical'
              ? 'bg-blue-50/70 border-[#173B63] ring-2 ring-[#173B63]/20 shadow-xs'
              : 'bg-white border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className={`p-2.5 rounded-xl shrink-0 ${selectedRound === 'technical' ? 'bg-[#173B63] text-white' : 'bg-slate-100 text-slate-600'}`}>
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-xs text-[#173B63]">1. Technical Domain Round</h3>
              {selectedRound === 'technical' && <span className="px-1.5 py-0.5 rounded text-[9px] bg-blue-100 text-blue-800 font-bold">Active</span>}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Curriculum formulas, principles, circuits & algorithms for {selectedDept}.
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setSelectedRound('hr');
            setSearchParams({ round: 'hr' });
          }}
          className={`p-4 rounded-2xl border text-left transition flex items-start gap-3 cursor-pointer ${
            selectedRound === 'hr'
              ? 'bg-teal-50/70 border-[#2F9C95] ring-2 ring-[#2F9C95]/20 shadow-xs'
              : 'bg-white border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className={`p-2.5 rounded-xl shrink-0 ${selectedRound === 'hr' ? 'bg-[#2F9C95] text-white' : 'bg-slate-100 text-slate-600'}`}>
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-xs text-[#173B63]">2. HR Round</h3>
              {selectedRound === 'hr' && <span className="px-1.5 py-0.5 rounded text-[9px] bg-teal-100 text-teal-800 font-bold">Active</span>}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Behavioral, motivation, culture fit, deadlines & engineering conflict handling.
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setSelectedRound('star');
            setSearchParams({ round: 'star' });
          }}
          className={`p-4 rounded-2xl border text-left transition flex items-start gap-3 cursor-pointer ${
            selectedRound === 'star'
              ? 'bg-purple-50/70 border-[#7567C7] ring-2 ring-[#7567C7]/20 shadow-xs'
              : 'bg-white border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className={`p-2.5 rounded-xl shrink-0 ${selectedRound === 'star' ? 'bg-[#7567C7] text-white' : 'bg-slate-100 text-slate-600'}`}>
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-xs text-[#173B63]">3. Star Leadership Round</h3>
              {selectedRound === 'star' && <span className="px-1.5 py-0.5 rounded text-[9px] bg-purple-100 text-purple-800 font-bold">Active</span>}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Situation, Task, Action, Result structured crisis resolution & project ownership.
            </p>
          </div>
        </button>
      </div>

      {/* 4-STEP CONFIGURATION WORKFLOW */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#3B82C4]" />
            <h2 className="text-sm font-bold text-slate-800">
              Configure {selectedRound === 'technical' ? 'Technical Domain' : selectedRound === 'hr' ? 'HR Behavioral' : 'STAR Leadership'} Interview
            </h2>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 font-semibold border border-teal-200">
              {selectedRound === 'technical' ? `${currentDeptObj?.shortCode} Subject Bank` : `${selectedRound.toUpperCase()} Question Pool`}
            </span>
          </div>

          <button
            onClick={() => fetchQuestions(selectedDept, selectedSubject, selectedDifficulty, selectedCount, selectedRound)}
            disabled={isLoadingQuestions}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 text-xs font-semibold transition cursor-pointer self-start sm:self-auto"
            title="Generate a fresh randomized set of questions"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingQuestions ? 'animate-spin text-[#3B82C4]' : 'text-slate-500'}`} />
            <span>Shuffle Round Questions</span>
          </button>
        </div>

        {/* STEP 1: ROUND-SPECIFIC FOCUS OR SUBJECT SELECTION */}
        {selectedRound === 'technical' ? (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Step 1: Select Subject for {selectedDept}
                </label>
                <p className="text-[11px] text-slate-500">
                  Only verified curriculum subjects for {selectedDept} are shown. Select one subject to focus the interview.
                </p>
              </div>

              {/* Quick search input within the department's subjects */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={subjectSearch}
                  onChange={e => setSubjectSearch(e.target.value)}
                  placeholder={`Search ${availableSubjects.length} subjects...`}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2F9C95] focus:bg-white transition"
                />
              </div>
            </div>

            {/* Subjects dropdown & quick grid */}
            <div className="space-y-2">
              <select
                value={selectedSubject}
                onChange={e => setSelectedSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#2F9C95] focus:bg-white cursor-pointer shadow-xs"
              >
                <option value="" disabled>-- Select a Subject from {selectedDept} --</option>
                {availableSubjects.map((subj, idx) => (
                  <option key={subj} value={subj}>
                    {idx + 1}. {subj}
                  </option>
                ))}
              </select>

              {/* Scrollable pill container for quick browsing */}
              <div className="max-h-48 overflow-y-auto p-2.5 bg-slate-50/60 rounded-xl border border-slate-200/80 flex flex-wrap gap-1.5">
                {filteredSubjects.map(subj => {
                  const isSelected = selectedSubject === subj;
                  return (
                    <button
                      key={subj}
                      type="button"
                      onClick={() => setSelectedSubject(subj)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium text-left transition cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#173B63] text-white shadow-xs font-bold'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3 h-3 text-teal-300 shrink-0" />}
                      <span className="truncate max-w-[280px]">{subj}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedSubject && (
              <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl flex items-center justify-between text-xs text-teal-900">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#2F9C95] shrink-0" />
                  <span>Active Target Subject: <strong>{selectedSubject}</strong></span>
                </div>
                <span className="text-[11px] font-semibold text-teal-700 bg-teal-100/80 px-2 py-0.5 rounded-md">
                  100% Subject Aligned
                </span>
              </div>
            )}
          </div>
        ) : selectedRound === 'hr' ? (
          <div className="p-4 bg-teal-50/60 border border-teal-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-teal-900">
              <Target className="w-5 h-5 text-[#2F9C95]" />
              <h3 className="font-bold text-xs uppercase tracking-wider">Step 1: HR & Behavioral Round Competency Scope</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              This round assesses your personal motivation for <strong>{selectedDept}</strong>, ability to handle tight engineering deadlines, teamwork ethics, communication clarity, and adaptability to industry workplace challenges.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
              <span className="px-2.5 py-1 bg-white border border-teal-200 rounded-lg font-semibold text-teal-800">✓ Self-Introduction & Background</span>
              <span className="px-2.5 py-1 bg-white border border-teal-200 rounded-lg font-semibold text-teal-800">✓ Conflict Resolution</span>
              <span className="px-2.5 py-1 bg-white border border-teal-200 rounded-lg font-semibold text-teal-800">✓ Feedback Receptivity</span>
              <span className="px-2.5 py-1 bg-white border border-teal-200 rounded-lg font-semibold text-teal-800">✓ 3-5 Year Career Outlook</span>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-purple-50/60 border border-purple-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-purple-900">
              <Award className="w-5 h-5 text-[#7567C7]" />
              <h3 className="font-bold text-xs uppercase tracking-wider">Step 1: STAR Leadership Round Competency Scope</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Respond using the structured <strong>STAR framework</strong> (Situation, Task, Action, Result). Evaluates technical ownership, project crisis recovery, safety and ethical leadership, and data-driven persuasion for <strong>{selectedDept}</strong>.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
              <span className="px-2.5 py-1 bg-white border border-purple-200 rounded-lg font-semibold text-purple-800">★ Situation: Concrete project context</span>
              <span className="px-2.5 py-1 bg-white border border-purple-200 rounded-lg font-semibold text-purple-800">★ Task: Specific leadership ownership</span>
              <span className="px-2.5 py-1 bg-white border border-purple-200 rounded-lg font-semibold text-purple-800">★ Action: Tactical engineering decisions</span>
              <span className="px-2.5 py-1 bg-white border border-purple-200 rounded-lg font-semibold text-purple-800">★ Result: Quantified impact & lessons</span>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT DIFFICULTY LEVEL */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
            Step 2: Select Difficulty Level
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {DIFFICULTY_LEVELS.map(d => {
              const isSelected = selectedDifficulty === d.level;
              return (
                <button
                  key={d.level}
                  type="button"
                  onClick={() => setSelectedDifficulty(d.level)}
                  className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? 'border-[#2F9C95] bg-teal-50/70 ring-2 ring-teal-500/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${isSelected ? 'text-[#173B63]' : 'text-slate-800'}`}>
                      {d.level}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isSelected ? 'bg-teal-200 text-teal-900' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {d.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {d.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 3: SELECT QUESTION COUNT & DURATION */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
            Step 3: Number of Questions & Target Duration
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

        {/* LIVE ACTIVE QUESTIONS PREVIEW */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-slate-700">
                Generated: {questions.length} Questions for {selectedSubject || 'Selected Subject'}
              </span>
              <span className="text-[11px] text-slate-500 hidden sm:inline">
                • {selectedDifficulty} Level • {selectedDept}
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
                <div key={q.id || idx} className="p-3 bg-white rounded-lg border border-slate-200 text-xs flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 leading-relaxed">{q.questionText}</p>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-500">
                      <span className="px-1.5 py-0.2 rounded bg-teal-50 text-teal-700 font-medium border border-teal-200">{q.subject || selectedSubject}</span>
                      <span>Difficulty: <strong className="text-slate-600">{q.difficulty || selectedDifficulty}</strong></span>
                      <span>Department: <strong className="text-slate-600">{q.department || selectedDept}</strong></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3 MODE SELECTION CARDS - START INTERVIEW */}
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
                Live webcam and audio assessment. Evaluates domain knowledge in <strong>{selectedSubject}</strong>, composure, and answer depth.
              </p>
            </div>

            <ul className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2F9C95]" />
                <span>One question at a time (answers hidden during session)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2F9C95]" />
                <span>{selectedDifficulty} difficulty rubric</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2F9C95]" />
                <span>{selectedCount} Questions ({selectedCountObj.time})</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleStartInterview('camera')}
            disabled={!selectedSubject || isLoadingQuestions}
            className="w-full py-3 rounded-xl bg-[#173B63] hover:bg-[#204B7D] disabled:opacity-50 text-white text-xs font-bold transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isLoadingQuestions ? 'Preparing Questions...' : `Start Camera Interview (${selectedCount} Qs)`}</span>
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
                Practice answering verbally. Automated speech recognition transcribes answers and checks <strong>{selectedSubject}</strong> technical terminology.
              </p>
            </div>

            <ul className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7567C7]" />
                <span>Interactive speech recognition</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7567C7]" />
                <span>Answers evaluated only after completion</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7567C7]" />
                <span>{selectedCount} Questions ({selectedCountObj.time})</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleStartInterview('voice')}
            disabled={!selectedSubject || isLoadingQuestions}
            className="w-full py-3 rounded-xl bg-[#7567C7] hover:bg-[#6456b8] disabled:opacity-50 text-white text-xs font-bold transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isLoadingQuestions ? 'Preparing Questions...' : `Start Voice Interview (${selectedCount} Qs)`}</span>
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
                Chat-based technical assessment in <strong>{selectedSubject}</strong>. Type equations, algorithms, and explanations with zero mid-session reveals.
              </p>
            </div>

            <ul className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82C4]" />
                <span>Conversational prompt delivery</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82C4]" />
                <span>Comprehensive post-session scorecard</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82C4]" />
                <span>{selectedCount} Questions ({selectedCountObj.time})</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleStartInterview('text')}
            disabled={!selectedSubject || isLoadingQuestions}
            className="w-full py-3 rounded-xl bg-[#3B82C4] hover:bg-[#2e6ea9] disabled:opacity-50 text-white text-xs font-bold transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isLoadingQuestions ? 'Preparing Questions...' : `Start Text Interview (${selectedCount} Qs)`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Assessment Guidelines callout */}
      <div className="p-6 bg-slate-100/80 rounded-2xl border border-slate-200 flex items-start gap-4">
        <ShieldCheck className="w-6 h-6 text-[#173B63] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-slate-600 leading-relaxed">
          <h4 className="font-bold text-slate-900 text-sm">Department & Subject Evaluation Rules</h4>
          <p>
            During the interview session, each question is displayed individually without revealing the correct answer or explanation. After submitting all answers, your responses are evaluated against the subject rubric, delivering individual Result classifications (Correct, Partially Correct, Incorrect), expected answers, and detailed improvement guidance.
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
