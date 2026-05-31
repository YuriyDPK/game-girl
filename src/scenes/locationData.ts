import type {
  CharacterDefinition,
  InteractionDefinition,
} from "../entities/types";

export type LocationKey =
  | "cafe-night"
  | "cafe-cozy-table"
  | "cafe-cozy-talk"
  | "memory-museum"
  | "memory-park"
  | "memory-cafe-samurai"
  | "memory-home"
  | "memory-entrance"
  | "memory-sovok"
  | "memory-not-kiss"
  | "memory-jumpers"
  | "memory-bar"
  | "memory-airport";

export type LocationDefinition = {
  key: LocationKey;
  title: string;
  backgroundKey: string;
  realBackground?: boolean;
  backgroundCrop?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  ambienceKey?: string;
  musicKey?: string;
  groundY: number;
  worldWidth: number;
  cameraZoom: number;
  palette: {
    skyTop: string;
    skyBottom: string;
    horizon: string;
    foreground: string;
    light: string;
    accent: string;
  };
  weather?: "rain" | "snow" | "dust";
  leftExit?: LocationKey;
  rightExit?: LocationKey;
  interactions: InteractionDefinition[];
  characters?: CharacterDefinition[];
  /** Только фон и диалог: без спрайтов, без ходьбы и точек E. */
  dialogueOnly?: boolean;
  autoDialogueId?: string;
};

export const locations: Record<LocationKey, LocationDefinition> = {
  "cafe-night": {
    key: "cafe-night",
    title: "Кофейня днем",
    backgroundKey: "bg-cofeshop",
    realBackground: true,
    ambienceKey: "cafe-murmur",
    musicKey: "music-lofi-room",
    groundY: 676,
    worldWidth: 1280,
    cameraZoom: 1,
    palette: {
      skyTop: "#211419",
      skyBottom: "#49313a",
      horizon: "#6f4a43",
      foreground: "#241718",
      light: "#f6bf73",
      accent: "#bf6f5e",
    },
    interactions: [
      {
        id: "boy-at-table",
        label: "Boy at table",
        prompt: "Talk",
        x: 920,
        y: 650,
        width: 180,
        markerOffsetX: -110,
        markerOffsetY: -95,
        promptOffsetX: -110,
        promptOffsetY: -100,
        interactionRadiusX: 190,
        interactionRadiusY: 210,
        kind: "dialogue",
        dialogueId: "cafe-first-meeting",
      },
    ],
  },
  "cafe-cozy-table": {
    key: "cafe-cozy-table",
    title: "Уютный столик",
    backgroundKey: "bg-cofeshop-2",
    realBackground: true,
    ambienceKey: "cafe-murmur",
    musicKey: "music-lofi-room",
    groundY: 672,
    worldWidth: 1280,
    cameraZoom: 1,
    palette: {
      skyTop: "#211419",
      skyBottom: "#49313a",
      horizon: "#6f4a43",
      foreground: "#241718",
      light: "#f6bf73",
      accent: "#bf6f5e",
    },
    interactions: [
      {
        id: "cozy-table-memory",
        label: "Уютный столик",
        prompt: "Sit",
        x: 1025,
        y: 640,
        width: 210,
        markerOffsetY: -86,
        promptOffsetY: -92,
        interactionRadiusX: 220,
        interactionRadiusY: 230,
        kind: "dialogue",
        dialogueId: "cafe-yura-table-choice",
      },
    ],
  },
  "cafe-cozy-talk": {
    key: "cafe-cozy-talk",
    title: "Тихий разговор",
    backgroundKey: "bg-cofeshop-3",
    realBackground: true,
    ambienceKey: "cafe-murmur",
    musicKey: "music-lofi-room",
    groundY: 672,
    worldWidth: 1280,
    cameraZoom: 1,
    dialogueOnly: true,
    autoDialogueId: "cafe-cozy-talk",
    palette: {
      skyTop: "#211419",
      skyBottom: "#49313a",
      horizon: "#6f4a43",
      foreground: "#241718",
      light: "#f6bf73",
      accent: "#bf6f5e",
    },
    interactions: [],
  },
  "memory-museum": {
    key: "memory-museum",
    title: "Музей",
    backgroundKey: "bg-museum",
    realBackground: true,
    ambienceKey: "cafe-murmur",
    musicKey: "music-lofi-room",
    groundY: 672,
    worldWidth: 1280,
    cameraZoom: 1,
    dialogueOnly: true,
    autoDialogueId: "memory-museum",
    palette: {
      skyTop: "#1c1814",
      skyBottom: "#3a342c",
      horizon: "#524a40",
      foreground: "#1a1612",
      light: "#e8d4b8",
      accent: "#b89a72",
    },
    interactions: [],
  },
  "memory-park": {
    key: "memory-park",
    title: "Наш парк",
    backgroundKey: "bg-park-1",
    realBackground: true,
    ambienceKey: "cafe-murmur",
    musicKey: "music-lofi-room",
    groundY: 672,
    worldWidth: 1280,
    cameraZoom: 1,
    dialogueOnly: true,
    autoDialogueId: "memory-park",
    palette: {
      skyTop: "#1a2418",
      skyBottom: "#3d5238",
      horizon: "#5a6b4f",
      foreground: "#1c2619",
      light: "#c8d9a8",
      accent: "#8faa6e",
    },
    interactions: [],
  },
  "memory-cafe-samurai": {
    key: "memory-cafe-samurai",
    title: "Кафе «Самурай»",
    backgroundKey: "bg-cafe-samurai",
    realBackground: true,
    ambienceKey: "cafe-murmur",
    musicKey: "music-lofi-room",
    groundY: 672,
    worldWidth: 1280,
    cameraZoom: 1,
    dialogueOnly: true,
    autoDialogueId: "memory-cafe-samurai",
    palette: {
      skyTop: "#211419",
      skyBottom: "#49313a",
      horizon: "#6f4a43",
      foreground: "#241718",
      light: "#f6bf73",
      accent: "#bf6f5e",
    },
    interactions: [],
  },
  "memory-home": {
    key: "memory-home",
    title: "Дом",
    backgroundKey: "bg-home-1",
    realBackground: true,
    ambienceKey: "cafe-murmur",
    musicKey: "music-lofi-room",
    groundY: 672,
    worldWidth: 1280,
    cameraZoom: 1,
    dialogueOnly: true,
    autoDialogueId: "memory-home",
    palette: {
      skyTop: "#1a1520",
      skyBottom: "#2e2430",
      horizon: "#4a3a48",
      foreground: "#18121a",
      light: "#e8c4a0",
      accent: "#a87898",
    },
    interactions: [],
  },
  "memory-entrance": {
    key: "memory-entrance",
    title: "Подъезд",
    backgroundKey: "bg-entrance",
    realBackground: true,
    ambienceKey: "cafe-murmur",
    musicKey: "music-lofi-room",
    groundY: 672,
    worldWidth: 1280,
    cameraZoom: 1,
    dialogueOnly: true,
    autoDialogueId: "memory-entrance",
    palette: {
      skyTop: "#12151c",
      skyBottom: "#242833",
      horizon: "#3c4255",
      foreground: "#10121a",
      light: "#d4c4a8",
      accent: "#8a90b8",
    },
    interactions: [],
  },
  "memory-sovok": {
    key: "memory-sovok",
    title: "Совок",
    backgroundKey: "bg-sovok",
    realBackground: true,
    ambienceKey: "cafe-murmur",
    musicKey: "music-lofi-room",
    groundY: 672,
    worldWidth: 1280,
    cameraZoom: 1,
    dialogueOnly: true,
    autoDialogueId: "memory-sovok",
    palette: {
      skyTop: "#1c1814",
      skyBottom: "#3a302a",
      horizon: "#5a4a40",
      foreground: "#1a1612",
      light: "#f0d8a0",
      accent: "#c8a070",
    },
    interactions: [],
  },
  "memory-not-kiss": {
    key: "memory-not-kiss",
    title: "Место несостоявшегося поцелуя",
    backgroundKey: "bg-place-of-not-kiss",
    realBackground: true,
    ambienceKey: "cafe-murmur",
    musicKey: "music-lofi-room",
    groundY: 672,
    worldWidth: 1280,
    cameraZoom: 1,
    dialogueOnly: true,
    autoDialogueId: "memory-not-kiss",
    palette: {
      skyTop: "#1a1824",
      skyBottom: "#32304a",
      horizon: "#504e6a",
      foreground: "#161420",
      light: "#e0c8f0",
      accent: "#9880b8",
    },
    interactions: [],
  },
  "memory-jumpers": {
    key: "memory-jumpers",
    title: "Прыгуны",
    backgroundKey: "bg-jumpers",
    realBackground: true,
    ambienceKey: "cafe-murmur",
    musicKey: "music-lofi-room",
    groundY: 672,
    worldWidth: 1280,
    cameraZoom: 1,
    dialogueOnly: true,
    autoDialogueId: "memory-jumpers",
    palette: {
      skyTop: "#141c20",
      skyBottom: "#283040",
      horizon: "#485868",
      foreground: "#101820",
      light: "#c8e0f0",
      accent: "#6898c0",
    },
    interactions: [],
  },
  "memory-bar": {
    key: "memory-bar",
    title: "Бар",
    backgroundKey: "bg-bar-1",
    realBackground: true,
    ambienceKey: "cafe-murmur",
    musicKey: "music-lofi-room",
    groundY: 672,
    worldWidth: 1280,
    cameraZoom: 1,
    dialogueOnly: true,
    autoDialogueId: "memory-bar",
    palette: {
      skyTop: "#141820",
      skyBottom: "#252a35",
      horizon: "#3d4555",
      foreground: "#12151c",
      light: "#d4a86a",
      accent: "#7a8fa8",
    },
    interactions: [],
  },
  "memory-airport": {
    key: "memory-airport",
    title: "Аэропорт",
    backgroundKey: "bg-airport",
    realBackground: true,
    ambienceKey: "cafe-murmur",
    musicKey: "music-lofi-room",
    groundY: 672,
    worldWidth: 1280,
    cameraZoom: 1,
    dialogueOnly: true,
    autoDialogueId: "memory-airport",
    palette: {
      skyTop: "#141a22",
      skyBottom: "#2a3340",
      horizon: "#455568",
      foreground: "#10141a",
      light: "#c8d8e8",
      accent: "#8aa4c0",
    },
    interactions: [],
  },
};
