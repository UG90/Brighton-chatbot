import React, { useState, useRef, useEffect } from 'react';
import { ChatHeader } from './components/ChatHeader';
import { Sidebar } from './components/Sidebar';
import { ChatMessageBubble } from './components/ChatMessageBubble';
import { ChatInput } from './components/ChatInput';
import { TuitionCalculatorModal } from './components/TuitionCalculatorModal';
import { GradePlacementModal } from './components/GradePlacementModal';
import { TourBookingModal } from './components/TourBookingModal';
import { ProspectusModal } from './components/ProspectusModal';
import { CoursesModal } from './components/CoursesModal';
import { ContactCallbackModal } from './components/ContactCallbackModal';
import { ChatMessage, generateSmartAnswer } from './utils/chatEngine';
import { soundManager } from './utils/sound';
import { SCHOOL_INFO, PREDEFINED_QUESTIONS } from './data/brightonData';
import { 
  Sparkles, GraduationCap, Calculator, Calendar, BookOpen, 
  HelpCircle, ShieldCheck, ArrowRight, Award, Compass, MessageCircle
} from 'lucide-react';

const INITIAL_GREETING: ChatMessage = {
  id: 'msg-welcome',
  sender: 'bot',
  timestamp: 'Just now',
  text: `Welcome to Brighton International School! I am your dedicated Admissions and Academic Guide.\n\nWhether you are inquiring about our dual Cambridge & IB Diploma curricula, 2026–2027 entry requirements, tuition fee schedules, or booking an in-person campus tour, I am here to assist you with verified official answers.`,
  categoryLabel: 'Admissions Welcome',
  highlights: [
    { label: 'Curriculum', value: 'Cambridge + IB DP' },
    { label: 'Student Ratio', value: '8:1 Teacher-Student' },
    { label: 'Class of 2025', value: '36.8 Avg IB Points' },
    { label: 'Campus', value: '35-Acre Parkland' }
  ],
  bulletPoints: [
    'Explore our through-train pathway from Early Years (Age 3) through Sixth Form (Grade 12).',
    'Calculate itemized tuition fees and scholarship remissions with our interactive estimator.',
    'Check your child’s precise grade placement and entrance assessment requirements.',
    'Book private campus tours and Saturday Open Mornings.'
  ],
  actionType: 'courses',
  actionButtonLabel: 'Explore Academic Pathways (Ages 3–18)',
  followUpQuestions: [
    'What curriculum does Brighton International School follow?',
    'What is the step-by-step admissions process for 2026-2027?',
    'What are the tuition fees at Brighton International School?',
    'How can I book a private campus tour or attend an Open Day?'
  ],
  feedback: null,
};

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Modals state
  const [isCalcOpen, setIsCalcOpen] = useState<boolean>(false);
  const [isGradeFinderOpen, setIsGradeFinderOpen] = useState<boolean>(false);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [isProspectusOpen, setIsProspectusOpen] = useState<boolean>(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState<boolean>(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    soundManager.playSend();

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Realistic delay simulating counselor answering
    setTimeout(() => {
      const generated = generateSmartAnswer(text);
      const botMsg: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ...generated,
        feedback: null,
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
      soundManager.playReceive();
    }, 450);
  };

  const handleTriggerAction = (actionType: NonNullable<ChatMessage['actionType']>) => {
    switch (actionType) {
      case 'calculator':
        setIsCalcOpen(true);
        break;
      case 'grade_finder':
        setIsGradeFinderOpen(true);
        break;
      case 'tour_booking':
        setIsTourOpen(true);
        break;
      case 'prospectus':
        setIsProspectusOpen(true);
        break;
      case 'courses':
        setIsCoursesOpen(true);
        break;
      case 'contact_form':
        setIsCallbackOpen(true);
        break;
    }
  };

  const handleFeedback = (messageId: string, type: 'like' | 'dislike') => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, feedback: msg.feedback === type ? null : type }
          : msg
      )
    );
  };

  const handleResetChat = () => {
    setMessages([
      {
        ...INITIAL_GREETING,
        id: `msg-welcome-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleToggleMute = () => {
    soundManager.isMuted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleExportTranscript = () => {
    const transcript = `BRIGHTON INTERNATIONAL SCHOOL - CHATBOT CONSULTATION TRANSCRIPT
Date: ${new Date().toLocaleString()}
Campus: ${SCHOOL_INFO.location}
Admissions Line: ${SCHOOL_INFO.phone}
========================================================================

${messages
  .map(
    (m) =>
      `[${m.timestamp}] ${m.sender === 'user' ? 'PARENT / STUDENT' : 'BRIGHTON ADVISOR'}:\n${
        m.text
      }\n${m.bulletPoints ? m.bulletPoints.map((b) => `  * ${b}`).join('\n') + '\n' : ''}------------------------------------------------------------------------`
  )
  .join('\n\n')}

For further inquiries, contact admissions@brighton-international.edu`;

    const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Brighton-Chat-Transcript-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const quickPillTopics = [
    { label: 'Admissions Process', prompt: 'What is the step-by-step admissions process for 2026-2027?' },
    { label: 'Tuition & Fees', prompt: 'What are the tuition fees at Brighton International School?' },
    { label: 'Cambridge & IBDP', prompt: 'What curriculum does Brighton International School follow?' },
    { label: 'Merit Scholarships', prompt: 'Are scholarships and financial aid available at Brighton?' },
    { label: 'Book Campus Tour', prompt: 'How can I book a private campus tour or attend an Open Day?' },
    { label: 'Boarding Options', prompt: 'What boarding options are available (Full, Weekly, Flexi)?' },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 font-sans text-slate-900">
      {/* Sidebar with Predefined Questions Matrix & Quick Tools */}
      <Sidebar
        isOpenMobile={sidebarOpen}
        onCloseMobile={() => setSidebarOpen(false)}
        onSelectQuestion={handleSendMessage}
        onOpenCalculator={() => setIsCalcOpen(true)}
        onOpenGradeFinder={() => setIsGradeFinderOpen(true)}
        onOpenTourBooking={() => setIsTourOpen(true)}
        onOpenProspectus={() => setIsProspectusOpen(true)}
        onOpenCourses={() => setIsCoursesOpen(true)}
        onOpenCallback={() => setIsCallbackOpen(true)}
      />

      {/* Main Chat View Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50/70">
        {/* Top Header */}
        <ChatHeader
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onResetChat={handleResetChat}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onExportTranscript={handleExportTranscript}
          onOpenCalculator={() => setIsCalcOpen(true)}
          onOpenGradeFinder={() => setIsGradeFinderOpen(true)}
          onOpenTourBooking={() => setIsTourOpen(true)}
          onOpenProspectus={() => setIsProspectusOpen(true)}
        />

        {/* Chat Message Scroll Window */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 max-w-4xl w-full mx-auto">
          {/* Quick Category Prompt Ribbons at top */}
          <div className="mb-6 pb-4 border-b border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-700" />
                Popular Questions About Brighton:
              </span>
              <span className="text-[11px] text-slate-400">Click to ask instantly</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {quickPillTopics.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(item.prompt)}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-amber-50/80 text-slate-700 hover:text-amber-900 border border-slate-200 hover:border-amber-300 font-medium whitespace-nowrap transition-colors shadow-2xs"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Feed */}
          {messages.map((message) => (
            <ChatMessageBubble
              key={message.id}
              message={message}
              onAskFollowUp={handleSendMessage}
              onTriggerAction={handleTriggerAction}
              onFeedback={handleFeedback}
            />
          ))}

          {/* Counselor Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start gap-3 mb-6 animate-fade-in">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-2xs flex items-center gap-1.5">
                <span className="text-xs text-slate-500 font-medium mr-1">
                  Brighton Advisor is formulating response
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </main>

        {/* Bottom Input Area */}
        <footer className="p-4 sm:p-6 bg-white/95 backdrop-blur-sm border-t border-slate-200/90 shrink-0">
          <div className="max-w-4xl mx-auto space-y-2">
            <ChatInput onSendMessage={handleSendMessage} isLoading={isTyping} />
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>
                Verified Admissions Knowledge Base · Predefined Brighton International Catalog
              </span>
              <button
                onClick={() => setIsCallbackOpen(true)}
                className="hover:text-amber-800 font-medium transition-colors"
              >
                Need to speak with a human counselor?
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* Interactive Modals */}
      <TuitionCalculatorModal
        isOpen={isCalcOpen}
        onClose={() => setIsCalcOpen(false)}
        onAskChatbot={handleSendMessage}
      />

      <GradePlacementModal
        isOpen={isGradeFinderOpen}
        onClose={() => setIsGradeFinderOpen(false)}
        onAskChatbot={handleSendMessage}
      />

      <TourBookingModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onConfirmBooking={handleSendMessage}
      />

      <ProspectusModal
        isOpen={isProspectusOpen}
        onClose={() => setIsProspectusOpen(false)}
        onAskChatbot={handleSendMessage}
      />

      <CoursesModal
        isOpen={isCoursesOpen}
        onClose={() => setIsCoursesOpen(false)}
        onSelectCourseStage={handleSendMessage}
      />

      <ContactCallbackModal
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
        onSubmitted={handleSendMessage}
      />
    </div>
  );
}
