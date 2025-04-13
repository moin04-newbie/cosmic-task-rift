
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const AssistantAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const location = useLocation();

  const tips = [
    "Complete tasks to unlock trophies in the Trophy Room!",
    "The more tasks you complete, the stronger you'll be in Boss Battles!",
    "You can mark tasks as completed by clicking the checkbox.",
    "Your progress is saved automatically in your browser.",
    "Challenge yourself to complete all daily tasks for maximum XP!"
  ];

  // Change tip when route changes
  useEffect(() => {
    setCurrentTip(Math.floor(Math.random() * tips.length));
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <div className="relative z-10">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00F5FF] to-[#FF00FF] flex items-center justify-center
                  shadow-lg shadow-[#00F5FF]/20 relative"
      >
        <div className="absolute inset-0.5 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <span className="text-white font-bold text-xl">AI</span>
        </div>
        
        {/* Pulsing ring animation */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00F5FF] to-[#FF00FF]"
        />
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-64 p-4 rounded-lg bg-black/70 backdrop-blur-lg
                      border border-white/10 shadow-xl text-white"
          >
            <div className="text-sm">
              <p className="font-body">{tips[currentTip]}</p>
              
              <div className="mt-2 flex justify-between items-center">
                <button 
                  onClick={() => setCurrentTip((currentTip + 1) % tips.length)}
                  className="text-[#00F5FF] text-xs hover:underline"
                >
                  Next tip
                </button>
                
                <span className="text-white/40 text-xs">
                  {currentTip + 1}/{tips.length}
                </span>
              </div>
            </div>
            
            {/* Decorative corner */}
            <div className="absolute bottom-[-8px] right-4 w-4 h-4 bg-black/70 border-r border-b border-white/10 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AssistantAvatar;
