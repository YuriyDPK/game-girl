export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;

export const SceneKeys = {
  Boot: 'BootScene',
  Preload: 'PreloadScene',
  Title: 'TitleScene',
  Narrative: 'NarrativeScene'
} as const;

export const RegistryKeys = {
  CurrentLocation: 'current-location',
  StoryFlags: 'story-flags'
} as const;
