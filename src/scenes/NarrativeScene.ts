import Phaser from "phaser";
import { AudioDirector } from "../audio/AudioDirector";
import { playBgmGame, getBgm } from "../audio/backgroundMusic";
import {
  GAME_HEIGHT,
  GAME_WIDTH,
  RegistryKeys,
  SceneKeys,
} from "../core/constants";
import { GameState } from "../core/GameState";
import { InteractionZone } from "../entities/InteractionZone";
import { Player } from "../entities/Player";
import { dialogueScripts } from "../dialogues/scripts";
import type { DialogueScript } from "../dialogues/types";
import { DialogueBox } from "../ui/DialogueBox";
import { InteractionPrompt } from "../ui/InteractionPrompt";
import { SceneTransition } from "../ui/SceneTransition";
import { hexToNumber } from "../utils/color";
import {
  locations,
  type LocationDefinition,
  type LocationKey,
} from "./locationData";

type NarrativeSceneData = {
  locationKey?: LocationKey;
  spawnX?: number;
  fadeInMs?: number;
};

type WeatherSprite = Phaser.GameObjects.Image & {
  drift: number;
  fallSpeed: number;
};

export class NarrativeScene extends Phaser.Scene {
  private gameState!: GameState;
  private audioDirector!: AudioDirector;
  private player!: Player;
  private dialogueBox!: DialogueBox;
  private prompt!: InteractionPrompt;
  private transition!: SceneTransition;
  private location!: LocationDefinition;
  private interactions: InteractionZone[] = [];
  private weather: WeatherSprite[] = [];
  private activeInteraction?: InteractionZone;
  private inputLocked = false;
  private spawnX?: number;
  private fadeInMs = 420;
  private dialogueOnlyMode = false;
  private keys!: {
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
    a: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
    e: Phaser.Input.Keyboard.Key;
  };

  constructor() {
    super(SceneKeys.Narrative);
  }

  init(data: NarrativeSceneData): void {
    this.spawnX = data.spawnX;
    this.fadeInMs = data.fadeInMs ?? 420;
    this.dialogueOnlyMode = false;
    const requestedLocation =
      data.locationKey ?? this.registry.get(RegistryKeys.CurrentLocation);
    this.location =
      locations[(requestedLocation as LocationKey) ?? "cafe-night"];
    this.interactions = [];
    this.weather = [];
    this.activeInteraction = undefined;
    this.inputLocked = false;
  }

  create(): void {
    this.gameState = new GameState(this.registry);
    this.gameState.currentLocation = this.location.key;
    this.audioDirector = new AudioDirector(this);

    this.createInput();
    this.createWorld();
    this.createInteractions();
    this.createPlayer();
    this.createCharacters();
    this.createCamera();
    this.createUi();
    this.createAtmosphere();

    const memorisePlaying = getBgm(this)?.isPlaying ?? false;
    this.audioDirector.playLocationAudio(
      this.location.ambienceKey,
      this.location.musicKey,
      memorisePlaying,
    );
    playBgmGame(this);
    this.cameras.main.resetFX();
    this.cameras.main.fadeIn(this.fadeInMs, 0, 0, 0);
    this.transition.showLocationTitle(this.location.title);

    if (this.dialogueOnlyMode && this.location.autoDialogueId) {
      this.inputLocked = true;
      this.time.delayedCall(Math.max(480, this.fadeInMs * 0.55), () => {
        const script = dialogueScripts[this.location.autoDialogueId!];
        if (script) {
          this.runDialogue(script);
        }
      });
    }
  }

  update(_time: number, delta: number): void {
    if (!this.dialogueOnlyMode) {
      this.player.update(this.keys, this.inputLocked);
      this.updateInteractionFocus();
      this.checkEdgeTransitions();
    }
    this.updateWeather(delta);
  }

  private createInput(): void {
    this.keys = this.input.keyboard!.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      d: Phaser.Input.Keyboard.KeyCodes.D,
      e: Phaser.Input.Keyboard.KeyCodes.E,
    }) as typeof this.keys;
  }

  private createWorld(): void {
    this.physics.world.setBounds(0, 0, this.location.worldWidth, GAME_HEIGHT);
    const background = this.add
      .image(0, 0, this.location.backgroundKey)
      .setOrigin(0, 0)
      .setDepth(0);
    if (this.location.backgroundCrop) {
      const crop = this.location.backgroundCrop;
      background.setCrop(crop.x, crop.y, crop.width, crop.height);
    }
    if (this.location.realBackground) {
      background.setDisplaySize(GAME_WIDTH, GAME_HEIGHT);
    }

    const vignette = this.add.graphics().setScrollFactor(0).setDepth(75);
    const vignetteColor = hexToNumber("#08060a");
    vignette.fillGradientStyle(
      vignetteColor,
      vignetteColor,
      vignetteColor,
      vignetteColor,
      0.28,
      0.04,
      0.34,
      0.5,
    );
    vignette.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  }

  private createCharacters(): void {
    this.location.characters?.forEach((character) => {
      const sprite = this.add
        .sprite(
          character.x,
          character.y,
          character.textureKey ?? "character-silhouette",
        )
        .setOrigin(0.5, 1)
        .setDepth(character.depth ?? 17)
        .setAlpha(
          character.visibleInLocation === false ? 0 : (character.alpha ?? 0.92),
        );

      sprite.setScale(character.scale ?? 1);
      sprite.setFlipX(character.flipX ?? false);

      if (character.idleAnimationKey) {
        sprite.play(character.idleAnimationKey);
      }

      if (character.tint) {
        sprite.setTint(character.tint);
      }

      this.tweens.add({
        targets: sprite,
        y: sprite.y - 3,
        duration: 1900,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      });
    });
  }

  private createInteractions(): void {
    this.interactions = this.location.interactions.map(
      (definition) => new InteractionZone(this, definition),
    );
  }

  private createPlayer(): void {
    const isFirstCafeScene = this.location.key === "cafe-night";
    const isSecondCafeScene = this.location.key === "cafe-cozy-table";
    const isCafeScene = isFirstCafeScene || isSecondCafeScene;
    const x = this.spawnX ?? (this.location.key === "cafe-night" ? 230 : 520);
    const playerTexture = isSecondCafeScene
      ? "yura-stay"
      : isFirstCafeScene
        ? "liza-stay"
        : "player";
    const idleAnimation = isSecondCafeScene
      ? "yura-idle"
      : isFirstCafeScene
        ? "liza-idle"
        : "player-idle";
    const walkAnimation = isSecondCafeScene
      ? "yura-walk"
      : isFirstCafeScene
        ? "liza-walk"
        : "player-walk";
    const playerScale = isSecondCafeScene ? 1.12 : isFirstCafeScene ? 1.5 : 1;

    this.dialogueOnlyMode = this.location.dialogueOnly === true;

    this.player = new Player(
      this,
      x,
      this.location.groundY,
      this.audioDirector,
      {
        textureKey: playerTexture,
        idleAnimationKey: idleAnimation,
        walkAnimationKey: walkAnimation,
        scale: playerScale,
        speed: isCafeScene ? 155 : 175,
        bodyWidth: isSecondCafeScene ? 74 : isFirstCafeScene ? 48 : 42,
        bodyHeight: isSecondCafeScene ? 260 : isFirstCafeScene ? 164 : 130,
        bodyOffsetX: isSecondCafeScene ? 42 : isFirstCafeScene ? 34 : 27,
        bodyOffsetY: isSecondCafeScene ? 96 : isFirstCafeScene ? 44 : 34,
      },
    );

    if (this.dialogueOnlyMode) {
      this.player.setVisible(false);
      this.player.disableBody();
    }
  }

  private createCamera(): void {
    this.cameras.main.setBounds(0, 0, this.location.worldWidth, GAME_HEIGHT);
    if (this.dialogueOnlyMode) {
      this.cameras.main.centerOn(GAME_WIDTH / 2, GAME_HEIGHT / 2);
    } else {
      this.cameras.main.startFollow(this.player, true, 0.075, 0.075, 0, 56);
    }
    this.cameras.main.setZoom(this.location.cameraZoom);
  }

  private createUi(): void {
    this.prompt = new InteractionPrompt(this);
    this.dialogueBox = new DialogueBox(this, this.gameState);
    this.transition = new SceneTransition(this);
  }

  private createAtmosphere(): void {
    if (!this.location.weather) {
      return;
    }

    const textureKey =
      this.location.weather === "rain"
        ? "rain-streak"
        : this.location.weather === "snow"
          ? "snow-flake"
          : "dust-mote";
    const count = this.location.weather === "rain" ? 95 : 65;

    for (let index = 0; index < count; index += 1) {
      const sprite = this.add
        .image(
          Phaser.Math.Between(0, GAME_WIDTH),
          Phaser.Math.Between(-40, GAME_HEIGHT),
          textureKey,
        )
        .setScrollFactor(0)
        .setDepth(70)
        .setAlpha(
          this.location.weather === "dust" ? 0.42 : 0.58,
        ) as WeatherSprite;

      sprite.drift =
        this.location.weather === "rain"
          ? Phaser.Math.FloatBetween(-0.06, 0.02)
          : Phaser.Math.FloatBetween(-0.04, 0.05);
      sprite.fallSpeed =
        this.location.weather === "rain"
          ? Phaser.Math.FloatBetween(0.65, 1.1)
          : Phaser.Math.FloatBetween(0.12, 0.42);
      this.weather.push(sprite);
    }
  }

  private updateInteractionFocus(): void {
    let nearest: InteractionZone | undefined;

    this.interactions.forEach((interaction) => {
      const isNear = interaction.isNear(this.player);
      interaction.setActive(isNear);
      if (isNear && !nearest) {
        nearest = interaction;
      }
    });

    this.activeInteraction = nearest;

    if (!nearest || this.inputLocked) {
      this.prompt.hide();
      return;
    }

    this.prompt.show(
      nearest.promptX,
      nearest.promptY,
      nearest.definition.prompt,
    );

    if (Phaser.Input.Keyboard.JustDown(this.keys.e)) {
      this.handleInteraction(nearest);
    }
  }

  private handleInteraction(interaction: InteractionZone): void {
    const { definition } = interaction;

    if (definition.kind === "transition" && definition.targetLocation) {
      this.fadeToLocation(
        definition.targetLocation as LocationKey,
        definition.targetX,
      );
      return;
    }

    if (!definition.dialogueId) {
      return;
    }

    const script = dialogueScripts[definition.dialogueId];
    if (!script) {
      return;
    }

    this.inputLocked = true;
    this.prompt.hide();

    if (definition.kind === "memory") {
      this.cameras.main.zoomTo(
        this.location.cameraZoom + 0.045,
        650,
        "Sine.easeInOut",
        true,
      );
    }

    this.runDialogue(script, {
      restoreZoomOnComplete: definition.kind === "memory",
    });
  }

  private runDialogue(
    script: DialogueScript,
    options: { restoreZoomOnComplete?: boolean } = {},
  ): void {
    this.dialogueBox.start(script, {
      onStart: () => this.prompt.hide(),
      onComplete: () => {
        if (options.restoreZoomOnComplete) {
          this.cameras.main.zoomTo(
            this.location.cameraZoom,
            620,
            "Sine.easeInOut",
            true,
          );
        } else if (!this.dialogueOnlyMode) {
          this.inputLocked = false;
        }

        const transition = script.onCompleteTransition;
        if (transition) {
          this.scheduleSceneTransition(
            transition.targetLocation as LocationKey,
            transition.spawnX,
            transition,
          );
        } else if (this.dialogueOnlyMode) {
          this.inputLocked = false;
        }
      },
    });
  }

  private scheduleSceneTransition(
    target: LocationKey,
    spawnX: number | undefined,
    transition?: DialogueScript["onCompleteTransition"],
  ): void {
    this.inputLocked = true;
    this.prompt.hide();

    const fadeOutMs = transition?.fadeOutMs ?? 360;
    const switchDelayMs = transition?.switchDelayMs ?? 380;
    const fadeInMs = transition?.fadeInMs ?? 420;

    this.cameras.main.fadeOut(fadeOutMs, 0, 0, 0);
    this.time.delayedCall(switchDelayMs, () => {
      this.switchToLocation(target, spawnX, fadeInMs);
    });
  }

  private checkEdgeTransitions(): void {
    if (this.inputLocked) {
      return;
    }

    if (this.player.x <= 32 && this.location.leftExit) {
      this.fadeToLocation(
        this.location.leftExit,
        locations[this.location.leftExit].worldWidth - 180,
      );
    }

    if (
      this.player.x >= this.location.worldWidth - 32 &&
      this.location.rightExit
    ) {
      this.fadeToLocation(this.location.rightExit, 160);
    }
  }

  private fadeToLocation(target: LocationKey, spawnX = 180): void {
    if (this.inputLocked) {
      return;
    }

    this.scheduleSceneTransition(target, spawnX);
  }

  private switchToLocation(
    target: LocationKey,
    spawnX = 180,
    fadeInMs = 420,
  ): void {
    this.cameras.main.resetFX();
    this.scene.restart({ locationKey: target, spawnX, fadeInMs });
  }

  private updateWeather(delta: number): void {
    if (!this.weather.length) {
      return;
    }

    this.weather.forEach((sprite) => {
      sprite.y += sprite.fallSpeed * delta * 0.18;
      sprite.x += sprite.drift * delta;

      if (sprite.y > GAME_HEIGHT + 40) {
        sprite.y = Phaser.Math.Between(-80, -20);
        sprite.x = Phaser.Math.Between(0, GAME_WIDTH);
      }
    });
  }
}
