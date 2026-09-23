import type { Weapon } from '../types/weapon'
import type { GameMode } from '../types/gameMode'

interface WeaponCardProps {
  weapon: Weapon
  mode: GameMode
}

function WeaponCard({ weapon, mode }: WeaponCardProps) {
  const talentDescription = weapon.talent
    ? mode === 'pvp' && weapon.talent.description.pvp
      ? weapon.talent.description.pvp
      : weapon.talent.description.pve
    : null

function formatWeaponType(value: string) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

  return (
    <article
      className={`weapon-card weapon-card--${weapon.type}`}
      aria-label={`${weapon.name}, ${weapon.type} weapon`}
    >
      <div className="weapon-card__header">
        <div>
          <h2>{weapon.name}</h2>
        </div>

        {/* <span className="weapon-card__weapon-type">{weapon.weaponType}</span> */}
      </div>

      {/* weapon.baseVariant && (
        <p className="weapon-card__variant">Base: {weapon.baseVariant}</p>
      ) */}

      {weapon.talent && (
        <div className="weapon-card__talent">
          <h3>{weapon.talent.name}</h3>
          {talentDescription && <p>{talentDescription}</p>}
        </div>
      )}

      {weapon.specialEffects?.map((effect, index) => {
        const description =
          mode === "pvp" && effect.description.pvp
            ? effect.description.pvp
            : effect.description.pve;

        return (
          <div className="weapon-card__special" key={index}>
            <h3>Unique Effect</h3>
            <p>{description}</p>
          </div>
        );
      })}

      {weapon.canUseNormalTalent && (
        <p className="weapon-card__normal-talent">
          Can roll a normal weapon talent
        </p>
      )}

      {weapon.source && (
        <p className="weapon-card__source">
          <strong>Source:</strong> {weapon.source}
        </p>
      )}

      <details className="weapon-card__details">
        <summary>Extra details</summary>

        <div className="weapon-card__details-content">
          <div className="weapon-card__detail-row">
            <span>Weapon Category</span>
            <strong>{formatWeaponType(weapon.weaponType)}</strong>
          </div>

          {weapon.baseVariant && (
            <div className="weapon-card__detail-row">
              <span>Base Type</span>
              <strong>{weapon.baseVariant}</strong>
            </div>
          )}

          {weapon.exoticMods && weapon.exoticMods.length > 0 && (
            <div className="weapon-card__detail-block">
              <strong><span>Exotic Mods</span></strong>

              <ul>
                {weapon.exoticMods.map((mod, index) => (
                  <li key={`${weapon.id}-mod-${index}`}>{mod}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </details>
    </article>
  );
}

export default WeaponCard