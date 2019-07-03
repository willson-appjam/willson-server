import express from 'express'
import { CustomError, resFormat } from '../../../lib/middlewares/respond'
import dbconnection from '../../../lib/connection'
import { resolveCname } from 'dns';
import signup from '../index';
import { insertUserInfo, selectCheckEmail } from '../../../models/signup';
import { cryptoPassword } from '../../../modules/cryptoPassword'

//회원가입하기
const postSignupService = (req: any, res: any, next: any) : any => {
	return new Promise(async (resolve, reject) : Promise<any>=>{
		try{
			const body = req.body;
			body.salt = await cryptoPassword.salt()
			body.password = await cryptoPassword.hashedPassword(body.salt, body.password)

			console.log(body.salt)
			console.log(body.password)

			const connection = await dbconnection();
			const result2 : any = await selectCheckEmail(connection, body)			
			if ( !body.nickname || !body.gender || !body.age || !body.email || !body.password || !body.device_token || !body.salt ) {
				reject({
					code: 204,
					message: 'body에 NULL값이 존재합니다.'
				})
			}
			
			if(result2[0].success ==1){
				reject({
					code: 400,
					message: '중복된 email 존재'
				})
			} else {
				const result = await insertUserInfo(connection, body)
				resolve(result);
			}

		}catch(e){
			reject(e)
		}

})
}
export default{
	postSignupService,
}