import selectionService from './selection.service';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import { isValidCheck } from '../../../lib/isValidation';
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';

const postSelectionCtrl = async (req: any, res: any) => {

  if(!isValidCheck(req)) {
    respondOnError(res, new Error('validation error'), serviceStatusCode['SIGN_UP_VALIDATION_ERROR'], 500)
    return;
  }

  await selectionService.postSelectionService(req, res)
  .then((result: any) => {
    respondBasic(res, 1400, result)
  })
  .catch((e: any) => {
    if (e.own === 'CustomError') respondOnError(res, e, e.code)
		else respondOnError(res, e, 1403, 500);
  })
}

export {
  postSelectionCtrl
}