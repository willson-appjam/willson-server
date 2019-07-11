import express from 'express'
import reviewService from './review.service'
import {respondBasic, respondOnError, CustomError} from '../../../lib/middlewares/respond'
import serviceStatusCode from '../../../lib/serviceStatusCode'

const getListCtrl = async (req: any, res: any, next: any) => {
	const { user } = req

  if(user.user_idx == 0) {
    respondOnError(req, res, new Error('NOT AUTHENTICATION USER'), 2, 500)
    return;
	}
	
	await reviewService.getListService(req, res, next)
	.then((result: any) => {
		respondBasic(req, res, 1500, result)
	})
	.catch((e: any) => {
		if(e.own === 'CustomError') respondOnError(req, res, e, e.code)
    else respondOnError(req, res, e, 1502);
	})
}

export {
	getListCtrl
}