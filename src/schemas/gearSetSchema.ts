import { z } from "zod";

const modeValueSchema = z.object({
  pve: z.string(),
  pvp: z.string().nullable().optional(),
});

const gearSlotSchema = z.enum([
  "mask",
  "chest",
  "holster",
  "backpack",
  "gloves",
  "kneepads",
]);

const gearSetCoreAttributeSchema = z.enum([
  "weapon-damage",
  "armor",
  "skill-tier",
]);

const gearSetCoreRuleSchema = z.object({
  attribute: gearSetCoreAttributeSchema,
  slots: z.array(gearSlotSchema).min(1).optional(),
});

const gearSetTalentInfoSchema = z.object({
  name: z.string().min(1),
  description: modeValueSchema,
});

export const gearSetSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  coreAttributes: z.array(gearSetCoreRuleSchema).min(1),
  bonuses: z.object({
    twoPiece: modeValueSchema,
    threePiece: modeValueSchema,
  }),
  fourPiece: gearSetTalentInfoSchema,
  chestTalent: gearSetTalentInfoSchema,
  backpackTalent: gearSetTalentInfoSchema,
  source: z.string().nullable().optional(),
});

export const gearSetsSchema = z.array(gearSetSchema);
