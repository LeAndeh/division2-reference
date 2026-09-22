import type { ItemRarity, ModeValue } from './common'

export interface Weapon {
  id: string
  name: string
  rarity: ItemRarity
  weaponType: string
  baseVariant?: string | null
  talentName?: string | null
  uniqueAttribute?: ModeValue<string> | null
  exoticMods?: string[]
  source?: string | null
  notes?: string | null
}
