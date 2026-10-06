import { useState } from "react";

import brandSetsData from "../data/brandsets.json";
import BrandSetCard from "./BrandSetCard";

import type { GameMode } from "../types/gameMode";
import type { BrandSet, BrandSetCoreAttribute } from "../types/brandSet";

interface BrandSetSectionProps {
  mode: GameMode;
}

const brandSets = brandSetsData as BrandSet[];

type CoreFilter = "all" | BrandSetCoreAttribute;

function normalizeSearchValue(value: string) {
  return value.toLowerCase().replace(/-/g, " ").trim();
}

function formatCoreAttribute(value: CoreFilter) {
  switch (value) {
    case "all":
      return "All Core Attributes";
    case "armor":
      return "Armor";
    case "skill-tier":
      return "Skill Tier";
    case "weapon-damage":
      return "Weapon Damage";
  }
}

export function BrandSetSection({ mode }: BrandSetSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [coreFilter, setCoreFilter] = useState<CoreFilter>("all");

  const query = normalizeSearchValue(searchTerm);

  const filteredBrandSets = brandSets
    .filter((brandSet) => {
      const searchableValues = [
        brandSet.name,
        brandSet.coreAttribute,
        brandSet.bonuses.pve.onePiece,
        brandSet.bonuses.pve.twoPiece,
        brandSet.bonuses.pve.threePiece,
        brandSet.bonuses.pvp?.onePiece,
        brandSet.bonuses.pvp?.twoPiece,
        brandSet.bonuses.pvp?.threePiece,
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
        coreFilter === "all" || brandSet.coreAttribute === coreFilter;

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
    <section className="brand-sets-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">BRAND SETS</p>
          <h2>Brand Sets</h2>
        </div>

        <span className="result-count">
          {filteredBrandSets.length} results
        </span>
      </div>

      <div className="brand-set-filters">
        <input
          type="search"
          placeholder="Search brand sets or bonuses..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          aria-label="Search brand sets"
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

      {filteredBrandSets.length > 0 ? (
        <div className="brand-set-grid">
          {filteredBrandSets.map((brandSet) => (
            <BrandSetCard
              key={brandSet.id}
              brandSet={brandSet}
              mode={mode}
            />
          ))}
        </div>
      ) : (
        <p className="empty-state">
          No brand sets match your current filters.
        </p>
      )}
    </section>
  );
}
