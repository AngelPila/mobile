#!/bin/bash
# Script de inicio rápido para WAQI Ionic

echo "🌾 WAQI - Plataforma Agrícola Ionic"
echo "===================================="
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    exit 1
fi

echo "✓ Node.js $(node -v)"
echo "✓ npm $(npm -v)"
echo ""

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error en instalación"
    exit 1
fi

echo ""
echo "✓ Instalación completada"
echo ""

# Mostrar opciones
echo "🚀 Próximos pasos:"
echo ""
echo "Para desarrollo:"
echo "  npm run dev"
echo ""
echo "Para compilar:"
echo "  npm run build"
echo ""
echo "Para Mobile (Android):"
echo "  npm run build"
echo "  npx cap build android"
echo ""
echo "Para Mobile (iOS):"
echo "  npm run build"
echo "  npx cap build ios"
echo ""
echo "Variables de entorno:"
echo "  1. Copiar .env.example a .env.local"
echo "  2. Agregar tu VITE_GEMINI_API_KEY"
echo ""
echo "📚 Documentación:"
echo "  - WAQI_README.md (Descripción general)"
echo "  - TECHNICAL_GUIDE.md (Guía técnica)"
echo ""
