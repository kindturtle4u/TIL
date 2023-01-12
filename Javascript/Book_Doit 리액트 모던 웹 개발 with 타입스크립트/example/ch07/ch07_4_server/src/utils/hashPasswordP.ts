import bcrypt from 'bcrypt'
const saltRounds = 10

export const hashPasswordP = (password: string) =>
  new Promise<string>(async (resolve, reject) => {
    try {
      const salt = await bcrypt.genSalt(saltRounds)
      const hash = await bcrypt.hash(password, salt)
      resolve(hash)
    } catch (e) {
      reject(e)
    }
  })

export const comparePasswordP = (password: string, hashedPassword: string) =>
  new Promise<boolean>(async (resolve, reject) => {
    try {
      const result = await bcrypt.compare(password, hashedPassword)
      resolve(result) // true if same password
    } catch (e) {
      reject(e)
    }
  })
