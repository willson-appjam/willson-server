import express from 'express';
import reviewService from './review.service';
import {respondBasic, respondOnError, CustomError} from '../../../lib/middlewares/respond';

const getListCtrl = async (req: any, res: any, next: any) => {
	await reviewService.getListService(req, res, next)
	.then((result: any) => {
		console.log(result)
		res.status(200).send({
			data : result,
			message: '후기 목록 가져오기 성공'
		})

	})
	.catch((e: any) => {
		console.log(e);
		respondOnError(res, e.message, e.err, 500)
	})

}

export {
	getListCtrl
}