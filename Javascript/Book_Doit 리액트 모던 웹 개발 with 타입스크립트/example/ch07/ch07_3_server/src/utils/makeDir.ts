import fs from 'fs'

export const makeDir = (dirName: string) => {
  if (false == fs.existsSync(dirName)) fs.mkdirSync(dirName)
}
