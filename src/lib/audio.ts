
import { Howl } from 'howler';

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
      case 'welcome':
      case 'init':
        // These are silent initializers
        sounds[soundName] = new Howl({
          src: ['/sounds/init.mp3'],
          volume: 0,
        });
        break;
      default:
        console.warn(`Sound "${soundName}" not found`);
        return;
    }
  }

  sounds[soundName].play();
};
