import React, { useState } from 'react';
import { 
  OPERATIONAL_ROUTES, 
  MASSACRE_SITES, 
  TIMELINE_STEPS, 
  MassacreSite, 
  OperationalRoute 
} from '../data/historicalData';
import { MassacreMap } from './MassacreMap';
import { TimelineController } from './TimelineController';
import { PinDetailModal } from './PinDetailModal';
import { 
  Crosshair, 
  MapPin, 
  Skull, 
  ChevronRight, 
  AlertTriangle, 
  ShieldAlert, 
  FileText,
  SlidersHorizontal,
  Compass
} from 'lucide-react';

interface MapTimelineViewProps {
  isDarkMode: boolean;
  onOpenVerdict: () => void;
  activeTab: 'map' | 'banality';
}

export const MapTimelineView: React.FC<MapTimelineViewProps> = ({
  isDarkMode,
  onOpenVerdict,
  activeTab,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedSite, setSelectedSite] = useState<MassacreSite | null>(null);
  const [activeGroupInfo, setActiveGroupInfo] = useState<OperationalRoute | null>(null);

  const currentStep = TIMELINE_STEPS[currentStepIndex];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Context & Stats Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        
        {/* Left: Operational Overview & Mission Directive */}
        <div className="lg:col-span-8 p-5 rounded-2xl border border-zinc-800 light:border-parchment-300 bg-obsidian-900/80 light:bg-parchment-100/90 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
              <span className="text-[11px] font-mono font-bold tracking-wider text-red-400 light:text-crimson-700 uppercase">
                동부 전선 이동학살 궤적 분석 (1941–1943)
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-serif text-white light:text-slate-900 leading-snug">
              제국보안본부(RSHA) 특수임무부대 이동 총살 작전도
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-300 light:text-slate-700 leading-relaxed font-sans">
              1941년 6월 바르바로사 작전 개시 이후 독일 국방군 뒤를 따라 침공한 4개 아인자츠그루펜(A·B·C·D) 부대의 살육 동선과 확인된 7대 주요 집단학살 거점 사료를 시계열로 재구성합니다.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 light:border-parchment-300 flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400 light:text-slate-600">
            <span className="flex items-center gap-1.5 text-amber-400 light:text-amber-800">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
              Group A: 발트·레닌그라드
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400 light:text-cyan-800">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block"></span>
              Group B: 벨라루스·모스크바
            </span>
            <span className="flex items-center gap-1.5 text-rose-400 light:text-rose-800">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
              Group C: 우크라이나 중북부
            </span>
            <span className="flex items-center gap-1.5 text-purple-400 light:text-purple-800">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block"></span>
              Group D: 남부·크림·카프카스
            </span>
          </div>
        </div>

        {/* Right: Key Cartographic Legend & Interactive Status */}
        <div className="lg:col-span-4 p-5 rounded-2xl border border-zinc-800 light:border-parchment-300 bg-obsidian-900/80 light:bg-parchment-100/90 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono text-zinc-400 light:text-slate-600 uppercase">
              실시간 작전 진행 단계
            </span>
            <div className="text-xl sm:text-2xl font-bold font-serif text-white light:text-slate-900">
              {currentStep.displayDate}
            </div>
            <div className="text-xs font-medium text-red-400 light:text-crimson-700">
              {currentStep.title}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 light:border-parchment-300 flex items-center justify-between text-xs">
            <span className="text-zinc-400 light:text-slate-600">지도 활성 학살지:</span>
            <span className="font-mono font-bold text-red-500 light:text-crimson-800">
              {MASSACRE_SITES.filter(s => s.timelineStepId <= currentStepIndex).length}개 소 (전체 7개소)
            </span>
          </div>
        </div>

      </div>

      {/* Main Map Canvas */}
      <MassacreMap
        currentStepIndex={currentStepIndex}
        routeProgressRatio={currentStep.routeProgressRatio}
        isDarkMode={isDarkMode}
        selectedSite={selectedSite}
        onSelectSite={(site) => setSelectedSite(site)}
        activeTab={activeTab}
      />

      {/* 7 Major Massacre Sites Quick Navigator Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold font-serif uppercase tracking-wider text-zinc-300 light:text-slate-800 flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-red-500" />
            7대 주요 학살 거점 기밀 사료 (클릭 시 지도 이동 및 사료 열람)
          </h3>
          <span className="text-[11px] text-zinc-500 light:text-slate-500 font-mono">
            * 붉은 테두리: 현재 타임라인 시점에 이미 발생한 사건
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-2.5">
          {MASSACRE_SITES.map((site) => {
            const isOccurred = site.timelineStepId <= currentStepIndex;
            const isSelected = selectedSite?.id === site.id;

            return (
              <button
                key={site.id}
                type="button"
                onClick={() => {
                  setSelectedSite(site);
                }}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 group ${
                  isSelected
                    ? 'border-red-500 bg-red-950/40 light:bg-red-50 light:border-red-500 ring-2 ring-red-500/50 scale-[1.02]'
                    : isOccurred
                    ? 'border-zinc-700/80 bg-obsidian-900/90 light:bg-parchment-100 light:border-parchment-300 hover:border-red-500/60 light:hover:border-red-400'
                    : 'border-zinc-800/50 bg-obsidian-950/50 light:bg-parchment-200/50 light:border-parchment-300 opacity-60 hover:opacity-90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-zinc-400 light:text-slate-500">
                      {site.dateRange}
                    </span>
                    {isOccurred && (
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-white light:text-slate-900 truncate group-hover:text-red-400 transition-colors">
                    {site.name}
                  </h4>
                  <div className="text-[11px] font-mono text-rose-400 light:text-crimson-700 font-semibold mt-0.5">
                    {site.casualtyDisplay.split('(')[0]}
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-zinc-800/80 light:border-parchment-300 flex items-center justify-between text-[10px] text-zinc-500 light:text-slate-500">
                  <span className="truncate">{site.executionUnit.split(' ')[0]}</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 Operational Groups Details Accordion/Drawer */}
      <div className="rounded-2xl border border-zinc-800 light:border-parchment-300 bg-obsidian-900/60 light:bg-parchment-100/70 p-4 sm:p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold font-serif text-white light:text-slate-900 flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-500" />
            아인자츠그루펜 4개 집단군 세부 사령관 및 배속 정보
          </h3>
          <span className="text-[11px] font-mono text-zinc-500 light:text-slate-500">
            총원 약 3,000명 (친위대·보안국·게슈타포 정예)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {OPERATIONAL_ROUTES.map((route) => (
            <div
              key={route.id}
              className="p-3.5 rounded-xl border border-zinc-800 light:border-parchment-300 bg-obsidian-950/60 light:bg-parchment-200/50 space-y-2"
            >
              <div className="flex items-center gap-2 pb-1.5 border-b border-zinc-800 light:border-parchment-300">
                <span
                  className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                  style={{ backgroundColor: route.color }}
                />
                <span className="text-xs font-bold text-white light:text-slate-900">
                  {route.name}
                </span>
              </div>
              <div className="text-[11px] font-mono text-zinc-400 light:text-slate-600">
                {route.armyGroup}
              </div>
              <div className="text-[11px] text-zinc-300 light:text-slate-700">
                <strong>지휘관:</strong> {route.commanders.join(', ')}
              </div>
              <p className="text-[11px] text-zinc-400 light:text-slate-600 leading-relaxed font-sans line-clamp-3">
                {route.summary}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chronological Bottom Timeline Scroller & Controller */}
      <TimelineController
        currentStepIndex={currentStepIndex}
        setCurrentStepIndex={setCurrentStepIndex}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onOpenVerdict={onOpenVerdict}
      />

      {/* Pin Detail Modal */}
      <PinDetailModal
        site={selectedSite}
        onClose={() => setSelectedSite(null)}
      />

    </div>
  );
};
