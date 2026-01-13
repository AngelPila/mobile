# 📐 Diagrama de Arquitectura - WAQI

## Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                    APLICACIÓN WAQI                           │
│                  (Ionic + React + TypeScript)                │
└─────────────────────────────────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                │                       │
        ┌───────▼────────┐      ┌──────▼──────────┐
        │   FRONTEND     │      │  SERVICIOS      │
        │   (Componentes)│      │  (Lógica)       │
        └────────────────┘      └─────────────────┘
                │                       │
                │                       ├─→ gemini.ts (AI)
                │                       ├─→ API REST (Futuro)
                └───────────────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        │                                       │
    ┌───▼────┐                          ┌──────▼──────┐
    │localStorage│                      │ Google Gemini│
    │(Persistencia)│                    │   API        │
    └──────────┘                        └──────────────┘
```

## Componentes Principales

```
                        APP.tsx (Raíz)
                            │
            ┌───────────────┼───────────────┐
            │               │               │
        ┌───▼──┐       ┌────▼─────┐   ┌───▼──┐
        │ Tabs │       │ Router   │   │ Chat │
        └──────┘       └──────────┘   │ IA   │
            │                         └──────┘
    ┌───────┼────────┬────────┬─────────┐
    │       │        │        │         │
    ▼       ▼        ▼        ▼         ▼
  Home  Community Profile  (Modal)  (Modal)
   │
   ├─→ 👨‍🌾 AgricultorView
   │      ├─ Dashboard
   │      ├─ AgroScore Gauge
   │      ├─ Cultivos (CRUD)
   │      └─ Estadísticas
   │
   ├─→ 🛒 CompradorView
   │      ├─ Marketplace
   │      ├─ Search/Filter
   │      ├─ Product Details
   │      └─ Producer Info
   │
   └─→ 💰 InversionistaView
          ├─ Portfolio
          ├─ Chart (SVG)
          ├─ Projects
          └─ Calculator
```

## Flujo de Datos

```
Usuario
  │
  ├─ Abre App
  │   └─ localStorage.getItem('userRole')
  │       ├─ SI: Muestra Dashboard
  │       └─ NO: Muestra Onboarding
  │
  ├─ Selecciona Rol
  │   └─ localStorage.setItem('userRole')
  │       └─ App Re-renderiza
  │
  ├─ Navega entre tabs
  │   └─ IonTabs maneja enrutamiento
  │
  ├─ Abre Chat IA
  │   ├─ Escribe mensaje
  │   └─ sendMessage() → Gemini API
  │       ├─ CON API Key: Respuesta real
  │       └─ SIN API Key: Respuesta mock
  │
  └─ Cierra Sesión
      └─ localStorage.removeItem('userRole')
          └─ Muestra Onboarding
```

## Estructura de Carpetas Detallada

```
src/
├── components/
│   ├── Onboarding.tsx ........................ ← Bienvenida inicial
│   ├── AIChat.tsx ........................... ← Chat flotante con IA
│   ├── CommunityFeed.tsx .................... ← Red social (todos los roles)
│   │
│   ├── views/ (Específicas por rol)
│   │   ├── AgricultorView.tsx ............... ← Dashboard agricultor
│   │   │   ├─ AgroScore Gauge
│   │   │   ├─ Gestión de Cultivos
│   │   │   └─ Modales
│   │   │
│   │   ├── CompradorView.tsx ............... ← Marketplace
│   │   │   ├─ Búsqueda y Filtros
│   │   │   ├─ Grid de Productos
│   │   │   └─ Modal Detalle
│   │   │
│   │   ├── InversionistaView.tsx ........... ← Panel Inversiones
│   │   │   ├─ Cartera Resumen
│   │   │   ├─ Chart SVG
│   │   │   └─ Calculadora
│   │   │
│   │   └── ProfileView.tsx ................. ← Perfil Usuario
│   │       ├─ Información Personal
│   │       ├─ Configuración
│   │       └─ Logout
│   │
│   └── ui/
│       └── SharedComponents.tsx ............ ← Componentes reutilizables
│           ├─ AgroScoreGauge
│           ├─ ProductCard
│           ├─ CategoryBadge
│           ├─ LoadingSpinner
│           └─ EmptyState
│
├── services/
│   ├── gemini.ts ........................... ← Integración con IA
│   │   ├─ sendMessage()
│   │   └─ getGreeting()
│   │
│   └── index.ts ............................ ← Exportar servicios
│
├── types/
│   └── index.ts ............................ ← Interfaces TypeScript
│       ├─ UserRole
│       ├─ User
│       ├─ AgroScore
│       ├─ Crop
│       ├─ Product
│       ├─ InvestmentProject
│       ├─ Post
│       └─ ChatMessage
│
├── theme/
│   └── variables.css ....................... ← Estilos globales
│
├── pages/ (Deprecated)
│   └── Tab1, Tab2, Tab3
│
├── App.tsx ................................ ← Componente raíz
├── main.tsx ............................... ← Entry point
└── vite-env.d.ts .......................... ← Tipos Vite
```

## Stack Técnico por Capa

```
┌─────────────────────────────────────────┐
│           UI Layer                      │
│  ┌─────────────────────────────────────┐│
│  │   Ionic Components + React           ││
│  │   Tailwind CSS + Ionicons            ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
              │
┌─────────────▼─────────────────────────────┐
│        Application Layer                 │
│  ┌─────────────────────────────────────┐ │
│  │  Components (View Logic)            │ │
│  │  State Management (Hooks + Local)   │ │
│  │  Navigation (Ionic Router)          │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
              │
┌─────────────▼─────────────────────────────┐
│        Service Layer                    │
│  ┌─────────────────────────────────────┐ │
│  │  gemini.ts (AI Service)             │ │
│  │  API Integration (Future)           │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
              │
┌─────────────▼─────────────────────────────┐
│        Data Layer                       │
│  ┌─────────────────────────────────────┐ │
│  │  localStorage (Persistencia)        │ │
│  │  Mock Data (Demo)                   │ │
│  │  Future: Backend REST/GraphQL       │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
              │
┌─────────────▼─────────────────────────────┐
│        External Services                │
│  ┌─────────────────────────────────────┐ │
│  │  Google Generative AI (Gemini)      │ │
│  │  Backend API (Future)               │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## Flujo de Navegación

```
Aplicación
    │
    ├─ ¿userRole en localStorage?
    │   │
    │   ├─ NO → Mostrar Onboarding
    │   │        │
    │   │        ├─ Slide 1: Introducción WAQI
    │   │        ├─ Slide 2: Sistema AgroScore
    │   │        ├─ Slide 3: Selección de Rol
    │   │        │
    │   │        └─ Usuario selecciona rol
    │   │            └─ Guardar en localStorage
    │   │
    │   └─ SÍ → Mostrar Dashboard (según rol)
    │           │
    │           └─ Tabs
    │               ├─ Home (Dashboard específico)
    │               ├─ Community (Feed social)
    │               ├─ IA (Chat modal)
    │               └─ Profile (Perfil usuario)
    │
    └─ Usuario
        ├─ Navega entre tabs
        ├─ Abre modales (detalle producto, nuevo cultivo, etc)
        ├─ Interactúa con IA
        ├─ Cierra sesión
        │   └─ localStorage.removeItem('userRole')
        │       └─ Vuelve a Onboarding
        └─ Cierra app
            └─ Estado persiste en localStorage
```

## Patrones de Diseño Utilizados

### 1. Component Pattern
```
App (Contenedor)
  │
  ├─ Onboarding (Presentacional)
  ├─ AgricultorView (Contenedor)
  │   ├─ AgroScoreGauge (Presentacional)
  │   ├─ ProductCard (Presentacional)
  │   └─ Modalidad (Contenedor de Modal)
  └─ ...
```

### 2. Props Drilling (Para userRole)
```
App ──userRole──→ View ──userRole──→ Component
```

### 3. State Lifting
```
App (Global State)
  │
  ├─ userRole (localStorage)
  ├─ isChatOpen (Modal)
  └─ [Future: Auth, User Profile]
```

### 4. Service Layer
```
Component → Service → API/Data
  (View)   (Logic)   (Source)
```

### 5. Fallback Pattern (AI)
```
sendMessage()
  │
  ├─ ¿API Key válida?
  │   ├─ SÍ → Gemini API → Respuesta real
  │   └─ NO → Fallback → Respuesta mock
  │
  └─ return: string
```

## Puntos de Extensión

```
Futuro Backend
    │
    ├─ Autenticación Real
    │   └─ services/auth.ts
    │
    ├─ Base de Datos
    │   └─ services/api.ts
    │
    ├─ WebSocket (Mensajería)
    │   └─ services/messaging.ts
    │
    ├─ Notificaciones Push
    │   └─ services/notifications.ts
    │
    ├─ Geolocalización
    │   └─ services/location.ts
    │
    ├─ Pagos
    │   └─ services/payments.ts
    │
    └─ Analytics
        └─ services/analytics.ts
```

## Ciclo de Vida de Componente

```
Componente
    │
    ├─ mount (useEffect)
    │   └─ Inicializar estado
    │
    ├─ render
    │   └─ Mostrar UI
    │
    ├─ event listener (onClick, onSubmit, etc)
    │   └─ Actualizar estado
    │
    ├─ re-render
    │   └─ Mostrar cambios
    │
    └─ unmount
        └─ Limpiar recursos
```

## Optimizaciones Potenciales

```
Performance
    │
    ├─ Code Splitting
    │   └─ Dynamic import() para vistas
    │
    ├─ Lazy Loading
    │   └─ React.lazy() para componentes
    │
    ├─ Memoization
    │   └─ React.memo() para componentes puros
    │
    ├─ Virtual Scrolling
    │   └─ Para listas largas
    │
    └─ Image Optimization
        └─ WebP, lazy loading
```

---

**Versión**: 1.0  
**Actualizado**: Enero 2026  
**Compilación**: ✓ Exitosa
