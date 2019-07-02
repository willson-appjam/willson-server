import express from 'express';
import feelingService from './feeling.service';

const getFeelingList = async (req: express.Request, res: express.Response) => {

  await feelingService.getfeelingService(req, res)
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
    console.log(e);
    res.send(e)
  })
}




export {
  getFeelingList,
}