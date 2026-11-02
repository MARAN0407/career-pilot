import React, { useState, useEffect, useRef } from 'react';
import { InterviewQuestion } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { 
  Camera, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Clock, 
  Play, 
  Square, 
  ChevronRight, 
  Sparkles, 
  Bot,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface CameraStudioProps {
  questions: InterviewQuestion[];
  onComplete: (answers: { questionId: string; question: string; answerText: string }[]) => void;
  onCancel: () => void;
}

export const CameraStudio: React.FC<CameraStudioProps> = ({
  questions,
  onComplete,
  onCancel
}) => {
  const { user } = useAuth();
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentText, setCurrentText] = useState<string>('');
  const [isCameraOn, setIsCameraOn] = useState<boolean>(true);
  const [isMicOn, setIsMicOn] = useState<boolean>(true);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);

  const currentQ = questions[currentIdx] || questions[0];

  // Request actual camera stream if available
  useEffect(() => {
    let active = true;
    async function initCamera() {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
          });
          if (active && videoRef.current) {
            videoRef.current.srcObject = stream;
            streamRef.current = stream;
          }
        }
      } catch (err) {
        console.warn('Webcam permission not granted or device not available, using simulated stream', err);
        setCameraError('Webcam preview unavailable - speech analysis active');
      }
    }
    initCamera();

    return () => {
      active = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  // Speech Recognition setup for live audio transcription
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript + ' ';
        }
        if (transcript.trim()) {
          setCurrentText(transcript.trim());
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
    };
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartAnswer = () => {
    setIsRecording(true);
    setTimerSeconds(0);
    setCurrentText(''); // Do NOT put fake starter text!

    if (recognitionRef.current && isMicOn) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn('Speech recognition start error', e);
      }
    }
  };

  const handleFinishAnswer = () => {
    setIsRecording(false);
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }

    // Save actual text (empty if candidate was silent)
    const updatedAnswers = {
      ...answers,
      [currentQ.id]: currentText.trim()
    };
    setAnswers(updatedAnswers);

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setCurrentText('');
      setTimerSeconds(0);
    } else {
      // Complete interview with actual answers
      const finalAnswers = questions.map(q => ({
        questionId: q.id,
        question: q.questionText,
        answerText: updatedAnswers[q.id] || ''
      }));
      onComplete(finalAnswers);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0A1A2E] text-white flex flex-col font-sans select-none overflow-hidden">
      {/* Top Studio Bar */}
      <div className="px-6 py-3 bg-[#081525] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#2F9C95] flex items-center justify-center font-bold text-sm">
            AI
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight">AI Camera Interview Assessment</h2>
            <p className="text-[11px] text-slate-400">
              Role: <span className="text-teal-300 font-medium">Machine Learning & Neural Systems</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-300" />
            <span>Answer Timer: {formatTime(timerSeconds)}</span>
          </div>

          <button
            onClick={onCancel}
            className="text-xs px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-slate-300 transition"
          >
            Exit Assessment
          </button>
        </div>
      </div>

      {/* Main Studio Viewport */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-4 sm:p-6 gap-6">
        {/* Left: Large Camera Assessment View */}
        <div className="flex-1 bg-slate-900 rounded-2xl border border-white/10 overflow-hidden relative flex flex-col justify-between shadow-2xl">
          {/* Webcam Viewport */}
          <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
            {isCameraOn ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover mirror-mode"
                style={{ transform: 'scaleX(-1)' }}
              />
            ) : (
              <div className="text-center space-y-2 text-slate-400">
                <VideoOff className="w-12 h-12 mx-auto text-slate-600" />
                <p className="text-xs">Camera is disabled</p>
              </div>
            )}

            {/* Candidate Name Badge */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 text-white text-xs backdrop-blur-md border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Candidate: <strong>{user?.name || 'Ilamaran'}</strong></span>
            </div>

            {/* Recording Indicator Badge */}
            {isRecording && (
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-rose-600/90 text-white text-xs font-semibold backdrop-blur-md animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                <span>REC • AI Evaluating Real-time Audio</span>
              </div>
            )}

            {/* Fallback portrait simulation if webcam stream not available */}
            {cameraError && (
              <div className="absolute inset-0 bg-[#173B63]/70 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-24 h-24 rounded-full border-4 border-[#2F9C95] overflow-hidden mb-3 shadow-xl">
                  <img
                    src={user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.name || 'Ilamaran')}&backgroundColor=173b63,2f9c95`}
                    alt="Student Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-semibold text-teal-300 bg-black/40 px-3 py-1 rounded-full backdrop-blur-xs">
                  Candidate: {user?.name || 'Ilamaran'} (Live Audio Assessment)
                </span>
              </div>
            )}

            {/* Audio Waveform Meter */}
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-xs border border-white/10">
              <Mic className={`w-3.5 h-3.5 ${isMicOn ? 'text-teal-400' : 'text-rose-400'}`} />
              <div className="flex items-center gap-1 h-3">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full transition-all ${
                      isRecording && isMicOn ? 'bg-[#2F9C95] h-3' : 'bg-slate-600 h-1'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Camera Bottom Controls */}
          <div className="p-4 bg-[#0B1E33] border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className={`p-2.5 rounded-xl border transition ${
                  isMicOn ? 'bg-white/10 border-white/20 text-white' : 'bg-rose-500/20 border-rose-500 text-rose-300'
                }`}
                title="Toggle Mic"
              >
                {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsCameraOn(!isCameraOn)}
                className={`p-2.5 rounded-xl border transition ${
                  isCameraOn ? 'bg-white/10 border-white/20 text-white' : 'bg-rose-500/20 border-rose-500 text-rose-300'
                }`}
                title="Toggle Video"
              >
                {isCameraOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </button>
            </div>

            {/* Core Action Button */}
            <div className="flex items-center gap-3">
              {!isRecording ? (
                <button
                  onClick={handleStartAnswer}
                  className="px-6 py-2.5 rounded-xl bg-[#2F9C95] hover:bg-[#3EBAB2] text-white font-semibold text-xs shadow-lg flex items-center gap-2 transition cursor-pointer"
                >
                  <Play className="w-4 h-4" />
                  <span>Start Speaking Answer</span>
                </button>
              ) : (
                <button
                  onClick={handleFinishAnswer}
                  className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-lg flex items-center gap-2 transition animate-bounce cursor-pointer"
                >
                  <Square className="w-4 h-4 fill-white" />
                  <span>Finish Answer & Next</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: AI Interviewer Question Panel */}
        <div className="w-full lg:w-112 bg-[#0F2642] rounded-2xl border border-white/10 p-6 flex flex-col justify-between shadow-2xl">
          <div className="space-y-4">
            {/* Header Question Tracker */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                  Question {currentIdx + 1} of {questions.length}
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-semibold">
                  {currentQ.difficulty}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                Category: {currentQ.category}
              </span>
            </div>

            {/* Question Text */}
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#7567C7] text-white shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-indigo-300 uppercase">AI Interviewer:</span>
                  <h3 className="text-sm sm:text-base font-semibold text-white leading-relaxed mt-1">
                    "{currentQ.questionText}"
                  </h3>
                </div>
              </div>

              {/* Rubric Criteria */}
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-slate-300 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#7567C7]" />
                  Rubric Assessment Criteria:
                </span>
                <ul className="space-y-1 text-[11px]">
                  {currentQ.expectedKeypoints.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 text-slate-300">
                      <span className="text-teal-400">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Answer Transcription Preview & Edit */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-300 flex items-center justify-between">
                <span>Live Speech Transcript / Answer Notes:</span>
                {isRecording && <span className="text-teal-400 text-[10px] animate-pulse">● Listening...</span>}
              </label>
              <textarea
                rows={4}
                value={currentText}
                onChange={e => setCurrentText(e.target.value)}
                placeholder="Speak into your microphone to record your answer, or type your answer here..."
                className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-teal-400 font-sans leading-relaxed"
              />
              {!currentText && !isRecording && (
                <p className="text-[10px] text-amber-400">
                  Tip: Speak or type your answer. Unanswered prompts will receive 0 marks.
                </p>
              )}
            </div>
          </div>

          {/* Question Stepper Indicator Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {questions.map((_, i) => (
                <span
                  key={i}
                  className={`w-6 h-1.5 rounded-full transition-all ${
                    i < currentIdx
                      ? 'bg-[#2F9C95]'
                      : i === currentIdx
                      ? 'bg-teal-300 w-8'
                      : 'bg-white/20'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleFinishAnswer}
              className="text-xs text-teal-300 hover:text-white font-medium flex items-center gap-1 cursor-pointer"
            >
              <span>{currentIdx + 1 === questions.length ? 'Finish & Evaluate' : 'Next / Submit'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
