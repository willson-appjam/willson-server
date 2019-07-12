import express from 'express';
import signService from './signin.service';
import { respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import {isValidCheck} from '../../../lib/isValidation'

const postSigninCtrl = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  
  if(!isValidCheck(req)) {
		respondOnError(req, res, new Error('validation error'), 201, 500)
    return
  }

  await signService.postSigninService(req, res, next)
  .then((result: any) => {
    respondBasic(req, res, 200, result)
  })
  .catch((e: any) => {
    if(e.own === 'CustomError') respondOnError(req, res, e, e.code, 200)
    else respondOnError(req, res, e, 203);
  })
}

export {
  postSigninCtrl,
}