import { useState } from "react";

import gearSetsData from "../data/gearsets.json";
import GearSetCard from "./GearSetCard";

import type { GameMode } from "../types/gameMode";
import type { GearSet, GearSetCoreAttribute } from "../types/gearSet";

interface GearSetSectionProps {
  mode: GameMode;
}

const gearSets = gearSetsData as GearSet[];

type CoreFilter = "all" | GearSetCoreAttribute;

function normalizeSearchValue(value: string) {
  return value.toLowerCase().replace(/-/g, " ").trim();
}

function formatCoreAttribute(value: CoreFilter) {
  switch (value) {
    case "all":
      return "All Core Attributes";
    case "weapon-damage":
      return "Weapon Damage";
    case "skill-tier":
      return "Skill Tier";
    case "armor":
      return "Armor";
  }
}

export function GearSetSection({ mode }: GearSetSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [coreFilter, setCoreFilter] = useState<CoreFilter>("all");

  const query = normalizeSearchValue(searchTerm);

  const filteredGearSets = gearSets
    .filter((gearSet) => {
      const searchableValues = [
        gearSet.name,
        gearSet.source,
        ...gearSet.coreAttributes.flatMap((core) => [
          core.attribute,
          ...(core.slots ?? []),
        ]),
        gearSet.bonuses.twoPiece.pve,
        gearSet.bonuses.twoPiece.pvp,
        gearSet.bonuses.threePiece.pve,
        gearSet.bonuses.threePiece.pvp,
        gearSet.fourPiece.name,
        gearSet.fourPiece.description.pve,
        gearSet.fourPiece.description.pvp,
        gearSet.chestTalent.name,
        gearSet.chestTalent.description.pve,
        gearSet.chestTalent.description.pvp,
        gearSet.backpackTalent.name,
        gearSet.backpackTalent.description.pve,
        gearSet.backpackTalent.description.pvp,
      ];

      const matchesSearch =
        !query ||
        searchableValues.some(
          (value) =>
            value !== null &&
            value !== undefined &&
            normalizeSearchValue(value).includes(query),
        );

      const matchesCore =
        coreFilter === "all" ||
        gearSet.coreAttributes.some(
          (core) => core.attribute === coreFilter,
        );

      return matchesSearch && matchesCore;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const coreOptions: CoreFilter[] = [
    "all",
    "weapon-damage",
    "armor",
    "skill-tier",
  ];

  return (
    <section className="gear-sets-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">GEAR SETS</p>
          <h2>Gear Sets</h2>
        </div>

        <span className="result-count">
          {filteredGearSets.length} results
        </span>
      </div>

      <div className="gear-set-filters">
        <input
          type="search"
          placeholder="Search gear sets, bonuses, or talents..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          aria-label="Search gear sets"
        />

        <select
          value={coreFilter}
          onChange={(event) =>
            setCoreFilter(event.target.value as CoreFilter)
          }
          aria-label="Filter by core attribute"
        >
          {coreOptions.map((option) => (
            <option key={option} value={option}>
              {formatCoreAttribute(option)}
            </option>
          ))}
        </select>
      </div>

      {filteredGearSets.length > 0 ? (
        <div className="gear-set-grid">
          {filteredGearSets.map((gearSet) => (
            <GearSetCard
              key={gearSet.id}
              gearSet={gearSet}
              mode={mode}
            />
          ))}
        </div>
      ) : (
        <p className="empty-state">
          No gear sets match your current filters.
        </p>
      )}
    </section>
  );
}
