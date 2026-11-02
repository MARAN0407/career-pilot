import React, { useState } from 'react';
import { CourseMaterial } from '../../types';
import { ragService, RagQueryResponse } from '../../services/ragService';
import { 
  FileText, 
  Sparkles, 
  Send, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  BookOpen,
  Bot,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  X
} from 'lucide-react';

interface PdfViewerModalProps {
  material: CourseMaterial | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  material,
  isOpen,
  onClose
}) => {
  const [zoom, setZoom] = useState<number>(100);
  const [query, setQuery] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{
    sender: 'user' | 'ai';
    text: string;
    sources?: RagQueryResponse['sourceDocuments'];
  }>>([
    {
      sender: 'ai',
      text: `Hello! I have indexed **${material?.title || 'this document'}** into the course RAG system. You can ask me to summarize sections, derive formulas, or generate revision quiz questions based on this PDF.`
    }
  ]);

  if (!isOpen || !material) return null;

  const handleSend = async (customQuery?: string) => {
    const textToSend = customQuery || query;
    if (!textToSend.trim() || isAiLoading) return;

    setChatMessages(prev => [...prev, { sender: 'user', text: textToSend }]);
    setQuery('');
    setIsAiLoading(true);

    const response = await ragService.queryCourseRag(material.courseTitle, textToSend);

    setChatMessages(prev => [
      ...prev,
      {
        sender: 'ai',
        text: response.answer,
        sources: response.sourceDocuments
      }
    ]);
    setIsAiLoading(false);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-7xl h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header Bar */}
        <div className="px-6 py-3.5 bg-[#173B63] text-white flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 bg-white/10 rounded-lg shrink-0">
              <FileText className="w-5 h-5 text-teal-300" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm truncate">{material.title}</h3>
              <p className="text-[11px] text-slate-300">{material.courseTitle} • {material.fileSizeOrDuration}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`Downloading ${material.title}`)}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/20 text-slate-300 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Workspace Body: Split Document Viewer & AI Assistant */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left: Document View Pane */}
          <div className="flex-1 bg-slate-100 flex flex-col border-r border-slate-200 overflow-hidden">
            {/* Viewer Controls */}
            <div className="px-4 py-2 bg-white border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2 font-medium">
                <BookOpen className="w-4 h-4 text-[#3B82C4]" />
                <span>Document View • Page 14 of 48</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoom(prev => Math.max(60, prev - 15))}
                  className="p-1 hover:bg-slate-100 rounded text-slate-500"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="font-mono text-[11px] w-12 text-center">{zoom}%</span>
                <button
                  onClick={() => setZoom(prev => Math.min(160, prev + 15))}
                  className="p-1 hover:bg-slate-100 rounded text-slate-500"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Content Simulation */}
            <div className="flex-1 p-6 overflow-y-auto flex justify-center">
              <div
                className="bg-white shadow-lg border border-slate-200 rounded-lg p-8 sm:p-10 max-w-2xl w-full text-slate-800 space-y-6 transition-transform"
                style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
              >
                <div className="border-b border-slate-200 pb-4 text-center">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    {material.courseTitle}
                  </span>
                  <h1 className="text-xl font-bold text-[#173B63] mt-1">
                    Module 2: Gradient Optimization & Regularization Mechanics
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">Faculty: Dr. Suresh Kumar • Department of AI & Computer Science</p>
                </div>

                <div className="space-y-4 text-xs leading-relaxed text-slate-700">
                  <h2 className="text-sm font-bold text-slate-900 border-l-4 border-[#2F9C95] pl-2">
                    1. Analytical Formulation of Backpropagation
                  </h2>
                  <p>
                    Let the computational graph define a multi-layer perceptron parameterized by weight matrices W^[1], ..., W^[L] and bias vectors b^[1], ..., b^[L].
                  </p>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-[11px] text-[#173B63]">
                    Forward Pass:<br />
                    Z^[l] = W^[l] · A^[l-1] + b^[l]<br />
                    A^[l] = g^[l](Z^[l])
                  </div>
                  <p>
                    By applying the multivariate chain rule, the error signal at the output layer L with respect to the pre-activation matrix Z^[L] is computed as:
                  </p>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-[11px] text-[#173B63]">
                    dZ^[L] = A^[L] - Y  (for Cross-Entropy with Softmax)
                  </div>
                  <h2 className="text-sm font-bold text-slate-900 border-l-4 border-[#3B82C4] pl-2">
                    2. L1 (Lasso) vs L2 (Ridge) Regularization
                  </h2>
                  <p>
                    When optimizing under L1 penalty (||W||_1 = sum |w_ij|), the diamond-shaped constraint boundaries intersect the quadratic loss contours along the parameter axes. This forces negligible weights to exactly zero, producing sparse representations ideal for feature selection.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: AI RAG Assistant Pane */}
          <div className="w-full lg:w-104 bg-white flex flex-col border-l border-slate-200">
            <div className="p-3.5 bg-gradient-to-r from-[#7567C7]/10 to-[#3B82C4]/10 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#7567C7] text-white shadow-2xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#173B63]">Ask AI About This Document</h4>
                  <p className="text-[10px] text-slate-500">RAG Grounded in Lecture Notes</p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                Vector Indexed
              </span>
            </div>

            {/* Quick Prompt Chips */}
            <div className="p-2.5 bg-slate-50 border-b border-slate-200 flex gap-1.5 overflow-x-auto text-[11px]">
              {[
                'Derive Backprop',
                'L1 vs L2 Difference',
                'Generate Quiz Question',
                'Summarize Key Takeaways'
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip)}
                  className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-[#7567C7] hover:text-[#7567C7] text-slate-600 shrink-0 transition text-[11px] font-medium"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-7 h-7 rounded-lg bg-[#7567C7]/15 text-[#7567C7] flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-xl p-3.5 leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#173B63] text-white'
                        : 'bg-slate-50 border border-slate-200 text-slate-800'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Sources citation cards */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-200/80 space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Document Citations:
                        </span>
                        {msg.sources.map((src, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-2 rounded bg-white border border-slate-200 text-[11px] text-slate-600 flex items-start justify-between gap-1"
                          >
                            <div>
                              <span className="font-semibold text-[#173B63] block truncate">
                                {src.title}
                              </span>
                              <span className="text-[10px] text-teal-600 font-medium">{src.pageOrTimestamp}</span>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          </div>
                        ))}
                      </div>
                    )}

                    {msg.sender === 'ai' && (
                      <div className="mt-2 flex items-center justify-end">
                        <button
                          onClick={() => handleCopy(msg.text, idx)}
                          className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center gap-1"
                        >
                          {copiedIndex === idx ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-600">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isAiLoading && (
                <div className="flex gap-2.5 items-center text-slate-500 text-xs">
                  <div className="w-7 h-7 rounded-lg bg-[#7567C7]/15 text-[#7567C7] flex items-center justify-center">
                    <Bot className="w-4 h-4 animate-spin" />
                  </div>
                  <span className="animate-pulse">Retrieving vector chunks and generating response...</span>
                </div>
              )}
            </div>

            {/* Chat Input */}
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
                  placeholder="Ask a question about this lecture document..."
                  className="flex-1 bg-slate-50 text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#7567C7] focus:bg-white transition"
                />
                <button
                  type="submit"
                  disabled={!query.trim() || isAiLoading}
                  className="p-2.5 bg-[#7567C7] hover:bg-[#6456b8] disabled:opacity-50 text-white rounded-lg transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
