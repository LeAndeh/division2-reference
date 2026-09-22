import type { ModeValue } from './common'

export interface GearSet {
  id: string
  name: string
  coreAttributes: string[]
  twoPieceBonus?: ModeValue<string> | null
  threePieceBonus?: ModeValue<string> | null
  fourPieceTalent?: ModeValue<string> | null
  chestTalent?: ModeValue<string> | null
  backpackTalent?: ModeValue<string> | null
  source?: string | null
}
