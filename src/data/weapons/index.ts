import assaultRifles from "./assault-rifles.json";
import rifles from "./rifles.json";
import marksmanRifles from "./marksman-rifles.json";
import submachineGuns from "./submachine-guns.json";
import lightMachineGuns from "./light-machine-guns.json";
import shotguns from "./shotguns.json";
import pistols from "./pistols.json";
import type { Weapon } from "../../types/weapon";

// JSON literals are checked by npm run validate:data before deployment.
export const weapons: Weapon[] = [
  ...assaultRifles,
  ...rifles,
  ...marksmanRifles,
  ...submachineGuns,
  ...lightMachineGuns,
  ...shotguns,
  ...pistols,
] as Weapon[];
