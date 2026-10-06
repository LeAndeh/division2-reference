import type { ModeValue } from "./common";

export type BrandSetCoreAttribute =
  | "armor"
  | "skill-tier"
  | "weapon-damage";

export interface BrandSetBonuses {
  onePiece: string;
  twoPiece: string;
  threePiece: string;
}

export interface BrandSet {
  id: string;
  name: string;
  coreAttribute: BrandSetCoreAttribute;
  bonuses: ModeValue<BrandSetBonuses>;
}
