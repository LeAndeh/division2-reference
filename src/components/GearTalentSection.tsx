import { useMemo, useState } from "react";
import gearTalentsData from "../data/gear-talents.json";
import type { GameMode } from "../types/gameMode";
import type { GearTalent, GearTalentSlot } from "../types/gearTalent";
import GearTalentCard from "./GearTalentCard";

interface GearTalentSectionProps {
  mode: GameMode;
}

const gearTalents = gearTalentsData as GearTalent[];

function normalizeSearchValue(value: string) {
  return value.toLowerCase().replace(/-/g, " ").trim();
}

export function GearTalentSection({ mode }: GearTalentSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [slot, setSlot] = useState<"all" | GearTalentSlot>("all");
  const [category, setCategory] = useState("all");

  const categories = useMemo(
    () => Array.from(new Set(gearTalents.map((talent) => talent.category))).sort(),
    [],
  );

  const filteredTalents = gearTalents
    .filter((talent) => {
      const query = normalizeSearchValue(searchTerm);

      const searchable = [
        talent.slot,
        talent.category,
        talent.normal.name,
        talent.normal.description?.pve,
        talent.normal.description?.pvp,
        talent.perfect.name,
        talent.perfect.description?.pve,
        talent.perfect.description?.pvp,
        talent.pvpModifier,
        talent.notes,
      ]
        .filter((value): value is string => Boolean(value))
        .map(normalizeSearchValue);

      const matchesSearch =
        !query || searchable.some((value) => value.includes(query));
      const matchesSlot = slot === "all" || talent.slot === slot;
      const matchesCategory =
        category === "all" || talent.category === category;

      return matchesSearch && matchesSlot && matchesCategory;
    })
    .sort((a, b) => a.normal.name!.localeCompare(b.normal.name!));

  return (
    <section className="gear-talents-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">GEAR TALENTS</p>
          <h2>Chest & Backpack Talents</h2>
        </div>

        <span className="result-count">{filteredTalents.length} results</span>
      </div>

      <div className="gear-talent-filters">
        <input
          type="search"
          placeholder="Search gear talents..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          aria-label="Search gear talents"
        />

        <select
          value={slot}
          onChange={(event) =>
            setSlot(event.target.value as "all" | GearTalentSlot)
          }
          aria-label="Filter by gear slot"
        >
          <option value="all">Chest & Backpack</option>
          <option value="chest">Chest</option>
          <option value="backpack">Backpack</option>
        </select>

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-label="Filter by talent category"
        >
          <option value="all">All Categories</option>
          {categories.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      {filteredTalents.length > 0 ? (
        <div className="gear-talent-grid">
          {filteredTalents.map((talent) => (
            <GearTalentCard key={talent.id} talent={talent} mode={mode} />
          ))}
        </div>
      ) : (
        <p className="empty-state">No gear talents match the current filters.</p>
      )}
    </section>
  );
}
