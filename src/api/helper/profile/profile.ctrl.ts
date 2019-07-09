import profileService from './profile.service';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';

const getProfileCtrl = async (req: any, res: any) => {

  await profileService.getProfileService(req, res)
  .then((result: any) => {
    respondBasic(res, 1100, result)
  })
  .catch((e: any) => {
    respondOnError(res, e, e.code, 500);
  })
}

const putProfileCtrl = async (req: any, res: any) => {

  await profileService.putProfileService(req, res)
  .then((result: any) => {
    respondBasic(res, 1200, result)
  })
  .catch((e: any) => {
    respondOnError(res, e, e.code, 500);
  })
}

export{
  getProfileCtrl,
  putProfileCtrl
}