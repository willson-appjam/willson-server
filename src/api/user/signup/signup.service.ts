import express from 'express'
import { CustomError, resFormat } from '../../../lib/middlewares/respond'
import dbconnection from '../../../lib/connection'
import signup from '../index';
import { insertUserInfo, selectCheckEmail } from '../../../models/signup';
import { cryptoPassword } from '../../../modules/cryptoPassword'


const postSignupService = (req: any, res: any, next: any) : any => {
	return new Promise(async (resolve, reject) : Promise<any> => {
		try{
			const {body} = req
			body.salt = await cryptoPassword.salt()
			body.password = await cryptoPassword.hashedPassword(body.salt, body.password)

			const connection = await dbconnection();
			const checkOverlapedEmail : any = await selectCheckEmail(connection, body)			
			if (!body.nickname || !body.gender || !body.age || !body.email || !body.password || !body.device_token || !body.salt) {
				reject({
					code: 204,
					message: 'body에 NULL값이 존재합니다.'
				})
			}
			
			if(checkOverlapedEmail[0].success ==1){
				reject({
					code: 400,
					message: '중복된 email 존재'
				})
			} else {
				const userInfo = await insertUserInfo(connection, body)
				resolve(userInfo);
			}

		}catch(e){
			console.log(e)
			reject(e)
		}
	})
}

export default{
	postSignupService,
}