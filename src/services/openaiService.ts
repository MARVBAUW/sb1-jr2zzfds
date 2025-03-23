import OpenAI from 'openai';
import { oneDriveService } from './oneDriveService';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  console.warn('OpenAI API key is missing. AI Assistant will operate in navigation-only mode.');
}

const openai = apiKey ? new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true
}) : null;

class OpenAIService {
  private quotaExceeded = false;
  private lastQuotaCheck = 0;
  private readonly QUOTA_RESET_INTERVAL = 3600000; // 1 heure en millisecondes

  private checkQuotaReset() {
    const now = Date.now();
    if (this.quotaExceeded && (now - this.lastQuotaCheck) >= this.QUOTA_RESET_INTERVAL) {
      this.quotaExceeded = false;
      this.lastQuotaCheck = now;
      return true;
    }
    return false;
  }

  private getNavigationResponse(intent: string): string {
    const responses = {
      default: "Je peux vous aider à naviguer dans l'application. Que souhaitez-vous faire ?",
      projects: "Je peux vous montrer la liste des projets ou vous aider à en créer un nouveau.",
      analysis: "Je peux vous diriger vers les différentes analyses disponibles.",
      documents: "Je peux vous aider à accéder à vos documents et fichiers.",
      settings: "Je peux vous guider vers les paramètres de l'application."
    };

    const intentMap: { [key: string]: string } = {
      'projet': 'projects',
      'analyse': 'analysis',
      'document': 'documents',
      'paramètre': 'settings',
      'configuration': 'settings'
    };

    const matchedIntent = Object.keys(intentMap).find(key => 
      intent.toLowerCase().includes(key)
    );

    return responses[intentMap[matchedIntent!] || 'default'];
  }

  async sendMessage(message: string, useOneDrive = true): Promise<string> {
    // Si l'API n'est pas configurée, retourner directement une réponse de navigation
    if (!openai) {
      return this.getNavigationResponse(message);
    }

    try {
      // Vérifier si le quota a été réinitialisé
      if (this.quotaExceeded) {
        if (!this.checkQuotaReset()) {
          return this.getNavigationResponse(message);
        }
      }

      // Si OneDrive est activé, enrichir la réponse avec le contexte des documents
      if (useOneDrive) {
        try {
          return await oneDriveService.enhanceAIResponse(message);
        } catch (error) {
          console.warn('OneDrive enhancement failed, falling back to standard response');
        }
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an AI assistant specialized in construction and real estate. 
            You help users with project management, regulations, and technical questions.
            Keep responses concise, professional and focused on the construction/real estate domain.
            Use French language for responses.
            Provide specific examples and references when possible.`
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      return completion.choices[0].message.content || "Désolé, je n'ai pas pu générer une réponse.";
    } catch (error: any) {
      // Gérer spécifiquement l'erreur de quota dépassé
      if (error?.status === 429) {
        this.quotaExceeded = true;
        this.lastQuotaCheck = Date.now();
        return this.getNavigationResponse(message);
      }

      // Gérer les autres types d'erreurs
      console.error('Error calling OpenAI:', error);
      return this.getNavigationResponse(message);
    }
  }
}

export const openaiService = new OpenAIService();