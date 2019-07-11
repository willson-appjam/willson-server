import express from 'express';
import moment from 'moment';
import dbconnection from '../../../lib/connection'
import {selectReviewList} from './reviewlist.model'
import serviceStatusCode from '../../../lib/serviceStatusCode'
import { CustomError } from '../../../lib/middlewares/respond'
import dbConnection from '../../../lib/connection';



const getListService = (req: any, res: any, next: any) : any => {
	return new Promise(async (resolve, reject ) : Promise<any> => {
		const connection: any = await dbconnection()
		try{
			const {params} = req

			if (!params.helper_idx){
				reject(new CustomError(null, 1501, { params }))
        return
			}
			const showReviewList : any = await selectReviewList(connection, params)

			if(showReviewList.length == 0){
				reject(new CustomError(null, 1501, { params }))
        return
			}

			const reviewList = []
			for(let i = 0; i < showReviewList.length; i++){
				reviewList.push({
					review_idx : showReviewList[i].review_idx,
					stars : showReviewList[i].stars,
					review_content : showReviewList[i].review_content,
					write_date : moment(showReviewList[i].write_date).add(9, 'hours').format('YYYY.MM.DD'),
					category_name : showReviewList[i].category_name,
					nickname : showReviewList[i].nickname
				})
			}

			resolve(reviewList)
	}catch(e){
		console.log(e)
		reject(e)
		} finally{
			connection.release()
		}
	})
}

export default{
	getListService,
}


