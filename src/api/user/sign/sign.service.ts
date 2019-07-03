import express from 'express'
import { CustomError, resFormat } from '../../../lib/middlewares/respond';

const postSignService = async (req: any, res: any, next: express.NextFunction) => 
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