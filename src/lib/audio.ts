
import { Howl } from 'howler';
import { useThemeStore } from '@/store/themeStore';

const sounds: Record<string, Howl> = {};

export const playSound = (soundName: string) => {
  if (!sounds[soundName]) {
    // Initialize sounds on first play
    switch (soundName) {
      case 'click':
        sounds[soundName] = new Howl({
          src: ['/sounds/click.mp3'],
          volume: 0.5,
        });
        break;
      case 'add':
        sounds[soundName] = new Howl({
          src: ['/sounds/add.mp3'],
          volume: 0.5,
        });
        break;
      case 'delete':
        sounds[soundName] = new Howl({
          src: ['/sounds/delete.mp3'],
          volume: 0.5,
        });
        break;
      case 'damage':
        sounds[soundName] = new Howl({
          src: ['/sounds/damage.mp3'],
          volume: 0.7,
        });
        break;
      case 'victory':
        sounds[soundName] = new Howl({
          src: ['/sounds/victory.mp3'],
          volume: 0.7,
        });
        break;
      case 'theme':
        // Get the current theme's sound
        const currentTheme = useThemeStore.getState().getTheme();
        sounds[soundName] = new Howl({
          src: [currentTheme.sound || '/sounds/click.mp3'],
          volume: 0.3,
        });
        break;
      case 'welcome':
      case 'init':
        // These are silent initializers
        sounds[soundName] = new Howl({
          src: ['/sounds/init.mp3'],
          volume: 0,
        });
        break;
      case 'calm':
        sounds[soundName] = new Howl({
          src: ['/sounds/calm.mp3'],
          volume: 0.3,
        });
        break;
      case 'energetic':
        sounds[soundName] = new Howl({
          src: ['/sounds/energetic.mp3'],
          volume: 0.3,
        });
        break;
      case 'nature':
        sounds[soundName] = new Howl({
          src: ['/sounds/nature.mp3'],
          volume: 0.3,
        });
        break;
      case 'night':
        sounds[soundName] = new Howl({
          src: ['/sounds/night.mp3'],
          volume: 0.3,
        });
        break;
      default:
        console.warn(`Sound "${soundName}" not found`);
        return;
    }
  }

  sounds[soundName].play();
};
