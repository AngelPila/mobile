╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║                         📱 WAQI - EXECUTION GUIDE 📱                          ║
║                   (World Agricultural Quality Index)                          ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝

## 🎯 OPCIONES DE EJECUCIÓN

### OPCIÓN 1: Desarrollo Web (Recomendado para comenzar)

```bash
cd /workspaces/mobile
npm run dev
```

✓ Abre http://localhost:5173 automáticamente
✓ Hot reload activado (cambios se actualizan automáticamente)
✓ DevTools disponibles en navegador

**Pantalla esperada:**
1. Onboarding con 3 slides
2. Selecciona un rol: Agricultor, Comprador o Inversionista
3. Ves el dashboard específico de tu rol

---

### OPCIÓN 2: Previsualizar Build Producción

```bash
npm run build
npm run preview
```

✓ Abre http://localhost:4173
✓ Muestra la versión compilada (más rápida)
✓ Prueba de cómo se verá en producción

---

### OPCIÓN 3: Compilar para Android

**Requisitos:**
- Android Studio instalado
- JDK configurado
- Android SDK

**Pasos:**
```bash
npm run build
npx cap build android
npx cap open android
```

✓ Se abrirá Android Studio
✓ Presiona Run para instalar en emulador o dispositivo

---

### OPCIÓN 4: Compilar para iOS

**Requisitos:**
- macOS
- Xcode instalado

**Pasos:**
```bash
npm run build
npx cap build ios
npx cap open ios
```

✓ Se abrirá Xcode
✓ Presiona Run para instalar en simulador o dispositivo

---

## 🧪 PRUEBA LA APLICACIÓN

### Flujo Recomendado

1. **Onboarding** (Automático la primera vez)
   - Lee los 3 slides (Swipe derecha para avanzar)
   - Selecciona un rol: por ejemplo, "Agricultor"

2. **Explora Agricultor** (si seleccionaste ese rol)
   - **Pestaña Inicio**: Ver AgroScore, cultivos
   - Haz clic en AgroScore para ver detalles
   - Haz clic en + para agregar un nuevo cultivo
   
3. **Explore Marketplace** (o selecciona Comprador)
   - **Pestaña Inicio**: Ver productos disponibles
   - Busca productos (ej: "maíz")
   - Filtra por categoría
   - Haz clic en un producto para ver detalles

4. **Panelista de Inversiones** (o selecciona Inversionista)
   - **Pestaña Inicio**: Ver proyectos
   - Observa gráfico de tendencias
   - Haz clic en un proyecto para detalles
   - Usa calculadora de inversión

5. **Red Social** (En cualquier rol)
   - **Pestaña Comunidad**: Ver posts de otros
   - Filtra por tipo (Venta, Compra, Inversión)
   - Haz clic en + para crear nuevo post
   - Dale like a posts

6. **Asistente IA** (En cualquier rol)
   - **Pestaña IA**: Abre chat flotante
   - Escribe un mensaje (ej: "¿Cómo abonar el maíz?")
   - Recibe respuesta personalizada según tu rol
   - Sin API Key = respuestas simuladas (funcionan igual)
   - Con API Key = respuestas del modelo Gemini

7. **Perfil de Usuario** (En cualquier rol)
   - **Pestaña Perfil**: Ve tu información
   - Configura notificaciones
   - Haz clic "Cerrar Sesión"
   - Vuelve al Onboarding

---

## 🔐 API Key Opcional

### Para usar IA en tiempo real (sin API Key funciona igual)

1. Ve a https://aistudio.google.com/app/apikey
2. Crea una nueva API Key
3. Copia el valor
4. En la carpeta `/workspaces/mobile` crea archivo `.env.local`:
   ```
   VITE_GEMINI_API_KEY=tu_clave_aqui
   ```
5. Reinicia el servidor: `npm run dev`

---

## 📊 DATOS DE PRUEBA DISPONIBLES

### Agricultores (Para Comprador)
- **Finca La Esperanza** - AgroScore 950
- **Agropecuaria San Juan** - AgroScore 880
- **Hnos. Garzón** - AgroScore 910

### Productos (Marketplace)
1. **Maíz Amarillo** - $18.50/qq
2. **Cacao CCN51** - $150/qq
3. **Soya** - $22/qq
4. **Banano** - $8/caja

### Proyectos (Inversionista)
1. **Expansión Bananera** - ROI 12-15%, Riesgo Bajo
2. **Tecnificación Arrocera** - ROI 16-20%, Riesgo Medio
3. **Cacaotal Premium** - ROI 18-25%, Riesgo Alto

---

## 🛠️ TROUBLESHOOTING

### Error: "Port 5173 already in use"
```bash
# Mata el proceso
lsof -ti :5173 | xargs kill -9
npm run dev
```

### Error: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Cambios no se reflejan
```bash
# Hard refresh en navegador
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

### Resetear la app (borrar datos guardados)
```javascript
// En consola del navegador (F12)
localStorage.clear()
location.reload()
```

### Build muy lento
```bash
# Limpia caché de Vite
rm -rf node_modules/.vite
npm run build
```

---

## 💻 COMPATIBILIDAD

| Dispositivo | Estado | Notas |
|------------|--------|-------|
| Chrome Desktop | ✓ Perfecto | Recomendado para desarrollo |
| Firefox Desktop | ✓ Perfecto | Alternativa |
| Safari | ✓ Compatible | Puede tener algunas diferencias |
| Android | ✓ Compatible | Requiere compilación con Capacitor |
| iOS | ✓ Compatible | Requiere compilación con Capacitor |
| Tablet | ✓ Responsive | Optimizado para todos los tamaños |

---

## 📈 MÉTRICAS DE COMPILACIÓN

```
Compilación TypeScript: ✓
Bundle Size: ~880 KB (879.28 KB JS)
Gzip: ~213 KB
Módulos: 255
Tiempo Build: ~25 segundos
Errores: 0
Warnings: Chunk size (esperado)
```

---

## 🎨 PERSONALIZACIONES POR ROL

### Agricultor 👨‍🌾
- Color Primario: Lima (#65a30d)
- Dashboard: AgroScore, cultivos, estadísticas
- IA: CampoIA (consejos agronómicos)
- Acciones: Registrar cultivos, publicar al marketplace

### Comprador 🛒
- Color Primario: Emerald (#059669)
- Dashboard: Marketplace, búsqueda de productos
- IA: MercadoIA (análisis de precios)
- Acciones: Buscar, filtrar, contactar productores

### Inversionista 💼
- Color Primario: Blue (#2563eb)
- Background: Oscuro (slate-900)
- Dashboard: Cartera, proyectos, gráficos
- IA: RiskAI (análisis de riesgo)
- Acciones: Analizar, invertir, calcular ROI

---

## 🔄 CICLO DE DESARROLLO TÍPICO

```
1. npm run dev
   ↓
2. Abre http://localhost:5173
   ↓
3. Edita archivos en src/
   ↓
4. Cambios se guardan automáticamente
   ↓
5. Navegador actualiza automáticamente (hot reload)
   ↓
6. ¿Listo? npm run build para producción
```

---

## 📝 COMANDOS ÚTILES

```bash
# Desarrollo
npm run dev              # Servidor desarrollo con hot reload

# Build
npm run build           # Compilar para producción
npm run preview         # Ver build localmente

# Testing
npm run test.unit       # Tests unitarios
npm run test.e2e        # Tests end-to-end

# Linting
npm run lint            # Análisis de código

# Mobile
npx cap build android   # Compilar para Android
npx cap build ios       # Compilar para iOS
npx cap sync            # Sincronizar archivos
```

---

## 🌐 URLs IMPORTANTES

| Recurso | URL |
|---------|-----|
| Desarrollo Local | http://localhost:5173 |
| Preview Build | http://localhost:4173 |
| Docs Ionic | https://ionicframework.com |
| React Docs | https://react.dev |
| Capacitor Docs | https://capacitorjs.com |
| Google AI | https://aistudio.google.com |

---

## ✨ CARACTERÍSTICAS A EXPLORAR

1. **AgroScore Detallado**
   - Haz clic en el gauge circular
   - Ve breakdown de componentes
   - Lee tips personalizados

2. **Modales Anidados**
   - Detalle de producto
   - Detalle de proyecto
   - Nuevo cultivo
   - Nuevo post

3. **Calculadora Interactiva**
   - En panel de inversionista
   - Ajusta monto con slider
   - Ve ROI en tiempo real

4. **Chat IA Conversacional**
   - Mantén conversación
   - Respuestas contextualizadas
   - Historial preservado

5. **Red Social Real**
   - Crea posts
   - Dale like
   - Filtra por categoría

---

## 📊 EJEMPLO DE INTERACCIÓN

**Usuario: Agricultor**
```
Abre app → Onboarding → Selecciona "Agricultor"
    ↓
Dashboard muestra:
- AgroScore 979/1000 (Excelente)
- 2 cultivos activos
- 23 hectáreas sembrando
- Botón para ver detalles
    ↓
Haz clic en detalles de AgroScore:
- Ver breakdown de 4 componentes
- Leer 4 tips de mejora personalizados
    ↓
Haz clic en pestaña "IA":
- Abre chat flotante
- Pregunta: "¿Cómo combatir plagas del maíz?"
- Recibe respuesta de CampoIA
- Mantén conversación
    ↓
Haz clic en pestaña "Comunidad":
- Ve posts de otros agricultores
- Crea un nuevo post tipo "Venta"
- Dale like a posts que te interesan
```

---

## 🎓 PARA APRENDER LA ARQUITECTURA

Archivos a revisar en este orden:

1. **src/types/index.ts** - Entiende las interfaces
2. **src/App.tsx** - Entiende la navegación
3. **src/components/Onboarding.tsx** - Primer flujo
4. **src/components/views/AgricultorView.tsx** - Ejemplo de vista
5. **src/components/ui/SharedComponents.tsx** - Componentes reutilizables
6. **src/services/gemini.ts** - Integración con IA

---

## 🚀 LISTO PARA PRODUCCIÓN

Para deployar:

```bash
# 1. Compilar
npm run build

# 2. Copiar dist/ a tu servidor web
# (GitHub Pages, Netlify, Vercel, Firebase, etc)

# 3. Para Mobile:
npm run build
npx cap build android
# Firmar y distribuir en Google Play

npm run build
npx cap build ios
# Enviar a App Store
```

---

╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║              ¡Ahora ejecuta "npm run dev" y disfruta! 🎉                     ║
║                                                                               ║
║         La aplicación está completamente funcional y lista para usar          ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝

Versión: 1.0.0
Última actualización: Enero 2026
Status: ✅ Completa y Funcional
