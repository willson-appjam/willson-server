import mysql, { Connection, MysqlError } from "mysql";
import _ from 'lodash'

const insertQuestionPersonality = (connection: Connection, { insertId }: any , personality: Array<number>): Promise<Array<{}>> => {
  return new Promise((resolve, reject) => {
    const value: number[][] = [];
    _.forEach(personality, (element) => {
      value.push([insertId, element])
    })

    const query = `
      INSERT INTO
        question_personality (question_idx, personality_idx)
      VALUES
        ?
    `
    connection.query(query, [value], (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}


export default {
  insertQuestionPersonality,
}
