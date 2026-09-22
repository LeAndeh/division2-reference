import { useState } from 'react'
import { ModeToggle } from './components/ModeToggle'
import type { GameMode } from './types/gameMode'
import './styles/app.css'

const categories = [
  ['Named & Exotic Weapons', 'weapons'],
  ['Weapon Talents', 'weapon talents'],
  ['Gear Sets', 'gear sets'],
  ['Brand Sets', 'brand sets'],
  ['Named & Exotic Gear', 'gear'],
  ['Gear Talents', 'gear talents'],
] as const

function App() {
  const [mode, setMode] = useState<GameMode>('pve')

  return (
    <div className="app-shell">
      <header className="site-header">
        <div>
          <p className="eyebrow">DIVISION 2 REFERENCE</p>
          <h1>Field Reference</h1>
          <p className="subtitle">
            Searchable reference data for weapons, gear, talents, brands, and sets.
          </p>
        </div>

        <ModeToggle mode={mode} onChange={setMode} />
      </header>

      <main>
        <section className="status-bar" aria-live="polite">
          Viewing <strong>{mode.toUpperCase()}</strong> values
        </section>

        <section className="category-grid" aria-label="Reference categories">
          {categories.map(([title, description]) => (
            <button className="category-card" type="button" key={title}>
              <span>{title}</span>
              <small>Browse {description}</small>
            </button>
          ))}
        </section>
      </main>

      <footer>
        Unofficial fan-made reference project. Not affiliated with or endorsed by Ubisoft.
      </footer>
    </div>
  )
}

export default App
