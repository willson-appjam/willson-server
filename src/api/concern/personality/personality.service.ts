import express from 'express';
import dbConnection from '../../../lib/connection';
import personalityModel from '../../../models/personality.model';

const getPersonalityList = (req: any, res: any) => {
  return new Promise(async (resolve, reject) => {
    let connection = await dbConnection();
    try {
      const personnalitList = await personalityModel.selectPersonalityList(connection);
      resolve({ personnalitList,})
    } catch (e) {
      reject(e)
    } finally {
      connection.end();
    }
  })
}

export default {
  getPersonalityList,
}