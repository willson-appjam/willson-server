import registrationService from './registration.service';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import { isValidCheck } from '../../../lib/isValidation';
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';

const postRegistrationCtrl = async (req: any, res: any, next: any) => {

  if(!isValidCheck(req)) {
    respondOnError(res, new Error('validation Error'), 901, 500)
    return;
  }

  await registrationService.postRegistrationService(req, res, next)
  .then((result: any) => {
    respondBasic(res, 900, result)
  })
  .catch((e: any) => {
    if (e.own === 'CustomError') respondOnError(res, e, e.code)
		else respondOnError(res, e, 902, 500);
  })
}

export{
  postRegistrationCtrl
}