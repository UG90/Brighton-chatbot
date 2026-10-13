import React, { useState } from 'react';
import { ChatMessage } from '../utils/chatEngine';
import { 
  Volume2, VolumeX, Copy, Check, ThumbsUp, ThumbsDown, 
  ArrowRight, Sparkles, Building2, User, ExternalLink
} from 'lucide-react';

interface ChatMessageBubbleProps {
  message: ChatMessage;
  onAskFollowUp: (prompt: string) => void;
  onTriggerAction: (actionType: NonNullable<ChatMessage['actionType']>) => void;
  onFeedback: (messageId: string, type: 'like' | 'dislike') => void;
}

export const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({
  message,
  onAskFollowUp,
  onTriggerAction,
  onFeedback,
}) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const isUser = message.sender === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleSpeak = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(message.text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  if (isUser) {
    return (
      <div className="flex justify-end gap-3 mb-6 animate-fade-in">
        <div className="max-w-xl text-right">
          <div className="inline-block bg-slate-900 text-white px-5 py-3.5 rounded-2xl rounded-tr-sm text-sm shadow-sm leading-relaxed text-left border border-slate-800">
            {message.text}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono pr-1">
            {message.timestamp}
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
          <User className="w-4 h-4" />
        </div>
      </div>
    );
  }

  // Render Bot Message
  return (
    <div className="flex justify-start gap-3 mb-8 animate-fade-in group">
      {/* Brighton Crest Emblem / Avatar */}
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-sm mt-0.5">
        <Building2 className="w-4 h-4" />
      </div>

      <div className="max-w-2xl w-full">
        {/* Category & Timestamp (clean metadata, no pills) */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5 pl-0.5 font-medium">
          <span className="text-amber-800 font-semibold tracking-wide uppercase text-[10px]">
            {message.categoryLabel || 'Brighton Advisor'}
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="font-mono text-[11px] text-slate-400">{message.timestamp}</span>
        </div>

        {/* Message Container */}
        <div className="bg-white border border-slate-200/90 rounded-2xl rounded-tl-sm p-5 shadow-sm text-slate-800 space-y-4">
          {/* Main Text with line breaks */}
          <div className="text-sm leading-relaxed whitespace-pre-line text-slate-700 space-y-2">
            {message.text}
          </div>

          {/* Highlights Grid (if any) */}
          {message.highlights && message.highlights.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100">
              {message.highlights.map((h, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-xl">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                    {h.label}
                  </div>
                  <div className="text-xs font-bold text-slate-900 font-sans mt-0.5">
                    {h.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bullet points (if any) */}
          {message.bulletPoints && message.bulletPoints.length > 0 && (
            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              {message.bulletPoints.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{pt}</span>
                </div>
              ))}
            </div>
          )}

          {/* Action Button Card (if actionable tool linked) */}
          {message.actionType && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onTriggerAction(message.actionType!)}
                className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-3 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-semibold shadow-sm transition-all border border-amber-500/30 group/btn"
              >
                <span>{message.actionButtonLabel || 'Launch Interactive Guide'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* Follow-up question chips */}
          {message.followUpQuestions && message.followUpQuestions.length > 0 && (
            <div className="pt-3 border-t border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 block mb-2">
                Suggested Follow-up Inquiries:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {message.followUpQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onAskFollowUp(q)}
                    className="text-left text-xs bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-900 border border-slate-200 hover:border-amber-300/80 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 group/chip"
                  >
                    <span>{q}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover/chip:text-amber-700" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Message Actions Row (Listen, Copy, Feedback) */}
        <div className="flex items-center gap-2 mt-2 pl-1 text-slate-400 text-xs">
          <button
            type="button"
            onClick={handleToggleSpeak}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] hover:bg-slate-100 transition-colors ${
              isSpeaking ? 'text-amber-700 font-medium' : 'text-slate-500'
            }`}
            title={isSpeaking ? 'Stop reading' : 'Listen to this response'}
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] text-slate-500 hover:bg-slate-100 transition-colors"
            title="Copy answer to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <div className="h-3 w-px bg-slate-200 mx-1" />

          {/* Feedback buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onFeedback(message.id, 'like')}
              className={`p-1 rounded hover:bg-slate-100 transition-colors ${
                message.feedback === 'like' ? 'text-amber-600' : 'text-slate-400'
              }`}
              title="Helpful response"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onFeedback(message.id, 'dislike')}
              className={`p-1 rounded hover:bg-slate-100 transition-colors ${
                message.feedback === 'dislike' ? 'text-red-500' : 'text-slate-400'
              }`}
              title="Not helpful"
            >
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
