import express from 'express'
<<<<<<< HEAD
import {CustomError, resFormat} from '../../lib/middlewares/respond'
=======
import {CustomError} from '../../lib/middlewares/respond'
>>>>>>> develop
import dbconnection from '../../lib/connection'
import {insertHelperReview,updateHelperReviewCount, selectAvgStars, updateAvgStars, updateReview} from '../../models/review'
import review from './index';


const postReviewService = (req: any, res: any, next: any) => {
	return new Promise(async (resolve, reject) : Promise<any>=>{
		try{
			const {body} = req
			const {user} = req

			console.log('this is user', user)

			if (!body.stars || !body.review_content || !body.helper_idx || !user.user_idx || !body.category_idx || !body.question_idx) {
				reject({
					code: 204,
					message: 'body에 NULL값이 존재합니다.'
				})
			}
			
			const connection = await dbconnection();
			const uploadReview = await insertHelperReview(connection, body, user);			
			const modifiedReviewCount = await updateHelperReviewCount(connection, body);		
			const avgStars : any = await selectAvgStars(connection, body);
			const modifiedAvgStars = await updateAvgStars(connection, avgStars[0], body);
			
			resolve(uploadReview);
		}catch(e){
			console.log(e)
			reject(e)
		}
	})
}


const putReviewService = (req: any, res: any, next: any) => {
	return new Promise(async (resolve, reject) : Promise<any> => {
		try{
			const {body} = req
			const {params} = req
			const {user} = req

			if (!body.stars || !body.review_content){
				reject({
					code: 204,
					message: 'body에 NULL값이 존재합니다.'
				})
			}

			const connection = await dbconnection();
			const modifiedReview: any = await updateReview(connection, body, body, params, user)

			resolve(modifiedReview)
		}catch(e){
			console.log(e)
			reject(e)
		}
	})
}

export default{
	postReviewService,
	putReviewService
}