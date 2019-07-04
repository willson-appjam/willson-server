import express from 'express';
import signService from './sign.service';
import { respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';

const postSigninCtrl = async (req: any, res: any, next: express.NextFunction) => {

  // validation 만들고 싶으면 만들기

  
  await signService.postSignService(req, res, next)
    .then((result: any) => {
      respondBasic(res, 0, 'Sample Success Message', result)
    })
    .catch((e) => {
      if (e instanceof CustomError) respondOnError(res, e.code, e.message, e.status, e.data)
      else respondOnError(res, 0, 'Sample Error Message', 500)
    })

}

export {
  postSigninCtrl,
}