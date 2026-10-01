import React from 'react';
import { X, BookOpen, FileCheck, Map, ShieldCheck, Compass, Info } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-700 light:border-parchment-300 bg-obsidian-900 light:bg-parchment-100 text-slate-100 light:text-slate-900 shadow-2xl transition-colors p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800 light:border-parchment-300">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-red-950/80 border border-red-700/60 text-red-400 light:bg-red-100 light:border-red-300 light:text-red-700">
              <Info className="w-5 h-5 text-crimson-600" />
            </span>
            <div>
              <span className="text-xs font-mono font-bold tracking-wider text-red-400 light:text-crimson-800 uppercase">
                아카이브 사료 및 방법론 안내
              </span>
              <h3 className="text-lg font-bold font-serif text-white light:text-slate-900">
                거대한 침묵의 궤적 프로젝트 개요
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 light:text-slate-500 light:hover:text-slate-900 light:hover:bg-parchment-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-zinc-300 light:text-slate-700 leading-relaxed font-sans">
          
          <div className="p-4 rounded-xl border border-zinc-800 light:border-parchment-300 bg-obsidian-950/60 light:bg-parchment-200/50 space-y-2">
            <h4 className="text-xs font-bold text-white light:text-slate-900 font-serif flex items-center gap-1.5 uppercase">
              <FileCheck className="w-4 h-4 text-amber-500" />
              1. 1차 역사 사료 (Primary Sources)
            </h4>
            <p>
              본 아카이브의 수치, 날짜, 작전 지휘관 및 인용구는 1941년부터 1943년까지 독일 제국보안본부(RSHA)가 작성한 <strong>소련 작전 상황 보고서(Ereignismeldungen UdSSR)</strong> 195호 전권 및 뉘른베르크 미 군사재판(Case 9: Einsatzgruppen Trial) 법정 증거 서류철, 그리고 독일 연방기록보관소(Bundesarchiv)의 공식 사료를 바탕으로 고증되었습니다.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-800 light:border-parchment-300 bg-obsidian-950/60 light:bg-parchment-200/50 space-y-2">
            <h4 className="text-xs font-bold text-white light:text-slate-900 font-serif flex items-center gap-1.5 uppercase">
              <Map className="w-4 h-4 text-cyan-500" />
              2. 지도 및 지리 공간 궤적 (Standalone SVG Engine)
            </h4>
            <p>
              외부 타일 서버, 외부 API 키, 외부 지도 라이브러리(Leaflet/Mapbox 등)에 대한 일체의 의존성 없이 React 내부의 <strong>100% 독립형 순수 인라인 SVG 엔진</strong>으로 직접 렌더링됩니다. 발트해, 흑해, 크림 반도, 드네프르강과 동부 전선 17대 주요 도시, 아인자츠그루펜 4개 집단군(A·B·C·D)의 진격 축선 및 7대 학살 거점을 완전한 오프라인 환경에서도 즉각적으로 시각화합니다.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-800 light:border-parchment-300 bg-obsidian-950/60 light:bg-parchment-200/50 space-y-2">
            <h4 className="text-xs font-bold text-white light:text-slate-900 font-serif flex items-center gap-1.5 uppercase">
              <BookOpen className="w-4 h-4 text-rose-500" />
              3. 기획 의도 및 기억의 윤리
            </h4>
            <p>
              본 프로젝트는 잔혹한 이미지를 자극적으로 소비하는 것을 지양하고, 냉철한 지도적 증거와 한나 아렌트의 '악의 평범성' 철학을 교차시킴으로써, <strong>"고등 교육을 받은 평범한 관료와 지식인들이 사유를 멈추었을 때 인류가 어떤 비극을 빚어냈는가"</strong>를 통찰하고자 기획되었습니다.
            </p>
          </div>

        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white light:bg-parchment-300 light:text-slate-900 transition-colors"
          >
            확인 및 닫기
          </button>
        </div>

      </div>
    </div>
  );
};
