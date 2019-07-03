import express from 'express'
import {CustomError, resFormat} from '../../lib/middlewares/respond'
import dbconnection from '../../lib/connection'
import {insertHelperReview,updateHelperReviewCount, selectCountReview, updateAvgstar, updateReview} from '../../models/review'
import { resolveCname } from 'dns';
import review from './index';


//리뷰 작성하기 
const postReviewService = (req:any, res:any, next:any) :any => {
	return new Promise(async (resolve, reject) : Promise<any>=>{
		try{
			//로직 작성하기
			const body = req.body;
			//stars, review_content, helper_idx, user_idx, category_idx,question_idx 
			if (!body.stars || !body.review_content ||  !body.helper_idx || !body.user_idx ||  !body.category_idx || !body.question_idx) {
				reject({
					code: 204,
					message: 'body에 NULL값이 존재합니다.'
				})
			} 
			const connection = await dbconnection();
			const result = await insertHelperReview(connection, body);			
			const result2 = await updateHelperReviewCount(connection, body);		
			const result3 : any = await selectCountReview(connection, body);
			const result4 = await updateAvgstar(connection, body, result3[0]);
			
			resolve(result);
		}catch(e){
			reject(e)
		}
	})
}

//리뷰 수정하기
const putReviewService = (req: any, res: any, next: any) => {
	return new Promise(async (resolve, reject) : Promise<any> => {
		try{
			const body = req.body;

			console.log(body)
			console.log(req.params)

			if (!body.stars || !body.review_content){
				reject({
					code: 204,
					message: 'body에 NULL값이 존재합니다.'
				})
			}

			const connection = await dbconnection();
			const result : any = await updateReview(connection, body, body, req.params)
			
			console.log(req.params)

			resolve(result)

		}catch(e){
			reject(e)
		}

	})
}


export default {
	postReviewService,
	putReviewService
}