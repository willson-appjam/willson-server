import express from 'express';
import dbConnection from '../../../lib/connection';
import feelingModel from '../../../models/feeling.model';

const getfeelingService = (req: express.Request, res: express.Response) => {
  return new Promise(async (resolve, reject) => {
    let connection = await dbConnection();
    try {
      const feelingList = await feelingModel.selectFeelingList(connection);
      resolve(feelingList)
    } catch (e) {
      reject(e)
    } finally {
      connection.end();
    }
  })
}

export default {
  getfeelingService,
}