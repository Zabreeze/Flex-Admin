import type { Setting } from './interfaces'
import { CacheTypeEnum } from '@/enums/cacheEnum'

export const projectSetting: Setting.ProjectSetting = {
  permissionCacheType: CacheTypeEnum.LOCAL,
}
