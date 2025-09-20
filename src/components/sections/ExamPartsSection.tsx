import React from 'react';
import { MessageSquare, FileText, Users, GraduationCap, Clock, Target, BookOpen, Award, CheckCircle, AlertCircle, Lightbulb, Timer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import SectionHeading from '../ui/section-heading';
import { theme, classes } from '../../lib/theme';

const ExamPartsSection: React.FC = () => {
  const examParts = [
    {
      part: "Teil 1",
      title: "Anamnese & Patientengespräche",
      subtitle: "Mündliche Kommunikation",
      description: "Professionelle Patientengespräche mit FSP-Agenten führen, medizinische Informationen strukturiert erfragen und empathisch kommunizieren.",
      icon: MessageSquare,
      colorScheme: 'blue' as const,
      duration: "25 Minuten",
      weight: "40%",
      difficulty: "Mittel",
      features: [
        "Anamnestische Befragung",
        "Symptombeschreibung verstehen",
        "Medizinische Fachtermini korrekt anwenden",
        "Empathische Gesprächsführung",
        "Klärende Nachfragen stellen"
      ],
      skills: [
        "Aktives Zuhören",
        "Non-verbale Kommunikation",
        "Medizinische Fachsprache",
        "Kulturelle Sensibilität"
      ],
      sampleScenarios: [
        "Schmerzsymptome beschreiben",
        "Medikamentenanamnese erheben",
        "Allergien und Unverträglichkeiten abfragen"
      ]
    },
    {
      part: "Teil 2",
      title: "Medizinische Dokumentation",
      subtitle: "Schriftliche Kommunikation",
      description: "Medizinische Befunde, Diagnosen und Behandlungsverläufe mit Unterstützung von FSP-Agenten präzise und professionell dokumentieren.",
      icon: FileText,
      colorScheme: 'green' as const,
      duration: "30 Minuten",
      weight: "35%",
      difficulty: "Hoch",
      features: [
        "Befundberichte schreiben",
        "Behandlungsprotokolle erstellen",
        "Medizinische Terminologie anwenden",
        "Präzise Formulierungen",
        "Fachliche Korrektheit"
      ],
      skills: [
        "Schriftliche Ausdrucksfähigkeit",
        "Medizinische Fachsprache",
        "Strukturierte Dokumentation",
        "Fachliche Genauigkeit"
      ],
      sampleScenarios: [
        "OP-Bericht verfassen",
        "Entlassungsbrief schreiben",
        "Laborbefunde interpretieren"
      ]
    },
    {
      part: "Teil 3",
      title: "Kollegiale Fachkommunikation",
      subtitle: "Interprofessionelle Kommunikation",
      description: "Professionelle Fachgespräche mit FSP-Agenten als Kollegen führen, medizinische Themen diskutieren und interdisziplinär kommunizieren.",
      icon: Users,
      colorScheme: 'purple' as const,
      duration: "20 Minuten",
      weight: "25%",
      difficulty: "Mittel",
      features: [
        "Fachliche Diskussionen führen",
        "Fallbesprechungen moderieren",
        "Interdisziplinäre Kommunikation",
        "Professionelle Beratung geben",
        "Konflikte konstruktiv lösen"
      ],
      skills: [
        "Professionelle Gesprächsführung",
        "Argumentationsfähigkeit",
        "Teamkommunikation",
        "Konfliktmanagement"
      ],
      sampleScenarios: [
        "Therapieoptionen besprechen",
        "Überweisungen koordinieren",
        "Interdisziplinäre Fallbesprechungen"
      ]
    }
  ];

  return (
    <section className={`${classes.section.large} ${theme.backgrounds.gradient.exam}`}>
      {/* Section Header */}
      <div className={theme.spacing.section.header}>
        <SectionHeading
          badge="FSP Prüfung"
          icon={GraduationCap}
          title="FSP-Agenten für Ihre Vorbereitung"
          subtitle="Professionelle FSP-Agenten unterstützen Sie bei allen drei Prüfungsteilen mit realistischen Szenarien und individuellem Feedback"
          colorScheme="indigo"
        />
      </div>

      {/* Exam Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-200/50 dark:border-slate-700/50">
          <Clock className="w-8 h-8 mx-auto mb-3 text-blue-600 dark:text-blue-400" />
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">75 Min</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Gesamtdauer</div>
        </div>
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-200/50 dark:border-slate-700/50">
          <Target className="w-8 h-8 mx-auto mb-3 text-green-600 dark:text-green-400" />
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">3 Teile</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Prüfungsabschnitte</div>
        </div>
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-200/50 dark:border-slate-700/50">
          <Award className="w-8 h-8 mx-auto mb-3 text-purple-600 dark:text-purple-400" />
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">B2-C1</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Sprachniveau</div>
        </div>
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-200/50 dark:border-slate-700/50">
          <CheckCircle className="w-8 h-8 mx-auto mb-3 text-orange-600 dark:text-orange-400" />
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">85%</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Erfolgsquote</div>
        </div>
      </div>

      {/* Exam Parts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {examParts.map((part, index) => (
          <Card key={index} className={`${classes.card.glass} group hover:shadow-2xl transition-all duration-500 border-0 relative overflow-hidden`}>
            {/* Part Number Badge */}
            <div className="absolute top-4 right-4 bg-white/20 dark:bg-slate-700/50 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center">
              <span className="text-lg font-bold text-slate-700 dark:text-slate-200">{part.part}</span>
            </div>

            {/* Difficulty Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                part.difficulty === 'Hoch' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                part.difficulty === 'Mittel' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
              }`}>
                {part.difficulty}
              </span>
            </div>

            <CardHeader className="text-center pb-6 pt-16">
              <div className={`mx-auto w-20 h-20 rounded-3xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg ${
                part.colorScheme === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                part.colorScheme === 'green' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                'bg-gradient-to-br from-purple-500 to-purple-600'
              }`}>
                <part.icon className="w-10 h-10 text-white" />
              </div>

              <CardTitle className={`${classes.typography.h3} ${classes.text.primary} mb-2`}>
                {part.title}
              </CardTitle>

              <p className={`${classes.typography.bodySmall} ${classes.text.secondary} mb-4`}>
                {part.subtitle}
              </p>

              {/* Duration & Weight */}
              <div className="flex justify-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{part.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{part.weight}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <p className={`${classes.typography.bodyMedium} ${classes.text.secondary} text-center leading-relaxed`}>
                {part.description}
              </p>

              {/* Key Features */}
              <div className="space-y-3">
                <h4 className={`${classes.typography.label} ${classes.text.secondary} flex items-center gap-2`}>
                  <Lightbulb className="w-4 h-4" />
                  Kernkompetenzen:
                </h4>
                <ul className="space-y-2">
                  {part.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={`flex items-center gap-2 ${classes.typography.bodySmall} ${classes.text.tertiary}`}>
                      <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills Development */}
              <div className="space-y-3">
                <h4 className={`${classes.typography.label} ${classes.text.secondary} flex items-center gap-2`}>
                  <BookOpen className="w-4 h-4" />
                  Entwicklungsbereiche:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {part.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sample Scenarios */}
              <div className="space-y-3">
                <h4 className={`${classes.typography.label} ${classes.text.secondary} flex items-center gap-2`}>
                  <AlertCircle className="w-4 h-4" />
                  Beispielszenarien:
                </h4>
                <ul className="space-y-1">
                  {part.sampleScenarios.map((scenario, scenarioIndex) => (
                    <li key={scenarioIndex} className={`flex items-center gap-2 ${classes.typography.bodySmall} ${classes.text.tertiary}`}>
                      <div className="w-1 h-1 bg-current rounded-full flex-shrink-0 ml-2" />
                      {scenario}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  part.colorScheme === 'blue'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg hover:shadow-blue-500/25'
                    : part.colorScheme === 'green'
                    ? 'bg-green-600 hover:bg-green-700 text-white hover:shadow-lg hover:shadow-green-500/25'
                    : 'bg-purple-600 hover:bg-purple-700 text-white hover:shadow-lg hover:shadow-purple-500/25'
                }`}>
                  Mit Agent üben
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Success Metrics Section */}
      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-slate-200/50 dark:border-slate-700/50">
        <div className="text-center mb-8">
          <h3 className={`${classes.typography.h2} ${classes.text.primary} mb-4`}>
            Ihre Erfolgsaussichten maximieren
          </h3>
          <p className={`${classes.typography.bodyLarge} ${classes.text.secondary}`}>
            Mit unseren FSP-Agenten erreichen unsere Teilnehmer durchschnittlich:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">85%</div>
            <p className={`${classes.typography.bodyMedium} ${classes.text.primary} font-medium mb-1`}>
              Erfolgsquote beim ersten Versuch
            </p>
            <p className={`${classes.typography.bodySmall} ${classes.text.tertiary}`}>
              Durch intensives Teil-Training
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">92%</div>
            <p className={`${classes.typography.bodyMedium} ${classes.text.primary} font-medium mb-1`}>
              Verbesserung der Fachsprache
            </p>
            <p className={`${classes.typography.bodySmall} ${classes.text.tertiary}`}>
              Durch gezieltes Vokabular-Training
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">78%</div>
            <p className={`${classes.typography.bodyMedium} ${classes.text.primary} font-medium mb-1`}>
              Mehr Selbstvertrauen
            </p>
            <p className={`${classes.typography.bodySmall} ${classes.text.tertiary}`}>
              Durch realistische Prüfungssimulationen
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="text-center">
        <Card className={`${classes.card.glass} max-w-4xl mx-auto border-0`}>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-left lg:text-left">
                <h3 className={`${classes.typography.h2} ${classes.text.primary} mb-4`}>
                  Komplettpaket für Ihren FSP-Erfolg
                </h3>
                <p className={`${classes.typography.bodyLarge} ${classes.text.secondary} mb-6`}>
                  Trainieren Sie alle drei Prüfungsteile mit professionellen FSP-Agenten in einer integrierten Lernumgebung mit realistischen Szenarien, personalisiertem Feedback und umfassenden Lernmaterialien.
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Alle Prüfungsteile</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">KI-Feedback</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">24/7 Support</span>
                  </div>
                </div>
              </div>
              <div className="text-center lg:text-right">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 mb-6">
                  <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Jetzt starten</div>
                  <div className="text-lg text-slate-600 dark:text-slate-400">Kostenlose Testversion verfügbar</div>
                </div>
                <button className={`${classes.button.primary} text-lg px-8 py-4`}>
                  Alle Teile mit Agenten trainieren
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ExamPartsSection;
