import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH, SceneKeys } from './constants';
import { BootScene } from '../scenes/BootScene';
import { NarrativeScene } from '../scenes/NarrativeScene';
import { PreloadScene } from '../scenes/PreloadScene';
import { TitleScene } from '../scenes/TitleScene';

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: '#120f12',
  pixelArt: false,
  roundPixels: false,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  render: {
    antialias: true,
    powerPreference: 'high-performance'
  },
  scene: [BootScene, PreloadScene, TitleScene, NarrativeScene],
  title: 'Теплые Воспоминания',
  url: 'https://local.game/warm-memories',
  version: '0.1.0'
};

export type SceneKey = (typeof SceneKeys)[keyof typeof SceneKeys];
