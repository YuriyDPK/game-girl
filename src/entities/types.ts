export type InteractionKind = 'dialogue' | 'memory' | 'transition';

export type InteractionDefinition = {
  id: string;
  label: string;
  prompt: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  markerOffsetX?: number;
  markerOffsetY?: number;
  promptOffsetX?: number;
  promptOffsetY?: number;
  interactionRadiusX?: number;
  interactionRadiusY?: number;
  kind: InteractionKind;
  dialogueId?: string;
  targetLocation?: string;
  targetX?: number;
};

export type CharacterDefinition = {
  id: string;
  name: string;
  x: number;
  y: number;
  textureKey?: string;
  idleAnimationKey?: string;
  scale?: number;
  depth?: number;
  flipX?: boolean;
  alpha?: number;
  tint?: number;
  visibleInLocation?: boolean;
};
