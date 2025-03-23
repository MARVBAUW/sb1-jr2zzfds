import { openaiService } from './openaiService';

interface KnowledgeEntry {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  lastUpdated: string;
}

class KnowledgeBaseService {
  private knowledgeBase: KnowledgeEntry[] = [];
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
    maxContentLength: 50000
  };

  constructor() {
    // Initialiser avec quelques entrées de démonstration
    this.knowledgeBase = [
      {
        id: '1',
        title: 'Réglementation thermique RT2020',
        content: 'La RT2020 impose de nouvelles normes pour l\'efficacité énergétique des bâtiments...',
        category: 'réglementation',
        tags: ['thermique', 'énergie', 'construction'],
        lastUpdated: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Normes de construction parasismique',
        content: 'Les règles parasismiques PS-MI définissent les conditions de construction...',
        category: 'normes',
        tags: ['sécurité', 'construction'],
        lastUpdated: new Date().toISOString()
      }
    ];
  }

  private sanitizeContent(content: string): string {
    let sanitized = content;

    // Correction de l'expression régulière en utilisant le flag 'i' pour case-insensitive
    this.securityRules.sensitiveKeywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      sanitized = sanitized.replace(regex, '[INFORMATION PROTÉGÉE]');
    });

    if (sanitized.length > this.securityRules.maxContentLength) {
      sanitized = sanitized.substring(0, this.securityRules.maxContentLength) + '...';
    }

    return sanitized;
  }

  private searchKnowledge(query: string): KnowledgeEntry[] {
    const searchTerms = query.toLowerCase().split(' ');
    
    return this.knowledgeBase.filter(entry => {
      const searchText = `${entry.title} ${entry.content} ${entry.category} ${entry.tags.join(' ')}`.toLowerCase();
      return searchTerms.some(term => searchText.includes(term));
    });
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

      // Rechercher des entrées pertinentes
      const relevantEntries = this.searchKnowledge(userQuery);
      
      if (relevantEntries.length === 0) {
        // Si aucune entrée pertinente n'est trouvée, utiliser la réponse standard
        return await openaiService.sendMessage(userQuery, false);
      }

      // Construire le contexte à partir des entrées pertinentes
      const context = relevantEntries
        .map(entry => `${entry.title}:\n${this.sanitizeContent(entry.content)}`)
        .join('\n\n');

      // Enrichir la requête avec le contexte
      const enhancedQuery = `Contexte de la base de connaissances:\n${context}\n\nQuestion de l'utilisateur: ${userQuery}`;
      
      return await openaiService.sendMessage(enhancedQuery, false);
    } catch (error) {
      console.error('Error enhancing AI response:', error);
      return "Je vais vous répondre avec mes connaissances générales.";
    }
  }

  // Méthodes pour gérer la base de connaissances
  addEntry(entry: Omit<KnowledgeEntry, 'id' | 'lastUpdated'>) {
    const newEntry: KnowledgeEntry = {
      ...entry,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString()
    };
    this.knowledgeBase.push(newEntry);
  }

  updateEntry(id: string, updates: Partial<Omit<KnowledgeEntry, 'id' | 'lastUpdated'>>) {
    const index = this.knowledgeBase.findIndex(entry => entry.id === id);
    if (index !== -1) {
      this.knowledgeBase[index] = {
        ...this.knowledgeBase[index],
        ...updates,
        lastUpdated: new Date().toISOString()
      };
    }
  }

  deleteEntry(id: string) {
    this.knowledgeBase = this.knowledgeBase.filter(entry => entry.id !== id);
  }

  getAllEntries(): KnowledgeEntry[] {
    return this.knowledgeBase;
  }
}

export const knowledgeBaseService = new KnowledgeBaseService();