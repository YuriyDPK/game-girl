import { GameState } from '../core/GameState';
import type { DialogueChoice, DialogueNode, DialogueScript } from '../dialogues/types';

type DialogueCallbacks = {
  onStart?: () => void;
  onComplete?: () => void;
  onTerminalNodeComplete?: (node: DialogueNode, script: DialogueScript) => void;
};

export class DialogueBox extends Phaser.GameObjects.Container {
  private readonly ownerScene: Phaser.Scene;
  private readonly panel: Phaser.GameObjects.Rectangle;
  private readonly speakerText: Phaser.GameObjects.Text;
  private readonly bodyText: Phaser.GameObjects.Text;
  private readonly continueText: Phaser.GameObjects.Text;
  private readonly choiceContainer: Phaser.GameObjects.Container;
  private script?: DialogueScript;
  private currentNode?: DialogueNode;
  private typingEvent?: Phaser.Time.TimerEvent;
  private fullText = '';
  private typedLength = 0;
  private callbacks?: DialogueCallbacks;
  private autoCloseEvent?: Phaser.Time.TimerEvent;
  private isTyping = false;
  private isOpen = false;
  private completionNotified = false;
  private terminalNodeNotified = false;
  private destroyedOnce = false;
  private readonly shutdownHandler = (): void => this.destroy(true);

  constructor(
    scene: Phaser.Scene,
    private readonly gameState: GameState
  ) {
    super(scene, 640, 565);
    this.ownerScene = scene;

    this.panel = scene.add
      .rectangle(0, 0, 930, 190, 0x171116, 0.84)
      .setStrokeStyle(1, 0xf4c889, 0.22)
      .setOrigin(0.5);
    this.speakerText = scene.add
      .text(-420, -72, '', {
        fontFamily: 'Georgia, serif',
        fontSize: '18px',
        color: '#f5c784'
      })
      .setOrigin(0, 0.5);
    this.bodyText = scene.add
      .text(-420, -38, '', {
        fontFamily: 'Georgia, serif',
        fontSize: '22px',
        color: '#f7ead9',
        lineSpacing: 8,
        wordWrap: { width: 820 }
      })
      .setOrigin(0, 0);
    this.continueText = scene.add
      .text(410, 68, 'Пробел / клик', {
        fontFamily: 'Inter, sans-serif',
        fontSize: '12px',
        color: '#d7b992'
      })
      .setOrigin(1, 0.5)
      .setAlpha(0.65);
    this.choiceContainer = scene.add.container(-420, 30);

    this.add([this.panel, this.speakerText, this.bodyText, this.continueText, this.choiceContainer]);
    this.setDepth(100);
    this.setAlpha(0);
    this.setVisible(false);
    scene.add.existing(this);

    scene.input.keyboard?.on('keydown-SPACE', this.advance, this);
    scene.input.keyboard?.on('keydown-ENTER', this.advance, this);
    scene.input.on('pointerdown', this.advance, this);
    scene.events.once(Phaser.Scenes.Events.SHUTDOWN, this.shutdownHandler);
  }

  start(script: DialogueScript, callbacks: DialogueCallbacks = {}): void {
    this.script = script;
    this.callbacks = callbacks;
    this.completionNotified = false;
    this.autoCloseEvent?.remove(false);
    this.autoCloseEvent = undefined;
    this.isOpen = true;
    this.setVisible(true);
    this.callbacks.onStart?.();

    this.scene.tweens.add({
      targets: this,
      alpha: 1,
      y: 552,
      duration: 280,
      ease: 'Sine.easeOut'
    });

    this.showNode(script.start);
  }

  private showNode(nodeId: string): void {
    if (!this.script) {
      return;
    }

    const node = this.script.nodes[nodeId];
    if (!node) {
      this.close();
      return;
    }

    this.currentNode = node;
    this.terminalNodeNotified = false;
    this.autoCloseEvent?.remove(false);
    this.autoCloseEvent = undefined;
    this.speakerText.setText(node.speaker);
    this.fullText = node.text;
    this.typedLength = 0;
    this.bodyText.setText('');
    this.choiceContainer.removeAll(true);
    this.continueText.setVisible(!node.choices);
    this.isTyping = true;

    this.typingEvent?.remove(false);
    this.typingEvent = this.scene.time.addEvent({
      delay: 24,
      repeat: this.fullText.length,
      callback: () => {
        this.typedLength += 1;
        this.bodyText.setText(this.fullText.slice(0, this.typedLength));

        if (this.typedLength >= this.fullText.length) {
          this.finishTyping();
        }
      }
    });

  }

  private finishTyping(): void {
    this.typingEvent?.remove(false);
    this.bodyText.setText(this.fullText);
    this.isTyping = false;

    if (this.currentNode?.choices) {
      this.renderChoices(this.currentNode.choices);
    }
  }

  private notifyTerminalNodeComplete(): void {
    if (
      this.terminalNodeNotified ||
      !this.currentNode ||
      this.currentNode.next ||
      this.currentNode.choices ||
      !this.script
    ) {
      return;
    }

    this.terminalNodeNotified = true;
    this.callbacks?.onTerminalNodeComplete?.(this.currentNode, this.script);
  }

  private renderChoices(choices: DialogueChoice[]): void {
    this.choiceContainer.removeAll(true);

    choices.forEach((choice, index) => {
      const choiceText = this.scene.add
        .text(0, index * 34, choice.text, {
          fontFamily: 'Inter, sans-serif',
          fontSize: '16px',
          color: '#f5d2a2'
        })
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => choiceText.setColor('#ffffff'))
        .on('pointerout', () => choiceText.setColor('#f5d2a2'))
        .on('pointerdown', (pointer: Phaser.Input.Pointer) => {
          pointer.event.stopPropagation();
          this.choose(choice);
        });

      this.choiceContainer.add(choiceText);
    });
  }

  private choose(choice: DialogueChoice): void {
    if (choice.setFlag) {
      this.gameState.setFlag(choice.setFlag);
    }

    this.showNode(choice.next);
  }

  private advance(): void {
    if (!this.isOpen || this.currentNode?.choices) {
      return;
    }

    if (this.isTyping) {
      this.finishTyping();
      return;
    }

    this.advancePastNode();
  }

  private advancePastNode(): void {
    if (this.currentNode?.next) {
      this.showNode(this.currentNode.next);
      return;
    }

    this.notifyTerminalNodeComplete();
    this.close();
  }

  private close(): void {
    if (!this.isOpen) {
      return;
    }

    this.isOpen = false;
    this.autoCloseEvent?.remove(false);
    this.autoCloseEvent = undefined;
    this.notifyComplete();
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      y: 570,
      duration: 220,
      onComplete: () => {
        this.setVisible(false);
      }
    });
  }

  private notifyComplete(): void {
    if (this.completionNotified) {
      return;
    }

    this.completionNotified = true;
    const callbacks = this.callbacks;
    this.callbacks = undefined;
    callbacks?.onComplete?.();
  }

  destroy(fromScene?: boolean): void {
    if (this.destroyedOnce) {
      return;
    }

    this.destroyedOnce = true;
    this.typingEvent?.remove(false);
    this.autoCloseEvent?.remove(false);
    this.ownerScene.events.off(Phaser.Scenes.Events.SHUTDOWN, this.shutdownHandler);
    this.ownerScene.input?.keyboard?.off('keydown-SPACE', this.advance, this);
    this.ownerScene.input?.keyboard?.off('keydown-ENTER', this.advance, this);
    this.ownerScene.input?.off('pointerdown', this.advance, this);
    super.destroy(fromScene);
  }
}
