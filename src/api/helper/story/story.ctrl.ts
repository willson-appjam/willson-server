import storyService from './story.service';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';

const getStoryCtrl = async (req: any, res: any) => {

  await storyService.getStoryService(req, res)
  .then((result: any) => {
    respondBasic(res, serviceStatusCode['GET_HELPER_STORY_SUCCESS'], result)
  })
  .catch((e: any) => {
    respondOnError(res, e, e.code, 500);
  })
}

export {
  getStoryCtrl
}
