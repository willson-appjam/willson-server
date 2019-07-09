import express from 'express';
import signService from './signin.service';
import { respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import {isValidCheck} from '../../../lib/isValidation'

const postSigninCtrl = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  
  if(!isValidCheck(req)) {
		respondOnError(res, new Error('validation error'), 201, 500)
    return
  }

  await signService.postSigninService(req, res, next)
  .then((result: any) => {
    respondBasic(res, 200, result)
  })
  .catch((e: any) => {
    if(e instanceof CustomError) respondOnError(res, e, e.code)
    else respondOnError(res, e, 203, 500);
  })
}

export {
  postSigninCtrl,
}