import type { ItemRarity, ModeValue } from "./common";

export type GearSlot =
  | "mask"
  | "backpack"
  | "chest"
  | "gloves"
  | "holster"
  | "kneepads";

export interface GearTalentInfo {
  name: string;
  description: ModeValue<string>;
}

export interface GearItem {
  id: string;
  name: string;
  type: ItemRarity;
  slot: GearSlot;
  brand: string | null;
  coreAttribute: string | null;
  minorAttributes: string[];
  talent: GearTalentInfo | null;
  specialEffect: ModeValue<string> | null;
  source: string | null;
}
