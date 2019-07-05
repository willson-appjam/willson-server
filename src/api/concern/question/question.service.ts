import express from 'express';
import _ from 'lodash';

import dbConnection from '../../../lib/connection';
import questionModel from '../../../models/question.model';
import personalityModel from '../../../models/personality.model';
import feelingModel from '../../../models/feeling.model';
import experienceModel from '../../../models/experience.model';

import { qList, Question, User, Category } from './question.interface';

const postUserQuestion = (req: any, res: any) => {
  
  return new Promise(async (resolve, reject) => {
    
    const connection = await dbConnection();
    
    try {
      
      const { question, feeling, personality, experience } = req.body
      const { user } = req
      
      const qResult: any = await questionModel.insertUserQuestion(connection, question, user);
      
      qResult.affectedRows == 0 && reject({message: 'insert error'})

      const fResult = await feelingModel.insertQuestionFeeling(connection, qResult, feeling);
      const pResult = await personalityModel.insertQuestionPersonality(connection, qResult, personality);
      const eResult = await experienceModel.insertQuestionExperience(connection, qResult, experience)

      resolve({})
      
    } catch (e) {
      console.log(e);
      reject(e)
    } finally {
      connection.end();
    }
  })
}

const getUserQuestion = (req: any, res: any) => {
  return new Promise(async (resolve, reject) => {
    const connection = await dbConnection();
    
    try {
      const qList : qList = await questionModel.selectUserQuestionWithStatus(connection);
      
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
          title: value.content,
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
          size: qList.length,
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