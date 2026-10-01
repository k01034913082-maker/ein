import React, { useState } from 'react';
import { 
  X, 
  Gavel, 
  Flame, 
  Skull, 
  Scale, 
  BookOpen, 
  AlertOctagon, 
  ShieldCheck, 
  Award, 
  UserCheck 
} from 'lucide-react';
import { VERDICT_DATA } from '../data/historicalData';

interface VerdictModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VerdictModal: React.FC<VerdictModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<'stats' | 'aktion1005' | 'trial'>('stats');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-zinc-700 light:border-parchment-300 bg-obsidian-900 light:bg-parchment-100 text-slate-100 light:text-slate-900 shadow-2xl transition-colors overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 light:border-parchment-300 bg-obsidian-950/90 light:bg-parchment-200/90">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-red-950/80 border border-red-700/60 text-red-400 light:bg-red-100 light:border-red-300 light:text-red-700 shadow-inner">
              <Gavel className="w-5 h-5 text-crimson-600" />
            </span>
            <div>
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-red-400 light:text-crimson-700 uppercase">
                역사의 법정과 증거 인멸의 전모
              </span>
              <h2 className="text-base sm:text-xl font-bold font-serif text-white light:text-slate-900 tracking-tight">
                {VERDICT_DATA.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 light:text-slate-500 light:hover:text-slate-900 light:hover:bg-parchment-300 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex border-b border-zinc-800 light:border-parchment-300 px-6 bg-obsidian-950/40 light:bg-parchment-200/40">
          <button
            type="button"
            onClick={() => setActiveSection('stats')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all ${
              activeSection === 'stats'
                ? 'border-red-600 text-red-400 light:border-crimson-700 light:text-crimson-800'
                : 'border-transparent text-zinc-400 hover:text-zinc-200 light:text-slate-600 light:hover:text-slate-900'
            }`}
          >
            <Skull className="w-4 h-4" />
            <span>1. 피해 vs 가해 규모 대비</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('aktion1005')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all ${
              activeSection === 'aktion1005'
                ? 'border-red-600 text-red-400 light:border-crimson-700 light:text-crimson-800'
                : 'border-transparent text-zinc-400 hover:text-zinc-200 light:text-slate-600 light:hover:text-slate-900'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-500" />
            <span>2. 1005 작전 (증거 인멸)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('trial')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all ${
              activeSection === 'trial'
                ? 'border-red-600 text-red-400 light:border-crimson-700 light:text-crimson-800'
                : 'border-transparent text-zinc-400 hover:text-zinc-200 light:text-slate-600 light:hover:text-slate-900'
            }`}
          >
            <Scale className="w-4 h-4 text-cyan-400" />
            <span>3. 뉘른베르크 재판 (Case 9)</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* SECTION 1: STATS & CONTRAST */}
          {activeSection === 'stats' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Massive Contrast Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Victims */}
                <div className="p-6 rounded-2xl border border-red-800/40 bg-red-950/20 light:bg-red-50/70 light:border-red-200 relative overflow-hidden">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-red-400 light:text-crimson-800 font-bold mb-1">
                    총 추정 희생자 수 (1941–1943)
                  </div>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-red-500 light:text-crimson-700">
                    약 1,500,000 ~ 2,000,000명
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-zinc-300 light:text-slate-700 leading-relaxed font-sans">
                    우크라이나, 벨라루스, 발트 3국 및 러시아 서부 전역에서 아인자츠그루펜과 현지 부역 민병대에 의해 총살·가스차·방화로 살해된 무고한 민간인(유대인, 로마인, 포로, 정신질환자 등)의 총 규모입니다.
                  </p>
                </div>

                {/* Perpetrators */}
                <div className="p-6 rounded-2xl border border-zinc-800 bg-obsidian-950/60 light:bg-parchment-200/60 light:border-parchment-300 relative overflow-hidden">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 light:text-slate-600 font-bold mb-1">
                    아인자츠그루펜 현장 가해 병력
                  </div>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-amber-400 light:text-amber-800">
                    불과 약 3,000여 명
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-zinc-300 light:text-slate-700 leading-relaxed font-sans">
                    친위대(SS), 보안국(SD), 게슈타포와 정규 질서경찰(Orpo)을 합쳐 3,000명 남짓의 소수 부대였습니다. 이는 <strong>가해 대원 1인당 수백 명에서 1천 명 이상의 비무장 인간을 사살</strong>했음을 뜻하는 전율스러운 살인 효율성입니다.
                  </p>
                </div>

              </div>

              {/* Analytical Ratio Breakdown */}
              <div className="p-5 rounded-xl border border-zinc-800 light:border-parchment-300 bg-obsidian-950/40 light:bg-parchment-200/40">
                <h4 className="text-sm font-bold font-serif mb-2 text-white light:text-slate-900 flex items-center gap-2">
                  <AlertOctagon className="w-4 h-4 text-red-500" />
                  ‘총알에 의한 홀로코스트(Holocaust by Bullets)’의 기계적 실상
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 light:text-slate-700 leading-relaxed">
                  아우슈비츠와 같은 고정식 절멸 수용소가 가동되기 전, 홀로코스트 전반기 희생자의 절대다수는 이 3,000명의 부대가 마을과 도시를 직접 찾아다니며 파놓은 구덩이 앞 총살로 희생되었습니다. 군부대와 국가 관료 조직의 완벽한 보급과 지원이 없었다면 불가능했을 국가 주도 기획 범죄였습니다.
                </p>
              </div>

              {/* Transition to next tab prompt */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setActiveSection('aktion1005')}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 light:bg-parchment-300 light:text-slate-800 transition-colors"
                >
                  <span>다음: 1005 작전 (증거 인멸) 살펴보기 →</span>
                </button>
              </div>

            </div>
          )}

          {/* SECTION 2: AKTION 1005 */}
          {activeSection === 'aktion1005' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="p-5 rounded-2xl border border-amber-900/40 bg-amber-950/20 light:bg-amber-50/70 light:border-amber-200">
                <div className="flex items-center gap-2 text-amber-400 light:text-amber-800 font-mono text-xs font-bold mb-1 uppercase">
                  <Flame className="w-4 h-4" />
                  극비 국가 기밀 프로젝트
                </div>
                <h3 className="text-lg font-bold font-serif text-white light:text-slate-900">
                  {VERDICT_DATA.aktion1005.title}
                </h3>
                <div className="flex flex-wrap gap-4 mt-2 text-xs font-mono text-zinc-400 light:text-slate-600">
                  <span>총괄 지휘관: <strong>{VERDICT_DATA.aktion1005.commander}</strong></span>
                  <span>집행 시기: <strong>{VERDICT_DATA.aktion1005.period}</strong></span>
                </div>
              </div>

              {/* Step-by-step process of evidence destruction */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 light:text-slate-600">
                  체계적 인멸 과정의 5단계 실상
                </h4>

                <div className="grid grid-cols-1 gap-2.5">
                  {VERDICT_DATA.aktion1005.details.map((detail, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-xl border border-zinc-800 light:border-parchment-300 bg-obsidian-950/50 light:bg-parchment-200/50 flex items-start gap-3"
                    >
                      <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono bg-red-950 text-red-400 border border-red-800 light:bg-red-100 light:text-red-700">
                        0{idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-300 light:text-slate-700 leading-relaxed font-sans">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Historical Assessment */}
              <div className="p-4 rounded-xl bg-obsidian-950/80 light:bg-white border border-zinc-800 light:border-parchment-300">
                <p className="text-xs text-zinc-400 light:text-slate-600 leading-relaxed italic">
                  “아인자츠그루펜은 자신들의 행위가 역사에 발각되는 것을 가장 두려워했습니다. 그들이 자행한 일은 전쟁 행위가 아닌, 스스로도 은폐해야만 했던 절대적이고 부끄러운 국가 범죄였음을 ‘1005 작전’ 자체가 웅변하고 있습니다.”
                </p>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setActiveSection('stats')}
                  className="px-4 py-2 text-xs font-semibold rounded-lg border border-zinc-700 text-zinc-300 light:border-parchment-300 light:text-slate-700"
                >
                  ← 이전
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('trial')}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 light:bg-parchment-300 light:text-slate-800 transition-colors"
                >
                  다음: 뉘른베르크 재판 결말 →
                </button>
              </div>

            </div>
          )}

          {/* SECTION 3: NUREMBERG TRIAL CASE 9 */}
          {activeSection === 'trial' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="p-5 rounded-2xl border border-cyan-900/40 bg-cyan-950/20 light:bg-cyan-50/70 light:border-cyan-200">
                <div className="flex items-center gap-2 text-cyan-400 light:text-cyan-800 font-mono text-xs font-bold mb-1 uppercase">
                  <Scale className="w-4 h-4" />
                  미국 군사재판정 제9호 사건 (Case 9)
                </div>
                <h3 className="text-lg font-bold font-serif text-white light:text-slate-900">
                  {VERDICT_DATA.nurembergTrial.title} (1947–1948)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs font-mono text-zinc-300 light:text-slate-700">
                  <div>수석 검사: <strong>{VERDICT_DATA.nurembergTrial.prosecutor}</strong></div>
                  <div>기소 대상: <strong>{VERDICT_DATA.nurembergTrial.defendants}</strong></div>
                </div>
              </div>

              {/* Ferencz Quote Banner */}
              <div className="p-5 rounded-xl border border-red-900/40 bg-red-950/20 light:bg-red-50/80 light:border-red-200">
                <div className="text-xs font-mono font-bold text-red-400 light:text-crimson-800 mb-1 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5" />
                  수석 검사 벤저민 페렌츠(Benjamin Ferencz)의 모두 진술 및 회고
                </div>
                <blockquote className="text-xs sm:text-sm font-serif italic text-slate-200 light:text-slate-900 leading-relaxed pl-3 border-l-2 border-red-600 light:border-crimson-700">
                  {VERDICT_DATA.ferenczQuote}
                </blockquote>
              </div>

              {/* Defense Argument vs Verdicts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="p-4 rounded-xl border border-zinc-800 bg-obsidian-950/50 light:bg-parchment-200/50 light:border-parchment-300">
                  <span className="text-[11px] font-mono text-red-400 light:text-red-700 font-bold uppercase">
                    피고인 올렌도르프 등의 궤변 (Plea)
                  </span>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-300 light:text-slate-700 leading-relaxed">
                    {VERDICT_DATA.nurembergTrial.plea}
                  </p>
                  <p className="mt-2 text-[11px] text-zinc-400 light:text-slate-500 italic">
                    “아이들까지 죽이지 않으면 자라서 복수자가 될 것이므로 유대인 아이를 죽인 것은 정당방위이자 예방적 전쟁 행위였다.”
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-zinc-800 bg-obsidian-950/50 light:bg-parchment-200/50 light:border-parchment-300">
                  <span className="text-[11px] font-mono text-emerald-400 light:text-emerald-700 font-bold uppercase">
                    재판정의 판결 (Judgement)
                  </span>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-300 light:text-slate-700 leading-relaxed font-semibold">
                    {VERDICT_DATA.nurembergTrial.verdictsSummary}
                  </p>
                  <p className="mt-2 text-[11px] text-zinc-400 light:text-slate-500">
                    인도에 반한 죄, 전쟁 범죄, 범죄 조직 가담 혐의에 대해 전원 유죄 인정.
                  </p>
                </div>

              </div>

              {/* Aftermath Note: The Bitter Truth */}
              <div className="p-4 rounded-xl border border-zinc-800 light:border-parchment-300 bg-obsidian-950/30 light:bg-parchment-200/30">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 light:text-amber-800 flex items-center gap-1.5 mb-1.5">
                  <AlertOctagon className="w-3.5 h-3.5" />
                  전후 냉전과 불완전한 사법적 결말 (씁쓸한 진실)
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 light:text-slate-700 leading-relaxed">
                  {VERDICT_DATA.nurembergTrial.aftermathNote}
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-zinc-800 light:border-parchment-300 bg-obsidian-950 light:bg-parchment-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-red-700 hover:bg-red-800 text-white shadow-md light:bg-crimson-800 light:hover:bg-crimson-900 transition-colors"
          >
            아카이브로 돌아가기
          </button>
        </div>

      </div>
    </div>
  );
};
