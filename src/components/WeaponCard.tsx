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

  return (
    <article className="weapon-card">
      <div className="weapon-card__header">
        <div>
          <span className="weapon-card__type">
            {weapon.type === "exotic" ? "Exotic" : "Named"}
          </span>

          <h2>{weapon.name}</h2>
        </div>

        <span className="weapon-card__weapon-type">{weapon.weaponType}</span>
      </div>

      {weapon.baseVariant && (
        <p className="weapon-card__variant">Base: {weapon.baseVariant}</p>
      )}

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
    </article>
  );
}

export default WeaponCard