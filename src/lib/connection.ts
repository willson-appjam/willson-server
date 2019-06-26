import { dbconfig } from '../../secret/index'
import mysql from 'mysql'

const config : string = JSON.stringify(dbconfig)
const dbpool : mysql.Pool = mysql.createPool(config);

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
