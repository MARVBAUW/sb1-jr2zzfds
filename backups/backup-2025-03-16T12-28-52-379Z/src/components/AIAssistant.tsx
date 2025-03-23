import React, { useState, useRef, useEffect } from 'react';
import { Bot, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { openaiService } from '../services/openaiService';
import { knowledgeBaseService } from '../services/knowledgeBaseService';
import { PopupBase } from './PopupBase';
import { automationPrompts } from '../data/automationPrompts';

interface Message {
  type: 'user' | 'assistant';
  content: string;
}

export function AIAssistant({ onExpand, isStacked, stackIndex }: {
  onExpand?: (expanded: boolean) => void;
  isStacked?: boolean;
  stackIndex?: number;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
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

  const toggleListening = () => {
    if (isListening) {
      recognition.current?.stop();
    } else {
      recognition.current?.start();
    }
    setIsListening(!isListening);
  };

  const handleMessage = async (message: string) => {
    setMessages(prev => [...prev, { type: 'user', content: message }]);
    setInputValue('');
    setIsLoading(true);

    try {
      let aiResponse;
      try {
        aiResponse = await knowledgeBaseService.enhanceAIResponse(message);
      } catch (error) {
        console.warn('Knowledge base enhancement failed, falling back to standard response');
        aiResponse = await openaiService.sendMessage(message, false);
      }
      setMessages(prev => [...prev, { type: 'assistant', content: aiResponse }]);
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

  const handlePromptSelect = (prompt: string) => {
    setInputValue(prompt);
    handleMessage(prompt);
    setSelectedCategory(null);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <PopupBase
      title="Assistant IA"
      icon={<Bot className="w-5 h-5" />}
      iconColor="#0EA5E9"
      onExpand={onExpand}
      isStacked={isStacked}
      stackIndex={stackIndex}
    >
      <div
        ref={chatRef}
        className="h-80 overflow-y-auto p-4 space-y-4 scrollbar-thin 
          scrollbar-thumb-cyan-500/20 scrollbar-track-transparent"
      >
        {selectedCategory ? (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-cyan-400 mb-3">
              Prompts pour {selectedCategory}
            </h3>
            {automationPrompts[selectedCategory as keyof typeof automationPrompts].map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptSelect(prompt)}
                className="w-full text-left p-2 rounded-lg bg-dark-700/30 text-sm text-gray-300 
                  hover:bg-dark-600/50 transition-colors"
              >
                {prompt}
              </button>
            ))}
            <button
              onClick={() => setSelectedCategory(null)}
              className="w-full text-center text-sm text-cyan-400 hover:text-cyan-300 
                transition-colors mt-4"
            >
              Retour
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(automationPrompts).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="p-2 rounded-lg bg-dark-700/30 text-sm text-gray-300 
                    hover:bg-dark-600/50 transition-colors capitalize"
                >
                  {category}
                </button>
              ))}
            </div>

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
          </>
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
    </PopupBase>
  );
}