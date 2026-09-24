import { getUserLevel } from '@/lib/auth'
import { LEVEL_IDS, type LevelId } from '@/lib/levels'

export const PREVIEW_AUTH = import.meta.env.DEV && import.meta.env.VITE_PREVIEW_AUTH === '1'

const PREVIEW_LEVEL = Number(import.meta.env.VITE_PREVIEW_LEVEL ?? '5')

function isLevelId(level: number | null): level is LevelId {
  return LEVEL_IDS.includes(level as LevelId)
}

export function currentLevel(): LevelId | null {
  const level = PREVIEW_AUTH ? PREVIEW_LEVEL : getUserLevel()
  return isLevelId(level) ? level : null
}
