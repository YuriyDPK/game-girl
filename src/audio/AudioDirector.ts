import { assetManifest } from '../assets/assetManifest';

export const MENU_MUSIC_VOLUME = 1;
export const GAME_MUSIC_VOLUME = 0.5;
export const BACKGROUND_MUSIC_KEY = 'memorise-1';

export class AudioDirector {
  private currentAmbience?: Phaser.Sound.BaseSound;
  private currentMusic?: Phaser.Sound.BaseSound;

  constructor(private readonly scene: Phaser.Scene) {}

  playLocationAudio(
    ambienceKey?: string,
    musicKey?: string,
    keepCurrentMusic = false,
  ): void {
    this.crossfade('ambience', ambienceKey);
    if (!keepCurrentMusic) {
      this.crossfade('music', musicKey);
    }
  }

  playMusic(key: string, volume: number, fadeMs = 1200): void {
    const sound = this.resolveMusic(key);
    if (!sound) {
      return;
    }

    this.currentMusic = sound;
    if (fadeMs <= 0) {
      this.setSoundVolume(sound, volume);
      return;
    }

    this.tweenVolume(sound, volume, fadeMs);
  }

  setMusicVolume(volume: number): void {
    const sound =
      this.currentMusic ??
      this.scene.game.sound.get(BACKGROUND_MUSIC_KEY) ??
      undefined;

    if (!sound) {
      return;
    }

    this.currentMusic = sound;
    this.setSoundVolume(sound, volume);
  }

  tweenMusicVolume(volume: number, fadeMs = 900): void {
    const sound =
      this.currentMusic ??
      this.scene.game.sound.get(BACKGROUND_MUSIC_KEY) ??
      undefined;

    if (!sound) {
      return;
    }

    this.currentMusic = sound;
    this.tweenVolume(sound, volume, fadeMs);
  }

  adoptBackgroundMusic(volume = GAME_MUSIC_VOLUME): void {
    const sound = this.resolveMusic(BACKGROUND_MUSIC_KEY);
    if (!sound) {
      return;
    }

    this.currentMusic = sound;
    this.setSoundVolume(sound, volume);
  }

  playFootstep(): void {
    this.playOneShot('footstep-soft', 0.12);
  }

  private resolveMusic(key: string): Phaser.Sound.BaseSound | undefined {
    if (!this.scene.cache.audio.exists(key)) {
      return undefined;
    }

    let sound = this.scene.game.sound.get(key);
    if (!sound) {
      const config = assetManifest.audio.find((asset) => asset.key === key);
      sound = this.scene.sound.add(key, {
        loop: config?.loop ?? true,
        volume: 0,
      });
    }

    if (!sound.isPlaying) {
      sound.play();
    }

    return sound;
  }

  private crossfade(channel: 'ambience' | 'music', key?: string): void {
    const current = channel === 'ambience' ? this.currentAmbience : this.currentMusic;

    if (current?.key === key) {
      return;
    }

    if (current) {
      this.scene.tweens.add({
        targets: current,
        volume: 0,
        duration: 900,
        onComplete: () => current.stop(),
      });
    }

    if (!key || !this.scene.cache.audio.exists(key)) {
      if (channel === 'ambience') {
        this.currentAmbience = undefined;
      } else {
        this.currentMusic = undefined;
      }
      return;
    }

    const config = assetManifest.audio.find((asset) => asset.key === key);
    const sound = this.scene.sound.add(key, {
      loop: config?.loop ?? true,
      volume: 0,
    });
    sound.play();

    this.tweenVolume(sound, config?.volume ?? 0.3, 1200);

    if (channel === 'ambience') {
      this.currentAmbience = sound;
    } else {
      this.currentMusic = sound;
    }
  }

  private tweenVolume(
    sound: Phaser.Sound.BaseSound,
    volume: number,
    fadeMs: number,
  ): void {
    this.scene.tweens.killTweensOf(sound);
    this.scene.tweens.add({
      targets: sound,
      volume,
      duration: fadeMs,
      ease: 'Sine.easeInOut',
    });
  }

  private setSoundVolume(sound: Phaser.Sound.BaseSound, volume: number): void {
    (sound as Phaser.Sound.WebAudioSound).volume = volume;
  }

  private playOneShot(key: string, volume: number): void {
    if (!this.scene.cache.audio.exists(key)) {
      return;
    }

    this.scene.sound.play(key, { volume });
  }
}
