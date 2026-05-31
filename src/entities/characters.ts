export type CharacterProfile = {
  id: string;
  displayName: string;
  role: 'player' | 'beloved' | 'memory';
  artDirection: string;
  animationNotes: string[];
};

export const characterProfiles: Record<string, CharacterProfile> = {
  player: {
    id: 'player',
    displayName: 'Он',
    role: 'player',
    artDirection: 'Grounded semi-realistic silhouette with subtle low-framerate walk animation.',
    animationNotes: [
      'Idle should feel like quiet breathing rather than a gamey bounce.',
      'Walk animation should stay 8-12 FPS with soft body sway.'
    ]
  },
  beloved: {
    id: 'beloved',
    displayName: 'Она',
    role: 'beloved',
    artDirection: 'Soft expressive character, recognizable through posture and warm portrait details.',
    animationNotes: [
      'Use small head turns, blinking, hand movement, and warm facial changes.',
      'Avoid exaggerated cartoon poses.'
    ]
  },
  memory: {
    id: 'memory',
    displayName: 'Память',
    role: 'memory',
    artDirection: 'Objects and light behaving like emotional traces rather than obvious collectibles.',
    animationNotes: [
      'Use glow, tiny particles, and camera pauses.',
      'Keep motion slow and cinematic.'
    ]
  }
};
