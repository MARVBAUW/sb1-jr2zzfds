import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';
import { Bot, X, Minimize2, Mic } from 'lucide-react';
import { openaiService } from '../services/openaiService';
import { knowledgeBaseService } from '../services/knowledgeBaseService';

interface Message {
  type: 'user' | 'assistant';
  content: string;
}

const navigationIntents: Record<string, { 
  path: string;
  responses: string[];
  keywords: string[];
  description: string;
}> = {
  'nouveau projet': {
    path: '/maitre-oeuvre/saisie-projet',
    responses: [
      "Je vous dirige vers la création d'un nouveau projet.",
      "D'accord, allons créer un nouveau projet ensemble.",
      "Je vous emmène vers l'interface de création de projet."
    ],
    keywords: [
      'créer', 'nouveau', 'projet', 'commencer', 'démarrer', 'initialiser',
      'nouvelle construction', 'nouveau chantier', 'nouvelle opération',
      'débuter', 'lancer', 'initier', 'saisir', 'enregistrer'
    ],
    description: "Interface de création et d'initialisation de nouveaux projets"
  },
  'voir les projets': {
    path: '/maitre-oeuvre/dashboard-projets',
    responses: [
      "Je vous montre le tableau de bord des projets.",
      "Voici la vue d'ensemble de vos projets.",
      "Accès au dashboard des projets en cours..."
    ],
    keywords: [
      'projets', 'liste', 'tableau de bord', 'dashboard', 'aperçu',
      'vue ensemble', 'tous les projets', 'chantiers', 'opérations',
      'consulter', 'voir', 'afficher', 'visualiser', 'explorer'
    ],
    description: "Vue d'ensemble et suivi des projets en cours"
  },
  'analyse financière': {
    path: '/maitre-oeuvre/analyse-financiere',
    responses: [
      "Je vous dirige vers l'analyse financière.",
      "Accès aux données financières...",
      "Voici le module d'analyse financière."
    ],
    keywords: [
      'finance', 'budget', 'coût', 'dépense', 'investissement',
      'rentabilité', 'marge', 'trésorerie', 'comptabilité',
      'bilan', 'analyse', 'financier', 'économique', 'estimation'
    ],
    description: "Analyse financière et suivi budgétaire des projets"
  },
  'planning': {
    path: '/maitre-oeuvre/analyse-planning',
    responses: [
      "Je vous montre le planning des projets.",
      "Accès à la gestion du planning...",
      "Voici l'interface de planification."
    ],
    keywords: [
      'planning', 'calendrier', 'échéancier', 'délai', 'date',
      'planification', 'agenda', 'timing', 'programme', 'chronologie',
      'temps', 'durée', 'phase', 'étape', 'avancement'
    ],
    description: "Gestion du planning et des échéances"
  },
  'documents': {
    path: '/maitre-oeuvre/documents',
    responses: [
      "Accès à la gestion documentaire.",
      "Voici vos documents et fichiers.",
      "Je vous montre la bibliothèque de documents."
    ],
    keywords: [
      'document', 'fichier', 'plan', 'dossier', 'archive',
      'documentation', 'bibliothèque', 'stockage', 'pdf',
      'rapport', 'note', 'compte-rendu', 'dessin', 'schéma'
    ],
    description: "Gestion et stockage des documents"
  },
  'réglementation': {
    path: '/maitre-oeuvre/reglementation',
    responses: [
      "Voici les informations réglementaires.",
      "Accès aux normes et règlements.",
      "Je vous montre la section réglementation."
    ],
    keywords: [
      'norme', 'règle', 'loi', 'réglementation', 'conformité',
      'standard', 'directive', 'obligation', 'légal', 'juridique',
      'dtu', 'rt2020', 're2020', 'certification', 'homologation'
    ],
    description: "Consultation des normes et réglementations"
  },
  'équipe': {
    path: '/maitre-oeuvre/equipe',
    responses: [
      "Voici la gestion de l'équipe projet.",
      "Accès à l'espace équipe.",
      "Je vous dirige vers la gestion des intervenants."
    ],
    keywords: [
      'équipe', 'intervenant', 'collaborateur', 'membre',
      'personnel', 'ressource', 'effectif', 'participant',
      'acteur', 'responsable', 'chef', 'coordinateur', 'expert'
    ],
    description: "Gestion des équipes et intervenants"
  },
  'chantier': {
    path: '/maitre-oeuvre/chantier',
    responses: [
      "Accès au suivi de chantier.",
      "Voici l'interface chantier.",
      "Je vous montre le suivi des travaux."
    ],
    keywords: [
      'chantier', 'travaux', 'construction', 'site', 'ouvrage',
      'réalisation', 'exécution', 'mise en œuvre', 'suivi',
      'avancement', 'progression', 'état', 'situation', 'contrôle'
    ],
    description: "Suivi et gestion des chantiers"
  }
};

export function AIAssistant() {
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const navigate = useNavigate();

  const recognition = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognition.current = new (window as any).webkitSpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'fr-FR';

      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setInputValue(transcript);
        handleMessage(transcript);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsMinimized(false);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    timeoutRef.current = setTimeout(() => {
      if (!isListening) {
        setIsMinimized(true);
      }
    }, 2000);
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.current?.stop();
    } else {
      recognition.current?.start();
    }
    setIsListening(!isListening);
  };

  const getRandomResponse = (responses: string[]) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const findMatchingIntent = (message: string): string | null => {
    const words = message.toLowerCase().split(/\s+/);
    
    for (const [intent, data] of Object.entries(navigationIntents)) {
      // Vérifier les mots-clés exacts
      if (data.keywords.some(keyword => words.includes(keyword.toLowerCase()))) {
        return intent;
      }
      
      // Vérifier les expressions composées
      if (data.keywords.some(keyword => 
        keyword.includes(' ') && message.toLowerCase().includes(keyword.toLowerCase())
      )) {
        return intent;
      }
    }
    
    return null;
  };

  const handleMessage = async (message: string) => {
    setMessages(prev => [...prev, { type: 'user', content: message }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const matchedIntent = findMatchingIntent(message);
      
      if (matchedIntent && navigationIntents[matchedIntent]) {
        const { path, responses } = navigationIntents[matchedIntent];
        const response = getRandomResponse(responses);
        setMessages(prev => [...prev, { type: 'assistant', content: response }]);
        navigate(path);
      } else {
        let aiResponse;
        try {
          aiResponse = await knowledgeBaseService.enhanceAIResponse(message);
        } catch (error) {
          console.warn('Knowledge base enhancement failed, falling back to standard response');
          aiResponse = await openaiService.sendMessage(message, false);
        }
        setMessages(prev => [...prev, { type: 'assistant', content: aiResponse }]);
      }
    } catch (error) {
      console.error('Error handling message:', error);
      setMessages(prev => [...prev, { 
        type: 'assistant', 
        content: "Je peux toujours vous aider avec la navigation dans l'application." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleMessage(inputValue);
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Draggable handle=".handle" nodeRef={nodeRef}>
      <div 
        ref={nodeRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${isMinimized ? 'w-16 h-16' : 'w-80'}`}
      >
        {isMinimized ? (
          <div className="relative w-16 h-16 cursor-pointer">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,255,0.2),transparent_70%)]" />
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,255,255,0.3)] animate-globe" />
            <div className="absolute inset-0 rounded-full border border-cyan-500/30" />
            
            <div className="absolute inset-0 rounded-full"
                 style={{
                   background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.1) 2px, rgba(0,255,255,0.1) 4px),
                               repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,255,255,0.1) 2px, rgba(0,255,255,0.1) 4px)`
                 }}
            />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <Bot className="w-6 h-6 text-cyan-400 filter drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]" />
            </div>

            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 blur-lg -z-10" />
          </div>
        ) : (
          <div className="bg-dark-700/80 backdrop-blur-xl rounded-2xl shadow-xl 
            border border-cyan-500/20 overflow-hidden transition-all duration-300">
            <div className="handle cursor-move p-4 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 
              border-b border-cyan-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-100">Assistant IA</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 rounded-lg hover:bg-dark-600/50 text-cyan-400 
                    hover:text-cyan-300 transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 rounded-lg hover:bg-dark-600/50 text-cyan-400 
                    hover:text-cyan-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              ref={chatRef}
              className="h-80 overflow-y-auto p-4 space-y-4 scrollbar-thin 
                scrollbar-thumb-cyan-500/20 scrollbar-track-transparent"
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.type === 'user'
                        ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                        : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 
                    rounded-lg px-4 py-2 max-w-[80%]">
                    <span className="inline-flex gap-1">
                      <span className="animate-bounce">.</span>
                      <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                      <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-cyan-500/20">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`p-2 rounded-lg transition-colors ${
                    isListening
                      ? 'bg-red-500/20 text-red-400 border border-red-500/20'
                      : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20'
                  }`}
                >
                  <Mic className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Comment puis-je vous aider ?"
                  className="flex-1 bg-dark-600/50 border border-cyan-500/20 rounded-lg px-3 py-2 
                    text-sm text-cyan-100 placeholder-cyan-500/50 focus:outline-none 
                    focus:ring-2 focus:ring-cyan-500/20"
                  disabled={isLoading}
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </Draggable>
  );
}