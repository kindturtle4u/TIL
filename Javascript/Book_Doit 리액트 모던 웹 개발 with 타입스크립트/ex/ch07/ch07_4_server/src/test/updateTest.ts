import * as M from '../mongodb'

const connectCB = async (db: M.MongoDB) => {
  try {
    const user = db.collection('user')

    await user.updateOne(
      {name: {$regex: /^J.*$/}},
      {$set: {name: 'John'}, $inc: {age: 10}}
    )
    const updateOneResult = await user.find({}).toArray()
    console.log('updateOneResult', updateOneResult)

    await user.updateMany({name: {$regex: /^J.*$/}}, {$inc: {age: 10}})
    const updateManyResult = await user.find({}).toArray()
    console.log('updateManyResult', updateManyResult)

    const findOneResult = await user.findOneAndUpdate(
      {name: 'John'},
      {$set: {age: 66}},
      {returnDocument: 'after'} // 'before' 와 'after' 두 개 값 중 하나
    )
    console.log('findOneResult', findOneResult)
  } catch (e) {
    if (e instanceof Error) console.log(e.message)
  }
}
const updateTest = () => {
  M.connectAndUseDB(connectCB, 'ch07')
}

updateTest()
