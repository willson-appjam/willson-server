import express from 'express';
import _ from 'lodash';

import dbConnection from '../../../lib/connection';
import questionModel from '../../../models/question.model';
import personalityModel from '../../../models/personality.model';
import feelingModel from '../../../models/feeling.model';
import experienceModel from '../../../models/experience.model';

const getUserConcernList = (req: any, res: any) => {
  
  return new Promise(async (resolve, reject) => {
    
    const { user } = req;
    const connection = await dbConnection();
    
    try {
      
      resolve({})
      
    } catch (e) {
      console.log(e);
      reject(e)
    } finally {
      connection.end();
    }
  })
}

export default {
  getUserConcernList,
}