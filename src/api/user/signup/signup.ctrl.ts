import express from 'express';
import signService from './signup.service';
import { isValidCheck } from '../../../lib/isValidation'
import serviceStatusCode from '../../../lib/serviceStatusCode'
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';

const postSignupCtrl = async (req: any, res: any, next: any ) => {

  if(!isValidCheck(req)) {
		respondOnError(req, res, new Error('validation error'), 102, 500)
    return
  }

	await signService.postSignupService(req, res, next)
	.then((result: any) => {
		respondBasic(req, res, 100, result)    
	})
	.catch((e: any) => {
		if(e.own === 'CustomError') respondOnError(req, res, e, e.code)
    else respondOnError(req, res, e, 103, 500);
	})
}

export{
	postSignupCtrl
}