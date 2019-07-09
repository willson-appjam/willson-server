import express from 'express';
import feelingService from './feeling.service';

import { isValidCheck } from '../../../lib/isValidation';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';

const getFeelingList = async (req: any, res: any) => {

  await feelingService.getfeelingService(req, res)
  .then((result: any) => {
    respondBasic(res, 600, result)
	})
	.catch((e: any) => {
    if(e.own === 'CustomError') respondOnError(res, e, e.code)
    else respondOnError(res, e, 602);
	})
}




export {
  getFeelingList,
}