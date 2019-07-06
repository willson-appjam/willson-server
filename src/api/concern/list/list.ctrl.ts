import express from 'express';
import listService from './list.service';
import serviceStatusCode from '../../../lib/serviceStatusCode'

import { respondBasic, respondOnError } from '../../../lib/middlewares/respond';

const getUserConcernList = async (req: any, res: any) => {

  await listService.getUserConcernList(req, res)
  .then((result: any) => {
    respondBasic(res, serviceStatusCode['SIGN_UP_SUCCESS'], result)
	})
	.catch((e: any) => {
		respondOnError(res, e.code, 500);
	})
}

export {
  getUserConcernList,
}