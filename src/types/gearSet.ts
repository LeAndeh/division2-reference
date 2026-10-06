import type { ModeValue } from "./common";

export type GearSetCoreAttribute =
  | "weapon-damage"
  | "armor"
  | "skill-tier";

export type GearSlot =
  | "mask"
  | "chest"
  | "holster"
  | "backpack"
  | "gloves"
  | "kneepads";

export interface GearSetCoreRule {
  attribute: GearSetCoreAttribute;
  slots?: GearSlot[];
}

export interface GearSetTalentInfo {
  name: string;
  description: ModeValue<string>;
}

export interface GearSet {
  id: string;
  name: string;
  coreAttributes: GearSetCoreRule[];
  bonuses: {
    twoPiece: ModeValue<string>;
    threePiece: ModeValue<string>;
  };
  fourPiece: GearSetTalentInfo;
  chestTalent: GearSetTalentInfo;
  backpackTalent: GearSetTalentInfo;
  source?: string | null;
}
