import express from 'express'
import { CustomError } from '../../../lib/middlewares/respond'
import dbconnection from '../../../lib/connection'
import signup from '../index';
import { insertUserInfo, selectCheckEmail } from '../../../models/signup';
import { cryptoPassword } from '../../../modules/cryptoPassword'
import serviceStatusCode from '../../../lib/serviceStatusCode';


const postSignupService = (req: any, res: any, next: any) : any => {
	return new Promise(async (resolve, reject) : Promise<any> => {
		try{
			const { body } = req
			body.salt = await cryptoPassword.salt()
			body.password = await cryptoPassword.hashedPassword(body.salt, body.password)

			const connection = await dbconnection();
			const checkOverlapedEmail : any = await selectCheckEmail(connection, body)			
			
			if(checkOverlapedEmail.length == 1) {
        reject({ code: serviceStatusCode['SIGN_UP_DUPLICATE_DATA'] })
        return
      }
      
      const userInfo = await insertUserInfo(connection, body)
      
      resolve({
        code: serviceStatusCode['SIGN_UP_SUCCESS'],
        data: userInfo
      })

		} catch(e) {
			console.log(e)
			reject(e)
		}
	})
}

export default{
	postSignupService,
}