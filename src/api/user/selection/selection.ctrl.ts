import express from 'express';
import selectionService from './selection.service';
import { respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';
import serviceStatusCode from '../../../lib/serviceStatusCode'

const postSelectionCtrl = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  await selectionService.postSelectionService(req, res, next)
    .then((result: any) => {
      respondBasic(res, 1900, result)
  })
    .catch((e: any) => {
      respondOnError(res,e, e.code, 500)
    })
}


export {
  postSelectionCtrl,
}