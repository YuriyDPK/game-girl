export class SceneTransition {
  private readonly title: Phaser.GameObjects.Text;

  constructor(private readonly scene: Phaser.Scene) {
    this.title = scene.add
      .text(42, 40, '', {
        fontFamily: 'Georgia, serif',
        fontSize: '22px',
        color: '#f8dfbd'
      })
      .setScrollFactor(0)
      .setDepth(90)
      .setAlpha(0);
  }

  showLocationTitle(title: string): void {
    this.title.setText(title);
    this.scene.tweens.add({
      targets: this.title,
      alpha: { from: 0, to: 0.82 },
      x: { from: 32, to: 42 },
      duration: 520,
      ease: 'Sine.easeOut',
      yoyo: true,
      hold: 1700
    });
  }
}
