# Guía Técnica - WAQI Ionic

## Descripción General de la Arquitectura

WAQI es una aplicación multiplataforma construida con Ionic y Capacitor que implementa un patrón de arquitectura basado en componentes React con enrutamiento nativo de Ionic.

## Estructura de Carpetas

```
src/
├── components/              # Componentes React
│   ├── Onboarding.tsx      # Pantalla de bienvenida
│   ├── AIChat.tsx          # Chat flotante IA
│   ├── CommunityFeed.tsx   # Feed social
│   ├── views/              # Vistas principales por rol
│   │   ├── AgricultorView.tsx
│   │   ├── CompradorView.tsx
│   │   ├── InversionistaView.tsx
│   │   └── ProfileView.tsx
│   └── ui/                 # Componentes compartidos
│       └── SharedComponents.tsx
├── services/               # Lógica de negocio
│   └── gemini.ts          # Integración con IA
├── types/                  # Definiciones TypeScript
│   └── index.ts           # Interfaces compartidas
├── theme/                  # Estilos globales
│   └── variables.css
├── pages/                  # (Deprecated - usar views/)
├── App.tsx                 # Componente raíz
├── main.tsx                # Entry point
└── vite-env.d.ts          # Tipos Vite
```

## Sistema de Enrutamiento

### Rutas Principales
```
/home        → Vista según rol (Agricultor/Comprador/Inversionista)
/community   → Feed social
/profile     → Perfil de usuario
/            → Redirige a /home
```

### Navegación por Pestaña
La navegación se realiza mediante `IonTabs` con 4 pestaña:
1. **Home** - Dashboard específico del rol
2. **Comunidad** - Feed social compartido
3. **IA** - Abre chat flotante (no es una ruta, es modal)
4. **Perfil** - Información de usuario

## Gestión de Estado

### localStorage
```typescript
// Guardar rol del usuario
localStorage.setItem('userRole', role)

// Recuperar al iniciar
const saved = localStorage.getItem('userRole')
```

### Estado Local (React Hooks)
```typescript
const [userRole, setUserRole] = useState<UserRole | null>(null)
const [isChatOpen, setIsChatOpen] = useState(false)
```

### Props Drilling
Los componentes reciben `userRole` para personalización según rol.

## Componentes Clave

### Onboarding.tsx
**Responsabilidades**:
- 3 slides informativos
- Selector de rol (agricultor, comprador, inversionista)
- Trigger: `onComplete(role)`

**Props**:
```typescript
interface OnboardingProps {
  onComplete: (role: UserRole) => void
}
```

### AgricultorView.tsx
**Características**:
- AgroScore gauge personalizado
- Gestión de cultivos (CRUD)
- Modal para agregar cultivo
- Resumen de estadísticas
- Detalles de puntuación con breakdown

### CompradorView.tsx
**Características**:
- Searchbar para búsqueda de productos
- Filtros por categoría
- Grid de productos
- Modal con detalles del producto
- Información del productor con AgroScore

### InversionistaView.tsx
**Características**:
- Cartera resumen
- Gráfico SVG de tendencias
- Lista de proyectos
- Modal con calculadora de inversión
- Análisis de riesgo

### CommunityFeed.tsx
**Características**:
- Filtros por tipo de post
- Crear nuevo post (modal)
- Like y comentarios
- Timeline relativa

### Profile.tsx
**Características**:
- Información personal
- Configuración (notificaciones, seguridad)
- Estadísticas por rol
- Logout con confirmación

## Servicios

### gemini.ts
Integraciones con la IA Gemini de Google:

```typescript
// Enviar mensaje a IA
sendMessage(userMessage, userRole, conversationHistory)
// Retorna: string (respuesta del modelo)

// Obtener saludo inicial
getGreeting(userRole)
// Retorna: string (saludo personalizado)
```

**Modos**:
1. **Modo API**: Si tiene `VITE_GEMINI_API_KEY` válido
2. **Modo Fallback**: Respuestas mock predefinidas

**Prompts por rol**:
- **agricultor**: CampoIA - Asesor agronómico
- **comprador**: MercadoIA - Analista de mercado
- **inversionista**: RiskAI - Asesor financiero

## Tipos TypeScript

### Principales
```typescript
type UserRole = 'agricultor' | 'comprador' | 'inversionista'
type PostType = 'sale' | 'purchase' | 'investment' | 'announcement'
type RiskLevel = 'low' | 'medium' | 'high'
```

### Interfaces
- `User` - Información de usuario
- `AgroScore` - Puntuación agrícola
- `Crop` - Cultivo del agricultor
- `Product` - Producto en marketplace
- `InvestmentProject` - Proyecto de inversión
- `Post` - Publicación en comunidad
- `ChatMessage` - Mensaje de IA

## Estilización

### Ionic Components
Se usan componentes nativos de Ionic:
- `IonButton`, `IonCard`, `IonInput`, `IonModal`
- `IonTabs`, `IonTabBar`, `IonContent`
- etc.

### Tailwind CSS
Clases utilitarias para personalización:
```typescript
className="bg-lime-600 text-white p-4 rounded-lg"
```

### Variables CSS Personalizadas
En `theme/variables.css` para temas por rol.

## Flujo de Autenticación

**Actual**: Simulado con localStorage
**Futuro**: Integración con backend real

```
Usuario abre app
    ↓
localStorage.getItem('userRole')
    ↓
    ├─ Si existe → Muestra dashboard
    └─ Si no existe → Muestra Onboarding
        ↓
    Usuario selecciona rol
        ↓
    localStorage.setItem('userRole', role)
        ↓
    App se renderiza con rol
```

## Integraciones Externas

### Google Generative AI
**Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`

**Parámetros**:
- `systemInstruction` - Prompt personalizado por rol
- `contents` - Historial de mensajes
- `generationConfig` - Max tokens, temperature

**Variables de entorno**:
```
VITE_GEMINI_API_KEY=<tu_key>
```

## Capacitor Configuration

Archivos de configuración Capacitor:
- `capacitor.config.ts` - Config general
- `ionic.config.json` - Config Ionic
- `.env` - Variables de entorno

## Build y Deployment

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build  # → dist/
npm run preview  # Previsualizar

# Con Capacitor
npx cap build android
npx cap build ios
```

### Problemas Comunes

**Chunk Size Warning**
- Esperado en build
- Se puede reducir con code-splitting dinámico

**TypeScript Errors**
- Ejecutar: `npm run build` para verificar

**Import Paths**
- Usar rutas relativas: `../../types`
- No usar alias (@/) sin configurar en Vite

## Performance

### Optimizaciones Aplicadas
- Lazy loading de modales
- Memoización de componentes (si es necesario)
- Virtual scrolling en listas largas (implementable)

### Posibles Mejoras
- Code-splitting dinámico
- Image lazy loading
- Service Worker para offline
- Compresión de datos

## Testing

### Unit Tests (Vitest)
```bash
npm run test.unit
```

### E2E Tests (Cypress)
```bash
npm run test.e2e
```

### Ubicación
```
cypress/
├── e2e/
│   └── test.cy.ts
├── fixtures/
│   └── example.json
└── support/
    ├── commands.ts
    └── e2e.ts
```

## Debugging

### Console Logs
Usar en desarrollo:
```typescript
console.log('Debug info:', data)
```

### React DevTools
Instalar extensión en navegador.

### Network Inspector
Ver requests a Gemini API en devtools.

## Convenciones

### Nombres de Archivos
- Componentes: `PascalCase` (ej: `AgricultorView.tsx`)
- Servicios: `camelCase` (ej: `gemini.ts`)
- Tipos: `camelCase` (ej: `index.ts`)

### Tipos
```typescript
// ✓ Bueno
interface ComponentProps {
  title: string
  onClose: () => void
}

// ✗ Evitar
interface Props {
  title: any
  onClose?: any
}
```

### Componentes
```typescript
// ✓ Bueno
export const MyComponent: React.FC<Props> = ({ title }) => (
  <div>{title}</div>
)

// ✗ Evitar
function MyComponent(props: any) {
  return <div>{props.title}</div>
}
```

## Próximos Pasos de Desarrollo

1. **Backend Real**
   - API REST para usuarios, cultivos, productos
   - Autenticación JWT
   - Database (PostgreSQL)

2. **Notificaciones**
   - Push notifications con Capacitor
   - In-app notifications

3. **Offline Mode**
   - Service Worker
   - Sincronización local-servidor

4. **Geocodificación**
   - Geolocalización de cultivos
   - Mapas integrados

5. **Pagos**
   - Stripe/PayPal integration
   - Procesamiento de inversiones

## Referencias

- [Documentación Ionic](https://ionicframework.com/docs)
- [Documentación React](https://react.dev)
- [Documentación Capacitor](https://capacitorjs.com)
- [Google Generative AI](https://ai.google.dev)
- [Tailwind CSS](https://tailwindcss.com)
