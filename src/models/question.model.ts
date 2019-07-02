import mysql, { Connection, MysqlError } from "mysql";
import _ from 'lodash'

const insertQuestion = (connection: Connection, question : any): Promise<Array<{}>> => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO
        question (
          weight,
          content,
          helper_gender,
          emotion,
          advise,
          experience,
          categoryList_idx,
          agreement,
          user_idx
        ) values (?,?,?,?,?,?,?,?,?)
  `
    connection.query(query, _.map(question, (value) => value), (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}

const selectUserQuestion = (connection: Connection) : Promise<Array<{}>> => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        *
      FROM
        question as Q
      INNER JOIN
        user as U on Q.user_idx = U.user_idx
      INNER JOIN
        categoryList as CL on Q.categoryList_idx = CL.categoryList_idx
      INNER JOIN
        category as C on C.category_idx = CL.category_idx
      WHERE
        Q.status = 'wait'
    `
    connection.query(query, (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}

export default {
  insertQuestion,
  selectUserQuestion
}
