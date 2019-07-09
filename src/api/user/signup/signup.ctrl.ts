import express from 'express';
import signService from './signup.service';
import { isValidCheck } from '../../../lib/isValidation'
import serviceStatusCode from '../../../lib/serviceStatusCode'
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';

const postSignupCtrl = async (req: any, res: any, next: any ) => {

  if(!isValidCheck(req)) {
		respondOnError(res, new Error('validation error'), 102, 500)
    return
  }

	await signService.postSignupService(req, res, next)
	.then((result: any) => {
		respondBasic(res, 100, result)    
	})
	.catch((e: any) => {
		if(e instanceof CustomError) respondOnError(res, e, e.code)
    else respondOnError(res, e, 103, 500);
	})
}

export{
	postSignupCtrl
}