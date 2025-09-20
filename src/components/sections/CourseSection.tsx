import React from 'react';
import { Stethoscope, Activity, Pill, BookOpen, Users, Award, Clock, Star } from 'lucide-react';

const CourseSection: React.FC = () => {
  const courses = [
    {
      icon: Stethoscope,
      title: 'Medizin',
      subtitle: 'Fachsprachprüfung Humanmedizin',
      description: 'Umfassende Vorbereitung auf die Fachsprachprüfung für angehende Ärztinnen und Ärzte. Fokussiert auf medizinische Fachterminologie, Patientengespräche und klinische Kommunikation.',
      features: [
        'Innere Medizin & Chirurgie',
        'Diagnostik & Therapie',
        'Notfallmedizin',
        'Patientenkommunikation',
        'Medizinische Dokumentation'
      ],
      duration: '12 Wochen',
      level: 'B2-C1',
      students: '450+',
      rating: 4.9,
      color: 'blue'
    },
    {
      icon: Activity,
      title: 'Zahnmedizin',
      subtitle: 'Fachsprachprüfung Zahnmedizin',
      description: 'Spezialisierte Vorbereitung auf die zahnmedizinische Fachsprachprüfung. Vertiefte Kenntnisse in dentaler Terminologie, Behandlungsabläufen und patientenzentrierter Kommunikation.',
      features: [
        'Orale Chirurgie & Implantologie',
        'Parodontologie & Prothetik',
        'Kinderzahnheilkunde',
        'Radiologie & Diagnostik',
        'Praxisorganisation'
      ],
      duration: '10 Wochen',
      level: 'B2-C1',
      students: '180+',
      rating: 4.8,
      color: 'green'
    },
    {
      icon: Pill,
      title: 'Pharmazie',
      subtitle: 'Fachsprachprüfung Pharmazie',
      description: 'Professionelle Vorbereitung auf die pharmazeutische Fachsprachprüfung. Schwerpunkt auf pharmazeutischer Fachsprache, Arzneimittelkunde und Beratungskompetenz.',
      features: [
        'Arzneimittelkunde & Wirkstoffe',
        'Pharmazeutische Praxis',
        'Klinische Pharmazie',
        'Apothekenmanagement',
        'Patientenberatung'
      ],
      duration: '8 Wochen',
      level: 'B2',
      students: '120+',
      rating: 4.7,
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'border-blue-200 bg-blue-50/50 dark:bg-blue-900/10',
      green: 'border-green-200 bg-green-50/50 dark:bg-green-900/10',
      purple: 'border-purple-200 bg-purple-50/50 dark:bg-purple-900/10'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getIconBgColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400',
      green: 'bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-400',
      purple: 'bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-400'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            FSP-Fachgebiete
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Wählen Sie Ihren Fachbereich und starten Sie Ihre Vorbereitung auf die Fachsprachprüfung
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {courses.map((course, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-white dark:bg-slate-800 ${getColorClasses(course.color)}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 rounded-xl ${getIconBgColor(course.color)}`}>
                  <course.icon className="w-8 h-8" />
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    {course.rating}
                  </span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                {course.title}
              </h3>
              <p className="text-lg font-medium text-slate-600 dark:text-slate-300 mb-4">
                {course.subtitle}
              </p>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                {course.description}
              </p>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Fachinhalte
                </h4>
                <ul className="space-y-2">
                  {course.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                <div className="text-center">
                  <Clock className="w-5 h-5 mx-auto mb-1 text-slate-500 dark:text-slate-400" />
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{course.duration}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Dauer</p>
                </div>
                <div className="text-center">
                  <Award className="w-5 h-5 mx-auto mb-1 text-slate-500 dark:text-slate-400" />
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{course.level}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Niveau</p>
                </div>
                <div className="text-center">
                  <Users className="w-5 h-5 mx-auto mb-1 text-slate-500 dark:text-slate-400" />
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{course.students}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Teilnehmer</p>
                </div>
              </div>

              {/* CTA Button */}
              <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                course.color === 'blue'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg hover:shadow-blue-500/25'
                  : course.color === 'green'
                  ? 'bg-green-600 hover:bg-green-700 text-white hover:shadow-lg hover:shadow-green-500/25'
                  : 'bg-purple-600 hover:bg-purple-700 text-white hover:shadow-lg hover:shadow-purple-500/25'
              }`}>
                Fachgebiet wählen
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Alle Fachgebiete bieten
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Interaktive Lektionen</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">Multimedia-Inhalte mit praktischen Übungen</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Expertenfeedback</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">Persönliche Korrektur Ihrer Antworten</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Zertifikat</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">Nachweis über Ihre Fachsprachkompetenz</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Flexibler Zugang</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">24/7 verfügbar auf allen Geräten</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
