import { z } from "zod";

const modeValueSchema = z.object({
  pve: z.string(),
  pvp: z.string().nullable().optional(),
});

const gearTalentSchema = z.object({
  name: z.string().min(1),
  description: modeValueSchema,
});

const gearSlotSchema = z.enum([
  "mask",
  "backpack",
  "chest",
  "gloves",
  "holster",
  "kneepads",
]);

export const gearItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  type: z.enum(["named", "exotic"]),
  slot: gearSlotSchema,
  brand: z.string().nullable(),
  coreAttribute: z.string().nullable(),
  minorAttributes: z.array(z.string()),
  talent: gearTalentSchema.nullable(),
  specialEffect: modeValueSchema.nullable(),
  source: z.string().nullable(),
});

export const gearSchema = z.array(gearItemSchema);
