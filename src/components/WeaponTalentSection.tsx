import { useState } from "react";

import weaponTalentsData from "../data/weapon-talents.json";

import WeaponTalentCard from "./WeaponTalentCard";

import type { GameMode } from "../types/gameMode";
import type {
  WeaponTalent,
  WeaponTalentCategory,
} from "../types/weaponTalent";

interface WeaponTalentSectionProps {
  mode: GameMode;
}

const weaponTalents =
  weaponTalentsData as WeaponTalent[];

const weaponTypeOptions: WeaponTalentCategory[] = [
  "all",
  "rifle",
  "assault-rifle",
  "marksman-rifle",
  "submachine-gun",
  "light-machine-gun",
  "shotgun",
  "pistol",
];

function formatWeaponType(value: WeaponTalentCategory) {
  if (value === "all") {
    return "All Weapon Types";
  }

  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function normalizeSearchValue(value: string) {
  return value
    .toLowerCase()
    .replace(/-/g, " ")
    .trim();
}

export function WeaponTalentSection({
  mode,
}: WeaponTalentSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [weaponType, setWeaponType] =
    useState<WeaponTalentCategory>("all");

  const query = normalizeSearchValue(searchTerm);

  const filteredTalents = weaponTalents.filter((talent) => {
    const matchesSearch =
      !query ||
      talent.variants.some((variant) => {
        const searchableValues = [
          ...variant.weaponTypes,
          variant.normal.name,
          variant.normal.description?.pve,
          variant.normal.description?.pvp,
          variant.perfect.name,
          variant.perfect.description?.pve,
          variant.perfect.description?.pvp,
        ];

        return searchableValues.some(
          (value) =>
            value !== null &&
            value !== undefined &&
            normalizeSearchValue(value).includes(query),
        );
      });

    const matchesWeaponType =
      weaponType === "all" ||
      talent.variants.some(
        (variant) =>
          variant.weaponTypes.includes("all") ||
          variant.weaponTypes.includes(weaponType),
      );

    return matchesSearch && matchesWeaponType;
  });

  return (
    <section className="weapon-talents-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">WEAPON TALENTS</p>
          <h2>Weapon Talents</h2>
        </div>

        <span className="result-count">
          {filteredTalents.length} results
        </span>
      </div>

      <div className="weapon-talent-filters">
        <input
          type="search"
          placeholder="Search talents, effects, or weapon types..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
          aria-label="Search weapon talents"
        />

        <select
          value={weaponType}
          onChange={(event) =>
            setWeaponType(
              event.target.value as WeaponTalentCategory,
            )
          }
          aria-label="Filter by weapon type"
        >
          {weaponTypeOptions.map((type) => (
            <option key={type} value={type}>
              {formatWeaponType(type)}
            </option>
          ))}
        </select>
      </div>

      {filteredTalents.length > 0 ? (
        <div className="weapon-talent-grid">
          {filteredTalents.map((talent) => (
            <WeaponTalentCard
              key={talent.id}
              talent={talent}
              mode={mode}
            />
          ))}
        </div>
      ) : (
        <p className="empty-state">
          No weapon talents match your current filters.
        </p>
      )}
    </section>
  );
}