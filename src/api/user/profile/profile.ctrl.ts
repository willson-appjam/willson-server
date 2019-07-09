import express from 'express';
import profileService from './profile.service';
import {respondBasic, respondOnError, CustomError} from '../../../lib/middlewares/respond';
import serviceStatusCode from '../../../lib/serviceStatusCode'

const getProfileCtrl = async (req: any, res: any, next: any) => {
	await profileService.getProfileService(req, res, next)
	.then((result: any) => {
		respondBasic(res, 300, result)
	})
.catch((e: any) => {
	if(e instanceof CustomError) respondOnError(res, e, e.code)
  else respondOnError(res, e, 302);
	})
}

export{
	getProfileCtrl
}
