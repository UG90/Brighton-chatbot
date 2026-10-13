import React, { useState } from 'react';
import { TUITION_RATES, BOARDING_RATES, BUS_ROUTES } from '../data/brightonData';
import { Calculator, X, Check, ArrowRight, DollarSign, Sparkles, Download } from 'lucide-react';

interface TuitionCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskChatbot: (prompt: string) => void;
}

export const TuitionCalculatorModal: React.FC<TuitionCalculatorModalProps> = ({
  isOpen,
  onClose,
  onAskChatbot,
}) => {
  const [gradeKey, setGradeKey] = useState<string>('primary');
  const [boardingKey, setBoardingKey] = useState<string>('none');
  const [busRouteId, setBusRouteId] = useState<string>('none');
  const [hasLunchPlan, setHasLunchPlan] = useState<boolean>(true);
  const [siblingCount, setSiblingCount] = useState<number>(0);
  const [scholarshipPercent, setScholarshipPercent] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const baseTuition = TUITION_RATES[gradeKey]?.tuition || 17500;
  const boardingFee = BOARDING_RATES[boardingKey]?.fee || 0;
  const busFee = BUS_ROUTES.find((b) => b.id === busRouteId)?.fee || 0;
  const mealPlanFee = hasLunchPlan ? 1450 : 0;
  const techAndResourceFee = 650;

  // Sibling discount applies to tuition (10% for 2nd, 15% for 3rd+)
  const siblingDiscountRate = siblingCount === 1 ? 0.10 : siblingCount >= 2 ? 0.15 : 0;
  const siblingDiscountAmount = Math.round(baseTuition * siblingDiscountRate);

  // Scholarship applies to base tuition
  const scholarshipAmount = Math.round((baseTuition * scholarshipPercent) / 100);

  const netTuition = Math.max(0, baseTuition - siblingDiscountAmount - scholarshipAmount);
  const totalAnnual = netTuition + boardingFee + busFee + mealPlanFee + techAndResourceFee;
  const termlyInstallment = Math.round(totalAnnual / 3);

  const handleConsultChat = () => {
    const summary = `I used the Fee Calculator for ${TUITION_RATES[gradeKey].label} with ${BOARDING_RATES[boardingKey].label}. Total estimated annual fee is $${totalAnnual.toLocaleString()} ($${termlyInstallment.toLocaleString()}/term). What payment plans or financial aid options are available for this grade?`;
    onAskChatbot(summary);
    onClose();
  };

  const handleDownloadEstimate = () => {
    const content = `BRIGHTON INTERNATIONAL SCHOOL
ESTIMATED TUITION & ANCILLARY FEES (2026-2027)
Generated on: ${new Date().toLocaleDateString()}
--------------------------------------------------
Grade Level: ${TUITION_RATES[gradeKey].label}
Base Tuition: $${baseTuition.toLocaleString()}
Boarding Plan: ${BOARDING_RATES[boardingKey].label} ($${boardingFee.toLocaleString()})
Transportation: ${BUS_ROUTES.find((b) => b.id === busRouteId)?.label} ($${busFee.toLocaleString()})
Lunch & Nutrition: ${hasLunchPlan ? '$1,450 (Included)' : '$0 (Packed lunch)'}
Technology & Resource Fee: $${techAndResourceFee.toLocaleString()}
Sibling Discount: -$${siblingDiscountAmount.toLocaleString()} (${siblingDiscountRate * 100}%)
Scholarship Remission: -$${scholarshipAmount.toLocaleString()} (${scholarshipPercent}%)
--------------------------------------------------
NET ANNUAL TOTAL: $${totalAnnual.toLocaleString()} USD
TERMLY INSTALLMENT (x3): $${termlyInstallment.toLocaleString()} USD per term
--------------------------------------------------
Note: Official fee schedule subject to formal acceptance and confirmation.
Contact: admissions@brighton-international.edu | +1 (800) 555-BRIGHTON`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Brighton-Tuition-Estimate-${gradeKey}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif-classic font-semibold text-white tracking-wide">
                Tuition & Fees Estimator
              </h3>
              <p className="text-xs text-slate-300">
                Academic Year 2026–2027 · Transparent Fee Breakdown
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Grade selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
              Select Grade & Academic Stage
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.entries(TUITION_RATES).map(([key, data]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setGradeKey(key)}
                  className={`p-3 text-left rounded-xl border text-xs transition-all ${
                    gradeKey === key
                      ? 'border-amber-500 bg-amber-50/60 font-medium text-slate-900 shadow-sm ring-1 ring-amber-500/30'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50/50'
                  }`}
                >
                  <div className="font-semibold text-slate-900 mb-1">{data.label}</div>
                  <div className="text-amber-800 font-mono">${data.tuition.toLocaleString()}/yr</div>
                </button>
              ))}
            </div>
          </div>

          {/* Boarding & Transport Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
                Residential & Boarding
              </label>
              <select
                value={boardingKey}
                onChange={(e) => setBoardingKey(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              >
                {Object.entries(BOARDING_RATES).map(([k, val]) => (
                  <option key={k} value={k}>
                    {val.label} {val.fee > 0 ? `(+$${val.fee.toLocaleString()})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
                Daily School Bus Transport
              </label>
              <select
                value={busRouteId}
                onChange={(e) => setBusRouteId(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              >
                {BUS_ROUTES.map((route) => (
                  <option key={route.id} value={route.id}>
                    {route.label} {route.fee > 0 ? `(+$${route.fee.toLocaleString()})` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Lunch & Sibling / Scholarship toggles */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-xs text-slate-900 block">Chef-Prepared Organic Lunch Plan</span>
                <span className="text-xs text-slate-500">Three-course hot lunch & daily fresh fruit snacks ($1,450/yr)</span>
              </div>
              <input
                type="checkbox"
                checked={hasLunchPlan}
                onChange={(e) => setHasLunchPlan(e.target.checked)}
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
              <div>
                <label className="block text-xs text-slate-700 mb-1 font-medium">
                  Enrolled Siblings at Brighton
                </label>
                <select
                  value={siblingCount}
                  onChange={(e) => setSiblingCount(Number(e.target.value))}
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
                >
                  <option value={0}>Only 1 Child (0% discount)</option>
                  <option value={1}>2nd Child (10% tuition discount)</option>
                  <option value={2}>3rd+ Child (15% tuition discount)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-700 mb-1 font-medium">
                  Simulate Merit Scholarship Remission
                </label>
                <select
                  value={scholarshipPercent}
                  onChange={(e) => setScholarshipPercent(Number(e.target.value))}
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
                >
                  <option value={0}>No Scholarship (0%)</option>
                  <option value={20}>20% Arts / Sports Fellowship</option>
                  <option value={30}>30% Academic Distinction</option>
                  <option value={50}>50% Headmaster Merit Scholar</option>
                </select>
              </div>
            </div>
          </div>

          {/* Real-time Calculation Summary Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-5 rounded-2xl border border-slate-800 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-medium text-amber-400 uppercase tracking-widest block mb-1">
                  Estimated Total Investment
                </span>
                <div className="text-3xl font-serif-classic font-bold text-white tracking-tight">
                  ${totalAnnual.toLocaleString()}{' '}
                  <span className="text-xs font-sans font-normal text-slate-400">/ academic year</span>
                </div>
              </div>
              <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 text-right">
                <span className="text-[11px] text-slate-400 block">Termly Installment (3x per year)</span>
                <span className="text-lg font-mono font-semibold text-amber-400">
                  ${termlyInstallment.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-300">
              <div>
                <span className="text-slate-500 block">Base Tuition</span>
                <span>${baseTuition.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Boarding/Day</span>
                <span>${boardingFee.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Bus & Meals</span>
                <span>${(busFee + mealPlanFee).toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Discounts</span>
                <span className="text-emerald-400">
                  -${(siblingDiscountAmount + scholarshipAmount).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleDownloadEstimate}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-100 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Download className="w-4 h-4" />}
            {copied ? 'Estimate Downloaded' : 'Export Breakdown (.txt)'}
          </button>

          <div className="w-full sm:w-auto flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleConsultChat}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors"
            >
              <span>Ask Counselor in Chat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
