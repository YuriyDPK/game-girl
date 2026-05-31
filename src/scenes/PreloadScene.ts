import Phaser from "phaser";
import { assetManifest } from "../assets/assetManifest";
import { SceneKeys } from "../core/constants";
import { TextureFactory } from "../utils/textureFactory";
import { locations } from "./locationData";

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preload);
  }

  preload(): void {
    this.createLoadingView();

    assetManifest.images.forEach((asset) => {
      this.load.image(asset.key, asset.path);
    });

    assetManifest.audio
      .filter((asset) => asset.preload)
      .forEach((asset) => {
        this.load.audio(asset.key, asset.paths);
      });
  }

  create(): void {
    Object.values(locations).forEach((location) => {
      TextureFactory.createLocationBackground(this, location);
    });
    TextureFactory.createProceduralSprites(this);
    this.createAnimations();
    this.scene.start(SceneKeys.Title);
  }

  private createLoadingView(): void {
    const label = this.add
      .text(640, 350, "Warming up a memory...", {
        fontFamily: "Georgia, serif",
        fontSize: "24px",
        color: "#f5d2a2",
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: label,
      alpha: 0.45,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }

  private createAnimations(): void {
    this.anims.create({
      key: "player-idle",
      frames: [{ key: "player", frame: 0 }],
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "player-walk",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 5 }),
      frameRate: 9,
      repeat: -1,
    });

    this.anims.create({
      key: "liza-idle",
      frames: [{ key: "liza-stay" }],
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "liza-walk",
      frames: [
        { key: "liza-walk-1" },
        { key: "liza-walk-2" },
        { key: "liza-walk-3" },
      ],
      frameRate: 9,
      repeat: -1,
    });

    this.anims.create({
      key: "yura-idle",
      frames: [{ key: "yura-stay" }],
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "yura-walk",
      frames: [
        { key: "yura-walk-1" },
        { key: "yura-walk-2" },
        { key: "yura-walk-3" },
        { key: "yura-walk-4" },
        { key: "yura-walk-5" },
      ],
      frameRate: 9,
      repeat: -1,
    });
  }
}
