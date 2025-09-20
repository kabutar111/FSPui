import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ResultsDashboard from './ResultsDashboard';

const ResultsPage: React.FC = () => {
  // Mock exam results data
  const examResult = {
    totalScore: 145,
    maxTotalScore: 180,
    percentage: 81,
    overallGrade: "Gut",
    passed: true,
    duration: 3600, // 60 minutes
    phases: [
      {
        id: 'teil1',
        name: 'Teil 1',
        title: 'Arzt-Patienten-Gespräch',
        score: 52,
        maxScore: 60,
        percentage: 87,
        duration: 1200,
        status: 'excellent' as const,
        categories: [
          { name: 'Kommunikation', score: 18, maxScore: 20, percentage: 90 },
          { name: 'Struktur', score: 17, maxScore: 20, percentage: 85 },
          { name: 'Inhalt', score: 17, maxScore: 20, percentage: 85 }
        ],
        feedback: ['Ausgezeichnete Kommunikation', 'Sehr strukturierte Anamnese'],
        strengths: ['Empathische Gesprächsführung', 'Klare Fragetechnik'],
        improvements: ['Zeitmanagement könnte optimiert werden']
      },
      {
        id: 'teil2',
        name: 'Teil 2',
        title: 'Schriftliche Dokumentation',
        score: 48,
        maxScore: 60,
        percentage: 80,
        duration: 1800,
        status: 'passed' as const,
        categories: [
          { name: 'Struktur', score: 16, maxScore: 20, percentage: 80 },
          { name: 'Inhalt', score: 16, maxScore: 20, percentage: 80 },
          { name: 'Sprache', score: 16, maxScore: 20, percentage: 80 }
        ],
        feedback: ['Gut strukturierter Arztbrief', 'Medizinische Terminologie korrekt'],
        strengths: ['Vollständige Dokumentation', 'Klare Sprache'],
        improvements: ['Mehr Details zu Therapieoptionen']
      },
      {
        id: 'teil3',
        name: 'Teil 3',
        title: 'Arzt-Arzt-Gespräch',
        score: 45,
        maxScore: 60,
        percentage: 75,
        duration: 1200,
        status: 'passed' as const,
        categories: [
          { name: 'Kommunikation', score: 15, maxScore: 20, percentage: 75 },
          { name: 'Inhalt', score: 15, maxScore: 20, percentage: 75 },
          { name: 'Interaktion', score: 15, maxScore: 20, percentage: 75 }
        ],
        feedback: ['Konstruktive Zusammenarbeit', 'Gute Fallbesprechung'],
        strengths: ['Fachliche Kompetenz', 'Teamfähigkeit'],
        improvements: ['Mehr Entscheidungsfreude']
      }
    ],
    timestamp: new Date(),
    recommendations: [
      'Üben Sie komplexere Fälle für Teil 3',
      'Verbessern Sie Zeitmanagement in Teil 1',
      'Erweitern Sie medizinische Fachterminologie'
    ],
    comparativeData: {
      averageScore: 72,
      percentile: 78,
      similarExams: 1247
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-16 sm:pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 sm:mb-6"
        >
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm sm:text-base"
          >
            ← Zurück zur Übersicht
          </Link>
        </motion.div>

        <ResultsDashboard
          examResult={examResult}
          onExportResults={(format) => console.log('Exporting as:', format)}
          onShareResults={() => console.log('Sharing results')}
          onRetryExam={() => console.log('Retrying exam')}
          showComparativeData={true}
        />
      </div>
    </motion.div>
  );
};

export default ResultsPage;




