import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Target,
  Clock,
  MessageSquare,
  BarChart3,
  Settings,
  Search,
  Filter,
  Plus,
  Minus,
  Star,
  AlertTriangle,
  CheckCircle,
  Timer
} from 'lucide-react';

interface Question {
  id: string;
  text: string;
  category: 'anamnesis' | 'diagnosis' | 'therapy' | 'consultation' | 'followup';
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  estimatedTime: number; // in seconds
  keywords: string[];
  expectedAnswers: string[];
}

interface EvaluationCriteria {
  category: string;
  weight: number;
  maxScore: number;
  currentScore: number;
  description: string;
}

interface ExaminerControlsProps {
  questions: Question[];
  onQuestionSelect?: (question: Question) => void;
  onScoreUpdate?: (category: string, score: number) => void;
  onPauseExam?: () => void;
  onResumeExam?: () => void;
  onEndExam?: () => void;
  currentQuestion?: Question | null;
  timeRemaining?: number;
  isPaused?: boolean;
  evaluationCriteria?: EvaluationCriteria[];
  showQuestionBank?: boolean;
}

const ExaminerControls: React.FC<ExaminerControlsProps> = ({
  questions,
  onQuestionSelect,
  onScoreUpdate,
  onPauseExam,
  onResumeExam,
  onEndExam,
  currentQuestion,
  timeRemaining = 1200, // 20 minutes default
  isPaused = false,
  evaluationCriteria = [],
  showQuestionBank = true
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showScoring, setShowScoring] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [customTime, setCustomTime] = useState(1200);

  // Filter questions based on search and filters
  const filteredQuestions = questions.filter(question => {
    const matchesCategory = selectedCategory === 'all' || question.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || question.difficulty === selectedDifficulty;
    const matchesSearch = searchTerm === '' ||
      question.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const categories = [
    { value: 'all', label: 'Alle Kategorien', color: 'bg-gray-500' },
    { value: 'anamnesis', label: 'Anamnese', color: 'bg-blue-500' },
    { value: 'diagnosis', label: 'Diagnostik', color: 'bg-green-500' },
    { value: 'therapy', label: 'Therapie', color: 'bg-purple-500' },
    { value: 'consultation', label: 'Konsilium', color: 'bg-orange-500' },
    { value: 'followup', label: 'Nachsorge', color: 'bg-red-500' }
  ];

  const difficulties = [
    { value: 'all', label: 'Alle Schwierigkeiten', icon: Star },
    { value: 'easy', label: 'Einfach', icon: CheckCircle },
    { value: 'medium', label: 'Mittel', icon: AlertTriangle },
    { value: 'hard', label: 'Schwer', icon: Target },
    { value: 'expert', label: 'Experte', icon: Star }
  ];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getCategoryColor = (category: string) => {
    return categories.find(cat => cat.value === category)?.color || 'bg-gray-500';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 dark:text-green-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'hard': return 'text-orange-600 dark:text-orange-400';
      case 'expert': return 'text-red-600 dark:text-red-400';
      default: return 'text-slate-600 dark:text-slate-400';
    }
  };

  const handleScoreChange = (category: string, change: number) => {
    const criteria = evaluationCriteria.find(c => c.category === category);
    if (criteria) {
      const newScore = Math.max(0, Math.min(criteria.maxScore, criteria.currentScore + change));
      onScoreUpdate?.(category, newScore);
    }
  };

  const addCustomTime = (minutes: number) => {
    setCustomTime(prev => Math.max(0, prev + minutes * 60));
  };

  return (
    <div className="examiner-controls">
      {/* Header */}
      <div className="examiner-header">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Prüfer-Kontrollen
          </h3>

          <div className="flex items-center space-x-2">
            {/* Settings Toggle */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-md ${
                showSettings ? 'bg-slate-200 dark:bg-slate-700' : 'hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Scoring Toggle */}
            <button
              onClick={() => setShowScoring(!showScoring)}
              className={`p-2 rounded-md ${
                showScoring ? 'bg-slate-200 dark:bg-slate-700' : 'hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Timer Display */}
        <div className="timer-display">
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <div className="text-xl font-mono font-semibold text-slate-900 dark:text-white">
              {formatTime(timeRemaining)}
            </div>
            <div className={`px-2 py-1 rounded text-sm ${
              timeRemaining > 600 ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
              timeRemaining > 300 ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
              'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
            }`}>
              {timeRemaining > 600 ? 'Gut' : timeRemaining > 300 ? 'Eilig' : 'Kritisch'}
            </div>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="settings-panel"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Zusätzliche Zeit
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => addCustomTime(-5)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-medium min-w-[60px] text-center">
                    {formatTime(customTime)}
                  </span>
                  <button
                    onClick={() => addCustomTime(5)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Prüfungssteuerung
                </label>
                <div className="flex space-x-2">
                  {isPaused ? (
                    <button
                      onClick={onResumeExam}
                      className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      <Play className="w-4 h-4" />
                      <span>Fortsetzen</span>
                    </button>
                  ) : (
                    <button
                      onClick={onPauseExam}
                      className="flex items-center space-x-2 px-3 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                    >
                      <Pause className="w-4 h-4" />
                      <span>Pausieren</span>
                    </button>
                  )}

                  <button
                    onClick={onEndExam}
                    className="flex items-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    <SkipForward className="w-4 h-4" />
                    <span>Beenden</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scoring Panel */}
      <AnimatePresence>
        {showScoring && evaluationCriteria.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="scoring-panel"
          >
            <h4 className="text-md font-medium text-slate-900 dark:text-white mb-3">
              Echtzeit-Bewertung
            </h4>

            <div className="space-y-3">
              {evaluationCriteria.map((criteria) => (
                <div key={criteria.category} className="criteria-item">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {criteria.category}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        ({criteria.weight}%)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleScoreChange(criteria.category, -0.5)}
                        className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium min-w-[40px] text-center">
                        {criteria.currentScore}/{criteria.maxScore}
                      </span>
                      <button
                        onClick={() => handleScoreChange(criteria.category, 0.5)}
                        className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(criteria.currentScore / criteria.maxScore) * 100}%` }}
                      className="bg-blue-500 h-2 rounded-full"
                    />
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {criteria.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current Question Display */}
      {currentQuestion && (
        <div className="current-question">
          <h4 className="text-md font-medium text-slate-900 dark:text-white mb-2">
            Aktuelle Frage
          </h4>
          <div className="current-question-content">
            <div className="flex items-start space-x-3">
              <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${getCategoryColor(currentQuestion.category)}`}></div>
              <div className="flex-1">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                  {currentQuestion.text}
                </p>
                <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className={`flex items-center space-x-1 ${getDifficultyColor(currentQuestion.difficulty)}`}>
                    <Target className="w-3 h-3" />
                    {currentQuestion.difficulty}
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    {formatTime(currentQuestion.estimatedTime)}
                  </span>
                  <span className="flex items-center space-x-1">
                    <MessageSquare className="w-3 h-3" />
                    {currentQuestion.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Question Bank */}
      {showQuestionBank && (
        <div className="question-bank">
          <h4 className="text-md font-medium text-slate-900 dark:text-white mb-3">
            Fragenkatalog
          </h4>

          {/* Filters */}
          <div className="filters-section">
            <div className="flex flex-wrap gap-2 mb-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty.value} value={difficulty.value}>
                    {difficulty.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="search-input">
              <input
                type="text"
                placeholder="Fragen durchsuchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
              />
            </div>
          </div>

          {/* Questions List */}
          <div className="questions-list">
            <AnimatePresence>
              {filteredQuestions.map((question) => (
                <motion.button
                  key={question.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onClick={() => onQuestionSelect?.(question)}
                  className={`w-full text-left p-3 rounded-md border transition-colors ${
                    currentQuestion?.id === question.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-slate-900 dark:text-white mb-2">
                        {question.text}
                      </p>
                      <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
                        <span className={`flex items-center space-x-1 ${getDifficultyColor(question.difficulty)}`}>
                          <Target className="w-3 h-3" />
                          {question.difficulty}
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(question.estimatedTime)}
                        </span>
                        <div className={`px-2 py-1 rounded text-xs ${getCategoryColor(question.category)} text-white`}>
                          {question.category}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>

            {filteredQuestions.length === 0 && (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Keine Fragen gefunden</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExaminerControls;

