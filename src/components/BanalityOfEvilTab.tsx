import React, { useState } from 'react';
import { 
  Quote, 
  BookOpen, 
  FileText, 
  HeartOff, 
  AlertTriangle, 
  GraduationCap, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  CheckCircle2, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { BANALITY_EDITORIAL } from '../data/historicalData';

export const BanalityOfEvilTab: React.FC = () => {
  // Reflection question toggle and answers state
  const [expandedReflection, setExpandedReflection] = useState<string | null>('q1');
  const [userThoughts, setUserThoughts] = useState<{ [key: string]: string }>({});
  const [savedThoughts, setSavedThoughts] = useState<{ [key: string]: boolean }>({});

  const handleSaveThought = (id: string) => {
    if (!userThoughts[id] || userThoughts[id].trim() === '') return;
    setSavedThoughts((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-12 animate-fadeIn font-sans">
      
      {/* 1. EDITORIAL HEADER & PULL-QUOTE BANNER */}
      <section className="relative rounded-3xl overflow-hidden border border-zinc-800 light:border-parchment-300 bg-gradient-to-b from-obsidian-950 via-obsidian-900 to-obsidian-950 light:from-parchment-100 light:via-parchment-50 light:to-parchment-100 p-6 sm:p-12 shadow-2xl transition-colors">
        
        {/* Decorative Quote Icon Background */}
        <div className="absolute right-4 bottom-2 opacity-5 pointer-events-none select-none">
          <Quote className="w-64 h-64 text-red-500" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-red-950/70 border border-red-800/60 text-red-400 light:bg-red-100 light:border-red-300 light:text-crimson-800">
            <BookOpen className="w-3.5 h-3.5" />
            한나 아렌트의 철학적 통찰 (1963)
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-white light:text-slate-900 leading-tight">
            악의 평범성: <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400 light:from-crimson-800 light:via-red-700 light:to-amber-700">
              사유의 부재(Thoughtlessness)
            </span>
            가 낳은 비극
          </h2>

          <div className="pt-4 pb-2">
            <blockquote className="text-base sm:text-xl md:text-2xl font-serif italic text-slate-200 light:text-slate-800 leading-relaxed max-w-3xl mx-auto">
              {BANALITY_EDITORIAL.quote.korean}
            </blockquote>
          </div>

          <div className="text-xs sm:text-sm font-mono text-zinc-400 light:text-slate-600 font-medium">
            — {BANALITY_EDITORIAL.quote.source}
          </div>

          <div className="text-xs font-mono text-zinc-500 light:text-slate-500 italic max-w-2xl mx-auto pt-2 border-t border-zinc-800/80 light:border-parchment-300">
            {BANALITY_EDITORIAL.quote.german}
          </div>

        </div>
      </section>

      {/* 2. THREE THEMATIC ANALYTICAL CARDS */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold tracking-wider text-red-400 light:text-crimson-700 uppercase">
            심층 분석 (Thematic Analysis)
          </span>
          <h3 className="text-xl sm:text-3xl font-bold font-serif text-white light:text-slate-900">
            악은 어떻게 조직과 일상 속에 정착하는가
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 light:text-slate-600">
            아돌프 아이히만과 아인자츠그루펜 장교들의 심리적·언어적·사회적 메커니즘에 관한 3가지 핵심 축
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BANALITY_EDITORIAL.cards.map((card) => {
            const IconComponent = 
              card.icon === 'FileText' ? FileText :
              card.icon === 'HeartOff' ? HeartOff : AlertTriangle;

            return (
              <div
                key={card.id}
                className="group relative flex flex-col justify-between rounded-2xl border p-6 sm:p-7 backdrop-blur-md bg-obsidian-900/80 border-zinc-800 hover:border-red-600/50 light:bg-parchment-100 light:border-parchment-300 light:hover:border-red-400/80 shadow-xl transition-all duration-300"
              >
                <div>
                  {/* Card Number and Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black font-mono text-zinc-700 light:text-parchment-400 group-hover:text-red-500 transition-colors">
                      {card.number}
                    </span>
                    <span className="p-3 rounded-xl bg-obsidian-950 border border-zinc-800 text-red-400 light:bg-parchment-200 light:border-parchment-300 light:text-crimson-700 shadow-sm">
                      <IconComponent className="w-5 h-5" />
                    </span>
                  </div>

                  <h4 className="text-lg font-bold font-serif text-white light:text-slate-900 mb-1">
                    {card.title}
                  </h4>
                  <div className="text-xs font-mono text-red-400 light:text-crimson-700 font-semibold mb-3">
                    {card.subtitle}
                  </div>

                  <div className="text-xs sm:text-sm text-zinc-300 light:text-slate-700 leading-relaxed space-y-2 whitespace-pre-line font-sans">
                    {card.content}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/80 light:border-parchment-300 text-[11px] font-mono text-zinc-500 light:text-slate-500 flex items-center justify-between">
                  <span>HISTORICAL CRITIQUE</span>
                  <span className="text-red-500">§ {card.number}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. INTELLECTUAL PROFILE OF EINSATZGRUPPEN COMMANDERS (Bridging Tab 1 & Tab 2) */}
      <section className="rounded-3xl border border-zinc-800 light:border-parchment-300 bg-obsidian-950/70 light:bg-parchment-50 p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 light:border-parchment-300 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 light:text-amber-800 uppercase">
              <GraduationCap className="w-4 h-4" />
              지식인들의 도덕적 붕괴
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white light:text-slate-900 mt-1">
              아인자츠그루펜 지휘관들의 지적 배경과 궤변
            </h3>
          </div>
          <p className="text-xs text-zinc-400 light:text-slate-600 max-w-md">
            “기소된 24명의 최고위 지휘관 중 8명이 명문대 박사 학위 소지자였습니다. 악은 무지에서만 자라지 않습니다.”
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BANALITY_EDITORIAL.commandersProfile.map((commander, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-zinc-800/80 light:border-parchment-300 bg-obsidian-900/60 light:bg-parchment-200/50 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white light:text-slate-900 font-serif">
                    {commander.name}
                  </h4>
                  <div className="text-xs font-mono text-red-400 light:text-crimson-700">
                    {commander.title}
                  </div>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 light:bg-parchment-300 light:text-slate-700 font-mono">
                  {commander.verdict.includes('교수형') ? '교수형 집행' : '전범 판결'}
                </span>
              </div>

              <div className="text-xs text-amber-400/90 light:text-amber-800 font-medium">
                🎓 학력: {commander.academic}
              </div>

              <div className="text-xs sm:text-sm text-zinc-300 light:text-slate-700 italic bg-obsidian-950/70 light:bg-white/80 p-3 rounded-lg border border-zinc-800 light:border-parchment-300">
                {commander.defense}
              </div>

              <div className="text-[11px] font-mono text-zinc-400 light:text-slate-600">
                판결 결과: {commander.verdict}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SELF-REFLECTION SECTION (Interactive Ethics Lab) */}
      <section className="rounded-3xl border border-red-900/50 light:border-red-300/80 bg-gradient-to-b from-obsidian-900 to-obsidian-950 light:from-white light:to-parchment-100 p-6 sm:p-10 shadow-2xl space-y-6">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold tracking-wider text-red-400 light:text-crimson-800 uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            현대인을 향한 성찰적 질문 (Self-Reflection)
          </span>
          <h3 className="text-xl sm:text-3xl font-bold font-serif text-white light:text-slate-900">
            우리는 오늘날 사유하고 있는가?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 light:text-slate-600">
            조직의 논리와 현대 사회의 시스템 속에서, 우리 내면의 '사유의 부재'를 점검하는 3가지 물음입니다.
          </p>
        </div>

        <div className="space-y-4">
          {BANALITY_EDITORIAL.reflectionQuestions.map((q, idx) => {
            const isExpanded = expandedReflection === q.id;
            const isSaved = savedThoughts[q.id];

            return (
              <div
                key={q.id}
                className="rounded-2xl border border-zinc-800 light:border-parchment-300 bg-obsidian-950/60 light:bg-parchment-50 overflow-hidden transition-all duration-200"
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => setExpandedReflection(isExpanded ? null : q.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 hover:bg-zinc-800/30 light:hover:bg-parchment-200/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold bg-red-950/80 text-red-400 border border-red-800/60 light:bg-red-100 light:text-crimson-800">
                      Q{idx + 1}
                    </span>
                    <h4 className="text-sm sm:text-base font-semibold text-slate-100 light:text-slate-900 leading-snug">
                      {q.question}
                    </h4>
                  </div>
                  <span className="shrink-0 text-zinc-400 light:text-slate-500">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>

                {/* Expanded Content & Thought Input */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 space-y-4 border-t border-zinc-800/80 light:border-parchment-300">
                    
                    {/* Philosophical Context Box */}
                    <div className="p-4 rounded-xl bg-obsidian-900/80 light:bg-parchment-200/60 border border-zinc-800 light:border-parchment-300 space-y-1">
                      <span className="text-[11px] font-mono font-bold text-amber-400 light:text-amber-800 uppercase">
                        역사적 맥락과 함의
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-300 light:text-slate-700 leading-relaxed">
                        {q.context}
                      </p>
                    </div>

                    {/* Actionable Ethical Advice */}
                    <div className="p-4 rounded-xl bg-red-950/20 light:bg-red-50 border border-red-900/30 light:border-red-200 space-y-1">
                      <span className="text-[11px] font-mono font-bold text-red-400 light:text-crimson-800 uppercase">
                        윤리적 실천을 위한 제언
                      </span>
                      <p className="text-xs sm:text-sm text-slate-200 light:text-slate-800 leading-relaxed font-medium">
                        {q.actionableAdvice}
                      </p>
                    </div>

                    {/* Interactive Self-Reflection Journal Input */}
                    <div className="space-y-2 pt-2">
                      <label 
                        htmlFor={`input-${q.id}`}
                        className="block text-xs font-mono text-zinc-400 light:text-slate-600 font-medium"
                      >
                        나의 생각과 일상 속 경험 기록하기 (개인 성찰용):
                      </label>
                      
                      <div className="relative">
                        <textarea
                          id={`input-${q.id}`}
                          rows={2}
                          value={userThoughts[q.id] || ''}
                          onChange={(e) => {
                            setUserThoughts((prev) => ({ ...prev, [q.id]: e.target.value }));
                            setSavedThoughts((prev) => ({ ...prev, [q.id]: false }));
                          }}
                          placeholder="이 질문에 대한 나의 경험이나 생각을 자유롭게 적어보세요..."
                          className="w-full p-3 rounded-xl text-xs sm:text-sm bg-obsidian-900 light:bg-white border border-zinc-700 light:border-parchment-300 text-slate-100 light:text-slate-900 focus:outline-none focus:border-red-500 light:focus:border-crimson-700 resize-none transition-colors"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-zinc-500 light:text-slate-500">
                          * 입력한 내용은 브라우저 세션 동안 안전하게 성찰에 활용됩니다.
                        </span>
                        
                        <button
                          type="button"
                          onClick={() => handleSaveThought(q.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white light:bg-parchment-300 light:hover:bg-parchment-400 light:text-slate-900 transition-colors shadow-sm"
                        >
                          {isSaved ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>기록 완료</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>성찰 남기기</span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

      {/* Epilogue Statement */}
      <footer className="text-center text-xs text-zinc-500 light:text-slate-500 py-6 border-t border-zinc-800 light:border-parchment-300 space-y-1">
        <p>“생각하지 않는 것은 다른 모든 죄악보다 더 위험할 수 있다.” — 한나 아렌트</p>
        <p className="font-mono text-[11px]">거대한 침묵의 궤적: 아인자츠그루펜(Einsatzgruppen)과 악의 평범성 (1941–1943) 아카이브</p>
      </footer>

    </div>
  );
};
