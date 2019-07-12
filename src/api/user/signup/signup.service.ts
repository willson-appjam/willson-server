import express from 'express'
import { CustomError } from '../../../lib/middlewares/respond'
import dbconnection from '../../../lib/connection'
import { insertUserInfo, selectCheckEmail } from './signup.model'
import { cryptoPassword } from '../../../modules/cryptoPassword'
import serviceStatusCode from '../../../lib/serviceStatusCode'


const postSignupService = (req: any, res: any, next: any) : any => {
	return new Promise(async (resolve, reject) : Promise<any> => {
		const connection: any = await dbconnection()
		try{
			const { body } = req
			body.salt = await cryptoPassword.salt()
			body.password = await cryptoPassword.hashedPassword(body.salt, body.password)

			const checkOverlapedEmail : any = await selectCheckEmail(connection, body)

			if(checkOverlapedEmail.length == 1) {
				delete body.salt
				reject(new CustomError(null, 101,  body))
        return
      }
      
      const userInfo = await insertUserInfo(connection, body)
      
      resolve({})

		} catch(e) {
			reject(e)
		} finally{
			connection.release()
		}
	})
}

export default{
	postSignupService,
}