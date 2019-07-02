import express from 'express';
import questionService from './question.service';
import { respondBasic, respondOnError } from '../../../lib/middlewares/respond';

const getUserQuestionList = async (req: express.Request, res: express.Response) => {

  await questionService.getUserQuestion(req, res)
  .then((data: any) => {
    respondBasic(res, 100, 'success', data);
  })
  .catch((e: Error) => {
    respondOnError(res, 100, 'fail', 500);
  })
}

const postUserQuestion = async (req: express.Request, res: express.Response) => {
  await questionService.postUserQuestion(req, res)
  .then((data: any) => {
    respondBasic(res, 100, 'success', data);
  })
  .catch((e: Error) => {
    respondOnError(res, 100, 'fail', 500);
  })
}

export {
  getUserQuestionList,
  postUserQuestion,
}