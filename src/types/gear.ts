import type { ItemRarity, ModeValue } from './common'

export interface GearAttribute {
  name: string
  value?: ModeValue<string> | null
  fixed?: boolean
}

export interface GearItem {
  id: string
  name: string
  rarity: ItemRarity
  slot: string
  brand?: string | null
  talentName?: string | null
  talentDescription?: ModeValue<string> | null
  coreAttribute?: GearAttribute | null
  attributes?: GearAttribute[]
  source?: string | null
  notes?: string | null
}
