import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  Target,
  BarChart3,
  Award,
  Clock,
  Star,
  Zap
} from 'lucide-react';

interface EvaluationResult {
  score: number;
  maxScore: number;
  feedback: string[];
  suggestions: string[];
  strengths: string[];
  improvements: string[];
  categories: {
    communication?: number;
    structure?: number;
    content?: number;
    language?: number;
    interaction?: number;
    medicalAccuracy?: number;
    empathy?: number;
    completeness?: number;
  };
  timestamp: Date;
  phase?: string;
}

interface EvaluationPanelProps {
  evaluationResult?: EvaluationResult;
  isRealTime?: boolean;
  showDetailedFeedback?: boolean;
  compact?: boolean;
}

const EvaluationPanel: React.FC<EvaluationPanelProps> = ({
  evaluationResult,
  isRealTime = false,
  showDetailedFeedback = true,
  compact = false
}) => {
  const [previousScore, setPreviousScore] = useState<number | null>(null);
  const [scoreTrend, setScoreTrend] = useState<'up' | 'down' | 'stable'>('stable');
  const [isAnimating, setIsAnimating] = useState(false);

  // Calculate score trend
  useEffect(() => {
    if (evaluationResult && previousScore !== null) {
      if (evaluationResult.score > previousScore) {
        setScoreTrend('up');
      } else if (evaluationResult.score < previousScore) {
        setScoreTrend('down');
      } else {
        setScoreTrend('stable');
      }
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 2000);
      return () => clearTimeout(timer);
    }
    if (evaluationResult) {
      setPreviousScore(evaluationResult.score);
    }
  }, [evaluationResult?.score, previousScore]);

  if (!evaluationResult) {
    return (
      <div className="evaluation-panel-loading">
        <div className="flex items-center justify-center space-x-2 text-slate-500 dark:text-slate-400">
          <div className="animate-spin w-4 h-4 border border-slate-300 border-t-slate-600 rounded-full"></div>
          <span>Bewertung wird berechnet...</span>
        </div>
      </div>
    );
  }

  const scorePercentage = Math.round((evaluationResult.score / evaluationResult.maxScore) * 100);
  const isPassing = evaluationResult.score >= (evaluationResult.maxScore * 0.6); // 60% passing threshold

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getTrendIcon = () => {
    switch (scoreTrend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <div className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'communication':
        return <Target className="w-4 h-4" />;
      case 'structure':
        return <BarChart3 className="w-4 h-4" />;
      case 'content':
        return <Award className="w-4 h-4" />;
      case 'language':
        return <Star className="w-4 h-4" />;
      case 'interaction':
        return <Zap className="w-4 h-4" />;
      case 'medicalaccuracy':
      case 'medical accuracy':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const formatCategoryName = (category: string) => {
    return category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="evaluation-panel-compact"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`text-2xl font-bold ${getScoreColor(scorePercentage)}`}>
              {evaluationResult.score}/{evaluationResult.maxScore}
            </div>
            {getTrendIcon()}
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            {scorePercentage}%
          </div>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${scorePercentage}%` }}
            transition={{ duration: 1 }}
            className={`h-2 rounded-full ${getScoreBgColor(scorePercentage)}`}
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="evaluation-panel"
    >
      {/* Header */}
      <div className="evaluation-header">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {isRealTime ? 'Echtzeit-Bewertung' : 'Bewertung'}
          </h3>
          {evaluationResult.timestamp && (
            <div className="flex items-center space-x-1 text-sm text-slate-500 dark:text-slate-400">
              <Clock className="w-3 h-3" />
              <span>{evaluationResult.timestamp.toLocaleTimeString()}</span>
            </div>
          )}
        </div>

        {evaluationResult.phase && (
          <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Phase: {evaluationResult.phase}
          </div>
        )}
      </div>

      {/* Main Score */}
      <motion.div
        className="evaluation-score-main"
        animate={isAnimating ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <div className={`text-4xl font-bold mb-2 ${getScoreColor(scorePercentage)}`}>
            {evaluationResult.score}/{evaluationResult.maxScore}
          </div>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-2xl font-semibold text-slate-700 dark:text-slate-300">
              {scorePercentage}%
            </span>
            {getTrendIcon()}
          </div>
          <div className="flex items-center justify-center space-x-1 text-sm">
            {isPassing ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-green-600 dark:text-green-400">Bestanden</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-red-600 dark:text-red-400">Nicht bestanden</span>
              </>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mt-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${scorePercentage}%` }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className={`h-3 rounded-full ${getScoreBgColor(scorePercentage)}`}
          />
        </div>
      </motion.div>

      {/* Categories Breakdown */}
      {evaluationResult.categories && Object.keys(evaluationResult.categories).length > 0 && (
        <div className="evaluation-categories">
          <h4 className="text-md font-medium text-slate-900 dark:text-white mb-3">
            Kategorien
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(evaluationResult.categories).map(([category, score]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * Object.keys(evaluationResult.categories).indexOf(category) }}
                className="category-item"
              >
                <div className="flex items-center space-x-2 mb-1">
                  {getCategoryIcon(category)}
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {formatCategoryName(category)}
                  </span>
                </div>
                <div className="text-lg font-semibold text-slate-900 dark:text-white">
                  {score}/20
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Strengths */}
      {showDetailedFeedback && evaluationResult.strengths && evaluationResult.strengths.length > 0 && (
        <div className="evaluation-strengths">
          <h4 className="text-md font-medium text-green-600 dark:text-green-400 mb-3 flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            Stärken
          </h4>
          <AnimatePresence>
            {evaluationResult.strengths.map((strength, index) => (
              <motion.div
                key={`strength-${index}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ delay: index * 0.1 }}
                className="feedback-item positive"
              >
                <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                <span className="text-sm text-slate-700 dark:text-slate-300">{strength}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Improvements */}
      {showDetailedFeedback && evaluationResult.improvements && evaluationResult.improvements.length > 0 && (
        <div className="evaluation-improvements">
          <h4 className="text-md font-medium text-blue-600 dark:text-blue-400 mb-3 flex items-center">
            <Target className="w-4 h-4 mr-2" />
            Verbesserungsmöglichkeiten
          </h4>
          <AnimatePresence>
            {evaluationResult.improvements.map((improvement, index) => (
              <motion.div
                key={`improvement-${index}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ delay: index * 0.1 }}
                className="feedback-item improvement"
              >
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span className="text-sm text-slate-700 dark:text-slate-300">{improvement}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Suggestions */}
      {showDetailedFeedback && evaluationResult.suggestions && evaluationResult.suggestions.length > 0 && (
        <div className="evaluation-suggestions">
          <h4 className="text-md font-medium text-purple-600 dark:text-purple-400 mb-3 flex items-center">
            <Star className="w-4 h-4 mr-2" />
            Empfehlungen
          </h4>
          <AnimatePresence>
            {evaluationResult.suggestions.map((suggestion, index) => (
              <motion.div
                key={`suggestion-${index}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ delay: index * 0.1 }}
                className="feedback-item suggestion"
              >
                <span className="text-purple-600 dark:text-purple-400 mr-2">💡</span>
                <span className="text-sm text-slate-700 dark:text-slate-300">{suggestion}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Real-time Indicator */}
      {isRealTime && (
        <motion.div
          className="evaluation-realtime-indicator"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Echtzeit-Bewertung aktiv</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EvaluationPanel;

