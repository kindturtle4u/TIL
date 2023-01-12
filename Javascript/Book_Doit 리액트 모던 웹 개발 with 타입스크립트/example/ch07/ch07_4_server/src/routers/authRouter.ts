import type {MongoDB} from '../mongodb'
import {stringToObjectId} from '../mongodb'
import {Router} from 'express'
import * as U from '../utils'

export const authRouter = (...args: any[]) => {
  const db: MongoDB = args[0]
  const user = db.collection('user')
  const router = Router()

  return router
    .post('/signUp', async (req, res) => {
      const {body} = req

      try {
        console.log('/signup', body)
        const exists = await user.findOne({email: body.email})

        if (exists) {
          res.json({ok: false, errorMessage: '이미 가입한 회원입니다.'})
        } else {
          const {email, password} = body
          console.log(email, password)
          const hashed = await U.hashPasswordP(password)
          const newBody = {email, password: hashed}
          const {insertedId} = await user.insertOne(newBody)
          const jwt = await U.jwtSignP({userId: insertedId})

          res.json({ok: true, body: jwt})
        }
      } catch (e) {
        if (e instanceof Error) res.json({ok: false, errorMessage: e.message})
      }
    })
    .post('/login', async (req, res) => {
      const {authorization} = req.headers || {}
      if (!authorization) {
        res.json({ok: false, errorMessage: 'JSON 토큰이 없습니다.'})
        return
      }
      try {
        const tmp = authorization.split(' ')
        if (tmp.length !== 2)
          res.json({ok: false, errorMessage: '헤더에서 JSON 토큰을 얻을 수 없습니다.'})
        else {
          const jwt = tmp[1]
          const decoded = (await U.jwtVerifyP(jwt)) as {userId: string}
          const result = await user.findOne({_id: stringToObjectId(decoded.userId)})
          if (!result) {
            res.json({ok: false, errorMessage: '등록되지 않은 사용자 입니다.'})
            return
          }

          const {email, password} = req.body
          if (email !== result.email) {
            res.json({ok: false, errorMessage: '이메일 주소가 틀립니다.'})
            return
          }
          const same = await U.comparePasswordP(password, result.password)
          if (false === same) {
            res.json({ok: false, errorMessage: '패스워드가 틀립니다.'})
            return
          }

          res.json({ok: true})
        }
      } catch (e) {
        if (e instanceof Error) res.json({ok: false, errorMessage: e.message})
      }
    })
}
