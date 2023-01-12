import {MongoClient, Db} from 'mongodb'

export type MongoDB = Db
export type ConnectCallback = (db: MongoDB) => void

export const connectAndUseDB = async (
  callback: ConnectCallback,
  dbName: string,
  mongoUrl: string = 'mongodb://127.0.0.1:27017'
) => {
  let connection
  try {
    connection = await MongoClient.connect(mongoUrl) // 몽고 DB와 연결
    const db: Db = connection.db(dbName) // 몽고 쉘의 'use dbName'에 해당
    callback(db) // 얻어진 db 객체를 callback 함수의 매개변수로 하여 호출
  } catch (e) {
    // 타입스크립트의 타입 가드 구문 필요
    if (e instanceof Error) {
      console.log(e.message)
    }
  }
}
