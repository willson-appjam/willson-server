import MyprofileService from './myprofile.service';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';

const getMyprofileCtrl = async(req:any, res:any) => {
  new Promise(async (resolve, reject) => {
    await MyprofileService.getMyprofileService(req, res)
  .then((result: any) => {
    respondBasic(req, res, 2500, result)
  })
  .catch((e: any) => {
    if (e.own === 'CustomError') respondOnError(req, res, e, e.code)
		else respondOnError(req, res, e, 2502, 500);
  })
  })
};

export {
  getMyprofileCtrl
}
