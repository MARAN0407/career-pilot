import React, { useState } from 'react';
import { MaterialType } from '../../types';
import { classService } from '../../services/classService';
import { 
  UploadCloud, 
  FileText, 
  Presentation, 
  Video, 
  Headphones, 
  Image as ImageIcon, 
  CheckCircle2, 
  Database, 
  X,
  Sparkles
} from 'lucide-react';

interface MaterialUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  defaultCourseId?: string;
}

export const MaterialUploadModal: React.FC<MaterialUploadModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  defaultCourseId = 'crs_ml_101'
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courseId, setCourseId] = useState(defaultCourseId);
  const [materialType, setMaterialType] = useState<MaterialType>('pdf');
  const [topic, setTopic] = useState('');
  const [addToRag, setAddToRag] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsUploading(true);
    setUploadProgress(20);

    const timer = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(timer);
          return 90;
        }
        return prev + 25;
      });
    }, 150);

    await classService.uploadMaterial({
      courseId,
      title,
      description,
      type: materialType,
      topic: topic || 'General Coursework',
      fileSizeOrDuration: materialType === 'video' ? '35 mins' : materialType === 'audio' ? '15 mins' : '4.2 MB',
      isRagIndexed: addToRag
    });

    clearInterval(timer);
    setUploadProgress(100);
    setIsUploading(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      onSuccess();
      onClose();
    }, 1200);
  };

  const typeOptions: { type: MaterialType; label: string; icon: React.ReactNode }[] = [
    { type: 'pdf', label: 'PDF Document', icon: <FileText className="w-4 h-4 text-rose-500" /> },
    { type: 'ppt', label: 'Presentation (PPT)', icon: <Presentation className="w-4 h-4 text-amber-500" /> },
    { type: 'video', label: 'Lecture Video', icon: <Video className="w-4 h-4 text-blue-500" /> },
    { type: 'audio', label: 'Audio Lecture', icon: <Headphones className="w-4 h-4 text-emerald-500" /> },
    { type: 'doc', label: 'DOC / Note', icon: <FileText className="w-4 h-4 text-indigo-500" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0F2642] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <UploadCloud className="w-5 h-5 text-teal-400" />
            <div>
              <h3 className="font-bold text-sm">Upload Learning Material</h3>
              <p className="text-[11px] text-slate-300">Publish resources for students & AI RAG search</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/20 text-slate-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isSuccess ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-[#173B63]">Material Uploaded Successfully!</h4>
              <p className="text-xs text-slate-500">
                {addToRag ? 'Vector embeddings generated and added to Course AI Knowledge Base.' : 'Material is now accessible to all enrolled students.'}
              </p>
            </div>
          ) : (
            <>
              {/* Type Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Material Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {typeOptions.map(opt => (
                    <button
                      type="button"
                      key={opt.type}
                      onClick={() => setMaterialType(opt.type)}
                      className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition ${
                        materialType === opt.type
                          ? 'border-[#2F9C95] bg-teal-50/50 text-[#173B63] font-semibold ring-1 ring-[#2F9C95]'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      {opt.icon}
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Topic */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Material Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lecture 8: Transformer Self-Attention Mechanics & Code"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#2F9C95]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Course</label>
                  <select
                    value={courseId}
                    onChange={e => setCourseId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#2F9C95] bg-white"
                  >
                    <option value="crs_ml_101">CS602 — Machine Learning & Neural Architectures</option>
                    <option value="crs_ai_201">CS605 — Applied AI & LLM Systems</option>
                    <option value="crs_dl_301">CS610 — Deep Learning & Computer Vision</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Topic / Module</label>
                  <input
                    type="text"
                    placeholder="e.g. Attention & Transformers"
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#2F9C95]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description / Key Notes</label>
                <textarea
                  rows={3}
                  placeholder="Summarize the core topics covered in this lecture or document..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#2F9C95]"
                />
              </div>

              {/* RAG Vector Indexing Toggle */}
              <div className="p-3.5 bg-gradient-to-r from-[#7567C7]/10 to-[#2F9C95]/10 rounded-xl border border-[#7567C7]/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-[#7567C7] text-white rounded-lg">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#173B63] block">
                      Add to AI Knowledge Base (RAG)
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Enables semantic search & student AI assistance for this file
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={addToRag}
                  onChange={e => setAddToRag(e.target.checked)}
                  className="w-4 h-4 accent-[#7567C7] cursor-pointer"
                />
              </div>

              {/* Progress bar if uploading */}
              {isUploading && (
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Uploading and vectorizing chunks...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#2F9C95] h-full transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#0F2642] hover:bg-[#173B63] rounded-lg shadow-sm transition disabled:opacity-50 flex items-center gap-1.5"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>{isUploading ? 'Uploading...' : 'Publish Material'}</span>
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
