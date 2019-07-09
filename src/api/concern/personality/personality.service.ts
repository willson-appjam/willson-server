import express from 'express';
import dbConnection from '../../../lib/connection';
import personalityModel from './personality.model';

const getPersonalityList = (req: any, res: any) => {
  return new Promise(async (resolve, reject) => {
    let connection = await dbConnection();
    try {
      const personalityList = await personalityModel.selectPersonalityList(connection);
      resolve({
        personalityList,
        size: personalityList.length,
      })
    } catch (e) {
      console.log("========================");
      console.log(e);
      reject(e)
    } finally {
      connection.end();
    }
  })
}

export default {
  getPersonalityList,
}