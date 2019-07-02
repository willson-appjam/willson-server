import mysql, { Connection, MysqlError } from "mysql";
import _ from 'lodash'

const selectFeelingList = (connection: Connection,): Promise<Array<{}>> => {
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

const insertQuestionFeeling = (connection: Connection, question_idx : number, feeling: Array<number>): Promise<Array<{}>> => {
  return new Promise((resolve, reject) => {
    const value: number[][] = [];
    _.forEach(feeling, (element) => {
      value.push([question_idx, element])
    })

    const query = `
      INSERT INTO
        question_feeling (question_idx, feeling_idx)
      VALUES
        (?)
    `
    connection.query(query, value, (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}


export default {
  selectFeelingList,
  insertQuestionFeeling,
}
