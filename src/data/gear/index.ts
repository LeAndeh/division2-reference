import masks from "./masks.json";
import backpacks from "./backpacks.json";
import chests from "./chests.json";
import gloves from "./gloves.json";
import holsters from "./holsters.json";
import kneepads from "./kneepads.json";
import type { GearItem } from "../../types/gear";

// JSON literals are checked by npm run validate:data before deployment.
export const gear: GearItem[] = [
  ...masks,
  ...backpacks,
  ...chests,
  ...gloves,
  ...holsters,
  ...kneepads,
] as GearItem[];
