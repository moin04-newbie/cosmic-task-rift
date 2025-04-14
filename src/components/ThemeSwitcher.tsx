
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Moon, Sun, Leaf, Zap } from 'lucide-react';
import { useThemeStore, MoodTheme } from '@/store/themeStore';
import { cn } from '@/lib/utils';
import { playSound } from '@/lib/audio';

const ThemeSwitcher = () => {
  const { currentTheme, themes, setTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  
  const themeList = Object.entries(themes);
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
    playSound('click');
  };
  
  const handleSelectTheme = (themeKey: string) => {
    setTheme(themeKey);
    playSound('add');
    setIsOpen(false);
  };
  
  const getThemeIcon = (themeName: string) => {
    switch (themeName) {
      case 'calm':
        return <Moon size={18} />;
      case 'energetic':
        return <Zap size={18} />;
      case 'nature':
        return <Leaf size={18} />;
      case 'night':
        return <Moon size={18} />;
      default:
        return <Sun size={18} />;
    }
  };

  return (
    <div className="relative z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleOpen}
        className="p-2 rounded-full bg-black/30 border border-white/10 text-white hover:bg-black/50 transition-colors"
        aria-label="Change theme"
      >
        <Palette size={20} />
      </motion.button>
      
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-60 rounded-lg p-2 bg-black/80 backdrop-blur-lg border border-white/10 shadow-lg"
        >
          <h3 className="text-white/80 text-sm font-bold mb-2 px-2 pb-2 border-b border-white/10">Select Mood</h3>
          <div className="flex flex-col space-y-1 mt-1">
            {themeList.map(([key, theme]) => (
              <button 
                key={key}
                onClick={() => handleSelectTheme(key)}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md transition-colors text-left",
                  key === currentTheme 
                    ? "bg-white/20 text-white" 
                    : "text-white/70 hover:bg-white/10"
                )}
              >
                <div 
                  className="w-6 h-6 rounded-full mr-3 flex items-center justify-center"
                  style={{ background: theme.primary }}
                >
                  {getThemeIcon(key)}
                </div>
                <div>
                  <div className="text-sm font-medium">{theme.name}</div>
                  <div className="text-xs text-white/50 mt-0.5">{theme.description}</div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
