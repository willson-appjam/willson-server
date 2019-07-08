import express from 'express'
import reviewService from './review.service'
import {respondBasic, respondOnError, CustomError} from '../../../lib/middlewares/respond'
import serviceStatusCode from '../../../lib/serviceStatusCode'

const getListCtrl = async (req: any, res: any, next: any) => {
	await reviewService.getListService(req, res, next)
	.then((result: any) => {
		respondBasic(res, serviceStatusCode['GET_REVIEW_LIST_SUCCESS'], result)
	})
	.catch((e: any) => {
		console.log(e);
		respondOnError(res, e, e.code, 500)
	})
}

export {
	getListCtrl
}