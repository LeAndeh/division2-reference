import { z } from "zod";

const modeValueSchema = z.object({
  pve: z.string().min(1),
  pvp: z.string().nullable().optional(),
});

const gearTalentVersionSchema = z.object({
  name: z.string().nullable(),
  description: modeValueSchema.nullable(),
});

export const gearTalentSchema = z.object({
  id: z.string().min(1),
  slot: z.enum(["chest", "backpack"]),
  category: z.string().min(1),
  normal: gearTalentVersionSchema,
  perfect: gearTalentVersionSchema,
  pvpModifier: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export const gearTalentsSchema = z.array(gearTalentSchema);
