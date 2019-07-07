import express from 'express'
import reviewService from './review.service'
import {respondBasic, respondOnError} from '../../lib/middlewares/respond'
import {isValidCheck} from './review.validation'
import serviceStatusCode from '../../lib/serviceStatusCode'

const postReviewCtrl = async (req: any, res: any, next: any) => {

	if(!isValidCheck(req)) {
    respondOnError(res, serviceStatusCode['REVIEW_VALIDATION_ERROR'], 500)
    return
	}
	
	await reviewService.postReviewService(req, res, next)
		.then((result: any) => {
			respondBasic(res, serviceStatusCode['REVIEW_REGISTERED_SUCCESS'], result)
	})
	.catch((e: any) => {
		console.log(e);
		respondOnError(res, e.message, 500)		
	})
}

const putReviewCtrl = async (req: any, res: any, next: any) => {

	if(!isValidCheck(req)) {
    respondOnError(res, serviceStatusCode['MODIFIED_REVIEW_VALIDATION_ERROR'], 500)
    return
	}

	await reviewService.putReviewService(req, res, next)
	.then((result: any) => {
		respondBasic(res, serviceStatusCode['MODIFIED_REVIEW_SUCCESS'], result)
	})
	.catch((e: any) => {
		console.log(e);
		respondOnError(res, e.code, 500)
	})
}

export{
	postReviewCtrl,
	putReviewCtrl
}