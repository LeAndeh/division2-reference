import { z } from "zod";

const brandSetCoreAttributeSchema = z.enum([
  "armor",
  "skill-tier",
  "weapon-damage",
]);

const brandSetBonusesSchema = z.object({
  onePiece: z.string().min(1),
  twoPiece: z.string().min(1),
  threePiece: z.string().min(1),
});

const modeBonusesSchema = z.object({
  pve: brandSetBonusesSchema,
  pvp: brandSetBonusesSchema.nullable().optional(),
});

export const brandSetSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  coreAttribute: brandSetCoreAttributeSchema,
  bonuses: modeBonusesSchema,
});

export const brandSetsSchema = z.array(brandSetSchema);
