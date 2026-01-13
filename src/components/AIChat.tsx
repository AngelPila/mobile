import React, { useState, useRef, useEffect } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonButton,
  IonInput,
  IonIcon,
} from '@ionic/react';
import { close, send } from 'ionicons/icons';
import { UserRole, ChatMessage } from '../types';
import { sendMessage, getGreeting } from '../services/gemini';
import { LoadingSpinner } from './ui/SharedComponents';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: UserRole;
}

export const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose, userRole }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef<HTMLIonContentElement>(null);
  const [initialized, setInitialized] = useState(false);

  // Inicializar con saludo
  useEffect(() => {
    if (isOpen && !initialized) {
      const greeting = getGreeting(userRole);
      setMessages([{
        id: '0',
        role: 'assistant',
        content: greeting,
        timestamp: new Date().toISOString()
      }]);
      setInitialized(true);
    }
  }, [isOpen, initialized, userRole]);

  // Auto-scroll al nuevo mensaje
  useEffect(() => {
    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.scrollToBottom(300);
      }
    }, 100);
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await sendMessage(inputValue, userRole, messages);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleColor = () => {
    const colors = {
      agricultor: 'bg-lime-600',
      comprador: 'bg-emerald-600',
      inversionista: 'bg-blue-600'
    };
    return colors[userRole];
  };

  const getRoleNames = {
    agricultor: '🌾 CampoIA',
    comprador: '🛒 MercadoIA',
    inversionista: '💰 RiskAI'
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} className="ion-modal-custom">
      <IonHeader className={`${getRoleColor()} text-white shadow-lg`}>
        <IonToolbar className="bg-transparent">
          <IonTitle className="font-bold text-xl">{getRoleNames[userRole]}</IonTitle>
          <IonButton
            slot="end"
            fill="clear"
            color="light"
            onClick={onClose}
          >
            <IonIcon icon={close} style={{ fontSize: '24px' }} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent ref={contentRef} className="bg-gradient-to-b from-slate-50 to-white">
        <div className="p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-in-up`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-2xl shadow-md transition-all ${
                  msg.role === 'user'
                    ? `${getRoleColor()} text-white rounded-br-none`
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                }`}
              >
                <p className="text-sm leading-relaxed break-words">{msg.content}</p>
                <p className={`text-xs mt-2 font-semibold ${
                  msg.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {new Date(msg.timestamp).toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-none shadow-md">
                <LoadingSpinner />
              </div>
            </div>
          )}
        </div>
      </IonContent>

      <IonFooter className="bg-white border-t border-gray-200 shadow-xl">
        <div className="p-4 flex gap-2">
          <IonInput
            placeholder="💬 Escribe tu mensaje..."
            value={inputValue}
            onIonChange={(e) => setInputValue(e.detail.value || '')}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !isLoading) {
                handleSendMessage();
              }
            }}
            disabled={isLoading}
            className="bg-gray-100 rounded-lg"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              !inputValue.trim() || isLoading
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-agricultor text-white hover:shadow-lg active:scale-95'
            }`}
          >
            <IonIcon icon={send} />
          </button>
        </div>
      </IonFooter>
    </IonModal>
  );
};
