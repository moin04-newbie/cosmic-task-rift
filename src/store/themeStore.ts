
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type MoodTheme = {
  name: string;
  primary: string;
  secondary: string;
  background: string;
  accent: string;
  sound: string;
  particleColor: string;
  description: string;
};

const themes: Record<string, MoodTheme> = {
  cyber: {
    name: 'Cyber',
    primary: '#00F5FF',
    secondary: '#FF00FF',
    background: '#0f0f13',
    accent: '#FFC107',
    sound: '/sounds/click.mp3',
    particleColor: '#00F5FF',
    description: 'Default cyberpunk theme with neon colors',
  },
  calm: {
    name: 'Calm',
    primary: '#48B2AA',
    secondary: '#7C90DB',
    background: '#0a1328',
    accent: '#D6E5FA',
    sound: '/sounds/calm.mp3',
    particleColor: '#48B2AA',
    description: 'Serene blue and teal tones for focused work',
  },
  energetic: {
    name: 'Energetic',
    primary: '#FF6B35',
    secondary: '#FFC914',
    background: '#121212',
    accent: '#FF9F68',
    sound: '/sounds/energetic.mp3',
    particleColor: '#FF6B35',
    description: 'Vibrant orange and yellow for high energy',
  },
  nature: {
    name: 'Nature',
    primary: '#5CDB95',
    secondary: '#8EE4AF',
    background: '#0c1f0f',
    accent: '#EDF5E1',
    sound: '/sounds/nature.mp3',
    particleColor: '#5CDB95',
    description: 'Peaceful green tones inspired by nature',
  },
  night: {
    name: 'Night',
    primary: '#5E72EB',
    secondary: '#B185DB',
    background: '#0D0D18',
    accent: '#A682FF',
    sound: '/sounds/night.mp3',
    particleColor: '#5E72EB',
    description: 'Deep purple and blue for late night focus',
  },
};

interface ThemeState {
  currentTheme: string;
  themes: Record<string, MoodTheme>;
  setTheme: (theme: string) => void;
  getTheme: () => MoodTheme;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      currentTheme: 'cyber',
      themes,
      setTheme: (theme: string) => {
        set({ currentTheme: theme });
        // Apply CSS variables when theme changes
        const selectedTheme = themes[theme];
        if (selectedTheme) {
          document.documentElement.style.setProperty('--primary', selectedTheme.primary);
          document.documentElement.style.setProperty('--secondary', selectedTheme.secondary);
          
          // Play the theme sound if available
          if (selectedTheme.sound) {
            try {
              const { playSound } = require('@/lib/audio');
              playSound('theme');
            } catch (e) {
              console.error('Failed to play theme sound', e);
            }
          }
        }
      },
      getTheme: () => {
        const { currentTheme } = get();
        return themes[currentTheme] || themes.cyber;
      },
    }),
    {
      name: 'cybertask-theme',
    }
  )
);
