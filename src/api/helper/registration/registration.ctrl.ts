import registrationService from './registration.service';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import { isValidCheck } from './registration.validation';
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';

const postRegistrationCtrl = async (req: any, res: any, next: any) => {

  if(!isValidCheck(req)) {
    respondOnError(res, new Error('validation Error'), serviceStatusCode['HELPER_REGISTRATION_VALIDATION_ERROR'], 500)
    return;
  }

  await registrationService.postRegistrationService(req, res, next)
  .then((result: any) => {
    console.log(result);
    respondBasic(res, serviceStatusCode['HELPER_REGISTRATION_SUCCESS'], result)
  })
  .catch((e: any) => {
    respondOnError(res, e, e.code, 500);
  })
}

export{
  postRegistrationCtrl
}