import express from 'express';
import reviewService from './review.service';
import {respondBasic, respondOnError} from '../../lib/middlewares/respond';

const postReviewCtrl = async (req: any, res:any, next: any) => {
	await reviewService.postReviewService(req, res, next)
		.then((result: any) => {
			console.log(result)
			res.status(200).send({
				message: '리뷰 등록 완료',
			})
	})
	.catch((e: any) => {
		console.log(e);
		respondOnError(res, e.message, e.err, 500)		
	})
}

const putReviewCtrl = async (req: any, res: any, next: any) => {
	await reviewService.putReviewService(req, res, next)
	.then((result: any) => {
		console.log(result)
		res.status(200).send({
			message: '리뷰 수정 완료'
		})
	})
	.catch((e: any) => {
		console.log(e);
		respondOnError(res, e.message, e.err, 500)
	})
}

export{
	postReviewCtrl,
	putReviewCtrl
}