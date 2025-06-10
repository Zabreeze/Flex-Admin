export const deepClone = (obj: any) => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj)
  }

  if (obj instanceof Array) {
    const clone = []
    for (let i = 0; i < obj.length; i++) {
      clone[i] = deepClone(obj[i])
    }
    return clone
  }

  if (obj instanceof Object) {
    const clone = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = deepClone(obj[key])
      }
    }
    return clone
  }

  throw new Error("Unable to copy obj! Its type isn't supported.")
}
