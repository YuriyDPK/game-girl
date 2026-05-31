import type { InteractionDefinition } from "./types";

/** Множитель эллипса «рядом с точкой» (подсказка E и подсветка маркера). */
const NEAR_RANGE_MULTIPLIER = 1.5;

export class InteractionZone {
  readonly marker: Phaser.GameObjects.Image;
  private readonly zone: Phaser.GameObjects.Zone;

  constructor(
    private readonly scene: Phaser.Scene,
    readonly definition: InteractionDefinition,
  ) {
    this.zone = scene.add.zone(
      definition.x,
      definition.y,
      definition.width ?? 120,
      definition.height ?? 150,
    );
    this.zone.setOrigin(0.5, 1);

    this.marker = scene.add
      .image(definition.x, definition.y - 116, "interaction-glow")
      .setDepth(18)
      .setAlpha(0.72);
    this.marker.setPosition(this.markerX, this.markerY);

    scene.tweens.add({
      targets: this.marker,
      y: this.marker.y - 6,
      alpha: 0.42,
      yoyo: true,
      repeat: -1,
      duration: 1550,
      ease: "Sine.easeInOut",
    });
  }

  get x(): number {
    return this.definition.x;
  }

  get y(): number {
    return this.definition.y;
  }

  get markerX(): number {
    return this.definition.x + (this.definition.markerOffsetX ?? 0);
  }

  get markerY(): number {
    return this.definition.y - 116 + (this.definition.markerOffsetY ?? 0);
  }

  get promptX(): number {
    return (
      this.definition.x +
      (this.definition.promptOffsetX ?? this.definition.markerOffsetX ?? 0)
    );
  }

  get promptY(): number {
    return (
      this.definition.y -
      170 +
      (this.definition.promptOffsetY ?? this.definition.markerOffsetY ?? 0)
    );
  }

  setActive(active: boolean): void {
    this.marker.setScale(active ? 1.18 : 1);
    this.marker.setAlpha(active ? 0.95 : 0.54);
  }

  isNear(
    player: Phaser.GameObjects.GameObject & { x: number; y: number },
  ): boolean {
    const width =
      (this.definition.interactionRadiusX ??
        Math.max(this.zone.width * 1.15, 220)) * NEAR_RANGE_MULTIPLIER;
    const height =
      (this.definition.interactionRadiusY ??
        Math.max(this.zone.height * 1.25, 230)) * NEAR_RANGE_MULTIPLIER;
    const distanceX = Math.abs(player.x - this.definition.x);
    const distanceY = Math.abs(player.y - this.definition.y);

    return distanceX <= width && distanceY <= height;
  }

  destroy(): void {
    this.marker.destroy();
    this.zone.destroy();
  }
}
