import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Technology {
  name: string;
  color: string;
}

interface TechBadgeProps {
  technologies: Technology[];
  position?: 'header' | 'corner';
  className?: string;
}

/**
 * TechBadge - A component to showcase technologies used to build a page or project
 * 
 * @param technologies - Array of technology objects with name and color
 * @param position - Where to display the badge: 'header' (centered, always expanded) or 'corner' (bottom-right, expandable on hover)
 * @param className - Additional CSS classes to apply
 */
const TechBadge: React.FC<TechBadgeProps> = ({ 
  technologies, 
  position = 'header',
  className = '' 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  console.log('TechBadge rendered', technologies);
  
  // For corner position, we'll show an expandable badge
  if (position === 'corner') {
    return (
      <motion.div 
        className={`fixed bottom-6 right-6 z-50 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 flex items-center cursor-pointer overflow-hidden"
          animate={{ 
            width: isHovered ? 'auto' : '48px',
            paddingRight: isHovered ? '1rem' : '0.5rem'
          }}
          transition={{ duration: 0.3 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsHovered(!isHovered)}
        >
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-2">
            <span className="text-white font-bold text-xs">{ isHovered ? '</' : '</>' }</span>
          </div>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                className="flex items-center space-x-2"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-gray-700 dark:text-gray-300 text-sm whitespace-nowrap font-medium">This Page is Built with:</span>
                <div className="flex space-x-1">
                  {technologies.map((tech, index) => (
                    <motion.span 
                      key={tech.name}
                      className="rounded-md px-2 py-1 text-xs font-medium text-white"
                      style={{ backgroundColor: tech.color }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {tech.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    );
  }
  
  // For header position, show an always-expanded badge
  return (
    <motion.div 
      className={`mx-auto ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-full shadow-lg py-1 px-3 flex items-center cursor-pointer overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mr-2">
          <span className="text-white font-bold text-xs">&lt;/&gt;</span>
        </div>
        
        <span className="text-gray-700 dark:text-gray-300 text-sm whitespace-nowrap font-medium mr-2">This Page is Built with:</span>
        <div className="flex space-x-1">
          <AnimatePresence>
            {technologies.map((tech, index) => (
              <motion.span 
                key={tech.name}
                className="rounded-md px-2 py-0.5 text-xs font-medium text-white"
                style={{ backgroundColor: tech.color }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: isHovered ? 1.05 : 1,
                  y: isHovered ? -2 : 0
                }}
                transition={{ 
                  delay: isHovered ? index * 0.1 : 0,
                  duration: 0.2
                }}
              >
                {tech.name}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TechBadge;