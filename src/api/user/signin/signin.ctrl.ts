import express from 'express';
import signService from './signin.service';
import { respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';

const postSigninCtrl = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  await signService.postSigninService(req, res, next)
    .then((result: any) => {
      console.log(result)
      res.status(200).send({
        data: result,
        message: '로그인 성공'
    })
  })
    .catch((e: any) => {
      console.log(e);
      respondOnError(res, e.message, e.err)
    })

}

export {
  postSigninCtrl,
}