import express from 'express'
import reviewService from './review.service'
import {respondBasic, respondOnError, CustomError} from '../../../lib/middlewares/respond'
import serviceStatusCode from '../../../lib/serviceStatusCode'

const getListCtrl = async (req: any, res: any, next: any) => {
	await reviewService.getListService(req, res, next)
	.then((result: any) => {
		respondBasic(res, 1500, result)
	})
	.catch((e: any) => {
		if(e instanceof CustomError) respondOnError(res, e, e.code)
    else respondOnError(res, e, 1502);
	})
}

export {
	getListCtrl
}