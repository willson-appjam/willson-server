import profileService from './profile.service';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import { isValidCheck } from '../../../lib/isValidation';
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';

const getProfileCtrl = async (req: any, res: any) => {

  await profileService.getProfileService(req, res)
  .then((result: any) => {
    respondBasic(res, 1100, result)
  })
  .catch((e: any) => {
    if (e instanceof CustomError) respondOnError(res, e, e.code)
		else respondOnError(res, e, 1102, 500);
  })
}

const putProfileCtrl = async (req: any, res: any) => {

  if(!isValidCheck(req)) {
    respondOnError(res, new Error('validation error'), 1203 , 500)
    return;
  }

  await profileService.putProfileService(req, res)
  .then((result: any) => {
    respondBasic(res, 1200, result)
  })
  .catch((e: any) => {
    if (e instanceof CustomError) respondOnError(res, e, e.code)
		else respondOnError(res, e, 1202, 500);
  })
}

export{
  getProfileCtrl,
  putProfileCtrl
}