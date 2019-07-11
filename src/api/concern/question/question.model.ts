import mysql, { Connection, MysqlError } from "mysql";
import _ from 'lodash'

const insertUserQuestion = (connection: Connection, {weight, content, helper_gender, emotion, advise , experience , agreement, categoryList_idx }: any, { user_idx } : any): Promise<Array<{}>> => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO
        question (weight, content, helper_gender, emotion, advise, experience, categoryList_idx, agreement, user_idx, cr_user)
      VALUES (?,?,?,?,?,?,?,?,?,?)
    `
    connection.query(query, [weight, content, helper_gender, emotion, advise , experience , categoryList_idx, agreement, user_idx, user_idx], (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}

const selectUserQuestionWithStatus = (connection: Connection, { gender, user_idx }: any) : Promise<Array<{}>> => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT
    	*
    FROM
	    question as Q
    INNER JOIN
	    user as U on Q.user_idx = U.user_idx
    INNER JOIN
	    categoryList as CL on CL.categoryList_idx = Q.categoryList_idx
    INNER JOIN
	    category as C on C.category_idx = CL.category_idx
    WHERE
	    Q.helper_gender = ? AND Q.status = 'wait' AND C.category_idx = (SELECT category_idx FROM helper WHERE user_idx = ? ) 
      `
    const Query = connection.query(query, [gender, user_idx],(err, result) => {
      console.log(Query.sql)
      err ? reject(err) : resolve(result)
    })
  })
}

const updateQuestionStatus = (connection: Connection, { question_idx, status }: any , { user_idx } : any) : Promise<Array<{}>> => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE
        question q, user u
      SET
        status = ?
      WHERE
        q.question_idx = ? and u.user_idx = ?
      `
    const Query = connection.query(query, [status, question_idx, user_idx],(err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}


const selectUserQuestionSelected = (connection: Connection, question_idx: any, user_idx: any) : Promise<Array<{}>> => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        *
      FROM
        selected_question as S
      INNER JOIN
	      helper as H on H.helper_idx = S.helper_idx
      WHERE
        S.question_idx = ? and H.user_idx = ?
      `
    const Query = connection.query(query, [question_idx, user_idx],(err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}

export default {
  insertUserQuestion,
  selectUserQuestionWithStatus,
  updateQuestionStatus,
  selectUserQuestionSelected
}
