import type {Jwt, JwtPayload} from 'jsonwebtoken'
import {sign, verify} from 'jsonwebtoken'
import type {SignOptions, VerifyOptions} from 'jsonwebtoken'

const secret = 'very important secret'

export const jwtSignP = (payload: string | Buffer | object, options: SignOptions = {}) =>
  new Promise<string>((resolve, reject) => {
    try {
      const jwt = sign(payload, secret, options)
      resolve(jwt)
    } catch (e) {
      reject(e)
    }
  })

export const jwtVerifyP = (token: string, options: VerifyOptions = {}) =>
  new Promise<Jwt | JwtPayload | string>((resolve, reject) => {
    try {
      const decoded = verify(token, secret, options)
      resolve(decoded)
    } catch (e) {
      reject(e)
    }
  })
