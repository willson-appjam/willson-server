import express from 'express'
import dbconnection from '../../../lib/connection';
import {selectUserInformation, selectUserPassword } from './signin.model';
import { CustomError } from '../../../lib/middlewares/respond';
import {cryptoPassword} from '../../../modules/cryptoPassword'
import token from '../../../lib/middlewares/token'
import {key} from '../../../../secret/aesKey'
import serviceStatusCode from '../../../lib/serviceStatusCode'

const postSigninService = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return new Promise(async (resolve, reject) => {
    const connection: any  = await dbconnection();

    await connection.beginTransaction(async (err: Error) => {
      if (err) throw new CustomError(null, 0, {})
      
      try {
        const { body } = req
        let [userInfo] : any = await selectUserInformation(connection, body)
        
        if(!userInfo){
          reject(new CustomError(null, 202, body))
          return;
        }
  
        const checkPassword = await cryptoPassword.hashedPassword(userInfo.salt, body.password)
        
        if(checkPassword !== userInfo.password) {
          reject(new CustomError(null, 202, body))  
        }
  
          userInfo = {
          user_idx: userInfo.user_idx,
          nickname: userInfo.nickname,
          gender: userInfo.gender,
          age: userInfo.age,
          device_token: userInfo.device_token,
          uid: userInfo.uid
        }
  
        const Token = await token.encode(key , userInfo)
        
        resolve({
          Token,
          userInfo,
        })

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
  postSigninService,
}