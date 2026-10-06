import * as fs from "node:fs";
import * as path from "node:path";

import { weaponsSchema } from "../src/schemas/weaponSchema.js";
import { weaponTalentsSchema } from "../src/schemas/weaponTalentSchema.js";
import { gearSetsSchema } from "../src/schemas/gearSetSchema.js";

const weaponsPath = path.resolve("src/data/weapons.json");
const weaponTalentsPath = path.resolve("src/data/weapon-talents.json");
const weaponTalentsRawJson = fs.readFileSync(weaponTalentsPath, "utf8");

const weaponTalentsData: unknown = JSON.parse(weaponTalentsRawJson);
const rawJson = fs.readFileSync(weaponsPath, "utf8");
const weaponsData: unknown = JSON.parse(rawJson);

const result = weaponsSchema.safeParse(weaponsData);

// weapon data validation
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

// weapon talent validation

const weaponTalentsResult = weaponTalentsSchema.safeParse(weaponTalentsData);

if (!weaponTalentsResult.success) {
  console.error("Weapon talent data validation failed:\n");

  for (const issue of weaponTalentsResult.error.issues) {
    console.error(
      `Path: ${issue.path.join(".") || "(root)"}\n` +
        `Error: ${issue.message}\n`,
    );
  }

  throw new Error("Weapon talent data validation failed.");
}
const talentIds = new Set<string>();

for (const talent of weaponTalentsResult.data) {
  if (talentIds.has(talent.id)) {
    throw new Error(`Duplicate weapon talent id: ${talent.id}`);
  }

  talentIds.add(talent.id);
}
console.log(
  `Weapon talent data valid: ` +
    `${weaponTalentsResult.data.length} records checked, ` +
    `no duplicate IDs.`,
);

// gear set validation

const gearSetsPath = path.resolve("src/data/gearsets.json");
const gearSetsRawJson = fs.readFileSync(gearSetsPath, "utf8");
const gearSetsData: unknown = JSON.parse(gearSetsRawJson);
const gearSetsResult = gearSetsSchema.safeParse(gearSetsData);

if (!gearSetsResult.success) {
  console.error("Gear set data validation failed:\n");

  for (const issue of gearSetsResult.error.issues) {
    console.error(
      `Path: ${issue.path.join(".") || "(root)"}\n` +
        `Error: ${issue.message}\n`,
    );
  }

  throw new Error("Gear set data validation failed.");
}

const gearSetIds = new Set<string>();

for (const gearSet of gearSetsResult.data) {
  if (gearSetIds.has(gearSet.id)) {
    throw new Error(`Duplicate gear set id: ${gearSet.id}`);
  }

  gearSetIds.add(gearSet.id);
}

console.log(
  `Gear set data valid: ${gearSetsResult.data.length} records checked, no duplicate IDs.`,
);
