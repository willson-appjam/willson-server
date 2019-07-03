import express from 'express'
import { CustomError, resFormat } from '../../../lib/middlewares/respond'
import dbconnection from '../../../lib/connection'
import { resolveCname } from 'dns';
import signin from '../index';
import { selectUserEmail, selectUserPassword } from '../../../models/signin';
import { cryptoPassword } from '../../../modules/cryptoPassword'


//로그인, 아이디랑 비밀번호가 옴
const postSigninService = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return new Promise(async(resolve, reject) => {
    try {
      const body = req.body;
      if(!body.email || !body.password) {
        reject({
          code: 204,
          message: 'body에 NULL값이 존재합니다.'
        })
      }
      const connection = await dbconnection();
      const [result] : any = await selectUserEmail(connection, body)
      //아이디값에 값이 넘어왔는지 확인해주기
      if(!result){
        reject({
          code: 401,
          message: '아이디 or 비밀번호 값이 일치하지 않습니다.'
        })
      }else if(result.email){
        body.password = await cryptoPassword.hashedPassword(result.salt, body.password)
        console.log('222',body.password)
        console.log(body)
        const [result2] : any = await selectUserPassword(connection, body)
        if(!result2){
          reject({
            code: 401,
            message: '아이디 or 비밀번호 값이 일치하지 않습니다.'
          })
        }else{
          console.log('로그인성공')
        }
      }

      resolve(result);

    } catch(e){
        reject(e)
    } 
  })
}

export default {
  postSigninService,
}