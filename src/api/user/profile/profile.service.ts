import express from 'express'
import { CustomError } from '../../../lib/middlewares/respond'
import dbconnection from '../../../lib/connection'
import { resolveCname } from 'dns';
import profile from '../index';
import { selectUserProfileList, selectPersonality, selectFeeling, selectExperience, selectUserPersonality }
from '../../../models/profile';
import {getAge} from '../../../modules/getAge'
import serviceStatusCode from '../../../lib/serviceStatusCode'

const getProfileService = (req: any, res: any, next: any) => {
	return new Promise(async(resolve, reject) => {
		try {
			const {params} = req
			if (!params.question_idx) {
				reject({ code: serviceStatusCode['USER_PROFILE_LIST_VALIDATION_ERROR'] })
				return
			}

			const connection = await dbconnection();
			const userProfileList : any = await selectUserProfileList(connection, params)

			if(userProfileList.length == 0){
				reject({ code: serviceStatusCode['USER_PROFILE_LIST_VALIDATION_ERROR'] })
			}
			
			const personality : any = await selectPersonality(connection, params)
			const feeling : any = await selectFeeling(connection, params)
			const experience : any = await selectExperience(connection, params)
			const userPersonality : any = await selectUserPersonality(connection, params)
			const ageStr = await getAge(userProfileList[0].age)

			resolve({
				user: {
					nickname : userProfileList[0].nickname,
					gender : userProfileList[0].gender,
					age : ageStr
				},
				user_personality: userPersonality,
				question : {
					category_name : userProfileList[0].category_name,
					weight : userProfileList[0].weight,
					content : userProfileList[0].content,
					helper_gender : userProfileList[0].helper_gender,
					advise: userProfileList[0].advise,
					emotion : userProfileList[0].emotion,
					experience : userProfileList[0].experience,
					question_personality: personality,
					question_feeling: feeling,
					question_experience: experience
				}
		})
		}catch(e){
			console.log(e)
			reject(e)
		}
	}) 
}

export default{
	getProfileService
}