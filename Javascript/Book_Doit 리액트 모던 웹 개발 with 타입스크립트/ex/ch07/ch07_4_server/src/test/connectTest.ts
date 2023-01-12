import * as M from '../mongodb'

const connectCB = (db: M.MongoDB) => {
  console.log('db', db)
}
const connectTest = () => {
  M.connectAndUseDB(connectCB, 'ch07')
}

connectTest()
