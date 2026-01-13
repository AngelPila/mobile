import React, { useState, useEffect } from 'react';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonButton,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, people, person, sparkles } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';

// Componentes
import { Onboarding } from './components/Onboarding';
import { AgricultorView } from './components/views/AgricultorView';
import { CompradorView } from './components/views/CompradorView';
import { InversionistaView } from './components/views/InversionistaView';
import { CommunityFeed } from './components/CommunityFeed';
import { Profile } from './components/views/ProfileView';
import { AIChat } from './components/AIChat';
import { UserRole } from './types';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(() => {
    const saved = localStorage.getItem('userRole');
    return (saved as UserRole) || null;
  });
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (userRole) {
      localStorage.setItem('userRole', userRole);
    } else {
      localStorage.removeItem('userRole');
    }
  }, [userRole]);

  const handleCompleteOnboarding = (role: UserRole) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  if (!userRole) {
    return (
      <IonApp>
        <Onboarding onComplete={handleCompleteOnboarding} />
      </IonApp>
    );
  }

  const getTabBarColor = () => {
    const colors: Record<UserRole, string> = {
      agricultor: 'gradient-agricultor',
      comprador: 'gradient-comprador',
      inversionista: 'gradient-inversionista'
    };
    return colors[userRole];
  };

  const getHomeIcon = () => {
    const icons: Record<UserRole, string> = {
      agricultor: '🌾',
      comprador: '🛒',
      inversionista: '💼'
    };
    return icons[userRole];
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route
              exact
              path="/home"
              render={() => {
                if (userRole === 'agricultor') {
                  return <AgricultorView onShowChat={() => setIsChatOpen(true)} />;
                } else if (userRole === 'comprador') {
                  return <CompradorView onShowChat={() => setIsChatOpen(true)} />;
                } else if (userRole === 'inversionista') {
                  return <InversionistaView onShowChat={() => setIsChatOpen(true)} />;
                }
                return null;
              }}
            />
            <Route
              exact
              path="/community"
              render={() => <CommunityFeed userRole={userRole} />}
            />
            <Route
              exact
              path="/profile"
              render={() => (
                <Profile userRole={userRole} onLogout={handleLogout} />
              )}
            />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar
            slot="bottom"
            className={getTabBarColor()}
            color="light"
            style={{
              '--background': userRole === 'agricultor' 
                ? 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)'
                : userRole === 'comprador'
                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              boxShadow: '0 -10px 30px rgba(0,0,0,0.2)'
            } as any}
          >
            <IonTabButton tab="home" href="/home" className="hover:opacity-80 transition-opacity">
              <IonIcon icon={home} style={{ fontSize: '24px' }} />
              <IonLabel className="text-sm font-semibold">Inicio</IonLabel>
            </IonTabButton>

            <IonTabButton tab="community" href="/community" className="hover:opacity-80 transition-opacity">
              <IonIcon icon={people} style={{ fontSize: '24px' }} />
              <IonLabel className="text-sm font-semibold">Red</IonLabel>
            </IonTabButton>

            <IonTabButton tab="chat" onClick={() => setIsChatOpen(true)} className="hover:opacity-80 transition-opacity">
              <IonIcon icon={sparkles} style={{ fontSize: '24px' }} />
              <IonLabel className="text-sm font-semibold">IA</IonLabel>
            </IonTabButton>

            <IonTabButton tab="profile" href="/profile" className="hover:opacity-80 transition-opacity">
              <IonIcon icon={person} style={{ fontSize: '24px' }} />
              <IonLabel className="text-sm font-semibold">Perfil</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>

        {/* Chat Flotante */}
        <AIChat
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          userRole={userRole}
        />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;