import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Search, Sparkles, X, ChevronRight } from 'lucide-react';
import { PREDEFINED_QUESTIONS, PredefinedQuestion } from '../data/brightonData';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputText, setInputText] = useState('');
  const [matchingSuggestions, setMatchingSuggestions] = useState<PredefinedQuestion[]>([]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Autocomplete matching as user types
  useEffect(() => {
    const q = inputText.trim().toLowerCase();
    if (!q || q.length < 2) {
      setMatchingSuggestions([]);
      return;
    }

    const matches = PREDEFINED_QUESTIONS.filter((item) => {
      const title = item.question.toLowerCase();
      const snippet = item.shortSnippet.toLowerCase();
      const keywords = item.keywords.join(' ').toLowerCase();
      return title.includes(q) || snippet.includes(q) || keywords.includes(q);
    }).slice(0, 4);

    setMatchingSuggestions(matches);
  }, [inputText]);

  // Voice speech-to-text initialization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
          setIsListening(false);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const handleToggleVoice = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  };

  const handleSend = () => {
    const text = inputText.trim();
    if (!text || isLoading) return;
    onSendMessage(text);
    setInputText('');
    setMatchingSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSelectSuggestion = (suggestion: PredefinedQuestion) => {
    onSendMessage(suggestion.question);
    setInputText('');
    setMatchingSuggestions([]);
  };

  return (
    <div className="relative w-full">
      {/* Autocomplete suggestions popup */}
      {matchingSuggestions.length > 0 && (
        <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-30 animate-fade-in">
          <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-amber-600" />
              Predefined Brighton Questions Found:
            </span>
            <button
              onClick={() => setMatchingSuggestions([])}
              className="text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto">
            {matchingSuggestions.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectSuggestion(item)}
                className="w-full text-left p-3 hover:bg-amber-50/70 transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-900 group-hover:text-amber-900">
                    {item.question}
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {item.shortSnippet}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600 shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Input Field */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/90 p-2 flex items-center gap-2 focus-within:ring-2 focus-within:ring-amber-500/20 focus-within:border-amber-500 transition-all">
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask any question about Brighton courses, admissions, fees, or school life..."
          className="flex-1 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none"
          disabled={isLoading}
        />

        {/* Clear input if has text */}
        {inputText && (
          <button
            type="button"
            onClick={() => {
              setInputText('');
              setMatchingSuggestions([]);
            }}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Voice dictation button */}
        {recognitionRef.current && (
          <button
            type="button"
            onClick={handleToggleVoice}
            className={`p-2 rounded-xl transition-colors ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
            title={isListening ? 'Listening... click to stop' : 'Dictate with voice'}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        )}

        {/* Send button */}
        <button
          type="button"
          onClick={handleSend}
          disabled={!inputText.trim() || isLoading}
          className={`p-2.5 rounded-xl font-medium flex items-center justify-center transition-all ${
            inputText.trim() && !isLoading
              ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-sm'
              : 'bg-slate-100 text-slate-300 cursor-not-allowed'
          }`}
          title="Send Question"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
