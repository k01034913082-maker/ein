import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MapTimelineView } from './components/MapTimelineView';
import { BanalityOfEvilTab } from './components/BanalityOfEvilTab';
import { VerdictModal } from './components/VerdictModal';
import { InfoModal } from './components/InfoModal';

export const App: React.FC = () => {
  // Theme state: Dark mode default (#0b0d11)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  
  // Navigation tabs: 'map' | 'banality'
  const [activeTab, setActiveTab] = useState<'map' | 'banality'>('map');

  // Modals state
  const [isVerdictOpen, setIsVerdictOpen] = useState<boolean>(false);
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

  // Sync theme with HTML class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${
      isDarkMode 
        ? 'bg-obsidian-900 text-slate-100 selection:bg-red-900/70 selection:text-white' 
        : 'bg-parchment-100 text-slate-900 selection:bg-amber-200 selection:text-slate-900'
    }`}>
      
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onOpenVerdict={() => setIsVerdictOpen(true)}
        onOpenInfo={() => setIsInfoOpen(true)}
      />

      {/* Main Content Area */}
      <main className="w-full pb-16">
        {activeTab === 'map' ? (
          <MapTimelineView
            isDarkMode={isDarkMode}
            onOpenVerdict={() => setIsVerdictOpen(true)}
            activeTab={activeTab}
          />
        ) : (
          <BanalityOfEvilTab />
        )}
      </main>

      {/* Comprehensive Verdict Modal (Nuremberg & Aktion 1005) */}
      <VerdictModal
        isOpen={isVerdictOpen}
        onClose={() => setIsVerdictOpen(false)}
      />

      {/* Primary Sources & Archive Info Modal */}
      <InfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />

    </div>
  );
};

export default App;
