import React, { useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Skull, 
  Flame, 
  Gavel, 
  ShieldAlert,
  Calendar,
  Compass
} from 'lucide-react';
import { TIMELINE_STEPS, TimelineStep } from '../data/historicalData';

interface TimelineControllerProps {
  currentStepIndex: number;
  setCurrentStepIndex: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: (val: boolean) => void;
  onOpenVerdict: () => void;
}

export const TimelineController: React.FC<TimelineControllerProps> = ({
  currentStepIndex,
  setCurrentStepIndex,
  isPlaying,
  setIsPlaying,
  onOpenVerdict,
}) => {
  const currentStep: TimelineStep = TIMELINE_STEPS[currentStepIndex];

  // Auto-play interval: 2.5 seconds (2500ms)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= TIMELINE_STEPS.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, setCurrentStepIndex, setIsPlaying]);

  const handleNext = () => {
    if (currentStepIndex < TIMELINE_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  // Is at final stages (steps 8 or 9)
  const isFinalStage = currentStepIndex >= 8;

  return (
    <div className="w-full rounded-2xl border p-4 sm:p-6 backdrop-blur-md bg-obsidian-900/90 border-zinc-800 text-slate-100 light:bg-parchment-100/95 light:border-parchment-300 light:text-slate-900 shadow-2xl transition-colors">
      
      {/* Top Bar: Current Step Date, Milestone & Live Casualty Counter */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-5 border-b border-zinc-800 light:border-parchment-300 items-center">
        
        {/* Left: Step indicator and chronological title */}
        <div className="md:col-span-8 flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-red-950/70 border border-red-800/60 text-red-400 light:bg-crimson-100 light:border-crimson-300 light:text-crimson-800">
              <Calendar className="w-3.5 h-3.5" />
              {currentStep.displayDate}
            </span>
            <span className="text-xs font-mono text-zinc-400 light:text-slate-600">
              [단계 {currentStepIndex + 1} / {TIMELINE_STEPS.length}]
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 light:bg-parchment-200 light:text-slate-700">
              {currentStep.militaryFront}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold font-serif tracking-tight text-white light:text-slate-900 flex items-center gap-2">
            {currentStep.title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 light:text-slate-700 font-medium">
            {currentStep.subtitle}
          </p>
        </div>

        {/* Right: Live Casualty Counter */}
        <div className="md:col-span-4 flex flex-col items-start md:items-end justify-center p-3 rounded-xl bg-obsidian-950/70 border border-zinc-800 light:bg-parchment-200/80 light:border-parchment-300">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 light:text-slate-600 flex items-center gap-1.5">
            <Skull className="w-3.5 h-3.5 text-crimson-500" />
            해당 시점 누적 추정 희생자
          </span>
          <div className="text-xl sm:text-2xl font-black font-mono text-red-500 light:text-red-700 tracking-tight transition-all duration-300">
            {currentStep.cumulativeCasualtiesDisplay}
          </div>
          <span className="text-[10px] text-zinc-500 light:text-slate-500">
            (이동학살 총살 및 현장 특수작전 기준)
          </span>
        </div>

      </div>

      {/* Description Box */}
      <div className="py-3 text-xs sm:text-sm text-zinc-300 light:text-slate-700 leading-relaxed font-sans">
        {currentStep.description}
      </div>

      {/* Step Scroller / Track */}
      <div className="py-4">
        {/* Slider input */}
        <div className="relative w-full flex items-center mb-3">
          <input
            type="range"
            min={0}
            max={TIMELINE_STEPS.length - 1}
            value={currentStepIndex}
            onChange={(e) => {
              setIsPlaying(false);
              setCurrentStepIndex(Number(e.target.value));
            }}
            className="w-full h-2 bg-zinc-700 light:bg-parchment-300 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none"
            aria-label="타임라인 슬라이더"
          />
        </div>

        {/* Chronological Step Ticks */}
        <div className="hidden sm:grid grid-cols-10 gap-1 text-center">
          {TIMELINE_STEPS.map((step, idx) => {
            const isActive = idx === currentStepIndex;
            const isPast = idx < currentStepIndex;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStepIndex(idx);
                }}
                className={`py-1.5 px-1 rounded flex flex-col items-center text-[10px] sm:text-[11px] transition-all duration-150 ${
                  isActive
                    ? 'bg-red-900/80 text-white font-bold shadow-md border border-red-600 scale-105 light:bg-crimson-700 light:text-white'
                    : isPast
                    ? 'text-zinc-300 light:text-slate-700 hover:bg-zinc-800/40 light:hover:bg-parchment-200 font-medium'
                    : 'text-zinc-500 light:text-slate-400 hover:bg-zinc-800/20'
                }`}
              >
                <span className="font-mono">{step.dateStr.replace('194', "'4")}</span>
                <span className="w-1.5 h-1.5 rounded-full mt-1 ${isActive ? 'bg-amber-400' : isPast ? 'bg-red-700' : 'bg-zinc-700'}"></span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Buttons & Final Verdict CTA */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800 light:border-parchment-300">
        
        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          {/* Play / Pause Toggle */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-md bg-red-600 hover:bg-red-700 text-white light:bg-crimson-700 light:hover:bg-crimson-800"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>일시정지</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>연속 재생 (2.5초)</span>
              </>
            )}
          </button>

          {/* Previous Step */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="p-2 rounded-xl border border-zinc-700 hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none text-zinc-300 light:border-parchment-300 light:hover:bg-parchment-200 light:text-slate-700 transition-colors"
            title="이전 단계"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Next Step */}
          <button
            type="button"
            onClick={handleNext}
            disabled={currentStepIndex === TIMELINE_STEPS.length - 1}
            className="p-2 rounded-xl border border-zinc-700 hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none text-zinc-300 light:border-parchment-300 light:hover:bg-parchment-200 light:text-slate-700 transition-colors"
            title="다음 단계"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Reset */}
          <button
            type="button"
            onClick={handleReset}
            className="p-2 rounded-xl border border-zinc-700 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 light:border-parchment-300 light:hover:bg-parchment-200 light:text-slate-600 transition-colors"
            title="처음(1941.06)으로 초기화"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Final Result Trigger CTA Button (Highlighted at steps 8 & 9) */}
        {isFinalStage ? (
          <button
            type="button"
            onClick={onOpenVerdict}
            className="relative group flex items-center gap-2.5 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm text-white shadow-xl transition-all duration-300 bg-gradient-to-r from-red-700 via-crimson-600 to-red-800 hover:from-red-600 hover:to-red-700 border border-red-400/50 animate-pulse hover:animate-none scale-105"
          >
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <Gavel className="w-4 h-4 text-amber-300" />
            <span>최종 학살 결과 및 뉘른베르크 재판 보기</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onOpenVerdict}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-700 light:text-slate-600 light:border-parchment-300 light:hover:bg-parchment-200 transition-all"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-zinc-500" />
            <span>전후 사법 심판 열람</span>
          </button>
        )}

      </div>
    </div>
  );
};
