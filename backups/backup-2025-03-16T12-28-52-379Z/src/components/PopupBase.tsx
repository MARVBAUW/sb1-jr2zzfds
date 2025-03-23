import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Draggable from 'react-draggable';
import { ChevronLeft } from 'lucide-react';

interface PopupBaseProps {
  title: string;
  icon: React.ReactNode;
  iconColor: string;
  onExpand?: (expanded: boolean) => void;
  isStacked?: boolean;
  stackIndex?: number;
  children?: React.ReactNode;
}

export function PopupBase({
  title,
  icon,
  iconColor,
  onExpand,
  isStacked,
  stackIndex = 0,
  children
}: PopupBaseProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const nodeRef = useRef(null);

  const handleExpand = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    onExpand?.(newExpandedState);
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      position={isStacked ? undefined : position}
      onStop={(e, data) => !isStacked && setPosition({ x: data.x, y: data.y })}
      handle=".handle"
    >
      <motion.div
        ref={nodeRef}
        initial={false}
        animate={{ 
          scale: isStacked ? 0.9 - (stackIndex * 0.05) : 1,
          opacity: isStacked ? 0.9 - (stackIndex * 0.1) : 1,
          x: isStacked ? stackIndex * 20 : 0
        }}
        className="transition-all duration-300"
      >
        <motion.div
          animate={{ 
            width: isExpanded ? 280 : 40,
            height: isExpanded ? 'auto' : 40,
          }}
          className="relative"
        >
          <div 
            className={`handle cursor-move rounded-full transition-all duration-300 overflow-hidden
              ${isExpanded ? 'rounded-xl' : 'aspect-square'}`}
            style={{
              background: `linear-gradient(135deg, ${iconColor}20, ${iconColor}10)`,
              boxShadow: `0 4px 16px ${iconColor}10`,
              border: `1px solid ${iconColor}20`
            }}
          >
            <div 
              className="flex items-center gap-2 p-2"
              onClick={handleExpand}
              style={{ cursor: 'pointer' }}
            >
              <div className="relative flex-shrink-0">
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${iconColor}20` }}
                >
                  {React.cloneElement(icon as React.ReactElement, { 
                    className: 'w-4 h-4',
                    style: { color: iconColor }
                  })}
                </div>
                {!isExpanded && (
                  <div 
                    className="absolute -right-0.5 -bottom-0.5 w-2 h-2 rounded-full border border-dark-800"
                    style={{ backgroundColor: iconColor }}
                  />
                )}
              </div>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex-1 flex items-center justify-between min-w-0"
                  >
                    <span className="text-xs font-medium truncate" style={{ color: iconColor }}>
                      {title}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExpand();
                      }}
                      className="p-1 rounded-full hover:bg-dark-700/30 transition-colors"
                      style={{ color: iconColor }}
                    >
                      <ChevronLeft className="w-3 h-3" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-dark-800/95 backdrop-blur-xl"
                >
                  {children}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!isExpanded && !isStacked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 
                border border-dark-800 shadow-lg"
            />
          )}
        </motion.div>
      </motion.div>
    </Draggable>
  );
}