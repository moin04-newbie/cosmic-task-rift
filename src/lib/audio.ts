
import { Howl } from 'howler';

// Audio cache to prevent reloading sounds
const soundCache: Record<string, Howl> = {};

// Sound definitions
const sounds = {
  click: {
    src: '/sounds/click.mp3', // Will use placeholder until actual sounds are added
    volume: 0.5,
  },
  add: {
    src: '/sounds/add.mp3',
    volume: 0.6,
  },
  delete: {
    src: '/sounds/delete.mp3',
    volume: 0.6,
  },
  explosion: {
    src: '/sounds/explosion.mp3',
    volume: 0.7,
  },
  welcome: {
    src: '/sounds/welcome.mp3',
    volume: 0.5,
  },
  damage: {
    src: '/sounds/damage.mp3',
    volume: 0.6,
  },
  victory: {
    src: '/sounds/victory.mp3',
    volume: 0.8,
  },
  init: {
    src: '/sounds/init.mp3',
    volume: 0.1,
  },
};

// Initialize all sounds
export const initAudio = () => {
  Object.entries(sounds).forEach(([key, config]) => {
    if (!soundCache[key]) {
      soundCache[key] = new Howl({
        src: [config.src],
        volume: config.volume,
        preload: true,
      });
    }
  });
};

// Play a sound by key
export const playSound = (key: keyof typeof sounds) => {
  // Initialize if not already cached
  if (!soundCache[key]) {
    const config = sounds[key];
    soundCache[key] = new Howl({
      src: [config.src],
      volume: config.volume,
    });
  }
  
  // Play the sound
  if (soundCache[key]) {
    soundCache[key].play();
  } else {
    console.warn(`Sound "${key}" not found`);
  }
};

// Set global volume for all sounds (0.0 to 1.0)
export const setVolume = (volume: number) => {
  Object.values(soundCache).forEach(sound => {
    sound.volume(volume);
  });
};

// Initialize sounds when this module is imported
initAudio();
