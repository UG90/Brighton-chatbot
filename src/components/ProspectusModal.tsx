import React, { useState } from 'react';
import { X, Download, FileText, Check, ShieldCheck, Sparkles, Building, Award } from 'lucide-react';
import { SCHOOL_INFO } from '../data/brightonData';

interface ProspectusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskChatbot: (prompt: string) => void;
}

export const ProspectusModal: React.FC<ProspectusModalProps> = ({
  isOpen,
  onClose,
  onAskChatbot,
}) => {
  const [downloaded, setDownloaded] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    const text = `========================================================
BRIGHTON INTERNATIONAL SCHOOL
OFFICIAL DIGITAL PROSPECTUS & ACADEMIC GUIDE 2026-2027
Motto: "${SCHOOL_INFO.motto}"
Location: ${SCHOOL_INFO.location}
Phone: ${SCHOOL_INFO.phone} | Email: ${SCHOOL_INFO.admissionsEmail}
========================================================

1. HEADMASTER'S WELCOME
Welcome to Brighton International School. For over two decades, our campus has stood as a beacon of academic curiosity, moral courage, and global fellowship. We empower young scholars to not merely navigate the future, but to lead it with ethical conviction.

2. CORE PILLARS & STATS
- Student Body: 1,450+ students representing 48 nationalities
- Student-to-Teacher Ratio: 8:1
- IB Diploma Average: 36.8 points (Global average: 30.2)
- Cambridge IGCSE & A-Levels: 84% A* to A grades
- University Matriculation: 98% first-choice acceptance
- Campus: 35-acre parkland with Olympic 50m pool, 450-seat theatre, robotics lab.

3. ACADEMIC STRUCTURE
- Early Years Foundation Stage (Ages 3-5): Play-based discovery, Reggio Emilia, Mandarin immersion.
- Cambridge Primary (Grades 1-5): Mastery in numeracy, literacy, sciences, and global perspectives.
- Cambridge Lower Secondary (Grades 6-8): Specialist laboratories, coding, and adolescent pastoral care.
- Cambridge IGCSE (Grades 9-10): Internationally benchmarked 2-year subject specialization.
- Sixth Form Pinnacle (Grades 11-12): International Baccalaureate (IBDP) & Cambridge A-Levels.

4. TUITION & FEES (2026-2027)
- Early Years: $14,200/year
- Primary School: $17,500/year
- Middle School: $19,800/year
- Senior School (IGCSE): $22,400/year
- Sixth Form: $24,800/year
- Sibling discounts: 10% (2nd child), 15% (3rd+ child)
- Merit & Talent Scholarships: 20% to 50% tuition remission

5. ADMISSIONS CALENDAR
- Priority & Scholarship Round: November 15
- Regular Admissions Round: January 31
- Rolling admissions thereafter.

Book a private campus tour or virtual consultation at:
${SCHOOL_INFO.website} | admissions@brighton-international.edu
========================================================`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Brighton-International-School-Prospectus-2026-2027.txt';
    link.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif-classic font-semibold text-white tracking-wide">
                Digital Prospectus & Guide 2026–2027
              </h3>
              <p className="text-xs text-slate-300">
                Official Admissions, Academic Pathways & Campus Overview
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
          {/* Cover Preview Card */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white p-6 border border-slate-800 shadow-inner">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-crest tracking-widest text-amber-400 uppercase block mb-1">
                  BRIGHTON INTERNATIONAL SCHOOL
                </span>
                <h4 className="text-2xl font-serif-classic font-bold text-white mb-1">
                  Excellence in Education
                </h4>
                <p className="text-xs text-slate-300 max-w-sm">
                  {SCHOOL_INFO.motto} · Cambridge Assessment & International Baccalaureate World School
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-3 rounded-xl text-center shrink-0">
                <span className="text-xs text-amber-300 font-mono block">AY 2026-2027</span>
                <span className="text-[10px] text-slate-200 uppercase font-semibold">Official Prospectus</span>
              </div>
            </div>
          </div>

          {/* Key Prospectus Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <Award className="w-4 h-4 text-amber-600 mb-1.5" />
              <div className="font-semibold text-slate-900 mb-0.5">Academic Pathways</div>
              <p className="text-[11px] text-slate-500">
                EYFS, Cambridge Primary & IGCSE, plus IBDP & A-Levels dual Sixth Form options.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <Building className="w-4 h-4 text-slate-700 mb-1.5" />
              <div className="font-semibold text-slate-900 mb-0.5">35-Acre Campus</div>
              <p className="text-[11px] text-slate-500">
                Olympic 50m pool, 450-seat theatre, robotics lab, and modern boarding houses.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1.5" />
              <div className="font-semibold text-slate-900 mb-0.5">Accreditation</div>
              <p className="text-[11px] text-slate-500">
                Dual CIS and NEASC accredited, recognized by universities across 60+ countries.
              </p>
            </div>
          </div>

          {/* Quick Table of Contents Preview */}
          <div className="space-y-2 text-xs">
            <div className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
              Prospectus Chapters Included
            </div>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
              <div className="p-2.5 flex items-center justify-between text-slate-700">
                <span>1. Headmaster’s Address & Educational Ethos</span>
                <span className="text-[11px] text-slate-400 font-mono">Pages 02–05</span>
              </div>
              <div className="p-2.5 flex items-center justify-between text-slate-700">
                <span>2. The Cambridge & IB Academic Framework</span>
                <span className="text-[11px] text-slate-400 font-mono">Pages 06–15</span>
              </div>
              <div className="p-2.5 flex items-center justify-between text-slate-700">
                <span>3. University & Careers Guidance Matriculation Table</span>
                <span className="text-[11px] text-slate-400 font-mono">Pages 16–21</span>
              </div>
              <div className="p-2.5 flex items-center justify-between text-slate-700">
                <span>4. Residential Boarding, Pastoral Care & Wellbeing</span>
                <span className="text-[11px] text-slate-400 font-mono">Pages 22–27</span>
              </div>
              <div className="p-2.5 flex items-center justify-between text-slate-700">
                <span>5. Admissions Procedures, Testing & Fee Schedules</span>
                <span className="text-[11px] text-slate-400 font-mono">Pages 28–34</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              onAskChatbot("Can you give me a summary of the 2026-2027 Prospectus key dates and highlights?");
              onClose();
            }}
            className="text-xs text-amber-700 hover:text-amber-800 font-medium underline"
          >
            Ask specific questions in chat
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors"
          >
            {downloaded ? <Check className="w-4 h-4 text-emerald-900" /> : <Download className="w-4 h-4" />}
            <span>{downloaded ? 'Prospectus Saved!' : 'Download Prospectus (.txt)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
