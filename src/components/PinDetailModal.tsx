import React, { useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Users, 
  Crosshair, 
  FileText, 
  AlertTriangle, 
  Quote, 
  ShieldAlert,
  Search
} from 'lucide-react';
import { MassacreSite } from '../data/historicalData';

interface PinDetailModalProps {
  site: MassacreSite | null;
  onClose: () => void;
}

export const PinDetailModal: React.FC<PinDetailModalProps> = ({ site, onClose }) => {
  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!site) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm transition-all duration-300 animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-700 light:border-parchment-300 bg-obsidian-900 light:bg-parchment-100 text-slate-100 light:text-slate-900 shadow-2xl transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Ribbon */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-zinc-800 light:border-parchment-300 bg-obsidian-900/95 light:bg-parchment-100/95 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-red-950/80 border border-red-700/60 text-red-400 light:bg-red-100 light:border-red-300 light:text-red-700">
              <Crosshair className="w-5 h-5 text-crimson-600" />
            </span>
            <div>
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-red-400 light:text-crimson-700 uppercase">
                학살 작전 기밀 사료 카드
              </span>
              <h2 className="text-lg sm:text-2xl font-bold font-serif text-white light:text-slate-900 tracking-tight">
                {site.name} <span className="text-xs sm:text-sm font-sans font-normal text-zinc-400 light:text-slate-500">({site.originalName})</span>
              </h2>
            </div>
          </div>
          
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 light:text-slate-500 light:hover:text-slate-900 light:hover:bg-parchment-200 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 space-y-6">
          
          {/* Key Intelligence Matrix Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            <div className="p-3.5 rounded-xl border border-zinc-800 light:border-parchment-300 bg-obsidian-950/60 light:bg-parchment-200/60">
              <div className="flex items-center gap-1.5 text-zinc-400 light:text-slate-600 text-xs font-medium mb-1">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span>집행 일시</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-100 light:text-slate-900 font-mono">
                {site.exactDate}
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-red-900/40 light:border-red-200 bg-red-950/20 light:bg-red-50/60">
              <div className="flex items-center gap-1.5 text-red-400 light:text-red-700 text-xs font-medium mb-1">
                <Users className="w-3.5 h-3.5" />
                <span>확인 희생자 수</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-red-400 light:text-crimson-800 font-mono">
                {site.casualtyDisplay}
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-zinc-800 light:border-parchment-300 bg-obsidian-950/60 light:bg-parchment-200/60">
              <div className="flex items-center gap-1.5 text-zinc-400 light:text-slate-600 text-xs font-medium mb-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                <span>위치 및 지형</span>
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-200 light:text-slate-800">
                {site.locationTitle}
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-zinc-800 light:border-parchment-300 bg-obsidian-950/60 light:bg-parchment-200/60">
              <div className="flex items-center gap-1.5 text-zinc-400 light:text-slate-600 text-xs font-medium mb-1">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                <span>집행 방식</span>
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-200 light:text-slate-800">
                {site.executionMethod}
              </div>
            </div>

          </div>

          {/* Perpetrator Information */}
          <div className="p-4 rounded-xl border border-zinc-800 light:border-parchment-300 bg-obsidian-950/40 light:bg-parchment-200/40 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex-1">
              <span className="text-[11px] font-mono text-zinc-400 light:text-slate-600 uppercase">가해 부대 (Perpetrator Unit)</span>
              <p className="text-sm font-semibold text-slate-100 light:text-slate-900 mt-0.5">{site.executionUnit}</p>
            </div>
            <div className="flex-1">
              <span className="text-[11px] font-mono text-zinc-400 light:text-slate-600 uppercase">현장 지휘관 (Commanding Officers)</span>
              <p className="text-sm font-semibold text-slate-100 light:text-slate-900 mt-0.5">{site.commandingOfficers}</p>
            </div>
          </div>

          {/* Nazi Operational Report Primary Document Quote (Ereignismeldung UdSSR) */}
          <div className="rounded-xl border border-red-900/50 light:border-red-300/80 bg-red-950/20 light:bg-red-50/70 p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-red-900/40 light:border-red-200">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-red-400 light:text-red-700" />
                <span className="text-xs font-bold font-mono tracking-wide text-red-300 light:text-red-800">
                  나치 독일 기밀 작전 보고서 원문 (Ereignismeldung UdSSR)
                </span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400 light:text-slate-500">{site.historicalQuote.date}</span>
            </div>

            {/* German Excerpt */}
            <div className="text-xs font-mono text-zinc-400 light:text-slate-600 italic leading-relaxed pl-3 border-l-2 border-zinc-700 light:border-slate-300">
              "{site.historicalQuote.germanDocument}"
            </div>

            {/* Korean Translation */}
            <div className="text-sm font-serif font-medium text-slate-100 light:text-slate-900 leading-relaxed bg-obsidian-950/60 light:bg-white/90 p-3.5 rounded-lg border border-red-900/30 light:border-red-200/50">
              <div className="text-xs font-mono text-red-400 light:text-red-700 mb-1 font-semibold flex items-center gap-1">
                <Quote className="w-3 h-3" />
                국문 학술 번역
              </div>
              {site.historicalQuote.koreanTranslation}
            </div>

            <div className="text-[11px] text-zinc-500 light:text-slate-500 text-right">
              출처: {site.historicalQuote.source}
            </div>
          </div>

          {/* Context and Background Note */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 light:text-slate-600 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              학살 경위 및 사료적 배경
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 light:text-slate-700 leading-relaxed bg-obsidian-950/40 light:bg-parchment-200/40 p-4 rounded-xl border border-zinc-800 light:border-parchment-300">
              {site.contextNote}
            </p>
          </div>

          {/* Investigation & Aftermath Note */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 light:text-slate-600 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-cyan-500" />
              전후 사법 조사 및 1005 작전(증거 인멸) 기록
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 light:text-slate-700 leading-relaxed bg-obsidian-950/40 light:bg-parchment-200/40 p-4 rounded-xl border border-zinc-800 light:border-parchment-300">
              {site.investigationDetails}
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-zinc-800 light:border-parchment-300 bg-obsidian-950 light:bg-parchment-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white light:bg-parchment-300 light:hover:bg-parchment-400 light:text-slate-900 transition-colors"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
};
