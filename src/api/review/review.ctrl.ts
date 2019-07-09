import express from 'express'
import reviewService from './review.service'
import {respondBasic, respondOnError} from '../../lib/middlewares/respond'
import {isValidCheck} from './review.validation'
import serviceStatusCode from '../../lib/serviceStatusCode'

const postReviewCtrl = async (req: any, res: any, next: any) => {

	if(!isValidCheck(req)) {
		respondOnError(res, new Error('validation error'), 1601, 500)
    return
	}
	
	await reviewService.postReviewService(req, res, next)
		.then((result: any) => {
			respondBasic(res, 1600, result)
	})
	.catch((e: any) => {
		console.log(e);
		respondOnError(res, e, 1602, 500)		
	})
}

const putReviewCtrl = async (req: any, res: any, next: any) => {

	if(!isValidCheck(req)) {
    respondOnError(res, new Error('validation error'), 1701, 500)
    return
	}

	await reviewService.putReviewService(req, res, next)
	.then((result: any) => {
		respondBasic(res, 1700, result)
	})
	.catch((e: any) => {
		console.log(e);
		respondOnError(res, e, 1703, 500)
	})
}

const getMainReviewCtrl = async (req: any, res: any, next: any) => {
	await reviewService.getMainListService(req, res, next)
	.then((result: any) => {
		respondBasic(res, 2300, result)
	})
	.catch((e: any) => {
		if(e.own === 'CustomError') respondOnError(res, e, e.code)
    else respondOnError(res, e, 2301)
	})
}


export{
	postReviewCtrl,
	putReviewCtrl,
	getMainReviewCtrl
}