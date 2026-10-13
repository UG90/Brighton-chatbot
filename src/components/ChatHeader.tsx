import React from 'react';
import { 
  Menu, RotateCcw, Volume2, VolumeX, Download, 
  Calculator, Calendar, GraduationCap, FileText, Phone
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/brightonData';

interface ChatHeaderProps {
  onToggleSidebar: () => void;
  onResetChat: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onExportTranscript: () => void;
  onOpenCalculator: () => void;
  onOpenGradeFinder: () => void;
  onOpenTourBooking: () => void;
  onOpenProspectus: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  onToggleSidebar,
  onResetChat,
  isMuted,
  onToggleMute,
  onExportTranscript,
  onOpenCalculator,
  onOpenGradeFinder,
  onOpenTourBooking,
  onOpenProspectus,
}) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between z-20 shrink-0">
      {/* Left: Mobile Menu & School Branding */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
          aria-label="Open navigation sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-slate-950 border border-amber-500/30 flex items-center justify-center text-amber-400 font-crest font-bold text-base shadow-xs">
            B
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-classic font-bold text-slate-900 text-sm tracking-wide">
                Brighton International School
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Admissions Desk Online" />
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-2">
              <span>Admissions & Academic Advisor Bot</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-amber-800 font-medium">Cambridge & IB World</span>
            </div>
          </div>
        </div>
      </div>

      {/* Center: Desktop Quick Tools */}
      <div className="hidden md:flex items-center gap-1.5">
        <button
          onClick={onOpenCalculator}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200/80"
          title="Tuition & Fees Calculator"
        >
          <Calculator className="w-3.5 h-3.5 text-amber-700" />
          <span>Fee Calculator</span>
        </button>

        <button
          onClick={onOpenGradeFinder}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200/80"
          title="Age & Grade Placement Tool"
        >
          <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
          <span>Grade Finder</span>
        </button>

        <button
          onClick={onOpenTourBooking}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200/80"
          title="Schedule Campus Tour"
        >
          <Calendar className="w-3.5 h-3.5 text-amber-700" />
          <span>Book Tour</span>
        </button>

        <button
          onClick={onOpenProspectus}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200/80"
          title="Digital School Prospectus"
        >
          <FileText className="w-3.5 h-3.5 text-slate-600" />
          <span>Prospectus</span>
        </button>
      </div>

      {/* Right Controls: Sound, Export, Reset */}
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={onToggleMute}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-slate-600" />}
        </button>

        <button
          onClick={onExportTranscript}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          title="Export conversation transcript"
          aria-label="Export conversation transcript"
        >
          <Download className="w-4 h-4 text-slate-600" />
        </button>

        <button
          onClick={onResetChat}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          title="Reset conversation"
          aria-label="Reset conversation"
        >
          <RotateCcw className="w-4 h-4 text-slate-600" />
        </button>
      </div>
    </header>
  );
};
