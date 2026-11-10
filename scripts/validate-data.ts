import * as fs from "node:fs";
import * as path from "node:path";
import type { ZodType } from "zod";
import { changelogSchema } from "../src/schemas/changelogSchema.js";

import { weaponsSchema } from "../src/schemas/weaponSchema.js";
import { weaponTalentsSchema } from "../src/schemas/weaponTalentSchema.js";
import { gearSetsSchema } from "../src/schemas/gearSetSchema.js";
import { brandSetsSchema } from "../src/schemas/brandSetSchema.js";
import { gearSchema } from "../src/schemas/gearSchema.js";
import { gearTalentsSchema } from "../src/schemas/gearTalentSchema.js";

// Validate every shard independently, retaining one ID registry for the collection.
function validateShards<T extends { id: string }>(
  directory: string,
  label: string,
  schema: ZodType<T[]>,
) {
  const ids = new Map<string, string>();
  const files = fs.readdirSync(directory).filter((file) => file.endsWith(".json")).sort();
  if (files.length === 0) throw new Error(`No JSON files found in ${directory}`);

  console.log(`${label} data valid:`);
  for (const file of files) {
    const filePath = path.join(directory, file);
    const data: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const result = schema.safeParse(data);
    if (!result.success) {
      for (const issue of result.error.issues) {
        console.error(`${filePath}: ${issue.path.join(".") || "(root)"}: ${issue.message}`);
      }
      throw new Error(`${label} data validation failed: ${filePath}`);
    }
    for (const item of result.data) {
      const previousFile = ids.get(item.id);
      if (previousFile !== undefined) {
        throw new Error(`Duplicate ${label.toLowerCase()} id: ${item.id} (${previousFile} and ${file})`);
      }
      ids.set(item.id, file);
    }
    console.log(`- ${file}: ${result.data.length} records checked`);
  }
  console.log(`${ids.size} total records, no duplicate IDs.`);
}

validateShards(path.resolve("src/data/weapons"), "Weapon", weaponsSchema);

const weaponTalentsData: unknown = JSON.parse(
  fs.readFileSync(path.resolve("src/data/weapon-talents.json"), "utf8"),
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

// brand set validation

const brandSetsPath = path.resolve("src/data/brandsets.json");
const brandSetsRawJson = fs.readFileSync(brandSetsPath, "utf8");
const brandSetsData: unknown = JSON.parse(brandSetsRawJson);
const brandSetsResult = brandSetsSchema.safeParse(brandSetsData);

if (!brandSetsResult.success) {
  console.error("Brand set data validation failed:\n");

  for (const issue of brandSetsResult.error.issues) {
    console.error(
      `Path: ${issue.path.join(".") || "(root)"}\n` +
        `Error: ${issue.message}\n`,
    );
  }

  throw new Error("Brand set data validation failed.");
}

const brandSetIds = new Set<string>();

for (const brandSet of brandSetsResult.data) {
  if (brandSetIds.has(brandSet.id)) {
    throw new Error(`Duplicate brand set id: ${brandSet.id}`);
  }

  brandSetIds.add(brandSet.id);
}

console.log(
  `Brand set data valid: ${brandSetsResult.data.length} records checked, no duplicate IDs.`,
);

// gear validation
validateShards(path.resolve("src/data/gear"), "Gear", gearSchema);

// gear talent validation

const gearTalentsPath = path.resolve("src/data/gear-talents.json");
const gearTalentsRawJson = fs.readFileSync(gearTalentsPath, "utf8");
const gearTalentsData: unknown = JSON.parse(gearTalentsRawJson);
const gearTalentsResult = gearTalentsSchema.safeParse(gearTalentsData);

if (!gearTalentsResult.success) {
  console.error("Gear talent data validation failed:\n");

  for (const issue of gearTalentsResult.error.issues) {
    console.error(
      `Path: ${issue.path.join(".") || "(root)"}\n` +
        `Error: ${issue.message}\n`,
    );
  }

  throw new Error("Gear talent data validation failed.");
}

const gearTalentIds = new Set<string>();

for (const talent of gearTalentsResult.data) {
  if (gearTalentIds.has(talent.id)) {
    throw new Error(`Duplicate gear talent id: ${talent.id}`);
  }

  gearTalentIds.add(talent.id);
}

console.log(
  `Gear talent data valid: ${gearTalentsResult.data.length} records checked, no duplicate IDs.`,
);

// changelog validation
const changelogData: unknown = JSON.parse(
  fs.readFileSync(path.resolve("src/data/changelog.json"), "utf8"),
);
const changelogResult = changelogSchema.safeParse(changelogData);

if (!changelogResult.success) {
  for (const issue of changelogResult.error.issues) {
    console.error(`Path: ${issue.path.join(".") || "(root)"}\nError: ${issue.message}\n`);
  }
  throw new Error("Changelog validation failed.");
}

console.log(`Changelog valid: ${changelogResult.data.entries.length} entries checked.`);
