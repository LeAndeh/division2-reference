import type { ItemRarity, ModeValue } from "./common";

export interface WeaponTalentInfo {
  name: string;
  description: ModeValue<string>;
}

export interface WeaponSpecialEffect {
  description: ModeValue<string>;
}

export interface Weapon {
  id: string;
  name: string;
  type: ItemRarity;
  weaponType: string;
  baseVariant?: string | null;

  talent?: WeaponTalentInfo | null;
  specialEffects?: WeaponSpecialEffect[];

  canUseNormalTalent?: boolean;

  exoticMods?: string[];
  source?: string | null;
  notes?: string | null;
}