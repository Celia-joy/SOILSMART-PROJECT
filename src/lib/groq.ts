import OpenAI from 'openai'

// Initialize OpenAI client with Groq
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
  dangerouslyAllowBrowser: true, // Only for development - in production, use API routes
})

interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export async function generateGroqResponse(
  messages: ChatMessage[],
  model: string = 'llama-3.3-70b-versatile'
): Promise<string> {
  try {
    const systemMessage: ChatMessage = {
      role: 'system',
      content: `You are SoilNara AI, an expert agricultural assistant specializing in sustainable farming practices. 
      You help farmers with:
      - Soil analysis and health recommendations
      - Irrigation scheduling and water management
      - Fertilizer recommendations and nutrient management
      - Pest control and disease management
      - Crop selection and rotation advice
      - Weather-based farming recommendations
      - Sustainable farming practices
      
      Format your responses using markdown:
      - Use **bold text** for important points and key terms
      - Use bullet points (• or -) for lists of recommendations
      - Use numbered lists (1., 2., etc.) for step-by-step instructions
      - Keep paragraphs concise and focused on single topics
      
      Provide practical, actionable advice based on the user's specific farming context. 
      Be concise but thorough, and always consider environmental sustainability.`
    }

    const chatMessages = [systemMessage, ...messages]

    const response = await groq.chat.completions.create({
      model,
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 1000,
      stream: false,
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response content received from Groq API')
    }

    return content
  } catch (error: any) {
    console.error('Groq API Error:', error)
    
    // Handle specific error types
    if (error.status === 401) {
      return 'API key error. Please check your Groq API key configuration.'
    } else if (error.status === 429) {
      return 'Rate limit exceeded. Please wait a moment and try again.'
    } else if (error.status === 500) {
      return 'Groq server error. Please try again in a moment.'
    } else if (error.name === 'NetworkError' || error.code === 'NETWORK_ERROR') {
      return 'Network connection error. Please check your internet connection.'
    } else {
      return 'I apologize, but I encountered an error. Please try again.'
    }
  }
}

export const GROQ_MODELS = {
  'llama-3.3-70b-versatile': 'llama-3.3-70b-versatile',
  'llama-3.1-8b-instant': 'llama-3.1-8b-instant',
  'llama-3.1-70b-versatile': 'llama-3.1-70b-versatile',
  'mixtral-8x7b-32768': 'mixtral-8x7b-32768',
} as const

export type GroqModel = keyof typeof GROQ_MODELS
