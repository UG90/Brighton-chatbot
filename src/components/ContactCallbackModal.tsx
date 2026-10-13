import React, { useState } from 'react';
import { X, Phone, Mail, User, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';
import { SCHOOL_INFO } from '../data/brightonData';

interface ContactCallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitted: (summary: string) => void;
}

export const ContactCallbackModal: React.FC<ContactCallbackModalProps> = ({
  isOpen,
  onClose,
  onSubmitted,
}) => {
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (09:00 - 12:00)');
  const [topic, setTopic] = useState('Admissions & Enrollment Process');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !phone) return;

    setSubmitted(true);
    setTimeout(() => {
      const summary = `I requested an Admissions Callback for ${parentName} regarding "${topic}" at ${phone} (Preferred slot: ${preferredTime}). ${notes ? `Note: "${notes}"` : ''} When will an admissions counselor reach out?`;
      onSubmitted(summary);
      setSubmitted(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif-classic font-semibold text-white tracking-wide">
                Speak with Admissions
              </h3>
              <p className="text-xs text-slate-300">
                Direct phone consultation with our Academic Admissions Counsellor
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

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-serif-classic font-bold text-slate-900">
              Callback Request Logged
            </h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Our Admissions Officer has received your consultation request. You will receive a call during your requested time window ({preferredTime}).
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700">
            <div>
              <label className="block font-semibold text-slate-900 mb-1">
                Parent / Guardian Full Name *
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={parentName}
                  placeholder="e.g. Mrs. Sarah Jenkins"
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-900 mb-1">
                  Contact Phone / WhatsApp *
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    placeholder="+1 (555) 000-0000"
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-900 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    placeholder="parent@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-900 mb-1">
                  Topic of Consultation
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 bg-white"
                >
                  <option value="Admissions & Application Deadlines">Admissions & Deadlines</option>
                  <option value="Course Selection (IBDP vs A-Levels)">Course Selection (IBDP / A-Levels)</option>
                  <option value="Tuition Fees & Scholarship Evaluation">Tuition & Scholarships</option>
                  <option value="Residential Boarding Accommodations">Residential Boarding</option>
                  <option value="International Student Visa & Transfers">Visas & International Relocation</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-900 mb-1">
                  Preferred Call Time
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 bg-white"
                >
                  <option value="Morning (09:00 - 12:00)">Morning (09:00 - 12:00)</option>
                  <option value="Afternoon (13:00 - 16:00)">Afternoon (13:00 - 16:00)</option>
                  <option value="Evening (17:00 - 19:00)">Evening (17:00 - 19:00)</option>
                  <option value="Anytime today">Anytime today</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-900 mb-1">
                Specific Questions / Notes for Counselor
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. My child is currently studying in the French system and interested in Grade 9 IGCSE..."
                rows={2}
                className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center gap-2 text-[11px] text-slate-500">
              <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Admissions office hours: {SCHOOL_INFO.officeHours}</span>
            </div>

            {/* Footer */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors"
              >
                <span>Request Call</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
