import express from 'express';
import questionService from './question.service';

const getUserQuestionList = async (req: express.Request, res: express.Response) => {

  await questionService.getUserQuestion(req, res)
  .then((result: any) => {
    res.send({
      message: '',
      code: 100,
      data: {
        feeling: result,
      }
    })
  })
  .catch((e: Error) => {
    res.send(e)
  })
}

const postUserQuestion = async (req: express.Request, res: express.Response) => {
  
  await questionService.postUserQuestion(req, res)
  .then((result: any) => {
    res.send({
      message: '',
      code: 100,
      data: {
        feeling: result,
      }
    })
  })
  .catch((e: Error) => {
    res.send(e)
  })
}


export {
  getUserQuestionList,
  postUserQuestion,
}