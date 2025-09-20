import React from 'react';
import { useParams } from 'react-router-dom';

const ExamSession: React.FC = () => {
  const { number } = useParams<{ number: string }>();

  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Fachsprachprüfung - Teil {number}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Exam session for section {number} is currently being developed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExamSession;

