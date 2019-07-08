import express from 'express';
import signService from './signin.service';
import { respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';
import serviceStatusCode from '../../../lib/serviceStatusCode'

const postSigninCtrl = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  await signService.postSigninService(req, res, next)
    .then((result: any) => {
      respondBasic(res, serviceStatusCode['SIGN_IN_SUCCESS'], result)
  })
    .catch((e: any) => {
      respondOnError(res, e.code, 500)
    })
}

export {
  postSigninCtrl,
}