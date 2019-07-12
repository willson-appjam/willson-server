import profileService from './profile.service';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import { isValidCheck } from '../../../lib/isValidation';
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';

const getProfileCtrl = async (req: any, res: any) => {

  const { user } = req

  if(user.user_idx == 0) {
    respondOnError(req, res, new Error('NOT AUTHENTICATION USER'), 2, 500)
    return;
  }

  await profileService.getProfileService(req, res)
  .then((result: any) => {
    respondBasic(req, res, 1100, result)
  })
  .catch((e: any) => {
    if (e.own === 'CustomError') respondOnError(req, res, e, e.code, 200)
		else respondOnError(req, res, e, 1102, 500);
  })
}

const putProfileCtrl = async (req: any, res: any) => {

  const { user } = req

  if(user.user_idx == 0) {
    respondOnError(req, res, new Error('NOT AUTHENTICATION USER'), 2, 500)
    return;
  }

  if(!isValidCheck(req)) {
    respondOnError(req, res, new Error('validation error'), 1203 , 500)
    return;
  }

  await profileService.putProfileService(req, res)
  .then((result: any) => {
    respondBasic(req, res, 1200, result)
  })
  .catch((e: any) => {
    if (e.own === 'CustomError') respondOnError(req, res, e, e.code, 200)
		else respondOnError(req, res, e, 1202, 500);
  })
}

export{
  getProfileCtrl,
  putProfileCtrl
}