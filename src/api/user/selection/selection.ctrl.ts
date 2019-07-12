import express from 'express';
import selectionService from './selection.service';
import { respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';
import serviceStatusCode from '../../../lib/serviceStatusCode'

const postSelectionCtrl = async (req: any, res: any, next: any) => {
  const { user } = req

  if(user.user_idx == 0) {
    respondOnError(req, res, new Error('NOT AUTHENTICATION USER'), 2, 500)
    return;
  }
  
  await selectionService.postSelectionService(req, res, next)
    .then((result: any) => {
      respondBasic(req, res, 2100, result)
  })
    .catch((e: any) => {
      if (e.own === 'CustomError') respondOnError(req, res, e, e.code, 200)
		  else respondOnError(req, res, e, 2102, 500);
    })
}


export {
  postSelectionCtrl,
}