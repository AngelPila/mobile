# WAQI - World Agricultural Quality Index

Plataforma agrícola multiplataforma desarrollada con **Ionic y Capacitor** que conecta agricultores, compradores e inversionistas en un ecosistema transparente y confiable basado en el **AgroScore** - un sistema de puntuación que valida la credibilidad y capacidad productiva de los agricultores.

## 🌍 Descripción General

WAQI es una solución completa para el ecosistema agrícola que permite:

- **👨‍🌾 Agricultores**: Gestionar cultivos, construir su reputación (AgroScore) y acceder a nuevos mercados
- **🛒 Compradores**: Encontrar productos verificados de productores confiables
- **💰 Inversionistas**: Analizar y financiar proyectos agrícolas rentables

## 🎯 Características Principales

### 1. Sistema de AgroScore ⭐
- Puntuación de 0-1000 basada en:
  - Histórico Productivo (95%)
  - Salud Financiera (88%)
  - Riesgo de Zona (92%)
  - Validación de Tierras (96%)
- Evaluación cualitativa: Excelente (800+), Bueno (600-799), Riesgo (<600)
- Tips personalizados para mejora continua

### 2. Dashboard de Agricultor 👨‍🌾
- Visualización de AgroScore detallado
- Gestión de cultivos (registro, monitoreo, progreso)
- Cuaderno agrícola digital
- Opción de publicar al marketplace
- Datos climáticos en tiempo real (integrable)
- 23 hectáreas de cultivos activos (maíz, soya)

### 3. Marketplace de Comprador 🛒
- Catálogo de productos agrícolas verificados
- Búsqueda y filtros avanzados (categoría, ubicación, precio)
- Información detallada del productor con AgroScore
- Datos de disponibilidad y historial de cosecha
- Contacto directo con productores
- Productos: Maíz, Cacao, Soya, Banano, etc.

### 4. Panel de Inversionista 💼
- Cartera de inversiones personalizada
- Gráficos de tendencias de mercado
- Listado de proyectos con análisis de riesgo
- Cálculo de ROI estimado (12-25%)
- Calculadora interactiva de inversión
- Clasificación de riesgo: Bajo, Medio, Alto
- Información del agricultor y financiamiento

### 5. Red Social Agrícola 🤝
- Feed de posts de la comunidad
- Tipos: Venta, Compra, Inversión, Anuncios
- Sistema de likes y comentarios
- Filtros por categoría
- Timeline relativa de publicaciones

### 6. Asistente de IA Inteligente 🤖
- **CampoIA**: Asesor agronómico para agricultores
  - Consejos sobre cultivos, riego, fertilización
  - Recomendaciones basadas en clima tropical
  
- **MercadoIA**: Analista de mercado para compradores
  - Información de precios en tiempo real
  - Análisis de tendencias
  - Recomendaciones de proveedores
  
- **RiskAI**: Asesor financiero para inversionistas
  - Análisis de riesgo de proyectos
  - Proyecciones de ROI
  - Viabilidad financiera

**Integración**: Google Gemini API con fallback a respuestas contextualizadas

### 7. Perfil de Usuario 👤
- Información personal y de cuenta
- Verificación de usuario
- AgroScore visible
- Configuración de notificaciones
- Seguridad y privacidad
- Estadísticas personalizadas por rol
- Cierre de sesión

## 🏗️ Arquitectura del Proyecto

```
/workspaces/mobile
├── src/
│   ├── components/
│   │   ├── Onboarding.tsx           # Flujo inicial de bienvenida
│   │   ├── AIChat.tsx                # Chat flotante con IA
│   │   ├── CommunityFeed.tsx         # Red social
│   │   ├── views/
│   │   │   ├── AgricultorView.tsx    # Dashboard agricultor
│   │   │   ├── CompradorView.tsx     # Marketplace
│   │   │   ├── InversionistaView.tsx # Panel inversiones
│   │   │   └── ProfileView.tsx       # Perfil de usuario
│   │   └── ui/
│   │       └── SharedComponents.tsx  # Componentes reutilizables
│   ├── services/
│   │   └── gemini.ts                 # Integración con Gemini AI
│   ├── types/
│   │   └── index.ts                  # Interfaces TypeScript
│   ├── App.tsx                       # Componente raíz y navegación
│   ├── main.tsx                      # Entry point
│   └── theme/
│       └── variables.css             # Variables CSS globales
├── public/
│   └── manifest.json                 # Manifest para PWA
├── package.json                      # Dependencias
├── tsconfig.json                     # Configuración TypeScript
├── vite.config.ts                    # Configuración Vite
├── capacitor.config.ts               # Configuración Capacitor
└── README.md                         # Esta documentación
```

## 💻 Stack Tecnológico

### Framework Frontend
- **Ionic React** 8.5.0 - Framework UI híbrido
- **React** 19.0.0 - Librería de interfaz
- **TypeScript** 5.9 - Lenguaje con tipos

### Navegación y Enrutamiento
- **React Router** 5.3.4 - Enrutamiento de la aplicación
- **Ionic Router** 8.5.0 - Router especializado para Ionic

### Mobile/Capacitor
- **Capacitor** 8.0.0 - Capa nativa multiplataforma
  - App
  - Core
  - Haptics
  - Keyboard
  - Status Bar

### Estilos y UI
- **Tailwind CSS** (mediante Ionic) - Estilos utilitarios
- **Ionicons** 7.4.0 - Iconografía

### IA y APIs
- **Google Generative AI** 0.24.1 - Integración con Gemini
- **Fallback responses** - Respuestas simuladas sin API

### Build y Desarrollo
- **Vite** 5.0.0 - Empaquetador ultra-rápido
- **ESLint** 9.20.1 - Análisis de código
- **TypeScript Compiler** - Compilación

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 18+ y npm
- Git

### Instalación
```bash
# Clonar el repositorio (si aplica)
cd /workspaces/mobile

# Instalar dependencias
npm install

# (Opcional) Instalar Capacitor CLI
npm install -g @capacitor/cli
```

### Desarrollo
```bash
# Ejecutar servidor de desarrollo
npm run dev

# Abrir en navegador (típicamente http://localhost:5173)
```

### Build
```bash
# Compilar para producción
npm run build

# Previsualizar compilación
npm run preview

# Build para Android/iOS (con Capacitor)
npx cap build android
# o
npx cap build ios
```

### Testing
```bash
# Tests unitarios
npm run test.unit

# Tests E2E con Cypress
npm run test.e2e
```

## 🔐 Configuración de APIs

### Google Gemini API
1. Obtener API Key en [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Crear archivo `.env.local` en la raíz:
   ```
   VITE_GEMINI_API_KEY=tu_api_key_aqui
   ```
3. La aplicación funcionará en modo fallback sin API Key configurada

## 🎨 Paleta de Colores por Rol

| Rol | Primario | Secundario | Descripción |
|-----|----------|-----------|------------|
| 👨‍🌾 Agricultor | Lima (#65a30d) | Green (#a3e635) | Tonos verdes naturales |
| 🛒 Comprador | Emerald (#059669) | Teal (#10b981) | Tonos verdes de confianza |
| 💰 Inversionista | Blue (#2563eb) | Cyan (#22d3ee) | Tonos azules profesionales |

## 📊 Data Mock

La aplicación incluye data simulada para demostración:

### Agricultores
- Finca La Esperanza (AgroScore: 950)
- Hnos. Garzón (AgroScore: 910)

### Productos
- Maíz Amarillo: $18.50/qq (50 quintales)
- Cacao CCN51: $150/qq (30 quintales)
- Soya: $22/qq (100 quintales)
- Banano: $8/caja (200 cajas)

### Proyectos de Inversión
- Expansión Bananera: ROI 12-15%, Riesgo Bajo
- Tecnificación Arrocera: ROI 16-20%, Riesgo Medio
- Cacaotal Premium: ROI 18-25%, Riesgo Alto

## 🔄 Flujo de Navegación

```
Inicio (Sin autenticación)
    ↓
Onboarding (3 slides + selección de rol)
    ↓
    ├─→ 👨‍🌾 Agricultor
    │   ├─ Inicio: Dashboard con AgroScore
    │   ├─ Comunidad: Red social
    │   ├─ IA: CampoIA Assistant
    │   └─ Perfil: Datos personales
    │
    ├─→ 🛒 Comprador
    │   ├─ Inicio: Marketplace
    │   ├─ Comunidad: Red social
    │   ├─ IA: MercadoIA Assistant
    │   └─ Perfil: Datos personales
    │
    └─→ 💰 Inversionista
        ├─ Inicio: Panel de inversiones
        ├─ Comunidad: Red social
        ├─ IA: RiskAI Assistant
        └─ Perfil: Cartera de inversiones
```

## 🛠️ Componentes Principales

### UIComponents (`shared/SharedComponents.tsx`)
- **AgroScoreGauge**: Visualización circular de puntuación
- **ProductCard**: Card para productos
- **CategoryBadge**: Badge de categoría de post
- **LoadingSpinner**: Indicador de carga
- **EmptyState**: Estado vacío

### Onboarding
- Slides de introducción
- Selección de rol
- Persistencia en localStorage

### Chat IA
- Modal flotante
- Historial de conversación
- Respuestas contextualizadas por rol
- Auto-scroll y loading indicator

### Community Feed
- Filtros por tipo
- Búsqueda
- Like y comentarios
- Creación de posts

## 📱 Responsive Design

La aplicación está optimizada para:
- ✅ Móviles (iOS/Android vía Capacitor)
- ✅ Tablets
- ✅ Web (PWA)

## 🚧 Mejoras Futuras

- [ ] Autenticación real con backend
- [ ] Notificaciones push
- [ ] Geolocalización para ubicación de cultivos
- [ ] Cámara para fotos de productos
- [ ] Mensajería directa entre usuarios
- [ ] Historial de transacciones
- [ ] Más métricas agroclimáticas
- [ ] Certificaciones y sellos de calidad
- [ ] Pago integrado
- [ ] Analytics y reportes avanzados

## 📝 Licencia

Este proyecto fue desarrollado como una solución educativa para la plataforma WAQI.

## 👨‍💻 Autor

Desarrollado con Ionic y Capacitor como tecnologías híbridas para máxima compatibilidad multiplataforma.

---

**Versión**: 1.0.0  
**Última actualización**: Enero 2026  
**Estado**: ✅ Compilación exitosa
