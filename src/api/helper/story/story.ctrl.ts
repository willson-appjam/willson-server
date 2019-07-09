import storyService from './story.service';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';

const getStoryCtrl = async (req: any, res: any) => {

  await storyService.getStoryService(req, res)
  .then((result: any) => {
    respondBasic(res, 1300, result)
  })
  .catch((e: any) => {
    if (e.own === 'CustomError') respondOnError(res, e, e.code)
		else respondOnError(res, e, 1302, 500);
  })
}

export {
  getStoryCtrl
}
