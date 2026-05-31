export class InteractionPrompt extends Phaser.GameObjects.Container {
  private readonly background: Phaser.GameObjects.Rectangle;
  private readonly label: Phaser.GameObjects.Text;
  private currentText = "";

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0);

    this.background = scene.add
      .rectangle(0, 0, 146, 34, 0x171316, 0.78)
      .setStrokeStyle(1, 0xf4c889, 0.38)
      .setOrigin(0.5);
    this.label = scene.add
      .text(0, -1, "Нажмите E", {
        fontFamily: "Georgia, serif",
        fontSize: "17px",
        color: "#f8dfbd",
      })
      .setOrigin(0.5);

    this.add([this.background, this.label]);
    this.setDepth(80);
    this.setAlpha(0);
    this.setVisible(false);
    scene.add.existing(this);
  }

  show(x: number, y: number, action: string): void {
    const text = "Нажмите E";
    this.setPosition(x, y);
    if (this.currentText !== text) {
      this.currentText = text;
      this.label.setText(text);
    }
    this.background.width = Math.max(132, this.label.width + 34);

    if (!this.visible) {
      this.setVisible(true);
      this.scene.tweens.killTweensOf(this);
      this.scene.tweens.add({
        targets: this,
        alpha: 1,
        y: y - 4,
        duration: 160,
        ease: "Sine.easeOut",
      });
      return;
    }

    this.setAlpha(1);
  }

  hide(): void {
    if (!this.visible) {
      return;
    }

    this.scene.tweens.killTweensOf(this);
    this.setAlpha(0);
    this.setVisible(false);
  }
}
