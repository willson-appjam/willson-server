import listService from './list.service';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';

const getListCtrl = async(req:any, res:any) => {
  new Promise(async (resolve, reject) => {
    await listService.getListService(req, res)
  .then((result: any) => {
    respondBasic(req, res, 1000, result)
  })
  .catch((e: any) => {
    if (e.own === 'CustomError') respondOnError(req, res, e, e.code, 200)
		else respondOnError(req, res, e, 1002, 500);
  })
  })
};

export {
  getListCtrl
}

