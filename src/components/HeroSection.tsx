import React from 'react';
import { Button } from './ui/button';
import { Play, BookOpen, Users, Target } from 'lucide-react';
import { classes, theme } from '../lib/theme';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Title */}
          <h1 className={`${classes.typography.displayLarge} ${classes.text.inverse} mb-6`}>
            Fachsprachprüfung
            <span className="block text-blue-300 dark:text-blue-200">FSP/FaMed</span>
          </h1>

          {/* Subtitle */}
          <p className={`${classes.typography.hero} ${classes.text.inverse} mb-8 max-w-3xl mx-auto opacity-90`}>
            Bereiten Sie sich optimal auf Ihre Fachsprachprüfung vor mit KI-gestütztem Training
            und realistischen Prüfungsszenarien.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              Jetzt starten
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Mehr erfahren
            </Button>
          </div>

          {/* Stats Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/20 dark:border-white/10">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-blue-300 dark:text-blue-200" />
              </div>
              <div className={`${classes.typography.h3} ${classes.text.inverse} mb-1`}>500+</div>
              <div className={`${classes.typography.caption} ${classes.text.inverse} opacity-80`}>Aktive Lerner</div>
            </div>
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/20 dark:border-white/10">
              <div className="flex items-center justify-center mb-2">
                <Target className="w-6 h-6 text-green-300 dark:text-green-200" />
              </div>
              <div className={`${classes.typography.h3} ${classes.text.inverse} mb-1`}>95%</div>
              <div className={`${classes.typography.caption} ${classes.text.inverse} opacity-80`}>Erfolgsquote</div>
            </div>
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/20 dark:border-white/10">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="w-6 h-6 text-purple-300 dark:text-purple-200" />
              </div>
              <div className={`${classes.typography.h3} ${classes.text.inverse} mb-1`}>24/7</div>
              <div className={`${classes.typography.caption} ${classes.text.inverse} opacity-80`}>Verfügbar</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
