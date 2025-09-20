// Central theme configuration for consistent styling across the application
export const theme = {
  // Color schemes
  colors: {
    primary: {
      blue: {
        50: 'bg-blue-50 dark:bg-blue-900/30',
        100: 'text-blue-100',
        400: 'text-blue-400 dark:text-blue-300',
        500: 'bg-blue-500',
        600: 'bg-blue-600 text-blue-600 dark:text-blue-400',
      },
      green: {
        400: 'text-green-400 dark:text-green-300',
        500: 'bg-green-500',
        600: 'bg-green-600 text-green-600 dark:text-green-400',
      },
      purple: {
        400: 'text-purple-400 dark:text-purple-300',
        500: 'bg-purple-500',
        600: 'bg-purple-600 text-purple-600 dark:text-purple-400',
      },
      orange: {
        400: 'text-orange-400 dark:text-orange-300',
        500: 'bg-orange-500',
        600: 'bg-orange-600 text-orange-600 dark:text-orange-400',
      },
      red: {
        400: 'text-red-400 dark:text-red-300',
        500: 'bg-red-500',
        600: 'bg-red-600 text-red-600 dark:text-red-400',
      },
      indigo: {
        400: 'text-indigo-400 dark:text-indigo-300',
        500: 'bg-indigo-500',
        600: 'bg-indigo-600 text-indigo-600 dark:text-indigo-400',
      },
    },
    slate: {
      50: 'bg-slate-50 dark:bg-slate-800/50',
      100: 'text-slate-100',
      200: 'text-slate-200',
      300: 'text-slate-300',
      400: 'text-slate-400',
      600: 'text-slate-600 dark:text-slate-300',
      700: 'text-slate-700 dark:text-slate-300',
      800: 'bg-slate-800',
      900: 'bg-slate-900 text-slate-900 dark:text-slate-100',
    },
    white: 'text-white bg-white',
    black: 'text-black',
    gray: {
      100: 'text-gray-100',
      200: 'text-gray-200',
      300: 'text-gray-300',
      400: 'text-gray-400',
      500: 'text-gray-500',
      600: 'text-gray-600 dark:text-gray-300',
      700: 'text-gray-700 dark:text-gray-300',
      800: 'text-gray-800 dark:text-gray-200',
      900: 'text-gray-900 dark:text-gray-100',
    },
  },

  // Typography (Apple HIG compliant)
  typography: {
    // Display styles
    display: {
      large: 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight',
      medium: 'text-3xl md:text-4xl lg:text-5xl font-black leading-[1.15] tracking-tight',
      small: 'text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.2] tracking-tight',
    },
    // Heading styles
    heading: {
      h1: 'text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.2] tracking-tight',
      h2: 'text-xl md:text-2xl lg:text-3xl font-bold leading-[1.25] tracking-tight',
      h3: 'text-lg md:text-xl lg:text-2xl font-semibold leading-[1.3] tracking-normal',
      h4: 'text-base md:text-lg lg:text-xl font-semibold leading-[1.35] tracking-normal',
      h5: 'text-sm md:text-base lg:text-lg font-semibold leading-[1.4] tracking-normal',
      h6: 'text-sm md:text-base font-medium leading-[1.4] tracking-normal',
    },
    // Body text styles
    body: {
      large: 'text-base md:text-lg leading-[1.6] font-normal',
      medium: 'text-sm md:text-base leading-[1.6] font-normal',
      small: 'text-xs md:text-sm leading-[1.5] font-normal',
    },
    // UI text styles
    ui: {
      label: 'text-xs md:text-sm font-medium uppercase tracking-wider leading-[1.4]',
      caption: 'text-xs md:text-sm font-normal leading-[1.4] text-slate-600 dark:text-slate-300',
      footnote: 'text-xs font-normal leading-[1.4] text-slate-500 dark:text-slate-400',
    },
    // Special text styles
    special: {
      hero: 'text-xl md:text-2xl lg:text-3xl font-light leading-[1.4] tracking-normal',
      emphasis: 'text-base md:text-lg font-medium leading-[1.6] italic',
      quote: 'text-lg md:text-xl lg:text-2xl font-light leading-[1.4] italic',
    },
  },

  // Layout
  layout: {
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    section: {
      base: 'py-20',
      large: 'py-24',
    },
    grid: {
      cards: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
      stats: 'grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8',
      features: 'grid grid-cols-2 lg:grid-cols-4 gap-6',
    },
  },

  // Effects
  effects: {
    glass: 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm',
    shadow: {
      card: 'shadow-lg',
      hover: 'hover:shadow-xl hover:shadow-2xl',
    },
    transition: 'transition-all duration-300 duration-500',
    hover: {
      lift: 'hover:-translate-y-2',
      scale: 'group-hover:scale-110',
    },
  },

  // Components
  components: {
    card: {
      base: 'border-0 rounded-lg',
      glass: 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm',
      gradient: 'bg-gradient-to-r from-blue-600 to-purple-600',
    },
    button: {
      primary: 'bg-white text-blue-600 hover:bg-blue-50',
      secondary: 'border-2 border-white text-white hover:bg-white hover:text-blue-600',
      gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
    },
    badge: {
      base: 'inline-flex items-center gap-2 px-4 py-2 rounded-full',
      blue: 'bg-blue-50 dark:bg-blue-900/30 border border-blue-400/30',
    },
    icon: {
      container: 'w-16 h-16 rounded-2xl flex items-center justify-center',
      gradient: 'bg-gradient-to-br',
    },
  },

  // Background patterns
  backgrounds: {
    gradient: {
      light: 'bg-gradient-to-br from-slate-50/50 to-blue-50/50 dark:from-slate-800/50 dark:to-slate-900/50',
      dark: 'bg-gradient-to-br from-slate-900 to-slate-800',
      primary: 'bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800',
      hero: 'bg-gradient-to-br from-blue-600 to-purple-600',
      exam: 'bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20',
    },
  },

  // Spacing
  spacing: {
    section: {
      header: 'text-center mb-20',
      content: 'mb-16',
    },
    card: {
      padding: 'p-6',
      header: 'text-center pb-6',
      content: 'p-6 pt-0',
    },
  },
} as const;

// Utility functions for consistent class application
export const getClasses = (...classes: (string | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Predefined component class combinations
export const classes = {
  section: {
    container: theme.layout.container,
    base: `${theme.layout.section.base} ${theme.layout.container}`,
    large: `${theme.layout.section.large} ${theme.layout.container}`,
  },
  card: {
    glass: `${theme.components.card.base} ${theme.components.card.glass} ${theme.effects.shadow.card} ${theme.effects.hover.hover}`,
    gradient: `${theme.components.card.base} ${theme.components.card.gradient} ${theme.effects.shadow.card}`,
  },
  button: {
    primary: `${theme.components.button.primary} font-bold py-3 px-8 rounded-full ${theme.effects.transition} ${theme.effects.shadow.card}`,
    secondary: `${theme.components.button.secondary} font-semibold py-3 px-8 rounded-full ${theme.effects.transition} ${theme.effects.shadow.card}`,
    gradient: `${theme.components.button.gradient} font-bold py-3 px-8 rounded-full ${theme.effects.transition} ${theme.effects.shadow.card}`,
  },
  typography: {
    // Display styles
    displayLarge: theme.typography.display.large,
    displayMedium: theme.typography.display.medium,
    displaySmall: theme.typography.display.small,
    // Heading styles
    h1: theme.typography.heading.h1,
    h2: theme.typography.heading.h2,
    h3: theme.typography.heading.h3,
    h4: theme.typography.heading.h4,
    h5: theme.typography.heading.h5,
    h6: theme.typography.heading.h6,
    // Body styles
    bodyLarge: theme.typography.body.large,
    bodyMedium: theme.typography.body.medium,
    bodySmall: theme.typography.body.small,
    // UI styles
    label: theme.typography.ui.label,
    caption: theme.typography.ui.caption,
    footnote: theme.typography.ui.footnote,
    // Special styles
    hero: theme.typography.special.hero,
    emphasis: theme.typography.special.emphasis,
    quote: theme.typography.special.quote,
  },

  // Semantic text colors (WCAG AA compliant)
  text: {
    primary: 'text-slate-900 dark:text-slate-100',
    secondary: 'text-slate-700 dark:text-slate-300',
    tertiary: 'text-slate-600 dark:text-slate-400',
    quaternary: 'text-slate-500 dark:text-slate-500',
    inverse: 'text-white dark:text-slate-900',
    accent: 'text-blue-600 dark:text-blue-400',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-orange-600 dark:text-orange-400',
    error: 'text-red-600 dark:text-red-400',
    disabled: 'text-slate-400 dark:text-slate-500',
  },
} as const;
