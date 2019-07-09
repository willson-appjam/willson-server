import listService from './list.service';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';

const getListCtrl = async(req:any, res:any) => {
  new Promise(async (resolve, reject) => {
    await listService.getListService(req, res)
  .then((result: any) => {
    respondBasic(res, 1000, result)
  })
  .catch((e: any) => {
    if (e instanceof CustomError) respondOnError(res, e, e.code)
		else respondOnError(res, e, 1002, 500);
  })
  })
};

export {
  getListCtrl
}

