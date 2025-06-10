// cache.ts
import { CacheTypeEnum, CacheKeyEnum } from '@/enums/cacheEnum'

export class Persistent {
  // ==================== 私有工具方法 ====================
  private static getStorage(type: CacheTypeEnum): Storage {
    return type === CacheTypeEnum.LOCAL ? localStorage : sessionStorage
  }

  private static get<T>(key: CacheKeyEnum, type: CacheTypeEnum): T | null {
    const storage = this.getStorage(type)
    const item = storage.getItem(key)

    if (item === null) return null

    try {
      return JSON.parse(item) as T
    } catch {
      return item as unknown as T
    }
  }

  private static set<T>(key: CacheKeyEnum, value: T, type: CacheTypeEnum): void {
    const storage = this.getStorage(type)

    if (value === undefined) {
      storage.removeItem(key)
      return
    }

    const valueToStore = typeof value === 'string' ? value : JSON.stringify(value)

    storage.setItem(key, valueToStore)
  }

  // ==================== 公共API ====================
  static getItem<T = any>(key: CacheKeyEnum, type: CacheTypeEnum = CacheTypeEnum.LOCAL): T | null {
    return this.get<T>(key, type)
  }

  static setItem<T = any>(
    key: CacheKeyEnum,
    value: T,
    type: CacheTypeEnum = CacheTypeEnum.LOCAL,
  ): void {
    this.set<T>(key, value, type)
  }

  static removeItem(key: CacheKeyEnum, type: CacheTypeEnum = CacheTypeEnum.LOCAL): void {
    this.getStorage(type).removeItem(key)
  }

  static clear(type: CacheTypeEnum = CacheTypeEnum.LOCAL): void {
    this.getStorage(type).clear()
  }

  // ==================== 快捷方法 ====================
  static getLocal<T = any>(key: CacheKeyEnum): T | null {
    return Persistent.get<T>(key, CacheTypeEnum.LOCAL) // 修改这里，使用 Persistent.get
  }

  static setLocal<T = any>(key: CacheKeyEnum, value: T): void {
    Persistent.set<T>(key, value, CacheTypeEnum.LOCAL) // 修改这里，使用 Persistent.set
  }

  static removeLocal(key: CacheKeyEnum): void {
    Persistent.removeItem(key, CacheTypeEnum.LOCAL) // 修改这里，使用 Persistent.removeItem
  }

  static getSession<T = any>(key: CacheKeyEnum): T | null {
    return Persistent.get<T>(key, CacheTypeEnum.SESSION) // 修改这里，使用 Persistent.get
  }

  static setSession<T = any>(key: CacheKeyEnum, value: T): void {
    Persistent.set<T>(key, value, CacheTypeEnum.SESSION) // 修改这里，使用 Persistent.set
  }

  static removeSession(key: CacheKeyEnum): void {
    Persistent.removeItem(key, CacheTypeEnum.SESSION) // 修改这里，使用 Persistent.removeItem
  }
}

// 确保导出实例（如果需要）
export const persistent = new Persistent()
