import {Express} from 'express'
import * as R from '../routers'

export const setupRouters = (app: Express, ...args: any[]): Express => {
  return app.use('/test', R.testRouter(...args))
}
