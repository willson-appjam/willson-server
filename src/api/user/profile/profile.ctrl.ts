import express from 'express';
import profileService from './profile.service';
import {respondBasic, respondOnError, CustomError} from '../../../lib/middlewares/respond';
import serviceStatusCode from '../../../lib/serviceStatusCode'

const getProfileCtrl = async (req: any, res: any, next: any) => {
	await profileService.getProfileService(req, res, next)
	.then((result: any) => {
		respondBasic(res, serviceStatusCode['GET_USER_PROFILE_LIST_SUCCESS'], result)
	})
.catch((e: any) => {
	respondOnError(res, e, e.code, 500)
	})
}

export{
	getProfileCtrl
}
