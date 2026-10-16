import type { ModeValue } from "./common";

export type GearTalentSlot = "chest" | "backpack";

export interface GearTalentVersion {
  name: string | null;
  description: ModeValue<string> | null;
}

export interface GearTalent {
  id: string;
  slot: GearTalentSlot;
  category: string;
  normal: GearTalentVersion;
  perfect: GearTalentVersion;
  pvpModifier?: string | null;
  notes?: string | null;
}
