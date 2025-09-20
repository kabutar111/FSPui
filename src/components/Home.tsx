import React from 'react';
import HeroSection from './HeroSection';
import StatsSection from './sections/StatsSection';
import ExamPartsSection from './sections/ExamPartsSection';
import FeaturesSection from './sections/FeaturesSection';
import CourseSection from './sections/CourseSection';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <ExamPartsSection />
      <FeaturesSection />
      <CourseSection />
    </div>
  );
};

export default Home;
