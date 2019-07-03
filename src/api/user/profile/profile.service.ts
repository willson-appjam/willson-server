import express from 'express'
import { CustomError, resFormat } from '../../../lib/middlewares/respond'
import dbconnection from '../../../lib/connection'
import { resolveCname } from 'dns';
import profile from '../index';
import { selectUserProfileList, selectPersonality, selectFeeling, selectExperience, selectUserPersonality  } from '../../../models/profile';

const getProfileService = (req: any, res: any, next: any) => {
	return new Promise(async(resolve, reject) => {
		try {
			const params = req.params;
			if (!params.question_idx) {
				reject({
					code: 400,
					message: 'params에 NULL값이 존재합니다.'
				})
			}

			const connection = await dbconnection();

			const result : any = await selectUserProfileList(connection, params)
			const result1 : any = await selectPersonality(connection, params)
			const result2 : any = await selectFeeling(connection, params)
			const result3 : any = await selectExperience(connection, params)
			const result4 : any = await selectUserPersonality(connection, params)

			resolve({
				user: {
					nickname : result[0].nickname,
					gender : result[0].gender,
					age : result[0].age
				},
				user_personality: result4,
				question : {
					category_name : result[0].category_name,
					weight : result[0].weight,
					content : result[0].content,
					helper_gender : result[0].helper_gender,
					advise: result[0].advise,
					emotion : result[0].emotion,
					experience : result[0].experience,
					question_personality: result1,
					question_feeling: result2,
					question_experience: result3
				},

				
			})

		} catch(e){
			console.log(e)
				reject(e)
		}
	}) 
}

export default{
	getProfileService
}