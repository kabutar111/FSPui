import React from 'react';
import { TrendingUp, Users, Target, Clock, BookOpen, Shield, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import SectionHeading from '../ui/section-heading';
import StatCard from '../ui/stat-card';
import { theme, classes } from '../../lib/theme';

const StatsSection: React.FC = () => {
  return (
    <section className={`${classes.section.base} ${theme.backgrounds.gradient.light}`}>
      {/* Section Header */}
      <div className={theme.spacing.section.header}>
        <SectionHeading
          badge="FSP Erfolg"
          icon={BarChart3}
          title="Überzeugende Ergebnisse"
          subtitle="Sehen Sie, warum tausende Mediziner erfolgreich ihre Fachsprachprüfung bestehen"
          colorScheme="blue"
        />
      </div>

      {/* Hero Stats Banner */}
      <div className="text-center mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Main Stat */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
              <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
              <span className={`${classes.typography.label} text-slate-600 dark:text-slate-300`}>
                Erfolgsquote
              </span>
            </div>
            <div className={`${classes.typography.displayLarge} ${classes.text.accent} mb-3`}>
              95%
            </div>
            <p className={`${classes.typography.bodyLarge} ${classes.text.secondary} font-medium`}>
              FSP-Prüfung beim ersten Versuch bestanden
            </p>
          </div>

          {/* Right Side - Secondary Stat */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
              <Users className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <span className={`${classes.typography.label} text-slate-600 dark:text-slate-300`}>
                Aktive Lerner
              </span>
            </div>
            <div className={`${classes.typography.displayLarge} ${classes.text.accent} mb-3`}>
              500+
            </div>
            <p className={`${classes.typography.bodyLarge} ${classes.text.secondary} font-medium`}>
              Ärztinnen und Ärzte bereiten sich erfolgreich vor
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className={theme.layout.grid.stats}>
        <StatCard
          value="500+"
          label="Aktive FSP-Lerner"
          description="Täglich aktive Mediziner"
          icon={Users}
          colorScheme="blue"
        />

        <StatCard
          value="150+"
          label="Realistische Prüfungsfälle"
          description="Medizinische Szenarien"
          icon={Target}
          colorScheme="green"
        />
      </div>

      {/* Additional Stats Row */}
      <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="text-center">
          <div className={`${classes.typography.h2} ${classes.text.primary} mb-2`}>
            24/7
          </div>
          <div className={`${classes.typography.label} ${classes.text.tertiary}`}>
            Verfügbarkeit
          </div>
        </div>
        <div className="text-center">
          <div className={`${classes.typography.h2} ${classes.text.primary} mb-2`}>
            3
          </div>
          <div className={`${classes.typography.label} ${classes.text.tertiary}`}>
            Prüfungsteile
          </div>
        </div>
        <div className="text-center">
          <div className={`${classes.typography.h2} ${classes.text.primary} mb-2`}>
            B2-C2
          </div>
          <div className={`${classes.typography.label} ${classes.text.tertiary}`}>
            Sprachniveau
          </div>
        </div>
        <div className="text-center">
          <div className={`${classes.typography.h2} ${classes.text.primary} mb-2`}>
            KI
          </div>
          <div className={`${classes.typography.label} ${classes.text.tertiary}`}>
            Unterstützt
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
