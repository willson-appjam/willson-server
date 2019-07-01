import express from 'express';
import dbConnection from '../../../lib/connection';
import questionModel from '../../../models/question';
import { qList, Question, User, Category }from './question.interface';
import _ from 'lodash';

const postUserQuestion = (req: express.Request, res: express.Response) => {
  return new Promise(async (resolve, reject) => {
    const connection = await dbConnection();
    try {
      const qList = await questionModel.insertQuestion(connection);
      resolve(qList)
    } catch (e) {
      reject(e)
    } finally {
      connection.end();
    }
  })
}

const getUserQuestion = (req: express.Request, res: express.Response) => {
  return new Promise(async (resolve, reject) => {
    const connection = await dbConnection();
    try {
      const qList : qList = await questionModel.selectUserQuestion(connection);
      let user: {}[] = [];
      let question: {}[] = [];
      let category: {}[] = [];
      
      _.forEach(qList, (value, index) => {
        
        user.push({
          user_idx: value.user_idx,
          nickname: value.nickname,
          gender: value.gender,
          age: value.age,
        })

        question.push({
          title: value.title,
        })

        category.push({
          category_idx: value.category_idx,
          category_name: value.category_name
        })
      })

      resolve({
        user,
        question,
        category,
      })
    } catch (e) {
      reject(e)
    } finally {
      connection.end();
    }
  })
}

export default {
  getUserQuestion,
  postUserQuestion,
}