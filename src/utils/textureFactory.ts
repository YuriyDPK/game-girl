import Phaser from 'phaser';
import type { LocationDefinition } from '../scenes/locationData';
import { hexToNumber, withAlpha } from './color';

type CanvasContext = CanvasRenderingContext2D;

const addNoise = (ctx: CanvasContext, width: number, height: number, alpha = 0.045): void => {
  const image = ctx.getImageData(0, 0, width, height);

  for (let index = 0; index < image.data.length; index += 4) {
    const noise = (Math.random() - 0.5) * 28;
    image.data[index] += noise;
    image.data[index + 1] += noise;
    image.data[index + 2] += noise;
    image.data[index + 3] = Math.min(image.data[index + 3], 255 * alpha);
  }

  ctx.putImageData(image, 0, 0);
};

const drawSoftLight = (
  ctx: CanvasContext,
  x: number,
  y: number,
  radius: number,
  color: string,
  intensity: number
): void => {
  const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
  glow.addColorStop(0, withAlpha(color, intensity));
  glow.addColorStop(0.45, withAlpha(color, intensity * 0.35));
  glow.addColorStop(1, withAlpha(color, 0));
  ctx.fillStyle = glow;
  ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
};

const drawBuildingBand = (
  ctx: CanvasContext,
  location: LocationDefinition,
  y: number,
  height: number,
  count: number,
  alpha: number
): void => {
  const step = location.worldWidth / count;

  for (let index = 0; index < count; index += 1) {
    const width = step * Phaser.Math.FloatBetween(0.55, 1.2);
    const x = index * step + Phaser.Math.FloatBetween(-30, 30);
    const buildingHeight = height * Phaser.Math.FloatBetween(0.65, 1.15);

    ctx.fillStyle = withAlpha(location.palette.foreground, alpha);
    ctx.fillRect(x, y - buildingHeight, width, buildingHeight);

    if (index % 2 === 0) {
      ctx.fillStyle = withAlpha(location.palette.light, 0.2);
      ctx.fillRect(x + width * 0.52, y - buildingHeight + 36, 10, 42);
    }
  }
};

export class TextureFactory {
  static createLocationBackground(scene: Phaser.Scene, location: LocationDefinition): void {
    if (scene.textures.exists(location.backgroundKey)) {
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = location.worldWidth;
    canvas.height = 720;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const sky = ctx.createLinearGradient(0, 0, 0, 720);
    sky.addColorStop(0, location.palette.skyTop);
    sky.addColorStop(0.58, location.palette.skyBottom);
    sky.addColorStop(1, location.palette.foreground);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, location.worldWidth, 720);

    drawSoftLight(ctx, location.worldWidth * 0.22, 180, 460, location.palette.horizon, 0.42);
    drawSoftLight(ctx, location.worldWidth * 0.72, 210, 420, location.palette.accent, 0.26);

    drawBuildingBand(ctx, location, location.groundY - 58, 260, 15, 0.35);
    drawBuildingBand(ctx, location, location.groundY - 26, 180, 23, 0.56);

    TextureFactory.drawLocationSpecifics(ctx, location);

    ctx.fillStyle = location.palette.foreground;
    ctx.fillRect(0, location.groundY, location.worldWidth, 160);

    const groundGlow = ctx.createLinearGradient(0, location.groundY, 0, 720);
    groundGlow.addColorStop(0, withAlpha(location.palette.light, 0.18));
    groundGlow.addColorStop(1, withAlpha('#000000', 0.25));
    ctx.fillStyle = groundGlow;
    ctx.fillRect(0, location.groundY, location.worldWidth, 130);

    addNoise(ctx, location.worldWidth, 720, 1);
    scene.textures.addCanvas(location.backgroundKey, canvas);
  }

  static createProceduralSprites(scene: Phaser.Scene): void {
    TextureFactory.createPlayerSheet(scene);
    TextureFactory.createInteractionTextures(scene);
    TextureFactory.createCharacterSilhouette(scene);
    TextureFactory.createWeatherTextures(scene);
  }

  private static drawLocationSpecifics(ctx: CanvasContext, location: LocationDefinition): void {
    const { groundY, palette, key } = location;

    if (key === 'cafe-night') {
      for (let index = 0; index < 5; index += 1) {
        const x = 260 + index * 250;
        drawSoftLight(ctx, x, groundY - 210, 190, palette.light, 0.55);
        ctx.fillStyle = withAlpha(palette.light, 0.62);
        ctx.fillRect(x - 36, groundY - 250, 72, 112);
      }
    }
  }

  private static createPlayerSheet(scene: Phaser.Scene): void {
    if (scene.textures.exists('player')) {
      return;
    }

    const frameWidth = 96;
    const frameHeight = 168;
    const frames = 6;
    const canvas = document.createElement('canvas');
    canvas.width = frameWidth * frames;
    canvas.height = frameHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    for (let frame = 0; frame < frames; frame += 1) {
      const x = frame * frameWidth;
      const sway = Math.sin(frame * 1.2) * 3;
      const step = Math.sin(frame * 1.8) * 7;

      ctx.save();
      ctx.translate(x + frameWidth / 2 + sway, 0);
      drawSoftLight(ctx, 0, 95, 62, '#ffd1a1', 0.13);

      ctx.fillStyle = '#19171b';
      ctx.beginPath();
      ctx.ellipse(0, 58, 22, 24, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#2c2730';
      ctx.beginPath();
      ctx.roundRect(-20, 78, 40, 58, 18);
      ctx.fill();

      ctx.strokeStyle = '#171419';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-10, 133);
      ctx.lineTo(-18 - step * 0.2, 158);
      ctx.moveTo(10, 133);
      ctx.lineTo(16 + step * 0.2, 158);
      ctx.stroke();

      ctx.strokeStyle = '#403740';
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(-18, 92);
      ctx.lineTo(-30, 126 + step * 0.1);
      ctx.moveTo(18, 92);
      ctx.lineTo(29, 122 - step * 0.1);
      ctx.stroke();

      ctx.fillStyle = '#f0b98f';
      ctx.beginPath();
      ctx.arc(0, 54, 17, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#171316';
      ctx.beginPath();
      ctx.ellipse(-4, 43, 21, 15, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    scene.textures.addSpriteSheet('player', canvas as unknown as HTMLImageElement, {
      frameWidth,
      frameHeight,
      endFrame: frames - 1
    });
  }

  private static createInteractionTextures(scene: Phaser.Scene): void {
    const graphics = scene.add.graphics({ x: 0, y: 0 }).setVisible(false);

    graphics.clear();
    graphics.fillStyle(hexToNumber('#f7c987'), 0.95);
    graphics.fillCircle(24, 24, 7);
    graphics.lineStyle(2, hexToNumber('#f7c987'), 0.35);
    graphics.strokeCircle(24, 24, 18);
    graphics.generateTexture('interaction-glow', 48, 48);

    graphics.clear();
    graphics.fillStyle(hexToNumber('#f4d3a4'), 0.85);
    graphics.fillRoundedRect(0, 0, 120, 28, 8);
    graphics.generateTexture('prompt-pill', 120, 28);

    graphics.destroy();
  }

  private static createCharacterSilhouette(scene: Phaser.Scene): void {
    if (scene.textures.exists('character-silhouette')) {
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = 110;
    canvas.height = 180;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    drawSoftLight(ctx, 55, 88, 70, '#ffd4ba', 0.18);
    ctx.fillStyle = '#2d252c';
    ctx.beginPath();
    ctx.ellipse(55, 55, 22, 25, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(31, 78, 48, 80, 22);
    ctx.fill();
    ctx.fillStyle = '#19151a';
    ctx.beginPath();
    ctx.ellipse(50, 43, 27, 20, -0.2, 0, Math.PI * 2);
    ctx.fill();

    scene.textures.addCanvas('character-silhouette', canvas);
  }

  private static createWeatherTextures(scene: Phaser.Scene): void {
    const graphics = scene.add.graphics({ x: 0, y: 0 }).setVisible(false);

    graphics.clear();
    graphics.lineStyle(2, 0xd9e5ed, 0.5);
    graphics.lineBetween(2, 2, 10, 24);
    graphics.generateTexture('rain-streak', 12, 28);

    graphics.clear();
    graphics.fillStyle(0xeaf3f6, 0.78);
    graphics.fillCircle(5, 5, 4);
    graphics.generateTexture('snow-flake', 10, 10);

    graphics.clear();
    graphics.fillStyle(0xf4c889, 0.22);
    graphics.fillCircle(4, 4, 3);
    graphics.generateTexture('dust-mote', 8, 8);

    graphics.destroy();
  }
}
