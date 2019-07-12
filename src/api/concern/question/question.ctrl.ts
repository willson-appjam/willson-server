import express from 'express';
import questionService from './question.service'
import { isValidCheck } from '../../../lib/isValidation';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond'

const getUserQuestionList = async (req: any, res: any) => {

  const { user } = req

  if(user.user_idx == 0) {
    respondOnError(req, res, new Error('NOT AUTHENTICATION USER'), 2, 500)
    return;
  }

  await questionService.getUserQuestion(req, res)
  .then((result: any) => {
    respondBasic(req, res, 800, result)
	})
	.catch((e: any) => {
    if(e.own === 'CustomError') respondOnError(req, res, e, e.code, 200)
    else respondOnError(req, res, e, 801);
	})
}

const postUserQuestion = async (req: any, res: any) => {
  const { body } = req
  const { user } = req

  if(user.user_idx == 0) {
    respondOnError(req, res, new Error('NOT AUTHENTICATION USER'), 2, 500)
    return;
  }
  
  if(!isValidCheck(req)) {
    respondOnError(req, res, new Error('validation error'), 701, 500)
    return;
  }

  await questionService.postUserQuestion(req, res)
  .then((result: any) => {
    respondBasic(req, res, 700, result)
	})
	.catch((e: any) => {
    if(e.own === 'CustomError') respondOnError(req, res, e, e.code, 200)
    else respondOnError(req, res, e, 702);
	})
}

const putUserQuestion = async (req: any, res: any) => {
  const { body } = req
  const { user } = req

  if(user.user_idx == 0) {
    respondOnError(req, res, new Error('NOT AUTHENTICATION USER'), 2, 500)
    return;
  }
  
  if(!isValidCheck(req)) {
    respondOnError(req, res, new Error('validation error'), 2201, 500)
    return;
  }

  await questionService.putUserQuestionStatus(req, res)
  .then((result: any) => {
    respondBasic(req, res, 2200, result)
	})
	.catch((e: any) => {
    if(e.own === 'CustomError') respondOnError(req, res, e, e.code, 200)
    else respondOnError(req, res, e, 2202);
  })
  
}
export {
  getUserQuestionList,
  postUserQuestion,
  putUserQuestion,
}