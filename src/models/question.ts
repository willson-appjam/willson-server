import mysql, { Connection } from "mysql";

const insertQuestion = (connection: Connection,): Promise<Array<{}>> => {
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
          user_idx,
          categoryList_idx,
          agreement
        )
      VALUES(?,?,?,?,?,?,?,?)
  `
    connection.query(query, (err: Error, result: Array<any>) => {
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
        categoryList as CL Q.categoryList_idx = CL.categoryList.idx
      INNER JOIN
        category as C C.category_idx = CL.category_idx
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
