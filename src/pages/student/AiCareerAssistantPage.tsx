import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, User, Sparkles, Copy, Check, RotateCcw, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { careerService } from '../../services/careerService';
import { DEPARTMENT_INTELLIGENCE } from '../../services/departmentIntelligence';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export const AiCareerAssistantPage: React.FC = () => {
  const { user } = useAuth();
  const userName = user?.name || 'Engineering Student';
  const department = user?.department || 'Computer Science and Engineering (CSE)';

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize welcome message specific to the department
    setMessages([
      {
        sender: 'ai',
        text: `Hello ${userName}! I'm your Career Accelerator AI Mentor for **${department}**.\n\nI can assist you with your department subjects, technical mock interview preparation, resume keywords, skill gap diagnostics, and career development roadmaps.\n\nHow can I help you accelerate your career today?`
      }
    ]);

    // Load department-specific suggested questions
    careerService.getSuggestedQuestions(department).then(setSuggestedPrompts);
  }, [department, userName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Off-topic validator
  const isOffTopic = (query: string): boolean => {
    const q = query.toLowerCase();

    // Check for clear off-topic keywords (entertainment, recipes, sports, general trivia)
    const offTopicKeywords = [
      'recipe', 'cook', 'bake', 'cake', 'pizza', 'burger', 'movie', 'cinema', 
      'hollywood', 'bollywood', 'actor', 'actress', 'song', 'lyrics', 'football match', 
      'cricket score', 'ipl match', 'weather today', 'horoscope', 'zodiac', 'joke', 
      'standup comedy', 'dating', 'relationship advice', 'vacation travel flight',
      'president election politics'
    ];

    if (offTopicKeywords.some(k => q.includes(k))) {
      return true;
    }

    // Always allowed: career, department, engineering, interview, resume, placement, subjects, skills, tech
    const careerKeywords = [
      'career', 'job', 'interview', 'resume', 'ats', 'skill', 'placement', 
      'roadmap', 'salary', 'hiring', 'role', 'internship', 'question', 
      'project', 'subject', 'exam', 'prepare', 'learning', 'improve', 
      'feedback', 'score', 'engineering', 'study', 'course'
    ];

    // Department-specific keywords
    const deptData = DEPARTMENT_INTELLIGENCE[department];
    const deptSkills = deptData ? deptData.skillGaps.map(s => s.skill.toLowerCase()) : [];
    const deptRoles = deptData ? deptData.roles.map(r => r.title.toLowerCase()) : [];

    const isCareerRelated = careerKeywords.some(k => q.includes(k));
    const isDeptSkillRelated = deptSkills.some(s => q.includes(s) || s.split(' ').some(w => w.length > 3 && q.includes(w)));
    const isDeptRoleRelated = deptRoles.some(r => q.includes(r));

    // If query has at least some engineering, technical, or career context
    if (isCareerRelated || isDeptSkillRelated || isDeptRoleRelated || q.length < 15) {
      return false;
    }

    // If query is long and has zero connection to engineering or career development
    return false;
  };

  const handleSend = (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || isLoading) return;

    setMessages(prev => [...prev, { sender: 'user', text: textToSend }]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      let reply = "";
      const lower = textToSend.toLowerCase();

      // Guardrail Check
      if (isOffTopic(textToSend)) {
        reply = "Sorry, I can only assist with questions related to your selected department, subjects, technical skills, and career development.";
      } else {
        const deptData = DEPARTMENT_INTELLIGENCE[department] || DEPARTMENT_INTELLIGENCE['Computer Science and Engineering (CSE)'];
        const topRole = deptData.roles[0];
        const missingSkills = deptData.skillGaps.map(s => s.skill).slice(0, 3);

        if (lower.includes('skill') || lower.includes('learn') || lower.includes('gap')) {
          reply = `For top placement outcomes in **${department}**, focus on strengthening these high-demand competencies:\n\n` +
            deptData.skillGaps.map((s, i) => `${i + 1}. **${s.skill}** (~${s.estimatedHours} hrs) - *${s.difficulty}*\n   Focus: ${s.recommendedCourse}`).join('\n\n') +
            `\n\nTrack your progress in the **Skill Gap Analysis** dashboard.`;
        } else if (lower.includes('resume') || lower.includes('keyword') || lower.includes('ats')) {
          reply = `To optimize your resume for **${department}** recruitment ATS scanners:\n\n` +
            `• **Include Core Technical Keywords:** ${deptData.roles[0]?.requiredSkills.join(', ')}.\n` +
            `• **Quantify Outcomes:** Follow the XYZ formula (*Accomplished X as measured by Y, by doing Z*).\n` +
            `• **High-Impact Additions:** Ensure hands-on capstone projects and lab instrumentation appear prominently.\n\n` +
            `You can run a real-time audit anytime in the **Resume AI** tab.`;
        } else if (lower.includes('interview') || lower.includes('question') || lower.includes('mock')) {
          reply = `Here is a technical mock interview question tailored to **${department}**:\n\n` +
            `**Question:** *"${deptData.suggestedQuestions[0] || 'Explain the governing engineering principles in your core domain.'}"*\n\n` +
            `**Key Evaluation Rubric:**\n` +
            `1. State governing physical or algorithmic laws.\n` +
            `2. Formulate equations or practical architecture trade-offs.\n` +
            `3. Provide real-world industry application context.\n\n` +
            `Ready to simulate this response? Head over to the **AI Mock Interview Center**!`;
        } else if (lower.includes('job') || lower.includes('role') || lower.includes('career') || lower.includes('salary')) {
          reply = `In **${department}**, top predicted roles and industry packages currently include:\n\n` +
            deptData.roles.map(r => `• **${r.title}** (Demand: ${r.marketDemand})\n  Package: ${r.salaryRange} | Match: ${r.matchScore}%\n  ${r.description}`).join('\n\n') +
            `\n\nExplore live matched postings in the **Job Matcher** page.`;
        } else if (lower.includes('roadmap') || lower.includes('phase') || lower.includes('stage')) {
          reply = `Your milestone roadmap for **${department}** is structured into 3 progressive phases:\n\n` +
            deptData.roadmap.map(m => `**Phase 0${m.order}: ${m.title}** (${m.completionPercentage}% complete)\n${m.description}\nSkills: ${m.skills.join(', ')}`).join('\n\n') +
            `\n\nView interactive milestone timelines on the **Career Roadmap** page.`;
        } else {
          reply = `Regarding your inquiry on **"${textToSend}"** for **${department}**:\n\n` +
            `To achieve optimal readiness for **${topRole.title}**:\n` +
            `1. Review foundational concepts in: ${missingSkills.slice(0, 2).join(' and ')}.\n` +
            `2. Complete a technical domain mock interview in the Interview Center.\n` +
            `3. Verify that your uploaded resume reflects your departmental course projects.\n\n` +
            `Would you like me to formulate a practice interview prompt or analyze specific technical topics?`;
        }
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
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-bold">
              {department}
            </span>
          </div>
          <h1 className="text-xl font-bold text-[#173B63] flex items-center gap-2">
            <Bot className="w-6 h-6 text-[#7567C7]" />
            <span>AI Career Assistant & Department Mentor</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            24/7 intelligent career coaching, interview guidance, and technical subject assistance for {department}.
          </p>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-600 transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
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
              <h3 className="font-bold text-xs">Career Accelerator AI Mentor</h3>
              <p className="text-[10px] text-slate-200">{userName} • {department}</p>
            </div>
          </div>
          <span className="text-[10px] bg-white/20 text-white font-mono px-2 py-0.5 rounded-full font-bold">
            Online & Ready
          </span>
        </div>

        {/* Suggested Quick Prompt Chips - Tailored to Department */}
        {suggestedPrompts.length > 0 && (
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex gap-2 overflow-x-auto text-xs">
            {suggestedPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                className="px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-[#7567C7] hover:text-[#7567C7] text-slate-700 text-xs font-medium shrink-0 transition cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Messages Feed */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-[#173B63] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className="relative group max-w-[82%]">
                <div
                  className={`p-4 rounded-2xl whitespace-pre-line leading-relaxed text-xs shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#173B63] text-white rounded-br-none'
                      : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.sender === 'ai' && (
                  <button
                    onClick={() => handleCopy(msg.text, idx)}
                    className="absolute -bottom-5 right-2 opacity-0 group-hover:opacity-100 transition text-[10px] text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-[#2F9C95] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center text-slate-400 text-xs">
              <div className="w-8 h-8 rounded-full bg-[#173B63] text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 bg-slate-100 rounded-2xl rounded-bl-none flex items-center gap-1.5 border border-slate-200">
                <span className="w-1.5 h-1.5 bg-[#2F9C95] rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-[#2F9C95] rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-[#2F9C95] rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200">
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
              placeholder={`Ask a career, interview, or technical question for ${department}...`}
              disabled={isLoading}
              className="flex-1 bg-slate-50 text-xs px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2F9C95] focus:bg-white transition"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 bg-[#173B63] hover:bg-[#204B7D] disabled:opacity-40 text-white rounded-xl transition cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
