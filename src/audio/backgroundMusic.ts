import Phaser from "phaser";
import { assetManifest } from "../assets/assetManifest";

export const BGM_KEY = "memorise-1";
export const BGM_MENU_VOLUME = 1;
export const BGM_GAME_VOLUME = 0.5;
const BGM_GAME_FADE_MS = 900;

export function unlockAudio(scene: Phaser.Scene): void {
  if (scene.sound.locked) {
    scene.sound.unlock();
  }
}

export function getBgm(
  scene: Phaser.Scene,
): Phaser.Sound.WebAudioSound | undefined {
  const sound = scene.sound.get(BGM_KEY);
  return sound ? (sound as Phaser.Sound.WebAudioSound) : undefined;
}

function killVolumeTweens(scene: Phaser.Scene, sound: Phaser.Sound.BaseSound): void {
  scene.tweens.killTweensOf(sound);
  scene.game.scene.scenes.forEach((activeScene) => {
    if (activeScene instanceof Phaser.Scene) {
      activeScene.tweens.killTweensOf(sound);
    }
  });
}

export function getOrCreateBgm(
  scene: Phaser.Scene,
): Phaser.Sound.WebAudioSound | undefined {
  if (!scene.cache.audio.exists(BGM_KEY)) {
    return undefined;
  }

  const existing = scene.sound.getAll(BGM_KEY);
  const bgm = (existing[0] ?? null) as Phaser.Sound.WebAudioSound | null;

  for (let index = 1; index < existing.length; index += 1) {
    existing[index].stop();
    existing[index].destroy();
  }

  if (bgm) {
    return bgm;
  }

  const config = assetManifest.audio.find((asset) => asset.key === BGM_KEY);
  return scene.sound.add(BGM_KEY, {
    loop: config?.loop ?? true,
    volume: BGM_GAME_VOLUME,
  }) as Phaser.Sound.WebAudioSound;
}

export function setBgmVolume(
  scene: Phaser.Scene,
  volume: number,
  startIfNeeded = true,
  fadeMs = 0,
): Phaser.Sound.WebAudioSound | undefined {
  const bgm = getOrCreateBgm(scene);
  if (!bgm) {
    return undefined;
  }

  killVolumeTweens(scene, bgm);
  unlockAudio(scene);

  if (startIfNeeded && !bgm.isPlaying) {
    bgm.play();
  }

  if (fadeMs > 0) {
    scene.tweens.add({
      targets: bgm,
      volume,
      duration: fadeMs,
      ease: "Sine.easeInOut",
    });
  } else {
    bgm.setVolume(volume);
  }

  return bgm;
}

export function playBgmMenu(scene: Phaser.Scene): void {
  setBgmVolume(scene, BGM_MENU_VOLUME);
}

export function playBgmGame(
  scene: Phaser.Scene,
  fadeMs = BGM_GAME_FADE_MS,
): void {
  setBgmVolume(scene, BGM_GAME_VOLUME, true, fadeMs);
}
