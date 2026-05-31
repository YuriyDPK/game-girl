import { RegistryKeys } from './constants';

export type StoryFlags = Record<string, boolean | string | number>;

export class GameState {
  constructor(private readonly registry: Phaser.Data.DataManager) {}

  get currentLocation(): string {
    return this.registry.get(RegistryKeys.CurrentLocation) ?? 'cafe-night';
  }

  set currentLocation(locationKey: string) {
    this.registry.set(RegistryKeys.CurrentLocation, locationKey);
  }

  get flags(): StoryFlags {
    const flags = this.registry.get(RegistryKeys.StoryFlags) as StoryFlags | undefined;
    if (flags) {
      return flags;
    }

    const freshFlags: StoryFlags = {};
    this.registry.set(RegistryKeys.StoryFlags, freshFlags);
    return freshFlags;
  }

  setFlag(key: string, value: boolean | string | number = true): void {
    this.flags[key] = value;
  }

  hasFlag(key: string): boolean {
    return Boolean(this.flags[key]);
  }
}
