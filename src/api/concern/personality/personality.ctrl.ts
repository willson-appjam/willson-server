import express from 'express';
import personalityService from './personality.service';
import { isValidCheck } from '../../../lib/isValidation';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';

const getPersonalityList = async (req: any, res: any) => {

  const { user } = req

  if(user.user_idx == 0) {
    respondOnError(req, res, new Error('NOT AUTHENTICATION USER'), 2, 500)
    return;
  }

  await personalityService.getPersonalityList(req, res)
  .then((result: any) => {
    respondBasic(req, res, 2000, result)
	})
	.catch((e: any) => {
    if(e.own === 'CustomError') respondOnError(req, res, e, e.code)
    else respondOnError(req, res, e, 2002);
	})
}


export {
  getPersonalityList,
}