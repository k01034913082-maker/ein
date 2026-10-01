import React from 'react';
import { Moon, Sun, MapPin, Compass, BookOpen, Skull, ShieldAlert, Info } from 'lucide-react';

interface HeaderProps {
  activeTab: 'map' | 'banality';
  setActiveTab: (tab: 'map' | 'banality') => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onOpenVerdict: () => void;
  onOpenInfo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isDarkMode,
  setIsDarkMode,
  onOpenVerdict,
  onOpenInfo,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b transition-colors duration-200 backdrop-blur-md bg-obsidian-900/90 border-zinc-800 text-slate-100 light:bg-parchment-100/95 light:border-parchment-300 light:text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Title and Archive Badges */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-red-950/80 border border-red-700/60 text-red-400 light:bg-red-100 light:border-red-300 light:text-red-700 shadow-inner">
              <Skull className="w-5 h-5 text-crimson-600 light:text-crimson-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-2 py-0.5 rounded border bg-red-950/50 text-red-400 border-red-800/50 light:bg-amber-100 light:text-amber-900 light:border-amber-300">
                  디지털 역사 아카이브 1941–1943
                </span>
                <span className="hidden md:inline-flex text-[11px] font-mono text-zinc-400 light:text-slate-500">
                  EASTERN FRONT ARCHIVE
                </span>
              </div>
              <h1 className="text-base sm:text-lg md:text-xl font-bold font-serif tracking-tight text-slate-100 light:text-slate-900">
                거대한 침묵의 궤적: 아인자츠그루펜과 악의 평범성
              </h1>
            </div>
          </div>

          {/* Navigation Tabs and Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* 2 Main Tabs */}
            <nav className="flex p-1 rounded-xl border bg-obsidian-950/80 border-zinc-800 light:bg-parchment-200/80 light:border-parchment-300">
              <button
                type="button"
                onClick={() => setActiveTab('map')}
                className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'map'
                    ? 'bg-red-900/80 text-white shadow-md border border-red-700/60 light:bg-crimson-800 light:text-white light:border-crimson-900'
                    : 'text-zinc-400 hover:text-slate-200 light:text-slate-600 light:hover:text-slate-900'
                }`}
              >
                <Compass className="w-4 h-4 text-amber-400 light:text-amber-200" />
                <span className="hidden sm:inline">이동학살 궤적 & 타임라인</span>
                <span className="sm:hidden">지도·궤적</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('banality')}
                className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'banality'
                    ? 'bg-red-900/80 text-white shadow-md border border-red-700/60 light:bg-crimson-800 light:text-white light:border-crimson-900'
                    : 'text-zinc-400 hover:text-slate-200 light:text-slate-600 light:hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-4 h-4 text-cyan-400 light:text-cyan-200" />
                <span className="hidden sm:inline">악의 평범성 (Arendt)</span>
                <span className="sm:hidden">악의 평범성</span>
              </button>
            </nav>

            {/* Quick Verdict Modal Trigger */}
            <button
              type="button"
              onClick={onOpenVerdict}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-200 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-700 light:bg-parchment-50 light:border-parchment-300 light:text-slate-700 light:hover:bg-parchment-200"
              title="뉘른베르크 재판 및 1005 작전 전모 보기"
            >
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              <span>재판 결말</span>
            </button>

            {/* Info modal trigger */}
            <button
              type="button"
              onClick={onOpenInfo}
              className="p-2 rounded-lg border text-zinc-400 hover:text-slate-100 hover:bg-zinc-800/70 border-zinc-700 light:border-parchment-300 light:text-slate-600 light:hover:bg-parchment-200 light:hover:text-slate-900 transition-colors"
              aria-label="아카이브 안내"
              title="아카이브 안내 및 사료 출처"
            >
              <Info className="w-4 h-4" />
            </button>

            {/* Theme Toggle (Top Right) */}
            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg border transition-all duration-200 bg-obsidian-950/80 border-zinc-700 text-amber-400 hover:bg-zinc-800 hover:text-amber-300 light:bg-parchment-50 light:border-parchment-300 light:text-slate-700 light:hover:bg-parchment-200 shadow-sm"
              aria-label={isDarkMode ? '라이트 모드 (양피지 모드)로 전환' : '다크 모드 (흑요석 모드)로 전환'}
              title={isDarkMode ? '양피지 라이트 모드로 전환' : '흑요석 다크 모드로 전환'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
