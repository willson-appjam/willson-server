import { dbconfig } from '../../secret'
import mysql from 'mysql'

const config : string = JSON.stringify(dbconfig)
const dbpool = mysql.createPool(config);

module.exports = function dbConnection(dbpool: mysql.Pool) {
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
