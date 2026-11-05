import { z } from "zod";

export const changelogSchema = z.object({
  currentPatch: z.string().min(1),
  lastUpdated: z.iso.date(),
  entries: z.array(z.object({
    date: z.iso.date(),
    patch: z.string().min(1).optional(),
    title: z.string().min(1),
    changes: z.array(z.string().min(1)).min(1),
  })).min(1),
});
