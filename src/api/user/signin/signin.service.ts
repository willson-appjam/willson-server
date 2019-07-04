import express from 'express'
import dbconnection from '../../../lib/connection';
import {selectUserEmail, selectUserPassword} from '../../../models/signin';
import {cryptoPassword} from '../../../modules/cryptoPassword'
import token from '../../../lib/middlewares/token'
import {key} from '../../../../secret/aesKey'


const postSigninService = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {body} = req
      let userToken = null
      if(!body.email || !body.password) {
        reject({
          code: 204,
          message: 'body에 NULL값이 존재합니다.'
        })
      }

      const connection = await dbconnection()      
      const [userInfoEmail] : any = await selectUserEmail(connection, body)
      if(!userInfoEmail){
        reject({
          code: 401,
          message: '아이디 or 비밀번호 값이 일치하지 않습니다.'
        })
      } else if(userInfoEmail.email) {
        body.password = await cryptoPassword.hashedPassword(userInfoEmail.salt, body.password)
        const [userInfoPassword] : any = await selectUserPassword(connection, body)
        if(!userInfoPassword){
          reject({
            code: 401,
            message: '아이디 or 비밀번호 값이 일치하지 않습니다.'
          })
        }
        userToken = await token.encode(key , userInfoPassword.user_idx, "0")
      }

      resolve({token : userToken});

    } catch(e){
      console.log(e)
      reject(e)
    } 
  })
}

export default{
  postSigninService,
}