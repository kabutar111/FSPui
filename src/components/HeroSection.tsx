import React from 'react';
import { Button } from './ui/button';
import { Play, BookOpen, Users, Target, Award, Clock, Shield, CheckCircle, Zap, GraduationCap } from 'lucide-react';
import { classes, theme } from '../lib/theme';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Content */}
            <div className="text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-white">Basierend auf aktuellen FSP-Standards</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight mb-6">
                Ihre FSP-Prüfung
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  erfolgreich meistern
                </span>
              </h1>

              {/* Problem Statement */}
              <div className="bg-red-500/10 backdrop-blur-sm border border-red-400/20 rounded-lg p-4 mb-6 max-w-lg mx-auto lg:mx-0">
                <p className="text-red-200 text-sm font-medium mb-2">⚠️ Häufige Herausforderungen:</p>
                <div className="space-y-1 text-sm text-red-100">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                    <span>Unklare Prüfungsanforderungen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                    <span>Mangelnde Praxis in medizinischer Kommunikation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                    <span>Zeitdruck und Prüfungsangst</span>
                  </div>
                </div>
              </div>

              {/* Value Proposition */}
              <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
                Mit unserer KI-gestützten Plattform trainieren Sie alle drei Prüfungsteile mit
                <span className="font-semibold text-white"> realistischen Szenarien</span>,
                <span className="font-semibold text-white"> personalisiertem Feedback</span> und
                <span className="font-semibold text-white"> bewährten Strategien</span>.
              </p>

              {/* Key Benefits */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-white font-medium">Schneller Einstieg</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                  <GraduationCap className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-white font-medium">Proven Methoden</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-white font-medium">95% Erfolgsrate</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg px-8 py-4 font-bold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 border-0"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Kostenlose Probetraining starten
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white text-lg px-8 py-4 font-semibold backdrop-blur-sm transition-all duration-300"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Prüfungsdetails ansehen
                </Button>
              </div>

            </div>

            {/* Right Column - Stats & Visual */}
            <div className="relative">
              {/* Main Stats Card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl mb-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Ihre Erfolgsaussichten</h3>
                  <p className="text-blue-100 text-sm">Basierend auf aktuellen Daten</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-black text-green-400 mb-2">95%</div>
                    <div className="text-sm text-blue-100 mb-1">Erfolgsquote</div>
                    <div className="text-xs text-blue-200">beim ersten Versuch</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black text-blue-400 mb-2">500+</div>
                    <div className="text-sm text-blue-100 mb-1">Aktive Lerner</div>
                    <div className="text-xs text-blue-200">monatlich</div>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex justify-between text-sm text-blue-100 mb-2">
                    <span>Durchschnittlicher Fortschritt</span>
                    <span>87%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full w-[87%]"></div>
                  </div>
                </div>
              </div>

              {/* Additional Trust Signals */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
                  <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-white">24/7</div>
                  <div className="text-xs text-blue-200">Support</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
                  <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-white">KI</div>
                  <div className="text-xs text-blue-200">Feedback</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
                  <Shield className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-white">FSP</div>
                  <div className="text-xs text-blue-200">Standards</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
