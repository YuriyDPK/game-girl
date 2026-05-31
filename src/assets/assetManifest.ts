export type SpriteSheetAsset = {
  key: string;
  path: string;
  frameWidth: number;
  frameHeight: number;
  fps: number;
};

export type ImageAsset = {
  key: string;
  path: string;
};

export type AudioAsset = {
  key: string;
  paths: string[];
  volume: number;
  loop: boolean;
  /** Загружать при старте игры (файл должен существовать). */
  preload?: boolean;
};

export const assetManifest: {
  images: ImageAsset[];
  spritesheets: SpriteSheetAsset[];
  audio: AudioAsset[];
} = {
  images: [
    {
      key: "bg-cofeshop",
      path: new URL("./backgrounds/cofeshop.png", import.meta.url).href,
    },
    {
      key: "bg-cofeshop-2",
      path: new URL("./backgrounds/cofeshop_2.png", import.meta.url).href,
    },
    {
      key: "bg-cofeshop-3",
      path: new URL("./backgrounds/cofeshop_3.png", import.meta.url).href,
    },
    {
      key: "bg-museum",
      path: new URL("./backgrounds/musem.png", import.meta.url).href,
    },
    {
      key: "bg-park-1",
      path: new URL("./backgrounds/park_1.png", import.meta.url).href,
    },
    {
      key: "bg-cafe-samurai",
      path: new URL("./backgrounds/cafe_1.png", import.meta.url).href,
    },
    {
      key: "bg-home-1",
      path: new URL("./backgrounds/home_1.png", import.meta.url).href,
    },
    {
      key: "bg-entrance",
      path: new URL("./backgrounds/entrance.png", import.meta.url).href,
    },
    {
      key: "bg-sovok",
      path: new URL("./backgrounds/sovok.png", import.meta.url).href,
    },
    {
      key: "bg-place-of-not-kiss",
      path: new URL("./backgrounds/place_of_not_kiss.png", import.meta.url).href,
    },
    {
      key: "bg-jumpers",
      path: new URL("./backgrounds/jumpers.png", import.meta.url).href,
    },
    {
      key: "bg-bar-1",
      path: new URL("./backgrounds/bar_1.png", import.meta.url).href,
    },
    {
      key: "bg-airport",
      path: new URL("./backgrounds/airport.png", import.meta.url).href,
    },
    {
      key: "liza-stay",
      path: new URL("./characters/Liza/stay.png", import.meta.url).href,
    },
    {
      key: "liza-walk-1",
      path: new URL("./characters/Liza/walk_1.png", import.meta.url).href,
    },
    {
      key: "liza-walk-2",
      path: new URL("./characters/Liza/walk_2.png", import.meta.url).href,
    },
    {
      key: "liza-walk-3",
      path: new URL("./characters/Liza/walk_3.png", import.meta.url).href,
    },

    {
      key: "yura-stay",
      path: new URL("./characters/Yura/ stay.png", import.meta.url).href,
    },
    {
      key: "yura-walk-1",
      path: new URL("./characters/Yura/yura_1.png", import.meta.url).href,
    },
    {
      key: "yura-walk-2",
      path: new URL("./characters/Yura/yura_2.png", import.meta.url).href,
    },
    {
      key: "yura-walk-3",
      path: new URL("./characters/Yura/yura_3.png", import.meta.url).href,
    },
    {
      key: "yura-walk-4",
      path: new URL("./characters/Yura/yura_4.png", import.meta.url).href,
    },
    {
      key: "yura-walk-5",
      path: new URL("./characters/Yura/yura_5.png", import.meta.url).href,
    },
  ],
  spritesheets: [
    {
      key: "player",
      path: "sprites/characters/player-sheet.png",
      frameWidth: 96,
      frameHeight: 168,
      fps: 9,
    },
  ],
  audio: [
    {
      key: "memorise-1",
      paths: [
        new URL("./audio/ambience/memorise_1.mp3", import.meta.url).href,
      ],
      volume: 0.5,
      loop: true,
      preload: true,
    },
    {
      key: "music-lofi-room",
      paths: ["audio/music/lofi-room.ogg", "audio/music/lofi-room.mp3"],
      volume: 0.35,
      loop: true,
    },
    {
      key: "rain-soft",
      paths: ["audio/ambience/rain-soft.ogg", "audio/ambience/rain-soft.mp3"],
      volume: 0.45,
      loop: true,
    },
    {
      key: "cafe-murmur",
      paths: [
        "audio/ambience/cafe-murmur.ogg",
        "audio/ambience/cafe-murmur.mp3",
      ],
      volume: 0.3,
      loop: true,
    },
    {
      key: "footstep-soft",
      paths: ["audio/sfx/footstep-soft.ogg", "audio/sfx/footstep-soft.mp3"],
      volume: 0.22,
      loop: false,
    },
  ],
};
