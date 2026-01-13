import React from 'react';
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonAlert,
} from '@ionic/react';
import {
  logOut,
  notifications,
  shield,
  help,
  chevronForward,
  chevronBack
} from 'ionicons/icons';
import { User, UserRole } from '../../types';

interface ProfileProps {
  onLogout: () => void;
  userRole: UserRole;
}

// Mock user data
const MOCK_USER: User = {
  id: 'user-123',
  name: 'Carlos García López',
  email: 'carlos.garcia@agro-farm.com',
  phone: '+593 9 9812 3456',
  role: 'agricultor',
  location: 'Quevedo, Los Ríos',
  avatar: '👨‍🌾',
  joinDate: '2023-06-15',
  verified: true
};

export const Profile: React.FC<ProfileProps> = ({ onLogout, userRole }) => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [showLogoutAlert, setShowLogoutAlert] = React.useState(false);

  const handleLogout = () => {
    setShowLogoutAlert(false);
    onLogout();
  };

  const getRoleIcon = () => {
    const icons = {
      agricultor: '👨‍🌾',
      comprador: '🛒',
      inversionista: '💰'
    };
    return icons[userRole];
  };

  const getRoleLabel = () => {
    const labels = {
      agricultor: 'Agricultor',
      comprador: 'Comprador',
      inversionista: 'Inversionista'
    };
    return labels[userRole];
  };

  const joinDateFormatted = new Date(MOCK_USER.joinDate).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <IonContent className="bg-gray-50">
      <div className="space-y-4 p-4 pb-20">
        {/* Card de Perfil */}
        <IonCard className="bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg">
          <IonCardContent className="pt-6 pb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="text-6xl">{getRoleIcon()}</div>
                <div>
                  <h2 className="text-2xl font-bold">{MOCK_USER.name}</h2>
                  <p className="text-blue-100 text-sm mt-1">
                    {getRoleLabel()}
                    {MOCK_USER.verified && (
                      <span className="ml-2 text-xs bg-green-400 text-green-900 px-2 py-1 rounded-full">
                        ✓ Verificado
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Info de Perfil */}
            <div className="space-y-3 bg-blue-500 bg-opacity-30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm">
                <span>📧</span>
                <span>{MOCK_USER.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>📱</span>
                <span>{MOCK_USER.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>📍</span>
                <span>{MOCK_USER.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>📅</span>
                <span>Miembro desde {joinDateFormatted}</span>
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Sección de Configuración */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-3 px-2">
            ⚙️ Configuración
          </h3>

          <IonCard>
            <IonCardContent className="p-0">
              <IonList>
                <IonItem>
                  <IonLabel>
                    <IonIcon icon={notifications} className="mr-2 text-blue-600" />
                    Notificaciones
                  </IonLabel>
                  <IonToggle
                    slot="end"
                    checked={notificationsEnabled}
                    onIonChange={(e) => setNotificationsEnabled(e.detail.checked)}
                  />
                </IonItem>

                <IonItem button={true}>
                  <IonLabel>
                    <IonIcon icon={shield} className="mr-2 text-green-600" />
                    Seguridad y Privacidad
                  </IonLabel>
                  <IonIcon icon={chevronForward} slot="end" />
                </IonItem>

                <IonItem button={true}>
                  <IonLabel>
                    <IonIcon icon={help} className="mr-2 text-amber-600" />
                    Ayuda y Soporte
                  </IonLabel>
                  <IonIcon icon={chevronForward} slot="end" />
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Sección de Estadísticas (específica por rol) */}
        {userRole === 'agricultor' && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3 px-2">
              📊 Mi Desempeño
            </h3>
            <IonCard>
              <IonCardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-lime-50 rounded-lg">
                    <p className="text-3xl font-bold text-lime-700">979</p>
                    <p className="text-xs text-gray-600 mt-1">AgroScore</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-3xl font-bold text-blue-700">23</p>
                    <p className="text-xs text-gray-600 mt-1">Hectáreas</p>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        )}

        {userRole === 'comprador' && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3 px-2">
              🛍️ Mis Compras
            </h3>
            <IonCard>
              <IonCardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-emerald-50 rounded-lg">
                    <p className="text-3xl font-bold text-emerald-700">12</p>
                    <p className="text-xs text-gray-600 mt-1">Compras</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-3xl font-bold text-blue-700">$2.4K</p>
                    <p className="text-xs text-gray-600 mt-1">Invertido</p>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        )}

        {userRole === 'inversionista' && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3 px-2">
              💼 Mi Cartera
            </h3>
            <IonCard>
              <IonCardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-3xl font-bold text-blue-700">5</p>
                    <p className="text-xs text-gray-600 mt-1">Proyectos</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-3xl font-bold text-green-700">15.8%</p>
                    <p className="text-xs text-gray-600 mt-1">ROI Promedio</p>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        )}

        {/* Botón de Logout */}
        <div className="pt-4">
          <IonButton
            color="danger"
            onClick={() => setShowLogoutAlert(true)}
            fill="outline"
            className="w-full"
          >
            <IonIcon icon={logOut} />
            <span className="ml-2">Cerrar Sesión</span>
          </IonButton>
        </div>
      </div>

      {/* Alert de Logout */}
      <IonAlert
        isOpen={showLogoutAlert}
        onDidDismiss={() => setShowLogoutAlert(false)}
        header="Cerrar Sesión"
        message="¿Estás seguro de que deseas cerrar tu sesión?"
        buttons={[
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => setShowLogoutAlert(false)
          },
          {
            text: 'Sí, cerrar',
            role: 'destructive',
            handler: handleLogout
          }
        ]}
      />
    </IonContent>
  );
};
