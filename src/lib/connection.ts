import { dbconfig } from '../../secret'
import mysql, { Connection } from 'mysql'

const dbpool : mysql.Pool = mysql.createPool(dbconfig);

export default function dbConnection() : Promise<Connection> {
  return new Promise((resolve, reject) => {
    dbpool.getConnection((err: Error, connection: Connection) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve(connection)
      }
    })
  })
}
