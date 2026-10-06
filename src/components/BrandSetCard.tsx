import type { GameMode } from "../types/gameMode";
import type {
  BrandSet,
  BrandSetBonuses,
  BrandSetCoreAttribute,
} from "../types/brandSet";

interface BrandSetCardProps {
  brandSet: BrandSet;
  mode: GameMode;
}

function formatCoreAttribute(value: BrandSetCoreAttribute) {
  switch (value) {
    case "armor":
      return "Armor";
    case "skill-tier":
      return "Skill Tier";
    case "weapon-damage":
      return "Weapon Damage";
  }
}

function modeBonuses(brandSet: BrandSet, mode: GameMode): BrandSetBonuses {
  return mode === "pvp" && brandSet.bonuses.pvp
    ? brandSet.bonuses.pvp
    : brandSet.bonuses.pve;
}

function BrandSetCard({ brandSet, mode }: BrandSetCardProps) {
  const bonuses = modeBonuses(brandSet, mode);

  return (
    <article className="brand-set-card">
      <header className="brand-set-card__header">
        <h2>{brandSet.name}</h2>
        <span className="brand-set-card__core">
          {formatCoreAttribute(brandSet.coreAttribute)}
        </span>
      </header>

      <div className="brand-set-card__bonus">
        <h3>1-Piece</h3>
        <p>{bonuses.onePiece}</p>
      </div>

      <div className="brand-set-card__bonus">
        <h3>2-Piece</h3>
        <p>{bonuses.twoPiece}</p>
      </div>

      <div className="brand-set-card__bonus">
        <h3>3-Piece</h3>
        <p>{bonuses.threePiece}</p>
      </div>
    </article>
  );
}

export default BrandSetCard;
