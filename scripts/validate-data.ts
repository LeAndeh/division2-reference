import * as fs from "node:fs";
import * as path from "node:path";

import { weaponsSchema } from "../src/schemas/weaponSchema.js";

const weaponsPath = path.resolve("src/data/weapons.json");

const rawJson = fs.readFileSync(weaponsPath, "utf8");
const weaponsData: unknown = JSON.parse(rawJson);

const result = weaponsSchema.safeParse(weaponsData);

if (!result.success) {
  console.error("Weapon data validation failed:\n");

  for (const issue of result.error.issues) {
    console.error(
      `Path: ${issue.path.join(".") || "(root)"}\n` +
        `Error: ${issue.message}\n`,
    );
  }

  throw new Error("Weapon data validation failed.");
}

const ids = new Set<string>();

for (const weapon of result.data) {
  if (ids.has(weapon.id)) {
    throw new Error(`Duplicate weapon id: ${weapon.id}`);
  }

  ids.add(weapon.id);
}

console.log(
  `Weapon data valid: ${result.data.length} records checked, no duplicate IDs.`,
);