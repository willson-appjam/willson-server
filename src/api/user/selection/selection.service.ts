import express from 'express'
import dbconnection from '../../../lib/connection';
import token from '../../../lib/middlewares/token'
import serviceStatusCode from '../../../lib/serviceStatusCode'
import { CustomError } from '../../../lib/middlewares/respond';
import {insertUserSelection} from '../../../models/user_selection.model'


const postSelectionService = (req: any, res: any, next: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {body} = req
      const {user} = req

      if(!body.helper_idx || !body.question_idx) {
        reject(new CustomError(null, 2101 , body))
        return
      }

      const connection = await dbconnection()
      const user_selection = await insertUserSelection(connection, body, user)
      resolve({});
      
    } catch(e){
      reject(e)
    } 
  })
}

export default{
  postSelectionService,
}