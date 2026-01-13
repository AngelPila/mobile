// Tipos de usuario
export type UserRole = 'agricultor' | 'comprador' | 'inversionista';

// Usuario
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  location: string;
  avatar?: string;
  joinDate: string;
  verified: boolean;
}

// AgroScore
export interface AgroScore {
  total: number; // 0-1000
  productiveHistory: number;
  financialHealth: number;
  zoneRisk: number;
  landValidation: number;
  tips: string[];
}

// Cultivo
export interface Crop {
  id: string;
  name: string;
  area: number; // hectáreas
  progress: number; // 0-100
  score: number;
  status: 'planning' | 'growing' | 'harvesting' | 'completed';
  plantDate: string;
  expectedHarvestDate: string;
}

// Producto/Lote
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string; // qq (quintal), kg, etc
  quantity: number;
  location: string;
  producerId: string;
  producerName: string;
  producerScore: number;
  availableFrom: string;
  availableUntil: string;
  description: string;
  harvestHistory: string;
  emoji?: string;
}

// Proyecto de Inversión
export interface InvestmentProject {
  id: string;
  title: string;
  description: string;
  farmer: {
    name: string;
    location: string;
    score: number;
  };
  targetAmount: number;
  fundedAmount: number;
  fundingPercentage: number;
  roi: {
    min: number;
    max: number;
  };
  riskLevel: 'low' | 'medium' | 'high';
  duration: string; // ej: "12 meses"
  investorCount: number;
  agroScore: number;
}

// Post de Comunidad
export type PostType = 'sale' | 'purchase' | 'investment' | 'announcement';

export interface Post {
  id: string;
  authorId: string;
  author: string;
  authorRole: UserRole;
  content: string;
  type: PostType;
  createdAt: string;
  likes: number;
  comments: number;
  liked?: boolean;
}

// Mensaje del Chat
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// Contexto de Chat por Rol
export interface ChatContext {
  role: UserRole;
  temperature: number;
  systemPrompt: string;
}
