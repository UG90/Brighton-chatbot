import React, { useState } from 'react';
import { X, BookOpen, ArrowRight, CheckCircle2, Award, Sparkles, Layers } from 'lucide-react';
import { COURSES_DATA, CourseDetail } from '../data/brightonData';

interface CoursesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourseStage: (prompt: string) => void;
}

export const CoursesModal: React.FC<CoursesModalProps> = ({
  isOpen,
  onClose,
  onSelectCourseStage,
}) => {
  const [selectedId, setSelectedId] = useState<string>('sixth-form');

  if (!isOpen) return null;

  const currentCourse: CourseDetail =
    COURSES_DATA.find((c) => c.id === selectedId) || COURSES_DATA[0];

  const handleAskAboutCurrentStage = () => {
    const prompt = `Can you provide more information about the ${currentCourse.title} (${currentCourse.curriculum})? What are the key subjects, entry prerequisites, and how does Brighton prepare students in this stage?`;
    onSelectCourseStage(prompt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif-classic font-semibold text-white tracking-wide">
                Academic Curriculum & Course Catalog
              </h3>
              <p className="text-xs text-slate-300">
                Cambridge International & IB World School Pathway (Ages 3 – 18)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stage Navigation Tabs */}
        <div className="bg-slate-100 p-2 border-b border-slate-200 flex items-center gap-1 overflow-x-auto text-xs">
          {COURSES_DATA.map((course) => (
            <button
              key={course.id}
              onClick={() => setSelectedId(course.id)}
              className={`px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                selectedId === course.id
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {course.stage}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 flex-1">
          {/* Main Title Banner */}
          <div className="border-b border-slate-200 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <h4 className="text-xl font-serif-classic font-bold text-slate-900">
                {currentCourse.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-800">{currentCourse.grades}</span>
                <span>·</span>
                <span className="text-amber-800 font-medium">{currentCourse.ages}</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {currentCourse.description}
            </p>
          </div>

          {/* Curriculum Framework Badge */}
          <div className="bg-amber-50/70 border border-amber-200 p-3.5 rounded-xl flex items-center gap-3">
            <Award className="w-5 h-5 text-amber-700 shrink-0" />
            <div className="text-xs">
              <span className="font-semibold text-amber-950 block">Accredited Framework:</span>
              <span className="text-amber-900">{currentCourse.curriculum}</span>
            </div>
          </div>

          {/* 2-Column Split: Key Subjects and Special Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Key Subjects */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-700" />
                Key Subject Disciplines
              </h5>
              <ul className="space-y-2 text-xs">
                {currentCourse.keySubjects.map((subject, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{subject}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Special Features & Diagnostics */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Signature Distinctives & Labs
              </h5>
              <ul className="space-y-2 text-xs">
                {currentCourse.specialFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="bg-slate-900 text-slate-200 p-4 rounded-xl border border-slate-800 text-xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 block mb-1">
              Graduate Competency Outcome
            </span>
            <p className="text-slate-300 leading-relaxed">
              {currentCourse.outcomes}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-lg transition-colors"
          >
            Close Catalog
          </button>
          <button
            onClick={handleAskAboutCurrentStage}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors"
          >
            <span>Ask Chatbot About {currentCourse.stage}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
