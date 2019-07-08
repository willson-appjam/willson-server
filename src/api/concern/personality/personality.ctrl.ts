import express from 'express';
import personalityService from './personality.service';

import { isValidCheck } from '../../../lib/isValidation';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';

const getPersonalityList = async (req: any, res: any) => {

  await personalityService.getPersonalityList(req, res)
  .then((result: any) => {
    respondBasic(res, serviceStatusCode['GET_PERSONALITY_SUCCESS'], result)
	})
	.catch((e: any) => {
		respondOnError(res, e.code, 500);
	})
}




export {
  getPersonalityList,
}