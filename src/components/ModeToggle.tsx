import type { GameMode } from '../types/gameMode'

interface ModeToggleProps {
  mode: GameMode
  onChange: (mode: GameMode) => void
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="mode-toggle" role="group" aria-label="Game mode">
      <button
        type="button"
        className={mode === 'pve' ? 'active' : ''}
        aria-pressed={mode === 'pve'}
        onClick={() => onChange('pve')}
      >
        PvE
      </button>
      <button
        type="button"
        className={mode === 'pvp' ? 'active' : ''}
        aria-pressed={mode === 'pvp'}
        onClick={() => onChange('pvp')}
      >
        PvP
      </button>
    </div>
  )
}
