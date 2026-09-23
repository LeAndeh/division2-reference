import { useState } from "react";
import weaponsData from "../data/weapons.json";
import WeaponCard from "./WeaponCard";
import type { Weapon } from "../types/weapon";
import type { GameMode } from "../types/gameMode";

interface WeaponsSectionProps {
  mode: GameMode;
}

const weapons = weaponsData as Weapon[];

function formatWeaponType(value: string) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function WeaponSection({ mode }: WeaponsSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemType, setItemType] = useState<"all" | "named" | "exotic">("all");
  const [weaponType, setWeaponType] = useState<string>("all");

  const weaponTypes = Array.from(
    new Set(weapons.map((weapon) => weapon.weaponType)),
  ).sort();

  const filteredWeapons = weapons
    .filter((weapon) => {
      const query = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !query ||
        weapon.name.toLowerCase().includes(query) ||
        weapon.baseVariant?.toLowerCase().includes(query) ||
        weapon.talent?.name.toLowerCase().includes(query) ||
        weapon.specialEffects?.some((effect) =>
          effect.description.pve.toLowerCase().includes(query),
        );

      const matchesItemType = itemType === "all" || weapon.type === itemType;

      const matchesWeaponType =
        weaponType === "all" || weapon.weaponType === weaponType;

      return matchesSearch && matchesItemType && matchesWeaponType;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
  return (
    <section className="weapons-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">WEAPONS</p>
          <h2>Named & Exotic Weapons</h2>
        </div>

        <span className="result-count">{filteredWeapons.length} results</span>
      </div>

      <div className="weapon-filters">
        <input
          type="search"
          placeholder="Search weapons or talents..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          aria-label="Search weapons"
        />

        <select
          value={itemType}
          onChange={(event) =>
            setItemType(event.target.value as "all" | "named" | "exotic")
          }
          aria-label="Filter by item type"
        >
          <option value="all">Named & Exotic</option>
          <option value="named">Named</option>
          <option value="exotic">Exotic</option>
        </select>

        <select
          value={weaponType}
          onChange={(event) => setWeaponType(event.target.value)}
          aria-label="Filter by weapon type"
        >
          <option value="all">All Weapon Types</option>

          {weaponTypes.map((type) => (
            <option key={type} value={type}>
              {formatWeaponType(type)}
            </option>
          ))}
        </select>
      </div>

      {filteredWeapons.length > 0 ? (
        <div className="weapon-grid">
          {filteredWeapons.map((weapon) => (
            <WeaponCard key={weapon.id} weapon={weapon} mode={mode} />
          ))}
        </div>
      ) : (
        <p className="empty-state">No weapons match your current filters.</p>
      )}
    </section>
  );
}
