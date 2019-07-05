import express from 'express'
import { CustomError } from '../../lib/middlewares/respond'
import dbconnection from '../../lib/connection'
import {insertHelperReview,updateHelperReviewCount, selectAvgStars, updateAvgStars, selectIdxFromReview, updateHelperReview}
from '../../models/review'


const postReviewService = (req: any, res: any, next: any) => {
	return new Promise(async (resolve, reject) : Promise<any>=>{
		try{
			const {body} = req
			const {user} = req

			if (!body.stars || !body.review_content || !body.helper_idx || !user.user_idx || !body.category_idx || !body.question_idx) {
				reject({
					code: 204,
					message: 'body에 NULL값이 존재합니다.'
				})
			}
			
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

			if (!body.stars || !body.review_content){
				reject({
					code: 204,
					message: 'body에 NULL값이 존재합니다.'
				})
			}

			const connection = await dbconnection();
			const idxFromReview: any = await selectIdxFromReview(connection, params, user)
			if (!idxFromReview[0]){
				reject({
					code: 403,
					message: '작성한 사용자만 수정 및 삭제 가능'
				})
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