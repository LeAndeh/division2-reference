import { useState } from "react";

import gearData from "../data/gear.json";
import GearCard from "./GearCard";

import type { GameMode } from "../types/gameMode";
import type { GearItem, GearSlot } from "../types/gear";

interface GearSectionProps {
  mode: GameMode;
}

const gear = gearData as GearItem[];

const slotOptions: Array<"all" | GearSlot> = [
  "all",
  "mask",
  "backpack",
  "chest",
  "gloves",
  "holster",
  "kneepads",
];

function formatValue(value: string) {
  if (value === "all") return "All Gear Slots";

  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function normalizeSearchValue(value: string) {
  return value.toLowerCase().replace(/-/g, " ").trim();
}

export function GearSection({ mode }: GearSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemType, setItemType] = useState<"all" | "named" | "exotic">("all");
  const [slot, setSlot] = useState<"all" | GearSlot>("all");

  const query = normalizeSearchValue(searchTerm);

  const filteredGear = gear
    .filter((item) => {
      const searchableValues = [
        item.name,
        item.type,
        item.slot,
        item.brand,
        item.coreAttribute,
        ...item.minorAttributes,
        item.talent?.name,
        item.talent?.description.pve,
        item.talent?.description.pvp,
        item.specialEffect?.pve,
        item.specialEffect?.pvp,
        item.source,
      ];

      const matchesSearch =
        !query ||
        searchableValues.some(
          (value) =>
            value !== null &&
            value !== undefined &&
            normalizeSearchValue(value).includes(query),
        );

      const matchesType = itemType === "all" || item.type === itemType;
      const matchesSlot = slot === "all" || item.slot === slot;

      return matchesSearch && matchesType && matchesSlot;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className="gear-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">GEAR</p>
          <h2>Named & Exotic Gear</h2>
        </div>

        <span className="result-count">{filteredGear.length} results</span>
      </div>

      <div className="gear-filters">
        <input
          type="search"
          placeholder="Search gear, talents, brands, effects..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          aria-label="Search named and exotic gear"
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
          value={slot}
          onChange={(event) => setSlot(event.target.value as "all" | GearSlot)}
          aria-label="Filter by gear slot"
        >
          {slotOptions.map((option) => (
            <option key={option} value={option}>
              {formatValue(option)}
            </option>
          ))}
        </select>
      </div>

      {filteredGear.length > 0 ? (
        <div className="gear-grid">
          {filteredGear.map((item) => (
            <GearCard key={item.id} item={item} mode={mode} />
          ))}
        </div>
      ) : (
        <p className="empty-state">No gear matches your current filters.</p>
      )}
    </section>
  );
}
