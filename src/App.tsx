import { useState } from "react";
import { ModeToggle } from "./components/ModeToggle";
import type { GameMode } from "./types/gameMode";
import "./styles/app.css";

import { WeaponSection } from "./components/WeaponSection";
import { WeaponTalentSection } from "./components/WeaponTalentSection";
import { GearSetSection } from "./components/GearSetSection";
import { BrandSetSection } from "./components/BrandSetSection";

type Category =
  | "weapons"
  | "weapon-talents"
  | "gearsets"
  | "brandsets"
  | "gear"
  | "gear-talents";

const categories = [
  ["Named & Exotic Weapons", "weapons", "Browse weapons"],
  ["Weapon Talents", "weapon-talents", "Browse weapon talents"],
  ["Gear Sets", "gearsets", "Browse gear sets"],
  ["Brand Sets", "brandsets", "Browse brand sets"],
  ["Named & Exotic Gear", "gear", "Browse gear"],
  ["Gear Talents", "gear-talents", "Browse gear talents"],
] as const;

function App() {
  const [mode, setMode] = useState<GameMode>("pve");

  const [activeCategory, setActiveCategory] =
    useState<Category>("weapons");

  return (
    <div className="app-shell">
      <header className="site-header">
        <div>
          <p className="eyebrow">DIVISION 2 REFERENCE v0.1.0</p>

          <h1>Reference Sheet</h1>

          <p className="subtitle">
            Searchable reference data for weapons, gear, talents, brands, and
            sets.
          </p>

          <p className="project-note">
            I just wanted to stop using the Google Sheet compendium. It's an
            excellent resource, but I wanted something a bit more interactive
            and easier to navigate.
          </p>
        </div>

        <ModeToggle mode={mode} onChange={setMode} />
      </header>

      <main>
        <section className="status-bar" aria-live="polite">
          Viewing <strong>{mode.toUpperCase()}</strong> values
        </section>

        <section className="category-grid" aria-label="Reference categories">
          {categories.map(([title, category, description]) => (
            <button
              className={
                activeCategory === category
                  ? "category-card active"
                  : "category-card"
              }
              type="button"
              key={category}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              <span>{title}</span>
              <small>{description}</small>
            </button>
          ))}
        </section>

        {activeCategory === "weapons" && <WeaponSection mode={mode} />}

        {activeCategory === "weapon-talents" && (
          <WeaponTalentSection mode={mode} />
        )}

        {activeCategory === "gearsets" && (
          <GearSetSection mode={mode} />
        )}

        {activeCategory === "brandsets" && (
          <BrandSetSection mode={mode} />
        )}

        {activeCategory === "gear" && (
          <section className="empty-state">
            <h2>Named & Exotic Gear</h2>
            <p>This section has not been implemented yet.</p>
          </section>
        )}

        {activeCategory === "gear-talents" && (
          <section className="empty-state">
            <h2>Gear Talents</h2>
            <p>This section has not been implemented yet.</p>
          </section>
        )}
      </main>

      <footer>
        Unofficial fan-made reference project. Not affiliated with or endorsed
        by Ubisoft.
      </footer>
    </div>
  );
}

export default App;
