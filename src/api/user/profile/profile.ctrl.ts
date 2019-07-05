import express from 'express';
import profileService from './profile.service';
import {respondBasic, respondOnError, CustomError} from '../../../lib/middlewares/respond';

const getProfileCtrl = async (req: any, res: any, next: any) => {
	await profileService.getProfileService(req, res, next)
	.then((result: any) => {
		res.status(200).send({
			message: '유저 프로필 가져오기 성공',
			data: result
		})
	})
.catch((e: any) => {
	console.log(e);
	respondOnError(res, e.message, e.err, 500)
	})
}

export{
	getProfileCtrl
}
