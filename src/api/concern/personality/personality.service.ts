import express from 'express';
import dbConnection from '../../../lib/connection';
import personalityModel from './personality.model';

const getPersonalityList = (req: any, res: any) => {
  return new Promise(async (resolve, reject) => {
    const connection: any = await dbConnection();
    try {
      const personalityList = await personalityModel.selectPersonalityList(connection);
      resolve({
        personalityList,
        size: personalityList.length,
      })
    } catch (e) {
      console.log(e);
      reject(e)
    } finally {
      connection.release();
    }
  })
}

export default {
  getPersonalityList,
}