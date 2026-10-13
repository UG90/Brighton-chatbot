import React, { useState } from 'react';
import { 
  PREDEFINED_QUESTIONS, PredefinedQuestion, SCHOOL_INFO 
} from '../data/brightonData';
import { 
  GraduationCap, BookOpen, Calculator, Calendar, FileText, 
  Phone, Sparkles, ChevronRight, Search, ShieldCheck, Compass,
  Layers, School, Award
} from 'lucide-react';

interface SidebarProps {
  onSelectQuestion: (questionText: string) => void;
  onOpenCalculator: () => void;
  onOpenGradeFinder: () => void;
  onOpenTourBooking: () => void;
  onOpenProspectus: () => void;
  onOpenCourses: () => void;
  onOpenCallback: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onSelectQuestion,
  onOpenCalculator,
  onOpenGradeFinder,
  onOpenTourBooking,
  onOpenProspectus,
  onOpenCourses,
  onOpenCallback,
  isOpenMobile,
  onCloseMobile,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Topics', icon: Compass },
    { id: 'general', label: 'About School', icon: School },
    { id: 'academics', label: 'Courses & Academics', icon: BookOpen },
    { id: 'admissions', label: 'Admissions & Entry', icon: GraduationCap },
    { id: 'fees', label: 'Fees & Scholarships', icon: Calculator },
    { id: 'campus', label: 'Campus & Boarding', icon: Layers },
    { id: 'contact', label: 'Visit & Contact', icon: Phone },
  ];

  const filteredQuestions = PREDEFINED_QUESTIONS.filter((q) => {
    const matchesCat = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesSearch =
      !searchFilter ||
      q.question.toLowerCase().includes(searchFilter.toLowerCase()) ||
      q.shortSnippet.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-40 w-80 sm:w-96 bg-white border-r border-slate-200/90 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Crest Header */}
        <div className="bg-slate-950 text-white p-5 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-crest font-bold text-lg shadow-sm">
              B
            </div>
            <div>
              <h1 className="text-sm font-crest tracking-wider uppercase font-semibold text-white">
                BRIGHTON INTERNATIONAL
              </h1>
              <p className="text-[11px] text-amber-400/90 font-medium">
                Admissions & Academic Knowledge Hub
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-400">
            <span>Dual Cambridge & IB World School</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400">AY 2026-27 Open</span>
          </div>
        </div>

        {/* Quick Admissions Toolkit Bar */}
        <div className="p-3 bg-slate-50 border-b border-slate-200">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-2 px-1">
            Interactive Admissions Tools
          </span>
          <div className="grid grid-cols-3 gap-1.5 text-slate-700">
            <button
              onClick={() => {
                onOpenCalculator();
                onCloseMobile();
              }}
              className="p-2 bg-white rounded-lg border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-[11px] font-medium flex flex-col items-center justify-center text-center gap-1 transition-all group"
            >
              <Calculator className="w-4 h-4 text-amber-700 group-hover:scale-110 transition-transform" />
              <span>Fee Calculator</span>
            </button>

            <button
              onClick={() => {
                onOpenGradeFinder();
                onCloseMobile();
              }}
              className="p-2 bg-white rounded-lg border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-[11px] font-medium flex flex-col items-center justify-center text-center gap-1 transition-all group"
            >
              <GraduationCap className="w-4 h-4 text-amber-700 group-hover:scale-110 transition-transform" />
              <span>Grade Finder</span>
            </button>

            <button
              onClick={() => {
                onOpenTourBooking();
                onCloseMobile();
              }}
              className="p-2 bg-white rounded-lg border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-[11px] font-medium flex flex-col items-center justify-center text-center gap-1 transition-all group"
            >
              <Calendar className="w-4 h-4 text-amber-700 group-hover:scale-110 transition-transform" />
              <span>Book Tour</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1.5 mt-1.5 text-slate-700">
            <button
              onClick={() => {
                onOpenCourses();
                onCloseMobile();
              }}
              className="p-1.5 bg-white rounded-lg border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-[10px] font-medium flex items-center justify-center gap-1 transition-all"
            >
              <BookOpen className="w-3 h-3 text-slate-600" />
              <span>Curriculum</span>
            </button>

            <button
              onClick={() => {
                onOpenProspectus();
                onCloseMobile();
              }}
              className="p-1.5 bg-white rounded-lg border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-[10px] font-medium flex items-center justify-center gap-1 transition-all"
            >
              <FileText className="w-3 h-3 text-slate-600" />
              <span>Prospectus</span>
            </button>

            <button
              onClick={() => {
                onOpenCallback();
                onCloseMobile();
              }}
              className="p-1.5 bg-white rounded-lg border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-[10px] font-medium flex items-center justify-center gap-1 transition-all"
            >
              <Phone className="w-3 h-3 text-slate-600" />
              <span>Callback</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-3 border-b border-slate-200 space-y-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search 15+ predefined questions..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50/80 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
            />
          </div>

          {/* Category Tabs (Segmented buttons) */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-md whitespace-nowrap font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Predefined Questions Scroll List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          <div className="px-3 py-2 bg-slate-50/50 text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Predefined Questions ({filteredQuestions.length})</span>
            <span className="text-amber-800 font-normal">Click to ask instantly</span>
          </div>

          {filteredQuestions.map((q) => (
            <button
              key={q.id}
              onClick={() => {
                onSelectQuestion(q.question);
                onCloseMobile();
              }}
              className="w-full text-left p-3.5 hover:bg-amber-50/60 transition-colors group flex items-start justify-between gap-2"
            >
              <div className="space-y-1">
                <div className="text-xs font-semibold text-slate-900 group-hover:text-amber-950 transition-colors leading-snug">
                  {q.question}
                </div>
                <div className="text-[11px] text-slate-500 line-clamp-1">
                  {q.shortSnippet}
                </div>
                <div className="text-[10px] text-amber-800 font-medium">
                  {q.categoryLabel}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-amber-700 shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}

          {filteredQuestions.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-500">
              No predefined questions match "{searchFilter}". Type your question in the chat bar below to receive an official answer!
            </div>
          )}
        </div>

        {/* Key Metrics Footnote */}
        <div className="p-4 bg-slate-900 text-white border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Brighton Key Facts</span>
            <span className="text-amber-400 font-mono">2026-2027</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-slate-200">
            <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700/60">
              <span className="text-xs font-bold text-white block">8:1</span>
              <span className="text-[9px] text-slate-400 uppercase">Ratio</span>
            </div>
            <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700/60">
              <span className="text-xs font-bold text-amber-300 block">36.8</span>
              <span className="text-[9px] text-slate-400 uppercase">IB Avg</span>
            </div>
            <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700/60">
              <span className="text-xs font-bold text-emerald-400 block">98%</span>
              <span className="text-[9px] text-slate-400 uppercase">Top 2 Uni</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
