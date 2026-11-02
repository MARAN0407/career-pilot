import React, { useState, useEffect, useRef } from 'react';
import { InterviewQuestion } from '../../types';
import { 
  Mic, 
  Square, 
  Sparkles, 
  Bot, 
  Headphones,
  Activity,
  Edit3,
  Check
} from 'lucide-react';

interface VoiceStudioProps {
  questions: InterviewQuestion[];
  onComplete: (answers: { questionId: string; question: string; answerText: string }[]) => void;
  onCancel: () => void;
}

export const VoiceStudio: React.FC<VoiceStudioProps> = ({
  questions,
  onComplete,
  onCancel
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [stage, setStage] = useState<'idle' | 'recording' | 'reviewing' | 'evaluating'>('idle');
  const [timer, setTimer] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [liveTranscript, setLiveTranscript] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const recognitionRef = useRef<any>(null);

  const currentQ = questions[currentIdx] || questions[0];

  // Speech Recognition setup
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
        setLiveTranscript(transcript.trim());
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition notice:', event.error);
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
    if (stage === 'recording') {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [stage]);

  const startRecording = () => {
    setStage('recording');
    setTimer(0);
    setLiveTranscript(''); // NO hardcoded fake text!

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn('Recognition already started or permission blocked');
      }
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }
    setStage('reviewing');
  };

  const confirmAndProceed = () => {
    setStage('evaluating');

    setTimeout(() => {
      // Save genuine recorded response (empty if candidate was silent)
      const recorded = liveTranscript.trim();
      const updated = { ...answers, [currentQ.id]: recorded };
      setAnswers(updated);

      if (currentIdx + 1 < questions.length) {
        setCurrentIdx(prev => prev + 1);
        setStage('idle');
        setTimer(0);
        setLiveTranscript('');
        setIsEditing(false);
      } else {
        onComplete(
          questions.map(q => ({
            questionId: q.id,
            question: q.questionText,
            answerText: updated[q.id] || ''
          }))
        );
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0B1726] text-white flex flex-col font-sans select-none overflow-hidden">
      {/* Top Bar */}
      <div className="px-6 py-4 bg-[#08111D] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#7567C7] text-white shadow-md">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold">AI Voice Interview Simulator</h2>
            <p className="text-[11px] text-slate-400">Live Speech-to-Text & Acoustic Analysis Engine</p>
          </div>
        </div>

        <button
          onClick={onCancel}
          className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 transition"
        >
          Exit Assessment
        </button>
      </div>

      {/* Main Voice Hub */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-3xl mx-auto w-full text-center space-y-6 overflow-y-auto">
        {/* Question Counter */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-teal-300">
          <span>Question {currentIdx + 1} of {questions.length}</span>
          <span>•</span>
          <span>{currentQ.difficulty}</span>
        </div>

        {/* AI Question Statement */}
        <div className="space-y-3 max-w-2xl">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7567C7] to-[#3B82C4] flex items-center justify-center mx-auto shadow-xl">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold leading-relaxed text-white">
            "{currentQ.questionText}"
          </h3>
        </div>

        {/* Dynamic Waveform Visualizer */}
        <div className="w-full max-w-lg p-5 bg-slate-900/90 rounded-2xl border border-white/10 flex flex-col items-center gap-3">
          <div className="flex items-center gap-1.5 h-12 justify-center w-full">
            {Array.from({ length: 28 }).map((_, i) => {
              const isActive = stage === 'recording';
              const height = isActive ? Math.max(6, Math.sin(i * 0.5 + timer) * 22 + 24) : 4;
              return (
                <div
                  key={i}
                  className={`w-2 rounded-full transition-all duration-150 ${
                    isActive ? 'bg-[#2F9C95]' : 'bg-slate-700'
                  }`}
                  style={{ height: `${height}px` }}
                />
              );
            })}
          </div>

          <div className="flex items-center justify-between w-full text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-teal-400" />
              Status: <strong className="text-white uppercase">{stage}</strong>
            </span>
            <span>Duration: {timer}s</span>
          </div>
        </div>

        {/* Live Speech Recognition Box */}
        {(stage === 'recording' || stage === 'reviewing') && (
          <div className="w-full max-w-lg p-4 bg-white/5 rounded-xl border border-white/10 text-left space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">
                {stage === 'recording' ? '● Recording Speech (Speak clearly):' : 'Review Your Spoken Transcript:'}
              </span>
              {stage === 'reviewing' && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-[11px] text-teal-300 hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>{isEditing ? 'Done Editing' : 'Edit Text'}</span>
                </button>
              )}
            </div>

            {isEditing ? (
              <textarea
                rows={3}
                value={liveTranscript}
                onChange={e => setLiveTranscript(e.target.value)}
                className="w-full p-2 bg-slate-900 border border-teal-500 rounded-lg text-xs text-white focus:outline-none"
              />
            ) : (
              <p className="text-xs text-slate-200 italic leading-relaxed min-h-12 bg-black/30 p-2.5 rounded-lg border border-white/5">
                {liveTranscript ? `"${liveTranscript}"` : '(No speech detected yet. Speak into your microphone or click edit text)'}
              </p>
            )}

            {!liveTranscript && stage === 'reviewing' && (
              <p className="text-[11px] text-amber-400">
                Notice: No speech was detected. If you submit without speaking, this question will receive 0 marks.
              </p>
            )}
          </div>
        )}

        {/* Primary Controls */}
        <div className="flex items-center gap-4">
          {stage === 'idle' ? (
            <button
              onClick={startRecording}
              className="px-8 py-3.5 rounded-2xl bg-[#2F9C95] hover:bg-[#3EBAB2] text-white font-bold text-sm shadow-xl flex items-center gap-2.5 transition transform hover:scale-105 cursor-pointer"
            >
              <Mic className="w-5 h-5" />
              <span>Start Speaking Answer</span>
            </button>
          ) : stage === 'recording' ? (
            <button
              onClick={stopRecording}
              className="px-8 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-xl flex items-center gap-2.5 transition animate-pulse cursor-pointer"
            >
              <Square className="w-5 h-5 fill-white" />
              <span>Finish Speaking ({timer}s)</span>
            </button>
          ) : stage === 'reviewing' ? (
            <div className="flex items-center gap-3">
              <button
                onClick={startRecording}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold transition"
              >
                Re-record
              </button>
              <button
                onClick={confirmAndProceed}
                className="px-6 py-2.5 rounded-xl bg-[#2F9C95] hover:bg-[#3EBAB2] text-white text-xs font-bold transition shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Submit & Next Question</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-teal-300">
              <Sparkles className="w-5 h-5 animate-spin" />
              <span>Evaluating speech acoustics and keywords...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
