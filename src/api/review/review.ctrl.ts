import express from 'express'
import reviewService from './review.service'
import {respondBasic, respondOnError} from '../../lib/middlewares/respond'
import {isValidCheck} from './review.validation'
import serviceStatusCode from '../../lib/serviceStatusCode'

const postReviewCtrl = async (req: any, res: any, next: any) => {

	const { user } = req

  if(user.user_idx == 0) {
    respondOnError(req, res, new Error('NOT AUTHENTICATION USER'), 2, 500)
    return;
  }

	if(!isValidCheck(req)) {
		respondOnError(req, res, new Error('validation error'), 1601, 500)
    return
	}
	
	await reviewService.postReviewService(req, res, next)
		.then((result: any) => {
			respondBasic(req, res, 1600, result)
	})
	.catch((e: any) => {
		console.log(e);
		respondOnError(req, res, e, 1602, 500)		
	})
}

const putReviewCtrl = async (req: any, res: any, next: any) => {

	const { user } = req

  if(user.user_idx == 0) {
    respondOnError(req, res, new Error('NOT AUTHENTICATION USER'), 2, 500)
    return;
  }

	if(!isValidCheck(req)) {
    respondOnError(req, res, new Error('validation error'), 1701, 500)
    return
	}

	await reviewService.putReviewService(req, res, next)
	.then((result: any) => {
		respondBasic(req, res, 1700, result)
	})
	.catch((e: any) => {
		console.log(e);
		respondOnError(req, res, e, 1703, 500)
	})
}

const getMainReviewCtrl = async (req: any, res: any, next: any) => {
	await reviewService.getMainListService(req, res, next)
	.then((result: any) => {
		respondBasic(req, res, 2300, result)
	})
	.catch((e: any) => {
		if(e.own === 'CustomError') respondOnError(req, res, e, e.code, 200)
    else respondOnError(req, res, e, 2301)
	})
}

export{
	postReviewCtrl,
	putReviewCtrl,
	getMainReviewCtrl
}