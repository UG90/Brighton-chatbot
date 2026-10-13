import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Check, Send, Sparkles, User, Mail, Phone } from 'lucide-react';
import { SCHOOL_INFO } from '../data/brightonData';

interface TourBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (bookingSummary: string) => void;
}

export const TourBookingModal: React.FC<TourBookingModalProps> = ({
  isOpen,
  onClose,
  onConfirmBooking,
}) => {
  const [tourType, setTourType] = useState<'private' | 'open_day' | 'virtual'>('private');
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-20');
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');
  const [parentName, setParentName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [studentGrade, setStudentGrade] = useState<string>('Grade 7 (Middle School)');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !email) return;

    setIsSuccess(true);
    setTimeout(() => {
      const summary = `I have successfully scheduled a ${
        tourType === 'private' ? 'Private In-Person Campus Tour' : tourType === 'open_day' ? 'Saturday Open Morning' : 'Virtual 360° Guided Tour'
      } for ${parentName} on ${selectedDate} at ${selectedTime}. Target entry grade: ${studentGrade}. Please confirm what identification or documents we should bring to the visitor reception desk.`;
      onConfirmBooking(summary);
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif-classic font-semibold text-white tracking-wide">
                Book a Campus Experience
              </h3>
              <p className="text-xs text-slate-300">
                Explore our 35-acre parkland facilities and meet admissions leaders
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

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-serif-classic font-bold text-slate-900">
              Campus Visit Reserved!
            </h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Your visit pass has been issued for {selectedDate} at {selectedTime}. A confirmation package and visitor parking voucher has been queued for {email}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-sm text-slate-700">
            {/* Tour Type Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
                Select Experience Format
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'private', label: 'Private Tour', sub: 'Tue & Thu 1-on-1' },
                  { id: 'open_day', label: 'Open Morning', sub: 'Saturday Event' },
                  { id: 'virtual', label: 'Virtual 360°', sub: 'Overseas Live' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTourType(item.id as typeof tourType)}
                    className={`p-3 text-left rounded-xl border text-xs transition-all ${
                      tourType === item.id
                        ? 'border-amber-500 bg-amber-50/70 font-medium text-slate-900 ring-1 ring-amber-500/20'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50/50'
                    }`}
                  >
                    <div className="font-semibold text-slate-900">{item.label}</div>
                    <div className="text-[10px] text-slate-500">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time slots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min="2026-10-15"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1">
                  Session Time
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800"
                >
                  <option value="09:30 AM">09:30 AM (Morning Assembly & Classes)</option>
                  <option value="11:00 AM">11:00 AM (Academic Labs & Arts Walk)</option>
                  <option value="02:00 PM">02:00 PM (Afternoon Co-Curricular & Sports)</option>
                  <option value="04:00 PM">04:00 PM (Boarding House & Sunset Tour)</option>
                </select>
              </div>
            </div>

            {/* Prospective Grade & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1">
                  Prospective Entry Grade
                </label>
                <select
                  value={studentGrade}
                  onChange={(e) => setStudentGrade(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800"
                >
                  <option value="Nursery / EYFS (Ages 3-4)">Nursery / EYFS (Ages 3-4)</option>
                  <option value="Kindergarten / Reception (Age 4-5)">Kindergarten / Reception (Age 4-5)</option>
                  <option value="Grade 1 - 5 (Primary School)">Grade 1 - 5 (Primary School)</option>
                  <option value="Grade 6 - 8 (Middle School)">Grade 6 - 8 (Middle School)</option>
                  <option value="Grade 9 - 10 (Cambridge IGCSE)">Grade 9 - 10 (Cambridge IGCSE)</option>
                  <option value="Grade 11 - 12 (IB Diploma / A-Levels)">Grade 11 - 12 (IB Diploma / A-Levels)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1">
                  Family Members Attending
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800"
                >
                  <option value={1}>1 Person</option>
                  <option value={2}>2 Persons (Parent + Student)</option>
                  <option value={3}>3 Persons</option>
                  <option value={4}>4 Persons (Family Group)</option>
                </select>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1">
                  Parent / Guardian Full Name *
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={parentName}
                    placeholder="e.g. Dr. Eleanor Vance"
                    onChange={(e) => setParentName(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={email}
                      placeholder="parent@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-1">
                    Phone / WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={phone}
                      placeholder="+1 (555) 019-2834"
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-2 text-[11px] text-slate-600">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Campus Location: {SCHOOL_INFO.location} · Free visitor parking on East Gate</span>
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors"
              >
                <span>Confirm Reservation</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
