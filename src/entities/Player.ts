import Phaser from 'phaser';
import type { AudioDirector } from '../audio/AudioDirector';

type MovementKeys = {
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
  a: Phaser.Input.Keyboard.Key;
  d: Phaser.Input.Keyboard.Key;
};

export type PlayerOptions = {
  textureKey?: string;
  idleAnimationKey?: string;
  walkAnimationKey?: string;
  scale?: number;
  speed?: number;
  bodyWidth?: number;
  bodyHeight?: number;
  bodyOffsetX?: number;
  bodyOffsetY?: number;
};

export class Player extends Phaser.Physics.Arcade.Sprite {
  private readonly speed: number;
  private readonly idleAnimationKey: string;
  private readonly walkAnimationKey: string;
  private lastStepAt = 0;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    private readonly audioDirector: AudioDirector,
    options: PlayerOptions = {}
  ) {
    super(scene, x, y, options.textureKey ?? 'player', 0);

    this.speed = options.speed ?? 175;
    this.idleAnimationKey = options.idleAnimationKey ?? 'player-idle';
    this.walkAnimationKey = options.walkAnimationKey ?? 'player-walk';

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setOrigin(0.5, 1);
    this.setDepth(20);
    this.setScale(options.scale ?? 1);
    this.setCollideWorldBounds(true);
    this.body?.setSize(options.bodyWidth ?? 42, options.bodyHeight ?? 130);
    this.body?.setOffset(options.bodyOffsetX ?? 27, options.bodyOffsetY ?? 34);
  }

  update(keys: MovementKeys, locked: boolean): void {
    if (locked) {
      this.setVelocityX(0);
      this.play(this.idleAnimationKey, true);
      return;
    }

    const movingLeft = keys.left.isDown || keys.a.isDown;
    const movingRight = keys.right.isDown || keys.d.isDown;
    const direction = Number(movingRight) - Number(movingLeft);

    this.setVelocityX(direction * this.speed);

    if (direction !== 0) {
      this.setFlipX(direction < 0);
      this.play(this.walkAnimationKey, true);
      this.maybePlayFootstep();
      return;
    }

    this.play(this.idleAnimationKey, true);
  }

  private maybePlayFootstep(): void {
    const now = this.scene.time.now;
    if (now - this.lastStepAt < 390) {
      return;
    }

    this.lastStepAt = now;
    this.audioDirector.playFootstep();
  }
}
