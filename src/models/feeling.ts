import mysql, { Connection } from "mysql";

const selectFeelingList = (connection: Connection,): Promise<Array<{}>>=> {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT
      *
    FROM
      feeling
  `
    connection.query(query, (err: Error, result: Array<any>) => {
      err ? reject(err) : resolve(result)
    })
  })
}


export default {
  selectFeelingList,
}
