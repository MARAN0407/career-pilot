import React, { useState } from 'react';
import { CourseMaterial } from '../../types';
import { ragService } from '../../services/ragService';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Sparkles, 
  Send, 
  Bot, 
  Clock, 
  FileText, 
  Download,
  X 
} from 'lucide-react';

interface VideoPlayerModalProps {
  material: CourseMaterial | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  material,
  isOpen,
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [progress, setProgress] = useState<number>(34); // %
  const [query, setQuery] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: 'Ask any question about this lecture video! I can look up timestamps, summarize specific segments, or explain complex derivations mentioned by Dr. Kumar.'
    }
  ]);

  if (!isOpen || !material) return null;

  const handleSend = async (customText?: string) => {
    const text = customText || query;
    if (!text.trim() || isAiLoading) return;

    setChatMessages(prev => [...prev, { sender: 'user', text }]);
    setQuery('');
    setIsAiLoading(true);

    const response = await ragService.queryCourseRag(material.courseTitle, text);
    setChatMessages(prev => [...prev, { sender: 'ai', text: response.answer }]);
    setIsAiLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-6xl h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-3.5 bg-[#173B63] text-white flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm truncate">{material.title}</h3>
            <p className="text-[11px] text-slate-300">{material.courseTitle} • {material.fileSizeOrDuration}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/20 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Video Player Section */}
          <div className="flex-1 bg-slate-900 flex flex-col overflow-y-auto">
            {/* Visual Screen Container */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10 pointer-events-none" />

              {/* Classroom Blackboard Simulation Frame */}
              <div className="w-full h-full p-8 flex flex-col justify-between bg-[#1B365D] border-8 border-[#0F2642] select-none text-white">
                <div className="flex items-center justify-between text-xs text-teal-300 font-mono">
                  <span>Apex Institute • CS602 Neural Architectures</span>
                  <span>Dr. Suresh Kumar</span>
                </div>

                <div className="text-center space-y-3">
                  <div className="inline-block px-3 py-1 rounded bg-white/10 text-xs font-mono text-blue-200">
                    Computational Graph: Forward & Backward Passes
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white">
                    dLoss / dW^[l] = δ^[l] · (A^[l-1])^T
                  </h2>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Matrix formulation of backpropagation for layer l with mini-batch dimension m
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Lecture 7: Backpropagation</span>
                  <span>Video Timestamp: 14:32 / 42:00</span>
                </div>
              </div>

              {/* Center Play button overlay */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute z-20 w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition shadow-lg"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 translate-x-0.5" />}
              </button>

              {/* Video Bottom Control Bar */}
              <div className="absolute bottom-0 inset-x-0 z-20 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2">
                {/* Timeline slider */}
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={progress}
                  onChange={e => setProgress(Number(e.target.value))}
                  className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#2F9C95]"
                />

                <div className="flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-[#2F9C95]">
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button onClick={() => setProgress(0)} className="hover:text-slate-300" title="Restart">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button onClick={() => setIsMuted(!isMuted)} className="hover:text-slate-300">
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span className="font-mono text-[11px] text-slate-300">14:32 / 42:00</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {[1, 1.25, 1.5, 2].map(s => (
                      <button
                        key={s}
                        onClick={() => setSpeed(s)}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                          speed === s ? 'bg-[#2F9C95] text-white font-bold' : 'bg-white/10 hover:bg-white/20 text-slate-300'
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Lecture Notes & Transcript details */}
            <div className="p-6 bg-slate-900 text-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h4 className="text-sm font-semibold text-white">Lecture Timestamps & Key Moments</h4>
                <span className="text-xs text-[#2F9C95] font-mono">Synced with AI Notes</span>
              </div>
              <div className="grid sm:grid-cols-3 gap-2 text-xs">
                <button
                  onClick={() => setProgress(10)}
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-left transition"
                >
                  <span className="text-[#3EBAB2] font-mono font-bold block">04:15</span>
                  <span className="text-slate-300">Forward pass caching</span>
                </button>
                <button
                  onClick={() => setProgress(34)}
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-[#2F9C95]/40 text-left transition bg-[#2F9C95]/10"
                >
                  <span className="text-[#3EBAB2] font-mono font-bold block">14:32</span>
                  <span className="text-slate-300">Chain rule on matrix tensors</span>
                </button>
                <button
                  onClick={() => setProgress(75)}
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-left transition"
                >
                  <span className="text-[#3EBAB2] font-mono font-bold block">31:40</span>
                  <span className="text-slate-300">ReLU vs Sigmoid gradients</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: AI Q&A Panel */}
          <div className="w-full lg:w-96 bg-white flex flex-col border-l border-slate-200">
            <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#7567C7] text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#173B63]">Ask AI About This Lecture</h4>
                  <p className="text-[10px] text-slate-500">Transcribed & Vector-Indexed</p>
                </div>
              </div>
            </div>

            {/* Quick Chips */}
            <div className="p-2.5 bg-slate-50 border-b border-slate-200 flex gap-1.5 overflow-x-auto text-[11px]">
              {['Explain 14:32 timestamp', 'Summarize key equations', 'Why use ReLU here?'].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip)}
                  className="px-2 py-1 rounded-full bg-white border border-slate-200 hover:border-[#7567C7] text-slate-600 shrink-0 text-[11px]"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Chat Flow */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-6 h-6 rounded bg-[#7567C7]/15 text-[#7567C7] flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-xl p-3 leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#173B63] text-white'
                        : 'bg-slate-50 border border-slate-200 text-slate-800'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>
              ))}

              {isAiLoading && (
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <Bot className="w-4 h-4 animate-spin text-[#7567C7]" />
                  <span>Searching video transcript...</span>
                </div>
              )}
            </div>

            {/* Form */}
            <div className="p-3 border-t border-slate-200 bg-white">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Ask a question about this lecture..."
                  className="flex-1 bg-slate-50 text-xs px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#7567C7]"
                />
                <button
                  type="submit"
                  disabled={!query.trim() || isAiLoading}
                  className="p-2 bg-[#7567C7] hover:bg-[#6456b8] disabled:opacity-50 text-white rounded-lg transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
