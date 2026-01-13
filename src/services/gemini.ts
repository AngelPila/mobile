import { UserRole, ChatMessage } from '../types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'TU_API_KEY_AQUI';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Prompts personalizados por rol
const PROMPTS: Record<UserRole, string> = {
  agricultor: `Eres "CampoIA", un experto en ingeniería agronómica especializado en cultivos ecuatorianos. 
Proporciona consejos prácticos sobre cultivos como maíz, soya, cacao y banano. 
Contexto: Clima tropical ecuatoriano, 24°C, humedad 65%.
Las respuestas deben ser concisas, prácticas y en español.`,
  
  comprador: `Eres "MercadoIA", un analista de mercado agrícola ecuatoriano.
Ayuda a los compradores a encontrar los mejores productos y precios.
Proporciona información sobre mercados, tendencias de precios y calidad de productos.
Las respuestas deben ser objetivas y estar enfocadas en el comercio agrícola.`,
  
  inversionista: `Eres "RiskAI", un asesor financiero especializado en inversiones agrícolas.
Analiza riesgos de proyectos agrícolas, proyecciones de ROI y viabilidad financiera.
Considera factores climáticos, de mercado y financieros en tus análisis.
Las respuestas deben ser profesionales y basadas en datos.`
};

// Respuestas fallback por rol
const FALLBACK_RESPONSES: Record<UserRole, string[]> = {
  agricultor: [
    "🌽 El maíz necesita riego cada 3-4 días en clima tropical. Mantén humedad entre 60-70%.",
    "💧 Para una buena cosecha, aplica fertilizante NPK 10-30-10 al inicio de siembra.",
    "🚜 El control de plagas es clave. Usa trampas amarillas para mosca blanca en cultivos tempranos.",
    "🌱 La soya se desarrolla mejor con 6-8 meses de ciclo. Sembrala en enero para mejor rentabilidad."
  ],
  comprador: [
    "📊 El maíz está cotizándose entre $18-20 por quintal. Tendencia alcista por baja oferta.",
    "🍫 El cacao CCN51 se cotiza entre $140-160 por quintal en el mercado actual.",
    "📈 Los compradores mayoristas reportan incremento en demanda de productos certificados.",
    "💰 Recomendación: Buscar proveedores con AgroScore superior a 800 para garantizar calidad."
  ],
  inversionista: [
    "💰 Proyectos bananeros ofrecen ROI del 12-15% anual con riesgo bajo en zonas establecidas.",
    "📉 El cultivo de cacao tiene mayor volatilidad pero potencial de 18-22% ROI a largo plazo.",
    "🎯 Recomendación: Diversificar en 2-3 proyectos para minimizar riesgo idiosincrático.",
    "📊 Inversiones en tecnificación agrícola generan retornos más estables y predecibles."
  ]
};

export async function sendMessage(
  userMessage: string,
  userRole: UserRole,
  conversationHistory: ChatMessage[]
): Promise<string> {
  // Modo desarrollo: usar respuestas fallback si no hay API Key válida
  if (GEMINI_API_KEY === 'TU_API_KEY_AQUI') {
    const responses = FALLBACK_RESPONSES[userRole];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  try {
    const systemPrompt = PROMPTS[userRole];

    // Construir historial de mensajes
    const messages = conversationHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Agregar nuevo mensaje del usuario
    messages.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: messages,
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7,
        }
      })
    });

    if (!response.ok) {
      console.error('API Error:', response.statusText);
      // Fallback a respuesta estática
      const responses = FALLBACK_RESPONSES[userRole];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      const responses = FALLBACK_RESPONSES[userRole];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    return text;
  } catch (error) {
    console.error('Chat error:', error);
    // Fallback a respuesta estática
    const responses = FALLBACK_RESPONSES[userRole];
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

// Obtener saludo inicial personalizado
export function getGreeting(userRole: UserRole): string {
  const greetings: Record<UserRole, string> = {
    agricultor: "¡Hola! 👨‍🌾 Soy CampoIA, tu asistente agrícola. ¿Cómo puedo ayudarte con tus cultivos hoy?",
    comprador: "¡Hola! 🛒 Soy MercadoIA, tu asesor de mercado. ¿Buscar productos o información de precios?",
    inversionista: "¡Hola! 💰 Soy RiskAI, tu asesor financiero. ¿Quieres analizar oportunidades de inversión?"
  };
  return greetings[userRole];
}
