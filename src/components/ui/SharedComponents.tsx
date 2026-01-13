import React from 'react';
import { IonCard, IonCardContent } from '@ionic/react';

interface AgroScoreGaugeProps {
  score: number; // 0-1000
  maxScore?: number;
  size?: 'small' | 'large';
  showLabel?: boolean;
}

export const AgroScoreGauge: React.FC<AgroScoreGaugeProps> = ({
  score,
  maxScore = 1000,
  size = 'large',
  showLabel = true
}) => {
  const percentage = (score / maxScore) * 100;
  
  // Determinar color según puntuación
  let color = '#ef4444'; // rojo
  let qualityText = 'Riesgo';
  let glow = 'shadow-red-500/20';
  
  if (score >= 800) {
    color = '#16a34a'; // verde
    qualityText = 'Excelente';
    glow = 'shadow-green-500/20';
  } else if (score >= 600) {
    color = '#eab308'; // amarillo
    qualityText = 'Bueno';
    glow = 'shadow-yellow-500/20';
  }

  const sizeClasses = size === 'small' ? 'w-24 h-24' : 'w-32 h-32';
  const textSizeClasses = size === 'small' ? 'text-2xl' : 'text-4xl';

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`relative ${sizeClasses} flex items-center justify-center drop-shadow-lg ${glow}`}>
        {/* SVG Gauge */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full transform -rotate-90"
        >
          {/* Fondo del gauge */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          {/* Gauge de progreso con animación */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={`${(percentage / 100) * 282.7} 282.7`}
            strokeLinecap="round"
            style={{ 
              transition: 'stroke-dasharray 0.5s ease',
              filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.1))'
            }}
          />
        </svg>
        
        {/* Texto central */}
        <div className="absolute flex flex-col items-center">
          <span className={`${textSizeClasses} font-bold`} style={{ color }}>
            {score}
          </span>
          <span className="text-xs text-gray-500">/{maxScore}</span>
        </div>
      </div>

      {showLabel && (
        <div className="mt-4 text-center">
          <p className="text-sm font-bold" style={{ color }}>
            {qualityText}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {percentage.toFixed(1)}% de confiabilidad
          </p>
        </div>
      )}
    </div>
  );
};

// Componente Card para productos
interface ProductCardProps {
  emoji?: string;
  title: string;
  subtitle?: string;
  value?: string | number;
  onClick?: () => void;
  className?: string;
  color?: 'green' | 'emerald' | 'blue';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  emoji = '🌾',
  title,
  subtitle,
  value,
  onClick,
  className = '',
  color = 'green'
}) => {
  const colorClasses: Record<string, string> = {
    green: 'bg-gradient-to-br from-lime-50 to-lime-100 border-lime-200 hover:border-lime-400',
    emerald: 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:border-emerald-400',
    blue: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:border-blue-400'
  };

  return (
    <IonCard
      className={`cursor-pointer transition-all hover:shadow-lg card-modern ${colorClasses[color]} ${className}`}
      onClick={onClick}
    >
      <IonCardContent className="pb-4 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="text-3xl mb-2 transform hover:scale-110 transition-transform">{emoji}</div>
            <p className="text-sm font-semibold text-gray-900 line-clamp-2">{title}</p>
            {subtitle && <p className="text-xs text-gray-600 mt-1 line-clamp-1">{subtitle}</p>}
          </div>
          {value && (
            <div className="text-right flex-shrink-0">
              <p className="text-lg font-bold text-gray-900">{value}</p>
            </div>
          )}
        </div>
      </IonCardContent>
    </IonCard>
  );
};

// Badge de categoría
interface CategoryBadgeProps {
  type: 'sale' | 'purchase' | 'investment' | 'announcement';
  className?: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ type, className = '' }) => {
  const badges = {
    sale: { bg: 'bg-gradient-to-r from-green-100 to-lime-100', text: 'text-green-800', label: '🌾 Venta', border: 'border-green-300' },
    purchase: { bg: 'bg-gradient-to-r from-blue-100 to-cyan-100', text: 'text-blue-800', label: '🛒 Compra', border: 'border-blue-300' },
    investment: { bg: 'bg-gradient-to-r from-amber-100 to-orange-100', text: 'text-amber-900', label: '💰 Inversión', border: 'border-amber-300' },
    announcement: { bg: 'bg-gradient-to-r from-purple-100 to-pink-100', text: 'text-purple-800', label: '📢 Aviso', border: 'border-purple-300' }
  };

  const badge = badges[type];

  return (
    <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold ${badge.bg} ${badge.text} border ${badge.border} shadow-sm ${className} transition-transform hover:scale-105`}>
      {badge.label}
    </span>
  );
};

// Loading Spinner con animación mejorada
export const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center p-4">
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-transparent border-t-lime-500 border-r-emerald-500 rounded-full animate-spin"></div>
    </div>
  </div>
);

// Empty State mejorado
interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon = '📭', title, description }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center px-4 animate-fade-in">
    <p className="text-6xl mb-4 transform hover:scale-110 transition-transform">{icon}</p>
    <p className="text-xl font-bold text-gray-800">{title}</p>
    {description && <p className="text-gray-600 mt-2 text-sm">{description}</p>}
  </div>
);
