import express from 'express'
import dbconnection from '../../../lib/connection';
import {selectUserInformation, selectUserPassword } from './signin.model';
import { CustomError } from '../../../lib/middlewares/respond';
import {cryptoPassword} from '../../../modules/cryptoPassword'
import token from '../../../lib/middlewares/token'
import {key} from '../../../../secret/aesKey'
import serviceStatusCode from '../../../lib/serviceStatusCode'


// const postSigninService = (req: express.Request, res: express.Response, next: express.NextFunction) => {
//   return new Promise(async (resolve, reject) => {
//     const connection: any  = await dbconnection()
//     try {
//       const {body} = req
//       let userToken = null

//       const [userInfo] : any = await selectUserInformation(connection, body)
//       if(!userInfo){
//         reject(new CustomError(null, 202, body))
//       } else if(userInfo.email) {

//         body.password = await cryptoPassword.hashedPassword(userInfo.salt, body.password)
//         const [userInfoPassword] : any = await selectUserPassword(connection, body)
        
//         if(!userInfoPassword){
//           reject(new CustomError(null, 202, body))
//         }

//         userToken = await token.encode(key , userInfo)
//       }

//       resolve({
//         Token: userToken
//       })

//     } catch(e){
//       console.log(e)
//       reject(e)
//     }finally{
//       connection.release()
//     }
//   })
// }

const postSigninService = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return new Promise(async (resolve, reject) => {
    const connection: any  = await dbconnection()
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
      }

      const Token = await token.encode(key , userInfo)
      
      resolve({
        Token,
        userInfo,
      })

    } catch(e){
      console.log(e)
      reject(e)
    }finally{
      connection.release()
    }
  })
}



export default{
  postSigninService,
}