import express from 'express';
import _ from 'lodash';

import dbConnection from '../../../lib/connection';
import questionModel from './question.model';
import personalityModel from '../personality/personality.model';
import feelingModel from '../feeling/feeling.model';
import experienceModel from '../../../models/experience.model';

import { qList, Question, User, Category } from './question.interface';
import { CustomError } from '../../../lib/middlewares/respond';

const postUserQuestion = (req: any, res: any) => {
  
  return new Promise(async (resolve, reject) => {
    
    const connection = await dbConnection();
    
    try {
      
      const { question, feeling, personality, experience } = req.body
      const { user } = req
      
      const qResult: any = await questionModel.insertUserQuestion(connection, question, user);
      
      if(qResult.affectedRows == 0) {
        reject(new CustomError(null, 703, req.body))
      }

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
      const { user } = req
      const qList : qList = await questionModel.selectUserQuestionWithStatus(connection, user);
      
      let concernInfo: {}[] = [];
      
      _.forEach(qList, (value, index) => {
        
        const userInfo : User = {
          user_idx: value.user_idx,
          nickname: value.nickname,
          gender: value.gender,
          age: value.age,
        }

        const questionInfo : Question = {
          title: value.content,
        }

        const categoryInfo : Category = {
          category_idx: value.category_idx,
          category_name: value.category_name
        }

        concernInfo.push({
          userInfo,
          questionInfo,
          categoryInfo,
        })
      })
      
      resolve({ concernInfo, size: qList.length })

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