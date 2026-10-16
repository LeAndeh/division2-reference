import { useEffect, useState } from "react";
import type { GameMode } from "../types/gameMode";
import type { GearTalent } from "../types/gearTalent";

interface GearTalentCardProps {
  talent: GearTalent;
  mode: GameMode;
}

type TalentVersion = "normal" | "perfect";

function formatSlot(slot: GearTalent["slot"]) {
  return slot === "chest" ? "Chest" : "Backpack";
}

export default function GearTalentCard({ talent, mode }: GearTalentCardProps) {
  const hasPerfect =
    talent.perfect.name !== null && talent.perfect.description !== null;
  const [version, setVersion] = useState<TalentVersion>("normal");

  useEffect(() => {
    if (!hasPerfect && version === "perfect") {
      setVersion("normal");
    }
  }, [hasPerfect, version]);

  const selected =
    version === "perfect" && hasPerfect ? talent.perfect : talent.normal;

  if (!selected.name || !selected.description) {
    return null;
  }

  const description =
    mode === "pvp" && selected.description.pvp
      ? selected.description.pvp
      : selected.description.pve;

  return (
    <article className="gear-talent-card">
      <div className="gear-talent-card__meta">
        <span>{formatSlot(talent.slot)}</span>
        <span>{talent.category}</span>
      </div>

      <h2>{selected.name}</h2>

      {hasPerfect && (
        <div
          className="gear-talent-card__version-toggle"
          aria-label={`Choose version of ${talent.normal.name}`}
        >
          <button
            type="button"
            className={version === "normal" ? "active" : ""}
            onClick={() => setVersion("normal")}
            aria-pressed={version === "normal"}
          >
            Normal
          </button>
          <button
            type="button"
            className={version === "perfect" ? "active" : ""}
            onClick={() => setVersion("perfect")}
            aria-pressed={version === "perfect"}
          >
            Perfect
          </button>
        </div>
      )}

      <p className="gear-talent-card__description">{description}</p>

      {mode === "pvp" && talent.pvpModifier && (
        <p className="gear-talent-card__pvp-modifier">
          <strong>PvP modifier:</strong> {talent.pvpModifier}
        </p>
      )}

      {talent.notes && (
        <details className="gear-talent-card__details">
          <summary>Notes</summary>
          <p>{talent.notes}</p>
        </details>
      )}
    </article>
  );
}
