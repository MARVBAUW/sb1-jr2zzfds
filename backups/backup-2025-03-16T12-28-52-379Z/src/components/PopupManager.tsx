import React, { useState, useEffect } from 'react';
import { VenturePopup } from './VenturePopup';
import { AIAssistant } from './AIAssistant';
import { GlobalNovxBalance } from './GlobalNovxBalance';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../contexts/NotificationContext';

export function PopupManager() {
  const { settings } = useNotifications();
  const [popups, setPopups] = useState([
    { id: 'venture', component: VenturePopup, isExpanded: false, zIndex: 3, isEnabled: true },
    { id: 'ai', component: AIAssistant, isExpanded: false, zIndex: 2, isEnabled: true },
    { id: 'balance', component: GlobalNovxBalance, isExpanded: false, zIndex: 1, isEnabled: true }
  ]);

  // Update popup visibility based on settings
  useEffect(() => {
    if (settings) {
      setPopups(prev => prev.map(popup => ({
        ...popup,
        isEnabled: settings.popup[popup.id as keyof typeof settings.popup]
      })));
    }
  }, [settings]);

  const handleExpand = (id: string, expanded: boolean) => {
    setPopups(prev => prev.map(popup => ({
      ...popup,
      isExpanded: popup.id === id ? expanded : popup.isExpanded,
      zIndex: popup.id === id ? Math.max(...prev.map(p => p.zIndex)) + 1 : popup.zIndex
    })));
  };

  const enabledPopups = popups.filter(popup => popup.isEnabled);

  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute right-4 top-4 flex flex-col items-end gap-6">
        <AnimatePresence>
          {enabledPopups.map((popup, index) => {
            const Component = popup.component;
            return (
              <motion.div
                key={popup.id}
                className="pointer-events-auto"
                style={{ zIndex: popup.zIndex }}
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: popup.isExpanded ? index * 25 : index * 25
                }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Component
                  onExpand={(expanded) => handleExpand(popup.id, expanded)}
                  isStacked={!popup.isExpanded}
                  stackIndex={index}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}