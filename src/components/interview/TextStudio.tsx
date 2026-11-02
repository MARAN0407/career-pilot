import React, { useState } from 'react';
import { InterviewQuestion } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { Bot, Send, User, Sparkles } from 'lucide-react';

interface TextStudioProps {
  questions: InterviewQuestion[];
  onComplete: (answers: { questionId: string; question: string; answerText: string }[]) => void;
  onCancel: () => void;
}

export const TextStudio: React.FC<TextStudioProps> = ({
  questions,
  onComplete,
  onCancel
}) => {
  const { user } = useAuth();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [inputText, setInputText] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const candidateName = user?.name || 'Ilamaran';

  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; feedback?: string }>>([
    {
      sender: 'ai',
      text: `Hello ${candidateName}! Welcome to your AI Technical Chat Assessment. I will evaluate your knowledge in Neural Architectures and Machine Learning.\n\nHere is Question 1:\n**${questions[0]?.questionText}**`
    }
  ]);

  const currentQ = questions[currentIdx] || questions[0];

  const handleSend = () => {
    if (!inputText.trim() || isEvaluating) return;

    const userText = inputText.trim();
    setInputText('');
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setIsEvaluating(true);

    const updatedAnswers = { ...answers, [currentQ.id]: userText };
    setAnswers(updatedAnswers);

    setTimeout(() => {
      setIsEvaluating(false);

      if (currentIdx + 1 < questions.length) {
        const nextQ = questions[currentIdx + 1];
        setCurrentIdx(prev => prev + 1);
        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: `Answer recorded. Advancing to Question ${currentIdx + 2} (${nextQ.difficulty} Level):\n\n**${nextQ.questionText}**`
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: '🎉 Assessment complete! Evaluating your answers against the benchmark rubric and generating your scorecard now...'
          }
        ]);
        setTimeout(() => {
          onComplete(
            questions.map(q => ({
              questionId: q.id,
              question: q.questionText,
              answerText: updatedAnswers[q.id] || ''
            }))
          );
        }, 1000);
      }
    }, 800);
  };

  const handleSkip = () => {
    const updatedAnswers = { ...answers, [currentQ.id]: '' };
    setAnswers(updatedAnswers);
    setMessages(prev => [...prev, { sender: 'user', text: '(Skipped / No answer provided)' }]);

    if (currentIdx + 1 < questions.length) {
      const nextQ = questions[currentIdx + 1];
      setCurrentIdx(prev => prev + 1);
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `Question skipped (0 marks). Moving to Question ${currentIdx + 2}:\n\n**${nextQ.questionText}**`
        }
      ]);
    } else {
      onComplete(
        questions.map(q => ({
          questionId: q.id,
          question: q.questionText,
          answerText: updatedAnswers[q.id] || ''
        }))
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0F2642] text-white flex flex-col font-sans select-none overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-[#0A1A2E] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#2F9C95] rounded-xl text-white">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold">AI Technical Chat Interview</h2>
            <p className="text-[11px] text-slate-400">Candidate: {candidateName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-teal-300 font-mono">
            Question {currentIdx + 1} / {questions.length}
          </span>
          <button
            onClick={onCancel}
            className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 transition"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'ai' && (
              <div className="w-8 h-8 rounded-xl bg-[#7567C7] flex items-center justify-center text-white shrink-0 mt-1 shadow-md">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div
              className={`max-w-[80%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-[#2F9C95] text-white font-medium rounded-br-none shadow-md'
                  : 'bg-white/10 border border-white/10 text-slate-100 rounded-bl-none shadow-md'
              }`}
            >
              <p className="whitespace-pre-line">{m.text}</p>
            </div>
            {m.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0 mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isEvaluating && (
          <div className="flex items-center gap-3 text-xs text-teal-300 animate-pulse">
            <div className="w-8 h-8 rounded-xl bg-[#7567C7]/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <span>Evaluating answer and advancing...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="p-4 bg-[#0A1A2E] border-t border-white/10">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type your technical answer here..."
            className="flex-1 bg-white/10 border border-white/15 focus:border-teal-400 text-xs sm:text-sm px-4 py-3 rounded-xl text-white placeholder:text-slate-400 focus:outline-none transition"
          />
          <button
            onClick={handleSkip}
            className="px-4 py-3 bg-white/10 hover:bg-white/20 text-slate-300 text-xs rounded-xl transition cursor-pointer"
          >
            Skip
          </button>
          <button
            onClick={handleSend}
            disabled={!inputText.trim() || isEvaluating}
            className="px-5 py-3 bg-[#2F9C95] hover:bg-[#3EBAB2] disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            <span>Submit</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
