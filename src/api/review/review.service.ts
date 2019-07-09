import dbconnection from '../../lib/connection'
import {insertHelperReview,updateHelperReviewCount, selectAvgStars, updateAvgStars, selectIdxFromReview, updateHelperReview}
from './review.model'
import serviceStatusCode from '../../lib/serviceStatusCode'
import { CustomError } from '../../lib/middlewares/respond'



const postReviewService = (req: any, res: any, next: any) => {
	return new Promise(async (resolve, reject) : Promise<any>=>{
		try{
			const {body} = req
			const {user} = req
			
			const connection = await dbconnection()
			const uploadReview = await insertHelperReview(connection, body, user)			
			const modifiedReviewCount = await updateHelperReviewCount(connection, body)		
			const avgStars : any = await selectAvgStars(connection, body)
			const modifiedAvgStars = await updateAvgStars(connection, avgStars[0], body)

			resolve(uploadReview)
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

			const connection = await dbconnection();
			const idxFromReview: any = await selectIdxFromReview(connection, params, user)
			if (!idxFromReview[0]){
				reject(new CustomError(null, serviceStatusCode['MODIFIED_REVIEW_PERMISSION_ERROR'], body))
				}else{
					const updateReview: any = await updateHelperReview(connection, body, user)
					resolve(updateReview)
				}						
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