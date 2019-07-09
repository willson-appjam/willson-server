import mysql, { Connection } from "mysql";
import _ from 'lodash'

const insertQuestionExperience = (connection: Connection, { insertId }: any , experience: Array<number>): Promise<Array<{}>> => {
  return new Promise((resolve, reject) => {
    const value: number[][] = [];
    _.forEach(experience, (element) => {
      value.push([insertId, element])
    })

    const query = `
      INSERT INTO
        question_experience (question_idx, experience_idx)
      VALUES
        ?
    `
    connection.query(query, [value], (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}


export default {
  insertQuestionExperience,
}
