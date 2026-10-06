import type { GameMode } from "../types/gameMode";
import type {
  GearSet,
  GearSetCoreAttribute,
  GearSlot,
} from "../types/gearSet";
import type { ModeValue } from "../types/common";

interface GearSetCardProps {
  gearSet: GearSet;
  mode: GameMode;
}

function modeText(value: ModeValue<string>, mode: GameMode) {
  return mode === "pvp" && value.pvp ? value.pvp : value.pve;
}

function formatCoreAttribute(value: GearSetCoreAttribute) {
  switch (value) {
    case "weapon-damage":
      return "Weapon Damage";
    case "skill-tier":
      return "Skill Tier";
    case "armor":
      return "Armor";
  }
}

function formatSlot(value: GearSlot) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function GearSetCard({ gearSet, mode }: GearSetCardProps) {
  return (
    <article className="gear-set-card">
      <header className="gear-set-card__header">
        <h2>{gearSet.name}</h2>

        <div className="gear-set-card__cores">
          {gearSet.coreAttributes.map((core, index) => (
            <div key={`${gearSet.id}-core-${index}`}>
              <strong>{formatCoreAttribute(core.attribute)}</strong>
              {core.slots && (
                <small>
                  {core.slots.map(formatSlot).join(", ")}
                </small>
              )}
            </div>
          ))}
        </div>
      </header>

      <div className="gear-set-card__bonus">
        <h3>2-Piece</h3>
        <p>{modeText(gearSet.bonuses.twoPiece, mode)}</p>
      </div>

      <div className="gear-set-card__bonus">
        <h3>3-Piece</h3>
        <p>{modeText(gearSet.bonuses.threePiece, mode)}</p>
      </div>

      <div className="gear-set-card__talent">
        <h3>{gearSet.fourPiece.name}</h3>
        <p>{modeText(gearSet.fourPiece.description, mode)}</p>
      </div>

      <details className="gear-set-card__details">
        <summary>View talents & source</summary>

        <div className="gear-set-card__detail-block">
          <h3>Chest — {gearSet.chestTalent.name}</h3>
          <p>{modeText(gearSet.chestTalent.description, mode)}</p>
        </div>

        <div className="gear-set-card__detail-block">
          <h3>Backpack — {gearSet.backpackTalent.name}</h3>
          <p>{modeText(gearSet.backpackTalent.description, mode)}</p>
        </div>

        {gearSet.source && (
          <p className="gear-set-card__source">
            <strong>Source:</strong> {gearSet.source}
          </p>
        )}
      </details>
    </article>
  );
}

export default GearSetCard;
