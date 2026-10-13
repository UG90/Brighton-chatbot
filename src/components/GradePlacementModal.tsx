import React, { useState } from 'react';
import { X, Calendar, GraduationCap, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface GradePlacementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskChatbot: (prompt: string) => void;
}

export const GradePlacementModal: React.FC<GradePlacementModalProps> = ({
  isOpen,
  onClose,
  onAskChatbot,
}) => {
  const [birthYear, setBirthYear] = useState<number>(2015);
  const [birthMonth, setBirthMonth] = useState<number>(5);

  if (!isOpen) return null;

  // Academic year target is Sept 1, 2026
  const targetDate = new Date(2026, 8, 1); // Sept 1, 2026
  const birthDate = new Date(birthYear, birthMonth - 1, 15);
  
  // Calculate age as of Sept 1, 2026
  let age = targetDate.getFullYear() - birthDate.getFullYear();
  const m = targetDate.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && targetDate.getDate() < birthDate.getDate())) {
    age--;
  }

  interface GradeInfo {
    grade: string;
    stage: string;
    ukYear: string;
    curriculum: string;
    assessment: string;
    notes: string;
  }

  const getPlacement = (ageYears: number): GradeInfo => {
    if (ageYears < 3) {
      return {
        grade: 'Future Toddler Enrolment',
        stage: 'Pre-Early Years',
        ukYear: 'Pre-Nursery',
        curriculum: 'Parent & Toddler Playgroups',
        assessment: 'Informal discovery session',
        notes: 'Children must turn 3 by September 1st of the entry year for full nursery admission.'
      };
    }
    if (ageYears === 3) {
      return {
        grade: 'Nursery',
        stage: 'Early Years (EYFS)',
        ukYear: 'Nursery',
        curriculum: 'Reggio-inspired British EYFS',
        assessment: 'Play-based readiness observation (45 mins)',
        notes: 'Focus on social adjustment, speech, fine-motor coordination and curiosity.'
      };
    }
    if (ageYears === 4) {
      return {
        grade: 'Kindergarten / Reception',
        stage: 'Early Years (EYFS)',
        ukYear: 'Reception',
        curriculum: 'British EYFS & Early Phonics',
        assessment: 'Developmental play observation & communication',
        notes: 'Foundation phonics, numeracy play, and Mandarin immersion.'
      };
    }
    if (ageYears === 5) {
      return {
        grade: 'Grade 1',
        stage: 'Primary School (Key Stage 1)',
        ukYear: 'Year 2',
        curriculum: 'Cambridge Primary',
        assessment: 'Early literacy, phonics & foundational math check',
        notes: 'First structured academic year with specialist science & modern languages.'
      };
    }
    if (ageYears === 6) {
      return {
        grade: 'Grade 2',
        stage: 'Primary School (Key Stage 1)',
        ukYear: 'Year 3',
        curriculum: 'Cambridge Primary',
        assessment: 'Reading comprehension and mathematical problem solving',
        notes: 'Cambridge curriculum checkpoint preparation begins.'
      };
    }
    if (ageYears >= 7 && ageYears <= 10) {
      const g = ageYears - 4; // 7 -> Gr 3, 8 -> Gr 4, 9 -> Gr 5, 10 -> Gr 6
      return {
        grade: `Grade ${g}`,
        stage: g <= 5 ? 'Primary School (Key Stage 2)' : 'Middle School (Key Stage 3)',
        ukYear: `Year ${g + 1}`,
        curriculum: g <= 5 ? 'Cambridge Primary' : 'Cambridge Lower Secondary',
        assessment: 'Online CAT4 Cognitive Abilities Test (Verbal, Non-Verbal, Quantitative) + English Essay',
        notes: 'Transcripts from previous 2 academic years required with confidential teacher reference.'
      };
    }
    if (ageYears >= 11 && ageYears <= 13) {
      const g = ageYears - 4; // 11 -> Gr 7, 12 -> Gr 8, 13 -> Gr 9
      return {
        grade: `Grade ${g}`,
        stage: g <= 8 ? 'Middle School (Key Stage 3)' : 'Senior School (IGCSE Entry)',
        ukYear: `Year ${g + 1}`,
        curriculum: g <= 8 ? 'Cambridge Lower Secondary' : 'Cambridge IGCSE 2-Year Cycle',
        assessment: 'CAT4 Cognitive Assessment + Science/Math diagnostics & Headmaster Interview',
        notes: g === 9 ? 'Crucial entry year for beginning the 2-year IGCSE examination track.' : 'Specialist wet laboratories and leadership expeditions.'
      };
    }
    if (ageYears === 14) {
      return {
        grade: 'Grade 10',
        stage: 'Senior School (Key Stage 4)',
        ukYear: 'Year 11 (IGCSE Final Year)',
        curriculum: 'Cambridge IGCSE',
        assessment: 'Comprehensive Subject Transcripts + CAT4 + Head of Section Interview',
        notes: 'Mid-cycle IGCSE admissions require direct subject matching from previous British/international school.'
      };
    }
    if (ageYears === 15 || ageYears === 16) {
      return {
        grade: 'Grade 11 (Sixth Form Entry)',
        stage: 'Pre-University / Sixth Form',
        ukYear: 'Year 12 (Lower Sixth)',
        curriculum: 'International Baccalaureate Diploma (IBDP) or Cambridge A-Levels',
        assessment: 'Minimum 5 IGCSEs/GCSEs at grade A*-C (or equivalent) + English/Math placement + Admissions Board interview',
        notes: 'Gateway year to world-class university placements. Scholarship applications highly recommended.'
      };
    }
    if (ageYears === 17) {
      return {
        grade: 'Grade 12 (Sixth Form Year 2)',
        stage: 'Pre-University / Sixth Form',
        ukYear: 'Year 13 (Upper Sixth)',
        curriculum: 'IBDP Year 2 or Cambridge A2 Finals',
        assessment: 'Detailed syllabus transfer audit & academic director approval',
        notes: 'Admissions directly into final year considered on a rare case-by-case basis for international transfers.'
      };
    }
    return {
      grade: 'Graduation / Post-Secondary',
      stage: 'Alumni / University Prep',
      ukYear: 'Undergraduate',
      curriculum: 'Higher Education',
      assessment: 'University Admissions Counselling',
      notes: 'Student has passed secondary school age threshold.'
    };
  };

  const placement = getPlacement(age);

  const handleAskAboutGrade = () => {
    const prompt = `My child was born in ${birthMonth}/${birthYear} and will be ${age} years old by September 2026. The placement guide suggests ${placement.grade} (${placement.stage}). Can you explain the curriculum, assessments, and subjects for this grade?`;
    onAskChatbot(prompt);
    onClose();
  };

  const currentYear = 2026;
  const years = Array.from({ length: 18 }, (_, i) => currentYear - 17 + i);
  const months = [
    { num: 1, name: 'January' },
    { num: 2, name: 'February' },
    { num: 3, name: 'March' },
    { num: 4, name: 'April' },
    { num: 5, name: 'May' },
    { num: 6, name: 'June' },
    { num: 7, name: 'July' },
    { num: 8, name: 'August' },
    { num: 9, name: 'September' },
    { num: 10, name: 'October' },
    { num: 11, name: 'November' },
    { num: 12, name: 'December' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif-classic font-semibold text-white tracking-wide">
                Age & Grade Placement Calculator
              </h3>
              <p className="text-xs text-slate-300">
                Official Age Cut-Off: September 1, 2026 Entry
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          <div className="bg-amber-50/70 border border-amber-200/60 p-3.5 rounded-xl flex items-start gap-3 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              Brighton follows the British academic age alignment (birth date as of Sept 1st). Select your child’s birth month and year to view their exact grade and curriculum placement.
            </p>
          </div>

          {/* Date Picker row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-900 mb-1">
                Birth Month
              </label>
              <select
                value={birthMonth}
                onChange={(e) => setBirthMonth(Number(e.target.value))}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800"
              >
                {months.map((m) => (
                  <option key={m.num} value={m.num}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-900 mb-1">
                Birth Year
              </label>
              <select
                value={birthYear}
                onChange={(e) => setBirthYear(Number(e.target.value))}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider block">
                  Recommended Placement
                </span>
                <span className="text-2xl font-serif-classic font-bold text-white">
                  {placement.grade}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Age by Sept 1, 2026</span>
                <span className="text-lg font-mono font-bold text-amber-300">
                  {age} Years Old
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Stage & British Equiv.</span>
                <span className="font-medium text-slate-100">{placement.stage} · {placement.ukYear}</span>
              </div>
              <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Curriculum Track</span>
                <span className="font-medium text-amber-300">{placement.curriculum}</span>
              </div>
            </div>

            <div className="text-xs text-slate-300 pt-1">
              <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Required Admissions Assessment:
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {placement.assessment}
              </p>
            </div>

            <div className="text-[11px] text-slate-400 italic bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
              “{placement.notes}”
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAskAboutGrade}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors"
          >
            <span>Ask Chatbot About {placement.grade}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
