import express from 'express';
import dbconnection from '../../../lib/connection'
import {CustomError, resFormat} from '../../../lib/middlewares/respond'
import { resolveCname } from 'dns';
import profile from '../index'
import { selectReviewList} from '../../../models/reviewlist';

//리뷰 리스트 가져오기
const getListService = (req: any, res: any, next: any) : any => {
	return new Promise(async (resolve, reject ) : Promise<any> => {
		try{
			
			const params = req.params;
			if (!params){
				reject({
					code : 400,
					message : 'params에 NULL값이 존재합니다.'
				})
			}

			const connection = await dbconnection();
			const result : any = await selectReviewList(connection, params);

			const reviewList = [];

			for(let i = 0; i < result.length; i++){
				reviewList.push({
					review_idx : result[i].review_idx,
					stars : result[i].stars,
					review_content : result[i].review_content,
					write_date : result[i].write_date,
					category_name : result[i].category_name,
					nickname : result[i].nickname,
					helper_idx : result[i].helper_idx
				})
			}

			resolve(reviewList)

	}catch(e){
			reject(e)
		}
	})
}

export default {
	getListService,
}


