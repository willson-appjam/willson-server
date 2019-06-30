import express from 'express'
import { CustomError, resFormat } from '../../../lib/middlewares/respond';

const postSignService = async (req: express.Request, res: express.Response, next: express.NextFunction) => 
  new Promise((resolve, reject) => {
    try {
      // bussiness model
    } catch (e){
      
    } finally {
      resolve('success')
    }
  })

export default {
  postSignService
}