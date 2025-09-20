import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { theme, classes } from '../../lib/theme';

interface FeatureCardProps {
  /** The feature title */
  title: string;
  /** The feature description */
  description: string;
  /** Icon component from Lucide React */
  icon: LucideIcon;
  /** Color scheme for the card */
  colorScheme?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'indigo';
  /** Custom className */
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  colorScheme = 'blue',
  className = '',
}) => {
  const colorClasses = {
    blue: {
      icon: 'from-blue-500 to-blue-600',
      title: 'text-slate-900 dark:text-white',
    },
    green: {
      icon: 'from-green-500 to-green-600',
      title: 'text-slate-900 dark:text-white',
    },
    purple: {
      icon: 'from-purple-500 to-purple-600',
      title: 'text-slate-900 dark:text-white',
    },
    orange: {
      icon: 'from-orange-500 to-orange-600',
      title: 'text-slate-900 dark:text-white',
    },
    red: {
      icon: 'from-red-500 to-red-600',
      title: 'text-slate-900 dark:text-white',
    },
    indigo: {
      icon: 'from-indigo-500 to-indigo-600',
      title: 'text-slate-900 dark:text-white',
    },
  };

  const colors = colorClasses[colorScheme];

  return (
    <Card className={`${classes.card.glass} group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${className}`}>
      <CardHeader className="text-center pb-6">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
          <Icon className="w-10 h-10 text-white" />
        </div>
        <CardTitle className={`${classes.typography.h3} ${classes.text.primary} mb-4`}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`${classes.typography.bodyMedium} ${classes.text.secondary}`}>
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
