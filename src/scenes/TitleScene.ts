import Phaser from "phaser";
import { playBgmGame, playBgmMenu, unlockAudio } from "../audio/backgroundMusic";
import {
  GAME_HEIGHT,
  GAME_WIDTH,
  RegistryKeys,
  SceneKeys,
} from "../core/constants";

export class TitleScene extends Phaser.Scene {
  private startingGame = false;

  constructor() {
    super(SceneKeys.Title);
  }

  create(): void {
    this.startingGame = false;
    this.createBackground();
    this.createTitle();
    this.createPlayButton();
    this.createMusicTapLayer();
    this.tryAutoplayMenuMusic();
  }

  private tryAutoplayMenuMusic(): void {
    playBgmMenu(this);
    this.sound.once("unlocked", () => {
      if (!this.startingGame) {
        playBgmMenu(this);
      }
    });

    this.time.delayedCall(150, () => {
      if (!this.startingGame) {
        playBgmMenu(this);
      }
    });
  }

  /** Дополнительный тихий fallback для браузеров, которые ждут первого жеста. */
  private createMusicTapLayer(): void {
    this.add
      .rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0, 0)
      .setDepth(1)
      .setInteractive()
      .on("pointerdown", () => {
        if (this.startingGame) {
          return;
        }
        unlockAudio(this);
        playBgmMenu(this);
      });
  }

  private createBackground(): void {
    this.add
      .image(0, 0, "bg-cofeshop")
      .setOrigin(0, 0)
      .setDisplaySize(GAME_WIDTH, GAME_HEIGHT)
      .setDepth(0);

    const shade = this.add.graphics().setDepth(2);
    shade.fillGradientStyle(
      0x120f12,
      0x120f12,
      0x120f12,
      0x120f12,
      0.82,
      0.62,
      0.9,
      0.86,
    );
    shade.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    const warmth = this.add.graphics().setDepth(2);
    warmth.fillStyle(0xf0a85f, 0.1);
    warmth.fillCircle(GAME_WIDTH * 0.5, GAME_HEIGHT * 0.5, 320);
  }

  private createTitle(): void {
    this.add
      .text(GAME_WIDTH / 2, 300, "Теплые Воспоминания", {
        fontFamily: "Georgia, serif",
        fontSize: "50px",
        color: "#f7dfbd",
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(5);

    this.add
      .text(
        GAME_WIDTH / 2,
        370,
        "маленькая история о встрече, тепле и случайных важных моментах",
        {
          fontFamily: "Georgia, serif",
          fontSize: "18px",
          color: "#d9b98e",
          align: "center",
        },
      )
      .setOrigin(0.5)
      .setAlpha(0.86)
      .setDepth(5);
  }

  private createPlayButton(): void {
    const button = this.add.container(GAME_WIDTH / 2, 470).setDepth(10);
    const background = this.add
      .rectangle(0, 0, 210, 54, 0x21161a, 0.86)
      .setStrokeStyle(1, 0xf1c27d, 0.48)
      .setOrigin(0.5);
    const label = this.add
      .text(0, -1, "Играть", {
        fontFamily: "Georgia, serif",
        fontSize: "24px",
        color: "#f8dfbd",
      })
      .setOrigin(0.5);

    button.add([background, label]);
    button.setSize(210, 54);
    button.setInteractive({ useHandCursor: true });
    button.on("pointerover", () => {
      background.setFillStyle(0x2b1d21, 0.95);
      button.setScale(1.03);
    });
    button.on("pointerout", () => {
      background.setFillStyle(0x21161a, 0.86);
      button.setScale(1);
    });
    button.on("pointerdown", () => this.startGame());

    this.tweens.add({
      targets: button,
      y: button.y - 4,
      duration: 1800,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }

  private startGame(): void {
    if (this.startingGame) {
      return;
    }

    this.startingGame = true;
    unlockAudio(this);
    playBgmGame(this);

    this.registry.set(RegistryKeys.CurrentLocation, "cafe-night");
    this.registry.set(RegistryKeys.StoryFlags, {});
    this.cameras.main.fadeOut(360, 0, 0, 0);
    this.time.delayedCall(380, () => {
      this.scene.start(SceneKeys.Narrative, {
        locationKey: "cafe-night",
        spawnX: 230,
      });
    });
  }
}
