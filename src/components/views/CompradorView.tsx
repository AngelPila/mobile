import React, { useState } from 'react';
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { close, call, mail } from 'ionicons/icons';
import { Product } from '../../types';
import { ProductCard, AgroScoreGauge, EmptyState } from '../ui/SharedComponents';

// Mock products
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Maíz Amarillo',
    category: 'granos',
    price: 18.5,
    unit: 'qq',
    quantity: 50,
    location: 'Ventanas, Los Ríos',
    producerId: 'farmer1',
    producerName: 'Finca La Esperanza',
    producerScore: 950,
    availableFrom: '2024-01-15',
    availableUntil: '2024-02-15',
    description: 'Maíz híbrido de excelente calidad, cosecha reciente con certificación de sanidad.',
    harvestHistory: 'Cosechado: 10 de enero, 2024',
    emoji: '🌽'
  },
  {
    id: '2',
    name: 'Cacao CCN51',
    category: 'cacao',
    price: 150,
    unit: 'qq',
    quantity: 30,
    location: 'Machala, El Oro',
    producerId: 'farmer2',
    producerName: 'Agropecuaria San Juan',
    producerScore: 880,
    availableFrom: '2024-01-20',
    availableUntil: '2024-03-20',
    description: 'Cacao de alta calidad, certificado orgánico con trazabilidad completa.',
    harvestHistory: 'Cosechado: 5 de enero, 2024',
    emoji: '🍫'
  },
  {
    id: '3',
    name: 'Soya Grano',
    category: 'granos',
    price: 22,
    unit: 'qq',
    quantity: 100,
    location: 'Quevedo, Los Ríos',
    producerId: 'farmer3',
    producerName: 'Hnos. Garzón',
    producerScore: 910,
    availableFrom: '2024-01-10',
    availableUntil: '2024-02-10',
    description: 'Soya de primer grado, libre de plagas y enfermedades, listo para procesamiento.',
    harvestHistory: 'Cosechado: 8 de enero, 2024',
    emoji: '🫘'
  },
  {
    id: '4',
    name: 'Banano Cavendish',
    category: 'frutas',
    price: 8,
    unit: 'caja',
    quantity: 200,
    location: 'Puerto López, Santa Elena',
    producerId: 'farmer4',
    producerName: 'Expobanano Ecuador',
    producerScore: 930,
    availableFrom: '2024-01-15',
    availableUntil: '2024-01-31',
    description: 'Banano Cavendish grado exportación, madurez óptima, excelente presentación.',
    harvestHistory: 'Cosechado: 12 de enero, 2024',
    emoji: '🍌'
  }
];

const CATEGORIES = ['todos', 'granos', 'cacao', 'frutas', 'otros'];

interface CompradorViewProps {
  onShowChat: () => void;
}

export const CompradorView: React.FC<CompradorViewProps> = ({ onShowChat }) => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
    const matchesSearch = searchText === '' || 
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.location.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  return (
    <IonContent className="bg-gradient-to-b from-emerald-50 to-white">
      <div className="space-y-5 p-4 pb-20">
        {/* Saludo */}
        <div className="gradient-comprador text-white rounded-3xl p-8 shadow-lg animate-slide-in-down">
          <h2 className="text-4xl font-bold mb-2">¡Bienvenido! 🛒</h2>
          <p className="text-emerald-100 text-base">Descubre productos verificados de agricultores de confianza</p>
        </div>

        {/* Buscador */}
        <IonSearchbar
          value={searchText}
          onIonChange={(e) => setSearchText(e.detail.value || '')}
          placeholder="🔍 Buscar productos o ubicación..."
          className="bg-white rounded-2xl shadow-md"
        />

        {/* Filtros por categoría */}
        <div className="bg-white p-4 rounded-2xl shadow-md border border-emerald-100">
          <p className="text-sm font-semibold text-gray-700 mb-3">Filtrar por categoría:</p>
          <IonSegment 
            value={selectedCategory}
            onIonChange={(e) => setSelectedCategory(e.detail.value as string)}
            className="max-w-full"
          >
            {CATEGORIES.map(cat => (
              <IonSegmentButton key={cat} value={cat} className="text-xs">
                <IonLabel>{cat.charAt(0).toUpperCase() + cat.slice(1)}</IonLabel>
              </IonSegmentButton>
            ))}
          </IonSegment>
        </div>

        {/* Resultados */}
        <div>
          <p className="text-sm text-gray-600 mb-3">
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </p>

          {filteredProducts.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="Sin productos"
              description="No hay productos que coincidan con tu búsqueda"
            />
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredProducts.map(product => (
                <IonCard
                  key={product.id}
                  className="cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => handleProductClick(product)}
                >
                  <IonCardContent>
                    <div className="flex gap-4">
                      {/* Emoji del producto */}
                      <div className="flex-shrink-0 text-4xl flex items-center">
                        {product.emoji}
                      </div>

                      {/* Información del producto */}
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{product.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          📍 {product.location}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Productor: {product.producerName}
                        </p>

                        {/* Precio y disponibilidad */}
                        <div className="flex justify-between items-end mt-3">
                          <div>
                            <p className="text-lg font-bold text-emerald-600">
                              ${product.price}/{product.unit}
                            </p>
                            <p className="text-xs text-gray-500">
                              Stock: {product.quantity} {product.unit}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 justify-end">
                              <span className="text-xs text-yellow-600">⭐</span>
                              <span className="text-sm font-bold text-gray-800">
                                {product.producerScore}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Detalle del Producto */}
      <IonModal isOpen={isDetailOpen} onDidDismiss={() => setIsDetailOpen(false)}>
        {selectedProduct && (
          <>
            <IonHeader className="bg-emerald-600 text-white">
              <IonToolbar className="bg-transparent">
                <IonTitle>{selectedProduct.name}</IonTitle>
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

            <IonContent>
              <div className="space-y-4 p-4">
                {/* Header con emoji */}
                <div className="text-center p-6 bg-emerald-50 rounded-lg">
                  <div className="text-6xl mb-2">{selectedProduct.emoji}</div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-gray-600 mt-2">{selectedProduct.category}</p>
                </div>

                {/* Precio y Disponibilidad */}
                <IonCard className="bg-gradient-to-r from-emerald-50 to-teal-50">
                  <IonCardContent>
                    <IonGrid className="p-0">
                      <IonRow>
                        <IonCol size="6">
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Precio</p>
                            <p className="text-2xl font-bold text-emerald-600 mt-1">
                              ${selectedProduct.price}
                            </p>
                            <p className="text-xs text-gray-600">por {selectedProduct.unit}</p>
                          </div>
                        </IonCol>
                        <IonCol size="6">
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Disponible</p>
                            <p className="text-2xl font-bold text-blue-600 mt-1">
                              {selectedProduct.quantity}
                            </p>
                            <p className="text-xs text-gray-600">{selectedProduct.unit}</p>
                          </div>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>

                {/* Información del Productor */}
                <IonCard>
                  <IonCardContent>
                    <h3 className="font-bold text-gray-800 mb-3">👨‍🌾 Productor</h3>
                    <div className="bg-emerald-50 p-4 rounded-lg space-y-2">
                      <p className="font-semibold text-gray-800">{selectedProduct.producerName}</p>
                      <p className="text-sm text-gray-600">📍 {selectedProduct.location}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600">⭐</span>
                        <span className="font-bold text-gray-800">AgroScore: {selectedProduct.producerScore}/1000</span>
                      </div>
                      <div className="mt-3">
                        <AgroScoreGauge
                          score={selectedProduct.producerScore}
                          maxScore={1000}
                          size="small"
                          showLabel={false}
                        />
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>

                {/* Detalles del Producto */}
                <IonCard>
                  <IonCardContent>
                    <h3 className="font-bold text-gray-800 mb-3">📋 Detalles</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-600">Descripción</p>
                        <p className="text-gray-700 mt-1">{selectedProduct.description}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600">Historial de Cosecha</p>
                        <p className="text-gray-700 mt-1">{selectedProduct.harvestHistory}</p>
                      </div>
                      <div className="pt-2 border-t border-gray-200">
                        <p className="text-sm font-semibold text-gray-600">Disponibilidad</p>
                        <p className="text-gray-700 mt-1">
                          Del {new Date(selectedProduct.availableFrom).toLocaleDateString('es-ES')} 
                          {' '}al {new Date(selectedProduct.availableUntil).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>

                {/* Botones de Contacto */}
                <div className="space-y-3 pb-6">
                  <IonButton expand="block" color="primary" size="large">
                    <IonIcon icon={call} />
                    <span className="ml-2">Llamar al Productor</span>
                  </IonButton>
                  <IonButton expand="block" color="secondary" fill="outline" size="large">
                    <IonIcon icon={mail} />
                    <span className="ml-2">Enviar Mensaje</span>
                  </IonButton>
                </div>
              </div>
            </IonContent>
          </>
        )}
      </IonModal>
    </IonContent>
  );
};
