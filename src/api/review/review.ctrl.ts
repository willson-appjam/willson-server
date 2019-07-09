import express from 'express'
import reviewService from './review.service'
import {respondBasic, respondOnError} from '../../lib/middlewares/respond'
import {isValidCheck} from './review.validation'
import serviceStatusCode from '../../lib/serviceStatusCode'

const postReviewCtrl = async (req: any, res: any, next: any) => {

	if(!isValidCheck(req)) {
		respondOnError(res, req, 1601, 500)
    //respondOnError(res, new Error('validation error'), serviceStatusCode['REVIEW_VALIDATION_ERROR'], 500)
    return
	}
	
	await reviewService.postReviewService(req, res, next)
		.then((result: any) => {
			respondBasic(res, 1600, result)
	})
	.catch((e: any) => {
		console.log(e);
		respondOnError(res, e, 1601, 500)		
	})
}

const putReviewCtrl = async (req: any, res: any, next: any) => {

	if(!isValidCheck(req)) {
    respondOnError(res, req, 1701, 500)
    return
	}

	await reviewService.putReviewService(req, res, next)
	.then((result: any) => {
		respondBasic(res, 1700, result)
	})
	.catch((e: any) => {
		console.log(e);
		respondOnError(res, e, 1702, 500)
	})
}

export{
	postReviewCtrl,
	putReviewCtrl
}