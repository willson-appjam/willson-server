import express from 'express';
import dbConnection from '../../../lib/connection';
import feelingModel from './feeling.model';

const getfeelingService = (req: any, res: any) => {
  return new Promise(async (resolve, reject) => {
    const connection: any = await dbConnection();
    try {
      const feelingList = await feelingModel.selectFeelingList(connection);
      resolve({feelingList})

    } catch (e) {
      reject(e)
    } finally {
      connection.release();
    }
  })
}

export default {
  getfeelingService,
}