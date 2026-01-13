import React, { useState } from 'react';
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonRange,
} from '@ionic/react';
import { add, close } from 'ionicons/icons';
import { Crop, AgroScore } from '../../types';
import { AgroScoreGauge, ProductCard, EmptyState } from '../ui/SharedComponents';

// Mock data
const MOCK_AGROSCORE: AgroScore = {
  total: 979,
  productiveHistory: 95,
  financialHealth: 88,
  zoneRisk: 92,
  landValidation: 96,
  tips: [
    '🌱 Optimiza el riego: Tu humedad del suelo está en 58%, considera aumentar a 65%.',
    '💧 Diversifica cultivos: Actualmente tienes solo maíz y soya. Considera añadir café.',
    '📊 Mejora registros: Digitaliza tu cuaderno agrícola para mejor trazabilidad.',
    '💰 Acceso a financiamiento: Con tu AgroScore 979, califica para microcréditos'
  ]
};

const MOCK_CROPS: Crop[] = [
  {
    id: '1',
    name: 'Maíz Híbrido',
    area: 15,
    progress: 65,
    score: 8.5,
    status: 'growing',
    plantDate: '2024-01-15',
    expectedHarvestDate: '2024-06-15'
  },
  {
    id: '2',
    name: 'Soya',
    area: 8,
    progress: 10,
    score: 9.2,
    status: 'growing',
    plantDate: '2024-03-01',
    expectedHarvestDate: '2024-08-01'
  }
];

interface AgricultorViewProps {
  onShowChat: () => void;
}

export const AgricultorView: React.FC<AgricultorViewProps> = ({ onShowChat }) => {
  const [crops, setCrops] = useState<Crop[]>(MOCK_CROPS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [newCropName, setNewCropName] = useState('');
  const [newCropArea, setNewCropArea] = useState(10);
  const [showScoreDetails, setShowScoreDetails] = useState(false);

  const handleAddCrop = () => {
    if (!newCropName.trim()) return;

    const newCrop: Crop = {
      id: (crops.length + 1).toString(),
      name: newCropName,
      area: newCropArea,
      progress: 0,
      score: 7.5,
      status: 'planning',
      plantDate: new Date().toISOString().split('T')[0],
      expectedHarvestDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0]
    };

    setCrops([...crops, newCrop]);
    setNewCropName('');
    setNewCropArea(10);
    setIsModalOpen(false);
  };

  const getStatusIcon = (status: string) => {
    const icons: Record<string, string> = {
      planning: '📋',
      growing: '🌱',
      harvesting: '🚜',
      completed: '✅'
    };
    return icons[status] || '📋';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      planning: 'Planificación',
      growing: 'Crecimiento',
      harvesting: 'Cosecha',
      completed: 'Completado'
    };
    return labels[status] || status;
  };

  return (
    <IonContent className="bg-gradient-to-b from-lime-50 to-white">
      <div className="space-y-4 p-4 pb-20">
        {/* Saludo y resumen rápido */}
        <div className="gradient-agricultor text-white rounded-2xl p-6 shadow-lg animate-slide-in-down">
          <h2 className="text-3xl font-bold">¡Hola, Carlos! 👨‍🌾</h2>
          <p className="text-lime-100 mt-2 font-semibold">Tu AgroScore: 979 / 1000 ⭐</p>
          <p className="text-lime-100 text-sm mt-1">Clasificación: Excelente</p>
        </div>

        {/* Card de AgroScore */}
        <IonCard 
          className="cursor-pointer card-elevated hover:shadow-2xl transition-all animate-slide-in-up"
          onClick={() => setShowScoreDetails(true)}
        >
          <IonCardContent className="pt-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">Tu AgroScore</h3>
            <div className="flex justify-center">
              <AgroScoreGauge 
                score={MOCK_AGROSCORE.total}
                maxScore={1000}
                size="large"
                showLabel={true}
              />
            </div>
            <p className="text-center text-xs text-gray-500 mt-6 font-semibold">
              👆 Toca para ver detalles completos
            </p>
          </IonCardContent>
        </IonCard>

        {/* Modal de Detalles de Score */}
        <IonModal isOpen={showScoreDetails} onDidDismiss={() => setShowScoreDetails(false)}>
          <IonHeader className="gradient-agricultor text-white shadow-lg">

            <IonToolbar className="bg-transparent">
              <IonTitle>Detalles de AgroScore</IonTitle>
              <IonButton
                slot="end"
                fill="clear"
                color="light"
                onClick={() => setShowScoreDetails(false)}
              >
                <IonIcon icon={close} />
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="p-4 space-y-4">
              {/* Componentes del Score */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Componentes</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Histórico Productivo', value: MOCK_AGROSCORE.productiveHistory, emoji: '🌾' },
                    { label: 'Salud Financiera', value: MOCK_AGROSCORE.financialHealth, emoji: '💰' },
                    { label: 'Riesgo de Zona', value: MOCK_AGROSCORE.zoneRisk, emoji: '📍' },
                    { label: 'Validación de Tierras', value: MOCK_AGROSCORE.landValidation, emoji: '🛂' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-semibold text-gray-700">{item.emoji} {item.label}</p>
                        <p className="text-lg font-bold text-lime-600">{item.value}</p>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div
                          className="bg-lime-600 h-2 rounded-full"
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips de Mejora */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">💡 Tips para Mejorar</h3>
                <div className="space-y-2">
                  {MOCK_AGROSCORE.tips.map((tip, idx) => (
                    <div key={idx} className="bg-blue-50 border-l-4 border-blue-600 p-3">
                      <p className="text-sm text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              <IonButton fill="outline" onClick={() => setShowScoreDetails(false)}>
                Cerrar
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

        {/* Resumen Rápido */}
        <IonCard>
          <IonCardContent>
            <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Resumen</h3>
            <IonGrid className="p-0">
              <IonRow>
                <IonCol size="6">
                  <div className="text-center p-3 bg-lime-50 rounded-lg">
                    <p className="text-2xl font-bold text-lime-700">23 ha</p>
                    <p className="text-xs text-gray-600 mt-1">Total Sembrando</p>
                  </div>
                </IonCol>
                <IonCol size="6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-700">2</p>
                    <p className="text-xs text-gray-600 mt-1">Cultivos Activos</p>
                  </div>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-700">38%</p>
                    <p className="text-xs text-gray-600 mt-1">Progreso Total</p>
                  </div>
                </IonCol>
                <IonCol size="6">
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-700">24°C</p>
                    <p className="text-xs text-gray-600 mt-1">Clima Actual</p>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Mis Cultivos */}
        <div>
          <div className="flex justify-between items-center mb-3 px-2">
            <h3 className="text-lg font-bold text-gray-800">🌾 Mis Cultivos</h3>
            <IonButton size="small" fill="outline" onClick={() => setIsModalOpen(true)}>
              <IonIcon icon={add} />
            </IonButton>
          </div>

          {crops.length === 0 ? (
            <EmptyState 
              icon="🌱" 
              title="Sin cultivos registrados"
              description="Registra tu primer cultivo para comenzar"
            />
          ) : (
            <div className="space-y-3">
              {crops.map(crop => (
                <IonCard key={crop.id} className="shadow-sm cursor-pointer hover:shadow-md transition-all">
                  <IonCardContent>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{getStatusIcon(crop.status)}</span>
                          <div>
                            <p className="font-bold text-gray-800">{crop.name}</p>
                            <p className="text-xs text-gray-500">
                              {crop.area} ha • {getStatusLabel(crop.status)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-lime-600">{crop.score}</p>
                        <p className="text-xs text-gray-500">Score</p>
                      </div>
                    </div>

                    {/* Barra de progreso */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-xs text-gray-600">Progreso</p>
                        <p className="text-xs font-semibold text-gray-800">{crop.progress}%</p>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div
                          className="bg-lime-600 h-2 rounded-full"
                          style={{ width: `${crop.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>
              ))}
            </div>
          )}
        </div>

        {/* Modal para agregar cultivo */}
        <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
          <IonHeader className="bg-lime-600 text-white">
            <IonToolbar className="bg-transparent">
              <IonTitle>Nuevo Cultivo</IonTitle>
              <IonButton
                slot="end"
                fill="clear"
                color="light"
                onClick={() => setIsModalOpen(false)}
              >
                <IonIcon icon={close} />
              </IonButton>
            </IonToolbar>
          </IonHeader>

          <IonContent>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre del Cultivo
                </label>
                <IonInput
                  placeholder="Ej: Maíz Híbrido"
                  value={newCropName}
                  onIonChange={(e) => setNewCropName(e.detail.value || '')}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Área (hectáreas)
                </label>
                <IonRange
                  min={1}
                  max={100}
                  step={1}
                  value={newCropArea}
                  onIonChange={(e) => setNewCropArea(e.detail.value as number)}
                  className="py-4"
                />
                <p className="text-center text-sm text-gray-600">{newCropArea} ha</p>
              </div>

              <div className="flex gap-2 pt-4">
                <IonButton
                  fill="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1"
                >
                  Cancelar
                </IonButton>
                <IonButton
                  color="primary"
                  onClick={handleAddCrop}
                  disabled={!newCropName.trim()}
                  className="flex-1"
                >
                  Registrar
                </IonButton>
              </div>
            </div>
          </IonContent>
        </IonModal>
      </div>
    </IonContent>
  );
};
