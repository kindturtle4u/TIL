import * as M from '../mongodb'

const connectCB = async (db: M.MongoDB) => {
  try {
    const user = db.collection('user')

    const one = await user.findOne({})
    console.log('one', one)

    const many = await user.find({}).toArray()
    console.log('many', many)
  } catch (e) {
    if (e instanceof Error) console.log(e.message)
  }
}
const findTest = () => {
  M.connectAndUseDB(connectCB, 'ch07')
}

findTest()
