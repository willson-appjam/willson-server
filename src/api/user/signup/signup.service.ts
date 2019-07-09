import express from 'express'
import { CustomError } from '../../../lib/middlewares/respond'
import dbconnection from '../../../lib/connection'
import { insertUserInfo, selectCheckEmail } from './signup.model'
import { cryptoPassword } from '../../../modules/cryptoPassword'
import serviceStatusCode from '../../../lib/serviceStatusCode'


const postSignupService = (req: any, res: any, next: any) : any => {
	return new Promise(async (resolve, reject) : Promise<any> => {
		try{
			const { body } = req
			body.salt = await cryptoPassword.salt()
			body.password = await cryptoPassword.hashedPassword(body.salt, body.password)

			const connection = await dbconnection();
			const checkOverlapedEmail : any = await selectCheckEmail(connection, body)			

			if(checkOverlapedEmail.length == 1) {
				delete body.salt
				console.log(3)
				reject(new CustomError(null, 101, { body } ))
        return
      }
      
      const userInfo = await insertUserInfo(connection, body)
      
      resolve({})

		} catch(e) {
			console.log('mmmm', e, 'mmmm')
			reject(e)
		}
	})
}

export default{
	postSignupService,
}