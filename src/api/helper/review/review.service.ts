import express from 'express';

import profile from '../index'
import dbconnection from '../../../lib/connection'
import {selectReviewList} from '../../../models/reviewlist';
import {respondBasic, respondOnError} from '../../../lib/middlewares/respond'




const getListService = (req: any, res: any, next: any) : any => {
	return new Promise(async (resolve, reject ) : Promise<any> => {
		try{
			const {params} = req

			if (!params){
				reject({
					code : 400,
					message : 'params에 NULL값이 존재합니다.'
				})
			}

			const connection = await dbconnection();
			const showReviewList : any = await selectReviewList(connection, params)

			const reviewList = []
			for(let i = 0; i < showReviewList.length; i++){
				reviewList.push({
					review_idx : showReviewList[i].review_idx,
					stars : showReviewList[i].stars,
					review_content : showReviewList[i].review_content,
					write_date : showReviewList[i].write_date,
					category_name : showReviewList[i].category_name,
					nickname : showReviewList[i].nickname,
					helper_idx : showReviewList[i].helper_idx
				})
			}

			resolve(reviewList)
	}catch(e){
		console.log(e)
		reject(e)
		}
	})
}

export default{
	getListService,
}


