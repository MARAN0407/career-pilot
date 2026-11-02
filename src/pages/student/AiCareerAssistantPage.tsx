import React, { useState } from 'react';
import { Bot, Send, User, Sparkles, Copy, Check, RotateCcw, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const AiCareerAssistantPage: React.FC = () => {
  const { user } = useAuth();
  const userName = user?.name || 'Ilamaran';

  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: `Hello ${userName}! I'm your Career Pilot AI Mentor. I have access to your academic coursework in Machine Learning, your resume ATS score, and your latest mock interview analytics.\n\nHow can I assist your career and interview preparation today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const suggestedPrompts = [
    "What skills should I learn for an AI Engineer role?",
    "Review my resume and identify missing keywords.",
    "Give me an ML interview question on Backpropagation.",
    "Create a 3-month learning roadmap for MLOps."
  ];

  const handleSend = (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || isLoading) return;

    setMessages(prev => [...prev, { sender: 'user', text: textToSend }]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      let reply = "";
      const lower = textToSend.toLowerCase();

      if (lower.includes('skills') || lower.includes('ai engineer')) {
        reply = "For an **AI Engineer** role at top tech companies, your profile already boasts strong foundations in **Python (92%)**, **PyTorch**, and **Neural Architectures (CS602)**.\n\nTo bridge the gap to top tier applicants:\n1. **Docker & Containerization**: Package PyTorch inference servers inside lightweight Alpine/CUDA containers.\n2. **FastAPI & Async Pipelines**: Benchmark p99 latency for high-throughput batching.\n3. **Vector Databases (ChromaDB / FAISS)**: Build multi-document RAG pipelines with reranking.\n\nWould you like me to add the Docker micro-course to your Learning Hub?";
      } else if (lower.includes('resume') || lower.includes('keywords')) {
        reply = "Your current resume has an **ATS score of 86/100 (Excellent)**!\n\n**High-Impact Suggestions:**\n• Add numerical performance gains: e.g., instead of *'Trained ResNet on images'*, write *'Trained 12-layer ResNet in PyTorch on 50k images achieving 94.2% top-1 accuracy with 3.2x TensorRT latency speedup'*.\n• Include missing keywords: **AWS SageMaker**, **MLOps**, **Vector Search**, and **CI/CD**.\n\nYou can run a real-time audit anytime in the **Resume AI** tab.";
      } else if (lower.includes('interview') || lower.includes('question') || lower.includes('backprop')) {
        reply = "Here is an intermediate Machine Learning interview question:\n\n**Question:** *'Explain why batch normalization accelerates convergence during deep neural network training, and how it behaves differently during training versus test inference.'*\n\n**Key concepts to hit:**\n1. Normalizes mini-batch mean to 0 and variance to 1, smoothing the loss landscape.\n2. Uses learnable scale $(\\gamma)$ and shift $(\\beta)$ parameters.\n3. During test inference, it utilizes running exponential moving averages rather than batch statistics.\n\nReady to test this in the **Camera Interview Studio**?";
      } else {
        reply = `Based on your academic profile and 3.88 GPA in Computer Science:\n\nTo achieve your goal regarding **"${textToSend}"**, I recommend aligning your weekly project goals with your Course 602 coursework, scheduling 2 AI Mock Interviews per month, and tracking progress in your Career Roadmap.\n\nWould you like me to generate a personalized practice session or open your skill gap matrix?`;
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
      setIsLoading(false);
    }, 600);
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#173B63] flex items-center gap-2">
            <Bot className="w-6 h-6 text-[#7567C7]" />
            <span>CareerAI Assistant & Personal Mentor</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            24/7 intelligent career guidance, resume suggestions, interview coaching, and skill advice
          </p>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-600 transition flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Chat</span>
        </button>
      </div>

      {/* Main Chat Box */}
      <div className="academic-card overflow-hidden flex flex-col h-[600px] border border-slate-200 shadow-md">
        {/* Chat Banner */}
        <div className="p-4 bg-gradient-to-r from-[#173B63] via-[#2F9C95] to-[#7567C7] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/15 backdrop-blur-md rounded-xl">
              <Sparkles className="w-4 h-4 text-teal-300" />
            </div>
            <div>
              <h3 className="font-bold text-xs">Career Pilot AI Model v3.2</h3>
              <p className="text-[10px] text-slate-200">Personalized to {userName} • CS Junior</p>
            </div>
          </div>
          <span className="text-[10px] bg-white/20 text-white font-mono px-2 py-0.5 rounded-full font-bold">
            Online & Ready
          </span>
        </div>

        {/* Suggested Quick Prompt Chips */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex gap-2 overflow-x-auto text-xs">
          {suggestedPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p)}
              className="px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-[#7567C7] hover:text-[#7567C7] text-slate-700 text-xs font-medium shrink-0 transition"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Messages Feed */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-[#7567C7] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl p-4 leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#173B63] text-white rounded-br-none shadow-xs'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-bl-none shadow-2xs'
                }`}
              >
                <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

                {msg.sender === 'ai' && (
                  <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-end">
                    <button
                      onClick={() => handleCopy(msg.text, idx)}
                      className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center gap-1 font-mono"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Response</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-200 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3 text-slate-500 text-xs animate-pulse">
              <Bot className="w-5 h-5 text-[#7567C7] animate-spin" />
              <span>CareerAI is analyzing recommendations...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything about your resume, career roadmap, interview questions, or job applications..."
              className="flex-1 bg-slate-50 text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#7567C7] focus:bg-white transition"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-5 py-3 bg-[#7567C7] hover:bg-[#6456b8] disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
