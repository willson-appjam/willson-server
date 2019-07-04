import { dbconfig } from '../../secret'
import mysql from 'mysql'

const dbpool : mysql.Pool = mysql.createPool(dbconfig);

export default function dbConnection() {
  return new Promise((resolve, reject) => {
    dbpool.getConnection((err: Error, connection: mysql.Connection) => {
      if (err) {
        reject('db connection error')
      } else {
        resolve(connection)
      }
    })
  })
}
