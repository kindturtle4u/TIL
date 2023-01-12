import * as M from '../mongodb'

const connectCB = async (db: M.MongoDB) => {
  try {
    const user = db.collection('user')

    const deleteOneResult = await user.deleteOne({name: {$regex: /^J.*$/}})
    console.log('deleteOneResult', deleteOneResult)

    const deleteManyResult = await user.deleteMany({name: {$regex: /^J.*$/}})
    console.log('deleteManyResult', deleteManyResult)

    const deleteAllResult = await user.deleteMany({})
    console.log('deleteAllResult', deleteAllResult)

    const userDocuments = await user.find({}).toArray()
    console.log('userDocuments', userDocuments)
  } catch (e) {
    if (e instanceof Error) console.log(e.message)
  }
}
const deleteTest = () => {
  M.connectAndUseDB(connectCB, 'ch07')
}

deleteTest()
