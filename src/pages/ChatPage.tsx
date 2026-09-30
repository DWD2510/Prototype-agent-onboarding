import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context';
import {
  Send,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  Bot
} from 'lucide-react';
import { GlossaryHighlightText } from '../components/Common/GlossaryHighlightText';
import { SourceCard } from '../components/Common/SourceCard';
import { ContactCard } from '../components/Common/ContactCard';

export const ChatPage: React.FC = () => {
  const {
    chatMessages,
    sendMessage,
    isBotTyping,
    setChatFeedback,
    openRealPersonModal,
    currentUser
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isBotTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isBotTyping) return;
    sendMessage(inputVal);
    setInputVal('');
  };

  // Quick preset test questions
  const presetQuestions = [
    { label: 'Quyền GitHub', text: 'Xin quyền GitHub thế nào?' },
    { label: 'Quyền Jira', text: 'Hướng dẫn xin cấp quyền Jira' },
    { label: 'Ma trận RASCI', text: 'RASCI là gì trong dự án?' },
    { label: 'Matching & Dispatching', text: 'Khái niệm Matching và Dispatching' },
    { label: 'Lỗi máy tính', text: 'Máy tính lỗi thì hỏi ai?' },
    { label: 'Nhiệm vụ hôm nay', text: 'Hôm nay tôi cần làm gì?' },
    { label: 'Nghỉ phép', text: 'Quy định nghỉ phép và chấm công' },
    { label: 'Hỏi ngoài luồng (Fallback)', text: 'Công ty có xe buýt đưa đón nhân viên không?' }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-120px)] max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200/90 overflow-hidden animate-fade-in">
      {/* Chat Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#1F3A5F] text-white flex items-center justify-center shadow-sm">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                Hỏi đáp cùng Onboarding Copilot
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Sẵn sàng
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Tra cứu quy trình, hướng dẫn phân quyền, thuật ngữ và đầu mối liên hệ
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => openRealPersonModal('Cần hỗ trợ chung')}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E8EEF4] hover:bg-[#D6E2EE] text-[#1F3A5F] text-xs font-semibold rounded-xl transition"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          Hỏi người thật
        </button>
      </div>

      {/* Preset pills for quick testing */}
      <div className="px-4 py-2 bg-slate-100/60 border-b border-slate-200/60 overflow-x-auto flex items-center gap-1.5 scrollbar-none text-xs">
        <span className="text-[11px] font-bold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-sky-600" />
          Thử nhanh:
        </span>
        {presetQuestions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => sendMessage(q.text)}
            className="shrink-0 px-2.5 py-1 bg-white hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-lg text-[11px] font-medium transition"
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/30">
        {chatMessages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {/* Bot Avatar */}
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-[#1F3A5F] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              {/* Message Bubble Container */}
              <div
                className={`max-w-[85%] sm:max-w-[78%] flex flex-col ${
                  isUser ? 'items-end' : 'items-start'
                }`}
              >
                {/* Bubble */}
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-[#1F3A5F] text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
                  }`}
                >
                  {isUser ? (
                    <span className="whitespace-pre-line">{msg.text}</span>
                  ) : (
                    <GlossaryHighlightText text={msg.text} />
                  )}

                  {/* Fallback button if bot is unsure */}
                  {msg.isFallback && (
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openRealPersonModal(msg.rawQuestion)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1F3A5F] hover:bg-[#162B47] text-white text-xs font-semibold rounded-xl shadow-xs transition"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        Hỏi người thật (Chuyển tiếp câu hỏi)
                      </button>
                    </div>
                  )}

                  {/* Contact Card if returned */}
                  {msg.contactCard && <ContactCard contact={msg.contactCard} />}

                  {/* Source Card attached at the bottom of bot message */}
                  {msg.sourceCard && <SourceCard source={msg.sourceCard} />}
                </div>

                {/* Footer under message */}
                <div className="flex items-center gap-2 mt-1 px-1 text-[11px] text-slate-400">
                  <span>{msg.timestamp}</span>

                  {!isUser && !msg.isFallback && (
                    <div className="flex items-center gap-1.5 ml-2">
                      {/* Thumbs Up */}
                      <button
                        type="button"
                        onClick={() => setChatFeedback(msg.id, 'like')}
                        className={`p-1 rounded-md transition ${
                          msg.feedback === 'like'
                            ? 'text-emerald-700 bg-emerald-100'
                            : 'hover:text-slate-700 hover:bg-slate-200/60'
                        }`}
                        title="Hữu ích"
                        aria-label="Hữu ích"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>

                      {/* Thumbs Down */}
                      <button
                        type="button"
                        onClick={() => setChatFeedback(msg.id, 'dislike')}
                        className={`p-1 rounded-md transition ${
                          msg.feedback === 'dislike'
                            ? 'text-rose-700 bg-rose-100'
                            : 'hover:text-slate-700 hover:bg-slate-200/60'
                        }`}
                        title="Chưa hài lòng"
                        aria-label="Chưa hài lòng"
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>

                      {/* Ask Real Person Button under every bot answer */}
                      <button
                        type="button"
                        onClick={() => openRealPersonModal(msg.rawQuestion)}
                        className="text-[11px] font-semibold text-[#1F3A5F] hover:underline flex items-center gap-1 ml-1"
                      >
                        <HelpCircle className="w-3 h-3" />
                        Hỏi người thật
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* User Avatar */}
              {isUser && (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-xl object-cover border border-slate-300 shrink-0 mt-0.5 shadow-xs"
                />
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {isBotTyping && (
          <div className="flex gap-3 items-center text-xs text-slate-400 animate-fade-in">
            <div className="w-8 h-8 rounded-xl bg-[#1F3A5F] text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#1F3A5F] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-[#1F3A5F] animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-[#1F3A5F] animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="ml-1 text-[11px] text-slate-500 font-medium">Copilot đang soạn câu trả lời…</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form
        onSubmit={handleSend}
        className="p-3.5 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Nhập câu hỏi (vd: xin quyền GitHub, ma trận RASCI, nghỉ phép, hỏng máy tính)..."
          className="flex-1 py-3 px-4 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F3A5F] transition"
        />

        <button
          type="submit"
          disabled={!inputVal.trim() || isBotTyping}
          className="p-3 bg-[#1F3A5F] text-white rounded-2xl hover:bg-[#162B47] disabled:opacity-40 transition shadow-xs"
          aria-label="Gửi tin nhắn"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
