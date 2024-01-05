import express from 'express'
import cors from 'cors'
import {setupRouters} from './setupRouters'

export const createExpressApp = (...args: any[]) => {
  const app = express()

  app
    .use((req, res, next) => {
      console.log(`url='${req.url}, method=${req.method}`)
      next()
    })
    .use(express.static('public'))
    .use(express.json())
    .use(cors())
    .get('/', (req, res) => {
      res.json({message: 'Hello express World!'})
    })

  return setupRouters(app, ...args)
}
