import express from 'express';
import profileService from './profile.service';
import {respondBasic, respondOnError, CustomError} from '../../../lib/middlewares/respond';
import serviceStatusCode from '../../../lib/serviceStatusCode'

const getProfileCtrl = async (req: any, res: any, next: any) => {
	const { user } = req

  if(user.user_idx == 0) {
    respondOnError(req, res, new Error('NOT AUTHENTICATION USER'), 2, 500)
    return;
	}
	
	await profileService.getProfileService(req, res, next)
	.then((result: any) => {
		respondBasic(req, res, 300, result)
	})
.catch((e: any) => {
	if(e.own === 'CustomError') respondOnError(req, res, e, e.code, 200)
  else respondOnError(req, res, e, 302);
	})
}

export{
	getProfileCtrl
}
