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

const selectQuestionExperience = (connection: Connection, experience: Array<string>): Promise<Array<{}>> => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        *
      FROM
        experience
      WHERE
        experience_name = ?
    `
    connection.query(query, [experience], (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}

const insertExperienceList = (connection: Connection, experience: {}) : Promise<Array<{}>> => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO
        experience(experience_name)
      VALUES(?)
    `
    connection.query(query, [experience], (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}


const updateCategoryListCount = (connection: Connection, experience: {}) : Promise<Array<{}>> => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE
        experience
      SET
        count = count + 1
      WHERE
        experience_name = ?
    `
    connection.query(query, [experience], (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}

export default {
  selectQuestionExperience,
  insertQuestionExperience,
  insertExperienceList,
  updateCategoryListCount
}
