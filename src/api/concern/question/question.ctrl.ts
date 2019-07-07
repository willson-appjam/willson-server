import express from 'express';
import questionService from './question.service';

import { isValidCheck } from '../../../lib/isValidation';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';

const getUserQuestionList = async (req: any, res: any) => {

  await questionService.getUserQuestion(req, res)
  .then((result: any) => {
    respondBasic(res, serviceStatusCode['GET_USER_QUESTION_LIST'], result)
  })
  .catch((e: any) => {
    respondOnError(res, e.code, 500);
  })
}

const postUserQuestion = async (req: any, res: any) => {
  const { body } = req
  if(!isValidCheck(body)) {
    respondOnError(res, serviceStatusCode['POST_USER_QUESTION_VALIDATION_ERROR'], 500)
    return;
  }

  await questionService.postUserQuestion(req, res)
  .then((data: any) => {
    respondBasic(res, 100, data);
  })
  .catch((e: any) => {
    respondOnError(res, 100, 500);
  })
}

export {
  getUserQuestionList,
  postUserQuestion,
}