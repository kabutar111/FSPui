import React from 'react';
import { LucideIcon } from 'lucide-react';
import { theme, classes } from '../../lib/theme';
import { getClasses } from '../../lib/theme';

interface SectionHeadingProps {
  /** The main heading text */
  title: string;
  /** Optional highlighted text within the title */
  highlight?: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Optional icon for the badge */
  icon?: LucideIcon;
  /** Optional badge text */
  badge?: string;
  /** Color scheme for the badge and highlights */
  colorScheme?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  /** Whether to center align the content */
  centered?: boolean;
  /** Custom className for the container */
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  highlight,
  subtitle,
  icon: Icon,
  badge,
  colorScheme = 'blue',
  centered = true,
  className = '',
}) => {
  const colorClasses = {
    blue: {
      badge: theme.colors.primary.blue[50],
      text: theme.colors.primary.blue[600],
      highlight: theme.colors.primary.blue[600],
    },
    green: {
      badge: 'bg-green-50 dark:bg-green-900/30',
      text: theme.colors.primary.green[600],
      highlight: theme.colors.primary.green[600],
    },
    purple: {
      badge: 'bg-purple-50 dark:bg-purple-900/30',
      text: theme.colors.primary.purple[600],
      highlight: theme.colors.primary.purple[600],
    },
    orange: {
      badge: 'bg-orange-50 dark:bg-orange-900/30',
      text: theme.colors.primary.orange[600],
      highlight: theme.colors.primary.orange[600],
    },
    red: {
      badge: 'bg-red-50 dark:bg-red-900/30',
      text: theme.colors.primary.red[600],
      highlight: theme.colors.primary.red[600],
    },
    indigo: {
      badge: 'bg-indigo-50 dark:bg-indigo-900/30',
      text: theme.colors.primary.indigo[600],
      highlight: theme.colors.primary.indigo[600],
    },
  };

  const colors = colorClasses[colorScheme];

  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      {/* Badge */}
      {(badge || Icon) && (
        <div className={getClasses(
          'inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6',
          colors.badge,
          'border border-current/30',
          classes.text.secondary
        )}>
          {Icon && <Icon className="w-4 h-4" />}
          {badge && <span className={getClasses(classes.typography.label, classes.text.primary)}>{badge}</span>}
        </div>
      )}

      {/* Title */}
      <h2 className={getClasses(classes.typography.displayMedium, classes.text.primary, 'mb-6')}>
        {highlight ? (
          <>
            {title.replace(highlight, '')}
            <span className={getClasses('block', colors.highlight)}>{highlight}</span>
          </>
        ) : (
          title
        )}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className={getClasses(
          classes.typography.bodyLarge,
          classes.text.secondary,
          'max-w-3xl',
          centered ? 'mx-auto' : ''
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
