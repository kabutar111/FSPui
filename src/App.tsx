import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import page components
import Home from './components/Home';
import Navbar from './components/Navbar';
import ExamSession from './components/ExamSession';
import ResultsPage from './components/ResultsPage';

// Import supporting components
import ExamOrchestrator from './components/ExamOrchestrator';


const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedMode !== null) {
      setDarkMode(JSON.parse(savedMode));
    } else {
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <BrowserRouter>
      <div className={darkMode ? 'dark' : ''}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          <Routes>
            <Route path="/" element={<Home />} />
          <Route path="/teil/:number" element={<ExamSession />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/exam-orchestrator" element={
            <div className="min-h-screen pt-16 sm:pt-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                <ExamOrchestrator
                  onPhaseChange={(phase) => console.log('Phase changed:', phase)}
                  onExamComplete={(results) => console.log('Exam completed:', results)}
                  onScoreUpdate={(phase, score) => console.log('Score updated:', phase, score)}
                  autoAdvance={false}
                />
              </div>
            </div>
          } />
          </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
