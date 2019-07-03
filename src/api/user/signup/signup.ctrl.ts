import express from 'express';
import signService from './signup.service';
import{respondBasic, respondOnError, CustomError} from '../../../lib/middlewares/respond';

const postSignupCtrl = async (req: any, res: any, next: any ) => {
	await signService.postSignupService(req, res, next)
	.then((result: any) => {
		console.log(result)
		res.status(200).send({
			message: '회원가입 성공'
		})
	})
	.catch((e: any) => {
		console.log(e);
		respondOnError(res, e.message, e.err, 500)
	})
}

export{
	postSignupCtrl
}