export type ItemRarity = 'named' | 'exotic'

export interface ModeValue<T> {
  pve: T
  pvp?: T | null
}
