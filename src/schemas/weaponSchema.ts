import { z } from "zod";

const modeValueSchema = z.object({
  pve: z.string(),
  pvp: z.string().nullable().optional(),
});

const weaponTalentSchema = z.object({
  name: z.string(),
  description: modeValueSchema,
});

const weaponSpecialEffectSchema = z.object({
  description: modeValueSchema,
});

export const weaponSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  type: z.enum(["named", "exotic"]),
  weaponType: z.string().min(1),
  baseVariant: z.string().nullable().optional(),
  talent: weaponTalentSchema.nullable().optional(),
  specialEffects: z.array(weaponSpecialEffectSchema).optional(),
  canUseNormalTalent: z.boolean().optional(),
  exoticMods: z.array(z.string()).optional(),
  source: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export const weaponsSchema = z.array(weaponSchema);