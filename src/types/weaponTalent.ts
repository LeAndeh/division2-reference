import type { ModeValue } from "./common";

export type WeaponTalentCategory =
  | "all"
  | "rifle"
  | "assault-rifle"
  | "marksman-rifle"
  | "submachine-gun"
  | "light-machine-gun"
  | "shotgun"
  | "pistol";

export interface WeaponTalentVersion {
  name: string | null;
  description: ModeValue<string> | null;
}

export interface WeaponTalentVariant {
  weaponTypes: WeaponTalentCategory[];

  normal: WeaponTalentVersion;
  perfect: WeaponTalentVersion;
}

export interface WeaponTalent {
  id: string;
  variants: WeaponTalentVariant[];
}