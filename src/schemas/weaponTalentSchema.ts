import { z } from "zod";

const modeValueSchema = z.object({
  pve: z.string(),
  pvp: z.string().nullable().optional(),
});

const weaponTalentVersionSchema = z.object({
  name: z.string().nullable(),
  description: modeValueSchema.nullable(),
});

const weaponTalentCategorySchema = z.enum([
  "all",
  "rifle",
  "assault-rifle",
  "marksman-rifle",
  "submachine-gun",
  "light-machine-gun",
  "shotgun",
  "pistol",
]);

const weaponTalentVariantSchema = z.object({
  weaponTypes: z.array(weaponTalentCategorySchema).min(1),

  normal: weaponTalentVersionSchema,
  perfect: weaponTalentVersionSchema,
});

export const weaponTalentSchema = z.object({
  id: z.string().min(1),
  variants: z.array(weaponTalentVariantSchema).min(1),
});

export const weaponTalentsSchema = z.array(weaponTalentSchema);