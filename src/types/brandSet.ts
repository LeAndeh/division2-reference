import type { ModeValue } from './common'

export interface BrandSet {
  id: string
  name: string
  coreAttribute?: string | null
  bonuses: ModeValue<string[]>
}
