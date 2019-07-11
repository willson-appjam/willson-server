import mysql, { Connection, MysqlError } from "mysql";
import _ from 'lodash'

const insertQuestionPersonality = (connection: Connection, { insertId }: any , personality: Array<number>, {user_idx}: any): Promise<Array<{}>> => {
  return new Promise((resolve, reject) => {
    const value: number[][] = [];
    _.forEach(personality, (element) => {
      value.push([insertId, element, user_idx])
    })

    const query = `
      INSERT INTO
        question_personality (question_idx, personality_idx, cr_user)
      VALUES
        ?
    `
    connection.query(query, [value], (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}

const selectPersonalityList = (connection: Connection): Promise<Array<{}>> => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        *
      FROM
        personality
    `
    connection.query(query, (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}

export default {
  insertQuestionPersonality,
  selectPersonalityList,
}
