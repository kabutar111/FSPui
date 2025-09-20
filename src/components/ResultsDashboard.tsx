import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Target,
  TrendingUp,
  TrendingDown,
  Download,
  Share,
  BarChart3,
  PieChart,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  Award,
  FileText,
  MessageSquare,
  Users,
  Calendar,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface PhaseResult {
  id: string;
  name: string;
  title: string;
  score: number;
  maxScore: number;
  percentage: number;
  duration: number; // in seconds
  status: 'passed' | 'failed' | 'excellent';
  categories: {
    name: string;
    score: number;
    maxScore: number;
    percentage: number;
  }[];
  feedback: string[];
  strengths: string[];
  improvements: string[];
}

interface ExamResult {
  totalScore: number;
  maxTotalScore: number;
  percentage: number;
  overallGrade: string;
  passed: boolean;
  duration: number; // total duration in seconds
  phases: PhaseResult[];
  timestamp: Date;
  recommendations: string[];
  comparativeData?: {
    averageScore: number;
    percentile: number;
    similarExams: number;
  };
}

interface ResultsDashboardProps {
  examResult: ExamResult;
  onExportResults?: (format: 'pdf' | 'json' | 'csv') => void;
  onShareResults?: () => void;
  onRetryExam?: () => void;
  showComparativeData?: boolean;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  examResult,
  onExportResults,
  onShareResults,
  onRetryExam,
  showComparativeData = true
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'comparison'>('overview');
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  // Format time
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Get grade color
  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 dark:text-green-400';
    if (percentage >= 75) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  // Get status icon and color
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'excellent':
        return { icon: Star, color: 'text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-900' };
      case 'passed':
        return { icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900' };
      case 'failed':
        return { icon: AlertTriangle, color: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900' };
      default:
        return { icon: Target, color: 'text-slate-500', bgColor: 'bg-slate-100 dark:bg-slate-700' };
    }
  };

  // Calculate grade
  const calculateGrade = (percentage: number) => {
    if (percentage >= 95) return 'Sehr gut';
    if (percentage >= 85) return 'Gut';
    if (percentage >= 75) return 'Befriedigend';
    if (percentage >= 60) return 'Ausreichend';
    return 'Nicht ausreichend';
  };

  const StatusIcon = getStatusInfo(examResult.passed ? 'passed' : 'failed').icon;
  const statusInfo = getStatusInfo(examResult.passed ? 'passed' : 'failed');

  return (
    <div className="results-dashboard">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="results-header"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={`w-20 h-20 mx-auto mb-4 rounded-full ${statusInfo.bgColor} flex items-center justify-center`}
          >
            <StatusIcon className={`w-10 h-10 ${statusInfo.color}`} />
          </motion.div>

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Prüfungsergebnis
          </h1>

          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className={`text-4xl font-bold ${getGradeColor(examResult.percentage)}`}>
              {examResult.totalScore}/{examResult.maxTotalScore}
            </div>
            <div className="text-2xl font-semibold text-slate-600 dark:text-slate-400">
              ({examResult.percentage}%)
            </div>
          </div>

          <div className="text-xl font-medium text-slate-700 dark:text-slate-300 mb-2">
            {calculateGrade(examResult.percentage)}
          </div>

          <div className="flex items-center justify-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
            <Calendar className="w-4 h-4" />
            <span>{examResult.timestamp.toLocaleDateString()}</span>
            <Clock className="w-4 h-4 ml-4" />
            <span>Gesamtdauer: {formatTime(examResult.duration)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {onExportResults && (
            <>
              <button
                onClick={() => onExportResults('pdf')}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Download className="w-4 h-4" />
                <span>PDF Export</span>
              </button>
              <button
                onClick={() => onExportResults('json')}
                className="flex items-center space-x-2 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                <FileText className="w-4 h-4" />
                <span>JSON Export</span>
              </button>
            </>
          )}

          {onShareResults && (
            <button
              onClick={onShareResults}
              className="flex items-center space-x-2 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              <Share className="w-4 h-4" />
              <span>Teilen</span>
            </button>
          )}

          {onRetryExam && (
            <button
              onClick={onRetryExam}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Trophy className="w-4 h-4" />
              <span>Erneut versuchen</span>
            </button>
          )}
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="results-tabs">
        <div className="flex border-b border-slate-200 dark:border-slate-700">
          {[
            { id: 'overview', label: 'Übersicht', icon: BarChart3 },
            { id: 'detailed', label: 'Detailliert', icon: PieChart },
            { id: 'comparison', label: 'Vergleich', icon: TrendingUp }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center space-x-2 px-6 py-3 border-b-2 font-medium text-sm ${
                activeTab === id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="tab-content"
          >
            {/* Phase Overview */}
            <div className="phases-overview">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Leistung nach Teil
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {examResult.phases.map((phase, index) => {
                  const phaseStatus = getStatusInfo(phase.status);
                  const PhaseIcon = phaseStatus.icon;

                  return (
                    <motion.div
                      key={phase.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="phase-card"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full ${phaseStatus.bgColor} flex items-center justify-center`}>
                            <PhaseIcon className={`w-4 h-4 ${phaseStatus.color}`} />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900 dark:text-white">
                              {phase.name}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              {phase.title}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-semibold ${getGradeColor(phase.percentage)}`}>
                            {phase.score}/{phase.maxScore}
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            {phase.percentage}%
                          </div>
                        </div>
                      </div>

                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${phase.percentage}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          className={`h-2 rounded-full ${
                            phase.percentage >= 80 ? 'bg-green-500' :
                            phase.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Recommendations */}
            {examResult.recommendations && examResult.recommendations.length > 0 && (
              <div className="recommendations-section">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-blue-500" />
                  Empfehlungen zur Verbesserung
                </h3>

                <div className="space-y-3">
                  {examResult.recommendations.map((recommendation, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="recommendation-item"
                    >
                      <span className="text-blue-500 mr-3">•</span>
                      <span className="text-slate-700 dark:text-slate-300">{recommendation}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'detailed' && (
          <motion.div
            key="detailed"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="tab-content"
          >
            <div className="space-y-6">
              {examResult.phases.map((phase) => (
                <div key={phase.id} className="phase-detailed">
                  <div
                    className="phase-header cursor-pointer"
                    onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                          {phase.name}: {phase.title}
                        </h4>
                        {expandedPhase === phase.id ? (
                          <ChevronUp className="w-5 h-5 text-slate-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-500" />
                        )}
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`text-lg font-semibold ${getGradeColor(phase.percentage)}`}>
                          {phase.score}/{phase.maxScore} ({phase.percentage}%)
                        </span>
                        <Clock className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-500">{formatTime(phase.duration)}</span>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedPhase === phase.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="phase-details"
                      >
                        {/* Categories Breakdown */}
                        <div className="categories-breakdown">
                          <h5 className="text-md font-medium text-slate-900 dark:text-white mb-3">
                            Bewertungskategorien
                          </h5>
                          <div className="grid grid-cols-2 gap-3">
                            {phase.categories.map((category, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="category-detail"
                              >
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {category.name}
                                  </span>
                                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                                    {category.score}/{category.maxScore}
                                  </span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${
                                      category.percentage >= 80 ? 'bg-green-500' :
                                      category.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${category.percentage}%` }}
                                  />
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Feedback */}
                        <div className="feedback-section">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {phase.strengths && phase.strengths.length > 0 && (
                              <div>
                                <h5 className="text-md font-medium text-green-600 dark:text-green-400 mb-3 flex items-center">
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Stärken
                                </h5>
                                <ul className="space-y-2">
                                  {phase.strengths.map((strength, index) => (
                                    <li key={index} className="text-sm text-slate-700 dark:text-slate-300 flex items-start">
                                      <span className="text-green-500 mr-2 mt-1">•</span>
                                      <span>{strength}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {phase.improvements && phase.improvements.length > 0 && (
                              <div>
                                <h5 className="text-md font-medium text-blue-600 dark:text-blue-400 mb-3 flex items-center">
                                  <Target className="w-4 h-4 mr-2" />
                                  Verbesserungsmöglichkeiten
                                </h5>
                                <ul className="space-y-2">
                                  {phase.improvements.map((improvement, index) => (
                                    <li key={index} className="text-sm text-slate-700 dark:text-slate-300 flex items-start">
                                      <span className="text-blue-500 mr-2 mt-1">•</span>
                                      <span>{improvement}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'comparison' && showComparativeData && examResult.comparativeData && (
          <motion.div
            key="comparison"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="tab-content"
          >
            <div className="comparison-section">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Leistungsvergleich
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="comparison-card"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Users className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {examResult.comparativeData.similarExams}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Ähnliche Prüfungen
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="comparison-card"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <BarChart3 className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {examResult.comparativeData.averageScore}%
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Durchschnitt
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="comparison-card"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <TrendingUp className="w-5 h-5 text-purple-500" />
                    <div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {examResult.comparativeData.percentile}%
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Percentile
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    {examResult.percentage > examResult.comparativeData.averageScore ? (
                      <span className="text-green-600 dark:text-green-400 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Über dem Durchschnitt
                      </span>
                    ) : (
                      <span className="text-blue-600 dark:text-blue-400 flex items-center">
                        <TrendingDown className="w-3 h-3 mr-1" />
                        Unter dem Durchschnitt
                      </span>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResultsDashboard;

