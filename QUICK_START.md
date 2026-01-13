# 🚀 Quick Start - WAQI Ionic

## 30 segundos para empezar

### 1. Instalar dependencias (una sola vez)
```bash
npm install
```

### 2. Ejecutar en desarrollo
```bash
npm run dev
```

Abre http://localhost:5173 en tu navegador.

---

## 👥 Roles disponibles

### 👨‍🌾 Agricultor
- Dashboard con AgroScore
- Gestión de cultivos
- Publicar en marketplace
- Asesor agrícola (CampoIA)

### 🛒 Comprador
- Marketplace de productos
- Búsqueda y filtros
- Información de productores
- Asesor de mercado (MercadoIA)

### 💰 Inversionista
- Panel de inversiones
- Proyectos con análisis de riesgo
- Calculadora de ROI
- Asesor financiero (RiskAI)

---

## 🔧 Configuración de API (Opcional)

Para usar el asistente IA con respuestas reales:

1. Crear archivo `.env.local`:
```
VITE_GEMINI_API_KEY=tu_api_key_aqui
```

2. Obtener API Key:
   - Ir a https://aistudio.google.com/app/apikey
   - Crear nueva API Key
   - Copiar valor

Sin API Key, la app usa respuestas simuladas que funcionan perfectamente.

---

## 📱 Compilar para Mobile

### Android
```bash
npm run build
npx cap build android
npx cap open android
```

### iOS
```bash
npm run build
npx cap build ios
npx cap open ios
```

---

## 🧪 Testing

```bash
# Tests unitarios
npm run test.unit

# Tests E2E
npm run test.e2e

# Linting
npm run lint
```

---

## 📚 Documentación Completa

- **WAQI_README.md** - Descripción completa del proyecto
- **TECHNICAL_GUIDE.md** - Arquitectura y desarrollo
- **Este archivo** - Quick start

---

## 💡 Tips Útiles

### Limpiar caché y reinstalar
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build para producción
```bash
npm run build
```
Salida en: `dist/`

### Previsualizar build
```bash
npm run preview
```

### Reset de la app (localStorage)
- Abrir DevTools (F12)
- Console: `localStorage.clear()`
- Recargar página

---

## 🐛 Troubleshooting

**¿La app no compila?**
```bash
npm run build
```
Esto te mostrará los errores específicos.

**¿No ves cambios?**
- Guarda el archivo
- La app recarga automáticamente en desarrollo
- En navegador: Ctrl+Shift+R (hard refresh)

**¿Problemas con dependencias?**
```bash
npm audit fix
npm install
```

**¿Module not found?**
```bash
# Reinstalar
rm -rf node_modules
npm install
```

---

## 🌟 Demo Rápida

1. Inicia `npm run dev`
2. Verás pantalla de onboarding
3. Selecciona un rol (ej: "Agricultor")
4. Explora las pestañas:
   - **Inicio**: Dashboard específico del rol
   - **Comunidad**: Red social
   - **IA**: Chat con asistente (sin API Key usa respuestas mock)
   - **Perfil**: Información y configuración

---

## 📧 Datos de Ejemplo Incluidos

**Productos**:
- Maíz: $18.50/qq
- Cacao: $150/qq
- Soya: $22/qq
- Banano: $8/caja

**Proyectos**:
- Expansión Bananera (ROI 12-15%, Riesgo Bajo)
- Tecnificación Arrocera (ROI 16-20%, Riesgo Medio)
- Cacaotal Premium (ROI 18-25%, Riesgo Alto)

**Usuarios Mock**:
- Carlos García López (Agricultor)
- Various Farming Operations

---

## 🔗 Links Útiles

- [Ionic Framework](https://ionicframework.com)
- [React Documentation](https://react.dev)
- [Capacitor](https://capacitorjs.com)
- [Google AI Studio](https://aistudio.google.com)

---

¡Disfruta desarrollando WAQI! 🚀
