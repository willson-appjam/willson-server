import express from 'express';
import questionService from './question.service';

import { isValidCheck } from '../../../lib/isValidation';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond'

const getUserQuestionList = async (req: any, res: any) => {

  await questionService.getUserQuestion(req, res)
  .then((result: any) => {
    respondBasic(res, 800, result)
	})
	.catch((e: any) => {
    if(e instanceof CustomError) respondOnError(res, e, e.code)
    else respondOnError(res, e, 801);
	})
}

const postUserQuestion = async (req: any, res: any) => {
  const { body } = req
  
  if(!isValidCheck(body)) {
    respondOnError(res, new Error('validation error'), 701, 500)
    return;
  }

  await questionService.postUserQuestion(req, res)
  .then((result: any) => {
    respondBasic(res, 700, result)
	})
	.catch((e: any) => {
    if(e instanceof CustomError) respondOnError(res, e, e.code)
    else respondOnError(res, e, 702);
	})
}

export {
  getUserQuestionList,
  postUserQuestion,
}