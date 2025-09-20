import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Home,
  FileText,
  MessageSquare,
  Trophy,
  Settings,
  Volume2,
  VolumeX
} from 'lucide-react';

interface ExamPhase {
  id: string;
  name: string;
  title: string;
  description: string;
  duration: number; // in seconds
  icon: React.ComponentType<any>;
  status: 'pending' | 'active' | 'completed' | 'locked';
  score?: number;
  maxScore?: number;
}

interface ExamState {
  currentPhase: string;
  timeRemaining: number;
  totalTimeRemaining: number;
  scores: Record<string, number>;
  phaseHistory: string[];
  isPaused: boolean;
  isStarted: boolean;
  startTime?: Date;
  endTime?: Date;
}

interface PhaseTransitionModalProps {
  isOpen: boolean;
  fromPhase?: ExamPhase;
  toPhase?: ExamPhase;
  onConfirm: () => void;
  onCancel?: () => void;
  timeRemaining: number;
}

interface ExamOrchestratorProps {
  onPhaseChange?: (phaseId: string) => void;
  onExamComplete?: (results: ExamState) => void;
  onScoreUpdate?: (phaseId: string, score: number) => void;
  initialPhase?: string;
  autoAdvance?: boolean;
}

const PhaseTransitionModal: React.FC<PhaseTransitionModalProps> = ({
  isOpen,
  fromPhase,
  toPhase,
  onConfirm,
  onCancel,
  timeRemaining
}) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!isOpen || !toPhase) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md mx-4"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <toPhase.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>

            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              {toPhase.title}
            </h3>

            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {toPhase.description}
            </p>

            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Dauer:</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {formatTime(toPhase.duration)}
                </span>
              </div>
              {timeRemaining > 0 && (
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-slate-600 dark:text-slate-400">Verbleibende Gesamtzeit:</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              {onCancel && (
                <button
                  onClick={onCancel}
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  Zurück
                </button>
              )}
              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2"
              >
                <span>Starten</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ExamOrchestrator: React.FC<ExamOrchestratorProps> = ({
  onPhaseChange,
  onExamComplete,
  onScoreUpdate,
  initialPhase = 'teil1',
  autoAdvance = false
}) => {
  const [examState, setExamState] = useState<ExamState>({
    currentPhase: initialPhase,
    timeRemaining: 1200, // 20 minutes
    totalTimeRemaining: 3600, // 60 minutes total
    scores: { teil1: 0, teil2: 0, teil3: 0 },
    phaseHistory: [],
    isPaused: false,
    isStarted: false
  });

  const [showTransitionModal, setShowTransitionModal] = useState(false);
  const [pendingPhase, setPendingPhase] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  // Define exam phases
  const phases: ExamPhase[] = [
    {
      id: 'teil1',
      name: 'Teil 1',
      title: 'Arzt-Patienten-Gespräch',
      description: 'Führen Sie eine strukturierte Anamnese mit dem simulierten Patienten.',
      duration: 1200, // 20 minutes
      icon: MessageSquare,
      status: 'active',
      maxScore: 60
    },
    {
      id: 'teil2',
      name: 'Teil 2',
      title: 'Schriftliche Dokumentation',
      description: 'Erstellen Sie ein vollständiges Arztbrief basierend auf dem Gespräch.',
      duration: 1800, // 30 minutes
      icon: FileText,
      status: 'pending',
      maxScore: 60
    },
    {
      id: 'teil3',
      name: 'Teil 3',
      title: 'Arzt-Arzt-Gespräch',
      description: 'Simulieren Sie eine kollegiale Konsultation und Fallbesprechung.',
      duration: 1200, // 20 minutes
      icon: MessageSquare,
      status: 'locked',
      maxScore: 60
    }
  ];

  // Timer management
  useEffect(() => {
    if (!examState.isStarted || examState.isPaused) return;

    const interval = setInterval(() => {
      setExamState(prev => {
        const newTimeRemaining = prev.timeRemaining - 1;
        const newTotalTimeRemaining = prev.totalTimeRemaining - 1;

        // Auto-advance to next phase when time runs out
        if (newTimeRemaining <= 0 && autoAdvance) {
          const currentPhaseIndex = phases.findIndex(p => p.id === prev.currentPhase);
          if (currentPhaseIndex < phases.length - 1) {
            setPendingPhase(phases[currentPhaseIndex + 1].id);
            setShowTransitionModal(true);
          }
        }

        return {
          ...prev,
          timeRemaining: Math.max(0, newTimeRemaining),
          totalTimeRemaining: Math.max(0, newTotalTimeRemaining)
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [examState.isStarted, examState.isPaused, autoAdvance]);

  // Handle phase transitions
  const handlePhaseTransition = useCallback((toPhaseId: string) => {
    const toPhase = phases.find(p => p.id === toPhaseId);
    if (!toPhase) return;

    setExamState(prev => ({
      ...prev,
      currentPhase: toPhaseId,
      timeRemaining: toPhase.duration,
      phaseHistory: [...prev.phaseHistory, prev.currentPhase],
      isPaused: false
    }));

    // Update phase statuses
    setExamState(prev => {
      const updatedPhases = phases.map(phase => {
        if (phase.id === toPhaseId) {
          return { ...phase, status: 'active' as const };
        } else if (phase.id === prev.currentPhase) {
          return { ...phase, status: 'completed' as const };
        }
        return phase;
      });

      return prev;
    });

    onPhaseChange?.(toPhaseId);
    setShowTransitionModal(false);
    setPendingPhase(null);
  }, [onPhaseChange]);

  // Start exam
  const startExam = () => {
    setExamState(prev => ({
      ...prev,
      isStarted: true,
      startTime: new Date()
    }));
  };

  // Pause/Resume exam
  const togglePause = () => {
    setExamState(prev => ({
      ...prev,
      isPaused: !prev.isPaused
    }));
  };

  // End exam
  const endExam = () => {
    setExamState(prev => ({
      ...prev,
      isStarted: false,
      endTime: new Date()
    }));
    onExamComplete?.(examState);
  };

  // Update score
  const updateScore = (phaseId: string, score: number) => {
    setExamState(prev => ({
      ...prev,
      scores: { ...prev.scores, [phaseId]: score }
    }));
    onScoreUpdate?.(phaseId, score);
  };

  // Calculate total score
  const totalScore = Object.values(examState.scores).reduce((sum, score) => sum + score, 0);
  const maxTotalScore = phases.reduce((sum, phase) => sum + (phase.maxScore || 0), 0);
  const isPassing = totalScore >= (maxTotalScore * 0.6); // 60% passing threshold

  // Format time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Get current phase
  const currentPhase = phases.find(p => p.id === examState.currentPhase);
  const pendingPhaseData = pendingPhase ? phases.find(p => p.id === pendingPhase) : null;

  return (
    <div className="exam-orchestrator">
      {/* Header */}
      <div className="exam-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Trophy className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              FSP Prüfung
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={togglePause}
              className={`p-2 rounded-md ${
                examState.isPaused ? 'bg-green-100 dark:bg-green-900 text-green-600' : 'hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {examState.isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>

            <button
              onClick={endExam}
              className="p-2 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 rounded-md"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="exam-progress">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Prüfungsfortschritt
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {examState.phaseHistory.length + 1} / {phases.length} Teile
            </span>
          </div>

          <div className="flex space-x-2">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`flex-1 h-2 rounded-full ${
                  phase.status === 'completed' ? 'bg-green-500' :
                  phase.status === 'active' ? 'bg-blue-500' :
                  phase.status === 'locked' ? 'bg-slate-300 dark:bg-slate-600' :
                  'bg-slate-200 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Timer Display */}
        <div className="exam-timer">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-lg font-mono font-semibold text-slate-900 dark:text-white">
                {formatTime(examState.timeRemaining)}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Aktuelle Phase
              </div>
            </div>

            <div className="text-center">
              <div className="text-lg font-mono font-semibold text-slate-900 dark:text-white">
                {formatTime(examState.totalTimeRemaining)}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Gesamtzeit
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Navigation */}
      <div className="phase-navigation">
        <div className="grid grid-cols-3 gap-4">
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => {
                if (phase.status !== 'locked' && examState.isStarted) {
                  setPendingPhase(phase.id);
                  setShowTransitionModal(true);
                }
              }}
              disabled={phase.status === 'locked' || !examState.isStarted}
              className={`phase-button ${phase.status} ${
                examState.currentPhase === phase.id ? 'active' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <phase.icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-sm font-medium">{phase.name}</div>
                  <div className="text-xs opacity-75">{phase.title}</div>
                </div>
              </div>

              {phase.status === 'completed' && phase.score !== undefined && (
                <div className="text-xs font-medium">
                  {phase.score}/{phase.maxScore}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Score Summary */}
      {examState.isStarted && (
        <div className="score-summary">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Gesamtpunkte:
              </span>
              <span className="text-lg font-semibold text-slate-900 dark:text-white">
                {totalScore}/{maxTotalScore}
              </span>
            </div>

            <div className={`flex items-center space-x-1 text-sm ${
              isPassing ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {isPassing ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              <span>{isPassing ? 'Bestanden' : 'Nicht bestanden'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Start Button */}
      {!examState.isStarted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <button
            onClick={startExam}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3 mx-auto"
          >
            <Play className="w-6 h-6" />
            <span>Prüfung starten</span>
          </button>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-sm">
            Die Prüfung dauert insgesamt 60 Minuten und besteht aus 3 Teilen.
          </p>
        </motion.div>
      )}

      {/* Phase Transition Modal */}
      <PhaseTransitionModal
        isOpen={showTransitionModal}
        fromPhase={currentPhase}
        toPhase={pendingPhaseData || undefined}
        onConfirm={() => pendingPhase && handlePhaseTransition(pendingPhase)}
        onCancel={() => {
          setShowTransitionModal(false);
          setPendingPhase(null);
        }}
        timeRemaining={examState.totalTimeRemaining}
      />
    </div>
  );
};

export default ExamOrchestrator;

