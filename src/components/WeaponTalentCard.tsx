import { useState } from "react";

import type { GameMode } from "../types/gameMode";
import type {
  WeaponTalent,
  WeaponTalentVariant,
} from "../types/weaponTalent";

interface WeaponTalentCardProps {
  talent: WeaponTalent;
  mode: GameMode;
}

type TalentVersion = "normal" | "perfect";

function formatWeaponType(value: string) {
  if (value === "all") {
    return "All Weapons";
  }

  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

interface TalentVariantProps {
  variant: WeaponTalentVariant;
  mode: GameMode;
}

function TalentVariant({ variant, mode }: TalentVariantProps) {
  const [version, setVersion] = useState<TalentVersion>("normal");

  const hasPerfect =
    variant.perfect.name !== null &&
    variant.perfect.description !== null;

  const selectedVersion =
    version === "perfect" && hasPerfect
      ? variant.perfect
      : variant.normal;

  const description =
    mode === "pvp" && selectedVersion.description?.pvp
      ? selectedVersion.description.pvp
      : selectedVersion.description?.pve;

  return (
    <div className="weapon-talent-card__variant">
      <div className="weapon-talent-card__types">
        {variant.weaponTypes.map((type) => (
          <span key={type}>{formatWeaponType(type)}</span>
        ))}
      </div>

      {hasPerfect && (
        <div
          className="weapon-talent-card__version-toggle"
          aria-label="Talent version"
        >
          <button
            type="button"
            className={version === "normal" ? "talent-version--normal active" : "talent-version--normal"}
            onClick={() => setVersion("normal")}
            aria-pressed={version === "normal"}
          >
            Normal
          </button>

          <button
            type="button"
            className={version === "perfect" ? "talent-version--perfect active" : "talent-version--perfect"}
            onClick={() => setVersion("perfect")}
            aria-pressed={version === "perfect"}
          >
            Perfect
          </button>
        </div>
      )}

      <h3 className={version === "perfect" && hasPerfect ? "talent-name--perfect" : undefined}>{selectedVersion.name}</h3>

      {description && (
        <p className="weapon-talent-card__description" tabIndex={0} aria-label="Talent description">
          {description}
        </p>
      )}
    </div>
  );
}

function WeaponTalentCard({
  talent,
  mode,
}: WeaponTalentCardProps) {
  return (
    <article className="weapon-talent-card">
      {talent.variants.map((variant, index) => (
        <TalentVariant
          key={`${talent.id}-${index}`}
          variant={variant}
          mode={mode}
        />
      ))}
    </article>
  );
}

export default WeaponTalentCard;