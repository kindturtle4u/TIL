import {ObjectId} from 'mongodb'

export const stringToObjectId = (id: string) => new ObjectId(id)
