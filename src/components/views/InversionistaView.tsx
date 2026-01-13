import React, { useState } from 'react';
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonBadge,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonRange,
  IonInput,
  IonCheckbox,
} from '@ionic/react';
import { close, chevronForward } from 'ionicons/icons';
import { InvestmentProject } from '../../types';
import { AgroScoreGauge, EmptyState } from '../ui/SharedComponents';
import { ProfileHero } from '../ui/ProfileHero';

// Mock projects
const MOCK_PROJECTS: InvestmentProject[] = [
  {
    id: '1',
    title: 'Expansión Bananera - Proyecto Green Valley',
    description: 'Expansión de 50 hectáreas de cultivo de banano Cavendish en zona de alta productividad. Incluye sistema de riego automatizado y certificación de sostenibilidad.',
    farmer: {
      name: 'Expobanano Ecuador SA',
      location: 'Santa Elena',
      score: 950
    },
    targetAmount: 50000,
    fundedAmount: 32500,
    fundingPercentage: 65,
    roi: { min: 12, max: 15 },
    riskLevel: 'low',
    duration: '18 meses',
    investorCount: 23,
    agroScore: 950
  },
  {
    id: '2',
    title: 'Tecnificación Arrocera - Coop. del Sur',
    description: 'Implementación de tecnología de riego por goteo y sistemas de monitoreo remoto en 40 hectáreas. Mejora de rendimiento del 35% proyectado.',
    farmer: {
      name: 'Coop. Arroz del Sur',
      location: 'Daule, Guayas',
      score: 870
    },
    targetAmount: 25000,
    fundedAmount: 12500,
    fundingPercentage: 50,
    roi: { min: 16, max: 20 },
    riskLevel: 'medium',
    duration: '24 meses',
    investorCount: 15,
    agroScore: 870
  },
  {
    id: '3',
    title: 'Cacaotal Premium - Agrícola San Juan',
    description: 'Establecimiento de 30 hectáreas de cacao CCN51 con certificación orgánica y procesamiento local. Acceso a mercados de exportación premium.',
    farmer: {
      name: 'Agrícola San Juan',
      location: 'Machala, El Oro',
      score: 890
    },
    targetAmount: 45000,
    fundedAmount: 18000,
    fundingPercentage: 40,
    roi: { min: 18, max: 25 },
    riskLevel: 'high',
    duration: '36 meses',
    investorCount: 12,
    agroScore: 890
  }
];

interface InversionistaViewProps {
  onShowChat: () => void;
}

export const InversionistaView: React.FC<InversionistaViewProps> = ({ onShowChat }) => {
  const [projects, setProjects] = useState<InvestmentProject[]>(MOCK_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<InvestmentProject | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState(5000);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const getRiskBadgeColor = (risk: string) => {
    const colors: Record<string, string> = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return colors[risk] || colors.medium;
  };

  const getRiskLabel = (risk: string) => {
    const labels: Record<string, string> = {
      low: '🟢 Bajo Riesgo',
      medium: '🟡 Riesgo Medio',
      high: '🔴 Alto Riesgo'
    };
    return labels[risk] || risk;
  };

  const calculateProjectedReturn = () => {
    if (!selectedProject) return 0;
    const avgROI = (selectedProject.roi.min + selectedProject.roi.max) / 2;
    return (investmentAmount * avgROI) / 100;
  };

  const getTotalValue = () => {
    return investmentAmount + calculateProjectedReturn();
  };

  const handleInvest = () => {
    // Aquí iría la lógica de inversión real
    alert(`¡Inversión de $${investmentAmount} realizada en ${selectedProject?.title}!`);
    setIsDetailOpen(false);
    setInvestmentAmount(5000);
    setTermsAccepted(false);
  };

  return (
    <IonContent fullscreen className="bg-gradient-to-b from-blue-50 to-white">
      <div className="space-y-5 pb-20">
        {/* Saludo */}
        <ProfileHero
          gradientClassName="gradient-inversionista"
          title="Panel de Inversión 💼"
          subtitle="Oportunidades agrícolas verificadas y rentables"
          subtitleClassName="text-blue-100"
        />

        {/* Cartera Resumen */}
        <IonCard className="card-elevated bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
          <IonCardContent>
            <h3 className="text-xl font-bold text-slate-900 mb-6">📊 Tu Cartera</h3>
            <IonGrid className="p-0">
              <IonRow>
                <IonCol size="4">
                  <div className="text-center bg-white rounded-xl p-4 border border-blue-100 shadow-sm">
                    <p className="text-blue-600 text-xs font-bold">Invertido</p>
                    <p className="text-2xl font-bold text-slate-900 mt-2">$47.5K</p>
                  </div>
                </IonCol>
                <IonCol size="4">
                  <div className="text-center bg-white rounded-xl p-4 border border-green-100 shadow-sm">
                    <p className="text-green-600 text-xs font-bold">ROI Promedio</p>
                    <p className="text-2xl font-bold text-green-600 mt-2">15.8%</p>
                  </div>
                </IonCol>
                <IonCol size="4">
                  <div className="text-center bg-white rounded-xl p-4 border border-emerald-100 shadow-sm">
                    <p className="text-emerald-600 text-xs font-bold">Retorno Est.</p>
                    <p className="text-2xl font-bold text-emerald-600 mt-2">$7.5K</p>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Gráfico de Tendencias (SVG simple) */}
        <IonCard className="card-elevated bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
          <IonCardContent>
            <h3 className="text-xl font-bold text-slate-900 mb-6">📈 Tendencia de Mercado</h3>
            <svg
              viewBox="0 0 300 150"
              className="w-full h-auto"
              style={{ background: 'linear-gradient(to right, #f1f5f9, #e2e8f0)' }}
            >
              {/* Grid */}
              <line x1="30" y1="20" x2="30" y2="120" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="30" y1="120" x2="280" y2="120" stroke="#cbd5e1" strokeWidth="1" />

              {/* Línea de tendencia */}
              <polyline
                points="40,100 70,85 100,90 130,70 160,75 190,50 220,55 250,35"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Relleno gradiente bajo la línea */}
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#22d3ee', stopOpacity: 0.3 }} />
                  <stop offset="100%" style={{ stopColor: '#22d3ee', stopOpacity: 0 }} />
                </linearGradient>
              </defs>

              <polygon
                points="40,100 70,85 100,90 130,70 160,75 190,50 220,55 250,35 250,120 40,120"
                fill="url(#areaGradient)"
              />

              {/* Etiquetas */}
              <text x="10" y="125" fontSize="12" fill="#94a3b8">
                0%
              </text>
              <text x="10" y="65" fontSize="12" fill="#94a3b8">
                25%
              </text>
            </svg>
            <p className="text-cyan-300 text-sm text-center mt-2">
              ↗ Tendencia alcista en últimos 6 meses
            </p>
          </IonCardContent>
        </IonCard>

        {/* Proyectos Disponibles */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">💰 Proyectos Disponibles</h3>

          {projects.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="Sin proyectos"
              description="No hay proyectos disponibles en este momento"
            />
          ) : (
            <div className="space-y-3">
              {projects.map(project => (
                <IonCard
                  key={project.id}
                  className="bg-slate-800 text-white cursor-pointer hover:shadow-lg transition-all hover:bg-slate-750"
                  onClick={() => {
                    setSelectedProject(project);
                    setIsDetailOpen(true);
                  }}
                >
                  <IonCardContent>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1">{project.title}</h4>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-cyan-300 text-sm">
                            👨‍🌾 {project.farmer.name}
                          </span>
                          <span className="text-cyan-400 text-xs">
                            📍 {project.farmer.location}
                          </span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <IonBadge className={getRiskBadgeColor(project.riskLevel)}>
                          {getRiskLabel(project.riskLevel)}
                        </IonBadge>
                      </div>
                    </div>

                    {/* Descripción corta */}
                    <p className="text-slate-300 text-sm mb-3 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Barra de financiamiento */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Financiamiento</span>
                        <span>{project.fundingPercentage}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                          style={{ width: `${project.fundingPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Datos del proyecto */}
                    <IonGrid className="p-0 mb-3">
                      <IonRow>
                        <IonCol size="4">
                          <div>
                            <p className="text-cyan-300 text-xs">ROI</p>
                            <p className="text-green-400 font-bold">
                              {project.roi.min}-{project.roi.max}%
                            </p>
                          </div>
                        </IonCol>
                        <IonCol size="4">
                          <div>
                            <p className="text-cyan-300 text-xs">Duración</p>
                            <p className="text-white font-bold text-sm">
                              {project.duration}
                            </p>
                          </div>
                        </IonCol>
                        <IonCol size="4">
                          <div className="text-right">
                            <p className="text-cyan-300 text-xs">Inversores</p>
                            <p className="text-white font-bold">
                              {project.investorCount}
                            </p>
                          </div>
                        </IonCol>
                      </IonRow>
                    </IonGrid>

                    {/* Score del agricultor */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                      <span className="text-cyan-300 text-xs">AgroScore</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold">{project.agroScore}</span>
                        <IonIcon icon={chevronForward} className="text-slate-500" />
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Detalle del Proyecto */}
      <IonModal isOpen={isDetailOpen} onDidDismiss={() => setIsDetailOpen(false)}>
        {selectedProject && (
          <>
            <IonHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              <IonToolbar className="bg-transparent">
                <IonTitle className="text-lg">Detalles de Inversión</IonTitle>
                <IonButton
                  slot="end"
                  fill="clear"
                  color="light"
                  onClick={() => setIsDetailOpen(false)}
                >
                  <IonIcon icon={close} />
                </IonButton>
              </IonToolbar>
            </IonHeader>

            <IonContent className="bg-slate-900">
              <div className="space-y-4 p-4">
                {/* Título del proyecto */}
                <IonCard className="bg-slate-800 text-white">
                  <IonCardContent>
                    <h2 className="text-xl font-bold mb-2">{selectedProject.title}</h2>
                    <p className="text-slate-300">{selectedProject.description}</p>
                  </IonCardContent>
                </IonCard>

                {/* Información del Agricultor */}
                <IonCard className="bg-slate-800 text-white">
                  <IonCardContent>
                    <h3 className="font-bold text-cyan-300 mb-3">👨‍🌾 Información del Agricultor</h3>
                    <p className="text-white font-semibold mb-1">{selectedProject.farmer.name}</p>
                    <p className="text-slate-400 text-sm mb-3">
                      📍 {selectedProject.farmer.location}
                    </p>
                    <div className="bg-slate-700 p-3 rounded-lg">
                      <p className="text-slate-300 text-sm mb-2">AgroScore</p>
                      <AgroScoreGauge
                        score={selectedProject.agroScore}
                        maxScore={1000}
                        size="small"
                        showLabel={true}
                      />
                    </div>
                  </IonCardContent>
                </IonCard>

                {/* Detalles Financieros */}
                <IonCard className="bg-slate-800 text-white">
                  <IonCardContent>
                    <h3 className="font-bold text-cyan-300 mb-3">💰 Detalles Financieros</h3>
                    <IonGrid className="p-0 space-y-2">
                      <IonRow className="border-b border-slate-700 pb-2">
                        <IonCol size="6">
                          <p className="text-slate-400 text-sm">Meta de Inversión</p>
                          <p className="text-white font-bold">${selectedProject.targetAmount.toLocaleString()}</p>
                        </IonCol>
                        <IonCol size="6" className="text-right">
                          <p className="text-slate-400 text-sm">Ya Financiado</p>
                          <p className="text-green-400 font-bold">${selectedProject.fundedAmount.toLocaleString()}</p>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Progreso</span>
                        <span className="text-cyan-400">{selectedProject.fundingPercentage}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                          style={{ width: `${selectedProject.fundingPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>

                {/* Análisis de ROI */}
                <IonCard className="bg-slate-800 text-white">
                  <IonCardContent>
                    <h3 className="font-bold text-cyan-300 mb-3">📊 Proyección de ROI</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-300">ROI Estimado</span>
                        <span className="text-green-400 font-bold">
                          {selectedProject.roi.min}% - {selectedProject.roi.max}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Duración</span>
                        <span className="text-white font-bold">{selectedProject.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Nivel de Riesgo</span>
                        <span className={getRiskBadgeColor(selectedProject.riskLevel)}>
                          {getRiskLabel(selectedProject.riskLevel)}
                        </span>
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>

                {/* Calculadora de Inversión */}
                <IonCard className="bg-gradient-to-br from-blue-900 to-slate-800 text-white">
                  <IonCardContent>
                    <h3 className="font-bold text-cyan-300 mb-4">🧮 Calculadora de Inversión</h3>

                    <div className="space-y-4">
                      {/* Monto Rápido */}
                      <div>
                        <p className="text-slate-300 text-sm mb-2">Monto Rápido</p>
                        <div className="grid grid-cols-4 gap-2">
                          {[500, 1000, 2500, 5000].map(amount => (
                            <IonButton
                              key={amount}
                              size="small"
                              fill={investmentAmount === amount ? 'solid' : 'outline'}
                              color={investmentAmount === amount ? 'primary' : 'light'}
                              onClick={() => setInvestmentAmount(amount)}
                            >
                              ${amount / 1000}K
                            </IonButton>
                          ))}
                        </div>
                      </div>

                      {/* Monto Personalizado */}
                      <div>
                        <p className="text-slate-300 text-sm mb-2">
                          Monto: ${investmentAmount.toLocaleString()}
                        </p>
                        <IonRange
                          min={100}
                          max={50000}
                          step={100}
                          value={investmentAmount}
                          onIonChange={(e) => setInvestmentAmount(e.detail.value as number)}
                        />
                        <IonInput
                          type="number"
                          value={investmentAmount}
                          onIonChange={(e) => setInvestmentAmount(Number(e.detail.value) || 5000)}
                          className="mt-2"
                        />
                      </div>

                      {/* Proyección */}
                      <div className="bg-slate-700 p-3 rounded-lg border border-cyan-500">
                        <div className="flex justify-between mb-2">
                          <span className="text-slate-300">Inversión Inicial</span>
                          <span className="text-white font-bold">${investmentAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-slate-300">Retorno Estimado</span>
                          <span className="text-green-400 font-bold">
                            ${calculateProjectedReturn().toLocaleString()}
                          </span>
                        </div>
                        <div className="border-t border-slate-600 pt-2 flex justify-between">
                          <span className="text-cyan-300 font-bold">Valor Total</span>
                          <span className="text-cyan-300 font-bold text-lg">
                            ${getTotalValue().toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Términos */}
                      <div className="flex items-center gap-2 pt-2">
                        <IonCheckbox
                          checked={termsAccepted}
                          onIonChange={(e) => setTermsAccepted(e.detail.checked)}
                        />
                        <span className="text-sm text-slate-300">
                          Acepto los términos y condiciones
                        </span>
                      </div>

                      {/* Botón de Inversión */}
                      <IonButton
                        expand="block"
                        color="success"
                        size="large"
                        onClick={handleInvest}
                        disabled={!termsAccepted || investmentAmount < 100}
                      >
                        💰 Invertir Ahora
                      </IonButton>
                    </div>
                  </IonCardContent>
                </IonCard>
              </div>
            </IonContent>
          </>
        )}
      </IonModal>
    </IonContent>
  );
};
