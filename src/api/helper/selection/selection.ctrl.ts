import selectionService from './selection.service';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';

const postSelectionCtrl = async (req: any, res: any) => {

  await selectionService.postSelectionService(req, res)
  .then((result: any) => {
    respondBasic(res, serviceStatusCode['HELPER_SELECTION_SUCCESS'], result)
  })
  .catch((e: any) => {
    respondOnError(res, e, e.code, 500);
  })
}

export {
  postSelectionCtrl
}