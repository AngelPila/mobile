import React, { useState } from 'react';
import {
  IonContent,
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
} from '@ionic/react';
import { chevronForward, chevronBack } from 'ionicons/icons';
import { UserRole } from '../types';

interface OnboardingProps {
  onComplete: (role: UserRole) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [slide, setSlide] = useState(0);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const slides = [
    {
      title: '🌍 Bienvenido a WAQI',
      subtitle: 'World Agricultural Quality Index',
      description: 'La plataforma que conecta agricultores, compradores e inversionistas en un ecosistema agrícola transparente y confiable.',
      emoji: '🌾'
    },
    {
      title: '⭐ Sistema AgroScore',
      subtitle: 'Reputación Verificada',
      description: 'Cada agricultor tiene una puntuación de 0-1000 basada en histórico productivo, salud financiera, validación de tierras y riesgo de zona.',
      emoji: '📊'
    },
    {
      title: '🤝 Conecta y Crece',
      subtitle: 'Tu Rol en WAQI',
      description: 'Selecciona tu rol para acceder a características personalizadas diseñadas específicamente para ti.',
      emoji: '🚀'
    }
  ];

  const roles: Array<{ id: UserRole; name: string; description: string; icon: string; color: string }> = [
    {
      id: 'agricultor',
      name: '👨‍🌾 Agricultor',
      description: 'Gestiona cultivos, construye tu AgroScore y vende en el marketplace',
      icon: '🌽',
      color: 'bg-lime-50 border-lime-300'
    },
    {
      id: 'comprador',
      name: '🛒 Comprador',
      description: 'Encuentra productos verificados y conecta con productores de confianza',
      icon: '📦',
      color: 'bg-emerald-50 border-emerald-300'
    },
    {
      id: 'inversionista',
      name: '💰 Inversionista',
      description: 'Analiza proyectos agrícolas y maximiza tus retornos de inversión',
      icon: '📈',
      color: 'bg-blue-50 border-blue-300'
    }
  ];

  const currentSlide = slides[slide];

  if (slide < 3) {
    return (
      <IonContent className="animate-fade-in" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)' }}>
        <div className="min-h-screen flex flex-col justify-between items-center p-6">
          <div className="flex-1 flex flex-col justify-center items-center w-full max-w-md">
            <div className="text-center">
              <div className="text-7xl mb-8 animate-slide-in-down">{currentSlide.emoji}</div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 animate-slide-in-up">
                {currentSlide.title}
              </h1>
              <p className="text-lg md:text-xl font-semibold text-blue-600 mb-6 animate-slide-in-up">
                {currentSlide.subtitle}
              </p>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed animate-slide-in-up">
                {currentSlide.description}
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-2 mb-8">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === slide ? 'bg-blue-600 w-8' : 'bg-gray-300 w-2'
                }`}
              />
            ))}
          </div>

          <div className="flex justify-between gap-4 w-full max-w-md">
            <IonButton
              fill="outline"
              onClick={() => setSlide(Math.max(0, slide - 1))}
              disabled={slide === 0}
              className="flex-1"
            >
              <IonIcon icon={chevronBack} className="mr-2" />
              Atrás
            </IonButton>
            <IonButton
              color="primary"
              onClick={() => setSlide(Math.min(3, slide + 1))}
              className="flex-1"
            >
              Siguiente
              <IonIcon icon={chevronForward} className="ml-2" />
            </IonButton>
          </div>
        </div>
      </IonContent>
    );
  }

  return (
    <IonContent className="animate-fade-in" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)' }}>
      <div className="min-h-screen flex flex-col justify-between items-center p-6 py-8">
        <div className="w-full max-w-md flex-1 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 text-center">
            ¿Cuál es tu rol?
          </h1>
          <p className="text-gray-600 text-center mb-10 text-base md:text-lg">
            Selecciona el rol que mejor te describe para personalizar tu experiencia
          </p>

          <div className="space-y-4">
            {roles.map((role, idx) => (
              <div
                key={role.id}
                className="animate-slide-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <IonCard
                  className={`cursor-pointer transition-all border-2 ${
                    selectedRole === role.id
                      ? role.color + ' border-slate-900 shadow-xl scale-105'
                      : role.color + ' border-gray-300 hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <IonCardContent className="py-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl flex-shrink-0">{role.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-1">
                          {role.name}
                        </h3>
                        <p className="text-sm text-gray-600">{role.description}</p>
                      </div>
                      {selectedRole === role.id && (
                        <div className="text-2xl flex-shrink-0">✓</div>
                      )}
                    </div>
                  </IonCardContent>
                </IonCard>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 w-full max-w-md">
          <IonButton
            fill="outline"
            onClick={() => setSlide(2)}
            className="flex-1"
          >
            <IonIcon icon={chevronBack} className="mr-2" />
            Atrás
          </IonButton>
          <IonButton
            color="primary"
            onClick={() => selectedRole && onComplete(selectedRole)}
            disabled={!selectedRole}
            className="flex-1"
          >
            Completar
            <IonIcon icon={chevronForward} className="ml-2" />
          </IonButton>
        </div>
      </div>
    </IonContent>
  );
};
