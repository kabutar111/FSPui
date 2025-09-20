import React from 'react';
import { Clock, Target, BookOpen, MessageSquare, TrendingUp, Shield, Users } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: MessageSquare,
      title: 'Realistische Prüfungsszenarien',
      description: 'Trainieren Sie mit authentischen medizinischen Gesprächen und Fallbeispielen aus der Praxis.',
      color: 'green'
    },
    {
      icon: Target,
      title: 'Fokussiertes Training',
      description: 'Spezifische Übungen für alle drei Prüfungsteile der Fachsprachprüfung FSP/FaMed.',
      color: 'purple'
    },
    {
      icon: Clock,
      title: 'Flexibles Lernen',
      description: 'Lernen Sie wann und wo Sie möchten - 24/7 verfügbar auf allen Geräten.',
      color: 'orange'
    },
    {
      icon: BookOpen,
      title: 'Umfangreiche Wissensdatenbank',
      description: 'Zugang zu tausenden medizinischen Fachbegriffen und Redemittel.',
      color: 'indigo'
    },
    {
      icon: TrendingUp,
      title: 'Fortschrittsverfolgung',
      description: 'Detaillierte Analyse Ihrer Entwicklung mit personalisierten Verbesserungsvorschlägen.',
      color: 'teal'
    },
    {
      icon: Users,
      title: 'Expertenunterstützung',
      description: 'Persönliches Feedback von erfahrenen Fachärzten und Sprachtrainern.',
      color: 'pink'
    },
    {
      icon: Shield,
      title: 'Qualitätsgarantie',
      description: 'Basierend auf aktuellen Prüfungsstandards und medizinischen Richtlinien.',
      color: 'red'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800',
      green: 'bg-green-50 border-green-200 text-green-600 dark:bg-green-900/20 dark:border-green-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-600 dark:bg-purple-900/20 dark:border-purple-800',
      orange: 'bg-orange-50 border-orange-200 text-orange-600 dark:bg-orange-900/20 dark:border-orange-800',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-900/20 dark:border-indigo-800',
      teal: 'bg-teal-50 border-teal-200 text-teal-600 dark:bg-teal-900/20 dark:border-teal-800',
      pink: 'bg-pink-50 border-pink-200 text-pink-600 dark:bg-pink-900/20 dark:border-pink-800',
      red: 'bg-red-50 border-red-200 text-red-600 dark:bg-red-900/20 dark:border-red-800'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Warum FSP-Training wählen?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Entdecken Sie die fortschrittlichen Funktionen, die Ihnen helfen, Ihre Fachsprachprüfung erfolgreich zu bestehen
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm ${getColorClasses(feature.color)}`}
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110 ${feature.color === 'blue' ? 'bg-blue-100 dark:bg-blue-800' :
                feature.color === 'green' ? 'bg-green-100 dark:bg-green-800' :
                feature.color === 'purple' ? 'bg-purple-100 dark:bg-purple-800' :
                feature.color === 'orange' ? 'bg-orange-100 dark:bg-orange-800' :
                feature.color === 'indigo' ? 'bg-indigo-100 dark:bg-indigo-800' :
                feature.color === 'teal' ? 'bg-teal-100 dark:bg-teal-800' :
                feature.color === 'pink' ? 'bg-pink-100 dark:bg-pink-800' :
                'bg-red-100 dark:bg-red-800'}`}>
                <feature.icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            Bereit, Ihre Fachsprachprüfung zu meistern?
          </p>
          <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
            <BookOpen className="w-5 h-5" />
            Jetzt kostenlos starten
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
