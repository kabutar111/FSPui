import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  value: string;
  label: string;
  description: string;
  icon: LucideIcon;
  colorScheme?: 'blue' | 'green' | 'purple' | 'orange';
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  description,
  icon: Icon,
  colorScheme = 'blue'
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800',
    green: 'bg-green-50 border-green-200 text-green-600 dark:bg-green-900/20 dark:border-green-800',
    purple: 'bg-purple-50 border-purple-200 text-purple-600 dark:bg-purple-900/20 dark:border-purple-800',
    orange: 'bg-orange-50 border-orange-200 text-orange-600 dark:bg-orange-900/20 dark:border-orange-800'
  };

  return (
    <div className={`p-6 rounded-lg border-2 transition-all duration-300 hover:shadow-lg ${colorClasses[colorScheme]}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full ${colorScheme === 'blue' ? 'bg-blue-100 dark:bg-blue-800' :
          colorScheme === 'green' ? 'bg-green-100 dark:bg-green-800' :
          colorScheme === 'purple' ? 'bg-purple-100 dark:bg-purple-800' :
          'bg-orange-100 dark:bg-orange-800'}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold">{value}</div>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{label}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default StatCard;
