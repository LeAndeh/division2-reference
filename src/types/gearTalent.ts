import type { ModeValue } from './common'

export interface GearTalent {
  id: string
  name: string
  perfectName?: string | null
  slot: 'chest' | 'backpack'
  category?: string | null
  description: ModeValue<string>
}
