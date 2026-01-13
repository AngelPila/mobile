import React, { useState } from 'react';
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonTextarea,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from '@ionic/react';
import { heart, chatbubble, share, close, add } from 'ionicons/icons';
import { Post, PostType } from '../types';
import { CategoryBadge, EmptyState } from './ui/SharedComponents';

// Mock data de posts
const MOCK_POSTS: Post[] = [
  {
    id: '1',
    authorId: 'user1',
    author: 'Juan Pérez',
    authorRole: 'agricultor',
    content: '¿Cuál es el mejor precio cierre de maíz en Quevedo hoy? Tengo 20 quintales listos para vender 🌽',
    type: 'sale',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 24,
    comments: 5,
    liked: false
  },
  {
    id: '2',
    authorId: 'user2',
    author: 'AgroInsumos SA',
    authorRole: 'comprador',
    content: 'Compramos soya de alta calidad en grandes cantidades. Interesados comunicarse con nosotros. 🛒',
    type: 'purchase',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    likes: 18,
    comments: 3,
    liked: false
  },
  {
    id: '3',
    authorId: 'user3',
    author: 'Maria López',
    authorRole: 'inversionista',
    content: 'Busco proyectos de cacao CCN51 con AgroScore superior a 850. Presupuesto disponible: $50,000. 💰',
    type: 'investment',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    likes: 42,
    comments: 8,
    liked: false
  },
  {
    id: '4',
    authorId: 'user4',
    author: 'Finca La Esperanza',
    authorRole: 'agricultor',
    content: '📢 Aviso: Alerta de plagas detectadas en sector norte. Recomendación: aplicar fungicida en próximos 5 días.',
    type: 'announcement',
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    likes: 12,
    comments: 4,
    liked: false
  }
];

interface CommunityFeedProps {
  userRole: string;
}

export const CommunityFeed: React.FC<CommunityFeedProps> = ({ userRole }) => {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostType, setNewPostType] = useState<PostType>('sale');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [filterType, setFilterType] = useState<PostType | 'all'>('all');

  const handleLike = (postId: string) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
    }
    setLikedPosts(newLiked);

    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + (newLiked.has(postId) ? 1 : -1) }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: (posts.length + 1).toString(),
      authorId: 'current-user',
      author: 'Tu Nombre',
      authorRole: userRole as any,
      content: newPostContent,
      type: newPostType,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      liked: false
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setNewPostType('sale');
    setIsModalOpen(false);
  };

  const getTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'hace unos segundos';
    if (seconds < 3600) return `hace ${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)}h`;
    return `hace ${Math.floor(seconds / 86400)}d`;
  };

  const filteredPosts = filterType === 'all' 
    ? posts 
    : posts.filter(post => post.type === filterType);

  return (
    <IonContent className="bg-gradient-to-b from-slate-50 to-white">
      {/* Botón flotante para crear post */}
      <div className="sticky top-4 right-4 z-10 flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-14 h-14 rounded-full gradient-agricultor text-white shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center"
        >
          <IonIcon icon={add} style={{ fontSize: '28px' }} />
        </button>
      </div>

      {/* Filtros */}
      <div className="p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
        <IonSegment value={filterType} onIonChange={(e) => setFilterType(e.detail.value as any)} className="bg-gray-100 rounded-lg">
          <IonSegmentButton value="all">
            <IonLabel className="font-semibold">Todos</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="sale">
            <IonLabel className="font-semibold">🌾 Ventas</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="purchase">
            <IonLabel className="font-semibold">🛒 Compras</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="investment">
            <IonLabel className="font-semibold">💰 Inv.</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </div>

      {/* Posts */}
      <div className="p-4 space-y-4 pb-20">
        {filteredPosts.length === 0 ? (
          <EmptyState 
            icon="📭" 
            title="No hay posts"
            description="Sé el primero en compartir algo"
          />
        ) : (
          filteredPosts.map((post, idx) => (
            <IonCard key={post.id} className="card-elevated animate-slide-in-up" style={{ animationDelay: `${idx * 50}ms` }}>
              <IonCardContent className="pt-4">
                {/* Header del post */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">
                        {post.authorRole === 'agricultor' ? '👨‍🌾' :
                         post.authorRole === 'comprador' ? '🛒' : '💰'}
                      </span>
                      <div>
                        <p className="font-semibold text-gray-800">{post.author}</p>
                        <p className="text-xs text-gray-500">{getTimeAgo(post.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                  <CategoryBadge type={post.type} />
                </div>

                {/* Contenido del post */}
                <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

                {/* Acciones */}
                <div className="flex gap-4 pt-3 border-t border-gray-100 text-gray-600">
                  <IonButton
                    fill="clear"
                    size="small"
                    onClick={() => handleLike(post.id)}
                    className={likedPosts.has(post.id) ? 'text-red-500' : ''}
                  >
                    <IonIcon 
                      icon={heart}
                      style={{ 
                        fill: likedPosts.has(post.id) ? 'currentColor' : 'none'
                      }}
                    />
                    <span className="ml-2 text-xs">{post.likes}</span>
                  </IonButton>

                  <IonButton fill="clear" size="small">
                    <IonIcon icon={chatbubble} />
                    <span className="ml-2 text-xs">{post.comments}</span>
                  </IonButton>

                  <IonButton fill="clear" size="small">
                    <IonIcon icon={share} />
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          ))
        )}
      </div>

      {/* Modal para crear post */}
      <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
        <IonHeader className="bg-blue-600 text-white">
          <IonToolbar className="bg-transparent">
            <IonTitle>Nuevo Post</IonTitle>
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
                Tipo de Post
              </label>
              <IonSegment 
                value={newPostType} 
                onIonChange={(e) => setNewPostType(e.detail.value as PostType)}
              >
                <IonSegmentButton value="sale">
                  <IonLabel>🌾 Venta</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="purchase">
                  <IonLabel>🛒 Compra</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="investment">
                  <IonLabel>💰 Inversión</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="announcement">
                  <IonLabel>📢 Aviso</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contenido
              </label>
              <IonTextarea
                placeholder="Cuéntanos algo..."
                value={newPostContent}
                onIonChange={(e) => setNewPostContent(e.detail.value || '')}
                rows={6}
              />
            </div>

            <div className="flex gap-2">
              <IonButton 
                fill="outline" 
                onClick={() => setIsModalOpen(false)}
                className="flex-1"
              >
                Cancelar
              </IonButton>
              <IonButton 
                color="primary"
                onClick={handleCreatePost}
                disabled={!newPostContent.trim()}
                className="flex-1"
              >
                Publicar
              </IonButton>
            </div>
          </div>
        </IonContent>
      </IonModal>
    </IonContent>
  );
};
