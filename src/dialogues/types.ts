export type DialogueChoice = {
  text: string;
  next: string;
  setFlag?: string;
};

export type DialogueNode = {
  id: string;
  speaker: string;
  text: string;
  next?: string;
  pauseAfterMs?: number;
  autoCloseMs?: number;
  choices?: DialogueChoice[];
};

export type DialogueScript = {
  id: string;
  start: string;
  onCompleteTransition?: {
    targetLocation: string;
    spawnX?: number;
    fadeOutMs?: number;
    fadeInMs?: number;
    switchDelayMs?: number;
  };
  nodes: Record<string, DialogueNode>;
};
