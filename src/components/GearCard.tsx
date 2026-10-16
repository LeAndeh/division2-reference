import type { GameMode } from "../types/gameMode";
import type { GearItem } from "../types/gear";

interface GearCardProps {
  item: GearItem;
  mode: GameMode;
}

function formatSlot(value: string) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getModeText(
  value: { pve: string; pvp?: string | null } | null,
  mode: GameMode,
) {
  if (!value) return null;
  return mode === "pvp" && value.pvp ? value.pvp : value.pve;
}

function GearCard({ item, mode }: GearCardProps) {
  const talentDescription = item.talent
    ? getModeText(item.talent.description, mode)
    : null;

  const specialEffect = getModeText(item.specialEffect, mode);

  return (
    <article
      className={`gear-card gear-card--${item.type}`}
      aria-label={`${item.name}, ${item.type} gear`}
    >
      <div className="gear-card__header">
        <div>
          <h3>{item.name}</h3>
          {item.brand && <p className="gear-card__brand">{item.brand}</p>}
        </div>
      </div>

      {item.talent && (
        <div className="gear-card__talent">
          <h4>{item.talent.name}</h4>
          {talentDescription && <p>{talentDescription}</p>}
        </div>
      )}

      {!item.talent && specialEffect && (
        <div className="gear-card__special">
          <h4>Unique Effect</h4>
          <p>{specialEffect}</p>
        </div>
      )}

      {item.source && (
        <p className="gear-card__source">
          <strong>Source:</strong> {item.source}
        </p>
      )}

      <details className="gear-card__details">
        <summary>View details</summary>

        <div className="gear-card__details-content">
          <div className="gear-card__detail-row">
            <span>Gear Slot</span>
            <strong>{formatSlot(item.slot)}</strong>
          </div>

          {item.brand && (
            <div className="gear-card__detail-row">
              <span>Brand</span>
              <strong>{item.brand}</strong>
            </div>
          )}

          {item.coreAttribute && (
            <div className="gear-card__detail-block">
              <span>Core Attribute</span>
              <p>{item.coreAttribute}</p>
            </div>
          )}

          {item.minorAttributes.length > 0 && (
            <div className="gear-card__detail-block">
              <span>Attributes / Slots</span>
              <ul>
                {item.minorAttributes.map((attribute, index) => (
                  <li key={`${item.id}-attribute-${index}`}>{attribute}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </details>
    </article>
  );
}

export default GearCard;
