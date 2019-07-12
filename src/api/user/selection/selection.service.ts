import express from 'express'
import dbconnection from '../../../lib/connection';
import token from '../../../lib/middlewares/token'
import serviceStatusCode from '../../../lib/serviceStatusCode'
import { CustomError } from '../../../lib/middlewares/respond';
import { insertUserSelection, selectHelperMatchingStatus} from './selection.model'
import questionModel from '../../concern/question/question.model'

const postSelectionService = (req: any, res: any, next: any) => {
  return new Promise(async (resolve, reject) => {
    const connection: any = await dbconnection()

    await connection.beginTransaction(async (err: Error) => {
      if (err) throw new CustomError(null, 0, {})
      try { 
        const { body, user } = req
        
        if(!body.helper_idx || !body.question_idx) {
          reject(new CustomError(null, 2101 , body))
          return
        }

        const hResult : any = await selectHelperMatchingStatus(connection, body)

        if(hResult.length) {
          reject(new CustomError(null, 2103, body))
        }
        const user_selection: any = await insertUserSelection(connection, body, user)
        await questionModel.updateQuestionStatus(connection, body, user);

        resolve({
          matching_idx: user_selection.insertId,
        });

        await Promise.resolve(connection.commit())
      } catch (e) {
        await Promise.resolve(connection.rollback())
        reject(e)
      } finally {
        connection.release();
      }
    })
  })
}

export default{
  postSelectionService,
}