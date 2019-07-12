import selectionService from './selection.service';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import { isValidCheck } from '../../../lib/isValidation';
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';

const postSelectionCtrl = async (req: any, res: any) => {

  const { user } = req

  if(user.user_idx == 0) {
    respondOnError(req, res, new Error('NOT AUTHENTICATION USER'), 2, 500)
    return;
  }

  if(!isValidCheck(req)) {
    respondOnError(req, res, new Error('validation error'), serviceStatusCode['SIGN_UP_VALIDATION_ERROR'], 500)
    return;
  }

  await selectionService.postSelectionService(req, res)
  .then((result: any) => {
    respondBasic(req, res, 1400, result)
  })
  .catch((e: any) => {
    if (e.own === 'CustomError') respondOnError(req, res, e, e.code, 200)
		else respondOnError(req, res, e, 1403, 500);
  })
}

export {
  postSelectionCtrl
}