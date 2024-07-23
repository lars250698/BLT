import fs from 'fs'

export function writeFile<T>(path: string, val: T) {
  fs.writeFile(path, JSON.stringify(val), (err) => {
    if (err) {
      console.error(err)
    }
  })
}

export function readFileOrDefault<T>(path: string, defaultVal: T): T {
  try {
    const data = fs.readFileSync(path, { encoding: 'utf-8', flag: 'r' })
    return JSON.parse(data) as T
  } catch (err) {
    console.log("Can't read settings file, creating new default settings...")
  }
  return defaultVal
}
