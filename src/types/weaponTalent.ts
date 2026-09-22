import type { ModeValue } from './common'

export interface WeaponTalent {
  id: string
  name: string
  perfectName?: string | null
  weaponTypes: string[]
  description: ModeValue<string>
}
