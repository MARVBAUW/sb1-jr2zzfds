import { Client } from '@microsoft/microsoft-graph-client';
import { DriveItem } from '@microsoft/microsoft-graph-types';
import { openaiService } from './openaiService';

interface SharedLink {
  url: string;
  id?: string;
  accessToken?: string;
}

class OneDriveService {
  private sharedLinks: SharedLink[] = [];
  private initialized = false;
  private securityRules = {
    sensitiveKeywords: [
      'confidentiel',
      'secret',
      'privé',
      'mdp',
      'password',
      'mot de passe',
      'login',
      'identifiant',
      'téléphone',
      'adresse',
      'email personnel',
      'iban',
      'carte bancaire',
      'sécurité sociale'
    ],
    allowedExtensions: ['.txt', '.md', '.doc', '.docx', '.pdf'],
    maxContentLength: 50000
  };

  constructor() {
    this.sharedLinks = [];
  }

  async initialize() {
    if (this.initialized) {
      return;
    }

    try {
      if (this.sharedLinks.length === 0) {
        console.warn('No shared links configured');
        return;
      }

      this.initialized = true;
    } catch (error) {
      console.error('Error initializing OneDrive service:', error);
      throw error;
    }
  }

  addSharedLink(url: string) {
    // Extraire l'ID du lien partagé
    const matches = url.match(/\/([a-zA-Z0-9\-_]+)\?/);
    const id = matches ? matches[1] : undefined;
    this.sharedLinks.push({ url, id });
  }

  private sanitizeContent(content: string): string {
    let sanitized = content;

    this.securityRules.sensitiveKeywords.forEach(keyword => {
      const regex = new RegExp(`(?i).*${keyword}.*\\n?`, 'gi');
      sanitized = sanitized.replace(regex, '[INFORMATION PROTÉGÉE]\n');
    });

    if (sanitized.length > this.securityRules.maxContentLength) {
      sanitized = sanitized.substring(0, this.securityRules.maxContentLength) + '...';
    }

    return sanitized;
  }

  private async getSharedItemContent(link: SharedLink): Promise<string> {
    try {
      // Pour l'instant, retourner un message d'erreur gracieux
      // car nous n'avons pas accès à l'API Microsoft Graph
      return "Le contenu n'est pas accessible pour le moment. Je vais utiliser mes connaissances générales pour vous répondre.";
    } catch (error) {
      console.error(`Error fetching shared item content:`, error);
      return '';
    }
  }

  async enhanceAIResponse(userQuery: string): Promise<string> {
    try {
      // Vérifier si la requête contient des mots-clés sensibles
      const containsSensitiveKeywords = this.securityRules.sensitiveKeywords.some(
        keyword => userQuery.toLowerCase().includes(keyword.toLowerCase())
      );

      if (containsSensitiveKeywords) {
        return "Je ne peux pas traiter les demandes concernant des informations sensibles ou confidentielles.";
      }

      // Pour l'instant, utiliser directement OpenAI sans le contexte OneDrive
      return await openaiService.sendMessage(userQuery, false);
    } catch (error) {
      console.error('Error enhancing AI response:', error);
      return "Je vais vous répondre avec mes connaissances générales.";
    }
  }
}

export const oneDriveService = new OneDriveService();

// Ajouter les liens partagés
oneDriveService.addSharedLink('https://1drv.ms/f/c/04e6360576b8a472/EnKkuHYFNuYggAR4AAAAAAABN453JKFBpDtb6aNlXHJKSg?e=iuQBJ2');
oneDriveService.addSharedLink('https://1drv.ms/f/c/04e6360576b8a472/EnKkuHYFNuYggAR6AAAAAAABAW8tT8mpm5J_aWXOI5b0BQ?e=Tf1g8l');