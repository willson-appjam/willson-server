import express from 'express';
import moment from 'moment';
import dbconnection from '../../../lib/connection'
import {selectReviewList} from './reviewlist.model'
import serviceStatusCode from '../../../lib/serviceStatusCode'
import { CustomError } from '../../../lib/middlewares/respond'



const getListService = (req: any, res: any, next: any) : any => {
	return new Promise(async (resolve, reject ) : Promise<any> => {
		try{
			const {params} = req

			if (!params.helper_idx){
				reject(new CustomError(null, serviceStatusCode['USER_REVIEW_LIST_VALIDATION_ERROR'], { params }))
        return
			}

			const connection = await dbconnection();
			const showReviewList : any = await selectReviewList(connection, params)

			if(showReviewList.length == 0){
				reject(new CustomError(null, serviceStatusCode['USER_REVIEW_LIST_VALIDATION_ERROR'], { params }))
        return
			}

			const reviewList = []
			for(let i = 0; i < showReviewList.length; i++){
				reviewList.push({
					review_idx : showReviewList[i].review_idx,
					stars : showReviewList[i].stars,
					review_content : showReviewList[i].review_content,
					write_date : moment(showReviewList[i].write_date).format('YYYY.MM.DD'),
					category_name : showReviewList[i].category_name,
					nickname : showReviewList[i].nickname
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


