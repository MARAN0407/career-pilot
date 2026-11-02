import React, { useState } from 'react';
import { CourseMaterial } from '../../types';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  Download, 
  Headphones, 
  FileText, 
  Sparkles,
  Bot,
  X 
} from 'lucide-react';

interface AudioPlayerModalProps {
  material: CourseMaterial | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AudioPlayerModal: React.FC<AudioPlayerModalProps> = ({
  material,
  isOpen,
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [progress, setProgress] = useState<number>(20);

  if (!isOpen || !material) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#173B63] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-500/20 text-teal-300 rounded-xl">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">{material.title}</h3>
              <p className="text-xs text-slate-300">{material.courseTitle} • {material.fileSizeOrDuration}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/20 text-slate-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Player Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Audio Waveform Visualizer */}
          <div className="p-6 bg-slate-900 rounded-2xl flex flex-col items-center justify-center gap-4 relative overflow-hidden">
            <div className="flex items-center gap-1 sm:gap-1.5 h-16 w-full justify-center">
              {Array.from({ length: 36 }).map((_, idx) => {
                const isActive = (idx / 36) * 100 <= progress;
                const baseHeight = Math.sin(idx * 0.4) * 24 + 32;
                return (
                  <div
                    key={idx}
                    className={`w-1.5 sm:w-2 rounded-full transition-all duration-150 ${
                      isActive ? 'bg-[#2F9C95]' : 'bg-slate-700'
                    } ${isPlaying ? 'animate-pulse' : ''}`}
                    style={{
                      height: isPlaying ? `${Math.max(8, baseHeight + (idx % 3) * 6)}px` : `${baseHeight}px`
                    }}
                  />
                );
              })}
            </div>

            <div className="w-full flex justify-between items-center text-xs text-slate-400 font-mono">
              <span>03:36</span>
              <span>18:00</span>
            </div>
          </div>

          {/* Timeline Range */}
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={e => setProgress(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2F9C95]"
          />

          {/* Player Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setProgress(0)}
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full bg-[#173B63] hover:bg-[#204B7D] text-white flex items-center justify-center shadow-md transition"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 translate-x-0.5" />}
              </button>
              <button
                onClick={() => alert(`Downloading ${material.title}`)}
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition"
                title="Download Audio"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>

            {/* Playback speed selector */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
              {[0.75, 1, 1.25, 1.5].map(s => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-2.5 py-1 rounded text-xs font-medium font-mono ${
                    speed === s ? 'bg-white text-[#173B63] shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Synced Audio Transcript */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#3B82C4]" />
                Audio Transcript (AI Synchronized)
              </span>
              <span className="text-[11px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded font-medium">
                Live Synced
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-600">
              {material.transcript || "In this audio lecture, Dr. Kumar reviews the fundamental principles of loss surfaces, gradient descent optimization, and how momentum mitigates oscillations in steep ravines..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
